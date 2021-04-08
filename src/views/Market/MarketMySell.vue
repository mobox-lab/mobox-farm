<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span>{{$t("Market_33")}}: {{ getSellList.length }}</span>&nbsp;
			<div id="market-pet-fitter">
				<div class="dib por mgt-10" id="shop-history" @click="oprDialog('shop-history-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="../../assets/icon/tradeRecord.png" alt="" />
				</div>
				<Dropdown :list="$parent.selectCategory" :defaultSelectPos="myMarketSellFilter.category" :onChange="onSelectTypeChange" />&nbsp;
				<Dropdown :list="$parent.selectVType" :defaultSelectPos="myMarketSellFilter.vType" :onChange="onSelectQualityChange" />&nbsp;
			</div>
		</div>
		<div :class="getShowList.length < 6 ? 'tal' : ''"  class="mgt-20 vertical-children">
			<router-link :to=" item.index >= 0 ? ('/auctionView/'+ JSON.stringify(item)):'###'" :class="item.index >= 0?'':'opa-6'" v-for="item in getShowList" :key="item.tx + item.uptime">
				<PetItem  v-bind:data="{item: item}" class="market" v-if="item.tokenId != 0 " >
					<div class="vertical-children mgt-10" style="font-size: 18px;" v-if="item.index >= 0">
						<img src="../../assets/coin/BUSD.png"  alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 10000)}} <sub class="small">BUSD</sub></span>
					</div>
					<div class="vertical-children mgt-10" v-if="item.index < 0" style="font-size: 18px;">
						<img  src="../../assets/icon/loading.png" class="rotate" height="20" alt=""  /> &nbsp;
						<small v-if="item.index == -1">{{$t("Market_30")}}...</small>
						<small v-if="item.index == -2">{{$t("Market_31")}}...</small>
					</div>
				</PetItem>
				<PetItemScroll v-bind:data="{item: item}" class="market" v-if="item.tokenId == 0 ">
					<div class="vertical-children mgt-10" style="font-size: 18px;" v-if="item.index >= 0">
						<img src="../../assets/coin/BUSD.png"  alt="" height="20"/>&nbsp;
						<span>{{numFloor(item.nowPrice/1e9, 10000)}} <sub class="small">BUSD</sub></span>
					</div>
					<div class="vertical-children mgt-10" v-if="item.index < 0" style="font-size: 18px;">
						<img  src="../../assets/icon/loading.png" class="rotate" height="20" alt=""  /> &nbsp;
						<small v-if="item.index == -1">{{$t("Market_30")}}...</small>
						<small v-if="item.index == -2">{{$t("Market_31")}}...</small>
					</div>
				</PetItemScroll>
			</router-link>
		</div>

		<div style="margin-top: 30px" v-if="Math.ceil(getSellList.length / onePageCount) > 1">
			<Page :key="hackReload"  :defaultPage="marketMySellPage" :totalPage="Math.ceil(getSellList.length / onePageCount)" :onChange="onPageChange" v-if="Math.ceil(marketPetsMy.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, PetItem, PetItemScroll, Dropdown} from "@/components";
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, PetItem, PetItemScroll, Dropdown},
	data(){
		return({
			onePageCount: 15,
			myAccount: "",
			hasLoad: false,
		});
	},
	computed: {
		...mapState({
			marketPetsMy: (state) => state.marketState.data.marketPetsMy,
			tempSells: (state) => state.marketState.data.tempSells,
			tempMarketCancelTx: (state) => state.marketState.data.tempMarketCancelTx,
			marketMySellPage: (state) => state.marketState.data.marketMySellPage,
			momoNameObjs: (state) => state.marketState.data.momoNameObjs,
			myMarketSellFilter: (state) => state.marketState.data.myMarketSellFilter,
			historyNotice: (state) => state.marketState.data.historyNotice,
		}),
		getSellList() {
			let totalPet = [];
			this.marketPetsMy.list.map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory =
					this.myMarketSellFilter.category == 0 ||
					this.myMarketSellFilter.category == item.category;
				let isMathVType =
					this.myMarketSellFilter.vType == 0 ||
					this.myMarketSellFilter.vType == item.vType;
				if (isMatchCategory && isMathVType) {
					totalPet.push(item);
				}
			});
			return totalPet;
		},
		getShowList(){
			let list = this.getSellList;
			let cancelTx = [];
			this.tempMarketCancelTx.map(item=>cancelTx.push(item.tx));
			list.map(item=>{
				if(cancelTx.indexOf(item.tx) != -1) item.index = -2;
			})
			return   [...this.tempSells,...list].slice(
				this.onePageCount * (this.marketMySellPage - 1),
				this.onePageCount * this.marketMySellPage
			);
		}
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();
		if(!this.hasLoad){
			this.hasLoad = true;
			this.getAuctionPetsMy(true);
		}
		timer = setInterval(()=>{
			this.getAuctionPetsMy();
		}, 10000);
	},
	
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		//获取市场上的宠物
		async getAuctionPetsMy(needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let account = this.myAccount;
			let data = await Http.getMyAuctionList("BNB", account);
			console.log(data);
			this.$store.commit("marketState/setData", {marketLoading: false});
			let hashArr = [];
			let needGetNameArr = [];
			data.list.map(item=>{
				if( item.tokenId != 0){
					let {tokenName} = BaseConfig.NftCfg[item.prototype];
					item.tokenName = tokenName;
					item.vType = parseInt(item.prototype/1e4);
					if(item.specialty == 1 || item.specialty == 3){
						needGetNameArr.push(item.tokenId);
					}
				}
				//计算当前价格
				let endTime = Number(item.uptime) + item.durationDays * 86400;
				let nowTime = parseInt(new Date().valueOf() / 1000);
				let nowPrice = item.endPrice;
				let diffPrice = item.endPrice - item.startPrice;
				if(endTime > nowTime){
					nowPrice = item.startPrice + (diffPrice / item.durationDays * Math.floor((nowTime-item.uptime)/ 86400))
				}
				item.nowPrice = nowPrice;
				hashArr.push(item.tx);
				
			});

			//删除临时出售的数据
			this.tempSells.map((item,index)=>{
				if(hashArr.indexOf(item.tx) != -1){
					this.tempSells.splice(index, 1);
				}
			});

			//删除临时下架的数据
			this.tempMarketCancelTx.map((item, index)=>{
				if(hashArr.indexOf(item.tx) == -1){
					this.tempMarketCancelTx.splice(index, 1);
				}
			})
			this.$store.commit("marketState/setData", {tempSells: this.tempSells, marketPetsMy:data, tempMarketCancelTx: this.tempMarketCancelTx});

			this.$nextTick(()=>{
				this.getMomoName(needGetNameArr);
			})
		},
		async getMomoName(needGetNameArr){
			let fitterArr = [];
			//去除重复的名字
			needGetNameArr.map(item=>{
				if(!Object.prototype.hasOwnProperty.call(this.momoNameObjs, item)){
					fitterArr.push(item);
				}
			});
			if(fitterArr.length != 0){
				//请求name
				let names = await Wallet.ETH.getMomoNamesByTokenIds(fitterArr);
				if(names != ""){
					fitterArr.map((item, index)=>{
						this.momoNameObjs[item] = names[index];
					});
				}
			}
			this.marketPetsMy.list.map(item=>{
				item.tokenName = this.momoNameObjs[item.tokenId] || item.tokenName;
			});
			this.$store.commit("marketState/setData", {marketPetsMy: this.marketPetsMy, momoNameObjs : this.momoNameObjs});
		},
		onPageChange(page){
			this.$store.commit("marketState/setData", {marketMySellPage: page});
			this.hackReloadMethod();
		},
		onSelectQualityChange(pos) {
			this.$store.commit("marketState/myMarketSellFilter", {
				type: "vType",
				value: pos,
			});
			this.onPageChange(1);
		},
		onSelectTypeChange(pos) {
			this.$store.commit("marketState/myMarketSellFilter", {
				type: "category",
				value: pos,
			});
			this.onPageChange(1);
		},
	}
}
</script>

<style scoped>
	#shop-history {
		margin-right: 15px;
		cursor: pointer;
		position: relative;
		user-select: none;
	}
	#market-pet-fitter {
		position: absolute;
		right: 0px;
		top: 0px;
	}
	@media (max-width: 768px) {

		#market-pet-fitter{
			zoom: 0.8;
		}
	}
</style>