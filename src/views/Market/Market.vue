<template>
	<div id="market" style="padding:10px 0px ">
		<div class="center-content">
			<section id="market-type" class="type-select">
				<span class="type-select-notice" style="right:5px">&gt;</span>
				<div class="type-select-item vertical-children " :class="{active: marketTypePos == 0}" ref="menu0" @click="$store.commit('marketState/setData', {marketTypePos: 0, marketTabPos: 0})">
					<img src="../../assets/icon/momo_icon.png" alt="" height="30">
					<span class="mgl-5">MOMO</span>
				</div>
				<div  class="type-select-item vertical-children" :class="{active: marketTypePos == 4}" ref="menu4"
					@click="gemMarketKey = 'box'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 2,marketTypePos: 4});$store.commit('marketState/setData', {marketTypePos: 4, marketTabPos: 0, marketGemFilter: 2});">
					<img src="../../assets/icon/box_icon.png" alt="" width="30">
					<span class="mgl-5">BOX</span>
				</div>
				<div  class="type-select-item vertical-children" :class="{active: marketTypePos == 3}"  ref="menu3"
					@click="gemMarketKey = 'mecbox'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 2,marketTypePos: 3});$store.commit('marketState/setData', {marketTypePos: 3, marketTabPos: 0, marketGemFilter: 3});">
					<img src="../../assets/box/mecbox.png" alt="" height="20">
					<span class="mgl-5">MEC BOX</span>
				</div>
				<div  class="type-select-item vertical-children" :class="{active: marketTypePos == 5}"  ref="menu5"
					@click="gemMarketKey = 'mec'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 2,marketTypePos: 5});$store.commit('marketState/setData', {marketTypePos: 5, marketTabPos: 0, marketGemFilter: 4});">
					<img src="../../assets/coin/CRYSTAL.png" alt="" height="30">
					<span class="mgl-5">MEC</span>
				</div>
				<div  class="type-select-item vertical-children" :class="{active: marketTypePos == 2}" ref="menu2"
					@click="gemMarketKey = 'gem'+Date.now();$store.commit('marketState/initGemMarket', {defaultSort: 0,marketTypePos: 2});$store.commit('marketState/setData', {marketTypePos: 2, marketTabPos: 0, marketGemFilter: 1});">
					<img src="../../assets/icon/yellow_icon.png" alt="" height="30">
					<span class="mgl-5">{{$t("Gemstone_44")}}</span>
				</div>
				<div  class="type-select-item vertical-children" :class="{active: marketTypePos == 1} " ref="menu1" @click="$store.commit('marketState/setData', {marketTypePos: 1, marketTabPos: 0})">
					<img src="../../assets/icon/rent_icon.png" alt="" height="30">
					<span class="mgl-5">{{$t("Hire_01")}}</span>
				</div>
			</section>

			<div>
				<!-- MOMO市场 -->
				<MoMo v-if="marketTypePos==0" />

				<!-- MOMO租赁市场 -->
				<div v-else-if="marketTypePos==1" class="mgt-10">
					<div class="tal">
						<div class="hide-xs" style="border-bottom: 1px solid #141b24 !important;padding-bottom:10px">
							<Tab :list="rentTabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,marketRentOrderList.total]"   />
						</div>
						<div class="m-tab dib visiable-xs" style="zoom: 0.8">
							<Dropdown class="line" :list="rentTabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" />
						</div>
					</div>
					<div style="padding:0px 10px">
						<RentAll v-show="marketTabPos == 0" />
						<RentMy v-show="marketTabPos == 1" />
						<RentMySell ref="rentMySell" v-show="marketTabPos == 2" />
						<RentStatistics v-if="marketTabPos == 3" />
					</div>
				</div>
				<!-- 1155市场 -->
				<div v-else-if="[2,3,4,5].indexOf(marketTypePos) != -1" class="mgt-10" :key="gemMarketKey">
					<div class="tal">
						<div class="hide-xs" style="border-bottom: 1px solid #141b24 !important;padding-bottom:10px">
							<Tab :list="tabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,getGemTemNum]"   />
						</div>
						<div class="m-tab dib visiable-xs" style="zoom: 0.8">
							<Dropdown class="line" :list="tabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" />
						</div>
					</div>
					<div style="padding:0px 10px">
						<MarketGemAll v-show="marketTabPos == 0" />
						<MarketGemMy v-show="marketTabPos == 1" />
						<MarketGemMySell v-show="marketTabPos == 2" />
						<MarketGemStatistics v-if="marketTabPos == 3" />
					</div>
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
import {  Tab, Loading, Dropdown } from "@/components";
// MOMO
import MomoHistory from './Momo/MomoHistory.vue'
import MoMo from "./Momo/MoMo.vue"

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

