<template>
	<div id="mypet">
		<Tab :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" :notice="[]" />

		<div class="tal search vertical-children por mgt-20">
			<span>{{ $t("MOMO_01") }}: {{ getTotalPetNum }}</span >&nbsp;
			<span class="search-box mgl-20 hide" style="display: none !important" >
				<input class="ly-input" type="text/" />&nbsp;
				<img src="../assets/icon/search.png" alt="" />
			</span>

			<div id="my-pet-fitter">
				<img src="../assets/icon/powerup.png" class="cur-point mgt-10" alt="" height="40" @click="oprDialog('showPetPowerUp-dialog', 'block')" />&nbsp;
				<Dropdown
					:list="select1"
					:defaultSelectPos="myPetFilter.category"
					:onChange="onSelectTypeChange"
				/>&nbsp;
				<Dropdown
					:list="select3"
					:defaultSelectPos="myPetFilter.vType"
					:onChange="onSelectQualityChange"
				/>&nbsp;
			</div>
		</div>

		<div :class="tab_pos == 0 ? '' : 'hide'" style="padding: 10px">
			<div :class="getShowPetArr.length < 6 ? 'tal' : ''">
				<div class="clear mgt-20">
					<router-link :to="(item.location=='auction'?'/auctionView/': '/upgrade/') + item.prototype + '-' + item.tokenId" v-for="item in getShowPetArr"
						:key=" item.prototype.toString() + item.tokenId + item.num " >
						<PetItem v-bind:data="{ item: item }" />
					</router-link>
				</div>
			</div>
			<div style="margin-top: 30px" v-if="Math.ceil(getTotalPet.length / onePageCount) > 1" >
				<Page :defaultPage="myPetPage" :totalPage="Math.ceil(getTotalPet.length / onePageCount)" :onChange="onPageChange" :key="hackReload" />
			</div>
		</div>
		<div v-if="hasShowBook" :class="tab_pos == 1 ? '' : 'hide'" style="overflow:hidden">
			<div class="mgt-10 row">
				<div class="col-md-3 col-sm-6 col-xs-12" v-for="(item, key) in getBookArr.comp" :key="key" >
					<BookItem :data="item" />
				</div>
			</div>
			<div class="row">
				<div class="col-md-1 col-sm-2 col-xs-4" v-for="(item, key) in getBookArr.advanced" :key="key" >
					<BookItem :data="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { PetItem, Dropdown, Page, Tab, BookItem } from "@/components";
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { BaseConfig } from "@/config";

export default {
	mixins: [CommonMethod],
	data() {
		return {
			select1: [
				this.$t("MOMO_02"),
				this.$t("MOMO_03"),
				this.$t("MOMO_04"),
				this.$t("MOMO_05"),
				this.$t("MOMO_06"),
				this.$t("MOMO_07"),
			],
			select2: ["ETH", "TRX", "BNB"],
			select3: [
				this.$t("MOMO_08"),
				this.$t("MOMO_09"),
				this.$t("MOMO_10"),
				this.$t("MOMO_11"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
			onePageCount: 15,
			tab: [this.$t("MOMO_31"), this.$t("MOMO_32")],
			tab_pos: 0,
			hasShowBook: false,
		};
	},
	components: { PetItem, Dropdown, Page, Tab, BookItem },
	created(){
		this.$parent.eth_setLockList();
	},
	computed: {
		...mapState({
			myNFT_wallet: (state) => state.ethState.data.myNFT_wallet,
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myPetPage: (state) => state.globalState.data.myPetPage,
			myPetFilter: (state) => state.globalState.data.myPetFilter,
			lockList: (state) => state.ethState.data.lockList,
		}),
		getTotalPetNum: function () {
			let totalPet = 0;
			this.getTotalPet.map((item) => {
				totalPet += item.num;
			});
			return totalPet;
		},
		getTotalHashrate: function () {
			let hashrate = 0;
			this.getTotalPet.map((item) => {
				hashrate += item.lvHashrate * item.num;
			});
			return hashrate;
		},
		getTotalPet() {
			let totalPet = [];
			[...this.myNFT_stake, ...this.myNFT_wallet].map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory =
					this.myPetFilter.category == 0 ||
					this.myPetFilter.category == item.category;
				let isMathVType =
					this.myPetFilter.vType == 0 ||
					this.myPetFilter.vType == item.vType;
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
				this.onePageCount * (this.myPetPage - 1),
				this.onePageCount * this.myPetPage
			);
		},
		getMyPetObj() {
			let obj = {};
			[...this.myNFT_stake, ...this.myNFT_wallet].map((item) => {
				//初始化721对象上的数量
				if(item.vType >= 4) item.num = 1;
				if (obj[item.prototype]) {
					obj[item.prototype].num++;
				} else {
					obj[item.prototype] = item;
				}
			});
			return obj;
		},
		getBookArr() {
			let showList = { comp: [], advanced: [] };
			let typeObj = {};
			let getMyPetObj = this.getMyPetObj;
			//锁定的图鉴type
			let lockTypes = [];
			let nftConfig = BaseConfig.NftCfg;
			this.lockList.map(item=>lockTypes.push(item.prototype));
			for (let key in nftConfig) {
				let item = nftConfig[key];
				let num = 0;
				if (getMyPetObj[item.prototype]) {
					num = getMyPetObj[item.prototype].num;
				}
				item.num = num;
				let vType = parseInt(item.prototype / 10000);
				let type = item.prototype;
				if (vType <= 4) {
					type = item.prototype % (vType * 10000);
				}
				if (!typeObj[type]) {
					typeObj[type] = {};
				}
				item.vType = vType;
				item.isLock = lockTypes.indexOf(type) != -1;
				typeObj[type][item.prototype] = item;
			}

			Object.values(typeObj).map((item) => {
				let itemArr = Object.values(item);
				if (itemArr.length == 1) {
					showList.advanced.push(Object.values(item));
				} else {
					showList.comp.push(Object.values(item));
				}
			});

			showList.comp.sort((a,b)=>b[0].prototype - a[0].prototype);
			return showList;
		},
	},
	methods: {
		
		onSelectCoinChange(pos) {
			console.log(pos);
		},
		onSelectQualityChange(pos) {
			this.$store.commit("globalState/myPetFilter", {
				type: "vType",
				value: pos,
			});
			this.onPageChange(1);
		},
		onSelectTypeChange(pos) {
			this.$store.commit("globalState/myPetFilter", {
				type: "category",
				value: pos,
			});
			this.onPageChange(1);
		},
		onPageChange(page) {
			this.$store.commit("globalState/setMyPetPage", page);
			this.hackReloadMethod();
		},
		onTabChange(tab) {
			if (tab == 1) this.hasShowBook = true;
			this.tab_pos = tab;
		},
	},
};
</script>

<style  scoped>
#mypet #my-pet-fitter {
	position: absolute;
	right: 0px;
	top: 0px;
}
#mypet {
	text-align: center;
	padding: 0px 20px;
}
@media (max-width: 768px) {
	.book-item {
		padding: 2px;
	}
	.pet_item {
		width:48%;
		zoom: 0.5;
		margin: 1%!important;
	}
	#my-pet-fitter{
		text-align: center;
		zoom: 0.8
	}
}
</style>
