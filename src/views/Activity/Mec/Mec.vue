<template>
	<div class="tac center-content">
		<div class="por ovh mgt-20 adv-panel" >
			<section class="col-md-7" style="padding:10px;">
				<div class=" por">
					<div class="vertical-children">
						<h2 class="dib">{{$t("MECBOX_01")}}</h2>
						<img class="mgl-10 cur-point" @click="getRootRefs().ruleDialog.show('MECBOX_02', 'MECBOX_03')" src="@/assets/icon/help.png" alt="" height="30">
					</div>
					<div class="tac mgt-10">
						<template >
							<!-- <p v-if="getCountDown >0">{{$t("MECBOX_20")}}: {{getLeftTime(getCountDown)}}</p> -->
							<p v-if="getCountDown >0">{{Number(applyInfo.startTime) > nowTs?$t("MECBOX_38") :$t("MECBOX_20")}}: {{getLeftTime(getCountDown)}}</p>

							<p v-else>{{$t("MECBOX_21")}}<span class="dotting"></span></p>
						</template>

						<div class="aveage-box mgt-10" id="show-num">
							<div class="tac mgl-10">{{$t("MECBOX_37")}}: {{getVeMboxApplyCount[0]}}/{{Number(applyCfg[1].max)}}</div>
						</div>
						<div class="aveage-box mgt-5" id="show-num">
							<div class="tac mgl-10">{{$t("MECBOX_35")}}: {{getHashApplyCount[0]}}/{{Number(applyCfg[0].max)}}</div>
						</div>
						
						<div style="height:230px" id="gem-apply-type">
							<p style="padding-top:10px">
								<img src="@/assets/box/mecbox.png" height="180" alt="">
							</p>
						</div>
						
					</div>
					<div class="tal rate-show hide-xs">
						<div class="col-md-1"></div>
						<div class="col-md-2 col-xs-4 vertical-children mgt-5" v-for="item in rateObj" :key="item.lv">
							<div style="height:20px;width:20px;border-radius:20px;padding:2px;" class="dib dot-bg">
								<div style="width:100%;height:100%;border-radius:20px;border:2px solid #1B1C21" :class="`bg-new${item.lv}`"></div>
							</div>
							<div class="dib mgl-5" style="line-height:15px">
								<p>{{item.rate}}</p>
								<p class="small  vertical-children">
									<span>{{item.lang}}</span>
									<img class="mgl-5" src="@/assets/coin/CRYSTAL.png" alt="" height="20">
								</p>
							</div>
						</div>
						<div class="col-md-1"></div>
					</div>

					<!-- 手机版操作 -->
					<div class="visiable-xs">
						<div class="mgt-10 aveage-box">
							<div class="dib por tac">
								<button class="btn-primary" style="margin:10px;width:80%" @click="oprDialog('mecBox-apply-dialog', 'block')">{{$t("MECBOX_14")}}</button>
							</div>
							<div class="tac">
								<StatuButton v-if="this.myApplyInfo.boxAmount >= 0" style="width:80%" :isDisable="this.myApplyInfo.boxAmount<=0" :isLoading="lockBtn.takeBoxLock > 0" :onClick="takeBox">
									{{$t("MECBOX_15").replace("#0#", this.myApplyInfo.boxAmount)}}
								</StatuButton>
							</div>
						</div>
							<div class="tac mgt-10">
								<p class="cur-point" @click="getBoxApplyHistory();showRank = !showRank" style="color: #668eff">{{$t("Air-drop_243")}} >></p>
							</div>
					</div>
				</div>
			</section>

			<section class="col-md-5 adv-panel-content hide-xs" style="padding:10px">
				<div class="por" style="height:380px;padding:10px">
					<section style="padding:10px">
						<div class="aveage-box tal" style="padding:15px">
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
									<span class="opa-6">{{$t("MECBOX_32")}}</span> 
									<span class="cur-point por dib" v-popMsg  v-if="getVeMobxApplyNum > 0">
										<img class="mgl-10" src="@/assets/icon/hasapply.png" alt="" height="30">
										<span class="popMsg left tac" style="min-width:80px;text-align:center" v-html="$t('Gemstone_67')"></span>
									</span>
								</p>
								<h3>{{getMaxVeMboxApplyTimes}}</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="padding:15px">
							<div >
								<p class="small opa-6">{{$t('Gemstone_55')}}</p>
								<h3  class="por">
									{{eth_myHashrate}}
								</h3>
							</div>
							<div>
								<p class="small vertical-children">
									<span class="opa-6">{{$t("MECBOX_32")}}</span> 
									<span class="cur-point por dib" v-popMsg  v-if="getHashRateApplyNum > 0">
										<img class="mgl-10" src="@/assets/icon/hasapply.png" alt="" height="30">
										<span class="popMsg left tac" style="min-width:80px;text-align:center" v-html="$t('Gemstone_67')"></span>
									</span>
								</p>
								<h3>{{getMaxPowerApplyTimes}}</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="padding:15px">
							<div>
								<p class="small opa-6">{{$t("MECBOX_26")}}</p>
								<h3>
									<span class="apply-rate" v-if="Number(applyCfg[1].now) <= Number(applyCfg[1].max)">100%</span>
									<span class="apply-rate" v-else>{{numFloor(Number(applyCfg[1].max) / Number(applyCfg[1].now) * 100, 1e2)  }}%</span>
								</h3>
							</div>
							<div >
							<p class="small opa-6">{{$t("MECBOX_25")}}</p>
							<h3  class="por">
								<span class="apply-rate" v-if="Number(applyCfg[0].now) <= Number(applyCfg[0].max)">100%</span>
								<span class="apply-rate" v-else>{{numFloor(Number(applyCfg[0].max) / Number(applyCfg[0].now) * 100, 1e2)  }}%</span>
							</h3>
							</div>
						</div>
					
					</section>
				
					<div class="mgt-10 aveage-box">
						<div class="dib por tac">
							<button class="btn-primary" style="margin:10px;width:80%" @click="oprDialog('mecBox-apply-dialog', 'block')">{{$t("MECBOX_14")}}</button>
							<p style="position:absolute;width:200%;left:-50%" class="cur-point" @click="getRootRefs().ruleDialog.show('MECBOX_02', 'MECBOX_03')">{{$t("MECBOX_02")}}>></p>
						</div>
						<div class="tac">
							<StatuButton v-if="this.myApplyInfo.boxAmount >= 0" style="width:80%" :isDisable="this.myApplyInfo.boxAmount<=0" :isLoading="lockBtn.takeBoxLock > 0" :onClick="takeBox">
								{{$t("MECBOX_15").replace("#0#", this.myApplyInfo.boxAmount)}}
							</StatuButton>
						</div>
					</div>
				</div>
			</section>
		</div>

		<div class="tac mgt-10 hide-xs">
			<p class="cur-point" @click="getBoxApplyHistory();showRank = !showRank" >{{$t("Air-drop_243")}} >></p>
		</div>
		<!-- 记录 -->
		<div class="col-md-12" :class="{hide: !showRank}">
			<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:20px">
				<table class="small  new-table" border="0" frame="void" rules="none" >
					<tr>
						<th width="30%" class="tal tac-xs">{{ $t("BOX_12") }}</th>
						<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
						<th width="10%">{{ $t("NewBOX_27") }}</th>
						<th width="20%">{{ $t("BOX_27") }}</th>
						<th width="40%" class="tar">TX</th>
					</tr>
					<tr v-for="item in getHistory" :key="item.tx">
						<td class="tal tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.crtime * 1000)) }}</td>
						<td class="tal">
							<span v-if="Number(item.ticketStartNo) > 6e8">{{$t("Gemstone_52")}}</span>
							<span v-else>{{$t("Gemstone_51")}}</span>
						</td>
						<td>x{{ item.amountBox }}</td>
						<td class="vertical-children">
							<span v-if="item.isOver==false" style="color:#49c773">{{$t("NewBOX_28")}}</span>
							<span v-else>{{$t("NewBOX_29")}}</span>
						</td>
						<td class="tar">
							<img  @click="getApplyDetial(item)" src="@/assets/icon/view.png" height="25" alt="" class="cur-point" />&nbsp;
							<a :href="getTxUrl(item.tx)" target="_blank">
								<img src="@/assets/icon/viewTx.png" alt="" height="25" class="cur-point" />
							</a>
						</td>
					</tr>
				</table>
				<div class="no-show" v-if="getHistory.length == 0">
					<img src="@/assets/no_items.png" alt="">
					<p class="opa-6 mgt-10">No items to display</p>
				</div>
			</section>
		</div>
		
		<MecApply :applyInfo="applyInfo" :myApplyInfo="myApplyInfo" />

		<Dialog id="mecBox-num-result-dialig" :top="100" :width="450">
			<h3>{{$t("MECBOX_16")}}</h3>
			<div class="tab-body mgt-10">
				<p class="mgt-10  tal" style="height:40px;line-height:38px;padding-left:15px;color:#fff;font-size:12px;background: rgba(27,84,245,0.10);border: 2px solid #1b54f5;border-radius:10px">
					{{$t("MECBOX_17")}}: {{historyDitail.item.ticketStartNo}}
					<span v-if="historyDitail.item.amountBox > 1">~{{Number(historyDitail.item.ticketStartNo) + Number(historyDitail.item.amountBox-1)}}</span>
				</p>
				<p class="mgt-10  tal vertical-children" style="height:40px;line-height:38px;padding-left:15px;color:#fff;font-size:12px;background: rgba(161,250,64,0.10);border: 2px solid #A1FA40;border-radius:10px">
					<span>{{$t("MECBOX_18")}}: </span>
					<span v-if="historyDitail.isOver == true">{{Object.keys(historyDitail.wins).length }}</span>
					<span v-else-if="historyDitail.isOver == '-' "><Loading /></span>
					<span v-else>{{$t("MECBOX_28")}}</span>
				</p>
				<div style="padding:10px" class="tal vertical-children">
					<p class="small">{{$t("MECBOX_19")}}</p>
					<div class="tac mgt-10" style="background:#000;padding:10px 0px;border-radius:10px;max-height:300px; overflow-y:auto">
						<p v-if="historyDitail.isOver == true">
							<span v-if="Object.keys(historyDitail.wins).length == 0">{{$t("NewBOX_35")}}</span>
							<span v-else  class="dib small" v-for="item in Object.keys(historyDitail.wins)" :key="item" style="background: #2a2f35;width: 30%;padding:10px 0px;margin:5px;border-radius:10px">
								{{item}}
							</span>
						</p>
						<span v-else-if="historyDitail.isOver == '-' "><Loading /></span>
						<span v-else>{{$t("MECBOX_28")}}</span>
					</div>
				</div>

			</div>
		</Dialog>
	</div>
