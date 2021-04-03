<template>
	<div>
		<Dialog id="connect-wallet-dialog" :top="100" :width="400">
			<h2>Connect to a wallet</h2>
			<div class="mgt-20">
				<div class="connect-wallet-item aveage-box mgt-10" @click="connectWallet('mboxWallet')">
					<div class="tal">
						<span>MOBOX Wallet (recommended)</span>	
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
		setTimeout(() => {
			if(document.body.clientWidth < 1000){
				type = "mboxWallet";
			}
			if(type != undefined){
				this.connectWallet(type);
			}
		}, 500);

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
			console.log("connect", type);
			let account = "";
			let chainNetwork = 0;
			let provider = null;
			switch (type) {
				case "metamask":
						if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
							try {
								//获取账户
								let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
								account =  accounts[0];
							} catch (error) {
								this.showNotify(this.$t("Air-drop_101"), "error");
							}
							//获取当前Network
							let network = await window.ethereum.request({method: 'net_version'});
							chainNetwork = network;
							//获取当前provider
							provider = window.web3.currentProvider;
						}
					break;
				case "binanceChain":
						// this.showNotify("not support now", "error");
						if (typeof window.BinanceChain !== 'undefined') {
							try {
								//获取账户
								let accounts = await window.BinanceChain.request({ method: 'eth_requestAccounts' });
								account =  accounts[0];
							} catch (error) {
								console.log(error);
								this.showNotify(this.$t("Air-drop_101"), "error");
							}
							//获取当前Network
							let network = await window.BinanceChain.request({method: 'net_version'});
							chainNetwork = network;
							//获取当前provider
							provider = window.BinanceChain;
						}
					break;
				case "mboxWallet":
					console.log("------",window.mbox);
						if(window.mbox){
							console.log("-BinanceChain-----",window.mbox.BinanceChain);
							console.log("-enable-----",window.mbox.BinanceChain.enable);
							let wallets = await window.mbox.BinanceChain.enable();
							console.log("---123---",wallets);
							if(wallets && wallets[0]){
								account =  wallets[0];
								chainNetwork = 56;
								provider = window.mbox.bscWeb3.currentProvider;
							} else {
								this.showNotify(this.$t("Air-drop_101"), "error");
							}
						} else {
							// download
						}

					break;
				default:
					break;
			}

			if(account == "") {
				if(type != "metamask"){
					this.connectWallet("metamask");
				}else{
					this.showNotify("No provider was found", "error");
				}
				return;
			}

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