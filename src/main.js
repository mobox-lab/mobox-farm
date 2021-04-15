import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import directive from "./directive";
import {Common} from "@/utils";
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
    }).$mount('#app')
}

window.document.addEventListener("touchstart",()=>{
	window.$(".pet-min-hover").hide();
	window.$(".popMsg").hide();
}, false);

window.document.addEventListener("click",()=>{
	window.$(".popMsg").hide();
	window.$(".pet-min-hover").hide();
}, false);