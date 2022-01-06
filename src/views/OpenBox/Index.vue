<template>
	<div class="center-box" style="padding:10px">
		<section style="padding:10px;padding-bottom:0px" id="activity-type">
			<div class="type-select">
				<div class="type-select-item vertical-children " v-for="item in tabArr" :key="item.key" :class="{active: tabKey == item.key}" @click="tabKey = item.key">
					<img :src="item.icon" alt="" width="30">
					<span class="mgl-5">{{$t(item.text)}}</span>
				</div>
			</div>
		</section>
		<section>
			<OpenBox v-show="tabKey == tabArr[0].key " />
			<OpenChest v-if="tabKey == tabArr[1].key " />
			<OpenMecBox v-if="tabKey == tabArr[2].key " />
		</section>
	</div>
</template>

<script>
import OpenChest from './OpenChest.vue';
import OpenBox from './OpenBox.vue';
import OpenMecBox from './OpenMecBox.vue';

export default {
	components: {OpenChest, OpenBox, OpenMecBox},
	data(){
		return({
			tabKey: 'box',
			tabArr: [
				{icon: require("@/assets/icon/box.png"), text: "BOX_34", key: "box"},
				{icon: require("@/assets/icon/box_old.png"), text: "BOX_05", key: "chest"},
				{icon: require("@/assets/box/mecbox.png"), text: "MECBOX_39", key: "mecbox"},
			],
			rateObj: [
				{lv:1, rate: '50%', lang: 'MOMO_09'},
				{lv:2, rate: '35%', lang: 'MOMO_10'},
				{lv:3, rate: '12%', lang: 'MOMO_11'},
				{lv:4, rate: '2.5%', lang: 'MOMO_12'},
				{lv:5, rate: '0.5%', lang: 'MOMO_13'},
			],
			isActive: false,
		})
	},
	created(){
		let tabPos = this.$route.query.tab || 0;
		this.tabKey = this.tabArr[tabPos].key;
	},
	beforeRouteLeave(to, from, next) {
		this.isActive = false;
		next()
	},

	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.isActive = true;
		})
	},
}
</script>
