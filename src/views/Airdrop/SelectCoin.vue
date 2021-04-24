<template>
	<Dialog id="select-coin-dialog" :top="100" :width="400">
		<h2>{{$t("Air-drop_38")}}</h2>
		<div v-for="coinKey in selectCoinList" :key="coinKey" :class="hasSelectCoin.indexOf(coinKey) != -1?'disable':'' " class="aveage-box select-coin-item" @click="itemClick(coinKey)">
			<div class="vertical-children tal">
				<img :src="require(`../../assets/coin/${coinKey}.png`)" width="20" alt="">&nbsp;
				<span class="mgl-5">{{coinKey}}</span>
			</div>
			<div class="tar" v-if="coinArr[coinKey].balance != '-'">{{coinArr[coinKey].balance}}</div>
			<div class="tar" v-else>
				<Loading />
			</div>
		</div>
	</Dialog>
</template>

<script>
import { PancakeConfig, EventConfig } from '@/config';
import { Dialog, Loading } from '@/components';
import {CommonMethod} from '@/mixin';
import { mapState } from 'vuex'
import { Wallet, Common, EventBus } from '@/utils';

export default {
	mixins: [CommonMethod],
	components:{Dialog, Loading},
	data(){
		return({
			hasSelectCoin: [],
			cb: ()=>{},
			updataTime: 0,
		});
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		selectCoinList(){
			return Object.keys(PancakeConfig.SelectCoin);
		}
	},
	created(){
		EventBus.$on(EventConfig.SwapSuccess, this.getCoinValue);
	},
	beforeDestroy(){
		EventBus.$off(EventConfig.SwapSuccess, this.getCoinValue);
	},
	methods:{
		async getCoinValue(){
			let balance = await Wallet.ETH.getBalance();
			this.coinArr["BNB"].balance = balance;
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});

			for (let coinKey in PancakeConfig.SelectCoin) {
				let {addr, decimals, omit} = PancakeConfig.SelectCoin[coinKey];
				if(addr != ""){
					let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
					this.coinArr[coinKey].balance =  Common.numFloor((Number(value) / decimals), omit);
					this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
					await Common.sleep(500);
				}
			}
		},
		show(){
			this.oprDialog("select-coin-dialog","block");
			if(new Date().valueOf()- this.updataTime > 1000*20){
				this.updataTime = new Date().valueOf();
				this.getCoinValue();
			}
			return this;
		},
		close(){
			this.oprDialog("select-coin-dialog","none")
			return this;
		},
		setOprData(hasSelectCoin, cb){
			this.hasSelectCoin = hasSelectCoin;
			this.cb = cb;
			return this;
		},
		itemClick(item){
			if(this.hasSelectCoin.indexOf(item) != -1) return;
			this.close().cb(item);
		}
	}
}
</script>

<style scoped>
	.select-coin-item.disable{
		background: #262833;
	}
	.select-coin-item{
		height: 45px;
		cursor: pointer;
		padding: 10px;
		background: #1d2b50;
		margin: 10px 0px;
		border-radius: 10px;
	}
	.select-coin-item.disable:hover{
		background: #262833;
	}
	.select-coin-item:hover{
		background: #1c2641;
	}
</style>