export default class Contract {
	//快速升级
	static inlayQuickLvUp = {
		type: "function",
		name: 'inlayQuickLvUp',
		inputs: [{
			type: 'uint256',
			name: 'momoId_'
		},{
			type: 'uint256',
			name: 'pos_'
		}],
		outputs: [],
	}
	//脱下宝石
	static takeOff = {
		type: "function",
		name: 'takeOff',
		inputs: [{
			type: 'uint256',
			name: 'momoId_'
		},{
			type: 'uint256',
			name: 'pos_'
		}],
		outputs: [],
	}
	//穿戴宝石
	static takeOn = {
		type: "function",
		name: 'takeOn',
		inputs: [{
			type: 'uint256',
			name: 'momoId_'
		},{
			type: 'uint256',
			name: 'gemId_'
		},{
			type: 'uint256',
			name: 'pos_'
		}],
		outputs: [],
	}
	//查看多个momo的宝石镶嵌情况
	static getInlayInfoBatch = {
		type: "function",
		name: 'getInlayInfoBatch',
		inputs: [{
			type: 'uint256[]',
			name: 'momoIds_'
		}],
		outputs: [{
			"components": [
			{
			"internalType": "uint256",
			"name": "red",
			"type": "uint256"
			},
			{
			"internalType": "uint256",
			"name": "green",
			"type": "uint256"
			},
			{
			"internalType": "uint256",
			"name": "blue",
			"type": "uint256"
			},
			{
			"internalType": "uint256",
			"name": "yellow",
			"type": "uint256"
			}
			],
			"internalType": "struct MoMoInlay.Inlay[]",
			"name": "inlayInfos",
			"type": "tuple[]"
			}
		],
	}
	//查看单个momo的宝石镶嵌情况
	static getInlayInfo = {
		type: "function",
		name: 'getInlayInfo',
		inputs: [{
			type: 'uint256',
			name: 'momoId_'
		}],
		outputs: [{
				"components": [
				{
					"internalType": "uint256",
					"name": "red",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "green",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "blue",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "yellow",
					"type": "uint256"
				}
				],
				"internalType": "struct MoMoInlay.Inlay",
				"name": "inlayInfo",
				"type": "tuple"
			}
		],
	}
	//判断是否申购了
	static isHighApplying = {
		type: "function",
		name: 'isHighApplying',
		inputs: [{
			type: 'address',
			name: 'owner_'
		}],
		outputs: [{
			type: 'bool',
			name: 'hasApply'
		}],
	}
	//领取冻结MBOX
	static claimfrozenMbox = {
		type: "function",
		name: 'claimfrozenMbox',
		inputs: [],
		outputs: [],
	}
	//领取宝石
	static claimfrozenGem = {
		type: "function",
		name: 'claimfrozenGem',
		inputs: [],
		outputs: [],
	}
	//普通申购宝石
	static nApplyForGem = {
		type: "function",
		name: 'nApplyForGem',
		inputs: [{
			type: 'uint256',
			name: 'applyNum_'
		}],
		outputs: [],
	}
	//算力申购宝石
	static hApplyForGem = {
		type: "function",
		name: 'hApplyForGem',
		inputs: [{
			type: 'uint256',
			name: 'applyNum_'
		}],
		outputs: [],
	}

