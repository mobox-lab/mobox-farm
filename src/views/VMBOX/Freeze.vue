<template>
	<div>
		<div  class="tab-body tal">
			<div class="ly-input-content por">
				<p class="small tal">{{$t("Air-drop_156")}}</p>
				<div class="por mgt-5">
					<div  class="ly-input-pre-icon" :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75">
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="40" alt="" />
					</div>
					<input class="ly-input dib" type="text" style=" text-align: center; width: 100%; padding-left: 50px; "
						v-number :data-max="getMaxMbox" data-min="1"  v-model="inputNum" :placeholder="$t('Air-drop_156')" />
					<!-- <div class="dib tac" style="width: 30%">
						<button @click="inputNum = getMaxMbox" class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div> -->
				</div>
				<div class="mgt-10 aveage-box small">
					<p class="tal">{{$t('Air-drop_11')}}</p>
					<p class="vertical-children tar">
						<span>{{coinArr["MBOX"].balance}} MBOX</span>
					</p>
				</div>

				<div class="tab-split mgt-10"></div>
				<section class="mgt-10" id="select-time">
					<p class="small">{{$t('Air-drop_157')}}</p>
					<div class="ly-input-content aveage-box tac">
						<p style="flex:0.5">{{$t('Air-drop_173')}}</p>
						<div v-for="day in [7,15]" :key="day"><button class=" btn-small" :class="selectDay == day?'btn-primary':'btn-default' " @click="selectDay=day">{{$t(freezeConf[day].lang)}}</button></div>
						<div></div>
					</div>
					<div class="ly-input-content aveage-box tac">
						<p  style="flex:0.5">{{$t('Air-drop_174')}}</p>
						<div v-for="day in [30,90,180]" :key="day"><button class=" btn-small" :class="selectDay == day?'btn-primary':'btn-default' " @click="selectDay=day">{{$t(freezeConf[day].lang)}}</button></div>
					</div>
					<div class="ly-input-content aveage-box tac">
						<p  style="flex:0.5">{{$t('Air-drop_175')}}</p>
						<div v-for="day in [365,730,1095]" :key="day"><button class=" btn-small" :class="selectDay == day?'btn-primary':'btn-default' " @click="selectDay=day">{{$t(freezeConf[day].lang)}}</button></div>
					</div>
				</section>

				<div class="tac mgt-10">
					<p v-if="Number(inputNum) > 0">{{$t('Air-drop_166')}}: <span class="notice-color">{{getCanFreezeVeMbox}}</span> veMBOX</p>
					<!-- <StatuButton class="mgt-10" :isDisable="Number(inputNum) <= 0" :isLoading="lockBtn.freezeMboxLock > 0" :onClick="freeze">确定冻结</StatuButton> -->

					<div  :class="{'btn-group': coinArr['MBOX'].allowanceToVeMbox == 0}">
					<StatuButton :isLoading="coinArr['MBOX'].isApproving" data-step="1" class="mgt-10" style="width:70%" :onClick="approve.bind(this, 'MBOX')" v-if="coinArr['MBOX'].allowanceToVeMbox == 0">{{$t("Air-drop_16")}} MBOX</StatuButton>
					<StatuButton :isLoading="lockBtn.freezeMboxLock > 0" :isDisable="coinArr['MBOX'].allowanceToVeMbox <= 0 || Number(inputNum) <= 0" data-step="2" class="mgt-10" style="width:70%"  :onClick="freeze">
						{{$t('Air-drop_171')}}
					</StatuButton>
				</div>


				</div>
				
			</div>

		</div>

		<div class="tab-body mgt-10" v-if="oprData.coinKey != 'GOV' ">
			<div class="tab-content tal">
				<section >
					<p class="small">{{$t('Air-drop_167')}}</p>
					<section class="mgt-10 tac" v-if="!hasStakeCoin">
						{{$t("Air-drop_186")}}
					</section>
					<section class="mgt-10 tac" v-else  style="width:90%;margin:10px auto">
						<!-- <p class="aveage-box">
							<span class="tal">{{$t('Air-drop_168')}}:</span>
							<span class="tal mgl-5">{{ getTotalVeMbox }} veMBOX</span>
						</p>
						<p class="aveage-box">
							<span class="tal">{{$t('Air-drop_169').replace("#0#", sliderValue+"x")}}:</span>
							<span class="tal mgl-5">{{getNeedVeMboxObj.veMbox}} veMBOX</span>
						</p>
						<p class="aveage-box">
							<span class="tal">{{$t('Air-drop_170')}}:</span>
							<span class="tal mgl-5">{{ getNeedVeMboxObj.mbox }} MBOX</span>
						</p> -->
						<table  class="tal mgt-10 my-table small"  style="width:100%;margin:10px auto;border-color:#19233E" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td>{{$t('Air-drop_168')}}:</td>
								<td>{{ getTotalVeMbox }} veMBOX</td>
							</tr>
							<tr>
								<td style="width:55%">{{$t('Air-drop_169').replace("#0#", sliderValue+"x")}}:</td>
								<td>{{getNeedVeMboxObj.veMbox}} veMBOX</td>
							</tr>
							<tr>
								<td>{{$t('Air-drop_170')}}:</td>
								<td>{{ getNeedVeMboxObj.mbox }} MBOX</td>
							</tr>
						</table>
					</section>

					<div class="range-select mgt-10">
						<vue-slider v-model="sliderValue" :min="1" :max="3" :interval="0.02" :marks="marks"   :tooltip="'always'" :tooltip-placement="'bottom'" :tooltip-formatter="'{value}x'"/>
					</div>
				</section>
				
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { StatuButton } from '@/components';
import CommonMethod from "@/mixin/CommonMethod";
import { Wallet } from '@/utils';
import { PancakeConfig , WalletConfig} from '@/config';

