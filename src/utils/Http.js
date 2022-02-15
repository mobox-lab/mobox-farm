import axios from 'axios';
import {EventBus, Common} from "@/utils";
import {EventConfig} from '@/config';
export default class HTTP {
	// static serverNode = "https://nfttestapi.mobox.io"; //测试
	static serverNode = "https://nftapi.mobox.io"; // 新合约的 （公测版）
	// static serverNode = "http://192.168.5.211:3000"; // 测试

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
	static async getChartData(){
		let { data } = await this.get('/statistic/daily_infos');
		return data;
	}
	static async getBaseData(){
		let { data } = await this.get('/statistic/homepage_info');
		return data;
	}
	static async getMecBoxHistory(owner){
		let { data } = await this.get(`/crystal/minter_logs?address=${owner}`);
		return data;
	}
	static async getMdxBoxHistory(owner){
		let { data } = await this.get(`/mdx/open_logs?address=${owner}`);
		return data;
	}
	static async getEnhanceLog(tokenId){
		let { data } = await this.get(`/momo/enhance/logs?tokenId=${tokenId}`);
		return data;
	}
	static async buybackpool(type = 0){
		if(type == 0) type = "";
		let { data } = await this.get(`/buybackpool/amount?type=${type}`);
		return data;
	}
	static async avglockdays(){
		let { data } = await this.get(`/vemobox/avglockdays`);
		return data;
	}
	static async getKeyDrop(){
		let { data } = await this.get(`/key_drop/infos`);
		return data;
	}
	static async getLockList(owner, chain) { 
		let { data } = await this.get(`/nft/locks?owner=${owner}&chain=${chain}`);
		return data;
	}
	static async getVeMboxLog(owner) { 
		let { data } = await this.get(`/vemobox/logs/${owner}`);
		return data;
	}

	static async getMoMoDetail(arr){
		let {data} = await this.post("/momo/details", {tokenIds: arr});
		return data;
	}

