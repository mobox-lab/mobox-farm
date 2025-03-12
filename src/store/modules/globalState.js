import { ConstantConfig } from "@/config";
import MoMoSetting from "../../utils/wallet/eth/group/MoMoSetting";

const STEP_SEC = 2592000; //
const STEP_START_PRE = 1637640000; //
const STEP_10_BEGIN = 1663560000; //

function getMinHashrate(lv, step) {
  if (lv == 4) {
    return ((step - 8) / 2) * 10 + 10;
  } else if (lv == 5) {
    return ((step - 8) / 2) * 20 + 50;
  } else {
    return 180;
  }
}

const state = () => ({
  mecApy: (100 + Math.random() * 100).toFixed(1),
  //
  batchEnhancement: [],
  //
  isShowBatchEnhancement: false,
  v4MinHashrate: "",
  v5MinHashrate: "",
  hashrateInfo: {
    //
    v4MinHashrate: null,
    v4StandardHashrate: null,
    v4MaxHashrate: null,
    //
    v5MinHashrate: null,
    v5StandardHashrate: null,
    v5MaxHashrate: null,
    //
    v6MinHashrate: null,
    v6StandardHashrate: null,
    v6MaxHashrate: null,
    //
    nextStepTime: null,
    //
    currentStep: null,
  },
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
      vType: 0,
      searchProto: 0,
      location: 0,
    },

    totalOpenBoxAmount: {
      eth: 0,
      trx: 0,
      bnb: 0,
    },
    lockBtn: {
      getKeyLock: 0, //
      changePriceLock: 0, //
      buyMomoLock: 0, //
      approveLock: 0, //
      stakeLock: 0, //
      unStakeLock: 0, //
      getMboxLock: 0, //
      openBoxLock: 0, //
      openActivityBoxLock: 0, //
      compGemLock: 0, //
      mboxApproveToApplyLock: 0, //
      applyGemLock: 0, //
      takeGemLock: 0, //
      takeMboxLock: 0, //
      wearGemLock: 0, //
      takeOffGemLock: 0, //
      upgradeGemWearLock: 0, //
      cancelRentLock: 0, //
      rentLock: 0, //
      putRentLock: 0, //
      freezeMboxLock: 0, //
      unStakeMboxLock: 0, //
      mboxApproveToVeMboxLock: 0, //
      moveVeMboxLock: 0,
      joinStakeLock: 0,
      bidLock: 0,
      applyBoxLock: 0,
      applyMdxBoxLock: 0,
      takeMdxBoxLock: 0,
      makeBidOrderLock: 0,
      makeAskOrderLock: 0,
      refundMboxLock: 0,
      addCrystalLock: 0, //
      enhanceLock: 0, //
      openMecBoxLock: 0,
      transMoMoLock: 0, //
      claimBNFTLock: 0, //
    },
    walletStatus: {
      status: 1, //
      msg: "",
      hash: "",
    },
    airdropCountDown: 0,
    gemApplyEndCountDown: 0,
    nowTs: parseInt(new Date().valueOf() / 1000),
    buyBackType: 1,
    getNowBlock: "-",
    momoNumObj: {},
    mboxAllownceToBoxApply: -1, //
    hasLoadSpine: false,
    //
    refundData: { short: 0, middle: 0, long: 0, total: 0, refunded: "-" },
    //momoSetting
    momoSetting: {
      updateTime: 0,
      v4_max_upgrade: 0,
      v4_max_enhance: 0,
      v5_max_upgrade: 0,
      v5_max_enhance: 0,
      v6_max_upgrade: 0,
      v6_max_enhance: 0,
    },
  },
});

const chainPos = {
  BNB: 0,
};

const mutations = {
  setData(state, newState) {
    state.data = Object.assign(state.data, newState);
  },
  //
  changeSelectChain(state, chainName) {
    state.data.selectChain = chainName;
  },
  setChainAddr(state, { type, addr }) {
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
    notificationsTrans.map((item, index) => {
      if (item.hash == needRemove.hash) {
        notificationsTrans.splice(index, 1);
      }
    });
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
  myPetFilter(state, { type, value }) {
    state.data.myPetFilter[type] = value;
  },
  setChainTotalOpenBox(state, { chain, num }) {
    state.data.totalOpenBoxAmount[chain] = num;
  },
  lockBtn(state, type) {
    state.data.lockBtn[type] = ConstantConfig.BTN_LOCK_MAX_TIME;
  },
  unLockBtn(state, type) {
    state.data.lockBtn[type] = 0;
  },
  setwalletStatus(state, { status, hash, msg }) {
    state.data.walletStatus.status = status || 1;
    state.data.walletStatus.msg = msg || "";
    state.data.walletStatus.hash = hash || "";
  },
  setStep(state, value) {
    state.v4MinHashrate = getMinHashrate(4, +value + 1);
    state.v5MinHashrate = getMinHashrate(5, +value + 1);
  },
  //
  setHashrateInfo(state, value) {
    state.hashrateInfo = value;
  },
  //
  addBatchEnhancement(state, item) {
    state.batchEnhancement.push(item);
  },
  //
  removeBatchEnhancement(state, data) {
    const index = state.batchEnhancement.findIndex(
      (item) => item.tokenId === data.tokenId
    );
    state.batchEnhancement.splice(index, 1);
  },
  //
  clearBatchEnhancement(state) {
    state.batchEnhancement = [];
  },
  //
  toggleShowBatchEnhancement(state) {
    state.isShowBatchEnhancement = !state.isShowBatchEnhancement;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
