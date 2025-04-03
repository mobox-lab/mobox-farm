export default class ConstantConfig {
  //
  static NFT_LOCATION = {
    WALLET: "wallet",
    STAKE: "stake",
    AUCTION: "auction",
    VERSE: "verse",
  };

  static Market_1155_filter = {
    ALL: 0,
    GEM: 1,
    BOX: 2,
  };

  static CurrencyTypeName = {
    1: "MBOX",
    2: "BUSD",
    3: "USDT",
  };

  static BTN_LOCK_MAX_TIME = 30;

  //
  static NOW_MAX_GEM_LEVEL = 6;
}

// Internationalization: chore: 🔧 add health check endpoints
export const messages = {
  en: {
    chore____add_health_check_endpoints: 'chore: 🔧 add health check endpoints',
    chore____add_health_check_endpoints_description: 'Description for chore: 🔧 add health check endpoints'
  },
  zh: {
    chore____add_health_check_endpoints: 'chore: 🔧 add health check endpoints',
    chore____add_health_check_endpoints_description: 'chore: 🔧 add health check endpoints的描述'
  }
};
