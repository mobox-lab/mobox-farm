export default class PancakeConfig {
	static SwapRouterAddr = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
	static SwapRouterAddrV2 = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
	static QuickSwapAddr = "0x50aEdfA05bbC474E53BB45B6Ed0aD3aE7Fb54B0f";
	static MecSwap = "0xCAc8aA7cb8775Bb86DfacaE15B3dC73143D4bcF3";
	static MecSwapPair = "0xd5C390665eC94A5C76D79356582944164816580a";
	static SelectCoin = {
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
		"MBOX": {
			omit: 1e2,
			decimals: 1e18,
			addr: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
		},
		"KEY": {
			omit: 1e4,
			decimals: 1e18,
			addr: "0x85c128eE1feEb39A59490c720A9C563554B51D33"
		},
		// "MEC": {
		// 	omit: 1e4,
		// 	decimals: 1,
		// 	addr: "0x98387108842a7CfC7bA23E080030351f6ea68ac0"
		// },
	}
	
	static StakeLP = {
		"KEY-BNB":{
			pIndex: -1,
			addr: "0xc3ED1ebF16c11e28c6477C78577aE455D21577CA",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: false,
		},
		"KEY-BNB-V2":{
			pIndex: -1,
			addr: "0x9303613fefAf05a573d046CFEdd2519B776BC29F",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		"MBOX-BNB":{
			pIndex: 12,
			addr: "0x8D42EE6F423a5016792E6D0d4508c05F30cAc5BC",
			allocPoint: 10,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: true,
		},
		// "MBOX-MEC":{
		// 	pIndex: 12,
		// 	addr: "0xd5C390665eC94A5C76D79356582944164816580a",
		// 	allocPoint: 10,
		// 	decimals: 0,
		// 	omit: 1e6,
		// 	pancakeVType: 1,
		// 	isFinish: true,
		// },
		"BTCB-BNB":{
			pIndex: 1,
			addr: "0x7561EEe90e24F3b348E1087A005F78B4c8453524",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e8,
			pancakeVType: 1,
			isFinish: true,
		},
		"ETH-BNB":{
			pIndex: 2,
			addr: "0x70D8929d04b60Af4fb9B58713eBcf18765aDE422",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: true,
		},
		"BUSD-BNB":{
			pIndex: 3,
			addr: "0x1b96b92314c44b159149f7e0303511fb2fc4774f",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: true,
		},
		"USDT-BNB":{
			pIndex: 4,
			addr: "0x20bCC3b8a0091dDac2d0BC30F68E6CBb97de59Cd",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: true,
		},
		"USDT-BUSD":{
			pIndex: 5,
			addr: "0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: true,
		},
		"DAI-BUSD":{
			pIndex: 6,
			addr: "0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: true,
		},
		"USDC-BUSD":{
			pIndex: 7,
			addr: "0x680dd100e4b394bda26a59dd5c119a391e747d18",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 1,
			isFinish: true,
		},
		"MBOX-BNB-V2":{
			pIndex: 21,
			addr: "0x8FA59693458289914dB0097F5F366d771B7a7C3F",
			allocPoint: 10,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		"BTCB-BNB-V2":{
			pIndex: 14,
			addr: "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e8,
			pancakeVType: 2,
			isFinish: false,
		},
		"ETH-BNB-V2":{
			pIndex: 15,
			addr: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		"BUSD-BNB-V2":{
			pIndex: 16,
			addr: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		"USDT-BNB-V2":{
			pIndex: 17,
			addr: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
			allocPoint: 2,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		"USDT-BUSD-V2":{
			pIndex: 18,
			addr: "0x7EFaEf62fDdCCa950418312c6C91Aef321375A00",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		"DAI-BUSD-V2":{
			pIndex: 19,
			addr: "0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		"USDC-BUSD-V2":{
			pIndex: 20,
			addr: "0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
			pancakeVType: 2,
			isFinish: false,
		},
		
		"BUSD":{
			pIndex: 8,
			addr: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"USDT":{
			pIndex: 9,
			addr: "0x55d398326f99059ff775485246999027b3197955",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"USDC":{
			pIndex: 10,
			addr: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
			allocPoint: 1,
			decimals: 1e18,
			omit: 1e6,
		},
		"BNB":{
			pIndex: 11,
			addr: "",
			allocPoint: 0.5,
			decimals: 1e18,
			omit: 1e6,
		},
		
	}
}