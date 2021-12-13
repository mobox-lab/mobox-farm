<template>
	<Dialog id="mecBox-apply-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div @click="dialog_tab_pos =  1; inputNum = ''"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  >{{$t("Gemstone_52")}}</div>
			<div @click="dialog_tab_pos =  0;inputNum = '' "  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >{{$t("Gemstone_51")}}</div>
		</div>
		<div class="ly-input-content por">
			<p class="small tal mgt-10">{{$t("MECBOX_04").replace("#0#",getMaxApplyTimes)}}</p>
			<div class="por mgt-5">
				<div class="ly-input-pre-icon">
					<img src="@/assets/box/mecbox.png"  alt="">
				</div>
				<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
					v-int :data-max="getMaxApplyTimes" data-min="1" v-model="inputNum" :placeholder="$t('MECBOX_05')" />
				<div class="dib" style="width: 30%">
					<button @click="inputNum = getMaxApplyTimes" class="btn-primary btn-small" style="width: 80%" >
						Max
					</button>
				</div>
			</div>
			<div class="mgt-10 aveage-box small">
				<p class="tal">{{$t("MECBOX_06")}}: {{getNowApplyNum}}</p>
				<p class="vertical-children tar">
					<span>{{$t("MECBOX_07")}}: {{numFloor(applyInfo.price / 1e18, 1e4)}}</span>&nbsp;
					<img src="@/assets/coin/MBOX.png" alt="" height="20"/>
				</p>
			</div>
		</div>
		
		<div class=" tal ly-input-content" style="margin-top:2px" v-if="getNowApplyNum > 0">
			<p style="">{{$t("MECBOX_17")}}: 
				{{getNowStartTicketNo[0]}}~{{getNowStartTicketNo[1]}}
			</p>
		</div>
	
		<div class="mgt-30">
			<div class="aveage-box ly-input-content " v-if="numFloor(myApplyInfo.frozenBalance / 1e18, 1e4) > 0 && getHashRateApplyNum + getVeMobxApplyNum > 0 ">
				<p class="vertical-children tal">
					<span>{{$t("MECBOX_30")}}: {{getStakeMbox}}</span>&nbsp;
					<img src="@/assets/coin/MBOX.png" alt="" height="20"/>
				</p>
			</div>
			<template v-if="getCanUseTemMbox > 0">
				<div class="aveage-box  ly-input-content mgt-10">
					<p class="vertical-children tal">
						<span>{{$t("MECBOX_08")}}: {{ getCanUseTemMbox }}</span>&nbsp;
						<img src="@/assets/coin/MBOX.png" alt="" height="20"/>
					</p>
					<div class="tar">
						<StatuButton style="width:50%" :onClick="takeMbox" :isLoading="lockBtn.takeMboxLock > 0" v-if="getHashRateApplyNum + getVeMobxApplyNum == 0" class="btn-small" :isDisable="Number(myApplyInfo.frozenBalance) <= 0">{{$t("Gemstone_10")}}</StatuButton>
						<button v-else class="btn-primary disable-btn btn-small">{{$t("MECBOX_09")}}</button>
					</div>
				</div>
			</template>
		</div>
		
		<div class="mgt-50">
			<span v-if="Number(applyInfo.startTime)  > nowTs ">{{$t("MECBOX_33")}}</span>
			<template v-else>
				<p v-if="!isStartApply">{{$t("MECBOX_21")}}<span class="dotting"></span></p>
				<div class="tac" v-if="Number(inputNum) > 0 && isCanApply">
					<p v-if="getCanUseTemMbox > 0">{{$t("MECBOX_11").replace("#0#",getCanUseTemMbox > getNeedPayMbox? getNeedPayMbox: getCanUseTemMbox)}}</p>
					<p >{{$t("MECBOX_12").replace("#0#", getCanUseTemMbox > getNeedPayMbox? 0 : numFloor(getNeedPayMbox -   getCanUseTemMbox, 1e3))}}</p>
				</div>
			</template>

			<div  :class="{'btn-group': needApprove}">
				<StatuButton :isLoading="lockBtn.mboxApproveToApplyLock > 0" data-step="1" class="mgt-10" style="width:70%" :onClick="approve" v-if="needApprove">{{$t("Air-drop_16")}} MBOX</StatuButton>
				<StatuButton :isLoading="lockBtn.applyBuyLock > 0" :isDisable="needApprove || !isCanApply" data-step="2" class="mgt-10" style="width:70%"  :onClick="()=>applyBuy(dialog_tab_pos == 0?'hashRateApplyFor':'veMoboxApplyFor')">
					<template >
						<span v-if="dialog_tab_pos == 0">{{$t("Gemstone_51")}}</span>
						<span v-else>{{$t("Gemstone_52")}}</span>
					</template>
				</StatuButton>
			</div>
			<p class="small mgt-5 opa-6">
				{{$t("Air-drop_11")}}: {{Number(coinArr["MBOX"].balance) || 0}}MBOX
			</p>
			<p class="small opa-6 mgt-10">{{$t("MECBOX_13")}}</p>
		</div>
	</Dialog>
