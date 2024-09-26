import ETH from "../ETH";
import {WalletConfig, ConstantConfig} from '@/config'
import {Common} from "@/utils";

export default class Transfer {
	static TransType = {
		detachGroup: "detachGroup", // 转出一组
		detach721: "detach721", // 转出721
		recall721: "recall721",// 转回721
		recallGroup: "recallGroup"// 转回一组
	}
	static async transMoMo(type, tokenIds, recipt){
		let myAddr = await ETH.getAccount(true);
		if (!myAddr) return;
		let contract = new ETH.web3.eth.Contract([
			{
				"name": type,
				"type": "function",
				"inputs": [
					{"name": "tokenIds","type": "uint256[]"},
				],
			}
		],WalletConfig.ETH.momoVerse);

		return new Promise(resolve => {
			ETH.sendMethod(
				contract.methods[type](tokenIds), {from: myAddr},
				hash=>{
					resolve(hash);
				},
				async ()=>{
					console.log("transMoMo success!!!!!", type, tokenIds);
					Common.app.unLockBtn("transMoMoLock");
					await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
					await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
					await Common.app.eth_setMyHashrate();
					recipt();
				},
			)
		});
	}
}