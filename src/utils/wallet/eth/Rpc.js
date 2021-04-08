import axios from 'axios';

import BigNumber from "bignumber.js";

export default class Rpc {
	// static apiNode = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
	static apiNode = "https://bsc-dataseed4.binance.org/";
	// static apiNodeMainNet = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
	static apiNodeMainNet = "https://bsc-dataseed4.binance.org/";

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