	static getBoxUserInfo = {
		type: "function",
		name: 'getUserInfo',
		inputs: [{
			type: "address",
			name: "owner"
		}],
		outputs:[{
			"components": [
				{
					"internalType": "uint128",
					"type": "uint128"
				},
				{
					"internalType": "uint128",
					"type": "uint128"
				}
			],
			"internalType": "struct GemMinter.Ticket",
			"name": "userNormalTicket",
			"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint128",
						"type": "uint128"
					},
					{
						"internalType": "uint128",
						"type": "uint128"
					}
				],
				"internalType": "struct GemMinter.Ticket",
				"name": "userHighTicket",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "boxAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "frozenBalance",
				"type": "uint256"
			}
		],
	}

	//查看玩家申购数据(申购合约)
	static getUserInfo = {
		type: "function",
		name: 'getUserInfo',
		inputs: [{
			type: "address",
			name: "owner"
		}],
		outputs:[{
			"components": [
				{
					"internalType": "uint128",
					"type": "uint128"
				},
				{
					"internalType": "uint128",
					"type": "uint128"
				}
			],
			"internalType": "struct GemMinter.Ticket",
			"name": "userNormalTicket",
			"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint128",
						"type": "uint128"
					},
					{
						"internalType": "uint128",
						"type": "uint128"
					}
				],
				"internalType": "struct GemMinter.Ticket",
				"name": "userHighTicket",
				"type": "tuple"
			},
			{
			"components": [
				{
					"internalType": "uint256",
					"name": "red",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "green",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "blue",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "yellow",
					"type": "uint256"
				}
			],
			"internalType": "struct GemMinter.InlayPosition",
			"name": "gems",
			"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "frozenBalance",
				"type": "uint256"
			}
		],
	}
	//查看申购状态(申购合约)
	static getRoundInfo = {
		type: "function",
		name: 'getRoundInfo',
		inputs: [],
		outputs: [{
			type: "uint256",
			name: "roundIndex"
		},{
			type: "uint256",
			name: "roundPrice"
		},{
			type: "uint256",
			name: "roundStartTime"
		},{
			type: "uint256",
			name: "roundState"
		},{
			type: "uint256",
			name: "maxAmount"
		},{
			type: "uint256",
			name: "nowAmount"
		},{
			type: "uint256",
			name: "nowNormalAmount"
		},{
			type: "uint256",
			name: "maxNormalLuckyAmount"
		},{
			type: "uint256",
			name: "maxLuckyAmount"
		},{
			type: "uint256",
			name: "roundDuration"
		}],
	}
	//批量查询宝石数量
	static balanceOfOneBatch = {
		type: "function",
		name: 'balanceOfOneBatch',
		inputs: [{
			type: 'address',
			name: 'ownerAddress'
		},{
			type: 'uint256[]',
			name: '_ids'
		}],
		outputs: [{
			type: "uint256[]",
			name: "_values"
		}],
	}
	//宝石升级
	static levelUpGem = {
		type: "function",
		name: 'levelUp',
		inputs: [{
			type: 'uint256',
			name: '_gemId'
		},{
			type: 'uint256',
			name: '_amount'
		}],
	}

	static getUserFarmInfos = {
		type: "function",
		name: 'getUserFarmInfos',
		inputs: [{
			type: "uint256[]",
			name: "pindexArr"
		},{
			type: "address",
			name: "fromAddress"
		}],
		outputs: [{
			"components": [
				{
					type: "uint256[]",
					name: "wantAmounts"
				},{
					type: "uint256[]",
					name: "workingBalances"
				},{
					type: "uint256[]",
					name: "gracePeriods"
				},{
					type: "uint256[]",
					name: "pkeys"
				},{
					type: "uint256",
					name: "rewardStore"
				}
			],
			"internalType": "struct MoMoHelper.FarmInfo",
			"name": "ret",
			"type": "tuple"
		}],
	}
	//获取单个LP的USD价值
	static getPricePerFullShare = {
		type: "function",
		name: 'getPricePerFullShare',
		inputs: [],
		outputs: [{
			type: "uint256",
			name: "_value"
		}],
	}
	//查余额
	static balanceOf = {
		type: "function",
		name: 'balanceOf',
		inputs: [{
			type: 'address',
			name: 'ownerAddress'
		}],
		outputs: [{
			type: "uint256",
			name: "_value"
		}],
	}
	//授权
	static approve = {
		name: 'approve',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_spender'
		}, {
			type: 'uint256',
			name: '_value'
		}]
	}
	//查授权
	static allowance = {
		name: 'allowance',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}, {
			type: 'address',
			name: '_spender'
		}],
		outputs: [{
			type: "uint256",
			name: "_value"
		}],
	}
	//添加box--MomoMinter
	static addBox = {
		name: 'addBox',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_to'
		}, {
			type: 'uint256',
			name: '_amount'
		}],
	}
	//添加box--MomoMinter
	static addMysteryBox = {
		name: 'addMysteryBox',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_to'
		}, {
			type: 'uint256',
			name: '_amount'
		}],
	}
	//打开箱子--MomoMinter
	static mint = {
		name: 'mint',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_to'
		}, {
			type: 'uint256',
			name: '_amount'
		}],
	}
	//获取订单--MomoMinter
	static getOrder = {
		name: 'getOrder',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}],
		outputs: [{
				type: "uint256",
				name: "_boxAmount"
			},
			{
				type: "bytes32",
				name: "_blockHash"
			}
		],
	}
	//获取个人所有的ERC1155--MoMoMToken
	static balanceOfOneBatch = {
		name: 'balanceOfOneBatch',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}, {
			type: 'uint256[]',
			name: '_memoryids'
		}],
		outputs: [{
			type: "uint256[]",
			name: "_amounts"
		}],
		stateMutability: "view",
	}
	//查询是否授权--MoMoMToken--MoMoToken
	static isApprovedForAll = {
		name: 'isApprovedForAll',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}, {
			type: 'address',
			name: '_operator'
		}],
		outputs: [{
			type: "bool",
			name: "_isApproved"
		}],
		stateMutability: "view",
	}
	//授权给目标合约--MoMoMToken--MoMoToken
	static setApprovalForAll = {
		name: 'setApprovalForAll',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}, {
			type: 'bool',
			name: '_approved'
		}],
	}
	//升级--MomoToken
	static levelUp = {
		name: 'levelUp',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_tokenId'
		}, {
			type: 'uint256[]',
			name: '_protosV1V2V3'
		}, {
			type: 'uint256[]',
			name: '_amountsV1V2V3'
		}],
	}
	//取名--MomoToken
	static setMomoName = {
		name: 'setMomoName',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_tokenId'
		}, {
			type: 'bytes',
			name: '_name'
		}],
	}
	//写入故事---MomoToken
	static addMomoStory = {
		name: 'addMomoStory',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_tokenId'
		}, {
			type: 'bytes',
			name: '_story'
		}],
	}
	//获取名字---MomoToken
	static getMomoName = {
		name: 'getMomoName',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_tokenId'
		}],
		outputs: [{
			type: "bytes",
			name: "_name"
		}],
	}
	//获取故事---MomoToken
	static getMomoStory = {
		name: 'getMomoStory',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_tokenId'
		}, {
			type: 'uint256',
			name: '_start'
		}, {
			type: 'uint256',
			name: '_count'
		}],
		outputs: [{
				type: "uint256",
				name: "_allSize"
			},
			{
				type: "bytes[]",
				name: "_storys"
			}
		],
	}
	//获取momoverse中ERC1155和721---MomoHelper
	static getMomosVerse = {
		name: 'getMomosVerse',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_ower'
		}, {
			type: 'uint256[]',
			name: '_ids'
		}],
		outputs: [{
				type: "uint256[]",
				name: "_ids"
			},
			{
				type: "uint256[]",
				name: "_amounts"
			},
			{
				type: "uint256[]",
				name: "_tokenIds"
			},
			{
				type: "uint256[]",
				name: "_attrs"
			}
		],
	}
	//获取钱包中ERC1155和721---MomoHelper
	static getMomosWallet = {
		name: 'getMomosWallet',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_ower'
		}, {
			type: 'uint256[]',
			name: '_ids'
		}],
		outputs: [{
				type: "uint256[]",
				name: "_ids"
			},
			{
				type: "uint256[]",
				name: "_amounts"
			},
			{
				type: "uint256[]",
				name: "_tokenIds"
			},
			{
				type: "uint256[]",
				name: "_attrs"
			}
		],
	}
	//获取质押的NFT---MomoHelper
	static getMomosStake = {
		name: 'getMomosStake',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_ower'
		}, {
			type: 'uint256[]',
			name: '_ids'
		}],
		outputs: [{
				type: "uint256[]",
				name: "_ids"
			},
			{
				type: "uint256[]",
				name: "_amounts"
			},
			{
				type: "uint256[]",
				name: "_tokenIds"
			},
			{
				type: "uint256[]",
				name: "_attrs"
			}
		],
	}
	//获取拍卖中NFT---MomoHelper
	static getMomosAuction = {
		name: 'getMomosAuction',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_ower'
		}],
		outputs: [{
				type: "uint256[]",
				name: "_ids"
			},
			{
				type: "uint256[]",
				name: "_amounts"
			},
			{
				type: "uint256[]",
				name: "_tokenIds"
			},
			{
				type: "uint256[]",
				name: "_attrs"
			}
		],
	}
	//获取大批名字---MomoHelper
	static getMomoNames = {
		name: 'getMomoNames',
		type: "function",
		inputs: [{
			type: 'uint256[]',
			name: '_tokenIds'
		}],
		outputs: [{
			type: "bytes[]",
			name: "_names"
		}],
	}
	//质押挖矿--MomoStake
	static stake = {
		name: 'stake',
		type: "function",
		inputs: [{
			type: 'uint256[]',
			name: '_ids'
		}, {
			type: 'uint256[]',
			name: '_amounts'
		}, {
			type: 'uint256[]',
			name: '_tokenIds'
		}],
	}
	//解冻质押---MomoStake
	static withdrawMomo = {
		name: 'withdraw',
		type: "function",
		inputs: [{
			type: 'uint256[]',
			name: '_ids'
		}, {
			type: 'uint256[]',
			name: '_amounts'
		}, {
			type: 'uint256[]',
			name: '_tokenIds'
		}],
	}
	//领取Mbox---MomoStake
	static getReward = {
		name: 'getReward',
		type: "function",
		inputs: [],
	}
	//领取Key
	static getRewardKey = {
		name: 'getReward',
		type: "function",
		inputs: [{
			type: 'uint256[]',
			name: "pIndexArr"
		}],
	}
	//查询自己有多少Mbox可以领取 --MomoStake
	static earned = {
		name: 'earned',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}],
		outputs: [{
			type: "uint256",
			name: "_value"
		}],
	}
	//查询自己质押的NFT的总算力 --MomoStake
	static userHashrate = {
		name: 'userHashrate',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}],
		outputs: [{
			type: "uint256",
			name: "_hashrate"
		}],
	}
	//查询全链质押的NFT的总算力 --MomoStake
	static totalHashrate = {
		name: 'totalHashrate',
		type: "function",
		inputs: [],
		outputs: [{
			type: "uint256",
			name: "_hashrate"
		}],
	}
	
	//打开BOX并质押NFT--MomoStake
	static mintAndStake = {
		name: 'mintAndStake',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_amount'
		}],
	}

	//升级质押的NFT--MomoStake
	static levelUpStake = {
		name: 'levelUp',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_tokenId'
		}, {
			type: 'uint256[]',
			name: '_protosV1V2V3'
		}, {
			type: 'uint256[]',
			name: '_amountsV1V2V3'
		}],
	}

	//质押ERC20
	static depositAndStake = {
		name: 'depositAndStake',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_amount'
		}],
	}
	//充值存款
	static deposit = {
		name: 'deposit',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_pIndex'
		},{
			type: 'uint256',
			name: '_amount'
		}],
	}
	//充值存款BNB
	static depositBNB = {
		name: 'deposit',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_pIndex'
		}],
	}
	//提现
	static withdrawCoin = {
		name: 'withdraw',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_pIndex'
		},{
			type: 'uint256',
			name: '_amount'
		}],
	}
	//领取key到开箱子合约并兑换箱子
	static getChestBox = {
		name: 'getChestBox',
		type: "function",
		inputs: [{
			type: 'uint256[]',
			name: '_pIndexArr'
		},{
			type: 'uint256',
			name: '_boxAmount'
		}],
	}

	//查看总共质押
	static totalSupply = {
		name: 'totalSupply',
		type: "function",
		inputs: [],
		outputs: [{
			type: "uint256",
			name: "_value"
		}],
	}
	//查看总共空投
	static rewardRate = {
		name: 'rewardRate',
		type: "function",
		inputs: [],
		outputs: [{
			type: "uint256",
			name: "_value"
		}],
	}
	//购买Box
	static buyBox = {
		name: 'buyBox',
		type: "function",
		inputs: [{
			type: "uint256",
			name: "_amount"
		}],
	}

	//获取可以上架的位置, 每个人目前最多可以上架MAX_ORDER个(暂定100个)--MomoStakeAuction
	static getSuggestIndex = {
		name: 'getSuggestIndex',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_owner'
		}],
		outputs: [{
			type: "uint256",
			name: "_orderIndex"
		}],
	}
	//拍卖上架--MomoStakeAuction
	static createAuction = {
		name: 'createAuction',
		type: "function",
		inputs: [{
			type: 'uint256',
			name: '_startPrice'
		}, {
			type: 'uint256',
			name: '_endPrice'
		}, {
			type: 'uint256',
			name: '_durationDay'
		}, {
			type: "uint256",
			name: "_sugestIndex"
		}, {
			type: "uint256",
			name: "_tokenId"
		}, {
			type: "uint256[]",
			name: "_ids"
		}, {
			type: "uint256[]",
			name: "_amounts"
		}],
	}
	//竞拍-MomoStakeAuction
	static bid = {
		name: 'bid',
		type: "function",
		inputs: [
			{type: 'address',name: '_auctor'}, 
			{type: 'uint256',name: '_index'}, 
			{type: 'uint256',name: '_startTime'}, 
			{type: 'uint256',name: '_price'}, 
		],
	}
	//取消上架-MomoStakeAuction
	static cancelAuction = {
		name: 'cancelAuction',
		type: "function",
		inputs: [ {
			type: 'uint256',
			name: '_index'
		}],
	}
	//修改价格-MomoStakeAuction
	static changePrice = {
		name: 'changePrice',
		type: "function",
		inputs: [ {
			type: 'uint256',
			name: '_index'
		},{
			type: 'uint256',
			name: '_startPrice'
		},{
			type: 'uint256',
			name: '_endPrice'
		},{
			type: 'uint256',
			name: '_duration'
		}],
	}
	
	//查询市场上的详情-MomoStakeAuction
	static getMarketOrder = {
		name: 'getOrder',
		type: "function",
		inputs: [{
			type: 'address',
			name: '_auctor'
		}, {
			type: 'uint256',
			name: '_index'
		}],
		outputs: [{
			type: "uint256",
			name: "status"
		},{
			type: "uint256",
			name: "startPrice"
		},{
			type: "uint256",
			name: "endPrice"
		},{
			type: "uint256",
			name: "startTime"
		},{
			type: "uint256",
			name: "durationDays"
		},{
			type: "uint256",
			name: "tokenId"
		},{
			type: "uint256[]",
			name: "ids"
		},{
			type: "uint256[]",
			name: "amounts"
		}],
	}

	//查询宝石市场上的详情-MomoStakeAuction
	static getGemMarketOrder = {
		name: 'getOrder',
		type: "function",
		inputs: [ {
			type: 'uint256',
			name: 'orderId_'
		}],
		outputs: [
			{
			"components": [
				{
				"internalType": "uint64",
				"name": "orderId",
				"type": "uint64"
				},
				{
				"internalType": "uint32",
				"name": "erc1155Id",
				"type": "uint32"
				},
				{
				"internalType": "uint32",
				"name": "startTime",
				"type": "uint32"
				},
				{
				"internalType": "uint128",
				"name": "price",
				"type": "uint128"
				},
				{
				"internalType": "uint16",
				"name": "status",
				"type": "uint16"
				},
				{
				"internalType": "uint16",
				"name": "userIndex",
				"type": "uint16"
				},
				{
				"internalType": "uint32",
				"name": "currencyId",
				"type": "uint32"
				},
				{
				"internalType": "uint32[6]",
				"name": "ids",
				"type": "uint32[6]"
				},
				{
				"internalType": "uint32[6]",
				"name": "amounts",
				"type": "uint32[6]"
				}
			],
			"internalType": "struct MoMo1155Auction.AuctionOrder",
			"name": "order",
			"type": "tuple"
			}
		],
	}

	static userStakerShow = {
		name: 'userStakerShow',
		type: "function",
		inputs: [
			{
				type: "address",
				name: "user"
			}
		],
		outputs: [
			// uint256 hrReal,         // 真实挖矿算力
      //       uint256 hrChecked,      // 校准后的算力
      //       uint256 hrFixed,        // 基础固定值算力
      //       uint256 earned,         // 待领取的MBOX
      //       uint256 amountV4,       // 达标的V4数量
      //       uint256 ,       // 达标的V5数量
      //       uint256 ,       // 达标的V6数量
      //       uint256 ,     // 全网挖矿速率
      //       uint256    // 全网总算力
			{
				type: "uint256",
				name: "hrReal",
			},
			{
				type: "uint256",
				name: "hrChecked",
			},
			{
				type: "uint256",
				name: "hrFixed",
			},
			{
				type: "uint256",
				name: "earned",
			},
			{
				type: "uint256",
				name: "amountV4",
			},
			{
				type: "uint256",
				name: "amountV5",
			},
			{
				type: "uint256",
				name: "amountV6",
			},
			{
				type: "uint256",
				name: "rewardRate",
			},
			{
				type: "uint256",
				name: "totalHashrate",
			},
		]
	}
}