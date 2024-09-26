import axios from 'axios';
export default class Erc1155TradeHttp {
	static serverNode = "http://192.168.5.190:9092"; 

	static async post(url, sendData) {
		try {
			let res = await axios.post(this.serverNode + url, sendData);
			return res;
		} catch (e) {
			console.error("http error", e);
		}
	}

}