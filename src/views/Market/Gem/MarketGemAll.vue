<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<div id="market-pet-fitter">
				<div class="dib por mgl-10 por cur-point" id="shop-history" @click="oprDialog('shop-history-gem-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" height="40" />
				</div>
				<!-- 宝石 -->
				<div class="dib por mgl-10 filter"  v-if="marketTypePos == 2">
					<img src="@/assets/icon/filter_icon.png" alt="" height="40" @click="toggleFilter($refs.filter)" />
					<div class="filter-panel hide " ref="filter">
						<div >
							<h5>Types</h5>
							<div @click="onSelectTypeChange(pos)" class="filter-select-item" :class="{'active': pos == marketGemSearch.type}" v-for="(item, pos) in $parent.gemType" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-20">
							<h5>Levels</h5>
							<div @click="onSelectLevelChange(pos)" class="filter-select-item" :class="{'active': pos == marketGemSearch.level}" v-for="(item, pos) in $parent.gemLv" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-20">
							<h5>Others</h5>
							<div @click="onSortChange(pos)" class="filter-select-item" :class="{'active': pos == marketGemSearch.sort}" v-for="(item, pos) in sortArr" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-30 tac" @click="toggleFilter($refs.filter)">
							<button class="btn-primary" style="width:80%">{{$t("Common_03")}}</button>
						</div>
					</div>
				</div>
				<div class="dib por mgl-10 filter"  v-else>
					<img src="@/assets/icon/filter_icon.png" alt="" height="40" @click="toggleFilter($refs.filter)" />
					<div class="filter-panel hide " ref="filter">
						<div>
							<h5>Others</h5>
							<div @click="onSortChange(pos)" class="filter-select-item" :class="{'active': pos == marketGemSearch.sort}" v-for="(item, pos) in sortArr" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-30 tac" @click="toggleFilter($refs.filter)">
							<button class="btn-primary" style="width:80%">{{$t("Common_03")}}</button>
						</div>
					</div>
				</div>

			</div>

			<div class="vertical-children  dib">
				<span>{{$t("Market_33")}}({{ marketGems.total }})</span>
				<!-- 宝石 -->
				<div class="dib filter-show-group" v-if="marketTypePos == 2">
					<div class="filter-show-item" v-if="marketGemSearch.type != 0" >
						<span class="filter-close" @click="onSelectTypeChange(0)">&times;</span>
						<span class="mgl-10">{{$parent.gemType[marketGemSearch.type]}}</span>
					</div>
					<div class="filter-show-item" v-if="marketGemSearch.level != 0" >
						<span class="filter-close" @click="onSelectLevelChange(0)">&times;</span>
						<span class="mgl-10">{{$parent.gemLv[marketGemSearch.level]}}</span>
					</div>
					<div class="filter-show-item" v-if="marketGemSearch.sort != 0" >
						<span class="filter-close" @click="onSortChange(0)">&times;</span>
						<span class="mgl-10">{{sortArr[marketGemSearch.sort]}}</span>
					</div>
				</div>
				<div class="dib mgl-20" v-else>
					<div class="filter-show-item" v-if="marketGemSearch.sort != 2" >
						<span class="filter-close" @click="onSortChange(2)">&times;</span>
						<span class="mgl-10">{{sortArr[marketGemSearch.sort]}}</span>
					</div>
				</div>
			</div>

		</div>
		<div :class="marketGems.list.length < 4 ? 'tal' : ''"  class="momo-content vertical-children" style="min-height:500px">
			<div class="no-show" v-if="marketGems.list.length == 0">
				<img src="@/assets/no_items.png" alt="">
				<p class="opa-6 mgt-10">No items to display</p>
			</div>
			<a @click="$router.push({ path: `/auctionGemView/${item.tx}` })"  v-for="item in marketGems.list" :key="item.tx + item.index">
				<GemSellItem  :key="item.orderId" :data="{item: item}">
					<div class="vertical-children mgt-10" style="font-size: 18px">
						<img :src="require(`@/assets/coin/${getCurrencyName(item.currency)}.png`)" alt="" height="20"/>&nbsp;
						<span class="money">{{numFloor(item.price/1e9, 100).toLocaleString()}} <sub class="small">{{getCurrencyName(item.currency)}}</sub></span>
					</div>
				</GemSellItem>
			</a>
		</div>

		<div style="margin-top: 30px" >
			<Page ref="page" :defaultPage="this.marketGemPage" :totalPage="Math.ceil(marketGems.total / onePageCount)" :onChange="onPageChange" v-show="Math.ceil(marketGems.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, GemSellItem } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http } from '@/utils';
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, GemSellItem},
	data(){
		return({
			onePageCount: 12,
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
			return "BUSD"
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
			data.list.map(item=>{
				item.erc1155_ = item.type;
			});
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
				this.$refs.page && this.$refs.page.initPage();
			});
		},
		onSelectTypeChange(pos){
			this.marketGems.list = [];
			this.$store.commit("marketState/setData", {marketGemPage:1, marketGems: this.marketGems});
			this.$store.commit("marketState/setFilter", {filterName:"marketGemSearch",type: "type", value: pos});
			this.$nextTick(()=>{
				this.getAuctionAll(this.marketGemPage, true);
				this.$refs.page && this.$refs.page.initPage();
			});
		},
		onSortChange(pos){
			this.marketGems.list = [];
			this.$store.commit("marketState/setData", {marketGemPage:1, marketGems: this.marketGems});
			this.$store.commit("marketState/setFilter", {filterName:"marketGemSearch",type: "sort", value: pos});
			this.$nextTick(()=>{
				this.getAuctionAll(this.marketGemPage, true);
				this.$refs.page && this.$refs.page.initPage();
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

	#market-pet-fitter {
		position: absolute;
		right: 0px;
		top: -69px !important;
	}
	@media (max-width: 768px) {

		#market-pet-fitter{
			zoom: 0.8;
			top: -65px !important;
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