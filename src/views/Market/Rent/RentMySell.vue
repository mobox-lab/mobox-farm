<template>
	<div id="rentList">
		<section class="mgt-20">
			<ul class="statistics-top-tab" style="padding:0px">
				<li @click="rentStatePos = 0" :class="rentStatePos == 0?'active':''" class="opa-6">{{$t("Hire_26")}}({{getNumShow.isMyRent}})</li>
				<li @click="rentStatePos = 1" :class="rentStatePos == 1?'active':''" class="opa-6">{{$t("Hire_27")}}({{getNumShow.isRentOther}})</li>
			</ul>

			<table class="mgt-20 small-table" style="width:100%; border-collapse:collapse;border: none;" >
				<tr class="opa-6 tac">
					<th class="list-item-momo tal" style="padding-left:10px">MOMO</th>
					<th >
						<span v-if="rentStatePos == 0">{{$t("Hire_09")}}</span>
						<span v-else>{{$t("Hire_10")}}</span>
					</th>
					<th class="vertical-children">
						<span>{{$t("Hire_28")}}</span>
						<span @click="getMyRentList">
							<Loading :width="20" :height="20" :isRotate="loadingData" class="mgl-5 cur-point" />
						</span>
					</th>
					<th >{{$t("Hire_22")}}</th>
					<th >{{$t("Hire_23")}}</th>
					<!-- <th>{{$t("BOX_14")}}</th> -->
				</tr>
				<tr>
					<td colspan="6">
						<hr class="split-hr mgt-10"  />
					</td>
				</tr>
				<tr><td colspan="6" style="height:10px"></td></tr>
				<tbody v-for="item in getShowOrderList" :key="item.tx" class="por tac">
					<div class="list-item-momo-mobile" >
						<span v-for="item2 in item.petList" :key="item2.prototype" style="margin:0px 2px">
							<PetItemMin :data="item2" />&nbsp;
						</span>
					</div>
					<tr><td colspan="6" style="height:5px"></td></tr>
					<tr class="list-item" >
						<td  class="list-item-momo tal">
							<span v-for="item2 in item.petList" :key="item2.prototype" style="margin:0px 2px">
								<PetItemMin :data="item2" />
							</span>
						</td>
						<td>
							<span v-if="rentStatePos == 0">{{getShortAddr(item.renter)}}</span>
							<span v-else>{{getShortAddr(item.owner)}}</span>
						</td>
						<td class="vertical-children">
							<span v-if="item.leftTs < 0">{{$t("Hire_32")}}</span>
							<span v-else>{{getLeftTime(item.leftTs)}}</span>
							<img v-if="item.leftTs > 0 && Number(item.orderId) >= 5e4" class="cur-point mgl-5" src="@/assets/icon/view.png" height="25" alt="" @click="$parent.$refs.rentDeal.setOprData(item.tokenId, item.isRentOther).show()">
						</td>
						<td class="vertical-children">
							<img class="hide-xs"  :src="require(`@/assets/coin/${Number(item.orderId) >= 5e4?'BUSD':'MBOX'}.png`)" alt="" height="25">
							<span class="mgl-5">{{numFloor(item.price/1e9, 10000)}}  {{Number(item.orderId) >= 5e4?'BUSD':"MBOX" }}</span>
						</td>
						<td>{{item.rentDays}}</td>
						<!-- <td  >
							<span  v-if="item.leftTs < 0">{{$t("Hire_32")}}</span>
							<p v-else>
								<span style="color:#ADC202" v-if="item.round > 0">{{$t("Hire_31").replace("#0#", item.round)}}</span>
								<span style="color: #7388C1" v-else>{{$t("Hire_30")}}</span>
							</p>
						</td> -->
					</tr>
					<tr><td colspan="6" style="height:5px"></td></tr>
				</tbody>
			</table>
			
		</section>
	</div>
</template>

<script>
import { PetItemMin, Loading } from '@/components';
import { CommonMethod } from "@/mixin";
import { Wallet, Http, Common } from '@/utils';
import { mapState } from "vuex";
import {BaseConfig, ConstantConfig} from "@/config";

