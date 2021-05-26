<template>
	<div  class="tab-body tal">
		<div class="ly-input-content por">
			<p class="small tal">要冻结的MBOX数量</p>
			<div class="por mgt-5">
				<div  class="ly-input-pre-icon" :class="oprData.isLP?'double-img':'' " v-if="oprData.coinName != ''" style="zoom: 0.75">
					<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="40" alt="" />
				</div>
				<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
					v-int :data-max="getMaxMbox" data-min="1" v-model="inputNum" placeholder="要冻结的MBOX数量" />
				<div class="dib tac" style="width: 30%">
					<button @click="inputNum = getMaxMbox" class="btn-primary btn-small" style="width: 80%" >
						Max
					</button>
				</div>
			</div>
			<div class="mgt-10 aveage-box small">
				<p class="tal">钱包余额</p>
				<p class="vertical-children tar">
					<span>300 MBOX</span>
				</p>
			</div>

			<div class="tab-split mgt-10"></div>
			<section class="mgt-10" id="select-time">
				<p class="small">请选择冻结的时间</p>
				<div class="ly-input-content aveage-box tac">
					<p>短期</p>
					<div><button class="btn-primary btn-small">7 D</button></div>
					<div><button class="btn-default btn-small">14 D</button></div>
					<div></div>
				</div>
				<div class="ly-input-content aveage-box tac">
					<p>中期</p>
					<div><button class="btn-default btn-small">1 M</button></div>
					<div><button class="btn-default btn-small">2 M</button></div>
					<div><button class="btn-default btn-small">3 M</button></div>
				</div>
				<div class="ly-input-content aveage-box tac">
					<p>长期</p>
					<div><button class="btn-default btn-small">1 Y</button></div>
					<div><button class="btn-default btn-small">2 Y</button></div>
					<div><button class="btn-default btn-small">3  Y</button></div>
				</div>
			</section>
			<div class="tab-split mgt-10"></div>
			<section class="mgt-10">
				<p class="small">请选择挖矿倍率</p>
				<div class="range-select mgt-10"></div>
			</section>
			<section class="mgt-10 tac">
				<p>达到1.2x需要：5000 veMBOX</p>
				<p>您还需要：5000 MBOX</p>
				<button class="btn-primary mgt-20">确定冻结</button>
			</section>
		</div>

	</div>
</template>

<script>

export default {
	data(){
		return({
			inputNum: "",
			oprData: {
				isLP: true,
				coinName: "MBOX-BNB"
			}
		})
	},
	computed: {
		getMaxMbox(){
			return 10
		}
	}
}
</script>

<style scoped>
	.range-select{
		background: rgba(0,0,0,0.3);
		height:50px;
		border-radius: 10px;
	}
	#select-time .btn-small{
		width: 80%;
	}
</style>
