<template>
	<div class="tac center-box">
		<div class="por clear mgt-10">
			<section class="col-md-7" style="padding:10px">
				<div class="adv-panel">
					<h1 class="vertical-children">
						<span>BOX申购</span>
						<img class="mgl-10 cur-point" @click="oprDialog('box-rule-dialog','block')" src="@/assets/icon/help.png" alt="" height="30">
					</h1>
					<div class="tac mgt-10">
						<template >
							<p v-if="getCountDown >0">{{$t("Gemstone_21")}}: {{getLeftTime(getCountDown)}}</p>
							<p v-else>{{$t("Gemstone_22")}}<span class="dotting"></span></p>
						</template>

						<div style="height:280px" id="gem-apply-type">
							<p style="padding-top:50px">
								<img src="@/assets/icon/box_view.png" height="180" alt="">
							</p>
						</div>
						
					</div>
				</div>
			</section>

			<section class="col-md-5" style="padding:10px">
				<div class="panel por" style="height:380px;padding:20px">
					<section style="padding:10px">
						<div class="aveage-box tal" style="border-bottom:1px solid #2f3236;padding:15px">
							<div >
								<p class="small opa-6">{{$t("Air-drop_152")}}</p>
								<h3>{{myTotalVeMbox}}</h3>
							</div>
							<div>
								<p class="small opa-6">高级申购上限</p>
								<h3>{{getMaxApplyTimes}}</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="border-bottom:1px solid #2f3236;padding:15px">
							<div >
								<p class="small opa-6">{{$t("Gemstone_32")}}</p>
								<h3>{{applyInfo.nowNormalAmount}}</h3>
							</div>
							<div>
								<p class="small opa-6">{{$t("Gemstone_24")}}</p>
								<h3>{{ numFloor(applyInfo.maxNormalLuckyAmount / (Number(applyInfo.nowNormalAmount) >= Number(applyInfo.maxNormalLuckyAmount)?applyInfo.nowNormalAmount:applyInfo.maxNormalLuckyAmount) * 100, 1e3 ) || "-" }}%</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="padding:15px">
							<div >
								<p class="small opa-6">{{$t("Gemstone_33")}}</p>
								<h3>{{applyInfo.nowAmount}}/{{applyInfo.maxAmount}}</h3>
							</div>
							<div>
								<p class="small opa-6">{{$t("Gemstone_24")}}</p>
								<h3>{{ numFloor(applyInfo.maxLuckyAmount / (Number(applyInfo.nowAmount) >= Number(applyInfo.maxLuckyAmount)?applyInfo.nowAmount:applyInfo.maxLuckyAmount) * 100, 1e3 ) || "-" }}%</h3>
							</div>
						</div>
					</section>
				
					<div class="mgt-10 aveage-box">
						<div class="dib por tac">
							<button class="btn-primary" style="margin:10px;width:80%" @click="oprDialog('box-apply-dialog', 'block')">{{$t("Gemstone_14")}}</button>
							<p style="position:absolute;width:200%;left:-50%" class="cur-point" @click="oprDialog('box-rule-dialog','block')">箱子申购规则>></p>
						</div>
						<div class="tac">
							<StatuButton style="width:80%" :isDisable="this.myApplyInfo.boxAmount<=0" :isLoading="lockBtn.takeBoxLock > 0" :onClick="takeBox">领取{{this.myApplyInfo.boxAmount}}个BOX</StatuButton>
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
						<th width="30%" class="tal tac-xs">{{ $t("BOX_12") }}</th>
						<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
						<th width="10%">{{ $t("Gemstone_29") }}</th>
						<th width="20%">{{ $t("BOX_27") }}</th>
						<th width="40%" class="tar">TX</th>
					</tr>
					<tr v-for="item in getHistory" :key="item.tx">
						<td class="tal tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.crtime * 1000)) }}</td>
						<td class="tal">
							<span v-if="Number(item.ticketStartNo) > 1e6">{{$t("Gemstone_27")}}</span>
							<span v-else>{{$t("Gemstone_28")}}</span>
						</td>
						<td>x{{ item.amountBox }}</td>
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
		
		<BoxApply :applyInfo="applyInfo" :myApplyInfo="myApplyInfo" />
		<Dialog id="box-rule-dialog" :top="100" :width="520">
			<h2>{{$t("Gemstone_02")}}</h2>
			<p v-html="$t('Gemstone_03')" class="tal mgt-20"></p>
		</Dialog>
		<Dialog id="box-num-result-dialig" :top="100" :width="450">
			<h3>{{$t("Gemstone_17")}}</h3>
			<div class="tab-body mgt-10">
				<!-- <div class="aveage-box tab-content " style="padding:8px">
					<p class="tal opa-6">{{$t("Gemstone_18")}}</p>
					<p class="tar opa-6">{{$t("Gemstone_19")}}</p>
				</div> -->
				<!-- <div v-for="item in getRecordNoArr" :key="item.number">
					<div class="tab-split"></div>
					<div class="aveage-box tab-content small" style="padding:8px">
						<p class="tal">{{item.number}}</p>
						<p class="tar" v-if="historyDitail.isOver==true">
							<span v-if="item.isWins"><img :src="require(`@/assets/icon/${item.type}_icon.png`)" alt=""  height="30"></span>
							<span class="color-danger" v-else>{{$t("Gemstone_20")}}</span>
						</p>
						<p v-else-if="historyDitail.isOver == '-'" class="tar">
							<Loading />
						</p>
						<p v-else class="tar">{{$t("Gemstone_30")}}</p>
					</div>
				</div> -->
				<p class="mgt-10  tal" style="height:40px;line-height:38px;padding-left:15px;color:#fff;font-size:12px;background: rgba(27,84,245,0.10);border: 2px solid #1b54f5;border-radius:10px">
					{{$t("Gemstone_18")}}: {{historyDitail.item.ticketStartNo}}
					<span v-if="historyDitail.item.amountBox > 1">~{{Number(historyDitail.item.ticketStartNo) + Number(historyDitail.item.amountBox-1)}}</span>
				</p>
				<p class="mgt-10  tal" style="height:40px;line-height:38px;padding-left:15px;color:#fff;font-size:12px;background: rgba(161,250,64,0.10);border: 2px solid #A1FA40;border-radius:10px">
					中奖数量: 
					<span v-if="historyDitail.isOver">{{Object.keys(historyDitail.wins).length }}</span>
					<span v-else-if="historyDitail.isOver == '-' "><Loading /></span>
					<span v-else>{{$t("Gemstone_30")}}</span>
				</p>
				<div style="padding:10px" class="tal">
					<p class="small">中奖票号</p>
					<div class="tac mgt-10" style="background:#000;padding:10px 0px;border-radius:10px;max-height:300px; overflow-y:auto">
						<p v-if="historyDitail.isOver">
							<span  class="dib small" v-for="item in Object.keys(historyDitail.wins)" :key="item" style="background: #2a2f35;width: 30%;padding:10px 0px;margin:5px;border-radius:10px">
								{{item}}
							</span>
						</p>
						<span v-else-if="historyDitail.isOver == '-' "><Loading /></span>
						<span v-else>{{$t("Gemstone_30")}}</span>
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
import {  StatuButton, Dialog } from '@/components';

let  timer = null;

export default {
	mixins: [CommonMethod],
	components: {BoxApply, StatuButton, Dialog},
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
		})
	},
	computed:{
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			myTotalVeMbox: (state) => state.bnbState.data.myTotalVeMbox,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		getMaxApplyTimes(){
			let maxAmount = 0
			let myTotalVeMbox = this.myTotalVeMbox;

			if (myTotalVeMbox < 1500) {
				maxAmount = 0;
			} else if (myTotalVeMbox < 7500) {
				maxAmount = 3;
			} else if (myTotalVeMbox < 15000) {
				maxAmount = 15;
			} else if (myTotalVeMbox < 30000) {
				maxAmount = 25;
			} else if (myTotalVeMbox < 75000) {
				maxAmount = 40;
			} else if (myTotalVeMbox < 120000) {
				maxAmount = 70;
			} else if (myTotalVeMbox < 240000) {
				maxAmount = 80;
			} else {
				maxAmount = 100;
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
			console.log("getBoxApplyHistory",result);
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
</style>
