<template>
	<div>
		<div class="tal search vertical-children por mgt-20">
			
			<div id="market-pet-fitter">
				<span class="search-box  dib">
					<div class="dib por" >
						<div class="dib por">
							<input class="ly-input" ref="searchInput" style="padding-right:30px;width:150px;border-radius:50px" type="text" :placeholder="$t('BOX_17')" v-model="searchWord" />
							<span v-if="searchWord != '' " style="position:absolute;right:10px;height:100%;align-items: center;display: inline-flex;justify-content: center;" class="cur-point opa-6" @click="searchWord='';goSearch()">
								<svg t="1618473937077" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1127" width="20" height="20"><path d="M601.376 512l191.52-191.52c28.096-28.096 30.976-71.168 6.4-95.744s-67.68-21.696-95.744 6.4l-191.52 191.52-191.52-191.52c-28.096-28.096-71.168-30.976-95.744-6.368s-21.696 67.68 6.4 95.744l191.52 191.52-191.52 191.52c-28.096 28.096-30.976 71.168-6.368 95.744s67.68 21.696 95.744-6.4l191.52-191.52 191.52 191.52c28.096 28.096 71.168 30.976 95.744 6.4s21.696-67.68-6.4-95.744l-191.52-191.52z" p-id="1128" fill="#838689"></path></svg>
							</span>
						</div>
						<div class="search-preview" ref="searchPreview"  style="margin-bottom:50px" v-if="getSearchArr.length > 0">
							<div class="aveage-box" v-for="item in getSearchArr" :key="item.prototype" @click="setSearchItme(item)">
								<div class="tal"><img :src="require(`@/assets/pet/${item.prototype}.png`)" alt="" height="40"></div>
								<div class="tar small opa-6" style="flex:3" :class="'c-lv'+item.vType">{{item.realName}}</div>
							</div>
						</div>
					</div>
					<img class="mgl-10 cur-point" :src="require('@/assets/icon/search.png')" alt="" @click="goSearch"  />
				</span>

				<div class="dropdown-group mgl-5" @click="showDrop" tabindex="3">
					<div class="dropdown-group-value por">
						{{$t("Market_63")}} ▼
					</div>
					<div class="dropdown-group-list hide">
						<Dropdown :list="selectDays" :defaultSelectPos="marketRentSearch.rentDays" :onChange="onDaysChange" />&nbsp;
						<Dropdown :list="$parent.selectCategory" :defaultSelectPos="marketRentSearch.category" :onChange="onSelectCategoryChange" />&nbsp;
						<Dropdown :list="selectVType" :defaultSelectPos="marketRentSearch.vType" :onChange="onSelectVTypeChange" />&nbsp;
						<Dropdown :list="sortArr" :defaultSelectPos="marketRentSearch.sort" :onChange="onSortChange" />&nbsp;
					</div>
				</div>
				<Dropdown id="busd" class="mgl-5" style="margin-top:0px" :list="$parent.getSelectCoinArr" :defaultSelectPos="$parent.useCoinPos" :onChange="$parent.onCoinChange" />
			</div>

			<p class="vertical-children mgt-10 dib">{{$t("Market_33")}}({{ marketRents.total }}) </p>

		</div>
		<div :class="marketRents.list.length < 4 ? 'tal' : ''"  class="mgt-10 vertical-children" style="min-height:500px">
			<router-link :to="'/rentView/'+ item.tokenId"  v-for="item in marketRents.list" :key="item.tx + item.index">
				<PetItem  v-bind:data="{item: item}" class="market " :class="{'opa-6': nowTs -item.uptime <=  120}" v-if="item.tokenId != 0 " >
					<div class="aveage-box" style="color:#fff">
						<div class="vertical-children  tal" style="font-size: 18px;flex:1">
							<img src="@/assets/icon/rent_time.png" alt="" height="20"/>&nbsp;
							<span>{{item.rentDays}} <sub class="small">{{$t("Hire_46")}}</sub></span>
						</div>
						<div v-if="nowTs -item.uptime <=  120" class=" mgt-10 small" style="position: absolute;right: 15px;top: -100px;transform: translateY(-50%);">
							<p class="small">{{$t("Market_30")}}<span class="dotting"></span></p>
							<p >{{getLeftTime(Number(item.uptime)+120- nowTs)}}</p>
						</div>
						<div class="vertical-children tar" style="font-size: 18px;flex:2">
							<img src="@/assets/coin/BUSD.png" alt="" height="20"/>&nbsp;
							<span>{{numFloor(item.rentPrice/1e9, 10000)}} <sub class="small">BUSD</sub></span>
						</div>
					</div>
				</PetItem>
			</router-link>
		</div>

		<div style="margin-top: 30px" >
			<Page ref="page" :defaultPage="this.marketRentPage" :totalPage="Math.ceil(marketRents.total / onePageCount)" :onChange="onPageChange" v-show="Math.ceil(marketRents.total / onePageCount) > 1" />
		</div>
	</div>
