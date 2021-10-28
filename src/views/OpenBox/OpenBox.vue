<template>
	<div id="openbox" class="tac center-box">
		<div class="clear mgt-10">
			<div class="hide" id="tmp" ref="tmp"></div>
			<section class="col-md-7" style="padding:10px">
				<div class="adv-panel por box-section" style="padding-bottom:45px">
					<p class="opa-6 mgt-20">{{ $t("BOX_01") }}</p>
					<h1 class="dib mgt-10" style="font-size: 20px">
						{{ totalOpenBoxAmount.bnb }}
					</h1>
					<div class="por box"  style="height:300px; margin:0px auto; ">
						<div class="box-show" >
							<div id="box-spine" ref="boxSpine"></div>
						</div>
					</div>
					<div class="card-spine hide"></div>
					<div id="show-card" class="hide" @click="initCardAnime">
						<div id="show-card-cont" class="animate__animated  animate__zoomIn">
							<div :style="`flex: ${posArr[petDataArr.length].flexNum}`"></div>
							<div v-if="posArr[petDataArr.length].line1" class="card-cont-row"  id="show-card-cont-row1">
								<div class="show-card-item dib cur-point" v-for="key in posArr[petDataArr.length].line1" :key="key+10"  :data-key="key" @click="openCard">
									<div class="front">
										<img src="@/assets/momo-back2.png" width="225" height="180" alt=""/>
									</div>
									<!-- <div class="card-spine"></div> -->
									<div class="back-show-card">
										<PetItem  v-bind:data="{ item: petDataArr[key-1] }" />
									</div>
								</div>
							</div>
							<div v-if="posArr[petDataArr.length].line2" class="card-cont-row "   id="show-card-cont-row2">
								<div class="show-card-item dib cur-point" v-for="key in posArr[petDataArr.length].line2" :key="key+20"  @click="openCard">
									<div class="front">
										<img src="@/assets/momo-back2.png" width="225" height="180" alt=""/>
									</div>
									<div class="back-show-card">
										<PetItem  v-bind:data="{ item: petDataArr[key + posArr[petDataArr.length].line1 - 1 ] }" />
									</div>
								</div>
							</div>
							<div v-if="posArr[petDataArr.length].line3" class="card-cont-row"   id="show-card-cont-row3" >
								<div class="show-card-item dib cur-point " v-for="key in posArr[petDataArr.length].line3" :key="key+30"  @click="openCard">
									<div class="front">
										<img src="@/assets/momo-back2.png" width="225" height="180" alt=""/>
									</div>
									<div class="back-show-card">
										<PetItem  v-bind:data="{ item: petDataArr[key + posArr[petDataArr.length].line1 + posArr[petDataArr.length].line2 -1] }" />
									</div>
								</div>
							</div>
							<div :style="`flex: ${posArr[petDataArr.length].flexNum}`"></div>
						</div>
					</div>

					<div style="padding:10px 0px;position:absolute;bottom:0px;width:100%;left:0px;background:#1F232A;border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;" class="tal rate-show">
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

					<!-- <button class="btn-primary " @click="playBoxAnime">抖动 1</button>
					<button class="btn-primary mgl-5" @click="testOpenAnime">打开 1</button>-->

					<!-- <button class="btn-primary mgl-10" @click="shakeBox">抖动 2</button>
					<button class="btn-primary mgl-5" @click="testOpenAnime2">打开 2</button>  -->
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
								<input class="ly-input" type="number"
									style=" text-align: left; width: 100%; padding-left:65px"
									readonly="readonly"
									:value="boxNum"
								/>
							</div>
							<p class="small opa-6 mgt-10 tal">{{$t("BOX_39")}}</p>
							<div class="aveage-box">
								<div class="tal">
									<button class="btn-primary mgt-20" style="width: 90%" @click="setAction(23001); oprDialog('get-box-dialog', 'block'); addKey = parseInt(boxNum) || 0; ">
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
								<input class="ly-input" type="number"
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
								<div></div>
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
					<tr v-for="item in getOpenBoxHistory" :key="item.tx">
						<td class="tal tac-xs">{{ getTimeFtt(item.crtime) }}</td>
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
						v-int :data-max="parseInt(boxNum) || 0"  v-model="addKey" />
					<div class="dib" style="width: 30%">
						<button @click="addKey = parseInt(boxNum) || 0" class="btn-primary btn-small" style="width: 80%" >
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
	</div>
