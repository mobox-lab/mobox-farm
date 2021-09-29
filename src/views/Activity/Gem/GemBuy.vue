<style src="./style.css"></style>
<template>
<div class="tac center-content">
	<div class="por clear mgt-20" style="border:1px solid #5d636f80;border-radius: 30px">
		<section class="col-md-7" style="padding:10px">
			<div class="adv-panel" :class="{veapply: tabPos == 1}">
				<!-- <Tab  :list="tabList" :defaultSelectPos="tabPos" :onChange="onTabChange" style="background:#000" /> -->

				<div class="tal  dib" style="background:#000;border-radius:30px">
					<div @click="tabPos =  1 "  :class="tabPos == 1?'active':''"  class="tab-new-menu"  >{{$t("Gemstone_52")}}</div>
					<div @click="tabPos =  0 "  :class="tabPos == 0?'active':''" class="tab-new-menu " >{{$t("Gemstone_51")}}</div>
				</div>

				<h1 class="vertical-children mgt-20">
					<span>{{$t("Gemstone_02")}}</span>
					<img class="mgl-10 cur-point" @click="oprDialog('gem-rule-dialog','block')" src="@/assets/icon/help.png" alt="" height="25">
				</h1>
				<div class="tac mgt-10">
					<span v-if="getCountDown  > 8640000 ">
						{{$t("Gemstone_53")}}: {{getLeftTime(1630987200 - nowTs)}}
					</span>
					<template v-else>
						<p v-if="getCountDown >0">{{Number(applyInfo.startTime) > nowTs?$t("Gemstone_53") :$t("Gemstone_21")}}: {{getLeftTime(getCountDown)}}</p>
						<p v-else>{{$t("Gemstone_22")}}<span class="dotting"></span></p>
					</template>

					<div class="aveage-box mgt-10 " id="show-num">
						<div class="mgl-10 tac">{{tabPos == 0?$t("Gemstone_62"):$t("Gemstone_64")}}: {{getNowApplyCount[0]}}/{{getNowApplyCount[1]}}</div>
					</div>
					<div class="aveage-box" style="margin-bottom:20px">
						<div v-for="item in gemArr" :key="item.id" class="gem-apply-item ">
							<div class="por" >
								<img :src="require(`@/assets/market/${item.id}.png`)" alt="" width="100%">
								<div class="has-apply" :class="{active: myApplyGemType[tabPos] == item.id}">
									<div>
										<img src="@/assets/icon/hasapply.png" alt="" height="30">
										<p>{{$t("Gemstone_67")}}</p>
									</div>
								</div>
							</div>
							<span class="apply-num">{{applyCfg[tabPos].now[item.name]}}/{{applyCfg[tabPos].max}}</span>
							<span class="apply-rate" v-if="Number(applyCfg[tabPos].now[item.name]) < Number(applyCfg[tabPos].max)"><span class="hide-xs">{{$t("Gemstone_24")}}:</span>100%</span>
							<span class="apply-rate" v-else><span class="hide-xs">{{$t("Gemstone_24")}}:</span>{{numFloor(Number(applyCfg[tabPos].max) / Number(applyCfg[tabPos].now[item.name]) * 100, 1e2)  }}%</span>
						</div>
					</div>
					<p class="mgt-10 color-buy small">{{$t("Gemstone_13")}}</p>
					
				</div>
			</div>
		</section>

		<section class="col-md-5" style="padding:10px">
			<div class="panel por" style="height:400px;padding:10px">
				<section style="padding:10px">
						<div class="aveage-box tal" style="border-bottom:1px solid #2f3236;padding:15px">
							<div >
								<p class="small opa-6">{{$t("Air-drop_152")}}</p>
								<h3  class="por">
									{{canUseVeMbox}}
									<span class="dib por cur-point" style="width:30px;position:absolute;right:20px;bottom:0px" @click="jumpVeMBOX">
										<span class="notice" style="zoom:0.7" v-if="coinArr['GOV'].veMbox.notice && !hasStake"></span>
										<img   src="@/assets/icon/vembox-icon.png" alt="" height="30" />
										<span class="tac opa-6" style="width:120%;position:absolute;bottom:-5px;left:-10%;font-size:12px;color:#fff;zoom:0.7;" >veMBOX</span>
									</span>
								</h3>
							</div>
							<div>
								<p class="small vertical-children">
									<span class="opa-6">{{$t("Gemstone_56")}}</span> 
									<span class="cur-point por dib" v-popMsg  v-if="myApplyGemType[1]!= '' ">
										<img class="mgl-10" src="@/assets/icon/hasapply.png" alt="" height="30">
										<span class="popMsg left tac" style="min-width:80px;text-align:center" v-html="$t('Gemstone_67')"></span>
									</span>
								</p>
								<h3>{{getMaxVeMboxApplyTimes}}</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="border-bottom:1px solid #2f3236;padding:15px">
							<div >
								<p class="small opa-6">{{$t('Gemstone_55')}}</p>
								<h3  class="por">
									{{eth_myHashrate}}
								</h3>
							</div>
							<div>
								<p class="small vertical-children">
									<span class="opa-6">{{$t("Gemstone_56")}}</span> 
									<span class="cur-point por dib" v-popMsg  v-if="myApplyGemType[0]!= '' ">
										<img class="mgl-10" src="@/assets/icon/hasapply.png" alt="" height="30">
										<span class="popMsg left tac" style="min-width:80px;text-align:center" v-html="$t('Gemstone_67')"></span>
									</span>
								</p>
								<h3>{{getMaxPowerApplyTimes}}</h3>
							</div>
						</div>
					
					</section>
			
				<div class="mgt-30 aveage-box">
					<div class="dib por tac">
						<button class="btn-primary" style="margin:10px;width:80%" @click="setAction(22021);oprDialog('gem-apply2-dialog', 'block')">{{$t("Gemstone_14")}}</button>
						<p style="position:absolute;width:200%;left:-50%" class="cur-point" @click="oprDialog('gem-rule-dialog','block')">{{$t("Gemstone_02")}}>></p>
					</div>
					<div class="tac">
						<button class="btn-line por" style="width:80%" @click="setAction(22001);oprDialog('gem-take-dialog', 'block')">
							<span class="notice" v-if="gemToTakeNum > 0"></span>
							{{$t("Gemstone_15")}}
						</button>
					</div>
				</div>
				<div class="gemBag" @click="oprDialog('gemBag-dialog','block')" style="bottom:10px">
					<img  src="@/assets/icon/gem_bag_icon.png" alt="">
					<p class="stroke" :data-text="$t('Gemstone_16')">{{$t("Gemstone_16")}}</p>
				</div>
			</div>
		</section>
		
	</div>

	<div class="tac mgt-10">
		<p class="cur-point" @click="showRank = !showRank">{{$t("Air-drop_243")}} >></p>
	</div>

	<!-- 记录 -->
	<div class="col-md-12" :class="{hide: !showRank}">
		<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:20px">
			<table class="small  new-table" border="0" frame="void" rules="none" >
				<tr>
					<th width="30%" class="tal tac-xs">{{ $t("BOX_12") }}</th>
					<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
					<th width="10%">{{ $t("Gemstone_29") }}</th>
					<th width="20%">{{ $t("BOX_27") }}</th>
					<th width="40%" class="tar">TX</th>
				</tr>
				<tr v-for="item in getHistory" :key="item.tx">
					<td class="tal tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.crtime * 1000)) }}</td>
					<td class="tal">
						<span v-if="item.applyType == 1">{{$t("Gemstone_51")}}</span>
						<span v-else>{{$t("Gemstone_52")}}</span>
					</td>
					<td>x{{ item.amountGem }}</td>
					<td class="vertical-children">
						<span v-if="item.isOver==false" style="color:#49c773">{{$t("Gemstone_30")}}</span>
						<span v-else>{{$t("Gemstone_31")}}</span>
					</td>
					<td class="tar">
						<img  @click="getApplyDetial(item)" src="@/assets/icon/view.png" height="25" alt="" class="cur-point" />&nbsp;
						<a :href="getTxUrl(item.tx)" target="_blank">
							<img src="@/assets/icon/viewTx.png" alt="" height="25" class="cur-point" />
						</a>
					</td>
				</tr>
			</table>
		</section>
	</div>
	
	<GemApply :applyInfo="applyInfo" :myApplyInfo="myApplyInfo" :myApplyInfo_old="myApplyInfo_old"/>
	<Dialog id="gem-take-dialog" :top="100" :width="350">
		<div class="ly-input-content">
			<div class="aveage-box" v-for="item in  [0,4,8]" :key="item">
				<div v-for="item2 in [0,1,2,3]" :key="item + item2" style="padding:5px" >
					<div class="gem-item " style="height:65px" >
						<template v-if="getTakeArr[item + item2] != undefined">
							<img :src="require(`@/assets/market/${gemTypeToNum[getTakeArr[item + item2].type] + getTakeArr[item + item2].level}.png`)" alt=""  width="100%">
							<span class="gem-num stroke bold">{{getTakeArr[item + item2].num}}</span>
						</template>
					</div>
				</div>	
			</div>
		</div>
		<div class="mgt-20">
			<StatuButton  style="width:60%" :onClick="takeGem" :isDisable="getTakeArr.length == 0" :isLoading="lockBtn.takeGemLock > 0">{{$t("Gemstone_10")}}</StatuButton>
		</div>
	</Dialog>
	<Dialog id="gem-num-result-dialig" :top="100" :width="350">
		<h3>{{$t("Gemstone_17")}}</h3>
		<div class="tab-body mgt-10">
			<div class="aveage-box tab-content " style="padding:8px">
				<p class="tal opa-6">{{$t("Gemstone_18")}}</p>
				<p class="tar opa-6">{{$t("Gemstone_19")}}</p>
			</div>
			<div v-for="item in getRecordNoArr" :key="item.number">
				<div class="tab-split"></div>
				<div class="aveage-box tab-content small" style="padding:8px">
					<p class="tal">{{item.number}}</p>
					<p class="tar" v-if="historyDitail.isOver==true">
						<span v-if="item.isWins"><img :src="require(`@/assets/market/${historyDitail.gemId}.png`)" alt=""  height="30"></span>
						<span class="color-danger" v-else>{{$t("Gemstone_20")}}</span>
					</p>
					<p v-else-if="historyDitail.isOver == '-'" class="tar">
						<Loading />
					</p>
					<p v-else class="tar">{{$t("Gemstone_30")}}</p>
				</div>
			</div>
		</div>
	</Dialog>
	<Dialog id="gem-rule-dialog" :top="100" :width="520">
		<h2>{{$t("Gemstone_02")}}</h2>
		<p v-html="$t('Gemstone_03')" class="tal mgt-20"></p>
	</Dialog>
