<template>
	<div id="market" style="padding:10px ">
		<div class="center-content">
			<section id="market-type">
				<div class="market-type-list-item vertical-children " :class="{active: marketTypePos == 0}" ref="menu0" @click="$store.commit('marketState/setData', {marketTypePos: 0, marketTabPos: 0})">
					<img src="../../assets/icon/momo_icon.png" alt="" height="30">&nbsp;
					<span>MOMO</span>
				</div>
				<!-- <div  class="market-type-list-item vertical-children" :class="{active: marketTypePos == 6}" 
					@click="$store.commit('marketState/setData', {marketTypePos: 6, marketTabPos: 0});">
					<img src="../../assets/icon/box_icon.png" alt="" width="30">&nbsp;
					<span>Order BOX</span>
				</div> -->
				<div  class="market-type-list-item vertical-children" :class="{active: marketTypePos == 4}" ref="menu4"
					@click="gemMarketKey = 'box'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 2});$store.commit('marketState/setData', {marketTypePos: 4, marketTabPos: 0, marketGemFilter: 2});">
					<img src="../../assets/icon/box_icon.png" alt="" width="30">&nbsp;
					<span>BOX</span>
				</div>
				<div  class="market-type-list-item vertical-children" :class="{active: marketTypePos == 3}"  ref="menu3"
					@click="gemMarketKey = 'mecbox'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 2});$store.commit('marketState/setData', {marketTypePos: 3, marketTabPos: 0, marketGemFilter: 3});">
					<img src="../../assets/box/mecbox.png" alt="" height="20">&nbsp;
					<span>MEC BOX</span>
				</div>
				<div  class="market-type-list-item vertical-children" :class="{active: marketTypePos == 5}"  ref="menu5"
					@click="gemMarketKey = 'mec'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 2});$store.commit('marketState/setData', {marketTypePos: 5, marketTabPos: 0, marketGemFilter: 4});">
					<img src="../../assets/coin/CRYSTAL.png" alt="" height="30">&nbsp;
					<span>MEC</span>
				</div>
				<div  class="market-type-list-item vertical-children" :class="{active: marketTypePos == 2}" ref="menu2"
					@click="gemMarketKey = 'gem'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 0});$store.commit('marketState/setData', {marketTypePos: 2, marketTabPos: 0, marketGemFilter: 1});">
					<img src="../../assets/icon/yellow_icon.png" alt="" height="30">&nbsp;
					<span>{{$t("Gemstone_44")}}</span>
				</div>
				<div  class="market-type-list-item vertical-children" :class="{active: marketTypePos == 1} " ref="menu1" @click="$store.commit('marketState/setData', {marketTypePos: 1, marketTabPos: 0})">
					<img src="../../assets/icon/rent_icon.png" alt="" height="30">&nbsp;
					<span>{{$t("Hire_01")}}</span>
				</div>
			</section>

			<div class="mgt-20">
				<div class="mgt-10" v-if="marketTypePos==0">
					<div class="tal vertical-children">
						<Tab :list="tabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,tempSells.length + tempMarketCancelTx.length]"  />
						<div  class="cur-point dib por mgl-10 shop-car-btn" @click="getMomoShopCar().show()" v-if="marketTabPos == 0 " id="buy-car">
							<span v-if="shopCar.length >0" class="shop-car-num">{{shopCar.length}}</span>
							<img src="@/assets/icon/shopCar-buy.png" alt="" height="40">
						</div>
					</div>
					<MarketAll v-show="marketTabPos == 0" />
					<MarketMy v-show="marketTabPos == 1" />
					<MarketMySell v-if="marketTabPos == 2" />
					<MarketStatistics v-if="marketTabPos == 3" />
				</div>
				<div v-else-if="marketTypePos==1" class="mgt-10">
					<div class="tal">
						<Tab :list="rentTabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,marketRentOrderList.total]"  />
					</div>
					<RentAll v-show="marketTabPos == 0" />
					<RentMy v-show="marketTabPos == 1" />
					<RentMySell ref="rentMySell" v-show="marketTabPos == 2" />
					<RentStatistics v-if="marketTabPos == 3" />
				</div>
				<div v-else-if="[2,3,4,5].indexOf(marketTypePos) != -1" class="mgt-10" :key="gemMarketKey">
					<div class="tal">
						<Tab :list="tabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,getGemTemNum]"  />
					</div>
					<MarketGemAll v-show="marketTabPos == 0" />
					<MarketGemMy v-show="marketTabPos == 1" />
					<MarketGemMySell v-show="marketTabPos == 2" />
					<MarketGemStatistics v-if="marketTabPos == 3" />
				</div>
				<div v-else-if="marketTypePos == 6">
					<div class="tal">
						<Tab :list="OrderBookTabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" />
					</div>
					<Trade v-show="marketTabPos == 0" />
					<OrderList v-show="marketTabPos == 1" />
					<Statistics v-show="marketTabPos == 2" />
				</div>

				<div class="loading" v-show="marketLoading">
					<Loading :width="30" :height="30"  />
				</div>
			</div>
		</div>
		
		<MomoHistory ref="momoHistory" />
		<GemHistory ref="gemHistory" />
		<RentDeal ref="rentDeal" />
	</div>
