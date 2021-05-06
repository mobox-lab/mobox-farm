export default class WalletConfig {
	static ETH = {
		boxToken: "0x2072fe4E74c6ECcFe3f86071E255E0D5568c58B9", //箱子ERC20合约 // keyToken
		moMoToken: "0x9350b1872F3f30FC71EB42Ed5662b1990E680dc9", //ERC721合约
		moMoMToken: "0x8442FB6545Ec5B7D8490C324699620B3aCa2dBC0", //ERC1155合约
		moMoMinter: "0xeCf8c1E91B929D3EeA4940ec8AAF27f60bAd9F80", // 开箱子合约
		moMoHelper: "0x47D466094A436413b17967E4CAD64e775df8F4f2", //工具合约
		moMoStake: "0x21353d254bF00E553F17B88b79c45712a886827C", //质押挖矿合约
		moMoStakeAuction: "0xDbcF89e3B603b57A9f1DfDd7324957Cb8539DACd", //质押拍卖合约
		mboxToken: "0xD32d0f8b13Bf084f3fBA2CAe0763a71eBa7e08EF", //mbox的合约地址
		momoFarm: "0x6807782C95ab7289214Cf60F28103d5E7539b03B",
		momoGemApply: "0x4C63bf447dEc6407C58b2cC303f9E6fffff4c8e0",//宝石申购合约
		momoGemToken: "0xC87625754954fac7d27B7Fd251104b17FCd321C4", //宝石token， ERC1155
		momoGemOpr: "0x5eB559cb1bde8538FDF01C17e3Fa3CD98c310884", //宝石穿戴操作合约
		defaultFromAddr: "0x0000000000000000000000000000000000000000",
		network: "56",
		view_tx_url: "https://bscscan.com/tx/",

		MAX_ORDER: 128, //质押拍卖最大上架数量
	}

}