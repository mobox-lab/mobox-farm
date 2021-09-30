<style src="./style.css"></style>
<template>
	<Dialog id="gem-apply2-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div @click="$parent.tabPos =  1; inputNum = ''"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  >{{$t("Gemstone_52")}}</div>
			<div @click="$parent.tabPos =  0;inputNum = '' "  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >{{$t("Gemstone_51")}}</div>
		</div>
		<div class="ly-input-content por">
			<div class="tac">
				<p class="small tal">{{$t("Gemstone_59")}}</p>
				<div class="dib tac mgt-10" style="background:#000;border-radius: 20px;padding:5px">
					<div v-for="item in [101,201,301,401]" :key="item" class="tac gem-select-item dib cur-point" :class="{active: item == selectGemType}" @click="selectGemType = item">
						<img :src="require(`@/assets/icon/${gemTypeToIcon[item]}.png`)" alt="" height="100%">
					</div>
				</div>
			</div>
			<p class="small tal mgt-10">{{$t("Gemstone_04").replace("#0#",getMaxApplyTimes)}}</p>
			<div class="por mgt-5">
				<div class="ly-input-pre-icon">
					<img  :src="require(`@/assets/icon/${gemTypeToIcon[selectGemType]}.png`)" alt="" />
				</div>
				<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
					v-int :data-max="getMaxApplyTimes" data-min="1" v-model="inputNum" :placeholder="$t('Gemstone_05')" />
				<div class="dib" style="width: 30%">
					<button @click="inputNum = getMaxApplyTimes" class="btn-primary btn-small" style="width: 80%" >
						Max
					</button>
				</div>
			</div>
			<div class="mgt-10 aveage-box small">
				<p class="tal">{{$t("Gemstone_06")}}: {{getNowApplyNum}}</p>
				<p class="vertical-children tar">
					<span>{{$t("Gemstone_07")}}: {{numFloor(applyInfo.price / 1e18, 1e4)}}</span>&nbsp;
					<img src="@/assets/coin/MBOX.png" alt="" height="20"/>
				</p>
			</div>
		</div>
		
		<div class=" tal ly-input-content" style="margin-top:2px" v-if="getNowApplyNum > 0">
			<p style="">{{$t("Gemstone_18")}}: 
				<span v-for="item in getNowApplyNum" :key="dialog_tab_pos+'_'+item"><small v-if="item > 1"> ,</small>{{Number(getNowStartTicketNo) + item - 1}}</span>
			</p>
		</div>
	
		<div class="mgt-30">
			<div class="aveage-box ly-input-content " v-if="numFloor(myApplyInfo.frozenBalance / 1e18, 1e4) > 0 && getHashRateApplyNum + getVeMobxApplyNum > 0 ">
				<p class="vertical-children tal">
					<span>{{$t("Gemstone_37")}}: {{getStakeMbox}}</span>&nbsp;
					<img src="@/assets/coin/MBOX.png" alt="" height="20"/>
				</p>
			</div>
			<template v-if="getCanUseTemMbox > 0">
				<div class="aveage-box  ly-input-content mgt-10">
					<p class="vertical-children tal">
						<span>{{$t("Gemstone_08")}}: {{ getCanUseTemMbox }}</span>&nbsp;
						<img src="@/assets/coin/MBOX.png" alt="" height="20"/>
					</p>
					<div class="tar">
						<StatuButton style="width:50%" :onClick="takeMbox" :isLoading="lockBtn.takeMboxLock > 0" v-if="getHashRateApplyNum + getVeMobxApplyNum == 0" class="btn-small" :isDisable="Number(myApplyInfo.frozenBalance) <= 0">{{$t("Gemstone_10")}}</StatuButton>
						<button v-else class="btn-primary disable-btn btn-small">{{$t("Gemstone_09")}}</button>
					</div>
				</div>
			</template>
			<template v-if="getOldFeozenBalance > 0">
				<div class="  ly-input-content mgt-20">
					<p class="tal small opa-6 ">{{$t("Gemstone_66")}}</p>
					<div class="aveage-box">
						<p class="vertical-children tal">
							<span>{{$t("Gemstone_08")}}: {{ getOldFeozenBalance }}</span>&nbsp;
							<img src="@/assets/coin/MBOX.png" alt="" height="20"/>
						</p>
						<div class="tar">
							<StatuButton style="width:50%" :onClick="takeMbox_old" :isLoading="lockBtn.takeMboxLock > 0"  class="btn-small" >{{$t("Gemstone_10")}}</StatuButton>
						</div>
					</div>
				</div>
			</template>
		</div>
		
		<div class="mgt-50">
			<span v-if="Number(applyInfo.startTime)  > nowTs ">{{$t("Gemstone_60")}}</span>
			<template v-else>
				<p v-if="!isStartApply">{{$t("Gemstone_22")}}<span class="dotting"></span></p>
				<div class="tac" v-if="Number(inputNum) > 0 && isCanApply">
					<p v-if="getCanUseTemMbox > 0">{{$t("Gemstone_11").replace("#0#",getCanUseTemMbox > getNeedPayMbox? getNeedPayMbox: getCanUseTemMbox)}}</p>
					<p >{{$t("Gemstone_12").replace("#0#", getCanUseTemMbox > getNeedPayMbox? 0 : numFloor(getNeedPayMbox -   getCanUseTemMbox, 1e3))}}</p>
				</div>
			</template>

			<div  :class="{'btn-group': needApprove}">
				<StatuButton :isLoading="lockBtn.mboxApproveToApplyLock > 0" data-step="1" class="mgt-10" style="width:70%" :onClick="approve" v-if="needApprove">{{$t("Air-drop_16")}} MBOX</StatuButton>
				<StatuButton :isLoading="lockBtn.applyGemLock > 0" :isDisable="needApprove || !isCanApply" data-step="2" class="mgt-10" style="width:70%"  :onClick="()=>applyForGem(dialog_tab_pos == 0?'hashRateApplyForGem':'veMoboxApplyForGem')">
					<!-- <span v-if="gemApplyEndCountDown <=0">{{$t("Gemstone_50")}}</span> -->
					<template >
						<span v-if="dialog_tab_pos == 0">{{$t("Gemstone_51")}}</span>
						<span v-else>{{$t("Gemstone_52")}}</span>
					</template>
				</StatuButton>
			</div>
			<p class="small mgt-5 opa-6">
				{{$t("Air-drop_11")}}: {{Number(coinArr["MBOX"].balance) || 0}}MBOX
			</p>
			<p class="small opa-6 mgt-10">{{$t("Gemstone_13")}}</p>
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
	props: ["applyInfo", "myApplyInfo", "myApplyInfo_old"],
	data(){
		return({
			inputNum: "",
			// dialog_tab_pos: 0,
			selectGemType: 101,
			gemTypeToIcon: {
				101:"red_icon",
				201:"green_icon",
				301:"blue_icon",
				401:"yellow_icon",
			}
		})
	},
	computed:{
		...mapState({
			eth_myHashrate: (state) => state.ethState.data.myHashrate,
			mboxAllownceToApply: (state) => state.gemState.data.mboxAllownceToApply,
			gemApplyEndCountDown: (state) => state.globalState.data.gemApplyEndCountDown,
			lockBtn: (state) => state.globalState.data.lockBtn,
			nowTs: (state) => state.globalState.data.nowTs,
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		dialog_tab_pos(){
			return this.$parent.tabPos;
		},
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
			return ticketObj[0];
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
		getOldFeozenBalance(){
			let balance = Number(this.myApplyInfo_old.frozenBalance);
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
			return Number(this.mboxAllownceToApply)/1e18 < this.getNeedPayMbox
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
			//余额不足
			// if(this.getNeedPayMbox > Number(this.coinArr["MBOX"].balance) + this.getCanUseTemMbox) isCanApply = false;

			//申购已结束
			// if(this.gemApplyEndCountDown <= 0) isCanApply = false;

			//高级申购已达到最大申购名额
			if(this.dialog_tab_pos == 1 && Number(this.applyInfo.nowAmount) + Number(this.inputNum) >  Number(this.applyInfo.maxAmount)) isCanApply = false;

			return isCanApply;
		},
		//是否高级申购并且申购名额已经满了
	
		//是否开始申购
		isStartApply(){
			return this.applyInfo.roundState == 0;
		}
	},
	async created(){
		await Wallet.ETH.getAccount();
		await this.getAllownce();

		this.unLockBtn("applyGemLock");
		this.unLockBtn("mboxApproveToApplyLock");
	},
	methods:{
		async getAllownce(){
			let res = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.newGemApply);
			this.$store.commit("gemState/setData", {mboxAllownceToApply: Number(res)});
		},
		async approve(){
			let hash = await Wallet.ETH.approveErcToTargetOnRecipt(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.newGemApply, ()=>{
				this.getAllownce();
			})
			if(hash){
				this.lockBtnMethod("mboxApproveToApplyLock");
			}
		},
		async applyForGem(fcName){
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
			let type = Number(this.selectGemType.toString()[0]) - 1;
			let hash = await Wallet.ETH.Group.Gem.applyForGem(fcName, type, this.inputNum, ()=>{
				this.$parent.getUserApplyInfo();
				this.unLockBtn("applyGemLock");
				this.inputNum = "";
			});
			if(hash){
				this.lockBtnMethod("applyGemLock");
			}
		},
		//领取多余的MBox
		async takeMbox(){
			let hash = await Wallet.ETH.Group.Gem.claimfrozenMbox(()=>{
				this.$parent.getUserApplyInfo();
			});
			if(hash){
				this.lockBtnMethod("takeMboxLock");
			}
		},
		async takeMbox_old(){
			let hash = await Wallet.ETH.takeMbox(()=>{
				this.$parent.getUserApplyInfo();
			});
			if(hash){
				this.lockBtnMethod("takeMboxLock");
			}
		}
	}
}
</script>