<template>
	<div class="tac center-content">
		<div class="por clear mgt-20 " style="border:1px solid #5d636f80;border-radius: 30px">
			<section class="col-md-7" style="padding:10px;">
				<div class="adv-panel por">
					<h1 class="vertical-children">
						<img src="@/assets/coin/MDX.png" alt="" height="35">
						<h2 class="dib mgl-5">{{$t("Air-drop_235")}}</h2>
						<img class="mgl-10 cur-point" @click="oprDialog('mdx-rule-dialog','block')" src="@/assets/icon/help.png" alt="" height="30">
					</h1>
					<div class="tac mgt-10">
						<template >
							<!-- <p v-if="getCountDown >0">{{$t("NewBOX_20")}}: {{getLeftTime(getCountDown)}}</p> -->
							<p v-if="getCountDown >0">{{Number(applyInfo.startTime) > nowTs?$t("Gemstone_53") :$t("NewBOX_20")}}: {{getLeftTime(getCountDown)}}</p>
							<p v-else>{{$t("NewBOX_21")}}<span class="dotting"></span></p>
						</template>
						<!-- <p >{{$t("Gemstone_57")}}: {{getLeftTime(1631678400 - nowTs )}}</p> -->

						<div style="height:280px" id="gem-apply-type" class="por">
							<p style="padding-top:20px">
								<img src="@/assets//box/mdxbox.png" height="200" alt="">
							</p>

							<p  style="position:absolute;bottom:60px;right:0px;">
								<a target="_blank" style="text-decoration:underline" href="https://bsc.mdex.co/#/swap?inputCurrency=0x9c65ab58d8d978db963e63f2bfb7121627e3a739&outputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56">
									<img src="@/assets/box/mdxlogo.png" alt="" height="20"> 
									<!-- MDEX.COM  -->
								</a>
							</p>
						</div>
						
					</div>
					<div style="padding:10px 0px;position:absolute;bottom:0px;width:100%;left:0px;background:#1F232A;border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;" class="tal rate-show">
						<div class="col-md-1"></div>
						<div class="col-md-2 col-xs-4 vertical-children mgt-5" v-for="item in rateObj" :key="item.lv">
							<div style="height:20px;width:20px;border-radius:20px;padding:2px;" class="dib dot-bg">
								<div style="width:100%;height:100%;border-radius:20px;border:2px solid #1B1C21" :class="`bg-new${item.lv}`"></div>
							</div>
							<div class="dib mgl-5" style="line-height:15px">
								<p>{{item.rate}}</p>
								<p class="vertical-children">
									<span>{{item.lang}} </span>
									<img src="@/assets/coin/MDX.png" alt="" height="20">
								</p>
							</div>
						</div>
						<div class="col-md-1"></div>
					</div>
				</div>
			</section>

			<section class="col-md-5" style="padding:10px">
				<div class="panel por" style="height:385px;padding:10px">
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
									<span class="cur-point por dib" v-popMsg  v-if="getHighApplyNum > 0">
										<img class="mgl-10" src="@/assets/icon/hasapply.png" alt="" height="30">
										<span class="popMsg left tac" style="min-width:80px;text-align:center" v-html="$t('Gemstone_67')"></span>
									</span>
								</p>
								<h3>{{getMaxApplyTimes}}</h3>
							</div>
						</div>
						<div class="aveage-box tal" style="padding:15px">
							<div >
								<p class="small opa-6">{{$t("Air-drop_261")}}</p>
								<h3>{{applyInfo.nowHighAmount}}/{{applyInfo.maxHighLuckyAmount}}</h3>
							</div>
							<div>
								<p class="small opa-6">{{$t("NewBOX_23")}}</p>
								<h3>{{ numFloor(applyInfo.maxHighLuckyAmount / (Number(applyInfo.nowHighAmount) >= Number(applyInfo.maxHighLuckyAmount)?applyInfo.nowHighAmount:applyInfo.maxHighLuckyAmount) * 100, 1e3 ) || "-" }}%</h3>
							</div>
						</div>
					</section>
				
					<div class="mgt-20 aveage-box" >
						<div class="dib por tac">
							<button class="btn-primary" style="margin:10px;width:80%" @click="oprDialog('mdx-apply-dialog', 'block')">{{$t("NewBOX_14")}}</button>
							<p style="position:absolute;width:200%;left:-50%" class="cur-point" @click="oprDialog('mdx-rule-dialog','block')">{{$t("Air-drop_236")}}>></p>
						</div>
						<div class="tac">
							<StatuButton  style="width:80%" :isDisable="this.myApplyInfo.boxAmount<=0" :isLoading="lockBtn.takeMdxBoxLock > 0" :onClick="takeBox">
								{{$t("Air-drop_242").replace("#0#", this.myApplyInfo.boxAmount)}}
							</StatuButton>
						</div>
					</div>

					<div class="vertical-children mgt-50" style="padding:5px">
						<span>{{$t("Air-drop_268")}}: {{mdxBalance}} </span>
						<img src="@/assets/coin/MDX.png" class="mgl-5" alt="" height="20">
						
					</div>

				</div>
				<div class="gemBag " @click="oprDialog('boxBag-dialog','block')" style="bottom:20px">
					<span class="notice-num " v-if="getTotalBoxNum > 0">{{getTotalBoxNum}}</span>
					<img  src="@/assets/box/boxbagicon.png" alt="" height="60" class="">
					<p class="stroke" :data-text="$t('Air-drop_262')">{{$t("Air-drop_262")}}</p>
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
			</section>
		</div>
		
		<MdxApply :applyInfo="applyInfo" :myApplyInfo="myApplyInfo" />
		<Dialog id="mdx-rule-dialog" :top="100" :width="520">
			<h2>{{$t("Air-drop_236")}}</h2>
			<p v-html="$t('Air-drop_237')" class="tal mgt-20"></p>
		</Dialog>
		<Dialog id="mdx-num-result-dialig" :top="100" :width="450">
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
import MdxApply from './MdxApply.vue';
import { mapState } from 'vuex';
import { Wallet, Http, Common } from '@/utils';
import {  StatuButton, Dialog, Loading } from '@/components';
import { PancakeConfig } from '@/config';