</template>

<script>
import { CommonMethod } from '@/mixin';
import MecApply from './MecApply.vue';
import { mapState } from 'vuex';
import { Wallet, Http } from '@/utils';
import {  StatuButton, Dialog, Loading } from '@/components';
import {PancakeConfig} from "@/config"

let  timer = null;

export default {
	mixins: [CommonMethod],
	components: {MecApply, StatuButton, Dialog, Loading},
	data(){
		return({
			applyInfo: {
				maxAmount: "-",
				maxLuckyAmount: "-",
				nowAmount: "-",
				roundIndex: "",
				roundPrice: "-",
				startTime: "-",
				roundState: "-",
				nowNormalAmount: "-",
				maxNormalLuckyAmount: "-",
				roundDuration: "-",
			},
			myApplyInfo: {
				frozenBalance: 0,
				boxAmount: 0,
				veMoboxTicket: [0,0],
				hashRateTicket: [0,0]
			},
			getCountDown: 0,
			getHistory: [],
			getRecordNoArr: [],
			historyDitail: {isOver: "-", wins: {}, item:{}, ticketStartNo:0 },
			rateObj: [
				{lv:1, rate: '47%', lang: '2-10'},
				{lv:2, rate: '32%', lang: '11-20'},
				{lv:3, rate: '16%', lang: '21-50'},
				{lv:4, rate: '4%', lang: '100-200'},
				{lv:5, rate: '1%', lang: '500-999'},
			],
			applyCfg: {
				0: {max: 0, now: 0, "numCfg":{0:1600,2e4:3200,4e4:4800,6e4:6400,12e4:8000} },
				1: {max: 0, now: 0, "numCfg":{0:2400,1e4:4800,2e4:7200,3e4:9600,6e4:12000} },
			},
			showRank: false,
		})
	},
	computed:{
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			canUseVeMbox: (state) => state.bnbState.data.canUseVeMbox,
			lockBtn: (state) => state.globalState.data.lockBtn,
			nowTs: (state) => state.globalState.data.nowTs,
			eth_myHashrate: (state) => state.ethState.data.myHashrate,
		}),
		getHashApplyCount(){
			let retArr = [0,0];
			let {now, numCfg} = this.applyCfg[0];
			retArr[0] = now;
			Object.keys(numCfg).map(item=>{
				if(Number(retArr[0]) > Number(item)) retArr[1] = numCfg[item];
			});
			if(retArr[0] == 0) retArr[1] = numCfg[0];
			return retArr;
		},
		getVeMboxApplyCount(){
			let retArr = [0,0];
			let {now, numCfg} = this.applyCfg[1];
			retArr[0] = now;
			Object.keys(numCfg).map(item=>{
				if(Number(retArr[0]) > Number(item)) retArr[1] = numCfg[item];
			});
			if(retArr[0] == 0) retArr[1] = numCfg[0];
			return retArr;
		},
		getVeMobxApplyNum(){
			let num = 0;
			let ticketObj = this.myApplyInfo.veMoboxTicket;
			num = ticketObj[1] - ticketObj[0] + 1;
			if(ticketObj[0] == 0) num = 0;
			return num; 
		},
		getHashRateApplyNum(){
			let num = 0;
			let ticketObj = this.myApplyInfo.hashRateTicket;
			num = ticketObj[1] - ticketObj[0] + 1;
			if(ticketObj[0] == 0) num = 0;
			return num; 
		},
		getMaxVeMboxApplyTimes(){
			let maxAmount = 0
			let myTotalVeMbox = this.canUseVeMbox;
			if (myTotalVeMbox < 0.45e4) {
				maxAmount = 0;
			} else if (myTotalVeMbox < 1.5e4) {
				maxAmount = 10;
			} else if (myTotalVeMbox < 4.5e4) {
				maxAmount = 30;
			} else if (myTotalVeMbox < 12e4) {
				maxAmount = 60;
			} else if (myTotalVeMbox < 30e4) {
				maxAmount = 90;
			} else if (myTotalVeMbox < 60e4) {
				maxAmount = 120;
			} else {
				maxAmount = 150;
			}
			return maxAmount * 4;
		},
		getMaxPowerApplyTimes(){
			let maxAmount = 0
			let myData = this.eth_myHashrate;
			if (myData < 300) {
				maxAmount = 0;
			} else if (myData < 1000) {
				maxAmount = 10;
			} else if (myData < 3000) {
				maxAmount = 30;
			} else if (myData < 10000) {
				maxAmount = 50;
			} else if (myData < 20000) {
				maxAmount = 70;
			} else if (myData < 50000) {
				maxAmount = 100;
			} else {
				maxAmount = 120;
			}
			return maxAmount * 4;
		},
		hasStake(){
			let hasStake = false;
			let plageList = ["MBOX-BNB-V2"];
			plageList.map(coinKey=>{
				if(this.coinArr[coinKey].wantAmount > 0) hasStake = true;
			})
			return hasStake;
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
					await this.getBoxApplyHistory();
				}
			}
			if(count % 20 == 0){
				await this.getApplyInfo();
				await this.getUserApplyInfo();
				await this.getBoxApplyHistory();
			}
		}, 1000);

		this.account = await Wallet.ETH.getAccount();
		await this.getUserApplyInfo();
		await this.getBoxApplyHistory();
	},
	beforeDestroy(){
		clearInterval(timer);
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
		async getApplyDetial(item){
			this.historyDitail.isOver = "-";
			this.historyDitail.item = item;
			this.oprDialog("mecBox-num-result-dialig", "block");
			let {roundIndex} = item;
			let result = await Http.getMecBoxApplyResult(this.account, roundIndex);
			this.historyDitail.isOver = result.isOver;
			let h_wins = {};
			let l_wins = {};
			for (const key in result.wins) {
				if(Number(key) > 6e8){
					h_wins[key] = result.wins[key]
				}else{
					l_wins[key] = result.wins[key];
				}
			}
			this.historyDitail.wins = item.ticketStartNo > 6e8? h_wins: l_wins;
		},
		async getBoxApplyHistory(){
			let result = await Http.getMecBoxApplyHistory(this.account);
			if(result){
				this.getHistory = result.list;
			}
		},
		//获取我的申购信息
		async getUserApplyInfo(){
			let result = await Wallet.ETH.Group.Enhancer.getMyApplyInfo();
			if(result){
				this.myApplyInfo = result;
			}
		},
		async getApplyInfo(){
			let result = await Wallet.ETH.Group.Enhancer.getRoundInfo();
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
		//领取Box
		async takeBox(){
			let hash = await Wallet.ETH.Group.Enhancer.claimfrozenBox(()=>{
				this.getUserApplyInfo();
			});
			if(hash){
				this.lockBtnMethod("takeBoxLock");
			}
		},
	}
}
</script>

<style scoped>
.adv-panel:before{
	background: linear-gradient(145deg,#066EFF 0%, #000  100%);
}

@media (max-width: 768px) {
	.rate-show{
		zoom: 0.8;
		padding: 5px 20px !important;
	}
}
</style>
