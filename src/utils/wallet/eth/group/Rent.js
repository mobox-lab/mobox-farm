import ETH from "../ETH";
import {WalletConfig, ConstantConfig} from '@/config'
import {Common} from '@/utils/'
import BigNumber from "bignumber.js";

export default class Rent {
	//创建出租订单: 注意如果MOMO在老的租赁合约上还在租赁的, 也不能出租
	static async createRent({tokenId_, rentDays_, rentPrice_}, recipet){
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;

		let contract = new ETH.web3.eth.Contract([
			{
				"name": "createRent",
				"type": "function",
				"inputs": [
					{"name": "tokenId_","type": "uint256"},
					{"name": "rentDays_","type": "uint256"},
					{"name": "rentPrice_","type": "uint256"},
				],
			}
		], WalletConfig.ETH.momoRentV2);
		
		rentPrice_ = BigNumber(Common.numFloor(rentPrice_, 1e9)).times(BigNumber(1e18));
		console.log(WalletConfig.ETH.momoRentV2, {tokenId_, rentDays_, rentPrice_});


		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.createRent(Number(tokenId_), Number(rentDays_) ,ETH.numToHex(rentPrice_)), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("createRent success!!!!!");
					Common.app.unLockBtn("putRentLock");
					Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
					Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
					recipet();
				}
			)
		});
	}
	//取消出租
	static async cancelRent({tokenId_, orderId_}, recipet){
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "cancelRent",
				"type": "function",
				"inputs": [
					{"name": "tokenId_","type": "uint256"},
					{"name": "orderId_","type": "uint256"},
				],
			}
		], WalletConfig.ETH.momoRentV2);
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.cancelRent(Number(tokenId_), Number(orderId_)), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("cancelPutRent success!!!!!");
					Common.app.unLockBtn("cancelRentLock");
					Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
					Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
					recipet();
				}
			)
		});
	}
	//租赁
	static async rent({tokenId_, orderId_, days_, price_}){
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "rent",
				"type": "function",
				"inputs": [
					{"name": "tokenId_","type": "uint256"},
					{"name": "orderId_","type": "uint256"},
					{"name": "days_","type": "uint256"},
					{"name": "price_","type": "uint256"},
				],
			}
		], WalletConfig.ETH.momoRentV2);
		price_ = BigNumber(Common.numFloor(price_, 1e9)).times(BigNumber(1e18));
		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.rent(Number(tokenId_), Number(orderId_), Number(days_), ETH.numToHex(price_)), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("cancelPutRent success!!!!!");
					Common.app.unLockBtn("rentLock");
				}
			)
		});
	}
	//续租
	static async renewRent({tokenId_, orderId_, days_, price_}, recipet){
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "renewRent",
				"type": "function",
				"inputs": [
					{"name": "tokenId_","type": "uint256"},
					{"name": "orderId_","type": "uint256"},
					{"name": "days_","type": "uint256"},
					{"name": "price_","type": "uint256"},
				],
			}
		], WalletConfig.ETH.momoRentV2);

		price_ = BigNumber(Common.numFloor(price_, 1e9)).times(BigNumber(1e18));
		console.log(Number(tokenId_), Number(orderId_), Number(days_), ETH.numToHex(price_), "renewRent");

		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods.renewRent(Number(tokenId_), Number(orderId_), Number(days_), ETH.numToHex(price_)), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("cancelPutRent success!!!!!");
					Common.app.unLockBtn("rentLock");
					recipet();
				}
			)
		});
	}
	//获取momo出租详情
	static async getMomoRentInfo(tokenId){
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "getRentInfo",
				"type": "function",
				"inputs": [
					{"name": "tokenId_","type": "uint256"},
				],
				"outputs": [
					{"name": "orderId","type": "uint256"},
					{"name": "status","type": "uint256"},
					{"name": "rentDays","type": "uint256"},
					{"name": "owner","type": "address"},
					{"name": "startTime","type": "uint256"},
					{"name": "bidEndTime","type": "uint256"},
					{"name": "rentTime","type": "uint256"},
					{"name": "renter","type": "address"},
					{"name": "bidPrice","type": "uint256"},
					{"name": "rentPrice","type": "uint256"},
				],
			}
		], WalletConfig.ETH.momoRentV2);

		return new Promise(resolve => {
			contract.methods.getRentInfo(tokenId).call().then(data => {
				resolve(data);
			})
		});

	}
	//获取多个momo出租详情
	static async getRentInfoSimple(tokenIds){
		let contract = new ETH.web3.eth.Contract([
			{
				"name": "getRentInfoSimple",
				"type": "function",
				"inputs": [
					{"name": "tokenIds_","type": "uint256[]"},
				],
				"outputs": [
					{"name": "orderIdArray","type": "uint256[]"},
					{"name": "statusArray","type": "uint256[]"},
					{"name": "rentTimeArray","type": "uint256[]"},
					{"name": "startTimeArray","type": "uint256[]"},
				],
			}
		], WalletConfig.ETH.momoRentV2);

		return new Promise(resolve => {
			contract.methods.getRentInfoSimple(tokenIds).call().then(data => {
				resolve(data);
			})
		});

	}
}