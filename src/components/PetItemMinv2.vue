<template>
	<div class="dib pet-min por" :class="'pet-min-type'+petData.vType" ref="petMin"  > 
		<div class="pet-min-img">
			<img  :src="require(`../assets/pet/${petData.prototype}.png`)" alt="" width="70%" />
		</div>
		<p class="pet-min-lv" v-if="petData.vType < 4 && !petData.noHover">{{petData.num}}</p>
		<p class="pet-min-catogry">
			<img :src=" require(`../assets/icon/${ category_img[petData.category] }.png`) " alt="" width="10" height="10" />
		</p>
		<img v-if="petData.isGroup" src="@/assets/icon/isGroup.png" alt="" height="20" class="is-group"/>
		<div class="pet-min-hover" ref="petMinHover" :class="{'left': isLeft, 'top': isTop}" v-if="!petData.noHover">
			<PetItem :data="{item: petData}" :class="petData.vType >= 4 && !petData.noPrice?'market':'' " class="no-search">
				<div class="vertical-children mgt-10" style="font-size: 18px" v-if="petData.vType >= 4 && !petData.noPrice">
					<img v-if="petData.isRent" :src="require(`@/assets/coin/${Number(petData.orderId) >= 5e4?'BUSD':'MBOX'}.png`)" alt="" height="20"/>&nbsp;
					<img v-else src="../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
					<span>{{numFloor(petData.bidPrice/1e9, 10000)}}</span>
				</div>
			</PetItem>
		</div>
	</div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { PetItem } from '@/components';
import { Wallet } from '@/utils';
import { mapState } from 'vuex';
const $ = window.$;
export default {
	mixins: [CommonMethod],
	components: {PetItem},
	props: ['data', "isLeft", "isTop"],
	data(){
		return({
			petData: {...this.data, gems: [0,0,0,0], vType: this.getVType(this.data.prototype)},
		})
	},
	computed: {
		...mapState({
			momoGemsObjs: (state) => state.marketState.data.momoGemsObjs,
		})
	},
	async created(){
		let tokenId = this.petData.tokenId;
		if(tokenId != 0){
			if(!Object.prototype.hasOwnProperty.call(this.momoGemsObjs, tokenId)){
				let res = await Wallet.ETH.getInlayInfo(tokenId);
				this.momoGemsObjs[tokenId] = [...res];
				this.petData.gems = [...res];
			}else{
				this.petData.gems = [...this.momoGemsObjs[tokenId]];
			}
		}
	},
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
.is-group{
	position: absolute;
	bottom: -5px;
	right: 0px;
}
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
.pet-min-hover.left{
	right: 20px;
}
.pet-min-hover.top{
	bottom: 0px;
}

.pet-min-img{
	position: absolute;
	width: 50px;
	height:50px;
	left:0px;
	top: 2px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}
.pet-min-catogry{
	position: absolute;
	border-radius: 20px;
	height: 20px;
	width: 20px;
	align-items: center;
	display: flex;
	justify-content: center;
	top: 0px;
	left: 0px;
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
	background: #13181f;
	border: 1px solid #383e46;
	border-radius: 10px;
	border-radius: 51.2px;
	top:0px;
	right: 0px;
	font-size: 12px;
	color: #fff;
	zoom: 0.8;
}
.pet-min{
	width: 50px;
	height: 50px;
	position: relative;
	cursor: pointer;
	background-size: 100% 100%;
}
.pet-min-type1{
	background-image: url('../assets/newCard/minbg1.png');
}
.pet-min-type2{
	background-image: url('../assets/newCard/minbg2.png');
}
.pet-min-type3{
	background-image: url('../assets/newCard/minbg3.png');
}
.pet-min-type4{
	background-image: url('../assets/newCard/minbg4.png');
}
.pet-min-type5{
	background-image: url('../assets/newCard/minbg5.png');
}
.pet-min-type6{
	background-image: url('../assets/newCard/minbg6.png');
}
</style>
