import Web3 from 'web3'
import Rpc from './Rpc';
import Contract from './Contract'
import PancakSwapContract from './PancakSwapContract'
import {EventBus,Common,Http} from "@/utils";
import {EventConfig,WalletConfig,BaseConfig,ConstantConfig, PancakeConfig} from '@/config';
import BigNumber from "bignumber.js";
// import store from '@/store';

// const store = Common.store;



export default class ETH {
	static web3;
	static web3MainNet;

	//合约相关
	static boxTokenContract;
	static moMoMinterContract;
	static moMoTokenContract;
	static moMoMTokenContract;
	static momoHelperContract;
	static momoStakeContract;
	static pancakeSwapContract;

	static hasInit = false;
	static myAddr = "";

	static async init() {
		this.web3 = new Web3(new Web3.providers.HttpProvider(Rpc.apiNode));
		this.web3MainNet = new Web3(new Web3.providers.HttpProvider(Rpc.apiNodeMainNet));

		this.initContract();

	}

	static logoutWallet(){
		//赋值默认的provide
		if(this.web3) this.web3.setProvider(new Web3.providers.HttpProvider(Rpc.apiNode));
	}

	static changeWeb3(provider){
		if(this.web3) this.web3.setProvider(provider);
	}

	static async getNetwork() {
		let res = await window.ethereum.send('net_version');
		if (res) {
			return res.result;
		}
	}
	//初始化合约
	static initContract() {
		this.boxTokenContract = new this.web3.eth.Contract([
			Contract.approve,
			Contract.allowance
		], WalletConfig.ETH.boxToken);
		this.moMoMinterContract = new this.web3.eth.Contract([
			Contract.buyBox,
			Contract.addBox,
			Contract.mint,
			Contract.getOrder
		], WalletConfig.ETH.moMoMinter);
		this.moMoTokenContract = new this.web3.eth.Contract([
			Contract.levelUp,
			Contract.getMomoName,
			Contract.getMomoStory,
			Contract.setMomoName,
			Contract.addMomoStory,
			Contract.isApprovedForAll,
			Contract.setApprovalForAll,
		], WalletConfig.ETH.moMoToken);
		this.moMoMTokenContract = new this.web3.eth.Contract([
			Contract.balanceOfOneBatch,
			Contract.isApprovedForAll,
			Contract.setApprovalForAll,
		], WalletConfig.ETH.moMoMToken);
		this.momoHelperContract = new this.web3.eth.Contract([
			Contract.getMomosWallet,
			Contract.getMomosStake,
			Contract.getMomosAuction,
			Contract.getMomoNames,
			Contract.getUserFarmInfos
		], WalletConfig.ETH.moMoHelper);
		this.momoStakeContract = new this.web3.eth.Contract([
			Contract.stake,
			Contract.withdrawMomo,
			Contract.getReward,
			Contract.earned,
			Contract.userHashrate,
			Contract.totalHashrate,
			Contract.mintAndStake,
			Contract.levelUpStake,
			Contract.setMomoName,
			Contract.addMomoStory,
		], WalletConfig.ETH.moMoStake);

		this.pancakeSwapContract = new this.web3.eth.Contract([
			PancakSwapContract.approve,
			PancakSwapContract.allowance,
			PancakSwapContract.addLiquidity,
			PancakSwapContract.removeLiquidity,
			PancakSwapContract.addLiquidityETH,
			PancakSwapContract.removeLiquidityETH,
			PancakSwapContract.swapExactETHForTokens,
			PancakSwapContract.swapETHForExactTokens,
			PancakSwapContract.swapExactTokensForETH,
			PancakSwapContract.swapTokensForExactETH,
			PancakSwapContract.swapExactTokensForTokens,
			PancakSwapContract.swapTokensForExactTokens,
		], PancakeConfig.SwapRouterAddr);
	}