</div>
</template>
<script>

import { CommonMethod } from '@/mixin';
import GemApply from './GemApply2.vue'
import { Wallet, Http } from '@/utils';
import { Dialog, StatuButton, Loading } from '@/components';
import { mapState } from 'vuex';
import {PancakeConfig} from "@/config"

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {GemApply, Dialog, StatuButton, Loading},
	data(){
		return({
			applyInfo2: {
				maxAmount: "-",
				maxLuckyAmount: "-",
				nowAmount: "-",
				roundIndex: "",
				roundPrice: "-",
				roundStartTime: "-",
				roundState: "-",
				nowNormalAmount: "-",
				maxNormalLuckyAmount: "-",
				roundDuration: "-",
			},
			applyInfo: {
				price: "-",
				round: "-",
				roundDuration: "-",
				roundState: "-",
				startTime: '-'
			},
			getCountDown: 0,
			gemType: ['red', 'green', 'blue', 'yellow'],
			gemTypeToNum:{"red":100,"green":200,"blue":300,"yellow":400},
			myApplyInfo: {
				frozenBalance: 0,
				gems: [0,0,0,0],
				veMoboxTicket: [0,0],
				hashRateTicket: [0,0]
			},
			myApplyGemType:{
				0: "",
				1: "",
			},
			myApplyInfo_old: {
				frozenBalance: 0,
				gems: [0,0,0,0],
				userHighTicket: [0,0],
				userNormalTicket: [0,0]
			},
			getHistory: [],
			historyDitail: {isOver: "-", wins: {}, item:{}, ticketStartNo:0, amountGem: 0, gemId: "101"},
			account: "",
			tabList: [this.$t("Gemstone_51"),this.$t("Gemstone_52")],
			tabPos: 1,
			applyCfg: {
				0: {max: 0, now: {"red":0,"green":0,"blue":0,"gold":0},
					"numCfg":{0:200,1000:400,3000:600,6000:800,12000:1000}
				},
				1: {max: 0, now: {"red":0,"green":0,"blue":0,"gold":0},
					"numCfg":{0:400,5000:800,10000:1200,20000:1600,40000:2000}
				},
			},
			gemArr: [{id:101,name:"red"},{id:201,name:"green"},{id:301,name:"blue"},{id:401,name:"gold"}],
			showRank: false,
		})
	},
	computed:{
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			nowTs: (state) => state.globalState.data.nowTs,
			coinArr: (state) => state.bnbState.data.coinArr,
			canUseVeMbox: (state) => state.bnbState.data.canUseVeMbox,
			eth_myHashrate: (state) => state.ethState.data.myHashrate,
			gemApplyEndCountDown: (state) => state.globalState.data.gemApplyEndCountDown,
		}),

		getNowApplyCount(){
			let retArr = [0,0];
			let obj = this.applyCfg[this.tabPos];
			Object.values(obj.now).map(item=>{
				retArr[0] += (Number(item) / 2);
			});
			Object.keys(obj.numCfg).map(item=>{
				if(retArr[0] > item) retArr[1] = obj.numCfg[item];
			});

			if(retArr[0] == 0) retArr[1] = obj.numCfg[0];
			return retArr;
		},

		hasStake(){
			let hasStake = false;
			let plageList = ["MBOX-BNB-V2"];
			plageList.map(coinKey=>{
				if(this.coinArr[coinKey].wantAmount > 0) hasStake = true;
			})
			return hasStake;
		},

	
		//是否有宝石可以领取
		gemToTakeNum(){
			let num = 0;
			this.myApplyInfo.gems.map(item=>{
				num+= item
			});
			return num;
		},
		getTakeArr(){
			let arr = [];
			this.myApplyInfo.gems.map((num, index)=>{
				if(num > 0){
					arr.push({type: this.gemType[index], num: num, level: 1})
				}
			});
			return arr;
		},
		getRecordNoArr(){
			let retArr = [];
			let {wins, item} = this.historyDitail;
			let {ticketStartNo, amountGem} = item;
			if(ticketStartNo == undefined) return retArr;
			for (let index = 0; index < amountGem; index++) {
				let number = ticketStartNo + index;
				retArr.push({number, isWins: wins[number]!= undefined, type: this.gemType[item.roundIndex % 4]})
			} 
			return retArr;
		},
		getMaxVeMboxApplyTimes(){
			let maxAmount = 0
			let myTotalVeMbox = this.canUseVeMbox;
			if (myTotalVeMbox < 1500) {
				maxAmount = 0;
			} else if (myTotalVeMbox < 9000) {
				maxAmount = 2;
			} else if (myTotalVeMbox < 45000) {
				maxAmount = 10;
			} else if (myTotalVeMbox < 120000) {
				maxAmount = 20;
			} else if (myTotalVeMbox < 300000) {
				maxAmount = 30;
			} else if (myTotalVeMbox < 600000) {
				maxAmount = 40;
			} else {
				maxAmount = 50;
			}
			return maxAmount;
		},
		getMaxPowerApplyTimes(){
			let maxAmount = 0
			let myData = this.eth_myHashrate;
			if (myData < 300) {
				maxAmount = 0;
			} else if (myData < 1000) {
				maxAmount = 1;
			} else if (myData < 3000) {
				maxAmount = 3;
			} else if (myData < 10000) {
				maxAmount = 5;
			} else if (myData < 20000) {
				maxAmount = 7;
			} else if (myData < 50000) {
				maxAmount = 10;
			} else {
				maxAmount = 12;
			}
			return maxAmount;
		},
	},
	async created(){
		this.getApplyInfo();
		let count = 0;
		clearInterval(timer);
		timer = setInterval(async ()=>{
			count++;
			if(this.getCountDown > 0){
				this.getCountDown--;
				if(this.getCountDown == 0){
					await this.getApplyInfo();
					await this.getGemApply();
				}
			}
			if(count % 20 == 0){
				await this.getApplyInfo();
				await this.getUserApplyInfo();
				await this.getGemApply();
				await this.getUserApplyInfo_old();
			}
		}, 1000);

		this.account = await Wallet.ETH.getAccount();
		await this.getUserApplyInfo();
		await this.getGemApply();
		await this.getUserApplyInfo_old();

	},
	beforeDestroy(){
		if(timer) clearInterval(timer)
	},
	mounted(){
		this.resizeGem();
		window.$(window).resize(()=>this.resizeGem());
	},
	methods: {
		jumpVeMBOX(){
			if(this.hasStake){
				let key = "MBOX-BNB-V2";
				let stakeLP = PancakeConfig.StakeLP;
				let data = {coinKey: key, ...stakeLP[key], ...this.coinArr[key]}
				this.$root.$children[0].$refs.vmbox.setOprData(data).show();
			}else{
				this.setAction(21005);
				this.$root.$children[0].$refs.vmbox.setOprData(this.coinArr["GOV"]).show();
			}
		},
		resizeGem(){
			window.$(".gem-apply-item").height(window.$(".gem-apply-item").width());
			window.$(".has-apply").height(window.$(".has-apply").width());
		},
		onTabChange(tabPos){
			this.tabPos = tabPos;
		},
		async getApplyDetial(item){
			this.historyDitail.isOver = "-";
			this.historyDitail.item = item;
			this.oprDialog("gem-num-result-dialig", "block");
			let {roundIndex, applyType, gemId} = item;
			let result = await Http.getGemApplyResult(this.account, roundIndex, applyType);
			this.historyDitail.isOver = result.isOver;
			this.historyDitail.wins = result.wins;
			this.historyDitail.gemId = gemId;
		},
		async getGemApply(){
			let result = await Http.getGemApply(this.account);
			if(result){
				this.getHistory = result.list;
				this.myApplyGemType[0] = "";
				this.myApplyGemType[1] = "";
				result.list.map(item=>{
					if(item.roundIndex == this.applyInfo.round){
						this.myApplyGemType[item.applyType - 1] = item.gemId;
					}
				})
			}
		},
		//领取宝石
		async takeGem(){
			let hash = await Wallet.ETH.Group.Gem.claimfrozenGem(()=>{
				this.getUserApplyInfo();
			});
			if(hash){
				this.lockBtnMethod("takeGemLock");
			}
		},
		//获取我的申购信息
		async getUserApplyInfo(){
			let result = await Wallet.ETH.Group.Gem.getMyApplyInfo();
			if(result){
				this.myApplyInfo = result;
			}
		},
		async getUserApplyInfo_old(){
			let result = await Wallet.ETH.getMyApplyInfo();
			if(result){
				this.myApplyInfo_old = result;
			}
		},
		async getApplyInfo(){
			let result = await Wallet.ETH.Group.Gem.getRoundInfo();
			if(result){
				let {maxHashRateLuckyAmount, maxVeMoboxLuckyAmount, nowHashRateAmounts, nowVeMoboxAmounts} = result;
				this.applyCfg[0].max = maxHashRateLuckyAmount;
				this.applyCfg[0].now = nowHashRateAmounts;
				this.applyCfg[1].max = maxVeMoboxLuckyAmount;
				this.applyCfg[1].now = nowVeMoboxAmounts;

				this.applyInfo = result;

				let dtTime = Number(result.startTime) + Number(result.roundDuration) - parseInt(new Date().valueOf() / 1000);
				if(Number(result.startTime) > this.nowTs){
					this.getCountDown = Number(result.startTime) - this.nowTs
				}else{
					this.getCountDown = dtTime > 0? dtTime : 0;
				}
			}
		}, 
		async getApplyInfo2(){
			let result = await Wallet.ETH.getGemApplyState();
			if(result){
				this.applyInfo = result;
				let dtTime = Number(result.roundStartTime) + Number(result.roundDuration) - parseInt(new Date().valueOf() / 1000);
				this.getCountDown = dtTime > 0? dtTime : 0;
			}
		}
	}
}
</script>

