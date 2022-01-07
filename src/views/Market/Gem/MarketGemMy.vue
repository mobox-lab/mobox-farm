<template>
	<div >
		<div class="tal search vertical-children por mgt-20" >
			<span>{{$t("Market_33")}}({{ geTotalNum }})</span>&nbsp;
			<div id="market-pet-fitter">
				<div class="dib mgl-10" id="shop-car" @click="oprDialog('shop-car-dialog', 'block')" >
					<span id="shop-car-num" v-if="getShopCarTotalSelectNum > 0" >{{ getShopCarTotalSelectNum }}</span>
					<img src="@/assets/icon/shopcar.png" alt="" height="40" />
				</div>
				<div class="dib por mgl-10" id="shop-history" @click="oprDialog('shop-history-gem-dialog', 'block')" >
					<span class="notice" v-if="historyNotice"></span>
					<img src="@/assets/icon/tradeRecord.png" alt="" />
				</div>
				<div class="dropdown-group mgl-10" @click="showDrop" tabindex="3" v-if="marketTypePos != 4">
					<div class="dropdown-group-value por">
						{{$t("Market_63")}} ▼
					</div>
					<div class="dropdown-group-list hide">
						<Dropdown :list="$parent.gemType" :defaultSelectPos="fitter.type" :onChange="pos=>fitter.type=pos" />&nbsp;
						<Dropdown :list="$parent.gemLv" :defaultSelectPos="fitter.level" :onChange="pos=>fitter.level = pos" />&nbsp;
					</div>
				</div>
			</div>
		</div>

		<div :class="getMyGem.length < 4 || marketTypePos == 4  ? 'tal' : 'tac'"  class="momo-content">
				<template v-if="marketTypePos == 2">
					<GemSellItem v-for="item in getMyGem" :key="item.key" :data="{item: item}">
						<div class="tac "  >
							<SelectNum :maxNum="item.num" v-show="getSelectNum(item.key) > 0" :defaultNum="getSelectNum(item.key)" :data="item" :onChange="onNumChange" />
							<button class="btn-primary btn-small" @click="sell1155Direct(item)" v-show="getSelectNum(item.key) == 0">
								<span>{{$t("Market_57")}}</span>
							</button>
							<button class="btn-primary mgl-5 btn-small" @click="onNumChange(item,1, $event)" v-show="getSelectNum(item.key) == 0">
								<span>{{$t("Market_08")}}</span>
							</button>
						</div>
					</GemSellItem>
				</template>
				<template v-else>
					<GemSellItem v-for="item in get1155SellItems.filter(i=>i.erc1155_ == marketGemFilter)" :key="item.key" :data="{item: item}">
						<div class="tac "  >
							<SelectNum :maxNum="item.num" v-show="getSelectNum(item.key) > 0" :defaultNum="getSelectNum(item.key)" :data="item" :onChange="onNumChange" />
							<button class="btn-primary btn-small" @click="sell1155Direct(item)" v-show="getSelectNum(item.key) == 0">
								<span>{{$t("Market_57")}}</span>
							</button>
							<button class="btn-primary mgl-5 btn-small" @click="onNumChange(item,1, $event)" v-show="getSelectNum(item.key) == 0">
								<span>{{$t("Market_08")}}</span>
							</button>
						</div>
					</GemSellItem>
				</template>
		</div>

		<!-- 购物车 -->
		<Dialog id="shop-car-dialog" :top="20" :width="500">
			<div class="por tal mgt-10">
				<p class="opa-6">{{$t("Market_15")}}</p>
				<p class="cur-point vertical-children" style="position: absolute; right: 0px; top: 0px" @click="shopCar = []" >
					<span class="opa-6"> {{$t("Market_16")}} </span>
					<svg viewBox="0 0 1024 1024" width="20" height="20">
						<path fill="#838689" d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"></path>
						<path fill="#838689" d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"></path>
					</svg>
				</p>
			</div>
			<div class="dialog-content mgt-10" id="shop-car-content">
				<div v-for="item in shopCar" :key="item.prototype" :class="'pet_hover_lv3'" class="shop-car-item  vertical-children por mgt-10">
					<div class="dib por mgt-10 mgl-10">
						<img  :src="require(`@/assets/market/${item.key}.png`)" alt="" height="80" />
						<p style="position:absolute;bottom:5px;width:100%;text-align:center">
							<span style="background:rgba(0,0,0,0.5);padding:2px 10px;font-size:12px;border-radius:10px">x{{item.num}}</span>
						</p>
					</div>
					
					<div class="absolute-r tar" style="right: 20px; top: 5px">
						<span class="small">{{$t("Market_39")}}</span>
						<p class="vertical-children mgt-5">
							<img :src="require(`@/assets/coin/${sellCoin}.png`)" height="25" alt="" />
							<span style="font-size: 16px" class="color-w mgl-5" >{{ item.sellPrice }}</span >&nbsp;
							<img @click="edit1155Price(item)" class="mgl-5 cur-point" src="@/assets/icon/edit.png" height="24" alt="" />
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
					<img src="@/assets/icon/shopcar.png" alt="" height="40" />
				</div>

				<div class="dib tal" style="margin-left: 12px">
					<span class="small opa-6">{{$t("Market_18")}}</span>
					<p class="vertical-children mgt-5">
						<img :src="require(`@/assets/coin/${sellCoin}.png`)" height="25" alt="" />
						<span style="font-size: 20px" class="color-w mgl-5">{{ getShopCarTotalPrice }} <small style="font-size:12px">{{sellCoin}}</small></span>
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
							<img  :src="require(`@/assets/coin/${sellCoin}.png`)" alt="" />
						</div>
						<input v-model="inputPrice" class="ly-input" type="number"
							style=" background: #0f172a; text-align: center; width: 100%; "
							:placeholder="$t('Market_38')"
							v-number
						/>
					</div>
				</div>
			</div>
			<button style="width: 200px" :class="`btn-primary mgt-20 ${ Number(inputPrice)<=0 ? 'disable-btn' : '' }`" @click="confirmSetPrice($event)" >
				{{$t("Common_03")}}
			</button>
		</Dialog>
		<Dialog id="confirm-sell-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("Market_10")}}</h2>
			<div class="mgt-10">
				<span v-for="item in sellObj.sellData" :key="item.key" style="background:rgba(0,0,0,0.8);border-radius:10px;height:90px;margin:5px" class="dib por">
					<img :src="require(`@/assets/market/${item.key}.png`)" alt="" height="100%">
					<span class="tar" style="position:absolute;right:3px;bottom:3px">x{{item.sellNum}}</span>
				</span>
			</div>
			<div class="mgt-10">
				<div class="ly-input-content mgt-10">
					<p class="small tal opa-6">{{priceTypePos == 1?$t("Market_11"):$t("Market_17")}} ({{sellCoin}}≥10)</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  :src="require(`@/assets/coin/${sellCoin}.png`)" alt="" />
						</div>
						<input v-model="sellObj.startPrice"   class="ly-input sell-input" type="number" :placeholder="priceTypePos == 1?$t('Market_11'):$t('Market_17')" v-number   data-max="100000000"/>
					</div>
				</div>
				<div v-if="priceTypePos == 1">
					<div class="ly-input-content mgt-10">
						<p class="small tal opa-6">{{$t("Market_12")}} ({{sellCoin}}≥10)</p>
						<div class="por mgt-5">
							<div class="ly-input-pre-icon">
								<img  :src="require(`@/assets/coin/${sellCoin}.png`)" alt="" />
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
			<p class="color-buy tac mgt-10 small" v-if="Number(sellObj.startPrice) < 10">{{$t("Market_77")}}</p>
			<div class="mgt-10"  :class="{'btn-group': !hasApprove[needApproveTokenType] && hasApprove[needApproveTokenType] != -1}">
				<StatuButton v-if="hasApprove[needApproveTokenType] != -1 && !hasApprove[needApproveTokenType]" data-step="1" :onClick="approve.bind(this, sellObj)" :isLoading="lockBtn.approveLock > 0" style="width:70%" >
					{{$t("Air-drop_16")}}
				</StatuButton>
				<StatuButton data-step="2" class="mgt-10" :onClick="confirmSubmit.bind(this)" style="width:70%" :isDisable="!hasApprove[needApproveTokenType] || Number(sellObj.startPrice) < 10" >
					{{$t("Common_03")}}
				</StatuButton>
			</div>
		</Dialog>
		
	</div>