export default {
	mixins: [CommonMethod],
	components: {VueSlider, StatuButton},
	props: ["oprData"],
	data(){
		return({
			inputNum: "",
			sliderValue: 3,
			marks: {
				"1": "1x",
				"1.5": "1.5x",
				"2": "2x",
				"2.5": "2.5x",
				"3": "3x",
			},
			selectDay: 1095,
			freezeConf:{
				"7": {veMBOX: 0.1, orderIndex: 0,timeIndex: 0, lang: "Air-drop_158"},
				"15": {veMBOX: 0.205, orderIndex: 0,timeIndex: 1, lang: "Air-drop_159"},
				"30": {veMBOX: 0.42, orderIndex: 1,timeIndex: 2, lang: "Air-drop_160"},
				"90": {veMBOX: 1.28, orderIndex: 1,timeIndex: 3, lang: "Air-drop_161"},
				"180": {veMBOX: 2.54, orderIndex: 1,timeIndex: 4, lang: "Air-drop_162"},
				"365": {veMBOX: 5, orderIndex: 2,timeIndex: 5, lang: "Air-drop_163"},
				"730": {veMBOX:10, orderIndex: 2,timeIndex: 6, lang: "Air-drop_164"},
				"1095": {veMBOX: 15, orderIndex: 2,timeIndex: 7, lang: "Air-drop_165"},
			},
		})
	},
	watch: {
		oprData: function(){
			this.inputNum = "";
			this.selectDay = 1095;
			this.sliderValue = 3;
		}
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		getMaxMbox(){
			return this.coinArr["MBOX"].balance;
		},
		getCanFreezeVeMbox(){
			let freezeConf = this.freezeConf[this.selectDay];
			return this.numFloor(freezeConf.veMBOX * Number(this.inputNum), 1e4);
		},
		getTotalVeMbox(){
			let coinKey = this.oprData.coinKey;
			if(coinKey == "") return 0;
			let orderIndexs = this.coinArr[coinKey].veMbox.orderIndexs;
			return  this.numFloor( (Number(orderIndexs[0].veMboxNum) + Number(orderIndexs[1].veMboxNum) + Number(orderIndexs[2].veMboxNum)) /1e18, 1e6) || "0" ;
		},
		//获取达到相应倍数还需要的对象
		getNeedVeMboxObj(){
			let needObj = {
				veMbox: 0,
				mbox: 0,
			}
			let coinObj = this.coinArr[this.oprData.coinKey];
			if(coinObj){
				let {shareTotal, veMoboxSupply, myShare} = coinObj;
				let y = (this.sliderValue - 1)/2 *(myShare / shareTotal);
				needObj.veMbox = this.numFloor((y*(veMoboxSupply - this.getTotalVeMbox*1e18)/(1-y) - this.getTotalVeMbox*1e18)/1e18, 1e4);
				if(veMoboxSupply == 0 || veMoboxSupply <= this.getTotalVeMbox * 1e18 || myShare >= Number(shareTotal)) {
					needObj.veMbox = 0.1;
				}
				//如果池子里面都是我的 并且我已经质押过 就不需要质押了
				if(myShare >= Number(shareTotal) && this.getTotalVeMbox > 0){
					needObj.veMbox = 0;
				}
				if(Number(needObj.veMbox) < 0) needObj.veMbox = 0;
				let freezeConf = this.freezeConf[this.selectDay];
				needObj.mbox = this.numFloor(needObj.veMbox / freezeConf.veMBOX, 1e4);
			}
			return needObj;
		},
		//是否质押了LP
		hasStakeCoin(){
			return !(this.oprData.coinKey != '' && this.coinArr[this.oprData.coinKey].wantAmount <= 0)
		}
	},
	async created(){
		await Wallet.ETH.getAccount();
		await this.setAllowance("MBOX");
	},
	methods: {
		async setAllowance(coinKey){
			if(coinKey != "" && coinKey != "BNB" && this.coinArr[coinKey].allowanceToVeMbox == -1) {
				let allowance = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinKey].addr , WalletConfig.ETH.momoVeMbox, false);
				this.coinArr[coinKey].allowanceToVeMbox = Number(allowance);
				this.coinArr["ts"] = new Date().valueOf();
			}
		},

		async approve(coinKey){
			if(coinKey == "" || coinKey == "BNB") return;
			let {isApproving, allowanceToVeMbox} =  this.coinArr[coinKey];
			if(isApproving || Number(allowanceToVeMbox) >1e8) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin[coinKey].addr, 
			WalletConfig.ETH.momoVeMbox, {coinKey, type:"allowanceToVeMbox"});
			if(hash){
				this.coinArr[coinKey].isApproving = true;
			}
		},

		//冻结
		async freeze(){
			let {coinKey} = this.oprData;
			//判断是否有需要取回的MBOX
			let orderIndex_ = this.freezeConf[this.selectDay].orderIndex;
			let {orderIndexsCountDown, orderIndexs} = this.coinArr[coinKey].veMbox;
			if(orderIndexsCountDown[orderIndex_] <=0 && orderIndexs[orderIndex_].stakeMbox > 0){
				this.showNotify(this.$t("Air-drop_185"), "error");
				return;
			}

			let amount_ = Number(this.inputNum);
			if(amount_ <= 0) return;
			if(amount_ > Number(this.coinArr["MBOX"].balance)){
				this.getConfirmDialog().show(this.$t('Common_30'), ()=>this.showSwapBox());
				return;
			}

			let obj = {
				poolIndex_:coinKey == "GOV"?100001:PancakeConfig.StakeLP[coinKey].pIndex,
				amount_,
				lockTime_: this.freezeConf[this.selectDay].timeIndex, 
				orderIndex_,
			}
			console.log(obj);
			let hash = await Wallet.ETH.stakeMbox(obj, this.coinArr[coinKey]);
			if(hash){
				this.inputNum = "";
				this.lockBtnMethod("freezeMboxLock");
			}
		}
	}
}
</script>

<style>
	.my-table td{
		padding: 5px 5px;
		border: 1px solid #363636;
		border-radius: 2px;
	}
	.vue-slider-rail{
		background: #6783B3 !important;
	}
	.vue-slider-mark{
		cursor: pointer;
	}
	.vue-slider-dot-handle{
		border: 2px solid #6783B3 !important;
	}
	.vue-slider-process{
		background: #93FFDB !important;
	}
	.vue-slider-mark-step{
		box-shadow: 0 0 0 2px #6783B3 !important;
		background: #6783B3 !important;
	}
	.vue-slider-mark-step-active{
		box-shadow: 0 0 0 2px #93FFDB !important;
		background: #93FFDB !important;
	}
	.vue-slider-mark-label{
		color: #93FFDB;
		font-size: 14px;
	}
	.vue-slider-dot-tooltip-inner{
		border-color: #2A3B67;
		background-color: #2A3B67;
	}
	.range-select{
		background: rgba(0,0,0,0.3);
		border-radius: 10px;
		padding: 20px;
		padding-bottom: 50px;
	}
	#select-time .btn-small{
		width: 90%;
	}
</style>
