<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span class="vertical-children">{{$t("Market_33")}}: {{ marketPets.total }} </span>&nbsp;
			<span class="search-box hide" >
				<input class="ly-input mgl-20" type="text/" />&nbsp;
				<img :src="require('@/assets/icon/search.png')" alt="" />
			</span>
			
			<div id="market-pet-fitter">
				<div class="dib por mgt-10" id="shop-history" @click="oprDialog('shop-history-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="../../assets/icon/tradeRecord.png" alt="" />
				</div>
				<Dropdown :list="$parent.selectCategory" :defaultSelectPos="marketSearch.category" :onChange="onSelectCategoryChange" />&nbsp;
				<Dropdown :list="$parent.selectVType" :defaultSelectPos="marketSearch.vType" :onChange="onSelectVTypeChange" />&nbsp;
				<Dropdown :list="sortArr" :defaultSelectPos="marketSearch.sort" :onChange="onSortChange" />&nbsp;
				<Dropdown :list="$parent.getSelectCoinArr" :defaultSelectPos="$parent.useCoinPos" :onChange="$parent.onCoinChange" />&nbsp;
			</div>
		</div>
		<div :class="marketPets.list.length < 6 ? 'tal' : ''"  class="mgt-20 vertical-children" style="min-height:500px">
			<router-link :to="'/auctionView/'+ JSON.stringify(item)"  v-for="item in marketPets.list" :key="item.tx">
				<PetItem  v-bind:data="{item: item}" class="market" v-if="item.tokenId != 0 " >
					<div class="vertical-children mgt-10" style="font-size: 18px">
						<img src="../../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 10000)}} <sub class="small">BUSD</sub></span>
					</div>
				</PetItem>
				<PetItemScroll v-bind:data="{item: item}" class="market" v-if="item.tokenId == 0 ">
					<div class="vertical-children mgt-10" style="font-size: 18px">
						<img src="../../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 10000)}} <sub class="small">BUSD</sub></span>
					</div>
				</PetItemScroll>
			</router-link>
		</div>

		<div style="margin-top: 30px" >
			<Page :defaultPage="this.marketPage" :totalPage="Math.ceil(marketPets.total / onePageCount)" :onChange="onPageChange" v-if="Math.ceil(marketPets.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, PetItem, PetItemScroll, Dropdown } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, PetItem, PetItemScroll, Dropdown},
	data(){
		return({
			onePageCount: 15,
			selectCategory:[],
			selectVType: [],
			sortArr: [this.$t("Market_47"),this.$t("Market_04"), this.$t("Market_05"), this.$t("Market_06"), this.$t("Market_07")],
		});
	},
	computed: {
		...mapState({
			marketPets: (state) => state.marketState.data.marketPets,
			marketPage: (state) => state.marketState.data.marketPage,
			marketSearch: (state) => state.marketState.data.marketSearch,
			momoNameObjs: (state) => state.marketState.data.momoNameObjs,
			marketLoading: (state) => state.marketState.data.marketLoading,
			historyNotice: (state) => state.marketState.data.historyNotice,
		}),
	},
	created(){
		this.getAuctionPets(this.marketPage, true);
		if(timer) clearInterval(timer);
		timer = setInterval(()=>{
			this.getAuctionPets(this.marketPage);
		}, 10000);
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		//获取市场上的宠物
		async getAuctionPets(page, needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let data = await Http.getAuctionList("BNB", page, 15, this.marketSearch);
			this.$store.commit("marketState/setData", {marketLoading: false});
			let needGetNameArr = [];
			data.list.map(item=>{
				if( item.tokenId != 0){
					let {tokenName} = BaseConfig.NftCfg[item.prototype];
					item.tokenName = tokenName;
					item.vType = parseInt(item.prototype/1e4);
					if(item.specialty == 1 || item.specialty == 3){
						needGetNameArr.push(item.tokenId);
					}
				}
				//计算当前价格
				let endTime = Number(item.uptime) + item.durationDays * 86400;
				let nowTime = parseInt(new Date().valueOf() / 1000);
				let nowPrice = item.endPrice;
				let diffPrice = item.endPrice - item.startPrice;
				if(endTime > nowTime){
					nowPrice = item.startPrice + (diffPrice / item.durationDays * Math.floor((nowTime-item.uptime)/ 86400))
				}
				item.nowPrice = nowPrice;
			});
			this.$store.commit("marketState/setData", {marketPets:data});
			
			this.$nextTick(()=>{
				this.getMomoName(needGetNameArr);
			})
		},
		async getMomoName(needGetNameArr){
			let fitterArr = [];
			//去除重复的名字
			needGetNameArr.map(item=>{
				if(!Object.prototype.hasOwnProperty.call(this.momoNameObjs, item)){
					fitterArr.push(item);
				}
			});
			if(fitterArr.length != 0){
				//请求name
				let names = await Wallet.ETH.getMomoNamesByTokenIds(fitterArr);
				if(names != ""){
					fitterArr.map((item, index)=>{
						this.momoNameObjs[item] = names[index];
					});
				}
			}
			this.marketPets.list.map(item=>{
				item.tokenName = this.momoNameObjs[item.tokenId] || item.tokenName;
			});
			this.$store.commit("marketState/setData", {marketPets: this.marketPets, momoNameObjs : this.momoNameObjs});
		},
		onPageChange(page){
			if(page == this.marketPage) return;
			this.marketPets.list = [];
			this.$store.commit("marketState/setData", {marketPage:page, marketPets: this.marketPets});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketPage, true);
			});
		},
		onSelectCategoryChange(pos){
			this.marketPets.list = [];
			this.$store.commit("marketState/setData", {marketPage:1, marketPets: this.marketPets});
			this.$store.commit("marketState/marketSearch", {type: "category", value: pos});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketPage, true);
			});
		},
		onSelectVTypeChange(pos){
			this.marketPets.list = [];
			this.$store.commit("marketState/setData", {marketPage:1, marketPets: this.marketPets});
			this.$store.commit("marketState/marketSearch", {type: "vType", value: pos});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketPage, true);
			});
		},
		onSortChange(pos){
			this.marketPets.list = [];
			this.$store.commit("marketState/setData", {marketPage:1, marketPets: this.marketPets});
			this.$store.commit("marketState/marketSearch", {type: "sort", value: pos});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketPage, true);
			});
		}
	}
}
</script>

<style scoped>
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
	}
</style>