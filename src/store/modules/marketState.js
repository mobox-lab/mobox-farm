const state = () => ({
	data: {
		myMarketPetFilter: {
			category: 0,
			vType: 0
		},

		marketPets: {
			limit: 1,
			list: [],
			page: 1,
			total: 0,
		},
		marketPetsMy: {
			limit: 1,
			list: [],
			page: 1,
			total: 0,
		},

		tempSells:[],
		tempMarketCancelTx:[],

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
		marketHistory: {lsit: [], total: 0, uptime: 0},
		historyNotice: false,
		momoNameObjs: {}
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
};

export default {
	namespaced: true,
	state,
	mutations
};