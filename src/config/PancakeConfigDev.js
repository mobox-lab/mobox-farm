export default class PancakeConfig {
	static SwapRouterAddr = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
	static SwapRouterAddrV2 = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
	static QuickSwapAddr = "0x50aEdfA05bbC474E53BB45B6Ed0aD3aE7Fb54B0f";
	static SelectCoin = {
		"MBOX": {
			omit: 1e2,
			decimals: 1e18,
			addr: "0xD32d0f8b13Bf084f3fBA2CAe0763a71eBa7e08EF",
		},
		"BNB": {
			decimals: 1e18,
			omit: 1e4,
			addr: "",
		},
		"BTCB": {
			omit: 1e8,
			decimals: 1e18,
			addr: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c"
		},
		"ETH": {
			omit: 1e4,
			decimals: 1e18,
			addr: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"
		},
		"BUSD": {
			omit: 1e4,
			decimals: 1e18,
			addr: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
		},
		"USDT": {
			omit: 1e4,
			decimals: 1e18,
			addr: "0x55d398326f99059ff775485246999027b3197955"
		},
		"DAI": {
			omit: 1e4,
			decimals: 1e18,
			addr: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3"
		},
		"USDC": {
			omit: 1e4,
			decimals: 1e18,
			addr: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
		},
		"KEY": {
			omit: 1e4,
			decimals: 1e18,
			addr: "0x2072fe4E74c6ECcFe3f86071E255E0D5568c58B9"
		},
	}
	static StakeLP = {
		"MBOX-BNB-V2":{
			pIndex: 1,
			addr: "0xc2A3baBbe53d662C0a5D16513908aB53C6f1df24",
			allocPoint: 10,
			decimals: 1e18,
			omit: 1e6,
		},
		"BTCB-BNB":{
			pIndex: 2,
			addr: "0x7561EEe90e24F3b348E1087A005F78B4c8453524",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
		},
		"ETH-BNB":{
			pIndex: 3,
			addr: "0x70D8929d04b60Af4fb9B58713eBcf18765aDE422",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
		},
		"BUSD-BNB":{
			pIndex: 4,
			addr: "0x1b96b92314c44b159149f7e0303511fb2fc4774f",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
		},
		"USDT-BNB":{
			pIndex: 5,
			addr: "0x20bCC3b8a0091dDac2d0BC30F68E6CBb97de59Cd",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
		},
		"USDT-BUSD":{
			pIndex: 6,
			addr: "0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"DAI-BUSD":{
			pIndex: 7,
			addr: "0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"USDC-BUSD":{
			pIndex: 8,
			addr: "0x680dd100e4b394bda26a59dd5c119a391e747d18",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"BUSD":{
			pIndex: 9,
			addr: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"USDT":{
			pIndex: 10,
			addr: "0x55d398326f99059ff775485246999027b3197955",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"USDC":{
			pIndex: 11,
			addr: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"BNB":{
			pIndex: 12,
			addr: "",
			allocPoint: 0.5,
			decimals: 1e18,
			omit: 1e6,
		},
		"KEY-BNB":{
			pIndex: -1,
			addr: "0x680dd100e4b394bda26a59dd5c119a391e747d18",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
	}
}