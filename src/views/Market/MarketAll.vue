<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span>Total pet: {{ marketPets.total }}</span>&nbsp;
			<span class="search-box" >
				<input class="ly-input mgl-20" type="text/" />&nbsp;
				<img :src="require('@/assets/icon/search.png')" alt="" />
			</span>
		</div>
		<div :class="marketPets.total < 6 ? 'tal' : ''"  >
			<div class="dib" v-for="item in marketPets.list" :key="item.uptime">
				<router-link :to="'/auctionView/'+ JSON.stringify(item)">
					<PetItem  v-bind:data="{item: item}" class="market" v-if="item.tokenId != 0 " >
						<div class="vertical-children mgt-10" style="font-size: 18px">
							<img src="../../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
							<span>{{numFloor(item.nowPrice/1e9, 10000)}}</span>
						</div>
					</PetItem>
				</router-link>
			</div>
		</div>

		<div style="margin-top: 50px" >
			<Page :defaultPage="1" :totalPage="10" :onChange="onPageChange" />
		</div>
	</div>
</template>

<script>
import {  Page, PetItem, } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http } from '@/utils';
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, PetItem},
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
				item.nowPrice = item.endPrice;
			});
			this.$store.commit("globalState/setData", {marketPets:data});
		},
		onPageChange(){

		}
	}
}
</script>