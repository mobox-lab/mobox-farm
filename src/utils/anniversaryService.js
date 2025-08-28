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

<<<<<<< HEAD
// Utility function: test: 🧪 add regression tests
export const test____add_regression_tests = {
  format: (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input) => {
    return input && input.length > 0;
  },
  transform: (data) => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
=======
const handleError = (error) => {
  console.error('Error occurred:', error);
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  return false;
};

const safeExecute = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
>>>>>>> bugfix/wallet-timeout
  }
};
export const utilityFunction = (param) => {
  console.log('Executing utility function:', param);
  return param;
};

const handleError = (error) => {
  console.error('Error occurred:', error);
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  return false;
};

const safeExecute = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  console.error('Error occurred:', error);
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  return false;
};

const safeExecute = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// Internationalization: perf: ⚡ improve startup time
export const messages = {
  en: {
    perf____improve_startup_time: 'perf: ⚡ improve startup time',
    perf____improve_startup_time_description: 'Description for perf: ⚡ improve startup time'
  },
  zh: {
    perf____improve_startup_time: 'perf: ⚡ improve startup time',
    perf____improve_startup_time_description: 'perf: ⚡ improve startup time的描述'
  }
};
