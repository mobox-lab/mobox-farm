<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			<span>{{$t("Market_33")}}({{ marketGemMy.total }})</span>&nbsp;
			<div id="market-pet-fitter">
				<div class="dib por " id="shop-history" @click="oprDialog('shop-history-gem-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" />
				</div>
				
				<div class="dropdown-group " @click="showDrop" tabindex="3" v-if="marketTypePos != 4">
					<div class="dropdown-group-value por">
						{{$t("Market_63")}} ▼
					</div>
					<div class="dropdown-group-list hide">
						<Dropdown :list="$parent.gemType" :defaultSelectPos="myGemMarketSellFilter.type" :onChange="onSelectTypeChange" />&nbsp;
						<Dropdown :list="$parent.gemLv" :defaultSelectPos="myGemMarketSellFilter.level" :onChange="onSelectLevelChange" />&nbsp;
					</div>
				</div>
			</div>
		</div>
		<div :class="getShowList.length < 4 ? 'tal' : ''"  class="mgt-20 vertical-children">
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
import { Page, GemSellItem, Dropdown, Loading } from '@/components';
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	// components: {  Page, Dropdown},
	components: {   GemSellItem, Dropdown, Page, Loading},
	data(){
		return({
			onePageCount: 15,
			myAccount: "",
			hasLoad: false,
		});
	},
	computed: {
		...mapState({
			marketGemMy: (state) => state.marketState.data.marketGemMy,
			myGemMarketSellFilter: (state) => state.marketState.data.myGemMarketSellFilter,
			marketGemFilter: (state) => state.marketState.data.marketGemFilter,
			tempGemSells: (state) => state.marketState.data.tempGemSells,
			tempGemMarketCancelTx: (state) => state.marketState.data.tempGemMarketCancelTx,
			marketGemMySellPage: (state) => state.marketState.data.marketGemMySellPage,
			historyNotice: (state) => state.marketState.data.historyNotice,
			marketTypePos: (state) => state.marketState.data.marketTypePos,

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
		timer = setInterval(()=>{
			this.getAuctionPetsMy();
		}, 5000);
	},
	
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		getShowCoin(item){
			return item.currency == 1?"MBOX": "BUSD";
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