<style src="./style.css"></style>
<template>
	<Dialog id="gem-apply-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div @click="dialog_tab_pos =  0"  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >普通申购</div>
			<div @click="dialog_tab_pos =  1"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  >高级申购</div>
		</div>
		<div class="ly-input-content ">
			<p class="small tal opa-6">最多可申购数量: {{getMaxApplyTimes}}</p>
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
		
		<div class="aveage-box mgt-30 ly-input-content">
			<p class="vertical-children tal">
				<span>临时余额: {{myApplyInfo.frozenBalance}}</span>&nbsp;
				<img src="../../assets/coin/MBOX.png" alt="" height="20"/>
			</p>
			<div class="tar">
				<StatuButton v-if="applyInfo.roundState == 0" class="btn-small" :isDisable="Number(myApplyInfo.frozenBalance) <= 0">取回</StatuButton>
				<button v-else class="btn-primary disable-btn btn-small">已冻结</button>
			</div>
		</div>
		<div class="mgt-50">
			<p v-if="!isStartApply">本轮申购暂未开始</p>
			<p class="tac" v-if="Number(inputNum) > 0 && isCanApply">优先扣除#0#临时余额</p>
			<div class="mgt-10" :class="{'btn-group': mboxAllownceToApply == 0}">
				<StatuButton isDisable="" data-step="1" style="width:70%" :onClick="approve" v-if="mboxAllownceToApply == 0">授权MBOX</StatuButton>
				<StatuButton :isDisable="mboxAllownceToApply <= 0" data-step="2" class="mgt-10" style="width:70%" v-if="dialog_tab_pos == 0" :onClick="()=>applyForGem('normal')">普通申购</StatuButton>
				<StatuButton :isDisable="mboxAllownceToApply <= 0" data-step="2" class="mgt-10" style="width:70%" v-else :onClick="()=>applyForGem('high')">算力申购</StatuButton>
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
		}),
		getMaxApplyTimes(){
			if(this.dialog_tab_pos == 0) return 1;
			let maxAmount = 0
			let hashRate_ = this.eth_myHashrate;
			if (hashRate_ < 3) {
				maxAmount = 0;
			} else if (hashRate_ < 9) {
				maxAmount = 1;
			} else if (hashRate_ < 15) {
				maxAmount = 2;
			} else if (hashRate_ < 25) {
				maxAmount = 3;
			} else if (hashRate_ < 50) {
				maxAmount = 4;
			} else if (hashRate_ < 100) {
				maxAmount = 5;
			} else if (hashRate_ < 200) {
				maxAmount = 6;
			} else if (hashRate_ < 300) {
				maxAmount = 7;
			} else if (hashRate_ < 500) {
				maxAmount = 8;
			} else if (hashRate_ < 1000) {
				maxAmount = 9;
			} else {
				maxAmount = 10;
			}
			return maxAmount;
		},
		//获取当前已经申请的颗数
		getNowApplyNum(){
			let num = 0;
			let ticketObj = this.dialog_tab_pos == 0? this.myApplyInfo.userNormalTicket: this.myApplyInfo.userHighTicket;
			num = ticketObj[1] - ticketObj[0] + 1;
			if(ticketObj[0] == 0) num = 0;
			return num; 
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
		if(this.mboxAllownceToApply == -1){
			this.getAllownce();
		}
	},
	methods:{
		async getAllownce(){
			let res = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin.MBOX.addr, WalletConfig.ETH.momoGemApply);
			console.log("getAllownce", res);
			this.$store.commit("gemState/setData", {mboxAllownceToApply: Number(res)});
		},
		async approve(){

		},
		async applyForGem(type){
			if(Number(this.inputNum) <= 0) return;
			let hash = await Wallet.ETH.applyForGem(type, this.inputNum, ()=>{
				console.log("applyForGem recipt");
			});
			if(hash){
				console.log("applyForGem success");
			}
		}
	}
}
</script>