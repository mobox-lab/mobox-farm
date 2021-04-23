<template>
	<div >
		<Dialog id="pancake-dialog" :top="100" :width="420" >
			<!-- TabMenu -->
			<div class="tal mgt-10">
				<div @click="dialog_tab_pos =  0"  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >{{$t("Air-drop_29")}}</div>
				<div @click="dialog_tab_pos =  1"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  v-if="oprData.isLP">{{$t("Air-drop_30")}}</div>
				<div @click="dialog_tab_pos =  1"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  v-if="!oprData.isLP">{{$t("Air-drop_07")}}</div>
				<a href="https://www.binance.org/cn/bridge" target="_blank" class="tab-menu ">{{$t("Air-drop_31")}}</a>
			</div>
			<!-- TabBody -->
			<div class="por">
				<div class="pancake-setting"  v-if="oprData.isLP || dialog_tab_pos != 1 ">
					<div class="dib por">
						<svg @click="$refs.setting.show()" viewBox="0 0 24 24" width="24px" class="cur-point"  ><path fill="#91BAFF" d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"></path></svg>
						<span class="notice" v-if="setting.duration == '' || Number(setting.slippage) < 0.5 "></span>
					</div>
					<div class="dib por">
						<svg @click="oprDialog('pancake-history-dialog','block')" viewBox="0 0 24 24" class="mgl-5 cur-point" width="24px" ><path fill="#91BAFF" d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" ></path></svg>
					</div>
				</div>
				<div v-show="dialog_tab_pos == 0">
					<PancakeSwap ref="pancakeSwap" :oprData="oprData" />
				</div>
				<div v-show="dialog_tab_pos == 1">
					<PancakeLiquidity ref="pancakeLiquidity" :oprData="oprData" />
				</div>
			</div>
		</Dialog>
		<Dialog id="pancake-history-dialog" :top="100" :width="500" style="min-height:100px">
			<h2>{{$t("Air-drop_45")}}</h2>
			<div class="tab-body mgt-10" >
				<div class="tab-panel" style="min-height:200px">
					<table style="width:100%">
						<tr v-for="item in [...pancakeHistory].reverse()" :key="item.hash" class="tal" >
							<td style="width:30px;padding-top:5px">
								<svg v-if="item.type == 'success'" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2029" width="20" height="20"><path d="M512 0C229.216 0 0 229.248 0 512c0 282.784 229.216 512 512 512 282.752 0 512-229.216 512-512 0-282.752-229.248-512-512-512z m292.608 357.024l-320 384c-12.128 14.56-30.08 23.008-49.024 23.072h-0.128a63.936 63.936 0 0 1-48.992-22.88l-167.52-199.488a64 64 0 1 1 97.952-82.368l118.336 140.96 271.04-325.248a64.032 64.032 0 0 1 98.336 81.952z" p-id="2030" fill="#67c23a"></path></svg>
								<svg v-else viewBox="0 0 1024 1024" width="20" height="20">
									<path fill="#f56c6c" d="M512 12.130462c-69.474462 0-134.915938 13.122954-196.324431 39.384615-61.392738 26.245908-114.908554 62.196185-160.5632 107.835077C109.489231 205.0048 73.507446 258.520615 47.261538 319.929108 20.999877 381.321846 7.876923 446.763323 7.876923 516.237785s13.122954 134.915938 39.384615 196.32443c26.261662 61.392738 62.211938 114.924308 107.850831 160.5632 45.654646 45.654646 99.170462 81.604923 160.5632 107.850831 61.408492 26.261662 126.849969 39.384615 196.324431 39.384616s134.915938-13.122954 196.324431-39.384616c61.392738-26.245908 114.908554-62.196185 160.5632-107.850831 45.638892-45.638892 81.604923-99.170462 107.850831-160.5632 26.261662-61.408492 39.384615-126.834215 39.384615-196.32443 0-69.474462-13.122954-134.915938-39.384615-196.308677-26.261662-61.408492-62.211938-114.924308-107.850831-160.578954-45.654646-45.638892-99.170462-81.604923-160.5632-107.850831C646.915938 25.253415 581.474462 12.130462 512 12.130462z m0 790.102646c-16.163446 0-29.885046-5.655631-41.196308-16.966893-11.311262-11.311262-16.966892-25.048615-16.966892-41.196307 0-16.163446 5.655631-29.9008 16.966892-41.212062 11.311262-11.311262 25.048615-16.966892 41.196308-16.966892 16.163446 0 29.885046 5.671385 41.196308 16.966892 11.311262 11.311262 16.966892 25.048615 16.966892 41.212062 0 16.147692-5.655631 29.885046-16.966892 41.196307-11.311262 11.311262-25.048615 16.966892-41.196308 16.966893z m58.1632-252.061539c0 16.163446-5.655631 29.9008-16.966892 41.196308-11.311262 11.311262-25.048615 16.966892-41.196308 16.966892-16.163446 0-29.885046-5.655631-41.196308-16.966892-11.311262-11.295508-16.966892-25.048615-16.966892-41.196308v-271.438769c0-16.163446 5.655631-29.9008 16.966892-41.212062C482.114954 226.209477 495.852308 220.553846 512 220.553846c16.163446 0 29.885046 5.655631 41.196308 16.966892 11.311262 11.311262 16.966892 25.048615 16.966892 41.196308v271.454523z"></path>
								</svg >
							</td>
							<td >
								<a :href="'https://bscscan.com/tx/' + item.hash" target="_blank" style="text-decoration: underline;" class="vertical-children" :class="'color-'+item.type">
									<span >{{item.msg}}</span>
									<img src="../../assets/icon/viewTx.png" class="mgl-10 hide-xs" height="20" alt="" />
								</a>
							</td>
						</tr>
					</table>
					<div class="tac mgt-20" v-if="pancakeHistory.length == 0">{{$t("Air-drop_46")}}</div>
				</div>
			</div>
		</Dialog>
		<SelectCoin ref="selectCoin"  />
		<Setting ref="setting" />
	</div>
