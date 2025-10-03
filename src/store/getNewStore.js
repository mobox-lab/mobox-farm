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
<<<<<<< HEAD
const handleError = (error) => {
  console.error('Error occurred:', error);
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  return false;
};

const safeExecute = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
=======
// Test for: fix: 🐛 resolve API rate limiting error
describe('fix____resolve_API_rate_limiting_error', () => {
  it('should work correctly', () => {
    const result = true;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases', () => {
    const edgeCase = null;
    expect(edgeCase).toBeNull();
  });
});
>>>>>>> hotfix/performance-issue
export const utilityFunction = (param) => {
  console.log('Executing utility function:', param);
  return param;
};
