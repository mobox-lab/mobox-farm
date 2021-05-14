<template>
	<div id="market">
		<section id="market-type">
			<div class="market-type-list-item vertical-children " :class="{active: marketTypePos == 0}" @click="$store.commit('marketState/setData', {marketTypePos: 0})">
				<img src="../../assets/icon/momo_icon.png" alt="" height="30">&nbsp;
				<span>MOMO</span>
			</div>
			<div  class="market-type-list-item vertical-children" :class="{active: marketTypePos == 1}" @click="$store.commit('marketState/setData', {marketTypePos: 1})">
				<img src="../../assets/icon/yellow_icon.png" alt="" height="30">&nbsp;
				<span>{{$t("Gemstone_44")}}</span>
			</div>
		</section>
		<div class="mgt-10" v-if="marketTypePos==0">
			<Tab :list="tabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,tempSells.length + tempMarketCancelTx.length]"  />
			<MarketAll v-show="marketTabPos == 0" />
			<MarketMy v-show="marketTabPos == 1" />
			<MarketMySell v-if="marketTabPos == 2" />
			<MarketStatistics v-if="marketTabPos == 3" />
		</div>
		<div v-else class="mgt-10">
			<Tab :list="tabList" :defaultSelectPos="marketTabPos" :onChange="onTabChange" :notice="[0,0,tempGemSells.length + tempGemMarketCancelTx.length]"  />
			<MarketGemAll v-show="marketTabPos == 0" />
			<MarketGemMy v-show="marketTabPos == 1" />
			<MarketGemMySell v-if="marketTabPos == 2" />
			<MarketGemStatistics v-if="marketTabPos == 3" />
		</div>

		<div class="loading" v-show="marketLoading">
			<Loading :width="30" :height="30"  />
		</div>
		<!-- momo的交易记录 -->
		<Dialog id="shop-history-dialog" :top="100" :width="650" :animation="viewHistory">
			<h2>{{$t("Market_24")}}</h2>
			<div class="mgt-10" style="background:#000912;border-radius:10px;padding:8px;">
				<div class="aveage-box opa-6 small tal" style="padding: 0px 8px">
					<div class="hide-xs" style="flex:2">MOMO</div>
					<div>{{$t("Market_25")}}</div>
					<div>{{$t("Market_26")}}</div>
					<div class="tar" >{{$t("Market_17")}}</div>
				</div>
				<div style="por mgt-10 tal"  >
					<div class="aveage-box mgt-10 por tal" v-for="(item, index) in marketHistory.list" :key="item.tx+index" style="background:#1D2B50;border-radius:15px;padding:10px 8px ;">
						<div class="shop-history-pet" style="flex:2">
							<span v-for="item2 in item.petList" :key="item2.prototype" style="margin:0px 2px" class="dib">
								<PetItemMin :data="item2" style="zoom: 0.6" />
							</span>
						</div>
						<div class="opa-6 small addr">{{shorAddress(item.bidder)}}</div>
						<div class="opa-6 small addr">{{shorAddress(item.auctor)}}</div>
						<div class="tar small" :class="item.isBuy?'color-buy':'color-sell'">
							{{item.isBuy?"-":"+"}}{{numFloor((item.bidPrice / 1e9) * (item.isBuy?1:0.95), 10000)}} BUSD
							<p style="color:#6481b0;zoom:0.8;" >{{dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.crtime * 1000))}}</p>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<!-- 宝石的交易记录 -->
		<Dialog id="shop-history-gem-dialog" :top="100" :width="650" :animation="viewGemHistory">
			<h2>{{$t("Market_24")}}</h2>
			<div class="mgt-10" style="background:#000912;border-radius:10px;padding:8px;">
				<div class="aveage-box opa-6 small tal" style="padding: 0px 8px">
					<div class="hide-xs" style="flex:2">{{$t("Gemstone_44")}}</div>
					<div>{{$t("Market_25")}}</div>
					<div>{{$t("Market_26")}}</div>
					<div class="tar" >{{$t("Market_17")}}</div>
				</div>
				<div style="por mgt-10 tal"  >
					<div class="aveage-box mgt-10 por tal" v-for="(item, index) in marketGemHistory.list" :key="item.tx+index" style="background:#1D2B50;border-radius:15px;padding:10px 8px ;">
						<div class="shop-history-pet" style="flex:2;top:-18px">
							<span v-for="(item2, index) in item.ids" :key="item2+index" style="margin:0px 2px;zoom:0.9" class="por">
								<template v-if="item2 > 0">
									<img  :src="require(`@/assets/gem/${item2}.png`)" alt="" height="50">
									<span style="position:absolute;bottom:10px;width:80%;left:10%;background:rgba(0,0,0,0.5);border-radius:5px;zoom:0.8" class="tac small">x{{item.amounts[index]}}</span>
								</template>
							</span>
						</div>
						<div class="opa-6 small addr">{{shorAddress(item.bidder)}}</div>
						<div class="opa-6 small addr">{{shorAddress(item.auctor)}}</div>
						<div class="tar small" :class="item.isBuy?'color-buy':'color-sell'">
							{{item.isBuy?"-":"+"}}{{numFloor((item.price / 1e9) * (item.isBuy?1:0.95), 10000)}} MBOX
							<p style="color:#6481b0;zoom:0.8;" >{{dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.crtime * 1000))}}</p>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script>
