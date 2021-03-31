<template>
	<div>
		<div v-if="!showAddLiquidityPanel && !showRemoveLiquidityPanel" class="tab-body tal" style="padding-bottom:10px">
			
			<div class="tab-content">
				<!-- <div class="aveage-box hide">
					<p class="tal small">{{$t("Air-drop_10")}}</p>
					<p class="tar small">
						<span class="cur-point por" v-popMsg >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9DB8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
							<span class="popMsg left">Or, if you staked your LP tokens in a farm, unstake them to see them here.Or, if you staked your LP tokens in a farm, unstake them to see them here.Or, if you staked your LP tokens in a farm, unstake them to see them here.Or, if you staked your LP tokens in a farm, unstake them to see them here.</span>
						</span>
					</p>
				</div> -->
				<div class="mgt-10 por">
					<div  class="ly-input-pre-icon" :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != '' && !oprData.isLP" style="zoom: 0.75">
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="40" alt="" />
					</div>
					<input type="text" class="ly-input tac" style="width:100%;"  v-model="inputDepositValue" v-number placeholder="请输入存款数量">
				</div>
			
				<div class="mgt-10">
					<PercentSelect :selectCB="percent => inputPercent = percent" />
				</div>
				<div class="mgt-10 tac " style="margin-bottom:10px">
					<div v-if="depositNeedApprove">
						<button @click="approveToPool(oprData.coinName)" class="btn-primary por" style="width:70%;" :class="oprData.coinName != '' && coinArr[oprData.coinName].allowanceToPool > 1e8 || coinArr[oprData.coinName].isApproving?'disable-btn':''">
							<Loading v-if="oprData.coinName != ''  && coinArr[oprData.coinName].isApproving"  style="position:absolute;left:8px;top:9px"/>
							{{$t("Air-drop_16")}} {{oprData.coinName}}
						</button>
					</div>
					<button class="btn-primary mgt-10 por" style="width:70%" :class="!isCanDeposit?'disable-btn':''" @click="deposit">
						<Loading v-if="oprData.coinName != ''  && coinArr[oprData.coinName].isDeposing"  style="position:absolute;left:8px;top:9px"/>
						{{$t("Air-drop_07")}}
					</button>
				</div>
			</div>
			<div class="tab-split"  v-if="oprData.isLP"></div>
			<div class="tab-content"  v-if="oprData.isLP">
				<div   v-if="oprData.isLP && oprData.balance > 0" >
					<!-- <h2>{{$t("Air-drop_30")}}</h2> -->
					<!-- <p class="small opa-6">{{$t("Air-drop_58")}}</p> -->
					<div class="mgt-10 cur-point"  style="border-radius:10px;padding:10px 10px;background:#182342;height: 50px;overflow: hidden">
						<div class="aveage-box vertical-children por" >
							<div class="dib">
								<div class="dib por"  :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75">
									<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="40" alt="" />
								</div>
								<span> {{oprData.coinName}}</span>
							</div>
							
							<p class="dib tar">
								<span class="mgl-10" v-if="oprData.balance != '-' ">{{oprData.balance}}</span>
								<Loading v-else />
								<svg viewBox="0 0 24 24" class="mgl-5"  height="20px" ><path fill="#94BBFF" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
							</p>
						</div>

						<div class="aveage-box vertical-children por mgt-10"  v-for="(name, key) in oprData.coinName.split('-')" :key="name+key">
							<div class="dib">
								<span> {{name}}</span>
							</div>
							
							<p class="dib tar" >
								<span class="mgl-10" >10</span>
								<img class="mgl-5"  :src=" require(`../../assets/coin/${name}.png`) " height="20" alt="" />
							</p>
						</div>
						<!-- <div class="aveage-box mgt-10">
							<p class="tal small">{{$t("Air-drop_11")}}</p>
							<div class="tar small">
							</div>
						</div> -->

					</div>

				</div>
				<div class="tac mgt-10" >
					<button class="btn-primary " @click="showAddLiquidityPanel =  true" style="background: #384A7C">{{$t("Air-drop_57")}}</button>&nbsp;
					<button v-if="Number(oprData.balance) > 0" class="btn-primary mgt-10"  style="background: #384A7C">Remove LP</button>
				</div>
			</div>
		</div>
		<div v-if="showAddLiquidityPanel" class="tab-body" style="position:relative; z-index:998">
			<div class="tab-content">
				<div class="aveage-box">
					<div class="tal cur-point" @click="showAddLiquidityPanel = false">
						<svg style="transform:rotate(90deg)" viewBox="0 0 24 24"  width="24px" ><path fill="#94BBFF" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
					</div>
					<div class="tac">{{$t("Air-drop_57")}}</div>
					<div class="tar">
						<span class="cur-point por" v-popMsg >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9DB8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
							<span class="popMsg left">{{$t("Air-drop_61")}}</span>
						</span>
					</div>
				</div>
			</div>
			<div class="tab-split"></div>
			<div class="tab-content">
				<div class="tab-panel">
					<div class="aveage-box">
						<p class="tal small vertical-children">
							<span>{{$t("Air-drop_62")}}</span>&nbsp;
							<Loading  v-if="from.loading" />
						</p>
						<p class="tar small">{{$t("Mine_05")}}: {{from.coinName==""?"-":coinArr[from.coinName].balance}}</p>
					</div>
					<div class="aveage-box vertical-children mgt-10">
						<input style="flex:1 1 auto" type="text" placeholder="0.0" v-model="from.inputValue" v-number @keyup="inputValueChange('from')">
						<p class="text-btn" v-if="from.coinName != ''" @click="from.inputValue = coinArr[from.coinName].balance;inputValueChange('from')">Max</p>
						<p class="tar cur-point text-btn vertical-children" >
							<span  v-if="from.coinName != '' ">
								<img :src="require(`../../assets/coin/${from.coinName}.png`)" alt="" height="20" />&nbsp;
								<span>{{from.coinName}}</span>
							</span>
							<span v-else>{{$t("Air-drop_38")}}</span>
						</p>
					</div>
				</div>
				<div class="mgt-10 tac">
					<span style="font-size: 28px">+</span>
				</div>
				<!-- To -->
				<div class="tab-panel mgt-10">
					<div class="aveage-box">
						<p class="tal small vertical-children">
							<span>{{$t("Air-drop_62")}}</span>&nbsp;
							<Loading  v-if="to.loading" />
						</p>
						<p class="tar small">{{$t("Mine_05")}}: {{to.coinName==""?"-":coinArr[to.coinName].balance}}</p>
					</div>
					<div class="aveage-box vertical-children mgt-10">
						<input style="flex:1 1 auto" type="text" placeholder="0.0" v-model="to.inputValue" v-number @keyup="inputValueChange('to')">
						<p class="text-btn" v-if="from.coinName != ''" @click="to.inputValue = coinArr[to.coinName].balance;inputValueChange('to')">Max</p>
						<p class="tar text-btn vertical-children" >
							<span  v-if="to.coinName != '' ">
								<img :src="require(`../../assets/coin/${to.coinName}.png`)" alt="" height="20" />&nbsp;
								<span>{{to.coinName}}</span>
							</span>
							<span v-else>Select a currency</span>
						</p>
					</div>
				</div>
				<!-- Des -->
				<div class="mgt-20 tac" style="margin-bottom:10px">
					<div v-if="fromNeedApprove">
						<button @click="approve(from.coinName)" class="btn-primary por" style="width:90%;" :class="coinArr[from.coinName].allowanceToSwap > 1e8 || coinArr[from.coinName].isApproving?'disable-btn':''">
							<Loading v-if="coinArr[from.coinName].isApproving"  style="position:absolute;left:8px;top:9px"/>
							{{$t("Air-drop_16")}} {{from.coinName}}
						</button>
					</div>
					<div v-if="toNeedApprove">
						<button @click="approve(to.coinName)" class="btn-primary por" style="width:90%;" :class="coinArr[to.coinName].allowanceToSwap > 1e8 || coinArr[to.coinName].isApproving?'disable-btn':''">
							<Loading v-if="coinArr[to.coinName].isApproving"  style="position:absolute;left:8px;top:9px"/>
							{{$t("Air-drop_16")}} {{to.coinName}}
						</button>
					</div>
					<div>
						<button class="btn-primary mgt-10" style="width:90%" :class="canSupply?'':'disable-btn'" @click="goSupply">{{$t("Air-drop_57")}}</button>
					</div>
				</div>
			</div>
		
		</div>
		<div v-if="showRemoveLiquidityPanel" class="tab-body" style="position:relative; z-index:998">
			<div class="tab-content">
				<div class="aveage-box">
					<div class="tal cur-point" @click="showAddLiquidityPanel = false">
						<svg style="transform:rotate(90deg)" viewBox="0 0 24 24"  width="24px" ><path fill="#94BBFF" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
					</div>
					<div class="tac">添加流动性</div>
					<div class="tar">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9DB8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
					</div>
				</div>
			</div>
			<div class="tab-split"></div>
			<div class="tab-content">
				<div class="tab-panel">
					<div class="aveage-box">
						<p class="tal small vertical-children">
							<span>From</span>&nbsp;
							<span v-if="from.isEstimated && Number(from.inputValue) > 0">(estimated)</span>&nbsp;
							<Loading  v-if="from.loading" />
						</p>
						<p class="tar small">Balance: {{from.coinName==""?"-":coinArr[from.coinName].balance}}</p>
					</div>
					<div class="aveage-box vertical-children mgt-10">
						<input style="flex:1 1 auto" type="text" placeholder="0.0" v-model="from.inputValue" v-number @keyup="inputValueChange('from')">
						<p class="text-btn" v-if="from.coinName != ''" @click="from.inputValue = coinArr[from.coinName].balance;inputValueChange('from')">Max</p>
						<p class="tar cur-point text-btn vertical-children" >
							<span  v-if="from.coinName != '' ">
								<img :src="require(`../../assets/coin/${from.coinName}.png`)" alt="" height="20" />&nbsp;
								<span>{{from.coinName}}</span>
							</span>
							<span v-else>Select a currency</span>
						</p>
					</div>
				</div>
				<div class="mgt-10 tac">
					<span style="font-size: 28px">+</span>
				</div>
				<!-- To -->
				<div class="tab-panel mgt-10">
					<div class="aveage-box">
						<p class="tal small vertical-children">
							<span>To</span>&nbsp;
							<span v-if="to.isEstimated && Number(to.inputValue) > 0">(estimated)</span>&nbsp;
							<Loading  v-if="to.loading" />
						</p>
						<p class="tar small">Balance: {{to.coinName==""?"-":coinArr[to.coinName].balance}}</p>
					</div>
					<div class="aveage-box vertical-children mgt-10">
						<input style="flex:1 1 auto" type="text" placeholder="0.0" v-model="to.inputValue" v-number @keyup="inputValueChange('to')">
						<p class="text-btn" v-if="from.coinName != ''" @click="to.inputValue = coinArr[to.coinName].balance;inputValueChange('to')">Max</p>
						<p class="tar text-btn vertical-children" >
							<span  v-if="to.coinName != '' ">
								<img :src="require(`../../assets/coin/${to.coinName}.png`)" alt="" height="20" />&nbsp;
								<span>{{to.coinName}}</span>
							</span>
							<span v-else>Select a currency</span>
						</p>
					</div>
				</div>
				<!-- Des -->
				<div class="mgt-20 tac" style="margin-bottom:10px">
					<div v-if="fromNeedApprove">
						<button @click="approve(from.coinName)" class="btn-primary por" style="width:90%;" :class="coinArr[from.coinName].allowanceToSwap > 1e8 || coinArr[from.coinName].isApproving?'disable-btn':''">
							<Loading v-if="coinArr[from.coinName].isApproving"  style="position:absolute;left:8px;top:9px"/>
							Approve {{from.coinName}}
						</button>
					</div>
					<div v-if="toNeedApprove">
						<button @click="approve(to.coinName)" class="btn-primary por" style="width:90%;" :class="coinArr[to.coinName].allowanceToSwap > 1e8 || coinArr[to.coinName].isApproving?'disable-btn':''">
							<Loading v-if="coinArr[to.coinName].isApproving"  style="position:absolute;left:8px;top:9px"/>
							Approve {{to.coinName}}
						</button>
					</div>
					<div>
						<button class="btn-primary mgt-10" style="width:90%" :class="canSupply?'':'disable-btn'" @click="goSupply">Supply</button>
					</div>
				</div>
			</div>
		
		</div>
		<Dialog id="confirm-supply-dialog" :top="100" :width="400">
			<div   class="mgt-10 ly-input-content tal"   v-if="from.coinName != '' && to.coinName != ''">
				<p class="small ">You will receive</p>
				<div class="tac">
					<div class="double-img mgt-20 por dib" >
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="40" alt="" />
					</div>
				</div>
				<div class="mgt-10 tac  vertical-children" style="font-size:25px">
					<span>{{canGetLp}}</span>
				</div>
				<p class="mgt-10 tac small">{{from.coinName}}/{{to.coinName}} Pool Tokens</p>
				<div class="aveage-box mgt-30 " >
					<p class="tal small">{{from.coinName}} Deposited</p>
					<p class="tar small vertical-children"  style="flex: 2">
						<span class="mgl-5">{{from.inputValue}} {{from.coinName}}</span>
					</p>
				</div>
				<div class="aveage-box mgt-10 ">
					<p class="tal small">{{to.coinName}} Deposited</p>
					<p class="tar small vertical-children"  style="flex: 2">
						<span class="mgl-5">{{to.inputValue}} {{to.coinName}}</span>
					</p>
				</div>
				<div class="aveage-box mgt-10 " >
					<p class="tal small">Rates</p>
					<div class="tar small" style="flex: 2">
						<p>1 {{from.coinName}} = {{toValuePerFrom}} {{to.coinName}}</p>
						<p>1 {{to.coinName}} = {{fromValuePerTo}} {{from.coinName}}</p>
					</div>
				</div>
				<div class="mgt-30 tac" style="margin-bottom:10px">
					<button class="btn-primary" style="width:70%" @click="confirmSuppy">Confirm supply</button>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script>
