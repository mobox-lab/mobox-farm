<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span>Total pet: {{ marketPetsMy.total }}</span>&nbsp;
			<span class="search-box hide" >
				<input class="ly-input mgl-20" type="text/" />&nbsp;
				<img :src="require('@/assets/icon/search.png')" alt="" />
			</span>
		</div>
		<div :class="marketPetsMy.total < 6 ? 'tal' : ''"  class="mgt-20">
			<router-link :to=" item.index > 0 ? ('/auctionView/'+ JSON.stringify(item)):'###'" :class="item.index >= 0?'':'opa-6'" v-for="item in [...tempSells,...marketPetsMy.list]" :key="item.uptime">
				<PetItem  v-bind:data="{item: item}" class="market" v-if="item.tokenId != 0 " >
					<div class="vertical-children mgt-10" style="font-size: 18px;" v-if="item.index >= 0">
						<img src="../../assets/coin/BUSD.png"  alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 10000)}}</span>
					</div>
					<div class="vertical-children mgt-10" v-if="item.index == -1" style="font-size: 18px;">
						<img  src="../../assets/icon/loading.png" class="rotate" height="20" alt=""  /> &nbsp;
						<small>上架中...</small>
					</div>
				</PetItem>
			</router-link>
		</div>

		<div style="margin-top: 30px" >
			<Page :defaultPage="1" :totalPage="Math.ceil(marketPetsMy.total / onePageCount)" :onChange="onPageChange" v-if="Math.ceil(marketPetsMy.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, PetItem, } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, PetItem},
	data(){
		return({
			onePageCount: 15,
			myAccount: "",
		});
	},
	computed: {
		...mapState({
			marketPetsMy: (state) => state.globalState.data.marketPetsMy,
			tempSells: (state) => state.globalState.data.tempSells,
		}),
	},
	async created(){
		await Wallet.ETH.init();
		this.myAccount = await Wallet.ETH.getAccount();

		this.getAuctionPetsMy();
		timer = setInterval(()=>{
			this.getAuctionPetsMy();
		}, 10000);
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		//获取市场上的宠物
		async getAuctionPetsMy(){
			let data = await Http.getMyAuctionList("eth", this.myAccount);
			console.log("getAuctionPetsMy",data);
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
					nowPrice = item.startPrice + (diffPrice / (item.durationDays * 86400) * (nowTime-item.uptime))
				}
				item.nowPrice = nowPrice;
			});
			this.$store.commit("globalState/setData", {marketPetsMy:data});
		},
		onPageChange(){

		}
	}
}
</script>
