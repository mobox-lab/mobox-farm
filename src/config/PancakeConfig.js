export default class PancakeConfig {
	static SwapRouterAddr = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
	static SelectCoin = {
		"MBOX": {
			omit: 1e2,
			decimals: 1e18,
			addr: "0x96Ad5d569cDd69E9dc834d1fa50C4c6b3131D4dc",
		},
		"BNB": {
			decimals: 1e18,
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
	}
	static StakeLP = {
		"MBOX-BNB":{
			pIndex: 0,
			addr: "",
			allocPoint: 40,
			decimals: 1e18,
			omit: 1e4,
		},
		"BTCB-BNB":{
			pIndex: 0,
			addr: "0x7561EEe90e24F3b348E1087A005F78B4c8453524",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e4,
		},
		"ETH-BNB":{
			pIndex: 0,
			addr: "0x70D8929d04b60Af4fb9B58713eBcf18765aDE422",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e4,
		},
		"BUSD-BNB":{
			pIndex: 1,
			addr: "0x1b96b92314c44b159149f7e0303511fb2fc4774f",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"USDT-BNB":{
			pIndex: 0,
			addr: "0x20bCC3b8a0091dDac2d0BC30F68E6CBb97de59Cd",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"BUSD-USDT":{
			pIndex: 0,
			addr: "0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"DAI-BUSD":{
			pIndex: 0,
			addr: "0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"USDC-BUSD":{
			pIndex: 0,
			addr: "0x680dd100e4b394bda26a59dd5c119a391e747d18",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"BUSD":{
			pIndex: 3,
			addr: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"USDT":{
			pIndex: 0,
			addr: "0x55d398326f99059ff775485246999027b3197955",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"USDC":{
			pIndex: 0,
			addr: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e4,
		},
		"BNB":{
			pIndex: 6,
			addr: "",
			allocPoint: 0.5,
			decimals: 1e18,
			omit: 1e4,
		},
	}
}