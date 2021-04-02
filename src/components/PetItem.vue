<template>
	<div :class="' pet_item pet_hover_lv' + data.item.vType">
		<div class="pet-lv vertical-children">
			<img :src="require(`../assets/icon/${data.item.chain.toLocaleLowerCase()}.png`)" alt="" width="15" />&nbsp;
			<span class="mgl-5">Lv. {{ data.item.level }}</span>
		</div>

		<div class="jewel" v-if="data.item.vType >= 4">
			<div v-for="item in 4" :key="item">
				<img src="../assets/icon/jewelbg.png" alt="" title="jewel"/>
			</div>
		</div>

		<div id="light-shadow" ref="lightShadow" v-if="data.item.vType >= 4"></div>
		<div id="light-border-show" class="v5b" v-if="data.item.vType == 5"></div>
		<div id="light-border-show" class="v6b" v-if="data.item.vType == 6"></div>

		<img class="pet_img" :src="require(`../assets/pet/${data.item.prototype}.png`)" alt="" width="170" height="170" />
		<div style="position: absolute; width: 100%; bottom: 95px; left: 0px">
			<div class="vertical-children pet_num" v-if="data.item.vType < 4 && data.item.num > 1" >
				x{{ data.item.num }}
			</div>
		</div>

		<div class="pet-bottom vertical-children mgt-5">
			<div class="pet-name">
				<img :src=" require(`../assets/icon/${ category_img[data.item.category] }.png`)" alt="" width="15" height="15" />&nbsp;
				{{ hasSetName ? shortStr(data.item.tokenName) : $t(data.item.tokenName) }}
			</div>
		</div>

		<div class="pet-power vertical-children mgt-20">
			<div class="gka-harmer por" ref="anime" style="margin-top: -12px;right:-10px">
				<img src="../assets/anime/sleep.gif" class="sleep-harmer" v-if="data.item.location == 'wallet'" alt="" />
			</div>
			<span :class="getHashrateColor(data.item)" style="font-size: 25px" class="bold">{{ data.item.lvHashrate }}</span>
			<div class="mgt-10 tar vertical-children show-only-market hide" style="font-size: 12px" v-if="data.item.vType >= 4 && data.item.level > 1">
				<span>Lv. 1</span>&nbsp;
				<img src="../assets/icon/airdrop.png" alt="" height="15">&nbsp;
				<span :class="getHashrateColor(data.item)"  class="bold">{{ data.item.hashrate }}</span>
			</div>
		</div>

		<slot></slot>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Common } from "@/utils";
import lottie from "lottie-web";

export default {
	mixins: [CommonMethod],
	props: ["data"],
	computed: {
		...mapState({
			globalState: (state) => state.globalState.data,
		}),
		//是否设置过名字
		hasSetName() {
			return this.data.item.tokenName.indexOf("Name_") == -1;
		},
	},

	async mounted() {
		await Common.sleep(Common.getRandomNum(200, 1000));
		if (this.$refs.anime && this.data.item.location == "stake") {
			this.$refs.anime.classList.add("animation-harmer");
		}

		// console.log(lottie);

		// setTimeout(()=>{
		if(this.data.item.vType >= 4){
			lottie.loadAnimation({
				container: this.$refs.lightShadow, // the dom element that will contain the animation
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: `./animation/lightShadow/v${this.data.item.vType}.json` // the path to the animation json
			});
		}

		// }, 3000)

		// if

		
	},
};
</script>

<style  scoped>
#light-border-show{
	position: absolute;
	left:50%;
	top:50%;
	transform: translate(-50%, -50%) scale(1.07,0.96);
}
#light-shadow{
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	transform: scale(1.2,1.1);
}
.jewel{
	position: absolute;
	left: 20px;
	top:50%;
	transform: translate(0, -50%);
}

.market .animation{
	animation: none !important;
}
.market .show-only-market{
	display: block;
}
.market .pet-power{
	position: absolute;
	right: 15px;
	top: 15px;
	margin-top: 0px;
	zoom: 0.9;
}
.pet_item .pet-power {
	line-height: 14px;
	font-size: 14px;
	right: 15px;
	top: 15px;
}
.pet_item .pet-lv {
	line-height: 11px;
	left: 15px;
	top: 15px;
	position: absolute;
}
.pet-bottom .pet-name {
	display: inline-block;
	border-radius: 50px;
	padding: 5px 15px;
	font-size: 12px;
	background: rgba(0, 0, 0, 0.3);
	text-align: center;
}

.pet_item .pet-bottom {
	width: 100%;
	text-align: center;
	margin-top: -20px;
}
.pet_item {
	width: 350px;
	border-radius: 20px;
	text-align: center;
	position: relative;
	display: inline-block;
	margin-left: 20px;
	margin-top: 20px;
	cursor: pointer;
	padding: 15px;
	user-select: none;
	color: #c9c9c9;
	height: 250px;
}

.pet_item .pet_img {
	vertical-align: middle;
	user-select: none;
	position: relative;
	top: -15px;
}

.pet_num {
	display: inline-block;
	border-radius: 30px;
	padding: 2px 15px;
	font-size: 12px;
	background: rgba(0, 0, 0, 0.3);
	text-align: center;
}

</style>