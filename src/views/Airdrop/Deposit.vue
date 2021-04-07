<template>
	<Dialog id="deposit-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div class="tab-menu active" >{{$t("Air-drop_07")}}</div>
		</div>
		<div class="tab-body">
			<!-- <div class="tab-content">
				<div class="aveage-box">
					<p class="tal small opa-6">{{$t("Air-drop_20")}}</p>
				</div>
				<div class="mgt-10 por">
					<div class="ly-input-pre-icon" :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75">
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="40" alt="" />
					</div>
					<input type="text" class="ly-input tac" style="width:100%;padding: 0px 50px" v-model="inputValue"  readonly="readonly" >
				</div>
				<div class="aveage-box mgt-10">
					<p class="tal small">{{$t("Air-drop_19")}}</p>
					<div class="tar small">
						<p>{{oprData.wantAmount}} {{oprData.coinName}}</p>
					</div>
				</div>
				<div class="mgt-10">
					<PercentSelect :selectCB="percent => inputPercent = percent" />
				</div>
				
				<StatuButton :isLoading="oprData.coinName != ''  && coinArr[oprData.coinName].isWithdrawing" 
					:isDisable="oprData.coinName == '' || Number(inputValue) <= 0 || coinArr[oprData.coinName].isWithdrawing" :onClick="withdraw" style="width: 70%">
					{{$t("Air-drop_08")}}
				</StatuButton>

			</div> -->
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
						<p>{{oprData.balance}} {{oprData.coinName}} <span v-if="oprData.isLP">(Pancake LP)</span></p>
					</div>
				</div>
				<div class="mgt-10 tar">
					<button class="buy-key-btn" style="background:#3a557b" @click="$root.$children[0].$refs.pancake.setOprData({coinName: oprData.coinName}).show('liquidity').showAddLiquidityPanel()">{{$t("Air-drop_57")}}</button>
				</div>
			
				<div>
					<PercentSelect :selectCB="percent => inputPercent = percent" />
				</div>
				<div class="mgt-30 tac" :class="depositNeedApprove?' btn-group':'' " style="margin-bottom:10px">
					<div v-if="depositNeedApprove">
						<button data-step="1" @click="approveToPool(oprData.coinName)" class="btn-primary por" style="width:70%;" :class="oprData.coinName != '' && coinArr[oprData.coinName].allowanceToPool > 1e8 || coinArr[oprData.coinName].isApproving?'disable-btn':''">
							<Loading v-if="oprData.coinName != ''  && coinArr[oprData.coinName].isApproving"  style="position:absolute;left:8px;top:9px"/>
							{{$t("Air-drop_16")}} {{oprData.coinName}}
						</button>
					</div>
					<button data-step="2" class="btn-primary mgt-10 por" style="width:70%" :class="!isCanDeposit?'disable-btn':''" @click="deposit">
						<Loading v-if="oprData.coinName != ''  && coinArr[oprData.coinName].isDeposing"  style="position:absolute;left:8px;top:9px"/>
						{{$t("Air-drop_07")}}
					</button>
				</div>
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
import { Dialog, PercentSelect,Loading} from '@/components';
import {CommonMethod} from '@/mixin';
import { mapState } from 'vuex';
import { Common, Wallet, EventBus } from '@/utils';
import { WalletConfig, PancakeConfig, EventConfig} from '@/config';

export default {
	mixins: [CommonMethod],
	components: {Dialog, PercentSelect, Loading},
	data(){
		return({
			inputPercent: 1,
			inputDepositValue: "",
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
			let {balance, omit} = this.oprData;
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
			let oprCoin = this.coinArr[this.oprData.coinName];
			return Number(this.inputDepositValue) > 0 
						&& Number(this.inputDepositValue) <= this.getTrueShowBalacne(Number(oprCoin.balance))
						&& !oprCoin.isDeposing
						&& (this.oprData.coinName == "BNB" || Number(oprCoin.allowanceToPool) > 1e8);
		},

		depositNeedApprove(){
			let {coinName} = this.oprData;
			if(coinName == "") return false;
			let allowanceToPool = Number(this.coinArr[coinName].allowanceToPool);
			return coinName != 'BNB' && allowanceToPool >= 0 && allowanceToPool <  1e8;
		},
		
	},

	methods:{
		async updateBalance(){
			let { coinName} = this.oprData;
			this.coinArr[coinName].isApproving = false;
			this.coinArr[coinName].isDeposing = false;
			this.coinArr["ts"] = new Date().valueOf();
			await this.getLPBalance();
			await this.setCoinAllowanceToPool(coinName);
		},
		//存款充值
		async deposit(){
			if(!this.isCanDeposit) return;
			let {coinName} = this.oprData;
			let hash = await Wallet.ETH.deposit(coinName, this.inputDepositValue);
			if(hash){
				this.coinArr[coinName].isDeposing = true;
				this.inputDepositValue = ""
			}
		},
		async getLPBalance(){
			let {addr , omit , decimals, coinName} = this.oprData;
			if(addr == "") return;
			let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
			this.oprData.balance =  Common.numFloor((Number(value) / decimals), omit);
			this.coinArr[coinName].balance =  Common.numFloor((Number(value) / decimals), omit);
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			// this.inputDepositValue = this.getTrueShowBalacne(this.oprData.balance);
		},

		async setCoinAllowanceToPool(coinName){
			if(coinName != "" && coinName != "BNB" && this.coinArr[coinName].allowanceToPool == -1) {
				let allowance = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.StakeLP[coinName].addr , WalletConfig.ETH.momoFarm, false);
				console.log("setCoinAllowanceToPool", Number(allowance));
				this.coinArr[coinName].allowanceToPool = Number(allowance);
				this.coinArr["ts"] = new Date().valueOf();
			}
		},

		async approveToPool(coinName){
			if(coinName == "" || coinName == "BNB") return;
			let {isApproving, allowanceToPool} =  this.coinArr[coinName];
			if(isApproving || Number(allowanceToPool) >1e8) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.StakeLP[coinName].addr, 
			WalletConfig.ETH.momoFarm, {coinName, type:"allowanceToPool"});
			if(hash){
				this.coinArr[coinName].isApproving = true;
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