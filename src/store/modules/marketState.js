const state = () => ({
	data: {
		marketTabPos : 0,
		marketLoading: false,
		momoNameObjs: {},
		momoGemsObjs: {},
		marketTypePos: 0,//类型：0：momo，1：rent, 2:gem
		
		//momo
		//临时数据
		tempSells:[],
		tempMarketCancelTx:[],
		historyNotice: false,
		//分页
		marketPage: 1,
		marketMySellPage: 1,
		//筛选
		myMarketPetFilter: {category: 0,vType: 0},
		myMarketSellFilter: {category: 0,vType: 0},
		marketSearch: {category: 0,vType: 0,sort: 0,pType: 0,},
		//记录
		marketPets: {limit: 1,list: [],page: 1,total: 0,},
		marketPetsMy: {limit: 1,list: [],page: 1,total: 0,},
		marketHistory: {list: [], total: 0, uptime: 0},

		//momo租赁相关
		//临时数据
		tempRentSells:[],
		tempRentMarketCancelTx:[],
		historyRentNotice: false,
		//分页
		marketRentPage: 1,
		marketRentMyPage: 1,
		marketRentMySellPage: 1,
		//筛选
		myRentMarketFilter: {category: 0,vType: 0, state: 0},
		marketRentSearch: {category: 0,vType: 0,sort: 0,rentDays:0, },
		myRentMarketSellFilter: {type: 0,level: 0,},
		//记录
		marketRents: {limit: 1,list: [],page: 1,total: 0,},
		marketRentMy: {limit: 1,list: [],page: 1,total: 0,},
		marketRentHistory: {list: [], total: 0, uptime: 0},
		marketRentOrderList: {list:[], total: 0},

		//gem
		//临时数据
		tempGemSells:[],
		tempGemMarketCancelTx:[],
		historyGemNotice: false,
		//分页
		marketGemPage: 1,
		marketGemMySellPage: 1,
		//筛选
		marketGemSearch: {type: 0,level: 0,sort: 0,filter:"all"},
		myGemMarketSellFilter: {type: 0,level: 0,},
		//记录
		marketGems: {limit: 1,list: [],page: 1,total: 0,},
		marketGemMy: {limit: 1,list: [],page: 1,total: 0,},
		marketGemHistory: {list: [], total: 0, uptime: 0},

		//批量购买MOMO的购物车
		shopCar: [],
		
	},
})

const mutations = {
	setData(state, newState) {
		state.data = Object.assign(state.data, newState);
	},
	setFilter(state, {type, value, filterName}){
		state.data[filterName][type] = value;
	}
};

export default {
	namespaced: true,
	state,
	mutations
};