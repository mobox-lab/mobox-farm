<template>
		<div class="statistics">
			<section class="statistics-top">
				<div>
					<ul class="statistics-top-tab">
						<li @click="daySelect = 1;getGemAuctionStatistics() " :class="daySelect == 1?'active':''" class="opa-6">{{$t("Market_41")}}</li>
						<li @click="daySelect = 7;getGemAuctionStatistics() " :class="daySelect == 7?'active':''" class="opa-6">{{$t("Market_42")}}</li>
						<li @click="daySelect = 30;getGemAuctionStatistics() " :class="daySelect == 30?'active':''" class="opa-6">{{$t("Market_43")}}</li>
						<li @click="daySelect = 'all';getGemAuctionStatistics() " :class="daySelect == 'all'?'active':''" class="opa-6">{{$t("Market_61")}}</li>
					</ul>
					<div class="tab-split"></div>
				</div>
				<div class="aveage-box" style="padding:30px">
					<div class="vertical-children tac">
						<img src="@/assets/icon/awd.png" height="50" alt="">
						<div class="dib mgl-10 statistics-value">
							<p class="opa-6 small">{{$t("Market_44")}}</p>
							<h1 class="color-w tac">{{statistics.sale}}</h1>
						</div>
					</div>
					<div class="vertical-children tac">
						<img :src="require(`@/assets/coin/${showCoin}.png`)" height="50" alt="">
						<div class="dib mgl-10 statistics-value">
							<p class="opa-6 small">{{$t("Market_45")}}</p>
							<h1 class="color-w tac">{{numFloor(statistics.volume / 1e9, 1e2).toLocaleString()}} </h1>
						</div>
					</div>
					<div class="vertical-children tac">
						<img src="@/assets/icon/evage-icon.png" height="50" alt="">
						<div class="dib mgl-10 statistics-value">
							<p class="opa-6 small">{{$t("Market_46")}}</p>
							<h1 class="color-w tac">{{numFloor(statistics.avgPrice / 1e9, 1e2)}}</h1>
						</div>
					</div>
					<div class="vertical-children tac">
						<img src="@/assets/icon/evaprice.png" height="50" alt="">
						<div class="dib mgl-10 statistics-value">
							<p class="opa-6 small">{{$t("Market_75")}}</p>
							<h1 class="color-w tac">{{numFloor(statistics.sevenPrice, 1e2)}}</h1>
						</div>
					</div>
				</div>
			</section>
			<section class="mgt-20">
				<ul class="statistics-top-tab" style="padding:0px">
					<li @click="tableDataPos = 'recent';getTargetHistory('recent') " :class="tableDataPos == 'recent'?'active':''" class="opa-6">{{$t("Market_40")}}</li>
					<li @click="tableDataPos = 'last24';getTargetHistory('last24')" :class="tableDataPos == 'last24'?'active':''" class="opa-6">{{$t("Market_55")}}</li>
					<!-- <li @click="tableDataPos = 'last';getTargetHistory('last')" :class="tableDataPos == 'last'?'active':''" class="opa-6">{{$t('Market_56')}}</li> -->
					<li @click="tableDataPos = 'myHistory';getTargetHistory('myHistory')" :class="tableDataPos == 'myHistory'?'active':''" class="opa-6">{{$t("Market_54")}}({{tableData.myHistoryTotal}})</li>
				</ul>

				<table class="mgt-20" style="width:100%; border-collapse:collapse;border: none;">
					<tr class="opa-6 tal">
						<th class="list-item-momo" style="padding-left:10px">
							<span>{{typeToName[marketGemFilter]}}</span>
						</th>
						<th>{{$t("Market_25")}}</th>
						<th>{{$t("Market_26")}}</th>
						<th>{{$t("Market_17")}}</th>
						<th class="tar" >{{$t("BOX_12")}}</th>
					</tr>
					<tr>
						<td colspan="5">
							<hr class="split-hr mgt-10"  />
						</td>
					</tr>
					<tr><td colspan="5" style="height:10px"></td></tr>
					<tbody v-for="item in tableData[tableDataPos]" :key="item.tx" class="por tal">
						<div class="list-item-momo-mobile" >
							<span v-for="(item2, index) in item.ids" :key="item2 + index" style="margin:0px 2px" class="por">
								<template v-if="item2 > 0">
									<img  :src="require(`@/assets/market/${item.erc1155_ == 4?item.erc1155_:item2}.png`)" alt="" height="50">
									<span style="position:absolute;bottom:0px;width:80%;left:10%;background:rgba(0,0,0,0.5);border-radius:5px;zoom:0.8" class="tac small">x{{item.amounts[index]}}</span>
								</template>
							</span>
						</div>
						<tr><td colspan="5" style="height:5px"></td></tr>
						<tr class="list-item" >
							<td style="width:350px;" class="list-item-momo">
								<span v-for="(item2, index) in item.ids" :key="item2+index" style="margin:0px 2px" class="por">
									<template v-if="item2 > 0">
										<img  :src="require(`@/assets/market/${item.erc1155_ == 4?item.erc1155_:item2}.png`)" alt="" height="50">
										<span style="position:absolute;bottom:0px;width:80%;left:10%;background:rgba(0,0,0,0.5);border-radius:5px;zoom:0.8" class="tac small">x{{item.amounts[index]}}</span>
									</template>
								</span>
							</td>
							<td class="addr">{{getShortAddr(item.bidder)}}</td>
							<td class="addr">{{getShortAddr(item.auctor)}}</td>
							<td class="vertical-children">
								<span :class="item.isBuy?'color-buy':'color-sell'" v-if="tableDataPos == 'myHistory' ">
									{{item.isBuy?"-":"+"}}{{numFloor((item.price / 1e9) * (item.isBuy?1:0.95), 10000)}}  {{getCurrencyName(item.currency)}}
								</span>
								<span v-else>
									<img  class="hide-xs" :src="require(`@/assets/coin/${getCurrencyName(item.currency)}.png`)" height="25" alt="">
									{{numFloor(item.price / 1e9, 1e2)}}  {{getCurrencyName(item.currency)}}
								</span>
							</td>
							<td class="tar" >
								<p>{{dateFtt("yyyy.MM.dd", new Date(item.crtime * 1000))}}</p>
								<p>{{dateFtt("hh:mm:ss", new Date(item.crtime * 1000))}}</p>
							</td>
						</tr>
						<tr><td colspan="5" style="height:5px"></td></tr>
					</tbody>
				</table>

				<div class="no-show" v-if="tableData[tableDataPos].length == 0">
					<img src="@/assets/no_items.png" alt="">
					<p class="opa-6 mgt-10">No items to display</p>
				</div>

				<div style="margin-top: 30px" v-if="tableDataPos == 'myHistory' ">
					<Page :defaultPage="this.myHistoryPage" :totalPage="Math.ceil(marketGemHistory.total / 50)" :onChange="onPageChange" v-if="Math.ceil(marketGemHistory.total / 50) > 1" />
				</div>
			</section>
		</div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import {Page} from "@/components";