</template>

<script>
import {  Tab, Loading } from "@/components";
// MOMO
import MarketAll from './Momo/MarketAll.vue'
import MarketMy from './Momo/MarketMy.vue'
import MarketMySell from './Momo/MarketMySell.vue'
import MomoHistory from './Momo/MomoHistory.vue'
import MarketStatistics from './Momo/MarketStatistics.vue'
// GEM
import MarketGemAll from './Gem/MarketGemAll.vue'
import MarketGemMy from './Gem/MarketGemMy.vue'
import MarketGemMySell from './Gem/MarketGemMySell.vue'
import GemHistory from './Gem/GemHistory.vue'
import MarketGemStatistics from './Gem/MarketGemStatistics.vue'
//Rent
import RentAll from './Rent/RentAll.vue'
import RentMy from './Rent/RentMy.vue'
import RentMySell from './Rent/RentMySell.vue'
import RentDeal from './Rent/RentDeal.vue'
import RentStatistics from './Rent/RentStatistics.vue'

//orderBook
import Trade from './OrderBook/Trade'
import OrderList from './OrderBook/OrderList'
import Statistics from './OrderBook/Statistics'

import { mapState } from "vuex";
import { PancakeConfig } from '@/config';
import { Wallet, Common} from "@/utils";
import { CommonMethod } from "@/mixin";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { 
		Tab , Loading,
		MarketAll, MarketMy, MarketMySell ,MarketStatistics,MomoHistory,
		MarketGemAll,MarketGemMy,MarketGemMySell, MarketGemStatistics,GemHistory,
		RentAll,RentMy,RentMySell, RentDeal, RentStatistics,
		Trade,OrderList, Statistics
	},
	data() {
		return {
			gemMarketKey: "gem",
			tabList: [this.$t('Market_01'), this.$t("Market_02"), this.$t("Market_03"), this.$t("Market_53")],
			OrderBookTabList: [this.$t('Market_01'), "我的订单", this.$t("Market_53")],
			rentTabList:[this.$t('Market_01'), this.$t("Hire_02"),this.$t("Hire_03"),this.$t("Market_53")],
			tabPos: 0,
			selectCategory: [
				this.$t("MOMO_02"),
				this.$t("MOMO_03"),
				this.$t("MOMO_04"),
				this.$t("MOMO_05"),
				this.$t("MOMO_06"),
				this.$t("MOMO_07"),
			],
			selectVType: [
				this.$t("MOMO_08"),
				this.$t("MOMO_09"),
				this.$t("MOMO_10"),
				this.$t("MOMO_11"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
			gemType:[this.$t("Market_60"),this.$t("Gemstone_45"), this.$t("Gemstone_46"), this.$t("Gemstone_47"),this.$t("Gemstone_48")],
			gemLv:[this.$t("Gemstone_49"), "Lv.1", "Lv.2", "Lv.3","Lv.4","Lv.5","Lv.6","Lv.7","Lv.8","Lv.9"],
			myAccount: "",
			marketTypePosToAction: {
				"0": 26101,
				"1": 26301,
				"2": 26401,
				"3": 26201,
				"4": 26201,
				"5": 26201,
			}
		};
	},
	watch: {
		gemMarketKey: function (){
			this.$refs.gemHistory &&  this.$refs.gemHistory.getMyHistory(this.myAccount);
		},
		marketTypePos: function(newVal){
			this.setAction(this.marketTypePosToAction[newVal]);
		}
	},
	computed: {
		...mapState({
			marketTabPos: (state) => state.marketState.data.marketTabPos,
			marketLoading: (state) => state.marketState.data.marketLoading,
			tempSells: (state) => state.marketState.data.tempSells,
			tempMarketCancelTx: (state) => state.marketState.data.tempMarketCancelTx,
			tempGemSells: (state) => state.marketState.data.tempGemSells,
			tempGemMarketCancelTx: (state) => state.marketState.data.tempGemMarketCancelTx,
			marketTypePos: (state) => state.marketState.data.marketTypePos,
			marketGemFilter: (state) => state.marketState.data.marketGemFilter,
			marketRentOrderList: (state) => state.marketState.data.marketRentOrderList,
			coinArr: (state) => state.bnbState.data.coinArr,
			shopCar: (state) => state.marketState.data.shopCar,
		}),
		getSelectCoinArr(){
			let arr = [];
			Object.keys(PancakeConfig.SelectCoin).map(coinKey=>{
				if(coinKey == "BUSD"){
					arr.push(coinKey + ": " + this.numFloor(this.coinArr[coinKey].balance, 1e2));
				}
			})
			return arr;
		},
		getGemTemNum(){
			let num = 0;
			this.tempGemSells.map(item=>{
				if(item.erc1155_ == this.marketGemFilter) num++;
			});
			this.tempGemMarketCancelTx.map(item=>{
				if(item.erc1155_ == this.marketGemFilter) num++;
			});
			return num;
		}
	},

	mounted(){
		let marketTypePos = this.$route.query.tab || this.marketTypePos;
		this.$refs["menu"+marketTypePos].click();
	},
	async created(){

		this.myAccount = await Wallet.ETH.getAccount();
		this.getCoinValue();
		this.$refs.momoHistory && this.$refs.momoHistory.getMyHistory(this.myAccount);
		this.$refs.gemHistory && this.$refs.gemHistory.getMyHistory(this.myAccount);

		if(timer) clearInterval(timer);
		timer = setInterval(async ()=>{
			await this.$refs.momoHistory && this.$refs.momoHistory.getMyHistory(this.myAccount);
			await this.$refs.gemHistory &&  this.$refs.gemHistory.getMyHistory(this.myAccount);
		}, 10000)

	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		async getCoinValue(){
			let balance = await Wallet.ETH.getBalance();
			this.coinArr["BNB"].balance = balance;
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});

			for (let coinKey in PancakeConfig.SelectCoin) {
				let {addr, decimals, omit} = PancakeConfig.SelectCoin[coinKey];
				if(addr != ""){
					let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
					this.coinArr[coinKey].balance =  Common.numFloor((Number(value) / decimals), omit);
					this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
					await Common.sleep(500);
				}
			}
		},
		onTabChange(tabPos) {
			this.$store.commit("marketState/setData", {marketTabPos:tabPos});
		},

	},
};
</script>

<style >
.center-content{
	max-width: 1500px;
	margin: 0px auto;
}
#market-type{
	text-align: left;
	border-bottom: 1px solid #162340 ;
}
.market-type-list-item{
	display: inline-block;
	height: 40px;
	margin-right: 20px;
	text-align: center;
	cursor: pointer;
	user-select: none;
}
.market-type-list-item.active{
	border-bottom: 4px solid #1B54F5;
}
.loading{
	position: absolute;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
	text-align: center;
	z-index: 99999
}
.loading svg{
	margin-top: 300px;
}
#market #market-pet-fitter {
	position: absolute;
	right: 0px;
	top: 0px;
}

#market {
	text-align: center;
	padding: 20px;
	position: relative;
	margin-top: 20px;
}


@media (max-width: 768px) {
	#market {
		margin-top: 0px;
	}
}

</style>
