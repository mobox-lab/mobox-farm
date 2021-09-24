import ETH from "../ETH";
import {WalletConfig, ConstantConfig} from '@/config'
import {Common} from '@/utils/'
import BigNumber from "bignumber.js";

export default class Enhancer {
	//查询我的申购信息
	static async getMyApplyInfo(){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "getUserInfo",
				"type": "function",
				"inputs": [
					{"name": "owner_","type": "address"},
				],
				"outputs": [
					{"name": "hashRateTicket", "type":"tuple", "components":[
						{"name": "ticketStartNo","type": "uint128"},
						{"name": "ticketEndNo","type": "uint128"},
					]},
					{"name": "veMoboxTicket", "type":"tuple", "components":[
						{"name": "ticketStartNo","type": "uint128"},
						{"name": "ticketEndNo","type": "uint128"},
					]},
					{"name": "boxAmount", "type":"uint256"},
					{"name": "frozenBalance", "type":"uint256"}
				],
			}
		], WalletConfig.ETH.mecBoxApply);

		return new Promise(resolve => {
			contract.methods.getUserInfo(myAddr).call().then(data => {
				resolve(data);
			})
		});
	}
	//查询申购状态
	static async getRoundInfo(){
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "getRoundInfo",
				"type": "function",
				"inputs": [],
				"outputs": [
					{"name": "round","type": "uint256"},
					{"name": "price","type": "uint256"},
					{"name": "startTime","type": "uint256"},
					{"name": "roundState","type": "uint256"},
					{"name": "maxHighAmount","type": "uint256"},

					{"name": "nowVeMoboxAmounts","type": "uint256"},
					{"name": "nowHashRateAmounts","type": "uint256"},
					{"name": "maxHashRateLuckyAmount","type": "uint256"},
					{"name": "maxVeMoboxLuckyAmount","type": "uint256"},
					{"name": "roundDuration","type": "uint256"},
				],
			}
		], WalletConfig.ETH.mecBoxApply);
		return new Promise(resolve => {
			contract.methods.getRoundInfo().call().then(data => {
				resolve(data);
			})
		});
	}
	//申购 fcName: veMoboxApply, hashRateApply
	static async applyBuy(fcName, applyNum_, recipt){
		console.log({fcName, applyNum_});
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
				"name": fcName, "type": "function",
				"inputs": [
					{"name": "applyNum_","type": "uint256"},
				],
				"outputs": [],
		}], WalletConfig.ETH.mecBoxApply);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods[fcName](applyNum_), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log(fcName +" success");
					Common.app.unLockBtn("applyBuyLock");
					recipt();
				}
			)
		});
	}
	//领取冻结的MBOX
	static async claimfrozenMbox(recipt){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
				"name": "claimfrozenMbox", "type": "function",
				"inputs": [],
				"outputs": [],
		}], WalletConfig.ETH.mecBoxApply);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.claimfrozenMbox(), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("claimfrozenMbox success");
					Common.app.unLockBtn("takeMboxLock");
					Common.app.setCoinValueByName("MBOX");
					recipt();
				}
			)
		});
	}
	//领取申购到的箱子
	static async claimfrozenBox(recipt){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
				"name": "claimfrozenBox", "type": "function",
				"inputs": [],
				"outputs": [],
		}], WalletConfig.ETH.mecBoxApply);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.claimfrozenBox(), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("claimfrozenBox success");
					Common.app.unLockBtn("takeBoxLock");
					Common.app.getNewBoxNum();
					recipt();
				}
			)
		});
	}
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
	//查询注入状态
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