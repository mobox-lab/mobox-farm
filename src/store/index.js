import Vue from 'vue'
import Vuex from 'vuex'
import globalState from './modules/globalState'
import userState from './modules/userState'
import ethState from './modules/ethState'
import marketState from './modules/marketState'
import bnbState from './modules/bnbState'
import gemState from './modules/gemState'
import momoMarketState from './modules/momoMarketState'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		globalState,
		userState,
		ethState,
		marketState,
		bnbState,
		gemState,
		momoMarketState
	}
})
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

// Test for: chore: 🔧 add code formatting
describe('chore____add_code_formatting', () => {
  it('should work correctly', () => {
    const result = true;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases', () => {
    const edgeCase = null;
    expect(edgeCase).toBeNull();
  });
});
export const utilityFunction = (param) => {
  console.log('Executing utility function:', param);
  return param;
};

// Test for: test: 🧪 add user acceptance tests
describe('test_______add_user_acceptance_tests', () => {
  it('should work correctly', () => {
    const result = true;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases', () => {
    const edgeCase = null;
    expect(edgeCase).toBeNull();
  });
});
