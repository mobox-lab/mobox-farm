<template>
<div class="pet_item por pet_hover_lv1" :class="'pet_hover_lv3' ">
	<div ref="container" class="swiper-container dib " :id="data.item.tx">
		<div class="swiper-wrapper">
			<div class="swiper-slide " v-for="item in getShowList" :key="item.id">
				<div class="pet-lv vertical-children" v-if="Number(item.imgName) > 100">
					<img :src="require(`../assets/icon/${item.chain.toLocaleLowerCase()}.png`)" alt="" width="15" />&nbsp;
					<span class="mgl-5">Lv. {{ item.level }}</span>
				</div>

				<img class="pet_img" :src="require(`@/assets/market/${item.imgName}.png`)" alt="" width="170" />

				<div style="position: absolute; width: 100%; bottom: 70px; left: 0px">
					<div class="vertical-children pet_num"  >
						x{{ item.num }}
					</div>
				</div>
				<div style="position: absolute; width: 100%; top: -10px; left: 0px" v-if="item.currency == 2">
					<div class="vertical-children pet_num small"  >
						<span>{{$t('Market_39')}}: {{ numFloor(item.price / item.num /1e9, 100) }} {{getCurrencyName(item.currency)}}</span>
					</div>
				</div>
			</div>
		</div>
		<div ref="pagination" class="swiper-pagination"></div>
		<div class="slot">
			<slot></slot>
		</div>
	</div>
</div>
</template>

<script>
import { CommonMethod } from "@/mixin";

export default {
	mixins: [CommonMethod],
	props: ["data"],
	data(){
		return({
			nowIndex: 0,
			mySwiper: null,
		})
	},
	computed: {
		getShowList(){
			let {ids, amounts,price, currency} = this.data.item;
			let arr = [];
			ids.map((id, index)=>{
				let obj = {};
				obj.num = amounts[index];
				obj.level = Number(id) % 100;
				obj.imgName = id;
				obj.chain = "bnb";
				obj.price = price;
				obj.currency = currency;
				arr.push(obj);
			});

			arr.sort((a,b)=>{
				return b.level - a.level;
			});
			return arr;
		},
		showCoin(){
			return this.marketTypePos == 4 ? "BUSD": "MBOX"
		}
	},
	async mounted(){
		let that = this;
		if( this.data.item.ids.length == 1) return;
		let direction = document.body.clientWidth < 1000?"horizontal":"vertical";
		this.mySwiper = new window.Swiper(this.$refs.container, {
			direction: direction,
			slidesPerView : 1,
			loop: false,
			// autoplay: {
			// 	delay: 3000,
			// 	stopOnLastSlide: false,
			// 	disableOnInteraction: false,
			// },
			passiveListeners : false,
			resistanceRatio: 0,
			pagination: {
				el: this.$refs.pagination,
				type: 'bullets',
				clickable: true
			},
			on: {
				slideChangeTransitionEnd: function(){
					that.nowIndex = this.activeIndex;
				},
			}
		});
	},
	
};
</script>

<style  scoped>
@media (max-width:1000px) {
	.swiper-pagination{
		bottom: auto!important;
		top: 0px!important;
	}
}
.swiper-pagination{
	zoom: 1.5;
}
.swiper-container{
    --swiper-pagination-color: #95be9d;/* 两种都可以 */
  }
.swiper-slide{
	border-radius: 20px;
	padding: 15px;
}
.swiper-container{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
	bottom: 0px;
}
.slot{
	position: absolute;
	bottom: 15px;
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
	transition: all 0.3s linear;
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
	background: rgba(0, 0, 0, 0.3);
	text-align: center;
	margin-top: 20px;
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