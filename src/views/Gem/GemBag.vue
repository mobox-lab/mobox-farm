<style src="./style.css"></style>
<template>
	<Dialog id="gemBag-dialog" :top="100" :width="450" :animation="isApprove">
		<ul class="gem-tab">
			<li v-for="item in gemType" :key="item" :class="['border_'+item, {active: item == selectGemType}]" class="tab-menu" @click="selectGemLv=1;needCompNum=1;selectGemType = item">
				<img :src="require(`@/assets/gem/${item+1}.png`)" alt=""  height="100%">
			</li>
		</ul>
		<div class="ly-input-content por">
			<div class="aveage-box" v-for="item in [0, 4, 8]" :key="item">
				<div v-for="item2 in [1,2,3, 4]" :key="item + item2" style="padding:5px" >
					<div v-if="item + item2 <= 9" class="gem-item gem-border" :class="[{active: selectGemLv == item+item2},  'border_'+selectGemType, {'opa-6': gemBag[Number(selectGemType)+item + item2] <= 0}]" @click="selectGemLv = item+item2">
						<img :src="require(`@/assets/gem/${Number(selectGemType)+item + item2}.png`)" alt=""  width="100%">
						<span class="gem-num stroke bold">{{gemBag[Number(selectGemType)+item + item2]}}</span>
					</div>
				</div>	
			</div>
		</div>
		<div v-if="selectGemLv <= 4" class="ly-input-content mgt-10">
			<div class="small opa-6 mgt-10">
				{{$t("Gemstone_34")}}
			</div>
			<div class="mgt-20 aveage-box" >
				<div class="tar">
					<div class="gem-item dib" style=" width:70px;height:70px">
						<img :src="require(`@/assets/gem/${Number(selectGemType)+selectGemLv}.png`)" alt="" width="100%">
						<span class="gem-num stroke bold">{{getCompObj.consumeNum}}/3</span>
					</div>
				</div>
				<div style="flex: 2" class="tac">
					<div>
						<button class="btn-primary btn-small" @click="needCompNum=1">Min</button>&nbsp;
						<SelectNum :needHideReduce="false" :maxNum="getCompObj.maxComp"  :defaultNum="needCompNum" :data="{needGemLv: selectGemLv-1}" :onChange="onNumChange" />&nbsp;
						<button class="btn-primary btn-small" @click="needCompNum=getCompObj.maxComp" >Max</button> 
					</div>
					<div class="mgt-10" :class="{'btn-group': !hasApprove && hasApprove != -1}">
						<StatuButton v-if="hasApprove != -1 && !hasApprove" data-step="1" :onClick="approve.bind(this)" :isLoading="lockBtn.approveLock > 0" style="width:70%" >
							{{$t("Air-drop_16")}}
						</StatuButton>
						<StatuButton data-step="2" class="mgt-10" :onClick="compGem.bind(this)" style="width:70%" :isDisable="!hasApprove || needCompNum <= 0 || needCompNum > getCompObj.maxComp" :isLoading="lockBtn.compGemLock > 0">
							{{$t("Gemstone_25")}}
						</StatuButton>
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="selectGemLv == 5"  class="ly-input-content mgt-10">
			{{$t("Gemstone_35")}}
		</div>
		<div v-else  class="ly-input-content mgt-10">{{$t("Gemstone_36")}}</div>
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
			gemType: [100,200,300,400],
			selectGemType: 100,
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
			let gemId = Number(this.selectGemType)+Number(this.selectGemLv);
			retObj.consumeNum = this.gemBag[gemId] || 0;
			retObj.maxComp = parseInt(retObj.consumeNum / 3);
			return retObj;
		}
	},
	async created(){
		await Wallet.ETH.getAccount();
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
			let gemId = Number(this.selectGemType) + Number(this.selectGemLv);
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
