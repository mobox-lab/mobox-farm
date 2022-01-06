<template >
	<button class="connect-btn" @click="buttonClick" >
		<span v-if="connectWalletAddr == '' ">Connect Wallet</span>
		<p v-else>
			<span v-if="chainNetwork == 56">{{getShortAddr(connectWalletAddr)}}</span>
			<span v-else class="color-danger">Error network</span>
		</p>
	</button>
</template>

<script>
import { CommonMethod } from '@/mixin';
import { mapState } from 'vuex';
export default {
	mixins: [CommonMethod],
	computed: {
		...mapState({
			connectWalletAddr: (state) => state.globalState.data.connectWalletAddr,
			chainNetwork: (state) => state.globalState.data.chainNetwork,
		}),
	},
	methods: {
		buttonClick(){
			if(document.body.clientWidth < 1000){
				return;
			}
			if(this.connectWalletAddr == ""){
				this.oprDialog('connect-wallet-dialog','block');
			}else{
				if(this.chainNetwork == 56){
					this.oprDialog("connected-wallet-info-dialog", "block");
				}else{
					this.showNotify(this.$t("Common_23"), "error");
				}
			}
		}
	}
}
</script>

<style  scoped>
	.connect-btn{
		padding: 0px 20px;
		border-radius: 10px;
		height: 35px;
		/* background: linear-gradient(253deg,#e3672a 0%, #fab531 100%); */
		background: linear-gradient(77deg,#12dae7  0%, #1b4ef5  100%);
		border: none;
		color: #fff;
		cursor: pointer;
		line-height: 100%;
		font-size: 14px;
	}
	.connect-btn.btn-small{
		min-width: auto !important;
		font-size: 12px;
		height: 28px;
		padding: 0px 12px!important;
	}
</style>