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

// Utility function: fix: 🐛 resolve memory leak in game engine
export const fix____resolve_memory_leak_in_game_engine = {
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
