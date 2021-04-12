const baseCoinAttr = {
	apy: "-%",
	balance: "-",
	balanceTrue: 0,
	stake: 0,
	stakeLp: 0,
	earnedKey: 0,
	gracePeriod: 0,
	wantAmount: 0,
	lpPrice: ["-","-"],
	lpPriceUpTs: 0,
	workingBalance: 0,
	totalSupply: 0,
	allowanceToPool: -1,
	allowanceToSwap: -1,
	allowanceToAuction: -1,
	totalAirdrop: 0,
	perFullShare: 0,
	isApproving: false, //是否授权中
	isDeposing: false, //是否充值中
	isWithdrawing: false, //是否提现中
	isRemoveLiqiditing: false, //是移除流动性中
	isAddLiqiditing: false, //是增加流动性中
}

const state = () => ({
	data: {
		coinArr: {
			"BNB": {...baseCoinAttr, isLP: false},
			"MBOX": {...baseCoinAttr, isLP: false},
			"BTCB": {...baseCoinAttr, isLP: false},
			"ETH": {...baseCoinAttr, isLP: false},
			"BUSD": {...baseCoinAttr, isLP: false},
			"USDT": {...baseCoinAttr, isLP: false},
			"DAI": {...baseCoinAttr, isLP: false},
			"USDC": {...baseCoinAttr, isLP: false},
			"KEY": {...baseCoinAttr, isLP: false},
			"MBOX-BNB": {...baseCoinAttr, isLP: true},
			"BTCB-BNB": {...baseCoinAttr, isLP: true},
			"ETH-BNB": {...baseCoinAttr, isLP: true},
			"BUSD-BNB": {...baseCoinAttr, isLP: true},
			"USDT-BNB": {...baseCoinAttr, isLP: true},
			"USDT-BUSD": {...baseCoinAttr, isLP: true},
			"DAI-BUSD": {...baseCoinAttr, isLP: true},
			"USDC-BUSD": {...baseCoinAttr, isLP: true},
			"KEY-BNB": {...baseCoinAttr, isLP: true},
			"ts": 0,
		},
		setting: {
			slippage: 0.5,
			duration: 20,
		},
		useCoinPos: 0,
		totalAirdropKey: 0,
		rewardStoreKey: 0,//暂存区的key

		//回购相关
		buyBack:{
			hasAmount: 0,
		},

		pancakeHistory: [],
		onlyShowPledge:false,
	},
})

const mutations = {
	setData(state, newState) {
		state.data = Object.assign(state.data, newState);
	},
	setCoinAllowance(state, {coinName, allowance, type}){
		state.data.coinArr["ts"] = new Date().valueOf();
		state.data.coinArr[coinName].isApproving = false;
		state.data.coinArr[coinName][type] = allowance;
	},
	clearLoading(state){
		for (let coinName in state.data.coinArr) {
			if(coinName == "ts") return;
			state.data.coinArr[coinName].isApproving = false;
			state.data.coinArr[coinName].isDeposing = false;
			state.data.coinArr[coinName].isWithdrawing = false;
			state.data.coinArr[coinName].isRemoveLiqiditing = false;
			state.data.coinArr[coinName].isAddLiqiditing = false;
		}
		state.data.conArr["ts"] = new Date().valueOf();
	},
};

export default {
	namespaced: true,
	state,
	mutations
};