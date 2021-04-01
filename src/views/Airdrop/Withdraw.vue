<template>
	<Dialog id="widthdraw-dialog" :top="100" :width="400">
		<div class="tal mgt-10">
			<div class="tab-menu active" >{{$t("Air-drop_08")}}</div>
		</div>
		<div class="tab-body">
			<div class="tab-content">
				<div class="aveage-box">
					<p class="tal small opa-6">{{$t("Air-drop_20")}}</p>
					<p class="tar small hide">
						<span class="cur-point por" v-popMsg >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9DB8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
							<span class="popMsg left">Or, if you staked your LP tokens in a farm, unstake them to see them here.Or, if you staked your LP tokens in a farm, unstake them to see them here.Or, if you staked your LP tokens in a farm, unstake them to see them here.Or, if you staked your LP tokens in a farm, unstake them to see them here.</span>
						</span>
					</p>
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

				<p v-if="feeRate > 0" class="mgt-20 small tal" v-html="getShowNotice"></p>
			</div>
		</div>
	</Dialog>
</template>

<script>
import { Dialog, PercentSelect, StatuButton} from '@/components';
import {CommonMethod} from '@/mixin';
import { mapState } from 'vuex';
import { Common, Wallet } from '@/utils';
import { BaseConfig } from '@/config';

export default {
	mixins: [CommonMethod],
	components: {Dialog, PercentSelect, StatuButton},
	data(){
		return({
			inputPercent: 1,
			inputValue: "",
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
			feeRate: 0,
			stakeTime: 0,
		})
	},
	watch: {
		inputValue: function(){
			this.inputPercent = 0;
		},
		oprData: function(newData){
			let { wantAmount, gracePeriod} = newData;
			this.inputValue = wantAmount;

			let stakeTime = Number(gracePeriod) - 15552000;
			let nowTime = parseInt(new Date().valueOf() / 1000);
			let dt = nowTime - stakeTime;
			
			let rate = 0;
			Object.values(BaseConfig.MomoLPCfg).map(item=>{
				if(item.maxTime >= dt && item.minTime < dt){
					rate = item.rate;
				}
			});
			this.feeRate = rate;
			this.stakeTime = stakeTime;
			this.inputPercent = 0;
		},
		inputPercent: function(newData){
			let {wantAmount} = this.coinArr[this.oprData.coinName];
			let targetValue = Common.numFloor(Number(wantAmount) * Number(newData), this.oprData.omit);
			if(newData == 0) return;
			this.inputValue = targetValue;
		},
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		getShowNotice(){
			return this.$t('Air-drop_90')
							.replace('#0#', '<span>'+this.dateFtt('yyyy.MM.dd hh:mm:ss', new Date(this.stakeTime * 1000)) + '</span>')
							.replace('#1#', '<span class="color-danger">'+this.numFloor(Number(this.inputValue) * this.feeRate + 0.00000000001, 1e8) + '</span>' )
							.replace('#2#', this.feeRate * 100 + '%')
							.replace('#3#', this.dateFtt('yyyy.MM.dd hh:mm:ss', new Date(this.oprData.gracePeriod * 1000)));
		}
	},
	created(){
		console.log(BaseConfig.MomoLPCfg);
	},
	methods:{
		async withdraw(){
			console.log(this.inputValue);
			let {coinName} = this.oprData;
			this.coinArr[coinName].isWithdrawing = true;
			let res = await Wallet.ETH.withdraw(this.oprData.coinName,this.inputValue);
			if(res){
				this.coinArr[coinName].isWithdrawing = true;
				this.inputValue = ""
				this.close()
			}
		},
		show(){
			this.oprDialog("widthdraw-dialog","block");
			return this;
		},
		close(){
			this.oprDialog("widthdraw-dialog","none")
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