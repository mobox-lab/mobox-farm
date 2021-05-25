<template>
	<div id="upgrade">
		<span @click="$router.back(-1)" class="cur-point text-big">
			<span class="dib" style="transform: rotate(90deg)">▼</span>&nbsp;{{ $t("MOMO_19") }}
		</span>
		<div class="tac row mgt-10">
			<div class="col-md-6">
				<div class="panel" >
					<div id="upgrade-lv" class="vertical-children">
						<img :src=" require(`../assets/icon/${ category_img[this.getNowPetItem.category] }.png`)" alt="" width="20" height="20" />&nbsp;
						<span>LV {{ this.getNowPetItem.level }}</span>
					</div>
					<div id="upgrade-power" class="vertical-children">
						<img src="../assets/icon/airdrop.png" alt="" height="30" />&nbsp;
						<span class="mgl-5" :class="getHashrateColor( this.getNowPetItem)">
							{{ this.getNowPetItem.lvHashrate }}
						</span>
					</div>
					<div id="upgrade-power-lv1" class="vertical-children" v-if="this.getNowPetItem.level > 1">
						Lv. 1
						<img src="../assets/icon/airdrop.png" alt="" height="15" />&nbsp;
						<span :class="getHashrateColor( this.getNowPetItem)">
							{{ this.getNowPetItem.hashrate }}
						</span>
					</div>

					<div class="por" id="show-pet-view" style="margin-top: 100px" >
						<PetView v-bind:prototype="this.getNowPetItem.prototype" />
						<div class="vertical-children" id="upgrade-name">
							<img :src=" require(`../assets/icon/${this.getNowPetItem.chain.toLocaleLowerCase()}.png`) " height="25" alt="" />&nbsp;
							<span>{{ hasSetName ? shortStr(this.getNowPetItem.tokenName) : $t(this.getNowPetItem.tokenName) }}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-6 tal">
				<div class="panel vertical-children" style="min-height:500px">
					<div>
						<h3 >{{$t("Hire_01")}}</h3>
						<p class="opa-6 mgt-10" v-if="isMyPet">{{$t("Hire_12")}}</p>
					</div>
					<!-- 我的momo并且可以出租 -->
					<div class="tac mgt-30"  v-if="isMyPet && momoState == -1 ">
						<section>
							<p >{{$t("Hire_13")}}</p>
							<div class="ly-input-content" style="max-width:350px;margin:0px auto;margin-top:10px">
								<p class="small tal opa-6">{{$t("Hire_22")}}(MBOX)</p>
								<div class="por mgt-5">
									<div class="ly-input-pre-icon">
										<img  src="@/assets/coin/MBOX.png" alt="" />
									</div>
									<input v-model="rentObj.rentPrice" class="ly-input" type="number" v-number
										style=" background: #0f172a; text-align: center; width: 100%; "
										:placeholder="$t('Hire_13')"
									/>
								</div>
							</div>
						</section>
						<section class="mgt-20">
							<p >{{$t("Hire_14")}}</p>
							<div class="ly-input-content" style="max-width:350px;margin:0px auto;margin-top:10px">
								<p class="small tal opa-6">{{$t("Hire_15")}}</p>
								<div class="por mgt-5">
									<input v-model="rentObj.rentDay" class="ly-input" type="number" v-int data-max="7" data-min="1"
										style=" background: #0f172a; text-align: center; width: 100%; "
										:placeholder="$t('Hire_14')"
									/>
								</div>
							</div>
						</section>
						<section class="mgt-20">
							<p >{{$t("Hire_16")}}</p>
							<div class="ly-input-content" style="max-width:350px;margin:0px auto;margin-top:10px">
								<p class="small tal opa-6">{{$t("Hire_17")}}</p>
								<div class="por mgt-5">
									<input v-model="rentObj.rentRound" class="ly-input" type="number" v-int data-max="3"
										style=" background: #0f172a; text-align: center; width: 100%; "
										:placeholder="0"
									/>
								</div>
							</div>
						</section>
						<div class="mgt-20">
							<p v-if="isCanPutRent" style="max-width:350px;margin:0px auto">
								{{$t("Hire_25").replace("#0#",rentObj.rentPrice+" MBOX").replace("#1#",rentObj.rentDay).replace("2",Number(rentObj.rentRound))}}
							</p>
							<StatuButton class="btn-primary mgt-10"  :isDisable="!isCanPutRent" :onClick="putRent" :isLoading="lockBtn.putRentLock > 0">{{$t("Hire_19")}}</StatuButton>
						</div>
					</div>
					<!-- 挂单中的momo -->
					<div  v-if="momoState == 0">
						<div id="rent-info-panel">
							<div class="aveage-box">
								<p>{{$t("Hire_22")}}</p>
								<h3 class="tar vertical-children">
									<img src="@/assets/coin/MBOX.png" alt="" height="20">&nbsp;
									<span>{{numFloor(statusObj.currentRentPrice / 1e18, 1e4)}}</span>
								</h3>
							</div>
							<div class="tab-split"></div>
							<div class="aveage-box">
								<p>{{$t("Hire_23")}}</p>
								<h3 class="tar">{{statusObj.currentRentDays}}</h3>
							</div>
							<div class="tab-split"></div>
							<div class="aveage-box">
								<p>{{$t("Hire_24")}}</p>
								<h3 class="tar">{{Number(statusObj.currentRentRound) - 1}}</h3>
							</div>
						</div>
						<div v-if="isMyRent" class="tac mgt-20">
							<StatuButton class="mgt-10" v-if="momoState == 0" :onClick="cancelRent" :isLoading="lockBtn.cancelRentLock > 0">{{$t("Hire_20")}}</StatuButton>
						</div>
						<div class="tac mgt-20" v-else>
							<p >{{$t("Hire_21")}}</p>
							<div :class="coinArr['MBOX'].allowanceToRent == 0 ?'btn-group':''"  style="width:280px;margin:10px auto">
								<StatuButton  data-step="1" v-if="coinArr['MBOX'].allowanceToRent == 0" class="mgt-10" style="width:80%" :onClick="approve" :isLoading="coinArr['MBOX'].isApproving">{{$t("Air-drop_16")}} MBOX</StatuButton>
								<StatuButton  data-step="2" :isDisable="!(coinArr['MBOX'].allowanceToRent > 0)" class="mgt-10" style="width:80%" :onClick="rentPet" :isLoading="lockBtn.rentLock > 0">租赁</StatuButton>
							</div>
						</div>
					</div>

					<p v-if="momoState == 1" class="tac mgt-20">{{$t("Hire_26")}}<span class="dotting"></span></p>

					<MomoInfo :data="this.getNowPetItem" :isMarket="true" />
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import { PetView, StatuButton, MomoInfo } from '@/components';
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { WalletConfig, PancakeConfig } from "@/config";
import {  Wallet, Common } from '@/utils';

