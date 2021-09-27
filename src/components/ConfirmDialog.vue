<template>
	<Dialog  id="confirm-dialog" :top="100" :width="350">
		<h4 class="mgt-20 tac" v-html="showMsg"></h4>
		<div class="mgt-50">
			<button v-if="!hideCancel" class="btn-default" @click="close">{{$t("Common_04")}}</button>
			<button class="btn-primary mgl-5" @click="confirmCb && confirmCb(); close()">{{$t("Common_03")}}</button>
		</div>
	</Dialog>
</template>

<script>
import { Dialog } from '@/components';
import {CommonMethod} from '@/mixin';

export default {
	components: {Dialog},
	mixins: [CommonMethod],
	data(){
		return ({
			showMsg: "",
			confirmCb: null,
			hideCancel: false,
		})
	},
	methods: {
		show(showMsg, confirmCb = null, hideCancel = false){
			this.showMsg = showMsg;
			this.confirmCb = confirmCb;
			this.hideCancel = hideCancel;
			this.oprDialog("confirm-dialog","block");
			return this;
		},
		close(){
			this.oprDialog("confirm-dialog","none")
			return this;
		},
	}
}
</script>
