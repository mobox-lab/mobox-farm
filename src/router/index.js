import Vue from 'vue'
import VueRouter from 'vue-router'
import Airdrop from '../views/Airdrop/Airdrop.vue'
import Openbox from '../views/Openbox.vue'
import Collection from '../views/Collection.vue'
import Mypet from '../views/Mypet/Mypet.vue'
import Upgrade from '../views/Mypet/Upgrade.vue'
import Rank from '../views/Rank.vue'
import Market from '../views/Market/Market.vue'
import AuctionView from '../views/Market/AuctionView.vue'
import AuctionGemView from '../views/Market/AuctionGemView.vue'
import RentView from '../views/Market/RentView.vue'
import Activity from "../views/Activity/Activity.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Airdrop',
		component: Airdrop
	},
	{
		path: '/openbox',
		name: 'Openbox',
		component: Openbox
	},
	{
		path: '/collection',
		name: 'Collection',
		component: Collection
	},
	{
		path: '/market',
		name: 'Market',
		component: Market,
	},
	{
		path: '/mypet/:tabPos?',
		name: 'Mypet',
		component: Mypet
	},
	{
		path: '/upgrade/:petId',
		name: 'Upgrade',
		component: Upgrade
	},
	{
		path: '/rank/',
		name: 'Rank',
		component: Rank
	},
	{
		path: '/activity/',
		name: 'Activity',
		component: Activity
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