import {  Tab, Dialog, Loading, PetItemMin } from "@/components";
import MarketAll from './MarketAll.vue'
import MarketGemAll from './Gem/MarketGemAll.vue'
import MarketMy from './MarketMy.vue'
import MarketGemMy from './Gem/MarketGemMy.vue'
import MarketMySell from './MarketMySell.vue'
import MarketGemMySell from './Gem/MarketGemMySell.vue'
import MarketStatistics from './MarketStatistics.vue'
import MarketGemStatistics from './Gem/MarketGemStatistics.vue'
import { mapState } from "vuex";
import { BaseConfig, PancakeConfig } from '@/config';
import {Http, Wallet, Common} from "@/utils";
import { CommonMethod } from "@/mixin";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { Tab, MarketAll, MarketGemAll, MarketMy, MarketGemMy, MarketMySell , MarketGemMySell,  Dialog , Loading, MarketStatistics, MarketGemStatistics, PetItemMin},
	data() {
		return {
			tabList: [this.$t('Market_01'), this.$t("Market_02"), this.$t("Market_03"), this.$t("Market_53")],
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
			gemType:[this.$t("Market_60"),this.$t("Gemstone_45"), this.$t("Gemstone_46"), this.$t("Gemstone_47"),this.$t("Gemstone_48"),],
			gemLv:[this.$t("Gemstone_49"), "Lv.1", "Lv.2", "Lv.3","Lv.4","Lv.5","Lv.6","Lv.7","Lv.8","Lv.9"],
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
			tempGemSells: (state) => state.marketState.data.tempGemSells,
			tempGemMarketCancelTx: (state) => state.marketState.data.tempGemMarketCancelTx,
			marketHistory: (state) => state.marketState.data.marketHistory,
			marketGemHistory: (state) => state.marketState.data.marketGemHistory,
			historyNotice: (state) => state.marketState.data.historyNotice,
			historyGemNotice: (state) => state.marketState.data.historyGemNotice,
			marketTypePos: (state) => state.marketState.data.marketTypePos,
			coinArr: (state) => state.bnbState.data.coinArr,
			useCoinPos: (state) => state.bnbState.data.useCoinPos,
		}),
		getSelectCoinArr(){
			let arr = [];
			Object.keys(PancakeConfig.SelectCoin).map(coinKey=>{
				if(coinKey == "BUSD"){
					arr.push(coinKey + ": " + this.coinArr[coinKey].balance);
				}
			})
			return arr;
		}
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();

		await this.getMyAuctionHistory();
		await this.getMyGemAuctionHistory()
		if(timer) clearInterval(timer);
		timer = setInterval(async ()=>{
			await this.getMyAuctionHistory();
			await this.getMyGemAuctionHistory();
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

		viewHistory(){
			this.$store.commit("marketState/setData", { historyNotice: false});
		},
		viewGemHistory(){
			this.$store.commit("marketState/setData", { historyGemNotice: false});
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

					//生成显示小头像数据
					let petList = [];
					//1155
					if(item.tokenId == 0){
						let {ids, amounts, bidPrice} = item;
						ids.map((prototype, index)=>{
							let obj = BaseConfig.NftCfg[prototype];
							if(obj){
								petList.push({
									...obj,
									bidPrice,
									prototype,
									level: 1,
									num: amounts[index],
									chain: "bnb",
									tokenId: 1,
									hashrate: obj.quality,
									lvHashrate: obj.quality,
									vType: parseInt(prototype / 1e4),
									quality: obj.quality,
								});
							}
						});
					}else{
						//721
						let obj = BaseConfig.NftCfg[item.prototype];
						petList.push({
							...obj,
							bidPrice: item.bidPrice,
							prototype: item.prototype,
							level: item.level,
							num: 1,
							chain: "bnb",
							tokenId: item.tokenId,
							hashrate: item.hashrate,
							lvHashrate: item.lvHashrate,
							vType: parseInt(item.prototype / 1e4),
							category: item.category,
							quality: item.quality,
						})
					}

					item.petList = petList;

				});
				data.uptime = new Date().valueOf();
				let historyNotice = this.historyNotice;
				if(!historyNotice){
					historyNotice =  (data.total != this.marketHistory.total && this.marketHistory.uptime != 0);
				}
				this.$store.commit("marketState/setData", {marketHistory: data, historyNotice});
			}
		},
		//获取宝石交易记录
		async getMyGemAuctionHistory(){
			if(this.myAccount == "") return;
			let data = await Http.getMyGemAuctionHistory(this.myAccount);
			if(data){
				data.list.map(item=>{
					item.isBuy =  item.bidder.toLocaleLowerCase() == this.myAccount.toLocaleLowerCase();
				});
				data.uptime = new Date().valueOf();
				let historyGemNotice = this.historyGemNotice;
				if(!historyGemNotice){
					historyGemNotice =  (data.total != this.marketGemHistory.total && this.marketGemHistory.uptime != 0);
				}
				this.$store.commit("marketState/setData", {marketGemHistory: data, historyGemNotice});
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

	},
};
</script>

<style >
#market-type{
	text-align: left;
	border-bottom: 1px solid #162340 ;
}
.market-type-list-item{
	display: inline-block;
	height: 40px;
	margin-right: 10px;
	min-width: 100px;
	text-align: center;
	cursor: pointer;
	user-select: none;
}
.market-type-list-item.active{
	border-bottom: 4px solid #93BBFF;
}
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
