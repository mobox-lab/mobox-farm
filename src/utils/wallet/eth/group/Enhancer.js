import ETH from "../ETH";
import {WalletConfig, ConstantConfig} from '@/config'
import {Common} from '@/utils/'
import BigNumber from "bignumber.js";

export default class Enhancer {
	static async getMecBoxOrder(){
		let myAddr = await ETH.getAccount();
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "getOrder",
				"type": "function",
				"inputs": [
					{"name": "addr_","type": "address"},
				],
				"outputs": [
					{"name": "boxAmount","type": "uint256"},
					{"name": "blockHash","type": "bytes32"},
				]
			}
		],WalletConfig.ETH.mecBoxMinter);
		return new Promise(resolve => {
			contract.methods.getOrder(myAddr).call().then(data => {
				resolve(data);
			})
		});
	}
	//打开水晶箱子
	static async mecBoxmint(amount_,recipt){
		console.log(amount_);
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "mint",
				"type": "function",
				"inputs": [
					{"name": "mint","type": "uint256"},
				],
			}
		],WalletConfig.ETH.mecBoxMinter);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.mint(amount_), {from: myAddr},
				hash=>resolve(hash),
				async (data)=>{
					console.log("mecBoxmint success", data);
					Common.app.unLockBtn("openMecBoxLock");

					let topic = "0x3b47c811ba1d2521c9cd69be0de54739ab4b43cdbe22214bf6dcd2c46a7eeba5";
					let eventAbi = [
							{ "indexed": true, "internalType": "address", "name": "user", "type": "address" },
							{ "indexed": false, "internalType": "uint256[]", "name": "crystalAmounts", "type": "uint256[]" },
					]

					Common.app.$refs.boxBag.showOpenBox('mec',ETH.parseEvent(data, topic, eventAbi).crystalAmounts);
					Common.app.getCrystalNum();
					recipt();
				}
			)
		});
	}
	//解锁水晶箱子
	static async addMysteryBox(amount_, recipt){
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "addMysteryBox",
				"type": "function",
				"inputs": [
					{"name": "amount_","type": "uint256"},
				],
			}
		],WalletConfig.ETH.mecBoxMinter);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.addMysteryBox(amount_), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("addMysteryBox success");
					Common.app.unLockBtn("unlockMecBoxLock");
					await Common.app.getNewBoxNum();
					recipt();
				}
			)
		});
	}
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
		let myAddr = await ETH.getAccount(true);
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
		let myAddr = await ETH.getAccount(true);
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
		let myAddr = await ETH.getAccount(true);
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
		let myAddr = await ETH.getAccount(true);
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
		mbox_ = ETH.numToHex(BigNumber(mbox_).times(BigNumber(1e18)));
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
		let myAddr = await ETH.getAccount(true);
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
					await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
					await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
					await Common.app.eth_setMyHashrate();
					Common.app.unLockBtn("enhanceLock");
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

	//进化2.0版本
	static async enhanceV2({tokenId_,hrUp_,crystal_}, recipt, isMoMoVerse = false){
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([{
			"name": "enhance", "type": "function",
			"inputs": [
				{"name": "tokenId_","type": "uint256"},
				{"name": "hrUp_","type": "uint256"},
				{"name": "crystal_","type": "uint256"},
			],
		}], isMoMoVerse?WalletConfig.ETH.momoVerse: WalletConfig.ETH.moMoStake); 
		console.log({tokenId_});
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.enhance(tokenId_,hrUp_,crystal_), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					console.log("enhance success");
					if(isMoMoVerse){
						await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
					}else{
						await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
						await Common.app.eth_setMyHashrate();
					}
					await Common.app.getCrystalNum();
					Common.app.unLockBtn("enhanceLock");
					recipt();
				}
			)
		});
	}

	// 批量进化
	static async batchEnhance(tokenIds, hrUps, crystals, isVerse) {
		const address = await ETH.getAccount(true);

		if (address) {
			const contract = new ETH.web3.eth.Contract([{
				"name": "enhance",
				"type": "function",
				"inputs": [
					{"name": "tokenIds_","type": "uint256[]"},
					{"name": "hrUps_","type": "uint256[]"},
					{"name": "crystals_","type": "uint256[]"},
				],
			}], isVerse ? WalletConfig.ETH.momoVerse : WalletConfig.ETH.moMoStake);

			return new Promise((resolve) => {
				ETH.sendMethod(
					contract.methods.enhance(tokenIds, hrUps, crystals), {from: address},
					resolve,
					() => {
						setTimeout(async () => {
							await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
							await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
							await Common.app.eth_setMyHashrate();
							await Common.app.getCoinValue();
						}, 2000);
					}
				);
			});
		}
	}
}