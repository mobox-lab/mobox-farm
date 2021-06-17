<template>
	<div  class="tab-body tal">
		<div class="tab-content por">
			<p>{{$t('Air-drop_172')}}</p>
			<div class="aveage-box tac mgt-10" id="select-type">
				<div ><button class=" btn-small" :class="oprOrderIndex == 0?'btn-primary':'btn-default' " @click="oprOrderIndex=0">{{$t('Air-drop_173')}}</button></div>
				<div ><button class=" btn-small" :class="oprOrderIndex == 1?'btn-primary':'btn-default' " @click="oprOrderIndex=1">{{$t('Air-drop_174')}}</button></div>
				<div ><button class=" btn-small" :class="oprOrderIndex == 2?'btn-primary':'btn-default' " @click="oprOrderIndex=2">{{$t('Air-drop_175')}}</button></div>
			</div>
			<p class="tac mgt-10">{{$t('Air-drop_176')}}</p>
		</div>
		<div class="tab-split mgt-10"></div>
		<div class="tab-content">
			<!-- From -->
			<div class="tab-panel">
				<div class="aveage-box">
					<p class="tal small vertical-children">
						<span>{{$t("Air-drop_35")}}</span>&nbsp;
					</p>
					<p class="tar small">{{$t("Mine_05")}}: {{from.coinKey==""?"-":numFloor(coinArr[from.coinKey].veMbox.orderIndexs[oprOrderIndex].veMboxNum/1e18, 1e4)}} veMBOX</p>
				</div>
				<div class="aveage-box vertical-children mgt-10" >
					<div  style="flex:1 1 auto">
						<input style="width:100%" type="text" placeholder="0.0" v-model="from.inputValue" v-number  :data-max="from.coinKey==''?0:numFloor(coinArr[from.coinKey].veMbox.orderIndexs[oprOrderIndex].veMboxNum/1e18, 1e4)">
					</div>
					<p class="text-btn tac"  v-if="from.coinName != ''" @click="from.inputValue = numFloor(coinArr[from.coinKey].veMbox.orderIndexs[oprOrderIndex].veMboxNum/1e18, 1e4) ">Max</p>
					<p class="tar cur-point text-btn vertical-children" @click="openSelectPool('from')">
					<!-- <p class="tar cur-point text-btn vertical-children" > -->
						<span  v-if="from.coinKey != '' ">
							<div  :class="from.isLP?'double-img':'' " v-if="from.coinKey != ''" style="height:40px;zoom:0.5" class="dib por">
								<img v-for="(name, key) in from.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="40" alt="" />
							</div>
							<span class="mgl-5">{{from.coinName}}</span>
						</span>
						<span v-else>{{$t("Air-drop_38")}}</span>
						<svg viewBox="0 0 24 24"  width="20px" ><path fill="#838689" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
					</p>
				</div>
			</div>
			<div class="mgt-10 tac">
				<button class="icon-btn">
					<svg viewBox="0 0 24 24"  width="24px" ><path fill="#838689" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				</button>
			</div>
			<!-- To -->
			<div class="tab-panel mgt-10">
				<div class="aveage-box">
					<p class="tal small vertical-children">
						<span>{{$t("Air-drop_36")}}</span>&nbsp;
					</p>
					<p class="tar small">{{$t("Mine_05")}}: {{to.coinKey==""?"-":numFloor(coinArr[to.coinKey].veMbox.orderIndexs[oprOrderIndex].veMboxNum/1e18, 1e4)}} veMBOX</p>
				</div>
				<div class="aveage-box vertical-children mgt-10">
					<div style="flex:1 1 auto;">
						<input style="width:100%" type="text" placeholder="0.0" v-model="from.inputValue"  readonly >
					</div>
					<p class="tar text-btn vertical-children" @click="openSelectPool('to')">
					<!-- <p class="tar text-btn vertical-children" > -->
						<span  v-if="to.coinName != '' ">
							<div  :class="to.isLP?'double-img':'' " v-if="to.coinName != ''" style="height:40px;zoom:0.5" class="dib por">
								<img v-for="(name, key) in to.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="40" alt="" />
							</div>
							<span class="mgl-5">{{to.coinName}}</span>
						</span>
						<span v-else>{{$t("Air-drop_38")}}</span>
						<svg viewBox="0 0 24 24"  height="20px" ><path fill="#838689" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
					</p>
				</div>
			</div>

			<div class="mgt-20 tac">
				<StatuButton :isDisable="!canTransfer" :onClick="transferVeMbox" :isLoading="lockBtn.moveVeMboxLock > 0">{{$t('Air-drop_177')}}</StatuButton>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { StatuButton } from '@/components';
import CommonMethod from '@/mixin/CommonMethod';
import { Wallet } from '@/utils';
import { PancakeConfig } from '@/config';

export default {
	mixins: [CommonMethod],
	components: {StatuButton},
	props:["oprData"],
	data(){
		return({
			oprOrderIndex: 0,
			from: {
				coinKey: "",
				coinName: "",
				isLP: true,
				inputValue: "",
			},
			to: {
				coinKey: "",
				coinName: "",
				isLP: true,
			},
			timer: null,
			stepTime: 500,
		})
	},
	watch: {
		oprData: function(newOprData){
			if(newOprData.coinKey != ""){
				this.from.coinKey = newOprData.coinKey;
				this.from.coinName = newOprData.coinName;
				this.from.isLP = newOprData.isLP;
				this.oprOrderIndex = 0;
			}
		}
	},
	computed:{
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		canTransfer(){
			let isCanTransfer = true;
			if(this.from.coinKey == "") isCanTransfer = false;
			if(this.from.inputValue == "") isCanTransfer = false;

			if(this.to.coinKey == "") isCanTransfer = false;

			return isCanTransfer;
		}
	},
	methods: {
		async transferVeMbox(){
			let obj = {
				moveVeMobox_ : Number(this.from.inputValue),
				fromPool_ : PancakeConfig.StakeLP[this.from.coinKey].pIndex,
				toPool_: PancakeConfig.StakeLP[this.to.coinKey].pIndex,
				orderIndex_: this.oprOrderIndex
			}
			this.from.inputValue = "";
			let hash = await Wallet.ETH.moveStake(obj);
			if(hash){
				this.lockBtnMethod("moveVeMboxLock");
			}
		},
		openSelectPool(type){
			this.$parent.$parent.$refs.selectOprPool.setOprData([this.from.coinName, this.to.coinName], this.oprOrderIndex,this.onSelectPool.bind(this, type)).show();
		},
		onSelectPool(type, coinKey){
			console.log({type, coinKey});
			this[type].coinKey = coinKey;
			this[type].coinName =  this.coinArr[coinKey].coinName;
			this[type].isLP =  this.coinArr[coinKey].isLP;
		},
	}
}
</script>


<style scoped>
	#select-type .btn-small{
		width: 80%;
	}
</style>