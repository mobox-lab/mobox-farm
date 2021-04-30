export default class WalletConfig {
	static ETH = {
		boxToken: "0x85c128eE1feEb39A59490c720A9C563554B51D33", //箱子ERC20合约 // keyToken
		mboxToken: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377", //mbox的合约地址

		moMoToken: "0x4eeDeDfe89dad70aB8cbf70E4dD140Ff8E6e8ce5", //ERC721合约
		moMoMToken: "0xb3E968ba01A78Ea489292130BCf8bbe6A64Be648", //ERC1155合约
		moMoMinter: "0x1da9b6e37f006dD349089dEA21cb8261391593D5", // 开箱子合约
		moMoHelper: "0x529E2a515CE4499C41B23102E56e45025e393757", //工具合约
		moMoStake: "0x3bD6a582698ECCf6822dB08141818A1a8512c68D", //质押挖矿合约
		moMoStakeAuction: "0xcB0CffC2B12739D4BE791b8aF7fbf49bc1d6a8c2", //质押拍卖合约
		momoFarm: "0xdaD49e63F97c967955975490a432de3796C699E6",
		momoGemApply: "0x33d4dF01BcF7f812b1aCAde3beE8e0Ac00f4e8f0",//宝石申购合约
		momoGemToken: "0xC87625754954fac7d27B7Fd251104b17FCd321C4", //宝石token， ERC1155
		momoGemOpr: "0x5eB559cb1bde8538FDF01C17e3Fa3CD98c310884", //宝石穿戴操作合约

		defaultFromAddr: "0x0000000000000000000000000000000000000000",
		network: "56",
		view_tx_url: "https://bscscan.com/tx/",

		MAX_ORDER: 128, //质押拍卖最大上架数量
	}
}