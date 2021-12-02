<template>
	<div id="upgrade" style="margin-top:10px">
		<router-link to="/market">
			<span  class="cur-point text-big">
				<span class="dib" style="transform: rotate(90deg)">▼</span>&nbsp;{{ $t("MOMO_19") }}
			</span>
		</router-link>
		<div class="tac row mgt-10">
			<div class="col-md-6">
				<div class="panel" >
					<div v-for="item in getShowList" :key="item.id" :class="'pet_hover_lv3' " class="shop-car-item  vertical-children por mgt-10">
					<img class="pet-img mgl-10" :src="require(`@/assets/market/${item.id}.png`)" alt="" height="80" />
					<div class="dib mgl-5" v-if="Number(item.id) > 100">
						<h3 class="mgl-5"> Lv.{{ item.level }} </h3>
					</div>
					<div class="absolute-r tar" style="right: 20px; top: 5px;bottom:5px;display:flex; align-items: center;">
						<span>x{{item.num}}</span>
					</div>
				</div>
				</div>
			</div>

			<div class="col-md-6 tal">
				<div class="panel vertical-children">
					<!-- 出售价格 -->
					<div>
						<h3 >{{$t("Market_17")}}</h3>
						<div class="tac">
							<div id="price" class="vertical-children">
								<img :src="require(`@/assets/coin/${oprCoin}.png`)" height="25" alt="">&nbsp;
								<span class="money">{{numFloor( this.getNowPetItem.price/ 1e9, 1e2).toLocaleString()}}</span>
							</div>
							
							<div v-if="!isMyPet" class="mgt-30">
								<div ::class="{'btn-group': needApprove}">
									<!-- <div v-if="needApprove">
										<button data-step="1"  :class="(!coinArr[oprCoin].isApproving && coinArr[oprCoin].allowanceToGemAuction == 0)?'':'disable-btn' " style="width:200px" class="btn-primary vertical-children por"  @click="approve">
											<Loading class="btn-loading" v-if="coinArr[oprCoin].isApproving" />
											{{$t("Air-drop_16")}} {{oprCoin}}
										</button>
									</div> -->
									<div v-if="needApprove">
										<StatuButton data-step="1" style="width:200px" :isLoading="coinArr[oprCoin].isApproving" :onClick="approve">{{$t("Air-drop_16")}} {{oprCoin}}</StatuButton>
									</div>
									<div class="mgt-10">
										<!-- <button data-step="2" :class="(coinArr[oprCoin].allowanceToGemAuction > 0 && lockBtn.buyMomoLock <= 0 )?'':'disable-btn' " style="width:200px" class="btn-primary vertical-children por"  @click="oprDialog('confirm-gem-buy-dialog','block')">
											<Loading class="btn-loading" v-if="lockBtn.buyMomoLock > 0" />
											{{$t("Market_22")}}
										</button> -->
										<StatuButton data-step="2" style="width:200px" :isDisable="needApprove || lockBtn.buyMomoLock > 0"  :onClick="()=>oprDialog('confirm-gem-buy-dialog','block')">
											{{$t("Market_22")}}
										</StatuButton>
									</div>
								</div>
							</div>
							<div  v-if="isMyPet" class="mgt-20">
								<StatuButton v-if="this.getNowPetItem.currency == 2" :onClick="setChangePriceData.bind(this, true)" :isLoading="lockBtn.changePriceLock > 0">{{$t("Market_20")}}</StatuButton>&nbsp;&nbsp;
								<button class="btn-primary vertical-children mgl-5" style="background: #384a7a !important" @click="cancelAuction">
									{{$t("Market_21")}}
								</button>
							</div>
						</div>
					</div>

					
				</div>
			</div>
		</div>

		<Dialog id="changePrice-dialog" :top="200" :width="400">
				<h2 class="mgt-10">{{$t("Market_10")}}</h2>
			<div class="mgt-20">
				<div class="ly-input-content mgt-10" v-if="!isGem">
					<p class="small tal opa-6">{{$t("Market_39")}} ({{oprCoin}})</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  :src="require(`@/assets/coin/${oprCoin}.png`)" alt="" />
						</div>
						<input v-model="sellObj.onePrice"  class="ly-input sell-input" type="number" :placeholder="$t('Market_39')" v-number  data-max="100000000"/>
					</div>
				</div>
				<div class="ly-input-content mgt-10">
					<p class="small tal opa-6">{{$t("Market_18")}} ({{oprCoin}})</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  :src="require(`@/assets/coin/${oprCoin}.png`)" alt="" />
						</div>
						<input v-if="isGem" v-model="sellObj.startPrice"  class="ly-input sell-input" type="number" :placeholder="$t('Market_18')" v-number  data-max="100000000"/>
						<input v-else v-model="totalPrice" readonly class="ly-input sell-input opa-6" type="number" :placeholder="$t('Market_18')" v-number  data-max="100000000"/>
					</div>
				</div>
				<div v-if="priceTypePos == 1">
					<div class="ly-input-content mgt-10">
						<p class="small tal opa-6">{{$t("Market_12")}} ({{oprCoin}})</p>
						<div class="por mgt-5">
							<div class="ly-input-pre-icon">
								<img  :src="require(`@/assets/coin/${oprCoin}.png`)" alt="" />
							</div>
							<input v-model="sellObj.endPrice" class="ly-input sell-input" type="number" :placeholder="$t('Market_12')" v-number data-max="100000000"/>
						</div>
					</div>
					<div class="ly-input-content mgt-10">
						<p class="small tal opa-6">{{$t("Market_13")}}(≥2)</p>
						<div class="por mgt-5">
							<input v-model="sellObj.durationDays" class="ly-input sell-input" type="number" v-int :placeholder="$t('Market_13')" data-max="1000" data-min="2"  />
						</div>
					</div>
				</div>
			</div>
			<div class="small mgt-10 opa-6" v-if="Number(sellObj.startPrice) > 0 && Number(sellObj.endPrice) > 0 && priceTypePos==1">{{$t("Market_14").replace("#0#", sellObj.durationDays).replace("#1#",sellObj.startPrice).replace("#2#",sellObj.endPrice)}}</div>
			<p class="color-buy tac mgt-10 small" v-if="Number(totalPrice) < 10">{{$t("Market_77")}}</p>
			<StatuButton style="width: 200px" class="mgt-10" :onClick="changePrice" :isDisable="Number(totalPrice) < 10">
				{{$t("Common_03")}}
			</StatuButton>
		</Dialog>

		<Dialog id="confirm-gem-buy-dialog"  :top="200" :width="350">
			<h4 class="mgt-30" v-html="$t('Market_59').replace('#0#', `<span style='color: #49c773' class='money'>${ numFloor( sellObj.startPrice, 1e2).toLocaleString()} ${oprCoin}</span>` )"></h4>
			<div class="mgt-50">
				<button class="btn-primary" @click="oprDialog('confirm-gem-buy-dialog', 'none');">{{$t("Common_04")}}</button>
				<button class="btn-primary mgl-5" @click="oprDialog('confirm-gem-buy-dialog', 'none');buyPet()">{{$t("Common_03")}}</button>
			</div>
		</Dialog>

	</div>
