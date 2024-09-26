<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<div id="market-pet-fitter">
				<div class="dib por mgl-10 cur-point"  @click="oprDialog('shop-history-gem-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" height="40" />
				</div>
				<!-- 宝石 -->
				<div class="dib por mgl-10 filter" v-if="marketTypePos == 2">
					<img src="@/assets/icon/filter_icon.png" alt="" height="40" @click="toggleFilter($refs.filter)" />
					<div class="filter-panel hide " ref="filter">
						<div >
							<h5>Types</h5>
							<div @click="onSelectTypeChange(pos)" class="filter-select-item" :class="{'active': pos == myGemMarketSellFilter.type}" v-for="(item, pos) in $parent.gemType" :key="item">
								{{item}}
							</div>
						</div>
						<div class="mgt-20">
							<h5>Levels</h5>
							<div @click="onSelectLevelChange(pos)" class="filter-select-item" :class="{'active': pos == myGemMarketSellFilter.level}" v-for="(item, pos) in $parent.gemLv" :key="item">
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
				<span>{{$t("Market_33")}}({{ marketGemMy.total }})</span>
				<div class="dib filter-show-group" v-if="marketTypePos == 2">
					<div class="filter-show-item" v-if="myGemMarketSellFilter.type != 0" >
						<span class="filter-close" @click="onSelectTypeChange(0)">&times;</span>
						<span class="mgl-10">{{$parent.gemType[myGemMarketSellFilter.type]}}</span>
					</div>
					<div class="filter-show-item" v-if="myGemMarketSellFilter.level != 0" >
						<span class="filter-close" @click="onSelectLevelChange(0)">&times;</span>
						<span class="mgl-10">{{$parent.gemLv[myGemMarketSellFilter.level]}}</span>
					</div>
				</div>
			</div>

		</div>
		<div :class="getShowList.length < 4 ? 'tal' : ''"  class="mgt-20 vertical-children">
			<div class="no-show" v-if="getShowList.length == 0">
				<img src="@/assets/no_items.png" alt="">
				<p class="opa-6 mgt-10">No items to display</p>
			</div>
			<router-link :to=" item.orderId >= 0 ? ('/auctionGemView/'+ item.tx):'###'" :class="item.orderId >= 0?'':'opa-6'" v-for="item in getShowList" :key="item.tx + item.uptime">
				<GemSellItem  :key="item.orderId" :data="{item: item}">
					<template v-if="item.currency == 2">
						<div class="vertical-children mgt-10" style="font-size: 18px" v-if="item.orderId >= 0">
							<img :src="require(`@/assets/coin/${getShowCoin(item)}.png`)" alt="" height="20"/>&nbsp;
							<span>{{numFloor(item.price/1e9, 10000)}} <sub class="small">{{getShowCoin(item)}}</sub></span>
						</div>
						<div class="vertical-children mgt-10" v-else style="font-size: 18px;">
							<Loading/> &nbsp;
							<small v-if="item.orderId == -1">{{$t("Market_30")}}...</small>
							<small v-if="item.orderId == -2">{{$t("Market_31")}}...</small>
						</div>
					</template>
					<span v-else class="color-buy ">
						{{$t("Market_76")}}
					</span>
				</GemSellItem>
			</router-link>
		</div>

		<div style="margin-top: 30px" v-if="Math.ceil(marketGemMy.total / onePageCount) > 1">
			<Page ref="page" :defaultPage="marketGemMySellPage" :totalPage="Math.ceil(marketGemMy.total / onePageCount)" :onChange="onPageChange" v-show="Math.ceil(marketGemMy.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import { Page, GemSellItem, Loading } from '@/components';
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { mapState } from "vuex";

