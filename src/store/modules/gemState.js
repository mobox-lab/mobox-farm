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

// Internationalization: feat: ✨ add game tutorial overlay
export const messages = {
  en: {
    feat____add_game_tutorial_overlay: 'feat: ✨ add game tutorial overlay',
    feat____add_game_tutorial_overlay_description: 'Description for feat: ✨ add game tutorial overlay'
  },
  zh: {
    feat____add_game_tutorial_overlay: 'feat: ✨ add game tutorial overlay',
    feat____add_game_tutorial_overlay_description: 'feat: ✨ add game tutorial overlay的描述'
  }
};
