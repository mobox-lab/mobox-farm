import Vue from "vue";
import VueRouter from "vue-router";
import Airdrop from "../views/Airdrop/Airdrop.vue";
import AirdropV2 from "../views/Airdrop/AirdropV2.vue";
import OpenBox from "../views/OpenBox/Index.vue";
import Collection from "../views/Collection.vue";
import Mypet from "../views/Mypet/Mypet.vue";
import Upgrade from "../views/Mypet/Upgrade.vue";
import Rank from "../views/Rank.vue";
import Market from "../views/Market/Market.vue";
import AuctionView from "../views/Market/AuctionView.vue";
import BigSellView from "../views/Market/BigSellView.vue";
import AuctionGemView from "../views/Market/AuctionGemView.vue";
import RentView from "../views/Market/RentView.vue";
import Activity from "../views/Activity/Activity.vue";
import Christmas from "../views/Activity/Christmas/Christmas.vue";
import BlindBox from "../views/Activity/BlindBox/BlindBox.vue";
// import Anniversary from "../views/Activity/Anniversary/Anniversary.vue"
import YearEnd from "../views/Activity/YearEnd/YearEnd.vue";
import BinanceNFT from "../views/BNFT/BinanceNFT.vue";
import Statistics from "../views/Statistics/Index.vue";
import Furnace from "../views/Furnace/index.vue";
import FurnaceFour from "../views/FurnaceFour/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Airdrop",
    component: AirdropV2,
    meta: {
      keepAlive: true, //
      actionId: 21000,
    },
  },
  {
    path: "/old",
    name: "AirdropOld",
    component: Airdrop,
    meta: {
      actionId: 21000,
    },
  },
  {
    path: "/openbox",
    name: "OpenBox",
    component: OpenBox,
    meta: {
      keepAlive: true, //
      actionId: 23000,
    },
  },
  {
    path: "/collection",
    name: "Collection",
    component: Collection,
    meta: {
      actionId: 25000,
    },
  },
  {
    path: "/market",
    name: "Market",
    component: Market,
    meta: {
      actionId: 26000,
    },
  },
  {
    path: "/mypet/:tabPos?",
    name: "Mypet",
    component: Mypet,
    meta: {
      actionId: 24000,
    },
  },
  {
    path: "/upgrade/:petId",
    name: "Upgrade",
    component: Upgrade,
  },
  {
    path: "/rank/",
    name: "Rank",
    component: Rank,
    meta: {
      actionId: 27000,
    },
  },
  {
    path: "/activity/",
    name: "Activity",
    component: Activity,
    meta: {
      actionId: 22000,
    },
  },
  {
    path: "/activity-mdx",
    name: "ActivityMdx",
    component: () => import("../views/Activity/Mdx/Mdx.vue"),
  },
  {
    path: "/auctionView/:petInfo",
    name: "AuctionView",
    component: AuctionView,
  },
  {
    path: "/bigSellView/:tx",
    name: "BigSellView",
    component: BigSellView,
  },
  {
    path: "/auctionGemView/:petInfo",
    name: "AuctionGemView",
    component: AuctionGemView,
  },
  {
    path: "/rentView/:tokenId",
    name: "RentView",
    component: RentView,
  },
  {
    path: "/binanceNFT",
    name: "BinanceNFT",
    component: BinanceNFT,
  },
  {
    path: "/christmas",
    name: "Christmas",
    component: Christmas,
  },
  // {
  // 	path: "/anniversary",
  // 	name: "Anniversary",
  // 	component: Anniversary
  // },
  {
    path: "/yearend",
    name: "YearEnd",
    component: YearEnd,
  },
  {
    path: "/blindBox",
    name: "BlindBox",
    component: BlindBox,
  },
  {
    path: "/network",
    name: "Statistics",
    component: Statistics,
  },
  {
    path: "/furnace",
    name: "Furnace",
    component: Furnace,
  },
  {
    path: "/furnaceFour",
    name: "FurnaceFour",
    component: FurnaceFour,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
