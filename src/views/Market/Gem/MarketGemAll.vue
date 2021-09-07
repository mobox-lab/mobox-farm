<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span class="vertical-children  dib">{{$t("Market_33")}}({{ marketGems.total }}) </span>
			
			<div id="market-pet-fitter">
				<div class="dib por" id="shop-history" @click="oprDialog('shop-history-gem-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" />
				</div>
				<Dropdown v-if="marketTypePos == 4" :list="sortArr" :defaultSelectPos="marketGemSearch.sort" :onChange="onSortChange" style="margin-top:0px" />
				<div class="dropdown-group " @click="showDrop" tabindex="3" v-else>
					<div class="dropdown-group-value por">
						{{$t("Market_63")}} ▼
					</div>
					<div class="dropdown-group-list hide">
						<Dropdown v-if="marketTypePos != 4" :list="$parent.gemType" :defaultSelectPos="marketGemSearch.type" :onChange="onSelectTypeChange" />&nbsp;
						<Dropdown v-if="marketTypePos != 4" :list="$parent.gemLv" :defaultSelectPos="marketGemSearch.level" :onChange="onSelectLevelChange" />&nbsp;
						<Dropdown :list="sortArr" :defaultSelectPos="marketGemSearch.sort" :onChange="onSortChange" />&nbsp;
					</div>
				</div>
				<Dropdown v-if="marketTypePos == 4" id="busd" class="mgl-5" style="margin-top:0px" :list="$parent.getSelectCoinArr" :defaultSelectPos="$parent.useCoinPos" :onChange="$parent.onCoinChange" />
			</div>
		</div>
		<div :class="marketGems.list.length < 4 ? 'tal' : ''"  class="mgt-20 vertical-children" style="min-height:500px">
			<router-link :to="'/auctionGemView/'+ item.tx"  v-for="item in marketGems.list" :key="item.tx + item.index">
				<GemSellItem  :key="item.orderId" :data="{item: item}">
					<div class="vertical-children mgt-10" style="font-size: 18px">
						<img :src="require(`@/assets/coin/${showCoin}.png`)" alt="" height="20"/>&nbsp;
						<span class="money">{{numFloor(item.price/1e9, 100).toLocaleString()}} <sub class="small">{{showCoin}}</sub></span>
					</div>
				</GemSellItem>
			</router-link>
		</div>

		<div style="margin-top: 30px" >
			<Page ref="page" :defaultPage="this.marketGemPage" :totalPage="Math.ceil(marketGems.total / onePageCount)" :onChange="onPageChange" v-show="Math.ceil(marketGems.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, Dropdown, GemSellItem } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http } from '@/utils';
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page,  Dropdown, GemSellItem},
	data(){
		return({
			onePageCount: 15,
			sortArr: [this.$t("Market_47"),this.$t("Market_04"), this.$t("Market_05")],
		});
	},
	computed: {
		...mapState({
			marketGems: (state) => state.marketState.data.marketGems,
			marketGemPage: (state) => state.marketState.data.marketGemPage,
			marketGemSearch: (state) => state.marketState.data.marketGemSearch,
			marketLoading: (state) => state.marketState.data.marketLoading,
			historyNotice: (state) => state.marketState.data.historyNotice,
			marketTypePos: (state) => state.marketState.data.marketTypePos,
		}),
		showCoin(){
			return this.marketTypePos == 4 ? "BUSD": "MBOX"
		}

	},
	created(){

		this.$nextTick(()=>{
			this.getAuctionAll(this.marketGemPage, true);
			if(timer) clearInterval(timer);
			timer = setInterval(()=>{
				this.getAuctionAll(this.marketGemPage);
			}, 10000);
		})
	},
	
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		//获取市场上的宠物
		async getAuctionAll(page, needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let data = await Http.getAuctionListGem("BNB", page, this.onePageCount, this.marketGemSearch);
			this.$store.commit("marketState/setData", {marketLoading: false});
			this.$store.commit("marketState/setData", {marketGems:data});
		},

		onPageChange(page){
			if(page == this.marketGemPage) return;
			this.marketGems.list = [];
			this.$store.commit("marketState/setData", {marketGemPage:page, marketGems: this.marketGems});
			this.$nextTick(()=>{
				this.getAuctionAll(this.marketGemPage, true);
			});
		},
		onSelectLevelChange(pos){
			this.marketGems.list = [];
			this.$store.commit("marketState/setData", {marketGemPage:1, marketGems: this.marketGems});
			this.$store.commit("marketState/setFilter", {filterName:"marketGemSearch",type: "level", value: pos});
			this.$nextTick(()=>{
				this.getAuctionAll(this.marketGemPage, true);
				this.$refs.page.initPage();
			});
		},
		onSelectTypeChange(pos){
			this.marketGems.list = [];
			this.$store.commit("marketState/setData", {marketGemPage:1, marketGems: this.marketGems});
			this.$store.commit("marketState/setFilter", {filterName:"marketGemSearch",type: "type", value: pos});
			this.$nextTick(()=>{
				this.getAuctionAll(this.marketGemPage, true);
				this.$refs.page.initPage();
			});
		},
		onSortChange(pos){
			this.marketGems.list = [];
			this.$store.commit("marketState/setData", {marketGemPage:1, marketGems: this.marketGems});
			this.$store.commit("marketState/setFilter", {filterName:"marketGemSearch",type: "sort", value: pos});
			this.$nextTick(()=>{
				this.getAuctionAll(this.marketGemPage, true);
				this.$refs.page.initPage();
			});
		}
	}
}
</script>

<style scoped>
	.search-box{
	}
	.search-preview{
		position: absolute;
		width: 100%;
		z-index: 999;
		background: #182342;
		margin-top: 5px;
		border-radius: 10px;
	}
	.search-preview .aveage-box:nth-child(1){
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
		border: none;
		padding:10px;
	}
	.search-preview .aveage-box:last-child{
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	.search-preview .aveage-box{
		border-top: 1px solid #3f5185;
		padding: 5px 10px;
		cursor: pointer;
	}
	.search-preview .aveage-box:hover{
		background: #2c3d6b;
	}

	#shop-history {
		margin-right: 15px;
		cursor: pointer;
		position: relative;
		user-select: none;
	}
	#market-pet-fitter {
		position: absolute;
		right: 0px;
		top: 0px;
	}
	@media (max-width: 768px) {

		#market-pet-fitter{
			zoom: 0.8;
		}

		/* #busd{
			margin-top: 10px !important;
			margin-left: 0px !important;
			position: absolute;
			right: 0px;
			top: 40px;
		} */
	}
</style>