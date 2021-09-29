<template>
	<Dialog id="rule-des-dialog" :width="450" :top="100">
		<h3 class="mgt-10" v-if="tittle != '' ">{{$t(tittle)}}</h3>
		<div class="dialog-content mgt-10 tal" v-if="des != '' ">
			<span v-html="$t(des)" class="small tal" style="font-weight:200"></span>
		</div>
	</Dialog>
</template>

<script>
import {CommonMethod } from "@/mixin";
import { Dialog } from '@/components';

export default {
	components: {Dialog},
	mixins: [CommonMethod],
	data(){
		return ({
			tittle: "",
			des: "",
		})
	},
	methods: {
		show(tittle, des){
			this.tittle = tittle;
			this.des = des;
			this.oprDialog("rule-des-dialog", "block")
		}
	}
}
</script>
