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
import { PancakeConfig, EventConfig, WalletConfig } from '@/config';
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
			coins: null,
			cb: ()=>{},
			updataTime: 0,
		});
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		selectCoinList(){
			return this.coins || Object.keys(PancakeConfig.SelectCoin);
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

			for (let key in PancakeConfig.SelectCoin) {
				let {addr, decimals, omit} = PancakeConfig.SelectCoin[key];

				if(addr != "") {
					let value;

					if (key === "MEC") {
						const data = await Wallet.ETH.get1155Num(WalletConfig.ETH.crystalToken, [1]);
						value = data['1'];
					} else {
						const data = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
						value = Common.numFloor((Number(data) / decimals), omit);
					}

					this.coinArr[key].balance = value;
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
			this.coins = null;
			this.oprDialog("select-coin-dialog","none")
			return this;
		},
		setOprData(hasSelectCoin, cb, coins){
			this.hasSelectCoin = hasSelectCoin;
			this.coins = coins;
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
		background: #202020;
	}
	.select-coin-item{
		height: 45px;
		cursor: pointer;
		padding: 10px;
		background: #3f3f3f;
		margin: 10px 0px;
		border-radius: 10px;
	}
	.select-coin-item.disable:hover{
		background: #202020;
	}
	.select-coin-item:hover{
		background: #3a3a3a;
	}
</style>