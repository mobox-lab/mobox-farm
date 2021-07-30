<template>
	<div class="center-box ">
		<section style="padding:10px" id="activity-type">
			<div style="text-align: left;border-bottom: 1px solid #162340" class="mgt-10">
				<div class="activity-type-list-item vertical-children " v-for="item in tabArr" :key="item.key" :class="{active: tabKey == item.key}" @click="tabKey = item.key">
					<img :src="item.icon" alt="" width="30">&nbsp;
					<span>{{$t(item.text)}}</span>
				</div>
			</div>
		</section>
		<section>
			<OpenBox v-if="tabKey == tabArr[0].key " />
			<OpenChest v-if="tabKey == tabArr[1].key " />
		</section>
	</div>
</template>

<script>
import OpenChest from './OpenChest.vue';
import OpenBox from './OpenBox.vue';

export default {
	components: {OpenChest, OpenBox},
	data(){
		return({
			tabKey: 'box',
			tabArr: [
				{icon: require("@/assets/icon/box_icon.png"), text: "打开BOX", key: "box"},
				{icon: require("@/assets/icon/momobidicon.png"), text: "打开Chest", key: "chest"},
			]
		})
	},
	created(){
		let tabPos = this.$route.query.tab || 0;
		this.tabKey = this.tabArr[tabPos].key;
	}
}
</script>
