import ETH from "../ETH";
import { WalletConfig, ConstantConfig, EventConfig } from "@/config";
import { EventBus, Common } from "@/utils";
import BigNumber from "bignumber.js";

export default class BigSell {
  //
  static async createAuction({ suggestIndex_, groupType, tokenIds, price_ }) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "createAuction",
          type: "function",
          inputs: [
            { name: "suggestIndex_", type: "uint256" },
            { name: "groupType", type: "uint256" },
            { name: "tokenIds", type: "uint256[]" },
            { name: "price_", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.bigSell
    );
    price_ = BigNumber(Common.numFloor(price_, 1e9)).times(BigNumber(1e18));

    let saveHash;
    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.createAuction(
          Number(suggestIndex_),
          groupType,
          tokenIds,
          ETH.numToHex(price_)
        ),
        { from: myAddr },
        (hash) => {
          saveHash = hash;
          resolve(hash);
        },
        async () => {
          await Common.app.getBigAuctionPetsMy();
          await Common.app.eth_setMyHashrate();
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        },
        () => {
          EventBus.$emit(EventConfig.CreateAuctionError, {
            chain: "eth",
            hash: saveHash,
          });
        }
      );
    });
  }
  //
  static async cancelAuction({ index_, orderId_ }, recipet) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;

    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "cancelAuction",
          type: "function",
          inputs: [
            { type: "uint256", name: "index_" },
            { type: "uint256", name: "orderId_" },
          ],
        },
      ],
      WalletConfig.ETH.bigSell
    );

    let saveHash;

    console.log(index_);

    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.cancelAuction(index_, orderId_),
        { from: myAddr },
        (hash) => {
          saveHash = hash;
          resolve(hash);
        },
        async () => {
          console.log("cancelAuction success!!!!!");
          await Common.app.getBigAuctionPetsMy();
          await Common.app.eth_setMyHashrate();
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
          recipet();
        },
        () => {
          EventBus.$emit(EventConfig.CancelAuctionError, {
            chain: "eth",
            hash: saveHash,
          });
        }
      );
    });
  }
  //
  static async bid({ auctor_, index_, orderId_, price_ }) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;

    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "bid",
          type: "function",
          inputs: [
            { type: "address", name: "auctor_" },
            { type: "uint256", name: "index_" },
            { type: "uint256", name: "orderId_" },
            { type: "uint256", name: "price_" },
          ],
        },
      ],
      WalletConfig.ETH.bigSell
    );

    price_ = BigNumber(Number(price_) + 0.0001 * 1e9).times(BigNumber(1e9));

    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.bid(auctor_, index_, orderId_, ETH.numToHex(price_)),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("buyMarketPet success!!!!!");
          await Common.app.setCoinValueByName("BUSD");
          await Common.app.eth_setMyHashrate();
          await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
          Common.app.unLockBtn("buyMomoLock");
        }
      );
    });
  }
  //
  static async changePrice({ index_, orderId_, price_ }, recipet) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;

    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "changePrice",
          type: "function",
          inputs: [
            { type: "uint256", name: "index_" },
            { type: "uint256", name: "orderId_" },
            { type: "uint256", name: "price_" },
          ],
        },
      ],
      WalletConfig.ETH.bigSell
    );

    price_ = BigNumber(Common.numFloor(price_, 1e9)).times(BigNumber(1e18));

    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.changePrice(index_, orderId_, ETH.numToHex(price_)),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("changePrice success!!!!!");
          recipet();
        }
      );
    });
  }
  //
  static async getOrder({ auctor_, index_ }) {
    let myAddr = await ETH.getAccount();
    if (!myAddr) return;

    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "getOrder",
          type: "function",
          inputs: [
            { type: "address", name: "auctor_" },
            { type: "uint256", name: "index_" },
          ],
          outputs: [
            { type: "uint256", name: "orderId" },
            { type: "uint256", name: "price" },
            { type: "uint256", name: "status" },
            { type: "uint256", name: "groupType" },
            { type: "uint256", name: "startTime" },
            { type: "uint256[]", name: "tokenIds" },
            { type: "uint256[]", name: "ids" },
          ],
        },
      ],
      WalletConfig.ETH.bigSell
    );
    return new Promise((resolve) => {
      contract.methods
        .getOrder(auctor_, index_)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }

  //
  static async getMyBigSell() {
    let myAddr = await ETH.getAccount();
    if (!myAddr) return;

    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "getGroupAuction",
          type: "function",
          inputs: [{ type: "address", name: "auctor_" }],
          outputs: [{ type: "uint256[]", name: "indexs" }],
        },
      ],
      WalletConfig.ETH.moMoHelper
    );
    return new Promise((resolve) => {
      contract.methods
        .getGroupAuction(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }
}
