<template>
	<div class="pet-add-item por">
		<div :class="'skew-box ' + vType"></div>
		<div class="pet-active" v-if="active">
			<img src="../assets/activePetAdd.png" alt=""/>
		</div>
		<!-- <img class="add-pet-img" src="../assets/icon/addpet.png" alt="" height="20" v-if="selectProtoTypes.length < needNum" /> -->
		<svg v-if="selectProtoTypes.length < needNum"  class="add-pet-img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M867.7 423.8H599.8V155.9c0-49.3-40-89.3-89.3-89.3s-89.3 40-89.3 89.3v267.9H153.3c-49.3 0-89.3 40-89.3 89.3s40 89.3 89.3 89.3h267.9v267.9c0 49.3 40 89.3 89.3 89.3s89.3-40 89.3-89.3V602.4h267.9c49.3 0 89.3-40 89.3-89.3s-40-89.3-89.3-89.3z"  fill="#E1FF17"></path></svg>

		<div class="pet-add-show-img">
			<img v-if="!needPrototype && this.selectProtoTypes.length == 0" :src="require('../assets/jy.png')" alt="" class="gray" width="60%" style="margin-top: 20px; margin-left: 10px" />
			<img
				v-if="needPrototype && this.selectProtoTypes.length == 0"
				:src="require(`../assets/pet/${needPrototype}.png`)"
				alt=""
				class="gray opa-6"
				width="80%"
				style="margin-top: 3px"
			/>
			<img
				v-if="this.selectProtoTypes.length != 0"
				:src="require(`../assets/pet/${this.selectProtoTypes[0]}.png`)"
				alt=""
				style="margin-top: 3px"
				width="80%"
			/>
		</div>
		<div class="pet-type-level">
			<div class="pet-add-type vertical-children" v-if="needLv > 1">
				{{ needLv }}
			</div>
			<div class="pet-add-type vertical-children" v-if="category > 0">
				<img
					:src="
						require(`../assets/icon/${category_img[category]}.png`)
					"
					alt=""
					width="12"
					height="12"
				/>
			</div>
		</div>
		<p class="pet-add-num" :class="selectProtoTypes.length < needNum?'notice-c':'' ">{{ selectProtoTypes.length }}/{{ needNum }}</p>
	</div>
</template>
<script>
import { CommonMethod } from "@/mixin";

export default {
	mixins: [CommonMethod],
	props: [
		"needNum",
		"category",
		"selectProtoTypes",
		"vType",
		"needLv",
		"needPrototype",
		"active",
	],
};
</script>
<style  scoped>
.need-notice .notice-c{
	/* color: rgb(219, 85, 85); */
	color: #e24c4c;
}
.pet-active img{
	height: 86px;
}
.pet-active{
	position: absolute;
	left: -9px;
	top: -9px;
}
.pet-add-show-img {
	position: absolute;
	margin-top: -8px;
}
.add-pet-img {
	position: absolute;
	right: -6px;
	top: -6px;
}
.pet-add-num {
	margin-left: -9px;
	width: 100%;
	font-size: 13px;
	position: absolute;
	bottom: -27px;
}
.pet-type-level {
	position: absolute;
	bottom: -10px;
	left: -8px;
	width: 100%;
}
.pet-add-type {
	border-radius: 30px;
	height: 23px;
	width: 23px;
	background: #1a2c50;
	border: 1px solid #315184;
	line-height: 18px;
	font-size: 12px;
	text-align: center;
	padding: 2px;
	display: inline-block;
	margin: 0px 1px;
}
.skew-box {
	width: 86px;
	height: 65px;
	position: absolute;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.skew-box.v1 {
	background-image: url("../assets/nft_head_v1.png");
}
.skew-box.v2 {
	background-image: url("../assets/nft_head_v2.png");
}
.skew-box.v3 {
	background-image: url("../assets/nft_head_v3.png");
}
.skew-box.v4 {
	background-image: url("../assets/nft_head_v4.png");
}
.skew-box.v5 {
	background-image: url("../assets/nft_head_v5.png");
}
.skew-box.v6 {
	background-image: url("../assets/nft_head_v6.png");
}
.pet-add-item {
	user-select: none;
	display: inline-block;
	cursor: pointer;
	width: 86px;
	height: 65px;

	margin: 0px 10px;
	margin-bottom: 25px;
}
@media (max-width: 768px){
	.pet-add-item{
		zoom: 0.6 !important;
	}
}
</style>