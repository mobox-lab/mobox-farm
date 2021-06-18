export default class WalletConfig {
	static ETH = {
		boxToken: "0x85c128eE1feEb39A59490c720A9C563554B51D33", //箱子ERC20合约 // keyToken
		mboxToken: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377", //mbox的合约地址

		moMoToken: "0x4eeDeDfe89dad70aB8cbf70E4dD140Ff8E6e8ce5", //ERC721合约
		moMoMToken: "0xb3E968ba01A78Ea489292130BCf8bbe6A64Be648", //ERC1155合约
		moMoMinter: "0x1da9b6e37f006dD349089dEA21cb8261391593D5", // 开箱子合约
		moMoHelper: "0x529E2a515CE4499C41B23102E56e45025e393757", //工具合约
		moMoHelper2: "0x1E36d6F9c3d037574305dc1f45003f0dA97c0D2b", //工具合约
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
			}
		},

		defaultFromAddr: "0x0000000000000000000000000000000000000000",
		network: "56",
		view_tx_url: "https://bscscan.com/tx/",

		MAX_ORDER: 128, //质押拍卖最大上架数量
	}
}