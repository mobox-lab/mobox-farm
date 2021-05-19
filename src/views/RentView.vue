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
				<div class="panel vertical-children">
					<div>
						<h3 >MOMO出租</h3>
						<p class="opa-6 mgt-10">momo 出租介绍,momo 出租介绍,momo 出租介绍,momo 出租介绍,momo 出租介绍,</p>
					</div>
					<div class="tac mgt-30">
						<section>
							<p >设置每期的出租价格</p>
							<div class="ly-input-content" style="max-width:350px;margin:0px auto;margin-top:10px">
								<p class="small tal opa-6">价格(MBOX)</p>
								<div class="por mgt-5">
									<div class="ly-input-pre-icon">
										<img  src="@/assets/coin/MBOX.png" alt="" />
									</div>
									<input v-model="rentObj.inputPrice" class="ly-input" type="number" v-number
										style=" background: #0f172a; text-align: center; width: 100%; "
										:placeholder="$t('Market_38')"
									/>
								</div>
							</div>
						</section>
						<section class="mgt-20">
							<p >设置起租天数</p>
							<div class="ly-input-content" style="max-width:350px;margin:0px auto;margin-top:10px">
								<p class="small tal opa-6">起租天数(1~7)</p>
								<div class="por mgt-5">
									<input v-model="rentObj.rentDay" class="ly-input" type="number" v-int data-max="7" data-min="1"
										style=" background: #0f172a; text-align: center; width: 100%; "
										:placeholder="$t('Market_38')"
									/>
								</div>
							</div>
						</section>
						<section class="mgt-20">
							<p >设置可被续租的期数</p>
							<div class="ly-input-content" style="max-width:350px;margin:0px auto;margin-top:10px">
								<p class="small tal opa-6">可续租期数(0~4)</p>
								<div class="por mgt-5">
									<input v-model="rentObj.continueDay" class="ly-input" type="number" v-int
										style=" background: #0f172a; text-align: center; width: 100%; "
										:placeholder="0"
									/>
								</div>
							</div>
						</section>
						<div class="mgt-20">
							<p v-if="isCanPutRent" style="max-width:350px;margin:0px auto">起步租期为7天，最多可以续租4期，每期租期为59MBOX</p>
							<StatuButton class="btn-primary mgt-10"  :isDisable="!isCanPutRent">确定出租</StatuButton>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import { PetView, StatuButton } from '@/components';
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import {  Wallet  } from '@/utils';

export default {
	mixins: [CommonMethod],
	components: { PetView, StatuButton },
	data() {
		return {
			rentObj: {
				inputPrice: "",
				rentDay: "",
				continueDay: ""
			}
		};
	},
	computed: {
		...mapState({
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
		}),
		getNowPetItem(){
			let petObj = {};
			let {type, tokenId} = this.$route.params;
			if(type == "market"){
				console.log({tokenId});
			}else{
				this.myNFT_stake.map(item=>{
					if(item.tokenId == tokenId){
						petObj = item;
					}
				});
				if(petObj == undefined){
					this.$router.replace("/RentView");
					return;
				}
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
		//上架租赁
		isCanPutRent(){
			let {inputPrice, rentDay} = this.rentObj;
			return Number(inputPrice) > 0 && Number(rentDay) >= 1;
		}
	},
	async created() {
		this.setPetInfo();
		this.myAccount = await Wallet.ETH.getAccount();
		let hasHighApply = await Wallet.ETH.hasHighApply();
		console.log({hasHighApply});
	},

	methods: {
		//从链上取最新的状态
		async getPetInfo(){
	
		},
		async setPetInfo(){
		},
		//租赁
		async rentPet(){
		
		},
		//取消租赁
		async cancelRent(){
			
		},
		//修改租赁价格
		async changePrice(){
	
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

