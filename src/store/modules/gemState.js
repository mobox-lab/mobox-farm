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

// Utility function: refactor: 🔧 improve form validation
export const refactor_______improve_form_validation = {
  format: (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input) => {
    return input && input.length > 0;
  },
  transform: (data) => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
