<template>
	<div>
		<div  class="tab-body tal">
			<div class="ly-input-content por">
				<p class="small tal">要冻结的MBOX数量</p>
				<div class="por mgt-5">
					<div  class="ly-input-pre-icon" :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75">
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="40" alt="" />
					</div>
					<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
						v-number :data-max="getMaxMbox" data-min="1" v-model="inputNum" placeholder="要冻结的MBOX数量" />
					<div class="dib tac" style="width: 30%">
						<button @click="inputNum = getMaxMbox" class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
				<div class="mgt-10 aveage-box small">
					<p class="tal">钱包余额</p>
					<p class="vertical-children tar">
						<span>{{coinArr["MBOX"].balance}} MBOX</span>
					</p>
				</div>

				<div class="tab-split mgt-10"></div>
				<section class="mgt-10" id="select-time">
					<p class="small">请选择冻结的时间</p>
					<div class="ly-input-content aveage-box tac">
						<p style="flex:0.5">短期</p>
						<div v-for="day in [7,15]" :key="day"><button class=" btn-small" :class="selectDay == day?'btn-primary':'btn-default' " @click="selectDay=day">{{day}} Days</button></div>
						<div></div>
					</div>
					<div class="ly-input-content aveage-box tac">
						<p  style="flex:0.5">中期</p>
						<div v-for="day in [30,90,180]" :key="day"><button class=" btn-small" :class="selectDay == day?'btn-primary':'btn-default' " @click="selectDay=day">{{day}} Days</button></div>
					</div>
					<div class="ly-input-content aveage-box tac">
						<p  style="flex:0.5">长期</p>
						<div v-for="day in [365,730,1095]" :key="day"><button class=" btn-small" :class="selectDay == day?'btn-primary':'btn-default' " @click="selectDay=day">{{day}} Days</button></div>
					</div>
				</section>

				<div class="tac mgt-10">
					<p v-if="Number(inputNum) > 0">冻结可获得: <span class="notice-color">{{getCanFreezeVeMbox}}</span> veMBOX</p>
					<StatuButton class="mgt-10" :isDisable="Number(inputNum) <= 0" :isLoading="lockBtn.freezeMboxLock > 0" :onClick="freeze">确定冻结</StatuButton>
				</div>
				
			</div>

		</div>

		<div class="tab-body mgt-10">
			<div class="tab-content tal">
				<section >
					<p class="small">挖矿倍率计算器</p>
					<div class="range-select mgt-10">
						<vue-slider v-model="sliderValue" :min="1" :max="3" :interval="0.02" :marks="marks"   :tooltip="'always'" :tooltip-placement="'bottom'" :tooltip-formatter="'{value}x'"/>
					</div>
				</section>
				<section class="mgt-10 tac">
					<p>达到1.2x需要：5000 veMBOX</p>
					<p>您还需要：5000 MBOX</p>
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
				"2": "2x",
				"3": "3x",
			},
			selectDay: 1095,
			freezeConf:{
				"7": {veMBOX: 0.1, orderIndex: 0},
				"15": {veMBOX: 0.205, orderIndex: 0},
				"30": {veMBOX: 0.42, orderIndex: 1},
				"90": {veMBOX: 1.28, orderIndex: 1},
				"180": {veMBOX: 2.54, orderIndex: 1},
				"365": {veMBOX: 5, orderIndex: 2},
				"730": {veMBOX:10, orderIndex: 2},
				"1095": {veMBOX: 15, orderIndex: 2},
			}
		})
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
	},
	methods: {
		freeze(){

		}
	}
}
</script>

<style>
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
