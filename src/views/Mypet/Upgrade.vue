<template>
	<div id="upgrade">
		<span @click="$router.back(-1)" class="cur-point text-big">
			<span class="dib" style="transform: rotate(90deg)">▼</span>&nbsp;
			{{ $t("MOMO_19") }}
		</span>
		<div class="tac row ">
			<div class="col-md-6 mgt-10">
				<div class="panel">
					<div id="upgrade-lv" class="vertical-children">
						<img :src=" require(`@/assets/icon/${ category_img[this.getNowPetItem.category] }.png`)" alt="" width="20" height="20" />&nbsp;
						<span>LV {{ this.getNowPetItem.level }}</span>
					</div>
					<img v-if="isLock" class="upgrade-lock" src="@/assets/icon/lock.png" alt="">
					<div id="upgrade-power" class="vertical-children">
						<div class="gka-harmer por  dib" style="top: -8px;right:-10px" :class="this.getNowPetItem.location == 'wallet'?'': 'animation-harmer'">
							<img src="@/assets/anime/sleep.gif" class="sleep-harmer" v-if="this.getNowPetItem.location == 'wallet'" alt="" />
						</div>
						<span  :class="getHashrateColor( this.getNowPetItem)">
							{{ this.getNowPetItem.lvHashrate }}
						</span>
					</div>
					<div id="upgrade-power-lv1" class="vertical-children" v-if="this.getNowPetItem.level > 1">
						Lv. 1
						<img src="@/assets/icon/airdrop.png" alt="" height="15" />&nbsp;
						<span :class="getHashrateColor( this.getNowPetItem)">
							{{ this.getNowPetItem.hashrate }}
						</span>
					</div>

					<div class="por" id="show-pet-view" style="margin-top: 100px" >
						<PetView v-bind:prototype="this.getNowPetItem.prototype" />
						<div class=" vertical-children chanzi" v-if="this.getNowPetItem.location == 'verse'">
							<img src="@/assets/icon/chanzi.gif" alt="" width="50" style="margin-bottom:-5px">
							<span  class="bold" style="font-size: 25px;color: #fff">{{getSCL}}</span>
						</div>
						<div class="vertical-children" id="upgrade-name">
							<img :src=" require(`@/assets/icon/${this.getNowPetItem.chain}.png`) " height="25" alt="" />&nbsp;
							<span>{{ hasSetName ? shortStr(this.getNowPetItem.tokenName) : $t(this.getNowPetItem.tokenName) }}</span>
							<img v-if="this.hasEditNameSkill && getNowPetItem.location=='stake'" src="@/assets/icon/edit.png" class="edit-btn" alt="" @click="oprDialog('setName-dialog', 'block')" />
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6 tal mgt-10">
				<div class="panel vertical-children">
					<!-- momo升级 -->
					<div class="mgb-20" v-if="getNowPetItem.tokenId != 0 && getNowPetItem.location  != 'wallet'">
						<h3 >
							{{ $t("MOMO_22") }}
							<img class="mgl-5 cur-point" @click="getRootRefs().ruleDialog.show('MOMO_35','MOMO_36')" src="@/assets/icon/help.png" alt="" height="20"/>
						</h3>
						<div class="tac" style="margin-bottom:20px">
							<div v-if="getUpgradeInfo.length == 0" class="mgt-20">
								{{ $t("BOX_15") }}
							</div>
							<div v-if="getUpgradeInfo.length != 0">
								<div style="margin-top: 30px">
									<span @click="showSelectNftDialog(item, handPos)" v-for="(item, handPos) in this.getUpgradeInfo" :key="JSON.stringify(item)" class="dib mgt-10">
										<PetAddItem
											v-bind:vType="item.type"
											v-bind:needNum="item.needNum"
											v-bind:category="item.category"
											v-bind:needLv="item.needLv"
											v-bind:needPrototype=" item.needPrototype "
											v-bind:selectProtoTypes=" selectProtoTypes[item.type] "
										/>
									</span>
									<span class="mec-item dib mgt-10" v-if="isNeedMec">
										<div class="icon">
											<img src="@/assets/coin/CRYSTAL.png" />
										</div>
										<p class="count">{{upgradeConfig.mecNum}}</p>
									</span>
								</div>
								<div class="vertical-children mgt-20" style="font-size: 18px" >
									<img src="@/assets/icon/airdrop.png" height="25" alt="" />&nbsp;
									<span>{{ this.getNowPetItem.lvHashrate }}</span>
									<img src="@/assets/icon/upgradejt.png" alt="" class="mgl-10" />
									<img src="@/assets/icon/airdrop.png" alt="" class="mgl-10" height="25" />&nbsp;
									<span style="color: #85f34a">{{ this.getNowPetItemNextLvHashRate }}</span>
								</div>
								<div>
									<div class="mgt-20" >
										<!-- <button @click="upgrade" :class="lockUpgradeTime > 0?'disable-btn':''" class="btn-primary vertical-children por" style="min-width: 160px; margin: 5px" >
											<Loading v-if="lockUpgradeTime > 0"  class="btn-loading" />
											<svg  viewBox="0 0 1024 1024" width="15" height="15" style=" transform: rotate(270deg); margin-top: -2px; " >
												<path fill="#ffffff" d="M583.586909 555.473455a62.091636 62.091636 0 0 0 0-86.94691L151.970909 30.138182a60.113455 60.113455 0 0 0-85.783273 0 62.045091 62.045091 0 0 0 0 86.946909L454.981818 512 66.210909 906.938182a62.045091 62.045091 0 0 0 0 86.923636 60.043636 60.043636 0 0 0 85.783273 0l431.592727-438.388363zM440.459636 117.061818L829.160727 512 440.413091 906.938182a62.045091 62.045091 0 0 0 0 86.923636 60.090182 60.090182 0 0 0 85.806545 0l431.569455-438.388363a62.091636 62.091636 0 0 0 0-86.94691L526.196364 30.138182a60.136727 60.136727 0 0 0-85.806546 0 62.045091 62.045091 0 0 0 0.023273 86.923636z"></path>
											</svg >&nbsp;
											{{ $t("MOMO_22") }}
										</button> -->
										<div :class="{'btn-group': needApproveMec}">
											<div v-if="needApproveMec">
												<StatuButton data-step="1" style="width:150px" :isLoading="lockBtn.approveLock > 0" :onClick="approveMEC">{{$t("Air-drop_16")}} MEC</StatuButton>
											</div>
											<div class="mgt-10">
												<StatuButton :onClick="upgrade" data-step="2" style="min-width:150px" :isDisable="needApproveMec || lockUpgradeTime > 0" :isLoading="lockBtn.enhanceLock > 0">
													<Loading v-if="lockUpgradeTime > 0"  class="btn-loading" />
													<svg  viewBox="0 0 1024 1024" width="15" height="15" style=" transform: rotate(270deg); margin-top: -2px; " >
														<path fill="#ffffff" d="M583.586909 555.473455a62.091636 62.091636 0 0 0 0-86.94691L151.970909 30.138182a60.113455 60.113455 0 0 0-85.783273 0 62.045091 62.045091 0 0 0 0 86.946909L454.981818 512 66.210909 906.938182a62.045091 62.045091 0 0 0 0 86.923636 60.043636 60.043636 0 0 0 85.783273 0l431.592727-438.388363zM440.459636 117.061818L829.160727 512 440.413091 906.938182a62.045091 62.045091 0 0 0 0 86.923636 60.090182 60.090182 0 0 0 85.806545 0l431.569455-438.388363a62.091636 62.091636 0 0 0 0-86.94691L526.196364 30.138182a60.136727 60.136727 0 0 0-85.806546 0 62.045091 62.045091 0 0 0 0.023273 86.923636z"></path>
													</svg >&nbsp;
													{{ $t("MOMO_22") }}
												</StatuButton>
											</div>
										</div>
									</div>
							
								</div>
							</div>
						</div>
					</div>

					<MomoInfo :data="this.getNowPetItem" :isMarket="false" />

				</div>
			</div>
		</div>
		<Dialog id="setName-dialog" :top="200" :width="400">
			<div class="mgt-20">
				<div class="ly-input-content">
					<p class="small tal">{{ $t("BOX_16") }} ({{nowLen}}/32)</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  src="@/assets/icon/bnb.png" alt="" />
						</div>
						<input v-model="inputName" class="ly-input" type="text" style=" background: #0f172a; text-align: center; width: 100%; border-radius: 5px; padding-left:40px" :placeholder="$t('BOX_17')" />
					</div>
				</div>
			</div>
			<div v-html="$t('MOMO_29')" class="small opa-6 tal mgt-10"></div>
			<button :class="`btn-primary mgt-20 ${ !canSubmitEditName ? 'disable-btn' : '' }`" style="width: 200px" @click="confirmSetName" >
				{{ $t("Common_03") }}
			</button>
		</Dialog>

		<Dialog id="selectNft-dialog" :top="30" :width="540">
			<h2 class="mgt-10">{{ $t("BOX_18") }}</h2>
			<div class="mgt-20 items">
				<span @click="showSelectNftDialog(item, handPos, true)" v-for="(item, handPos) in this.getUpgradeInfo" :key="JSON.stringify(item)"  >
					<PetAddItem
						class="need-notice"
						v-bind:vType="item.type"
						v-bind:needNum="item.needNum"
						v-bind:category="item.category"
						v-bind:needLv="item.needLv"
						v-bind:needPrototype=" item.needPrototype "
						v-bind:selectProtoTypes=" selectProtoTypes[item.type] "
						v-bind:active="handPos == selectAddPetPos"
					/>
				</span>
			</div>
			<p class="mgt-20 small tal por ">
				<span class="type_change vertical-children" v-if="needHandleData.type != 'v5' ">
					<Tab :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" v-if="hackReload" :notice="[]" />
					<div class="dib sort-btn" @click="bookSortTurn = !bookSortTurn" :class="tab_pos == 0?'opa-6 gray':''">
						<svg viewBox="0 0 1024 1024" version="1.1" width="20" height="20">
							<path d="M600.436364 60.509091v907.636364c0 27.927273 18.618182 46.545455 46.545454 46.545454s46.545455-18.618182 46.545455-46.545454V158.254545l116.363636 93.09091c18.618182 18.618182 51.2 13.963636 65.163636-4.654546 18.618182-18.618182 13.963636-51.2-4.654545-65.163636L679.563636 23.272727c-32.581818-27.927273-79.127273-4.654545-79.127272 37.236364zM377.018182 9.309091c-27.927273 0-46.545455 18.618182-46.545455 46.545454v809.89091l-116.363636-93.09091c-18.618182-18.618182-51.2-13.963636-65.163636 4.654546-18.618182 18.618182-13.963636 51.2 4.654545 65.163636l190.836364 158.254546c32.581818 23.272727 74.472727 4.654545 74.472727-37.236364V55.854545c4.654545-23.272727-18.618182-46.545455-41.890909-46.545454z" fill="#838689">
							</path>
						</svg>
					</div>
				</span>

				<span class="dib" style="height:22px;">
					{{ $t("BOX_19") }}
				</span>
			</p>
			<div :class="tab_pos==0?'':'hide'" class="dialog-content tal mgt-10" style="height: 400px">
				<PetItemSmall
					v-for="item in showCanSelectArr"
					:key="item.prototype.toString() + item.tokenId + item.num"
					v-bind:data="item"
					v-bind:selectProtoTypes="selectProtoTypes"
					:onSelectChange="onSelectChange"
				/>
			</div>
			<div :class="tab_pos==1?'':'hide'" class="dialog-content tal mgt-10" style="height: 400px">
				<BookSelectItem
					v-for="(item, key) in getBookArr.comp"
					:data = "item"
					v-bind:selectProtoTypes="selectProtoTypes"
					:onSelectChange="onSelectChange"
					:key="key"
				/>
			</div>
			<p class="mgt-10 small tal" style="margin-bottom: 30px"></p>
		</Dialog>
	</div>
