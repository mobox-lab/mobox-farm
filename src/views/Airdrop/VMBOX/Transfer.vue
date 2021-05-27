<template>
	<div  class="tab-body tal">
		<div class="tab-content por">
			<p>请选择veMBOX的周期类型</p>
			<div class="aveage-box tac mgt-10" id="select-type">
				<p><button class="btn-primary btn-small">短期</button></p>
				<p><button class="btn-default btn-small">中期</button></p>
				<p><button class="btn-default btn-small">长期</button></p>
			</div>
			<p class="tac mgt-10">(非同一周期类型的veMBOX不能互相划转)</p>
		</div>
		<div class="tab-split mgt-10"></div>
		<div class="tab-content">
			<!-- From -->
			<div class="tab-panel">
				<div class="aveage-box">
					<p class="tal small vertical-children">
						<span>{{$t("Air-drop_35")}}</span>&nbsp;
						<span v-if="from.isEstimated && Number(from.inputValue) > 0">{{$t("Air-drop_37")}}</span>&nbsp;
						<Loading  v-if="from.loading" />
					</p>
					<p class="tar small">{{$t("Mine_05")}}: {{from.coinName==""?"-":coinArr[from.coinName].balance}} veMBOX</p>
				</div>
				<div class="aveage-box vertical-children mgt-10" >
					<div  style="flex:1 1 auto">
						<input style="width:100%" type="text" placeholder="0.0" v-model="from.inputValue" v-number @keyup="inputValueChange('from')">
					</div>
					<p class="text-btn tac"  v-if="from.coinName != ''" @click="maxInputFrom();inputValueChange('from')">Max</p>
					<p class="tar cur-point text-btn vertical-children" @click="openSelectPool('from')">
					<!-- <p class="tar cur-point text-btn vertical-children" > -->
						<span  v-if="from.coinName != '' ">
							<div  :class="from.isLP?'double-img':'' " v-if="from.coinName != ''" style="height:40px;zoom:0.5" class="dib por">
								<img v-for="(name, key) in from.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="20" alt="" />
							</div>
							<span class="mgl-5">{{from.coinName}}</span>
						</span>
						<span v-else>{{$t("Air-drop_38")}}</span>
						<svg viewBox="0 0 24 24"  width="20px" ><path fill="#94BBFF" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
					</p>
				</div>
			</div>
			<div class="mgt-10 tac">
				<button class="icon-btn">
					<svg viewBox="0 0 24 24"  width="24px" ><path fill="#94BBFF" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				</button>
			</div>
			<!-- To -->
			<div class="tab-panel mgt-10">
				<div class="aveage-box">
					<p class="tal small vertical-children">
						<span>{{$t("Air-drop_36")}}</span>&nbsp;
						<span v-if="to.isEstimated && Number(to.inputValue) > 0">{{$t("Air-drop_37")}}</span>&nbsp;
						<Loading  v-if="to.loading" />
					</p>
					<p class="tar small">{{$t("Mine_05")}}: {{to.coinName==""?"-":coinArr[to.coinName].balance}} veMBOX</p>
				</div>
				<div class="aveage-box vertical-children mgt-10">
					<div style="flex:1 1 auto;">
						<input style="width:100%" type="text" placeholder="0.0" v-model="to.inputValue" v-number @keyup="inputValueChange('to')">
					</div>
					<p class="tar text-btn vertical-children" @click="openSelectPool('to')">
					<!-- <p class="tar text-btn vertical-children" > -->
						<span  v-if="to.coinName != '' ">
							<div  :class="to.isLP?'double-img':'' " v-if="to.coinName != ''" style="height:40px;zoom:0.5" class="dib por">
								<img v-for="(name, key) in to.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="20" alt="" />
							</div>
							<span class="mgl-5">{{to.coinName}}</span>
						</span>
						<span v-else>{{$t("Air-drop_38")}}</span>
						<svg viewBox="0 0 24 24"  height="20px" ><path fill="#94BBFF" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
					</p>
				</div>
			</div>

			<div class="mgt-20 tac">
				<StatuButton>确定划转</StatuButton>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { StatuButton } from '@/components';

export default {
	components: {StatuButton},
	data(){
		return({
			from: {
				coinName: "MBOX-BNB",
				isLP: true,
				inputValue: "",
				isEstimated: false, // 是否为预估的
				loading: false,
			},
			to: {
				coinName: "",
				inputValue: "",
				isLP: true,
				isEstimated: false,// 是否为预估的
				loading: false,
			},
			timer: null,
			stepTime: 500,
		})
	},
	computed:{
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
	},
	created(){
		console.log(this);
	},
	methods: {
		openSelectPool(type){
			this.$parent.$parent.$refs.selectOprPool.setOprData([this.from.coinName, this.to.coinName], this.onSelectPool.bind(this, type)).show();
		},
		onSelectPool(type, coinName){
			console.log({type, coinName});
			this[type].coinName = coinName;
		},
	}
}
</script>


<style scoped>
	#select-type .btn-small{
		width: 80%;
	}
</style>