<template>
	<Dialog id="exchange-halloween-dialog" :top="100" :width="500">
		<div id="data-view" class="por">
			<img id="zhizhu2" src="@/assets/halloween/zhizhu-pa.gif" alt=""/>
			<img id="ng3" src="@/assets/halloween/nangua-idle.gif" alt="" height="130"/>
			<img id="ng4" src="@/assets/halloween/nangua2-idle.gif" alt="" height="130"/>
			<div class="tal">{{$parent.suteData[$parent.sutePos]}}</div>
			<div class="mgt-20 data-view-content" style="padding:20px">
				<div class="tal">{{$t("Festival_20").replace("#0#", exchangeData.maxNum)}}</div>
				<div class="por mgt-5">
					<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; "
						v-int :data-max="parseInt(exchangeData.maxNum) || 0"  v-model="exchangeNum" />
					<div class="dib" style="width: 30%">
						<button @click="exchangeNum = parseInt(exchangeData.maxNum) || 0" class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<div class="mgt-20" v-if="Number(exchangeNum) > 0">
				<p>{{$t("Festival_23")}}</p>
				<div class="vertical-children mgt-10">
					<img class="mgl-5" src="@/assets/coin/MBOX.png" height="24" alt="">
					<span class="mgl-5">{{numFloor(getExchangePrice.mbox, 1e2)}}</span>
					<img class="mgl-10" src="@/assets/halloween/lg.png" alt="" height="24">
					<span class="mgl-5" >{{numFloor(getExchangePrice.score, 1e2)}}</span>
				</div>
			</div>
			<div class="mgt-20">
				<div class="btn-halloween" @click="exchange">{{$t("Festival_24")}}</div>
			</div>
		</div>
	</Dialog>
</template>

<script>
import { CommonMethod } from '@/mixin';
import { Dialog } from '@/components';
import { Wallet } from '@/utils';
import { HttpConfig } from "@/config";
import axios from 'axios';

export default {
	mixins: [CommonMethod],
	components: {Dialog},
	props: ["exchangeData"],
	data(){
		return({
			exchangeNum: "",
		})
	},
	computed: {
		getExchangePrice(){
			let {suitScore,suitPrices, sutePosToId, sutePos} = this.$parent;
			let obj = {
				mbox: suitPrices[sutePosToId[sutePos]] * Number(this.exchangeNum),
				score: suitScore[sutePosToId[sutePos]] * Number(this.exchangeNum),
			}

			return obj;
			
		}
	},
	methods: {
		async exchange(){
			let myAddr = await Wallet.ETH.getAccount();
			let num = Number(this.exchangeNum);
			if(num == 0) return;
			let sign = await this.$parent.getSign();
			let data = {
				addr: myAddr,
				sign,
				suit_id: this.exchangeData.suteId,
				num,
			}

			console.log(data);
			let res = await axios.post(HttpConfig.Halloween.Exchange, data);
			console.log(res);
			if(res.data.code == 1011){
				this.showNotify("数量不足", "error");
			}else{
				this.$parent.setBagsData(res.data.data);
				this.oprDialog("exchange-halloween-dialog", "none")
				this.showNotify("兑换成功", "success");
				this.exchangeNum = "";
			}
			
		},
		show(){
			this.oprDialog("exchange-halloween-dialog", "block");
			this.exchangeNum = this.exchangeData.maxNum;
		}
	}
}
</script>
<style scoped>
	#zhizhu2{
		position: absolute !important;
		transform: rotateY(-180deg);
		right: 0px;
		top: 0px;
		z-index: 1;
		width: 120px;
	}
	#data-view .data-view-content{
		position: relative;
		z-index: 2;
	}
	#ng3{
		position: absolute;
		z-index: 11;
		top: -30px;
		height: 100px;
		right: 50px;
		transform: rotate(20deg);

	}
	#ng4{
		position: absolute;
		z-index: 10;
		top: -10px;
		right: 130px;
		height: 80px;
		transform: rotate(-20deg);
	}
</style>
