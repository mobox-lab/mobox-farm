<template>
	<div id="mypet" style="max-width:1460px;margin:40px auto 20px auto" >
		<Tab class="mgt-10" :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" :notice="[]" />

		<div class="tal search vertical-children por mgt-10" v-if="tab_pos != 2">
			<div class="vertical-children  dib">
				<span>{{$t("Market_33")}}({{ getTotalPetNum }})</span>

				<div class="dib por powerup">
					<img src="@/assets/icon/powerup.png" class="cur-point mgl-5 " alt="" height="40" @click="oprDialog('showPetPowerUp-dialog', 'block')" />
					<span v-if="$root.$children[0].showPowerUpList.length <= 0" class="pop-notice">{{$t("MOMO_55")}}</span>
				</div>

				<div class="dib filter-show-group" >
					<div class="filter-show-item" v-if="myPetFilter.location != 0">
						<span class="filter-close" @click="setFilter('location',0)">&times;</span>
						<span class="mgl-10">{{locationSelect[myPetFilter.location]}}</span>
					</div>
					<div class="filter-show-item" v-if="myPetFilter.category != 0" >
						<span class="filter-close" @click="setFilter('category',0)">&times;</span>
						<span class="mgl-10">{{categorySelect[myPetFilter.category]}}</span>
					</div>
					<div class="filter-show-item" v-if="myPetFilter.vType != 0" >
						<span class="filter-close" @click="setFilter('vType',0)">&times;</span>
						<span class="mgl-10">{{select3[myPetFilter.vType]}}</span>
					</div>
					<div class="filter-show-item" v-if="searchWord != ''" >
						<span class="filter-close" @click="searchWord='';goSearch()">&times;</span>
						<span class="mgl-10">{{searchWord}}</span>
					</div>
				</div>
			</div>

			<div id="my-pet-fitter" v-if="tab_pos == 0">
				<!-- 批量升级列表 -->
				<div class="cur-point dib por mgl-10" @click="showBatchEnhancement" v-if="isShowBatchEnhancement">
					<span v-if="batchEnhancement.length" class="shop-car-num">{{batchEnhancement.length}}</span>
					<img src="@/assets/icon/batch-list-icon.png" alt="" height="40">
				</div>
				<!-- 显示隐藏按钮 -->
				<div class="cur-point dib por mgl-10" @click="toggleShowBatchEnhancement">
					<img v-if="isShowBatchEnhancement" src="@/assets/icon/batch-show-icon.png" alt="" height="40">
					<img v-else src="@/assets/icon/batch-icon.png" alt="" height="40">
				</div>
				<div class="dib por mgl-10 por cur-point"  @click="oprDialog('transfer-dialog', 'block')" >
					<img src="@/assets/icon/momoverse_icon.png" alt="" height="40" />
				</div>

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
							<h5>{{$t("MOMO_93")}}</h5>
							<div @click="setFilter('location',pos)" class="filter-select-item" :class="{'active': pos == myPetFilter.location}" v-for="(item, pos) in locationSelect" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-10">
							<h5>Types</h5>
							<div @click="setFilter('category',pos)" class="filter-select-item" :class="{'active': pos == myPetFilter.category}" v-for="(item, pos) in categorySelect" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-10">
							<h5>Qualities</h5>
							<div @click="setFilter('vType',pos)" class="filter-select-item" :class="{'active': pos == myPetFilter.vType}" v-for="(item, pos) in select3" :key="item">
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
					<PetItem v-bind:data="{ item: item }" class="no-search" :isShowHashrateIcon="true">
						<div class="batch" @click="toggleBatch($event, item)" v-if="item.vType >= 4 && isShowBatchEnhancement">
							<img v-if="batchEnhancementIds.indexOf(item.tokenId) == -1" src="@/assets/icon/batch-icon.png" />
							<img v-else src="@/assets/icon/batch-check-icon.png" />
						</div>
					</PetItem>
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
						<div class="ly-input mgt-10">
							<span class="mark">
								{{currentTotalAddition}}%
								<img v-if="getCurrentBonus != getActualBonus" class="tip-icon" src="@/assets/icon/warning-icon.png" @click="oprDialog('standard-hashrate', 'block')" />
							</span>
						</div>
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
							<span>[{{hashrateInfo.v4MinHashrate}}, {{hashrateInfo.v4StandardHashrate}}, {{hashrateInfo.v4MaxHashrate}}]</span>
							<img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
							<span class="mgl-5">[<span :style="{color: hashrateInfo.v4MinHashrate != nextStepHashrateInfo.v4.min ? 'rgb(133, 243, 74)' : ''}">{{nextStepHashrateInfo.v4.min}}</span>, <span class="color-yellow">{{nextStepHashrateInfo.v4.standard}}</span>, <span style="color:rgb(133, 243, 74)">{{nextStepHashrateInfo.v4.max}}</span>]</span>
						</div>
					</div>
					<div style="padding:10px">
						<p class="small opa-6 tac" >{{$t("MOMO_78")}}</p>
						<div class="ly-input mgt-10 tac vertical-children2">
							<span>[{{hashrateInfo.v5MinHashrate}}, {{hashrateInfo.v5StandardHashrate}}, {{hashrateInfo.v5MaxHashrate}}]</span>
							<img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
							<span class="mgl-5">[<span :style="{color: hashrateInfo.v5MinHashrate != nextStepHashrateInfo.v5.min ? 'rgb(133, 243, 74)' : ''}">{{nextStepHashrateInfo.v5.min}}</span>, <span class="color-yellow">{{nextStepHashrateInfo.v5.standard}}</span>, <span style="color:rgb(133, 243, 74)">{{nextStepHashrateInfo.v5.max}}</span>]</span>
						</div>
					</div>
					<div style="padding:10px" >
						<p class="small opa-6 tac" >{{$t("MOMO_79")}}</p>
						<div class="ly-input mgt-10 tac vertical-children2">
							[{{hashrateInfo.v6StandardHashrate}}, <span>{{Number(momoSetting.v5_max_upgrade) + 30}}</span>]
							<img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
							[<span class="color-yellow">{{nextStepHashrateInfo.v6.standard}}</span>, <span class="mgl-5" style="color:rgb(133, 243, 74)">{{nextStepHashrateInfo.v6.max}}</span>]
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
							<!-- mec -->
							<span class="mec" v-if="item.upgradeCfg.mecNum">
								<img src="@/assets/icon/mec.png" alt="">
								<span>{{item.upgradeCfg.mecNum}}</span>
							</span>
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
import powerAddConfig from "@/config/PowerAddConfig";