let  timer = null;

export default {
	mixins: [CommonMethod],
	components: {MdxApply, StatuButton, Dialog, Loading},
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
				{lv:1, rate: '50%', lang: '2'},
				{lv:2, rate: '30%', lang: '3'},
				{lv:3, rate: '16%', lang: '5'},
				{lv:4, rate: '3%', lang: '10'},
				{lv:5, rate: '1%', lang: '20'},
			],
			showRank: false,
		})
	},
	computed:{
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			canUseVeMbox: (state) => state.bnbState.data.canUseVeMbox,
			lockBtn: (state) => state.globalState.data.lockBtn,
			nowTs: (state) => state.globalState.data.nowTs,
			boxList: (state) => state.userState.data.boxList,
			mdxBalance: (state) => state.userState.data.mdxBalance,
		}),
		getMaxApplyTimes(){
			let maxAmount = 0
			let myTotalVeMbox = this.canUseVeMbox;

			if (myTotalVeMbox < 6000) {
				maxAmount = 0;
			} else if (myTotalVeMbox < 25000) {
				maxAmount = 3;
			} else if (myTotalVeMbox < 5e4) {
				maxAmount = 10;
			} else if (myTotalVeMbox < 20e4) {
				maxAmount = 15;
			} else if (myTotalVeMbox < 40e4) {
				maxAmount = 30;
			} else if (myTotalVeMbox < 75e4) {
				maxAmount = 35;
			} else {
				maxAmount = 40;
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
		getTotalBoxNum(){
			let num = 0;
			this.boxList.map(item=>{
				num += Number(item.num)
			});
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
					await this.getApplyHistory();
				}
			}
			if(count % 20 == 0){
				await this.getApplyInfo();
				await this.getUserApplyInfo();
				await this.getApplyHistory();
			}
		}, 1000);

		this.account = await Wallet.ETH.getAccount();
		await this.getUserApplyInfo();
		await this.getApplyHistory();
		
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
			this.oprDialog("mdx-num-result-dialig", "block");
			let {roundIndex} = item;
			let result = await Http.getMdxBoxApplyResult(this.account, roundIndex);
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
		async getApplyHistory(){
			let result = await Http.getMdxBoxApplyHistory(this.account);
			if(result){
				this.getHistory = result.list;
			}
		},
		//获取我的申购信息
		async getUserApplyInfo(){
			let result = await Wallet.ETH.Group.MdxBox.getMyApplyInfo();
			if(result){
				this.myApplyInfo = result;
			}
		},
		async getApplyInfo(){
			let result = await Wallet.ETH.Group.MdxBox.getRoundInfo();
			if(result){
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
			let hash = await Wallet.ETH.Group.MdxBox.claimfrozenBox(async ()=>{
				await Common.app.$refs.boxBag.getMyMdxBoxNum();
				await this.getUserApplyInfo();
			});
			if(hash){
				this.lockBtnMethod("takeMdxBoxLock");
			}
		},
		
	}
}
</script>

<style scoped>
.adv-panel:before{
	background: linear-gradient(145deg,#F55755 0%, #000  100%);
}

.notice-num{
	min-width: 17px;
	height: 17px;
	background: red;
	border-radius: 10px;
	font-size: 12px;
	color: #fff;
	display: inline-block;
	text-align: center;
	line-height: 16px;
	position: absolute;
	top: 3px;
	right: 0px;
	padding: 0px 2px;
}

@media (max-width: 768px) {
	.rate-show{
		zoom: 0.8;
		padding: 5px 20px !important;
	}
	.adv-panel{
		padding-bottom: 40px;
	}
}
</style>
