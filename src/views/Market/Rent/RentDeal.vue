<template>
	<section>
		<Dialog id="rent-deal-dialog" :top="150" :width="400">
			<h2>{{$t("Hire_33")}}</h2>
			<p class="mgt-10" v-if="isRentOther">{{$t("Hire_10")}}: {{shorAddress(statusObj.owner)}}</p>
			<p class="mgt-10" v-else>{{$t("Hire_09")}}: {{shorAddress(statusObj.renter)}}</p>
			<div class="ly-input-content mgt-10">
				<div class="aveage-box tal mgt-20">
					<p>{{$t("Hire_49")}}</p>
					<p class="tar vertical-children" v-if="statusObj.orderId != '-' ">
						<img :src="require(`@/assets/coin/${showCoin}.png`)" alt="" height="25">
						<span class="mgl-5">
							<span v-if="statusObj.rentPrice !='-' ">{{numFloor(statusObj.rentPrice/1e18, 1e4)}} {{showCoin}}</span>
							<span v-else><Loading /></span>
						</span>
					</p>
				</div>
			
				<div class="aveage-box tal  mgt-10">
					<p>{{$t("Hire_56")}}</p>
					<p class="tar">
						<span v-if="statusObj.rentDays !='-' ">{{statusObj.rentDays}} {{$t("Hire_46")}}</span>
						<span v-else><Loading /></span>
					</p>
				</div>
		
				<StatuButton  :onClick="()=>oprDialog('rerent-day-dialog', 'block')" :isLoading="lockBtn.rentLock > 0" class="mgt-20" v-if="Number(statusObj.rentDays) > 0 && isRentOther" :isDisable="Number(statusObj.leftTs) <= 0">
					<span v-if="Number(statusObj.leftTs) > 0">{{$t("Hire_35")}}</span>
					<span v-else>{{$t("Hire_32")}}</span>
				</StatuButton>
				
			</div>
			
		</Dialog>
		<Dialog id="rerent-day-dialog" :top="150" :width="390">
			<h2>{{$t("Hire_35")}}</h2>
			<section class="mgt-20">
				<p class="vertical-children">
					<span>{{$t("Hire_49")}}: {{numFloor(statusObj.rentPrice/1e18, 1e4)}} {{showCoin}}</span>
					<img :src="require(`@/assets/coin/${showCoin}.png`)" alt="" height="20" class="mgl-5">
				</p>
				<div class="ly-input-content" style="max-width:350px;margin:0px auto;margin-top:10px">
					<p class="small tal opa-6">{{$t("Hire_55").replace('#0#', statusObj.rentDays)}}</p>
					<div class="por mgt-5">
						<input v-model="inputRentDays" class="ly-input" type="text" v-number :data-max="statusObj.rentDays"
							style=" background: #0f172a; text-align: center; width: 100%; "
							:placeholder="$t('Hire_55').replace('#0#', statusObj.rentDays)"
						/>
					</div>
					<div class="aveage-box  mgt-10" v-if="Number(inputRentDays) > 0">
						<p class="tal">{{$t("Market_18")}}</p>
						<p class="tar vertical-children">
							<span>{{numFloor(statusObj.rentPrice * inputRentDays/1e18, 1e4)}} {{showCoin}}</span>
							<img :src="require(`@/assets/coin/${showCoin}.png`)" alt="" height="20" class="mgl-5">
						</p>
					</div>
				</div>
			</section>
			
			<div class="mgt-20">
				<StatuButton :onClick="reRent" class="btn-primary mgt-10"  :isDisable="Number(inputRentDays) <= 0 && Number(inputRentDays) > Number(statusObj.rentDays)"  :isLoading="lockBtn.rentLock > 0">
					{{$t("Common_03")}}
				</StatuButton>
			</div>
		</Dialog>
	</section>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { Dialog, StatuButton, Loading } from '@/components';
import { Wallet } from '@/utils';
import { mapState } from 'vuex';

export default {
	mixins: [CommonMethod],
	components: {Dialog, StatuButton,Loading},
	computed: {
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		//上架租赁
		isCanPutRent(){
			let {rentPrice, rentDay} = this.rentObj;
			return Number(rentPrice) > 0 && Number(rentDay) >= 1;
		},
		showCoin(){
			return Number(this.statusObj.orderId) >= 5e4 ? "USDT": "MBOX"; 
		}
	},
	data(){
		return({
			tokenId: 0,
			isRentOther: false,
			rentObj: {
				rentPrice: "",
				rentDay: "",
				rentRound: ""
			},
			statusObj: {
				orderId: "-",
				status: "-",
				rentDays: "-",
				owner: "-",
				startTime: 0,
				bidEndTime: "-",
				rentTime: "-",
				renter: "-",
				bidPrice: "-",
				rentPrice: "-",
				leftTs: "-",
			},
			inputRentDays: "",
		})
	},
	methods:{
		//续租订单
		async reRent(){
			let totalPrice = this.statusObj.rentPrice / 1e18 * this.inputRentDays;

			if(totalPrice > Number(this.coinArr["USDT"].balance)){
				this.showNotify(this.$t("Market_34"), "error");
				return;
			}

			let obj = {
				tokenId_: this.tokenId, 
				orderId_: this.statusObj.orderId,
				price_: totalPrice + 0.000001 ,
				days_: Number(this.inputRentDays)
			}

			let hash = await Wallet.ETH.Group.Rent.renewRent(obj, ()=>{
				this.oprDialog("rerent-day-dialog", "none")
				this.oprDialog("rent-deal-dialog", "none")
				this.getDealInfo();
			});
			if(hash){
				this.lockBtnMethod("rentLock");
			}
		},
		
		async getDealInfo(){
			if(this.tokenId == 0) return;
			let res = await Wallet.ETH.Group.Rent.getMomoRentInfo(this.tokenId);
			if(res){
				this.statusObj = res;
				let nowTs = parseInt(new Date().valueOf()/1000);
				this.statusObj.leftTs = Number(res.rentTime) - nowTs;
			}
		},
		show(){
			this.oprDialog("rent-deal-dialog","block");
			this.rentObj =  {
				rentPrice: "",
				rentDay: "",
				rentRound: ""
			};
			this.statusObj = {
				orderId: "-",
				status: "-",
				rentDays: "-",
				owner: "-",
				startTime: 0,
				bidEndTime: "-",
				rentTime: "-",
				renter: "-",
				bidPrice: "-",
				rentPrice: "-",
				leftTs: "-",
			},
			this.getDealInfo();
			return this;
		},
		close(){
			this.oprDialog("rent-deal-dialog","none")
			return this;
		},
		setOprData(tokenId, isRentOther){
			this.tokenId = tokenId;
			this.isRentOther = isRentOther;
			return this;
		},
	}
}

</script>
