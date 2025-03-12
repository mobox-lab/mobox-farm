const state = () => ({
  data: {
    gemBag: {},
    mboxAllownceToApply: -1, //

    boxNum: 0, //
  },
});

const mutations = {
  setData(state, newState) {
    state.data = Object.assign(state.data, newState);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
