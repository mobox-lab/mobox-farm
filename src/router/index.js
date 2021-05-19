import Vue from 'vue'
import VueRouter from 'vue-router'
import Airdrop from '../views/Airdrop/Airdrop.vue'
import Openbox from '../views/Openbox.vue'
import Collection from '../views/Collection.vue'
import Mypet from '../views/Mypet.vue'
import Upgrade from '../views/Upgrade.vue'
import Rank from '../views/Rank.vue'
import Rule from '../views/Rule.vue'
import Market from '../views/Market/Market.vue'
import AuctionView from '../views/AuctionView.vue'
import AuctionGemView from '../views/AuctionGemView.vue'
import RentView from '../views/RentView.vue'
import GemBuy from '../views/Gem/GemBuy.vue'

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
		path: '/mypet',
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
		path: '/rule/',
		name: 'Rule',
		component: Rule
	},
	{
		path: '/gemBuy/',
		name: 'GemBuy',
		component: GemBuy
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
		path: '/rentView/:type/:tokenId',
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