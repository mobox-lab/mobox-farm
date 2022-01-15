import Common from "../../utils/Common";

const baseCoinAttr = {
	apy: "-%",
	allKeyApy: "-",
	myApy: {
		key: "-",
		xvs: "-",
		cake: "-",
		lpFee: "-"
	},
	maxKeyApy: "-",
	maxApyNeedVeMobox: "-",
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
	allowanceToQuickSwap: -1,
	allowanceToAuction: -1,
	allowanceToBigAuction: -1, //大宗交易
	allowanceToGemAuction: -1,
	allowanceToRent: -1,
	allowanceToVeMbox: -1,
	allowanceToBid: -1,
	allowanceToOrderBook: -1, //授权给订单部市场合约
	allowanceToMomoEnhancer: -1, //授权给momo进化合约
	totalAirdrop: 0,
	perFullShare: 0,
	isApproving: false, //是否授权中
	isDeposing: false, //是否充值中
	isWithdrawing: false, //是否提现中
	isRemoveLiqiditing: false, //是移除流动性中
	isAddLiqiditing: false, //是增加流动性中
	veMbox: {
		mul: 100, //倍率
		orderIndexs: {
			"0": {stakeMbox: 0,endTime: 0, veMboxNum: 0,},
			"1": {stakeMbox: 0,endTime: 0, veMboxNum: 0,},
			"2": {stakeMbox: 0,endTime: 0, veMboxNum: 0,},
		},
		orderIndexsCountDown: {
			"0": -1,
			"1": -1,
			"2": -1,
		},
		notice: false,
	},
	myShare: 0, //我在池子质押的份额
	shareTotal: 0,//池子总质押
	veMoboxSupply: 0,//池子总质押veMbox
	veMboxTotal: 0,//所有池子的veMBOX
	addAllocPoint: 0, //增加的挖矿比例
}

const state = () => ({
	data: {
		coinArr: {
			"GOV": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "GOV",coinKey: "GOV"},
			"BNB": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "BNB"},
			"MBOX": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "MBOX"},
			"BTCB": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "BTCB"},
			"ETH": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "ETH"},
			"BUSD": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "BUSD"},
			"USDT": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "USDT"},
			"DAI": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "DAI"},
			"USDC": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "USDC"},
			"KEY": {...Common.ObjClone(baseCoinAttr), isLP: false,coinName: "KEY"},
			"MBOX-BNB": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "MBOX-BNB"},
			"BTCB-BNB": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "BTCB-BNB"},
			"ETH-BNB": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "ETH-BNB"},
			"BUSD-BNB": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "BUSD-BNB"},
			"USDT-BNB": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "USDT-BNB"},
			"USDT-BUSD": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "USDT-BUSD"},
			"DAI-BUSD": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "DAI-BUSD"},
			"USDC-BUSD": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "USDC-BUSD"},
			"KEY-BNB": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "KEY-BNB"},

			"MBOX-BNB-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "MBOX-BNB"},
			"BTCB-BNB-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "BTCB-BNB"},
			"ETH-BNB-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "ETH-BNB"},
			"BUSD-BNB-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "BUSD-BNB"},
			"USDT-BNB-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "USDT-BNB"},
			"USDT-BUSD-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "USDT-BUSD"},
			"DAI-BUSD-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "DAI-BUSD"},
			"USDC-BUSD-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "USDC-BUSD"},
			"KEY-BNB-V2": {...Common.ObjClone(baseCoinAttr), isLP: true,coinName: "KEY-BNB"},
			"ts": 0,
		},

		balancePool: {
			"BANANA": {
				coinName: "BANANA",
				website: "https://apeswap.finance",
				des: "ApeSwap",
				color: "#FFD54F",
				version: "-",
				amount: 0,
				dayDrop: 1551
			},
			// "RABBIT": {
			// 	coinName: "RABBIT",
			// 	website: "https://www.rabbitfinance.io",
			// 	des: "Rabbit Finance",
			// 	color: "#E7A28A",
			// 	version: "-",
			// 	amount: "-",
			// 	dayDrop: 652125
			// },
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
			moboxBurn: "-",
			circulating: "-"
		},

		pancakeHistory: [],
		onlyShowPledge:false,
		pledgeType: "v2",//质押版本
		veMboxLogs: [],//veMbox想操作日志
		avglockdays: 0,//平均质押时长
		totalStakeMbox: 0,//共质押的MBOX
		veMboxTotal:0,//共质押的vembox
		myTotalVeMbox: 0, //我的总veMbox
		canUseVeMbox: 0,//可以使用的veMbox
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