</template>

<script>
import { mapState } from "vuex";
import { Wallet, Common, EventBus } from "@/utils";
import { Dialog, PetItemSmall, PetItem, StatuButton, Loading } from '@/components';
import CommonMethod from "@/mixin/CommonMethod";
import { BaseConfig, WalletConfig, EventConfig } from "@/config";
const $ = window.$;

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { Dialog, PetItemSmall, PetItem, StatuButton, Loading },
	data() {
		return {
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
				{category: 5,hashrate: 120,level: 1,lvHashrate: 120,num: 1,prototype: '50092',quality: 6,specialty: 0,tokenId:0,vType: 5, chain:'bnb', tokenName:'Name_338',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '21001',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'Name_1',isOpenCard:true},
				{category: 3,hashrate: 40,level: 1,lvHashrate: 40,num: 1,prototype: '43025',quality: 6,specialty: 0,tokenId:0,vType: 4, chain:'bnb', tokenName:'Name_296',isOpenCard:true},

				// {category: 2,hashrate: 20,level: 1,lvHashrate: 2,num: 1,prototype: '43014',quality: 5,specialty: 0,tokenId:0,vType: 5, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '23020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '43014',quality: 4,specialty: 0,tokenId:0,vType: 5, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				// {category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
			],

			petDataArr:[],

			posArr:[
				{line1:0,line2:0,line3:0, flexNum:0},
				{line1:0,line2:1,line3:0, flexNum:2},
				{line1:1,line2:0,line3:1, flexNum:1},
				{line1:1,line2:1,line3:1, flexNum:0},
				{line1:2,line2:0,line3:2, flexNum:1},
				{line1:2,line2:1,line3:2, flexNum:0},
				{line1:2,line2:2,line3:2, flexNum:0},
				{line1:2,line2:3,line3:2, flexNum:0},
				{line1:2,line2:4,line3:2, flexNum:0},
				{line1:3,line2:3,line3:3, flexNum:0},
				{line1:3,line2:4,line3:3, flexNum:0},
			],

			boxSpine: null,
			cardSpines: [],

			newBoxApproveToMinter: "-",

			
		};
	},
	computed: {
		...mapState({
			ethState: (state) => state.ethState.data,
			totalOpenBoxAmount: (state) => state.globalState.data.totalOpenBoxAmount,
			lockBtn: (state) => state.globalState.data.lockBtn,
			boxNum: (state) => state.gemState.data.boxNum,
			hasLoadSpine: (state) => state.globalState.data.hasLoadSpine,
		}),
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
				historyObj[item.tx] = item;
			});
			openBoxTemp.map((item, index) => {
				if (historyObj[item.tx] == undefined) {
					historyObj[item.tx] = item;
				}else{
					
					openBoxTemp.splice(index, 1);
					//显示开箱子
					console.log("start show");
					this.petDataArr = [];
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
					this.petDataArr = showArr;
					this.$nextTick(()=>{
						this.openAnime();
					})
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
		}
	},



	mounted() {
		this.preLoadRes();
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
	
	methods: {
		preLoadRes(){
			let arr = ["v1/v1","v2/v2","v3/v3","v4/v4","v5/v5","v1/end","v4/end","v5/end"];
			let pos = 0;
			if(this.hasLoadSpine) return;
			let t = setInterval(()=>{
				if(pos >= arr.length-1){
					clearInterval(t);
					this.$store.commit("globalState/setData", {hasLoadSpine: true});
				}
				let spineName = arr[pos];
				try {
					new window.spine.SpineWidget(this.$refs.tmp, {
						json: `./animation/cardAnime/${spineName}.json`,
						atlas: `./animation/cardAnime/${spineName}.atlas`,
						backgroundColor: "#00000000",
						loop: false,
						fitToCanvas: false,
						animation: spineName.indexOf("end") != -1?"jieshu":"zhuandong",
					});
				} catch (error) {
					clearInterval(t);
				}
				pos++;
			}, 1000)
		},
		renderBoxSpine(){
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
			console.log(item);

			let showHistoryArr = [];
			//先生成721的数据
			tokenIds.map((item, key) => {
				let {category,hashrate,prototype,quality,specialty} = tokens[(item, key)];
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
			console.log(showHistoryArr);
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
		//箱子打开
		openAnime(){
			this.isAnimation = true;
			//开始spine动画
			window.$(".box-show").addClass("box-show-open");
			this.boxSpine.config.loop = false;
			this.boxSpine.setAnimation("open", {
				complete: async ()=>{
					document.querySelector("#show-card").classList.remove("hide");
					let $cards = $(".show-card-item");

					setTimeout(()=>{
						this.isAnimation = false;
					}, 880 * $cards.length)

					for (let index = 0; index < $cards.length; index++) {
						const $element = $cards[index];
						await Common.sleep(800);
						$element.click();
					}
				}
			});
		},
		testOpenAnime2(){
			this.petDataArr = [];
			this.$nextTick(()=>{
				this.petDataArr = [...this.testArr];
				this.isAnimation = true;
				//开始spine动画
				window.$(".box-show").addClass("box-show-open");
				this.boxSpine.config.loop = false;
				this.boxSpine.setAnimation("open2", {
					complete: async ()=>{
						document.querySelector("#show-card").classList.remove("hide");
						let $cards = $(".show-card-item");

						setTimeout(()=>{
							this.isAnimation = false;
						}, 880 * $cards.length)

						for (let index = 0; index < $cards.length; index++) {
							const $element = $cards[index];
							await Common.sleep(800);
							$element.click();
						}
					}
				});
			})
		},

		openCard(e){
			e.stopPropagation();
			let $front = $(e.currentTarget).children(".front");
			if($front.css("display") == "none"){
				if(this.isAnimation == false){
					this.initCardAnime();
				}
				return;
			}

			// let element = $(e.currentTarget).children(".card-spine")[0];
			let element = $(".card-spine").show()[0];
			let $backCard = $(e.currentTarget).children(".back-show-card");
			let pet_item_vtype = $backCard.children(".pet_item").data("vtype");

			let spineName = "v" + pet_item_vtype;

			$(e.currentTarget).append(element);
			$(".card-spine").hide();
			
			let sp = new window.spine.SpineWidget(element, {
				json: `./animation/cardAnime/${spineName}/${spineName}.json`,
				atlas: `./animation/cardAnime/${spineName}/${spineName}.atlas`,
				backgroundColor: "#00000000",
				animation: "zhuandong",
				loop: false,
				fitToCanvas: false,
				scale:0.2,
				x: 250,
				y: 90,
				success: (play)=>{
					play.state.timeScale = 2;
					$(".card-spine").show();
					$front.hide();
					setTimeout(()=>{
						this.renderEndAnime(element, $backCard, spineName);
					}, 300)
				},
			});

			this.cardSpines.push(sp);

		},

		renderEndAnime(element, $backCard, spineName){
			$(element).css("zIndex", 999999);
			if(Number(spineName[1]) < 4) spineName = "v1";

			let sp = new window.spine.SpineWidget(element, {
				json: `./animation/cardAnime/${spineName}/end.json`,
				atlas: `./animation/cardAnime/${spineName}/end.atlas`,
				backgroundColor: "#00000000",
				animation: "jieshu",
				loop: false,
				fitToCanvas: false,
				scale:0.2,
				x: 250,
				y: 90,
				success: (play)=>{
					if(spineName == "v5") play.state.timeScale = 2;
					$backCard.show();
				}
			});
			this.cardSpines.push(sp);
		},

		initCardAnime(){
			if(this.isAnimation) return;
			$(".card-spine").hide().appendTo("#openbox");
			document.querySelector("#show-card").classList.add("hide");
			$(".back-show-card").hide();
			$(".front").show();

			$(".box-show").removeClass("box-show-open");
			this.petDataArr = [];
			this.boxSpine.config.loop = false;
			this.boxSpine.setAnimation("jingzhen", true);
		}
		
	},
};
</script>

<style scoped>
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
.box-show-open #box-spine{
	
	top: calc(50vh - 150px);
	position: relative;
}
#box-spine{
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
#box-spine canvas{
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
		padding-bottom: 30px;
	}
	
	.table-his td{
		padding: 5px;
	}
	#box-spine{
		width: 606px;
		/* zoom: 0.5; */
		/* top: calc(100vh - 300px) !important; */
	}
	.box{
		zoom:0.5;
		
	}
	/* #box-spine{
		zoom: 0.8 !important;
		height: 200vh !important;
		padding-bottom: calc(100vh - 100px) !important;
		transform: translate(-50%, -50%);
	} */
	/* .box-show-open #box-spine{
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
