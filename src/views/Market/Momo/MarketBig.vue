<template>
	<div >
		<!-- Filter -->
		<div class="tal search vertical-children por mgt-20">
			<div id="market-pet-fitter">

				<div class="dib por mgl-10 por cur-point"  @click="oprDialog('shop-history-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" height="40" />
				</div>

				<div class="dib por mgl-10 filter"  >
					<img src="@/assets/icon/filter_icon.png" alt="" height="40" @click="toggleFilter($refs.filter)" />
					<div class="filter-panel hide " ref="filter">
						<div >
							<h5>Others</h5>
							<div @click="onSortChange(pos)" class="filter-select-item" :class="{'active': pos == bigSellFilter.sort}" v-for="(item, pos) in sortArr" :key="item">
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
				<span>{{$t("Market_33")}}({{ bigSells.total }})</span>
				<div class="dib filter-show-group">
					<div class="filter-show-item" v-if="bigSellFilter.sort != 0">
						<span class="filter-close" @click="onSortChange(0)">&times;</span>
						<span class="mgl-10">{{sortArr[bigSellFilter.sort]}}</span>
					</div>
				</div>
			</div>
			
		</div>
		<!-- MomoList -->
		<div :class="bigSells.list.length < 4 ? 'tal' : ''"  class="vertical-children momo-content" style="min-height:500px;">
			<div class="no-show" v-if="bigSells.list.length == 0">
				<img src="@/assets/no_items.png" alt="">
				<p class="opa-6 mgt-10">No items to display</p>
			</div>
			<a @click="$router.push({ path: `/bigSellView/${item.tx}` })"  v-for="item in bigSells.list" :key="item.tx + item.index">
				<BigSellItem :data="item" />
			</a>
		</div>
		<!-- 分页 -->
		<div style="margin-top: 30px" >
			<Page ref="page" :defaultPage="this.bigSellPage" :totalPage="Math.ceil(bigSells.total / onePageCount)" :onChange="onPageChange" v-show="Math.ceil(bigSells.total / onePageCount) > 1" />
		</div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import BigSellItem from './items/BigSellItem.vue';
import { Http } from '@/utils';
import {  Page } from "@/components";

export default {
	mixins: [CommonMethod],
	components: {BigSellItem, Page},
    data(){
        return{
			onePageCount: 12,
			sortArr: [this.$t("Market_47"),this.$t("Market_04"), this.$t("Market_05"), this.$t("Market_06"), this.$t("Market_07")],
        }
    },
    computed: {
        ...mapState({
            bigSells: (state) => state.momoMarketState.data.bigSells,
			bigSellFilter: (state) => state.momoMarketState.data.bigSellFilter,
            bigSellPage: (state) => state.momoMarketState.data.bigSellPage,
            momoGemsObjs: (state) => state.marketState.data.momoGemsObjs,

            marketLoading: (state) => state.marketState.data.marketLoading,
            historyNotice: (state) => state.marketState.data.historyNotice,
            nowTs: (state) => state.globalState.data.nowTs,
        }),
    },
	watch: {
		nowTs: function(ts){
			if(ts % 15 == 0){
				this.getBigSellList();
			}
		}
	},
	created(){
		this.getBigSellList(true);
	},
	methods: {
		async getBigSellList(needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let data = await Http.getBigAuctionList(this.bigSellPage, this.onePageCount, this.bigSellFilter);
			this.$store.commit("marketState/setData", {marketLoading: false});
			this.$store.commit("momoMarketState/setData", {bigSells:data});
		},
		onSortChange(pos){
			this.bigSells.list = [];
			this.$store.commit("momoMarketState/setData", {bigSellPage:1, bigSells: this.bigSells});
			this.$store.commit("momoMarketState/setFilter", {filterName:"bigSellFilter",type: "sort", value: pos});
			this.$nextTick(()=>{
				this.getBigSellList(true);
				this.$refs.page && this.$refs.page.initPage();
			});
		},
		onPageChange(page){
			if(page == this.bigSellPage) return;
			this.bigSells.list = [];
			this.$store.commit("momoMarketState/setData", {bigSellPage:page, bigSells: this.bigSells});
			this.$nextTick(()=>{
				this.getBigSellList(true);
			});
		},
	}
}
</script>


