const state = () => ({
	data: {
		gemBag: {},
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