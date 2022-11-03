<template>
	<div id="openbox" class="tac center-box">
		<div class="clear mgt-10">
			<!-- 提前加载好图片 -->
			<template>
				<div class="card card-v4 pre-load"></div>
				<div class="card card-v5 pre-load"></div>
				<div class="card card-v pre-load"></div>
				<div class="card-v4-loading  pre-load"></div>
				<div class="card-v5-loading  pre-load"></div>
			</template>
			<section class="col-md-7" style="padding:10px" >
				<div class="adv-panel por box-section" style="padding-bottom:45px">
					<div class="hide-xs">
						<p class="opa-6 mgt-20">{{ $t("BOX_01") }}</p>
						<h1 class="dib mgt-10" style="font-size: 20px">
							{{ totalOpenBoxAmount.bnb }}
						</h1>
					</div>
					<div class="por box"  style="height:287px; margin:0px auto; ">
						<img src="@/assets/icon/box_rate.png" alt="" id="show-rate" @click="oprDialog('show-rate-dialog', 'block')">
						<div class="box-show" >
							<div class="box-spine" ref="boxSpine" v-show="showOpenAnimation"></div>
							<div class="box-spine" ref="boxAnimation" v-show="!showOpenAnimation"></div>
						</div>
					</div>

					<div id="show-card-v2" class="hide " @click.stop="nextOpen" >
						<div id="show-card-bg"  >
							<div :class="[{'animate__slideInUp animate__animated animate__faster': !isOpenAll}]"  v-for="(item, pos) in petDataArr.slice(0, openNum-openPos)" 
							:style="!isOpenAll?`margin-top:-${(openNum-openPos-pos)*15}px; transform: translate(-50%, -50%) scale(${1.5- (openNum-openPos-pos) * 0.02}); `:
							`transition-delay: ${60*pos}ms; transform: translate(${pointObj[openNum][pos].x}%, ${pointObj[openNum][pos].y}%)`" :key="pos" >
								<template v-if="(pos == openNum-openPos-1) || !openOne">
									<div class="open-pet" :class="[{'opa-0': !showResultOnly}]">
										<OpenPetItem   v-bind:data="{ item }" />
									</div>
									<div @click="cardClick" v-if="!showResultOnly" :id="`card-`+pos"  :data-pos="pos" class="card " :class="`card-v${anieVtype[item.vType]}`"></div>
								</template>
							</div>
						</div>
						<div id="show-card-btn" class="hide animate__fadeIn animate__animated" v-show="!isOpenAll && !openOne">
							<button class="btn-primary" @click.stop="openOneCard">{{$t("NewBOX_36")}}</button>
							<button class="btn-primary mgl-10" @click.stop="openAll">{{$t("NewBOX_37")}}</button>
						</div>
					</div>
					<!-- 概率展示 -->
					<div style="padding:10px 0px;position:absolute;bottom:0px;width:100%;left:0px;background:#1F232A;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;" class="tal rate-show hide-xs">
						<div class="col-md-1"></div>
						<div class="col-md-2 col-xs-4 vertical-children mgt-5" v-for="item in $parent.rateObj" :key="item.lv">
							<div style="height:20px;width:20px;border-radius:20px;padding:2px;" class="dib dot-bg">
								<div style="width:100%;height:100%;border-radius:20px;border:2px solid #1B1C21" :class="`bg-new${item.lv}`"></div>
							</div>
							<div class="dib mgl-5" style="line-height:15px">
								<p>{{item.rate}}</p>
								<p class="small opa-6">{{$t(item.lang)}}</p>
							</div>
						</div>
						<div class="col-md-1"></div>
					</div>
					<br />
					<!-- <button class="btn-primary mgl-10" @click="shakeBox">测试抖动</button>
					<button class="btn-primary mgl-5" @click="testOpenAnime2">测试打开 </button>  -->
				</div>
			</section>

			<section class="col-md-5" style="padding:10px">
				<div >
					<div  >
						<div class="ly-input-content dib" style="width:100%;padding:30px 20px">
							<p class="tal">{{$t("BOX_35")}}</p>
							<div class="por mgt-10">
								<div class="ly-input-pre-icon">
									<img  src="@/assets/icon/box_view.png" alt="" height="20" />
								</div>
								<input class="ly-input" type="text"
									style=" text-align: left; width: 100%; padding-left:65px"
									readonly="readonly"
									:value="boxNum"
								/>
							</div>
							<p class="small opa-6 mgt-10 tal">{{$t("BOX_39")}}</p>
							<div class="aveage-box">
								<div class="tal">
									<button class="btn-primary mgt-20" style="width: 90%" @click="setAction(23001); oprDialog('get-box-dialog', 'block'); addKey = parseInt(boxNum)>200?200:parseInt(boxNum) || 0; ">
										{{$t("BOX_36")}}
									</button>
								</div>
								<div class="tar">
									<router-link to="/market?tab=4">
										<button class="mgt-20 btn-line" style="width:90%;" @click="setAction(23002); ">
											{{$t("BOX_37")}}
										</button>
									</router-link>
								</div>
							</div>
							
						</div>
					</div>

					<div class=" mgt-20" >
						<div class="ly-input-content dib" style="width:100%;padding:30px 20px">
							<p class="tal">{{$t("BOX_38")}}</p>
							<div class="por mgt-10">
								<div class="ly-input-pre-icon">
									<img src="@/assets/icon/box_icon.png" alt="" height="20" />
								</div>
								<input class="ly-input" type="text"
									style="text-align: left; width: 100%; padding-left:65px"
									:value="canOpenBox"
									readonly="readonly"
								/>
							</div>
							<p class="small opa-6 mgt-10 tal">{{$t("BOX_40")}}</p>
							<div class="aveage-box">
								<div class="tal">
									<StatuButton class="mgt-20" style="width: 90%" :isDisable="lockBtn.openBoxLock > 0" :isLoading="lockBtn.openBoxLock > 0" :onClick="showOpenBox.bind(this)">
										{{$t("BOX_34")}}
									</StatuButton>
								</div>
								<div class="tar">
									<button class="btn-line mgt-20" style="width: 90%" @click="previewOpen">{{$t("BOX_43")}}</button>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- 记录 -->
		<div class="col-md-12" style="padding:10px">
			<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:20px">
				<table class="small  new-table" border="0" frame="void" rules="none" >
					<tr>
						<th width="30%" class="tal">{{ $t("BOX_12") }}</th>
						<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
						<th width="10%">{{ $t("BOX_13") }}</th>
						<th width="20%">{{ $t("BOX_27") }}</th>
						<th width="40%" class="tar">TX</th>
					</tr>
					<tr v-for="item in getOpenBoxHistory" :key="item.tx + item.event">
						<td class="tal">{{ getTimeFtt(item.crtime) }}</td>
						<td class="tal">{{ $t(eventToLang[item.event]) }}</td>
						<td>x{{ item.amount }}</td>
						<td class="vertical-children">
							<span v-if="item.state != 1 && item.state != -1">
								<Loading />
							</span>
							<span v-if="item.state == 1">{{ $t("Common_09") }}</span>
							<span v-if="item.state == -1">
								<svg  viewBox="0 0 1024 1024"  width="13" height="13"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF5B5C" p-id="3023"></path><path d="M328.988444 292.750222a17.066667 17.066667 0 0 1 24.120889 0L512 451.697778l158.890667-158.890667a17.066667 17.066667 0 0 1 24.120889 0l36.238222 36.238222a17.066667 17.066667 0 0 1 0 24.120889L572.302222 512l158.947556 158.833778a17.066667 17.066667 0 0 1 0 24.120889l-36.238222 36.238222a17.066667 17.066667 0 0 1-24.120889 0L512 572.302222l-158.833778 158.890667a17.066667 17.066667 0 0 1-24.120889 0l-36.238222-36.238222a17.066667 17.066667 0 0 1 0-24.120889L451.697778 512 292.750222 353.109333a17.066667 17.066667 0 0 1 0-24.120889l36.238222-36.238222z" fill="#FFFFFF"></path></svg>
								&nbsp;
								Fail
							</span>
						</td>
						<td class="tar">
							<img v-if="item.event == 'MintBox' && item.state == 1" @click="showHistoryDialog(item)" height="25" src="@/assets/icon/view.png" alt="" class="cur-point" />&nbsp;
							<a :href="getTxUrl(item.tx)" target="_blank">
								<img src="@/assets/icon/viewTx.png" alt="" class="cur-point" height="25" />
							</a>
						</td>
					</tr>
				</table>
				<div class="no-show" v-if="getOpenBoxHistory.length == 0">
					<img src="@/assets/no_items.png" alt="">
					<p class="opa-6 mgt-10">No items to display</p>
				</div>
			</section>
		</div>

		<Dialog id="open-box-history-dialog" :top="120" :width="660">
			<div class="dialog-content tal" style="height: 500px">
				<PetItemSmall v-for="item in showHistoryArr" :key="item.prototype.toString() + item.tokenId + item.num" :data="item" />
			</div>
		</Dialog>
		<Dialog id="get-box-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("BOX_36")}}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{$t("BOX_35")}}</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon">
						<img  src="@/assets/icon/box_view.png" alt="" />
					</div>
					<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="parseInt(boxNum)>200?200:parseInt(boxNum)"  v-model="addKey" />
					<div class="dib" style="width: 30%">
						<button @click="addKey = parseInt(boxNum)>200?200:parseInt(boxNum) || 0" class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<div class="vertical-children tal mgt-10">
				<span class="small opa-6"> {{ $t("BOX_07") }}: {{ addKey }} </span>
				<img src="@/assets/icon/box_icon.png" height="20" alt="" />
			</div>
			<div class="mgt-20 tal">
				<p class="small opa-6" v-html="$t('BOX_08')"></p>
			</div>

			<div  :class="newBoxApproveToMinter == false ?'btn-group':''" class="mgt-20">
				<StatuButton :onClick="approve.bind(this)"  data-step="1" style="width: 80%" v-if="newBoxApproveToMinter == false" :isLoading="lockBtn.approveLock > 0" :isDisable="lockBtn.approveLock > 0">
					{{ $t("Air-drop_16") }} BOX
				</StatuButton>
				<button data-step="2" @click="addBox(addKey)" class="btn-primary mgt-10 por" style="width: 80%; margin-bottom: 20px" :class="newBoxApproveToMinter == false?'disable-btn':''">
					{{ $t("BOX_41") }}
				</button>
			</div>
			
		</Dialog>
		<Dialog id="open-box-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("BOX_34")}}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{ $t("BOX_10") }}:</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon"> <img  src="@/assets/icon/box_icon.png" alt="" /> </div>
					<input class="ly-input dib" type="text"
						style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="maxOpenOne" v-model="openBox" />
					<div class="dib" style="width: 30%">
						<button @click=" openBox = canOpenBox > maxOpenOne ? maxOpenOne : canOpenBox || 0 " class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<button @click="open(openBox, true)" class="btn-primary mgt-30" style="width: 70%;" >
				{{ $t("BOX_11") }}
			</button>
		</Dialog>
		<Dialog id="show-rate-dialog" :top="200" :width="400">
			<div style="padding:15px">
				<div class="pie dib por">
					<div class="pie-mask">
						<img src="@/assets/icon/box_view.png" alt="" width="50%">
					</div>
				</div>
				<div class="ovh mgt-20" style="padding-left:35px">
					<div class="col-md-2 col-xs-4 vertical-children mgt-5 tal" v-for="item in $parent.rateObj" :key="item.lv">
						<div class="dib mgl-5" style="line-height:15px;">
							<h2 class="bold2">{{item.rate}}</h2>
							<p :class="`bg-new${item.lv}`" style="width:40px;height:2px;margin-top:3px"></p>
							<p class="small opa-6 mgt-5">{{$t(item.lang)}}</p>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<div class="preview l" v-if="showPreview" @click="showPreview = false">
			<div class="preview-content adv-panel animate__zoomIn animate__animated animate__faster">
				<h2>{{$t("BOX_43")}}</h2>
				<div class="adv-panel-content mgt-10" style="padding:20px" v-if="previewMomo.vType != ''">
					<div class="vertical-children">
						<img :src="require(`@/assets/icon/${category_img[previewMomo.category]}.png`)" alt="">
						<span class="mgl-5 bold2">{{$t(previewMomo.tokenName)}}</span>
					</div>
					<div class="momo-show por dib mgt-10">
						<img src="@/assets/card_v2/previewbg.png" alt="" class="rotate2">
						<img class="momo-show-momo" :src="require(`@/assets/pet/${previewMomo.prototype}.png`)"/>
					</div>
					<h2 :class="`c-lv${previewMomo.vType}`">{{selectVType[previewMomo.vType]}}</h2>
					<div class="vertical-children">
						<img src="@/assets/icon/airdrop.png" alt="" height="14px">
						<span class="mgl-5">{{previewMomo.vType > 3?getStaticHashPower[previewMomo.vType] - getRandomInt(0,20): getStaticHashPower[previewMomo.vType]}} hash power</span>
					</div>
				</div>
				<div class="mgt-20 tac">
					<button class="btn-primary" @click="showPreview = false">{{$t("Network_12")}}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { Wallet, Common, EventBus } from "@/utils";
