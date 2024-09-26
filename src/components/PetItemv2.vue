<template>
	<div class="dib pet_item_new" ref="pet" :class="{'show-opr': isShowOpr}">
		123
		<img :src="require(`@/assets/newCard/bgv${data.item.vType}.png`)"  width="100%" alt="" />
		<div class="momo_power">
			<div class="aveage-box" style="flex: 1">
				<div class="vertical-children tal">
					<img v-if="data.item.category != 0" :src=" require(`../assets/icon/${ category_img[data.item.category] }.png`)" alt=""  height="20" />
					<span class="mgl-5 new_momo_text">Lv. {{ data.item.level }}</span>
				</div>
				<div class="vertical-children tar por">
					<div class="gka-harmer por" ref="anime" style="margin-top: -13px;right:-10px" :class="{'animation-harmer': data.item.location == 'stake'}" :style="{animationDelay: delay+'s'}">
						<img src="../assets/anime/sleep.gif" class="sleep-harmer" v-if="data.item.location == 'wallet'" alt="" />
					</div>
					<span   class="new_momo_text">{{ data.item.lvHashrate }}</span>
					<div class=" tar vertical-children lv1 small new_momo_text opa-6"  v-if="data.item.vType >= 4 && data.item.level > 1">
						<span>Lv. 1</span>
						<span class="mgl-5">[{{ data.item.hashrate }}]</span>
					</div>
				</div>
			</div>
		</div>
		<div class="momo_content">
			<img class="pet_img" v-if="Number(data.item.prototype) > 60000" :src="require(`../assets/pet/${data.item.prototype}.gif`)" alt=""   />
			<img class="pet_img" v-else :src="require(`../assets/pet/${data.item.prototype}.png`)" alt="" :class="{'big_momo': data.item.vType ==1}" />
			<p class="momo_name new_momo_text show_on_market hide" >{{ hasSetName ? shortStr(data.item.tokenName) : $t(data.item.tokenName) }}</p>
			<!-- MOMO数量 -->
			<div class="vertical-children pet_num new_momo_text" v-if="data.item.vType < 4 && data.item.num >= 1" >x{{ data.item.num }}</div>
			<!-- 宝石 -->
			<div class="jewel" v-if="data.item.vType >= 4">
				<div v-for="(item, index) in [100,200,300,400 ]" :key="JSON.stringify(item)" class="gem-item-little">
					<img v-if="data.item.gems == undefined || data.item.gems[index] == 0" :src="require(`../assets/market/${item+1}.png`)" class="opa-3 gray" alt="" title="jewel"/>
					<img v-else :src="require(`../assets/market/${data.item.gems[index]}.png`)" alt="">
				</div>
			</div>
			<!-- 品质 -->
			<p v-if="data.item.vType > 3" class="new_momo_text momoType" :class="`momoType${data.item.vType}`">{{momoType[data.item.vType]}}</p>
		</div>
		<div class="momo_opr new_momo_text">
			<p class="hide_on_market">{{ hasSetName ? shortStr(data.item.tokenName) : $t(data.item.tokenName) }}</p>
			<slot :showOpr="showOpr"></slot>
		</div>
		<slot name="mask_opr" :showOpr="showOpr"></slot>
	</div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { Common } from "@/utils";

export default {
	mixins: [CommonMethod],
	props: ["data"],
	data(){
		return({
			delay: Common.getRandomNum(200, 5000) / 100,
			isShowOpr: false,
			momoType: [0,0,0,0,"RARE","EPIC","LEGENDARY"]
		})
	},
	computed: {
		//是否设置过名字
		hasSetName() {
			return this.data.item.tokenName.indexOf("Name_") == -1;
		},
	},
	methods: {
		showOpr(show){
			this.isShowOpr = show;
		}
	}
	
};
</script>

<style scoped>
.momoType{
	font-size: 12px;
	position: absolute;
	top: 10px;
	right: 15px;
	font-style: italic;
}
.momoType4{
	color: #e8befd;
}
.momoType5{
	color: #ffdeb0;
}
.momoType6{
	color: #ffc7c8;
}
.listing{
	background: #323841e7;
	border: 2px solid #0d0f11;
	border-radius: 15px 0px 0px 15px;
	line-height: 15px;
	right: 5px;top: -200px;
	position: absolute;
	padding: 10px;
	text-align: left;
	font-family: 'Poppins Bold';
	font-weight: bold;
	text-shadow: #070d13 1px 2px 1px; 
	width: 120px;
}
.jewel{
	position: absolute;
	left: 15px;
	top: 5px;
	transform: translate(0, -50%);
}
.gem-item-little{
	width: 25px;
	height: 25px;
	position: relative;
	background: rgba(0, 0, 0, 0.493);
	border-radius: 5px;
	margin-right: 5px;
	display: inline-block;
}
.gem-item-little img{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
}

.show-opr .mask-btn-group{
	display: flex;
	flex-direction: column;
	justify-content:flex-end;
	align-items: center;
	flex: 1;
	height: 100%;
}
.show-opr .mask-opr{
	display: block !important;
}
.mask-opr{
	position: absolute;
	top: 0px;left: 0px;bottom: 0px;right: 0px;
	background: rgba(0, 0, 0, 0.5);
	display: none;
	padding-bottom: 50px;
	padding-left: 10px;
	padding-right: 10px;
}
.market .hide_on_market{
	display: none !important;
}
.market .show_on_market{
	display: block !important;
}
.big_momo{
	zoom: 1.2;
}
.pet_num{
	position: absolute;
	font-size: 20px;
	top: 15px;
	right: 15px;
}
.pet_img{
	margin-top: -10px;
	height: 150px;
}
.momo_opr{
	position: absolute;
	bottom: 5px;
	height: 42px;
	width: 100%;
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
}
.lv1{
	position: absolute;
	right: 0px;
	bottom: -15px;
	line-height: 12px;
}
.momo_power{
	position: absolute;
	top: 5px;
	height: 42px;
	width: 100%;
	font-size: 16px;
	display: flex;
	flex: 1;
	padding: 0px 15px;
}
.momo_name{
	position: absolute;
	bottom: 20px;
	width: 100%;
	text-align: center;
}
.momo_content{
	position: absolute;
	top: 60px;left: 0px;right: 0px;bottom: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.pet_item_new {
	position: relative;
	display: inline-block;
	margin-left: 20px;
	margin-top: 20px;
	cursor: pointer;
	user-select: none;
	line-height: 0px;
	width: 226px;
	height: 327px;
}
.new_momo_text{
	font-family: 'Poppins Bold';
	font-weight: bold;
	text-shadow: #070d13 1px 2px 1px; 
}
</style>