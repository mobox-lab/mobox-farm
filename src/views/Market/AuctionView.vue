<template>
	<div id="upgrade" style="margin-top:10px">
		<router-link to="/market">
			<span  class="cur-point text-big">
				<span class="dib" style="transform: rotate(90deg)">▼</span>&nbsp;{{ $t("MOMO_19") }}
			</span>
		</router-link>
		<div class="tac row ">
			<div class="col-md-6 mgt-10">
				<div class="panel" v-if="this.getNowPetItem.tokenId != 0">
					<div id="upgrade-lv" class="vertical-children">
						<img :src=" require(`@/assets/icon/${ category_img[this.getNowPetItem.category] }.png`)" alt="" width="20" height="20" />&nbsp;
						<span>LV {{ this.getNowPetItem.level }}</span>
					</div>
					<div id="upgrade-power" class="vertical-children">
						<img src="@/assets/icon/airdrop.png" alt="" height="30" />&nbsp;
						<span class="mgl-5" :class="getHashrateColor( this.getNowPetItem)">
							{{ this.getNowPetItem.lvHashrate }}
						</span>
					</div>
					<div id="upgrade-power-lv1" class="vertical-children" v-if="this.getNowPetItem.level > 1">
						Lv. 1
						<img src="@/assets/icon/airdrop.png" alt="" height="15" />&nbsp;
						<span :class="getHashrateColor( this.getNowPetItem)">
							{{ this.getNowPetItem.hashrate }}
						</span>
					</div>

					<div class="por" id="show-pet-view" style="margin-top: 100px" >
						<PetView v-bind:prototype="this.getNowPetItem.prototype" />
						<div class="vertical-children" id="upgrade-name">
							<img :src=" require(`@/assets/icon/${this.getNowPetItem.chain.toLocaleLowerCase()}.png`) " height="25" alt="" />&nbsp;
							<span>{{ hasSetName ? shortStr(this.getNowPetItem.tokenName) : $t(this.getNowPetItem.tokenName) }}</span>
						</div>
					</div>
				</div>
				<div class="panel" v-if="this.getNowPetItem.tokenId == 0">

					<div v-for="item in getShowList" :key="item.prototype" :class="'pet_hover_lv' +item.vType" class="shop-car-item  vertical-children por mgt-10">
					<img class="pet-img" :src="require(`@/assets/pet/${item.prototype}.png`)" alt="" />
					<div class="dib small mgl-5">
						<p class="vertical-children">
							<img src="@/assets/icon/airdrop.png" width="20" alt="" />
							<span class="mgl-5 color-w" style="font-size:18px"> {{ item.lvHashrate }} </span>
						</p>
						<p class="vertical-children mgt-5">
							<img :src=" require(`@/assets/icon/${ category_img[item.category] }.png`) " width="12" alt="" />&nbsp;
							<span class="mgl-5"> Lv.{{ item.level }} </span>
						</p>
						<p class="vertical-children mgt-5">
							<img :src=" require(`@/assets/icon/bnb.png`) " width="12" alt="" />
							<span class="mgl-5"> {{ $t(item.tokenName) }} </span>
						</p>
						
					</div>
					<div class="absolute-r tar" style="right: 20px; top: 5px;bottom:5px;display:flex; align-items: center;">
						<span>x{{item.num}}</span>
					</div>
				</div>

				</div>
			</div>

			<div class="col-md-6 tal mgt-10">
				<div class="panel vertical-children">
					<!-- 出售价格 -->
					<div>
						<h3 >{{$t("Market_17")}}</h3>
						<div class="tac">
							<div id="price" class="vertical-children">
								<img src="@/assets/coin/BUSD.png" height="25" alt="">&nbsp;
								<span class="money">{{numFloor( this.nowPrice/ 1e9, 1e2).toLocaleString()}}</span>
							</div>
							<div v-if="this.getNowPetItem.startPrice != this.getNowPetItem.endPrice">
								<div class="jdt">
									<span class="jdt-bar active"></span>
									<span class="jdt-days">{{$t("Market_23").replace("#0#", this.getNowPetItem.durationDays)}}</span>
									<p class="jdt-bg">
										<span class="jdt-active" :style="`width:${getWidth}`"></span>
									</p>
									<span class="jdt-bar" :class="this.getWidth == '100%'?'active':''" style="left:auto;right:-5px" ></span>
									<span class="jdt-startPrice vertical-children">
										<img src="@/assets/coin/BUSD.png" height="18" alt="">&nbsp;
										<span>{{numFloor( this.getNowPetItem.startPrice/ 1e9, 1e4)}}</span>
									</span>
									<span class="jdt-endPrice vertical-children">
										<img src="@/assets/coin/BUSD.png" height="18" alt="">&nbsp;
										<span>{{numFloor( this.getNowPetItem.endPrice/ 1e9, 1e4)}}</span>
									</span>
								</div>
								<p class="small vertical-children por" style="top: -15px" v-if="this.nowPrice != this.getNowPetItem.endPrice">
									<span>{{$t('Market_32').replace('#0#', countdown)}}:</span>&nbsp;
									<img src="@/assets/coin/BUSD.png" height="16" alt="">&nbsp;
									<span>{{numFloor( nextDayPrice/ 1e9, 1e4)}}</span>
								</p>
							</div>
							<div v-if="!isMyPet" class="mgt-30">
								<div :class="{'btn-group': needApprove}" class="dib">
									<div v-if="needApprove">
										<StatuButton data-step="1" style="width:150px" :isLoading="coinArr['BUSD'].isApproving" :onClick="approve">{{$t("Air-drop_16")}} BUSD</StatuButton>
									</div>
									<div class="mgt-10">
										<StatuButton style="width:150px"  data-step="2" :isLoading="lockBtn.buyMomoLock > 0" :isDisable="needApprove || (nowTs - this.getNowPetItem.uptime) <= 120" :onClick="()=>oprDialog('confirm-buy-dialog','block')">
											<template v-if="nowTs - this.getNowPetItem.uptime <= 120">
												<img src="@/assets/icon/lock.png" alt="" height="20" style="position:absolute;left:10px;top:6px">
												<span>{{getLeftTime(Number(this.getNowPetItem.uptime) + 120 - nowTs)}}</span>
											</template>
											<span v-else>{{$t("Market_22")}}</span>
										</StatuButton>
									</div>
								</div>

								<template v-if="!needApprove && nowTs - this.getNowPetItem.uptime > 120 && isMatchShopCar">
									<button  @click="addToShopCar" style="width:150px"  class=" mgt-10 mgl-10" :class="isInShopCar?'btn-danger':'btn-line' ">
										<span v-if="isInShopCar">{{$t("Market_70")}}</span>
										<span v-else>{{$t("Market_69")}}</span>
									</button>
								</template>
							</div>
							<div  v-if="isMyPet" class="mgt-20">
								<button class="btn-primary vertical-children por" :class="lockBtn.changePriceLock > 0?'disable-btn':''"   @click="setChangePriceData(true)">
									<Loading class="btn-loading" v-if="lockBtn.changePriceLock > 0" />
									{{$t("Market_20")}}
								</button>&nbsp;&nbsp;
								<button class="btn-primary vertical-children mgl-5" style="background: #384a7a !important" @click="cancelAuction">
									{{$t("Market_21")}}
								</button>
							</div>
						</div>
					</div>

					<MomoInfo :data="this.getNowPetItem" :isMarket="true" />

					<div style="position:absolute;right:15px;top:15px" class="cur-point" @click="getMomoShopCar().show()" v-if="isMatchShopCar">
						<span v-if="shopCar.length >0" class="shop-car-num">{{shopCar.length}}</span>
						<img src="@/assets/icon/shopCar-buy.png" alt="" height="40">
					</div>
					
				</div>
			</div>
		</div>

		<Dialog id="changePrice-dialog" :top="200" :width="400">
				<h2 class="mgt-10">{{$t("Market_10")}}</h2>
			<div class="mgt-20">
				<Tab :list="[$t('Market_36'),$t('Market_37')]" style="zoom:0.8"  :defaultSelectPos="priceTypePos" :onChange="onTabChange"  ref="priceTypeTab" :notice="[]"/>
				<div class="ly-input-content mgt-10">
					<p class="small tal opa-6">{{priceTypePos == 1?$t("Market_11"):$t("Market_17")}} (BUSD)</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  src="@/assets/coin/BUSD.png" alt="" />
						</div>
						<input v-model="sellObj.startPrice"   class="ly-input sell-input" type="text" :placeholder="priceTypePos == 1?$t('Market_11'):$t('Market_17')" v-number  data-max="100000000"/>
					</div>
				</div>
				<div v-if="priceTypePos == 1">
					<div class="ly-input-content mgt-10">
						<p class="small tal opa-6">{{$t("Market_12")}} (BUSD)</p>
						<div class="por mgt-5">
							<div class="ly-input-pre-icon">
								<img  src="@/assets/coin/BUSD.png" alt="" />
							</div>
							<input v-model="sellObj.endPrice" class="ly-input sell-input" type="text" :placeholder="$t('Market_12')" v-number data-max="100000000"/>
						</div>
					</div>
					<div class="ly-input-content mgt-10">
						<p class="small tal opa-6">{{$t("Market_13")}}(≥2)</p>
						<div class="por mgt-5">
							<input v-model="sellObj.durationDays" class="ly-input sell-input" type="text" v-int :placeholder="$t('Market_13')" data-max="1000" data-min="2"  />
						</div>
					</div>
				</div>
			</div>
			<div class="small mgt-10 opa-6" v-if="Number(sellObj.startPrice) > 0 && Number(sellObj.endPrice) > 0 && priceTypePos==1">{{$t("Market_14").replace("#0#", sellObj.durationDays).replace("#1#",sellObj.startPrice).replace("#2#",sellObj.endPrice)}}</div>
			<button style="width: 200px" class="btn-primary mgt-20" :class="!(sellObj.durationDays > 1 && sellObj.startPrice > 0)? 'disable-btn': '' " @click="changePrice">
				{{$t("Common_03")}}
			</button>
		</Dialog>

		<Dialog id="confirm-buy-dialog"  :top="200" :width="350">
			<h4 class="mgt-30" v-html="$t('Market_59').replace('#0#', `<span style='color: #49c773' class='money'>${numFloor(nowPrice/ 1e9, 1e2).toLocaleString()} BUSD</span>` )"></h4>
			<div class="mgt-50">
				<button class="btn-primary" @click="oprDialog('confirm-buy-dialog', 'none');">{{$t("Common_04")}}</button>
				<button class="btn-primary mgl-5" @click="oprDialog('confirm-buy-dialog', 'none');buyPet()">{{$t("Common_03")}}</button>
			</div>
		</Dialog>

	</div>