import { Dialog, PetItemSmall, StatuButton, Loading, OpenPetItem } from '@/components';
import CommonMethod from "@/mixin/CommonMethod";
import { BaseConfig, WalletConfig, EventConfig } from "@/config";
const $ = window.$;

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { Dialog, PetItemSmall, StatuButton, Loading, OpenPetItem },
	data() {
		return {
			// 显示开箱动画
			showOpenAnimation: false,
			openPos: 0,
			showHistoryArr: [],
			openBox: "",
			addKey: "",
			eventToLang: {
				HashBox: "BOX_24",
				AddBox: "BOX_23",
				MintBox: "BOX_25",
			},
			maxOpenOne: 10,
			showOpenBoxCard: [],

			testArr: [
			// 	{category: 5,hashrate: 120,level: 1,lvHashrate: 120,num: 1,prototype: '50092',quality: 6,specialty: 0,tokenId:0,vType: 5, chain:'bnb', tokenName:'Name_338',isOpenCard:true},
			// 	{category: 3,hashrate: 40,level: 1,lvHashrate: 40,num: 1,prototype: '43025',quality: 6,specialty: 0,tokenId:0,vType: 4, chain:'bnb', tokenName:'Name_296',isOpenCard:true},
			// 	{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '21001',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'Name_1',isOpenCard:true},

			// 	{category: 2,hashrate: 20,level: 1,lvHashrate: 2,num: 1,prototype: '43014',quality: 5,specialty: 0,tokenId:0,vType: 5, chain:'bnb', tokenName:'7',isOpenCard:true},
			// 	{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'6',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '33020',quality: 2,specialty: 0,tokenId:0,vType: 3, chain:'bnb', tokenName:'5',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'4',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '43014',quality: 4,specialty: 0,tokenId:0,vType: 4, chain:'bnb', tokenName:'3',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '12020',quality: 2,specialty: 0,tokenId:0,vType: 1, chain:'bnb', tokenName:'2',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '24020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'1',isOpenCard:true},
	
			],

			petDataArr:[],

			pointObj: [
				{x: 0, y: 0},
				[{x: -50, y: -50}],
				[{x: -110, y: -50}, {x:10, y: -50}],
				[{x: -170, y: -50}, {x: -50, y: -50}, {x: 70, y: -50}],
				[{x: -110, y: -105}, {x: -110, y: 5}, {x: 10, y: -105},{x:10, y:5}],
				[{x: -170, y: -105}, {x: -170, y: 5}, {x: -50, y: -50}, {x: 70, y: -105},{x:70, y:5}], // 5
				[{x: -170, y: -105}, {x: -170, y: 5}, {x: -50, y: -105}, {x: -50, y: 5}, {x: 70, y: -105},{x:70, y:5}], // 6
				[{x: -170, y: -105}, {x: -170, y: 5}, {x: -50, y: -160},  {x: -50, y: -50},  {x: -50, y: 60}, {x: 70, y: -105},{x:70, y:5}], // 7
				[{x: -170, y: -105}, {x: -170, y: 5}, {x: -50, y: -215}, {x: -50, y: -105}, {x: -50, y: 5},  {x: -50, y: 115}, {x: 70, y: -105},{x:70, y:5}], // 8
				[{x: -170, y: -160}, {x: -170, y: -50}, {x: -170, y: 60}, {x: -50, y: -160},  {x: -50, y: -50},  {x: -50, y: 60},  {x: 70, y: -160},{x:70, y: -50},{x:70, y: 60} ], // 9
				[{x: -170, y: -160}, {x: -170, y: -50}, {x: -170, y: 60},  {x: -50, y: -215}, {x: -50, y: -105}, {x: -50, y: 5},  {x: -50, y: 115},  {x: 70, y: -160},{x:70, y: -50},{x:70, y: 60} ], // 10
			],
			anieVtype:["","","","","4","5"],
			isOpenAll: false,
			openOne: false,
			isFinishOpen: false,
			showResultOnly: false,
			openAllNeedSleep: 0,
			boxSpine: null,
			cardSpines: [],
			newBoxApproveToMinter: "-",
			showPreview: false,
			previewMomo: {prototype:"",tokenName:"",category:"", vType: ""},
			selectVType: [
				this.$t("MOMO_08"),
				this.$t("MOMO_09"),
				this.$t("MOMO_10"),
				this.$t("MOMO_11"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
		};
	},
	computed: {
		...mapState({
			ethState: (state) => state.ethState.data,
			totalOpenBoxAmount: (state) => state.globalState.data.totalOpenBoxAmount,
			lockBtn: (state) => state.globalState.data.lockBtn,
			boxNum: (state) => state.gemState.data.boxNum,
			hasLoadSpine: (state) => state.globalState.data.hasLoadSpine,
			momoSetting: (state) => state.globalState.data.momoSetting,
		}),
		getStaticHashPower(){
			console.log([0,1,2,3,this.momoSetting.v4_max_upgrade, this.momoSetting.v5_max_upgrade]);
			return [0,1,2,3,this.momoSetting.v4_max_upgrade, this.momoSetting.v5_max_upgrade]
		},
		getMoMoVType(){
				let retData = {
					v1: [],
					v2: [],
					v3: [],
					v4: [],
					v5: [],
					v6: [],
				}
				Object.keys(BaseConfig.NftCfg).map(item=>{
					retData[`v${this.getVType(item)}`].push(item);
				})
				return retData;
		},
		canOpenBox() {
			let { canOpenBox, orderBlockHash, openBoxTemp } = this.ethState;
			if (orderBlockHash =="0x0000000000000000000000000000000000000000000000000000000000000001") {
				canOpenBox = 0;
			}
			let needReduceBox = 0;
			openBoxTemp.map((item) => {
				if(item.state == 0){
					needReduceBox += Number(item.amount);
				}
			});
			canOpenBox -= needReduceBox;
			if (canOpenBox < 0) canOpenBox = 0;
			return canOpenBox;
		},
		getOpenBoxHistory() {
			if(!this.$parent.isActive) return [];

			let { openBoxTemp, openBoxHistory } = this.ethState;
			
			//去重
			let historyObj = {};
			openBoxHistory.map((item) => {
				if(item.event == "HashBox"){
					historyObj[item.tx+"HashBox"] = item;
				}else{
					historyObj[item.tx] = item;
				}
			});
			openBoxTemp.map((item, index) => {
				if (historyObj[item.tx] == undefined) {
					historyObj[item.tx] = item;
				}else{
					
					openBoxTemp.splice(index, 1);
					//显示开箱子
					console.log("start show");
					this.petDataArr = [];
					this.testArr = [];
					let showArr = [];
					let {tokenIds, ids, tokens, amounts} = historyObj[item.tx];

					//先生成721的数据
					tokenIds.map((item, key) => {
						let {category,hashrate,prototype,quality,specialty} = tokens[(item, key)];
						let {tokenName} = BaseConfig.NftCfg[prototype];
						showArr.push({
							prototype,
							quality,
							category,
							level: 1,
							specialty,
							hashrate,
							lvHashrate: hashrate,
							vType: parseInt(prototype / 1e4),
							num: 1,
							tokenId: item,
							tokenName,
							chain: "bnb",
							isOpenCard: true,
						});
					});
					//再生成1155的数据
					ids.map((item, key) => {
						if (item == 0) return;
						let { quality, category, tokenName } = BaseConfig.NftCfg[item];
						//将1155拆开显示
						new Array(Number(amounts[key])).fill(1).map(num=>{
							showArr.push({
								prototype: item,
								quality,
								category,
								level: 1,
								specialty: 0,
								hashrate: quality,
								lvHashrate: quality,
								vType: parseInt(item / 1e4),
								num,
								tokenId: 0,
								tokenName,
								chain: "bnb",
								isOpenCard: true,
							});
						})
					});

					//随机排序
					showArr.sort(()=>{
						return Math.random() - 0.5;
					});
					this.testArr = showArr;
					this.testOpenAnime2();
				}
			});

			this.$store.commit("ethState/setData", {openBoxTemp,});

			return Object.values(historyObj).sort((a,b)=>b.crtime - a.crtime);
		},
		getShowAnimeArr(){
			if(this.ethState.openBoxHistory.length == 0) return [];
			let {tokenIds, ids, tokens, amounts} = this.ethState.openBoxHistory[0];

			let returnArr = [];

			//先生成721的数据
			tokenIds.map((item, key) => {
				let {category,hashrate,prototype,quality,specialty} = tokens[(item, key)];
				returnArr.push({
					prototype,
					quality,
					category,
					level: 1,
					specialty,
					hashrate,
					lvHashrate: hashrate,
					vType: parseInt(prototype / 1e4),
					num: 1,
					tokenId: item,
				});
			});
			//再生成1155的数据
			ids.map((item, key) => {
				if (item == 0) return;
				let { quality, category } = BaseConfig.NftCfg[item];
				returnArr.push({
					prototype: item,
					quality,
					category,
					level: 1,
					specialty: 0,
					hashrate: quality,
					lvHashrate: quality,
					vType: parseInt(item / 1e4),
					num: Number(amounts[key]),
					tokenId: 0,
				});
			});

			return returnArr;
		},
		needApprove() {
			return (this.ethState.allowance_box_to_minter != -1 && Number(this.ethState.allowance_box_to_minter) < 100);
		},
		isOpening(){
			let isOpening = false;
			this.ethState.openBoxTemp.map(item=>{
				if(item.state == 0) isOpening = true;
			});
			return isOpening;
		},
		openNum(){
			return this.petDataArr.length;
		}
	},

	mounted() {
		this.isApprove();
		EventBus.$emit(EventConfig.OpenBoxHistory, { chain: "eth" });

		timer = setInterval(() => {
			if (this.ethState.openBoxTemp.length != 0) {
				EventBus.$emit(EventConfig.OpenBoxHistory, { chain: "eth" });
			}
		}, 2000);

		this.renderBoxSpine();

		//如果有临时开箱子数据就让箱子继续晃动
		if(this.isOpening){
			this.shakeBox()
		}

	},
	beforeDestroy() {
		if (timer != null) clearInterval(timer);
	},

	watch:{
		openAllNeedSleep: async function(val){
			if(val != 0){
				await Common.sleep(val);
				this.isFinishOpen = true;
				this.openAllNeedSleep = 0;
			}
		}
	},
	
	methods: {
		async  cardClick(e){
			if(!this.isOpenAll && !this.openOne || $(e.target).hasClass("play")) return;

			this.isFinishOpen = false;
			$(e.target).addClass("play");
			let delayTs = 600;
			let data = this.petDataArr[$(e.target).data("pos")];
			if(data.vType == 4) delayTs = 1900;
			if(data.vType == 5) delayTs = 2300;
			// 将需要等最久的时间存起来
			if(this.openAllNeedSleep < delayTs+1000) this.openAllNeedSleep = delayTs+1000;
			await Common.sleep(delayTs);
			$(e.target).prev().removeClass("opa-0");
			await Common.sleep(1000);
			$(e.target).remove();
		},
		nextOpen(){
			if(!this.isFinishOpen) return;

			// 开卡结束,初始化开卡状态
			if(this.showResultOnly || this.isOpenAll){
				this.initOpenData();
				return;
			}

			if(this.openOne && this.openPos == this.openNum-1){
				if(this.openNum == 1){
					this.initOpenData();
				}else{
					this.showResult();
				}
			}

			if(this.openOne && this.openPos < this.openNum-1){
				this.openPos += 1;
			}

			this.openOne = false;
		},
		initOpenData(){
			$("#show-card-v2").addClass("hide");
			$(".box-show").removeClass("box-show-open");
			this.boxSpine.config.loop = false;
			this.boxSpine.setAnimation("jingzhen", true);
			this.showResultOnly = false;
			this.openOne = false;
			this.isOpenAll = false;
			this.isFinishOpen = false;
			this.petDataArr = [];
			this.openAllNeedSleep = 0;
		},
		async openAll(){
			this.openPos = 0;
			this.$nextTick(async ()=>{
				$(".animate__slideInUp").removeClass("animate__slideInUp").removeClass("animate__animated").removeClass("animate__faster").css("margin-top", 0);
				await Common.sleep(200);
				this.isOpenAll = true;
				await Common.sleep(this.petDataArr.length * 70);
				$(".card").click();
			})
		},
		showResult(){
			this.openOne = false;
			this.openPos = 0;
			this.showResultOnly = true;
			this.isOpenAll = true;
		},
		openOneCard(){
			if(this.openOne) return;
			this.openOne = true;
			let openPosId = "#card-" + (this.openNum-this.openPos-1);
			this.cardClick({target: $(openPosId)[0]});
		},
		
		renderBoxSpine(){
			// 开箱动画
			this.boxSpine = new window.spine.SpineWidget(this.$refs.boxSpine, {
				json: "./animation/boxV3/kejixiangzi2.json",
				atlas: "./animation/boxV3/kejixiangzi2.atlas",
				backgroundColor: "#00000000",
				animation: "jingzhen",
				loop: true,
				fitToCanvas: false,
				scale:0.4,
				x: 280,
				y: 50,
				// x: 300,
				// y: 100,
				success: ()=>{
					this.boxSpine.state.timeScale = 1.8;
				}
			});

			// 箱子静置动画
			new window.spine.SpineWidget(this.$refs.boxAnimation, {
				json: "./animation/box-shake/kjxz437.json",
				atlas: "./animation/box-shake/kjxz437.atlas",
				backgroundColor: "#00000000",
				animation: "open",
				loop: true,
				fitToCanvas: false,
				scale: 0.6,
				x: 280,
				y: 50,
			});
		},
		
		showOpenBox(){
			this.setAction(23003); 
			this.oprDialog('open-box-dialog', 'block'); 
			this.openBox = this.canOpenBox > this.maxOpenOne ? this.maxOpenOne : this.canOpenBox || 0;
		},

		getTxUrl(tx) {
			return WalletConfig.ETH.view_tx_url + tx;
		},
		showHistoryDialog(item) {
			let { tokenIds, ids, amounts, tokens } = item;

			let showHistoryArr = [];
			//先生成721的数据
			tokenIds.map((item, key) => {
				let {category,hashrate,prototype,quality,specialty} = tokens[key];
				showHistoryArr.push({
					prototype,
					quality,
					category,
					level: 1,
					specialty,
					hashrate,
					lvHashrate: hashrate,
					vType: parseInt(prototype / 1e4),
					num: 1,
					tokenId: item,
				});
			});
			//再生成1155的数据
			ids.map((item, key) => {
				if (item == 0) return;
				let { quality, category } = BaseConfig.NftCfg[item];
				showHistoryArr.push({
					prototype: item,
					quality,
					category,
					level: 1,
					specialty: 0,
					hashrate: quality,
					lvHashrate: quality,
					vType: parseInt(item / 1e4),
					num: Number(amounts[key]),
					tokenId: 0,
				});
			});
			showHistoryArr.sort((a, b) => {
				return b.lvHashrate - a.lvHashrate;
			});
			this.showHistoryArr = showHistoryArr;
			this.oprDialog("open-box-history-dialog", "block");
		},
		getTimeFtt(timeStep) {
			return Common.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(timeStep * 1000));
		},
		//查询宝石合约是被授权
		async isApprove(){
			await Wallet.ETH.getAccount();
			let newBoxApproveToMinter = await Wallet.ETH.isApprovedForAll(WalletConfig.ETH.newBoxToken, WalletConfig.ETH.moMoMinter);
			if(newBoxApproveToMinter != null){
				this.newBoxApproveToMinter= newBoxApproveToMinter;
			}
		},
		async approve(){
			let hash = await Wallet.ETH.approvedForAll(WalletConfig.ETH.newBoxToken, WalletConfig.ETH.moMoMinter, ()=>{
				console.log("approve recipt");
				this.isApprove();
			});
			if(hash){
				this.lockBtnMethod("approveLock");
			}
		},
		async addBox(num) {
			if(Number(num) == 0){
				this.showNotify(this.$t("BOX_30"), "error");
				return;
			}
			if (Number(num) > Number(this.boxNum)) {
				this.showNotify(this.$t("BOX_30"), "error")
				return;
			}
			if (this.ethState.canOpenBox > 0) {
				this.showNotify(this.$t("BOX_29"), "error")
				return;
			}
		
			let hash = await Wallet.ETH.addMysteryBox(num);
			if(hash){
				this.oprDialog("get-box-dialog", "none");
				this.showNotify(this.$t("BOX_20"), "success");
			}
		},

		//默认打开并质押
		async open(num, stake = false) {
			if(num == 0){
				this.showNotify(this.$t("BOX_30"), "error");
				return;
			}
			if (this.canOpenBox >= num) {
				this.showOpenAnimation = true;
				let hash;
				if(stake){
					hash = await Wallet.ETH.openBoxAndStake(num);
				}else{
					hash = await Wallet.ETH.openBox(num)
				}
				if (hash) {
					//播放箱子动画
					this.shakeBox();
					this.oprDialog("open-box-dialog", "none");

					let myAddr = await Wallet.ETH.getAccount();
					//临时添加一条记录
					let tempRecord = {
						address: myAddr,
						amount: num,
						amounts: [],
						chain: "ETH",
						crtime: Number((new Date().valueOf() / 1000).toFixed(0)) + 60,
						event: "MintBox",
						id: 0,
						ids: [],
						state: 0,
						tokenIds: [],
						tokens: [],
						tx: hash,
					};
					let { openBoxTemp } = this.ethState;
					openBoxTemp.unshift(tempRecord);
					this.$store.commit("ethState/setData", {openBoxTemp,});

					this.$store.commit("globalState/lockBtn", "openBoxLock");
				}
			} else {
				this.showNotify(this.$t("BOX_30"), "error")
			}
		},

		//箱子抖动
		shakeBox(){
			window.$(".box-show").removeClass("box-show-open");
			this.boxSpine.config.loop = true;
			this.boxSpine.setAnimation("open1", true);
		},

		testOpenAnime2(){
			if(this.testArr.length == 0) return;
			
			this.petDataArr = [];
			this.$nextTick(()=>{
				//开始spine动画
				$(".box-show").addClass("box-show-open");
				this.boxSpine.config.loop = false;
				this.boxSpine.setAnimation("open2", {
					complete: async ()=>{
						$(".box-show").removeClass("box-show-open");
						this.boxSpine.setAnimation("jingzhen");
						document.querySelector("#show-card-v2").classList.remove("hide");
						//单张直接打开
						if(this.testArr.length == 1){
							this.petDataArr = this.testArr;
							await Common.sleep(400);
							this.openOneCard();
						}else{
							for (let index = 0; index < this.testArr.length; index++) {
								this.petDataArr.push(this.testArr[index]);
								await Common.sleep(50);
							}
							await Common.sleep(400);
							$("#show-card-btn").removeClass("hide");
						}
					}
				});
			})
		},

		previewOpen(){
			if(this.petDataArr.length > 0) return;
			$(".box-show").addClass("box-show-open");
			this.boxSpine.config.loop = false;
			this.boxSpine.setAnimation("open2", {
				complete: async ()=>{
					$(".box-show").removeClass("box-show-open");
					this.boxSpine.setAnimation("jingzhen");
					this.showPreview = true;
					let num = this.getRandomInt(0, 200);
					console.log(num);
					let vType = 0;
					if(num <= 70){
						vType = "v1";
					}
					if(num <= 120 && num > 70){
						vType = "v2";
					}
					if(num <= 160 && num > 120){
						vType = "v3";
					}
					if(num <= 190 && num > 160){
						vType = "v4";
					}
					if(num > 190){
						vType = "v5";
					}
					let arr = this.getMoMoVType[vType];
					let pos = this.getRandomInt(0, arr.length-1);
					let pType = arr[pos];
					this.previewMomo = BaseConfig.NftCfg[pType];
					this.previewMomo.vType = this.getVType(pType);
				}
			})
		}
		
	},
};
</script>

