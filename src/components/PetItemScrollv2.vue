<template>
	<div class="pet_item_new por" :class="'pet_hover_lv' + getNowVType">
		<img src="@/assets/newCard/comp_bg.png"  width="100%" alt="" />
		<div  class="dib momo_cont" :id="data.item.tx" >
			<div v-for="item in getShowList.slice(0, 3)" :key="item.prototype" class="scroll-item">
				<div class="aveage-box">
					<div class="vertical-children tal" style="flex:3;white-space: nowrap">
						<PetItemMin :data="item" />
						<div class="dib mgl-10" style="white-space: nowrap">
								<div class="sn">{{$t(item.tokenName) }}</div>
								<div class=" vertical-children mgt-5" >
									<img src="@/assets/icon/airdrop.png" alt="" height="15" />
									<span class="mgl-5">{{ item.lvHashrate }}</span>
								</div>
						</div>
					</div>
					<div class="tac">x{{ item.num }}</div>
				</div>
			</div>
			<div class="scroll-item">
				<div class="dib">
					<img src="@/assets/newCard/more_momo.png" alt="">
				</div>
				<div class="mgl-10 dib">
					ALL: {{getShowList.length}}
				</div>
			</div>
		</div>
		<div class="slot">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { BaseConfig } from '@/config';
// import { Common } from '@/utils';
import PetItemMin from "./PetItemMin.vue";

export default {
	mixins: [CommonMethod],
	components: {PetItemMin},
	props: ["data"],
	data(){
		return({
			nowIndex: 0,
		})
	},
	computed: {
		getShowList(){
			let {ids, amounts} = this.data.item;
			let arr = [];
			ids.map((prototype, index)=>{
				let obj = BaseConfig.NftCfg[prototype];
				obj.num = amounts[index];
				obj.vType = parseInt(prototype / 1e4);
				obj.tokenId = 0;
				obj.level = 1;
				obj.chain = "bnb";
				obj.hashrate = obj.quality;
				obj.lvHashrate = obj.quality;
				obj.noPrice = true;
				obj.noHover = true;
				arr.push(obj);
			});

			arr.sort((a,b)=>{
				return b.vType - a.vType;
			});
			return arr;
		},
		getNowVType(){
			return this.getShowList[this.nowIndex].vType;
		}

	},
};
</script>

<style  scoped>

@media (max-width: 768px) {
	.sn{
		width: 60px !important;
	}
	.scroll-item{
		padding: 2px !important;
		margin-bottom: 3px !important;
	}
	.momo_cont{
		left: 10px !important; 
		right: 10px !important;
		top: 10px !important;
	}
}
.sn{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 80px;
	height: 20px;
	line-height: 20px;
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
.scroll-item{
	background: #95999763;
	border: 2px solid #070d14;
	border-radius: 15px;
	padding: 6px;
	margin-bottom: 5px;
}
.momo_cont{
	position: absolute;
	left: 15px; right: 15px; bottom: 0px; top: 15px;
}
.rent .quick-buy{
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
.market .animation{
	animation: none !important;
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
	margin-top: 30px;
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
	font-family: 'Poppins Bold';
	font-weight: bold;
	text-shadow: #070d13 1px 2px 1px; 
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
	font-size: 12px;
	background: rgba(0, 0, 0, 0.3);
	text-align: center;
}

.gka {
	width: 51px;
	height: 47px;
	display: inline-block;
	background-image: url("../assets/anime/chuizi.png");
	zoom: 0.8;
}

.animation {
	width: 51px;
	height: 47px;
	background-image: url("../assets/anime/chuizi.png");
	background-size: 714px 47px;
	background-repeat: no-repeat;
	animation-name: keyframes-chuizi;
	animation-duration: 3s;
	animation-delay: 0s;
	animation-iteration-count: infinite;
	animation-fill-mode: forwards;
	animation-timing-function: steps(1);
}

@keyframes keyframes-chuizi {
	0% {
		width: 51px;
		height: 47px;
		background-image: url("../assets/anime/chuizi.png");
		background-size: 714px 47px;
	}

	1% {
		background-position: -51px 0px;
	}

	2% {
		background-position: -102px 0px;
	}

	3% {
		background-position: -153px 0px;
	}

	4% {
		background-position: -204px 0px;
	}

	5% {
		background-position: -255px 0px;
	}

	6% {
		background-position: -306px 0px;
	}

	7% {
		background-position: -357px 0px;
	}

	8% {
		background-position: -408px 0px;
	}

	9% {
		background-position: -459px 0px;
	}

	10% {
		background-position: -510px 0px;
	}

	11% {
		background-position: -561px 0px;
	}

	12% {
		background-position: -612px 0px;
	}

	13%,
	100% {
		background-position: -663px 0px;
	}
}

</style>