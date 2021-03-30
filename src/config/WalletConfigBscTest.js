export default class WalletConfig {
	static ETH = {
		boxToken: "0x2072fe4E74c6ECcFe3f86071E255E0D5568c58B9", //箱子ERC20合约 // keyToken
		moMoToken: "0x9350b1872F3f30FC71EB42Ed5662b1990E680dc9", //ERC721合约
		moMoMToken: "0x8442FB6545Ec5B7D8490C324699620B3aCa2dBC0", //ERC1155合约
		moMoMinter: "0xeCf8c1E91B929D3EeA4940ec8AAF27f60bAd9F80", // 开箱子合约
		moMoHelper: "0x7049b1Ba0A28ea66395bb046F8b1158a8d373CFb", //工具合约
		moMoStake: "0x21353d254bF00E553F17B88b79c45712a886827C", //质押挖矿合约
		moMoStakeAuction: "0xc6b34BF7A7162dCAcc6A660043673C2F3a3BA3d4", //质押拍卖合约
		mboxToken: "0xD32d0f8b13Bf084f3fBA2CAe0763a71eBa7e08EF", //mbox的合约地址
		momoFarm: "0x6807782C95ab7289214Cf60F28103d5E7539b03B",
		defaultFromAddr: "0x0000000000000000000000000000000000000000",
		network: "56",
		view_tx_url: "https://bscscan.com/tx/",

		MAX_ORDER: 128, //质押拍卖最大上架数量

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