<template>
	<Dialog id="deposit-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div class="tab-menu active" >{{$t("Air-drop_07")}}</div>
		</div>
		<div class="tab-body">
			<div class="tab-content">
				<div class="aveage-box hide">
					<p class="tal small">{{$t("Air-drop_10")}}</p>
				</div>
				<div class="mgt-10 por">
					<div  class="ly-input-pre-icon" :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75">
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="40" alt="" />
					</div>
					<input type="text" class="ly-input tac" style="width:100%;"  v-model="inputDepositValue" v-number :placeholder="$t('Air-drop_96')">
				</div>
				<div class="aveage-box mgt-10">
					<p class="tal small">{{$t("Air-drop_11")}}</p>
					<div class="tar small" style="flex:2">
						<p>{{oprData.balance}} {{oprData.coinName}} <span v-if="oprData.isLP">(Pancake LP V{{oprData.pancakeVType}})</span></p>
					</div>
				</div>
				<div class="mgt-10 tar" v-if="oprData.balance == 0">
					<!-- <button class="btn-primary btn-small" v-if="oprData.isLP"  @click="$root.$children[0].$refs.pancake.setOprData(oprData).show('liquidity').showAddLiquidityPanel()">{{$t("Air-drop_57")}}</button> -->
					<a href="https://pancakeswap.finance/add/BNB/0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377" target="_blank"  class="btn-primary btn-small" v-if="oprData.isLP"  >{{$t("Air-drop_57")}}</a>
				</div>
			
				<div>
					<PercentSelect :selectCB="percent => inputPercent = percent" />
				</div>
				<div class="mgt-30 tac" :class="depositNeedApprove?' btn-group':'' " style="margin-bottom:10px" v-if="oprData.coinName == 'MBOX-BNB' ">
					<div v-if="depositNeedApprove">
						<StatuButton data-step="1" style="width:70%" :isLoading="coinArr[oprData.coinKey].isApproving" :onClick="()=>approveToPool(oprData.coinKey)">
							{{$t("Air-drop_16")}} {{oprData.coinName}}
						</StatuButton>
					</div>
					<button data-step="2" class="btn-primary mgt-10 por" style="width:70%" :class="!isCanDeposit?'disable-btn':''" @click="deposit">
						<Loading v-if="oprData.coinName != ''  && coinArr[oprData.coinKey].isDeposing"  style="position:absolute;left:8px;top:9px"/>
						{{$t("Air-drop_07")}}
					</button>
				</div>
				<p v-else class="color-buy">{{$t("Air-drop_215")}} <span class="cur-point" @click="$root.$children[0].showNotice()">{{$t("Air-drop_216")}}>></span></p>
			</div>
		</div>
		<div class="tab-body tal mgt-10">
			<div class="tab-content" >
				<p class="small t">{{$t("Air-drop_121")}}</p>
				<div class="aveage-box opa-6 mgt-10 small" style="border-bottom:1px solid #202c4a;height:30px">
					<div class="tal">{{$t("Air-drop_122")}}</div>
					<div class="tar">{{$t("Air-drop_123")}}</div>
				</div>

				<div class="aveage-box small" style="border-bottom:1px solid #202c4a;height:30px" v-for="item in [
				{title: 'Air-drop_124',value:'0.5%'},
				{title: 'Air-drop_125',value:'0.4%'},
				{title: 'Air-drop_126',value:'0.3%'},
				{title: 'Air-drop_127',value:'0.2%'},
				{title: 'Air-drop_128',value:'0.1%'},
				{title: 'Air-drop_129',value:'0%'},
				]" :key="item.title">
					<div class="tal" style="flex:2">{{$t(item.title)}}</div>
					<div class="tar">{{item.value}}</div>
				</div>

			</div>
		</div>
	</Dialog>
</template>

<script>
import { Dialog, PercentSelect,Loading, StatuButton} from '@/components';
import {CommonMethod} from '@/mixin';
import { mapState } from 'vuex';
import { Common, Wallet, EventBus } from '@/utils';
import { WalletConfig, PancakeConfig, EventConfig} from '@/config';

