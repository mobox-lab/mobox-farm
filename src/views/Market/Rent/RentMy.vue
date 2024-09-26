<template>
	<div >
		<div class="tal search vertical-children por mgt-20" >
			<div id="market-pet-fitter">
				<div class="dib por mgl-10 filter">
					<img src="@/assets/icon/filter_icon.png" alt="" height="40" @click="toggleFilter($refs.filter)" />
					<div class="filter-panel hide " ref="filter">
						<div >
							<h5>Qualities</h5>
							<div @click="onSelectQualityChange(pos)" class="filter-select-item" :class="{'active': pos == (myRentMarketFilter.vType == 0?0:myRentMarketFilter.vType - 3)}" v-for="(item, pos) in selectVType" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-20">
							<h5>Status</h5>
							<div @click="onSelectState(pos)" class="filter-select-item" :class="{'active': pos == myRentMarketFilter.state}" v-for="(item, pos) in momoState" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-30 tac" @click="toggleFilter($refs.filter)">
							<button class="btn-primary" style="width:80%">{{$t("Common_03")}}</button>
						</div>
					</div>
				</div>
			</div>

			<div class="vertical-children  dib">
				<span>{{$t("Market_33")}}({{ getTotalPetNum }})</span>
				<div class="dib filter-show-group">
					<div class="filter-show-item" v-if="myRentMarketFilter.vType != 0" >
						<span class="filter-close" @click="onSelectQualityChange(0)">&times;</span>
						<span class="mgl-10">{{selectVType[(myRentMarketFilter.vType == 0?0:myRentMarketFilter.vType - 3)]}}</span>
					</div>
					<div class="filter-show-item" v-if="myRentMarketFilter.state != 0" >
						<span class="filter-close" @click="onSelectState(0)">&times;</span>
						<span class="mgl-10">{{momoState[myRentMarketFilter.state]}}</span>
					</div>
				</div>
			</div>

		</div>

		<div :class="getTotalPetNum < 4 ? 'tal' : ''" class="momo-content">
			<div class="no-show" v-if="getTotalPetNum == 0">
				<img src="@/assets/no_items.png" alt="">
				<p class="opa-6 mgt-10">No items to display</p>
			</div>
			<router-link :to="`/rentView/${item.tokenId}`" v-for="item in getShowPetArr" :key="item.prototype.toString() +item.tokenId + Math.random()">
				<PetItem   v-bind:data="{item: item}" class="market no-search rent" >
					<div style="position:absolute;width:100%;left:0px;padding:0px 10px;bottom:0px;">
						<div v-if="item.vType > 3" class=" tac mgt-10">
							<button  v-if="item.rent.state==-1" class="btn-primary btn-small mgt-10" >{{$t("Hire_02")}}</button>
							<span v-if="item.rent.state == 0" class="dib mgt-10">{{$t("Hire_06")}}</span>
							<span v-if="item.rent.state == 1" class="dib mgt-10" style="color:#ACC201">{{$t("Hire_07")}}</span>
						</div>
					</div>
				</PetItem>
			</router-link>
		</div>

		<div style="margin-top: 30px" v-if="Math.ceil(getTotalPet.length / onePageCount) > 1" >
			<Page ref="page"   :defaultPage="marketRentMyPage" :totalPage="getTotalPage" :onChange="onPageChange" v-show="getTotalPage > 1" />
		</div>
	
	</div>
</template>

<script>
import { Page, PetItem } from '@/components';
import { CommonMethod } from "@/mixin";
import { mapState } from "vuex";

export default {
	mixins: [CommonMethod],
	data() {
		return {
			onePageCount: 12,
			selectVType: [
				this.$t("MOMO_08"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
			momoState: [
				this.$t("Hire_05"),
				this.$t("Hire_06"),
				this.$t("Hire_07"),
				this.$t("Hire_08"),
			]
		};
	},
	components: { Page, PetItem },
	computed: {
		...mapState({
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myNFT_verse: (state) => state.ethState.data.myNFT_verse,
			myRentMarketFilter: (state) => state.marketState.data.myRentMarketFilter,
			marketRentMyPage: (state) => state.marketState.data.marketRentMyPage,
			historyNotice: (state) => state.marketState.data.historyNotice,
		}),
		getTotalPetNum: function () {
			let totalPet = 0;
			this.getTotalPet.map((item) => {
				totalPet += Number(item.vType) >= 4?1 : Number(item.num);
			});
			return totalPet;
		},
		getTotalPage() {
			return Math.ceil(this.getTotalPet.length / this.onePageCount);
		},

		getTotalPet() {
			let totalPet = [];
			let {state, category, vType} = this.myRentMarketFilter;
			[...this.myNFT_stake,...this.myNFT_verse].map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory = category == 0 || category == item.category;
				let isMatchVType = item.vType >= 4 && (vType == 0 || vType == item.vType);
				let rentState = -1;
				if(state == 1) rentState = 0;
				if(state == 2) rentState = 1;
				let isMatchState = item.vType >= 4 && item.rent.state ==  rentState|| state == 0;
				if (isMatchCategory && isMatchVType && isMatchState) {
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
				this.$refs.page && this.$refs.page.initPage();
			})
		},
		onSelectState(pos){
			this.$store.commit("marketState/setFilter", {
				filterName:"myRentMarketFilter",
				type: "state",
				value: pos,
			});
		}
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

#market #market-pet-fitter {
	position: absolute;
	right: 0px;
	top: 0px;
}

</style>
