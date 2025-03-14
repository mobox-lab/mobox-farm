import Web3 from "web3";
import Rpc from "./Rpc";
import Contract from "./Contract";
import PancakSwapContract from "./PancakSwapContract";
import { EventBus, Common, Http } from "@/utils";
import {
  EventConfig,
  WalletConfig,
  BaseConfig,
  ConstantConfig,
  PancakeConfig,
} from "@/config";
import MecSwap from "./MecSwap";
import BigNumber from "bignumber.js";
import Gem from "./group/Gem";
import MdxBox from "./group/MdxBox";
import Enhancer from "./group/Enhancer";
import Rent from "./group/Rent";
import BinaceNFT from "./group/BinaceNFT";
import MoMoSetting from "./group/MoMoSetting";
import BigSell from "./group/BigSell";
import Transfer from "./group/Transfer";
import Furnace from "./Furnace";
import AvatarHelper from "./Avatar";

export default class ETH {
  static web3;
  static web3MainNet;

  static Group = {
    Gem,
    MdxBox,
    Enhancer,
    Rent,
    BinaceNFT,
    MoMoSetting,
    BigSell,
    Transfer,
  };

  //
  static boxTokenContract;
  static moMoMinterContract;
  static moMoTokenContract;
  static moMoMTokenContract;
  static momoHelperContract;
  static momoStakeContract;
  static pancakeSwapContract;
  static pancakeSwapContracV2;
  static mecSwapContrac;
  static mecSwapPairContrac;
  static avatarHelper;
  static anniversaryHomeland;
  static anniversaryHashrate;
  static anniversaryClaimPrizes;
  //
  static furnace;

  static myAddr = "";

