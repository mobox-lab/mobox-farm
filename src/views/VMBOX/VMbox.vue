<template>
	<section>
		<Dialog id="vmbox-dialog" :top="100" :width="420">
			<!-- TabMenu -->
			<div class="tal mgt-10">
				<div @click="dialog_tab_pos =  0"  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >{{$t("Air-drop_153")}}</div>
				<div @click="dialog_tab_pos =  1"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  >{{$t("Air-drop_154")}}</div>
				<div @click="dialog_tab_pos =  2"  :class="dialog_tab_pos == 2?'active':''"  class="tab-menu por" >
					<span class="notice" v-if="hasMboxToRetrieve"></span>
					{{$t("Air-drop_155")}}
				</div>
			</div>

			<!-- TabBody -->
			<div class="por">
				<div class="pancake-setting"  >
					<div class="dib por">
						<svg @click="getLog(); oprDialog('vembox-log-dialog','block')" viewBox="0 0 24 24" class="mgl-5 cur-point" width="24px" ><path fill="#838689" d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" ></path></svg>
					</div>
				</div>
				<Freeze :oprData="oprData" v-show="dialog_tab_pos == 0" />
				<Transfer :oprData="oprData" v-show="dialog_tab_pos == 1" />
				<Retrieve :oprData="oprData" v-show="dialog_tab_pos == 2" />
			</div>
		</Dialog>

		<SelectOprPool ref="selectOprPool"  />
		<VeMboxLog />

	</section>
</template>

<script>
import { Dialog } from '@/components';
import CommonMethod from "@/mixin/CommonMethod";
import Freeze from './Freeze';
import Transfer from './Transfer';
import Retrieve from './Retrieve';
import SelectOprPool from './SelectOprPool';
import VeMboxLog from './VeMboxLog'
import { Wallet, Http } from '@/utils';
import { PancakeConfig } from '@/config';
import { mapState } from 'vuex'

let timer = null;
export default {
	mixins: [CommonMethod],
	components :{Dialog, Freeze, Transfer, Retrieve, SelectOprPool, VeMboxLog},
	data(){
		return({
			dialog_tab_pos: 0,
			oprData: {
				coinKey: "",
				coinName: "",
				isLP: true,
			},
			myAddr: "",
		})
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		getVeMboxObj(){
			let veMboxObj = {
				mul: 100, //倍率
				orderIndexs: {
					"0": {stakeMbox: 0,endTime: 0, veMboxNum: 0,},
					"1": {stakeMbox: 0,endTime: 0, veMboxNum: 0,},
					"2": {stakeMbox: 0,endTime: 0, veMboxNum: 0,},
				},
				orderIndexsCountDown: {
					"0": -1,
					"1": -1,
					"2": -1,
				}
			};
			let coinObj = this.coinArr[this.oprData.coinKey];
			if(coinObj){
				veMboxObj = coinObj.veMbox;
			}
			return veMboxObj;
		},
		//是否有需要领取的MBOX
		hasMboxToRetrieve(){
			let hasToRetrieve = false;
			for (let key in this.getVeMboxObj.orderIndexsCountDown) {
				if(this.getVeMboxObj.orderIndexsCountDown[key] == 0 && this.getVeMboxObj.orderIndexs[key].stakeMbox > 0){
					hasToRetrieve = true;
				}
			}
			return hasToRetrieve;
		},
	},
	async created(){
		this.myAddr = await Wallet.ETH.getAccount();
		this.getLog();
		timer = setInterval(()=>{
			this.getLog();
		}, 10000)
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		async getLog(){
			if(this.myAddr == "") return;
			let log = await Http.getVeMboxLog(this.myAddr);
			if(log){
				this.$store.commit("bnbState/setData", {veMboxLogs: log.list});
			}
		},
		async getPoolVeMobox(){
			if(this.oprData.coinKey == "") return;
			let pIndex = this.oprData.coinKey == "GOV"?"100001":PancakeConfig.StakeLP[this.oprData.coinKey].pIndex;
			let res = await Wallet.ETH.getPoolVeMobox(pIndex);
			let apyParam = await Wallet.ETH.getUserPoolsApyParam([pIndex]);

			this.coinArr[this.oprData.coinKey].shareTotal = res.shareTotal;
			this.coinArr[this.oprData.coinKey].myShare = apyParam.wantShares[0];
			this.coinArr[this.oprData.coinKey].veMoboxSupply = res.veMoboxSupply;
			this.coinArr[this.oprData.coinKey]["ts"] = new Date().valueOf();
		},
		show(pos = 0){
			this.dialog_tab_pos = pos;
			this.oprDialog("vmbox-dialog","block");
			this.getPoolVeMobox();
			return this;
		},
		close(){
			this.oprDialog("vmbox-dialog","none")
			return this;
		},
		setOprData(item){
			this.oprData = item;
			return this;
		},
	}
}
</script>

<style scoped>
	.pancake-setting{
		position: absolute;
		right: 5px;
		top: -30px;
		z-index: 998
	}
</style>
