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
					if(window.ethereum){
						window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId: '0x38' }],
						});
					}
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
		border-radius: 8px;
		height: 35px;
		background: #1751f6;
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