let t = null;
export default {
	mixins: [CommonMethod],
	components: { PetItemMin , Loading},
	data(){
		return({
			rentStatePos:0,
			myAccount: "",
			rentData: [],
			loadingData: false,
			oneDay: 600,
		});
	},
	computed: {
		...mapState({
			marketPetsMy: (state) => state.marketState.data.marketPetsMy,
			marketRentOrderList: (state) => state.marketState.data.marketRentOrderList,
		}),
		getShowOrderList(){
			let list = [];
			this.marketRentOrderList.list.map(item=>{
				if(this.rentStatePos == 0){
					if(!item.isRentOther) list.push(item);
				}else{
					if(item.isRentOther) list.push(item);
				}
			});
			return list;
		},
		getNumShow(){
			let obj = {
				isMyRent: 0,
				isRentOther: 0,
			};
			this.marketRentOrderList.list.map(item=>{
				if(item.leftTs > 0){
					if(item.isRentOther) 
						obj.isRentOther++;
					else 
						obj.isMyRent++;
				}
			});
			return obj;
		}
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();
		await this.getMyRentList();
		if(t)  clearInterval(t);
		let count = 0;
		await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE, false);
		t = setInterval(async ()=>{
			count++;
			let needUpdateMomo = false;
			this.marketRentOrderList.list.map(item=>{
				if(item.leftTs > 0){
					item.leftTs--;
					if(item.leftTs == 0) needUpdateMomo = true;
				}
			});
			if(count%10 == 0 || needUpdateMomo){
				await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE, false);
				await this.getMyRentList();
			}
		}, 1000);
	},
	beforeDestroy(){
		if(t)  clearInterval(t);
	},
	methods: {
		async getMyRentList(){
			if(this.loadingData) return;
			this.loadingData = true;
			let data = await Http.getMyRentList(this.myAccount);
			let t = setTimeout(()=>{
				clearTimeout(t);
				this.loadingData = false;
			}, 1000)
			if(data){
				let total = 0;
				data.list.map(item=>{
					let petList = [];
					let obj = BaseConfig.NftCfg[item.prototype];
					petList.push({
						...obj,
						bidPrice: item.price,
						prototype: item.prototype,
						level: item.level,
						num: 1,
						chain: "bnb",
						tokenId: item.tokenId,
						hashrate: item.hashrate,
						lvHashrate: item.lvHashrate,
						vType: parseInt(item.prototype / 1e4),
						category: item.category,
						quality: item.quality,
						isRent: true,
						orderId: item.orderId,
					});
					let nowTs = parseInt(new Date().valueOf()/1000);
					item.leftTs = Number(item.rentTime) - nowTs;
					item.isRentOther = item.renter.toLocaleLowerCase() == this.myAccount.toLocaleLowerCase();
					item.petList = petList;
					if(Number(item.leftTs) > 0) total++;
				});
				data.total = total;
				this.$store.commit("marketState/setData", {marketRentOrderList:data});
			}
		}
	}
}
</script>

<style scoped>
	.list-item{
		color: #7187C0;
	}
	.list-item-momo-mobile{
		position: absolute;
		zoom: 0.6;
		text-align: left;
		display: none;
		left: 20px;
		margin-top: -5px;
	}
	.list-item td:last-child{
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	.list-item td:first-child{
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}
	.list-item td{
		padding: 10px;
		background: #13181F;
		border-left: none;
		border-right: none;
		border-bottom: none;
	}
	#rentList{
		margin: 0px auto;
		margin-top: 20px;
	}
	.statistics-top-tab li.active{
		border-bottom: 4px solid #1B54F5;
		color: #fff;
		opacity: 1;
	}
	.statistics-top-tab li{
		padding: 10px;
		display: inline-block;
		cursor: pointer;
		min-width: 80px;
		text-align: center;
		font-size: 13px;
	}
	.statistics-top-tab{
		padding: 10px;
		padding-bottom: 0px;
		list-style: none;
		text-align: left;
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

		#market-pet-fitter{
			zoom: 0.8;
		}
	}
</style>