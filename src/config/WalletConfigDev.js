export default class WalletConfig {
	static ETH = {
		bidBatch: "0x819e97C7Da2C784403B790121304DB9E6a038dE9", // 批量购买
		boxToken: "0x45b83259faE0F105C5FE3984000b9d736e833959", //箱子ERC20合约
		moMoToken: "0x2cb98E3A58eFA254CbFAfeD4FB2ae140d1b7CBE3", //ERC721合约
		moMoMToken: "0x47b99CA0C304598d77B2a38A5cb0020EbAc68c4B", //ERC1155合约
		moMoMinter: "0xF1663197643eA9534F19EE140A88FFf2FD710984", // 开箱子合约
		moMoHelper: "0xD99a51F59520D0E02e8A4DF96496a2043bcfF00F", //工具合约
		moMoStake: "0x615455BC78E4259A59d8d6dFEe0A006f5F4c9693", //质押挖矿合约
		moMoStakeAuction: "0xa5B1E5Da72AC29046729019045E29Af58f6B5bB4", //质押拍卖合约
		testBUSDToken: "0x439aee5e84d9eef46365b3815b221bfd62a28892",//测试BUSD合约
		mboxToken: "0xdAD06230Ba92404dB35FE6530755652EFA5E35ec", //mbox的合约地址
		defaultFromAddr: "0x0000000000000000000000000000000000000000",
		network: "4",
		view_tx_url: "https://rinkeby.etherscan.io/tx/",

		MAX_ORDER: 128, //质押拍卖最大上架数量

		// USDT: {
		// 	addr: "0x7140f43B47e129Fbe56A7A6624b62437F793CBe7",
		// 	poolAddr: "0x376b9ad04F3e9Bc5311Dc654Dff5eB398598de17",
		// 	dropAddr: "0xab6AA26516932971bB275D226D7F062Cf8601946",
		// 	mAddr: "0xD693499Bb1085A1b5356c7BCC95d4069b1c9B36A",
		// 	decimals: 1e6,
		// },
		// USDC: {
		// 	addr: "0x55E3969750A5AA0c1D45cB79ac4F26dbc7d5aE16",
		// 	poolAddr: "0xF0387e4d785FD0FbeBa7061ab7BA9d13778b7088",
		// 	dropAddr: "0x8F8c3f2462dE3B277558d5DADCcAE2a94b7D1528",
		// 	mAddr: "0xa094E9102EBbB89d8a91E2229a05C5c03aD954C1",
		// 	decimals: 1e6,
		// },
		// DAI: {
		// 	addr: "0xC682caa15E7829fF99FD135df4547Aca3963b7fe",
		// 	poolAddr: "0xa7E711d1DdF1033Dd35f1e9A1BA97f860B1B576a",
		// 	dropAddr: "0x0E91F75F3F772681d5Bf0f208dfAd0220679618b",
		// 	mAddr: "0xE5a33c6fe7765f2072EEC0c8a718F258ec58A7F0",
		// 	decimals: 1e18,
		// },
		USDT: {
			addr: "0xdac17f958d2ee523a2206206994597c13d831ec7",
			poolAddr: "0x388a09786d2372c8e7385db846cedf38434f21a0",
			dropAddr: "0x6b1798f8BE30ddf82cd769021b72Bc53a9bB5D7c",
			mAddr: "0x0ccecb9097fdda44e637fd06a838865f7492c4a9",
			decimals: 1e6,
		},
		USDC: {
			addr: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			poolAddr: "0x119ca1094e9E93b40707CEd2e0b8a5b90Dee4AF8",
			dropAddr: "0x1Cf6C8d811277Dec2851528Eb66D24E7c06E664a",
			mAddr: "0xc6178019f280a367838e1c7040e929de9bb54f9d",
			decimals: 1e6,
		},
		DAI: {
			addr: "0x6b175474e89094c44da98b954eedeac495271d0f",
			poolAddr: "0xE3Fa477Ee3ae562A8C32b08AB5Eb53267e26C1b8",
			dropAddr: "0x388a09786D2372C8e7385db846cedF38434F21A0",
			mAddr: "0xb2d49eb7beE8Be4c2027735Ff80367311d0CC0Ee",
			decimals: 1e18,
		},
	}

	static TRON = {

	}

	static BNB = {

	}

}