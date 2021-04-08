<template>
	<div id="mypet">
		<Tab :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" :notice="[]" />

		<div class="tal search vertical-children por mgt-20" v-if="tab_pos != 2">
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
		<!--我的momo-->
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
		<!-- momo图鉴 -->
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
		<!-- 升级预览 -->
		<div v-if="tab_pos == 2" >
			<div class="content" >
				<div class="mgt-20 aveage-box" style="padding:5px;">
					<div class="tac" >{{$t("MOMO_48")}}: <Dropdown
						:list="[this.$t('MOMO_12'),this.$t('MOMO_13')]"
						:defaultSelectPos="perviewVTypeSelectPos"
						:onChange="perviewVTypeSelect"
					/>
					</div>
					<div class="tac" >
						{{$t("MOMO_49")}}: <input class="ly-input mgt-10" type="number"  style="width:120px;border-radius:50px" v-model="inputLvHashRate" v-int :placeholder="inputRange[perviewVTypeSelectPos].min+'~'+inputRange[perviewVTypeSelectPos].max" /> 
					</div>
					<div class="tac hide-xs" style="align-item:center;height:50px;display: flex;align-items: center;justify-content: center;">
						<button class="btn-primary" @click="search">{{$t("Common_03")}}</button>
					</div>
				</div>
				<div class="mgt-10 visiable-xs"><button class="btn-primary" style="width:50%" @click="search">{{$t("Common_03")}}</button></div>
				<div class="split-hr mgt-10"></div>
			</div>
			<div class="content" >
				<div class="aveage-box preview-item" style="background:none">
					<p class="tac">{{$t("MOMO_50")}}</p>
					<p class="tal">{{$t("MOMO_51")}}</p>
					<p class="tal">{{$t("MOMO_52")}}</p>
				</div>
				<div class="aveage-box preview-item" v-for="item in getTargetLvReport" :key="item.level">
					<p class="tac">lv. {{item.level}}</p>
					<p class="tal vertical-children">
						<img src="../assets/icon/airdrop.png" alt="" height="25">
						<span class="mgl-10 bold" :class="getHashrateColor(item)">{{item.lvHashRate}}</span>
					</p>
					<p class="tal">
						<span v-if="item.upgradeCfg.v1 > 0" class="cl-item bg-lv1">x{{item.upgradeCfg.v1}} <img v-if="(item.level+1)%5 == 0" src="../assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/></span>
						<span v-if="item.upgradeCfg.v2 > 0" class="cl-item bg-lv2">x{{item.upgradeCfg.v2}}<img v-if="(item.level+1)%5 == 0" src="../assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/></span>
						<span v-if="item.upgradeCfg.v3 > 0" class="cl-item bg-lv3">x{{item.upgradeCfg.v3}}<img v-if="(item.level+1)%5 == 0" src="../assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/></span>
						<span v-if="item.upgradeCfg.v4 > 0" class="cl-item bg-lv4">x{{item.upgradeCfg.v4}}<img v-if="(item.level+1)%5 == 0" src="../assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/></span>
						<span v-if="item.level == 30">{{$t("BOX_15")}}</span>
					</p>
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
			tab: [this.$t("MOMO_31"), this.$t("MOMO_32"), this.$t("MOMO_47")],
			tab_pos: 0,
			hasShowBook: false,
			perviewVTypeSelectPos: 0,
			inputLvHashRate: "",
			perviewLvHashRate: "",
			inputRange: [{min: 10, max: 40}, {min: 50, max: 120}]
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
		getGrowup() {
			let vType = this.perviewVTypeSelectPos == 0?4:5;
			let hashrate = Number(this.perviewLvHashRate);
			let obj = {
				staticPower: 0,
				staticPercent: 0,
			};
			switch (vType) {
				case 4:
					obj.staticPower = 2000 + parseInt((hashrate - 10) * 50);
					obj.staticPercent = 0.2;
					break;
				case 5:
					obj.staticPower = 5000 + parseInt((hashrate - 50) * 50);
					obj.staticPercent = 0.3;
					break;
				case 6:
					obj.staticPower = 18000 + parseInt((hashrate - 180) * 50);
					obj.staticPercent = 0.4;
					break;
				default:
					break;
			}
			return obj;
		},
		getTargetLvReport(){
			let report = [];
			let upgradeCfg = this.vTypeToSelectPos == 0?BaseConfig.MomoLv4Cfg:  BaseConfig.MomoLv5Cfg;
			let growup = this.getGrowup;
			let hashRate = Number(this.perviewLvHashRate);
			if(hashRate == 0) return report;

			for (let index = 1; index <= 30; index++) {
				let level = index;
				let lvHashRate = hashRate;
				//计算加成
				if(index > 1){
					lvHashRate = parseInt(hashRate + parseInt(growup.staticPower * (level - 1) /100) + parseInt(((parseInt(level / 5) * (1 + parseInt(level / 5)))) * growup.staticPower * growup.staticPercent / 200) );
				}
				let quality;
				if(hashRate < 20) quality = 4;
				if(hashRate >= 80) quality = 6;
				if(hashRate>= 20 && hashRate < 30) quality = 5;
				if(hashRate>= 30 && hashRate <= 40) quality = 6;
				if(hashRate >= 50 && hashRate < 80) quality = 5;

				report.push({
					level,
					quality,
					lvHashRate,
					upgradeCfg: upgradeCfg[level],
				})
			}
			return report;
		},
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
		search(){
			let value = Number(this.inputLvHashRate);
			let range = this.inputRange[this.perviewVTypeSelectPos];
			if(value < range.min || value > range.max){
				if(range.min == 10){
					this.showNotify(this.$t("MOMO_53"), "error");
				}else{
					this.showNotify(this.$t("MOMO_54"), "error");
				}
				return;
			}
			this.perviewLvHashRate = this.inputLvHashRate;
		},
		//预览品质选择
		perviewVTypeSelect(pos){
			this.inputLvHashRate = "";
			this.perviewLvHashRate = "";
			this.perviewVTypeSelectPos = pos;
		},
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
.cl-item img{
	position: absolute;
	bottom: -10px;
	width: 18px;
	cursor: pointer;
}
.cl-item{
	width: 30px;
	height: 30px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	color: #fff;
	margin-right: 5px;
	position: relative;
	font-size: 14px;
}
.preview-item{
	background: #1D2B50;
	margin-top: 10px;
	border-radius: 10px;
	padding: 10px 20px;
}
.content{
	padding: 0px 30px;
	width: 80%;
	max-width: 1400px;
	display: inline-block;
}
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
	.content{
		width: 100%;
		padding: 0px 10px!important;
	}
	.content .aveage-box>p:last-child{
		flex:3 !important;
	}
	.content .aveage-box>p:nth-child(2){
		flex:2 !important;
		text-align: center!important;
	}
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