</template>
<script>
import { Dialog, StatuButton } from '@/components';
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import {  Wallet, Common } from '@/utils';
import { WalletConfig, PancakeConfig, ConstantConfig } from '@/config';
import BigNumber from "bignumber.js";


export default {
	mixins: [CommonMethod],
	components: { Dialog, StatuButton },
	data() {
		return {
			lockUpgradeTime: 0,
			hackReload: true,
			myAccount: "",
			sellObj: {
				sellNum: 0,
				onePrice: "",
				startPrice: "",
				endPrice: "",
				durationDays: 2,
			},
			nowPrice : 0,
			getWidth: "0%",
			tradeHistory: [],
			nextDayPrice: 0,
			priceTypePos: 0,
		};
	},
	computed: {
		...mapState({
			tempGemMarketCancelTx: (state) => state.marketState.data.tempGemMarketCancelTx,
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn,
			marketGems: (state) => state.marketState.data.marketGems,
			marketGemMy: (state) => state.marketState.data.marketGemMy,
		}),

		getNowPetItem(){
			let petObj;
			let tx = this.$route.params.petInfo;
			[...this.marketGems.list, ...this.marketGemMy.list].map(item=>{
				if(item.tx == tx){
					petObj = item;
				}
			});
			if(petObj == undefined){
				this.$router.replace("/market");
				return;
			}
			if(petObj.oldTime == undefined){
				petObj.oldTime = petObj.uptime;
			}
			return petObj;
		},
		//是否是我的拍卖
		isMyPet(){
			return this.getNowPetItem.auctor.toLocaleLowerCase() == this.myAccount.toLocaleLowerCase();
		},
		getShowList(){
			let {ids, amounts, erc1155_} = this.getNowPetItem;
			let arr = [];
			ids.map((id, index)=>{
				let obj = {};
				obj.num = amounts[index];
				obj.level = Number(id) % 100;
				obj.id = erc1155_ == 4?erc1155_: id;
				arr.push(obj);
			});
			arr.sort((a,b)=>{
				return b.level - a.level;
			});
			return arr;
		},
		oprCoin(){
			return ConstantConfig.CurrencyTypeName[this.getNowPetItem.currency]
		},
		isGem(){
			return this.getNowPetItem.erc1155_ == 1;
		},
		totalPrice(){
			if(this.isGem) return this.sellObj.startPrice;
			return this.sellObj.onePrice * this.sellObj.sellNum;
		},
		//是否需要授权, 授权额度不足支付
		needApprove(){
			return this.coinArr[this.oprCoin].allowanceToGemAuction / 1e18 < Number(this.getNowPetItem.price/ 1e9);
		}
	},
	async created() {
		this.setPetInfo();
		this.myAccount = await Wallet.ETH.getAccount();
		//查询授权情况
		await this.viewAllowance();
		//查询余额
		let coinKey = this.oprCoin;
		if(this.coinArr[coinKey].balance == "-"){
			this.$root.$children[0].setCoinValueByName(coinKey);
		}
	},

	methods: {
		//从链上取最新的状态
		async getPetInfo(){
			let data = await Wallet.ETH.getGemMarketOrder(this.getNowPetItem.orderId);
			return data;
		},
		async setPetInfo(){
			let data = await this.getPetInfo();
			if(data){
				let { startTime, price, ids, amounts} = data;
				this.getNowPetItem.price = Number(BigNumber(price).div(1e9));
				this.getNowPetItem.uptime =  startTime;
				this.getNowPetItem.ids =  ids.filter(item=>item !=0);
				this.getNowPetItem.amounts =  amounts.filter(item=>item !=0);
				this.setChangePriceData();
			}
		},
		setChangePriceData(isClick = false){
			let {price, amounts} = this.getNowPetItem;
			console.log(this.getNowPetItem, "---------------------");
			this.sellObj.startPrice = price / 1e9;
			this.sellObj.endPrice = price / 1e9;
			this.sellObj.durationDays = 2;
			this.sellObj.sellNum = amounts[0];
			this.sellObj.onePrice = this.sellObj.startPrice / this.sellObj.sellNum
			if(isClick){
				let { uptime } = this.getNowPetItem;
				let dtTime = parseInt(new Date().valueOf() /1000) - Number(uptime);
				if(dtTime < 600 && this.isMyPet){
					this.showNotify(this.$t("Market_48").replace("#0#", 600 - dtTime), "error");
					return;
				}
				this.oprDialog('changePrice-dialog', 'block')
			}

		},
		//获取BUSD的授权情况
		async viewAllowance(){
			let coinKey = this.oprCoin;
			if(this.coinArr[coinKey].allowanceToGemAuction > 0) return;

			let allowanceToGemAuction = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinKey].addr, WalletConfig.ETH.common1155Auction, false);
			if(allowanceToGemAuction){
				this.coinArr[coinKey].allowanceToGemAuction = Number(allowanceToGemAuction);
				this.coinArr.ts = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		//授权
		async approve(){
			let coinKey = this.oprCoin;
			let {allowanceToGemAuction, isApproving} = this.coinArr[coinKey];
			if(allowanceToGemAuction > 0 || isApproving) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin[coinKey].addr,
			WalletConfig.ETH.common1155Auction, {coinKey, type: "allowanceToGemAuction"});
			if (hash) {
				this.coinArr[coinKey].isApproving = true;
			}
		},
	
		//购买
		async buyPet(){
			let coinKey = this.oprCoin;
			if(this.coinArr[coinKey].allowanceToGemAuction <= 0 || this.lockBtn.buyMomoLock > 0) return
			if(this.getNowPetItem.price/1e9 > Number(this.coinArr[coinKey].balance)){
				if(coinKey == "MBOX"){
					this.getConfirmDialog().show(this.$t('Common_30'), ()=>this.showSwapBox())
				}else{
					this.showNotify(this.$t("Market_34"), "error");
				}
				return ;
			}

			let data = await this.getPetInfo();
			let {auctor, orderId} = this.getNowPetItem;

			if(data.status != 3 ){
				this.showNotify(this.$t("Market_35"), "error");
				this.$router.replace("/market");
				return;
			}

			let obj = {
				auctor_: auctor,
				orderId_: orderId,
				coinKey,
				amount_: data.price
			}

			let hash = await Wallet.ETH.buyGemMarketPet(obj);
			if(hash){
				await Common.sleep(1000);
				this.$router.back(-1);
			}
		},
		//下架
		async cancelAuction(){
			let data = await this.getPetInfo();
			console.log("cancelAuction", data);
			if(data.status != 3){
				this.showNotify(this.$t("Market_35"), "error");
				return;
			}

			let hash = await Wallet.ETH.cancelGemAuction( this.getNowPetItem.orderId);
			if(hash){
				//添加一条临时的下架数据
				this.tempGemMarketCancelTx.push({tx:this.getNowPetItem.tx, nextHash: hash,currency: this.getNowPetItem.currency});
				this.$store.commit("marketState/setData", { tempGemMarketCancelTx: this.tempGemMarketCancelTx});
				await Common.sleep(1000);
				this.$router.back(-1);
			}
		},
		//修改价格
		async changePrice(){
			let { uptime } = this.getNowPetItem;
			let dtTime = parseInt(new Date().valueOf() /1000) - Number(uptime);

			if(dtTime < 600){
				this.showNotify(this.$t("Market_48").replace("#0#", 600 - dtTime), "error");
				return;
			}

			let { startPrice, endPrice, onePrice, sellNum } = this.sellObj;

			if(!this.isGem){
				startPrice = onePrice * sellNum;
			}

			//TODO:校验参数正确性
			if(startPrice <= 0){
				return;
			}

			if(endPrice == "" || this.priceTypePos == 0) this.sellObj.endPrice = startPrice;

			let obj = {
				orderId_: this.getNowPetItem.orderId,
				price_: startPrice
			}

			console.log(obj, "ssss");

			let data = await this.getPetInfo();
			if(data.status != 3){
				this.showNotify(this.$t("Market_35"), "error");
				return;
			}

			let hash = await Wallet.ETH.changeGemPrice(obj, ()=>{
				this.setPetInfo();
			});
			if(hash){
				this.lockBtnMethod("changePriceLock");
				this.oprDialog("changePrice-dialog", "none");
			}
		},
	},
};
</script>
<style scoped>
.shop-car-item {
	width: 100%;
	height: 100px;
	border-radius: 20px;
	text-align: left;
}
.shop-car-item .pet-img {
	height: 100px;
}

