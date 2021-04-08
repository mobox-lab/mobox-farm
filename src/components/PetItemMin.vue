<template>
	<div class="dib pet-min por" :class="'pet-min-type'+data.vType" ref="petMin"  > 
		<div class="pet-min-img">
			<img  :src="require(`../assets/pet/${data.prototype}.png`)" alt="" />
		</div>
		<p class="pet-min-lv" v-if="data.vType < 4">{{data.num}}</p>
		<p class="pet-min-catogry">
			<img :src=" require(`../assets/icon/${ category_img[data.category] }.png`) " alt="" width="10" height="10" />
		</p>
		<div class="pet-min-hover" ref="petMinHover">
			<PetItem :data="{item: data}" :class="data.vType >= 4?'market':'' " >
				<div class="vertical-children mgt-10" style="font-size: 18px" v-if="data.vType >= 4">
					<img src="../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
					<span>{{numFloor(data.bidPrice/1e9, 10000)}}</span>
				</div>
			</PetItem>
		</div>
	</div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { PetItem } from '@/components';
const $ = window.$;
export default {
	mixins: [CommonMethod],
	components: {PetItem},
	props: ["data"],
	mounted(){
		$(this.$refs.petMin).hover(()=>{
			$(this.$refs.petMinHover).show();
		},()=>{
			$(this.$refs.petMinHover).hide();
		});

		$(this.$refs.petMin).click((e)=>{
			e.stopPropagation();
			$(this.$refs.petMinHover).show();
		})
	}
}
</script>

<style  scoped>
@media (max-width: 768px){
	.pet_item{
		width:350px !important;
		zoom: 0.8;
	}
}
.pet-min-hover{
	position: absolute;
	display: none;
	z-index: 998;
}
.pet-min-img img{
	position: absolute;
	width: 37px;
	height: 37px;
	left: 0px;
	top: 0px;
}
.pet-min-img{
	position: absolute;
	width: 37px;
	height: 37px;
	left:0px;
	top: 0px;
	overflow: hidden;
	border-radius: 37px;
}
.pet-min-catogry{
	position: absolute;
	border-radius: 20px;
	height: 20px;
	width: 20px;
	align-items: center;
	display: flex;
	justify-content: center;
	background: #1a2c50;
	border: 1px solid #315184;
	bottom: -12px;
	left: 50%;
	transform: translateX(-50%);
	zoom: 0.8;
}
.pet-min-lv{
	position: absolute;
	height: 20px;
	width: 20px;
	border-radius: 20px;
	align-items: center;
	display: flex;
	justify-content: center;
	background: #1a2c5069;
	border: 1px solid #315184;
	top:-8px;
	right: 0px;
	font-size: 12px;
	color: #fff;
	zoom: 0.8;
}
.pet-min{
	width: 45px;
	height: 45px;
	position: relative;
	border-radius: 45px;
	cursor: pointer;
}
.pet-min-type1{
	border: 4px solid #8b8b8bb4;
}
.pet-min-type2{
	border: 4px solid #5b7e2bb4;
}
.pet-min-type3{
	border: 4px solid #3955a0b4;
}
.pet-min-type4{
	border: 4px solid #793ea8b4;
}
.pet-min-type5{
	border: 4px solid #97812fb4;
}
.pet-min-type6{
	border: 4px solid #8f3433;
}
</style>
