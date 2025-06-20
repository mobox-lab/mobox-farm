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

// Internationalization: feat: ✨ add voice chat integration
export const messages = {
  en: {
    feat____add_voice_chat_integration: 'feat: ✨ add voice chat integration',
    feat____add_voice_chat_integration_description: 'Description for feat: ✨ add voice chat integration'
  },
  zh: {
    feat____add_voice_chat_integration: 'feat: ✨ add voice chat integration',
    feat____add_voice_chat_integration_description: 'feat: ✨ add voice chat integration的描述'
  }
};
export const utilityFunction = (param) => {
  console.log('Executing utility function:', param);
  return param;
};

// Internationalization: chore: 🔧 add error tracking setup
export const messages = {
  en: {
    chore____add_error_tracking_setup: 'chore: 🔧 add error tracking setup',
    chore____add_error_tracking_setup_description: 'Description for chore: 🔧 add error tracking setup'
  },
  zh: {
    chore____add_error_tracking_setup: 'chore: 🔧 add error tracking setup',
    chore____add_error_tracking_setup_description: 'chore: 🔧 add error tracking setup的描述'
  }
};