import { mapState } from "vuex";
import { PancakeConfig } from '@/config';
import { Wallet, Common} from "@/utils";
import { CommonMethod } from "@/mixin";

export default {
	mixins: [CommonMethod],
	components: { 
		Tab , Loading, Dropdown,
		MoMo,
		MomoHistory,
		MarketGemAll,MarketGemMy,MarketGemMySell, MarketGemStatistics,GemHistory,
		RentAll,RentMy,RentMySell, RentDeal, RentStatistics
	},
	data() {
		return {
			gemMarketKey: "gem",
			tabList: [this.$t('Market_01'), this.$t("Market_02"), this.$t("Market_03"), this.$t("Market_53")],
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
		},
		nowTs: function(val){
			if(val % 10 == 0){
				this.getMyHistory();
			}
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
			nowTs: (state) => state.globalState.data.nowTs,
			historyNotice: (state) => state.marketState.data.historyNotice,
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

	async mounted(){
		let marketTypePos = this.$route.query.tab || this.marketTypePos;
		this.$refs["menu"+marketTypePos].click();

		this.myAccount = await Wallet.ETH.getAccount();
		Common.app.getCoinValue();
		this.getMyHistory();
	},

	methods: {
		async getMyHistory(){
			this.$refs.momoHistory && this.$refs.momoHistory.getMyHistory(this.myAccount);
			this.$refs.gemHistory &&  this.$refs.gemHistory.getMyHistory(this.myAccount);
		},
		onTabChange(tabPos) {
			this.$store.commit("marketState/setData", {marketTabPos:tabPos});
		},
		menuClick(){

		}
	},
};
</script>

<style >
.center-content{
	max-width: 1460px;
	margin: 0px auto;
}
.momo-content{
	margin: 0px -20px !important;
}
#market-type{
	border-bottom: 1px solid #141b24 !important;
	padding-bottom: 10px;
}
.loading{
	position: absolute;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
	text-align: center;
	z-index: 999
}
.loading svg{
	margin-top: 300px;
}


#market {
	text-align: center;
	padding: 20px;
	position: relative;
	margin-top: 20px;
	padding-bottom: 50px !important ;
}
#market-pet-fitter {
	position: absolute;
	right: 0px;
	top: -69px !important;
}

@media (max-width: 768px) {
	#market-pet-fitter {
		position: absolute;
		right: 0px;
		top: -65px !important;
	}
	.m-tab{
		border-bottom: 1px solid #141b24 !important;
        padding: 0px 10px;
        padding-bottom: 10px;
    }
	.momo-content{
		margin: 0px !important;
		margin-top: 10px !important;
	}
	#market-type{
		border-bottom: none !important;
		padding: 0px 10px
	}
	.visiable-xs .dropdown-value{
		min-width: 150px !important;
	}
	#market .dropdown{
		margin-top: 0px !important;
	}
	#market {
		margin-top: 0px;
	}
	#market .mgt-20{
		margin-top: 10px !important;
	}
	
	#market-type{
		display: flex !important;
		justify-content: left !important;
		align-items: center !important;
		word-break: keep-all !important;
		overflow-x: auto !important;
		overflow-y: hidden !important;
		border-bottom: 1px solid #141b24 !important;
	}
	.type-select-item{
		display: inline-flex !important;
		height: 40px !important;
		padding: 0px 12px !important;
		margin-right: 0px !important;
		text-align: center !important;
		cursor: pointer !important;
		user-select: none !important;
		opacity: 0.5 !important;
		justify-content: center !important;
		align-items: center !important;
		border-radius: 27px !important;
		white-space: nowrap !important;
	}
	.type-select-item.active{
		background: #42464c !important;
		opacity: 1 !important;
		border-bottom: none !important;
	}
}

	.pet_item .swiper-pagination-bullet-active{
		background: #fff !important;
		width: 6px;
		height: 3px !important;
	}
	.pet_item .swiper-pagination-bullet{
		background: #fff;
		height: 4px;
		width: 6px;
		border-radius: 5px;
	}

</style>
