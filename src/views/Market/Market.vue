<template>
	<div id="market">
		<Tab :list="tabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,tempSells.length + tempMarketCancelTx.length]"  />
		<MarketAll v-show="marketTabPos == 0" />
		<MarketMy v-show="marketTabPos == 1" />
		<MarketMySell v-if="marketTabPos == 2" />
		<div class="loading" v-show="marketLoading">
			<Loading :width="30" :height="30"  />
		</div>

		<Dialog id="shop-history-dialog" :top="100" :width="500" :animation="viewHistory">
			<h2>{{$t("Market_24")}}</h2>
			<div style="max-height: 550px; overflow-y: auto">
				<div class="history-item mgt-10 close" v-for="item in marketHistory.list" :key="item.tx" @click="toggleClass($event)">
					<div class="row tal opa-6">
						<div class="col-md-4 col-xs-4 ">{{$t("Market_25")}}</div>
						<div class="col-md-4 col-xs-4 tac">{{$t("Market_26")}}</div>
						<div class="col-md-4 col-xs-4 tar">{{$t("Market_17")}}</div>
					</div>
					<div class="row tal cur-point por" style="background:#2E3F6B;border-radius:6px;padding:5px;padding-bottom:12px">
						<table class="pj-table">
							<tr style="color:#fff">
								<td>{{shorAddress(item.bidder)}}</td>
								<td class="tac">{{shorAddress(item.auctor)}}</td>
								<td class="tar" :class="item.isBuy?'color-buy':'color-sell'">
									{{item.isBuy?"-":"+"}}{{numFloor((item.bidPrice / 1e9) * (item.isBuy?1:0.95), 100)}} BUSD
									<p style="color:#6481b0;zoom:0.8;" >{{dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.crtime * 1000))}}</p></td>
							</tr>
						</table>
						<div class="arrow-down">
							<svg viewBox="0 0 1024 1024" width="8" height="8"><path fill="#6481b0" d="M461.7 790.9c26.2 28 70 29.3 98 3.2 1.1-1.1 2.2-2.1 3.2-3.2L992 340.2c13.5-14.4 21-33.4 20.9-53.2 1-40.5-31-74-71.5-75.1-19 0.3-37.1 8.2-50.1 22L511.8 631.5 133.2 233.9c-13.1-13.9-31.5-21.9-50.7-22C42 213 10 246.5 11 287c-0.1 19.8 7.4 38.8 20.9 53.2l429.8 450.7z" p-id="3922"></path></svg>
						</div>
					</div>
					<div class="col-md-12 mgt-10" style="zoom: 0.6" @click="$event.stopPropagation()">
						<PetItem  v-bind:data="{item: item}" class="market" v-if="item.tokenId != 0 " >
						<div class="vertical-children mgt-10" style="font-size: 18px">
							<img src="../../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
							<span>{{numFloor(item.bidPrice/1e9, 100)}}</span>
						</div>
						</PetItem>
						<PetItemScroll v-bind:data="{item: item}" class="market" v-if="item.tokenId == 0 && hackReload">
							<div class="vertical-children mgt-10" style="font-size: 18px">
								<img src="../../assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
								<span>{{numFloor(item.bidPrice/1e9, 100)}}</span>
							</div>
						</PetItemScroll>
					</div>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script>
