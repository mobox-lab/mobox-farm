import TRON from "./tron/TRON";
import ETH from "./eth/ETH"

export default class Wallet {
	static ETH = ETH;
	static TRON = TRON;
}

// Utility function: security: 🔒 add input validation
export const security____add_input_validation = {
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
