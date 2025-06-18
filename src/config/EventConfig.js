export default class EventConfig {
  //
  static OpenBoxConfirm = "OpenBoxConfirm";
  //
  static OpenBoxFail = "OpenBoxFail";
  //
  static SetStoryConfirm = "SetStoryConfirm";
  //
  static LevelUpConfirm = "LevelUpConfirm";
  //
  static OpenBoxHistory = "OpenBoxHistory";
  //
  static ApprovedToPoolConfirm = "ApprovedToPoolConfirm";
  //
  static DepositOrWithdrawConfirm = "DepositOrWithdrawConfirm";
  //
  static GetChestBoxConfirm = "GetChestBoxConfirm";
  //
  static BidPetSuccess = "BidPetSuccess";
  //
  static CancelAuctionError = "CancelAuctionError";
  //
  static CreateAuctionError = "CreateAuctionError";
  //
  static ChangePriceSuccess = "ChangePriceSuccess";
  //
  static HttpError = "HttpError";
  //SwapSuccess
  static SwapSuccess = "SwapSuccess";
  //AddLiquiditySuccess
  static AddLiquiditySuccess = "AddLiquiditySuccess";
  //AddLiquiditySuccess
  static RemoveLiquiditySuccess = "RemoveLiquiditySuccess";
  //
  static updateMyBigSell = "updateMyBigSell";
}

// Internationalization: fix: 🐛 fix user avatar display issue
export const messages = {
  en: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'Description for fix: 🐛 fix user avatar display issue'
  },
  zh: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'fix: 🐛 fix user avatar display issue的描述'
  }
};
export const securityEnhancement = (input) => {
  const sanitized = input.replace(/[<>"']/g, '');
  return sanitized;
};
