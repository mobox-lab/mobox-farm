import ETH from "../ETH";
import {WalletConfig} from '@/config'

export default class MoMoSetting {
    static async getMoMoSetting(){
        let contract = new ETH.web3.eth.Contract([{
            "name": "getMaxHashrateV2", "type": "function",
            "inputs": [],
            "outputs": [{"name": "setting","type": "uint256[]"}],
        }], WalletConfig.ETH.moMoHelper);
        return new Promise(resolve => {
            contract.methods.getMaxHashrateV2().call().then(data => {
                resolve(data);
            })
        });
    }

    static async getMaxHashrateV3(){
        const contract = new ETH.web3.eth.Contract([{
            "name": "getMaxHashrateV3", "type": "function",
            "inputs": [],
            "outputs": [{"name": "data","type": "uint256[]"}],
        }], WalletConfig.ETH.moMoHelper);
        
        return contract.methods.getMaxHashrateV3().call();
    }

    static async getMaxHashrate(vn){
        let contract = new ETH.web3.eth.Contract([{
            "name": "getMaxHashrate", "type": "function",
            "inputs": [{"name": "vn","type": "uint256"},],
            "outputs": [{"name": "hash","type": "uint256"}],
        }], WalletConfig.ETH.moMoSetting);
        return new Promise(resolve => {
            contract.methods.getMaxHashrate(vn).call().then(data => {
                resolve(data);
            })
        });
    }

    static async getMaxHashrateEnhance(vn){
        let contract = new ETH.web3.eth.Contract([{
                "name": "getMaxHashrateEnhance", "type": "function",
                "inputs": [{"name": "vn","type": "uint256"},],
                "outputs": [{"name": "hash","type": "uint256"}],
        }], WalletConfig.ETH.moMoSetting);
        return new Promise(resolve => {
            contract.methods.getMaxHashrateEnhance(vn).call().then(data => {
                resolve(data);
            })
        });
    }

    //获取下一次更改上限剩余的秒数
    static async getNextStep(){
        let contract = new ETH.web3.eth.Contract([{
                "name": "getNextStep", "type": "function",
                "inputs": [],
                "outputs": [{"name": "ts","type": "uint256"},],
        }], WalletConfig.ETH.moMoSetting);
        return new Promise(resolve => {
			contract.methods.getNextStep().call().then(data => {
				resolve(data);
			})
		});
    }

    static async getHashrateStep() {
        let contract = new ETH.web3.eth.Contract([{
                "name": "getHashrateStep",
                "type": "function",
                "inputs": [],
                "outputs": [
                    {"name": "step", "type": "uint256"},
                ],
        }], WalletConfig.ETH.moMoSetting);

        return await contract.methods.getHashrateStep().call();
    }
}