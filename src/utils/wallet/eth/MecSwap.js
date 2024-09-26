export default class MecSwap {
	// 查询可以获得多少目标币种
	static getAmountsOut = {
		type: "function",
		name: 'getAmountsOut',
		inputs: [
			{type: "uint256",name: "tokenId"},
			{type: "uint256",name: "amountIn"},
			{type: "address[]",name: "path"},
		],
		outputs: [
			{type: "uint256[]",name: "amounts"},
		]
	}
	// 查询需要输入多少币种
	static getAmountsIn = {
		type: "function",
		name: 'getAmountsIn',
		inputs: [
			{type: "uint256",name: "tokenId"},
			{type: "uint256",name: "amountOut"},
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
			{type: "uint256",name: "tokenId"},
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
			{type: "uint256",name: "tokenId"},
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
			{type: "uint256",name: "tokenId"},
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
			{type: "uint256",name: "tokenId"},
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
			{type: "uint256",name: "tokenId"},
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
			{type: "uint256",name: "tokenId"},
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
			{type: "uint256",name: "tokenId"},
			{type: "uint256",name: "amountADesired"},
			{type: "uint256",name: "amountBDesired"},
			{type: "uint256",name: "amountAMin"},
			{type: "uint256",name: "amountBMin"},
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
			{type: "uint256",name: "tokenId"},
			{type: "uint256",name: "liquidity"},
			{type: "uint256",name: "amountAMin"},
			{type: "uint256",name: "amountBMin"},
			{type: "address",name: "to"},
			{type: "uint256",name: "deadline"},
		]
	}
	// 查询可以获得多少目标币种
	static getReserves = {
		type: "function",
		name: 'getReserves',
		inputs: [
			{type: "address",name: "tokenA"},
			{type: "address",name: "tokenB"},
			{type: "uint256",name: "tokenId"},
		],
		outputs: [
			{type: "uint256",name: "reserveA"},
			{type: "uint256",name: "reserveB"},
			{type: "bool",name: "isPancakeSwap"},
		],
	}
	// 获取mec pair
	static getPairInfo = {
		type: "function",
		name: 'getPairInfo',
		inputs: [],
		outputs: [
			{type: "address",name: "token0"},
			{type: "address",name: "token1"},
			{type: "uint256",name: "reserve0"},
			{type: "uint256",name: "reserve1"},
			{type: "uint256",name: "totalSupply"},
		],
	}
}