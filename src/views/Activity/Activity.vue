<style src="./activity.css"></style>
<template>
	<div class="center-box ">
		<section style="padding:10px">
			<div style="text-align: left;border-bottom: 1px solid #162340" class="mgt-10">
				<div class="activity-type-list-item vertical-children " v-for="item in tabArr" :key="item.key" :class="{active: tabKey == item.key}" @click="tabKey = item.key">
					<img :src="item.icon" alt="" height="30">&nbsp;
					<span>{{item.text}}</span>
				</div>
			</div>
		</section>
		<section>
			<Lottery v-if="tabKey == tabArr[0].key " />
			<Bidding v-if="tabKey == tabArr[1].key " />
			<GemBuy v-if="tabKey == tabArr[2].key " />
		</section>
	</div>
</template>

<script>
import GemBuy from './Gem/GemBuy.vue';
import Lottery from './Lottery/Lottery.vue';
import Bidding from './Bidding/Bidding.vue';

export default {
	components: {GemBuy, Lottery, Bidding},
	data(){
		return({
			tabKey: 'chouJiang',
			tabArr: [
				{icon: require("@/assets/icon/choujiang.png"), text: "抽奖", key: "chouJiang"},
				{icon: require("@/assets/icon/momobidicon.png"), text: "竞拍", key: "jinPai"},
				{icon: require("@/assets/icon/yellow_icon.png"), text: "宝石申购", key: "shenGou"},
			]
		})
	}
}
</script>
