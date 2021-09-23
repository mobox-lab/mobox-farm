import ETH from "../ETH";
import {WalletConfig} from '@/config'
import {Common} from '@/utils/'

export default class Enhancer {
	//给momo注入水晶
	static async addCrystal({tokenId_, hrOriginal_, crystalAmount_},recipt){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
			"name": "addCrystal", "type": "function",
			"inputs": [
				{"name": "tokenId_","type": "uint256"},
				{"name": "hrOriginal_","type": "uint256"},
				{"name": "crystalAmount_","type": "uint256"},
			],
		}], WalletConfig.ETH.newGemApply);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.addCrystal(tokenId_, hrOriginal_, crystalAmount_), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("addCrystal success");
					Common.app.unLockBtn("takeMboxLock");
					Common.app.setCoinValueByName("MBOX");
					recipt();
				}
			)
		});
	}
	//开始进化
	static async enhance({tokenId_, mboxAmount_}, recipt){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
			"name": "enhance", "type": "function",
			"inputs": [
				{"name": "tokenId_","type": "uint256"},
				{"name": "mboxAmount_","type": "uint256"},
			],
		}], WalletConfig.ETH.newGemApply);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.enhance(tokenId_, mboxAmount_), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("enhance success");
					Common.app.unLockBtn("takeMboxLock");
					Common.app.setCoinValueByName("MBOX");
					recipt();
				}
			)
		});
	}
}