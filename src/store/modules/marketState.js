const state = () => ({
	data: {
		myMarketPetFilter: {
			category: 0,
			vType: 0
		},

		marketPets: {limit: 1,list: [],page: 1,total: 0,},
		marketPetsMy: {limit: 1,list: [],page: 1,total: 0,},
		marketGems: {limit: 1,list: [],page: 1,total: 0,},
		marketGemMy: {limit: 1,list: [],page: 1,total: 0,},

		tempSells:[],
		tempMarketCancelTx:[],

		//gem
		tempGemSells:[],
		tempGemMarketCancelTx:[],

		marketMySellPage: 1,
		myMarketSellFilter: {
			category: 0,
			vType: 0
		},

		marketTabPos : 0,
		marketLoading: false,

		marketPage: 1,
		marketSearch: {
			category: 0,
			vType: 0,
			sort: 0,
			pType: 0,
		},
		marketGemPage: 1,
		marketGemSearch: {
			type: 0,
			level: 0,
			sort: 0,
		},
		marketGemMySellPage: 1,
		myGemMarketSellFilter: {
			type: 0,
			level: 0,
		},
		marketHistory: {lsit: [], total: 0, uptime: 0},
		marketGemHistory: {lsit: [], total: 0, uptime: 0},
		historyNotice: false,
		historyGemNotice: false,
		momoNameObjs: {},
		momoGemsObjs: {},
		marketTypePos: 0,//类型：0：momo，1：gem
	},
})

const mutations = {
	setData(state, newState) {
		state.data = Object.assign(state.data, newState);
	},
	myMarketSellFilter(state, {type,value}) {
		state.data.myMarketSellFilter[type] = value;
	},
	myMarketPetFilter(state, {type,value}) {
		state.data.myMarketPetFilter[type] = value;
	},
	marketSearch(state, {type,value}) {
		state.data.marketSearch[type] = value;
	},
	//宝石市场
	myGemMarketSellFilter(state, {type,value}) {
		state.data.myGemMarketSellFilter[type] = value;
	},
	myGemMarketPetFilter(state, {type,value}) {
		state.data.myMarketPetFilter[type] = value;
	},
	marketGemSearch(state, {type,value}) {
		state.data.marketGemSearch[type] = value;
	},
};

export default {
	namespaced: true,
	state,
	mutations
};