<template>
	<div >
		<div class="tal search vertical-children por mgt-20" >
			<span>{{$t("Market_33")}}: {{ getTotalPetNum }}</span>&nbsp;
			<div id="market-pet-fitter">
				<div class="dib mgt-10" id="shop-car" @click="oprDialog('shop-car-dialog', 'block')" >
					<span id="shop-car-num" v-if="getShopCarTotalSelectNum > 0" >{{ getShopCarTotalSelectNum }}</span>
					<img src="../../assets/icon/shopcar.png" alt="" />
				</div>
				<div class="dib por mgt-10" id="shop-history" @click="oprDialog('shop-history-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="../../assets/icon/tradeRecord.png" alt="" />
				</div>
				<Dropdown :list="$parent.selectCategory" :defaultSelectPos="myMarketPetFilter.category" :onChange="onSelectTypeChange" />&nbsp;
				<Dropdown :list="$parent.selectVType" :defaultSelectPos="myMarketPetFilter.vType" :onChange="onSelectQualityChange" />&nbsp;
			</div>
		</div>

		<div :class="myNFT_stake.length < 6 ? 'tal' : ''" >
			<div class="clear mgt-20">
				<PetItem  v-for="item in getShowPetArr" :key="item.prototype.toString() +item.tokenId + Math.random()" v-bind:data="{item: item}" class="market" >
					<div style="height:43px;position:absolute;width:100%;left:0px;padding:0px 10px;bottom:0px">
						<div v-if="item.vType > 3" class=" tar">
							<button class="btn-primary" @click="set721Price(item)">
								<span>{{$t("Market_02")}}</span>
							</button>
						</div>

						<div class="tar " v-if="item.vType <= 3" >
							<SelectNum :maxNum="item.num" v-show="getSelectNum(item.prototype) > 0" :defaultNum="getSelectNum(item.prototype)" :data="item" :onChange="onNumChange" />
							<button class="btn-primary" @click="onNumChange(item,1, $event)" v-show="getSelectNum(item.prototype) == 0">
								<span>{{$t("Market_08")}}</span>
							</button>
						</div>
					</div>
				</PetItem>
			</div>
		</div>

		<div style="margin-top: 30px" v-if="Math.ceil(this.myNFT_stake.length / onePageCount) > 1" >
			<Page   :defaultPage="pageNum" :totalPage="getTotalPage" :onChange="onPageChange" v-if="getTotalPage > 1" />
		</div>

		<Dialog id="shop-car-dialog" :top="20" :width="500">
			<div class="por tal mgt-10">
				<p class="opa-6">{{$t("Market_15")}}</p>
				<p class="cur-point vertical-children" style="position: absolute; right: 0px; top: 0px" @click="shopCar = []" >
					<span class="opa-6"> {{$t("Market_16")}} </span>
					<svg viewBox="0 0 1024 1024" width="20" height="20">
						<path fill="#93BBFF" d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"></path>
						<path fill="#93BBFF" d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"></path>
					</svg>
				</p>
			</div>
			<div class="dialog-content mgt-10" id="shop-car-content">
				<div v-for="item in shopCar" :key="item.prototype" :class="'pet_hover_lv' +item.vType" class="shop-car-item  vertical-children por mgt-10">
					<div class="dib por">
						<img  :src="require(`../../assets/pet/${item.prototype}.png`)" alt="" width="100" height="100" />
						<p style="position:absolute;bottom:5px;width:100%;text-align:center">
							<span style="background:rgba(0,0,0,0.5);padding:2px 10px;font-size:12px;border-radius:10px">x{{item.num}}</span>
						</p>
					</div>
					<div class="dib small mgl-5">
						<p class="vertical-children">
							<img src="../../assets/icon/airdrop.png" width="20" alt="" />
							<span class="mgl-5 color-w" style="font-size:18px"> {{ item.lvHashrate }} </span>
						</p>
						<p class="vertical-children mgt-5">
							<img :src=" require(`../../assets/icon/${ category_img[item.category] }.png`) " width="12" alt="" />&nbsp;
							<span class="mgl-5"> Lv.{{ item.level }} </span>
						</p>
						<p class="vertical-children mgt-5">
							<img :src=" require(`../../assets/icon/bnb.png`) " width="12" alt="" />
							<span class="mgl-5"> {{  $t(item.tokenName) }} </span>
						</p>
						
					</div>
					<div class="absolute-r tar" style="right: 20px; top: 5px">
						<span class="small">{{$t("Market_39")}}</span>
						<p class="vertical-children mgt-5">
							<img src="../../assets/coin/BUSD.png" height="25" alt="" />
							<span style="font-size: 16px" class="color-w mgl-5" >{{ item.sellPrice }}</span >&nbsp;
							<img @click="edit1155Price(item)" class="mgl-5 cur-point" src="../../assets/icon/edit.png" height="24" alt="" />
						</p>
						<p class="mgt-5" >
							<SelectNum :scale="0.8" :maxNum="item.num"  :defaultNum="item.sellNum" :data="item" :onChange="onNumChange" />
						</p>
					</div>
				</div>
			</div>
			<div class="vertical-children por mgt-10 tal" style="height: 50px">
				<div class="dib por">
					<span id="shop-car-num" v-if="getShopCarTotalSelectNum > 0" >{{ getShopCarTotalSelectNum }}</span >
					<img src="../../assets/icon/shopcar.png" alt="" />
				</div>

				<div class="dib tal" style="margin-left: 12px">
					<span class="small opa-6">{{$t("Market_18")}}</span>
					<p class="vertical-children mgt-5">
						<img src="../../assets/coin/BUSD.png" height="25" alt="" />
						<span style="font-size: 20px" class="color-w mgl-5">{{ getShopCarTotalPrice }} <small style="font-size:12px">BUSD</small></span>
					</p>
					<button @click="confirmSellShopCar" :class="`btn-primary  ${ shopCar.length == 0 ? 'disable-btn' : '' }`" style="position: absolute; right: 0px; top: 10px" >
						{{$t("Market_19")}}
					</button>
				</div>
			</div>
		</Dialog>
		<Dialog id="set-price-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("Market_38")}}</h2>
			<div class="mgt-20">
				<div class="ly-input-content mgt-10">
					<p class="small tal opa-6">{{$t("Market_39")}}</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  src="../../assets/coin/BUSD.png" alt="" />
						</div>
						<input v-model="inputPrice" class="ly-input" type="number"
							style=" background: #0f172a; text-align: center; width: 100%; "
							:placeholder="$t('Market_38')"
							v-number
						/>
					</div>
				</div>
			</div>
			<button style="width: 200px" :class="`btn-primary mgt-20 ${ !inputPrice ? 'disable-btn' : '' }`" @click="confirmSetPrice($event)" >
				{{$t("Common_03")}}
			</button>
		</Dialog>
		<Dialog id="confirm-sell-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("Market_10")}}</h2>
			<div class="mgt-20">
				<Tab :list="[$t('Market_36'),$t('Market_37')]" style="zoom:0.8"  :defaultSelectPos="priceTypePos" :onChange="onTabChange"  ref="priceTypeTab" :notice="[]"/>
				<div class="ly-input-content mgt-10">
					<p class="small tal opa-6">{{priceTypePos == 1?$t("Market_11"):$t("Market_17")}} (BUSD)</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  src="../../assets/coin/BUSD.png" alt="" />
						</div>
						<input v-model="sellObj.startPrice"   class="ly-input sell-input" type="number" :placeholder="priceTypePos == 1?$t('Market_11'):$t('Market_17')" v-number  data-max="100000000"/>
					</div>
				</div>
				<div v-if="priceTypePos == 1">
					<div class="ly-input-content mgt-10">
						<p class="small tal opa-6">{{$t("Market_12")}} (BUSD)</p>
						<div class="por mgt-5">
							<div class="ly-input-pre-icon">
								<img  src="../../assets/coin/BUSD.png" alt="" />
							</div>
							<input v-model="sellObj.endPrice" class="ly-input sell-input" type="number" :placeholder="$t('Market_12')" v-number data-max="100000000"/>
						</div>
					</div>
					<div class="ly-input-content mgt-10">
						<p class="small tal opa-6">{{$t("Market_13")}}(≥2)</p>
						<div class="por mgt-5">
							<input v-model="sellObj.day" class="ly-input sell-input" type="number" v-int :placeholder="$t('Market_13')" data-max="1000" data-min="2" />
						</div>
					</div>
				</div>
			</div>
			<div class="small mgt-10 opa-6" v-if="Number(sellObj.startPrice) > 0 && Number(sellObj.endPrice) > 0 && priceTypePos==1">{{$t("Market_14").replace("#0#", sellObj.day).replace("#1#",sellObj.startPrice).replace("#2#",sellObj.endPrice)}}</div>
			<button style="width: 200px" class="btn-primary mgt-20" :class="!(sellObj.day > 1 && sellObj.startPrice > 0)? 'disable-btn': '' " @click="confirmSell">
				{{$t("Common_03")}}
			</button>
		</Dialog>
	</div>
