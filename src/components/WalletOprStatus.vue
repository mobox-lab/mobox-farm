<template>
	<Dialog id="wallet-opr-dialog" :top="100" :width="400">
		<div v-show="walletStatus.status == 1">
			<h2>{{$t("Common_14")}}</h2>
			<div class="tac mgt-50" >
				<Loading :width="100" :height="100" />
			</div>
			<div class="mgt-50">{{walletStatus.msg}}</div>
			<div class="tac mgt-20 small opa-6">{{$t("Common_15")}}</div>
		</div>
		<div v-show="walletStatus.status == 2">
			<h2>{{$t("Common_19")}}</h2>
			<div class="tac mgt-50" >
				<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff7ec0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke-width: 1.5;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
				<p class="mgt-20 small" style="color: #ff7ec0">{{$t("Common_20")}}</p>
			</div>
			<div class="mgt-50" style="margin-bottom:10px">
				<button class="btn-primary" style="width:100%;" @click="oprDialog('wallet-opr-dialog', 'none')">{{$t("Common_03")}}</button>
			</div>
		</div>
		<div v-show="walletStatus.status == 3">
			<h2>{{$t("Common_16")}}</h2>
			<div class="tac mgt-50" >
				<a   :href="'https://bscscan.com/tx/'+walletStatus.hash" target="_blank">
					<svg xmlns="http://www.w3.org/2000/svg" width="97" height="97" viewBox="0 0 24 24" fill="none" stroke="#838689" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>
					<p class="mgt-20 ">{{$t("Common_17")}}</p>
				</a>
			</div>
			<div class="mgt-50" style="margin-bottom:10px">
				<button class="btn-primary" style="width:100%;" @click="oprDialog('wallet-opr-dialog', 'none')">{{$t("Common_18")}}</button>
			</div>
		</div>
	</Dialog>
</template>
<script>
import { Loading, Dialog } from '@/components';
import { CommonMethod } from '@/mixin';
import { mapState } from 'vuex';
// import { EventBus } from '@/utils';

export default {
	mixins: [CommonMethod],
	components: {  Loading, Dialog },
	computed: {
		...mapState({
			walletStatus: (state) => state.globalState.data.walletStatus,
		}),
	},
	created(){
	}
}
</script>