export default {
	mixins: [CommonMethod],
	components: {Dialog, PercentSelect, Loading, StatuButton},
	data(){
		return({
			inputPercent: 1,
			inputDepositValue: "2",
			oprData: {
				apy: "-%",
				balance: 0,
				stake: 0,
				stakeLp: 0,
				earnedKey: 0,
				totalSupply: 0,
				allowanceToPool: -1,
				totalAirdrop: 0,
				perFullShare: 0,
				pIndex: 0,
				addr: "",
				allocPoint: 0,
				coinName: "",
				isLP: false,
				gracePeriod: 0,
			},
		})
	},
	watch: {
		inputDepositValue: function(){
			this.inputPercent = 0;
		},
		inputPercent: function(newData){
			let {omit, coinKey} = this.oprData;
			let { balance } = this.coinArr[coinKey];
			let targetValue = Common.numFloor(Number(balance) * Number(newData), omit);
			//留点手续费
			if(newData == 1 ){
				targetValue = this.getTrueShowBalacne(targetValue);
			}
			if(newData == 0) return;
			
			this.inputDepositValue = targetValue;
		},
	},
	created(){
		EventBus.$on(EventConfig.DepositOrWithdrawConfirm, this.updateBalance);
	},
	beforeDestroy(){
		EventBus.$off(EventConfig.DepositOrWithdrawConfirm, this.updateBalance);
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
			// 是否可以存款
		isCanDeposit(){
			let oprCoin = this.coinArr[this.oprData.coinKey];
			return Number(this.inputDepositValue) > 0 
						&& Number(this.inputDepositValue) <= this.getTrueShowBalacne(Number(oprCoin.balance))
						&& !oprCoin.isDeposing
						&& !this.depositNeedApprove;
		},

		depositNeedApprove(){
			let {coinName, coinKey} = this.oprData;
			if(coinName == "") return false;
			let allowanceToPool = Number(this.coinArr[coinKey].allowanceToPool);
			return coinName != 'BNB' && allowanceToPool >= 0 && (allowanceToPool/1e18 ) <  Number(this.inputDepositValue);
		},
		
	},

	methods:{
		async updateBalance(){
			let { coinKey} = this.oprData;
			this.coinArr[coinKey].isApproving = false;
			this.coinArr[coinKey].isDeposing = false;
			this.coinArr["ts"] = new Date().valueOf();
			await this.getLPBalance();
			await this.setCoinAllowanceToPool(coinKey);
		},
		//存款充值
		async deposit(){
			if(!this.isCanDeposit) return;
			let {coinKey} = this.oprData;
			let hash = await Wallet.ETH.deposit(coinKey, this.inputDepositValue);
			if(hash){
				this.coinArr[coinKey].isDeposing = true;
				this.inputDepositValue = ""
			}
		},
		async getLPBalance(){
			let {addr , omit , decimals, coinKey} = this.oprData;
			if(addr == "") return;
			let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
			this.oprData.balance =  Common.numFloor((Number(value) / decimals), omit);
			this.coinArr[coinKey].balance =  Common.numFloor((Number(value) / decimals), omit);
			this.coinArr["ts"] = new Date().valueOf();
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			// this.inputDepositValue = this.getTrueShowBalacne(this.oprData.balance);
		},

		async setCoinAllowanceToPool(coinKey){
			if(coinKey != "" && coinKey != "BNB" && this.coinArr[coinKey].allowanceToPool == -1) {
				let allowance = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.StakeLP[coinKey].addr , WalletConfig.ETH.momoFarm, false);
				console.log("setCoinAllowanceToPool", Number(allowance));
				this.coinArr[coinKey].allowanceToPool = Number(allowance);
				this.coinArr["ts"] = new Date().valueOf();
			}
		},

		async approveToPool(coinKey){
			if(coinKey == "" || coinKey == "BNB") return;
			let {isApproving, allowanceToPool} =  this.coinArr[coinKey];
			if(isApproving) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.StakeLP[coinKey].addr, 
			WalletConfig.ETH.momoFarm, {coinKey, type:"allowanceToPool"});
			if(hash){
				this.coinArr[coinKey].isApproving = true;
			}
		},

		//获取要显示的充值余额
		getTrueShowBalacne(balance){
			let returnBalacne = Number(balance);
			let {coinName} = this.oprData;

			if(coinName == "BNB"){
				returnBalacne -= 0.01
			}
			if(returnBalacne < 0 ) returnBalacne = 0;
			return returnBalacne;
		},

		show(){
			this.oprDialog("deposit-dialog","block");
			this.inputDepositValue = "";
			this.updateBalance();
			return this;
		},
		close(){
			this.oprDialog("deposit-dialog","none")
			return this;
		},
		setOprData(data){
			this.oprData = data;
			this.inputPercent = 0;
			return this;
		}
	}
}
</script>