<style scoped>
.momo-show-momo{
	position: absolute;
	width: 100%;
	left: 0px;
	top: 0px;
}
.preview{
	position: fixed;
	top: 0px; left: 0px; bottom: 0px; right: 0px;
	background: rgba(0,0,0,0.8);
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
}
.preview-content{
	width: 90%;
	max-width: 430px;
	padding: 20px;
}
.pie {
	width: 260px; height: 260px;
	border-radius: 50%;
	background: conic-gradient(#80E220 0, #80E220 35%,#618FFC 0, #618FFC 47%, #AE20E2 0, #AE20E2 49.5%, #FD820B 0, #FD820B 50%, #D8D8D8 0);
}
.pie-mask{
	position: absolute;
	top: 30px; left: 30px; bottom: 30px; right: 30px;
	background: #1C222C;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
#show-rate{
	position: absolute;
	right: 0px;
	top: 0px;
	display: none;
	z-index: 99;
}
.animate__slideInUp{
	animation-name: slideInUp !important;
	position: relative;
}
@keyframes slideInUp{
	0% {
		top: 100%;
	}
	100% {
		top: 50%;
	}
}

.opa-0{
	opacity: 0;
}

#show-card-bg{
	height: 100vh;
}

@media (max-width: 768px) {
	#show-rate{
		display: block;
	}
	#show-card-bg{
		transform: scale(0.7);
	}
}
#show-card-bg img{
	width: 150px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.5s;
}
#show-card-bg > div{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.2s cubic-bezier(0.5,0.25,0,1);
	width: 137px;
	height: 190px;
}
.open-pet{
	height: 100%;
	position: relative;
	transition: all 1s;
}
#show-card-bg .card{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(0.9);
	opacity: 1;
	z-index: 999;
	transition: all 1s;
}