</template>

<script>
import { GemSellItem, SelectNum, Dialog, StatuButton, Dropdown } from '@/components';
import { CommonMethod } from "@/mixin";
import { Wallet, Common } from '@/utils';
import { WalletConfig } from '@/config';
import { mapState } from "vuex";

let timer = null;
export default {
	mixins: [CommonMethod],
	data() {
		return {
			inputPrice: "",
			shopCar: [],
			setPriceItem: {}, //设置价格的对象
			sellObj: {
				startPrice: "",
				endPrice: "",
				day: 2,
				sellType: "", //721,shopCar
				sellData: null,
				erc1155_: 1,
			},
			parabola: null,
			priceTypePos: 0,
			gemNameToId: {"red":100,"green":200,"blue":300,"yellow": 400},
			hasApprove: {
				1: -1,
				2: -1,
				3: -1,
				4: -1,
			},
			fitter: {
				type: 0, level: 0
			},
			needApproveTokenType: 1, //需要被授权的1155的tokenid
			tokenTypeToAddr: {
				1: WalletConfig.ETH.momoGemToken,
				2: WalletConfig.ETH.newBoxToken,
				3: WalletConfig.ETH.newBoxToken,
				4: WalletConfig.ETH.crystalToken,
			},
		};
	},
	components: { GemSellItem, SelectNum, Dialog, StatuButton, Dropdown },
	computed: {
		...mapState({
			lockList: (state) => state.ethState.data.lockList,
			historyNotice: (state) => state.marketState.data.historyNotice,
			tempGemSells: (state) => state.marketState.data.tempGemSells,
			gemBag: (state) => state.gemState.data.gemBag,
			boxNum: (state) => state.gemState.data.boxNum,
			mecBoxNum: (state) => state.userState.data.mecBoxNum,
			crystalNum: (state) => state.userState.data.crystalNum,
			lockBtn: (state) => state.globalState.data.lockBtn,
			marketTypePos: (state) => state.marketState.data.marketTypePos,
			marketGemFilter: (state) => state.marketState.data.marketGemFilter,
		}),
		getMyGem(){
			let arr = [];
			for (let key in this.gemBag) {
				let num = Number(this.gemBag[key]);
				let isMatchType = parseInt(Number(key) / 100) == this.fitter.type || this.fitter.type == 0;
				let isMatchLevel = Number(key) % 100 == this.fitter.level || this.fitter.level == 0;
				if(num > 0 && isMatchType && isMatchLevel){
					arr.push({
						ids: [key],
						amounts: [num],
						key,
						num,
						level: key % 100,
						erc1155_: 1,
					})
				}
			}
			arr.sort((a,b)=>{
				return b.level - a.level;
			});
			return arr;
		},
		get1155SellItems(){
			let arr = [];
			if(this.boxNum > 0){
				arr.push({
					ids: [1],
					amounts: [this.boxNum],
					key: 1,
					num: this.boxNum,
					erc1155_: 2,
				})
			}
			if(this.mecBoxNum >0){
				arr.push({
					ids: [2],
					amounts: [this.mecBoxNum],
					key: 2,
					num: this.mecBoxNum,
					erc1155_: 3,
				})
			}
			if(this.crystalNum >0){
				arr.push({
					ids: [1],
					amounts: [this.crystalNum],
					key: 4,
					num: this.crystalNum,
					erc1155_: 4,
				})
			}
			return arr;
		},
		getShopCarTotalSelectNum() {
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
		geTotalNum(){
			let num = 0;
			this.getMyGem.map(item=>{
				num += item.num;
			});
			if(this.marketGemFilter == 2) num = this.boxNum;
			if(this.marketGemFilter == 3) num = this.mecBoxNum;
			if(this.marketGemFilter == 4) num = this.crystalNum;
			return num;
		},
		sellCoin(){
			return "BUSD"
		}
	},

	mounted(){
		this.initParabola();
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	async created(){
		// this.isApprove();
	},
	methods: {
		//查询宝石合约是被授权
		async isApprove(item, isForce = false){
			console.log(item, "isApprove");
			await Wallet.ETH.getAccount();
			this.needApproveTokenType = item.erc1155_;
			if(this.hasApprove[item.erc1155_] != -1 && !isForce) return;
			let isApprove = await Wallet.ETH.isApprovedForAll(this.tokenTypeToAddr[item.erc1155_], WalletConfig.ETH.common1155Auction);
			if(isApprove != null){
				this.hasApprove[item.erc1155_] = isApprove;
			}
		},
		async approve(item){
			let hash = await Wallet.ETH.approvedForAll(this.tokenTypeToAddr[item.erc1155_], WalletConfig.ETH.common1155Auction, ()=>{
				console.log("approve recipt");
				this.isApprove(item, true);
			});
			if(hash){
				this.lockBtnMethod("approveLock");
			}
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
			if(this.shopCar[0] && this.setPriceItem.erc1155_ != this.shopCar[0].erc1155_){
				this.showNotify(this.$t("Market_64"), "error");
				return
			}
			//编辑1155的价格
			this.setPriceItem.sellPrice = Number(this.inputPrice);
			if(this.setPriceItem.isFirstAdd){
				this.setPriceItem.isFirstAdd = false;
				this.shopCar.push(this.setPriceItem);
				this.flyDot(event);
			}
			this.oprDialog("set-price-dialog", "none");
		},
		//shopcar数量改变
		async onNumChange(obj, addNum, event) {
			let hasKey = false;
			let { key } = obj;
			this.shopCar.map((item, index) => {
				if (item.key == key) {
					item.sellNum += addNum;
					if (item.sellNum == 0) {
						this.shopCar.splice(index, 1);
					}
					hasKey = true;
				}
			});
			if (!hasKey) {
				if (this.shopCar.length >= 6) {
					this.showNotify(this.$t("Market_27"), "error");
					return;
				}
				let shopCarItem = { ...obj, sellNum: 1, sellPrice: "", isFirstAdd: true };
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
		//直接单个出售1155
		sell1155Direct(item){
			this.sellObj.sellData = [{key: item.key, sellNum: 1, ids: item.ids}];
			this.sellObj.sellType = "shopCar";
			this.sellObj.erc1155_ = item.erc1155_;
			this.initSellObjInput();
			this.isApprove(item);
			this.oprDialog("confirm-sell-dialog", "block");
		},
		initSellObjInput(){
			this.sellObj.startPrice = "";
			this.sellObj.endPrice = "";
			this.sellObj.durationDays = 2;
			this.priceTypePos = 0;
		},
		//获取ShopCar里面项选中的数量
		getSelectNum(key) {
			let retNum = 0;
			this.shopCar.map((item) => {
				if (item.key == key) retNum = item.sellNum;
			});
			return retNum;
		},
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
			this.sellObj.erc1155_ = this.shopCar[0].erc1155_;
			this.setShopCarPrice();
		},
		//编辑shopCar的价格
		setShopCarPrice() {
			this.sellObj.sellData = this.shopCar;
			this.sellObj.sellType = "shopCar";
			this.isApprove(this.shopCar[0]);
			this.oprDialog("confirm-sell-dialog", "block");
		},
		confirmSubmit(){
			let { sellType} = this.sellObj;
			if(sellType == "721"){
				this.oprDialog("confirm-submit-dialog", "block");
			}else{
				let { startPrice } = this.sellObj;
				if(Number(startPrice) < 10) return;
				this.getConfirmDialog().show(this.$t('Market_58').replace('#0#', `<span style='color: #49c773'>${startPrice} BUSD</span>`), ()=>this.confirmSell())
			}
		},
		async confirmSell() {
			let { startPrice, sellData, erc1155_ } = this.sellObj;
			if(Number(startPrice) < 10) return;

			let auctionObj = {
				price_: Number(startPrice),
				suggestIndex_: 0,
				currency_: 2, 
				erc1155_ : erc1155_,
				ids_: [],
				amounts_: []
			}
			sellData.map((item) => {
				auctionObj.ids_.push(Number(item.ids[0]));
				auctionObj.amounts_.push(Number(item.sellNum));
			});

			let suggestIndex = await Wallet.ETH.getGemSuggestIndex();
			if (suggestIndex == WalletConfig.ETH.MAX_ORDER) {
				this.showNotify(this.$t("Market_28"),"error");
				return;
			}
			auctionObj.suggestIndex_ = Number(suggestIndex);

			console.log(auctionObj);

			let hash = await Wallet.ETH.gemCreateAuction(auctionObj);
			if(hash){
				await Common.sleep(200);
				this.oprDialog("confirm-sell-dialog", "none");
				this.oprDialog("shop-car-dialog", "none");
				this.shopCar = [];

				let myAddr = await Wallet.ETH.getAccount();

				//临时创建一条数据 
				let obj = {
					auctor: myAddr,
					price: startPrice * 1e9,
					uptime: parseInt(new Date().valueOf()/1000),
					orderId: -1,
					tx: hash,
					currency: 2, 
					chain: "bnb",
					erc1155_ : erc1155_,
					ids:  [...auctionObj.ids_],
					amounts:  [...auctionObj.amounts_],
				}
	
				console.log("tempData",obj);
				this.tempGemSells.unshift(obj);
				this.$store.commit("marketState/setData", {
					tempGemSells: this.tempGemSells,
				});
			}
		}
	}
	
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
	cursor: pointer;
	position: relative;
	user-select: none;
}
#market-pet-fitter {
	position: absolute;
	right: 0px;
	top: 0px;
}

</style>
