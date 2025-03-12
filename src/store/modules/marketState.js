const state = () => ({
  data: {
    marketTabPos: 0,
    marketLoading: false,
    momoNameObjs: {},
    momoGemsObjs: {},
    marketTypePos: 0, //

    //momo
    //
    tempSells: [],
    tempMarketCancelTx: [],
    historyNotice: false,
    //
    marketPage: 1,
    marketMySellPage: 1,
    //
    myMarketPetFilter: { category: 0, vType: 0, searchProto: 0 },
    myMarketSellFilter: { category: 0, vType: 0 },
    marketSearch: { category: 0, vType: 0, sort: 0, pType: 0 },
    //
    marketPets: { limit: 1, list: [], page: 1, total: 0 },
    marketPetsMy: { limit: 1, list: [], page: 1, total: 0 },
    marketHistory: { list: [], total: 0, uptime: 0 },

    //
    //
    tempRentSells: [],
    tempRentMarketCancelTx: [],
    historyRentNotice: false,
    //
    marketRentPage: 1,
    marketRentMyPage: 1,
    marketRentMySellPage: 1,
    //
    myRentMarketFilter: { category: 0, vType: 0, state: 0 },
    marketRentSearch: { category: 0, vType: 0, sort: 0, rentDays: 0 },
    myRentMarketSellFilter: { type: 0, level: 0 },
    //
    marketRents: { limit: 1, list: [], page: 1, total: 0 },
    marketRentMy: { limit: 1, list: [], page: 1, total: 0 },
    marketRentHistory: { list: [], total: 0, uptime: 0 },
    marketRentOrderList: { list: [], total: 0 },

    //gem
    //
    tempGemSells: [],
    tempGemMarketCancelTx: [],
    historyGemNotice: false,
    //
    marketGemPage: 1,
    marketGemMySellPage: 1,
    //
    marketGemSearch: { type: 0, level: 0, sort: 0 },
    myGemMarketSellFilter: { type: 0, level: 0 },
    //
    marketGems: { limit: 1, list: [], page: 1, total: 0 },
    marketGemMy: { limit: 1, list: [], page: 1, total: 0 },
    marketGemHistory: { list: [], total: 0, uptime: 0 },

    marketGemFilter: 1,
    erc1155HisTs: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    },
    //
    shopCar: [],
    //
    groupSellCar: [],
  },
  //
  bulkBuyings: [],
});

const mutations = {
  setData(state, newState) {
    if (
      newState.marketTypePos != undefined &&
      state.data.marketTypePos == newState.marketTypePos
    ) {
      return;
    }
    state.data = Object.assign(state.data, newState);
  },
  setFilter(state, { type, value, filterName }) {
    state.data[filterName][type] = value;
  },
  initGemMarket(state, { defaultSort, marketTypePos }) {
    if (state.data.marketTypePos != marketTypePos) {
      state.data.marketGemPage = 1;
      state.data.marketGemMySellPage = 1;
      state.data.marketGemSearch = {
        type: 0,
        level: 0,
        sort: defaultSort,
        filter: 0,
      };
      state.data.myGemMarketSellFilter = { type: 0, level: 0 };
      state.data.marketGems = { limit: 1, list: [], page: 1, total: 0 };
      state.data.marketGemFilter = defaultSort;
      state.bulkBuyings = [];
    }
  },
  addToShopCar(state, newItem) {
    let shopCar = state.data.shopCar;
    let needPush = true;
    shopCar.map((item, index) => {
      if (item.tx == newItem.tx) {
        needPush = false;
        shopCar.splice(index, 1);
      }
    });
    //
    //
    if (needPush) {
      if (shopCar.length >= 6) {
        this.commit("globalState/addNotify", {
          msg: "Market_64",
          type: "error",
          isLangName: true,
        });
      } else {
        shopCar.unshift(newItem);
      }
    }
  },
  emptyShopCar(state) {
    state.data.shopCar = [];
  },
  addToGroupSellCar(state, newItem) {
    let groupSellCar = state.data.groupSellCar;
    let needPush = true;
    groupSellCar.map((item, index) => {
      if (item.prototype == newItem.prototype) {
        needPush = false;
        item.inGroupSellCar = false;
        item.groupSellPrice = "";
        groupSellCar.splice(index, 1);
      }
    });
    //
    //
    if (needPush) {
      if (groupSellCar.length >= 6) {
        this.commit("globalState/addNotify", {
          msg: "Market_65",
          type: "error",
          isLangName: true,
        });
      } else {
        newItem.inGroupSellCar = true;
        groupSellCar.unshift(newItem);
      }
    }
  },
  emptyGroupSellCar(state) {
    state.data.groupSellCar.map((item) => {
      item.inGroupSellCar = false;
      item.groupSellPrice = "";
    });
    state.data.groupSellCar = [];
  },
  setBulkBuying(state, data) {
    state.bulkBuyings = data;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