</template>
<script>
import { PetView, PetAddItem, Dialog, PetItemSmall, Tab, BookSelectItem, MomoInfo, Loading, StatuButton } from '@/components';
import { mapState } from "vuex";
import { Wallet, EventBus } from "@/utils";
import { BaseConfig, WalletConfig, EventConfig, ConstantConfig } from "@/config";
import { CommonMethod } from "@/mixin";

let upgradeLockTimer = null;
export default {
	mixins: [CommonMethod],
	components: { PetView, PetAddItem, Dialog, PetItemSmall, Tab, BookSelectItem, MomoInfo, Loading, StatuButton },
	data() {
		return {
			isMECApproved: -1,
			inputName: "",
			nowLen: 0,
			selectProtoTypes: {
				v1: [],
				v2: [],
				v3: [],
				v4: [],
				v5: [],
				v6: [],
				v4_tokenId: [],
				v5_tokenId: [],
				v6_tokenId: [],
			},
			needHandleData: {
				category: 0,
				needNum: 2,
				needPrototype: false,
				type: "v1",
				needLv: 1,
			},
			// showCanSelectArr: [],
			selectAddPetPos: 0,
			tab: [this.$t("MOMO_31"), this.$t("MOMO_32")],
			tab_pos: 0,
			hasLoadBook: false,
			bookSortTurn: true,//正序排列
			lockUpgradeTime: 0,
			hackReload: true,
			hasClick: false,
		};
	},
	watch: {
		inputName(newInput, oldInput){
			let len = Wallet.ETH.getStrLen(newInput);
			this.nowLen = len;
			if(len > 32){
				this.inputName = oldInput;
				this.nowLen = 32;
			}
		}
	},
	computed: {
		...mapState({
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myNFT_wallet: (state) => state.ethState.data.myNFT_wallet,
			myNFT_verse: (state) => state.ethState.data.myNFT_verse,
			lockList: (state) => state.ethState.data.lockList,
			lockBtn: (state) => state.globalState.data.lockBtn,
			allowance_1155_to_721: (state) =>state.ethState.data.allowance_1155_to_721,
			allowance_1155_to_stake: (state) =>state.ethState.data.allowance_1155_to_stake,
			allowance_721_to_stake: (state) =>state.ethState.data.allowance_721_to_stake,
			upgradeLocks: (state) =>state.ethState.data.upgradeLocks,
		}),
		// 获取momo的生产力
		getSCL(){
			let {lvHashrate, hashrate, gems} = this.getNowPetItem;
			let gemAdd = 0;
			let gemCfg = BaseConfig.GemProductivityCfg;
			gems.map(item => {
				if(item != 0){
					gemAdd += gemCfg[item].productivityRate;
				}
			})
			return hashrate * 10 + lvHashrate + gemAdd;
		},
	
		showCanSelectArr(){
			let { type, needPrototype, needLv } = this.needHandleData;
			let needShowArr = [];
			this.myNFT_stake.map((item) => {
				//去掉自己
				let isSelf = type >= 4 && item.tokenId == this.getNowPetItem.tokenId;
				let bookType =  item.prototype % (item.vType * 10000)
				item.isLock = this.getLockTypes.indexOf(bookType) != -1;
				if ( "v" + item.vType == type && (!needPrototype || needPrototype == item.prototype) && !isSelf  && item.level >= needLv  ) {
					needShowArr.push(item);
				}
			});
			return needShowArr;
		},
		isLock(){
			let {vType, prototype} = this.getNowPetItem;
			let bookType =  prototype % (vType * 10000)
			return this.getLockTypes.indexOf(bookType) != -1
		},
		getGrowup() {
			let { vType, hashrate } = this.getNowPetItem;
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

		//获取宠物下一级的升级算力
		getNowPetItemNextLvHashRate() {
			let { hashrate, level } = this.getNowPetItem;
			let growup = this.getGrowup;
			level = level + 1;
			return parseInt(hashrate + parseInt(growup.staticPower * (level - 1) /100) + parseInt(((parseInt(level / 5) * (1 + parseInt(level / 5)))) * growup.staticPower * growup.staticPercent / 200) );
		},
		getTotalNft(){
			return [...this.myNFT_stake, ...this.myNFT_wallet,...this.myNFT_verse];
		},
		//获取当前要显示的NFT的信息
		getNowPetItem() {
			let [prototype, tokenId, location] = this.$route.params.petId.split("-");
			let retObj = { prototype, tokenId, chain: "eth" };
			for (let key in this.getTotalNft) {
				let item = this.getTotalNft[key];
				if (item.prototype == prototype && item.tokenId == tokenId && item.location == location) {
					retObj = item;
					break;
				}
			}

			//没取到对应的NFT先跳转回去
			if (Object.keys(retObj).length == 3) {
				this.$router.replace("/mypet");
			}
			// retObj.level = 19;
			return retObj;
		},
		hasSelectPetPrototype() {
			console.log(this.selectProtoTypes, "hasSelectPetPrototype");
			let prototype = 0;
			["v1","v2","v3","v4"].map(item=>{
				if (this.selectProtoTypes[item].length != 0) {
					prototype = (this.selectProtoTypes[item][0] % 10000) + 40000;
				}
			})
			// for (let key in this.selectProtoTypes) {
			// 	if (this.selectProtoTypes[key].length != 0) {
			// 		prototype = (this.selectProtoTypes[key][0] % 10000) + 40000;
			// 		break;
			// 	}
			// }
			return prototype;
		},
		// 升级配置
		upgradeConfig() {
			const { level, vType } = this.getNowPetItem;

			switch (Number(vType)) {
				case 4:
					return BaseConfig.MomoLv4Cfg[level];
				case 5:
					return BaseConfig.MomoLv5Cfg[level];
				case 6:
					return BaseConfig.MomoLv6Cfg[level];
				default:
					console.log("quality not support");
					return null;
			}
		},
		//获取当前升级信息
		getUpgradeInfo() {
			let { level, category, prototype, vType } = this.getNowPetItem;
			if (!vType) return [];
			if (Number(vType) < 4) return [];
			const lvUpgradeConfig = this.upgradeConfig;
			//卡五必难
			let isHard = (Number(level) + 1) % 5 == 0 && Number(vType) <= 4;

			let hasSelectPetPrototype = this.hasSelectPetPrototype;

			//大于v4的单独判断逻辑
			let isHardAdvance =
				(Number(level) + 1) % 5 == 0 &&
				Number(vType) > 4 &&
				hasSelectPetPrototype != 0;

			let arr = [];
			//处理其他材料
			[1, 2, 3, 4].map((item) => {
				let needNum = lvUpgradeConfig["v" + item];
				if (needNum) {
					//高级的将最高级的限制的类型给到他
					let reduceType = vType;
					let reducePrototype = prototype;
					let reduceCategory = category;
					if (isHardAdvance) {
						reducePrototype = hasSelectPetPrototype;
						reduceType = 4;
						reduceCategory =
							BaseConfig.NftCfg[hasSelectPetPrototype].category;
					}
					let targetPrototype =
						Number(reducePrototype) -
						(Number(reduceType) - item) * 10000;
					arr.push({
						type: "v" + item,
						needNum,
						needPrototype:
							isHard || isHardAdvance ? targetPrototype : false,
						category: isHard || isHardAdvance ? reduceCategory : 0,
						needLv: item == 4 ? lvUpgradeConfig["v4Lv"] : 1,
					});
				}
			});
			//单独处理消耗v5的逻辑
			if(lvUpgradeConfig["v5"] > 0){
				arr.push({
					category: 0,
					needLv: 1,
					needNum: lvUpgradeConfig["v5"],
					needPrototype: false,
					type: "v5"
				})
			}

			console.log(lvUpgradeConfig, 'lvUpgradeConfig');

			console.log(arr, "getUpgradeInfo");
			//处理需要自己的材料
			let selfNum = lvUpgradeConfig["self"];
			if (selfNum > 0) {
				arr.push({
					type: "v" + Number(vType),
					needNum: selfNum,
					needPrototype: Number(prototype),
					category: category,
					needLv: Number(vType) == 4 ? lvUpgradeConfig["v4Lv"] : 1,
				});
			}
			return arr;
		},
		//是否有编辑姓名的技能
		hasEditNameSkill() {
			let { tokenId, speciality } = this.getNowPetItem;
			if (tokenId != 0 && (speciality == 3 || speciality == 1)) {
				return true;
			} else {
				return false;
			}
		},
		//是否可以提交设置名字
		canSubmitEditName() {
			return (
				this.inputName != "" &&
				this.inputName != this.getNowPetItem.tokenName
			);
		},
		//根据v分类
		getNftVInfo() {
			let retObj = {
				v1: [],
				v2: [],
				v3: [],
				v4: [],
				v5: [],
				v6: [],
			};
			this.myNFT_stake.map((item) => {
				let vType = parseInt(item.prototype / 1e4);
				retObj["v" + vType].push(item);
			});
			//按算力
			retObj.v5.sort((a, b) => a.hashrate - b.hashrate);
			retObj.v6.sort((a, b) => a.hashrate - b.hashrate);
			return retObj;
		},
		canShowStake() {
			let vType = this.getNowPetItem.vType;
			return (
				(vType < 4 && this.allowance_1155_to_stake == 1) ||
				(vType >= 4 && this.allowance_721_to_stake == 1)
			);
		},
		canShowApprove() {
			let vType = this.getNowPetItem.vType;
			return (
				(vType < 4 && this.allowance_1155_to_stake == 0) ||
				(vType >= 4 && this.allowance_721_to_stake == 0)
			);
		},
		//获取目标选择的数量
		getSelectTargetNum() {
			let { type } = this.needHandleData;
			let arr = this.selectProtoTypes[type];
			return arr.length;
		},
		//是否设置过名字
		hasSetName() {
			console.log(this.getNowPetItem, "--------");
			return this.getNowPetItem.tokenName.indexOf("Name_") == -1;
		},
		//获取锁定type
		getLockTypes(){
			let lockTypes = [];
			this.lockList.map(item=>lockTypes.push(item.prototype));
			return lockTypes;
		},
		getMyPetObj() {
			let obj = {};
			[...this.myNFT_stake].map((item) => {
				if (obj[item.prototype]) {
					obj[item.prototype].num++;
				} else {
					obj[item.prototype] = item;
				}
			});
			return obj;
		},
		//获取图鉴显示模式
		getBookArr() {
			let showList = { comp: [], advanced: [] };
			if(!this.hasLoadBook) return showList;
			let typeObj = {};
			let getMyPetObj = this.getMyPetObj;
			//锁定的图鉴type
			let lockTypes = [];
			this.lockList.map(item=>lockTypes.push(item.prototype));
			for (let key in BaseConfig.NftCfg) {
				let item = BaseConfig.NftCfg[key];
				let num = 0;
				let targetItem = getMyPetObj[item.prototype];
				if (targetItem) {
					num = targetItem.num;
					item.tokenId = targetItem.tokenId;
					item.gems = targetItem.gems;
				}else{
					item.tokenId = 0;
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
				item.bookType = item.prototype % (vType * 10000);
				typeObj[type][item.prototype] = item;
			}

			let needPrototype  = false;
			if(this.needHandleData){
				needPrototype = this.needHandleData.needPrototype;
			}

			Object.values(typeObj).map((item) => {
				let itemArr = Object.values(item);
				if (itemArr.length == 1) {
					showList.advanced.push(Object.values(item));
				} else {
					let pushArr = Object.values(item);
					let hasLen = 0;

					pushArr.map(item1=>{
						if(item1.num > 0) hasLen ++;
					});
					//判断类型
					let needType =  (!needPrototype || needPrototype%10000 == pushArr[0].bookType);
					if(hasLen > 0 && needType){
						showList.comp.push(pushArr);
					}
				}
			});

			showList.comp.sort((a,b)=>{
				// return  b[0].prototype - a[0].prototype;
				let hasLen_a = 0;
				a.map(item=>{
					if(item.num > 0) hasLen_a ++;
				});
				let hasLen_b = 0;
				b.map(item=>{
					if(item.num > 0) hasLen_b ++;
				});
				return this.bookSortTurn ?hasLen_b - hasLen_a:hasLen_a - hasLen_b;
			});
			
			return showList;
		},
		// 是否需要mec
		isNeedMec() {
			return !!this.upgradeConfig?.mecNum;
		},
		needApproveMec(){
			return this.isMECApproved == false;
		},
	},
	created() {
		this.inputName = this.hasSetName ? this.getNowPetItem.tokenName : "";

		//升级锁定按钮状态
		this.lockUpgradeTime = this.upgradeLocks[this.getNowPetItem.tokenId] || 0;
		upgradeLockTimer = setInterval(()=>{
			if(this.lockUpgradeTime > 0) this.lockUpgradeTime--;
		}, 1000);
		EventBus.$on(EventConfig.LevelUpConfirm,this.levelUpConfirm);
		this.viewMECApproved();
	},
	beforeDestroy(){
		clearInterval(upgradeLockTimer);
		EventBus.$off(EventConfig.LevelUpConfirm,this.levelUpConfirm);
	},
	methods: {
		levelUpConfirm({tokenId}){
			if(tokenId == this.getNowPetItem.tokenId){
				this.lockUpgradeTime = 0;
			}
		},
		onTabChange(pos){
			let t = setTimeout(()=>{
				clearTimeout(t);
				this.hasLoadBook = true;
			}, 200)
			this.selectAddPetPos = pos == 1?-1:0;
			this.tab_pos = pos;

			if(this.selectAddPetPos == 0){
				this.showSelectNftDialog(this.getUpgradeInfo[0], this.selectAddPetPos, true);
			}
		},

		//授权NFT给质押合约
		async approveNftToStake() {
			let { vType } = this.getNowPetItem;
			if (vType < 4) {
				await Wallet.ETH.approve1155ToTargetToken(
					WalletConfig.ETH.moMoStake
				);
			} else {
				await Wallet.ETH.approve721ToTargetToken(
					WalletConfig.ETH.moMoStake
				);
			}
		},
		//质押
		async stakeNft() {
			let { prototype, tokenId, vType, num } = this.getNowPetItem;
			let erc1155ids = [];
			let erc1155Num = [];
			let erc721TokenIds = [];
			if (vType < 4) {
				erc1155ids.push(prototype);
				erc1155Num.push(num);
			} else {
				erc721TokenIds.push(tokenId);
			}
			await Wallet.ETH.stakeNft(
				erc1155ids,
				erc1155Num,
				erc721TokenIds
			);
	
		},
		//一件移除
		onStepRemoveFood() {
			Object.keys(this.selectProtoTypes).map(
				(item) => (this.selectProtoTypes[item] = [])
			);
		},
		//一键添加升级材料
		onStepAddFood() {
			this.onStepRemoveFood();
			let nftVInfo = this.getNftVInfo;
			let upgradeInfo = this.getUpgradeInfo;
			let hasOne = false;
			upgradeInfo.map(({ type, needNum, needPrototype, needLv }) => {
				let hasArr = nftVInfo[type];
				let pushNum = 0;
				outLoop: for (let i = 0; i < hasArr.length; i++) {
					let item = hasArr[i];
					//限定了需要对应种类
					if (needPrototype && item.prototype != needPrototype) {
						continue;
					}
					//限定了等级
					if (needLv > 1 && item.level < needLv) {
						continue;
					}
					for (let j = 0; j < item.num; j++) {
						if (pushNum < needNum) {
							this.selectProtoTypes[type].push(item.prototype);
							//721的需要tokenid
							if (item.vType > 3) {
								this.selectProtoTypes[type + "_tokenId"].push(
									item.tokenId
								);
							}
							pushNum++;
							hasOne = true;
						} else {
							break outLoop;
						}
					}
				}
			});
			//一个合适的材料都没有
			if (!hasOne) {
				this.$store.commit("globalState/addNotify", {
					msg: this.$t("BOX_21"),
					type: "error",
				});
			}
		},
		//升级
		async upgrade() {
			if(this.lockUpgradeTime > 0) return;

			let { level, tokenId, location } = this.getNowPetItem;
			let { v1, v2, v3, v4_tokenId, v5_tokenId } = this.selectProtoTypes;
			//TODO校验是否符合升级条件
			let upgradeInfo = this.getUpgradeInfo;
			if (upgradeInfo.length == 0) {
				return;
			}
			let isCanSubmit = true;
			upgradeInfo.map(({ type, needNum }) => {
				let targetSelect = this.selectProtoTypes[type];
				if (targetSelect.length < needNum) isCanSubmit = false;
			});
			if (!isCanSubmit) {
				this.$store.commit("globalState/addNotify", {
					msg: this.$t("BOX_21"),
					type: "error",
				});
				return;
			}
			//生成需要的数据
			let protosV1V2V3Obj = {};
			[...v1, ...v2, ...v3].map((item) => {
				item = Number(item);
				if (protosV1V2V3Obj[item]) {
					protosV1V2V3Obj[item]++;
				} else {
					protosV1V2V3Obj[item] = 1;
				}
			});
			let hash = await Wallet.ETH.upgradeStake(
				level + 1,
				tokenId,
				Object.keys(protosV1V2V3Obj),
				Object.values(protosV1V2V3Obj),
				[...v4_tokenId, ...v5_tokenId],
				location == ConstantConfig.NFT_LOCATION.VERSE
			);
			if (hash) {
				//锁定升级按钮
				this.lockUpgradeTime = ConstantConfig.BTN_LOCK_MAX_TIME;
				this.$store.commit("ethState/setUpgradeLocks", {tokenId, time: ConstantConfig.BTN_LOCK_MAX_TIME});

				//从库中临时删除
				let needRemove721TokenArr = [...v4_tokenId, ...v5_tokenId];
				this.myNFT_stake.map((item, pos) => {
					if (item.tokenId == 0) {
						if (protosV1V2V3Obj[item.prototype]) {
							item.num -= protosV1V2V3Obj[item.prototype];
							if (item.num == 0) {
								this.myNFT_stake.splice(pos, 1);
							}
						}
					} else if (
						needRemove721TokenArr.indexOf(item.tokenId) != -1
					) {
						this.myNFT_stake.splice(pos, 1);
					}
				});
				//删除选中
				this.onStepRemoveFood();
			}
		},
		//授权1155给721
		async approved1155To721() {
			await Wallet.ETH.approve1155ToTargetToken(
				WalletConfig.ETH.moMoToken
			);
		},
		//NFT转换
		change() {
			this.$store.commit("globalState/addNotify", {
				msg: this.$t("Common_06"),
				type: "error",
			});
		},
		//提交设置名字
		async confirmSetName() {
			let { tokenId } = this.getNowPetItem;
			if (this.inputName == "" || tokenId == 0 || this.hasClick) return;
			this.hasClick = true;
			this.$store.commit("globalState/setwalletStatus", {status:1});
			let name = await Wallet.ETH.getMomoNameByTokenId(tokenId);
			this.hasClick = false;
			let res = await Wallet.ETH.setMomoNameByTokenId(tokenId,this.inputName,name == "");
			if (res) {
				this.hasClick = false;
				this.oprDialog("setName-dialog", "none");
			}
		},
		//打开选择面板
		showSelectNftDialog(needHandleData, index, isTabChange = false) {
			if(this.lockUpgradeTime > 0  ) return;

			//如果是图鉴模式并且切换v5 变成单选模式
			if(needHandleData.type == "v5"){
				this.tab_pos = 0;
			}

			// let { type, needPrototype } = needHandleData;
			// let needShowArr = [];
			// this.myNFT_stake.map((item) => {
			// 	//去掉自己
			// 	let isSelf = type >= 4 && item.tokenId == this.getNowPetItem.tokenId;
			// 	// item.level >= needLv &&
			// 	let bookType =  item.prototype % (item.vType * 10000)
			// 	item.isLock = this.getLockTypes.indexOf(bookType) != -1;
			// 	if ( "v" + item.vType == type && (!needPrototype || needPrototype == item.prototype) && !isSelf ) {
			// 		needShowArr.push(item);
			// 	}
			// });
			// this.showCanSelectArr = needShowArr;
			this.needHandleData = needHandleData;
			//momo每次升整5倍数等级的时候默认升级界面在图鉴模式
			if(!isTabChange && (this.getNowPetItem.level +1) % 5 == 0 && needHandleData.type != "v5"){
				let t = setTimeout(()=>{
					clearTimeout(t);
					this.hasLoadBook = true;
				}, 400)
				this.tab_pos = 1;
				//将Tab组件刷新
				this.hackReload = false;
				this.$nextTick(()=>{
					this.hackReload = true;
				});
			}
			this.selectAddPetPos = this.tab_pos == 1?-1:index;
			this.oprDialog("selectNft-dialog", "block");
		},
		//选择子项
		onSelectChange({ tokenId, prototype, num, vType }) {
			if(!this.getUpgradeInfo[vType-1] ) return;
			this.needHandleData = this.getUpgradeInfo[vType-1];
			if(vType >= 4 && this.tab_pos == 1){
				this.showNotify(this.$t("MOMO_37"), "error");
				return;
			}
			//添加
			if (num > 0) {
				//如果已经选择满了就不用选择了
				if (this.getSelectTargetNum >= this.needHandleData.needNum) {
					this.showNotify(this.$t("BOX_22"), "error");
					return;
				}
				this.selectProtoTypes["v" + vType].push(prototype);
				if (vType >= 4) {
					this.selectProtoTypes["v" + vType + "_tokenId"].push(
						tokenId
					);
				}
			} else {
				//移除对应项
				let targetArr = this.selectProtoTypes["v" + vType];
				let targetPos = -1;
				for (let key in targetArr) {
					if (targetArr[key] == prototype) {
						targetPos = key;
						break;
					}
				}
				if (targetPos != -1) {
					targetArr.splice(targetPos, 1);
					//721移除对应的tokenId
					if (vType >= 4) {
						this.selectProtoTypes["v" + vType + "_tokenId"].splice( 0, 1 );
					}
				}
			}

			//重新更新需要选中状态
			this.getUpgradeInfo.map((item) => {
				if (item.type == this.needHandleData.type) {
					this.showSelectNftDialog(item, this.selectAddPetPos, true);
				}
			});
		},
		// 查询MEC授权状态
		async viewMECApproved(){
			const isApprove = await Wallet.ETH.isApprovedForAll(WalletConfig.ETH.crystalToken, WalletConfig.ETH.moMoToken);

			if(isApprove != null) {
				this.isMECApproved = isApprove;
			}
		},
		// 授权MEC
		async approveMEC(){
			const hash = await Wallet.ETH.approvedForAll(WalletConfig.ETH.crystalToken, WalletConfig.ETH.moMoToken, ()=>{
				this.viewMECApproved();
			});

			if(hash){
				this.lockBtnMethod("approveLock");
			}
		},
	},
};
</script>
<style lang="less" scoped>
@media (max-width: 768px){
	.type_change{
		position: static!important;
		display: block;
		text-align: center;
		margin: 10px;
		zoom: 0.8 !important;
	}
}
.type_change{
	position: absolute;
	right: 0px;
	bottom: 0px;
	zoom: 0.8;
}
#stake {
	position: absolute;
	right: 20px;
	top: 65px;
	z-index: 999;
}
.chanzi{
	position: absolute;
	bottom: 30px;
	width: 100%;
}
#upgrade-name {
	position: absolute;
	bottom: 0px;
	width: 100%;
	text-align: center;
	padding-left: 20px;
}
#upgrade-power {
	position: absolute;
	right: 20px;
	top: 20px;
	font-size: 20px;
}
#upgrade-power-lv1 {
	position: absolute;
	right: 20px;
	top: 65px;
	font-size: 12px;
}
#upgrade-lv {
	position: absolute;
	top: 20px;
	left: 20px;
}
.upgrade-lock{
	position: absolute;
	top: 80px;
	left: 30px;
}
.edit-btn {
	margin-left: 20px;
	cursor: pointer;
	height: 30px;
	top: 5px;
}
#pet-des {
	background: #10172a;
	border-radius: 10px;
	padding: 15px;
	width: 100%;
	min-height: 100px;
	display: inline-block;
}
.info-item {
	background: #1d2b50;
	border-radius: 10px;
	padding: 0px 15px;
	display: inline-block;
	height: 40px;
	line-height: 38px;
	min-width: 120px;
	position: relative;
}
#upgrade-petid {
	position: absolute;
	height: 25px;
	border-radius: 15px;
	color: #fff;
	top: 20px;
	left: 20px;
	line-height: 25px;
	padding: 0px 10px;
	min-width: 100px;
	text-align: left;
}
#upgrade {
	padding: 10px;
	max-width: 1200px;
	margin: 0px auto;
	overflow: hidden;
	position: relative;
	margin-top: 10px;
}

@media (max-width: 768px) {
	.mec-item {
    zoom: 0.6 !important;
	}
}

.mec-item {
	position: relative;

	.icon {
    cursor: pointer;
    width: 86px;
    height: 65px;
    margin: 0 10px 25px 10px;
		background-image: url("../../assets/nft_head_mec.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 40%;
		}
	}

	.count {
		width: 100%;
		text-align: center;
		font-size: 13px;
		position: absolute;
		bottom: 0;
	}
}

#selectNft-dialog {
	.items {
		& > span {
			display: inline-block;
			vertical-align: top;
		}

		.mec-item {
			.count {
				color: #e24c4c;
			}
		}
	}
}
</style>