#show-card-bg .card-v4{
	top: 55%;
	transform: translate(-50%, -50%) scale(0.83);
}
#show-card-bg .card-v5{
	top: 50%;
	transform: translate(-50%, -50%) scale(0.83);
}

#show-card-btn{
	position: absolute;
	bottom: 20%;
	width: 100%;
}

#show-card-v2{
	background: rgba(0,0,0,0.8);
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 999999999;
}
.back-show-card{
	position: absolute;
	/* top:-8px;
	left: 5px; */
	top: 2px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	z-index: 99998;
	display: none;
	text-align: center;
}
.back-show-card .pet_item{
	width: 322px;
	height: 256px;
	zoom: 0.68;
	margin-left: 0px;
	margin-top: 0px;
	display: inline-block;
	margin: 0px auto;
}
.card-spine{
	position: absolute;
	left: -141px;
	top: -92px;
	z-index: 99998;
	height: 360px;
	width: 504px;
}
.box-show{
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
}
.box-show-open{
	position: fixed;
	top: 0px;
	bottom: 0px;
	right: 0px;
	z-index: 999998;
	background: rgba(0,0,0,0.8);
	left: 0px;
}
.box-show-open .box-spine{
	
	top: calc(50vh - 150px);
	position: relative;
}
.box-spine{
	margin: 0px auto;
	width: 634px;
	height: 300px;
	
	/* position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	height: 100vh;
	width: 100%; */
	/* width: 800px; */
	/* padding-bottom: calc(50vh - 100px);
	border: 1px solid red; */
	zoom: 1;
}
.box-spine canvas{
	width: 100% !important;
	height: 100% !important;
	/* background: red; */
}
.buy-key-btn{
	height: 25px;
	background: rgb(73, 73, 73);
	color: #ebebeb;
	border: none;
	border-radius: 25px;
	font-size: 12px;
	cursor: pointer;
	padding: 0px 10px;
}

