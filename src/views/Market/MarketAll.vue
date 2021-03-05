<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span>Total pet: {{ marketPets.total }}</span>&nbsp;
			<span class="search-box hide" >
				<input class="ly-input mgl-20" type="text/" />&nbsp;
				<img :src="require('@/assets/icon/search.png')" alt="" />
			</span>
		</div>
		<div :class="marketPets.total < 6 ? 'tal' : ''"  class="mgt-20 vertical-children">
			<router-link :to="'/auctionView/'+ JSON.stringify(item)"  v-for="item in marketPets.list" :key="item.uptime">
				<PetItem  v-bind:data="{item: item}" class="market" v-if="item.tokenId != 0 " >
					<div class="vertical-children mgt-10" style="font-size: 18px">
						<img src="../../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 100)}}</span>
					</div>
				</PetItem>
				<PetItemScroll v-bind:data="{item: item}" class="market" v-if="item.tokenId == 0 ">
					<div class="vertical-children mgt-10" style="font-size: 18px">
						<img src="../../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 100)}}</span>
					</div>
				</PetItemScroll>
			</router-link>
		</div>

		<div style="margin-top: 30px" >
			<Page :defaultPage="1" :totalPage="Math.ceil(marketPets.total / onePageCount)" :onChange="onPageChange" v-if="Math.ceil(marketPets.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, PetItem, PetItemScroll } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http } from '@/utils';
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, PetItem, PetItemScroll},
	data(){
		return({
			onePageCount: 15,
		});
	},
	computed: {
		...mapState({
			marketPets: (state) => state.globalState.data.marketPets,
		}),
	},
	created(){
		this.getAuctionPets();
		timer = setInterval(()=>{
			this.getAuctionPets();
		}, 10000);
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		//获取市场上的宠物
		async getAuctionPets(){
			let data = await Http.getAuctionList("eth");
			data.list.map(item=>{
				if( item.tokenId != 0){
					let {tokenName} = BaseConfig.NftCfg[item.prototype];
					item.tokenName = tokenName;
					item.vType = parseInt(item.prototype/1e4);
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
			this.$store.commit("globalState/setData", {marketPets:data});
		},
		onPageChange(){

		}
	}
}
</script>