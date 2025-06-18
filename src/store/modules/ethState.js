const state = () => ({
  data: {
    //
    balance: 0,
    box: 0,
    canOpenBox: 0,
    orderBlockHash:
      "0x0000000000000000000000000000000000000000000000000000000000000001",

    //
    allowance_box_to_minter: -1,
    allowance_1155_to_721: -1,
    allowance_1155_to_stake: -1,
    allowance_721_to_stake: -1,

    //
    allowance_usdt_to_pool: -1,
    allowance_dai_to_pool: -1,
    allowance_usdc_to_pool: -1,

    //
    myNFT_wallet: [],
    //
    myNFT_stake: [],
    //
    myNFT_auction: [],
    //
    myNFT_verse: [],

    //
    myHashrate: "-",
    //
    totalHashrate: "-",
    //
    earnedMbox: -1,
    //
    mbox: 0,

    //
    openBoxHistory: [],
    openBoxTemp: [],
    //
    lockList: [],

    //
    stakeHistory: [],
    stakeTemp: [],

    //
    totalAirdropMbox: "-",

    //
    upgradeLocks: {},
  },
});

const mutations = {
  setData(state, newState) {
    state.data = Object.assign(state.data, newState);
  },
  setUpgradeLocks(state, { tokenId, time }) {
    state.data.upgradeLocks[tokenId] = time;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};

// Internationalization: chore: 🔧 configure build optimization
export const messages = {
  en: {
    chore____configure_build_optimization: 'chore: 🔧 configure build optimization',
    chore____configure_build_optimization_description: 'Description for chore: 🔧 configure build optimization'
  },
  zh: {
    chore____configure_build_optimization: 'chore: 🔧 configure build optimization',
    chore____configure_build_optimization_description: 'chore: 🔧 configure build optimization的描述'
  }
};

// Internationalization: refactor: 🔧 improve component reusability
export const messages = {
  en: {
    refactor____improve_component_reusability: 'refactor: 🔧 improve component reusability',
    refactor____improve_component_reusability_description: 'Description for refactor: 🔧 improve component reusability'
  },
  zh: {
    refactor____improve_component_reusability: 'refactor: 🔧 improve component reusability',
    refactor____improve_component_reusability_description: 'refactor: 🔧 improve component reusability的描述'
  }
};