.buy-key-btn:hover{
	background: #555555;
	color: #ebebeb;
}

.card-cont-row{
	display: flex;
	flex: 2;
	justify-content: center;
	align-items: center;
	flex-direction:column;
}

.animate__animated.animate__zoomIn {
  --animate-duration: 0.5s;
}

.show-card-item{
	width: 100%;
	width: 220px;
	height: 180px;
	margin: 20px 0px;
	position: relative;

	/* animation: heartBeatMy, shakeX, flipX forwards;
	animation-duration: 0.6s, 0.6s,0.6s;
	animation-delay: 0.6s, 1.2s, 1.8s;

	-webkit-animation: heartBeatMy, shakeX, flipX forwards;
	-webkit-animation-duration: 0.6s, 0.6s,0.6s;
	-webkit-animation-delay: 0.6s, 1.2s, 1.8s; */

	transition: 0.6s;
	transform-style: preserve-3d;
	transform: rotateX(0deg);
	-webkit-transition: 0.6s;
	-webkit-transform-style: preserve-3d;
	-webkit-transform: rotateX(0deg);
	
}

.show-card-item.animation{
	animation: heartBeatMy forwards, shakeX forwards, flipX forwards; ;
	animation-duration: 0.6s, 0.6s,0.6s;
	animation-delay: 0.6s, 1.2s, 1.8s;

	-webkit-animation: heartBeatMy forwards, shakeX forwards, flipX forwards;
	-webkit-animation-duration: 0.6s, 0.6s,0.6s;
	-webkit-animation-delay: 0.6s, 1.2s, 1.8s;

	transform: rotateX(0deg);
	-webkit-transform: rotateX(0deg);
}
/* .show-card-item.animation{
	animation: flipX forwards; ;
	animation-duration: 0.6s, 0.6s,0.6s;
	animation-delay: 0.6s, 1.2s, 1.8s;

	-webkit-animation: heartBeatMy forwards, shakeX forwards, flipX forwards;
	-webkit-animation-duration: 0.6s, 0.6s,0.6s;
	-webkit-animation-delay: 0.6s, 1.2s, 1.8s;

	transform: rotateX(0deg);
	-webkit-transform: rotateX(0deg);
} */

