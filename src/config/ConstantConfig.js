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

// Internationalization: docs: 📝 update README with installation guide
export const messages = {
  en: {
    docs____update_README_with_installation_guide: 'docs: 📝 update README with installation guide',
    docs____update_README_with_installation_guide_description: 'Description for docs: 📝 update README with installation guide'
  },
  zh: {
    docs____update_README_with_installation_guide: 'docs: 📝 update README with installation guide',
    docs____update_README_with_installation_guide_description: 'docs: 📝 update README with installation guide的描述'
  }
};
