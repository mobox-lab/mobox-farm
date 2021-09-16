export default class WalletConfig {
	static ETH = {
		boxToken: "0x85c128eE1feEb39A59490c720A9C563554B51D33", //箱子ERC20合约 // keyToken
		mboxToken: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377", //mbox的合约地址

		moMoToken: "0x4eeDeDfe89dad70aB8cbf70E4dD140Ff8E6e8ce5", //ERC721合约
		moMoMToken: "0xb3E968ba01A78Ea489292130BCf8bbe6A64Be648", //ERC1155合约
		moMoMinter: "0x1da9b6e37f006dD349089dEA21cb8261391593D5", // 开箱子合约
		moMoHelper: "0x529E2a515CE4499C41B23102E56e45025e393757", //工具合约
		moMoHelper2: "0x1E36d6F9c3d037574305dc1f45003f0dA97c0D2b", //工具合约
		moMoHelper3: "0x2C388d5Ea0048dC68824610cf778fFBF2F0bBC73", //工具合约
		moMoStake: "0x3bD6a582698ECCf6822dB08141818A1a8512c68D", //质押挖矿合约
		moMoStakeAuction: "0xcB0CffC2B12739D4BE791b8aF7fbf49bc1d6a8c2", //质押拍卖合约
		common1155Auction: "0x819e97C7Da2C784403B790121304DB9E6a038dE9", //1155普通拍卖
		momoFarm: "0xdaD49e63F97c967955975490a432de3796C699E6",
		momoGemApply: "0x5Cc9AF3DEaAc89764eb98B0513E8d938D90B073D",//宝石申购合约
		momoGemToken: "0xf91d6e71F6D9E6DBfFE92597ce0fdD76058c49a7", //宝石token， ERC1155
		momoGemOpr: "0x5Fb3035d07E5d0E1D8Efbc5aE5b7546C15173035", //宝石穿戴操作合约
		momoRent: "0x689B1fcCF5B8E6f64B9F0e10bE1BfbA3039430Ba", //momo出租
		momoVeMbox: "0x5E7Eb57B163b78e93608E773e0F4a88A55d7C28F", //veMbox合约
		momoMoreMinter: "0x2873d94d21eFa8AF064B02174413966b357C69E7", //多重挖矿合约
		balanceAddr: {
			"0X603C7F932ED1FC6575303D8FB018FDCBB0F39A95": {
				name: "BANANA",
				decimals: 1e18,
			},
			// "0X95A1199EBA84AC5F19546519E287D43D2F0E1B41": {
			// 	name: "RABBIT",
			// 	decimals: 1e18,
			// },
		},
		momoBid: "0xFaE911aa353e598908DD2cFd6e88E35dE588974f",//v6竞拍
		newBoxToken: "0xed8711fEff83b446158259981FD97645856e82A5", // 新的box合约
		boxApply: "0xAe5F14A9aed2b56121fb964A84a9DFf114296563", //box申购
		orderBookContract: "0xE0d764a7b0DF2404D5b531a23435100967feCc6A", //订单部交易
		refundContract: "0x70aC5068237AA52B0A29eEb3C55630223Fd5907F", //补偿合约
		newGemApply: "0x7B4e53126316DB92e0fAefD1886B4bF988c627C9", //新的宝石申购
		mdxApply: "0x77f040BD6ED8930830f27B83601b4a35969609d8", //mdx箱子申购
		openMdxBox: "0x8e987b5A7b55FC1eB3BfcF3CDd3AD3571bca9352", //mdx箱子打开

		defaultFromAddr: "0x0000000000000000000000000000000000000000",
		network: "56",
		view_tx_url: "https://bscscan.com/tx/",
		view_block_url: "https://bscscan.com/block/",

		MAX_ORDER: 128, //质押拍卖最大上架数量
	}
}