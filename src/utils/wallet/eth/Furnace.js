export default class Furnace {
  static getOrder = {
		type: "function",
		name: 'getOrder',
		inputs: [
      {
        type: 'address',
        name: 'address'
      }
    ],
		outputs: [
      {
        type: "uint256",
        name: "status"
      },
      {
        type: "uint256[3]",
        name: "tokenIds"
      },
      {
        type: "uint256",
        name: "totalScore"
      },
      {
        type: "uint256",
        name: "totalMec"
      },
      {
        type: "uint256",
        name: "blockHash"
      },
    ],
  };

  static beginMerge = {
		type: "function",
		name: 'beginMerge',
		inputs: [
      {
        type: "uint256[]",
        name: "tokenIds_"
      }
    ],
  };

  static endMerge = {
		type: "function",
		name: 'endMerge',
		inputs: [],
  };

  static testMerge = {
		type: "function",
		name: 'testMerge',
		inputs: [
      {
        type: 'uint256[]',
        name: 'tokenIds_'
      }
    ],
		outputs: [
      {
        type: "uint256",
        name: "score"
      },
      {
        type: "uint256",
        name: "mec"
      },
      {
        type: "uint256",
        name: "newLv"
      },
      {
        type: "uint256",
        name: "hr"
      },
    ],
  };
}
