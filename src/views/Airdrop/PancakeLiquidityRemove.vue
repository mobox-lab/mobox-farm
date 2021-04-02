<template>
	<div class="tab-body" style="position:relative; z-index:998">
		<div class="tab-content">
			<div class="aveage-box">
				<div class="tal cur-point" @click="$parent.showRemoveLiquidityPanel = false">
					<svg style="transform:rotate(90deg)" viewBox="0 0 24 24"  width="24px" ><path fill="#94BBFF" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				</div>
				<div class="tac">{{$t("Air-drop_95")}}</div>
				<div></div>
			</div>
		</div>
		<div class="tab-split"></div>
		<div class="tab-content" >
			<div class="kk-div">
				<div class="mgt-10 por">
					<div class="ly-input-pre-icon" :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75">
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="40" alt="" />
					</div>
					<input type="text" class="ly-input tac" style="width:100%;padding: 0px 50px" v-model="inputValue"  readonly="readonly" >
				</div>
				<!-- <div class="aveage-box mgt-10">
					<p class="tal small">{{$t("Air-drop_19")}}</p>
					<div class="tar small">
						<p>{{coinArr[oprData.coinName].balance}} {{oprData.coinName}}</p>
					</div>
				</div> -->
				<div class="mgt-10">
					<PercentSelect :selectCB="percent => inputPercent = percent" />
				</div>
			</div>

			<div class="mgt-10 tac">
				<svg viewBox="0 0 24 24"  width="16px" ><path fill="#94BBFF" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
			</div>

			<div class="kk-div mgt-10">
				<div class="aveage-box " style="font-size: 18px">
					<p class="tal ">
						<span class="mgl-10" v-if="getTargetLPPrice[0] != '-' ">{{getTargetLPPrice[0]}}</span>
						<Loading v-else />
					</p>
					<div class="tar vertical-children">
						<img :src="require(`@/assets/coin/${oprData.coinName.split('-')[0]}.png`)" height="20" alt=""/>
						<span class="mgl-10">{{oprData.coinName.split('-')[0]}}</span>
					</div>
				</div>
				<div class="aveage-box mgt-10" style="font-size: 18px">
					<p class="tal ">
						<span class="mgl-10" v-if="getTargetLPPrice[1] != '-' ">{{getTargetLPPrice[1]}}</span>
						<Loading v-else />
					</p>
					<div class="tar vertical-children">
						<img :src="require(`@/assets/coin/${oprData.coinName.split('-')[1]}.png`)" height="20" alt=""/>
						<span class="mgl-10">{{oprData.coinName.split('-')[1]}}</span>
					</div>
				</div>
			</div>

			<div class="aveage-box mgt-30 small" >
				<p class="tal ">Price:</p>
				<div class="tar vertical-children" style="flex:2">
					<p>1 {{$parent.from.coinName}} = {{$parent.toValuePerFrom}} {{$parent.to.coinName}}</p>
					<p>1 {{$parent.to.coinName}} = {{$parent.fromValuePerTo}} {{$parent.from.coinName}}</p>
				</div>
			</div>

			<div class="mgt-20 " :class="needApprove?'btn-group':'' ">
				<StatuButton data-step="1" v-if="needApprove" :onClick="approve.bind(this, oprData.coinName)" :isDisable="!needApprove || coinArr[oprData.coinName].isApproving" :isLoading="coinArr[oprData.coinName].isApproving"  style="width: 80%" >Approve {{oprData.coinName}}</StatuButton>
				<StatuButton data-step="2" :onClick="removeLp.bind(this)" style="width: 80%" :isDisable="needApprove && oprData.balance > 0" :isLoading="coinArr[oprData.coinName].isRemoveLiqiditing" class="mgt-10">Remove</StatuButton>
			</div>

		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import {PercentSelect, Loading, StatuButton} from "@/components";
import {Common, Wallet} from "@/utils";
import {PancakeConfig} from "@/config";

export default {
	components: {PercentSelect, Loading, StatuButton},
	props: ["oprData"],
	data(){
		return({
			inputPercent: 1,
			inputValue: "",
		})
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			setting: (state) => state.bnbState.data.setting,
		}),
		getTargetLPPrice(){
			let retObj = ["-","-"];

			let reserve0 = Number(this.$parent.from.reserve);
			let reserve1 = Number(this.$parent.to.reserve);
			let _totalSupply = Number(this.$parent.totalSupply);
			let lp = Number(this.inputValue);
			if(_totalSupply == 0 || reserve0 == 0 || reserve1 == 0) return retObj;

			retObj[0] = Common.numFloor(lp * reserve0 / _totalSupply, PancakeConfig.SelectCoin[this.$parent.from.coinName].omit);
			retObj[1] = Common.numFloor(lp * reserve1 / _totalSupply, PancakeConfig.SelectCoin[this.$parent.to.coinName].omit);

			return retObj;

		},
		needApprove(){
			let {coinName} = this.oprData;
			if(coinName == "") return false;
			let allowanceToSwap = Number(this.coinArr[coinName].allowanceToSwap);
			return coinName != ''  && allowanceToSwap >= 0 && allowanceToSwap <  1e8
		},
	},
	watch: {
		inputValue: function(){
			this.inputPercent = 0;
		},
		oprData: {
			handler(newData){
				if(this.inputValue === ""){
					this.inputValue = newData.balance;
					this.setCoinAllowance(newData.coinName);
				} 
			},
			immediate: true
		},
	
		inputPercent: function(newData){
			let {balance, omit} = this.oprData;
			let targetValue = Common.numFloor(Number(balance) * Number(newData), omit);
			if(newData == 0) return;
			
			this.inputValue = targetValue;
		},
	},
	methods:{
		async removeLp(){
			let res = await Wallet.ETH.removeLiquidity(this.oprData.coinName, Number(this.inputValue), this.getTargetLPPrice, this.setting);
			if(res){
				this.inputValue = 0;
				this.coinArr[this.oprData.coinName].isRemoveLiqiditing = true;
			}
		},
		async approve(coinName){
			console.log(coinName);
			if(coinName == "") return;
			let {isApproving, allowanceToSwap} =  this.coinArr[coinName];
			if(isApproving || Number(allowanceToSwap) >1e8) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.StakeLP[coinName].addr, 
			PancakeConfig.SwapRouterAddr, {coinName, type: "allowanceToSwap"});
			if(hash){
				this.coinArr[coinName].isApproving = true;
			}
		},

		async setCoinAllowance(coinName){
			if(coinName != "" && this.coinArr[coinName].allowanceToSwap == -1) {
				let allowance = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.StakeLP[coinName].addr, PancakeConfig.SwapRouterAddr, false);
				this.coinArr[coinName].allowanceToSwap = Number(allowance);
				this.coinArr["ts"] = new Date().valueOf();
			}
		},
	}
}
</script>

<style  scoped>
.kk-div{
	border:1px solid #4e5e86;padding:10px;border-radius:10px;
}
</style>