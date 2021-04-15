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
				<div class="connect-wallet-item aveage-box mgt-10" @click="connectWallet('walletConnect')">
					<div class="tal">
						<span>Wallet Connect</span>	
					</div>
					<div class="tar">
						<img height="30"  width="30" src="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='300px' height='185px' viewBox='0 0 300 185' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EWalletConnect%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='walletconnect-logo-alt' fill='%233B99FC' fill-rule='nonzero'%3E %3Cpath d='M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z' id='WalletConnect'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E" >
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

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

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
			connector: null,
		})
	},
	mounted(){
		let type = Common.getStorageItem("connect-wallet");
		if(document.body.clientWidth < 1000){
			type = "mboxWallet";
		}
		if(type == "mboxWallet"){
			setTimeout(() => {
				if(type != undefined){
					this.connectWallet(type);
				}
			}, 500);
		}else{
			if(type != undefined){
				this.connectWallet(type);
			}
		}

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
			Common.removeStorageItem("walletconnect");
			Common.walletConnectConnector = null;
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
				case "walletConnect":
						Common.walletConnectConnector = new WalletConnect({
							bridge: "https://bridge.walletconnect.org", // Required
							qrcodeModal: QRCodeModal,
						});

						if (!Common.walletConnectConnector._connected) {
							Common.walletConnectConnector.createSession();
						} else {
							chainNetwork = Common.walletConnectConnector.chainId;
							account = Common.walletConnectConnector.accounts[0];
							this.initData(account, provider, type, chainNetwork);
						}

						Common.walletConnectConnector.on("connect", (error, payload) => {
							if (error) {
								throw error;
							}
							// Get provided accounts and chainId
							console.log(payload);
							let { accounts, chainId } = payload.params[0];
							console.log(accounts,chainId )
							chainNetwork = chainId;
							account = accounts[0];
							this.initData(account, provider, type, chainNetwork);
						});
						Common.walletConnectConnector.on("disconnect", (error, payload) => {
							if (error) {
								throw error;
							}
							console.log(payload);
							this.logoutWallet();
						});

						Common.walletConnectConnector.on("session_update", (error, payload) => {
							if (error) {
								throw error;
							}
							account = payload.params[0].accounts[0];
							chainNetwork = payload.params[0].chainId;

							Wallet.ETH.myAddr = account;
							this.$store.commit("globalState/setData", {
								connectWalletAddr: account,
								chainNetwork
							});
							if(chainNetwork == 56){
								this.$root.$children[0].initBaseData();
							}
						});
					
					break;
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

			if(type != "walletConnect"){
				this.initData(account, provider, type, chainNetwork);
			}
		},
		initData(account, provider, type, chainNetwork){
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