<template>
	<Dialog id="pancake-setting" :top="100" :width="400">
		<h2>Settings</h2>
		<div class="ly-input-content mgt-10">
			<div class="tal">
				<p>Slippage tolerance</p>
				<div class="aveage-box mgt-10">
					<input type="text" class="ly-input"  style="flex:1 1 auto" v-model="setting.slippage"  v-number placeholder="0.5"> 
					<p  class="tac">%</p>
				</div>
				<div class=" mgt-10">
					<button :class="Number(setting.slippage) == 0.1?'btn-primary':'btn-default' " @click="setting.slippage = 0.1">0.1%</button>&nbsp;
					<button :class="Number(setting.slippage) == 0.5?'btn-primary':'btn-default' " @click="setting.slippage = 0.5">0.5%</button>&nbsp;
					<button :class="Number(setting.slippage) == 1?'btn-primary':'btn-default' " @click="setting.slippage = 1">1%</button>
				</div>
				<p class="color-danger small mgt-10" v-if="Number(setting.slippage) < 0.5 && Number(setting.slippage) > 0">Your transaction may fail</p>
				<p class="color-danger small mgt-10" v-if="Number(setting.slippage) == 0">Enter a valid slippage percentage</p>
			</div>
			<div class="mgt-20 tal">
				<p>Transaction deadline</p>
				<div class="aveage-box mgt-10">
					<input type="number" class="ly-input" style="flex:1 1 auto" v-model="setting.duration" v-int placeholder="20"> 
					<p  class="tac" style="padding:0px 10px">Minutes</p>
				</div>
				<p class="color-danger small mgt-10" v-if="setting.duration == '' ">Enter a valid deadline</p>
			</div>
		</div>
	</Dialog>
</template>

<script>
import { Dialog } from '@/components';
import { CommonMethod } from '@/mixin';
import { mapState } from 'vuex'

export default {
	mixins: [CommonMethod],
	components: {Dialog},
	computed: {
		...mapState({
			setting: (state) => state.bnbState.data.setting,
		}),
	},
	methods: {
		show(){
			this.oprDialog("pancake-setting","block");
			return this;
		},
		close(){
			this.oprDialog("pancake-setting","none")
			return this;
		},
	}
}
</script>