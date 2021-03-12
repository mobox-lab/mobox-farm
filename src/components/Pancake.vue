<template>
	<Dialog id="pancake-dialog" :top="100" :width="400">
		<!-- TabMenu -->
		<div class="tal mgt-10">
			<div  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >Swap</div>
			<div  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu ">Liquidity</div>
			<div  :class="dialog_tab_pos == 2?'active':''"  class="tab-menu ">Bridge</div>
		</div>
		<!-- TabBody -->
		<div>
			<div v-show="dialog_tab_pos == 0">
				<div  class="tab-body tal">
					<div class="tab-content">
						<h2>Exchange</h2>
						<p class="small opa-6">Trade tokens in an instant</p>
					</div>
					<div class="tab-split"></div>
					<div class="tab-content">
						<div class="tab-panel">
							<div class="aveage-box">
								<p class="tal small">From</p>
								<p class="tar small">Balance: 0.23405</p>
							</div>
							<div class="aveage-box">
								<input style="flex:1 1 auto" type="text">
								<span>sssssssssssssssssssss</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Dialog>
</template>
<script>
import { Dialog } from '@/components';
import {CommonMethod} from '@/mixin';

export default {
	mixins: [CommonMethod],
	components: {Dialog},
	data() {
		return {
			dialog_tab_pos: 0
		};
	},
	methods: {
		show(){
			this.oprDialog("pancake-dialog","block")
		},
		close(){
			this.oprDialog("pancake-dialog","none")
		}
	},
};
</script>