.front,
.back {
	backface-visibility: hidden;
	position: absolute;
	left: 0px;
	top: 0px;
	bottom: 0px;
	right: 0px;
}

.front {
	z-index: 2;
}

.back {
	transform: rotateX(180deg);
}

@keyframes flipX {
  0% {
    -webkit-transform: perspective(1000px) translateZ(0) rotateX(0) scale(1);
    transform: perspective(1000px) translateZ(0) rotateX(0) scale(1);
  }
  100% {
    -webkit-transform: perspective(1000px) translateZ(0) rotateX(180deg) scale(1);
    transform: perspective(1000px) translateZ(0) rotateX(180deg) scale(1);
  }
}

@keyframes heartBeatMy {
	0%  { transform: scale(1);-webkit-transform: scale(1);}
	14%  { transform: scale(1.1);-webkit-transform: scale(1.1);}
	28%  { transform: scale(1);-webkit-transform: scale(1);}
	42%  { transform: scale(1.1);-webkit-transform: scale(1.1);}
	70%  { transform: scale(1);-webkit-transform: scale(1);}
}
@-webkit-keyframes heartBeatMy {
	0%  { transform: scale(1);-webkit-transform: scale(1);}
	14%  { transform: scale(1.1);-webkit-transform: scale(1.1);}
	28%  { transform: scale(1);-webkit-transform: scale(1);}
	42%  { transform: scale(1.1);-webkit-transform: scale(1.1);}
	70%  { transform: scale(1);-webkit-transform: scale(1);}
}