</template>
<script>
import { Dialog, StatuButton } from '@/components';
import { mapState } from 'vuex';
import CommonMethod from '@/mixin/CommonMethod';
import { Wallet } from '@/utils';
import { WalletConfig, PancakeConfig } from '@/config';

export default {
	mixins: [CommonMethod],
	components: {Dialog, StatuButton},
	props: ["applyInfo", "myApplyInfo"],
	data(){
		return({
			inputNum: "",
			dialog_tab_pos: 1,
			mboxAllownceToApply: -1,
		})
	},
	computed:{
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			nowTs: (state) => state.globalState.data.nowTs,
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		getMaxApplyTimes(){
			return this.dialog_tab_pos == 0?this.$parent.getMaxPowerApplyTimes: this.$parent.getMaxVeMboxApplyTimes;
		},
		//获取当前已经申请的颗数
		getNowApplyNum(){
			let num = this.dialog_tab_pos == 0? this.getHashRateApplyNum: this.getVeMobxApplyNum;
			return num; 
		},
		getNowStartTicketNo(){
			let ticketObj = this.dialog_tab_pos == 0? this.myApplyInfo.hashRateTicket:  this.myApplyInfo.veMoboxTicket;
			return ticketObj;
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
		//获取质押完还可以用mbox
		getCanUseTemMbox(){
			let totalApplyNum = this.getHashRateApplyNum + this.getVeMobxApplyNum;
			let balance = Number(this.myApplyInfo.frozenBalance) - Number(this.applyInfo.price) * totalApplyNum;
			return Number(this.numFloor(balance/1e18, 1e4));
		},
		
		//获取质押的Mbox
		getStakeMbox(){
			let totalApplyNum = this.getHashRateApplyNum + this.getVeMobxApplyNum
			return this.numFloor(Number(this.applyInfo.price) * totalApplyNum /1e18, 1e4);
		},
		getNeedPayMbox(){
			return Number(this.numFloor(this.applyInfo.price / 1e18, 1e4) * Number(this.inputNum));
		},
		needApprove(){
			return Number(this.mboxAllownceToApply)/1e18 < this.getNeedPayMbox && this.mboxAllownceToApply != -1
		},
		//获取当前是否可以发起申购
		isCanApply(){
			let isCanApply = true;
			//已经申购过
			if(this.getNowApplyNum > 0) isCanApply = false;
			//输入次数大于可以申购次数
			if(this.getMaxApplyTimes < Number(this.inputNum)) isCanApply = false;
			//申购还没有开始
			if(!this.isStartApply) isCanApply = false;
			//没有输入
			if(Number(this.inputNum) <= 0) isCanApply = false;

			//高级申购已达到最大申购名额
			if(this.dialog_tab_pos == 1 && Number(this.applyInfo.nowAmount) + Number(this.inputNum) >  Number(this.applyInfo.maxAmount)) isCanApply = false;

			return isCanApply;
		},
	
		//是否开始申购
		isStartApply(){
			return this.applyInfo.roundState == 0;
		}
	},
	async created(){
		await Wallet.ETH.getAccount();
		await this.getAllownce();

		this.unLockBtn("mboxApproveToApplyLock");
	},
	methods:{
		async getAllownce(){
			let res = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.mecBoxApply);
			if(res){
				this.mboxAllownceToApply = Number(res);
			}
		},
		async approve(){
			let hash = await Wallet.ETH.approveErcToTargetOnRecipt(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.mecBoxApply, ()=>{
				this.getAllownce();
			})
			if(hash){
				this.lockBtnMethod("mboxApproveToApplyLock");
			}
		},
		async applyBuy(fcName){
			if(this.getNeedPayMbox > Number(this.coinArr["MBOX"].balance) + this.getCanUseTemMbox){
				this.getConfirmDialog().show(this.$t('Common_30'), ()=>this.showSwapBox())
				return
			}
			if(Number(this.inputNum) <= 0) return;

			if(Number(this.inputNum) < this.getMaxApplyTimes){
				this.getConfirmDialog().show(this.$t("Gemstone_68"),()=>this.submitApply(fcName))
			}else{
				this.submitApply(fcName)
			}
			
		},
		async submitApply(fcName){
			let hash = await Wallet.ETH.Group.Enhancer.applyBuy(fcName, this.inputNum, ()=>{
				this.$parent.getUserApplyInfo();
				this.$parent.getApplyInfo();
				this.inputNum = "";
			});
			if(hash){
				this.lockBtnMethod("applyBuyLock");
			}
		},
		//领取多余的MBox
		async takeMbox(){
			let hash = await Wallet.ETH.Group.Enhancer.claimfrozenMbox(()=>{
				this.$parent.getUserApplyInfo();
			});
			if(hash){
				this.lockBtnMethod("takeMboxLock");
			}
		},
	}
}
</script>