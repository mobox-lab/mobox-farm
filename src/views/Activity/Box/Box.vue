<template>
	<div class="tac center-content">
		<div class="por ovh mgt-20 adv-panel" >
			<section class="col-md-7" style="padding:10px;">
				<div class=" por">
					<div class="vertical-children ">
						<h2 class="dib">{{$t("NewBOX_01")}}</h2>
						<img class="mgl-10 cur-point" @click="oprDialog('box-rule-dialog','block')" src="@/assets/icon/help.png" alt="" height="30">
					</div>
					<div class="tac mgt-10">
						<template >
							<p v-if="getCountDown >0">{{$t("NewBOX_20")}}: {{getLeftTime(getCountDown)}}</p>
							<p v-else>{{$t("NewBOX_21")}}<span class="dotting"></span></p>
						</template>

						<div style="height:250px" id="gem-apply-type">
							<p style="padding-top:30px">
								<img src="@/assets/icon/box_view.png" height="180" alt="">
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
								<p class="small opa-6">{{$t(item.lang)}}</p>
							</div>
						</div>
						<div class="col-md-1"></div>
					</div>

					<div class="visiable-xs">
						<div class="mgt-10 aveage-box">
							<div class="dib por tac">
								<button class="btn-primary" style="margin:10px;width:80%" @click="oprDialog('box-apply-dialog', 'block')">{{$t("NewBOX_14")}}</button>
							</div>
							<div class="tac">
								<StatuButton v-if="this.myApplyInfo.boxAmount > 0" style="width:80%" :isDisable="this.myApplyInfo.boxAmount<=0" :isLoading="lockBtn.takeBoxLock > 0" :onClick="takeBox">
									{{$t("NewBOX_15").replace("#0#", this.myApplyInfo.boxAmount)}}
								</StatuButton>
								<router-link to="/market?tab=4" v-else>
									<button class="btn-line" style="width:90%;" @click="setAction(22002);">
										{{$t("BOX_37")}}
									</button>
								</router-link>
							</div>
						</div>
						<div class="tac mgt-10 ">
							<p class="cur-point" @click="showRank = !showRank" style="color: #668eff">{{$t("Air-drop_243")}} >></p>
						</div>
					</div>
				</div>
			</section>

			<section class="col-md-5 adv-panel-content hide-xs" style="padding:10px">
				<div class=" por" style="height:350px;padding:10px">
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
									<span class="opa-6">{{$t("NewBOX_34")}}</span> 
									<span class="cur-point por dib" v-popMsg  v-if="getHighApplyNum > 0">
										<img class="mgl-10" src="@/assets/icon/hasapply.png" alt="" height="30">
										<span class="popMsg left tac" style="min-width:80px;text-align:center" v-html="$t('Gemstone_67')"></span>
									</span>
								</p>
								<h3>{{getMaxApplyTimes}}</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="padding:15px">
							<div class="por">
								<p class="small opa-6">{{$t("NewBOX_30")}}</p>
								<h3>{{applyInfo.nowNormalAmount}}</h3>
								<div style="position:absolute;right:10px;top:0px">
								</div>
							</div>
							<div>
								<p class="small vertical-children">
									<span class="opa-6">{{$t("NewBOX_23")}}</span> 
									<span class="cur-point por dib" v-popMsg  v-if="getNormalApplyNum > 0">
										<img class="mgl-10" src="@/assets/icon/hasapply.png" alt="" height="30">
										<span class="popMsg left tac" style="min-width:80px;text-align:center" v-html="$t('Gemstone_67')"></span>
									</span>
								</p>
								<h3>{{ numFloor(applyInfo.maxNormalLuckyAmount / (Number(applyInfo.nowNormalAmount) >= Number(applyInfo.maxNormalLuckyAmount)?applyInfo.nowNormalAmount:applyInfo.maxNormalLuckyAmount) * 100, 1e3 ) || "-" }}%</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="padding:15px">
							<div >
								<p class="small opa-6">{{$t("NewBOX_31")}}</p>
								<h3>{{applyInfo.nowAmount}}/{{applyInfo.maxLuckyAmount}}</h3>
							</div>
							<div>
								<p class="small opa-6">{{$t("NewBOX_23")}}</p>
								<h3>{{ numFloor(applyInfo.maxLuckyAmount / (Number(applyInfo.nowAmount) >= Number(applyInfo.maxLuckyAmount)?applyInfo.nowAmount:applyInfo.maxLuckyAmount) * 100, 1e3 ) || "-" }}%</h3>
							</div>
						</div>
					</section>
				
					<div class="mgt-10 aveage-box">
						<div class="dib por tac">
							<button class="btn-primary" style="margin:10px;width:80%" @click="oprDialog('box-apply-dialog', 'block')">{{$t("NewBOX_14")}}</button>
							<p style="position:absolute;width:200%;left:-50%" class="cur-point" @click="oprDialog('box-rule-dialog','block')">{{$t("NewBOX_02")}}>></p>
						</div>
						<div class="tac">
							<StatuButton v-if="this.myApplyInfo.boxAmount > 0" style="width:80%" :isDisable="this.myApplyInfo.boxAmount<=0" :isLoading="lockBtn.takeBoxLock > 0" :onClick="takeBox">
								{{$t("NewBOX_15").replace("#0#", this.myApplyInfo.boxAmount)}}
							</StatuButton>
							<router-link to="/market?tab=4" v-else>
								<button class="btn-line" style="width:90%;" @click="setAction(22002);">
									{{$t("BOX_37")}}
								</button>
							</router-link>
						</div>
					</div>
				</div>
			</section>
		</div>

		<div class="tac mgt-10 hide-xs">
			<p class="cur-point" @click="showRank = !showRank" >{{$t("Air-drop_243")}} >></p>
		</div>
		<!-- 记录 -->
		<div class="col-md-12" :class="{hide: !showRank}">
			<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:10px">
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
							<span v-if="Number(item.ticketStartNo) > 1e6">{{$t("NewBOX_25")}}</span>
							<span v-else>{{$t("NewBOX_26")}}</span>
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
		
		<BoxApply :applyInfo="applyInfo" :myApplyInfo="myApplyInfo" />
		<Dialog id="box-rule-dialog" :top="100" :width="520">
			<h2>{{$t("NewBOX_02")}}</h2>
			<p v-html="$t('NewBOX_03')" class="tal mgt-20"></p>
		</Dialog>
		<Dialog id="box-num-result-dialig" :top="100" :width="450">
			<h3>{{$t("NewBOX_16")}}</h3>
			<div class="tab-body mgt-10">
				<p class="mgt-10  tal" style="height:40px;line-height:38px;padding-left:15px;color:#fff;font-size:12px;background: rgba(27,84,245,0.10);border: 2px solid #1b54f5;border-radius:10px">
					{{$t("NewBOX_17")}}: {{historyDitail.item.ticketStartNo}}
					<span v-if="historyDitail.item.amountBox > 1">~{{Number(historyDitail.item.ticketStartNo) + Number(historyDitail.item.amountBox-1)}}</span>
				</p>
				<p class="mgt-10  tal vertical-children" style="height:40px;line-height:38px;padding-left:15px;color:#fff;font-size:12px;background: rgba(161,250,64,0.10);border: 2px solid #A1FA40;border-radius:10px">
					<span>{{$t("NewBOX_18")}}: </span>
					<span v-if="historyDitail.isOver == true">{{Object.keys(historyDitail.wins).length }}</span>
					<span v-else-if="historyDitail.isOver == '-' "><Loading /></span>
					<span v-else>{{$t("NewBOX_28")}}</span>
				</p>
				<div style="padding:10px" class="tal vertical-children">
					<p class="small">{{$t("NewBOX_19")}}</p>
					<div class="tac mgt-10" style="background:#000;padding:10px 0px;border-radius:10px;max-height:300px; overflow-y:auto">
						<p v-if="historyDitail.isOver == true">
							<span v-if="Object.keys(historyDitail.wins).length == 0">{{$t("NewBOX_35")}}</span>
							<span v-else  class="dib small" v-for="item in Object.keys(historyDitail.wins)" :key="item" style="background: #2a2f35;width: 30%;padding:10px 0px;margin:5px;border-radius:10px">
								{{item}}
							</span>
						</p>
						<span v-else-if="historyDitail.isOver == '-' "><Loading /></span>
						<span v-else>{{$t("NewBOX_28")}}</span>
					</div>
				</div>

			</div>
		</Dialog>
	</div>
