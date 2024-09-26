<template>
   <div class="center-box" style="padding:40px 10px 10px 10px">
       <section id="activity-type">
			<div class="type-select">
				<div class="type-select-item vertical-children " v-for="item in tabArr" :key="item.key" :class="{active: tabKey == item.key}" @click="tabKey = item.key">
					<img :src="item.icon" alt="" width="25">
					<span class="mgl-5">{{item.text}}</span>
				</div>
			</div>
		</section>
		<section class="mgt-20">
			<OverView v-if="tabKey == tabArr[0].key " />
			<Buyback v-if="tabKey == tabArr[1].key " />
			<VeMbox v-if="tabKey == tabArr[2].key " />
			<MoMo v-if="tabKey == tabArr[3].key " />
			<Market v-if="tabKey == tabArr[4].key " />
		</section>
    </div>
</template>

<script>
import OverView from "./OverView.vue"
import Buyback from "./BuyBack.vue";
import VeMbox from "./VeMbox.vue"
import MoMo from "./MoMo.vue"
import Market from "./Market.vue"
import { Http } from '@/utils';

export default {
	components: {Buyback, Market, MoMo, OverView, VeMbox},
    data(){
		return({
			tabKey: 'Overview',
			tabArr: [
				{icon: require("@/assets/statistics/overview.png"), text: this.$t("Network_2"), key: "Overview"},
				{icon: require("@/assets/statistics/buyback.png"), text: this.$t("Network_8"), key: "Buyback"},
				{icon: require("@/assets/statistics/vembox.png"), text: "veMBOX", key: "veMBOX"},
				{icon: require("@/assets/statistics/momo.png"), text: "MOMO", key: "MOMO"},
				{icon: require("@/assets/statistics/market.png"), text: this.$t("Network_9"), key: "Market"},
			],
			baseData: {
				"registerUsers":"-",
				"nftTradeCnt":"-",
				"nftTradeVolume":"-",
				"nftMintAmount":"-",
				"mostExpensiveSold":"-",
				"maxSupply":"-",
				"totalSupply":"-",
				"circulatingSupply":"-",
				"totalBurned":"-",
				"marketCap":"-",
				"circulatingV4": 0,
				"circulatingV5": 0,
			}
		})
	},
	created(){
		this.getBaseData();
	},
	methods:{
		async getBaseData(){
			let data = await Http.getBaseData();

			if(data){
				this.baseData = data;
			}
		}
	}
}
</script>

<style>
@media (max-width: 768px) {
	.no-adv-xs{
		border: none !important;
        padding: 0px !important;
        background: none !important;
        margin-top: 0px !important;
	}
	.no-adv-xs .aveage-box > div{
		margin-top: 10px !important;
	}
	.no-adv-xs .aveage-box h3{
		font-size: 20px !important;
	}
}

</style>
