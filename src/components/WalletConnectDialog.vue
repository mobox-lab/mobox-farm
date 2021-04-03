<template>
	<div>
		<Dialog id="connect-wallet-dialog" :top="100" :width="400">
			<h2>Connect to a wallet</h2>
			<div class="mgt-20">
				<div class="connect-wallet-item aveage-box mgt-10" @click="connectWallet('mboxWallet')">
					<div class="tal">
						<span>MboxWallet</span>	
					</div>
					<div class="tar">
						<img src="../assets/icon/mboxWallet.png" height="30" alt="">
					</div>
				</div>
				<div class="connect-wallet-item aveage-box mgt-10" @click="connectWallet('binanceChain')">
					<div class="tal">
						<span>Binance Chain Wallet</span>	
					</div>
					<div class="tar">
						<img src="../assets/icon/binanceWallet.svg" height="30" alt="">
					</div>
				</div>
				<div class="connect-wallet-item aveage-box mgt-10" @click="connectWallet('metamask')">
					<div class="tal">
						<span>Metamask</span>	
					</div>
					<div class="tar">
						<img src="../assets/icon/metamask.svg" height="30" alt="">
					</div>
				</div>
			</div>
		</Dialog>
		<Dialog id="connected-wallet-info-dialog" :top="100" :width="400">
			<h2>{{$t("Common_24")}}</h2>
			<div class="mgt-50">
				<p>{{connectWalletAddr}}</p>
				<p class="tac small opa-6 mgt-10">
					<a :href="'https://bscscan.com/address/' + connectWalletAddr" target="_blank" style="text-decoration: underline">{{$t("Common_17")}}</a>
				</p>
			</div>
			<div class="mgt-50">
				<button class="btn-primary" @click="logoutWallet">{{$t("Common_25")}}</button>
			</div>
		</Dialog>
	</div>
</template>
<script>
import { Dialog } from '@/components';
import { Wallet, Common } from '@/utils';
import { CommonMethod } from '@/mixin';
import { mapState } from 'vuex';

export default {
	mixins: [CommonMethod],
	components: {Dialog},
	computed:{
		...mapState({
			connectWalletAddr: (state) => state.globalState.data.connectWalletAddr,
		}),
	},
	data(){
		return({
			connectedWallet: "",
		})
	},
	created(){
		let type = Common.getStorageItem("connect-wallet");
		this.connectWallet(type);

		//监听事件---metamask
		if(window.ethereum && window.ethereum.on){
			window.ethereum.on('chainChanged', () => {
				if(this.connectedWallet == "metamask"){
					window.location.reload();
				}
			});
			window.ethereum.on('accountsChanged', accounts => {
				console.log("accountsChanged", accounts);
				if(this.connectedWallet == "metamask"){
					Wallet.ETH.myAddr = accounts[0];
					this.$store.commit("globalState/setData", {
						connectWalletAddr: accounts[0],
					});
					this.$root.$children[0].initBaseData();
				}
			});
		}

		// todo---mobox listen
		

	},
	methods:{
		logoutWallet(){
			Common.removeStorageItem("connect-wallet");
			Wallet.ETH.myAddr = "";
			Wallet.ETH.logoutWallet();
			this.$store.commit("globalState/setData", {
				connectWalletAddr: "",
				chainNetwork: 0
			});
			this.oprDialog("connected-wallet-info-dialog", "none");
			window.hackReload();
		},
		async connectWallet(type){
			let account = "";
			let chainNetwork = 0;
			let provider = null;
			switch (type) {
				case "metamask":
						if (typeof window.ethereum !== 'undefined') {
							try {
								//获取账户
								let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
								account =  accounts[0];
							} catch (error) {
								this.showNotify("请解锁钱包", "error");
							}
							//获取当前Network
							let network = await window.ethereum.request({method: 'net_version'});
							chainNetwork = network;
							//获取当前provider
							provider = window.web3.currentProvider;
						}
					break;
				case "binanceChain":
						this.showNotify("not support now", "error");
					break;
				case "mboxWallet":
						console.log("mboxWallet", window.bscWeb3);
						if (typeof window.bscWeb3 !== 'undefined') {
							//获取账户
							let accounts = await window.BinanceChain.send({ method: 'eth_requestAccounts' });
							account =  accounts.result[0];
							//获取当前链
							chainNetwork = 56;
							//获取当前provider
							provider = window.bscWeb3.currentProvider;
						}
					break;
				default:
					break;
			}

			if(account == "") return;

			Wallet.ETH.myAddr = account;
			Wallet.ETH.changeWeb3(provider);
			this.$store.commit("globalState/setData", {
				connectWalletAddr: account,
				chainNetwork
			});
			Common.setStorageItem("connect-wallet", type);
			this.oprDialog("connect-wallet-dialog", "none");

			this.connectedWallet = type;

			if(chainNetwork == 56){
				this.$root.$children[0].initBaseData();
			}
		}
	}
}
</script>

<style scoped>
	.connect-wallet-item >div:nth-child(1){
		flex:1 1 auto;
	}
	.connect-wallet-item{
		background: #1f2f5a;
		padding: 10px 20px;
		border-radius: 10px;
		cursor: pointer;
	}
	.connect-wallet-item:hover{
		background: #16244d;
	}
</style>