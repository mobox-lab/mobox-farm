import {Common,EventBus,Wallet,Http} from "@/utils";
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
		EventBus.$on(EventConfig.ApprovedToPoolConfirm,this.eth_setAllowanceMintCoinToPool.bind(this));
	
		//拍卖成功
		EventBus.$on(EventConfig.BidPetSuccess,  async ({coinName}) => {
			await this.setCoinValueByName(coinName);
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
			this.$store.commit("globalState/setData", {tempMarketCancelTx: this.tempMarketCancelTx});
		});
		//上架失败
		EventBus.$on(EventConfig.CreateAuctionError,  async ({hash}) => {
			//删除临时上架信息
			this.tempSells.map((item,index)=>{
				if(item.tx == hash){
					this.tempSells.splice(index, 1);
				}
			});
			this.$store.commit("globalState/setData", {tempSells: this.tempSells});
		});
		//HTTP请求错误
		EventBus.$on(EventConfig.HttpError,  async () => {
			this.$store.commit("globalState/setData", {marketLoading: false});
		});

		//兑换成功
		EventBus.$on(EventConfig.SwapSuccess, this.setBalance);
		EventBus.$on(EventConfig.getMboxSuccess, async ()=>{
			await this.eth_setMbox();
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
				// this.$store.commit("globalState/setChainAddr", {
				// 	type: "BNB",
				// 	addr: Common.getShortAddr(account),
				// });
				this.setBalance();
				//质押挖矿相关
				// await this.eth_setMintErc20Stake();
				// await this.eth_setAllowanceMintCoinToPool();

				this.needUpdate();
				this.timer = setInterval(() => {
					if(Wallet.ETH.myAddr != ""){
						this.needUpdate();
					}
				}, 10000);

				this.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
				await this.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
				// await this.eth_set1155IsApprovedFor721();
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

			//质押挖矿相关
			// await this.eth_setTotalAirDrop();
			await this.eth_setTotalDropMbox();
			//获取KEY收益
			// await this.eth_setTotalSupply();
			// await this.eth_getEarnedKey();

			await this.setOrder();
			await this.eth_setBox();
			await this.eth_setMbox();

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
		async getBuyBack(){
			let autoBuyback = "0x5C3B530FB20520F8E4d6875Eab2Fed43534BE908";
			let wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

			let res = await Wallet.ETH.getTargetBalancefromTokenAddr(autoBuyback, wBNB);
			if(res){
				let value = Common.numFloor(Number(res) / 1e18, 1e4);
				this.buyBack.hasAmount = value;
				this.$store.commit("bnbState/setData", {buyBack: this.buyBack});
			}
		},
		//获取我质押的币和kEY的收益
		async getStakeValueAndEarndKey(){
			let pIndexObj  = {};
			for (let key in PancakeConfig.StakeLP) {
				let {pIndex} = PancakeConfig.StakeLP[key];
				if(pIndex != 0){
					pIndexObj[key] = pIndex;
				}
			}
			let res = await Wallet.ETH.getStakeValueAndEarndKey(Object.values(pIndexObj));
			if(res){
				let {gracePeriods, pkeys, wantAmounts, workingBalances, rewardStore} = res;
				Object.keys(pIndexObj).map((coinName, index)=>{
					let {decimals, omit} = PancakeConfig.StakeLP[coinName];
					this.coinArr[coinName].earnedKey = Common.numFloor(Number(pkeys[index]) / decimals, 1e2);
					this.coinArr[coinName].gracePeriod = gracePeriods[index];
					this.coinArr[coinName].wantAmount = Common.numFloor(Number(wantAmounts[index]) / decimals, omit);
					this.coinArr[coinName].workingBalance = workingBalances;
					this.coinArr["ts"] = new Date().valueOf();
					this.$store.commit("bnbState/setData", {coinArr: this.coinArr, rewardStoreKey: Common.numFloor(Number(rewardStore) / 1e18, 1e2)});
				})
			}
		},
		//获取bnb的余额
		async setBalance(){
			let balance = await Wallet.ETH.getBalance();
			console.log({balance});
			this.coinArr["BNB"].balance = balance;
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});

			//设置MBOX的余额
			this.setCoinValueByName("MBOX")
		},
		//设置币的余额
		async setCoinValueByName(coinName){
			let {addr, decimals, omit} = coinName.indexOf("-") != -1? PancakeConfig.StakeLP[coinName]: PancakeConfig.SelectCoin[coinName];
			if(addr != ""){
				let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
				this.coinArr[coinName].balance =  Common.numFloor((Number(value) / decimals), omit);
				this.coinArr[coinName].isApproving = false;
				this.coinArr[coinName].isDeposing = false;
				this.coinArr[coinName].isWithdrawing = false;
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

		//获取当前24小时空投数量Key
		async eth_setTotalAirDrop() {
			let keys = Object.keys(this.pledgeList);
			keys.map(async item => {
				let totalAirDrop = await Wallet.ETH.viewTotalAirdrop(WalletConfig.ETH[item].dropAddr);
				this.pledgeList[item].totalAirdrop = Math.ceil((Number(totalAirDrop) / 1e10) * 86400);
				// console.log("pledgeList-totalAirDrop", this.pledgeList);
			});

			this.$store.commit("ethState/setData", {
				pledgeList: this.pledgeList
			});
		},
		//获取24小时空投数量MBOX
		async eth_setTotalDropMbox() {
			let totalAirdropMbox = await Wallet.ETH.viewTotalAirdrop(WalletConfig.ETH.moMoStake);
			totalAirdropMbox = Math.ceil((Number(totalAirdropMbox) / 1e18) * 86400);
			this.$store.commit("ethState/setData", {totalAirdropMbox});
		},
		//查询全网总质押
		async eth_setTotalSupply() {
			let keys = Object.keys(this.pledgeList);
			keys.map(async item => {
				let totalSupply = await Wallet.ETH.viewTotalSupply(WalletConfig.ETH[item].poolAddr);
				let lpPrice = await Wallet.ETH.getPricePerFullShare(WalletConfig.ETH[item].mAddr);
				let total = (BigNumber(totalSupply) * BigNumber(lpPrice) / BigNumber(WalletConfig.ETH[item].decimals)) / BigNumber(1e18);
				this.pledgeList[item].totalSupply = Common.numFloor(total + 0.0001, 100);
				this.pledgeList[item].perFullShare = lpPrice;
			});

			this.$store.commit("ethState/setData", {
				pledgeList: this.pledgeList
			});
		},
		//查询收入KEY
		async eth_getEarnedKey() {
			let keys = Object.keys(this.pledgeList);
			keys.map(async item => {
				let earnedKey = await Wallet.ETH.viewEarned(WalletConfig.ETH[item].dropAddr);
				this.pledgeList[item].earnedKey = Common.numFloor(BigNumber(earnedKey) / BigNumber(1e10), 100);
			});

			this.$store.commit("ethState/setData", {
				pledgeList: this.pledgeList
			});
		},
		//查询我质押的erc20
		async eth_setMintErc20Stake() {
			let keys = Object.keys(this.pledgeList);
			keys.map(async item => {
				let stakeLp = await Wallet.ETH.balanceOfToTarget(WalletConfig.ETH[item].poolAddr);
				let lpPrice = await Wallet.ETH.getPricePerFullShare(WalletConfig.ETH[item].mAddr);
				// console.log("stake", item, stakeLp.toString(), lpPrice.toString());
				// console.log("stake-truen", item, Common.numFloor(Number(BigNumber(stakeLp) * BigNumber(lpPrice) / BigNumber(1e18)) / WalletConfig.ETH[item].decimals, 1e18).toString());
				this.pledgeList[item].stake = Common.numFloor(Number(BigNumber(stakeLp) * BigNumber(lpPrice) / BigNumber(1e18)) / WalletConfig.ETH[item].decimals + 0.0001, 100);
				this.pledgeList[item].stakeLp = stakeLp;
			});

			// console.log("pledgeList-stake", this.pledgeList);
			this.$store.commit("ethState/setData", {
				pledgeList: this.pledgeList
			});
		},
		//设置查询挖矿币的授权
		async eth_setAllowanceMintCoinToPool() {
			let keys = Object.keys(this.pledgeList);
			keys.map(async item => {
				let allowanceToPool = await Wallet.ETH.viewErcAllowanceToTarget(WalletConfig.ETH[item].addr, WalletConfig.ETH[item].poolAddr);
		
				this.pledgeList[item].allowanceToPool = Number(allowanceToPool);
				// console.log("pledgeList-allowance", this.pledgeList);
			});
			this.$store.commit("ethState/setData", {
				pledgeList: this.pledgeList
			});
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
			let myMbox = await Wallet.ETH.getErc20BalanceByTokenAddr(WalletConfig.ETH.mboxToken, false);
			if (myMbox != null) {
				this.$store.commit("ethState/setData", {
					mbox: Common.numFloor((Number(myMbox) / 1e18), 10000)
				});
			}
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
		async setMyNftByType(type) {
			//优先在Strorage里面取
			let account = await Wallet.ETH.getAccount();
			let key = "myNFT_" + type;
			let storageKey = StorageConfig[key] + "-" + account;

			let ntfStorage = Common.getStorageItem(storageKey);
			let saveObj = {};
			saveObj[key] = JSON.parse(ntfStorage);
			if (ntfStorage != null) {
				this.$store.commit("ethState/setData", saveObj);
			}
			let nftObj = await Wallet.ETH.getMomosByType(type);
			if (nftObj != null) {
				saveObj[key] = nftObj;
				this.$store.commit("ethState/setData", saveObj);
				Common.setStorageItem(
					storageKey,
					JSON.stringify(nftObj)
				);
				//设置名字
				await this.setName(nftObj);
				this.$store.commit("ethState/setData", saveObj);
				Common.setStorageItem(
					storageKey,
					JSON.stringify(nftObj)
				);
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
		}
	}
}
export default InitEth;