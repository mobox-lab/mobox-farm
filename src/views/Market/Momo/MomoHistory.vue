<template>
	<!-- momo的交易记录 -->
	<Dialog id="shop-history-dialog" :top="100" :width="650" :animation="viewHistory">
		<h2>{{$t("Market_24")}}</h2>
		<div class="mgt-10" style="background:#000912;border-radius:10px;padding:8px;">
			<div class="aveage-box opa-6 small tal" style="padding: 0px 8px">
				<div class="hide-xs" style="flex:2">MOMO</div>
				<div>{{$t("Market_25")}}</div>
				<div>{{$t("Market_26")}}</div>
				<div class="tar" >{{$t("Market_17")}}</div>
			</div>
			<div style="por mgt-10 tal"  >
				<div class="aveage-box mgt-10 por tal" v-for="(item, index) in marketHistory.list" :key="item.tx+index" style="background:#13181F;border-radius:15px;padding:10px 8px ;">
					<div class="shop-history-pet" style="flex:2">
						<span v-for="item2 in item.petList" :key="item2.prototype" style="margin:0px 2px" class="dib">
							<PetItemMin :data="item2" style="zoom: 0.6" />
						</span>
					</div>
					<div class="opa-6 small addr">{{shorAddress(item.bidder)}}</div>
					<div class="opa-6 small addr">{{shorAddress(item.auctor)}}</div>
					<div class="tar small" :class="item.isBuy?'color-buy':'color-sell'">
						{{item.isBuy?"-":"+"}}{{numFloor((item.bidPrice / 1e9) * (item.isBuy?1:0.95), 10000)}} BUSD
						<p style="color:#8f8f8f;zoom:0.8;" >{{dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.crtime * 1000))}}</p>
					</div>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script>
import { PetItemMin, Dialog } from "@/components";
import { Http } from "@/utils";
import { mapState } from "vuex";
import { BaseConfig } from '@/config';
import { CommonMethod } from "@/mixin";

export default {
	mixins: [CommonMethod],
	components: {PetItemMin, Dialog},
	computed: {
		...mapState({
			historyNotice: (state) => state.marketState.data.historyNotice,
			marketHistory: (state) => state.marketState.data.marketHistory,
		}),
	},
	methods:{
		viewHistory(){
			this.$store.commit("marketState/setData", { historyNotice: false});
		},
		//获取交易记录
		async getMyHistory(myAccount){
			if(myAccount == "") return;
			let data = await Http.getMyAuctionHistory(myAccount);
			if(data){
				data.list.map(item=>{
					item.isBuy =  item.bidder.toLocaleLowerCase() == myAccount.toLocaleLowerCase();
					item.petList = this.getPetList(item);
				});
				data.uptime = new Date().valueOf();
				let historyNotice = this.historyNotice;
				if(!historyNotice){
					historyNotice =  (data.total != this.marketHistory.total && this.marketHistory.uptime != 0);
				}
				this.$store.commit("marketState/setData", {marketHistory: data, historyNotice});
			}
		},
		getPetList(data){
			let petList = [];
			//1155
			let {ids, amounts, bidPrice, tokens, type} = data;
			ids.map((prototype, index)=>{
				let obj = BaseConfig.NftCfg[prototype];
				petList.push({
					...obj,
					bidPrice,
					level: 1,
					num: amounts[index],
					chain: "bnb",
					tokenId: 0,
					hashrate: obj.quality,
					lvHashrate: obj.quality,
					vType: parseInt(prototype / 1e4),
				});
			});
			// 721
			tokens.map(item=>{
				let obj = BaseConfig.NftCfg[item.prototype];
				petList.push({
					...obj,
					...item,
					num: 1,
					chain: "bnb",
					bidPrice,
					vType: this.getVType(item.prototype),
					noPrice: true,
					isGroup: type == 1
				})
			})
			return petList;
		},
	}
}
</script>