</template>

<script>
import { Dropdown, Page, PetItem, SelectNum, Dialog, Tab } from '@/components';
import { CommonMethod } from "@/mixin";
import { Wallet, Common } from '@/utils';
import { WalletConfig } from '@/config';
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	data() {
		return {
			select1: [
				this.$t("MOMO_02"),
				this.$t("MOMO_03"),
				this.$t("MOMO_04"),
				this.$t("MOMO_05"),
				this.$t("MOMO_06"),
				this.$t("MOMO_07"),
			],
			select3: [
				this.$t("MOMO_08"),
				this.$t("MOMO_09"),
				this.$t("MOMO_10"),
				this.$t("MOMO_11"),
				this.$t("MOMO_12"),
				this.$t("MOMO_13"),
				this.$t("MOMO_14"),
			],
			onePageCount: 15,
			inputPrice: "",
			shopCar: [],
			pageNum: 1,
			setPriceItem: {}, //设置价格的宠物对象
			sellObj: {
				startPrice: "",
				endPrice: "",
				day: 2,
				sellType: "", //721,shopCar
				sellData: null,
			},
			parabola: null,
			priceTypePos: 0,
		};
	},
	components: { Dropdown, Page, PetItem, SelectNum, Dialog, Tab },
	computed: {
		...mapState({
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			myMarketPetFilter: (state) => state.marketState.data.myMarketPetFilter,
			tempSells: (state) => state.marketState.data.tempSells,
			marketHistory: (state) => state.marketState.data.marketHistory,
			historyNotice: (state) => state.marketState.data.historyNotice,
		}),
		getTotalPetNum: function () {
			let totalPet = 0;
			this.getTotalPet.map((item) => {
				totalPet += item.num;
			});
			return totalPet;
		},
		getTotalPage() {
			return Math.ceil(this.getTotalPet.length / this.onePageCount);
		},
		getTotalPet() {
			let totalPet = [];
			[...this.myNFT_stake].map((item) => {
				//类型的筛选,品质的筛选
				let isMatchCategory =
					this.myMarketPetFilter.category == 0 ||
					this.myMarketPetFilter.category == item.category;
				let isMathVType =
					this.myMarketPetFilter.vType == 0 ||
					this.myMarketPetFilter.vType == item.vType;
				if (isMatchCategory && isMathVType) {
					totalPet.push(item);
				}
			});

			totalPet.sort((a, b) =>
				b.lvHashrate - a.lvHashrate
			);

			return totalPet;
		},
		getShowPetArr() {
			return this.getTotalPet.slice(
				this.onePageCount * (this.pageNum - 1),
				this.onePageCount * this.pageNum
			);
		},
		getShopCarTotalSelectNum() {
			// let retNum = 0;
			// this.shopCar.map((item) => {
			// 	retNum += item.num;
			// });
			return this.shopCar.length;
		},
		//获取出售总价格
		getShopCarTotalPrice() {
			let totalPrice = 0;
			this.shopCar.map((item) => {
				totalPrice += (item.sellPrice * item.sellNum);
			});
			return this.numFloor(totalPrice + 0.000001, 10000);
		},
	},

	mounted(){
		this.initParabola();
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		onTabChange(pos){
			this.sellObj.endPrice = this.sellObj.startPrice;
			this.priceTypePos = pos;
		},
		initParabola(){
			this.parabola = window.funParabola(document.getElementById("fly-dot"), document.getElementById("shop-car"), {
				speed:1000,
				curvature: 0.0008,
				complete: function () {
					document.getElementById("fly-dot").style.visibility = "hidden";
				},
			});
			this.parabola.init();
		},
		
		setPrice(){
			if(this.sellObj.endPrice == ""){
				this.sellObj.endPrice = this.sellObj.startPrice;
			}
		},
		//确定出售
		async confirmSell() {
			let { sellType, startPrice, endPrice, day, sellData, } = this.sellObj;
			//TODO:校验参数正确性
			if(!(day > 1 && startPrice > 0)){
				return;
			}

			if(endPrice == "") endPrice = startPrice;

			let auctionObj = {
				_startPrice: Number(startPrice),
				_endPrice: Number(endPrice),
				_durationDay: Number(day),
				_suggestIndex: 0,
				_tokenId: 0,
				_ids: [],
				_amounts: [],
			};
			if (sellType == "shopCar") {
				sellData.map((item) => {
					auctionObj._ids.push(Number(item.prototype));
					auctionObj._amounts.push(Number(item.sellNum));
				});
			}
			if (sellType == "721") {
				auctionObj._tokenId = Number(sellData.tokenId);
			}
			let suggestIndex = await Wallet.ETH.getSuggestIndex();
			if (suggestIndex == WalletConfig.ETH.MAX_ORDER) {
				this.showNotify(this.$t("Market_28"),"error");
				return;
			}
			auctionObj._suggestIndex = Number(suggestIndex);
			let hash = await Wallet.ETH.createAuction(auctionObj);
			if (hash) {
				await Common.sleep(200);
				this.oprDialog("confirm-sell-dialog", "none");
				this.oprDialog("shop-car-dialog", "none");
				this.shopCar = [];

				let myAddr = await Wallet.ETH.getAccount();

				//临时创建一条数据 
				let obj = {
					auctor: myAddr,
					durationDays: day,
					endPrice: endPrice *1e18,
					startPrice: startPrice * 1e18,
					uptime: parseInt(new Date().valueOf()/1000),
					index: -1,
					tx: hash,
					chain: "eth"
				}

				if(sellType == "721"){
					obj = {...obj, ...sellData};
				}
				if(sellType == "shopCar"){
					obj.tokenId = 0;
					obj.ids = [...auctionObj._ids];
					obj.amounts = [...auctionObj._amounts];
				}

				console.log("tempData",obj);
				this.tempSells.unshift(obj);
				this.$store.commit("marketState/setData", {
					tempSells: this.tempSells,
				});

			}
		},
		//获取ShopCar里面项选中的数量
		getSelectNum(prototype) {
			let retNum = 0;
			this.shopCar.map((item) => {
				if (item.prototype == prototype) retNum = item.sellNum;
			});
			return retNum;
		},
		//编辑721的价格
		set721Price(item) {
			this.sellObj.sellData = item;
			this.sellObj.sellType = "721";
			this.initSellObjInput();
			this.oprDialog("confirm-sell-dialog", "block");
		},
		initSellObjInput(){
			this.sellObj.startPrice = "";
			this.sellObj.endPrice = "";
			this.sellObj.durationDays = 2;
			this.priceTypePos = 0;
			this.$nextTick(()=>{
				this.$refs.priceTypeTab.reload();
			})
		},
		//编辑shopCar的价格
		setShopCarPrice() {
			this.sellObj.sellData = this.shopCar;
			this.sellObj.sellType = "shopCar";
			this.oprDialog("confirm-sell-dialog", "block");
		},
		//编辑1155的价格
		edit1155Price(item) {
			this.setPriceItem = item;
			this.inputPrice = item.sellPrice;
			this.oprDialog("set-price-dialog", "block");
		},
		//设置价格确认
		confirmSetPrice(event) {
			if(Number(this.inputPrice) <=0 ) return;
			let { vType } = this.setPriceItem;
			//编辑1155的价格
			if (vType < 4) {
				this.setPriceItem.sellPrice = Number(this.inputPrice);
				if(this.setPriceItem.isFirstAdd){
					this.setPriceItem.isFirstAdd = false;
					this.shopCar.push(this.setPriceItem);
					this.flyDot(event);
				}
				this.oprDialog("set-price-dialog", "none");
			}
		},
		//shopcar数量改变
		async onNumChange(obj, addNum, event) {
			let hasPrototype = false;
			let { prototype } = obj;
			this.shopCar.map((item, key) => {
				if (item.prototype == prototype) {
					item.sellNum += addNum;
					if (item.sellNum == 0) {
						this.shopCar.splice(key, 1);
					}
					hasPrototype = true;
				}
			});
			if (!hasPrototype) {
				if (this.shopCar.length >= 6) {
					this.showNotify(this.$t("Market_27"), "error");
					return;
				}
				let shopCarItem = { ...obj, sellNum: 1, sellPrice: "", isFirstAdd: true };
				// this.shopCar.push(shopCarItem);
				this.edit1155Price(shopCarItem);
				return;
			}

			//飞红点到购物车
			if (addNum > 0) {
				this.flyDot(event);
			} 
			
		},

		flyDot(event){
			let eleFlyElement = document.getElementById("fly-dot");
			let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
			eleFlyElement.style.left = event.clientX + scrollLeft + "px";
			eleFlyElement.style.top = event.clientY + scrollTop + "px";
			eleFlyElement.style.visibility = "visible";
			this.parabola.position().move();
		},
		//提交出售
		confirmSellShopCar() {
			//先判断有没有没设置价格的
			let dontSetPrice = false;
			this.shopCar.map((item) => {
				if (item.sellPrice == 0) dontSetPrice = true;
			});
			if (dontSetPrice) {
				this.showNotify(this.$t("Market_29"), "error");
				return;
			}
			//去设置衰减周期相关
			this.sellObj.startPrice = this.getShopCarTotalPrice;
			this.sellObj.endPrice = this.getShopCarTotalPrice;
			this.sellObj.day = 2;
			this.sellObj.sellType = "shopCar";
			this.sellObj.sellData = this.shopCar;
			this.setShopCarPrice();
		},
		onSelectQualityChange(pos) {
			this.$store.commit("marketState/myMarketPetFilter", {
				type: "vType",
				value: pos,
			});
			this.onPageChange(1);
		},
		onSelectTypeChange(pos) {
			this.$store.commit("marketState/myMarketPetFilter", {
				type: "category",
				value: pos,
			});
			this.onPageChange(1);
		},
		onPageChange(page) {
			this.pageNum = page;
			this.hackReloadMethod();
		},
	},
};
</script>

<style  scoped>
.sell-input{
	text-align: center; 
	width: 100%;
}

@media (max-width: 768px) {
	#shop-car-content {
		max-height: 500px !important;
	}
	#shop-car{
		margin-right: 10px !important;
	}
	#market-pet-fitter{
		zoom: 0.8;
	}
}
#shop-car-content {
	max-height: 690px;
	min-height: 200px;
}
.shop-car-item {
	width: 100%;
	height: 100px;
	border-radius: 20px;
	text-align: left;
}
.shop-car-item .pet-img {
	width: 100px;
	height: 100px;
}
#shop-car-num {
	width: 17px;
	height: 17px;
	background: red;
	border-radius: 10px;
	font-size: 12px;
	color: #fff;
	display: inline-block;
	text-align: center;
	line-height: 16px;
	position: absolute;
	top: 0px;
	right: -5px;
}
#shop-car,#shop-history {
	margin-right: 15px;
	cursor: pointer;
	position: relative;
	user-select: none;
}
#market #market-pet-fitter {
	position: absolute;
	right: 0px;
	top: 0px;
}

</style>
