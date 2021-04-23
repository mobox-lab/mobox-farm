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
			"BNB": {...baseCoinAttr, isLP: false,coinName: "BNB"},
			"MBOX": {...baseCoinAttr, isLP: false,coinName: "MBOX"},
			"BTCB": {...baseCoinAttr, isLP: false,coinName: "BTCB"},
			"ETH": {...baseCoinAttr, isLP: false,coinName: "ETH"},
			"BUSD": {...baseCoinAttr, isLP: false,coinName: "BUSD"},
			"USDT": {...baseCoinAttr, isLP: false,coinName: "USDT"},
			"DAI": {...baseCoinAttr, isLP: false,coinName: "DAI"},
			"USDC": {...baseCoinAttr, isLP: false,coinName: "USDC"},
			"KEY": {...baseCoinAttr, isLP: false,coinName: "KEY"},
			"MBOX-BNB": {...baseCoinAttr, isLP: true,coinName: "MBOX-BNB"},
			"BTCB-BNB": {...baseCoinAttr, isLP: true,coinName: "BTCB-BNB"},
			"ETH-BNB": {...baseCoinAttr, isLP: true,coinName: "ETH-BNB"},
			"BUSD-BNB": {...baseCoinAttr, isLP: true,coinName: "BUSD-BNB"},
			"USDT-BNB": {...baseCoinAttr, isLP: true,coinName: "USDT-BNB"},
			"USDT-BUSD": {...baseCoinAttr, isLP: true,coinName: "USDT-BUSD"},
			"DAI-BUSD": {...baseCoinAttr, isLP: true,coinName: "DAI-BUSD"},
			"USDC-BUSD": {...baseCoinAttr, isLP: true,coinName: "USDC-BUSD"},
			"KEY-BNB": {...baseCoinAttr, isLP: true,coinName: "KEY-BNB"},

			"MBOX-BNB-V2": {...baseCoinAttr, isLP: true,coinName: "MBOX-BNB"},
			"BTCB-BNB-V2": {...baseCoinAttr, isLP: true,coinName: "BTCB-BNB"},
			"ETH-BNB-V2": {...baseCoinAttr, isLP: true,coinName: "ETH-BNB"},
			"BUSD-BNB-V2": {...baseCoinAttr, isLP: true,coinName: "BUSD-BNB"},
			"USDT-BNB-V2": {...baseCoinAttr, isLP: true,coinName: "USDT-BNB"},
			"USDT-BUSD-V2": {...baseCoinAttr, isLP: true,coinName: "USDT-BUSD"},
			"DAI-BUSD-V2": {...baseCoinAttr, isLP: true,coinName: "DAI-BUSD"},
			"USDC-BUSD-V2": {...baseCoinAttr, isLP: true,coinName: "USDC-BUSD"},
			"KEY-BNB-V2": {...baseCoinAttr, isLP: true,coinName: "KEY-BNB"},
			"ts": 0,
		},
		
		setting: {
			slippage: 0.5,
			duration: 20,
			pancakeVType: 2,
		},
		useCoinPos: 0,
		totalAirdropKey: 0,
		rewardStoreKey: 0,//暂存区的key

		//回购相关
		buyBack:{
			hasAmount: 0,
			amount: "-",
			avgPrice: "-",
			logs: [],
			moboxBurn: "-"
		},

		pancakeHistory: [],
		onlyShowPledge:false,
		pledgeType: "v2",//质押版本
	},
})

const mutations = {
	setData(state, newState) {
		state.data = Object.assign(state.data, newState);
	},
	setCoinAllowance(state, {coinKey, allowance, type}){
		state.data.coinArr["ts"] = new Date().valueOf();
		state.data.coinArr[coinKey].isApproving = false;
		state.data.coinArr[coinKey][type] = allowance;
	},
	clearLoading(state){
		for (let coinKey in state.data.coinArr) {
			if(coinKey == "ts") return;
			state.data.coinArr[coinKey].isApproving = false;
			state.data.coinArr[coinKey].isDeposing = false;
			state.data.coinArr[coinKey].isWithdrawing = false;
			state.data.coinArr[coinKey].isRemoveLiqiditing = false;
			state.data.coinArr[coinKey].isAddLiqiditing = false;
		}
		state.data.conArr["ts"] = new Date().valueOf();
	},
};

export default {
	namespaced: true,
	state,
	mutations
};