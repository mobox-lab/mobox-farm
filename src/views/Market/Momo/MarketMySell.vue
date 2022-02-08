<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<div id="market-pet-fitter">
				<div class="dib por cur-point" @click="oprDialog('shop-history-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" height="40" />
				</div>

				<div class="dib por mgl-10 filter"  >
					<img src="@/assets/icon/filter_icon.png" alt="" height="40" @click="toggleFilter($refs.filter)" />
					<div class="filter-panel hide " ref="filter">
						<div >
							<h5>Qualities</h5>
							<div @click="onSelectQualityChange(pos)" class="filter-select-item" :class="{'active': pos == myMarketSellFilter.vType}" v-for="(item, pos) in $parent.$parent.selectVType" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-30 tac" @click="toggleFilter($refs.filter)">
							<button class="btn-primary" style="width:80%">{{$t("Common_03")}}</button>
						</div>
					</div>
				</div>
			</div>
			<div class="vertical-children  dib">
				<span>{{$t("Market_33")}}({{ marketPetsMy.total + bigSellMy.total }})</span>
				<div class="dib filter-show-group">
					<div class="filter-show-item" v-if="myMarketSellFilter.vType != 0" >
						<span class="filter-close" @click="onSelectQualityChange(0)">&times;</span>
						<span class="mgl-10">{{$parent.$parent.selectVType[myMarketSellFilter.vType]}}</span>
					</div>
				</div>
			</div>

		</div>
		<div :class="getShowList.length < 4 ? 'tal' : ''"  class="vertical-children momo-content">
			<div class="no-show" v-if="getShowList.length == 0 && getBigShowList.length == 0">
				<img src="@/assets/no_items.png" alt="">
				<p class="opa-6 mgt-10">No items to display</p>
			</div>
			<div>
				<router-link :to="`/bigSellView/`+item.tx" v-for="item in getBigShowList" :key="item.tx">
					<BigSellItem :data="item" />
				</router-link>
			</div>
			<div>
				<router-link :to=" item.index >= 0 ? ('/auctionView/'+ item.tx):'###'" :class="item.index >= 0?'':'opa-6'" v-for="item in getShowList" :key="item.tx + item.uptime + item.tokenId+item.ids[0]">
					<PetItem  v-bind:data="{item: item.tokenId == 0?item.list1155[0]:item}" class="market" v-if="item.tokenId != 0 || item.list1155.length == 1" >
						<div class="vertical-children " style="font-size: 18px" v-if="item.index >= 0 ">
							<img src="@/assets/coin/BUSD.png"  alt="" height="20"/>&nbsp;
							<span>{{numFloor(item.nowPrice/1e9, 10000)}} <sub class="small">BUSD</sub></span>
						</div>
						<div class="vertical-children " v-if="item.index < 0" style="font-size: 18px;">
							<Loading />&nbsp;
							<small v-if="item.index == -1">{{$t("Market_30")}}...</small>
							<small v-if="item.index == -2">{{$t("Market_31")}}...</small>
						</div>
					</PetItem>
					<PetItemScroll v-bind:data="{item: item}" class="market" v-else>
						<div class="vertical-children " style="font-size: 18px;" v-if="item.index >= 0">
							<img src="@/assets/coin/BUSD.png"  alt="" height="20"/>&nbsp;
							<span>{{numFloor(item.nowPrice/1e9, 10000)}} <sub class="small">BUSD</sub></span>
						</div>
						<div class="vertical-children " v-if="item.index < 0" style="font-size: 18px;">
							<Loading />&nbsp;
							<small v-if="item.index == -1">{{$t("Market_30")}}...</small>
							<small v-if="item.index == -2">{{$t("Market_31")}}...</small>
						</div>
					</PetItemScroll>
				</router-link>
			</div>
		</div>

		<div style="margin-top: 30px" v-if="Math.ceil(marketPetsMy.total / onePageCount) > 1">
			<Page ref="page" :defaultPage="marketMySellPage" :totalPage="Math.ceil(marketPetsMy.total / onePageCount)" :onChange="onPageChange" v-show="Math.ceil(marketPetsMy.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import { Page, PetItem, PetItemScroll, Loading } from '@/components';
