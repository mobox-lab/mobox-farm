import axios from 'axios';
import {EventBus} from "@/utils";
import {EventConfig} from '@/config';
export default class HTTP {
	static serverNode = "https://nfttestapi.mobox.io"; //测试
	// static serverNode = "https://nftapi.bitsplus.cn"; // 新合约的 （公测版）

	static async post(url, sendData) {
		try {
			let res = await axios.post(this.serverNode + url, sendData);
			return res;
		} catch (e) {
			console.error("http error", e);
		}
	}
	static async get(url, params) {
		try {
			let res = await axios.get(this.serverNode + url, {params});
			return res;
		} catch (e) {
			console.error("http error", e);
			EventBus.$emit(EventConfig.HttpError);
		}
	}
	static async getKeyDrop(){
		let { data } = await this.get(`/key_drop/infos`);
		return data;
	}
	static async getLockList(owner, chain) { 
		let { data } = await this.get(`/nft/locks?owner=${owner}&chain=${chain}`);
		return data;
	}

	//锁定NFT（目前用来锁定图鉴）
	static async lockNft(owner,prototype,chain){
		let { data } = await this.post(`/nft/lock/`, {chain, owner,  prototype, tokenId: 0});
		return data;
	}
	//解锁NFT
	static async unlockNft(owner,prototype,chain){
		let { data } = await this.post(`/nft/unlock`, {chain, owner,  prototype, tokenId: 0});
		return data;
	}

	//获取升级日志
	static async getLevelupInfo(tokenId) {
		let { data } = await this.get(`/momo/levelup_logs/${tokenId}`);
		return data;
	}

	//获取算力排行榜
	static async getHashrateRankList(self) {
		let { data } = await this.get(`/rank/hashrate?self=${self}&page=1&limit=100`);
		return data;
	}
	//获取mbox排行榜
	static async getMboxRankList(self) {
		let { data } = await this.get(`/rank/mobox?self=${self}&page=1&limit=100`);
		return data;
	}
	//获取mbox排行榜
	static async getMomoRankList() {
		let { data } = await this.get(`/rank/momotoken?page=1&limit=100`);
		return data;
	}

	//获取质押记录
	static async getStakeHistory(chain, address) {
		let { data } = await this.get(`/key_drop/logs/${chain}/${address}`);
		return data;
	}

	//获取开箱子记录
	static async getOpenBoxHistory(chain, address) {
		let { data } = await this.get(`/box/history/${chain}/${address}`);
		return data;
	}

	static sortPosToName = ["-price","price","-hashrate","hashrate"];
	//获取交易市场上的NFT
	static async getAuctionList(chain, page = 1, limit = 15, search = {}) {
		let params = {...search};
		if(params.vType == 0) params.vType = "";
		if(params.category == 0) params.category = "";
		if(params.sort != undefined) params.sort = this.sortPosToName[params.sort];
		
		let { data } = await this.get(`/auction/search/${chain}?page=${page}&limit=${limit}`, params);
		return data;
	}
	//获取交易市场上我的NFT
	static async getMyAuctionList(chain, address) {
		let { data } = await this.get(`/auction/list/${chain}/${address}?sort=-time&page=1&limit=128`);
		return data;
	}
	//获取交易历史记录
	static async getMyAuctionHistory(address) {
		let { data } = await this.get(`/auction/logs/${address}?&page=1&limit=50`);
		return data;
	}
	//获取momo交易历史记录
	static async getMomoAuctionHistory(tokenId) {
		let { data } = await this.get(`/auction/logs/token/${tokenId}?&page=1&limit=50`);
		return data;
	}
	//获取momo交易历史记录
	static async getMomoAuctionHistoryAll() {
		let { data } = await this.get(`/auction/logs?&page=1&limit=50`);
		return data;
	}
	//拍卖统计
	static async getMomoAuctionStatistics(time) {
		let { data } = await this.get(`/auction/transactions?&ago=${time}`);
		return data;
	}
	//获取总共开启box的数量
	static async getTotalOpenBox() {
		let { data } = await this.get("/box/amounts");
		return data;
	}
	//获取故事列表
	static async getStory(tokenId){
		let { data } = await this.get("/momo/story_logs/"+tokenId);
		return data;
	}
}