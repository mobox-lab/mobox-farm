const state = () => ({
	data: {
		gemBag: {},
		mboxAllownceToApply: -1, //mbox是否授权给申购合约
	},
})

const mutations = {
	setData(state, newState) {
		state.data = Object.assign(state.data, newState);
	}
};

export default {
	namespaced: true,
	state,
	mutations
};