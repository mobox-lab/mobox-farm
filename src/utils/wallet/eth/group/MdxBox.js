import ETH from "../ETH";
import { WalletConfig } from "@/config";
import { Common } from "@/utils/";

export default class MdxBox {
  //
  static async getMdxBoxNum() {
    let myAddr = await ETH.getAccount();
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "balanceOf",
          type: "function",
          inputs: [
            { name: "owner_", type: "address" },
            { name: "id_", type: "uint256" },
          ],
          outputs: [{ name: "num", type: "uint256" }],
        },
      ],
      WalletConfig.ETH.openMdxBox
    );
    return new Promise((resolve) => {
      contract.methods
        .balanceOf(myAddr, 1)
        .call()
        .then((data) => {
          resolve(data);
        });
    });
  }
  //
  static async openBox(amount_, recipt) {
    console.log("openBox", amount_);
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "openBox",
          type: "function",
          inputs: [{ name: "amount_", type: "uint256" }],
          outputs: [{ name: "openResult", type: "uint256[]" }],
        },
      ],
      WalletConfig.ETH.openMdxBox
    );
    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.openBox(amount_),
        { from: myAddr },
        (hash) => resolve(hash),
        async (data) => {
          console.log("openBox success", data);
          Common.app.unLockBtn("openActivityBoxLock");

          let topic =
            "0xcb36cbe73c71192b22f5002fb14ce1aad6fbf3dbefa788903c5ec22d5edf7612";
          let eventAbi = [
            {
              indexed: false,
              internalType: "address",
              name: "taker",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "luckyAmounts",
              type: "uint256[]",
            },
          ];
          recipt(ETH.parseEvent(data, topic, eventAbi));
        }
      );
    });
  }
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
              name: "userNormalTicket",
              type: "tuple",
              components: [
                { name: "ticketStartNo", type: "uint128" },
                { name: "ticketEndNo", type: "uint128" },
              ],
            },
            {
              name: "userHighTicket",
              type: "tuple",
              components: [
                { name: "ticketStartNo", type: "uint128" },
                { name: "ticketEndNo", type: "uint128" },
              ],
            },
            { name: "boxAmount", type: "uint256" },
            { name: "frozenBalance", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.mdxApply
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
            { name: "maxHighAmount", type: "uint256" },
            { name: "nowHighAmount", type: "uint256" },
            { name: "nowNormalAmount", type: "uint256" },
            { name: "maxNormalLuckyAmount", type: "uint256" },
            { name: "maxHighLuckyAmount", type: "uint256" },
            { name: "roundDuration", type: "uint256" },
          ],
        },
      ],
      WalletConfig.ETH.mdxApply
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
  static async hApplyForBox(applyNum_, recipt) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "hApplyForBox",
          type: "function",
          inputs: [{ name: "applyNum_", type: "uint256" }],
          outputs: [],
        },
      ],
      WalletConfig.ETH.mdxApply
    );
    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.hApplyForBox(applyNum_),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("hApplyForBox success");
          Common.app.unLockBtn("applyMdxBoxLock");
          recipt();
        }
      );
    });
  }
  //
  static async claimfrozenBox(recipt) {
    let myAddr = await ETH.getAccount(true);
    if (!myAddr) return;
    let contract = new ETH.web3.eth.Contract(
      [
        {
          name: "claimfrozenBox",
          type: "function",
          inputs: [],
          outputs: [],
        },
      ],
      WalletConfig.ETH.mdxApply
    );
    return new Promise((resolve) => {
      ETH.sendMethod(
        contract.methods.claimfrozenBox(),
        { from: myAddr },
        (hash) => resolve(hash),
        async () => {
          console.log("claimfrozenBox success");
          Common.app.unLockBtn("takeMdxBoxLock");
          recipt();
        }
      );
    });
  }
}
