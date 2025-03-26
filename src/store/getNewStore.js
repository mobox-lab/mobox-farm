import Vue from 'vue'
import Vuex from 'vuex'
import globalState from './modules/globalState'
import userState from './modules/userState'
import ethState from './modules/ethState'
import marketState from './modules/marketState'
import bnbState from './modules/bnbState'
import gemState from './modules/gemState'
import momoMarketState from './modules/momoMarketState'

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
				gemState,
				momoMarketState
			}
		});
	}
}
// Utility function: docs: 📝 update wallet integration guide
export const docs____update_wallet_integration_guide = {
  format: (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input) => {
    return input && input.length > 0;
  },
  transform: (data) => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