  static async init() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(Rpc.apiNode));
    this.web3MainNet = new Web3(
      new Web3.providers.HttpProvider(Rpc.apiNodeMainNet)
    );
    this.initContract();
  }

  static logoutWallet() {
    //
    if (this.web3)
      this.web3.setProvider(new Web3.providers.HttpProvider(Rpc.apiNode));
  }

  static changeWeb3(provider) {
    if (this.web3 && provider != null) this.web3.setProvider(provider);
  }

  static async getNetwork() {
    let res = await window.ethereum.send("net_version");
    if (res) {
      return res.result;
    }
  }
  static async getBlockNumber() {
    let res = await this.web3.eth.getBlockNumber();
    return res;
  }
  static async getBlockInfo(blockNumber) {
    let res = await this.web3.eth.getBlock(blockNumber);
    return res;
  }
  //
  static parseEvent(data, topic, eventAbi) {
    let targetRaw;
    Object.values(data.events).map((item) => {
      if (item.raw.topics[0].toLocaleLowerCase() == topic.toLocaleLowerCase()) {
        targetRaw = item.raw;
      }
    });
    return ETH.web3.eth.abi.decodeLog(
      eventAbi,
      targetRaw.data,
      targetRaw.topics.slice(1)
    );
  }
  //
  static initContract() {
    this.boxTokenContract = new this.web3.eth.Contract(
      [Contract.approve, Contract.allowance],
      WalletConfig.ETH.boxToken
    );
    this.moMoMinterContract = new this.web3.eth.Contract(
      [
        Contract.buyBox,
        Contract.addBox,
        Contract.addMysteryBox,
        Contract.mint,
        Contract.getOrder,
      ],
      WalletConfig.ETH.moMoMinter
    );
    this.moMoTokenContract = new this.web3.eth.Contract(
      [
        Contract.levelUp,
        Contract.getMomoName,
        Contract.getMomoStory,
        Contract.setMomoName,
        Contract.addMomoStory,
        Contract.isApprovedForAll,
        Contract.setApprovalForAll,
        Contract.getMomoByTokenId,
      ],
      WalletConfig.ETH.moMoToken
    );
    this.moMoMTokenContract = new this.web3.eth.Contract(
      [
        Contract.balanceOfOneBatch,
        Contract.isApprovedForAll,
        Contract.setApprovalForAll,
      ],
      WalletConfig.ETH.moMoMToken
    );
    this.momoHelperContract = new this.web3.eth.Contract(
      [
        Contract.getMomosWallet,
        Contract.getMomosVerse,
        Contract.getMomosStake,
        Contract.getMomosAuction,
        Contract.getMomoNames,
        Contract.getUserFarmInfos,
        Contract.userStakerShow,
      ],
      WalletConfig.ETH.moMoHelper
    );
    this.momoStakeContract = new this.web3.eth.Contract(
      [
        Contract.stake,
        Contract.withdrawMomo,
        Contract.getReward,
        Contract.earned,
        Contract.userHashrate,
        Contract.totalHashrate,
        Contract.mintAndStake,
        Contract.levelUpStake,
        Contract.setMomoName,
        Contract.addMomoStory,
      ],
      WalletConfig.ETH.moMoStake
    );

    this.momoStakeContract_verse = new this.web3.eth.Contract(
      [
        Contract.stake,
        Contract.withdrawMomo,
        Contract.getReward,
        Contract.earned,
        Contract.userHashrate,
        Contract.totalHashrate,
        Contract.mintAndStake,
        Contract.levelUpStake,
        Contract.setMomoName,
        Contract.addMomoStory,
        Contract.tokensOfOwner,
        Contract.recallAll,
      ],
      WalletConfig.ETH.momoVerse
    );

    this.pancakeSwapContract = new this.web3.eth.Contract(
      [
        PancakSwapContract.approve,
        PancakSwapContract.allowance,
        PancakSwapContract.addLiquidity,
        PancakSwapContract.removeLiquidity,
        PancakSwapContract.addLiquidityETH,
        PancakSwapContract.removeLiquidityETH,
        PancakSwapContract.swapExactETHForTokens,
        PancakSwapContract.swapETHForExactTokens,
        PancakSwapContract.swapExactTokensForETH,
        PancakSwapContract.swapTokensForExactETH,
        PancakSwapContract.swapExactTokensForTokens,
        PancakSwapContract.swapTokensForExactTokens,
      ],
      PancakeConfig.SwapRouterAddr
    );
    this.pancakeSwapContracV2 = new this.web3.eth.Contract(
      [
        PancakSwapContract.approve,
        PancakSwapContract.getAmountsOut,
        PancakSwapContract.allowance,
        PancakSwapContract.addLiquidity,
        PancakSwapContract.removeLiquidity,
        PancakSwapContract.addLiquidityETH,
        PancakSwapContract.removeLiquidityETH,
        PancakSwapContract.swapExactETHForTokens,
        PancakSwapContract.swapETHForExactTokens,
        PancakSwapContract.swapExactTokensForETH,
        PancakSwapContract.swapTokensForExactETH,
        PancakSwapContract.swapExactTokensForTokens,
        PancakSwapContract.swapTokensForExactTokens,
      ],
      PancakeConfig.SwapRouterAddrV2
    );

    //
    this.mecSwapContrac = new this.web3.eth.Contract(
      [
        MecSwap.approve,
        MecSwap.getAmountsIn,
        MecSwap.getAmountsOut,
        MecSwap.allowance,
        MecSwap.addLiquidity,
        MecSwap.removeLiquidity,
        MecSwap.swapExactETHForTokens,
        MecSwap.swapETHForExactTokens,
        MecSwap.swapExactTokensForETH,
        MecSwap.swapTokensForExactETH,
        MecSwap.swapExactTokensForTokens,
        MecSwap.swapTokensForExactTokens,
        MecSwap.getReserves,
      ],
      PancakeConfig.MecSwap
    );

    this.mecSwapPairContrac = new this.web3.eth.Contract(
      [MecSwap.getPairInfo],
      PancakeConfig.MecSwapPair
    );

    // bitsUtil
    this.bitsUtil = new this.web3.eth.Contract(
      [
        {
          name: "balanceOfExt",
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "address[]",
              name: "erc20s",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "erc1155s",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "erc1155Ids",
              type: "uint256[]",
            },
          ],
          outputs: [
            {
              internalType: "uint256[]",
              name: "erc20Amounts",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "erc1155Amounts",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      WalletConfig.ETH.bitsUtil
    );

    //
    this.furnace = new this.web3.eth.Contract(
      [
        Furnace.testMerge,
        Furnace.getOrder,
        Furnace.beginMerge,
        Furnace.endMerge,
      ],
      "0x935E8f512c262e4f98e2e5f3538970D43CD44320"
    );

    //
    this.avatarHelper = new this.web3.eth.Contract(
      [AvatarHelper.getFirstAvatar],
      WalletConfig.ETH.avatarHelper
    );

    //
    this.anniversaryHomeland = new this.web3.eth.Contract(
      [Contract.claimAirdrop, Contract.isClaimedAirdrop],
      "0xB8B487AEB3D10A36dE04079Af304ABce410D71A2"
    );

    //
    this.anniversaryHashrate = new this.web3.eth.Contract(
      [Contract.claimAirdrop, Contract.isClaimedAirdrop],
      "0x2438b25157ba0e87DF77c0A0ffb0FeB884B14192"
    );

    //
    this.anniversaryClaimPrizes = new this.web3.eth.Contract(
      [Contract.claimAirdrop, Contract.isClaimedAirdrop],
      "0x4D62D743affEDA8499e19BAE058D8255E30B845e"
    );
  }

  //
  static sendMethod(method, sendAttr, onHash, onRecipt, onError = () => {}) {
    if (Common.store.state.globalState.data.chainNetwork != 56) {
      Common.app.showNotify(Common.app.$t("Common_23"), "error");
      return;
    }
    Common.store.commit("globalState/setwalletStatus", { status: 1 });
    Common.oprDialog("wallet-opr-dialog", "block");
    method.value = sendAttr.value;
    method.myAddr = sendAttr.from;
    sendAttr.gasPrice = 3.001e9;

    let saveHash;

    let type = Common.getStorageItem("connect-wallet");
    //
    if (type == "walletConnect" && Common.walletConnectConnector) {
      let tx = {
        from: sendAttr.from,
        to: method._parent._address,
        data: method.encodeABI(),
        value: sendAttr.value || "0x0",
      };
      Common.walletConnectConnector
        .sendTransaction(tx)
        .then((hash) => {
          onHash(hash);
          saveHash = hash;
          Common.store.commit("globalState/setwalletStatus", {
            status: 3,
            hash,
          });
          let t = 0;
          let timer = setInterval(() => {
            t++;
            if (t < 60) {
              this.web3.eth.getTransactionReceipt(hash).then((data) => {
                if (!data) return;
                if (data.status) {
                  onRecipt(data);
                  this.onReciptNotice(hash, method, "success");
                } else {
                  Common.store.commit("globalState/setwalletStatus", {
                    status: 2,
                  });
                  this.onReciptNotice(hash, method, "error");
                }
                clearInterval(timer);
              });
            } else {
              clearInterval(timer);
            }
          }, 2000);
        })
        .catch((err) => {
          console.log("err:", err);
          // Error returned when rejected
          onError();

          let type = Common.getStorageItem("connect-wallet");
          if (type == "mboxWallet") {
            Common.store.commit("globalState/setwalletStatus", { status: 2 });
          }
          //
          Common.store.commit("bnbState/clearLoading");

          //
          if (err.message && err.message.indexOf("-32603") != -1) {
            return;
          }

          //
          if (err.toString().indexOf("eth_getTransactionReceipt") != -1) {
            return;
          }

          //
          if (err.code == 4001) {
            Common.store.commit("globalState/setwalletStatus", { status: 2 });
            return;
          }
          //
          if (err.code == -32603) {
            Common.app.showNotify("intrinsic gas too low", "error");
            Common.store.commit("globalState/setwalletStatus", { status: 2 });
            return;
          }

          if (saveHash) {
            this.onReciptNotice(saveHash, method, "error");
          }

          Common.store.commit("globalState/setwalletStatus", { status: 2 });
        });
      return;
    }

    method
      .send(sendAttr)
      .on("transactionHash", (hash) => {
        onHash(hash);
        saveHash = hash;
        Common.store.commit("globalState/setwalletStatus", { status: 3, hash });
        // Common.app.showNotify(Common.app.$t("BOX_20"), "success");
      })
      .on("error", (err) => {
        console.info("error: ", err);
        onError();

        let type = Common.getStorageItem("connect-wallet");
        if (type == "mboxWallet") {
          Common.store.commit("globalState/setwalletStatus", { status: 2 });
        }
        //
        Common.store.commit("bnbState/clearLoading");

        //
        if (err.message && err.message.indexOf("-32603") != -1) {
          return;
        }

        //
        if (err.toString().indexOf("eth_getTransactionReceipt") != -1) {
          return;
        }

        //
        if (err.code == 4001) {
          Common.store.commit("globalState/setwalletStatus", { status: 2 });
          return;
        }
        //
        if (err.code == -32603) {
          Common.app.showNotify("intrinsic gas too low", "error");
          Common.store.commit("globalState/setwalletStatus", { status: 2 });
          return;
        }

        if (saveHash) {
          this.onReciptNotice(saveHash, method, "error");
        }

        // Common.app.showNotifyTrans(Common.app.$t("Common_19"), saveHash, "error");
        Common.store.commit("globalState/setwalletStatus", { status: 2 });
      })
      .on("receipt", (data) => {
        onRecipt(data);
        this.onReciptNotice(saveHash, method, "success");
      });
  }

  static async signStr(dataToSign) {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let walletType = Common.getStorageItem("connect-wallet");

    if (walletType == "walletConnect") {
      let res = await Common.walletConnectConnector.signMessage([
        myAddr,
        dataToSign,
      ]);
      return res;
    }

    if (walletType == "metamask") {
      return new Promise((resolve) => {
        try {
          window.web3.personal.sign(dataToSign, myAddr, async (err, res) => {
            if (!err) {
              resolve(res);
            }
          });
        } catch (error) {
          window.ethereum
            .request({
              method: "personal_sign",
              params: [myAddr, dataToSign],
            })
            .then((res) => {
              resolve(res);
            });
        }
      });
    }

    if (walletType == "binanceChain") {
      let res = await window.BinanceChain.request({
        jsonrpc: "2.0",
        method: "eth_sign",
        params: [myAddr, dataToSign],
      });
      return res;
    }

    if (walletType == "mboxWallet") {
      return new Promise((resolve) => {
        window.mbox.bscWeb3.personal.sign(
          dataToSign,
          myAddr,
          async (err, res) => {
            if (!err) {
              resolve(res);
            }
          }
        );
      });
    }
  }

  static onReciptNotice(hash, method, type) {
    console.log(hash, method, type);
    //
    let methodName = method._method.name;
    let _arguments = method.arguments;
    let myAddr = method.myAddr;
    let msg =
      type == "success"
        ? Common.app.$t("Air-drop_111")
        : Common.app.$t("Common_19");
    let needSave = false;

    //Swap BNB to Token
    if (
      ["swapExactETHForTokens", "swapETHForExactTokens"].indexOf(methodName) !=
      -1
    ) {
      let fromName = "BNB";
      let toName = "";
      let fromValue = BigNumber(method.value);
      let toValue = BigNumber(_arguments[0]);

      let path = _arguments[1];
      for (let key in PancakeConfig.SelectCoin) {
        if (
          PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==
          path[path.length - 1].toLocaleUpperCase()
        ) {
          toName = key;
        }
      }
      fromValue = Common.numFloor(
        BigNumber(fromValue).dividedBy(BigNumber(1e18)),
        1e8
      );
      toValue = Common.numFloor(
        BigNumber(toValue).dividedBy(BigNumber(1e18)),
        1e8
      );
      msg = `Swap ${fromValue} ${fromName} for ${toValue} ${toName}`;
      needSave = true;
    }
    //Swap Token to BNB
    if (
      ["swapExactTokensForETH", "swapTokensForExactETH"].indexOf(methodName) !=
      -1
    ) {
      let fromName = "";
      let toName = "BNB";
      let fromValue =
        methodName == "swapTokensForExactETH"
          ? BigNumber(_arguments[1])
          : BigNumber(_arguments[0]);
      let toValue =
        methodName == "swapTokensForExactETH"
          ? BigNumber(_arguments[0])
          : BigNumber(_arguments[1]);

      let path = _arguments[2];
      for (let key in PancakeConfig.SelectCoin) {
        if (
          PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==
          path[0].toLocaleUpperCase()
        ) {
          fromName = key;
        }
      }
      fromValue = Common.numFloor(
        BigNumber(fromValue).dividedBy(BigNumber(1e18)),
        1e8
      );
      toValue = Common.numFloor(
        BigNumber(toValue).dividedBy(BigNumber(1e18)),
        1e8
      );
      msg = `Swap ${fromValue} ${fromName} for ${toValue} ${toName}`;
      needSave = true;
    }
    //Swap Token to token
    console.log("-----", methodName);
    if (
      ["swapExactTokensForTokens", "swapTokensForExactTokens"].indexOf(
        methodName
      ) != -1
    ) {
      console.log("=============");
      let fromName = "";
      let toName = "";
      let fromValue =
        methodName == "swapTokensForExactTokens"
          ? BigNumber(_arguments[1])
          : BigNumber(_arguments[0]);
      let toValue =
        methodName == "swapTokensForExactTokens"
          ? BigNumber(_arguments[0])
          : BigNumber(_arguments[1]);

      let path = Array.isArray(_arguments[2]) ? _arguments[2] : _arguments[3];
      for (let key in PancakeConfig.SelectCoin) {
        if (
          PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==
          path[0].toLocaleUpperCase()
        ) {
          fromName = key;
        }
        if (
          PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==
          path[path.length - 1].toLocaleUpperCase()
        ) {
          toName = key;
        }
      }

      if (fromName === "MEC") {
        fromValue = Number(fromValue);
        toValue = Common.numFloor(
          BigNumber(toValue).dividedBy(BigNumber(1e18)),
          1e8
        );
      } else if (toName === "MEC") {
        fromValue = Common.numFloor(
          BigNumber(fromValue).dividedBy(BigNumber(1e18)),
          1e8
        );
        toValue = Number(toValue);
      } else {
        fromValue = Common.numFloor(
          BigNumber(fromValue).dividedBy(BigNumber(1e18)),
          1e8
        );
        toValue = Common.numFloor(
          BigNumber(toValue).dividedBy(BigNumber(1e18)),
          1e8
        );
      }
      msg = `Swap ${fromValue} ${fromName} for ${toValue} ${toName}`;
      needSave = true;
    }
    //Add Token & BNB || Remove Token & Token
    if (["addLiquidityETH", "removeLiquidityETH"].indexOf(methodName) != -1) {
      let fromName = "";
      let toName = "BNB";
      let fromValue = BigNumber(_arguments[2]);
      let toValue = BigNumber(_arguments[3]);

      for (let key in PancakeConfig.SelectCoin) {
        if (
          PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==
          _arguments[0].toLocaleUpperCase()
        ) {
          fromName = key;
        }
      }
      fromValue = Common.numFloor(
        BigNumber(fromValue).dividedBy(BigNumber(1e18)),
        1e8
      );
      toValue = Common.numFloor(
        BigNumber(toValue).dividedBy(BigNumber(1e18)),
        1e8
      );
      let action = methodName == "addLiquidityETH" ? "Add" : "Remove";
      msg = `${action} ${fromValue} ${fromName} and ${toValue} ${toName}`;
      needSave = true;
    }
    //Add Token & Token || Remove Token & Token
    if (["addLiquidity", "removeLiquidity"].indexOf(methodName) != -1) {
      let fromName = "MBOX";
      let toName = "MEC";
      let fromValue, action;
      let toValue = Number(_arguments[5]);

      // for (let key in PancakeConfig.SelectCoin) {
      // 	if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==_arguments[0].toLocaleUpperCase()){
      // 		fromName = key;
      // 	}
      // 	if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==_arguments[1].toLocaleUpperCase()){
      // 		toValue = key;
      // 	}
      // }
      if (methodName == "addLiquidity") {
        fromValue = BigNumber(_arguments[5]);
        action = "Add";
      } else {
        fromValue = BigNumber(_arguments[4]);
        action = "Remove";
      }
      fromValue = Common.numFloor(
        BigNumber(fromValue).dividedBy(BigNumber(1e18)),
        1e8
      );
      msg = `${action} ${fromValue} ${fromName} and ${toValue} ${toName}`;
      needSave = true;
    }

    Common.app.showNotifyTrans(msg, hash, type);
    if (needSave) {
      let history = Common.getStorageItem("pancake-history-" + myAddr);
      let histoyJSON = [];
      if (history != undefined) {
        histoyJSON = JSON.parse(history);
      }
      histoyJSON.push({ msg, hash, type });
      Common.setStorageItem(
        "pancake-history-" + myAddr,
        JSON.stringify(histoyJSON)
      );
      //
      Common.store.commit("bnbState/setData", { pancakeHistory: histoyJSON });
    }
  }

  //
  static async getAccount(needShowConnect = false) {
    if (this.myAddr != "") return this.myAddr;
    return new Promise((resolve) => {
      if (Common.app) {
        if (needShowConnect) {
          Common.app.oprDialog("connect-wallet-dialog", "block");
        }
      }
      let t = setInterval(() => {
        if (this.myAddr != "") {
          resolve(this.myAddr);
          clearInterval(t);
        }
      }, 1000);
    });
  }
  //
  static async approveBoxToMinter() {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.boxTokenContract) return;
    return new Promise((resolve) => {
      this.sendMethod(
        this.boxTokenContract.methods.approve(
          WalletConfig.ETH.moMoMinter,
          "0x" + Common.repeat("f", 64)
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          await Common.app.eth_setBoxAllowance();
          Common.store.commit("globalState/unLockBtn", "approveLock");
        }
      );
    });
  }
  //
  static async boxAllowanceToMinter() {
    let myAddr = await this.getAccount();
    if (!myAddr) return -1;
    if (!this.boxTokenContract) return -1;
    return new Promise((resolve) => {
      this.boxTokenContract.methods
        .allowance(myAddr, WalletConfig.ETH.moMoMinter)
        .call()
        .then((res) => {
          resolve(res);
        });
    });
  }

  //
  static async getRewardKey(pIndexArr) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return null;

    let contract = new this.web3.eth.Contract(
      [Contract.getRewardKey],
      WalletConfig.ETH.momoFarm
    );

    if (pIndexArr.length == 0) pIndexArr = [1];

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.getReward(pIndexArr),
        { from: myAddr },
        resolve,
        () => {
          console.log("getRewardKey success");
          Common.app.getStakeValueAndEarndKey();
          Common.app.setCoinValueByName("MBOX");
          Common.app.unLockBtn("getKeyLock");
        }
      );
    });
  }
  //
  static async getStakeValueAndEarndKey(pIndexArr) {
    let myAddr = await this.getAccount();
    if (!myAddr) return null;
    if (!this.momoHelperContract) return null;
    return new Promise((resolve) => {
      this.momoHelperContract.methods
        .getUserFarmInfos(pIndexArr, myAddr)
        .call()
        .then((res) => {
          resolve(res);
        });
    });
  }
  //
  static async viewErcAllowanceToTarget(
    fromAddr,
    targetAddr,
    isMainNet = true
  ) {
    let myAddr = await this.getAccount();

    if (!myAddr) return -1;

    let contract;
    if (isMainNet) {
      contract = new this.web3MainNet.eth.Contract(
        [Contract.allowance],
        fromAddr
      );
    } else {
      contract = new this.web3.eth.Contract([Contract.allowance], fromAddr);
    }

    return new Promise((resolve) => {
      contract.methods
        .allowance(myAddr, targetAddr)
        .call()
        .then((res) => {
          resolve(res);
        });
    });
  }
  //
  static async approveErcToTarget(
    fromAddr,
    targetAddr,
    approveInfo = { coinKey: "", type: "" }
  ) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.approve, Contract.allowance],
      fromAddr
    );

    return new Promise((resolve) => {
      Common.app.showRiskNotice(() => {
        this.sendMethod(
          contract.methods.approve(targetAddr, "0x" + Common.repeat("f", 64)),
          { from: myAddr },
          (hash) => resolve(hash),
          () => {
            let { coinKey, type } = approveInfo;
            console.log("recipt", approveInfo);
            if (coinKey != "") {
              Common.store.commit("bnbState/setCoinAllowance", {
                coinKey,
                allowance: 1.157920892373162e77,
                type,
              });
            }
          }
        );
      });
    });
  }
  //
  static async approveErcToTargetOnRecipt(fromAddr, targetAddr, recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.approve, Contract.allowance],
      fromAddr
    );
    return new Promise((resolve) => {
      Common.app.showRiskNotice(() => {
        this.sendMethod(
          contract.methods.approve(targetAddr, "0x" + Common.repeat("f", 64)),
          { from: myAddr },
          (hash) => resolve(hash),
          () => {
            recipt();
          }
        );
      });
    });
  }
  //
  static async balanceOfToTarget(targetAddr) {
    let myAddr = await this.getAccount();
    if (!myAddr) return;

    let contract = new this.web3MainNet.eth.Contract(
      [Contract.balanceOf],
      targetAddr
    );

    return new Promise((resolve) => {
      contract.methods
        .balanceOf(myAddr)
        .call()
        .then((res) => {
          resolve(BigNumber(res));
        });
    });
  }
  //
  static async balanceOfToTargetFromAddr(targetAddr, fromAddr) {
    let contract = new this.web3MainNet.eth.Contract(
      [Contract.balanceOf],
      targetAddr
    );

    return new Promise((resolve) => {
      contract.methods
        .balanceOf(fromAddr)
        .call()
        .then((res) => {
          resolve(BigNumber(res));
        });
    });
  }
  //
  static async getPricePerFullShare(targetAddr) {
    return new Promise((resolve, reject) => {
      try {
        let contract = new this.web3MainNet.eth.Contract(
          [Contract.getPricePerFullShare],
          targetAddr
        );
        contract.methods
          .getPricePerFullShare()
          .call()
          .then((res) => {
            resolve(BigNumber(res));
          });
      } catch (error) {
        reject(1e18);
      }
    });
  }
  //
  static async viewEarned(targetAddr) {
    let myAddr = await this.getAccount();
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract([Contract.earned], targetAddr);

    return new Promise((resolve) => {
      contract.methods
        .earned(myAddr)
        .call()
        .then((res) => {
          resolve(res);
        });
    });
  }
  //
  static async viewTotalAirdrop(targetAddr) {
    let contract = new this.web3.eth.Contract(
      [Contract.rewardRate],
      targetAddr
    );

    return new Promise((resolve) => {
      contract.methods
        .rewardRate()
        .call()
        .then((res) => {
          resolve(res);
        });
    });
  }
  //
  static async viewTotalSupply(targetAddr) {
    let contract = new this.web3MainNet.eth.Contract(
      [Contract.totalSupply],
      targetAddr
    );

    return new Promise((resolve) => {
      contract.methods
        .totalSupply()
        .call()
        .then((res) => {
          resolve(res);
        });
    });
  }
  //
  static async getChestBox(pIndexArr, amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.getChestBox],
      WalletConfig.ETH.momoFarm
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.getChestBox(pIndexArr, amount),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("getChestBox success");
          Common.app.getStakeValueAndEarndKey();
          Common.app.setOrder();
          Common.app.unLockBtn("getKeyLock");
        }
      );
    });
  }

  //
  static async getMyBalance() {
    let myAddr = await this.getAccount();
    if (!myAddr) return 0;
    let balance = await Rpc.getEthBalance(myAddr);
    return Common.numFloor(parseInt(balance) / 1e18, 10000);
  }
  //
  static async getBalance() {
    let myAddr = await this.getAccount();
    if (!myAddr) return 0;
    let balance = await this.web3.eth.getBalance(myAddr);
    return Common.numFloor(parseInt(balance) / 1e18, 10000);
  }

  static async getErc20BalanceByTokenAddr(tokenAddr, isMainNet = true) {
    let myAddr = await this.getAccount();
    if (!myAddr) return 0;
    let contract;
    if (isMainNet) {
      contract = new this.web3MainNet.eth.Contract(
        [Contract.balanceOf],
        tokenAddr
      );
    } else {
      contract = new this.web3.eth.Contract([Contract.balanceOf], tokenAddr);
    }

    return new Promise((resolve) => {
      contract.methods
        .balanceOf(myAddr)
        .call()
        .then((res) => {
          resolve(BigNumber(res));
        });
    });
  }

  //
  static async getTargetBalancefromTokenAddr(targetAddr, tokenAddr) {
    let contract = new this.web3.eth.Contract([Contract.balanceOf], tokenAddr);
    return new Promise((resolve) => {
      contract.methods
        .balanceOf(targetAddr)
        .call()
        .then((res) => {
          resolve(BigNumber(res));
        });
    });
  }

  //
  static async addMysteryBox(amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.moMoMinterContract) return;

    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoMinterContract.methods.addMysteryBox(myAddr, amount),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.getNewBoxNum();
        }
      );
    });
  }
  //
  static async addBox(amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.moMoMinterContract) return;

    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoMinterContract.methods.addBox(myAddr, amount),
        { from: myAddr },
        (hash) => resolve(hash)
      );
    });
  }
  //
  static async openBox(amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.moMoMinterContract) return;
    let transactionHash = "";

    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoMinterContract.methods.mint(myAddr, amount),
        { from: myAddr },
        (hash) => {
          transactionHash = hash;
          resolve(hash);
        },
        (receiptData) => {
          EventBus.$emit(EventConfig.OpenBoxConfirm, {
            chain: "eth",
            hash: receiptData.transactionHash,
          });
        },
        () => {
          EventBus.$emit(EventConfig.OpenBoxFail, {
            chain: "eth",
            hash: transactionHash,
          });
        }
      );
    });
  }
  //
  static async openBoxAndStake(amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.momoStakeContract) return;
    let transactionHash = "";
    return new Promise((resolve) => {
      this.sendMethod(
        this.momoStakeContract.methods.mintAndStake(amount),
        { from: myAddr },
        (hash) => {
          transactionHash = hash;
          resolve(hash);
        },
        (receiptData) => {
          EventBus.$emit(EventConfig.OpenBoxConfirm, {
            chain: "eth",
            hash: receiptData.transactionHash,
          });
        },
        () => {
          EventBus.$emit(EventConfig.OpenBoxFail, {
            chain: "eth",
            hash: transactionHash,
          });
        }
      );
    });
  }

  //
  static async getOrder() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    if (!this.moMoMinterContract) return;

    // myAddr = "0xa4219fA95C45C5fD2a20D08090e8636C8b0235Af";
    return new Promise((resolve) => {
      this.moMoMinterContract.methods
        .getOrder(myAddr)
        .call()
        .then((getOrderRes) => {
          resolve(getOrderRes);
        });
    });
  }
  //
  static async isApprovedForAllByTokenAddr_1155(tokenAddr) {
    let myAddr = await this.getAccount();
    if (!myAddr) return null;
    if (!this.moMoMTokenContract) return null;
    return new Promise((resolve) => {
      this.moMoMTokenContract.methods
        .isApprovedForAll(myAddr, tokenAddr)
        .call()
        .then((isApproved) => {
          resolve(isApproved);
        });
    });
  }

  //
  static async approve1155ToTargetToken(tokenAddr) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return null;
    if (!this.moMoMTokenContract) return null;
    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoMTokenContract.methods.setApprovalForAll(tokenAddr, true),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.eth_set1155IsApprovedForStake();
          Common.app.unLockBtn("approveLock");
        }
      );
    });
  }
  //
  static async isApprovedForAllByTokenAddr_721(tokenAddr) {
    let myAddr = await this.getAccount();
    if (!myAddr) return null;
    if (!this.moMoTokenContract) return null;
    return new Promise((resolve) => {
      this.moMoTokenContract.methods
        .isApprovedForAll(myAddr, tokenAddr)
        .call()
        .then((isApproved) => {
          resolve(isApproved);
        });
    });
  }
  //
  static async approve721ToTargetToken(tokenAddr) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return null;
    if (!this.moMoTokenContract) return null;
    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoTokenContract.methods.setApprovalForAll(tokenAddr, true),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.eth_set721IsApprovedForStake();
          Common.app.unLockBtn("approveLock");
        }
      );
    });
  }

  //
  static async isApprovedForAll(fromToken, toToken) {
    let myAddr = await this.getAccount();
    if (!myAddr) return null;

    let contract = new this.web3.eth.Contract(
      [Contract.isApprovedForAll],
      fromToken
    );
    return new Promise((resolve) => {
      contract.methods
        .isApprovedForAll(myAddr, toToken)
        .call()
        .then((isApproved) => {
          resolve(isApproved);
        });
    });
  }
  //
  static async approvedForAll(fromToken, toToken, recipet) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return null;

    let contract = new this.web3.eth.Contract(
      [Contract.setApprovalForAll],
      fromToken
    );
    console.log({ fromToken, toToken });
    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.setApprovalForAll(toToken, true),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.unLockBtn("approveLock");
          recipet();
        }
      );
    });
  }

  static async getAll721ByAddr(addr) {
    let prototype_1155_arr = [];
    return new Promise((resolve) => {
      this.momoHelperContract.methods
        .getMomosStake(addr, prototype_1155_arr)
        .call()
        .then((momosObj) => {
          resolve(
            this.generateNftObj(momosObj, ConstantConfig.NFT_LOCATION.STAKE)
          );
        });
    });
  }

  //
  static async getAll721Status() {
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getLimits",
          type: "function",
          inputs: [{ name: "protoIdArray_", type: "uint256[]" }],
          outputs: [{ name: "limits", type: "uint256[]" }],
        },
      ],
      WalletConfig.ETH.moMoHelper3
    );

    let prototype_721_arr = [];
    for (const key in BaseConfig.NftCfg) {
      let { prototype } = BaseConfig.NftCfg[key];
      if (prototype > 40000 && prototype < 60000) {
        prototype_721_arr.push(prototype);
      }
    }

    return new Promise((resolve) => {
      contract.methods
        .getLimits(prototype_721_arr)
        .call()
        .then((res) => {
          let returnObj = {};
          res.map((item, key) => {
            // if(Number(prototype_721_arr[key]) > 50080 && Number(item) == 0){
            // 	returnObj[prototype_721_arr[key]] = 50;
            // }else{
            returnObj[prototype_721_arr[key]] = item;
            // }
          });
          resolve(returnObj);
        });
    });
  }

  //
  static async getMomosByType(type) {
    let myAddr = await this.getAccount();
    if (!myAddr) return null;
    if (!this.momoHelperContract) return null;
    //
    let prototype_1155_arr = [];
    for (let key in BaseConfig.NftCfg) {
      let { prototype, quality } = BaseConfig.NftCfg[key];
      if (quality < 4) {
        prototype_1155_arr.push(prototype);
      }
    }
    // myAddr = "0xF4858431927211c890E3C982848F096d518d009f";
    return new Promise((resolve) => {
      switch (type) {
        case ConstantConfig.NFT_LOCATION.WALLET:
          this.momoHelperContract.methods
            .getMomosWallet(myAddr, prototype_1155_arr)
            .call()
            .then((momosObj) => {
              resolve(
                this.generateNftObj(
                  momosObj,
                  ConstantConfig.NFT_LOCATION.WALLET
                )
              );
            });
          break;
        case ConstantConfig.NFT_LOCATION.STAKE:
          this.momoHelperContract.methods
            .getMomosStake(myAddr, prototype_1155_arr)
            .call()
            .then((momosObj) => {
              resolve(
                this.generateNftObj(momosObj, ConstantConfig.NFT_LOCATION.STAKE)
              );
            });
          break;
        case ConstantConfig.NFT_LOCATION.AUCTION:
          this.momoHelperContract.methods
            .getMomosAuction(myAddr)
            .call()
            .then((momosObj) => {
              console.log(
                "AUCTION",
                this.generateNftObj(
                  momosObj,
                  ConstantConfig.NFT_LOCATION.AUCTION
                )
              );
              resolve(
                this.generateNftObj(
                  momosObj,
                  ConstantConfig.NFT_LOCATION.AUCTION
                )
              );
            });
          break;
        case ConstantConfig.NFT_LOCATION.VERSE:
          this.momoHelperContract.methods
            .getMomosVerse(myAddr, prototype_1155_arr)
            .call()
            .then((momosObj) => {
              resolve(
                this.generateNftObj(momosObj, ConstantConfig.NFT_LOCATION.VERSE)
              );
            });
          break;
        default:
          console.log("error type...");
          break;
      }
    });
  }

  //
  static generateNftObj({ _ids, _amounts, _tokenIds, _attrs }, location) {
    let erc1155Obj = [];
    let erc721Obj = [];
    //
    _ids.map((item, key) => {
      let { tokenName, quality, category } = BaseConfig.NftCfg[item];
      erc1155Obj.push({
        prototype: item,
        vType: parseInt(item / 1e4),
        num: Number(_amounts[key]),
        tokenId: 0,
        level: 1,
        category,
        tokenName: tokenName,
        quality,
        hashrate: quality,
        lvHashrate: quality,
        chain: "bnb",
        location,
        gems: [0, 0, 0, 0],
        inGroupSellCar: false,
        groupSellPrice: "",
      });
    });

    //
    erc1155Obj.sort((a, b) => b.prototype - a.prototype);
    //
    _tokenIds.map((item, key) => {
      let itemAttr = _attrs.slice(key * 7, (key + 1) * 7);
      erc721Obj.push({
        tokenId: item,
        prototype: itemAttr[0],
        vType: parseInt(itemAttr[0] / 1e4),
        quality: itemAttr[1],
        category: itemAttr[2],
        level: Number(itemAttr[3]),
        speciality: itemAttr[4],
        hashrate: Number(itemAttr[5]),
        lvHashrate: Number(itemAttr[6]),
        num: 1,
        chain: "bnb",
        tokenName: BaseConfig.NftCfg[itemAttr[0]]
          ? BaseConfig.NftCfg[itemAttr[0]]["tokenName"]
          : "",
        location,
        gems: [0, 0, 0, 0],
        inGroupSellCar: false,
        groupSellPrice: "",
        rent: {
          orderId: "-",
          status: "-",
          rentTime: "-",
          currentRentDays: "-",
          state: -2, //
        },
      });
    });

    //
    // erc721Obj.sort((a, b) =>
    // 	b.lvHashrate - a.lvHashrate
    // );

    return [...erc721Obj, ...erc1155Obj];
  }

  //
  static async getMomoNamesByTokenIds(tokenIds) {
    if (!this.momoHelperContract) return "";
    return new Promise((resolve) => {
      this.momoHelperContract.methods
        .getMomoNames(tokenIds)
        .call()
        .then((names) => {
          let retNames = [];
          names.map((item) => retNames.push(this.web3.utils.hexToUtf8(item)));
          resolve(retNames);
        });
    });
  }

  //
  static async getMomoNameByTokenId(tokenId) {
    if (!this.moMoTokenContract) return "";
    return new Promise((resolve) => {
      this.moMoTokenContract.methods
        .getMomoName(tokenId)
        .call()
        .then((name) => {
          name = name || "";
          if (name == "") {
            resolve("");
          } else {
            resolve(this.web3.utils.hexToUtf8(name) || "");
          }
        });
    });
  }
  //
  static async setMomoNameByTokenId(tokenId, name, isFirst) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.moMoTokenContract) return;
    console.log(this.web3.utils.utf8ToHex(name).length);
    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoTokenContract.methods.setMomoName(
          tokenId,
          this.web3.utils.utf8ToHex(name)
        ),
        { from: myAddr, value: isFirst ? 0 : 0.05e18 },
        (hash) => resolve(hash),
        () => {
          Common.app.eth_setNameConfirm({ chain: "eth", tokenId, name });
        }
      );
    });
  }
  static getStrLen(str) {
    return (this.web3.utils.utf8ToHex(str).length - 2) / 2;
  }
  //
  static async setMomoStoryByTokenId(tokenId, story, isFirst) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.moMoTokenContract) return;
    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoTokenContract.methods.addMomoStory(
          tokenId,
          this.web3.utils.utf8ToHex(story)
        ),
        { from: myAddr, value: isFirst ? 0 : 0.05e18 },
        (hash) => resolve(hash),
        () => {
          EventBus.$emit(EventConfig.SetStoryConfirm);
        }
      );
    });
  }
  //
  static async getMomoStoryByTokenId(tokenId) {
    if (!this.moMoTokenContract) return [];
    return new Promise((resolve) => {
      this.moMoTokenContract.methods
        .getMomoStory(tokenId, 0, 1)
        .call()
        .then((res) => {
          console.log(res);
          resolve(res._storys);
        });
    });
  }
  //
  static async upgrade(
    gotoLv,
    tokenId,
    protosV1V2V3 = [],
    amountsV1V2V3 = [],
    tokensV4V5 = []
  ) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.moMoTokenContract) return;
    return new Promise((resolve) => {
      //
      protosV1V2V3.map((item, index) => (protosV1V2V3[index] = Number(item)));
      tokensV4V5.map((item, index) => (tokensV4V5[index] = Number(item)));

      this.sendMethod(
        this.moMoTokenContract.methods.levelUp(
          tokenId,
          protosV1V2V3,
          amountsV1V2V3
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          EventBus.$emit(EventConfig.LevelUpConfirm, {
            chain: "eth",
            gotoLv,
            tokenId,
          });
        }
      );
    });
  }
  //
  static async upgradeStake(
    gotoLv,
    tokenId,
    protosV1V2V3 = [],
    amountsV1V2V3 = [],
    tokensV4V5 = [],
    isMoMoVerse = false
  ) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    let constract = isMoMoVerse
      ? this.momoStakeContract_verse
      : this.momoStakeContract;
    if (!constract) return;
    return new Promise((resolve) => {
      //
      protosV1V2V3.map((item, index) => (protosV1V2V3[index] = Number(item)));
      tokensV4V5.map((item, index) => (tokensV4V5[index] = Number(item)));

      console.log({ protosV1V2V3 }, { amountsV1V2V3 }, { tokensV4V5 });

      this.sendMethod(
        constract.methods.levelUp(tokenId, protosV1V2V3, amountsV1V2V3),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          EventBus.$emit(EventConfig.LevelUpConfirm, {
            chain: "eth",
            gotoLv,
            tokenId,
          });
          if (isMoMoVerse) {
            Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
          }
        }
      );
    });
  }

  //
  static async stakeNft(erc1155ids, erc1155Num, erc721TokenIds) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.momoStakeContract) return;
    return new Promise((resolve) => {
      this.sendMethod(
        this.momoStakeContract.methods.stake(
          erc1155ids,
          erc1155Num,
          erc721TokenIds
        ),
        { from: myAddr },
        (hash) => {
          resolve(hash);
        },
        async () => {
          console.log("stake success!!!!!");
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
          await Common.app.eth_setMyHashrate();
          Common.app.unLockBtn("stakeLock");
        }
      );
    });
  }
  //
  static async unStakeNft(erc1155ids, erc1155Num, erc721TokenIds) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.momoStakeContract) return;
    return new Promise((resolve) => {
      this.sendMethod(
        this.momoStakeContract.methods.withdraw(
          erc1155ids,
          erc1155Num,
          erc721TokenIds
        ),
        { from: myAddr },
        (hash) => {
          resolve(hash);
        },
        async () => {
          console.log("unStakeNft success!!!!!");
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
          await Common.app.eth_setMyHashrate();
          Common.app.unLockBtn("unStekeLock");
        }
      );
    });
  }
  //
  static async getMyHashrate() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    if (!this.momoStakeContract) return;
    return new Promise((resolve) => {
      this.momoStakeContract.methods
        .userHashrate(myAddr)
        .call()
        .then((hashrate) => {
          resolve(Number(hashrate));
        });
    });
  }
  //
  static async getTotalHashrate() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    if (!this.momoStakeContract) return;
    return new Promise((resolve) => {
      this.momoStakeContract.methods
        .totalHashrate()
        .call()
        .then((hashrate) => {
          resolve(Number(hashrate));
        });
    });
  }
  //
  static async getEarnedMobx() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    if (!this.momoStakeContract) return;
    return new Promise((resolve) => {
      this.momoStakeContract.methods
        .earned(myAddr)
        .call()
        .then((mobox) => {
          resolve(Common.numFloor(mobox / 1e18, 1000));
        });
    });
  }
  //
  static async takeEarnedMbox() {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.momoStakeContract) return;
    return new Promise((resolve) => {
      this.sendMethod(
        this.momoStakeContract.methods.getReward(),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("getReward success!!!!!");
          await Common.app.setCoinValueByName("MBOX");
          await Common.app.eth_setEarnedMbox();
          await Common.app.getPoolsEarns();
          Common.app.unLockBtn("getMboxLock");
        }
      );
    });
  }

  //
  static async getSuggestIndex() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.getSuggestIndex],
      WalletConfig.ETH.moMoStakeAuction
    );

    return new Promise((resolve) => {
      contract.methods
        .getSuggestIndex(myAddr)
        .call()
        .then((_suggestIndex) => {
          resolve(_suggestIndex);
        });
    });
  }
  //
  static async createAuction({
    _startPrice,
    _endPrice,
    _durationDay,
    _suggestIndex,
    _tokenId = 0,
    _ids = [],
    _amounts = [],
  }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.createAuction],
      WalletConfig.ETH.moMoStakeAuction
    );

    let saveHash;

    _startPrice = BigNumber(Common.numFloor(_startPrice, 1e9)).times(
      BigNumber(1e18)
    );
    _endPrice = BigNumber(Common.numFloor(_endPrice, 1e9)).times(
      BigNumber(1e18)
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.createAuction(
          this.numToHex(_startPrice),
          this.numToHex(_endPrice),
          _durationDay,
          _suggestIndex,
          _tokenId,
          _ids,
          _amounts
        ),
        { from: myAddr },
        (hash) => {
          saveHash = hash;
          resolve(hash);
        },
        () => {
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        },
        () => {
          EventBus.$emit(EventConfig.CreateAuctionError, {
            chain: "eth",
            hash: saveHash,
          });
        }
      );
    });
  }

  //
  static async createAuctionBatch({
    suggestIndex_,
    tokenIds_,
    prices721_,
    ids_,
    prices1155_,
  }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "createAuctionBatch",
          type: "function",
          inputs: [
            { name: "suggestIndex_", type: "uint256" },
            { name: "tokenIds_", type: "uint256[]" },
            { name: "prices721_", type: "uint256[]" },
            { name: "ids_", type: "uint256[]" },
            { name: "prices1155_", type: "uint256[]" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.moMoStakeAuction
    );

    prices721_.map(
      (item, index) =>
        (prices721_[index] = this.numToHex(
          BigNumber(Common.numFloor(item, 1e9)).times(BigNumber(1e18))
        ))
    );
    prices1155_.map(
      (item, index) =>
        (prices1155_[index] = this.numToHex(
          BigNumber(Common.numFloor(item, 1e9)).times(BigNumber(1e18))
        ))
    );

    let saveHash;
    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.createAuctionBatch(
          suggestIndex_,
          tokenIds_,
          prices721_,
          ids_,
          prices1155_
        ),
        { from: myAddr },
        (hash) => {
          saveHash = hash;
          resolve(hash);
        },
        () => {
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        },
        () => {
          EventBus.$emit(EventConfig.CreateAuctionError, {
            chain: "eth",
            hash: saveHash,
          });
        }
      );
    });
  }

  static numToHex(num) {
    return "0x" + BigNumber(num).toString(16);
  }

  //
  static async buyMarketPet(_auctor, _index, coinKey, _startTime, _price) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.bid],
      WalletConfig.ETH.moMoStakeAuction
    );

    _price = BigNumber(Number(_price) + 0.0001 * 1e9).times(BigNumber(1e9));

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.bid(
          _auctor,
          _index,
          _startTime,
          this.numToHex(_price)
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("buyMarketPet success!!!!!");
          EventBus.$emit(EventConfig.BidPetSuccess, { chain: "eth", coinKey });
          await Common.app.setCoinValueByName(coinKey);
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
          Common.app.unLockBtn("buyMomoLock");
        }
      );
    });
  }

  //
  static async buyMarketPets(
    _auctors,
    _indexs,
    coinKey,
    _startTimes,
    _prices,
    ignoreSold
  ) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "bid",
          type: "function",
          inputs: [
            { name: "auctors_", type: "address[]" },
            { name: "indexs_", type: "uint256[]" },
            { name: "startTimes_", type: "uint256[]" },
            { name: "prices_", type: "uint256[]" },
            { name: "ignoreSold", type: "bool" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.moMoStakeAuction
    );

    _prices.map(
      (item, index) =>
        (_prices[index] = this.numToHex(
          BigNumber(Number(item) + 0.0001 * 1e9).times(BigNumber(1e9))
        ))
    );
    console.log({ _auctors, _indexs, _startTimes, _prices });

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.bid(
          _auctors,
          _indexs,
          _startTimes,
          _prices,
          ignoreSold
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("buyMarketPets success!!!!!");
          await Common.app.setCoinValueByName(coinKey);
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        }
      );
    });
  }

  //
  static async bidBatch(auctors, orderIds, amounts, skipSoldOrder) {
    const address = await this.getAccount(true);

    if (!address) return;

    console.log(WalletConfig.ETH);
    console.log(arguments);

    const contract = new this.web3.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "address[]",
              name: "auctors_",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "orderIds_",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts_",
              type: "uint256[]",
            },
            {
              internalType: "bool",
              name: "skipSoldOrder_",
              type: "bool",
            },
          ],
          name: "bidBatch",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      WalletConfig.ETH.bidBatch
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.bidBatch(auctors, orderIds, amounts, !!skipSoldOrder),
        { from: address },
        (hash) => resolve(hash),
        async () => {}
      );
    });
  }

  //
  static async cancelAuction(_index) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.cancelAuction],
      WalletConfig.ETH.moMoStakeAuction
    );

    let saveHash;

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.cancelAuction(_index),
        { from: myAddr },
        (hash) => {
          saveHash = hash;
          resolve(hash);
        },
        () => {
          console.log("cancelAuction success!!!!!");
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        },
        () => {
          EventBus.$emit(EventConfig.CancelAuctionError, {
            chain: "eth",
            hash: saveHash,
          });
        }
      );
    });
  }

  //
  static async changePrice({ index, startPrice, endPrice, durationDays }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.changePrice],
      WalletConfig.ETH.moMoStakeAuction
    );

    startPrice = BigNumber(Common.numFloor(startPrice, 1e9)).times(
      BigNumber(1e18)
    );
    endPrice = BigNumber(Common.numFloor(endPrice, 1e9)).times(BigNumber(1e18));

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.changePrice(
          index,
          this.numToHex(startPrice),
          this.numToHex(endPrice),
          Number(durationDays)
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("changePrice success!!!!!");
          EventBus.$emit(EventConfig.ChangePriceSuccess, { chain: "eth" });
          Common.app.unLockBtn("changePriceLock");
        }
      );
    });
  }

  //
  static async getMarketOrder(auctor, index) {
    let contract = new this.web3.eth.Contract(
      [Contract.getMarketOrder],
      WalletConfig.ETH.moMoStakeAuction
    );

    return new Promise((resolve) => {
      contract.methods
        .getOrder(auctor, index)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getStakeHistory() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let data = await Http.getStakeHistory("BNB", myAddr);
    return data.list;
  }

  //
  static async getOpenBoxHistory() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let data = await Http.getOpenBoxHistory("BNB", myAddr);
    return data.list;
  }

  // static async withdraw

  static async deposit(coinKey, amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.deposit, Contract.depositBNB],
      WalletConfig.ETH.momoFarm
    );

    let { pIndex, decimals } = PancakeConfig.StakeLP[coinKey];
    let amountHex = this.numToHex(
      BigNumber(Common.numFloor(amount, 1e8)).times(decimals)
    );

    console.log({ pIndex, amountHex });

    return new Promise((resolve) => {
      let method = contract.methods.deposit(pIndex, amountHex);
      let value = this.numToHex(0);
      if (coinKey == "BNB") {
        method = contract.methods.deposit(pIndex);
        value = amountHex;
      }
      this.sendMethod(
        method,
        { from: myAddr, value },
        (hash) => resolve(hash),
        () => {
          console.log("deposit success!!!!!");
          EventBus.$emit(EventConfig.DepositOrWithdrawConfirm, {
            chain: "eth",
          });
          Common.app.getStakeValueAndEarndKey();
        }
      );
    });
  }

  //
  static async withdraw(coinKey, amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    //
    let contract = new this.web3.eth.Contract(
      [Contract.withdrawCoin],
      WalletConfig.ETH.momoFarm
    );

    console.log({ coinKey, amount });

    let { pIndex, decimals } = PancakeConfig.StakeLP[coinKey];
    let amountHex = this.numToHex(
      BigNumber(Common.numFloor(amount, 1e8)).times(decimals)
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.withdraw(pIndex, amountHex),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("withdraw success!!!!!");
          Common.app.getStakeValueAndEarndKey();
          Common.app.setCoinValueByName(coinKey);
        }
      );
    });
  }

  //
  static async buyBox(amount) {
    console.log("buyBox", amount);
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    if (!this.moMoMinterContract) return;

    return new Promise((resolve) => {
      this.sendMethod(
        this.moMoMinterContract.methods.buyBox(amount),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("buyBox success!!!!!");
        }
      );
    });
  }

  //
  //
  static async removeLiquidity(coinItemObj, liquidity, targetLPPrice, setting) {
    console.log(coinItemObj, liquidity, targetLPPrice, setting);
    let { coinName, coinKey } = coinItemObj;
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let coinObj = coinName.split("-");
    const isMec = coinName.indexOf("MEC") != -1;
    let selectCoinA = PancakeConfig.SelectCoin[coinObj[0]];
    let selectCoinB = PancakeConfig.SelectCoin[coinObj[1]];
    let LPObj = PancakeConfig.StakeLP[coinKey];
    let duration = Number(setting.duration) || 20;
    let slippage = Number(setting.slippage) || 0.5;

    let method;
    let tokenA = selectCoinA.addr;
    let tokenB = selectCoinB.addr;
    liquidity = this.numToHex(BigNumber(liquidity).times(1e18));

    let amountAMin = this.numToHex(
      BigNumber(Common.numFloor(targetLPPrice[0] * (1 - slippage / 100), 1e8))
        .times(isMec ? 1 : 0.97)
        .times(selectCoinA.decimals)
    );
    let amountBMin = targetLPPrice[1] * (1 - slippage / 100);

    if (isMec) {
      amountBMin = this.numToHex(BigNumber(Math.floor(amountBMin)));
    } else {
      amountBMin = this.numToHex(
        BigNumber(Common.numFloor(amountBMin, 1e8))
          .times(0.97)
          .times(selectCoinB.decimals)
      );
    }

    let deadline = parseInt(new Date().valueOf() / 1000) + 60 * duration;

    let PancakeSwapContract =
      setting.pancakeVType == 1
        ? this.pancakeSwapContract
        : this.pancakeSwapContracV2;

    //
    if (coinName.indexOf("BNB") != -1) {
      let token = coinObj[0] == "BNB" ? tokenB : tokenA;
      let amountTokenMin = coinObj[0] == "BNB" ? amountBMin : amountAMin;
      let amountETHMin = coinObj[0] == "BNB" ? amountAMin : amountBMin;

      method = PancakeSwapContract.methods.removeLiquidityETH(
        token,
        liquidity,
        amountTokenMin,
        amountETHMin,
        myAddr,
        deadline
      );
    } else if (isMec) {
      console.log(
        tokenA,
        tokenB,
        1,
        liquidity,
        amountAMin,
        amountBMin,
        myAddr,
        deadline
      );
      method = this.mecSwapContrac.methods.removeLiquidity(
        tokenA,
        tokenB,
        1,
        liquidity,
        amountAMin,
        amountBMin,
        myAddr,
        deadline
      );
    } else {
      method = PancakeSwapContract.methods.removeLiquidity(
        tokenA,
        tokenB,
        liquidity,
        amountAMin,
        amountBMin,
        myAddr,
        deadline
      );
    }

    return new Promise((resolve) => {
      this.sendMethod(
        method,
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("removeLiquidity success!!!!!");
          Common.store.commit("bnbState/clearLoading");
          EventBus.$emit(EventConfig.AddLiquiditySuccess);
          EventBus.$emit(EventConfig.SwapSuccess);
        }
      );
    });
  }

  //
  static async addLiquidity(from, to, setting) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let fromCoinCfg = PancakeConfig.SelectCoin[from.coinName];
    let toCoinCfg = PancakeConfig.SelectCoin[to.coinName];
    let method;
    let callValue = this.numToHex(0);
    let duration = Number(setting.duration) || 20;
    let slippage = Number(setting.slippage) || 0.5;
    let decimals_to = BigNumber(toCoinCfg.decimals);
    let decimals_from = BigNumber(fromCoinCfg.decimals);

    let deadline = parseInt(new Date().valueOf() / 1000) + 60 * duration;
    let tokenA = fromCoinCfg.addr;
    let tokenB = toCoinCfg.addr;
    let amountADesired = this.numToHex(
      BigNumber(Common.numFloor(from.inputValue, 1e8)).times(decimals_from)
    );
    let amountBDesired = this.numToHex(
      BigNumber(Common.numFloor(to.inputValue, 1e8)).times(decimals_to)
    );
    let amountAMin = this.numToHex(
      BigNumber(
        Common.numFloor(from.inputValue * (1 - slippage / 100), 1e8)
      ).times(decimals_from)
    );
    let amountBMin = this.numToHex(
      BigNumber(
        Common.numFloor(to.inputValue * (1 - slippage / 100), 1e8)
      ).times(decimals_to)
    );

    let PancakeSwapContract =
      setting.pancakeVType == 1
        ? this.pancakeSwapContract
        : this.pancakeSwapContracV2;

    if (from.coinName != "BNB" && to.coinName != "BNB") {
      method = PancakeSwapContract.methods.addLiquidity(
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        myAddr,
        deadline
      );
    } else {
      let token = from.coinName == "BNB" ? tokenB : tokenA;
      let amountTokenDesired =
        from.coinName == "BNB" ? amountBDesired : amountADesired;
      let amountTokenMin = from.coinName == "BNB" ? amountBMin : amountAMin;
      let amountETHMin = from.coinName == "BNB" ? amountAMin : amountBMin;
      method = PancakeSwapContract.methods.addLiquidityETH(
        token,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
        myAddr,
        deadline
      );
      callValue = from.coinName == "BNB" ? amountADesired : amountBDesired;
    }

    return new Promise((resolve) => {
      this.sendMethod(
        method,
        { from: myAddr, value: callValue },
        (hash) => resolve(hash),
        () => {
          console.log("addLiquidity success!!!!!");
          Common.store.commit("bnbState/clearLoading");
          EventBus.$emit(EventConfig.AddLiquiditySuccess);
          EventBus.$emit(EventConfig.SwapSuccess);
        }
      );
    });
  }

  //
  static async addMecLiquidity(from, to, setting) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let fromCoinCfg = PancakeConfig.SelectCoin[from.coinName];
    let toCoinCfg = PancakeConfig.SelectCoin[to.coinName];
    let callValue = this.numToHex(0);
    let duration = Number(setting.duration) || 20;
    let slippage = Number(setting.slippage) || 0.5;
    let decimals_to = BigNumber(toCoinCfg.decimals);
    let decimals_from = BigNumber(fromCoinCfg.decimals);

    let deadline = parseInt(new Date().valueOf() / 1000) + 60 * duration;
    let tokenA = fromCoinCfg.addr;
    let tokenB = toCoinCfg.addr;
    let amountADesired = this.numToHex(
      BigNumber(Common.numFloor(from.inputValue, 1e8)).times(decimals_from)
    );
    let amountAMin = this.numToHex(
      BigNumber(
        Common.numFloor(from.inputValue * (1 - slippage / 100), 1e8)
      ).times(decimals_from)
    );
    let amountBDesired, amountBMin;

    if (to.coinName === "MEC") {
      amountBDesired = this.numToHex(BigNumber(Math.floor(to.inputValue)));
      amountBMin = this.numToHex(
        BigNumber(Math.floor(to.inputValue * (1 - slippage / 100)))
      );
    } else {
      amountBDesired = this.numToHex(
        BigNumber(Common.numFloor(to.inputValue, 1e8)).times(decimals_to)
      );
      amountBMin = this.numToHex(
        BigNumber(
          Common.numFloor(to.inputValue * (1 - slippage / 100), 1e8)
        ).times(decimals_to)
      );
    }

    console.log(
      tokenA,
      tokenB,
      1,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      myAddr,
      deadline
    );

    const method = this.mecSwapContrac.methods.addLiquidity(
      tokenA,
      tokenB,
      1,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      myAddr,
      deadline
    );

    return new Promise((resolve) => {
      this.sendMethod(
        method,
        { from: myAddr, value: callValue },
        (hash) => resolve(hash),
        () => {
          console.log("addLiquidity success!!!!!");
          Common.store.commit("bnbState/clearLoading");
          EventBus.$emit(EventConfig.AddLiquiditySuccess);
          EventBus.$emit(EventConfig.SwapSuccess);
        }
      );
    });
  }

  //
  static async goSwap(from, to, path, setting) {
    console.log({ from });
    console.log({ to });
    console.log({ path });
    console.log({ setting });
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let method;
    let callValue = this.numToHex(0);
    let duration = Number(setting.duration) || 20;
    let slippage = Number(setting.slippage) || 0.5;
    let decimals_to = BigNumber(PancakeConfig.SelectCoin[to.coinName].decimals);
    let decimals_from = BigNumber(
      PancakeConfig.SelectCoin[from.coinName].decimals
    );

    let deadline = parseInt(new Date().valueOf() / 1000) + 60 * duration;
    let amountIn = this.numToHex(
      BigNumber(Common.numFloor(from.inputValue, 1e8)).times(decimals_from)
    );
    let amountInMax = this.numToHex(
      BigNumber(
        Common.numFloor(from.inputValue * (1 + slippage / 100), 1e8)
      ).times(decimals_from)
    );
    let amountOut = this.numToHex(
      BigNumber(Common.numFloor(to.inputValue, 1e8)).times(decimals_to)
    );
    let amountOutMin = this.numToHex(
      BigNumber(
        Common.numFloor(to.inputValue * (1 - slippage / 100), 1e8)
      ).times(decimals_to)
    );

    let PancakeSwapContract =
      setting.pancakeVType == 1
        ? this.pancakeSwapContract
        : this.pancakeSwapContracV2;

    if (from.coinName == "BNB" || to.coinName == "BNB") {
      //
      if (from.coinName == "BNB") {
        if (to.isEstimated) {
          method = PancakeSwapContract.methods.swapExactETHForTokens(
            amountOutMin,
            path,
            myAddr,
            deadline
          );
          callValue = amountIn;
        }

        if (from.isEstimated) {
          method = PancakeSwapContract.methods.swapETHForExactTokens(
            amountOut,
            path,
            myAddr,
            deadline
          );
          callValue = amountInMax;
        }
      }

      //
      if (to.coinName == "BNB") {
        if (to.isEstimated) {
          method = PancakeSwapContract.methods.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            myAddr,
            deadline
          );
        }
        if (from.isEstimated) {
          method = PancakeSwapContract.methods.swapTokensForExactETH(
            amountOut,
            amountInMax,
            path,
            myAddr,
            deadline
          );
        }
      }
    } else {
      if (to.isEstimated) {
        method = PancakeSwapContract.methods.swapExactTokensForTokens(
          amountIn,
          amountOutMin,
          path,
          myAddr,
          deadline
        );
      }
      if (from.isEstimated) {
        method = PancakeSwapContract.methods.swapTokensForExactTokens(
          amountOut,
          amountInMax,
          path,
          myAddr,
          deadline
        );
      }
    }

    return new Promise((resolve) => {
      this.sendMethod(
        method,
        { from: myAddr, value: callValue },
        (hash) => resolve(hash),
        () => {
          console.log("swap success!!!!!");
          Common.store.commit("bnbState/clearLoading");
          EventBus.$emit(EventConfig.SwapSuccess);
        }
      );
    });
  }

  //
  static async swapMec(from, to, path, setting) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let method;
    let callValue = this.numToHex(0);
    let duration = Number(setting.duration) || 20;
    let slippage = Number(setting.slippage) || 0.5;
    let decimals_to = BigNumber(PancakeConfig.SelectCoin[to.coinName].decimals);
    let decimals_from = BigNumber(
      PancakeConfig.SelectCoin[from.coinName].decimals
    );

    let deadline = parseInt(new Date().valueOf() / 1000) + 60 * duration;
    let amountIn = this.numToHex(
      BigNumber(Common.numFloor(from.inputValue, 1e8)).times(decimals_from)
    );
    let amountOut = this.numToHex(
      BigNumber(Common.numFloor(to.inputValue, 1e8)).times(decimals_to)
    );
    let amountInMax, amountOutMin;

    const PancakeSwapContract = this.mecSwapContrac;

    if (to.isEstimated && to.coinName === "MEC") {
      amountOutMin = this.numToHex(
        BigNumber(Math.floor(to.inputValue * (1 - slippage / 100)))
      );
      amountInMax = this.numToHex(
        BigNumber(
          Common.numFloor(from.inputValue * (1 + slippage / 100), 1e8)
        ).times(decimals_from)
      );
    } else {
      amountOutMin = this.numToHex(
        BigNumber(
          Common.numFloor(to.inputValue * (1 - slippage / 100), 1e8)
        ).times(decimals_to)
      );
      amountInMax =
        from.coinName === "MEC"
          ? this.numToHex(
              BigNumber(Math.floor(from.inputValue * (1 + slippage / 100)))
            )
          : this.numToHex(
              BigNumber(
                Math.floor(from.inputValue * 1e18 * (1 + slippage / 100))
              )
            );
    }

    if (from.coinName == "BNB" || to.coinName == "BNB") {
      //
      if (from.coinName == "BNB") {
        if (to.isEstimated) {
          method = PancakeSwapContract.methods.swapExactETHForTokens(
            amountOutMin,
            1,
            path,
            myAddr,
            deadline
          );
          callValue = amountIn;
        }

        if (from.isEstimated) {
          method = PancakeSwapContract.methods.swapETHForExactTokens(
            amountOut,
            1,
            path,
            myAddr,
            deadline
          );
          callValue = amountInMax;
        }
      }

      //
      if (to.coinName == "BNB") {
        if (to.isEstimated) {
          method = PancakeSwapContract.methods.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            1,
            path,
            myAddr,
            deadline
          );
        }
        if (from.isEstimated) {
          method = PancakeSwapContract.methods.swapTokensForExactETH(
            amountOut,
            amountInMax,
            1,
            path,
            myAddr,
            deadline
          );
        }
      }
    } else {
      if (to.isEstimated) {
        console.log("swapExactTokensForTokens");
        console.log(amountIn, amountOutMin, 1, path, myAddr, deadline);
        method = PancakeSwapContract.methods.swapExactTokensForTokens(
          amountIn,
          amountOutMin,
          1,
          path,
          myAddr,
          deadline
        );
      }
      if (from.isEstimated) {
        console.log("swapTokensForExactTokens");
        console.log(amountOut, amountInMax, 1, path, myAddr, deadline);
        method = PancakeSwapContract.methods.swapTokensForExactTokens(
          amountOut,
          amountInMax,
          1,
          path,
          myAddr,
          deadline
        );
      }
    }

    return new Promise((resolve) => {
      this.sendMethod(
        method,
        { from: myAddr, value: callValue },
        (hash) => resolve(hash),
        () => {
          console.log("swap success!!!!!");
          Common.store.commit("bnbState/clearLoading");
          EventBus.$emit(EventConfig.SwapSuccess);
        }
      );
    });
  }

  //
  static async getMecSwapAmountsIn(amountOut, path) {
    amountOut = this.numToHex(BigNumber(amountOut));
    const data = await this.mecSwapContrac.methods
      .getAmountsIn(1, amountOut, path)
      .call();
    return data[0];
  }

  //
  static async getMecSwapAmountsOut(amountIn, path) {
    amountIn = this.numToHex(BigNumber(amountIn));
    const data = await this.mecSwapContrac.methods
      .getAmountsOut(1, amountIn, path)
      .call();
    return data[data.length - 1];
  }

  //
  static async getAmountsOut(amountIn, path) {
    amountIn = this.numToHex(BigNumber(amountIn));
    let contract = new this.web3.eth.Contract(
      [PancakSwapContract.getAmountsOut],
      PancakeConfig.SwapRouterAddrV2
    );
    return new Promise((resolve) => {
      contract.methods
        .getAmountsOut(amountIn, path)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async get1155Num(tokenAddr, ids) {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.balanceOfOneBatch],
      tokenAddr
    );

    return new Promise((resolve) => {
      contract.methods
        .balanceOfOneBatch(myAddr, ids)
        .call()
        .then((data) => {
          let retObj = {};
          ids.map((id, pos) => {
            retObj[id] = data[pos];
          });
          resolve(retObj);
        });
    });
  }

  //
  //
  static async getMyGemNum() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.balanceOfOneBatch],
      WalletConfig.ETH.momoGemToken
    );
    let ids = [];
    [100, 200, 300, 400].map((item) => {
      for (let index = 1; index <= 9; index++) {
        ids.push(item + index);
      }
    });
    return new Promise((resolve) => {
      contract.methods
        .balanceOfOneBatch(myAddr, ids)
        .call()
        .then((data) => {
          let retObj = {};
          ids.map((id, pos) => {
            retObj[id] = data[pos];
          });
          resolve(retObj);
        });
    });
  }

  //
  static async gemLevelUp(gemId, amount) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.levelUpGem],
      WalletConfig.ETH.momoGemOpr
    );

    console.log({ gemId, amount });

    return new Promise((resolve) => {
      let method = contract.methods.levelUp(gemId, amount);
      this.sendMethod(
        method,
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("gemLevelUp success!!!!!");
          Common.app.getGemBag();
          Common.app.unLockBtn("compGemLock");
        }
      );
    });
  }

  //
  static async getGemApplyState() {
    let contract = new this.web3.eth.Contract(
      [Contract.getRoundInfo],
      WalletConfig.ETH.momoGemApply
    );
    return new Promise((resolve) => {
      contract.methods
        .getRoundInfo()
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getBoxApplyState() {
    let contract = new this.web3.eth.Contract(
      [Contract.getRoundInfo],
      WalletConfig.ETH.boxApply
    );
    return new Promise((resolve) => {
      contract.methods
        .getRoundInfo()
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getMyBoxApplyInfo() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.getBoxUserInfo],
      WalletConfig.ETH.boxApply
    );
    return new Promise((resolve) => {
      contract.methods
        .getUserInfo(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getMyApplyInfo() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.getUserInfo],
      WalletConfig.ETH.momoGemApply
    );
    return new Promise((resolve) => {
      contract.methods
        .getUserInfo(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async hasHighApply() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.isHighApplying],
      WalletConfig.ETH.newGemApply
    );
    return new Promise((resolve) => {
      contract.methods
        .isHighApplying(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async applyForGem(type, applyNum_, recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [Contract.nApplyForGem, Contract.hApplyForGem],
      WalletConfig.ETH.momoGemApply
    );

    return new Promise((resolve) => {
      let method;
      if (type == "normal") {
        method = contract.methods.nApplyForGem(applyNum_);
      } else {
        method = contract.methods.hApplyForGem(applyNum_);
      }
      this.sendMethod(
        method,
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.unLockBtn("applyGemLock");
          Common.app.setCoinValueByName("MBOX");
          recipt();
        }
      );
    });
  }

  //
  static async applyForBox(type, applyNum_, recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [
        {
          type: "function",
          name: "nApplyForBox",
          inputs: [{ type: "uint256", name: "applyNum_" }],
          outputs: [],
        },
        {
          type: "function",
          name: "hApplyForBox",
          inputs: [{ type: "uint256", name: "applyNum_" }],
          outputs: [],
        },
      ],
      WalletConfig.ETH.boxApply
    );

    return new Promise((resolve) => {
      let method;
      if (type == "normal") {
        method = contract.methods.nApplyForBox(applyNum_);
      } else {
        method = contract.methods.hApplyForBox(applyNum_);
      }
      this.sendMethod(
        method,
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.unLockBtn("applyBoxLock");
          Common.app.setCoinValueByName("MBOX");
          recipt();
        }
      );
    });
  }
  //
  static async takeGem(recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.claimfrozenGem],
      WalletConfig.ETH.momoGemApply
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.claimfrozenGem(),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.unLockBtn("takeGemLock");
          Common.app.getGemBag();
          recipt();
        }
      );
    });
  }
  //
  static async takeBox(recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          type: "function",
          name: "claimfrozenBox",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
      ],
      WalletConfig.ETH.boxApply
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.claimfrozenBox(),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.unLockBtn("takeBoxLock");
          Common.app.getNewBoxNum();
          recipt();
        }
      );
    });
  }
  //
  static async takeMbox_box(recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.claimfrozenMbox],
      WalletConfig.ETH.boxApply
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.claimfrozenMbox(),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.unLockBtn("takeMboxLock");
          Common.app.setCoinValueByName("MBOX");
          recipt();
        }
      );
    });
  }

  //
  static async takeMbox(recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.claimfrozenMbox],
      WalletConfig.ETH.momoGemApply
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.claimfrozenMbox(),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          Common.app.unLockBtn("takeMboxLock");
          Common.app.setCoinValueByName("MBOX");
          recipt();
        }
      );
    });
  }

  //
  static async wearGem({ momoId_, gemId_, pos_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.takeOn],
      WalletConfig.ETH.momoGemOpr
    );

    console.log({ momoId_, gemId_, pos_ });

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.takeOn(momoId_, gemId_, pos_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn("wearGemLock");
          await Common.app.setMyNftByType(
            ConstantConfig.NFT_LOCATION.STAKE,
            false
          );
          await Common.app.getGemBag();
        }
      );
    });
  }

  //
  static async getInlayInfo(momoId_) {
    let contract = new this.web3.eth.Contract(
      [Contract.getInlayInfo],
      WalletConfig.ETH.momoGemOpr
    );
    return new Promise((resolve) => {
      contract.methods
        .getInlayInfo(momoId_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getBatchInlayInfo(momoIds_) {
    let contract = new this.web3.eth.Contract(
      [Contract.getInlayInfoBatch],
      WalletConfig.ETH.momoGemOpr
    );

    return new Promise((resolve) => {
      contract.methods
        .getInlayInfoBatch(momoIds_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async takeOffGem({ momoId_, pos_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.takeOff],
      WalletConfig.ETH.momoGemOpr
    );

    console.log("takeOffGem", { momoId_, pos_ });

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.takeOff(momoId_, pos_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn("takeOffGemLock");
          Common.app.removeStakeGem(momoId_, pos_);
          await Common.app.setMyNftByType(
            ConstantConfig.NFT_LOCATION.STAKE,
            false
          );
          await Common.app.getGemBag();
        }
      );
    });
  }

  //
  static async inlayQuickLvUp({ momoId_, pos_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.inlayQuickLvUp],
      WalletConfig.ETH.momoGemOpr
    );

    console.log("takeOffGem", { momoId_, pos_ });

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.inlayQuickLvUp(momoId_, pos_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn("upgradeGemWearLock");
          await Common.app.setMyNftByType(
            ConstantConfig.NFT_LOCATION.STAKE,
            false
          );
          await Common.app.getGemBag();
        }
      );
    });
  }

  //
  static async getGemSuggestIndex() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [Contract.getSuggestIndex],
      WalletConfig.ETH.common1155Auction
    );

    return new Promise((resolve) => {
      contract.methods
        .getSuggestIndex(myAddr)
        .call()
        .then((_suggestIndex) => {
          resolve(_suggestIndex);
        });
    });
  }

  static async gemCreateAuction({
    price_,
    suggestIndex_,
    currency_,
    erc1155_,
    ids_,
    amounts_,
  }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          type: "function",
          name: "createAuction",
          inputs: [
            { type: "uint256", name: "price_" },
            { type: "uint256", name: "suggestIndex_" },
            { type: "uint256", name: "currency_" },
            { type: "uint256", name: "erc1155_" },
            { type: "uint256[]", name: "ids_" },
            { type: "uint256[]", name: "amounts_" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.common1155Auction
    );

    console.log(price_, suggestIndex_, currency_, erc1155_, ids_, amounts_);
    price_ = BigNumber(Common.numFloor(price_, 1e9)).times(BigNumber(1e18));

    let saveHash;

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.createAuction(
          this.numToHex(price_),
          suggestIndex_,
          currency_,
          erc1155_,
          ids_,
          amounts_
        ),
        { from: myAddr },
        (hash) => {
          resolve(hash);
          saveHash = hash;
        },
        async () => {
          console.log("gemCreateAuction success");
          await Common.app.getGemBag();
          await Common.app.getNewBoxNum();
          await Common.app.getCrystalNum();
        },
        () => {
          EventBus.$emit(EventConfig.CreateAuctionError, {
            chain: "eth",
            hash: saveHash,
          });
        }
      );
    });
  }

  //
  static async getGemMarketOrder(orderId_) {
    let contract = new this.web3.eth.Contract(
      [Contract.getGemMarketOrder],
      WalletConfig.ETH.common1155Auction
    );

    return new Promise((resolve) => {
      contract.methods
        .getOrder(orderId_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async cancelGemAuction(orderId_) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "orderId_",
              type: "uint256",
            },
          ],
          name: "cancelAuction",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      WalletConfig.ETH.common1155Auction
    );

    let saveHash;

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.cancelAuction(orderId_),
        { from: myAddr },
        (hash) => {
          saveHash = hash;
          resolve(hash);
        },
        async () => {
          console.log("cancelAuction success!!!!!");
          await Common.app.getGemBag();
          await Common.app.getNewBoxNum();
          await Common.app.getCrystalNum();
        },
        () => {
          console.log(saveHash);
          EventBus.$emit(EventConfig.CancelAuctionError, {
            chain: "eth",
            hash: saveHash,
          });
        }
      );
    });
  }

  //
  static async changeGemPrice({ orderId_, price_ }, recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "orderId_",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "price_",
              type: "uint256",
            },
          ],
          name: "changePrice",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      WalletConfig.ETH.common1155Auction
    );

    price_ = BigNumber(Common.numFloor(price_, 1e9)).times(BigNumber(1e18));

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.changePrice(orderId_, this.numToHex(price_)),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("changePrice success!!!!!");
          Common.app.unLockBtn("changePriceLock");
          recipt();
        }
      );
    });
  }

  //
  static async buyGemMarketPet({ auctor_, orderId_, coinKey, amount_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "bid",
          type: "function",
          inputs: [
            { name: "auctor_", type: "address" },
            { name: "orderId_", type: "uint256" },
            { name: "amount_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.common1155Auction
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.bid(auctor_, orderId_, amount_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("buyGemMarketPet success!!!!!");
          await Common.app.setCoinValueByName(coinKey);
          await Common.app.getGemBag();
          await Common.app.getNewBoxNum();
          await Common.app.getCrystalNum();
        }
      );
    });
  }

  //
  static async createRent(
    { tokenId_, curRentDays_, curRentRound_, curRentPrice_ },
    recipet
  ) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "createRent",
          type: "function",
          inputs: [
            { name: "tokenId_", type: "uint256" },
            { name: "curRentDays_", type: "uint256" },
            { name: "curRentRound_", type: "uint256" },
            { name: "curRentPrice_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    console.log({ tokenId_, curRentDays_, curRentRound_, curRentPrice_ });

    curRentPrice_ = BigNumber(Common.numFloor(curRentPrice_, 1e9)).times(
      BigNumber(1e18)
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.createRent(
          Number(tokenId_),
          Number(curRentDays_),
          Number(curRentRound_),
          this.numToHex(curRentPrice_)
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("createRent success!!!!!");
          Common.app.unLockBtn("putRentLock");
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
          recipet();
        }
      );
    });
  }

  //
  static async addRentRenewal(
    { tokenId_, orderId_, nextRentDays_, nextRentRound_, nextRentPrice_ },
    recipt
  ) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "addRentRenewal",
          type: "function",
          inputs: [
            { name: "tokenId_", type: "uint256" },
            { name: "orderId_", type: "uint256" },
            { name: "nextRentDays_", type: "uint256" },
            { name: "nextRentRound_", type: "uint256" },
            { name: "nextRentPrice_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    nextRentPrice_ = this.numToHex(
      BigNumber(Common.numFloor(nextRentPrice_, 1e9)).times(BigNumber(1e18))
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.addRentRenewal(
          tokenId_,
          orderId_,
          nextRentDays_,
          nextRentRound_,
          nextRentPrice_
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("addRentRenewal success!!!!!");
          Common.app.unLockBtn("putRentLock");
          recipt();
        }
      );
    });
  }

  //
  static async getMomoRentInfo(tokenId) {
    console.log("getPetInfo", tokenId);
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getRentInfo",
          type: "function",
          inputs: [{ name: "tokenId_", type: "uint256" }],
          outputs: [
            { name: "orderId", type: "uint256" },
            { name: "status", type: "uint256" },
            { name: "rentTime", type: "uint256" },
            { name: "owner", type: "address" },
            { name: "renter", type: "address" },
            { name: "currentRentDays", type: "uint256" },
            { name: "currentRentRound", type: "uint256" },
            { name: "currentRentPrice", type: "uint256" },
            { name: "nextRentDays", type: "uint256" },
            { name: "nextRentRound", type: "uint256" },
            { name: "nextRentPrice", type: "uint256" },
            { name: "gameId", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    return new Promise((resolve) => {
      contract.methods
        .getRentInfo(tokenId)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getMomoRentInfoExt(tokenId) {
    console.log("getMomoRentInfoExt", tokenId);
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getRentInfoExt",
          type: "function",
          inputs: [{ name: "tokenId_", type: "uint256" }],
          outputs: [
            { name: "owner", type: "address" },
            { name: "renter", type: "address" },

            { name: "orderId", type: "uint256" },
            { name: "status", type: "uint256" },
            { name: "rentTime", type: "uint256" },
            { name: "currentRentDays", type: "uint256" },
            { name: "currentRentRound", type: "uint256" },
            { name: "currentRentPrice", type: "uint256" },
            { name: "nextRentDays", type: "uint256" },
            { name: "nextRentRound", type: "uint256" },
            { name: "nextRentPrice", type: "uint256" },
            { name: "gameId", type: "uint256" },
            { name: "startTime", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    return new Promise((resolve) => {
      contract.methods
        .getRentInfoExt(tokenId)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getRentInfoSimple(tokenIds) {
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getRentInfoSimple",
          type: "function",
          inputs: [{ name: "tokenIds_", type: "uint256[]" }],
          outputs: [
            { name: "orderIdArray", type: "uint256[]" },
            { name: "statusArray", type: "uint256[]" },
            { name: "rentTimeArray", type: "uint256[]" },
            { name: "currentRentDaysArray", type: "uint256[]" },
          ],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    return new Promise((resolve) => {
      contract.methods
        .getRentInfoSimple(tokenIds)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async cancelPutRent({ tokenId_, orderId_ }, recipet) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    console.log({ tokenId_, orderId_ });

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "cancelRent",
          type: "function",
          inputs: [
            { name: "tokenId_", type: "uint256" },
            { name: "orderId_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.cancelRent(Number(tokenId_), Number(orderId_)),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("cancelPutRent success!!!!!");
          Common.app.unLockBtn("cancelRentLock");
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
          recipet();
        }
      );
    });
  }

  //
  static async rentMomo({ tokenId_, orderId_, gameId_, price_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "rent",
          type: "function",
          inputs: [
            { name: "tokenId_", type: "uint256" },
            { name: "orderId_", type: "uint256" },
            { name: "gameId_", type: "uint256" },
            { name: "price_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    console.log({ tokenId_, orderId_, gameId_, price_ });

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.rent(
          tokenId_,
          orderId_,
          gameId_,
          this.numToHex(price_)
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("rentMomo success!!!!!");
          Common.app.unLockBtn("rentLock");
        }
      );
    });
  }

  //
  static async reRent({ tokenId_, orderId_, price_ }, recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "renewRent",
          type: "function",
          inputs: [
            { name: "tokenId_", type: "uint256" },
            { name: "orderId_", type: "uint256" },
            { name: "price_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoRent
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.renewRent(tokenId_, orderId_, this.numToHex(price_)),
        { from: myAddr },
        (hash) => resolve(hash),
        () => {
          console.log("reRent success!!!!!");
          Common.app.unLockBtn("rentLock");
          recipt();
        }
      );
    });
  }

  //
  static async stakeMbox(
    { poolIndex_, amount_, lockTime_, orderIndex_ },
    coinItem
  ) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "stake",
          type: "function",
          inputs: [
            { name: "poolIndex_", type: "uint256" },
            { name: "amount_", type: "uint256" },
            { name: "lockTime_", type: "uint256" },
            { name: "orderIndex_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoVeMbox
    );

    amount_ = this.numToHex(BigNumber(amount_).times(BigNumber(1e18)));

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.stake(poolIndex_, amount_, lockTime_, orderIndex_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("stakeMbox success!!!!!");
          Common.app.unLockBtn("freezeMboxLock");
          //
          await Common.app.setCoinValueByName("MBOX");
          //
          await Common.app.getVeMboxStakeInfo();

          //
          await Common.app.getApyObj(coinItem);
        }
      );
    });
  }

  //
  static async unstakeMbox({ poolIndex_, orderIndex_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;
    const wallet = Common.getStorageItem("connect-wallet");
    const web3 = new Web3(
      window.isMoboxApp || wallet === "mboxWallet"
        ? window.mbox.bscWeb3.currentProvider
        : this.web3.givenProvider
    );

    let contract = new web3.eth.Contract(
      [
        {
          name: "unstake",
          type: "function",
          inputs: [
            { name: "poolIndex_", type: "uint256" },
            { name: "orderIndex_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoVeMbox
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.unstake(poolIndex_, orderIndex_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn("unStakeMboxLock");
          //
          await Common.app.getVeMboxStakeInfo();
          //
          await Common.app.setCoinValueByName("MBOX");
        }
      );
    });
  }

  //
  static async getVeMboxStakeInfo(poolIndexs_) {
    let myAddr = await this.getAccount();
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getStakeInfo",
          type: "function",
          inputs: [
            { name: "user_", type: "address" },
            { name: "poolIndexArray_", type: "uint256[]" },
          ],
          outputs: [
            { name: "poolIndexs", type: "uint256[]" },
            { name: "orderIndexs", type: "uint256[]" },
            { name: "moboxs", type: "uint256[]" },
            { name: "veMoboxs", type: "uint256[]" },
            { name: "lockTimeValues", type: "uint256[]" },
          ],
        },
      ],
      WalletConfig.ETH.momoVeMbox
    );

    return new Promise((resolve) => {
      contract.methods
        .getStakeInfo(myAddr, poolIndexs_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getBoosterInfo(poolIndexs_) {
    let myAddr = await this.getAccount();
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getBoosterInfo",
          type: "function",
          inputs: [
            { name: "user_", type: "address" },
            { name: "poolIndexArray_", type: "uint256[]" },
          ],
          outputs: [{ name: "boosters", type: "uint256[]" }],
        },
      ],
      WalletConfig.ETH.momoVeMbox
    );

    return new Promise((resolve) => {
      contract.methods
        .getBoosterInfo(myAddr, poolIndexs_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getPoolVeMobox(poolIndex_) {
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getPoolVeMobox",
          type: "function",
          inputs: [{ name: "poolIndex_", type: "uint256" }],
          outputs: [
            { name: "veMoboxSupply", type: "uint256" },
            { name: "shareTotal", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.moMoHelper2
    );

    return new Promise((resolve) => {
      contract.methods
        .getPoolVeMobox(poolIndex_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getUserPoolsApyParam(poolIndexs_) {
    let myAddr = await this.getAccount();
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getUserPoolsApyParam",
          type: "function",
          inputs: [
            { name: "user_", type: "address" },
            { name: "poolIndexs_", type: "uint256[]" },
          ],
          outputs: [
            { name: "keyPerDays", type: "uint256[]" },
            { name: "wantShares", type: "uint256[]" },
            { name: "workingBalances", type: "uint256[]" },
            { name: "workingSupply", type: "uint256[]" },
            { name: "totalShares", type: "uint256[]" },
          ],
        },
      ],
      WalletConfig.ETH.moMoHelper2
    );

    return new Promise((resolve) => {
      contract.methods
        .getUserPoolsApyParam(myAddr, poolIndexs_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async moveStake({ moveVeMobox_, fromPool_, toPool_, orderIndex_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "moveStake",
          type: "function",
          inputs: [
            { name: "moveVeMobox_", type: "uint256" },
            { name: "fromPool_", type: "uint256" },
            { name: "toPool_", type: "uint256" },
            { name: "orderIndex_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoVeMbox
    );

    moveVeMobox_ = this.numToHex(
      BigNumber(moveVeMobox_).times(BigNumber(1e18))
    );
    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.moveStake(
          moveVeMobox_,
          fromPool_,
          toPool_,
          orderIndex_
        ),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn("moveVeMboxLock");
          //
          await Common.app.getVeMboxStakeInfo();
        }
      );
    });
  }

  //
  static async getPools(poolIndexs_) {
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getPools",
          type: "function",
          inputs: [{ name: "poolIndexs_", type: "uint256[]" }],
          outputs: [
            { name: "veMboxTotal", type: "uint256" },
            { name: "poolVeMboxSupplys", type: "uint256[]" },
            { name: "poolAllocPoints", type: "uint256[]" },
          ],
        },
      ],
      WalletConfig.ETH.moMoHelper2
    );

    return new Promise((resolve) => {
      contract.methods
        .getPools(poolIndexs_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getPoolsEarns() {
    let myAddr = await this.getAccount();
    if (!myAddr) return;
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "earns",
          type: "function",
          inputs: [{ name: "user_", type: "address" }],
          outputs: [
            { name: "tokens", type: "address[]" },
            { name: "versions", type: "uint256[]" },
            { name: "amounts", type: "uint256[]" },
          ],
        },
      ],
      WalletConfig.ETH.momoMoreMinter
    );

    return new Promise((resolve) => {
      contract.methods
        .earns(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async joinStake(recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "updateReward",
          type: "function",
          inputs: [],
          outputs: [],
        },
      ],
      WalletConfig.ETH.moMoStake
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.updateReward(),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn("joinStakeLock");
          recipt();
          await Common.app.eth_setMyHashrate();
          await Common.app.getPoolsEarns();
        }
      );
    });
  }

  //
  static async getBidRound() {
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "round",
          type: "function",
          inputs: [],
          outputs: [{ name: "round", type: "uint256" }],
        },
      ],
      WalletConfig.ETH.momoBid
    );

    return new Promise((resolve) => {
      contract.methods
        .round()
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }
  //
  static async getBidInfo(address) {
    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getBidInfo",
          type: "function",
          inputs: [{ name: "bider", type: "address" }],
          outputs: [
            { name: "currBidder", type: "address" },
            { name: "bidTs", type: "uint256" },
            { name: "tokenId", type: "uint256" },
            { name: "state", type: "uint256" },
            { name: "currPrice", type: "uint256" },
            { name: "bidStartTime", type: "uint256" },
            { name: "bidEndTime", type: "uint256" },
            { name: "toClaimTokenId", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.momoBid
    );

    return new Promise((resolve) => {
      contract.methods
        .getBidInfo(address)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  static async bidMomo({ amount, tokenId }, recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "bid",
          type: "function",
          inputs: [
            { name: "amount", type: "uint256" },
            { name: "tokenId", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoBid
    );

    amount = this.numToHex(BigNumber(amount).times(BigNumber(1e18)));

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.bid(amount, tokenId),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("bidMomo success!!!!!");
          Common.app.unLockBtn("bidLock");
          recipt();
        }
      );
    });
  }
  //
  static async withdraw721(recipt) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "withdraw721",
          type: "function",
          inputs: [],
          outputs: [],
        },
      ],
      WalletConfig.ETH.momoBid
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.withdraw721(),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("withdraw721 success!!!!!");
          Common.app.unLockBtn("bidLock");
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
          recipt();
        }
      );
    });
  }

  static async getGroupV4() {
    let myAddr = await this.getAccount();
    if (!myAddr) return null;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getGroupV4",
          type: "function",
          inputs: [{ name: "user", type: "address" }],
          outputs: [{ name: "num", type: "uint256" }],
        },
      ],
      WalletConfig.ETH.moMoStake
    );

    return new Promise((resolve) => {
      contract.methods
        .getGroupV4(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  static async getRefund() {
    let myAddr = await this.getAccount();
    if (!myAddr) return null;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "getRefund",
          type: "function",
          inputs: [{ name: "user", type: "address" }],
          outputs: [
            { name: "short", type: "uint256" },
            { name: "middle", type: "uint256" },
            { name: "long", type: "uint256" },
            { name: "refunded", type: "bool" },
          ],
        },
      ],
      WalletConfig.ETH.refundContract
    );

    return new Promise((resolve) => {
      contract.methods
        .getRefund(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  static async refundMbox() {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return null;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "refund",
          type: "function",
          inputs: [],
          outputs: [],
        },
      ],
      WalletConfig.ETH.refundContract
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.refund(),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn("refundMboxLock");
          await Common.app.getRefund();
          await Common.app.setCoinValueByName("MBOX");
        }
      );
    });
  }

  //
  static async orderBookOpr(param, type) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: type,
          type: "function",
          inputs: [
            {
              type: "tuple",
              name: "param",
              components: [
                { name: "price_", type: "uint256" },
                { name: "storeIndex_", type: "uint256" },
                { name: "currency_", type: "uint256" },
                { name: "erc1155_", type: "uint256" },
                { name: "tokenId_", type: "uint256" },
                { name: "count_", type: "uint256" },
                { name: "indexes_", type: "uint256[]" },
              ],
            },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.orderBookContract
    );

    param[0] = this.numToHex(BigNumber(param[0]).times(BigNumber(1e18)));

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods[type](param),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          Common.app.unLockBtn(type + "Lock");
          //
          await Common.app.getNewBoxNum();
          await Common.app.setCoinValueByName("BUSD");
        }
      );
    });
  }

  //
  static async cancelOrderBook({ erc1155_, index_, orderId_ }) {
    let myAddr = await this.getAccount(true);
    if (!myAddr) return;

    let contract = new this.web3.eth.Contract(
      [
        {
          name: "cancelOrder",
          type: "function",
          inputs: [
            { name: "erc1155_", type: "uint256" },
            { name: "index_", type: "uint256" },
            { name: "orderId_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.orderBookContract
    );

    return new Promise((resolve) => {
      this.sendMethod(
        contract.methods.cancelOrder(erc1155_, index_, orderId_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log(" cancelOrder success!!!!!");
        }
      );
    });
  }
}