.jdt-days{
	position: absolute;
	width: 100%;
	left: 0px;
	bottom: 10px;
}

.jdt-endPrice{
	position: absolute;
	right: 0px;
	top:10px;
	transform: translate(50%);
	font-size: 12px;
	color:#fff;
}
.jdt-startPrice{
	position: absolute;
	left: 0px;
	top:10px;
	transform: translate(-50%);
	font-size: 12px;
	color:#fff;
}
.jdt-bar.active{
	background: #7892DD;
}
.jdt-bar{
	display: inline-block;
	background: #000;
	width: 10px;
	height: 10px;
	border-radius: 10px;
	position: absolute;
	left: -5px;
	top: -4px;
}
.jdt-active{
	height: 2px;
	width: 10%;
	display: inline-block;
	background: #7892DD;
	position: absolute;
}
.jdt-bg{
	height: 2px;
	background: #000;
	text-align: left;
	line-height: 0px;
}
.jdt{
	margin: 40px auto;
	width: 80%;
	position: relative;
}
.sell-input{
	text-align: center; 
	width: 100%;
}
#price{
	background: #000;
	padding: 5px 30px;
	border-radius: 20px;
	display: inline-block;
	color: #fff;
}

.sort-btn{
	height: 40px;
	background: #1d2b50;
	border-radius: 40px;
	width: 40px;
	color: #fff;
	line-height: 40px;
	text-align: center;
	font-size: 0px;
	cursor: pointer;
	margin-left: 5px;
}
@media (max-width: 768px){
	.type_change{
		position: static!important;
		display: block;
		text-align: center;
		margin: 10px;
		zoom: 0.8 !important;
	}
}
.type_change{
	position: absolute;
	right: 0px;
	bottom: 0px;
	zoom: 0.8;
}
#stake {
	position: absolute;
	right: 20px;
	top: 65px;
	z-index: 999;
}
#upgrade-name {
	position: absolute;
	bottom: 0px;
	width: 100%;
	text-align: center;
	padding-left: 20px;
}
#upgrade-power {
	position: absolute;
	right: 20px;
	top: 20px;
	font-size: 20px;
}
#upgrade-power-lv1 {
	position: absolute;
	right: 20px;
	top: 65px;
	font-size: 12px;
}
#upgrade-lv {
	position: absolute;
	top: 20px;
	left: 20px;
}
.upgrade-lock{
	position: absolute;
	top: 80px;
	left: 30px;
}
.edit-btn {
	margin-left: 20px;
	cursor: pointer;
	height: 30px;
	top: 5px;
}
.pet-des {
	background: #10172a;
	border-radius: 10px;
	padding: 15px;
	width: 100%;
	min-height: 100px;
	display: inline-block;
}
.info-item {
	background: #1d2b50;
	border-radius: 10px;
	padding: 0px 15px;
	display: inline-block;
	height: 40px;
	line-height: 38px;
	min-width: 120px;
	position: relative;
}
#upgrade-petid {
	position: absolute;
	height: 25px;
	border-radius: 15px;
	color: #fff;
	top: 20px;
	left: 20px;
	line-height: 25px;
	padding: 0px 10px;
	min-width: 100px;
	text-align: left;
}
#upgrade {
	padding: 10px;
	max-width: 1200px;
	margin: 0px auto;
	overflow: hidden;
	position: relative;
}
</style>

