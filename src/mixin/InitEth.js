import { Common, EventBus, Wallet, Http, SwapHttp } from "@/utils";
import {
  EventConfig,
  StorageConfig,
  WalletConfig,
  ConstantConfig,
  PancakeConfig,
  HttpConfig,
} from "@/config";
import { mapState } from "vuex";
import BigNumber from "bignumber.js";
import axios from "axios";
import ETH from "../utils/wallet/eth/ETH";

const InitEth = {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapState({
      myNFT_wallet: (state) => state.ethState.data.myNFT_wallet,
      myNFT_stake: (state) => state.ethState.data.myNFT_stake,
      pledgeList: (state) => state.ethState.data.pledgeList,
      ethState: (state) => state.ethState.data,
      tempSells: (state) => state.marketState.data.tempSells,
      tempMarketCancelTx: (state) => state.marketState.data.tempMarketCancelTx,
      coinArr: (state) => state.bnbState.data.coinArr,
      setting: (state) => state.bnbState.data.setting,
      pledgeType: (state) => state.bnbState.data.pledgeType,
      buyBack: (state) => state.bnbState.data.buyBack,
      balancePool: (state) => state.bnbState.data.balancePool,
      buyBackType: (state) => state.globalState.data.buyBackType,
    }),
  },
  async created() {
    EventBus.$off();
    if (this.timer) clearInterval(this.timer);

    //
    //
    EventBus.$on(
      EventConfig.OpenBoxConfirm,
      this.eth_openBoxConfirm.bind(this)
    );
    //
    EventBus.$on(EventConfig.OpenBoxFail, ({ chain, hash }) => {
      if (chain == "eth") {
        let { openBoxTemp } = this.ethState;
        openBoxTemp.map((item) => {
          if (item.tx == hash) item.state = -1;
        });
        this.$store.commit("ethState/setData", { openBoxTemp });
      }
    });
    EventBus.$on(
      EventConfig.LevelUpConfirm,
      this.eth_levelUpConfirm.bind(this)
    );
    EventBus.$on(
      EventConfig.OpenBoxHistory,
      this.eth_openBoxHistory.bind(this)
    );
    EventBus.$on("refreshCrystalNum", this.getCrystalNum.bind(this));

    //
    EventBus.$on(EventConfig.CancelAuctionError, async ({ hash }) => {
      //
      this.tempMarketCancelTx.map((item, index) => {
        if (item.nextHash == hash) {
          this.tempMarketCancelTx.splice(index, 1);
        }
      });
      this.tempGemMarketCancelTx.map((item, index) => {
        if (item.nextHash == hash) {
          this.tempGemMarketCancelTx.splice(index, 1);
        }
      });
      this.$store.commit("globalState/setData", {
        tempMarketCancelTx: this.tempMarketCancelTx,
        tempGemMarketCancelTx: this.tempGemMarketCancelTx,
      });
    });
    //
    EventBus.$on(EventConfig.CreateAuctionError, async ({ hash }) => {
      //
      this.tempSells.map((item, index) => {
        if (item.tx == hash) {
          this.tempSells.splice(index, 1);
        }
      });

      this.tempGemSells.map((item, index) => {
        if (item.tx == hash) {
          this.tempGemSells.splice(index, 1);
        }
      });
      this.$store.commit("globalState/setData", {
        tempSells: this.tempSells,
        tempGemSells: this.tempGemSells,
      });
    });
    //
    EventBus.$on(EventConfig.HttpError, async () => {
      this.$store.commit("globalState/setData", { marketLoading: false });
    });

    //
    EventBus.$on(EventConfig.SwapSuccess, () => {
      this.getCoinValue();
      this.setBalance();
    });

    setInterval(() => {
      this.getCrystalNum();
    }, 5000);

    Wallet.ETH.init();
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    async initBaseData() {
      this.setNowBlockNumber();
      let account = await Wallet.ETH.getAccount();
      clearInterval(this.timer);
      if (account) {
        //
        let history = Common.getStorageItem("pancake-history-" + account);
        if (history != undefined) {
          let histoyJSON = JSON.parse(history);
          this.$store.commit("bnbState/setData", {
            pancakeHistory: histoyJSON,
          });
        }

        // this.getRefund();
        this.setBalance();
        this.needUpdate();
        this.setOrder();

        let t = 0;
        this.timer = setInterval(() => {
          t++;
          if (t % 30 == 0) {
            if (Wallet.ETH.myAddr != "") {
              this.needUpdate();
            }
          }

          if (t % 5 == 0) {
            this.setOrder();
          }
        }, 1000);

        await this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        await this.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
        await this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);

        await this.eth_set1155IsApprovedForStake();
        await this.eth_set721IsApprovedForStake();
        let momoNumObj = await Wallet.ETH.getAll721Status();
        this.$store.commit("globalState/setData", { momoNumObj });

        //
        await this.eth_setStakeHistory();
        await this.eth_setOpenBoxHistory();
        await this.eth_setLockList();
      }
    },
    async getMaxHashrateV3() {
      const [
        v4MinHashrate,
        v4StandardHashrate,
        v4MaxHashrate,
        v5MinHashrate,
        v5StandardHashrate,
        v5MaxHashrate,
        v6MinHashrate,
        v6StandardHashrate,
        v6MaxHashrate,
        nextStepTime,
        currentStep,
      ] = await Wallet.ETH.Group.MoMoSetting.getMaxHashrateV3();

      this.$store.commit("globalState/setStep", currentStep);
      this.$store.commit("globalState/setHashrateInfo", {
        v4MinHashrate,
        v4StandardHashrate,
        v4MaxHashrate,
        v5MinHashrate,
        v5StandardHashrate,
        v5MaxHashrate,
        v6MinHashrate,
        v6StandardHashrate,
        v6MaxHashrate,
        nextStepTime,
        currentStep: +currentStep,
      });
    },
    //
    async needUpdate() {
      //
      await this.getMoMoSetting();
      await this.getMaxHashrateV3();
      //
      await this.getStakeValueAndEarndKey();
      //
      await this.getPools();
      await this.avglockdays();
      await this.getTotalStakeMbox();
      //
      await this.getVeMboxStakeInfo();

      await this.getCoinValue();

      await this.eth_setBox();
      this.getPoolsEarns();

      //
      await this.getGemBag();

      //
      await this.eth_setMyHashrate();
      await this.eth_setTotalHashrate();
      await this.eth_setEarnedMbox();

      if (this.ethState.allowance_box_to_minter < 10000) {
        this.eth_setBoxAllowance();
      }

      //
      await this.getBuyBack();

      //
      await this.setTotalOpenBox();
      await this.getNewBoxNum();
      await this.getCrystalNum();
    },
    //
    async getBigAuctionPetsMy(needLoading = false) {
      let account = await Wallet.ETH.getAccount();
      if (needLoading)
        this.$store.commit("marketState/setData", { marketLoading: true });
      let data = await Wallet.ETH.Group.BigSell.getMyBigSell();
      this.$store.commit("marketState/setData", { marketLoading: false });
      let bigSellMy = { total: data.length, list: [] };
      if (data.length > 0) {
        data.map(async (index) => {
          let sellData = await Wallet.ETH.Group.BigSell.getOrder({
            auctor_: account,
            index_: Number(index),
          });
          let momoData = await Http.getMoMoDetail(sellData.tokenIds);
          sellData.tokens = momoData.list;
          sellData.price = sellData.price / 1e9;
          sellData.tx = sellData.orderId;
          sellData.auctor = account;
          sellData.index = index;
          sellData.uptime = sellData.startTime;
          sellData.type = sellData.groupType;
          let hashrate = 0;
          sellData.tokens.map((item) => {
            hashrate += item.lvHashrate;
          });
          if (sellData.type == 1) {
            hashrate += data.length * 300;
          }
          sellData.hashrate = hashrate;
          bigSellMy.list.push(sellData);
          bigSellMy.list.sort((a, b) => b.startTime - a.startTime);
          if (bigSellMy.list.length == data.length) {
            this.$store.commit("momoMarketState/setData", { bigSellMy });
          }
        });
      } else {
        this.$store.commit("momoMarketState/setData", { bigSellMy });
      }
    },

    async getMoMoSetting() {
      let [
        v4_max_upgrade,
        v5_max_upgrade,
        v6_max_upgrade,
        v4_max_enhance,
        v5_max_enhance,
        v6_max_enhance,
        updateTime,
      ] = await Wallet.ETH.Group.MoMoSetting.getMoMoSetting();
      let momoSetting = {
        updateTime,
        v4_max_upgrade,
        v4_max_enhance,
        v5_max_upgrade,
        v5_max_enhance,
        v6_max_upgrade,
        v6_max_enhance,
      };
      this.$store.commit("globalState/setData", { momoSetting });
    },

    async getRefund() {
      let refundData = await Wallet.ETH.getRefund();
      let { short, middle, long } = refundData;
      refundData.short = this.numFloor(short / 1e18, 1e2);
      refundData.middle = this.numFloor(middle / 1e18, 1e2);
      refundData.long = this.numFloor(long / 1e18, 1e2);
      refundData.total = this.numFloor(
        Number(refundData.short) +
          Number(refundData.middle) +
          Number(refundData.long),
        1e2
      );
      this.$store.commit("globalState/setData", { refundData });
    },
    //
    async getNewBoxNum() {
      // const res =  await Wallet.ETH.get1155Num(WalletConfig.ETH.newBoxToken, [1, 2]);
      // let boxNum = +res[1];
      // let mecBoxNum = +res[2];
      // if (boxNum == 0 || mecBoxNum == 0) {
      // 	const address = await Wallet.ETH.getAccount();
      // 	const res = await Http.getBalances(address);
      // 	boxNum = boxNum || res.box;
      // 	mecBoxNum = mecBoxNum || res.mec_box;
      // }
      // this.$store.commit("gemState/setData", { boxNum });
      // this.$store.commit("userState/setData", { mecBoxNum });
    },
    //
    async getCrystalNum() {
      // const res =  await Wallet.ETH.get1155Num(WalletConfig.ETH.crystalToken, [1]);
      // let crystalNum = +res[1];
      // if (crystalNum != 0) {
      // 	const address = await Wallet.ETH.getAccount();
      // 	const res = await Http.getBalances(address);
      // 	crystalNum = res.mec;
      // }
      // this.$store.commit("userState/setData", { crystalNum });
    },
    async setNowBlockNumber() {
      let res = await Wallet.ETH.getBlockNumber();
      this.$store.commit("globalState/setData", { getNowBlock: res });
    },
    async getPoolsEarns() {
      let res = await Wallet.ETH.getPoolsEarns();
      if (res) {
        let { tokens, versions, amounts } = res;
        tokens.map((item, pos) => {
          if (WalletConfig.ETH.balanceAddr[item.toUpperCase()]) {
            let { name, decimals } =
              WalletConfig.ETH.balanceAddr[item.toUpperCase()];
            this.balancePool[name].version = versions[pos];
            this.balancePool[name].amount = amounts[pos] / decimals;
          }
        });
        this.balancePool["ts"] = Date.now();
        this.$store.commit("bnbState/setData", {
          balancePool: this.balancePool,
        });
      }
    },
    //
    async getTotalStakeMbox() {
      let res = await Wallet.ETH.balanceOfToTargetFromAddr(
        WalletConfig.ETH.mboxToken,
        WalletConfig.ETH.momoVeMbox
      );
      this.$store.commit("bnbState/setData", { totalStakeMbox: res / 1e18 });
    },

    //
    async avglockdays() {
      let res = await Http.avglockdays();
      if (res) {
        this.$store.commit("bnbState/setData", {
          avglockdays: parseInt(res.avglockdays),
        });
      }
    },
    async getPools() {
      let pIndexObj = {};
      for (let key in PancakeConfig.StakeLP) {
        let { pIndex } = PancakeConfig.StakeLP[key];
        if (pIndex != 0 && pIndex != -1) {
          pIndexObj[pIndex] = key;
        }
      }
      let res = await Wallet.ETH.getPools(Object.keys(pIndexObj));
      let { veMboxTotal, poolVeMboxSupplys, poolAllocPoints } = res;
      Object.keys(pIndexObj).map((poolIndex, pos) => {
        let coinKey = pIndexObj[poolIndex];
        let coinObj = this.coinArr[coinKey];
        coinObj.veMboxTotal = veMboxTotal;
        coinObj.veMoboxSupply = poolVeMboxSupplys[pos];
        coinObj.addAllocPoint =
          poolAllocPoints[pos] / 100 -
          PancakeConfig.StakeLP[coinKey].allocPoint;
      });
      this.coinArr["ts"] = new Date().valueOf();
      this.$store.commit("bnbState/setData", {
        coinArr: this.coinArr,
        veMboxTotal,
      });
    },
    //
    async getVeMboxStakeInfo() {
      let pIndexObj = {};
      for (let key in PancakeConfig.StakeLP) {
        let { pIndex } = PancakeConfig.StakeLP[key];
        if (pIndex != 0 && pIndex != -1) {
          pIndexObj[pIndex] = key;
        }
      }
      //
      pIndexObj["100001"] = "GOV";
      let res = await Wallet.ETH.getVeMboxStakeInfo(Object.keys(pIndexObj));
      let booster = await Wallet.ETH.getBoosterInfo(Object.keys(pIndexObj));

      if (res) {
        let keyValues = Object.values(pIndexObj);
        //
        for (let key in this.coinArr) {
          if (key != "ts") {
            this.coinArr[key].veMbox.mul = 100;
            this.coinArr[key].veMbox.orderIndexs = {
              0: { stakeMbox: 0, endTime: 0, veMboxNum: 0 },
              1: { stakeMbox: 0, endTime: 0, veMboxNum: 0 },
              2: { stakeMbox: 0, endTime: 0, veMboxNum: 0 },
            };
            this.coinArr[key].veMbox.notice = false;

            //
            let keyPos = keyValues.indexOf(key);
            if (keyPos != -1) {
              this.coinArr[key].veMbox.mul = booster[keyPos];
            }
          }
        }

        let { poolIndexs, orderIndexs, moboxs, veMoboxs, lockTimeValues } = res;
        let totalVeMobox = 0;
        let canUseVeMbox = 0;
        poolIndexs.map((poolIndex, pos) => {
          let coinKey = pIndexObj[poolIndex];
          let orderIndex = orderIndexs[pos];
          let veMbox = this.coinArr[coinKey].veMbox;
          veMbox.orderIndexs[orderIndex].stakeMbox = moboxs[pos];
          veMbox.orderIndexs[orderIndex].veMboxNum = veMoboxs[pos];
          veMbox.orderIndexs[orderIndex].endTime = lockTimeValues[pos];
          let dt = lockTimeValues[pos] - parseInt(new Date().valueOf() / 1000);
          veMbox.notice = dt <= 0 && Number(moboxs[pos]) > 0;
          totalVeMobox += Number(veMoboxs[pos]);
          if (coinKey == "MBOX-BNB-V2" || coinKey == "GOV") {
            canUseVeMbox += Number(veMoboxs[pos]);
          }
        });
        this.coinArr["ts"] = new Date().valueOf();
        this.$store.commit("bnbState/setData", {
          coinArr: this.coinArr,
          canUseVeMbox: parseInt(canUseVeMbox / 1e18 + 0.00001),
          myTotalVeMbox: parseInt(totalVeMobox / 1e18 + 0.00001),
        });
      }
    },
    async getGemBag() {
      let gemBag = await Wallet.ETH.getMyGemNum();
      if (gemBag) {
        this.$store.commit("gemState/setData", { gemBag });
      }
    },
    async getCoinValue() {
      const address = await Wallet.ETH.getAccount();
      const list20 = ["0x0000000000000000000000000000000000000000"];
      const list1155 = [
        WalletConfig.ETH.crystalToken,
        WalletConfig.ETH.newBoxToken,
        WalletConfig.ETH.newBoxToken,
      ];
      const id1155 = [1, 1, 2];

      Object.keys(PancakeConfig.SelectCoin).forEach((key) => {
        const item = PancakeConfig.SelectCoin[key];

        if (key !== "MEC" && !!item.addr.length) {
          list20.push(item.addr);
        }
      });

      const res = await Wallet.ETH.bitsUtil.methods
        .balanceOfExt(address, list20, list1155, id1155)
        .call();
      const erc1155Amounts = res.erc1155Amounts;
      const erc20Amounts = res.erc20Amounts;
      const keys = Object.keys(PancakeConfig.SelectCoin);
      const bnbConfig = PancakeConfig.SelectCoin.BNB;

      this.coinArr["BNB"].balance = Common.numFloor(
        Number(erc20Amounts[0]) / bnbConfig.decimals,
        bnbConfig.omit
      );

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const { decimals, omit } = PancakeConfig.SelectCoin[key];
        const item = PancakeConfig.SelectCoin[key];

        if (key !== "MEC" && !!item.addr.length) {
          this.coinArr[key].balance = Common.numFloor(
            Number(erc20Amounts[index]) / decimals,
            omit
          );
        }
      }
      this.coinArr.MEC.balance = erc1155Amounts[0];
      this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
      this.$store.commit("userState/setData", {
        crystalNum: erc1155Amounts[0],
      });
      this.$store.commit("gemState/setData", { boxNum: erc1155Amounts[1] });
      this.$store.commit("userState/setData", { mecBoxNum: erc1155Amounts[2] });
    },

    async getBuyBack() {
      let res = await Http.buybackpool(this.buyBackType);
      if (res) {
        this.buyBack.amount = Common.numFloor(res.amount, 1);
        this.buyBack.avgPrice = Common.numFloor(res.avgPrice, 1e4);
        this.buyBack.moboxBurn = Common.numFloor(res.moboxBurn / 1e18, 1);
        this.buyBack.circulating = Common.numFloor(res.circulating / 1e18, 1);
        this.buyBack.logs = res.logs;
        this.$store.commit("bnbState/setData", { buyBack: this.buyBack });
      }
    },

    //
    async getStakeValueAndEarndKey() {
      let pIndexObj = {};
      for (let key in PancakeConfig.StakeLP) {
        let { pIndex } = PancakeConfig.StakeLP[key];
        if (pIndex != 0 && pIndex != -1) {
          pIndexObj[key] = pIndex;
        }
      }

      let res = await Wallet.ETH.getStakeValueAndEarndKey(
        Object.values(pIndexObj)
      );
      if (res) {
        let { gracePeriods, pkeys, wantAmounts, workingBalances, rewardStore } =
          res;
        let coinArr = Object.keys(pIndexObj);
        coinArr.map((coinKey, index) => {
          let { decimals, omit } = PancakeConfig.StakeLP[coinKey];
          this.coinArr[coinKey].earnedKey = Common.numFloor(
            Number(pkeys[index]) / decimals,
            1e4
          );
          this.coinArr[coinKey].gracePeriod = gracePeriods[index];
          this.coinArr[coinKey].wantAmount = Common.numFloor(
            Number(wantAmounts[index]) / decimals,
            omit
          );
          this.coinArr[coinKey].workingBalance = workingBalances[index];
        });
        this.coinArr["ts"] = new Date().valueOf();
        this.$store.commit("bnbState/setData", {
          coinArr: this.coinArr,
          rewardStoreKey: Common.numFloor(Number(rewardStore) / 1e18, 1e4),
        });
      }
    },

    async getApyObj(item) {
      await this.getPoolVeMobox(item.coinKey);
      let res = await Wallet.ETH.getUserPoolsApyParam([item.pIndex]);
      if (res) {
        let { keyPerDays, wantShares, workingSupply, totalShares } = res;
        let keyUsdt = await this.getCoinUsdt("MBOX");
        let { veMbox, totalSupply, myApy } = this.coinArr[item.coinKey];
        let mul = Number(veMbox.mul) / 100;
        let myKeyPerDay =
          (keyPerDays[0] * ((wantShares[0] * mul) / workingSupply[0])) / 1e18;
        let myUsdtPerDay = (keyUsdt / 1e18) * myKeyPerDay;
        let myStakeUsdt = totalSupply * (wantShares / totalShares);
        let myRealKeyApy = (myUsdtPerDay / myStakeUsdt) * 365;

        //
        let maxMul = 3;
        let diffShare = wantShares[0] * 3 - wantShares[0] * mul;
        let maxMyKeyPerDay =
          (keyPerDays[0] *
            ((wantShares[0] * maxMul) /
              (Number(workingSupply[0]) + diffShare))) /
          1e18;
        let maxMyUsdtPerDay = (keyUsdt / 1e18) * maxMyKeyPerDay;
        let maxmyRealKeyApy = (maxMyUsdtPerDay / myStakeUsdt) * 365;

        this.coinArr[item.coinKey].maxKeyApy = maxmyRealKeyApy;
        myApy.key = myRealKeyApy;
        // myApy.cake = (Number(apy.split("%")[0]) / 100) - allKeyApy;
        // myApy.xvs = (Number(apy.split("%")[0]) / 100) - allKeyApy;

        //
        let maxApyNeedVeMobox = 0;
        let coinObj = this.coinArr[item.coinKey];
        let { shareTotal, veMoboxSupply } = coinObj;

        let orderIndexs = veMbox.orderIndexs;
        let totalVeMobox =
          Number(orderIndexs[0].veMboxNum) +
          Number(orderIndexs[1].veMboxNum) +
          Number(orderIndexs[2].veMboxNum);

        let y = ((3 - 1) / 2) * (wantShares[0] / shareTotal);
        maxApyNeedVeMobox =
          ((y * (veMoboxSupply - totalVeMobox)) / (1 - y) - totalVeMobox) /
          1e18;
        if (
          veMoboxSupply == 0 ||
          veMoboxSupply <= totalVeMobox ||
          wantShares[0] >= Number(shareTotal)
        ) {
          maxApyNeedVeMobox = 0.1;
        }
        //
        if (wantShares[0] >= Number(shareTotal) && totalVeMobox > 0) {
          maxApyNeedVeMobox = 0;
        }
        if (Number(maxApyNeedVeMobox) < 0) maxApyNeedVeMobox = 0;

        this.coinArr[item.coinKey].maxApyNeedVeMobox = maxApyNeedVeMobox;
        this.coinArr["ts"] = new Date().valueOf();
        this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
      }
    },

    async getPoolVeMobox(coinKey) {
      let pIndex = PancakeConfig.StakeLP[coinKey].pIndex;
      let res = await Wallet.ETH.getPoolVeMobox(pIndex);
      this.coinArr[coinKey].shareTotal = res.shareTotal;
      this.coinArr[coinKey].veMoboxSupply = res.veMoboxSupply;
      this.coinArr[coinKey]["ts"] = new Date().valueOf();
    },

    async getCoinUsdt(coinName) {
      let wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
      let res = await Wallet.ETH.getAmountsOut(1e18, [
        PancakeConfig.SelectCoin[coinName].addr,
        wBNB,
        PancakeConfig.SelectCoin["USDT"].addr,
      ]);
      return res[2];
    },

    async getLPCoinValue(item) {
      let { coinName, coinKey, pancakeVType } = item;

      let coinArr = this.coinArr;
      let version = pancakeVType == 1 ? "V1" : "V2";

      let dtTime = new Date().valueOf() - coinArr[coinKey].lpPriceUpTs;
      if (coinName.indexOf("-") == -1 || dtTime < 5000) return;
      let tokenA = coinName.split("-")[0];
      let tokenB = coinName.split("-")[1];
      if (tokenA == undefined || tokenB == undefined) return;
      coinArr[coinKey].lpPriceUpTs = new Date().valueOf();
      let res = await SwapHttp.post("/pair/lpamount", {
        token0: tokenA,
        token1: tokenB,
        version,
      });
      let { data, code } = res.data;
      if (code == 200) {
        let reserve0 = Number(0);
        let reserve1 = Number(0);

        let { token0, token1, totalSupply } = data;
        if (token0.symbol.indexOf(tokenA) != -1) {
          reserve0 = Number(token0.reserve);
        }
        if (token1.symbol.indexOf(tokenB) != -1) {
          reserve1 = Number(token1.reserve);
        }

        let retObj = ["-", "-"];

        let lp = coinArr[coinKey].wantAmount;
        if (totalSupply == 0 || reserve0 == 0 || reserve1 == 0) return retObj;

        retObj[0] = Common.numFloor(
          (lp * reserve0) / totalSupply,
          PancakeConfig.SelectCoin[tokenA].omit
        );
        retObj[1] = Common.numFloor(
          (lp * reserve1) / totalSupply,
          PancakeConfig.SelectCoin[tokenB].omit
        );

        coinArr[coinKey].lpPrice = retObj;
        coinArr["ts"] = new Date().valueOf();
        this.$store.commit("bnbState/setData", { coinArr: coinArr });
      }
    },
    //
    async setBalance() {
      const address = await Wallet.ETH.getAccount();
      const list = [
        "0x0000000000000000000000000000000000000000",
        PancakeConfig.SelectCoin.MBOX.addr,
      ];

      Object.keys(PancakeConfig.StakeLP).forEach((key) => {
        const item = PancakeConfig.StakeLP[key];

        if (!!item.addr.length) {
          list.push(item.addr);
        }
      });

      const res = await Wallet.ETH.bitsUtil.methods
        .balanceOfExt(address, list, [], [])
        .call();
      const erc20Amounts = res.erc20Amounts;
      const keys = Object.keys(PancakeConfig.StakeLP);

      this.setCoinBalance("BNB", erc20Amounts[0]);
      this.setCoinBalance("MBOX", erc20Amounts[1]);

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const item = PancakeConfig.StakeLP[key];

        if (!!item.addr.length) {
          this.setCoinBalance(key, erc20Amounts[index + 2]);
        }
      }
    },
    setCoinBalance(coinKey, value) {
      const { decimals, omit } =
        coinKey.indexOf("-") != -1
          ? PancakeConfig.StakeLP[coinKey]
          : PancakeConfig.SelectCoin[coinKey];

      this.coinArr[coinKey].balance = Common.numFloor(
        Number(value) / decimals,
        omit
      );
      this.coinArr[coinKey].isApproving = false;
      this.coinArr[coinKey].isDeposing = false;
      this.coinArr[coinKey].isWithdrawing = false;
      this.coinArr["ts"] = new Date().valueOf();
      this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
    },
    //
    async setCoinValueByName(coinKey) {
      let { addr, decimals, omit } =
        coinKey.indexOf("-") != -1
          ? PancakeConfig.StakeLP[coinKey]
          : PancakeConfig.SelectCoin[coinKey];
      if (addr != "") {
        let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
        this.coinArr[coinKey].balance = Common.numFloor(
          Number(value) / decimals,
          omit
        );
        this.coinArr[coinKey].isApproving = false;
        this.coinArr[coinKey].isDeposing = false;
        this.coinArr[coinKey].isWithdrawing = false;
        this.coinArr["ts"] = new Date().valueOf();
        this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
      }
    },

    //
    async eth_setLockList() {
      let myAddr = await Wallet.ETH.getAccount();
      let lockList = await Http.getLockList(myAddr, "BNB");
      if (lockList) {
        this.$store.commit("ethState/setData", { lockList: lockList.list });
      }
    },

    //
    async setTotalOpenBox() {
      let res = await Http.getTotalOpenBox();
      if (res && res["bnb"]) {
        this.$store.commit("globalState/setChainTotalOpenBox", {
          chain: "bnb",
          num: Number(res["bnb"]["MintBox"]),
        });
      }
    },
    //
    async setOrder() {
      let order = await Wallet.ETH.getOrder();
      if (order) {
        this.$store.commit("ethState/setData", {
          canOpenBox: Number(order._boxAmount),
          orderBlockHash: order._blockHash,
        });
      }
    },
    //
    async eth_setStakeHistory() {
      let stakeHistory = await Wallet.ETH.getStakeHistory();

      if (history) {
        stakeHistory.map((item) => (item.state = 1));
        this.$store.commit("ethState/setData", {
          stakeHistory,
        });
      }
    },
    //
    async eth_setOpenBoxHistory() {
      let openBoxHistory = await Wallet.ETH.getOpenBoxHistory();
      if (history) {
        openBoxHistory.map((item) => (item.state = 1));
        this.$store.commit("ethState/setData", {
          openBoxHistory,
        });
      }
    },
    //
    async eth_setEarnedMbox() {
      let earnedMbox = await Wallet.ETH.getEarnedMobx();
      this.$store.commit("ethState/setData", {
        earnedMbox,
      });
    },
    //
    async eth_setMyHashrate() {
      let hashrate = await Wallet.ETH.getMyHashrate();
      this.$store.commit("ethState/setData", {
        myHashrate: hashrate,
      });
    },
    //
    async eth_setTotalHashrate() {
      let totalHashrate = await Wallet.ETH.getTotalHashrate();
      this.$store.commit("ethState/setData", {
        totalHashrate,
      });
    },
    //
    async eth_levelUpConfirm({ chain, tokenId, gotoLv }) {
      if (chain == "eth") {
        for (let key in this.myNFT_stake) {
          if (this.myNFT_stake[key].tokenId == tokenId) {
            this.myNFT_stake[key].level = gotoLv;
            break;
          }
        }
        this.eth_saveUpdate721();
        //
        // this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
        this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        this.$store.commit("ethState/setUpgradeLocks", { tokenId, time: 0 });
      }
    },

    //
    async eth_setNameConfirm({ chain, tokenId, name }) {
      if (chain == "eth") {
        for (let key in this.myNFT_stake) {
          if (this.myNFT_stake[key].tokenId == tokenId) {
            this.myNFT_stake[key].tokenName = name;
            break;
          }
        }
        this.eth_saveUpdate721();
      }
    },
    //
    async eth_openBoxHistory({ chain }) {
      if (chain == "eth") {
        this.eth_setOpenBoxHistory();
      }
    },
    //
    async eth_openBoxConfirm({ chain, hash }) {
      if (chain == "eth") {
        this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
        //
        await this.setOrder();
        //
        let { openBoxTemp } = this.ethState;
        openBoxTemp.map((item) => {
          if (item.tx == hash) item.state = 10;
        });
        this.$store.commit("ethState/setData", { openBoxTemp });
        this.$store.commit("globalState/unLockBtn", "openBoxLock");

        await this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        await this.eth_setMyHashrate();
      }
    },
    //
    async eth_saveUpdate721() {
      let account = await Wallet.ETH.getAccount();
      Common.setStorageItem(
        StorageConfig.myNFT_stake + "-" + account,
        JSON.stringify(this.myNFT_stake)
      );
    },
    //
    async eth_set1155IsApprovedFor721() {
      let isApproved = await Wallet.ETH.isApprovedForAllByTokenAddr_1155(
        WalletConfig.ETH.moMoToken
      );
      if (isApproved != null) {
        this.$store.commit("ethState/setData", {
          allowance_1155_to_721: Number(isApproved),
        });
      }
    },
    async eth_set1155IsApprovedForStake() {
      let isApproved = await Wallet.ETH.isApprovedForAllByTokenAddr_1155(
        WalletConfig.ETH.moMoStake
      );
      if (isApproved != null) {
        this.$store.commit("ethState/setData", {
          allowance_1155_to_stake: Number(isApproved),
        });
      }
    },
    //
    async eth_set721IsApprovedForStake() {
      let isApproved = await Wallet.ETH.isApprovedForAllByTokenAddr_721(
        WalletConfig.ETH.moMoStake
      );
      if (isApproved != null) {
        this.$store.commit("ethState/setData", {
          allowance_721_to_stake: Number(isApproved),
        });
      }
    },
    //
    async eth_setBoxAllowance() {
      let allowance = await Wallet.ETH.boxAllowanceToMinter();
      if (allowance != null) {
        this.$store.commit("ethState/setData", {
          allowance_box_to_minter: allowance,
        });
      }
    },
    //
    async eth_setBalance() {
      let balance = await Wallet.ETH.getMyBalance();
      if (balance != null) {
        this.$store.commit("ethState/setData", {
          balance,
        });
      }
    },
    //
    async eth_setBox() {
      let myKey = await Wallet.ETH.getErc20BalanceByTokenAddr(
        WalletConfig.ETH.boxToken,
        false
      );
      if (myKey != null) {
        this.$store.commit("ethState/setData", {
          box: Common.numFloor(myKey / BigNumber(1e18), 100),
        });
      }
    },
    //
    async setMyNftByType(type, needRemoveGem = true) {
      //
      let account = await Wallet.ETH.getAccount();
      let key = "myNFT_" + type;
      let storageKey = StorageConfig[key] + "-" + account;

      let ntfStorage = Common.getStorageItem(storageKey);
      let saveObj = {};
      saveObj[key] = JSON.parse(ntfStorage);
      if (ntfStorage != null) {
        //
        if (needRemoveGem) {
          saveObj[key].map((item) => {
            item.gems = [0, 0, 0, 0];
          });
        }
        this.$store.commit("ethState/setData", saveObj);
      }
      let nftObj = await Wallet.ETH.getMomosByType(type);
      if (nftObj != null) {
        saveObj[key] = nftObj;
        //
        await this.setName(nftObj);
        //
        await this.setGem(nftObj);
        //
        await this.setRentInfo(nftObj);
        this.$store.commit("ethState/setData", saveObj);
        Common.setStorageItem(storageKey, JSON.stringify(nftObj));
      }
    },

    async setRentInfo(nftArr) {
      let tokenIds = [];
      nftArr.map((item) => {
        if (item.tokenId != 0) {
          tokenIds.push(item.tokenId);
        }
      });
      let res = await Wallet.ETH.Group.Rent.getRentInfoSimple(tokenIds);

      nftArr.map((item) => {
        let tokenPos = tokenIds.indexOf(item.tokenId);
        if (tokenPos != -1) {
          item.rent.orderId = res.orderIdArray[tokenPos];
          item.rent.status = res.statusArray[tokenPos];
          item.rent.rentTime = res.rentTimeArray[tokenPos];
          item.rent.startTime = res.startTimeArray[tokenPos];
          item.rent.state = this.getMomoState(item.rent);
        }
      });
    },

    getMomoState(rentInfo) {
      let { startTime, status, rentTime } = rentInfo;
      if (startTime == "-") return -2; //
      if (startTime == 0) return -1; //
      if (status == 0) {
        return 0; //
      } else {
        if (Number(rentTime) < parseInt(new Date().valueOf() / 1000)) {
          return -1;
        } else {
          return 1; //
        }
      }
    },

    //
    async setName(nftArr) {
      //
      let needGetNameArr = [];
      nftArr.map(({ speciality, tokenId }) => {
        if (speciality == 3 || speciality == 1) {
          needGetNameArr.push(tokenId);
        }
      });

      let names = await Wallet.ETH.getMomoNamesByTokenIds(needGetNameArr);
      nftArr.map((item) => {
        let tokenPos = needGetNameArr.indexOf(item.tokenId);
        if (tokenPos != -1 && names[tokenPos] != "") {
          item.tokenName = names[tokenPos];
        }
      });
    },
    async setGem(nftArr) {
      let needGetGemArr = [];
      nftArr.map(({ vType, tokenId }) => {
        if (vType >= 4) {
          needGetGemArr.push(Number(tokenId));
        }
      });
      let gems = await Wallet.ETH.getBatchInlayInfo(needGetGemArr);

      nftArr.map((item) => {
        let gemPos = needGetGemArr.indexOf(Number(item.tokenId));
        if (gemPos != -1) {
          item.gems = [...gems[gemPos]];
          // item.gems[0] = "101"
          // item.gems[1] = "105"
          // item.gems[2] = "108"
          // item.gems[3] = "109"
        }
      });
    },

    //
    removeStakeGem(momoId, pos) {
      this.myNFT_stake.map((item) => {
        if (item.tokenId == momoId) {
          item.gems[pos] = 0;
        }
      });
      this.$store.commit("ethState/setData", { myNFT_stake: this.myNFT_stake });
    },
  },
};
export default InitEth;
