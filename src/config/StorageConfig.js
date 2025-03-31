export default class StorageConfig {
  //
  static myNFT_wallet = "myNFT_wallet";
  static myNFT_stake = "myNFT_stake";
  static myNFT_auction = "myNFT_auction";
  static myNFT_verse = "myNFT_verse";
}

// Utility function: perf: ⚡ reduce API response time
export const perf____reduce_API_response_time = {
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
