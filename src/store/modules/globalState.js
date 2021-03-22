import {ConstantConfig} from "@/config";

const state = () => ({
	data: {
		selectChain: "trx",
		addressArr: ["BNB: "],
		notifications: [],
		myPetPage: 1,
		myPetFilter: {
			category: 0,
			vType: 0
		},

		totalOpenBoxAmount: {
			eth: 0,
			trx: 0,
			bnb: 0
		},
		lockBtn:{
			getKeyLock: 0,
			changePriceLock: 0,
			buyMomoLock: 0,
		},
		walletStatus: {
			status: 1, //1,等待中，2，reject，3，success
			msg: "",
			hash: ""
		},  
	},
})

const chainPos = {
	"BNB": 0,
}

const mutations = {
	setData(state, newState) {
		state.data = Object.assign(state.data, newState);
	},
	//修改全局选中的链
	changeSelectChain(state, chainName) {
		state.data.selectChain = chainName;
	},
	setChainAddr(state, {type,addr}) {
		let defaultArr = [...state.data.addressArr];
		defaultArr[chainPos[type]] = type + ": " + addr;
		state.data.addressArr = defaultArr;
	},
	removeNotify(state) {
		let notifications = [...state.data.notifications];
		notifications.shift();
		state.data.notifications = notifications;
	},
	addNotify(state, notify) {
		notify.hash = new Date().valueOf();
		let notifications = [...state.data.notifications];
		notifications.push(notify);
		state.data.notifications = notifications;
	},
	setMyPetPage(state, page) {
		state.data.myPetPage = page;
	},
	myPetFilter(state, {type,value}) {
		state.data.myPetFilter[type] = value;
	},
	setChainTotalOpenBox(state, {chain,num}) {
		state.data.totalOpenBoxAmount[chain] = num;
	},
	lockBtn(state, type){
		state.data.lockBtn[type] = ConstantConfig.BTN_LOCK_MAX_TIME;
	},
	unLockBtn(state, type){
		state.data.lockBtn[type] = 0;
	},
	setwalletStatus(state, {status, hash, msg}){
		state.data.walletStatus.status = status || 1;
		state.data.walletStatus.msg = msg || "";
		state.data.walletStatus.hash = hash || "";
	}
};

export default {
	namespaced: true,
	state,
	mutations
};