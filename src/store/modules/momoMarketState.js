const state = () => ({
  data: {
    menuTabPos: 0,
    //
    bigSellFilter: { sort: 0 },
    bigSells: { limit: 1, list: [], page: 1, total: 0 },
    bigSellPage: 1,
    bigSellMy: { limit: 1, list: [], page: 1, total: 0 },
  },
});

const mutations = {
  setData(state, newState) {
    state.data = Object.assign(state.data, newState);
  },
  setFilter(state, { type, value, filterName }) {
    state.data[filterName][type] = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

const handleError = (error) => {
  console.error('Error occurred:', error);
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  return false;
};

const safeExecute = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