#show-card-cont{
	/* width: calc(90vh * 9 / 16); */
	width: 1000px;
	margin: 0px auto;
	margin-top: 5vh;
	height: 90vh;
	display: flex;
}
#show-card{
	position: fixed;
	background: rgba(0,0,0,0.8);
	width: 100%;
	height: 100vh;
	top: 0px;
	left: 0px;
	z-index: 999999;
}
#openbox-anime-new{
	height: 300px;
	position: absolute;
	left: -5px;
	top: 30px;
}
#opr-btn button {
	width: 200px;
	margin: 10px 20px;
}
#my-box-num {
	background: #1d2b50;
	height: 40px;
	border-radius: 30px;
	padding: 0px 30px;
	line-height: 40px;
	font-size: 16px;
	margin-top: 60px;
}
#openbox-anime {
	margin: 50px 0px;
}

@media (max-width:1200px) {
	#show-card-cont{
		width: 100% !important;
	}

	.show-card-item{
		zoom: 0.5;
	}
	.box{
		zoom: 0.5;
	}

	/* .show-card-item > img,.show-card-item > .front >img{
		zoom: 0.45;
	}
	.card-spine{
		zoom: 0.45 !important;
		left: 89px;
		border: 1px solid red;
		width: 100%;
	}

	.show-card-item {
		margin: 10px;
		zoom: 0.5;
	}

	.show-card-item   .pet_item{
		width: 350px !important;
		zoom: 0.3 !important;
		display: inline-block;
		margin: 0px auto;
	} */

	.show-card-item   .pet_item{
		width: 322px !important;
		height: 256px;
		zoom: 0.68;
		margin-left: 0px;
		margin-top: 0px;
		display: inline-block;
		margin: 0px auto;
	}


}