const types = ['v4', 'v5', 'v6'];

export default {
	mixins: [CommonMethod],
	data() {
		return {
			searchWord: "",
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
			batchEnhancementIds: (state) => state.globalState.batchEnhancement.map(item => item.tokenId),
			batchEnhancement: (state) => state.globalState.batchEnhancement,
			isShowBatchEnhancement: (state) => state.globalState.isShowBatchEnhancement,
			hashrateInfo: (state) => state.globalState.hashrateInfo,
			v4MinHashrate: (state) => state.globalState.v4MinHashrate,
			v5MinHashrate: (state) => state.globalState.v5MinHashrate,
			myNFT_wallet: (state) => state.ethState.data.myNFT_wallet,
			myNFT_verse: (state) => state.ethState.data.myNFT_verse,
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myPetPage: (state) => state.globalState.data.myPetPage,
			myPetFilter: (state) => state.globalState.data.myPetFilter,
			lockList: (state) => state.ethState.data.lockList,
			momoNumObj: (state) => state.globalState.data.momoNumObj,
			momoSetting: (state) => state.globalState.data.momoSetting,
			nowTs: (state) => state.globalState.data.nowTs,
		}),
		currentTotalAddition() {
			return this.numFloor(this.$root.$children[0].currentTotalAddition * 100, 100);
		},
		getNftVInfo() {
			const retObj = {
				v4: [],
				v5: [],
				v6: [],
			};
			this.myNFT_stake.map((item) => {
				let vType = parseInt(item.prototype / 1e4);
				const key = "v" + vType;

				if (retObj[key]) {
					retObj[key].push(item);
				}
			});
			return retObj;
		},
		// 获取当前应有算力加成
		getCurrentBonus() {
			let bonus = 0;

			for (let i = 0; i < types.length; i++) {
				const type = types[i];
				const config = powerAddConfig[type];
				const momoCount = this.getNftVInfo[type].length;
				let count = 0;

				for (let eq = 0; eq < config.length; eq++) {
					const item = config[eq];

					if (momoCount >= item.num) {
						count = item.p;
					} else {
						break;
					}
				}

				bonus += count;
			}

			return this.numFloor(bonus * 100, 100);
		},
		// 获取实际算力加成
		getActualBonus() {
			let total = 0;

			for (let item in types) {
				const type = types[item];
				const config = powerAddConfig[type];
				// 获取当前类型达标数量
				const count = this.getStandardCount(type);

				// 获取达标数量符合的下标
				let index;

				// 超出最大值
				if (count >= config[config.length - 1].num) {
					index = config.length - 1;
				} else {
					index = config.findIndex(item => item.num > count) - 1;
				}

				if (index >= 0) {
					total += config[index].p;
				}
			}

			return this.numFloor(total * 100, 100);
		},
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
			
			[...this.myNFT_wallet,...this.myNFT_verse,...this.myNFT_stake].map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory =
					this.myPetFilter.category == 0 ||
					this.myPetFilter.category == item.category;
				let isMathVType =
					this.myPetFilter.vType == 0 ||
					this.myPetFilter.vType == item.vType;
				let isMatchLocation = 
					this.myPetFilter.location == 0 ||
					this.locationName[this.myPetFilter.location] == item.location;
				let isMathProto = this.myPetFilter.searchProto <= 0 || item.prototype == this.myPetFilter.searchProto;
				if (isMatchCategory && isMathVType && isMathProto && isMatchLocation) {
					totalPet.push(item);
				}
			});

			// totalPet.sort((a, b) =>{
			// 	if(a.location == b.location) {
			// 		return b.lvHashrate - a.lvHashrate
			// 	}else{
			// 		return 0;
			// 	}
			// });
			totalPet.sort((a, b) =>{
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
		},
		nextStepHashrateInfo() {
				const step = this.hashrateInfo.currentStep + 1;

				return {
					v4: {
							min: Math.floor((step - 8) / 2) * 10 + 10,
							standard: Math.floor(((Math.floor((step - 8) / 2) * 10 + 10) +((step - 2) * 10 + 80)) / 2),
							max: ((step - 2) * 10) + 80,
					},
					v5: {
							min: Math.floor((step - 8) / 2) * 20 + 50,
							standard: Math.floor(((Math.floor((step - 8) / 2) * 20 + 50) +((step - 1) * 20 + 150)) / 2),
							max: ((step - 1) * 20) + 150,
					},
					v6: {
							min: 180,
							standard: Math.floor(((step - 1) * 10) + 90),
							max: ((step - 1) * 20) + 180,
					},
				};
		}
	},
	methods: {
		// 切换显示批量进化
		toggleShowBatchEnhancement() {
			this.$store.commit('globalState/toggleShowBatchEnhancement');
		},
		// 显示批量进化弹窗
		showBatchEnhancement() {
			this.oprDialog('batch-enhancement', 'block');
		},
		// 批量进化切换
		toggleBatch(event, item) {
			event.preventDefault();

			if (this.batchEnhancementIds.indexOf(item.tokenId) == -1) {
				const first = this.batchEnhancement[0];

				// 数量限制
				if (this.batchEnhancement.length >= 20) {
					this.showNotify(this.$t('MOMO_105'), "error");
					return;
				}

				// 类型限制
				if (first && item.location != first.location) {
					this.showNotify(this.$t('MOMO_106'), "error");
					return;
				}

				this.$store.commit('globalState/addBatchEnhancement', item);
			} else {
				this.$store.commit('globalState/removeBatchEnhancement', item);
			}
		},
		// 根据类型获取算力达标数量
		getStandardCount(type) {
			const standardHashrate = this.hashrateInfo[`${type}StandardHashrate`];

			return this.getNftVInfo[type].reduce((data, item) => {
				const hashrate = item.level > 1 ? item.hashrate : item.lvHashrate;

				if (hashrate >= standardHashrate) {
					return data + 1;
				}

				return data;
			}, 0);
		},
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
		setFilter(type, value){
			this.$store.commit("globalState/myPetFilter", {
				type,
				value,
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

<style lang="less" scoped>
.momo-content{
	margin: 0px -20px !important;
}

.mark {
	line-height: 40px;
	position: relative;
	vertical-align: middle;
	cursor: pointer;

	.tip-icon {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(100%, -50%);
		width: 22px;
	}
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

.tal > span {
	min-width: 30px;
	height: 30px;
	display: inline-flex;
	align-content: center;
	justify-content: center;
	vertical-align: middle;
}

.mec {
	background: #2a3b67;
	border-radius: 100%;
	position: relative;

	span {
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		bottom: -8px;
		text-align: center;
		font-weight: bold;
		font-size: 12px;
		text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
	}

	img {
		display: block;
		width: auto;
		height: 100%;
	}
}

// 批量按钮
.batch {
	position: absolute;
	right: 10px;
	bottom: 0;
	width: 40px;

	img {
		width: 100%;
		height: auto;
	}
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
