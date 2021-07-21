<template>
	<div id="mypet">
		<Tab class="mgt-10" :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" :notice="[]" />

		<div class="tal search vertical-children por mgt-10" v-if="tab_pos != 2">
			<span>{{ $t("Market_33") }}({{ getTotalPetNum }})</span >&nbsp;
			<img src="@/assets/icon/powerup.png" class="cur-point mgl-5 " alt="" height="40" @click="oprDialog('showPetPowerUp-dialog', 'block')" />

			<div id="my-pet-fitter" v-if="tab_pos == 0">
				<div class="dropdown-group mgl-5" @click="showDrop" tabindex="3">
					<div class="dropdown-group-value por">
						{{$t("Market_63")}} ▼
					</div>
					<div class="dropdown-group-list hide">
						<Dropdown :list="select1" :defaultSelectPos="myPetFilter.category" :onChange="onSelectTypeChange" />&nbsp;
						<Dropdown :list="select3" :defaultSelectPos="myPetFilter.vType" :onChange="onSelectQualityChange" />&nbsp;
					</div>
				</div>
			</div>
		</div>
		<!--我的momo-->
		<div :class="tab_pos == 0 ? '' : 'hide'" style="padding: 10px">
			<div :class="getShowPetArr.length < 4 ? 'tal' : ''">
				<div class="clear">
					<router-link :to="(item.location=='auction'?'/auctionView/': '/upgrade/') + item.prototype + '-' + item.tokenId" v-for="item in getShowPetArr"
						:key=" item.prototype.toString() + item.tokenId + item.num " >
						<PetItem v-bind:data="{ item: item }" />
					</router-link>
				</div>
			</div>
			<div style="margin-top: 30px" v-show="Math.ceil(getTotalPet.length / onePageCount) > 1" >
				<Page ref="page" :defaultPage="myPetPage" :totalPage="Math.ceil(getTotalPet.length / onePageCount)" :onChange="onPageChange" />
			</div>
		</div>
		<!-- momo图鉴 -->
		<div v-if="hasShowBook" :class="tab_pos == 1 ? '' : 'hide'" >
			<section id="buy-back" class="mgt-20 por">
				<div class="aveage-box" style="background:#1C222C;border-radius:10px">
					<div style="padding:10px">
						<p class="small opa-6 tac" >已产出史诗MOMO</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="(getCountMomo.v5 || '-')+'/'+getCountMomo.v5_all " />
					</div>
					<div style="padding:10px">
						<p class="small opa-6 tac" >已产出稀有MOMO</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="(getCountMomo.v4 || '-')+'/'+getCountMomo.v4_all" />
					</div>
					<div style="padding:10px">
						<p class="small opa-6 tac" >当前固定算力总加成为</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="$root.$children[0].showPowerUpList.length * 100"  />
					</div>
					<div style="padding:10px" >
						<p class="small opa-6 tac" >当前百分比算力总加成为</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="numFloor($root.$children[0].getTotalPercent.maxAdd * 100, 100)+'%'" />
					</div>
				</div>
			</section>

			<div style="overflow:hidden">
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
		<!-- 升级预览 -->
		<div v-if="tab_pos == 2" class="panel mgt-20" id="preview">
			<div >
				<div class="aveage-box" style="padding:5px;">
					<div class="tal" >{{$t("MOMO_48")}}: 
						<Dropdown class="mgl-10" :list="[this.$t('MOMO_12'),this.$t('MOMO_13'),this.$t('MOMO_14')]" :defaultSelectPos="perviewVTypeSelectPos" :onChange="perviewVTypeSelect" />
					</div>
					<div class="tal" >
						{{$t("MOMO_49")}}: 
						<div class="dib mgl-10">
							<Dropdown v-if="perviewVTypeSelectPos == 2" :list="hashSelectArr" :defaultSelectPos="hashSelectPos" :onChange="(pos)=>{hashSelectPos = pos;search()}" />
							<input v-else class="ly-input mgt-10" type="number"  style="width:120px;border-radius:50px" v-model="inputLvHashRate" v-int :placeholder="inputRange[perviewVTypeSelectPos].min+'~'+inputRange[perviewVTypeSelectPos].max" /> 
						</div>
					</div>
					<div class="tac hide-xs" style="align-item:center;height:50px;display: flex;align-items: center;justify-content: center;">
						<button class="btn-primary" @click="search">{{$t("Common_03")}}</button>
					</div>
				</div>
				<div class="mgt-10 visiable-xs"><button class="btn-primary" style="width:50%" @click="search">{{$t("Common_03")}}</button></div>
				<div class="split-hr mgt-10"></div>
			</div>
			<div>
				<div class="aveage-box preview-item small" style="background:none">
					<p class="tal">{{$t("MOMO_50")}}</p>
					<p class="tal">{{$t("MOMO_51")}}</p>
					<p class="tal">{{$t("MOMO_52")}}</p>
				</div>
				<div class="split-hr mgt-10"></div>
				<div v-for="item in getTargetLvReport" :key="item.level">
					<div class="aveage-box preview-item" >
						<p class="tal">lv. {{item.level}}</p>
						<p class="tal vertical-children">
							<img src="@/assets/icon/airdrop.png" alt="" height="25">
							<span class="mgl-10 bold" :class="getHashrateColor(item)">{{item.lvHashRate}}</span>
						</p>
						<p class="tal">
							<span v-if="item.upgradeCfg.v1 > 0" class="cl-item bg-lv1">x{{item.upgradeCfg.v1}} <img v-if="(item.level+1)%5 == 0" src="@/assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/></span>
							<span v-if="item.upgradeCfg.v2 > 0" class="cl-item bg-lv2">x{{item.upgradeCfg.v2}}<img v-if="(item.level+1)%5 == 0" src="@/assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/></span>
							<span v-if="item.upgradeCfg.v3 > 0" class="cl-item bg-lv3">x{{item.upgradeCfg.v3}}<img v-if="(item.level+1)%5 == 0" src="@/assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/></span>
							<span v-if="item.upgradeCfg.v4 > 0" class="cl-item bg-lv4">x{{item.upgradeCfg.v4}}
								<span class="cl-item-lv" v-if="item.upgradeCfg.v4Lv > 1">Lv. {{item.upgradeCfg.v4Lv}}</span>
								<img v-if="(item.level+1)%5 == 0" src="@/assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/>
							</span>
							<span v-if="item.level == 30">{{$t("BOX_15")}}</span>
						</p>
					</div>
					<div class="split-hr mgt-10"></div>
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
			perviewVTypeSelectPos: 2,
			inputLvHashRate: 120,
			perviewLvHashRate: "",
			inputRange: [{min: 10, max: 40}, {min: 50, max: 120}],
			//v6算力查看
			hashSelectArr: [180,200,220,240,260],
			hashSelectPos: 0,
			upgradeCfg: [
				BaseConfig.MomoLv4Cfg,
				BaseConfig.MomoLv5Cfg,
				BaseConfig.MomoLv6Cfg
			]
		};
	},
	components: { PetItem, Dropdown, Page, Tab, BookItem },
	created(){
		this.tab_pos = this.$route.query.tab || 0;
		if (this.tab_pos == 1) this.hasShowBook = true;

		let tab_pos = this.$route.params.tabPos;
		if(tab_pos != undefined){
			this.tab_pos = tab_pos;
		}
		this.$parent.eth_setLockList();
		this.search();

		console.log(this.$root.$children[0]);
	},
	computed: {
		...mapState({
			myNFT_wallet: (state) => state.ethState.data.myNFT_wallet,
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myPetPage: (state) => state.globalState.data.myPetPage,
			myPetFilter: (state) => state.globalState.data.myPetFilter,
			lockList: (state) => state.ethState.data.lockList,
			momoNumObj: (state) => state.globalState.data.momoNumObj,
		}),
		getGrowup() {
			let vType = this.perviewVTypeSelectPos + 4;
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
			let upgradeCfg = this.upgradeCfg[this.perviewVTypeSelectPos];
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
		getCountMomo(){
			let obj = {v4: 0,v4_all: 0,v5: 0,v5_all: 0,};
			let nftCfg = BaseConfig.NftCfg;
			let momoNumObj = this.momoNumObj;
			for (const key in BaseConfig.NftCfg) {
				if(key[0] == '4'){
					obj.v4_all +=  nftCfg[key].mmNum;
					obj.v4 += nftCfg[key].mmNum - momoNumObj[key];
				}
				if(key[0]=='5'){
					obj.v5_all +=  nftCfg[key].mmNum;
					obj.v5 += nftCfg[key].mmNum - momoNumObj[key];
				}
			}
			console.log(obj);
			return obj;
		}
	},
	methods: {
		search(){
			if(this.perviewVTypeSelectPos == 2){
				this.perviewLvHashRate = this.hashSelectArr[this.hashSelectPos];
				return;
			}
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
			if(pos == 2){
				this.search();
			}
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
			this.$nextTick(()=>{
				this.$refs.page && this.$refs.page.initPage();
			})
		},
		onTabChange(tab) {
			if (tab == 1) this.hasShowBook = true;
			this.tab_pos = tab;
		},
	},
};
</script>

<style  scoped>
#buy-back .info{
	position: absolute;
	right: -10px;
	top: -20px;
}
#buy-back .ly-input{
	width: 100%;
}
#buy-back > div{
	padding: 10px;
}
#buy-back {
	padding: 20px 30px;
	background: #13181F;
	border-radius: 20px;
	margin: 0px auto;
	margin-top: 20px;
}
.cl-item-lv{
	position: absolute;
	top: -10px;
	font-size: 12px;
	background: rgba(255,255,255,0.2);
	padding: 0px 5px;
	border-radius: 10px;
	zoom: 0.8;
}
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
	background: #13181F;
	margin-top: 10px;
	border-radius: 10px;
	padding: 8px 20px;
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
#preview{
	max-width: 1300px;
	margin: 0px auto;
	margin-top: 20px;
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
	.cl-item{
		margin: 12px 5px;
	}
}
</style>
