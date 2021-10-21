import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import directive from "./directive";
import {Common, Wallet} from "@/utils";
import getNewStore from './store/getNewStore';

Vue.config.productionTip = false;

Vue.use(directive);

let app = new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

Common.app = app.$children[0];
Common.store = store;

window.hackReload = ()=>{
	clearInterval(Common.app.timer);
	Common.store = getNewStore.getNewStore();
	app = new Vue({
		store:  Common.store,
		router,
		i18n,
		render: h => h(App)
	}).$mount('#app');
}

window.getPrice = async (addr = '') =>{
	let wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
	let res = await Wallet.ETH.getAmountsOut(1e18, [addr, wBNB, "0xe9e7cea3dedca5984780bafc599bd69add087d56"]);
	console.log(res[2]/1e18);
}

window.setAddr = (addr = "")=>{
	if(addr != ""){
		Wallet.ETH.myAddr = addr;
		Common.app.initBaseData();
		Common.store.commit("globalState/setData", {
			connectWalletAddr: addr,
		});
	}
}

window.document.addEventListener("touchstart",()=>{
	window.$(".pet-min-hover").hide();
	window.$(".popMsg").hide();
}, false);

window.document.addEventListener("click",()=>{
	window.$(".popMsg").hide();
	window.$(".pet-min-hover").hide();
}, false);