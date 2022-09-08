<template>
	<div class="tab-body" style="position:relative; z-index:998">
		<div class="tab-content">
			<div class="aveage-box">
				<div class="tal cur-point" @click="$parent.showRemoveLiquidityPanel = false">
					<svg style="transform:rotate(90deg)" viewBox="0 0 24 24"  width="24px" ><path fill="#838689" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				</div>
				<div class="tac" style="flex:3">
					<span v-if="setting.pancakeVType==1">{{$t("Air-drop_141")}}</span>
					<span v-else>{{$t("Air-drop_143")}}</span>
				</div>
				<div></div>
			</div>
		</div>
		<div class="tab-split"></div>
		<div class="tab-content" >
			<div class="kk-div">
				<div class="mgt-10 por">
					<div class="ly-input-pre-icon" :class="oprData.isLP ? 'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75" @click="showSelect">
						<img v-for="(name, key) in pair" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="40" alt="" />
					</div>
					<input type="text" class="ly-input tac" style="width:100%;padding: 0px 50px" v-model="inputValue"  readonly="readonly" >
				</div>
				<div class="mgt-10">
					<PercentSelect :selectCB="percent => inputPercent = percent" />
				</div>
			</div>

			<div class="mgt-10 tac">
				<svg viewBox="0 0 24 24"  width="16px" ><path fill="#838689" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
			</div>

			<div class="kk-div mgt-10">
				<div class="aveage-box " style="font-size: 18px">
					<p class="tal ">
						<span class="mgl-10" v-if="getTargetLPPrice[0] != '-' ">{{getTargetLPPrice[0]}}</span>
						<Loading v-else />
					</p>
					<div class="tar vertical-children">
						<img :src="require(`@/assets/coin/${pair[0]}.png`)" height="20" alt=""/>
						<span class="mgl-10">{{pair[0]}}</span>
					</div>
				</div>
				<div class="aveage-box mgt-10" style="font-size: 18px">
					<p class="tal ">
						<span class="mgl-10" v-if="getTargetLPPrice[1] != '-' ">{{getTargetLPPrice[1]}}</span>
						<Loading v-else />
					</p>
					<div class="tar vertical-children">
						<img :src="require(`@/assets/coin/${pair[1]}.png`)" height="20" alt=""/>
						<span class="mgl-10">{{pair[1]}}</span>
					</div>
				</div>
			</div>

			<div class="aveage-box mgt-30 small" >
				<p class="tal ">{{$t("Air-drop_103")}}:</p>
				<div class="tar vertical-children" style="flex:2">
					<p>1 {{pair[0]}} = {{toValuePerFrom}} {{pair[1]}}</p>
					<p>1 {{pair[1]}} = {{fromValuePerTo}} {{pair[0]}}</p>
				</div>
			</div>

			<div class="mgt-20 " :class="needApprove?'btn-group':'' ">
				<StatuButton data-step="1" v-if="needApprove" :onClick="approve.bind(this, coinKey)" :isDisable="!needApprove" :isLoading="coinArr[coinKey].isApproving"  style="width: 80%" >
					{{$t("Air-drop_16")}} {{pair[0]}}-{{pair[1]}}
				</StatuButton>
				<StatuButton data-step="2" :onClick="removeLp.bind(this)" style="width: 80%" :isDisable="needApprove" :isLoading="coinArr[coinKey].isRemoveLiqiditing" class="mgt-10">
					{{$t("MOMO_20")}}
				</StatuButton>
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
			pair: [],
		})
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			setting: (state) => state.bnbState.data.setting,
		}),
		toValuePerFrom(){
			let reserve0, reserve1;

			if (this.isNotMec) {
				reserve0 = Number(this.$parent.from.reserve);
				reserve1 = Number(this.$parent.to.reserve);
			} else {
				reserve0 = Number(this.$parent.mecReserveData.reserveA);
				reserve1 = Number(this.$parent.mecReserveData.reserveB);
			}

			if (!reserve0) return 0;

			return Common.numFloor(reserve1 / reserve0, 1e8);
		},
		fromValuePerTo(){
			let reserve0, reserve1;

			if (this.isNotMec) {
				reserve0 = Number(this.$parent.from.reserve);
				reserve1 = Number(this.$parent.to.reserve);
			} else {
				reserve0 = Number(this.$parent.mecReserveData.reserveA);
				reserve1 = Number(this.$parent.mecReserveData.reserveB);
			}

			if (!reserve1) return 0;

			return Common.numFloor(reserve0 / reserve1, 1e8);
		},
		isNotMec() {
			return this.pair.indexOf('MEC') == -1;
		},
		getTargetLPPrice(){
			let retObj = ["-", "-"];

			let reserve0, reserve1, _totalSupply;

			if (this.isNotMec) {
				reserve0 = Number(this.$parent.from.reserve);
				reserve1 = Number(this.$parent.to.reserve);
				_totalSupply = Number(this.$parent.totalSupply);
			} else {
				reserve0 = Number(this.$parent.mecReserveData.reserveA);
				reserve1 = Number(this.$parent.mecReserveData.reserveB);
				_totalSupply = Number(this.$parent.mecTotalSupply / 1e18);
			}

			let lp = Number(this.inputValue);

			if(_totalSupply == 0 || reserve0 == 0 || reserve1 == 0) return retObj;

			retObj[0] = Common.numFloor(lp * reserve0 / _totalSupply, PancakeConfig.SelectCoin[this.pair[0]].omit);
			retObj[1] = Common.numFloor(lp * reserve1 / _totalSupply, PancakeConfig.SelectCoin[this.pair[1]].omit);

			return retObj;
		},
		needApprove(){
			const coinKey = this.coinKey;
			let {coinName} = this.oprData;
			if(coinName == "") return false;
			let coinArr = this.coinArr;
			
			let allowanceToSwap = Number(coinArr[coinKey].allowanceToSwap);
			return coinName != ''  && allowanceToSwap >= 0 && allowanceToSwap <  1e8
		},
		coinKey() {
			return this.isNotMec ? this.oprData.coinKey : this.pair.join('-');
		}
	},
	watch: {
		inputValue: function(){
			this.inputPercent = 0;
		},
		pair: {
			handler() {
				this.inputValue = this.isNotMec ? this.oprData.balance : this.$parent.mecLP;
				this.setCoinAllowance();
			},
		},
		inputPercent: function(newData){
			const balance = this.isNotMec ? this.oprData.balance : this.$parent.mecLP;
			let targetValue = Common.numFloor(Number(balance) * Number(newData), 1e6);

			if(newData == 0) return;
			
			this.inputValue = targetValue;
		},
	},
	methods:{
		async removeLp(){
			let coinArr = this.coinArr;
			const data = this.isNotMec ? this.oprData : {
				coinName: this.pair.join('-'),
				coinKey: this.pair.join('-')
			};

			let res = await Wallet.ETH.removeLiquidity(data, Number(this.inputValue), this.getTargetLPPrice, this.setting);
			if(res){
				this.inputValue = 0;
				coinArr[this.oprData.coinKey].isRemoveLiqiditing = true;
			}
		},
		async approve(){
			const coinKey = this.coinKey;
			let routerAddr = this.isNotMec ? (this.setting.pancakeVType == 1 ? PancakeConfig.SwapRouterAddr:  PancakeConfig.SwapRouterAddrV2) : PancakeConfig.MecSwap;
			let coinArr =  this.coinArr;
			let stakeLp = PancakeConfig.StakeLP;

			if(coinKey == "") return;
			let {isApproving, allowanceToSwap} =  coinArr[coinKey];
			if(isApproving || Number(allowanceToSwap) >1e8) return;

			let hash = await Wallet.ETH.approveErcToTarget(stakeLp[coinKey].addr, routerAddr, {coinKey, type: "allowanceToSwap"});

			if (hash) {
				coinArr[coinKey].isApproving = true;
			}
		},

		async setCoinAllowance() {
			const coinKey = this.coinKey;
			const routerAddr = this.isNotMec ? (this.setting.pancakeVType == 1? PancakeConfig.SwapRouterAddr:  PancakeConfig.SwapRouterAddrV2) : PancakeConfig.MecSwap;
			

			let coinArr =  this.coinArr;
			let stakeLp = PancakeConfig.StakeLP;

			if(coinKey != "") {
				let allowance = await Wallet.ETH.viewErcAllowanceToTarget(stakeLp[coinKey].addr, routerAddr, false);
				console.log(allowance, '===allowance===');
				coinArr[coinKey].allowanceToSwap = Number(allowance);
				coinArr["ts"] = new Date().valueOf();
			}
		},
		// 显示选择币种
		showSelect() {
			// TODO:TESET
			// const ref = this.$parent.$parent.$parent.$refs.selectPool;
			// ref.show(this.onSelectCoin);
		},
		// 选择币种
		onSelectCoin(data) {
			this.pair = data;
		}
	},
	created() {
		this.pair = this.oprData.coinName.split('-');
	}
}
</script>

<style lang="less" scoped>
.kk-div{
	border:1px solid #4e5e86;padding:10px;border-radius:10px;
}

.ly-input-pre-icon {
	cursor: pointer;

	&:hover {
		opacity: 0.6;
	}
}
</style>