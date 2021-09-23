import ETH from "../ETH";
import {WalletConfig, ConstantConfig} from '@/config'
import {Common} from '@/utils/'
import BigNumber from "bignumber.js";

export default class Enhancer {
	//给momo注入水晶
	static async addCrystal({tokenId_, hrOriginal_, crystalAmount_, mbox_},recipt){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
			"name": "addCrystal", "type": "function",
			"inputs": [
				{"name": "tokenId_","type": "uint256"},
				{"name": "hrOriginal_","type": "uint256"},
				{"name": "crystalAmount_","type": "uint256"},
				{"name": "mbox_","type": "uint256"},
			],
		}], WalletConfig.ETH.momoEnhancer);
		mbox_ = ETH.numToHex(BigNumber(Common.numFloor(mbox_, 1e9)).times(BigNumber(1e18)));
		console.log({tokenId_, hrOriginal_, crystalAmount_, mbox_});
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.addCrystal(tokenId_, hrOriginal_, crystalAmount_, mbox_), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("addCrystal success");
					Common.app.unLockBtn("addCrystalLock");
					await Common.app.setCoinValueByName("MBOX");
					await Common.app.getCrystalNum();
					recipt();
				}
			)
		});
	}
	//开始进化
	static async enhance(tokenId_, recipt){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
			"name": "enhance", "type": "function",
			"inputs": [
				{"name": "tokenId_","type": "uint256"},
			],
		}], WalletConfig.ETH.moMoStake);
		console.log({tokenId_});
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.enhance(tokenId_), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("enhance success");
					Common.app.unLockBtn("enhanceLock");
					await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
					await Common.app.eth_setMyHashrate();
					recipt();
				}
			)
		});
	}

	static async getEnhanceHash(tokenId_){
		let contract = new ETH.web3.eth.Contract([{
			"name": "getEnhanceHash", "type": "function",
			"inputs": [
				{"name": "tokenId_","type": "uint256"},
			],
			"outputs": [
				{"name": "value","type": "bytes32"},
			],
		}], WalletConfig.ETH.momoEnhancer);
		return new Promise(resolve => {
			contract.methods.getEnhanceHash(tokenId_).call().then(data => {
				resolve(data);
			})
		});
	}
}