import { PercentSelect, Loading, Dialog } from '@/components';
import {Wallet, Common, EventBus, SwapHttp} from "@/utils";
import { mapState } from 'vuex';
import { CommonMethod } from '@/mixin';
import { EventConfig, PancakeConfig, WalletConfig } from '@/config';

let timerInterval;
export default {
	mixins: [CommonMethod],
	props: ["oprData"],
	components: {PercentSelect, Loading, Dialog},
	data(){
		return({
			showAddLiquidityPanel: false,
			showRemoveLiquidityPanel: false,
			inputPercent: 0,
			inputDepositValue: "",

			//addLiquidity
			from: {
				coinName: "",
				inputValue: "",
				loading: false,
				reserve: 0,
			},
			to: {
				coinName: "",
				inputValue: "",
				loading: false,
				reserve: 0,
			},
			totalSupply: 0, //流动池总质押LP
			lastType: "from",
		});
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			setting: (state) => state.bnbState.data.setting,
		}),
		// 是否可以存款
		isCanDeposit(){
			let oprCoin = this.coinArr[this.oprData.coinName];
			return Number(this.inputDepositValue) > 0 
						&& Number(this.inputDepositValue) <= this.getTrueShowBalacne(Number(oprCoin.balance))
						&& !oprCoin.isDeposing
						&& (this.oprData.coinName == "BNB" || Number(oprCoin.allowanceToPool) > 1e8);
		},
		//是否可以添加流动性
		canSupply(){
			return Number(this.from.inputValue) > 0 
					&& Number(this.from.inputValue) <= Number(this.coinArr[this.from.coinName].balance)
					&& Number(this.to.inputValue) <= Number(this.coinArr[this.to.coinName].balance)
					&& Number(this.to.inputValue) > 0
					&& !this.fromNeedApprove
					&& !this.toNeedApprove;
		},
		fromNeedApprove(){
			let {coinName} = this.from;
			if(coinName == "") return false;
			let allowanceToSwap = Number(this.coinArr[coinName].allowanceToSwap);
			return coinName != '' && coinName != 'BNB' && allowanceToSwap >= 0 && allowanceToSwap <  1e8
		},
		toNeedApprove(){
			let {coinName} = this.to;
			if(coinName == "") return false;
			let allowanceToSwap = Number(this.coinArr[coinName].allowanceToSwap);
			return coinName != '' && coinName != 'BNB' && allowanceToSwap >= 0 && allowanceToSwap <  1e8;
		},
		depositNeedApprove(){
			let {coinName} = this.oprData;
			if(coinName == "") return false;
			let allowanceToPool = Number(this.coinArr[coinName].allowanceToPool);
			return coinName != 'BNB' && allowanceToPool >= 0 && allowanceToPool <  1e8;
		},
		//能获取多少的LP
		canGetLp(){
			let amount0 = Number(this.from.inputValue);
			let amount1 = Number(this.to.inputValue);
			let reserve0 = Number(this.from.reserve);
			let reserve1 = Number(this.to.reserve);
			let _totalSupply = Number(this.totalSupply);
			if(_totalSupply == 0 || reserve0 == 0 || reserve1 == 0) return 0;
			return Common.numFloor(Math.max(amount0 * _totalSupply / reserve0, amount1* _totalSupply / reserve1), 1e8);
		},
		toValuePerFrom(){
			let {reserve, coinName} = this.to;
			if(coinName =="" || reserve == 0) return 0;
			return Common.numFloor(reserve / this.from.reserve, 1e8);
		},
		fromValuePerTo(){
			let {reserve, coinName} = this.from;
			if(coinName =="" || reserve == 0) return 0;
			return Common.numFloor(reserve / this.to.reserve, 1e8);
		}
	},
	watch: {
		inputDepositValue: function(){
			this.inputPercent = 0;
		},
		oprData: async function(newData){
			let {addr , coinName} = newData;
			if(addr != ""){
				this.getLPBalance();
			}

			this.inputDepositValue = "";
			this.inputPercent = 0;

			this.from.coinName = coinName.split("-")[0] || "";
			this.to.coinName = coinName.split("-")[1] || "";

			this.from.reserve = 0;
			this.to.reserve = 0;

			await this.setCoinAllowanceToPool(coinName);
			await this.setCoinAllowance(this.from.coinName);
			await this.setCoinAllowance(this.to.coinName);
			await this.getLPAmount();
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
		showAddLiquidityPanel: function(){
			this.from.inputValue = "";
			this.to.inputValue = "";
		}
	},
	created(){
		clearInterval(timerInterval);
		timerInterval = setInterval(() => {
			this.getLPAmount();
		}, 10000);
		EventBus.$on(EventConfig.AddLiquiditySuccess, this.updateBalance);
		EventBus.$on(EventConfig.DepositOrWithdrawConfirm, this.updateBalance);
	},
	beforeDestroy(){
		clearInterval(timerInterval);
		EventBus.$off(EventConfig.AddLiquiditySuccess, this.updateBalance);
		EventBus.$off(EventConfig.DepositOrWithdrawConfirm, this.updateBalance);
	},
	methods:{
		updateBalance(){
			let { coinName} = this.oprData;
			this.coinArr[coinName].isApproving = false;
			this.coinArr[coinName].isDeposing = false;
			this.coinArr["ts"] = new Date().valueOf();
			this.getLPBalance();
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
			let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
			this.oprData.balance =  Common.numFloor((Number(value) / decimals), omit);
			this.coinArr[coinName].balance =  Common.numFloor((Number(value) / decimals), omit);
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			// this.inputDepositValue = this.getTrueShowBalacne(this.oprData.balance);
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
		async getLPAmount(){
			let tokenA = this.from.coinName;
			let tokenB = this.to.coinName;
			if(tokenA == "" || tokenB == "") return;

			let res = await SwapHttp.post("/pair/lpamount",{token0: tokenA, token1: tokenB});
			let {data, code } = res.data;
			if(code == 200){
				let {token0, token1, totalSupply} = data;
				if(token0.symbol.indexOf(tokenA) != -1){
					this.from.reserve = token0.reserve 
				}
				if(token1.symbol.indexOf(tokenB) != -1){
					this.to.reserve = token1.reserve 
				}
				if(this[this.lastType].inputValue != ""){
					this.inputValueChange(this.lastType);
				}
				this.totalSupply = totalSupply;
			}
		},
		goSupply(){
			if(!this.canSupply) return;
			this.oprDialog("confirm-supply-dialog", "block");
		},
		async confirmSuppy(){
			this.oprDialog("confirm-supply-dialog", "none");
			let hash = await Wallet.ETH.addLiquidity(this.from, this.to, this.setting);
			if(hash){
				this.from.inputValue = "";
				this.to.inputValue = "";
			}
		},
		async setCoinAllowance(coinName){
			if(coinName != "" && coinName != "BNB" && this.coinArr[coinName].allowanceToSwap == -1) {
				let allowance = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinName].addr, PancakeConfig.SwapRouterAddr, false);
				this.coinArr[coinName].allowanceToSwap = Number(allowance);
				this.coinArr["ts"] = new Date().valueOf();
			}
		},
		async setCoinAllowanceToPool(coinName){
			if(coinName != "" && coinName != "BNB" && this.coinArr[coinName].allowanceToPool == -1) {
				let allowance = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.StakeLP[coinName].addr , WalletConfig.ETH.momoFarm, false);
				this.coinArr[coinName].allowanceToPool = Number(allowance);
				this.coinArr["ts"] = new Date().valueOf();
			}
		},
		async approve(coinName){
			console.log(coinName);
			if(coinName == "" || coinName == "BNB") return;
			let {isApproving, allowanceToSwap} =  this.coinArr[coinName];
			if(isApproving || Number(allowanceToSwap) >1e8) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin[coinName].addr, 
			PancakeConfig.SwapRouterAddr, {coinName, type: "allowanceToSwap"});
			if(hash){
				this.coinArr[coinName].isApproving = true;
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
		inputValueChange(type){
			this.lastType = type;
			let otherType = type == "from"?"to":"from";
			this[otherType].inputValue = Common.numFloor((Number(this[otherType].reserve) / Number(this[type].reserve) ) 
														* Number(this[type].inputValue), 1e8);
		}
	}

}
</script>