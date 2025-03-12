import ETH from "../ETH";
import { WalletConfig } from "@/config";
import { Common } from "@/utils/";

export default class Gem {
  //
  static async getMyApplyInfo() {
    let myAddr = await ETH.getAccount();
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "getUserInfo",
          type: "function",
          inputs: [{ name: "owner_", type: "address" }],
          outputs: [
            {
              name: "veMoboxTicket",
              type: "tuple",
              components: [
                { name: "ticketStartNo", type: "uint128" },
                { name: "ticketEndNo", type: "uint128" },
              ],
            },
            {
              name: "hashRateTicket",
              type: "tuple",
              components: [
                { name: "ticketStartNo", type: "uint128" },
                { name: "ticketEndNo", type: "uint128" },
              ],
            },
            {
              name: "gems",
              type: "tuple",
              components: [
                { name: "red", type: "uint256" },
                { name: "green", type: "uint256" },
                { name: "blue", type: "uint256" },
                { name: "gold", type: "uint256" },
              ],
            },
            { name: "frozenBalance", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.newGemApply
    );

    return new Promise((resolve) => {
      contract.methods
        .getUserInfo(myAddr)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }
  //
  static async getRoundInfo() {
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "getRoundInfo",
          type: "function",
          inputs: [],
          outputs: [
            { name: "round", type: "uint256" },
            { name: "price", type: "uint256" },
            { name: "startTime", type: "uint256" },
            { name: "roundState", type: "uint256" },
            { name: "maxHashRateAmount", type: "uint256" },
            {
              name: "nowHashRateAmounts",
              type: "tuple",
              components: [
                { name: "red", type: "uint256" },
                { name: "green", type: "uint256" },
                { name: "blue", type: "uint256" },
                { name: "gold", type: "uint256" },
              ],
            },
            { name: "maxVeMoboxAmount", type: "uint256" },
            {
              name: "nowVeMoboxAmounts",
              type: "tuple",
              components: [
                { name: "red", type: "uint256" },
                { name: "green", type: "uint256" },
                { name: "blue", type: "uint256" },
                { name: "gold", type: "uint256" },
              ],
            },
            { name: "maxHashRateLuckyAmount", type: "uint256" },
            { name: "maxVeMoboxLuckyAmount", type: "uint256" },
            { name: "roundDuration", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.newGemApply
    );
    return new Promise((resolve) => {
      contract.methods
        .getRoundInfo()
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }
  //
  static async applyForGem(fcName, gemType_, applyNum_, recipt) {
    console.log({ fcName, gemType_, applyNum_ });
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: fcName,
          type: "function",
          inputs: [
            { name: "gemType_", type: "uint256" },
            { name: "applyNum_", type: "uint256" },
          ],
          outputs: [],
        },
      ],
      WalletConfig.ETH.newGemApply
    );
    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods[fcName](gemType_, applyNum_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("hashRateApplyForGem success");
          Common.app.unLockBtn("applyGemLock");
          recipt();
        }
      );
    });
  }
  //
  static async claimfrozenMbox(recipt) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "claimfrozenMbox",
          type: "function",
          inputs: [],
          outputs: [],
        },
      ],
      WalletConfig.ETH.newGemApply
    );
    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.claimfrozenMbox(),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("claimfrozenMbox success");
          Common.app.unLockBtn("takeMboxLock");
          Common.app.setCoinValueByName("MBOX");
          recipt();
        }
      );
    });
  }
  //
  static async claimfrozenGem(recipt) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "claimfrozenGem",
          type: "function",
          inputs: [],
          outputs: [],
        },
      ],
      WalletConfig.ETH.newGemApply
    );
    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.claimfrozenGem(),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("claimfrozenGem success");
          Common.app.unLockBtn("takeGemLock");
          Common.app.getGemBag();
          recipt();
        }
      );
    });
  }
}
