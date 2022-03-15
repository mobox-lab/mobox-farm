<template>
	<div :class="['pet_hover_lv' + data.item.vType,{'market': data.item.location == 'verse'}]" class="pet_item" :data-vType="data.item.vType">
		<img class="quick-buy" src="@/assets/icon/search.png" alt="" @click.stop="quickBuy(data.item.prototype)">

		<div class="pet-lv vertical-children">
			<img :src="require(`../assets/icon/bnb.png`)" alt="" width="15" />&nbsp;
			<span class="mgl-5">Lv. {{ data.item.level }}</span>
		</div>

		

		<div class="jewel" v-if="data.item.vType >= 4">
			<div v-for="(item, index) in [100,200,300,400 ]" :key="JSON.stringify(item)" class="gem-item-little">
				<img v-if="data.item.gems == undefined || data.item.gems[index] == 0" :src="require(`../assets/market/${item+1}.png`)" class="opa-3 gray" alt="" title="jewel"/>
				<img v-else :src="require(`../assets/market/${data.item.gems[index]}.png`)" alt="">
			</div>
		</div>

		<img class="pet_img" v-if="Number(data.item.prototype) > 60000" :src="require(`../assets/pet/${data.item.prototype}.gif`)" alt=""  height="120" />
		<img class="pet_img" v-else :src="require(`../assets/pet/${data.item.prototype}.png`)" alt=""  height="120" />
		<div style="position: absolute; width: 100%; bottom: 100px; left: 0px;right:0px;z-index:5">
			<div class="vertical-children pet_num" v-if="data.item.vType < 4 && data.item.num > 1" >
				x{{ data.item.num }}
			</div>
		</div>

		<div class="pet-bottom vertical-children mgt-5">
			<div class="pet-name">
				<img v-if="data.item.category != 0" :src=" require(`../assets/icon/${ category_img[data.item.category] }.png`)" alt="" width="15" height="15" />&nbsp;
				{{ hasSetName ? shortStr(data.item.tokenName) : $t(data.item.tokenName) }}
			</div>
		</div>
		<!-- LV.1 -->
		<div class="mgt-10 tar vertical-children lv1" style="font-size: 12px" v-if="(data.item.vType >= 4 && data.item.level > 1) || data.item.location=='verse' ">
			<span>Lv. 1</span>&nbsp;
			<img src="../assets/icon/airdrop.png" alt="" height="15">&nbsp;
			<span :class="getHashrateColor(data.item)"  class="bold">{{ data.item.hashrate }}</span>
		</div>

		<div class="pet-power vertical-children mgt-20">
			<div  class="gka-harmer por" ref="anime" style="margin-top: -12px;right:-10px" :style="{animationDelay: delay+'s'}" :class="{'animation-harmer': data.item.location == 'stake'}">
				<img src="../assets/anime/sleep.gif" class="sleep-harmer" v-if="data.item.location == 'wallet'" alt="" />
			</div>
			<span :class="getHashrateColor(data.item)" style="font-size: 25px" class="bold" >{{ data.item.lvHashrate }}</span>
			<div class="mgt-10 tar vertical-children " style="font-size: 12px" v-if="data.item.vType >= 4 && data.item.level > 1">
				<span>Lv. 1</span>&nbsp;
				<img src="../assets/icon/airdrop.png" alt="" height="15">&nbsp;
				<span :class="getHashrateColor(data.item)"  class="bold">{{ data.item.hashrate }}</span>
			</div>
		</div>
		<div class="pet-chanzi" v-if="data.item.location == 'verse'">
			<img src="@/assets/icon/chanzi.gif" alt="" width="50" style="margin-bottom:-10px">
		</div>
		<div class="por slot">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Common } from "@/utils";

export default {
	mixins: [CommonMethod],
	props: ["data"],
	data(){
		return{
			delay: Common.getRandomNum(200, 1000) / 100
		}
	},
	computed: {
		...mapState({
			globalState: (state) => state.globalState.data,
		}),
		//是否设置过名字
		hasSetName() {
			return this.data.item.tokenName.indexOf("Name_") == -1;
		},
	},

};
</script>

<style  scoped>

.market .lv1{
	display: none !important;
}
.lv1{
	position: absolute;
	top: 0px;
	right: 10px;
}
.no-search .quick-buy{
	display: none;
}
.quick-buy{
		opacity: 0.6;
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 30px;
		cursor: pointer;
		z-index: 99 !important;
	}
	.quick-buy:hover{
		opacity: 1;
	}
.slot{
	position: absolute;
	bottom: 10px;
	z-index: 9999;
	text-align: center;
	width: 100%;
	height: 25px;
	left: 0px;
	padding: 0px 10px;

}
.slot .mgt-10{
	margin-top: 0px;
}
.gem-item-little{
	width: 30px;
	height: 30px;
	position: relative;
	background: rgba(0, 0, 0, 0.493);
	border-radius: 5px;
	margin-top: 5px;
}
.gem-item-little img{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
}
#light-border-show{
	position: absolute;
	left:50%;
	top:50%;
	transform: translate(-50%, -50%) scale(1.07,0.96);
}
.light-shadow{
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
.pet-chanzi{
	width: 100%;
	position: absolute;
	left: 0px;
	bottom: 5px;
}
.market .pet-power{
	position: absolute;
	right: 15px;
	top: 15px;
	margin-top: 0px;
	zoom: 0.9;
	text-align: right;
}
.pet_item .pet-power {
	width: 100%;
	position: absolute;
	line-height: 14px;
	font-size: 14px;
	left: 0px;
	bottom: 10px;
	padding: 0px 10px;
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
	margin-top: 30px;
	position: relative;
	z-index: 5;
}
.pet_item {
	width: 350px;
	border-radius: 50px;
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
/* .pet_item {
	width: 255px;
	border-radius: 16px;
	text-align: center;
	position: relative;
	display: inline-block;
	margin-left: 20px;
	margin-top: 20px;
	cursor: pointer;
	padding: 15px;
	user-select: none;
	color: #c9c9c9;
	height: 265px;
} */

.pet_item *{
	z-index: 5;
}

.pet_item .pet_img {
	vertical-align: middle;
	user-select: none;
	position: relative;
	top: 15px;
}

.pet_num {
	display: inline-block;
	border-radius: 30px;
	padding: 2px 15px;
	background: rgba(0, 0, 0, 0.3);
	text-align: center;
}

</style>