	//查看租借清单
	static async getMyRentList(owner){
		let { data } = await this.get(`/momo_renter/detailed_list/${owner}`);
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

	static sortPosToName = ["-time","-price","price","-hashrate","hashrate"];
	//获取交易市场上的NFT
	static async getAuctionList(chain, page = 1, limit = 15, search = {}) {
		let params = {...search};
		if(params.vType == 0) params.vType = "";
		if(params.category == 0) params.category = "";
		if(params.pType == 0) params.pType = "";
		if(params.sort != undefined) params.sort = this.sortPosToName[params.sort];
		
		let { data } = await this.get(`/auction/search/${chain}?page=${page}&limit=${limit}`, params);
		return data;
	}
	//获取大宗交易市场上的NFT
	static async getBigAuctionList(page = 1, limit = 15, search = {}) {
		let params = {...search};
		if(params.sort != undefined) params.sort = this.sortPosToName[params.sort];
		let { data } = await this.get(`/auction_group/list?page=${page}&limit=${limit}`, params);
		return data;
	}
	static async getAuctionListGem(chain, page = 1, limit = 15, search = {}){
		let params = {...search};
		params.filter = Common.store.state.marketState.data.marketGemFilter;
		if(params.type == 0) params.type = "";
		if(params.level == 0) params.level = "";
		if(params.sort != undefined) params.sort = this.sortPosToName[params.sort];
		let { data } = await this.get(`/gem_auction/search/${chain}?page=${page}&limit=${limit}`, params);
		return data;
	}
	static async getRentList(chain, page = 1, limit = 15, search = {}){
		let params = {...search};
		if(params.vType == 0) params.vType = "";
		if(params.category == 0) params.category = "";
		if(params.pType == 0) params.pType = "";
		if(params.rentDays == 0) params.rentDays = "";

		if(params.sort != undefined) params.sort = this.sortPosToName[params.sort];
		let { data } = await this.get(`/momo_renter/search/${chain}?page=${page}&limit=${limit}`, params);
		return data;
	}
	//获取交易市场上我的Gem
	static async getMyGemAuctionList(chain, address) {
		let { data } = await this.get(`/gem_auction/list/${chain}/${address}?sort=-time&page=1&limit=128`, {filter: Common.store.state.marketState.data.marketGemFilter});
		return data;
	}
	//获取交易市场上我的NFT
	static async getMyAuctionList(chain, address) {
		let { data } = await this.get(`/auction/list/${chain}/${address}?sort=-time&page=1&limit=128`);
		return data;
	}
	//获取大宗交易市场上我的NFT
	static async getMyBigAuctionList(address) {
		let { data } = await this.get(`/auction_group/list/${address}?sort=-time&page=1&limit=128`);
		return data;
	}
	//获取交易历史记录
	static async getMyAuctionHistory(address, page=1,limit=50) {
		let { data } = await this.get(`/auction/logs_new/${address}?&page=${page}&limit=${limit}`);
		return data;
	}
	//获取交易历史记录
	static async getMyGemAuctionHistory(address, page=1,limit=50) {
		let { data } = await this.get(`/gem_auction/logs/${address}?&page=${page}&limit=${limit}`, {filter: Common.store.state.marketState.data.marketGemFilter});
		return data;
	}
	static async getMyRentHistory(address, page=1,limit=50) {
		let { data } = await this.get(`/momo_renter/logs/${address}?&page=${page}&limit=${limit}`);
		return data;
	}
	//获取momo交易历史记录
	static async getMomoAuctionHistory(tokenId) {
		let { data } = await this.get(`/auction/logs/token/${tokenId}?&page=1&limit=50`);
		return data;
	}
	//获取momo交易历史记录24小时top50
	static async getMomoAuctionRankHistory24() {
		let { data } = await this.get(`/auction/transactions/top50?ago=1`);
		return data;
	}
	//获取gem交易历史记录24小时top50
	static async geGemAuctionRankHistory24() {
		let { data } = await this.get(`/gem_auction/transactions/top50?ago=1`, {filter: Common.store.state.marketState.data.marketGemFilter});
		return data;
	}
	//获取gem交易历史记录24小时top50
	static async getRentRankHistory24() {
		let { data } = await this.get(`/momo_renter/transactions/top50?ago=1` );
		return data;
	}
	//获取momo交易历史记录top50
	static async getMomoAuctionRankHistory() {
		let { data } = await this.get(`/auction/transactions/top50`);
		return data;
	}
	//获取momo交易历史记录
	static async getMomoAuctionHistoryAll() {
		let { data } = await this.get(`/auction/logs_new?&page=1&limit=50`);
		return data;
	}
	//获取gem交易历史记录
	static async getGemAuctionHistoryAll() {
		let { data } = await this.get(`/gem_auction/logs?&page=1&limit=50`, {filter: Common.store.state.marketState.data.marketGemFilter});
		return data;
	}
	//获取gem交易历史记录
	static async getRentHistoryAll() {
		let { data } = await this.get(`/momo_renter/logs?&page=1&limit=50`);
		return data;
	}

	//拍卖统计
	static async getGemAuctionStatistics(time) {
		let { data } = await this.get(`/gem_auction/transactions?&ago=${time}`, {filter: Common.store.state.marketState.data.marketGemFilter});
		return data;
	}
	//拍卖统计
	static async getMomoAuctionStatistics(time) {
		let { data } = await this.get(`/auction/transactions?&ago=${time}`);
		return data;
	}
	//拍卖统计
	static async getRentStatistics(time) {
		let { data } = await this.get(`/momo_renter/transactions?&ago=${time}`);
		return data;
	}
	//获取总共开启box的数量
	static async getTotalOpenBox() {
		let { data } = await this.get("/box/amounts");
		return data;
	}
	//获取总共开启mecbox的数量
	static async getTotalOpenMecBox() {
		let { data } = await this.get("/crystal/box/amounts");
		return data;
	}
	//获取故事列表
	static async getStory(tokenId){
		let { data } = await this.get("/momo/story_logs/"+tokenId);
		return data;
	}
	//获取申购记录
	static async getBoxApplyHistory(addr){
		let { data } = await this.get(`/box/applications/`,{taker: addr});
		return data;
	}
	//获取申购记录
	static async getMecBoxApplyHistory(addr){
		let { data } = await this.get(`/crystal/box/applications/`,{taker: addr});
		return data;
	}
	//获取号码
	static async getBoxApplyResult(addr, roundIndex){
		let { data } = await this.get(`/box/apply_result/`, {taker: addr, roundIndex});
		return data;
	}
	//获取号码
	static async getMecBoxApplyResult(addr, roundIndex){
		let { data } = await this.get(`/crystal/box/apply_result/`, {taker: addr, roundIndex});
		return data;
	}
	//获取MDX申购记录
	static async getMdxBoxApplyHistory(addr){
		let { data } = await this.get(`/mdx/applications/`,{taker: addr});
		return data;
	}
	//获取号码
	static async getMdxBoxApplyResult(addr, roundIndex){
		let { data } = await this.get(`/mdx/apply_result/`, {taker: addr, roundIndex});
		return data;
	}
	//获取申购记录
	static async getGemApply(addr){
		let { data } = await this.get(`/gem/applications/`,{taker: addr});
		return data;
	}
	//获取号码
	static async getGemApplyResult(addr, roundIndex, applyType){
		let { data } = await this.get(`/gem/apply_result/`, {taker: addr, roundIndex, applyType});
		return data;
	}

	//获取抽奖排名
	static async getLotteryRank({is_past, page}){
		let { data } = await this.get(`/vemobox/lottery/rank/`, {is_past, page});
		return data;
	}
	static async getMyLotteryRank(address, is_past){
		let { data } = await this.get(`/vemobox/lottery/self/`, {address, is_past});
		return data;
	}
	static async getlotteryLucker(){
		let { data } = await this.get(`/vemobox/lottery/luckers`,);
		return data;
	}
	static async getBidderList(page, round){
		let { data } = await this.get(`/momo/bidder/list`, {page, round});
		return data;
	}
	static async getBidderWinner(){
		let { data } = await this.get(`/momo/bidder/winner`, );
		return data;
	}

}