</template>

<script>
import { CommonMethod } from '@/mixin';
import BoxApply from './BoxApply.vue';
import { mapState } from 'vuex';
import { Wallet, Http } from '@/utils';
import {  StatuButton, Dialog, Loading } from '@/components';
import {PancakeConfig} from "@/config"

let  timer = null;

export default {
	mixins: [CommonMethod],
	components: {BoxApply, StatuButton, Dialog, Loading},
	data(){
		return({
			applyInfo: {
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
			myApplyInfo: {
				frozenBalance: 0,
				boxAmount: 0,
				userHighTicket: [0,0],
				userNormalTicket: [0,0]
			},
			getCountDown: 0,
			getHistory: [],
			getRecordNoArr: [],
			historyDitail: {isOver: "-", wins: {}, item:{}, ticketStartNo:0 },
			rateObj: [
				{lv:1, rate: '50%', lang: 'MOMO_09'},
				{lv:2, rate: '35%', lang: 'MOMO_10'},
				{lv:3, rate: '12%', lang: 'MOMO_11'},
				{lv:4, rate: '2.5%', lang: 'MOMO_12'},
				{lv:5, rate: '0.5%', lang: 'MOMO_13'},
			],
			showRank: false,
		})
	},
	computed:{
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			canUseVeMbox: (state) => state.bnbState.data.canUseVeMbox,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		getMaxApplyTimes(){
			let maxAmount = 0
			let myTotalVeMbox = this.canUseVeMbox;

			if (myTotalVeMbox < 3000) {
				maxAmount = 0;
			} else if (myTotalVeMbox < 15000) {
				maxAmount = 3;
			} else if (myTotalVeMbox < 30000) {
				maxAmount = 15;
			} else if (myTotalVeMbox < 75000) {
				maxAmount = 25;
			} else if (myTotalVeMbox < 150000) {
				maxAmount = 40;
			} else if (myTotalVeMbox < 300000) {
				maxAmount = 60;
			} else if (myTotalVeMbox < 500000) {
				maxAmount = 80;
			} else {
				maxAmount = 100;
			}
			return maxAmount;
		},
		hasStake(){
			let hasStake = false;
			let plageList = ["MBOX-BNB-V2"];
			plageList.map(coinKey=>{
				if(this.coinArr[coinKey].wantAmount > 0) hasStake = true;
			})
			return hasStake;
		},
		getNormalApplyNum(){
			let num = 0;
			let ticketObj = this.myApplyInfo.userNormalTicket;
			num = ticketObj[1] - ticketObj[0] + 1;
			if(ticketObj[0] == 0) num = 0;
			return num; 
		},
		getHighApplyNum(){
			let num = 0;
			let ticketObj = this.myApplyInfo.userHighTicket;
			num = ticketObj[1] - ticketObj[0] + 1;
			if(ticketObj[0] == 0) num = 0;
			return num; 
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
			console.log(item);
			this.historyDitail.isOver = "-";
			this.historyDitail.item = item;
			this.oprDialog("box-num-result-dialig", "block");
			let {roundIndex} = item;
			let result = await Http.getBoxApplyResult(this.account, roundIndex);
			console.log("getApplyDetial", JSON.stringify(result));
			this.historyDitail.isOver = result.isOver;
			let h_wins = {};
			let l_wins = {};
			for (const key in result.wins) {
				if(Number(key) > 1e6){
					l_wins[key] = result.wins[key]
				}else{
					h_wins[key] = result.wins[key];
				}
			}
			this.historyDitail.wins = item.ticketStartNo > 1e6? l_wins: h_wins;
		},
		async getBoxApplyHistory(){
			let result = await Http.getBoxApplyHistory(this.account);
			if(result){
				this.getHistory = result.list;
			}
		},
		//获取我的申购信息
		async getUserApplyInfo(){
			let result = await Wallet.ETH.getMyBoxApplyInfo();
			if(result){
				this.myApplyInfo = result;
			}
		},
		async getApplyInfo(){
			let result = await Wallet.ETH.getBoxApplyState();
			if(result){
				this.applyInfo = result;
				let dtTime = Number(result.roundStartTime) + Number(result.roundDuration) - parseInt(new Date().valueOf() / 1000);
				this.getCountDown = dtTime > 0? dtTime : 0;
			}
		},
		//领取Box
		async takeBox(){
			let hash = await Wallet.ETH.takeBox(()=>{
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
