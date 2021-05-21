<template>
	<div >
		<div class="tal search vertical-children por mgt-20" >
			<span>{{$t("Market_33")}}: {{ getTotalPetNum }}</span>&nbsp;
			<div id="market-pet-fitter">
				<div class="dib por mgt-10" id="shop-history" @click="oprDialog('shop-history-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" />
				</div>
				<Dropdown :list="$parent.selectCategory" :defaultSelectPos="myRentMarketFilter.category" :onChange="onSelectTypeChange" />&nbsp;
				<Dropdown :list="selectVType" :defaultSelectPos="myRentMarketFilter.vType" :onChange="onSelectQualityChange" />&nbsp;
			</div>
		</div>

		<div :class="getTotalPetNum < 4 ? 'tal' : ''" >
			<div class="clear mgt-20">
				<PetItem  v-for="item in getShowPetArr" :key="item.prototype.toString() +item.tokenId + Math.random()" v-bind:data="{item: item}" class="market" >
					<div style="height:43px;position:absolute;width:100%;left:0px;padding:0px 10px;bottom:0px">
						<div v-if="item.vType > 3" class=" tac">
							<router-link :to="`/rentView/${item.tokenId}`">
								<button class="btn-primary" >
									<span>出租</span>
								</button>
							</router-link>
						</div>
					</div>
				</PetItem>
			</div>
		</div>

		<div style="margin-top: 30px" v-if="Math.ceil(this.myNFT_stake.length / onePageCount) > 1" >
			<Page ref="page"   :defaultPage="marketRentMyPage" :totalPage="getTotalPage" :onChange="onPageChange" v-show="getTotalPage > 1" />
		</div>
	
	</div>
</template>

<script>
import { Dropdown, Page, PetItem } from '@/components';
import { CommonMethod } from "@/mixin";
import { mapState } from "vuex";

export default {
	mixins: [CommonMethod],
	data() {
		return {
			onePageCount: 15,
			selectVType: [
				this.$t("MOMO_08"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
		};
	},
	components: { Dropdown, Page, PetItem },
	computed: {
		...mapState({
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myRentMarketFilter: (state) => state.marketState.data.myRentMarketFilter,
			marketRentMyPage: (state) => state.marketState.data.marketRentMyPage,
			historyNotice: (state) => state.marketState.data.historyNotice,
		}),
		getTotalPetNum: function () {
			let totalPet = 0;
			this.getTotalPet.map((item) => {
				totalPet += item.num;
			});
			return totalPet;
		},
		getTotalPage() {
			return Math.ceil(this.getTotalPet.length / this.onePageCount);
		},

		getTotalPet() {
			let totalPet = [];
			[...this.myNFT_stake].map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory =this.myRentMarketFilter.category == 0 || this.myRentMarketFilter.category == item.category;
				let isMathVType = item.vType >= 4 && (this.myRentMarketFilter.vType == 0 || this.myRentMarketFilter.vType == item.vType);
				if (isMatchCategory && isMathVType) {
					totalPet.push(item);
				}
			});
			totalPet.sort((a, b) =>
				b.lvHashrate - a.lvHashrate
			);
			return totalPet;
		},
		getShowPetArr() {
			return this.getTotalPet.slice(
				this.onePageCount * (this.marketRentMyPage - 1),
				this.onePageCount * this.marketRentMyPage
			);
		},

		
	},

	methods: {
		onSelectQualityChange(pos) {
			if(pos == 1) pos = 4;
			if(pos == 2) pos = 5;
			if(pos == 3) pos = 6;
			this.$store.commit("marketState/setFilter", {
				filterName:"myRentMarketFilter",
				type: "vType",
				value: pos,
			});
			this.onPageChange(1);
		},
		onSelectTypeChange(pos) {
			this.$store.commit("marketState/setFilter", {
				filterName:"myRentMarketFilter",
				type: "category",
				value: pos,
			});
			this.onPageChange(1);
		},
		onPageChange(page) {
			this.$store.commit("marketState/setData", {marketRentMyPage:page});
			this.$nextTick(()=>{
				this.$refs.page.initPage();
			})
		},
	},
};
</script>

<style  scoped>
.sell-input{
	text-align: center; 
	width: 100%;
}

@media (max-width: 768px) {
	#shop-car-content {
		max-height: 500px !important;
	}
	#shop-car{
		margin-right: 10px !important;
	}
	#market-pet-fitter{
		zoom: 0.8;
	}
}
#shop-car-content {
	max-height: 690px;
	min-height: 200px;
}
.shop-car-item {
	width: 100%;
	height: 100px;
	border-radius: 20px;
	text-align: left;
}
.shop-car-item .pet-img {
	width: 100px;
	height: 100px;
}
#shop-car-num {
	width: 17px;
	height: 17px;
	background: red;
	border-radius: 10px;
	font-size: 12px;
	color: #fff;
	display: inline-block;
	text-align: center;
	line-height: 16px;
	position: absolute;
	top: 0px;
	right: -5px;
}
#shop-car,#shop-history {
	margin-right: 15px;
	cursor: pointer;
	position: relative;
	user-select: none;
}
#market #market-pet-fitter {
	position: absolute;
	right: 0px;
	top: 0px;
}

</style>
