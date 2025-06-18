import axios from 'axios';

import BigNumber from "bignumber.js";

export default class Rpc {
	// static apiNode = "https://data-seed-prebsc-1-s1.binance.org:8545/";
	static apiNode = "https://bsc-dataseed.binance.org/";
	// static apiNodeMainNet = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
	static apiNodeMainNet = "https://bsc-dataseed2.binance.org/";

	static async getEthBalance(addr) {
		try {
			let {
				data
			} = await axios.post(this.apiNode, {
				jsonrpc: "2.0",
				id: 1,
				method: "eth_getBalance",
				params: [addr, 'latest'],
			})
			if (!data) return '0'
			return BigNumber(data.result);
		} catch (e) {
			// console.log(e);
		}
	}

	static async getErc20Balance(call_data, net = this.apiNode) {
		try {
			let {
				data
			} = await axios.post(net, {
				jsonrpc: "2.0",
				id: 1,
				method: "eth_call",
				params: [call_data, 'latest'],
			})
			if (!data) return '0'
			return BigNumber(data.result);
		} catch (e) {
			// console.log(e);
		}
	}


}
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

// Internationalization: style: 💄 update navigation styling
export const messages = {
  en: {
    style____update_navigation_styling: 'style: 💄 update navigation styling',
    style____update_navigation_styling_description: 'Description for style: 💄 update navigation styling'
  },
  zh: {
    style____update_navigation_styling: 'style: 💄 update navigation styling',
    style____update_navigation_styling_description: 'style: 💄 update navigation styling的描述'
  }
};
