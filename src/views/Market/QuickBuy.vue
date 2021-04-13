<template>
	<Dialog id="market-quick-buy-dialog" :top="100" width="550">
		<h2>{{$t("Market_50")}}</h2>
		<div class="tar mgt-10" style="zoom:0.8">
			<Dropdown :list="sortArr" :defaultSelectPos="marketSearch.sort" :onChange="onSortChange" />&nbsp;
			<Dropdown :list="getSelectCoinArr" :defaultSelectPos="$parent.useCoinPos" :onChange="onCoinChange" />&nbsp;
		</div>
		<div style="min-height:200px">
			<div class="mgt-10 tab-panel" v-for="item in marketData.list" :key="item.tx">
			

				<div class="aveage-box">
					<div class="vertical-children"  style="flex:1.5">
						<div class="tac" >
							<div style="zoom:0.9">
								<span v-for="item2 in item.petList" :key="item2.prototype" class="dib" style="margin:5px">
									<PetItemMin :data="item2" />
								</span>
							</div>
						</div>

						<div class="tac mgt-5 bold">
							<span>价格:</span>
							<span>{{numFloor( item.nowPrice/ 1e9, 1e4)}}</span>&nbsp;
							<img src="../../assets/coin/BUSD.png" height="25"  alt="">
						</div>
						<div class=" tac mgt-5" v-if="item.startPrice != item.endPrice && item.countdown != '00:00:00'">
							<span class="small opa-6">{{$t('Market_32').replace('#0#', item.countdown)}}:{{numFloor( item.nextDayPrice/ 1e9, 1e4)}}</span>
						</div>
					</div>
					<div :class="coinArr['BUSD'].allowanceToAuction == 0 ?'btn-group':''" style="zoom:0.9">
						<StatuButton :onClick="approve.bind(this)" data-step="1"  v-if="coinArr['BUSD'].allowanceToAuction == 0" :isDisable="coinArr['BUSD'].allowanceToAuction > 0" :isLoading="coinArr['BUSD'].isApproving" style="width:80%">{{$t("Air-drop_16")}} BUSD</StatuButton>
						<StatuButton :onClick="buyPet.bind(this, item)" data-step="2" :isDisable="coinArr['BUSD'].allowanceToAuction <=0" :isLoading="lockBtn.buyMomoLock > 0" class="mgt-10"  style="width:80%;">{{$t("Market_22")}}</StatuButton>
					</div>
				</div>
			</div>
			<div v-if="marketData.list.length  == 0" class="tab-panel mgt-10" style="height:200px;display:flex;align-items:center;justify-content: center">
				<span class="opa-6" v-if="!marketLoading">暂无该MOMO出售</span>
				<Loading v-else :width="30" :height="30"/>
			</div>
		</div>

	</Dialog>
</template>

