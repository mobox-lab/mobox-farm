import axios from "axios";
import { Wallet } from "@/utils";

const instance = axios.create({
  baseURL: "https://nftapi.mobox.io/third_annual/",
});

instance.interceptors.response.use((response) => {
  if (response.status == 200) {
    return response.data;
  }

  return Promise.reject(response.data);
});

//
export async function getScore() {
  const address = await Wallet.ETH.getAccount();
  return await instance.get(`score/${address}`);
}

//
export async function getTaskStatus() {
  const address = await Wallet.ETH.getAccount();
  const { tasks } = await instance.get(`task/${address}`);
  return tasks;
}

//
export async function getAirdrop() {
  const address = await Wallet.ETH.getAccount();

  const result = await axios.get("https://airdrop.mobox.io/airdrop/mbox", {
    params: {
      addr: address,
    },
  });

  if (result.status === 200) {
    return result.data.data;
  }

  throw result.data.data;
}

//
export async function getLotteryResults() {
  const address = await Wallet.ETH.getAccount();
  const result = await axios.get("https://airdrop.mobox.io/airdrop/1155", {
    params: {
      addr: address,
    },
  });

  if (result.status === 200) {
    return result.data.data;
  }

  throw result.data.data;
}

//
export async function claimPoint(type) {
  const address = await Wallet.ETH.getAccount();
  const now = Math.floor(Date.now() / 3600000);
  const message = `mobox_momo_server_${now}`;
  const sign = await Wallet.ETH.signStr(message);

  await instance.post("claim", {
    sign,
    type,
    owner: address,
  });
}
