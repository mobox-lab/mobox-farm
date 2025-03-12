import Common from "../../utils/Common";

const baseCoinAttr = {
  apy: "-%",
  allKeyApy: "-",
  myApy: {
    key: "-",
    xvs: "-",
    cake: "-",
    lpFee: "-",
  },
  maxKeyApy: "-",
  maxApyNeedVeMobox: "-",
  balance: "-",
  balanceTrue: 0,
  stake: 0,
  stakeLp: 0,
  earnedKey: 0,
  gracePeriod: 0,
  wantAmount: "-",
  lpPrice: ["-", "-"],
  lpPriceUpTs: 0,
  workingBalance: 0,
  totalSupply: 0,
  allowanceToPool: -1,
  allowanceToSwap: -1,
  allowanceToQuickSwap: -1,
  allowanceToAuction: -1,
  allowanceToBigAuction: -1, //
  allowanceToGemAuction: -1,
  allowanceToRent: -1,
  allowanceToVeMbox: -1,
  allowanceToBid: -1,
  allowanceToOrderBook: -1, //
  allowanceToMomoEnhancer: -1, //
  totalAirdrop: 0,
  perFullShare: 0,
  isApproving: false, //
  isDeposing: false, //
  isWithdrawing: false, //
  isRemoveLiqiditing: false, //
  isAddLiqiditing: false, //
  veMbox: {
    mul: 100, //
    orderIndexs: {
      0: { stakeMbox: "-", endTime: 0, veMboxNum: "-" },
      1: { stakeMbox: 0, endTime: 0, veMboxNum: 0 },
      2: { stakeMbox: 0, endTime: 0, veMboxNum: 0 },
    },
    orderIndexsCountDown: {
      0: -1,
      1: -1,
      2: -1,
    },
    notice: false,
  },
  myShare: 0, //
  shareTotal: 0, //
  veMoboxSupply: 0, //
  veMboxTotal: 0, //
  addAllocPoint: 0, //
};

const state = () => ({
  data: {
    coinArr: {
      GOV: {
        ...Common.ObjClone(baseCoinAttr),
        isLP: false,
        coinName: "GOV",
        coinKey: "GOV",
      },
      BNB: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "BNB" },
      MBOX: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "MBOX" },
      BTCB: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "BTCB" },
      MEC: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "MEC" },
      ETH: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "ETH" },
      BUSD: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "BUSD" },
      USDT: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "USDT" },
      DAI: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "DAI" },
      USDC: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "USDC" },
      KEY: { ...Common.ObjClone(baseCoinAttr), isLP: false, coinName: "KEY" },
      "MBOX-BNB": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "MBOX-BNB",
      },
      "BTCB-BNB": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "BTCB-BNB",
      },
      "ETH-BNB": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "ETH-BNB",
      },
      "BUSD-BNB": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "BUSD-BNB",
      },
      "USDT-BNB": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "USDT-BNB",
      },
      "USDT-BUSD": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "USDT-BUSD",
      },
      "DAI-BUSD": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "DAI-BUSD",
      },
      "USDC-BUSD": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "USDC-BUSD",
      },
      "KEY-BNB": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "KEY-BNB",
      },

      "MBOX-BNB-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "MBOX-BNB",
      },
      "MBOX-MEC": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "MBOX-MEC",
      },
      "BTCB-BNB-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "BTCB-BNB",
      },
      "ETH-BNB-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "ETH-BNB",
      },
      "BUSD-BNB-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "BUSD-BNB",
      },
      "USDT-BNB-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "USDT-BNB",
      },
      "USDT-BUSD-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "USDT-BUSD",
      },
      "DAI-BUSD-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "DAI-BUSD",
      },
      "USDC-BUSD-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "USDC-BUSD",
      },
      "KEY-BNB-V2": {
        ...Common.ObjClone(baseCoinAttr),
        isLP: true,
        coinName: "KEY-BNB",
      },
      ts: 0,
    },

    balancePool: {
      BANANA: {
        coinName: "BANANA",
        website: "https://apeswap.finance",
        des: "ApeSwap",
        color: "#FFD54F",
        version: "-",
        amount: 0,
        dayDrop: 1551,
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
      ts: 0,
    },

    setting: {
      slippage: 0.5,
      duration: 20,
      pancakeVType: 2,
    },
    useCoinPos: 0,
    totalAirdropKey: 0,
    rewardStoreKey: 0, //

    //
    buyBack: {
      hasAmount: 0,
      amount: "-",
      avgPrice: "-",
      logs: [],
      moboxBurn: "-",
      circulating: "-",
    },

    pancakeHistory: [],
    onlyShowPledge: false,
    pledgeType: "v2", //
    veMboxLogs: [], //
    avglockdays: 0, //
    totalStakeMbox: 0, //
    veMboxTotal: 0, //
    myTotalVeMbox: 0, //
    canUseVeMbox: "-", //
  },
});

const mutations = {
  setData(state, newState) {
    state.data = Object.assign(state.data, newState);
  },
  setCoinAllowance(state, { coinKey, allowance, type }) {
    state.data.coinArr["ts"] = new Date().valueOf();
    state.data.coinArr[coinKey].isApproving = false;
    state.data.coinArr[coinKey][type] = allowance;
  },
  clearLoading(state) {
    for (let coinKey in state.data.coinArr) {
      if (coinKey == "ts") return;
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
  mutations,
};
