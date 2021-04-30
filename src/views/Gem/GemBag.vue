<style src="./style.css"></style>
<template>
	<Dialog id="gemBag-dialog" :top="100" :width="450">
		<ul class="gem-tab">
			<li v-for="item in gemType" :key="item" :class="['border_'+item, {active: item == selectGemType}]" class="tab-menu" @click="selectGemLv=1;selectGemType = item">
				<img :src="require(`@/assets/gem/${item}_1.png`)" alt=""  height="100%">
			</li>
		</ul>
		<div class="ly-input-content por">
			<div class="aveage-box" v-for="item in [0, 4, 8]" :key="item">
				<div v-for="item2 in [1,2,3, 4]" :key="item + item2" style="padding:5px" >
					<div v-if="item + item2 <= 9" class="gem-item gem-border" :class="[{active: selectGemLv == item+item2},  'border_'+selectGemType, {'opa-6': gemBag[selectGemType+(item + item2)] <= 0}]" @click="selectGemLv = item+item2">
						<img :src="require(`@/assets/gem/${selectGemType}_${item + item2}.png`)" alt=""  width="100%">
						<span class="gem-num stroke bold">{{gemBag[selectGemType+(item + item2)]}}</span>
					</div>
				</div>	
			</div>
		</div>
		<div v-if="selectGemLv <= 8" class="ly-input-content mgt-10">
			<div class="small opa-6 mgt-10">
				宝石合成:三个低级的宝石合成下一等级的宝石
			</div>
			<div class="mgt-20 aveage-box" >
				<div class="tar">
					<div class="gem-item dib" style=" width:70px;height:70px">
						<img :src="require(`@/assets/gem/${selectGemType}_${selectGemLv}.png`)" alt="" width="100%">
						<span class="gem-num stroke bold">{{getCompObj.consumeNum}}/3</span>
					</div>
				</div>
				<div style="flex: 2" class="tac">
					<div>
						<button class="btn-primary btn-small" @click="needCompNum=1" v-if="getCompObj.maxComp > 10">Min</button>&nbsp;
						<SelectNum :needHideReduce="false" :maxNum="getCompObj.maxComp"  :defaultNum="needCompNum" :data="{needGemLv: selectGemLv-1}" :onChange="onNumChange" />&nbsp;
						<button class="btn-primary btn-small" @click="needCompNum=getCompObj.maxComp" v-if="getCompObj.maxComp > 10">Max</button> 
					</div>
					<div class="mgt-10" :class="{'btn-group': !hasApprove && hasApprove != -1}">
						<StatuButton v-if="hasApprove != -1 && !hasApprove" data-step="1" :onClick="approve.bind(this)" :isLoading="lockBtn.approveLock > 0" style="width:70%" >
							授权宝石
						</StatuButton>
						<StatuButton data-step="2" class="mgt-10" :onClick="compGem.bind(this)" style="width:70%" :isDisable="!hasApprove || needCompNum <= 0 || needCompNum > getCompObj.maxComp" :isLoading="lockBtn.compGemLock > 0">
							合成
						</StatuButton>
					</div>
				</div>
			</div>
		</div>
	</Dialog>
</template>
<script>
import { Dialog, SelectNum, StatuButton } from '@/components';
import { mapState } from 'vuex';
import { Wallet } from '@/utils';
import { CommonMethod } from '@/mixin';
import { WalletConfig } from '@/config';

export default {
	mixins: [CommonMethod],
	components: {Dialog, SelectNum, StatuButton},
	data(){
		return({
			selectGemLv: 1,
			gemType: ['red', 'green', 'blue', 'yellow'],
			gemTypeToNum:{"red": 100,"green": 200,"blue": 300,"yellow": 400,},
			selectGemType: "red",
			needCompNum: 1,
			hasApprove: -1,
		})
	},
	watch: {
		selectGemLv:function(){
			this.needCompNum = 1;
		},
		gemBag: function(){
			this.needCompNum = 1;
		}
	},
	computed:{
		...mapState({
			gemBag: (state) => state.gemState.data.gemBag,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		getCompObj(){
			let retObj = {
				consumeNum: 0,
				maxComp: 0,
			}
			retObj.consumeNum = this.gemBag[this.selectGemType+(this.selectGemLv)] || 0;
			retObj.maxComp = parseInt(retObj.consumeNum / 3);
			return retObj;
		}
	},
	created(){
		this.isApprove();
	},
	methods:{
		//查询宝石合约是被授权
		async isApprove(){
			let isApprove = await Wallet.ETH.isApprovedForAll(WalletConfig.ETH.momoGemToken, WalletConfig.ETH.momoGemOpr);
			console.log({isApprove});
			if(isApprove != null){
				this.hasApprove = isApprove;
			}
		},
		async approve(){
			let hash = await Wallet.ETH.approvedForAll(WalletConfig.ETH.momoGemToken, WalletConfig.ETH.momoGemOpr, ()=>{
				console.log("approve recipt");
				this.isApprove();
			});
			if(hash){
				this.lockBtnMethod("approveLock");
			}
		},
		async compGem(){
			let gemId = this.gemTypeToNum[this.selectGemType] + this.selectGemLv;
			let hash = await Wallet.ETH.gemLevelUp(gemId, this.needCompNum * 3);
			if(hash){
				this.lockBtnMethod("compGemLock");
			}
		},
		onNumChange(data, num){
			this.needCompNum += num;
			if(this.needCompNum <= 1 ) this.needCompNum = 1;
			if(this.needCompNum >= this.getCompObj.maxComp ) this.needCompNum =  this.getCompObj.maxComp;
		}
	}
}
</script>
