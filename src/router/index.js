import Vue from 'vue'
import VueRouter from 'vue-router'
import Airdrop from '../views/Airdrop/Airdrop.vue'
import AirdropV2 from '../views/Airdrop/AirdropV2.vue'
import OpenBox from '../views/OpenBox/index.vue'
import Collection from '../views/Collection.vue'
import Mypet from '../views/Mypet/Mypet.vue'
import Upgrade from '../views/Mypet/Upgrade.vue'
import Rank from '../views/Rank.vue'
import Market from '../views/Market/Market.vue'
import AuctionView from '../views/Market/AuctionView.vue'
import AuctionGemView from '../views/Market/AuctionGemView.vue'
import RentView from '../views/Market/RentView.vue'
import Activity from "../views/Activity/Activity.vue"
import Christmas from "../views/Activity/Christmas/Christmas.vue"
import BinanceNFT from "../views/BNFT/BinanceNFT.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Airdrop',
		component: AirdropV2,
		meta: {
			keepAlive: true, // 需要被缓存
			actionId: 21000,
		}
	},
	{
		path: '/old',
		name: 'AirdropOld',
		component: Airdrop,
		meta: {
			actionId: 21000,
		}
	},
	{
		path: '/openbox',
		name: 'OpenBox',
		component: OpenBox,
		meta: {
			keepAlive: true, // 需要被缓存
			actionId: 23000,
		}
	},
	{
		path: '/collection',
		name: 'Collection',
		component: Collection,
		meta: {
			actionId: 25000,
		}
	},
	{
		path: '/market',
		name: 'Market',
		component: Market,
		meta: {
			actionId: 26000,
		}
	},
	{
		path: '/mypet/:tabPos?',
		name: 'Mypet',
		component: Mypet,
		meta: {
			actionId: 24000,
		}
	},
	{
		path: '/upgrade/:petId',
		name: 'Upgrade',
		component: Upgrade
	},
	{
		path: '/rank/',
		name: 'Rank',
		component: Rank,
		meta: {
			actionId: 27000,
		}
	},
	{
		path: '/activity/',
		name: 'Activity',
		component: Activity,
		meta: {
			actionId: 22000,
		}
	},
	{
		path: '/activity-mdx',
		name: 'ActivityMdx',
		component: ()=>import("../views/Activity/Mdx/Mdx.vue"),
	},
	{
		path: '/auctionView/:petInfo',
		name: 'AuctionView',
		component: AuctionView
	},
	{
		path: '/auctionGemView/:petInfo',
		name: 'AuctionGemView',
		component: AuctionGemView
	},
	{
		path: '/rentView/:tokenId',
		name: 'RentView',
		component: RentView
	},
	{
		path: "/binanceNFT",
		name: "BinanceNFT",
		component: BinanceNFT
	},
	{
		path: "/christmas",
		name: "Christmas",
		component: Christmas
	},
]

const router = new VueRouter({
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	},
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router