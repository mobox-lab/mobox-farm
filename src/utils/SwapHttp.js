import axios from 'axios';
export default class SwapHttp {
	// static serverNode = "https://dwalletapi.mobox.io/bscswap"; 
	static serverNode = "https://swapapi.mobox.io/bscswap"; 

	static async post(url, sendData) {
		try {
			let res = await axios.post(this.serverNode + url, sendData);
			return res;
		} catch (e) {
			console.error("http error", e);
		}
	}

}