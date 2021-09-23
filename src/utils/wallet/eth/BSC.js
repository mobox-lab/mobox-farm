import Web3 from 'web3'
import {Common} from "@/utils";
import BigNumber from "bignumber.js";

export default class BSC {
	static apiNode = "https://bsc-dataseed2.binance.org/";
	static web3;
	static myAccount = "";
	static Module = {}

	static async initWeb3() {
		this.web3 = new Web3(new Web3.providers.HttpProvider(apiNode));
	}
	static logout(){
		if(this.web3) this.web3.setProvider(new Web3.providers.HttpProvider(apiNode));
	}
	static setProvider(provider){
		if(this.web3 && provider != null) this.web3.setProvider(provider);
	}
	static async getAccount() {
		if (this.myAccount != "") return this.myAccount;
		return new Promise(resolve => {
			if(Common.app){
				Common.app.oprDialog('connect-wallet-dialog','block');
			}
			let t = setInterval(()=>{
				if(this.myAccount != ""){
					resolve(this.myAccount);
					clearInterval(t);
				}
			}, 1000);
		})
	}
	//获取BNB余额
	static async getBNBValue() {
		let myAccount = await this.getAccount();
		if (!myAccount) return 0;
		let balance = await this.web3.eth.getBalance(myAccount);
		return Common.numFloor(parseInt(balance) / 1e18, 10000);
	}
	//查询我钱包里面的erc20币授权情况
	static async viewErcAllowanceToTarget(fromAddr, targetAddr) {
		let myAccount = await this.getAccount();
		if (!myAccount) return -1;

		 let contract = new this.web3.eth.Contract([
			{
				name: 'allowance',type: "function",
				inputs: [
					{ type: 'address', name: '_owner' }, 
					{ type: 'address', name: '_spender' }
				],
				outputs: [
					{ type: "uint256", name: "_value" }
				],
			}
		], fromAddr);

		return new Promise(resolve => {
			contract.methods.allowance(myAccount, targetAddr).call().then(res => {
				resolve(res);
			});
		});
	}
	//授权Erc20给对应地址
	static async approveErc20ToTargetOnRecipt(fromAddr, targetAddr, recipt) {
		let myAccount = await this.getAccount();
		if (!myAccount) return;
		let contract = new this.web3.eth.Contract([
			{
				name: 'approve',type: "function",
				inputs: [
					{ type: 'address', name: '_spender' }
				],
				outputs: [
					{ type: "uint256", name: "_value" }
				],
			}
		], fromAddr);
		return new Promise((resolve) => {
			this.callFc(
				contract.methods.approve(targetAddr,"0x" + Common.repeat("f", 64)), {from: myAccount},
				hash=>resolve(hash),
				()=>{
					recipt()
				}
			)
		});
	}
	//查询合约里面币的余额
	static async balanceOfToTargetFromAddr(targetAddr, fromAddr) {
		let contract = new this.web3.eth.Contract([
			{
				type: "function",
				name: 'balanceOf',
				inputs: [{type: 'address',name: 'ownerAddress'}],
				outputs: [{type: "uint256",name: "_value"}],
			}
		], targetAddr);

		return new Promise(resolve => {
			contract.methods.balanceOf(fromAddr).call().then(res => {
				resolve(BigNumber(res));
			});
		});
	}
	//根据币地址查询余额
	static async getErc20BalanceByTokenAddr(tokenAddr) {
		let myAccount = await this.getAccount();
		if (!myAccount) return 0;
		let contract = new this.web3.eth.Contract([
			{
				type: "function",
				name: 'balanceOf',
				inputs: [{type: 'address',name: 'ownerAddress'}],
				outputs: [{type: "uint256",name: "_value"}],
			}
		], tokenAddr);
		return new Promise(resolve => {
			contract.methods.balanceOf(myAccount).call().then(res => {
				resolve(BigNumber(res));
			});
		});
	}
	//查询是否授权
	static async isApprovedForAll(fromToken, toToken){
		let myAccount = await this.getAccount();
		if (!myAccount) return null;

		let contract = new this.web3.eth.Contract([
			{
				name: 'isApprovedForAll',
				type: "function",
				inputs: [
					{type: 'address',name: '_owner'},
					{type: 'address',name: '_operator'}
				],
				outputs: [
					{type: 'bool',name: '_isApproved'},
				],
				stateMutability: "view",
			}
		], fromToken);
		return new Promise(resolve => {
			contract.methods.isApprovedForAll(myAccount, toToken).call().then(isApproved => {
				resolve(isApproved);
			});
		});
	}
	//授权
	static async approvedForAll(fromToken, toToken, recipet){
		let myAccount = await this.getAccount();
		if (!myAccount) return null;

		let contract = new this.web3.eth.Contract([
			{
				name: 'setApprovalForAll',
				type: "function",
				inputs: [
					{type: 'address',name: '_owner'},
					{type: 'bool',name: '_isApproved'},
				],
				stateMutability: "view",
			}
		], fromToken);
		console.log({fromToken, toToken});
		return new Promise(resolve => {
			this.callFc(
				contract.methods.setApprovalForAll(toToken, true), {from: myAccount},
				hash=>resolve(hash),
				()=>{
					Common.app.unLockBtn("approveLock")
					recipet();
				}
			);
		});
	}
	//获取字符长度
	static getStrLength(str){
		return (this.web3.utils.utf8ToHex(str).length - 2) / 2;
	}
	static numToHex(num){
		return "0x"+BigNumber(num).toString(16);
	}
	static async getNetwork() {
		let res = await window.ethereum.send('net_version');
		return res.result;
	}
	static repeat(target, n) {
		if (n == 1) return target;
		var s = this.repeat(target, Math.floor(n / 2));
		s += s;
		if (n % 2) s += target;
		return s;
	}
	static parseEvent(data, topic, eventAbi){
		let targetRaw;
		Object.values(data.events).map(item=>{
			if(item.raw.topics[0].toLocaleLowerCase() == topic.toLocaleLowerCase()){
				targetRaw = item.raw;
			}
		});
		return ETH.web3.eth.abi.decodeLog(eventAbi, targetRaw.data, targetRaw.topics.slice(1));
	}
	static callFc(method,  sendAttr,  onHash, onRecipt, onError = ()=>{}){
		if(Common.store.state.globalState.data.chainNetwork != 56){
			Common.app.showNotify(Common.app.$t("Common_23"), "error");
			return;
		}
		Common.store.commit("globalState/setwalletStatus", {status:1});
		Common.oprDialog("wallet-opr-dialog", "block");
		method.value = sendAttr.value;
		method.myAccount = sendAttr.from;

		method.send(sendAttr).on("transactionHash", hash => {
			onHash(hash);
			saveHash = hash;
			Common.store.commit("globalState/setwalletStatus", {status:3, hash});
			// Common.app.showNotify(Common.app.$t("BOX_20"), "success");
		}).on("error", err => {
			console.log(err);
			onError();

			let type = Common.getStorageItem("connect-wallet");
			if(type == "mboxWallet"){
				Common.store.commit("globalState/setwalletStatus", {status:2});
			}
			//清空coin的各种loading状态
			Common.store.commit("bnbState/clearLoading");

			//交易失败了，暂时判断包含 reverted 字段
			if(err.message && err.message.indexOf("-32603") != -1){
				return;
			}

			//追踪不到订单信息 不用处理
			if(err.toString().indexOf("eth_getTransactionReceipt") != -1){
				return;
			}

			//拒绝交易
			if(err.code == 4001) {
				Common.store.commit("globalState/setwalletStatus", {status:2});
				return;
			}
			//gas费用太低
			if(err.code == -32603){
				Common.app.showNotify("intrinsic gas too low", "error");
				Common.store.commit("globalState/setwalletStatus", {status:2});
				return;
			}
			
			// Common.app.showNotifyTrans(Common.app.$t("Common_19"), saveHash, "error");
			Common.store.commit("globalState/setwalletStatus", {status:2});

		}).on("receipt", data=>{
			onRecipt(data);
		});
	}
}