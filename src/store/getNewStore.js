import Vue from 'vue'
import Vuex from 'vuex'
import globalState from './modules/globalState'
import userState from './modules/userState'
import ethState from './modules/ethState'
import marketState from './modules/marketState'
import bnbState from './modules/bnbState'
import gemState from './modules/gemState'

export default class getNewStore {
	static getNewStore(){
		Vue.use(Vuex);
		return  new Vuex.Store({
			modules: {
				globalState,
				userState,
				ethState,
				marketState,
				bnbState,
				gemState
			}
		});
	}
}