	//调起钱包
	static sendMethod(method,  sendAttr,  onHash, onRecipt, onError = ()=>{}){
		Common.store.commit("globalState/setwalletStatus", {status:1});
		Common.oprDialog("wallet-opr-dialog", "block");
		method.value = sendAttr.value;
		method.myAddr = sendAttr.from;
		let saveHash;
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
			
			if(saveHash){
				this.onReciptNotice(saveHash, method, "error");
			}
			
			// Common.app.showNotifyTrans(Common.app.$t("Common_19"), saveHash, "error");
			Common.store.commit("globalState/setwalletStatus", {status:2});

		}).on("receipt", data=>{
			onRecipt(data);
			this.onReciptNotice(saveHash, method, "success");
		});
	}

	static onReciptNotice(hash, method, type){
		// console.log({hash, method, type});
		//当前只记录swap和流动性相关的记录
		let methodName = method._method.name;
		let _arguments = method.arguments;
		let myAddr = method.myAddr;
		let msg = type=="success"?Common.app.$t("Air-drop_111"):Common.app.$t("Common_19");
		let needSave = false;

		//Swap BNB to Token
		if(["swapExactETHForTokens", "swapETHForExactTokens"].indexOf(methodName) != -1  ){
			let fromName = "BNB";
			let toName = ""
			let fromValue =  BigNumber(method.value);
			let toValue =  BigNumber(_arguments[0]);
			
			let path = _arguments[1];
			for (let key in PancakeConfig.SelectCoin) {
				if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() == path[path.length-1].toLocaleUpperCase()){
					toName = key;
				}
			}
			fromValue =  Common.numFloor(BigNumber(fromValue).dividedBy(BigNumber(1e18)), 1e8);
			toValue = Common.numFloor(BigNumber(toValue).dividedBy(BigNumber(1e18)), 1e8);
			msg = `Swap ${fromValue} ${fromName} for ${toValue} ${toName}`;
			needSave = true;
		}
		//Swap Token to BNB
		if(["swapExactTokensForETH", "swapTokensForExactETH"].indexOf(methodName) != -1  ){
			let fromName = "";
			let toName = "BNB"
			let fromValue =  BigNumber(_arguments[0]);
			let toValue =  BigNumber(_arguments[1]);
			
			let path = _arguments[2];
			for (let key in PancakeConfig.SelectCoin) {
				if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() == path[0].toLocaleUpperCase()){
					fromName = key;
				}
			}
			fromValue =  Common.numFloor(BigNumber(fromValue).dividedBy(BigNumber(1e18)), 1e8);
			toValue = Common.numFloor(BigNumber(toValue).dividedBy(BigNumber(1e18)), 1e8);
			msg = `Swap ${fromValue} ${fromName} for ${toValue} ${toName}`;
			needSave = true;
		}
		//Swap Token to token
		if(["swapExactTokensForTokens", "swapTokensForExactTokens"].indexOf(methodName) != -1  ){
			let fromName = "";
			let toName = ""
			let fromValue =  BigNumber(_arguments[0]);
			let toValue =  BigNumber(_arguments[1]);
			
			let path = _arguments[2];
			for (let key in PancakeConfig.SelectCoin) {
				if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() == path[0].toLocaleUpperCase()){
					fromName = key;
				}
				if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() == path[path.length-1].toLocaleUpperCase()){
					toName = key;
				}
			}
			fromValue =  Common.numFloor(BigNumber(fromValue).dividedBy(BigNumber(1e18)), 1e8);
			toValue = Common.numFloor(BigNumber(toValue).dividedBy(BigNumber(1e18)), 1e8);
			msg = `Swap ${fromValue} ${fromName} for ${toValue} ${toName}`;
			needSave = true;
		}
		//Add Token & BNB || Remove Token & Token
		if(["addLiquidityETH", "removeLiquidityETH"].indexOf(methodName) != -1 ){
			let fromName = "";
			let toName = "BNB"
			let fromValue =  BigNumber(_arguments[2]);
			let toValue =  BigNumber(_arguments[3]);
			
			for (let key in PancakeConfig.SelectCoin) {
				if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==_arguments[0].toLocaleUpperCase()){
					fromName = key;
				}
			}
			fromValue =  Common.numFloor(BigNumber(fromValue).dividedBy(BigNumber(1e18)), 1e8);
			toValue = Common.numFloor(BigNumber(toValue).dividedBy(BigNumber(1e18)), 1e8);
			let action = methodName == "addLiquidityETH"?"Add":"Remove";
			msg = `${action} ${fromValue} ${fromName} and ${toValue} ${toName}`;
			needSave = true;
		}
		//Add Token & Token || Remove Token & Token
		if(["addLiquidity", "removeLiquidity"].indexOf(methodName) != -1){
			let fromName = "";
			let toName = ""
			let fromValue =  BigNumber(_arguments[4]);
			let toValue =  BigNumber(_arguments[5]);
			
			for (let key in PancakeConfig.SelectCoin) {
				if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==_arguments[0].toLocaleUpperCase()){
					fromName = key;
				}
				if(PancakeConfig.SelectCoin[key].addr.toLocaleUpperCase() ==_arguments[1].toLocaleUpperCase()){
					toValue = key;
				}
			}
			fromValue =  Common.numFloor(BigNumber(fromValue).dividedBy(BigNumber(1e18)), 1e8);
			toValue = Common.numFloor(BigNumber(toValue).dividedBy(BigNumber(1e18)), 1e8);
			let action = methodName == "addLiquidity"?"Add":"Remove";
			msg = `${action} ${fromValue} ${fromName} and ${toValue} ${toName}`;
			needSave = true;
		}
		
		Common.app.showNotifyTrans(msg, hash, type);
		if(needSave){
			let history = Common.getStorageItem("pancake-history-"+myAddr);
			let histoyJSON = [];
			if(history != undefined){
				histoyJSON = JSON.parse(history);
			}
			histoyJSON.push({msg, hash, type});
			Common.setStorageItem("pancake-history-"+myAddr, JSON.stringify(histoyJSON));
			//设置store
			Common.store.commit("bnbState/setData", {pancakeHistory: histoyJSON});
		}
	}

	//获取当前账户
	static async getAccount() {
		if (this.myAddr != "") return this.myAddr;
		return new Promise(resolve => {
			if(Common.app){
				Common.app.oprDialog('connect-wallet-dialog','block');
			}
			let t = setInterval(()=>{
				if(this.myAddr != ""){
					resolve(this.myAddr);
					clearInterval(t);
				}
			}, 1000);
		})
	}
	//授权
	static async approveBoxToMinter() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.boxTokenContract) return;
		return new Promise(resolve => {
			this.sendMethod(
				this.boxTokenContract.methods.approve(WalletConfig.ETH.moMoMinter,"0x" + Common.repeat("f", 64)), {from: myAddr},
				hash=>resolve(hash),
				async ()=>{
					await Common.app.eth_setBoxAllowance();
					Common.store.commit("globalState/unLockBtn", "approveLock");
				}
			)
		});
	}
	//查询授权
	static async boxAllowanceToMinter() {
		let myAddr = await this.getAccount();
		if (!myAddr) return -1;
		if (!this.boxTokenContract) return -1;
		return new Promise(resolve => {
			this.boxTokenContract.methods.allowance(myAddr, WalletConfig.ETH.moMoMinter).call().then(res => {
				resolve(res);
			});
		});
	}

	//领取Key到钱包
	static async getRewardKey(pIndexArr){
		let myAddr = await this.getAccount();
		if (!myAddr) return null;

		let contract = new this.web3.eth.Contract([
			Contract.getRewardKey
		], WalletConfig.ETH.momoFarm);

		if(pIndexArr.length == 0) pIndexArr = [1];

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.getReward(pIndexArr),{from: myAddr},
				resolve,
				()=>{
					console.log("getRewardKey success");
					Common.app.getStakeValueAndEarndKey();
					Common.app.eth_setBox();
					Common.app.unLockBtn("getKeyLock");
				}
			)
		});
	}
	//查询质押和Key的收益
	static async getStakeValueAndEarndKey(pIndexArr){
		let myAddr = await this.getAccount();
		if (!myAddr) return null;

		// let contract = new this.web3.eth.Contract([
		// 	Contract.getUserFarmInfos
		// ], "0xDB1D008E5F46D114e1E0E2560c70516c92AdD867");
		if (!this.momoHelperContract) return null;

		return new Promise(resolve => {
			this.momoHelperContract.methods.getUserFarmInfos(pIndexArr, myAddr).call().then(res => {
				resolve(res);
			});
		});
	}
	//查询我钱包里面的erc20币授权情况
	static async viewErcAllowanceToTarget(fromAddr, targetAddr, isMainNet = true) {
		let myAddr = await this.getAccount();
		if (!myAddr) return -1;

		let contract;
		if(isMainNet){
			contract = new this.web3MainNet.eth.Contract([
				Contract.allowance
			], fromAddr);
		}else{
			contract = new this.web3.eth.Contract([
				Contract.allowance
			], fromAddr);
		}

		return new Promise(resolve => {
			contract.methods.allowance(myAddr, targetAddr).call().then(res => {
				resolve(res);
			});
		});
	}
	//授权Erc20给矿池
	static async approveErcToTarget(fromAddr, targetAddr, approveInfo = {coinName: "", type: ""}) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		let contract = new this.web3.eth.Contract([
			Contract.approve,
			Contract.allowance
		], fromAddr);
		return new Promise((resolve) => {
			this.sendMethod(
				contract.methods.approve(targetAddr,"0x" + Common.repeat("f", 64)), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					let {coinName, type} = approveInfo;
					console.log("recipt",approveInfo);
					if(coinName != ""){
						Common.store.commit("bnbState/setCoinAllowance", {coinName, allowance: 1.157920892373162e77, type});
					}
				}
			)
		});
	}
	//查询合约里面币我的币
	static async balanceOfToTarget(targetAddr) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3MainNet.eth.Contract([
			Contract.balanceOf
		], targetAddr);

		return new Promise(resolve => {
			contract.methods.balanceOf(myAddr).call().then(res => {
				resolve(BigNumber(res));
			});
		});
	}
	//查询LP对应币价
	static async getPricePerFullShare(targetAddr) {
		return new Promise((resolve, reject) => {
			try {
				let contract = new this.web3MainNet.eth.Contract([
					Contract.getPricePerFullShare
				], targetAddr);
				contract.methods.getPricePerFullShare().call().then(res => {
					resolve(BigNumber(res));
				});
			} catch (error) {
				reject(1e18)
			}
		});
	}
	//查询质押收入
	static async viewEarned(targetAddr) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.earned
		], targetAddr);

		return new Promise(resolve => {
			contract.methods.earned(myAddr).call().then(res => {
				resolve(res);
			});
		});
	}
	//查询24小时空投数量
	static async viewTotalAirdrop(targetAddr) {
		let contract = new this.web3.eth.Contract([
			Contract.rewardRate
		], targetAddr);

		return new Promise(resolve => {
			contract.methods.rewardRate().call().then(res => {
				resolve(res);
			});
		});
	}
	//查询全网总质押
	static async viewTotalSupply(targetAddr) {
		let contract = new this.web3MainNet.eth.Contract([
			Contract.totalSupply
		], targetAddr);

		return new Promise(resolve => {
			contract.methods.totalSupply().call().then(res => {
				resolve(res);
			});
		});
	}
	// 领取key到开箱子合约并兑换箱子
	static async getChestBox(pIndexArr, amount) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.getChestBox
		], WalletConfig.ETH.momoFarm);

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.getChestBox(pIndexArr,amount), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("getChestBox success");
					Common.app.getStakeValueAndEarndKey();
					Common.app.setOrder();
					Common.app.unLockBtn("getKeyLock");
				}
			)
		});
	}

	//获取余额
	static async getMyBalance() {
		let myAddr = await this.getAccount();
		if (!myAddr) return 0;
		let balance = await Rpc.getEthBalance(myAddr);
		return Common.numFloor(parseInt(balance) / 1e18, 10000);
	}
	//获取余额
	static async getBalance() {
		let myAddr = await this.getAccount();
		if (!myAddr) return 0;
		let balance = await this.web3.eth.getBalance(myAddr);
		return Common.numFloor(parseInt(balance) / 1e18, 10000);
	}

	static async getErc20BalanceByTokenAddr(tokenAddr, isMainNet = true) {
		let myAddr = await this.getAccount();
		if (!myAddr) return 0;
		let contract;
		if (isMainNet) {
			contract = new this.web3MainNet.eth.Contract([
				Contract.balanceOf
			], tokenAddr);
		} else {
			contract = new this.web3.eth.Contract([
				Contract.balanceOf
			], tokenAddr);
		}

		return new Promise(resolve => {
			contract.methods.balanceOf(myAddr).call().then(res => {
				resolve(BigNumber(res));
			});
		});

	}

	//查询合约中一个币种的余额
	static async getTargetBalancefromTokenAddr(targetAddr, tokenAddr) {
		let contract = new this.web3.eth.Contract([Contract.balanceOf], tokenAddr);
		return new Promise(resolve => {
			contract.methods.balanceOf(targetAddr).call().then(res => {
				resolve(BigNumber(res));
			});
		});
	}

	//添加box
	static async addBox(amount) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.moMoMinterContract) return;

		return new Promise(resolve => {
			this.sendMethod(
				this.moMoMinterContract.methods.addBox(myAddr, amount), {from: myAddr},
				hash=>resolve(hash),
			)
		});
	}
	//开箱子
	static async openBox(amount) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.moMoMinterContract) return;
		let transactionHash = "";

		return new Promise(resolve => {
			this.sendMethod(
				this.moMoMinterContract.methods.mint(myAddr, amount), {from: myAddr},
				hash=>{
					transactionHash = hash;
					resolve(hash);
				},
				receiptData=>{
					EventBus.$emit(EventConfig.OpenBoxConfirm, {
						chain: "eth",
						hash: receiptData.transactionHash
					});
				},
				()=>{
					EventBus.$emit(EventConfig.OpenBoxFail, {
						chain: "eth",
						hash: transactionHash
					});
				}
			)
		});
	}
	//开箱子并质押
	static async openBoxAndStake(amount) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		let transactionHash = "";
		return new Promise(resolve => {
			this.sendMethod(
				this.momoStakeContract.methods.mintAndStake(amount), {from: myAddr},
				hash=>{
					transactionHash = hash;
					resolve(hash);
				},
				receiptData=>{
					EventBus.$emit(EventConfig.OpenBoxConfirm, { chain: "eth", hash: receiptData.transactionHash });
				},
				()=>{
					EventBus.$emit(EventConfig.OpenBoxFail, { chain: "eth", hash: transactionHash });
				}
			)
		});
	}

	//查询是否有可以开的箱子
	static async getOrder() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.moMoMinterContract) return;

		// myAddr = "0xa4219fA95C45C5fD2a20D08090e8636C8b0235Af";
		return new Promise(resolve => {
			this.moMoMinterContract.methods.getOrder(myAddr).call().then(getOrderRes => {
				resolve(getOrderRes);
			});
		});
	}
	//查询1155是否授权给对应合约
	static async isApprovedForAllByTokenAddr_1155(tokenAddr) {
		let myAddr = await this.getAccount();
		if (!myAddr) return null;
		if (!this.moMoMTokenContract) return null;
		return new Promise(resolve => {
			this.moMoMTokenContract.methods.isApprovedForAll(myAddr, tokenAddr).call().then(isApproved => {
				resolve(isApproved);
			});
		});
	}
	//授权1155给对应合约
	static async approve1155ToTargetToken(tokenAddr) {
		let myAddr = await this.getAccount();
		if (!myAddr) return null;
		if (!this.moMoMTokenContract) return null;
		return new Promise(resolve => {
			this.sendMethod(
				this.moMoMTokenContract.methods.setApprovalForAll(tokenAddr, true), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					EventBus.$emit(EventConfig.ApprovedConfirm, {chain: "eth"});
				}
			)
		});
	}
	//查询721是否授权给对应合约
	static async isApprovedForAllByTokenAddr_721(tokenAddr) {
		let myAddr = await this.getAccount();
		if (!myAddr) return null;
		if (!this.moMoTokenContract) return null;
		return new Promise(resolve => {
			this.moMoTokenContract.methods.isApprovedForAll(myAddr, tokenAddr).call().then(isApproved => {
				resolve(isApproved);
			});
		});
	}
	//授权721给对应合约
	static async approve721ToTargetToken(tokenAddr) {
		let myAddr = await this.getAccount();
		if (!myAddr) return null;
		if (!this.moMoTokenContract) return null;
		return new Promise(resolve => {
			this.sendMethod(
				this.moMoTokenContract.methods.setApprovalForAll(tokenAddr, true), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					EventBus.$emit(EventConfig.ApprovedConfirm, {chain: "eth"});
				}
			);
		});
	}

	//获取我的NFT
	static async getMomosByType(type) {
		let myAddr = await this.getAccount();
		if (!myAddr) return null;
		if (!this.momoHelperContract) return null;
		//所有1155的prototype
		let prototype_1155_arr = [];
		for (let key in BaseConfig.NftCfg) {
			let {
				prototype,
				quality
			} = BaseConfig.NftCfg[key];
			if (quality < 4) {
				prototype_1155_arr.push(
					prototype);
			}
		}
		// myAddr = "0x464282e1B02A51A4F438516f444F2b8fF362368e";
		return new Promise(resolve => {
			switch (type) {
				case ConstantConfig.NFT_LOCATION.WALLET:
					this.momoHelperContract.methods.getMomosWallet(myAddr, prototype_1155_arr).call().then(momosObj => {
						resolve(this.generateNftObj(momosObj, ConstantConfig.NFT_LOCATION.WALLET));
					});
					break;
				case ConstantConfig.NFT_LOCATION.STAKE:
					this.momoHelperContract.methods.getMomosStake(myAddr, prototype_1155_arr).call().then(momosObj => {
						resolve(this.generateNftObj(momosObj, ConstantConfig.NFT_LOCATION.STAKE));
					});
					break;
				case ConstantConfig.NFT_LOCATION.AUCTION:
					this.momoHelperContract.methods.getMomosAuction(myAddr).call().then(momosObj => {
						console.log("AUCTION", this.generateNftObj(momosObj, ConstantConfig.NFT_LOCATION.AUCTION));
						resolve(this.generateNftObj(momosObj, ConstantConfig.NFT_LOCATION.AUCTION));
					});
					break;
				default:
					console.log("error type...");
					break;
			}
		});
	}

	//生成NFT数据
	static generateNftObj({
		_ids,
		_amounts,
		_tokenIds,
		_attrs
	}, location) {
		let erc1155Obj = [];
		let erc721Obj = [];
		//生成1155数据
		_ids.map((item, key) => {
			let {
				tokenName,
				quality,
				category,
			} = BaseConfig.NftCfg[item];
			erc1155Obj.push({
				prototype: item,
				vType: parseInt(item / 1e4),
				num: Number(_amounts[key]),
				tokenId: 1,
				level: 1,
				category,
				tokenName: tokenName,
				quality,
				hashrate: quality,
				lvHashrate: quality,
				chain: "bnb",
				location
			});
		});

		//按照种类排序
		erc1155Obj.sort((a, b) =>
			b.prototype - a.prototype 
		);
		//生成721的数据
		_tokenIds.map((item, key) => {
			let itemAttr = _attrs.slice(key * 7, (key + 1) * 7);
			erc721Obj.push({
				tokenId: item,
				prototype: itemAttr[0],
				vType: parseInt(itemAttr[0] / 1e4),
				quality: itemAttr[1],
				category: itemAttr[2],
				level: Number(itemAttr[3]),
				speciality: itemAttr[4],
				hashrate: Number(itemAttr[5]),
				lvHashrate: Number(itemAttr[6]),
				num: 1,
				chain: "bnb",
				tokenName: BaseConfig.NftCfg[itemAttr[0]] ? BaseConfig.NftCfg[itemAttr[0]]["tokenName"] : "",
				location,
			})
		});

		//按照战力排序
		// erc721Obj.sort((a, b) =>
		// 	b.lvHashrate - a.lvHashrate
		// );

		return [...erc721Obj, ...erc1155Obj];
	}

	//批量获取名字
	static async getMomoNamesByTokenIds(tokenIds) {
		if (!this.momoHelperContract) return "";
		return new Promise(resolve => {
			this.momoHelperContract.methods.getMomoNames(tokenIds).call().then(names => {
				let retNames = [];
				names.map(item => retNames.push(this.web3.utils.hexToUtf8(item)));
				resolve(retNames);
			});
		});
	}

	//获取momo的名字
	static async getMomoNameByTokenId(tokenId) {
		if (!this.moMoTokenContract) return "";
		return new Promise(resolve => {
			this.moMoTokenContract.methods.getMomoName(tokenId).call().then(name => {
				name = name || "";
				if (name == "") {
					resolve("");
				} else {
					resolve(this.web3.utils.hexToUtf8(name) || "");
				}
			});
		});
	}
	//取名
	static async setMomoNameByTokenId(tokenId, name, isFirst) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		console.log( this.web3.utils.utf8ToHex(name).length);
		return new Promise(resolve => {
			this.sendMethod(
				this.momoStakeContract.methods.setMomoName(tokenId, this.web3.utils.utf8ToHex(name)), {from: myAddr,value: isFirst ? 0 : 0.05e18},
				hash=>resolve(hash),
				()=>{
					EventBus.$emit(EventConfig.SetNameConfirm, {chain: "eth",tokenId,name});
				}
			)
		});
	}
	static getStrLen(str){
		return (this.web3.utils.utf8ToHex(str).length - 2) / 2;
	}
	//写故事
	static async setMomoStoryByTokenId(tokenId, story, isFirst) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			this.sendMethod(
				this.momoStakeContract.methods.addMomoStory(tokenId, this.web3.utils.utf8ToHex(story)), {from: myAddr, value: isFirst ? 0 : 0.05e18},
				hash=>resolve(hash),
				()=>{
					EventBus.$emit(EventConfig.SetStoryConfirm);
				}
			)
		});
	}
	//获取momo的名字
	static async getMomoStoryByTokenId(tokenId) {
		if (!this.moMoTokenContract) return [];
		return new Promise(resolve => {
			this.moMoTokenContract.methods.getMomoStory(tokenId, 0, 1).call().then(res=> {
				console.log(res);
				resolve(res._storys)
			});
		});
	}
	//升级721
	static async upgrade(gotoLv, tokenId, protosV1V2V3 = [], amountsV1V2V3 = [], tokensV4V5 = []) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.moMoTokenContract) return;
		return new Promise(resolve => {
			//将字符串转换为Number
			protosV1V2V3.map((item, index) => protosV1V2V3[index] = Number(item));
			tokensV4V5.map((item, index) => tokensV4V5[index] = Number(item));
			console.log({
				gotoLv,
				tokenId,
				protosV1V2V3,
				amountsV1V2V3,
				tokensV4V5
			});

			this.sendMethod(
				this.moMoTokenContract.methods.levelUp(tokenId, protosV1V2V3, amountsV1V2V3, tokensV4V5), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					EventBus.$emit(EventConfig.LevelUpConfirm, { chain: "eth", gotoLv, tokenId });
				}
			)
		});
	}
	//升级质押的721
	static async upgradeStake(gotoLv, tokenId, protosV1V2V3 = [], amountsV1V2V3 = [], tokensV4V5 = []) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			//将字符串转换为Number
			protosV1V2V3.map((item, index) => protosV1V2V3[index] = Number(item));
			tokensV4V5.map((item, index) => tokensV4V5[index] = Number(item));

			this.sendMethod(
				this.momoStakeContract.methods.levelUp(tokenId, protosV1V2V3, amountsV1V2V3, tokensV4V5), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					EventBus.$emit(EventConfig.LevelUpConfirm, { chain: "eth", gotoLv, tokenId });
				}
			)
		});
	}

	//质押NFT
	static async stakeNft(erc1155ids, erc1155Num, erc721TokenIds) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			this.sendMethod(
				this.momoStakeContract.methods.stake(erc1155ids, erc1155Num, erc721TokenIds), 
				{from: myAddr}, 
				hash => {
					resolve(hash);
				},
				()=>{
					console.log("stake success!!!!!");
					EventBus.$emit(EventConfig.StakeNftConfirm, {chain: "eth"});
				}
			);
		});
	}
	//解冻质押
	static async unStakeNft(erc1155ids, erc1155Num, erc721TokenIds) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			this.sendMethod(
				this.momoStakeContract.methods.withdraw(erc1155ids, erc1155Num, erc721TokenIds), 
				{from: myAddr}, 
				hash => {
					resolve(hash);
				},
				()=>{
					console.log("unStakeNft success!!!!!");
					EventBus.$emit(EventConfig.StakeNftConfirm, {chain: "eth"});
				}
			);
		});
	}
	//查询自己质押的NFT总算力
	static async getMyHashrate() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			this.momoStakeContract.methods.userHashrate(myAddr).call().then(hashrate => {
				resolve(Number(hashrate));
			})
		});
	}
	//查询全链质押的NFT的总算力
	static async getTotalHashrate() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			this.momoStakeContract.methods.totalHashrate().call().then(hashrate => {
				resolve(Number(hashrate));
			})
		});
	}
	//查询待领取的MBOX
	static async getEarnedMobx() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			this.momoStakeContract.methods.earned(myAddr).call().then(mobox => {
				resolve(Common.numFloor(mobox / 1e18, 1000));
			})
		});
	}
	//领取MBOX
	static async takeEarnedMbox() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.momoStakeContract) return;
		return new Promise(resolve => {
			this.sendMethod(
				this.momoStakeContract.methods.getReward(), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("getReward success!!!!!");
					EventBus.$emit(EventConfig.getMboxSuccess);
				}
			)
		});
	}

	//查询可上架位置
	static async getSuggestIndex() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.getSuggestIndex,
		], WalletConfig.ETH.moMoStakeAuction);

		return new Promise(resolve => {
			contract.methods.getSuggestIndex(myAddr).call().then(_suggestIndex => {
				resolve(_suggestIndex);
			})
		});
	}
	//上架
	static async createAuction({_startPrice,_endPrice,_durationDay,_suggestIndex,_tokenId = 0,_ids = [],_amounts = []}) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.createAuction,
		], WalletConfig.ETH.moMoStakeAuction);

		let saveHash;

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.createAuction(this.numToHex(Common.numFloor(_startPrice, 1e9) * 1e18),this.numToHex(Common.numFloor(_endPrice, 1e9) * 1e18),
					_durationDay, _suggestIndex, _tokenId, _ids, _amounts), {from: myAddr},
					hash=>{
						saveHash = hash;
						resolve(hash);
					},
					()=>{
						EventBus.$emit(EventConfig.CreateAuctionConfirm, {chain: "eth"});
					},
					()=>{
						EventBus.$emit(EventConfig.CreateAuctionError, {chain: "eth", hash: saveHash});
					}
			)
		});
	}

	static numToHex(num){
		return "0x"+BigNumber(num).toString(16);
	}

	//购买市场上的物品
	static async buyMarketPet(_auctor, _index, coinName){
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.bid,
		], WalletConfig.ETH.moMoStakeAuction);

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.bid(_auctor, _index), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("buyMarketPet success!!!!!");
					EventBus.$emit(EventConfig.BidPetSuccess, {chain: "eth", coinName});
				}
			)
		});
	}

	//取消上架
	static async cancelAuction(_index){
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.cancelAuction,
		], WalletConfig.ETH.moMoStakeAuction);

		let saveHash;

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.cancelAuction(_index), {from: myAddr},
				hash=>{
					saveHash = hash;
					resolve(hash);
				},
				()=>{
					console.log("cancelAuction success!!!!!");
					EventBus.$emit(EventConfig.CancelAuctionSuccess, {chain: "eth"});
				},
				()=>{
					EventBus.$emit(EventConfig.CancelAuctionError, {chain: "eth", hash: saveHash});
				}
			)
		});
	}

	//修改价格
	static async changePrice({index, startPrice, endPrice, durationDays}){
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.changePrice,
		], WalletConfig.ETH.moMoStakeAuction);

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.changePrice(index,this.numToHex(Common.numFloor(startPrice, 1e9) * 1e18),this.numToHex(Common.numFloor(endPrice, 1e9) * 1e18), Number(durationDays)), 
				{from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("changePrice success!!!!!");
					EventBus.$emit(EventConfig.ChangePriceSuccess, {chain: "eth"});
				}
			)
		});
	}

	//获取市场上的订单信息
	static async getMarketOrder(auctor, index){
		let contract = new this.web3.eth.Contract([
			Contract.getMarketOrder,
		], WalletConfig.ETH.moMoStakeAuction);

		return new Promise(resolve => {
			contract.methods.getOrder(auctor, index).call().then(data => {
				resolve(data);
			})
		});
	}

	//获取开箱子记录
	static async getStakeHistory() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		let data = await Http.getStakeHistory("BNB", myAddr);
		return data.list;
	}

	//获取开箱子记录
	static async getOpenBoxHistory() {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		let data = await Http.getOpenBoxHistory("BNB", myAddr);
		return data.list;
	}

	// static async withdraw

	static async deposit(coinName, amount){
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let contract = new this.web3.eth.Contract([
			Contract.deposit,
			Contract.depositBNB,
		], WalletConfig.ETH.momoFarm);

		let {pIndex, decimals}  = PancakeConfig.StakeLP[coinName];
		let amountHex = this.numToHex(BigNumber(Common.numFloor(amount , 1e8)).times(decimals));

		console.log({pIndex, amountHex});

		return new Promise(resolve => {
			let method = contract.methods.deposit(pIndex,amountHex);
			let value = this.numToHex(0);
			if(coinName == "BNB"){
				method = contract.methods.deposit(pIndex);
				value = amountHex;
			}
			this.sendMethod(
				method, {from: myAddr, value},
				hash=>resolve(hash),
				()=>{
					console.log("deposit success!!!!!");
					EventBus.$emit(EventConfig.DepositOrWithdrawConfirm, {chain: "eth"});
					Common.app.getStakeValueAndEarndKey();
				}
			)
		});

	}

	//充值质押
	static async deposit_old(coinName, amount) {
		let coinObj = WalletConfig.ETH[coinName];
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		//创建合约对象
		let contract = new this.web3.eth.Contract([
			Contract.depositAndStake,
		], coinObj["poolAddr"]);
		console.log(coinObj);
		console.log(coinName, amount);

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.depositAndStake("0x" + BigNumber(BigNumber(amount).times(BigNumber(coinObj["decimals"]))).toString(16)), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("depositAndStake success!!!!!");
					EventBus.$emit(EventConfig.DepositOrWithdrawConfirm, {chain: "eth"});
				}
			)
		});

	}
	//提币
	static async withdraw(coinName, amount) {
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		//创建合约对象
		let contract = new this.web3.eth.Contract([
			Contract.withdrawCoin,
		], WalletConfig.ETH.momoFarm);

		console.log({coinName, amount});

		let {pIndex, decimals}  = PancakeConfig.StakeLP[coinName];
		let amountHex = this.numToHex(BigNumber(Common.numFloor(amount , 1e8)).times(decimals));

		return new Promise(resolve => {
			this.sendMethod(
				contract.methods.withdraw(pIndex, amountHex), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("withdraw success!!!!!");
					Common.app.getStakeValueAndEarndKey();
					Common.app.setCoinValueByName(coinName);
				}
			)
		});
	}

	//购买box
	static async buyBox(amount) {
		console.log("buyBox", amount);
		let myAddr = await this.getAccount();
		if (!myAddr) return;
		if (!this.moMoMinterContract) return;

		return new Promise(resolve => {
			this.sendMethod(
				this.moMoMinterContract.methods.buyBox(amount), {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("buyBox success!!!!!");
				}
			)
		});
	}



	//pancake相关
	static async removeLiquidity(coinName, liquidity, targetLPPrice, setting){
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let coinObj = coinName.split("-");
		let selectCoinA = PancakeConfig.SelectCoin[coinObj[0]];
		let selectCoinB = PancakeConfig.SelectCoin[coinObj[1]];
		let LPObj = PancakeConfig.StakeLP[coinName];
		let duration = Number(setting.duration) || 20;
		let slippage = Number(setting.slippage) || 0.5;

		let method;
		let tokenA = selectCoinA.addr;
		let tokenB =  selectCoinB.addr;
		liquidity = this.numToHex(BigNumber(liquidity).times(LPObj.decimals));

		let amountAMin = this.numToHex(BigNumber(Common.numFloor(targetLPPrice[0] * (1-slippage/100), 1e8)).times(selectCoinA.decimals));
		let amountBMin = this.numToHex(BigNumber(Common.numFloor(targetLPPrice[1] * (1-slippage/100), 1e8)).times(selectCoinB.decimals));

		let deadline = parseInt(new Date().valueOf() / 1000) + (60 *duration);

		//包含BNB
		if(coinName.indexOf("BNB") != -1){
			let token = coinObj[0] == "BNB"? tokenB: tokenA;
			let amountTokenMin = coinObj[0] == "BNB"? amountBMin: amountAMin;
			let amountETHMin = coinObj[0] == "BNB"?amountAMin: amountBMin;

			console.log({token,liquidity, amountTokenMin, amountETHMin});
			method = this.pancakeSwapContract.methods.removeLiquidityETH(
				token, liquidity, amountTokenMin, amountETHMin,
				myAddr, deadline);
		}else{
			method = this.pancakeSwapContract.methods.removeLiquidity(
				tokenA,tokenB, liquidity, amountAMin, amountBMin,
				myAddr, deadline);
		}

		return new Promise(resolve => {
			this.sendMethod(method, {from: myAddr},
				hash=>resolve(hash),
				()=>{
					console.log("removeLiquidity success!!!!!");
					Common.store.commit("bnbState/clearLoading");
					EventBus.$emit(EventConfig.AddLiquiditySuccess);
					EventBus.$emit(EventConfig.SwapSuccess);
				}
			)
		});

	}

	static async addLiquidity(from, to, setting){
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let fromCoinCfg = PancakeConfig.SelectCoin[from.coinName];
		let toCoinCfg = PancakeConfig.SelectCoin[to.coinName];
		let method;
		let callValue = this.numToHex(0);
		let duration = Number(setting.duration) || 20;
		let slippage = Number(setting.slippage) || 0.5;
		let decimals_to = BigNumber(toCoinCfg.decimals);
		let decimals_from = BigNumber(fromCoinCfg.decimals);

		let deadline = parseInt(new Date().valueOf() / 1000) + (60 *duration);
		let tokenA = fromCoinCfg.addr;
		let tokenB = toCoinCfg.addr;
		let amountADesired =  this.numToHex(BigNumber(Common.numFloor(from.inputValue , 1e8)).times(decimals_from));
		let amountBDesired =  this.numToHex(BigNumber(Common.numFloor(to.inputValue , 1e8)).times(decimals_to));
		let amountAMin = this.numToHex(BigNumber(Common.numFloor(from.inputValue * (1-slippage/100), 1e8)).times(decimals_from));
		let amountBMin = this.numToHex(BigNumber(Common.numFloor(to.inputValue * (1-slippage/100), 1e8)).times(decimals_to));

		if(from.coinName != "BNB" && to.coinName != "BNB"){
			method = this.pancakeSwapContract.methods.addLiquidity(
				tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin,
				myAddr, deadline);
		}else{
			let token = from.coinName == "BNB"? tokenB: tokenA;
			let amountTokenDesired = from.coinName == "BNB"? amountBDesired: amountADesired;
			let amountTokenMin =  from.coinName == "BNB"? amountBMin: amountAMin;
			let amountETHMin = from.coinName == "BNB"?amountAMin: amountBMin;
			method = this.pancakeSwapContract.methods.addLiquidityETH(
				token, amountTokenDesired, amountTokenMin, amountETHMin,
				myAddr, deadline);
			callValue = from.coinName == "BNB"?amountADesired: amountBDesired;
		}

		return new Promise(resolve => {
			this.sendMethod(method, {from: myAddr,value: callValue},
				hash=>resolve(hash),
				()=>{
					console.log("addLiquidity success!!!!!");
					Common.store.commit("bnbState/clearLoading");
					EventBus.$emit(EventConfig.AddLiquiditySuccess);
					EventBus.$emit(EventConfig.SwapSuccess);
				}
			)
		});

	}

	static async goSwap(from,  to, path, setting){
		console.log({from});
		console.log({to});
		console.log({path});
		console.log({setting});
		let myAddr = await this.getAccount();
		if (!myAddr) return;

		let method;
		let callValue = this.numToHex(0);
		let duration = Number(setting.duration) || 20;
		let slippage = Number(setting.slippage) || 0.5;
		let decimals_to = BigNumber(PancakeConfig.SelectCoin[to.coinName].decimals);
		let decimals_from = BigNumber(PancakeConfig.SelectCoin[from.coinName].decimals);

		let deadline = parseInt(new Date().valueOf() / 1000) + (60 *duration);
		let amountIn = this.numToHex(BigNumber(Common.numFloor(from.inputValue , 1e8)).times(decimals_from));
		let amountInMax = this.numToHex(BigNumber(Common.numFloor(from.inputValue * (1+slippage/100), 1e8)).times(decimals_from));
		let amountOut = this.numToHex(BigNumber(Common.numFloor(to.inputValue , 1e8)).times(decimals_to));
		let amountOutMin = this.numToHex(BigNumber(Common.numFloor(to.inputValue * (1-slippage/100), 1e8)).times(decimals_to));

		if(from.coinName == "BNB" || to.coinName == "BNB"){
			//BNB 兑换其他币
			if(from.coinName == "BNB"){
				if(to.isEstimated){
					method = this.pancakeSwapContract.methods.swapExactETHForTokens(amountOutMin, path, myAddr, deadline);
					callValue = amountIn;
				}

				if(from.isEstimated){
					method = this.pancakeSwapContract.methods.swapETHForExactTokens(amountOut,path, myAddr, deadline);
					callValue = amountInMax;
				}
			}

			//其他币兑换成BNB
			if(to.coinName == "BNB"){
				if(to.isEstimated){
					method = this.pancakeSwapContract.methods.swapExactTokensForETH(amountIn, amountOutMin, path, myAddr, deadline);
				}
				if(from.isEstimated){
					method = this.pancakeSwapContract.methods.swapTokensForExactETH(amountOut,amountInMax, path, myAddr, deadline);
				}
			}

		}else{
			if(to.isEstimated){
				method = this.pancakeSwapContract.methods.swapExactTokensForTokens(amountIn, amountOutMin, path, myAddr, deadline);
			}
			if(from.isEstimated){
				method = this.pancakeSwapContract.methods.swapTokensForExactTokens(amountOut, amountInMax, path, myAddr, deadline);
			}
		}
		
		return new Promise(resolve => {
			this.sendMethod(method, {from: myAddr,value: callValue},
				hash=>resolve(hash),
				()=>{
					console.log("swap success!!!!!");
					Common.store.commit("bnbState/clearLoading");
					EventBus.$emit(EventConfig.SwapSuccess);
				}
			)
		});
		
	}

}