import { Http, Wallet } from '@/utils';
import { mapState } from "vuex";

export default {
	mixins: [CommonMethod],
	components: {Page},
	// props: ["data"],
	data(){
		return({
			historyList: [],
			statistics: {
				sevenPrice: 0,
				avgPrice: 0,
				sale: 0,
				volume: 0,
			},
			daySelect: 1,
			tableData:{"recent":[], "last24":[],"last":[],"myHistory":[],"myHistoryTotal": 0,}, 
			tableDataPos: "recent",
			myHistoryPage:1,
			typeToName: {
				1: this.$t("Gemstone_44"),
				2: "BOX",
				3: "MEC BOX",
				4: "MEC"
			}
		});
	},
	computed:{
		...mapState({
			marketGemHistory: (state) => state.marketState.data.marketGemHistory,
			marketTypePos: (state) => state.marketState.data.marketTypePos,
			marketGemFilter: (state) => state.marketState.data.marketGemFilter,
		}),
		showCoin(){
			return "USDT"
		}
	},
	watch:{
		marketGemHistory:function(newData){
			if(this.myHistoryPage == 1){
				this.tableData.myHistory = newData.list;
			}
		}
	},
	async created(){

		await this.getGemAuctionStatistics();
		await this.getGemAuctionHistoryAll();

		this.myHistoryPage = 1;
		this.getMyAuctionHistory();
	},
	methods: {
		async getTargetHistory(type){
			switch (type) {
				case "recent":
					this.getGemAuctionHistoryAll();
					break;
				case "last24":
					this.getLast24();
					break;
				case "last":
					this.getLast();
					break;
				case "myHistory":
					this.myHistoryPage = 1;
					this.getMyAuctionHistory();
					break;
				default:
					console.error("error type", type);
					break;
			}
		},
		//获取最近记录
		async getGemAuctionHistoryAll(){
			this.$store.commit("marketState/setData", {marketLoading: true});
			let res = await Http.getGemAuctionHistoryAll();
			console.log(res,"getGemAuctionHistoryAll");
			this.$store.commit("marketState/setData", {marketLoading: false});
			if(res){
				this.setData(res, "recent");
			}
		},
		//获取24小时记录
		async getLast24(){
			this.$store.commit("marketState/setData", {marketLoading: true});
			let res = await Http.geGemAuctionRankHistory24();
			this.$store.commit("marketState/setData", {marketLoading: false});
			if(res){
				this.setData(res, "last24");
			}
		},
		//获取Last100
		async getLast(){
			this.$store.commit("marketState/setData", {marketLoading: true});
			let res = await Http.getMomoAuctionRankHistory();
			this.$store.commit("marketState/setData", {marketLoading: false});
			if(res){
				this.setData(res, "last");
			}
		},
		//获取我的记录
		async getMyAuctionHistory(){
			let myAccount = await Wallet.ETH.getAccount();
			if(myAccount == "") return;
			// if(this.myHistoryPage == 1){
			// 	this.tableData.myHistory = this.marketGemHistory.list;
			// 	this.scrollToTop(400);
			// 	return
			// }
			this.$store.commit("marketState/setData", {marketLoading: true});
			this.tableData.myHistory = [];
			let data = await Http.getMyGemAuctionHistory(myAccount, this.myHistoryPage);
			this.$store.commit("marketState/setData", {marketLoading: false});
			this.scrollToTop(0);
			if(data){
				data.list.map(item=>{
					item.isBuy =  item.bidder.toLocaleLowerCase() == myAccount.toLocaleLowerCase();
					item.currency = item.crtime > MigrationTime ? 3 : item.currency;
					item.erc1155_ = item.type;
				});
				this.tableData.myHistory = data.list;
				this.tableData.myHistoryTotal = data.total;
			}
		},
		scrollToTop(time){
			let t = setTimeout(()=>{
				clearTimeout(t);
				window.document.body.scrollTop = window.document.documentElement.scrollTop = 0;
			}, time)
		},
		async setData(res,type){
			let arr = res.list;
			arr.map(item=>{
				item.currency = item.crtime > MigrationTime ? 3 : item.currency;
				item.erc1155_ = item.type;
			})
			this.tableData[type] = arr;
		},
		//获取统计分析
		async getGemAuctionStatistics(){
			this.$store.commit("marketState/setData", {marketLoading: true});
			let res = await Http.getGemAuctionStatistics(this.daySelect);
			this.$store.commit("marketState/setData", {marketLoading: false});
			if(res){
				this.statistics = res.data;
			}
		},
		onPageChange(page){
			this.myHistoryPage = page;
			this.getMyAuctionHistory();
		}
	}
}
</script>

<style scoped>
	.list-item{
		color: #7187C0;
	}
	.list-item-momo-mobile{
		position: absolute;
		zoom: 0.6;
		text-align: left;
		display: none;
		left: 20px;
		margin-top: -5px;
	}
	.list-item td:last-child{
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	.list-item td:first-child{
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}
	.statistics th{
		padding:0px 10px
	}
	.list-item td{
		padding: 10px;
		background: #13181F;
		border-left: none;
		border-right: none;
		border-bottom: none;
	}
	.statistics-top-tab li.active{
		border-bottom: 4px solid #1B54F5;
		color: #fff;
		opacity: 1;
	}
	.statistics-top-tab li{
		padding: 10px;
		display: inline-block;
		cursor: pointer;
		min-width: 80px;
		text-align: center;
		font-size: 13px;
	}
	.statistics-top-tab{
		padding: 10px;
		padding-bottom: 0px;
		list-style: none;
		text-align: left;
	}
	.statistics{
		margin: 0px auto;
		margin-top: 20px;
	}
	.statistics-top{
		background: #13181F;
		border-radius: 20px;
	}
</style>