@media (max-width: 768px) {
	/* #show-card-cont{
		width: 100% !important;
	} */

	.rate-show{
		zoom: 0.8;
		padding: 5px 20px !important;
	}

	.box-section{
		padding-bottom: 0px !important;
		border: none !important;
		background: none !important;
	}
	
	.table-his td{
		padding: 5px;
	}
	.box-spine{
		width: 606px;
		transform: translateX(-50%);
		left: 50%;
		top: -30%;
		position: absolute;
		zoom: 1.5;
		/* zoom: 0.5; */
		/* top: calc(100vh - 300px) !important; */
	}
	.box{
		zoom:0.5;
		
	}
	/* .box-spine{
		zoom: 0.8 !important;
		height: 200vh !important;
		padding-bottom: calc(100vh - 100px) !important;
		transform: translate(-50%, -50%);
	} */
	/* .box-show-open .box-spine{
		width: 150%;
		transform: translate(-50%, -50%);
	} */

	.show-card-item{
		zoom: 0.4;
	}

}

.animation-box {
	width: 256px;
	height: 256px;
	background-image: url("../../assets/anime/box.png");
	background-size: 2048px 256px;
	background-repeat: no-repeat;
	animation-duration: 0.6s;
	animation-delay: 0s;
	animation-iteration-count: infinite;
	animation-fill-mode: forwards;
	animation-timing-function: steps(1);
	display: inline-block;
}

.animation-box-start {
	animation-name: keyframes-box;
}

@keyframes keyframes-box {
	0% {
		width: 256px;
		height: 256px;
		background-image: url("../../assets/anime/box.png");

		background-size: 2048px 256px;
	}

	12.50% {
		background-position: -256px 0px;
	}

	25.00% {
		background-position: -512px 0px;
	}

	37.50% {
		background-position: -768px 0px;
	}

	50.00% {
		background-position: -1024px 0px;
	}

	62.50% {
		background-position: -1280px 0px;
	}

	75.00% {
		background-position: -1536px 0px;
	}

	87.50%,
	100% {
		background-position: -1792px 0px;
	}
}
.adv-panel:before{
	background: linear-gradient(145deg,#066EFF 0%, #000  100%);
}
</style>
