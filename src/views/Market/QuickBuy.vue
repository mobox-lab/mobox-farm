<template>
	<Dialog id="market-quick-buy-dialog" :top="100" width="400">
		<h2>{{$t("Market_50")}}</h2>
	</Dialog>
</template>

<script>
import { Dialog } from "@/components";
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";

export default {
	mixins: [CommonMethod],
	components: {Dialog},
	computed:{
		...mapState({
			
		}),
	},
	methods:{
		show(prototype){
			this.oprDialog("market-quick-buy-dialog","block");
			console.log(prototype);
			this.getAuctionPets(1, prototype);
			return this;
		},
	
		// async getAuctionPets(page, prototype ,needLoading = false){
		// 	if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
		// 	let data = await Http.getAuctionList("BNB", page, 15, {pType: prototype});
		// 	this.$store.commit("marketState/setData", {marketLoading: false});
		// 	let needGetNameArr = [];
		// 	data.list.map(item=>{
		// 		if( item.tokenId != 0){
		// 			let {tokenName} = BaseConfig.NftCfg[item.prototype];
		// 			item.tokenName = tokenName;
		// 			item.vType = parseInt(item.prototype/1e4);
		// 			if(item.specialty == 1 || item.specialty == 3){
		// 				needGetNameArr.push(item.tokenId);
		// 			}
		// 		}
		// 		//计算当前价格
		// 		let endTime = Number(item.uptime) + item.durationDays * 86400;
		// 		let nowTime = parseInt(new Date().valueOf() / 1000);
		// 		let nowPrice = item.endPrice;
		// 		let diffPrice = item.endPrice - item.startPrice;
		// 		if(endTime > nowTime){
		// 			nowPrice = item.startPrice + (diffPrice / item.durationDays * Math.floor((nowTime-item.uptime)/ 86400))
		// 		}
		// 		item.nowPrice = nowPrice;
		// 	});
		// 	this.$store.commit("marketState/setData", {marketPets:data});
			
		// 	this.$nextTick(()=>{
		// 		this.getMomoName(needGetNameArr);
		// 	})
		// },
	}

}
</script>
