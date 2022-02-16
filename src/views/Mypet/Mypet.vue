<template>
	<div id="mypet" style="max-width:1460px;margin:20px auto" >
		<Tab class="mgt-10" :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" :notice="[]" />

		<div class="tal search vertical-children por mgt-10" v-if="tab_pos != 2">
			<div class="vertical-children  dib">
				<span>{{$t("Market_33")}}({{ getTotalPetNum }})</span>

				<div class="dib por powerup">
					<img src="@/assets/icon/powerup.png" class="cur-point mgl-5 " alt="" height="40" @click="oprDialog('showPetPowerUp-dialog', 'block')" />
					<span v-if="$root.$children[0].showPowerUpList.length <= 0" class="pop-notice">{{$t("MOMO_55")}}</span>
				</div>

				<div class="dib filter-show-group" >
					<div class="filter-show-item" v-if="myPetFilter.vType != 0" >
						<span class="filter-close" @click="onSelectQualityChange(0)">&times;</span>
						<span class="mgl-10">{{select3[myPetFilter.vType]}}</span>
					</div>
					<div class="filter-show-item" v-if="searchWord != ''" >
						<span class="filter-close" @click="searchWord='';goSearch()">&times;</span>
						<span class="mgl-10">{{searchWord}}</span>
					</div>
				</div>
			</div>
			
			<div id="my-pet-fitter" v-if="tab_pos == 0">

				<div class="dib por mgl-10 filter"  >
					<img src="@/assets/icon/filter_icon.png" alt="" height="40" @click="toggleFilter($refs.filter)" />
					<div class="filter-panel hide " ref="filter">
						<!-- 搜索框 -->
						<div>
							<span class="search-box  dib " style="width:100%;display:inline-flex">
								<div class="dib por" style="flex:1" >
									<div class="dib por">
										<input class="ly-input" ref="searchInput" style="padding-right:30px;width:100%;border-radius:50px" type="text" :placeholder="$t('BOX_17')" v-model="searchWord" />
										<span v-if="searchWord != '' " style="position:absolute;right:10px;height:100%;align-items: center;display: inline-flex;justify-content: center;" class="cur-point opa-6" @click="searchWord='';goSearch()">
											<svg t="1618473937077" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="1127" width="20" height="20"><path d="M601.376 512l191.52-191.52c28.096-28.096 30.976-71.168 6.4-95.744s-67.68-21.696-95.744 6.4l-191.52 191.52-191.52-191.52c-28.096-28.096-71.168-30.976-95.744-6.368s-21.696 67.68 6.4 95.744l191.52 191.52-191.52 191.52c-28.096 28.096-30.976 71.168-6.368 95.744s67.68 21.696 95.744-6.4l191.52-191.52 191.52 191.52c28.096 28.096 71.168 30.976 95.744 6.4s21.696-67.68-6.4-95.744l-191.52-191.52z" p-id="1128" fill="#838689"></path></svg>
										</span>
									</div>
									<div class="search-preview" ref="searchPreview"  style="margin-bottom:50px" v-if="getSearchArr.length > 0">
										<div class="aveage-box" v-for="item in getSearchArr" :key="item.prototype" @click="setSearchItme(item)">
											<div class="tal"><img :src="require(`@/assets/pet/${item.prototype}.png`)" alt="" height="40"></div>
											<div class="tar small opa-6" style="flex:3" :class="'c-lv'+item.vType">{{item.realName}}</div>
										</div>
									</div>
								</div>
								<img class="mgl-10 cur-point" :src="require('@/assets/icon/search.png')" alt="" @click="goSearch"  />
							</span>
						</div>
						<div class="mgt-10">
							<h5>Qualities</h5>
							<div @click="onSelectQualityChange(pos)" class="filter-select-item" :class="{'active': pos == myPetFilter.vType}" v-for="(item, pos) in select3" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-30 tac" @click="toggleFilter($refs.filter)">
							<button class="btn-primary" style="width:80%">{{$t("Common_03")}}</button>
						</div>
					</div>
				</div>

			</div>
		</div>
		<!--我的momo-->
		<div :class="{hide: tab_pos != 0}">
			<div :class="{'tal': getShowPetArr.length < 4 }"  class="momo-content">
				<router-link :to="(item.location=='auction'?'/auctionView/': '/upgrade/') + item.prototype + '-' + item.tokenId+'-'+item.location " v-for="item in getShowPetArr"
					:key=" item.prototype.toString() + item.tokenId + item.num " >
					<PetItem v-bind:data="{ item: item }" class="no-search" />
				</router-link>
			</div>
			<div class="no-show" v-if="getShowPetArr.length == 0">
				<img src="@/assets/no_items.png" alt="">
				<p class="opa-6 mgt-10">Oops, you don't have MOMO yet</p>
				<div class="mgt-20">
					<router-link to="/market?tab=0">
						<button class="btn-primary">Buy MOMO</button>
					</router-link>
					<router-link to="/openbox">
						<button class="btn-line mgl-10">Open BOX</button>
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
						<p class="small opa-6 tac" >{{$t("Fetters_13")}}</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="(getCountMomo.v5 || '-')+'/'+getCountMomo.v5_all " />
					</div>
					<div style="padding:10px">
						<p class="small opa-6 tac" >{{$t("Fetters_14")}}</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="(getCountMomo.v4 || '-')+'/'+getCountMomo.v4_all" />
					</div>
					<div style="padding:10px">
						<p class="small opa-6 tac" >{{$t("Fetters_15")}}</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="$root.$children[0].showPowerUpList.length * 300"  />
					</div>
					<div style="padding:10px" >
						<p class="small opa-6 tac" >{{$t("Fetters_16")}}</p>
						<input type="text" readonly class="ly-input mgt-10 tac" :value="numFloor($root.$children[0].getTotalPercent.maxAdd * 100, 100)+'%'" />
					</div>
				</div>
			</section>
			<section id="buy-back" class="mgt-20 por">
				<div class="info">
					<span class="cur-point por dib"   @click="getRootRefs().ruleDialog.show('MOMO_80','MOMO_81')">
						<svg class="opa-6"  width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
					</span>
				</div>
				<div class="aveage-box" style="background:#1C222C;border-radius:10px">
					<div style="padding:10px">
						<p class="small opa-6 tac" >{{$t("MOMO_76")}}</p>
						<div class="ly-input mgt-10 tac vertical-children2">{{getLeftTime(momoSetting.updateTime - nowTs)}}</div>
					</div>
					<div style="padding:10px">
						<p class="small opa-6 tac" >{{$t("MOMO_77")}}</p>
						<div class="ly-input mgt-10 tac vertical-children2">
							<span>[10, {{momoSetting.v4_max_upgrade}}]</span>
							<img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
							<span class="mgl-5">[10, <span style="color:rgb(133, 243, 74)">{{getNextHash.v4}}</span>]</span>
						</div>
					</div>
					<div style="padding:10px">
						<p class="small opa-6 tac" >{{$t("MOMO_78")}}</p>
						<div class="ly-input mgt-10 tac vertical-children2">
							<span>[50, {{momoSetting.v5_max_upgrade}}]</span>
							<img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
							<span class="mgl-5">[50, <span style="color:rgb(133, 243, 74)">{{getNextHash.v5}}</span>]</span>
						</div>
					</div>
					<div style="padding:10px" >
						<p class="small opa-6 tac" >{{$t("MOMO_79")}}</p>
						<div class="ly-input mgt-10 tac vertical-children2">
							<span>{{Number(momoSetting.v5_max_upgrade) + 30}}</span>
							<img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
							<span class="mgl-5" style="color:rgb(133, 243, 74)">{{getNextHash.v5 + 30}}</span>
						</div>
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
							<!-- <Dropdown v-if="perviewVTypeSelectPos == 2" :list="hashSelectArr" :defaultSelectPos="hashSelectPos" :onChange="(pos)=>{hashSelectPos = pos;search()}" /> -->
							<input class="ly-input mgt-10" type="text"  style="width:120px;border-radius:50px" v-model="inputLvHashRate" v-int :placeholder="inputRange[perviewVTypeSelectPos].min+'~'+inputRange[perviewVTypeSelectPos].max" /> 
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
							<span v-if="item.upgradeCfg.v5 > 0" class="cl-item bg-lv5">x{{item.upgradeCfg.v5}}
								<!-- <span class="cl-item-lv" v-if="item.upgradeCfg.v4Lv > 1">Lv. {{item.upgradeCfg.v4Lv}}</span> -->
								<!-- <img v-if="(item.level+1)%5 == 0" src="@/assets/icon/preview-icon.png" alt="" @click="oprDialog('upgrade-des-dialog','block')"/> -->
							</span>
							<span v-if="item.level == 40">{{$t("BOX_15")}}</span>
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
			searchWord: "",
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
			onePageCount: 12,
			tab: [this.$t("MOMO_31"), this.$t("MOMO_32"), this.$t("MOMO_47")],
			tab_pos: 0,
			hasShowBook: false,
			perviewVTypeSelectPos: 2,
			inputLvHashRate: 180,
			perviewLvHashRate: "",
			// inputRange: [{min: 10, max: 80}, {min: 50, max: 150}],
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

		let searcheItem = BaseConfig.NftCfg[this.myPetFilter.searchProto];
		if(searcheItem){
			this.setSearchItme({realName: this.getLangMap[searcheItem["tokenName"]], prototype: searcheItem.prototype});
		}
	},
	watch: {
		momoSetting: function(){
			this.search()
		}
	},
	computed: {
		...mapState({
			myNFT_wallet: (state) => state.ethState.data.myNFT_wallet,
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myPetPage: (state) => state.globalState.data.myPetPage,
			myPetFilter: (state) => state.globalState.data.myPetFilter,
			lockList: (state) => state.ethState.data.lockList,
			momoNumObj: (state) => state.globalState.data.momoNumObj,
			momoSetting: (state) => state.globalState.data.momoSetting,
			nowTs: (state) => state.globalState.data.nowTs,
		}),
		getLangMap(){
			let langToName = {};
			let nftConfig = BaseConfig.NftCfg;
			for (let key in nftConfig) {
				let item =nftConfig[key];
				langToName[item.tokenName] = this.$t(item.tokenName);
			}
			return langToName;
		},
		getSearchArr(){
			let retArr = [];
			let searchWord = this.searchWord;
			if(searchWord == "") return retArr;
			let nftConfig = BaseConfig.NftCfg;
			let langMap = this.getLangMap;
			for (let key in nftConfig) {
				let item =nftConfig[key];
				let realName = langMap[item.tokenName];
				if(realName.toLowerCase().indexOf(searchWord.toLowerCase()) != -1 
				|| item.cnName.toLowerCase().indexOf(searchWord.toLowerCase()) != -1
				){
					item.realName = realName;
					item.vType = parseInt(item.prototype / 1e4);
					retArr.push(item);
				}
			}
			return retArr.reverse();
		},
		inputRange(){
			return [
				{min: 10, max: this.momoSetting.v4_max_enhance}, 
				{min: 50, max: this.momoSetting.v5_max_enhance},
				{min: 180, max: this.momoSetting.v6_max_enhance},
			];
		},
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

			for (let index = 1; index <= 40; index++) {
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
				if(hashRate>= 30) quality = 6;
				if(hashRate >= 50 && hashRate < 80 && this.perviewVTypeSelectPos == 1) quality = 5;

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
				totalPet += Number(item.vType) >= 4?1 : Number(item.num);
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
			[...this.myNFT_wallet, ...this.myNFT_stake].map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory =
					this.myPetFilter.category == 0 ||
					this.myPetFilter.category == item.category;
				let isMathVType =
					this.myPetFilter.vType == 0 ||
					this.myPetFilter.vType == item.vType;
				let isMathProto = this.myPetFilter.searchProto <= 0 || item.prototype == this.myPetFilter.searchProto;
				if (isMatchCategory && isMathVType && isMathProto) {
					totalPet.push(item);
				}
			});

			totalPet.sort((a, b) =>{
				if(b.location == "wallet") {
					if(a.location == "wallet"){
						return b.lvHashrate - a.lvHashrate
					}else{
						return 1;
					}
				}
				return b.lvHashrate - a.lvHashrate
			});
			return totalPet;
		},
		getShowPetArr() {
			return this.getTotalPet.filter(item => this.myPetFilter.searchProto <= 0 || this.myPetFilter.searchProto == item.prototype).slice(
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
				
				let item = {...nftConfig[key]};
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
				
				item.vType = vType;
				item.isLock = lockTypes.indexOf(type) != -1;
				//特殊处理bian蓝帽子
				// if(item.prototype != 42036){
					if (!typeObj[type]) {
						typeObj[type] = {};
					}
					typeObj[type][item.prototype] = item;
				// }
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
			return obj;
		},
		getNextHash(){
			let retData = {v4: 0, v5: 0, v6: 0};
			let {v4_max_upgrade, v5_max_upgrade} = this.momoSetting;
			retData.v4 = Number(v4_max_upgrade);
			retData.v5 = Number(v5_max_upgrade);
			retData.v6 = Number(v5_max_upgrade) >= 180? Number(v5_max_upgrade) + 30: 180;

			retData.v4 += retData.v4 < 80? 20: 10;
			retData.v5 +=  20;
			return retData;
		}
	},
	methods: {
		setSearchItme(item){
			if(item.prototype == 0) return;
			this.searchWord = item.realName + ":"+item.prototype;
			this.goSearch();
		},
		goSearch(){
			let prototype = this.searchWord.split(":")[1];
			if(this.searchWord == ""){
				prototype = 0;
			}else{
				if(BaseConfig.NftCfg[prototype] == undefined) return;
			}
			this.$store.commit("globalState/myPetFilter", {
				type: "searchProto",
				value: prototype,
			});
			this.onPageChange(1);
		},
		search(){
			if(this.momoSetting.v4_max_enhance == 0) return;
			let value = Number(this.inputLvHashRate);
			let range = this.inputRange[this.perviewVTypeSelectPos];
			if(value < range.min || value > range.max){
				// if(range.min == 10){
				// 	this.showNotify(this.$t("MOMO_53"), "error");
				// }else{
				// 	this.showNotify(this.$t("MOMO_54"), "error");
				// }
				this.showNotify("Range: "+range.min+"~"+ range.max, "error")
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
.momo-content{
	margin: 0px -20px !important;
}

.pop-notice{
	position: absolute;
	font-size: 12px;
	width: 135px;
	border: 1px solid #3054BC;
	background: #1B222C;
	border-radius: 8px;
	padding: 5px 10px;
	margin-left: 10px;
}
.pop-notice::after{
	content: "";
	background: #1B222C;
	border-bottom: 1px solid #3054BC;
	border-left: 1px solid #3054BC;
	position: absolute;
	width: 10px;
	height: 10px;
	left: -6px;
	top: 12px;
	transform: rotate(45deg);
}
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
	padding: 20px;
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
	padding: 0px 2px;
	border-radius: 10px;
	width: 120%;
	zoom: 0.8;
	text-align: center;
}
.cl-item img{
	position: absolute;
	bottom: -10px;
	width: 18px;
	cursor: pointer;
}
.cl-item{
	width: 30px;
	height: 25px;
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
	top: -5px;
}
#mypet {
	text-align: center;
}
#preview{
	max-width: 1300px;
	margin: 0px auto;
	margin-top: 20px;
}
@media (max-width: 768px) {
	#mypet{
		margin-top: 0px !important;
	}
	.powerup img{
		height: 27px;
	}
	.momo-content{
		margin: 0px !important;
		margin-top: 10px !important;
	}
	.pop-notice{
		line-height: 15px;
	}
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