import {  Tab,  PetItemScroll, PetItem, Dialog, Loading } from "@/components";
import MarketAll from './MarketAll.vue'
import MarketMy from './MarketMy.vue'
import MarketMySell from './MarketMySell.vue'
import { mapState } from "vuex";
import { BaseConfig, PancakeConfig } from '@/config';
import {Http, Wallet, Common} from "@/utils";
import { CommonMethod } from "@/mixin";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { Tab, MarketAll, MarketMy, MarketMySell , PetItemScroll, PetItem, Dialog , Loading},
	data() {
		return {
			tabList: [this.$t('Market_01'), this.$t("Market_02"), this.$t("Market_03")],
			tabPos: 0,
			selectCategory: [
				this.$t("MOMO_02"),
				this.$t("MOMO_03"),
				this.$t("MOMO_04"),
				this.$t("MOMO_05"),
				this.$t("MOMO_06"),
				this.$t("MOMO_07"),
			],
			selectVType: [
				this.$t("MOMO_08"),
				this.$t("MOMO_09"),
				this.$t("MOMO_10"),
				this.$t("MOMO_11"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
			myAccount: "",
			hackReload: true,
		};
	},
	computed: {
		...mapState({
			marketTabPos: (state) => state.marketState.data.marketTabPos,
			marketLoading: (state) => state.marketState.data.marketLoading,
			tempSells: (state) => state.marketState.data.tempSells,
			tempMarketCancelTx: (state) => state.marketState.data.tempMarketCancelTx,
			marketHistory: (state) => state.marketState.data.marketHistory,
			historyNotice: (state) => state.marketState.data.historyNotice,
			coinArr: (state) => state.bnbState.data.coinArr,
			useCoinPos: (state) => state.bnbState.data.useCoinPos,
		}),
		getSelectCoinArr(){
			let arr = [];
			Object.keys(PancakeConfig.SelectCoin).map(coinName=>{
				arr.push(coinName + ": " + this.coinArr[coinName].balance);
			})
			return arr;
		}
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();

		this.getMyAuctionHistory();
		if(timer) clearInterval(timer);
		timer = setInterval(()=>{
			this.getMyAuctionHistory();
		}, 10000)

		this.getCoinValue();
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		async getCoinValue(){
			let balance = await Wallet.ETH.getBalance();
			this.coinArr["BNB"].balance = balance;
			this.$store.commit("bnbState/setData", {coinArr: this.coinArr});

			for (let key in PancakeConfig.SelectCoin) {
				let {addr, decimals, omit} = PancakeConfig.SelectCoin[key];
				if(addr != ""){
					let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
					this.coinArr[key].balance =  Common.numFloor((Number(value) / decimals), omit);
					this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
					await Common.sleep(500);
				}
			}
		},

		viewHistory(){
			this.$store.commit("marketState/setData", { historyNotice: false});
		},
		//获取交易记录
		async getMyAuctionHistory(){
			if(this.myAccount == "") return;
			let data = await Http.getMyAuctionHistory(this.myAccount);
			if(data){
				data.list.map(item=>{
					if(item.tokenId != 0){
						item.tokenName = BaseConfig.NftCfg[item.prototype]["tokenName"];
						item.vType = parseInt(item.prototype / 10000);
					}
					item.isBuy =  item.bidder.toLocaleLowerCase() == this.myAccount.toLocaleLowerCase();
				});
				data.uptime = new Date().valueOf();
				let historyNotice = this.historyNotice;
				if(!historyNotice){
					historyNotice =  (data.total != this.marketHistory.total && this.marketHistory.uptime != 0);
				}
				this.$store.commit("marketState/setData", {marketHistory: data, historyNotice});
			}
		},
		toggleClass(e){
			e.currentTarget.classList.toggle("close");
			this.hackReload = false;
			this.$nextTick(()=>{
				this.hackReload = true;
			});
		},
		onTabChange(tabPos) {
			this.$store.commit("marketState/setData", {marketTabPos:tabPos});
		},
		onCoinChange(pos){
			console.log("onCoinChange", pos);
			// this.marketPets.list = [];
			// this.$store.commit("marketState/setData", {marketPage:1, marketPets: this.marketPets});
			// this.$store.commit("marketState/marketSearch", {type: "sort", value: pos});
			// this.$nextTick(()=>{
			// 	this.getAuctionPets(this.marketPage, true);
			// });
		}
	},
};
</script>

<style >
.loading{
	position: absolute;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
	text-align: center;
}
.loading svg{
	margin-top: 300px;
}
#market #market-pet-fitter {
	position: absolute;
	right: 0px;
	top: 0px;
}

#market {
	text-align: center;
	padding: 10px 10px;
	position: relative;
}

</style>