</template>
<script>
import { PetView, Dialog, MomoInfo, Tab, Loading, StatuButton } from '@/components';
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import {  Wallet, EventBus, Common } from '@/utils';
import { WalletConfig, EventConfig, BaseConfig, PancakeConfig } from '@/config';
import BigNumber from "bignumber.js";

let updatePriceTimer = null;
export default {
	mixins: [CommonMethod],
	components: { PetView, Dialog, MomoInfo, Tab, Loading, StatuButton },
	data() {
		return {
			lockUpgradeTime: 0,
			hackReload: true,
			myAccount: "",
			sellObj: {
				startPrice: "",
				endPrice: "",
				durationDays: 2,
			},
			nowPrice : 0,
			getWidth: "0%",
			tradeHistory: [],
			countdown: "00:00:00",
			nextDayPrice: 0,
			priceTypePos: 0,
		};
	},
	computed: {
		...mapState({
			tempMarketCancelTx: (state) => state.marketState.data.tempMarketCancelTx,
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn,
			marketPets: (state) => state.marketState.data.marketPets,
			marketPetsMy: (state) => state.marketState.data.marketPetsMy,
			shopCar: (state) => state.marketState.data.shopCar,
			nowTs: (state) => state.globalState.data.nowTs
		}),
		//是否符合加入购物车条件
		isMatchShopCar(){
			return this.getNowPetItem.tokenId != 0 || (this.getShowList.length == 1 && Number(this.getShowList[0].num) <= 1)
		},
		getNowPetItem(){
			let petObj;
			let tx = this.$route.params.petInfo;
			[...this.marketPets.list, ...this.marketPetsMy.list].map(item=>{
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
		//是否设置过名字
		hasSetName() {
			return this.getNowPetItem.tokenName.indexOf("Name_") == -1;
		},
		//是否是我的拍卖
		isMyPet(){
			return this.getNowPetItem.auctor.toLocaleLowerCase() == this.myAccount.toLocaleLowerCase();
		},
		getShowList(){
			let {ids, amounts} = this.getNowPetItem;
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
		isInShopCar(){
			let isInShopCar = false;
			this.shopCar.map(item=>{
				if(item.tx == this.getNowPetItem.tx) isInShopCar = true;
			});
			return isInShopCar;
		},
		//是否需要授权, 授权额度不足支付
		needApprove(){
			return this.coinArr['BUSD'].allowanceToAuction / 1e18 < Number(this.nowPrice/ 1e9) && this.coinArr['BUSD'].allowanceToAuction !=-1;
		}
	},
	async created() {
		this.setNowPrice();
		this.startCountDown();

		this.setPetInfo();
		this.myAccount = await Wallet.ETH.getAccount();
		//查询授权情况
		await this.viewAllowance();
		//查询余额
		let coinKey = "BUSD";
		if(this.coinArr[coinKey].balance == "-"){
			this.$root.$children[0].setCoinValueByName(coinKey);
		}
	},
	mounted(){
		EventBus.$on(EventConfig.ChangePriceSuccess, this.setPetInfo);
	},
	beforeDestroy(){
		if(updatePriceTimer) clearInterval(updatePriceTimer);
		EventBus.$off(EventConfig.ChangePriceSuccess, this.setPetInfo);
	},
	methods: {
		async addToShopCar(){
			
			let data = await this.getPetInfo();
			let {oldTime} = this.getNowPetItem;

			if(data.status != 3 || data.startTime != oldTime){
				this.showNotify(this.$t("Market_35"), "error");
				this.$router.replace("/market");
				return;
			}

			this.$store.commit("marketState/addToShopCar", {...this.getNowPetItem,...this.getShowList[0]});
		},
		onTabChange(pos){
			this.sellObj.endPrice = this.sellObj.startPrice;
			this.priceTypePos = pos;
		},
		startCountDown(){
			if(updatePriceTimer) clearInterval(updatePriceTimer);
			let {uptime} = this.getNowPetItem;
			let nowTime = parseInt(new Date().valueOf() / 1000);
			let count = 86400 - ((nowTime-uptime) % 86400);
			this.countdown = this.getLeftTime(count);
			updatePriceTimer = setInterval(() => {
				count--;
				if(count == 0){
					this.setNowPrice();
				}
				this.countdown = this.getLeftTime(count);
			}, 1000);
		},
		setPrice(){
			if(this.sellObj.endPrice == ""){
				this.sellObj.endPrice = this.sellObj.startPrice;
			}
		},
		setNowPrice(){
			let {endPrice, startPrice, durationDays, uptime} = this.getNowPetItem;
			let endTime = Number(uptime) + durationDays * 86400;
			let nowTime = parseInt(new Date().valueOf() / 1000);
			let nowPrice = endPrice;
			let diffPrice = endPrice - startPrice;
			if(endTime > nowTime){
				nowPrice = Number(startPrice) + (diffPrice / durationDays * Math.floor((nowTime-uptime)/ 86400));
				this.getWidth = (nowTime-uptime) / (durationDays * 86400) * 100 +"%";
			}else{
				this.getWidth = "100%";
			}
			this.nowPrice = nowPrice;

			//明天的价格
			let nextDayPrice = endPrice;
			let nextDayTime = nowTime + 86400;
			if(endTime > nextDayTime){
				nextDayPrice = startPrice + (diffPrice / durationDays * Math.floor((nextDayTime-uptime)/ 86400));
			}
			this.nextDayPrice = nextDayPrice;
		},

		//从链上取最新的状态
		async getPetInfo(){
			let {auctor, index} = this.getNowPetItem;
			let data = await Wallet.ETH.getMarketOrder(auctor, index);
			return data;
		},
		async setPetInfo(){
			let data = await this.getPetInfo();
			if(data){
				let {durationDays, endPrice, startPrice, startTime} = data;
				this.getNowPetItem.durationDays =  durationDays;
				this.getNowPetItem.endPrice =  Number(BigNumber(endPrice).div(1e9));
				this.getNowPetItem.startPrice =  Number(BigNumber(startPrice).div(1e9));
				this.getNowPetItem.uptime =  startTime;

				this.setChangePriceData();
				this.setNowPrice();
			}
		},
		setChangePriceData(isClick = false){
			let {startPrice, endPrice, durationDays} = this.getNowPetItem;
			this.sellObj.startPrice = startPrice / 1e9;
			this.sellObj.endPrice = endPrice / 1e9;
			this.sellObj.durationDays = durationDays;
			this.priceTypePos = startPrice == endPrice ? 0: 1;
			this.$nextTick(()=>{
				this.$refs.priceTypeTab.reload();
			})

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
			let coinKey = "BUSD";
			if(this.coinArr[coinKey].allowanceToAuction > 0) return;

			let allowanceToAuction = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinKey].addr, WalletConfig.ETH.moMoStakeAuction, false);
			if(allowanceToAuction){
				this.coinArr[coinKey].allowanceToAuction = Number(allowanceToAuction);
				this.coinArr.ts = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		//授权
		async approve(){
			let coinKey = "BUSD";
			let {isApproving} = this.coinArr[coinKey];
			if(isApproving) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin["BUSD"].addr,
			WalletConfig.ETH.moMoStakeAuction, {coinKey, type: "allowanceToAuction"});
			if (hash) {
				this.coinArr[coinKey].isApproving = true;
			}
		},
	
		//购买
		async buyPet(){
			await Wallet.ETH.getAccount(true);
			let coinKey = "BUSD"
			if(this.coinArr[coinKey].allowanceToAuction <= 0 || this.lockBtn.buyMomoLock > 0) return
			if(this.nowPrice/1e9 > Number(this.coinArr[coinKey].balance)){
				this.showNotify(this.$t("Market_34"), "error");
				return ;
			}

			let data = await this.getPetInfo();
			let {auctor, index, oldTime} = this.getNowPetItem;

			if(data.status != 3 || data.startTime != oldTime){
				this.showNotify(this.$t("Market_35"), "error");
				this.$router.replace("/market");
				return;
			}

			let hash = await Wallet.ETH.buyMarketPet(auctor, index, coinKey, data.startTime, this.nowPrice);
			if(hash){
				await Common.sleep(1000);
				this.$router.back(-1);
			}
		},
		//下架
		async cancelAuction(){
			let data = await this.getPetInfo();
			if(data.status != 3){
				this.showNotify(this.$t("Market_35"), "error");
				return;
			}

			let hash = await Wallet.ETH.cancelAuction( this.getNowPetItem.index);
			if(hash){
				//添加一条临时的下架数据
				this.tempMarketCancelTx.push({tx:this.getNowPetItem.tx, nextHash: hash});
				this.$store.commit("marketState/setData", { tempMarketCancelTx: this.tempMarketCancelTx});
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

			let { startPrice, endPrice, durationDays } = this.sellObj;

			//TODO:校验参数正确性
			if(!(durationDays > 1 && startPrice > 0)){
				return;
			}

			if(endPrice == "" || this.priceTypePos == 0) this.sellObj.endPrice = startPrice;

			let obj = {
				index: this.getNowPetItem.index,
				...this.sellObj
			}

			let data = await this.getPetInfo();
			if(data.status != 3){
				this.showNotify(this.$t("Market_35"), "error");
				return;
			}

			let hash = await Wallet.ETH.changePrice(obj);
			if(hash){
				this.$store.commit("globalState/lockBtn", "changePriceLock");
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
	width: 100px;
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

