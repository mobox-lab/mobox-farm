export default class PancakSwapContract {
	// 查询可以获得多少目标币种
	static getAmountsOut = {
		type: "function",
		name: 'getAmountsOut',
		inputs: [
			{type: "uint256",name: "amountIn"},
			{type: "address[]",name: "path"},
		],
		outputs: [
			{type: "uint256[]",name: "amounts"},
		]
	}
	// 确定的ETH换成一种币
	static swapExactETHForTokens = {
		type: "function",
		name: 'swapExactETHForTokens',
		inputs: [
			{type: "uint256",name: "amountOutMin"},
			{type: "address[]",name: "path"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	// ETH换成确定的一种币
	static swapETHForExactTokens = {
		type: "function",
		name: 'swapETHForExactTokens',
		inputs: [
			{type: "uint256",name: "amountOut"},
			{type: "address[]",name: "path"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	// 确定的一种币换成ETH
	static swapExactTokensForETH = {
		type: "function",
		name: 'swapExactTokensForETH',
		inputs: [
			{type: "uint256",name: "amountIn"},
			{type: "uint256",name: "amountOutMin"},
			{type: "address[]",name: "path"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	// 一种币换成确定的ETH
	static swapTokensForExactETH = {
		type: "function",
		name: 'swapTokensForExactETH',
		inputs: [
			{type: "uint256",name: "amountOut"},
			{type: "uint256",name: "amountInMax"},
			{type: "address[]",name: "path"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	// 确定的一种币换成另外一种币
	static swapExactTokensForTokens = {
		type: "function",
		name: 'swapExactTokensForTokens',
		inputs: [
			{type: "uint256",name: "amountIn"},
			{type: "uint256",name: "amountOutMin"},
			{type: "address[]",name: "path"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	// 一种币换成另外确定的一种币
	static swapTokensForExactTokens = {
		type: "function",
		name: 'swapTokensForExactTokens',
		inputs: [
			{type: "uint256",name: "amountOut"},
			{type: "uint256",name: "amountInMax"},
			{type: "address[]",name: "path"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	// 授权
	static approve = {
		type: "function",
		name: 'approve',
		inputs: [
			{type: "address",name: "_spender"},
			{type: "uint256",name: "_value"},
		]
	}
	// 查询授权数量
	static allowance = {
		type: "function",
		name: 'allowance',
		inputs: [
			{type: "address",name: "_owner"},
			{type: "address",name: "_spender"},
		],
		outputs: [
			{type: "uint256",name: "_value"}
		],
	}
	//增加流动性
	static addLiquidity = {
		type: "function",
		name: 'addLiquidity',
		inputs: [
			{type: "address",name: "tokenA"},
			{type: "address",name: "tokenB"},
			{type: "uint256",name: "amountADesired"},
			{type: "uint256",name: "amountBDesired"},
			{type: "uint256",name: "amountAMin"},
			{type: "uint256",name: "amountBMin"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	//增加流动性-ETH
	static addLiquidityETH = {
		type: "function",
		name: 'addLiquidityETH',
		inputs: [
			{type: "address",name: "token"},
			{type: "uint256",name: "amountTokenDesired"},
			{type: "uint256",name: "amountTokenMin"},
			{type: "uint256",name: "amountETHMin"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	//移除流动性
	static removeLiquidity = {
		type: "function",
		name: 'removeLiquidity',
		inputs: [
			{type: "address",name: "tokenA"},
			{type: "address",name: "tokenB"},
			{type: "uint256",name: "liquidity"},
			{type: "uint256",name: "amountAMin"},
			{type: "uint256",name: "amountBMin"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	//移除流动性-ETH
	static removeLiquidityETH = {
		type: "function",
		name: 'removeLiquidityETH',
		inputs: [
			{type: "address",name: "token"},
			{type: "uint256",name: "liquidity"},
			{type: "uint256",name: "amountTokenMin"},
			{type: "uint256",name: "amountETHMin"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
}