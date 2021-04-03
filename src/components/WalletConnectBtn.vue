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
					this.showNotify("请在钱包切换链", "error");
				}
			}
		}
	}
}
</script>

<style  scoped>
	.connect-btn{
		padding: 0px 20px;
		border-radius: 30px;
		height: 40px;
		background: #1d2b50;
		border: none;
		color: #94BBFF;
		cursor: pointer;
		line-height: 100%;
		font-weight: 800;
	}
</style>