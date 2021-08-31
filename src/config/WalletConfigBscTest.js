export default class WalletConfig {
	static ETH = {
		boxToken: "0x2072fe4E74c6ECcFe3f86071E255E0D5568c58B9", //箱子ERC20合约 // keyToken
		moMoToken: "0x9350b1872F3f30FC71EB42Ed5662b1990E680dc9", //ERC721合约
		
		moMoMToken: "0x8442FB6545Ec5B7D8490C324699620B3aCa2dBC0", //ERC1155合约
		moMoMinter: "0xeCf8c1E91B929D3EeA4940ec8AAF27f60bAd9F80", // 开箱子合约
		moMoHelper: "0x47D466094A436413b17967E4CAD64e775df8F4f2", //工具合约
		moMoHelper2: "0x825673F88Ea9B263722b9ffD3eaf89484a1C459F", //工具合约
		moMoHelper3: "0x2C388d5Ea0048dC68824610cf778fFBF2F0bBC73", //工具合约
		moMoStake: "0x21353d254bF00E553F17B88b79c45712a886827C", //质押挖矿合约
		moMoStakeAuction: "0xDbcF89e3B603b57A9f1DfDd7324957Cb8539DACd", //质押拍卖合约
		common1155Auction: "0x4b1B5ed2BDcb4e34B5c5fBaDd0C07aC3d0bB6B0D", //1155普通拍卖
		mboxToken: "0xD32d0f8b13Bf084f3fBA2CAe0763a71eBa7e08EF", //mbox的合约地址
		momoFarm: "0x6807782C95ab7289214Cf60F28103d5E7539b03B",
		momoGemApply: "0x42C054F6641512cB7436F520C3A6E4e26c35C4A5",//宝石申购合约
		momoGemToken: "0xC87625754954fac7d27B7Fd251104b17FCd321C4", //宝石token， ERC1155
		momoGemOpr: "0xA302be104CA7A7c8F84cc6A21086D06497B85510", //宝石穿戴操作合约
		momoRent: "0xF585bC2Df509c73d2A1F0868FCB64D198A2A2011", //momo出租
		momoVeMbox: "0x589e57E1140435990Bcc9B568BC6cE7415E82fb1", //veMbox合约
		momoMoreMinter: "0x7dD89d832aa4C7BF8F093E066Fd79364540FdcA2", //多重挖矿合约
		balanceAddr: {
			"0X2072FE4E74C6ECCFE3F86071E255E0D5568C58B9": {
				name: "BANANA",
				decimals: 1e18,
			},
			// "0X2838202E86C515BDEECF14485578CE9A2A6058FA": {
			// 	name: "RABBIT",
			// 	decimals: 1e18,
			// },
		},
		momoBid: "0x0d7ABEd534a2Ddce9fd9B20ac0049F53721543eb",//v6竞拍
		newBoxToken: "0x52d2dB74f8FC3836e94D7DC953C4eC91443d4D96", // 新的box合约
		boxApply: "0x351AfcFafD306c65F395219d190008017EAcB800", //box申购
		orderBookContract: "0xE0d764a7b0DF2404D5b531a23435100967feCc6A", //订单部交易
		refundContract: "0xC167327A01626cAB0Fcb6f14462a88c979458860", //补偿合约

		defaultFromAddr: "0x0000000000000000000000000000000000000000",
		network: "56",
		view_tx_url: "https://bscscan.com/tx/",
		view_block_url: "https://bscscan.com/block/",

		MAX_ORDER: 128, //质押拍卖最大上架数量
	}

}