<style scoped>
.tab-new-menu{
	background: #000;
	border-radius: 30px;
	height: 40px;
	line-height: 40px;
	display: inline-block;
	padding: 0px 20px;
	cursor: pointer;
}
.tab-new-menu.active{
	background: #42464c;
	border: 1px solid #1b4ff5;
}
/* .adv-panel{
	background: #161401;
} */
.veapply:before{
	background: linear-gradient(145deg,#975fff 0%, #000  100%);
}
/* .veapply{
	background: rgb(13, 25, 0);
} */
.gem-apply-item{
	margin: 20px;
	position: relative;
}
.gem-apply-item{
	border: 1px solid #33363C;
	border-radius: 20px;
}
.gem-apply-item .apply-num{
	position: absolute;
	bottom: 5px;
	left: 50%;
	transform: translateX(-50%);
	background: #00000055;
	border-radius: 15px;
	font-size: 10px;
	padding: 2px 10px;
}
.gem-apply-item .apply-rate{
	position: absolute;
	bottom: -28px;
	left: 50%;
	transform: translateX(-50%);
	background: #00000055;
	border-radius: 15px;
	font-size: 10px;
	padding: 2px;
	width: 100%;
}
.has-apply{
	position: absolute;
	font-size: 10px;
	display: none;
	background: rgba(0,0,0,0.5);
	width: 100%;
	bottom: 0px;
	top: 0px;
	border-radius: 20px;
}
.has-apply.active{
	display: block;
}
.has-apply div{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	line-height: 12px;
}

.gem-apply-item.active .has-apply{
	display: block;
}

@media (max-width: 768px) {
	.gem-apply-item{
		margin: 5px;
		border-radius: 10px;
	}
	.gem-apply-item .apply-num{
		zoom: 0.8;
	}
	.has-apply{
		zoom: 0.8;
		border-radius: 10px;
	}
	#show-num{
		display: block !important;
	}
	#show-num div{
		text-align: center;
	}
}
</style>