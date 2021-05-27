<template>
	<section>
		<Dialog id="rent-deal-dialog" :top="100" :width="390">
			<h2>{{$t("Hire_33")}}</h2>
			<p class="mgt-10" v-if="isRentOther">{{$t("Hire_10")}}: {{shorAddress(statusObj.owner)}}</p>
			<p class="mgt-10" v-else>{{$t("Hire_09")}}: {{shorAddress(statusObj.renter)}}</p>
			<div class="ly-input-content mgt-10">
				<h3>{{$t("Hire_34")}}</h3>
				<div class="aveage-box tal mgt-20">
					<p>{{$t("Hire_22")}}</p>
					<p class="tar vertical-children">
						<img src="@/assets/coin/MBOX.png" alt="" height="25">
						<span class="mgl-5">
							<span v-if="statusObj.currentRentPrice !='-' ">{{numFloor(statusObj.currentRentPrice/1e18, 1e4)}} MBOX</span>
							<span v-else><Loading /></span>
						</span>
					</p>
				</div>
				<div class="aveage-box tal mgt-10">
					<p>{{$t("Hire_23")}}</p>
					<p class="tar">
						<span v-if="statusObj.currentRentDays !='-' ">{{statusObj.currentRentDays}}</span>
						<span v-else><Loading /></span>
					</p>
				</div>
				<div class="aveage-box tal  mgt-10">
					<p>{{$t("Hire_24")}}</p>
					<p class="tar">
						<span v-if="statusObj.currentRentRound !='-' ">{{statusObj.currentRentRound}}</span>
						<span v-else><Loading /></span>
					</p>
				</div>
				<StatuButton :isLoading="lockBtn.rentLock > 0" :onClick="reRent" class="mgt-10" v-if="Number(statusObj.currentRentRound) > 0 && isRentOther" :isDisable="Number(statusObj.leftTs) <= 0">
					<span v-if="Number(statusObj.leftTs) > 0">{{$t("Hire_35")}}</span>
					<span v-else>{{$t("Hire_32")}}</span>
				</StatuButton>
			</div>
			<div class="ly-input-content mgt-10">
				<h3>{{$t("Hire_36")}}</h3>
				<div class="aveage-box tal mgt-20">
					<p>{{$t("Hire_22")}}</p>
					<p class="tar vertical-children" v-if="Number(statusObj.nextRentPrice) > 0">
						<img src="@/assets/coin/MBOX.png" alt="" height="25">
						<span class="mgl-5">{{numFloor(statusObj.nextRentPrice/1e18, 8) || "-"}} MBOX</span>
					</p>
					<p v-else class="tar">-</p>
				</div>
				<div class="aveage-box tal  mgt-10">
					<p>{{$t("Hire_23")}}</p>
					<p class="tar">{{Number(statusObj.nextRentDays) || "-"}}</p>
				</div>
				<div class="aveage-box tal  mgt-10">
					<p>{{$t("Hire_24")}}</p>
					<p class="tar">{{Number(statusObj.nextRentRound) > 0 ?  Number(statusObj.nextRentRound)-1 :  "-"}}</p>
				</div>
				<button class="mgt-10 btn-primary" @click="oprDialog('new-deal-dialog', 'block')" v-if="!isRentOther && Number(statusObj.nextRentDays) == 0 && Number(statusObj.leftTs) > 0 ">{{$t("Hire_38")}}</button>
				<StatuButton :onClick="reRent.bind(this, true)" :isLoading="lockBtn.rentLock > 0" class="mgt-10" v-if="isRentOther && Number(statusObj.nextRentDays) > 0 && Number(statusObj.currentRentRound) == 0 && Number(statusObj.leftTs) > 0">
					{{$t("Hire_45")}}
				</StatuButton>
			</div>
		</Dialog>
		<Dialog id="new-deal-dialog" :top="100" :width="390">
			<h2>{{$t("Hire_41")}}</h2>
			<section class="mgt-20">
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
						<input v-model="rentObj.rentRound" class="ly-input" type="number" v-int data-max="3" data-min="0"
							style=" background: #0f172a; text-align: center; width: 100%; "
							:placeholder="0"
						/>
					</div>
				</div>
			</section>
			<div class="mgt-20">
				<StatuButton class="btn-primary mgt-10"  :isDisable="!isCanPutRent" :onClick="addRentRenewal" :isLoading="lockBtn.putRentLock > 0">{{$t("Hire_42")}}</StatuButton>
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
			lockBtn: (state) => state.globalState.data.lockBtn
		}),
		//上架租赁
		isCanPutRent(){
			let {rentPrice, rentDay} = this.rentObj;
			return Number(rentPrice) > 0 && Number(rentDay) >= 1;
		},
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
				leftTs: "-",
			},
		})
	},
	methods:{
		//新的合同
		async addRentRenewal(){
			if(!this.isCanPutRent) return;
			let obj = {
				tokenId_: this.tokenId,
				orderId_: this.statusObj.orderId,
				nextRentDays_: this.rentObj.rentDay, 
				nextRentRound_: Number(this.rentObj.rentRound) + 1,
				nextRentPrice_:this.rentObj.rentPrice
			}
			console.log(obj);
			let hash = await Wallet.ETH.addRentRenewal(obj, async ()=>{
				await this.getDealInfo();
				this.rentObj =  {
					rentPrice: "",
					rentDay: "",
					rentRound: ""
				};
				this.oprDialog("new-deal-dialog", "none");
			});
			if(hash){
				this.lockBtnMethod("putRentLock");
			}
		},
		//续租订单
		async reRent(isNewDeal = false){
			let obj = {
				tokenId_: this.tokenId, 
				orderId_: this.statusObj.orderId, 
				price_: isNewDeal?this.statusObj.nextRentPrice: this.statusObj.currentRentPrice
			}
			let hash = await Wallet.ETH.reRent(obj, ()=>{
				this.getDealInfo();
			});
			if(hash){
				this.lockBtnMethod("rentLock");
			}
		},
		
		async getDealInfo(){
			if(this.tokenId == 0) return;
			let res = await Wallet.ETH.getMomoRentInfo(this.tokenId);
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