</template>

<script>
import {  Page, PetItem, Dropdown } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {  Page, PetItem, Dropdown},
	data(){
		return({
			onePageCount: 15,
			selectVType: [
				this.$t("MOMO_08"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
			sortArr: [this.$t("Market_47"),this.$t("Market_04"), this.$t("Market_05"), this.$t("Market_06"), this.$t("Market_07")],
			selectDays: [
				this.$t("Market_62"),
				1+this.$t("Hire_46"),
				2+this.$t("Hire_46"),
				3+this.$t("Hire_46"),
				4+this.$t("Hire_46"),
				5+this.$t("Hire_46"),
				6+this.$t("Hire_46"),
				7+this.$t("Hire_46"),
			],
			searchWord: "",
		});
	},
	computed: {
		...mapState({
			marketRents: (state) => state.marketState.data.marketRents,
			marketRentPage: (state) => state.marketState.data.marketRentPage,
			marketRentSearch: (state) => state.marketState.data.marketRentSearch,
			momoNameObjs: (state) => state.marketState.data.momoNameObjs,
			momoGemsObjs: (state) => state.marketState.data.momoGemsObjs,
			marketLoading: (state) => state.marketState.data.marketLoading,
			historyNotice: (state) => state.marketState.data.historyNotice,
			nowTs: (state) => state.globalState.data.nowTs
		}),
		getLangMap(){
			let langToName = {};
			let nftConfig = BaseConfig.NftCfg;
			for (let key in nftConfig) {
				let item =nftConfig[key];
				langToName[item.tokenName] = this.$t(item.tokenName);
			}
			return langToName;
		},
		getSearchArr(){
			let retArr = [];
			let searchWord = this.searchWord;
			if(searchWord == "") return retArr;
			let nftConfig = BaseConfig.NftCfg;
			let langMap = this.getLangMap;
			for (let key in nftConfig) {
				let item =nftConfig[key];
				let realName = langMap[item.tokenName];
				if(realName.toLowerCase().indexOf(searchWord.toLowerCase()) != -1 && item.quality >= 4){
					item.realName = realName;
					item.vType = parseInt(item.prototype / 1e4);
					retArr.push(item);
				}
			}
			return retArr.reverse();
		}
	},
	created(){
		let searcheItem = BaseConfig.NftCfg[this.marketRentSearch.pType];
		if(searcheItem){
			this.setSearchItme({realName: this.getLangMap[searcheItem["tokenName"]], prototype: searcheItem.prototype});
		}
		this.getAuctionPets(this.marketRentPage, true);
		if(timer) clearInterval(timer);
		let count = 0;
		timer = setInterval(()=>{
			count++;
			if(count % 10 == 0){
				this.getAuctionPets(this.marketRentPage);
			}
		}, 1000);
	},
	mounted(){
		if(document.body.clientWidth > 1000){
			window.$(this.$refs.searchInput).blur(()=>{
				let t = setTimeout(()=>{
					clearTimeout(t);
					window.$(this.$refs.searchPreview).hide();
				}, 100);
			})
			window.$(this.$refs.searchInput).focus(()=>{
				window.$(this.$refs.searchPreview).show();
			})
		}
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		goSearch(){
			let prototype = this.searchWord.split(":")[1];
			if(this.searchWord == ""){
				prototype = 0;
			}else{
				if(BaseConfig.NftCfg[prototype] == undefined) return;
			}
			this.$store.commit("marketState/setFilter", {filterName:"marketRentSearch",type: "pType", value: prototype});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketRentPage, true);
			})
		},
		setSearchItme(item){
			if(item.prototype == 0) return;
			this.searchWord = item.realName + ":"+item.prototype;
			this.goSearch();
		},
		//获取市场上的宠物
		async getAuctionPets(page, needLoading = false){
			if(needLoading) this.$store.commit("marketState/setData", {marketLoading: true});
			let data = await Http.getRentList("BNB", page, 15, this.marketRentSearch);
			this.$store.commit("marketState/setData", {marketLoading: false});
			let needGetNameArr = [];
			let needGetGemArr = [];
			data.list.map(item=>{
				if( item.tokenId != 0){
					let {tokenName} = BaseConfig.NftCfg[item.prototype];
					item.tokenName = this.momoNameObjs[item.tokenId] || tokenName;
					item.gems = this.momoGemsObjs[item.tokenId] || [0,0,0,0];
					item.vType = parseInt(item.prototype/1e4);
					item.chain = "bnb";
					if(item.specialty == 1 || item.specialty == 3){
						needGetNameArr.push(item.tokenId);
					}
					needGetGemArr.push(Number(item.tokenId));
				}
	
			});
			this.$store.commit("marketState/setData", {marketRents:data});
			
			this.$nextTick(async ()=>{
				await this.getMomoGem(needGetGemArr);
				await this.getMomoName(needGetNameArr);
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
			this.marketRents.list.map(item=>{
				item.tokenName = this.momoNameObjs[item.tokenId] || item.tokenName;
			});
			this.$store.commit("marketState/setData", {marketRents: this.marketRents, momoNameObjs : this.momoNameObjs});
		},
		async getMomoGem(needGetGemArr){
			let fitterArr = [];
			//去除重复的名字
			needGetGemArr.map(item=>{
				fitterArr.push(item);
			});

			if(fitterArr.length != 0){
				let gems = await Wallet.ETH.getBatchInlayInfo(fitterArr);
				if(gems){
					fitterArr.map((item, index)=>{
						this.momoGemsObjs[item] = [...gems[index]];
					});
				}
			}

			this.marketRents.list.map(item=>{
				item.gems = this.momoGemsObjs[item.tokenId] || [0,0,0,0];
			});
			this.$store.commit("marketState/setData", {marketRents: this.marketRents, momoGemsObjs : this.momoGemsObjs});
		},
		onPageChange(page){
			if(page == this.marketRentPage) return;
			this.marketRents.list = [];
			this.$store.commit("marketState/setData", {marketRentPage:page, marketRents: this.marketRents});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketRentPage, true);
			});
		},
		onSelectCategoryChange(pos){
			this.marketRents.list = [];
			this.$store.commit("marketState/setData", {marketRentPage:1, marketRents: this.marketRents});
			this.$store.commit("marketState/setFilter", {filterName:"marketRentSearch",type: "category", value: pos});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketRentPage, true);
				this.$refs.page.initPage();
			});
		},
		onSelectVTypeChange(pos){
			if(pos == 1) pos = 4;
			if(pos == 2) pos = 5;
			if(pos == 3) pos = 6;

			this.marketRents.list = [];
			this.$store.commit("marketState/setData", {marketRentPage:1, marketRents: this.marketRents});
			this.$store.commit("marketState/setFilter", {filterName:"marketRentSearch",type: "vType", value: pos});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketRentPage, true);
				this.$refs.page.initPage();
			});
		},
		onSortChange(pos){
			this.marketRents.list = [];
			this.$store.commit("marketState/setData", {marketRentPage:1, marketRents: this.marketRents});
			this.$store.commit("marketState/setFilter", {filterName:"marketRentSearch",type: "sort", value: pos});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketRentPage, true);
				this.$refs.page.initPage();
			});
		},
		onDaysChange(pos){
			this.marketRents.list = [];
			this.$store.commit("marketState/setData", {marketRentPage:1, marketRents: this.marketRents});
			this.$store.commit("marketState/setFilter", {filterName:"marketRentSearch",type: "rentDays", value: pos});
			this.$nextTick(()=>{
				this.getAuctionPets(this.marketRentPage, true);
				this.$refs.page.initPage();
			});
		}
	}
}
</script>

<style scoped>
	.search-box{
	}
	.search-preview{
		position: absolute;
		width: 100%;
		z-index: 999;
		background: #182342;
		margin-top: 5px;
		border-radius: 10px;
	}
	.search-preview .aveage-box:nth-child(1){
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
		border: none;
		padding:10px;
	}
	.search-preview .aveage-box:last-child{
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	.search-preview .aveage-box{
		border-top: 1px solid #3f5185;
		padding: 5px 10px;
		cursor: pointer;
	}
	.search-preview .aveage-box:hover{
		background: #2c3d6b;
	}

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
		#busd{
			margin-top: 10px !important;
			margin-left: 0px !important;
			position: absolute;
			right: 0px;
			top: 40px;
		}
		#market-pet-fitter{
			zoom: 0.8;
			text-align: right;
			position: static !important;
		}
	}
</style>