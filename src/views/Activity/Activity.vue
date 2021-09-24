<style src="./activity.css"></style>
<template>
	<section>
		<div class="center-content ">
			<section  id="activity-type">
				<div style="text-align: left;border-bottom: 1px solid #162340" class="mgt-10">
					<div class="activity-type-list-item vertical-children " v-for="item in tabArr" :key="item.key" :class="{active: tabKey == item.key}" @click="tabKey = item.key">
						<img :src="item.icon" alt="" width="30">&nbsp;
						<span>{{$t(item.text)}}</span>
					</div>
				</div>
			</section>
			<section>
				<Box v-if="tabKey == tabArr[0].key " />
				<Mec v-if="tabKey == tabArr[1].key " />
				<GemBuy v-if="tabKey == tabArr[2].key " />
				<Mdx v-if="tabKey == tabArr[3].key " />
				<Bidding v-if="tabKey == tabArr[4].key " />
			</section>
		</div>
	</section>
</template>

<script>
import GemBuy from './Gem/GemBuy.vue';
import Bidding from './Bidding/Bidding.vue';
import Box from './Box/Box.vue';
import Mdx from './Mdx/Mdx.vue';
import Mec from './Mec/Mec'

export default {
	components: {GemBuy, Bidding, Box, Mdx, Mec},
	data(){
		return({
			tabKey: 'jinPai',
			tabArr: [
				{icon: require("@/assets/icon/box_icon.png"), text: "NewBOX_01", key: "box"},
				{icon: require("@/assets/box/mecbox.png"), text: "NewBOX_01", key: "mec"},
				{icon: require("@/assets/icon/yellow_icon.png"), text: "Gemstone_01", key: "shenGou"},
				{icon: require("@/assets/icon/mdx_icon.png"), text: "Air-drop_235", key: "mdx"},
				{icon: require("@/assets/icon/momobidicon.png"), text: "Auction_03", key: "jinPai"},
			]
		})
	},
	created(){
		let tabPos = this.$route.query.tab || 0;
		this.tabKey = this.tabArr[tabPos].key;
	}
}
</script>
