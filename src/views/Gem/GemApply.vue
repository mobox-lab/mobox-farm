<style src="./style.css"></style>
<template>
	<Dialog id="gem-apply-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div @click="dialog_tab_pos =  0;inputNum = '' "  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >普通申购</div>
			<div @click="dialog_tab_pos =  1; inputNum = ''"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  >算力申购</div>
		</div>
		<div class="ly-input-content por">
			<p class="small tal opa-6">可申购数量: {{getMaxApplyTimes}}</p>
			<div class="por mgt-5">
				<div class="ly-input-pre-icon">
					<img  :src="require(`../../assets/icon/${$parent.getShowApplyType}_icon.png`)" alt="" />
				</div>
				<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
					v-int :data-max="getMaxApplyTimes" data-min="1" v-model="inputNum" placeholder="请输入申购的宝石数量" />
				<div class="dib" style="width: 30%">
					<button @click="inputNum = dialog_tab_pos==0?1:getMaxApplyTimes" class="btn-primary btn-small" style="width: 80%" >
						Max
					</button>
				</div>
			</div>
			<div class="mgt-10 aveage-box small">
				<p class="tal">已提交的申购数量: {{getNowApplyNum}}</p>
				<p class="vertical-children tar">
					<span>申购单价: {{numFloor(applyInfo.roundPrice / 1e18, 1e4)}}</span>&nbsp;
					<img src="../../assets/coin/MBOX.png" alt="" height="20"/>
				</p>
			</div>
		</div>
		
		<div class=" tal ly-input-content" style="margin-top:2px" v-if="getNowApplyNum > 0">
			<p style="">我的申购号码: 
				<span v-for="item in getNowApplyNum" :key="dialog_tab_pos+'_'+item"><small v-if="item > 1"> ,</small>{{Number(getNowStartTicketNo) + item - 1}}</span>
			</p>
		</div>
	
		<div class="mgt-30">
			<div class="aveage-box ly-input-content " v-if="numFloor(myApplyInfo.frozenBalance / 1e18, 1e4) > 0 && getHighApplyNum + getNormalApplyNum > 0 ">
				<p class="vertical-children tal">
					<span>申购冻结: {{getStakeMbox}}</span>&nbsp;
					<img src="../../assets/coin/MBOX.png" alt="" height="20"/>
				</p>
			</div>
			<template v-if="getCanUseTemMbox > 0">
				<div class="aveage-box  ly-input-content mgt-10">
					<p class="vertical-children tal">
						<span>临时账户余额: {{ getCanUseTemMbox }}</span>&nbsp;
						<img src="../../assets/coin/MBOX.png" alt="" height="20"/>
					</p>
					<div class="tar">
						<StatuButton style="width:50%" :onClick="takeMbox" :isLoading="lockBtn.takeMboxLock > 0" v-if="getHighApplyNum + getNormalApplyNum == 0" class="btn-small" :isDisable="Number(myApplyInfo.frozenBalance) <= 0">取回</StatuButton>
						<button v-else class="btn-primary disable-btn btn-small">已冻结</button>
					</div>
				</div>
			</template>
		</div>
		
		<div class="mgt-50">
			<p v-if="!isStartApply">结算中<span class="dotting"></span></p>
			<div class="tac" v-if="Number(inputNum) > 0 && isCanApply">
				<p v-if="getCanUseTemMbox > 0">优先扣除{{getCanUseTemMbox > getNeedPayMbox? getNeedPayMbox: getCanUseTemMbox}}临时余额</p>
				<p >需要支付：{{getCanUseTemMbox > getNeedPayMbox? 0 : getNeedPayMbox -   getCanUseTemMbox}}MBOX</p>
			</div>
			<div  :class="{'btn-group': mboxAllownceToApply == 0}">
				<StatuButton :isLoading="lockBtn.mboxApproveToApplyLock > 0" data-step="1" class="mgt-10" style="width:70%" :onClick="approve" v-if="mboxAllownceToApply == 0">授权MBOX</StatuButton>
				<StatuButton :isLoading="lockBtn.applyGemLock > 0" :isDisable="mboxAllownceToApply <= 0 || !isCanApply" data-step="2" class="mgt-10" style="width:70%"  :onClick="()=>applyForGem(dialog_tab_pos == 0?'normal':'high')">
					<span v-if="dialog_tab_pos == 0">普通申购</span>
					<span v-else>算力申购</span>
				</StatuButton>
			</div>
			<p class="small mgt-5 opa-6">
				{{$t("Air-drop_11")}}: {{Number(coinArr["MBOX"].balance) || 0}}MBOX
			</p>
			<p class="small opa-6 mgt-10">注意：同一账户同一种申购只能发起一次</p>
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
			dialog_tab_pos: 0,
		})
	},
	computed:{
		...mapState({
			eth_myHashrate: (state) => state.ethState.data.myHashrate,
			mboxAllownceToApply: (state) => state.gemState.data.mboxAllownceToApply,
			lockBtn: (state) => state.globalState.data.lockBtn,
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		getMaxApplyTimes(){
			if(this.dialog_tab_pos == 0) return 1;
			let maxAmount = 0
			let hashRate_ = this.eth_myHashrate;

			if (hashRate_ < 100) {
				maxAmount = 0;
			} else if (hashRate_ < 500) {
				maxAmount = 1;
			} else if (hashRate_ < 1000) {
				maxAmount = 3;
			} else if (hashRate_ < 2000) {
				maxAmount = 5;
			} else if (hashRate_ < 4000) {
				maxAmount = 7;
			} else {
				maxAmount = 10;
			}
			return maxAmount;
		},
		//获取当前已经申请的颗数
		getNowApplyNum(){
			let num = this.dialog_tab_pos == 0? this.getNormalApplyNum: this.getHighApplyNum;
			return num; 
		},
		getNowStartTicketNo(){
			let ticketObj = this.dialog_tab_pos == 0? this.myApplyInfo.userNormalTicket:  this.myApplyInfo.userHighTicket;
			return ticketObj[0];
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
		//获取质押完还可以用mbox
		getCanUseTemMbox(){
			let totalApplyNum = this.getHighApplyNum + this.getNormalApplyNum;
			let balance = Number(this.myApplyInfo.frozenBalance) - Number(this.applyInfo.roundPrice) * totalApplyNum;
			return Number(this.numFloor(balance/1e18, 1e4));
		},
		//获取质押的Mbox
		getStakeMbox(){
			let totalApplyNum = this.getHighApplyNum + this.getNormalApplyNum
			return this.numFloor(Number(this.applyInfo.roundPrice) * totalApplyNum /1e18, 1e4);
		},
		getNeedPayMbox(){
			return Number(this.numFloor(this.applyInfo.roundPrice / 1e18, 1e4) * Number(this.inputNum));
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
			if(this.getNeedPayMbox > this.coinArr["MBOX"].balance) isCanApply = false;
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

		this.unLockBtn("applyGemLock");
		this.unLockBtn("mboxApproveToApplyLock");
	},
	methods:{
		async getAllownce(){
			let res = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.momoGemApply);
			this.$store.commit("gemState/setData", {mboxAllownceToApply: Number(res)});
		},
		async approve(){
			let hash = await Wallet.ETH.approveErcToTargetOnRecipt(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.momoGemApply, ()=>{
				this.getAllownce();
			})
			if(hash){
				this.lockBtnMethod("mboxApproveToApplyLock");
			}
		},
		async applyForGem(type){
			if(Number(this.inputNum) <= 0) return;
			let hash = await Wallet.ETH.applyForGem(type, this.inputNum, ()=>{
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