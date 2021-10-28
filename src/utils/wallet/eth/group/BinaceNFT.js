import ETH from "../ETH";
import {WalletConfig, ConstantConfig} from '@/config'
import {Common} from '@/utils/'

export default class BinaceNFT {
	static BinaceNFTToken = "0x4e781783C1B22E2a571F6F9A5DCD1798646C5EeB"
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "setApprovalForAll",
				"type": "function",
				"inputs": [
					{"name": "_operator","type": "address"},
					{"name": "approved_","type": "bool"},
				]
			}

		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.setApprovalForAll(WalletConfig.ETH.binanceNFT, true), {from: myAddr},
				hash=>resolve(hash),
				async (data)=>{
					console.log("approveForAll success", data);
					Common.app.unLockBtn("approveLock");
					recipt();
				}
			)
		});
	}
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "isApprovedForAll",
				"type": "function",
				"inputs": [
					{"name": "_owner","type": "address"},
					{"name": "_operator","type": "address"},
				],
				"outputs": [
					{"name": "_isApproved","type": "bool"},
				]
			}
		return new Promise(resolve => {
			contract.methods.isApprovedForAll(myAddr, WalletConfig.ETH.binanceNFT).call().then(isApproved => {
				resolve(isApproved);
			});
		});
	}
	static async getMyNFTList(){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "getBNNFTByOwner",
				"type": "function",
				"inputs": [
					{"name": "addr_","type": "address"},
				],
				"outputs": [
					{"name": "tokens","type": "uint256[]"},
				]
			}
		],WalletConfig.ETH.binanceNFT);
		return new Promise(resolve => {
			contract.methods.getBNNFTByOwner(myAddr).call().then(data => {
				resolve(data);
			})
		});
	}

	static async getBNFTData(bnNFTTokenIds_){
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "getBNNFTData",
				"type": "function",
				"inputs": [
					{"name": "bnNFTTokenIds_","type": "uint256[]"},
				],
				"outputs": [
					{"name": "prototypes","type": "uint256[]"},
					{"name": "claimers","type": "address[]"},
				]
			}
		],WalletConfig.ETH.binanceNFT);
		return new Promise(resolve => {
			contract.methods.getBNNFTData(bnNFTTokenIds_).call().then(data => {
				resolve(data);
			})
		});
	}

	static async claim(bnNFTTokenId, recipt){
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "claim",
				"type": "function",
				"inputs": [
					{"name": "bnNFTTokenId","type": "uint256"},
				]
			}
		],WalletConfig.ETH.binanceNFT);
		console.log(bnNFTTokenId, "claim");
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.claim(bnNFTTokenId), {from: myAddr},
				hash=>resolve(hash),
				async (data)=>{
					console.log("claim success", data);
					await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.WALLET);
					Common.app.unLockBtn("claimBNFTLock");
					recipt();
				}
			)
		});
	}
}