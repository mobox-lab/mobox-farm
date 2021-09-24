const state = () => ({
	data: {
		name: "name",
		aaa: "aaaa",
		boxList: [
			{resImg: "box/mdxbox", num: 0, id: 1},
		],
		mdxBalance: 0,
		crystalNum: 0,
		mecBoxNum: 0,
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