import { CommonMethod } from "@/mixin";
import { Http, Wallet,Common  } from '@/utils';
import { BaseConfig,  } from "@/config";
import { mapState } from "vuex";
import BigSellItem from './items/BigSellItem.vue';

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {   PetItem, PetItemScroll, Page, Loading, BigSellItem},
	data(){
		return({
			onePageCount: 12,
			myAccount: "",
			hasLoad: false,
		});
	},
	computed: {
		...mapState({
			marketPetsMy: (state) => state.marketState.data.marketPetsMy,
			bigSellMy: (state) => state.momoMarketState.data.bigSellMy,
			tempSells: (state) => state.marketState.data.tempSells,
			tempMarketCancelTx: (state) => state.marketState.data.tempMarketCancelTx,
			marketMySellPage: (state) => state.marketState.data.marketMySellPage,
			momoNameObjs: (state) => state.marketState.data.momoNameObjs,
			momoGemsObjs: (state) => state.marketState.data.momoGemsObjs,
			myMarketSellFilter: (state) => state.marketState.data.myMarketSellFilter,
			historyNotice: (state) => state.marketState.data.historyNotice,
		}),
		getSellList() {
			let totalPet = [];
			let nftConfig = BaseConfig.NftCfg;
			this.marketPetsMy.list.map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory = this.myMarketSellFilter.category == 0 || this.myMarketSellFilter.category == item.category;
				let isMathVType = this.myMarketSellFilter.vType == 0 || this.myMarketSellFilter.vType == item.vType;
				//出售中打包的momo
				if(item.ids.length != 0){
					item.ids.map(prototype=>{
						let {category} = nftConfig[prototype];
						let vType = parseInt(prototype/1e4);
						if(this.myMarketSellFilter.category == category) isMatchCategory = true;
						if(this.myMarketSellFilter.vType == vType) isMathVType = true;
					})
					item.list1155 = this.get1155ShowList(item);
				}
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
		},
		getBigShowList(){
			return this.marketMySellPage > 1?[]: this.bigSellMy.list;
		}
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();

		if(!this.hasLoad){
			this.hasLoad = true;
			this.getAuctionPetsMy(true);
			Common.app.getBigAuctionPetsMy();
		}
		timer = setInterval(()=>{
			this.getAuctionPetsMy();
		}, 10000);

	},
	
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		get1155ShowList(item){
			let {ids, amounts} = item;
			let arr = [];
			ids.map((prototype, index)=>{
				let obj = BaseConfig.NftCfg[prototype];
				obj.num = amounts[index];
				obj.vType = parseInt(prototype / 1e4);
				obj.tokenId = 0;
				obj.level = 1;
				obj.chain = "bnb";
				obj.hashrate = obj.quality;
				obj.lvHashrate = obj.quality;
				arr.push(obj);
			});

			arr.sort((a,b)=>{
				return b.vType - a.vType;
			});
			return arr;
		},
		//获取市场上的宠物
		async getAuctionPetsMy(needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let account = this.myAccount;
			// account = "0x390Ec77a320a3822bd3074aBa174570307154140";
			let data = await Http.getMyAuctionList("BNB", account);
			this.$store.commit("marketState/setData", {marketLoading: false});
			let hashArr = [];
			let needGetNameArr = [];
			let needGetGemArr = [];

			data.list.map(item=>{
				if( item.tokenId != 0){
					let {tokenName} = BaseConfig.NftCfg[item.prototype];
					item.tokenName = tokenName;
					item.vType = parseInt(item.prototype/1e4);
					item.gems = [0,0,0,0];
					if(item.specialty == 1 || item.specialty == 3){
						needGetNameArr.push(item.tokenId);
					}
					needGetGemArr.push(Number(item.tokenId));
					hashArr.push(item.tx + item.tokenId);
				}else{
					hashArr.push(item.tx + item.ids[0])
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
				item.tx = item.tx.toString() + item.auctor.toString() + item.index;
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

			// return ;
			this.$store.commit("marketState/setData", {tempSells: this.tempSells, marketPetsMy:data, tempMarketCancelTx: this.tempMarketCancelTx});

			this.$nextTick(async ()=>{
				await this.getMomoName(needGetNameArr);
				await this.getMomoGem(needGetGemArr);
			})
		},
		// 获取市场上我的大宗交易
		async getBigAuctionPetsMy2(needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let account = this.myAccount;
			let data = await Http.getMyBigAuctionList(account);
			this.$store.commit("marketState/setData", {marketLoading: false});
			console.log(data, "big------");
			this.$store.commit("momoMarketState/setData", {bigSellMy:data});
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
		async getMomoGem(needGetGemArr){
			let fitterArr = [];
			//去除重复的名字
			needGetGemArr.map(item=>{
				if(!Object.prototype.hasOwnProperty.call(this.momoGemsObjs, item)){
					fitterArr.push(item);
				}
			});

			if(fitterArr.length != 0){
				let gems = await Wallet.ETH.getBatchInlayInfo(fitterArr);
				if(gems){
					fitterArr.map((item, index)=>{
						this.momoGemsObjs[item] = [...gems[index]];
					});
				}
			}

			this.marketPetsMy.list.map(item=>{
				item.gems = this.momoGemsObjs[item.tokenId] || [0,0,0,0];
			});
			this.$store.commit("marketState/setData", {marketPetsMy: this.marketPetsMy, momoGemsObjs : this.momoGemsObjs});
		},
		onPageChange(page){
			this.$store.commit("marketState/setData", {marketMySellPage: page});
			this.$nextTick(()=>{
				this.$refs.page && this.$refs.page.initPage();
			})
		},
		onSelectQualityChange(pos) {
			this.$store.commit("marketState/setFilter", {
				filterName: "myMarketSellFilter",
				type: "vType",
				value: pos,
			});
			this.onPageChange(1);
		},
		onSelectTypeChange(pos) {
			this.$store.commit("marketState/setFilter", {
				filterName:"myMarketSellFilter",
				type: "category",
				value: pos,
			});
			this.onPageChange(1);
		},
	}
}
</script>

<style scoped>

	#market-pet-fitter {
		position: absolute;
		right: 0px;
		top: 0px;
	}
	@media (max-width: 768px) {

		#market-pet-fitter{
			zoom: 0.8;
			top: -65px !important;
		}
	}
</style>