</template>
<script>
import { Dialog } from '@/components';
import {CommonMethod} from '@/mixin';
import SelectCoin from '@/views/Airdrop/SelectCoin' ;
import PancakeSwap from '@/views/Airdrop/PancakeSwap';
import PancakeLiquidity from '@/views/Airdrop/PancakeLiquidity';
import Setting from '@/views/Airdrop/Setting';
import { mapState } from 'vuex'
import {PancakeConfig} from "@/config";

export default {
	name: "Pancake",
	mixins: [CommonMethod],
	components: {Dialog, SelectCoin, PancakeSwap, PancakeLiquidity, Setting},
	computed: {
		...mapState({
			setting: (state) => state.bnbState.data.setting,
			coinArr: (state) => state.bnbState.data.coinArr,
			pancakeHistory: (state) => state.bnbState.data.pancakeHistory,
			pledgeType: (state) => state.bnbState.data.pledgeType,
		}),
		oprData(){
			let coinName = this.oprCoinName;
			let stakeLP = PancakeConfig.StakeLP;
			let coinArr = this.coinArr;
			return {coinName, ...stakeLP[coinName], ...coinArr[coinName]}
		},
	},
	data() {
		return {
			dialog_tab_pos: 1,
			hasGetCoinValue: false,
			oprCoinName: "",
		};
	},
	
	watch: {
		dialog_tab_pos: function(newValue, oldValue){
			if(oldValue != newValue) {
				this.$refs.pancakeLiquidity.showAddLiquidityPanel = false;
				this.$refs.pancakeLiquidity.showRemoveLiquidityPanel = false;
			}
		}
	},
	methods: {
		show(type){
			this.oprDialog("pancake-dialog","block");
			this.dialog_tab_pos = type == "swap"?0:1;
			//初始化swap相关功能
			this.$refs.pancakeLiquidity.showRemoveLiquidityPanel = false;
			this.$refs.pancakeLiquidity.showAddLiquidityPanel = false;

			if(!this.hasGetCoinValue){
				this.hasGetCoinValue = true;
				this.$refs.selectCoin.getCoinValue();
			}
			return this;
		},
		showAddLiquidityPanel(){
			this.$refs.pancakeLiquidity.showAddLiquidityPanel = true;
			return this;
		},
		showRemoveLiquidityPanel(){
			this.$refs.pancakeLiquidity.showRemoveLiquidityPanel = true;
			return this;
		},
		close(){
			this.oprDialog("pancake-dialog","none")
			return this;
		},
		setOprData(data){
			console.log(data);
			this.oprCoinName = data.coinName;
			this.setting.pancakeVType = data.pancakeVType;
			this.$store.commit("bnbState/setData", {setting: this.setting});
			return this;
		},
	},
};
</script>

<style  scoped>
	.pancake-setting{
		position: absolute;
		right: 15px;
		top: 15px;
	}
</style>
