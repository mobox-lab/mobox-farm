<template>
	<div id="openbox" class="tac center-box">
		<div class="clear mgt-10">
			<section class="col-md-7" style="padding:10px">
				<div class="adv-panel">
					<p class="opa-6 mgt-20">{{ $t("BOX_01") }}</p>
					<h1 class="dib mgt-10" style="font-size: 20px">
						{{ totalOpenBoxAmount.bnb }}
					</h1>
					<br />
					<div class="por box"  style="height:300px;width:300px; margin:0px auto; ">
						<div id="openbox-anime-new" class="hide"></div>
						<!-- <div class="animation-box mgt-50 hide" id="openbox-anime"></div> -->
						<div class="box-show" @click="playBoxAnime2">
							<div id="box-spine"></div>
						</div>
					</div>
					<div id="show-card" class="hide" @click="initCardAnime">
						<div id="show-card-cont" class="animate__animated  animate__zoomIn">
							<div :style="`flex: ${posArr[petDataArr.length].flexNum}`"></div>
							<div v-if="posArr[petDataArr.length].line1" class="card-cont-row"  id="show-card-cont-row1">
								<div class="show-card-item dib cur-point" v-for="key in posArr[petDataArr.length].line1" :key="key+10" v-on:animationend="animationend" @click="openCard">
									<img style="opacity:0" src="../assets/momo-back.png" width="252" height="180" alt=""/>
									<div class="front">
										<img src="../assets/momo-back.png" width="252" height="180" alt=""/>
									</div>
									<div class="back">
										<PetItem style="zoom:0.72" v-bind:data="{ item: petDataArr[key-1] }" />
									</div>
								</div>
							</div>
							<div v-if="posArr[petDataArr.length].line2" class="card-cont-row "   id="show-card-cont-row2">
								<div class="show-card-item dib cur-point" v-for="key in posArr[petDataArr.length].line2" :key="key+20" v-on:animationend="animationend" @click="openCard">
									<img style="opacity:0" src="../assets/momo-back.png" width="252" height="180" alt=""/>
									<div class="front">
										<img src="../assets/momo-back.png" width="252" height="180" alt=""/>
									</div>
									<div class="back">
										<PetItem style="zoom:0.72" v-bind:data="{ item: petDataArr[key + posArr[petDataArr.length].line1 - 1 ] }" />
									</div>
								</div>
							</div>
							<div v-if="posArr[petDataArr.length].line3" class="card-cont-row"   id="show-card-cont-row3" >
								<div class="show-card-item dib cur-point " v-for="key in posArr[petDataArr.length].line3" :key="key+30" v-on:animationend="animationend" @click="openCard">
									<img style="opacity:0" src="../assets/momo-back.png" width="252" height="180" alt=""/>
									<div class="front">
										<img src="../assets/momo-back.png" width="252" height="180" alt=""/>
									</div>
									<div class="back">
										<PetItem style="zoom:0.72" v-bind:data="{ item: petDataArr[key + posArr[petDataArr.length].line1 + posArr[petDataArr.length].line2 -1] }" />
									</div>
								</div>
							</div>
							<div :style="`flex: ${posArr[petDataArr.length].flexNum}`"></div>
						</div>
					</div>
					<br />

					<button class="btn-primary " @click="playBoxAnime">抖动 1</button>
					<button class="btn-primary mgl-5" @click="openAnime">打开 1</button>

					<button class="btn-primary mgl-10" @click="playBoxAnime2">抖动 2</button>
					<button class="btn-primary mgl-5" @click="openAnime2">打开 2</button>
				</div>
			</section>

			<section class="col-md-5" style="padding:10px">
				<div >
					<div  >
						<div class="ly-input-content dib" style="width:100%;padding:40px 20px">
							<p class="tal">{{ $t("BOX_02") }}:</p>
							<div class="por mgt-10">
								<div class="ly-input-pre-icon">
									<img  src="../assets/coin/KEY.png" alt="" />
								</div>
								<input class="ly-input" type="number"
									style=" text-align: left; width: 100%; padding-left:65px"
									readonly="readonly"
									:value="ethState.box"
								/>
							</div>
							<div class="aveage-box">
								<div class="tal">
									<button class="btn-primary mgt-20" style="width: 90%" @click=" oprDialog('get-box-dialog', 'block'); addKey = parseInt(ethState.box) || 1; ">
										{{ $t("BOX_04") }}
									</button>
								</div>
								<div class="tar">
									<button class="mgt-20 btn-line" style="width:90%;" @click="$root.$children[0].$refs.pancake.setOprData({coinKey: 'KEY-BNB-V2', pancakeVType: 2}).show('swap')">
										{{$t("BOX_33")}}
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class=" mgt-20" >
						<div class="ly-input-content dib" style="width:100%;padding:40px 20px">
							<p class="tal">{{ $t("BOX_03") }}:</p>
							<div class="por mgt-10">
								<div class="ly-input-pre-icon">
									<img src="../assets/icon/box.png" alt="" />
								</div>
								<input class="ly-input" type="number"
									style="text-align: left; width: 100%; padding-left:65px"
									:value="canOpenBox"
									readonly="readonly"
								/>
							</div>
							<div class="aveage-box">
								<div class="tal">
									<StatuButton class="mgt-20" style="width: 90%" :isDisable="lockBtn.openBoxLock > 0" :isLoading="lockBtn.openBoxLock > 0" :onClick="showOpenBox.bind(this)">
										{{ $t("BOX_05") }}
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
							<img v-if="item.event == 'MintBox' && item.state == 1" @click="showHistoryDialog(item)" height="25" src="../assets/icon/view.png" alt="" class="cur-point" />&nbsp;
							<a :href="getTxUrl(item.tx)" target="_blank">
								<img src="../assets/icon/viewTx.png" alt="" class="cur-point" height="25" />
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
			<h2 class="mgt-10">{{ $t("BOX_04") }}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{ $t("BOX_06") }}:</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon">
						<img  src="../assets/coin/KEY.png" alt="" />
					</div>
					<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="parseInt(ethState.box) || 1" data-min="1" v-model="addKey" />
					<div class="dib" style="width: 30%">
						<button @click="addKey = parseInt(ethState.box) || 1" class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<div class="vertical-children tal mgt-10">
				<span class="small opa-6"> {{ $t("BOX_07") }}: {{ addKey }} </span>
				<img src="../assets/icon/box.png" height="20" alt="" />
			</div>
			<div class="mgt-20 tal">
				<p class="small opa-6" v-html="$t('BOX_08')"></p>
			</div>

			<div  :class="needApprove?'btn-group':''" class="mgt-20">
				<StatuButton :onClick="approve.bind(this)"  data-step="1" style="width: 80%" v-if="needApprove" :isLoading="lockBtn.approveLock > 0" :isDisable="lockBtn.approveLock > 0">
					{{ $t("Air-drop_16") }} KEY
				</StatuButton>
				<button data-step="2" @click="addBox(addKey)" class="btn-primary mgt-10 por" style="width: 80%; margin-bottom: 20px" :class="needApprove?'disable-btn':''">
					{{ $t("BOX_09") }}
				</button>
			</div>
			
		</Dialog>
		<Dialog id="open-box-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{ $t("BOX_05") }}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{ $t("BOX_10") }}:</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon"> <img  src="../assets/icon/box.png" alt="" /> </div>
					<input class="ly-input dib" type="text"
						style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="maxOpenOne" data-min="1" v-model="openBox" />
					<div class="dib" style="width: 30%">
						<button @click=" openBox = canOpenBox > maxOpenOne ? maxOpenOne : canOpenBox || 1 " class="btn-primary btn-small" style="width: 80%" >
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
import lottie from "lottie-web";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { Dialog, PetItemSmall, PetItem, StatuButton, Loading },
	data() {
		return {
			showHistoryArr: [],
			openBox: 1,
			addKey: 1,
			eventToLang: {
				HashBox: "BOX_24",
				AddBox: "BOX_23",
				MintBox: "BOX_25",
			},
			maxOpenOne: 10,
			openLottie: null,
			showOpenBoxCard: [],

			testArr: [
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '50080',quality: 5,specialty: 0,tokenId:0,vType: 5, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '43014',quality: 4,specialty: 0,tokenId:0,vType: 5, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
				{category: 2,hashrate: 2,level: 1,lvHashrate: 2,num: 1,prototype: '22020',quality: 2,specialty: 0,tokenId:0,vType: 2, chain:'bnb', tokenName:'aaa',isOpenCard:true},
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
		};
	},
	computed: {
		...mapState({
			ethState: (state) => state.ethState.data,
			totalOpenBoxAmount: (state) => state.globalState.data.totalOpenBoxAmount,
			lockBtn: (state) => state.globalState.data.lockBtn,
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
		EventBus.$emit(EventConfig.OpenBoxHistory, { chain: "eth" });

		timer = setInterval(() => {
			if (this.ethState.openBoxTemp.length != 0) {
				EventBus.$emit(EventConfig.OpenBoxHistory, { chain: "eth" });
			}
		}, 2000);


		this.openLottie = lottie.loadAnimation({
			container: document.getElementById("openbox-anime-new"), // the dom element that will contain the animation
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: './animation/boxAnime/open.json' // the path to the animation json
		});

		this.openLottie.onComplete = function(){
			document.querySelector("#show-card").classList.remove("hide");
		}

		this.boxSpine = new window.spine.SpineWidget("box-spine", {
			json: "/animation/boxV2/baoxiang.json",
			atlas: "/animation/boxV2/baoxiang.atlas",
			backgroundColor: "#00000000",
			animation: "daiji",
			loop: true,
			fitToCanvas: false,
			scale:0.5,
			x:350,
			y: 0,
			success: ()=>{
				this.boxSpine.state.timeScale = 0.8;
			}
		});


		//如果有临时开箱子数据就让箱子继续晃动
		if(this.isOpening){
			document.getElementById("openbox-anime").classList.add("animation-box-start");
		}

	},
	beforeDestroy() {
		if (timer != null) clearInterval(timer);
	},
	methods: {
		animationend(e){
			if(e.animationName == "flipX"){
				this.isAnimation = false;
			}
		},
		showOpenBox(){
			this.oprDialog('open-box-dialog', 'block'); 
			this.openBox = this.canOpenBox > this.maxOpenOne ? this.maxOpenOne : this.canOpenBox || 1;
		},

		getTxUrl(tx) {
			return WalletConfig.ETH.view_tx_url + tx;
		},
		showHistoryDialog(item) {
			let { tokenIds, ids, amounts, tokens } = item;
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
			this.oprDialog("open-box-history-dialog", "block");
		},
		getTimeFtt(timeStep) {
			return Common.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(timeStep * 1000));
		},
		async approve() {
			let res = await Wallet.ETH.approveBoxToMinter();
			if (res) {
				this.$store.commit("globalState/lockBtn", "approveLock");
				this.showNotify(this.$t("BOX_20"), "success");
			}
		},
		async addBox(num) {
			if(this.needApprove) return;

			if (num > this.ethState.box) {
				this.showNotify(this.$t("BOX_28"), "error")
				return;
			}
			if (this.ethState.canOpenBox > 0) {
				this.showNotify(this.$t("BOX_29"), "error")
				return;
			}
			let allowance_box_to_minter = this.ethState.allowance_box_to_minter;
			if (allowance_box_to_minter == -1) {
				allowance_box_to_minter = await Wallet.ETH.boxAllowanceToMinter();
				this.$store.commit("ethState/setData", {allowance_box_to_minter,});
			}
			if (Number(allowance_box_to_minter) > Number(num)) {
				let hash = await Wallet.ETH.addBox(num);
				if(hash){
					this.oprDialog("get-box-dialog", "none");
				}
			} else {
				this.approve();
			}
		},

		//默认打开并质押
		async open(num, stake = false) {
			if (this.canOpenBox >= num) {
				let hash;
				if(stake){
					hash = await Wallet.ETH.openBoxAndStake(num);
				}else{
					hash = await Wallet.ETH.openBox(num)
				}
				if (hash) {
					//播放箱子动画
					document.getElementById("openbox-anime").classList.add("animation-box-start");
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

		playBoxAnime(){
			document.getElementById("openbox-anime").classList.add("animation-box-start");
		},

		//开箱子动画
		openAnime(){
			this.petDataArr = [];
			this.testArr[0].vType = this.testArr[0].vType == 4?5:4;
			this.petDataArr = this.testArr;
			this.$nextTick(()=>{
				this.isAnimation = true;
				document.getElementById("openbox-anime").classList.remove("animation-box-start");
				window.$("#openbox-anime").hide();
				window.$("#openbox-anime-new").show();
				window.$(".show-card-item").addClass("animation");
				if(this.openLottie) this.openLottie.goToAndPlay(0);
			})
		},

		//箱子抖动
		playBoxAnime2(){
			window.$(".box-show").removeClass("box-show-open");
			this.boxSpine.config.loop = true;
			this.boxSpine.setAnimation("doudong", true);
		},
		//箱子打开
		openAnime2(){
			this.petDataArr = [];
			this.testArr[0].vType = this.testArr[0].vType == 4?5:4;
			this.petDataArr = [...this.testArr];
			this.$nextTick(()=>{
				this.isAnimation = true;
				// window.$(".show-card-item").addClass("animation");
				//开始spine动画
				window.$(".box-show").addClass("box-show-open");
				this.boxSpine.config.loop = false;
				this.boxSpine.setAnimation("baoxiangdakai", {
					complete: ()=>{
						document.querySelector("#show-card").classList.remove("hide");
					}
				});
			})
		},

		openCard(e){
			e.stopPropagation();
			window.$(e.currentTarget).addClass("animation");
		},

		initCardAnime(){
			if(this.isAnimation) return;
			document.querySelector("#show-card").classList.add("hide");
			window.$("#openbox-anime").show();
			window.$("#openbox-anime-new").hide();
			window.$(".show-card-item").removeClass("animation");

			window.$(".box-show").removeClass("box-show-open");
			this.boxSpine.config.loop = false;
			this.boxSpine.setAnimation("daiji", true);

		}
		
	},
};
</script>

<style >
.box-show{
	position: absolute;
	top: 160px;
	left: 190px;
}
.box-show-open{
	position: fixed;
	top: 0px;
	width: 100vw;
	height: 100vh;
	z-index: 999998;
	background: rgba(0,0,0,0.8);
	left: 0px;
}
#box-spine{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	height: 100vh;
	width: 800px;
	padding-bottom: calc(50vh - 100px);
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
	animation-delay: 0, 0.6s, 1.2s;

	-webkit-animation: heartBeatMy forwards, shakeX forwards, flipX forwards;
	-webkit-animation-duration: 0.6s, 0.6s,0.6s;
	-webkit-animation-delay: 0, 0.6s, 1.2s;

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

@media (max-width:1000px) {
	#show-card-cont{
		width: 100% !important;
	}

	.show-card-item > img,.show-card-item > .front >img{
		width: 105px;
		height: 75px;
	}

	.show-card-item {
		margin: 10px;
	}

	.show-card-item   .pet_item{
		width: 350px !important;
		/* zoom: 0.5 !important; */
		transform: scale(0.42);
		-webkit-transform-origin: 4% 0%;
		transform-origin: 4% 0%;
	}


}

@media (max-width: 768px) {
	#show-card-cont{
		width: 100% !important;
	}
	
	.table-his td{
		padding: 5px;
	}
	#box-spine{
		zoom: 0.5 !important;
		height: 200vh !important;
		padding-bottom: calc(100vh - 100px) !important;
	}
}

.animation-box {
	width: 256px;
	height: 256px;
	background-image: url("../assets/anime/box.png");
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
		background-image: url("../assets/anime/box.png");

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
</style>
