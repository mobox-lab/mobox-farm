<style src="./style.css"></style>
<template>
	<Dialog id="gem-apply-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div @click="dialog_tab_pos =  0"  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >普通申购</div>
			<div @click="dialog_tab_pos =  1"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  >算力申购</div>
		</div>
		<div class="ly-input-content ">
			<p class="small tal opa-6">可申购数量: {{getMaxApplyTimes - getNowApplyNum}}</p>
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
			<div class="aveage-box ly-input-content ">
				<p class="vertical-children tal">
					<span>申购冻结: {{numFloor(myApplyInfo.frozenBalance / 1e18, 1e4)}}</span>&nbsp;
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
						<StatuButton v-if="getHighApplyNum + getNormalApplyNum == 0" class="btn-small" :isDisable="Number(myApplyInfo.frozenBalance) <= 0">取回</StatuButton>
						<button v-else class="btn-primary disable-btn btn-small">已冻结</button>
					</div>
				</div>
			</template>
		</div>
		
		<div class="mgt-30">
			<p v-if="!isStartApply">本轮申购暂未开始</p>
			<div class="tac" v-if="Number(inputNum) > 0 && isCanApply">
				<p v-if="getCanUseTemMbox > 0">优先扣除{{getCanUseTemMbox > getNeedPayMbox? getNeedPayMbox: getCanUseTemMbox}}临时余额</p>
				<p >需要支付：{{getCanUseTemMbox > getNeedPayMbox? 0 : getNeedPayMbox -   getCanUseTemMbox}}MBOX</p>
			</div>
			<div  :class="{'btn-group': mboxAllownceToApply == 0}">
				<StatuButton :isLoading="lockBtn.mboxApproveToApplyLock > 0" data-step="1" class="mgt-10" style="width:70%" :onClick="approve" v-if="mboxAllownceToApply == 0">授权MBOX</StatuButton>
				<StatuButton :isDisable="mboxAllownceToApply <= 0 || !isCanApply" data-step="2" class="mgt-10" style="width:70%" v-if="dialog_tab_pos == 0" :onClick="()=>applyForGem('normal')">普通申购</StatuButton>
				<StatuButton  :isDisable="mboxAllownceToApply <= 0 || !isCanApply" data-step="2" class="mgt-10" style="width:70%" v-else :onClick="()=>applyForGem('high')">算力申购</StatuButton>
			</div>
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
		getCanUseTemMbox(){
			let totalApplyNum = this.getHighApplyNum + this.getNormalApplyNum;
			let balance = Number(this.myApplyInfo.frozenBalance) - Number(this.applyInfo.roundPrice) * totalApplyNum;
			return Number(this.numFloor(balance/1e18, 1e4));
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
			return isCanApply;
		},
		//是否开始申购
		isStartApply(){
			return this.applyInfo.roundState == 0;
		}
	},
	async created(){
		await Wallet.ETH.getAccount();
		this.getAllownce();
	},
	methods:{
		async getAllownce(){
			let res = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.momoGemApply);
			console.log("getAllownce", res);
			this.unLockBtn("mboxApproveToApplyLock");
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
				console.log("applyForGem recipt");
				this.$parent.getUserApplyInfo();
			});
			if(hash){
				console.log("applyForGem success");
			}
		}
	}
}
</script>