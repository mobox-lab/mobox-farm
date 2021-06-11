import {Common,EventBus,Wallet,Http, SwapHttp} from "@/utils";
import {EventConfig,StorageConfig,WalletConfig, ConstantConfig, PancakeConfig} from "@/config";
import {mapState} from "vuex";
import BigNumber from "bignumber.js";

const InitEth = {
	data() {
		return ({
			timer: null,
		})
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
		}),
	},
	async created() {
		// this.eth_init();
		
		EventBus.$off();
		if (this.timer) clearInterval(this.timer);

		//事件监听
		//开箱子成功
		EventBus.$on(EventConfig.OpenBoxConfirm,this.eth_openBoxConfirm.bind(this));
		//开箱子失败
		EventBus.$on(EventConfig.OpenBoxFail,({chain, hash})=>{
			if(chain == "eth"){
				let {openBoxTemp} = this.ethState;
				openBoxTemp.map(item => {
					if (item.tx == hash) item.state = -1;
				});
				this.$store.commit("ethState/setData", {openBoxTemp});
			}
		});
		//设置名字成功
		EventBus.$on(EventConfig.SetNameConfirm,this.eth_setNameConfirm.bind(this));
		EventBus.$on(EventConfig.ApprovedConfirm,this.eth_approvedConfirm.bind(this));
		EventBus.$on(EventConfig.LevelUpConfirm,this.eth_levelUpConfirm.bind(this));
		EventBus.$on(EventConfig.StakeNftConfirm,this.eth_stakeNftConfirm.bind(this));
		EventBus.$on(EventConfig.CreateAuctionConfirm,this.eth_createAuctionConfirm.bind(this));
		EventBus.$on(EventConfig.OpenBoxHistory,this.eth_openBoxHistory.bind(this));
	
		//拍卖成功
		EventBus.$on(EventConfig.BidPetSuccess,  async ({coinKey}) => {
			await this.setCoinValueByName(coinKey);
			await this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
			this.$store.commit("globalState/unLockBtn", "buyMomoLock");
		});
		//取消上架成功
		EventBus.$on(EventConfig.CancelAuctionSuccess,  async () => {
			await this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
		});
		//修改拍卖价格成功
		EventBus.$on(EventConfig.ChangePriceSuccess,  async () => {
			this.$store.commit("globalState/unLockBtn", "changePriceLock");
		});
		//取消下架失败
		EventBus.$on(EventConfig.CancelAuctionError,  async ({hash}) => {
			//删除临时下架信息
			this.tempMarketCancelTx.map((item, index)=>{
				if(item.nextHash == hash){
					this.tempMarketCancelTx.splice(index, 1);
				}
			});
			this.tempGemMarketCancelTx.map((item, index)=>{
				if(item.nextHash == hash){
					this.tempGemMarketCancelTx.splice(index, 1);
				}
			});
			this.$store.commit("globalState/setData", {tempMarketCancelTx: this.tempMarketCancelTx, tempGemMarketCancelTx: this.tempGemMarketCancelTx});
		});
		//上架失败
		EventBus.$on(EventConfig.CreateAuctionError,  async ({hash}) => {
			//删除临时上架信息
			this.tempSells.map((item,index)=>{
				if(item.tx == hash){
					this.tempSells.splice(index, 1);
				}
			});

			this.tempGemSells.map((item,index)=>{
				if(item.tx == hash){
					this.tempGemSells.splice(index, 1);
				}
			});
			this.$store.commit("globalState/setData", {tempSells: this.tempSells, tempGemSells: this.tempGemSells});
		});
		//HTTP请求错误
		EventBus.$on(EventConfig.HttpError,  async () => {
			this.$store.commit("globalState/setData", {marketLoading: false});
		});

		//兑换成功
		EventBus.$on(EventConfig.SwapSuccess, this.setBalance);
		EventBus.$on(EventConfig.getMboxSuccess, async ()=>{
			await this.eth_setMbox();
			await this.eth_setEarnedMbox();
			this.$store.commit("globalState/unLockBtn", "getMboxLock");
			await this.setBalance();
		});

		Wallet.ETH.init();
	},
	beforeDestroy() {
		if (this.timer) clearInterval(this.timer);
	},
	methods: {
		async initBaseData() {
			let account = await Wallet.ETH.getAccount();
			clearInterval(this.timer);
			if (account) {
				//加载pancake交易记录
				let history = Common.getStorageItem("pancake-history-"+account);
				if(history != undefined){
					let histoyJSON = JSON.parse(history);
					this.$store.commit("bnbState/setData", {pancakeHistory: histoyJSON});
				}

				this.setBalance();

				this.needUpdate();
				this.setOrder();

				let t = 0;
				this.timer = setInterval(() => {
					t++;
					if(t%20 == 0){
						if(Wallet.ETH.myAddr != ""){
							this.needUpdate();
						}
					}
					if(t%5){
						this.setOrder();
					}
				}, 1000);

				this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
				await this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);

				

				await this.eth_set1155IsApprovedForStake();
				await this.eth_set721IsApprovedForStake();

				//我们自己服务器相关的数据
				await this.eth_setStakeHistory();
				await this.eth_setOpenBoxHistory();
				await this.eth_setLockList();
			}
		},
		//需要定时去取的数据
		async needUpdate() {
			//查询我质押的和key的收益
			await this.getStakeValueAndEarndKey();

			//获取veMBOX相关
			await this.getVeMboxStakeInfo();

			//质押挖矿相关
			await this.eth_setTotalDropMbox();

			await this.getCoinValue();

			await this.eth_setBox();
			await this.eth_setMbox();

			//宝石相关
			await this.getGemBag();

			//算力挖矿相关
			await this.eth_setMyHashrate();
			await this.eth_setTotalHashrate();
			await this.eth_setEarnedMbox();

			if (this.ethState.allowance_box_to_minter < 10000) {
				this.eth_setBoxAllowance();
			}

			//获取回购相关
			await this.getBuyBack();

			//获取总打开箱子数
			await this.setTotalOpenBox();
		},
		//获取质押VeMobox
		async getVeMboxStakeInfo(){
			let pIndexObj  = {};
			for (let key in PancakeConfig.StakeLP) {
				let {pIndex} = PancakeConfig.StakeLP[key];
				if(pIndex != 0 && pIndex != -1){
					pIndexObj[pIndex] = key;
				}
			}
			let res = await Wallet.ETH.getVeMboxStakeInfo(Object.keys(pIndexObj));
			let booster = await Wallet.ETH.getBoosterInfo(Object.keys(pIndexObj));

			if(res){
				let keyValues = Object.values(pIndexObj);
				//清空veMBOX的状态
				for (let key in this.coinArr) {
					if(key != "ts"){
						this.coinArr[key].veMbox.mul = 100;
						this.coinArr[key].veMbox.orderIndexs = {
							"0": {stakeMbox: 0,endTime: 0, veMboxNum: 0},
							"1": {stakeMbox: 0,endTime: 0, veMboxNum: 0},
							"2": {stakeMbox: 0,endTime: 0, veMboxNum: 0},
						};
						this.coinArr[key].veMbox.notice = false;

						//赋值挖矿倍率
						let keyPos = keyValues.indexOf(key);
						if(keyPos != -1){
							this.coinArr[key].veMbox.mul = booster[keyPos];
						}
					}
				}
				
				let {poolIndexs,orderIndexs, moboxs ,veMoboxs,lockTimeValues} = res;
				poolIndexs.map((poolIndex, pos)=>{
					let coinKey = pIndexObj[poolIndex];
					let orderIndex  = orderIndexs[pos];
					let veMbox =  this.coinArr[coinKey].veMbox;
					veMbox.orderIndexs[orderIndex].stakeMbox =  moboxs[pos];
					veMbox.orderIndexs[orderIndex].veMboxNum =  veMoboxs[pos];
					veMbox.orderIndexs[orderIndex].endTime =  lockTimeValues[pos];
					let dt =  lockTimeValues[pos] - parseInt(new Date().valueOf()/1000);
					veMbox.notice = dt <= 0 && Number(moboxs[pos]) > 0;
				});
				this.coinArr["ts"] = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		async getGemBag(){
			let gemBag = await Wallet.ETH.getMyGemNum();
			if(gemBag){
				this.$store.commit("gemState/setData", {gemBag});
			}
		},
		async getCoinValue(){
			let balance = await Wallet.ETH.getBalance();
			this.coinArr["BNB"].balance = balance;
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});

			for (let key in PancakeConfig.SelectCoin) {
				let {addr, decimals, omit} = PancakeConfig.SelectCoin[key];
				if(addr != ""){
					let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
					this.coinArr[key].balance =  Common.numFloor((Number(value) / decimals), omit);
					this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
					await Common.sleep(500);
				}
			}
		},

		async getBuyBack(){
			let res = await Http.buybackpool();
			if(res){
				this.buyBack.amount = Common.numFloor(res.amount, 1e2);
				this.buyBack.avgPrice = Common.numFloor(res.avgPrice, 1e4);
				this.buyBack.moboxBurn = Common.numFloor(res.moboxBurn/ 1e18, 1);
				this.buyBack.circulating = Common.numFloor(res.circulating/ 1e18, 1);
				this.buyBack.logs = res.logs;
				this.$store.commit("bnbState/setData", {buyBack: this.buyBack});
			}
		},

		//获取我质押的币和kEY的收益
		async getStakeValueAndEarndKey(){
			let pIndexObj  = {};
			for (let key in PancakeConfig.StakeLP) {
				let {pIndex} = PancakeConfig.StakeLP[key];
				if(pIndex != 0 && pIndex != -1){
					pIndexObj[key] = pIndex;
				}
			}
			
			let res = await Wallet.ETH.getStakeValueAndEarndKey(Object.values(pIndexObj));
			if(res){
				let {gracePeriods, pkeys, wantAmounts, workingBalances, rewardStore} = res;
				let coinArr = Object.keys(pIndexObj);
				coinArr.map((coinKey, index)=>{
					let {decimals, omit} = PancakeConfig.StakeLP[coinKey];
					this.coinArr[coinKey].earnedKey = Common.numFloor(Number(pkeys[index]) / decimals, 1e4);
					this.coinArr[coinKey].gracePeriod = gracePeriods[index];
					this.coinArr[coinKey].wantAmount = Common.numFloor(Number(wantAmounts[index]) / decimals, omit);
					this.coinArr[coinKey].workingBalance = workingBalances[index];
				});
				this.coinArr["ts"] = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr, rewardStoreKey: Common.numFloor(Number(rewardStore) / 1e18, 1e4)});
			}
		},

		async getApyObj(item){
			let res = await Wallet.ETH.getUserPoolsApyParam([item.pIndex]);
			if(res){
				let {keyPerDays,wantShares,workingSupply, totalShares} = res;
				let keyUsdt = await this.getCoinUsdt("KEY");
				let {veMbox, totalSupply, allKeyApy, apy, myApy} = this.coinArr[item.coinKey];
				let mul = Number(veMbox.mul)/100;
				let myKeyPerDay = keyPerDays[0] * (wantShares[0]* mul / workingSupply[0]) / 1e18;
				let myUsdtPerDay = keyUsdt/1e18 * myKeyPerDay;
				let myStakeUsdt = totalSupply * (wantShares / totalShares);
				let myRealKeyApy = myUsdtPerDay / myStakeUsdt * 365;

				myApy.key = myRealKeyApy;
				myApy.cake = (Number(apy.split("%")[0]) / 100) - allKeyApy;
				this.coinArr["ts"] = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},

		async getCoinUsdt(coinName){
			let wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
			let res = await Wallet.ETH.getAmountsOut(1e18, [PancakeConfig.SelectCoin[coinName].addr, wBNB, PancakeConfig.SelectCoin["USDT"].addr]);
			return res[2];
		},

		async getLPCoinValue(item){
			let {coinName, coinKey, pancakeVType} = item;

			let coinArr = this.coinArr;
			let version = pancakeVType == 1?"V1":"V2";

			let dtTime = new Date().valueOf() - coinArr[coinKey].lpPriceUpTs;
			if(coinName.indexOf("-") == -1 || dtTime < 5000) return;
			let tokenA = coinName.split("-")[0];
			let tokenB = coinName.split("-")[1];
			if(tokenA == undefined || tokenB == undefined) return;
			coinArr[coinKey].lpPriceUpTs = new Date().valueOf();
			let res = await SwapHttp.post("/pair/lpamount",{token0: tokenA, token1: tokenB, version});
			let {data, code } = res.data;
			if(code == 200){
				let reserve0 = Number(0);
				let reserve1 = Number(0);

				let {token0, token1, totalSupply} = data;
				if(token0.symbol.indexOf(tokenA) != -1){
					reserve0 =  Number(token0.reserve);
				}
				if(token1.symbol.indexOf(tokenB) != -1){
					reserve1 = Number(token1.reserve);
				}

				let retObj = ["-","-"];

				let lp =  coinArr[coinKey].wantAmount;
				if(totalSupply == 0 || reserve0 == 0 || reserve1 == 0) return retObj;

				retObj[0] = Common.numFloor(lp * reserve0 / totalSupply, PancakeConfig.SelectCoin[tokenA].omit);
				retObj[1] = Common.numFloor(lp * reserve1 / totalSupply, PancakeConfig.SelectCoin[tokenB].omit);

				coinArr[coinKey].lpPrice = retObj;
				coinArr["ts"] = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: coinArr});
			}
		},
		//获取bnb的余额
		async setBalance(){
			let balance = await Wallet.ETH.getBalance();
			this.coinArr["BNB"].balance = balance;
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});

			//设置MBOX的余额
			await this.setCoinValueByName("MBOX");

			//获取lp余额
			for (let coinKey in PancakeConfig.StakeLP) {
				await this.setCoinValueByName(coinKey);
				await Common.sleep(500);
			}

		},
		//设置币的余额
		async setCoinValueByName(coinKey){
			let {addr, decimals, omit} = coinKey.indexOf("-") != -1? PancakeConfig.StakeLP[coinKey]: PancakeConfig.SelectCoin[coinKey];
			if(addr != ""){
				let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
				this.coinArr[coinKey].balance =  Common.numFloor((Number(value) / decimals), omit);
				this.coinArr[coinKey].isApproving = false;
				this.coinArr[coinKey].isDeposing = false;
				this.coinArr[coinKey].isWithdrawing = false;
				this.coinArr["ts"] = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		
		//获取锁定列表
		async eth_setLockList(){
			let myAddr = await Wallet.ETH.getAccount();
			let lockList = await Http.getLockList(myAddr ,"BNB");
			if(lockList){
				this.$store.commit("ethState/setData", { lockList:  lockList.list});
			}
		},

		//获取24小时空投数量MBOX
		async eth_setTotalDropMbox() {
			let totalAirdropMbox = await Wallet.ETH.viewTotalAirdrop(WalletConfig.ETH.moMoStake);
			totalAirdropMbox = Math.ceil((Number(totalAirdropMbox) / 1e18) * 86400);
			this.$store.commit("ethState/setData", {totalAirdropMbox});
		},

		//获开过的盒子统计
		async setTotalOpenBox() {
			let res = await Http.getTotalOpenBox();
			if (res && res["bnb"]) {
				this.$store.commit("globalState/setChainTotalOpenBox", {
					chain: "bnb",
					num: Number(res["bnb"]["MintBox"])
				});
			}
		},
		//设置开箱子的订单
		async setOrder() {
			let order = await Wallet.ETH.getOrder();
			if (order) {
				this.$store.commit("ethState/setData", {
					canOpenBox: Number(order._boxAmount),
					orderBlockHash: order._blockHash,
				});
			}
		},
		//设置质押记录
		async eth_setStakeHistory() {
			let stakeHistory = await Wallet.ETH.getStakeHistory();
	
			if (history) {
				stakeHistory.map(item => item.state = 1);
				this.$store.commit("ethState/setData", {
					stakeHistory
				});
			}
		},
		//设置开箱子记录
		async eth_setOpenBoxHistory() {
			let openBoxHistory = await Wallet.ETH.getOpenBoxHistory();
			if (history) {
				openBoxHistory.map(item => item.state = 1);
				this.$store.commit("ethState/setData", {
					openBoxHistory
				});
			}
		},
		//设置待领取的mbox
		async eth_setEarnedMbox() {
			let earnedMbox = await Wallet.ETH.getEarnedMobx();
			this.$store.commit("ethState/setData", {
				earnedMbox
			});
		},
		//查询质押总战力
		async eth_setMyHashrate() {
			let hashrate = await Wallet.ETH.getMyHashrate();
			this.$store.commit("ethState/setData", {
				myHashrate: hashrate
			});
		},
		//查询全网质押总算力
		async eth_setTotalHashrate() {
			let totalHashrate = await Wallet.ETH.getTotalHashrate();
			this.$store.commit("ethState/setData", {
				totalHashrate
			});
		},
		async eth_createAuctionConfirm({chain}) {
			if (chain == "eth") {
				await this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
				//TODO: 更新市场交易列表
			}
		},
		//721升级
		async eth_levelUpConfirm({chain,tokenId,gotoLv}) {
			console.log("levelUpConfirm", {
				chain,
				tokenId,
				gotoLv
			});
			if (chain == "eth") {
				for (let key in this.myNFT_stake) {
					if (this.myNFT_stake[key].tokenId == tokenId) {
						this.myNFT_stake[key].level = gotoLv;
						break;
					}
				}
				this.eth_saveUpdate721();
				//更新
				// this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
				this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
				this.$store.commit("ethState/setUpgradeLocks", {tokenId, time: 0});
			}
		},
		//授权合约确认
		async eth_approvedConfirm({chain}) {
			console.log("approvedConfirm", chain);
			if (chain == "eth") {
				// this.eth_set1155IsApprovedFor721();
				await this.eth_set1155IsApprovedForStake();
				await this.eth_set721IsApprovedForStake();
				this.$store.commit("globalState/unLockBtn", "approveLock");
			}
		},
		//设置名字合约确认
		async eth_setNameConfirm({chain,tokenId,name}) {
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
		async eth_openBoxHistory({chain}) {
			if (chain == "eth") {
				this.eth_setOpenBoxHistory();
			}
		},
		//开箱子合约确认
		async eth_openBoxConfirm({chain, hash}) {
			console.log("openBoxConfirm");
			if (chain == "eth") {
				this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
				//更新箱子数量
				await this.setOrder();
				//更新开箱子temp的状态, 10:区块链上交易成功，
				let {openBoxTemp} = this.ethState;
				openBoxTemp.map(item => {
					if (item.tx == hash) item.state = 10;
				});
				this.$store.commit("ethState/setData", {openBoxTemp});
				this.$store.commit("globalState/unLockBtn", "openBoxLock");

				await this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
				await this.eth_setMyHashrate();
			}
		},
		//质押NFT确认
		async eth_stakeNftConfirm({chain}) {
			if (chain == "eth") {
				await this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
				await this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
				await this.eth_setMyHashrate();
				this.$store.commit("globalState/unLockBtn", "stekeLock");
				this.$store.commit("globalState/unLockBtn", "unStekeLock");
			}
		},
		//持久化修改的721
		async eth_saveUpdate721() {
			let account = await Wallet.ETH.getAccount();
			Common.setStorageItem(
				StorageConfig.myNFT_stake + "-" + account,
				JSON.stringify(this.myNFT_stake)
			);
		},
		//设置1155是否授权给721和stake
		async eth_set1155IsApprovedFor721() {
			let isApproved = await Wallet.ETH.isApprovedForAllByTokenAddr_1155(WalletConfig.ETH.moMoToken);
			if (isApproved != null) {
				this.$store.commit("ethState/setData", {
					allowance_1155_to_721: Number(isApproved)
				});
			}
		},
		async eth_set1155IsApprovedForStake() {
			let isApproved = await Wallet.ETH.isApprovedForAllByTokenAddr_1155(WalletConfig.ETH.moMoStake);
			if (isApproved != null) {
				this.$store.commit("ethState/setData", {
					allowance_1155_to_stake: Number(isApproved)
				});
			}
		},
		//设置721是否授权给721和stake
		async eth_set721IsApprovedForStake() {
			let isApproved = await Wallet.ETH.isApprovedForAllByTokenAddr_721(WalletConfig.ETH.moMoStake);
			if (isApproved != null) {
				this.$store.commit("ethState/setData", {
					allowance_721_to_stake: Number(isApproved)
				});
			}
		},
		//获取BOX是否授权
		async eth_setBoxAllowance() {
			let allowance = await Wallet.ETH.boxAllowanceToMinter();
			if (allowance != null) {
				this.$store.commit("ethState/setData", {
					allowance_box_to_minter: allowance
				});
			}
		},
		//获取ETH余额
		async eth_setBalance() {
			let balance = await Wallet.ETH.getMyBalance();
			if (balance != null) {
				this.$store.commit("ethState/setData", {
					balance
				});
			}
		},
	
		//获取ETH上mBOX数量
		async eth_setMbox() {
			return;
			// let myMbox = await Wallet.ETH.getErc20BalanceByTokenAddr(WalletConfig.ETH.mboxToken, false);
			// console.log("eth_setMbox", Common.numFloor((Number(myMbox) / 1e18), 10000));
			// if (myMbox != null) {
			// 	this.$store.commit("ethState/setData", {
			// 		mbox: Common.numFloor((Number(myMbox) / 1e18), 10000)
			// 	});
			// }
		},
		//获取ETH上KEY数量(之前叫box后面改成key)
		async eth_setBox() {
			let myKey = await Wallet.ETH.getErc20BalanceByTokenAddr(WalletConfig.ETH.boxToken, false);
			if (myKey != null) {
				this.$store.commit("ethState/setData", {
					box: Common.numFloor(myKey / BigNumber(1e18), 100)
				});
			}
		},
		//设置质押中我的NFT
		async setMyNftByType(type, needRemoveGem = true) {
			//优先在Strorage里面取
			let account = await Wallet.ETH.getAccount();
			let key = "myNFT_" + type;
			let storageKey = StorageConfig[key] + "-" + account;

			let ntfStorage = Common.getStorageItem(storageKey);
			let saveObj = {};
			saveObj[key] = JSON.parse(ntfStorage);
			if (ntfStorage != null) {
				//先清空宝石的显示
				if(needRemoveGem){
					saveObj[key].map(item=>{
						item.gems = [0,0,0,0];
					})
				}
				this.$store.commit("ethState/setData", saveObj);
			}
			let nftObj = await Wallet.ETH.getMomosByType(type);
			if (nftObj != null) {
				saveObj[key] = nftObj;
				//设置名字
				await this.setName(nftObj);
				//设置宝石
				await this.setGem(nftObj);
				//设置721出租状态
				await this.setRentInfo(nftObj);
				this.$store.commit("ethState/setData", saveObj);
				Common.setStorageItem(
					storageKey,
					JSON.stringify(nftObj)
				);
			}
		},

		async setRentInfo(nftArr){
			let tokenIds = [];
			nftArr.map(item=>{
				if(item.tokenId != 1){
					tokenIds.push(item.tokenId);
				}
			});
			let res = await Wallet.ETH.getRentInfoSimple(tokenIds);

			nftArr.map((item) => {
				let tokenPos = tokenIds.indexOf(item.tokenId);
				if (tokenPos != -1) {
					item.rent.orderId = res.orderIdArray[tokenPos];
					item.rent.status = res.statusArray[tokenPos];
					item.rent.rentTime = res.rentTimeArray[tokenPos];
					item.rent.currentRentDays = res.currentRentDaysArray[tokenPos];
					item.rent.state = this.getMomoState(item.rent);
				}
			});
		},

		getMomoState(rentInfo){
			let {currentRentDays, status, rentTime} = rentInfo;
			if(currentRentDays == "-") return -2;//未请求状态
			if(currentRentDays == 0 ) return -1; //未上架
			if(status == 0){
				return 0;//挂单中
			}else{
				if(Number(rentTime) < parseInt(new Date().valueOf()/1000)){
					return -1
				}else{
					return 1;//出租中
				}
			}
		},

		//查询设置名字
		async setName(nftArr) {
			//查询名字
			let needGetNameArr = [];
			nftArr.map(({
				speciality,
				tokenId
			}) => {
				if (speciality == 3 || speciality == 1) {
					needGetNameArr.push(tokenId);
				}
			});
			let names = await Wallet.ETH.getMomoNamesByTokenIds(
				needGetNameArr
			);
			nftArr.map((item) => {
				let tokenPos = needGetNameArr.indexOf(item.tokenId);
				if (tokenPos != -1 && names[tokenPos] != "") {
					item.tokenName = names[tokenPos];
				}
			});
		},
		async setGem(nftArr){
			let needGetGemArr = [];
			nftArr.map(({vType, tokenId})=>{
				if(vType >= 4){
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

		//临时移除掉宝石
		removeStakeGem(momoId, pos){
			this.myNFT_stake.map(item=>{
				if(item.tokenId == momoId){
					item.gems[pos] = 0;
				}
			});
			this.$store.commit("ethState/setData", {myNFT_stake: this.myNFT_stake});
		}
	}
}
export default InitEth;