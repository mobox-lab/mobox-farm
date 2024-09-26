const state = () => ({
	data: {
		//eth余额
		balance: 0,
		box: 0,
		canOpenBox: 0,
		orderBlockHash: "0x0000000000000000000000000000000000000000000000000000000000000001",

		//相关权限,-1为没有获取
		allowance_box_to_minter: -1,
		allowance_1155_to_721: -1,
		allowance_1155_to_stake: -1,
		allowance_721_to_stake: -1,

		//erc20冻结权限
		allowance_usdt_to_pool: -1,
		allowance_dai_to_pool: -1,
		allowance_usdc_to_pool: -1,

		//钱包中的NFT
		myNFT_wallet: [],
		//质押中的NFT
		myNFT_stake: [],
		//拍卖中的
		myNFT_auction: [],
		//momoverse中的
		myNFT_verse: [],

		//我的质押总算力
		myHashrate: "-",
		//全网质押总算力
		totalHashrate: "-",
		//待领取的Mbox
		earnedMbox: -1,
		//钱包中的Mbox
		mbox: 0,

		//开箱子记录
		openBoxHistory: [],
		openBoxTemp: [],
		//锁定图鉴列表
		lockList:[],

		//质押记录
		stakeHistory: [],
		stakeTemp: [],

		//总空投MBOX
		totalAirdropMbox: "-",

		//升级锁定
		upgradeLocks: {},

	},
})

const mutations = {
	setData(state, newState) {
		state.data = Object.assign(state.data, newState);
	},
	setUpgradeLocks(state, {tokenId, time}){
		state.data.upgradeLocks[tokenId] = time;
	},
};

export default {
	namespaced: true,
	state,
	mutations
};