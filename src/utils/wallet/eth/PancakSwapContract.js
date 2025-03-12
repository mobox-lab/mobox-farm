export default class PancakSwapContract {
  //
  static getAmountsOut = {
    type: "function",
    name: "getAmountsOut",
    inputs: [
      { type: "uint256", name: "amountIn" },
      { type: "address[]", name: "path" },
    ],
    outputs: [{ type: "uint256[]", name: "amounts" }],
  };
  //
  static swapExactETHForTokens = {
    type: "function",
    name: "swapExactETHForTokens",
    inputs: [
      { type: "uint256", name: "amountOutMin" },
      { type: "address[]", name: "path" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static swapETHForExactTokens = {
    type: "function",
    name: "swapETHForExactTokens",
    inputs: [
      { type: "uint256", name: "amountOut" },
      { type: "address[]", name: "path" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static swapExactTokensForETH = {
    type: "function",
    name: "swapExactTokensForETH",
    inputs: [
      { type: "uint256", name: "amountIn" },
      { type: "uint256", name: "amountOutMin" },
      { type: "address[]", name: "path" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static swapTokensForExactETH = {
    type: "function",
    name: "swapTokensForExactETH",
    inputs: [
      { type: "uint256", name: "amountOut" },
      { type: "uint256", name: "amountInMax" },
      { type: "address[]", name: "path" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static swapExactTokensForTokens = {
    type: "function",
    name: "swapExactTokensForTokens",
    inputs: [
      { type: "uint256", name: "amountIn" },
      { type: "uint256", name: "amountOutMin" },
      { type: "address[]", name: "path" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static swapTokensForExactTokens = {
    type: "function",
    name: "swapTokensForExactTokens",
    inputs: [
      { type: "uint256", name: "amountOut" },
      { type: "uint256", name: "amountInMax" },
      { type: "address[]", name: "path" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static approve = {
    type: "function",
    name: "approve",
    inputs: [
      { type: "address", name: "_spender" },
      { type: "uint256", name: "_value" },
    ],
  };
  //
  static allowance = {
    type: "function",
    name: "allowance",
    inputs: [
      { type: "address", name: "_owner" },
      { type: "address", name: "_spender" },
    ],
    outputs: [{ type: "uint256", name: "_value" }],
  };
  //
  static addLiquidity = {
    type: "function",
    name: "addLiquidity",
    inputs: [
      { type: "address", name: "tokenA" },
      { type: "address", name: "tokenB" },
      { type: "uint256", name: "amountADesired" },
      { type: "uint256", name: "amountBDesired" },
      { type: "uint256", name: "amountAMin" },
      { type: "uint256", name: "amountBMin" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static addLiquidityETH = {
    type: "function",
    name: "addLiquidityETH",
    inputs: [
      { type: "address", name: "token" },
      { type: "uint256", name: "amountTokenDesired" },
      { type: "uint256", name: "amountTokenMin" },
      { type: "uint256", name: "amountETHMin" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static removeLiquidity = {
    type: "function",
    name: "removeLiquidity",
    inputs: [
      { type: "address", name: "tokenA" },
      { type: "address", name: "tokenB" },
      { type: "uint256", name: "liquidity" },
      { type: "uint256", name: "amountAMin" },
      { type: "uint256", name: "amountBMin" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
  //
  static removeLiquidityETH = {
    type: "function",
    name: "removeLiquidityETH",
    inputs: [
      { type: "address", name: "token" },
      { type: "uint256", name: "liquidity" },
      { type: "uint256", name: "amountTokenMin" },
      { type: "uint256", name: "amountETHMin" },
      { type: "address", name: "to" },
      { type: "uint256", name: "deadline" },
    ],
  };
}
