<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span>Total pet: {{ marketPetsMy.total }}</span>&nbsp;
			<span class="search-box hide" >
				<input class="ly-input mgl-20" type="text/" />&nbsp;
				<img :src="require('@/assets/icon/search.png')" alt="" />
			</span>
		</div>
		<div :class="marketPetsMy.total < 6 ? 'tal' : ''"  class="mgt-20 vertical-children">
			<router-link :to=" item.index >= 0 ? ('/auctionView/'+ JSON.stringify(item)):'###'" :class="item.index >= 0?'':'opa-6'" v-for="item in getShowList" :key="item.tx">
				<PetItem  v-bind:data="{item: item}" class="market" v-if="item.tokenId != 0 " >
					<div class="vertical-children mgt-10" style="font-size: 18px;" v-if="item.index >= 0">
						<img src="../../assets/coin/BUSD.png"  alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 10000)}}</span>
					</div>
					<div class="vertical-children mgt-10" v-if="item.index < 0" style="font-size: 18px;">
						<img  src="../../assets/icon/loading.png" class="rotate" height="20" alt=""  /> &nbsp;
						<small v-if="item.index == -1">{{$t("Market_30")}}...</small>
						<small v-if="item.index == -2">{{$t("Market_31")}}...</small>
					</div>
				</PetItem>
				<PetItemScroll v-bind:data="{item: item}" class="market" v-if="item.tokenId == 0 ">
					<div class="vertical-children mgt-10" style="font-size: 18px;" v-if="item.index >= 0">
						<img src="../../assets/coin/BUSD.png"  alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 10000)}}</span>
					</div>
					<div class="vertical-children mgt-10" v-if="item.index < 0" style="font-size: 18px;">
						<img  src="../../assets/icon/loading.png" class="rotate" height="20" alt=""  /> &nbsp;
						<small v-if="item.index == -1">{{$t("Market_30")}}...</small>
						<small v-if="item.index == -2">{{$t("Market_31")}}...</small>
					</div>
				</PetItemScroll>
			</router-link>
		</div>

		<div style="margin-top: 30px" >
			<Page :defaultPage="1" :totalPage="Math.ceil(marketPetsMy.total / onePageCount)" :onChange="onPageChange" v-if="Math.ceil(marketPetsMy.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, PetItem, PetItemScroll} from "@/components";
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, PetItem, PetItemScroll},
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
			tempMarketCancelTx: (state) => state.globalState.data.tempMarketCancelTx,
		}),
		getShowList(){
			let list = this.marketPetsMy.list;
			let cancelTx = [];
			this.tempMarketCancelTx.map(item=>cancelTx.push(item.tx));
			list.map(item=>{
				if(cancelTx.indexOf(item.tx) != -1) item.index = -2;
			})
			return   [...this.tempSells,...list];
		}
	},
	async created(){
		await Wallet.ETH.init();
		this.myAccount = await Wallet.ETH.getAccount();

		if(this.marketPetsMy.list.length == 0){
			this.getAuctionPetsMy();
		}
		timer = setInterval(()=>{
			if(this.tempSells.length != 0 || this.tempMarketCancelTx.length != 0){
				this.getAuctionPetsMy();
			}
		}, 10000);
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		//获取市场上的宠物
		async getAuctionPetsMy(){
			this.$store.commit("globalState/setData", {marketLoading: true});
			let data = await Http.getMyAuctionList("eth", this.myAccount);
			this.$store.commit("globalState/setData", {marketLoading: false});
			console.log("getAuctionPetsMy",data);
			let hashArr = [];
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
				hashArr.push(item.tx);
			});

			//删除临时出售的数据
			this.tempSells.map((item,index)=>{
				if(hashArr.indexOf(item.tx) != -1){
					this.tempSells.splice(index, 1);
				}
			});

			//删除临时下架的数据
			this.tempMarketCancelTx.map((item, index)=>{
				if(hashArr.indexOf(item.tx) == -1){
					this.tempMarketCancelTx.splice(index, 1);
				}
			})
			this.$store.commit("globalState/setData", {tempSells: this.tempSells, marketPetsMy:data, tempMarketCancelTx: this.tempMarketCancelTx});

		},
		onPageChange(){

		}
	}
}
</script>
