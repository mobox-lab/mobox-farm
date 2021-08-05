<template>
	<!-- 宝石的交易记录 -->
	<Dialog id="shop-history-gem-dialog" :top="100" :width="650" :animation="viewHistory">
		<h2>{{$t("Market_24")}}</h2>
		<div class="mgt-10" style="background:#000912;border-radius:10px;padding:8px;">
			<div class="aveage-box opa-6 small tal" style="padding: 0px 8px">
				<div class="hide-xs" style="flex:2">
					<span v-if="marketTypePos == 4">BOX</span>
					<span v-else>{{$t("Gemstone_44")}}</span>
				</div>
				<div>{{$t("Market_25")}}</div>
				<div>{{$t("Market_26")}}</div>
				<div class="tar" >{{$t("Market_17")}}</div>
			</div>
			<div style="por mgt-10 tal"  >
				<div class="aveage-box mgt-10 por tal"  v-for="(item, index) in marketGemHistory.list" :key="item.tx+index" style="background:#13181F;border-radius:15px;padding:10px 8px ;">
					<div class="shop-history-pet" style="flex:2;top:-18px" >
						<span v-for="(item2, index) in item.ids" :key="item2+index" style="margin:0px 2px;zoom:0.9" class="por">
							<template v-if="item2 > 0">
								<img  :src="require(`@/assets/market/${item2}.png`)" alt="" height="50">
								<span style="position:absolute;bottom:10px;width:80%;left:10%;background:rgba(0,0,0,0.5);border-radius:5px;zoom:0.8" class="tac small">x{{item.amounts[index]}}</span>
							</template>
						</span>
					</div>
					<div class="opa-6 small addr">{{shorAddress(item.bidder)}}</div>
					<div class="opa-6 small addr">{{shorAddress(item.auctor)}}</div>
					<div class="tar small" :class="item.isBuy?'color-buy':'color-sell'">
						{{item.isBuy?"-":"+"}}{{numFloor((item.price / 1e9) * (item.isBuy?1:0.95), 10000)}} {{getCurrencyName(item.currency)}}
						<p style="color:#8f8f8f;zoom:0.8;" >{{dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.crtime * 1000))}}</p>
					</div>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script>
import { Dialog } from "@/components";
import { Http } from "@/utils";
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";

export default {
	mixins: [CommonMethod],
	components: { Dialog },
	computed: {
		...mapState({
			marketGemHistory: (state) => state.marketState.data.marketGemHistory,
			historyGemNotice: (state) => state.marketState.data.historyGemNotice,
			marketGemFilter: (state) => state.marketState.data.marketGemFilter,
			marketTypePos: (state) => state.marketState.data.marketTypePos,
			gemHisTs: (state) => state.marketState.data.gemHisTs,
			boxHisTs: (state) => state.marketState.data.boxHisTs,
		}),
	},
	methods:{
		viewHistory(){
			this.$store.commit("marketState/setData", { historyNotice: false});
		},
		//获取交易记录
		async getMyHistory(myAccount){
			if(myAccount == "") return;
			let data = await Http.getMyGemAuctionHistory(myAccount);
			if(data){
				let newTs = 0;
				let tsKey = this.marketGemFilter == 1? "gemHisTs":"boxHisTs";
				data.list.map(item=>{
					item.isBuy =  item.bidder.toLocaleLowerCase() == myAccount.toLocaleLowerCase();
					if(item.crtime > newTs) newTs = item.crtime;
				});
				data.uptime = new Date().valueOf();
				let historyGemNotice =  newTs > this[tsKey] && this.marketGemHistory.uptime != 0;

				this.$store.commit("marketState/setData", {marketGemHistory: data, gemHisTs:this.gemHisTs, tsKey: newTs, historyGemNotice});
			}
		},
	}
}
</script>
