<template>
	<Dialog id="rule-des-dialog" :width="500" :top="50">
		<h3 class="mgt-10" v-if="tittle != '' ">{{$t(tittle)}}</h3>
		<div class="dialog-content mgt-10 tal" v-if="des != '' ">
			<span v-html="$t(des)" class="tal" ></span>
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
