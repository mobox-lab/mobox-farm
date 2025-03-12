export default class Contract {
  //
  static inlayQuickLvUp = {
    type: "function",
    name: "inlayQuickLvUp",
    inputs: [
      {
        type: "uint256",
        name: "momoId_",
      },
      {
        type: "uint256",
        name: "pos_",
      },
    ],
    outputs: [],
  };
  //
  static takeOff = {
    type: "function",
    name: "takeOff",
    inputs: [
      {
        type: "uint256",
        name: "momoId_",
      },
      {
        type: "uint256",
        name: "pos_",
      },
    ],
    outputs: [],
  };
  //
  static takeOn = {
    type: "function",
    name: "takeOn",
    inputs: [
      {
        type: "uint256",
        name: "momoId_",
      },
      {
        type: "uint256",
        name: "gemId_",
      },
      {
        type: "uint256",
        name: "pos_",
      },
    ],
    outputs: [],
  };
  //
  static getInlayInfoBatch = {
    type: "function",
    name: "getInlayInfoBatch",
    inputs: [
      {
        type: "uint256[]",
        name: "momoIds_",
      },
    ],
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "red",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "green",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "yellow",
            type: "uint256",
          },
        ],
        internalType: "struct MoMoInlay.Inlay[]",
        name: "inlayInfos",
        type: "tuple[]",
      },
    ],
  };
  //
  static getInlayInfo = {
    type: "function",
    name: "getInlayInfo",
    inputs: [
      {
        type: "uint256",
        name: "momoId_",
      },
    ],
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "red",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "green",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "yellow",
            type: "uint256",
          },
        ],
        internalType: "struct MoMoInlay.Inlay",
        name: "inlayInfo",
        type: "tuple",
      },
    ],
  };
  //
  static isHighApplying = {
    type: "function",
    name: "isHighApplying",
    inputs: [
      {
        type: "address",
        name: "owner_",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "hasApply",
      },
    ],
  };
  //
  static claimfrozenMbox = {
    type: "function",
    name: "claimfrozenMbox",
    inputs: [],
    outputs: [],
  };
  //
  static claimfrozenGem = {
    type: "function",
    name: "claimfrozenGem",
    inputs: [],
    outputs: [],
  };
  //
  static nApplyForGem = {
    type: "function",
    name: "nApplyForGem",
    inputs: [
      {
        type: "uint256",
        name: "applyNum_",
      },
    ],
    outputs: [],
  };
  //
  static hApplyForGem = {
    type: "function",
    name: "hApplyForGem",
    inputs: [
      {
        type: "uint256",
        name: "applyNum_",
      },
    ],
    outputs: [],
  };

  static getBoxUserInfo = {
    type: "function",
    name: "getUserInfo",
    inputs: [
      {
        type: "address",
        name: "owner",
      },
    ],
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            type: "uint128",
          },
          {
            internalType: "uint128",
            type: "uint128",
          },
        ],
        internalType: "struct GemMinter.Ticket",
        name: "userNormalTicket",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint128",
            type: "uint128",
          },
          {
            internalType: "uint128",
            type: "uint128",
          },
        ],
        internalType: "struct GemMinter.Ticket",
        name: "userHighTicket",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "boxAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "frozenBalance",
        type: "uint256",
      },
    ],
  };

  //
  static getUserInfo = {
    type: "function",
    name: "getUserInfo",
    inputs: [
      {
        type: "address",
        name: "owner",
      },
    ],
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            type: "uint128",
          },
          {
            internalType: "uint128",
            type: "uint128",
          },
        ],
        internalType: "struct GemMinter.Ticket",
        name: "userNormalTicket",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint128",
            type: "uint128",
          },
          {
            internalType: "uint128",
            type: "uint128",
          },
        ],
        internalType: "struct GemMinter.Ticket",
        name: "userHighTicket",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "red",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "green",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "yellow",
            type: "uint256",
          },
        ],
        internalType: "struct GemMinter.InlayPosition",
        name: "gems",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "frozenBalance",
        type: "uint256",
      },
    ],
  };
  //
  static getRoundInfo = {
    type: "function",
    name: "getRoundInfo",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "roundIndex",
      },
      {
        type: "uint256",
        name: "roundPrice",
      },
      {
        type: "uint256",
        name: "roundStartTime",
      },
      {
        type: "uint256",
        name: "roundState",
      },
      {
        type: "uint256",
        name: "maxAmount",
      },
      {
        type: "uint256",
        name: "nowAmount",
      },
      {
        type: "uint256",
        name: "nowNormalAmount",
      },
      {
        type: "uint256",
        name: "maxNormalLuckyAmount",
      },
      {
        type: "uint256",
        name: "maxLuckyAmount",
      },
      {
        type: "uint256",
        name: "roundDuration",
      },
    ],
  };
  //
  static balanceOfOneBatch = {
    type: "function",
    name: "balanceOfOneBatch",
    inputs: [
      {
        type: "address",
        name: "ownerAddress",
      },
      {
        type: "uint256[]",
        name: "_ids",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "_values",
      },
    ],
  };
  //
  static levelUpGem = {
    type: "function",
    name: "levelUp",
    inputs: [
      {
        type: "uint256",
        name: "_gemId",
      },
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };

  static getUserFarmInfos = {
    type: "function",
    name: "getUserFarmInfos",
    inputs: [
      {
        type: "uint256[]",
        name: "pindexArr",
      },
      {
        type: "address",
        name: "fromAddress",
      },
    ],
    outputs: [
      {
        components: [
          {
            type: "uint256[]",
            name: "wantAmounts",
          },
          {
            type: "uint256[]",
            name: "workingBalances",
          },
          {
            type: "uint256[]",
            name: "gracePeriods",
          },
          {
            type: "uint256[]",
            name: "pkeys",
          },
          {
            type: "uint256",
            name: "rewardStore",
          },
        ],
        internalType: "struct MoMoHelper.FarmInfo",
        name: "ret",
        type: "tuple",
      },
    ],
  };
  //
  static getPricePerFullShare = {
    type: "function",
    name: "getPricePerFullShare",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "_value",
      },
    ],
  };
  //
  static balanceOf = {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        type: "address",
        name: "ownerAddress",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_value",
      },
    ],
  };
  //
  static approve = {
    name: "approve",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_spender",
      },
      {
        type: "uint256",
        name: "_value",
      },
    ],
  };
  //
  static allowance = {
    name: "allowance",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
      {
        type: "address",
        name: "_spender",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_value",
      },
    ],
  };
  //
  static addBox = {
    name: "addBox",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_to",
      },
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };
  //
  static addMysteryBox = {
    name: "addMysteryBox",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_to",
      },
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };
  //
  static mint = {
    name: "mint",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_to",
      },
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };
  //
  static getOrder = {
    name: "getOrder",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_boxAmount",
      },
      {
        type: "bytes32",
        name: "_blockHash",
      },
    ],
  };
  //
  static balanceOfOneBatch = {
    name: "balanceOfOneBatch",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
      {
        type: "uint256[]",
        name: "_memoryids",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "_amounts",
      },
    ],
    stateMutability: "view",
  };
  //
  static isApprovedForAll = {
    name: "isApprovedForAll",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
      {
        type: "address",
        name: "_operator",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "_isApproved",
      },
    ],
    stateMutability: "view",
  };
  //
  static setApprovalForAll = {
    name: "setApprovalForAll",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
      {
        type: "bool",
        name: "_approved",
      },
    ],
  };
  //
  static getMomoByTokenId = {
    name: "getMomoByTokenId",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "tokenId",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "attrs",
      },
    ],
  };

  //
  static levelUp = {
    name: "levelUp",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_tokenId",
      },
      {
        type: "uint256[]",
        name: "_protosV1V2V3",
      },
      {
        type: "uint256[]",
        name: "_amountsV1V2V3",
      },
    ],
  };
  //
  static setMomoName = {
    name: "setMomoName",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_tokenId",
      },
      {
        type: "bytes",
        name: "_name",
      },
    ],
  };
  //
  static addMomoStory = {
    name: "addMomoStory",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_tokenId",
      },
      {
        type: "bytes",
        name: "_story",
      },
    ],
  };
  //
  static getMomoName = {
    name: "getMomoName",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_tokenId",
      },
    ],
    outputs: [
      {
        type: "bytes",
        name: "_name",
      },
    ],
  };
  //
  static getMomoStory = {
    name: "getMomoStory",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_tokenId",
      },
      {
        type: "uint256",
        name: "_start",
      },
      {
        type: "uint256",
        name: "_count",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_allSize",
      },
      {
        type: "bytes[]",
        name: "_storys",
      },
    ],
  };
  //
  static getMomosVerse = {
    name: "getMomosVerse",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_ower",
      },
      {
        type: "uint256[]",
        name: "_ids",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "_ids",
      },
      {
        type: "uint256[]",
        name: "_amounts",
      },
      {
        type: "uint256[]",
        name: "_tokenIds",
      },
      {
        type: "uint256[]",
        name: "_attrs",
      },
    ],
  };
  //
  static getMomosWallet = {
    name: "getMomosWallet",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_ower",
      },
      {
        type: "uint256[]",
        name: "_ids",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "_ids",
      },
      {
        type: "uint256[]",
        name: "_amounts",
      },
      {
        type: "uint256[]",
        name: "_tokenIds",
      },
      {
        type: "uint256[]",
        name: "_attrs",
      },
    ],
  };
  //
  static getMomosStake = {
    name: "getMomosStake",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_ower",
      },
      {
        type: "uint256[]",
        name: "_ids",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "_ids",
      },
      {
        type: "uint256[]",
        name: "_amounts",
      },
      {
        type: "uint256[]",
        name: "_tokenIds",
      },
      {
        type: "uint256[]",
        name: "_attrs",
      },
    ],
  };
  //
  static getMomosAuction = {
    name: "getMomosAuction",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_ower",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "_ids",
      },
      {
        type: "uint256[]",
        name: "_amounts",
      },
      {
        type: "uint256[]",
        name: "_tokenIds",
      },
      {
        type: "uint256[]",
        name: "_attrs",
      },
    ],
  };
  //
  static getMomoNames = {
    name: "getMomoNames",
    type: "function",
    inputs: [
      {
        type: "uint256[]",
        name: "_tokenIds",
      },
    ],
    outputs: [
      {
        type: "bytes[]",
        name: "_names",
      },
    ],
  };
  //
  static stake = {
    name: "stake",
    type: "function",
    inputs: [
      {
        type: "uint256[]",
        name: "_ids",
      },
      {
        type: "uint256[]",
        name: "_amounts",
      },
      {
        type: "uint256[]",
        name: "_tokenIds",
      },
    ],
  };
  //
  static withdrawMomo = {
    name: "withdraw",
    type: "function",
    inputs: [
      {
        type: "uint256[]",
        name: "_ids",
      },
      {
        type: "uint256[]",
        name: "_amounts",
      },
      {
        type: "uint256[]",
        name: "_tokenIds",
      },
    ],
  };
  //
  static getReward = {
    name: "getReward",
    type: "function",
    inputs: [],
  };
  //
  static getRewardKey = {
    name: "getReward",
    type: "function",
    inputs: [
      {
        type: "uint256[]",
        name: "pIndexArr",
      },
    ],
  };
  //
  static earned = {
    name: "earned",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_value",
      },
    ],
  };
  //
  static userHashrate = {
    name: "userHashrate",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_hashrate",
      },
    ],
  };
  //
  static totalHashrate = {
    name: "totalHashrate",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "_hashrate",
      },
    ],
  };

  //
  static mintAndStake = {
    name: "mintAndStake",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };

  //
  static levelUpStake = {
    name: "levelUp",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_tokenId",
      },
      {
        type: "uint256[]",
        name: "_protosV1V2V3",
      },
      {
        type: "uint256[]",
        name: "_amountsV1V2V3",
      },
    ],
  };

  //
  static depositAndStake = {
    name: "depositAndStake",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };
  //
  static deposit = {
    name: "deposit",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_pIndex",
      },
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };
  //
  static depositBNB = {
    name: "deposit",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_pIndex",
      },
    ],
  };
  //
  static withdrawCoin = {
    name: "withdraw",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_pIndex",
      },
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };
  //
  static getChestBox = {
    name: "getChestBox",
    type: "function",
    inputs: [
      {
        type: "uint256[]",
        name: "_pIndexArr",
      },
      {
        type: "uint256",
        name: "_boxAmount",
      },
    ],
  };

  //
  static totalSupply = {
    name: "totalSupply",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "_value",
      },
    ],
  };
  //
  static rewardRate = {
    name: "rewardRate",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "_value",
      },
    ],
  };
  //
  static buyBox = {
    name: "buyBox",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_amount",
      },
    ],
  };

  //
  static getSuggestIndex = {
    name: "getSuggestIndex",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "_orderIndex",
      },
    ],
  };
  //
  static createAuction = {
    name: "createAuction",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_startPrice",
      },
      {
        type: "uint256",
        name: "_endPrice",
      },
      {
        type: "uint256",
        name: "_durationDay",
      },
      {
        type: "uint256",
        name: "_sugestIndex",
      },
      {
        type: "uint256",
        name: "_tokenId",
      },
      {
        type: "uint256[]",
        name: "_ids",
      },
      {
        type: "uint256[]",
        name: "_amounts",
      },
    ],
  };
  //
  static bid = {
    name: "bid",
    type: "function",
    inputs: [
      { type: "address", name: "_auctor" },
      { type: "uint256", name: "_index" },
      { type: "uint256", name: "_startTime" },
      { type: "uint256", name: "_price" },
    ],
  };
  //
  static cancelAuction = {
    name: "cancelAuction",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_index",
      },
    ],
  };
  //
  static changePrice = {
    name: "changePrice",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "_index",
      },
      {
        type: "uint256",
        name: "_startPrice",
      },
      {
        type: "uint256",
        name: "_endPrice",
      },
      {
        type: "uint256",
        name: "_duration",
      },
    ],
  };

  //
  static getMarketOrder = {
    name: "getOrder",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_auctor",
      },
      {
        type: "uint256",
        name: "_index",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "status",
      },
      {
        type: "uint256",
        name: "startPrice",
      },
      {
        type: "uint256",
        name: "endPrice",
      },
      {
        type: "uint256",
        name: "startTime",
      },
      {
        type: "uint256",
        name: "durationDays",
      },
      {
        type: "uint256",
        name: "tokenId",
      },
      {
        type: "uint256[]",
        name: "ids",
      },
      {
        type: "uint256[]",
        name: "amounts",
      },
    ],
  };

  //
  static getGemMarketOrder = {
    name: "getOrder",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "orderId_",
      },
    ],
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "orderId",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "erc1155Id",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "startTime",
            type: "uint32",
          },
          {
            internalType: "uint128",
            name: "price",
            type: "uint128",
          },
          {
            internalType: "uint16",
            name: "status",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "userIndex",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "currencyId",
            type: "uint32",
          },
          {
            internalType: "uint32[6]",
            name: "ids",
            type: "uint32[6]",
          },
          {
            internalType: "uint32[6]",
            name: "amounts",
            type: "uint32[6]",
          },
        ],
        internalType: "struct MoMo1155Auction.AuctionOrder",
        name: "order",
        type: "tuple",
      },
    ],
  };

  static tokensOfOwner = {
    name: "tokensOfOwner",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_owner",
      },
    ],
    outputs: [
      {
        type: "uint256[]",
        name: "tokenIds",
      },
    ],
  };

  static recallAll = {
    name: "recallAll",
    type: "function",
    inputs: [
      {
        type: "uint256[]",
        name: "ids_",
      },
      {
        type: "uint256[]",
        name: "amounts_",
      },
    ],
  };

  static userStakerShow = {
    name: "userStakerShow",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "user",
      },
    ],
    outputs: [
      //
      //
      //
      //
      //
      //
      //
      //
      //
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
    ],
  };

  static claimAirdrop = {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "mboxAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  };

  static isClaimedAirdrop = {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "isClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  };
}
