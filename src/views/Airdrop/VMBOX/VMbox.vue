<template>
	<section>
		<Dialog id="vmbox-dialog" :top="100" :width="420">
			<!-- TabMenu -->
			<div class="tal mgt-10">
				<div @click="dialog_tab_pos =  0"  :class="dialog_tab_pos == 0?'active':''" class="tab-menu " >冻结</div>
				<div @click="dialog_tab_pos =  1"  :class="dialog_tab_pos == 1?'active':''"  class="tab-menu"  >划转</div>
				<div @click="dialog_tab_pos =  2"  :class="dialog_tab_pos == 2?'active':''"  class="tab-menu" >取回</div>
			</div>

			<!-- TabBody -->
			<div class="por">
				<div class="pancake-setting"  >
					<div class="dib por">
						<svg @click="oprDialog('pancake-history-dialog','block')" viewBox="0 0 24 24" class="mgl-5 cur-point" width="24px" ><path fill="#91BAFF" d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" ></path></svg>
					</div>
				</div>
				<Freeze v-show="dialog_tab_pos == 0" />
				<Transfer v-show="dialog_tab_pos == 1" />
				<Retrieve v-show="dialog_tab_pos == 2" />
			</div>
		</Dialog>

		<SelectOprPool ref="selectOprPool" />

	</section>
</template>

<script>
import { Dialog } from '@/components';
import CommonMethod from "@/mixin/CommonMethod";
import Freeze from './Freeze';
import Transfer from './Transfer';
import Retrieve from './Retrieve';
import SelectOprPool from './SelectOprPool';

export default {
	mixins: [CommonMethod],
	components :{Dialog, Freeze, Transfer, Retrieve, SelectOprPool},
	data(){
		return({
			dialog_tab_pos: 0
		})
	},
	methods: {
		show(){
			this.oprDialog("vmbox-dialog","block");
			return this;
		},
		close(){
			this.oprDialog("vmbox-dialog","none")
			return this;
		},
		setOprData(item){
			console.log(item);
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
