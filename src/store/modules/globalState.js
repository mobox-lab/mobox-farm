import {ConstantConfig} from "@/config";

const state = () => ({
	data: {
		connectWalletAddr: "",
		chainNetwork: 0,
		selectChain: "trx",
		addressArr: ["BNB: "],
		notifications: [],
		notificationsTrans: [],
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
			getKeyLock: 0, //领取KEY锁定
			changePriceLock: 0, //修改价格锁定
			buyMomoLock: 0, //购买按钮锁定
			approveLock: 0, //授权锁定
			stakeLock: 0, //质押锁定
			unStakeLock: 0, //取消质押锁定
			getMboxLock: 0, //领取mbox锁
			openBoxLock: 0,//开箱子锁
			compGemLock: 0,//升级宝石锁
			mboxApproveToApplyLock: 0, //mbox授权给申购合约锁
			applyGemLock:0,//申购宝石锁
			takeGemLock:0,//领取宝石锁
			takeMboxLock:0,//领取多余Mbox锁
			wearGemLock: 0,//穿戴宝石锁
			takeOffGemLock: 0,//移除宝石锁
			upgradeGemWearLock: 0,//穿戴升级锁
			cancelRentLock:0,//取消租赁锁
			rentLock:0,//租赁锁
			putRentLock: 0, //上架租赁锁
			freezeMboxLock: 0,//冻结Mbox锁
			unStakeMboxLock: 0,//取回冻结Mbox锁
			mboxApproveToVeMboxLock:0,//mbox授权给veMbox合约锁
			moveVeMboxLock: 0,
		},
		walletStatus: {
			status: 1, //1,等待中，2，reject，3，success
			msg: "",
			hash: ""
		},  
		airdropCountDown: 0,
		gemApplyEndCountDown: 0,
		nowTs: parseInt(new Date().valueOf()/1000),
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
	removeNotifyTrans(state, needRemove) {
		let notificationsTrans = [...state.data.notificationsTrans];
		notificationsTrans.map((item, index)=>{
			if(item.hash == needRemove.hash){
				notificationsTrans.splice(index, 1);
			}
		})
		// notificationsTrans.shift();
		state.data.notificationsTrans = notificationsTrans;
	},
	addNotifyTrans(state, notify) {
		notify.ts = new Date().valueOf();
		let notificationsTrans = [...state.data.notificationsTrans];
		notificationsTrans.push(notify);
		state.data.notificationsTrans = notificationsTrans;
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