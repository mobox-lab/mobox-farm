<template>
	<div >
		<div class="tal search vertical-children por mgt-20" >
			<span>{{$t("Market_33")}}({{ getTotalPetNum }})</span>&nbsp;
			<div id="market-pet-fitter">
				<div class="dropdown-group " @click="showDrop" tabindex="3">
					<div class="dropdown-group-value por">
						{{$t("Market_63")}} ▼
					</div>
					<div class="dropdown-group-list hide">
						<Dropdown :list="$parent.selectCategory" :defaultSelectPos="myRentMarketFilter.category" :onChange="onSelectTypeChange" />&nbsp;
						<Dropdown :list="selectVType" :defaultSelectPos="myRentMarketFilter.vType" :onChange="onSelectQualityChange" />&nbsp;
						<Dropdown :list="momoState" :defaultSelectPos="myRentMarketFilter.state" :onChange="onSelectState" />&nbsp;
					</div>
				</div>
			</div>
		</div>

		<div :class="getTotalPetNum < 4 ? 'tal' : ''" >
			<div class="clear mgt-20">
				<router-link :to="`/rentView/${item.tokenId}`" v-for="item in getShowPetArr" :key="item.prototype.toString() +item.tokenId + Math.random()">
					<PetItem   v-bind:data="{item: item}" class="market" >
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
			momoState: [
				this.$t("Hire_05"),
				this.$t("Hire_06"),
				this.$t("Hire_07"),
				this.$t("Hire_08"),
			]
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
			[...this.myNFT_stake].map((item) => {
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
				this.$refs.page.initPage();
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