<script>
import { Dialog, Dropdown, PetItemMin, StatuButton, Loading } from '@/components';
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import {Http,Wallet, Common, EventBus} from "@/utils";
import {BaseConfig, PancakeConfig,WalletConfig, EventConfig} from "@/config";
let updatePriceTimer = null;
export default {
	mixins: [CommonMethod],
	components: {Dialog, Dropdown, PetItemMin, StatuButton, Loading},
	data(){
		return({
			marketData: {
				list: [],
			},
			sortArr: [this.$t("Market_47"),this.$t("Market_04"), this.$t("Market_05"), this.$t("Market_06"), this.$t("Market_07")],
			marketSearch: {
				category: 0,
				vType: 0,
				sort: 2,
				pType: 0,
			},
			pType: 0,
		})
	},
	computed:{
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			useCoinPos: (state) => state.bnbState.data.useCoinPos,
			marketLoading: (state) => state.marketState.data.marketLoading,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		getSelectCoinArr(){
			let arr = [];
			Object.keys(PancakeConfig.SelectCoin).map(coinName=>{
				if(coinName == "BUSD"){
					arr.push(coinName + ": " + this.coinArr[coinName].balance);
				}
			})
			return arr;
		}
	},
	async created(){
		this.startCountDown();
		await Wallet.ETH.getAccount();
		//查询授权情况
		await this.viewAllowance();
	},
	mounted(){
		EventBus.$on(EventConfig.BidPetSuccess, this.bitPetSuccess);
	},
	beforeDestroy(){
		if(updatePriceTimer) clearInterval(updatePriceTimer);
		EventBus.$off(EventConfig.BidPetSuccess, this.bitPetSuccess);
	},
	methods:{
		bitPetSuccess(){
			this.getAuctionPets();
			this.oprDialog("market-quick-buy-dialog","none");
		},
		startCountDown(){
			if(updatePriceTimer) clearInterval(updatePriceTimer);
			updatePriceTimer = setInterval(() => {
				let nowTime = parseInt(new Date().valueOf() / 1000);
				this.marketData.list.map(item=>{
					let count = 86400 - ((nowTime-item.uptime) % 86400);
					item.countdown = this.getLeftTime(count);
				});
			}, 1000);
		},
		onSortChange(pos){
			this.marketData.list = [];
			this.marketSearch.sort = pos;
			this.$nextTick(()=>{
				this.getAuctionPets();
			});
		},
		onCoinChange(pos){
			console.log("onCoinChange", pos);
		},
		show(pType){
			this.marketData.list = [];
			this.oprDialog("market-quick-buy-dialog","block");
			this.marketSearch.pType = pType;
			this.getAuctionPets();
			return this;
		},
	
		async getAuctionPets(){
			this.$store.commit("marketState/setData", {marketLoading: true});
			let data = await Http.getAuctionList("BNB", 1, 5,this.marketSearch);
			let myAccount = await Wallet.ETH.getAccount();
			this.$store.commit("marketState/setData", {marketLoading: false});
			data.list.map(item=>{
				if( item.tokenId != 0){
					let {tokenName} = BaseConfig.NftCfg[item.prototype];
					item.tokenName = tokenName;
					item.vType = parseInt(item.prototype/1e4);
				}
				//计算当前价格
				let endTime = Number(item.uptime) + item.durationDays * 86400;
				let nowTime = parseInt(new Date().valueOf() / 1000);
				let nowPrice = item.endPrice;
				let diffPrice = item.endPrice - item.startPrice;
				if(endTime > nowTime){
					nowPrice = item.startPrice + (diffPrice / item.durationDays * Math.floor((nowTime-item.uptime)/ 86400))
				}
				item.bidPrice = nowPrice;
				item.nowPrice = nowPrice;
				item.isMyPet =  item.auctor.toLocaleLowerCase() == myAccount.toLocaleLowerCase();
				
				//明天的价格
				let nextDayPrice = item.endPrice;
				let nextDayTime = nowTime + 86400;
				if(endTime > nextDayTime){
					nextDayPrice = item.startPrice + (diffPrice / item.durationDays * Math.floor((nextDayTime-item.uptime)/ 86400));
				}
				item.nextDayPrice = nextDayPrice;
				item.countdown = "00:00:00";

				//生成小头像数据
				let petList = [];
				//1155
				if(item.tokenId == 0){
					let {ids, amounts, bidPrice} = item;
					ids.map((prototype, index)=>{
						let obj = BaseConfig.NftCfg[prototype];
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
							quality: obj.quality,
							vType: parseInt(prototype / 1e4),
						});
					});
				}else{
					//721
					let obj = BaseConfig.NftCfg[item.prototype];
					petList.push({
						...obj,
						bidPrice: item.bidPrice,
						prototype: item.prototype,
						quality: item.quality,
						level: item.level,
						num: 1,
						chain: "bnb",
						tokenId: item.tokenId,
						hashrate: item.hashrate,
						lvHashrate: item.lvHashrate,
						vType: parseInt(item.prototype / 1e4),
						category: item.category
					})
				}
				item.petList = petList;
			});
			
			this.marketData = data;
		},
		//授权
		async approve(){
			let coinName = "BUSD";
			let {allowanceToAuction, isApproving} = this.coinArr[coinName];
			if(allowanceToAuction > 0 || isApproving) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin["BUSD"].addr,
			WalletConfig.ETH.moMoStakeAuction, {coinName, type: "allowanceToAuction"});
			if (hash) {
				this.coinArr[coinName].isApproving = true;
			}
		},
	
		//购买
		async buyPet(item){
			let coinName = "BUSD"
			if(this.coinArr[coinName].allowanceToAuction <= 0 || this.lockBtn.buyMomoLock > 0) return
			if(item.nowPrice/1e9 > Number(this.coinArr[coinName].balance)){
				this.showNotify(this.$t("Market_34"), "error");
				return ;
			}

			let data = await this.getPetInfo(item);
			let {auctor, index, uptime} = item;

			if(data.status != 3 || data.startTime != uptime){
				this.showNotify(this.$t("Market_35"), "error");
				this.$router.replace("/market");
				return;
			}

			let hash = await Wallet.ETH.buyMarketPet(auctor, index, coinName);
			if(hash){
				await Common.sleep(1000);
				this.$store.commit("globalState/lockBtn", "buyMomoLock");
			}
		},
		//从链上取最新的状态
		async getPetInfo(item){
			let {auctor, index} = item;
			let data = await Wallet.ETH.getMarketOrder(auctor, index);
			return data;
		},
		//获取BUSD的授权情况
		async viewAllowance(){
			let coinName = "BUSD";
			if(this.coinArr[coinName].allowanceToAuction > 0) return;

			let allowanceToAuction = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinName].addr, WalletConfig.ETH.moMoStakeAuction, false);
			if(allowanceToAuction){
				this.coinArr[coinName].allowanceToAuction = Number(allowanceToAuction);
				this.coinArr.ts = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
	}

}
</script>