export default {
	mixins: [CommonMethod],
	components: { PetView, StatuButton, MomoInfo },
	data() {
		return {
			rentObj: {
				rentPrice: "",
				rentDay: "",
				rentRound: ""
			},
			statusObj: {
				orderId: "-",
				currentRentDays: "-",
				currentRentPrice: "-",
				currentRentRound: "-",
				gameId: "-",
				nextRentDays: "-",
				nextRentPrice: "-",
				nextRentRound: "-",
				owner: "-",
				rentTime: "-",
				renter: "-",
				status: "-",
			},
			// allowanceToRent
		};
	},
	computed: {
		...mapState({
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			marketRents: (state) => state.marketState.data.marketRents,
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn
		}),
		getNowPetItem(){
			let petObj;
			let myPetObj = this.isMyPet;
			if(myPetObj != undefined){
				petObj = myPetObj;
			}else{
				//查询下是不是市场上的
				let {tokenId} = this.$route.params;
				this.marketRents.list.map(item=>{
					if(item.tokenId == tokenId){
						petObj = item;
					}
				})
			}

			if(petObj == undefined){
				this.$router.replace("/market");
				return;
			}
			return petObj;
		},
		//是否设置过名字
		hasSetName() {
			return this.getNowPetItem.tokenName.indexOf("Name_") == -1;
		},
		//是否是我的MOMO
		isMyPet(){
			let petObj;
			let {tokenId} = this.$route.params;
			this.myNFT_stake.map(item=>{
				if(item.tokenId == tokenId){
					petObj = item;
				}
			});
			return petObj;
		},
		isMyRent(){
			return this.statusObj.owner.toLocaleLowerCase() == this.myAccount.toLocaleLowerCase();
		},
		//上架租赁
		isCanPutRent(){
			let {rentPrice, rentDay} = this.rentObj;
			return Number(rentPrice) > 0 && Number(rentDay) >= 1;
		},
		momoState(){
			let {currentRentDays, status, rentTime} = this.statusObj;
			if(currentRentDays == "-") return -2;//未请求状态
			if(currentRentDays == 0 ) return -1; //未上架
			if(status == 0){
				return 0;//挂单中
			}else{
				if(Number(rentTime) < parseInt(new Date().valueOf()/1000)){
					return -1
				}else{
					return 1;//出租中
				}
			}
		}
	},
	async created() {
		this.getPetInfo();
		this.myAccount = await Wallet.ETH.getAccount();
		//查询授权情况
		await this.viewAllowance();
		//查询余额
		let coinKey = "MBOX";
		if(this.coinArr[coinKey].balance == "-"){
			this.$root.$children[0].setCoinValueByName(coinKey);
		}
	},

	methods: {
		async viewAllowance(){
			let coinKey = "MBOX";
			if(this.coinArr[coinKey].allowanceToRent > 0) return;

			let allowanceToRent = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinKey].addr, WalletConfig.ETH.momoRent, false);
			if(allowanceToRent){
				this.coinArr[coinKey].allowanceToRent = Number(allowanceToRent);
				this.coinArr.ts = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		//授权
		async approve(){
			let coinKey = "MBOX";
			let {allowanceToRent, isApproving} = this.coinArr[coinKey];
			if(allowanceToRent > 0 || isApproving) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin[coinKey].addr,
			WalletConfig.ETH.momoRent, {coinKey, type: "allowanceToRent"});
			if (hash) {
				this.coinArr[coinKey].isApproving = true;
			}
		},

		//从链上取最新的状态
		async getPetInfo(){
			if(!this.getNowPetItem.tokenId) return;
			let res = await Wallet.ETH.getMomoRentInfo(this.getNowPetItem.tokenId);
			if(res){
				this.statusObj = res;
			}
		},
		//租赁
		async rentPet(){
			console.log(this.statusObj);
			let obj = {
				tokenId_: this.getNowPetItem.tokenId, 
				orderId_: this.statusObj.orderId,
				gameId_:1, 
				price_: this.statusObj.currentRentPrice
			}
			let hash = await Wallet.ETH.rentMomo(obj);
			if(hash){
				this.lockBtnMethod("rentLock");
				await Common.sleep(1000);
				this.$router.back(-1);
			}
		},
		//上架租赁
		async putRent(){
			if(!this.isCanPutRent) return;
			console.log(this.rentObj);
			let obj = {
				tokenId_: this.getNowPetItem.tokenId,
				curRentDays_: this.rentObj.rentDay, 
				curRentRound_: Number(this.rentObj.rentRound) + 1,
				curRentPrice_:this.rentObj.rentPrice
			}
			let hash = await Wallet.ETH.createRent(obj, ()=>{
				this.getPetInfo();
			});
			if(hash){
				this.lockBtnMethod("putRentLock");
			}
		},
		//取消租赁
		async cancelRent(){
			let res = await Wallet.ETH.cancelPutRent({tokenId_: this.getNowPetItem.tokenId, orderId_: this.statusObj.orderId }, ()=>{
				this.getPetInfo();
			});
			if(res){
				this.lockBtnMethod("cancelRentLock");
			}
		},
		//修改租赁价格
		async changePrice(){
	
		},
	},
};
</script>
<style scoped>
#rent-info-panel{
	border-radius: 10px;
	background: #384A7C;
	/* max-width: 350px;
	margin: 0px auto; */
	margin-top: 20px;
}
#rent-info-panel .aveage-box{
	padding: 15px 20px;
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

