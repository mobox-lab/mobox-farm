<template>
		<div class="statistics">
			<section class="statistics-top">
				<div>
					<ul class="statistics-top-tab">
						<li @click="daySelect = 1;getMomoAuctionStatistics() " :class="daySelect == 1?'active':''" class="opa-6">{{$t("Market_41")}}</li>
						<li @click="daySelect = 7;getMomoAuctionStatistics() " :class="daySelect == 7?'active':''" class="opa-6">{{$t("Market_42")}}</li>
						<li @click="daySelect = 30;getMomoAuctionStatistics() " :class="daySelect == 30?'active':''" class="opa-6">{{$t("Market_43")}}</li>
					</ul>
					<div class="tab-split"></div>
				</div>
				<div class="aveage-box" style="padding:30px">
					<div class="vertical-children tac">
						<img src="../../assets/icon/awd.png" height="50" alt="">
						<div class="dib mgl-10 statistics-value">
							<p class="opa-6">{{$t("Market_44")}}</p>
							<h1 class="color-w tac">{{statistics.sale}}</h1>
						</div>
					</div>
					<div class="vertical-children tac">
						<img src="../../assets/coin/BUSD.png" height="50" alt="">
						<div class="dib mgl-10 statistics-value">
							<p class="opa-6">{{$t("Market_45")}}</p>
							<h1 class="color-w tac">{{numFloor(statistics.volume / 1e9, 1e4)}} </h1>
						</div>
					</div>
					<div class="vertical-children tac">
						<img src="../../assets/icon/evage-icon.png" height="50" alt="">
						<div class="dib mgl-10 statistics-value">
							<p class="opa-6">{{$t("Market_46")}}</p>
							<h1 class="color-w tac">{{numFloor(statistics.avgPrice / 1e9, 1e4)}}</h1>
						</div>
					</div>
				</div>
			</section>
			<section class="mgt-30">
				<table style="width:100%; border-collapse:collapse;border: none;">
					<tr class="opa-6 tal">
						<th class="list-item-momo" style="padding-left:10px">MOMO</th>
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
					<tbody v-for="item in historyList" :key="item.tx" class="por tal">
						<div class="list-item-momo-mobile" >
							<span v-for="item2 in item.petList" :key="item2.prototype" style="margin:0px 2px">
								<PetItemMin :data="item2" />&nbsp;
							</span>
						</div>
						<tr><td colspan="5" style="height:5px"></td></tr>
						<tr class="list-item">
							<td style="width:350px;" class="list-item-momo">
								<span v-for="item2 in item.petList" :key="item2.prototype" style="margin:0px 2px">
									<PetItemMin :data="item2" />
								</span>
							</td>
							<td class="addr">{{getShortAddr(item.bidder)}}</td>
							<td class="addr">{{getShortAddr(item.auctor)}}</td>
							<td class="vertical-children"> <img class="hide-xs" src="../../assets/coin/BUSD.png" height="25" alt=""> {{numFloor(item.bidPrice / 1e9, 1e2)}} BUSD</td>
							<td class="tar" >
								<p>{{dateFtt("yyyy.MM.dd", new Date(item.crtime * 1000))}}</p>
								<p>{{dateFtt("hh:mm:ss", new Date(item.crtime * 1000))}}</p>
							</td>
						</tr>
						<tr><td colspan="5" style="height:5px"></td></tr>
					</tbody>
				</table>
			</section>
		</div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import {PetItemMin} from "@/components";
import { Http } from '@/utils';
import {BaseConfig} from "@/config";

export default {
	mixins: [CommonMethod],
	components: {PetItemMin},
	// props: ["data"],
	data(){
		return({
			historyList: [],
			statistics: {
				avgPrice: 0,
				sale: 0,
				volume: 0,
			},
			daySelect: 1,
		});
	},
	async created(){
		await this.getMomoAuctionStatistics();
		await this.getMomoAuctionHistoryAll();
	},
	methods: {
		async getMomoAuctionHistoryAll(){
			let res = await Http.getMomoAuctionHistoryAll();
			if(res){
				res.list.map(item=>{
					let petList = [];
					//1155
					if(item.tokenId == 0){
						let {ids, amounts, bidPrice} = item;
						ids.map((prototype, index)=>{
							let obj = BaseConfig.NftCfg[prototype];
							petList.push({
								...obj,
								bidPrice,
								prototype,
								level: 1,
								num: amounts[index],
								chain: "bnb",
								tokenId: 1,
								hashrate: obj.quality,
								lvHashrate: obj.quality,
								quality: obj.quality,
								vType: parseInt(prototype / 1e4),
							});
						});
					}else{
						//721
						let obj = BaseConfig.NftCfg[item.prototype];
						petList.push({
							...obj,
							bidPrice: item.bidPrice,
							prototype: item.prototype,
							quality: item.quality,
							level: item.level,
							num: 1,
							chain: "bnb",
							tokenId: item.tokenId,
							hashrate: item.hashrate,
							lvHashrate: item.lvHashrate,
							vType: parseInt(item.prototype / 1e4),
							category: item.category
						})
					}

					item.petList = petList;
				})
				this.historyList = res.list;
			}
		},
		async getMomoAuctionStatistics(){
			this.$store.commit("marketState/setData", {marketLoading: true});
			let res = await Http.getMomoAuctionStatistics(this.daySelect);
			this.$store.commit("marketState/setData", {marketLoading: false});
			if(res){
				this.statistics = res.data;
			}
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
		background: #1D2B50;
		border-left: none;
		border-right: none;
		border-bottom: none;
	}
	.statistics-top-tab li.active{
		border-bottom: 4px solid #93BBFF;
		color: #fff;
		opacity: 1;
	}
	.statistics-top-tab li{
		padding: 10px 20px;
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
		max-width: 1400px;
		margin: 0px auto;
		margin-top: 20px;
	}
	.statistics-top{
		background: #2A3B67;
		border-radius: 20px;
	}
</style>