export default {
	mixins: [CommonMethod],
	components: {   GemSellItem, Page, Loading},
	data(){
		return({
			onePageCount: 15,
			myAccount: "",
			hasLoad: false,
		});
	},
	computed: {
		...mapState({
			marketTabPos: (state) => state.marketState.data.marketTabPos,
			marketGemMy: (state) => state.marketState.data.marketGemMy,
			myGemMarketSellFilter: (state) => state.marketState.data.myGemMarketSellFilter,
			marketGemFilter: (state) => state.marketState.data.marketGemFilter,
			tempGemSells: (state) => state.marketState.data.tempGemSells,
			tempGemMarketCancelTx: (state) => state.marketState.data.tempGemMarketCancelTx,
			marketGemMySellPage: (state) => state.marketState.data.marketGemMySellPage,
			historyNotice: (state) => state.marketState.data.historyNotice,
			marketTypePos: (state) => state.marketState.data.marketTypePos,
			nowTs: (state) => state.globalState.data.nowTs,
		}),
		getSellList() {
			let totalPet = [];
			this.marketGemMy.list.map((item) => {
				//类型的筛选,品质的筛选
				let isMatchType = this.myGemMarketSellFilter.type == 0 ;
				let isMathLevel = this.myGemMarketSellFilter.level == 0;
				if(item.ids.length != 0){
					item.ids.map(id=>{
						let type = parseInt(Number(id) / 100);
						let level = Number(id) % 100;
						if(this.myGemMarketSellFilter.type == type) isMatchType = true;
						if(this.myGemMarketSellFilter.level == level) isMathLevel = true;
					})
				}
				if (isMatchType && isMathLevel) {
					totalPet.push(item);
				}
			});
			return totalPet;
		},
		getShowList(){
			let list = this.getSellList;
			let cancelTx = [];
			this.tempGemMarketCancelTx.map(item=>cancelTx.push(item.tx));
			list.map(item=>{
				if(cancelTx.indexOf(item.tx) != -1) item.orderId = -2;
			});
			let temSell = this.tempGemSells.filter(item=>{
				return item.erc1155_ == this.marketGemFilter
			});

			return   [...temSell,...list].slice(
				this.onePageCount * (this.marketGemMySellPage - 1),
				this.onePageCount * this.marketGemMySellPage
			);
		},
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();
		if(!this.hasLoad){
			this.hasLoad = true;
			this.getAuctionPetsMy(true);
		}
	},

	watch: {
		nowTs: function(val){
			if(val % 5 == 0){
				if(this.myAccount == "") return;
				this.getAuctionPetsMy();
			}
		},
	},

	methods: {
		getShowCoin(item){
			return item.currency == 1?"MBOX": "USDT";
		},
		//获取市场上的宠物
		async getAuctionPetsMy(needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let account = this.myAccount;
			// account = "0x390Ec77a320a3822bd3074aBa174570307154140";
			let data = await Http.getMyGemAuctionList("BNB", account);
			this.$store.commit("marketState/setData", {marketLoading: false});
			let hashArr = [];

			data.list.map(item=>{
				hashArr.push(item.tx);
				item.erc1155_ = item.type;
			});

			//删除临时出售的数据
			this.tempGemSells.map((item,index)=>{
				if(hashArr.indexOf(item.tx) != -1){
					this.tempGemSells.splice(index, 1);
				}
			});

			//删除临时下架的数据
			this.tempGemMarketCancelTx.map((item, index)=>{
				if(hashArr.indexOf(item.tx) == -1 && item.currency == this.marketGemFilter){
					this.tempGemMarketCancelTx.splice(index, 1);
				}
			})

			// return ;
			this.$store.commit("marketState/setData", {tempGemSells: this.tempGemSells, marketGemMy:data, tempGemMarketCancelTx: this.tempGemMarketCancelTx});
	
		},
		
		onPageChange(page){
			this.$store.commit("marketState/setData", {marketGemMySellPage: page});
			this.$nextTick(()=>{
				this.$refs.page && this.$refs.page.initPage();
			})
		},
		onSelectLevelChange(pos) {
			this.$store.commit("marketState/setFilter", {
				filterName:"myGemMarketSellFilter",
				type: "level",
				value: pos,
			});
			this.onPageChange(1);
		},
		onSelectTypeChange(pos) {
			this.$store.commit("marketState/setFilter", {
				filterName:"myGemMarketSellFilter",
				type: "type",
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
		}
	}
</style>