<style src="./style.css"></style>
<template>
<div class="por" style="padding-top:30px" id="halloween">
	<div id="bg1"></div>
	<div class="tac">
		<h1 style="font-size: 50px;color:#FC8915;line-height:40px">HALLOWEEN </h1>
		<h2 style="font-size: 40px;color:#AFD53D">LOTTERY</h2>
		<div style="font-size:26px">
			<p>Countdown</p>
			<p class="time vertical-children">
				<span>21</span> :
				<span>43</span> :
				<span>26</span>
			</p>
		</div>
		<!-- 开箱子 -->
		<section class="mgt-30">
			<div class="hpanel">
				<div id="data-view">
					<div id="data-view-panel" class="tal">
						<div class="aveage-box " v-for="item in 3" :key="item">
							<div>
								<p class="small opa-6">活动期间交易次数</p>
								<p style="font-size: 20px" class="bold">235</p>
							</div>
							
							<div>
								<p class="small opa-6">活动期间交易次数</p>
								<p style="font-size: 20px" class="bold">235</p>
							</div>
							
						</div>
						<img id="data-box" src="@/assets/halloween/box.png" alt="" width="300">
					</div>
				</div>
				<section class="tac ovh"  style="max-width: 800px;margin:0px auto;padding: 20px 0px">
					<div class="col-md-7">
						<div v-for="item in rateData" :key="item.lv" class="vertical-children dib" style="margin:5px 10px">
							<div style="height:20px;width:20px;border-radius:20px;padding:2px;" class="dib dot-bg">
								<div style="width:100%;height:100%;border-radius:20px;border:2px solid #1B1C21" :class="`bg-new${item.lv}`"></div>
							</div>
							<p class="dib mgl-5">{{item.rate}}</p>
						</div>
					</div>
					<div class="col-md-5">
						<div class="btn-halloween por" @click="$refs.openbox.show()">
							<span class="num-notice" v-if="myData.box > 0">{{myData.box}}</span>
							OPEN
						</div>
					</div>
				</section>
			</div>
		</section>
		<!-- 兑换操作 -->
		<section class="mgt-30">
			<div class="hpanel">
				<div id="data-view" style="padding:16px">
					<Tab :list="tabList" :defaultSelectPos="tabPos" :onChange="onTabChange"  />
					<!-- 礼物兑换 -->
					<div v-if="tabPos == 0 || tabPos == 1" class="center-view">
						<div class="aveage-box mgt-20" >
							<div class="g-item por" v-for="item in itemCfg.slice(0,5)" :key="item.key" @click="selectItme(item)">
								<div class="por dib">
									<img class="por" style="z-index:10" :src="require(`@/assets/halloween/itembg${item.lv}.png`)" alt="" width="120">
									<div v-if="item.isSelect" class="g-item-active animate__animated  animate__pulse animate__infinite"></div>
								</div>
								<img class="g-item-icon" :src="require(`@/assets/halloween/${item.key}.png`)" alt="" width="120">
								<p class="g-item-num">×{{item.num}}</p>
							</div>
						</div>
						<div class="aveage-box mgt-30" >
							<div class="g-item por" v-for="item in itemCfg.slice(5,10)" :key="item.key" @click="selectItme(item)">
								<div class="por dib">
									<img class="por" style="z-index:10" :src="require(`@/assets/halloween/itembg${item.lv}.png`)" alt="" width="120">
									<div v-if="item.isSelect" class="g-item-active animate__animated  animate__pulse animate__infinite"></div>
								</div>
								<img class="g-item-icon" :src="require(`@/assets/halloween/${item.key}.png`)" alt="" width="120">
								<p class="g-item-num">×{{item.num}}</p>
							</div>
						</div>
					</div>
					<div v-if="tabPos == 2 || tabPos == 3">
						<div class="mgt-20" style="font-size:26px">
							<p class="dib">日榜倒计时</p>
							<p class="time vertical-children dib mgl-10" >
								<span>21</span> :
								<span>43</span> :
								<span>26</span>
							</p>
						</div>
						<table style="width: 100%" class="new-table mgt-20">
							<tr class="opa-6">
								<th class="tal " style="width: 33%"> {{ $t("Rank_05") }}</th>
								<th class="tac" style="width: 33%">南瓜数</th>
								<th class="tar " style="width: 33%">奖励</th>
							</tr>
						
							<tr v-for="item in rankData.slice( 10 * (rankPage - 1), 10 * rankPage )" :key="item.rank">
								<td class="tal">
									<span class="dib tac rank-icon" :class="{active: item.rank <= 3}">{{ item.rank }}</span >
									<span style="margin-left: 20px">
										{{ shorAddress(item.addr) }}
									</span>
								</td>
								<td class="tac vertical-children ">
									<img src="@/assets/halloween/lg.png" alt="" height="20">
									<span class="mgl-5">{{item.score}}</span>
								</td>
								<td class="tar vertical-children">
									<img src="@/assets/coin/CRYSTAL.png" alt="" height="20">
									<span class="dib tal mgl-5"> {{item.reward.mec}}</span>
									<img src="@/assets/coin/MBOX.png" class="mgl-20" alt="" height="20">
									<span class="dib tal mgl-5"> {{item.reward.mbox}}</span>
								</td>
							</tr>
							<tr v-if="rankData.length > 1">
								<td colspan="4" style="border:none">
									<div class="mgt-10"></div>
									<Page :defaultPage="1" :totalPage="Math.ceil(rankData.length / 10)" :onChange="onPageChange"/>
								</td>
							</tr>
							
							<tbody class="my-rank">
							<tr >
								<td class="tal" style="border-top-left-radius:12px;border-bottom-left-radius:12px">
									<span class="dib tac rank-icon" :class="{active: meRankData.rank <= 3}">{{ meRankData.rank || "-" }}</span >
									<span style="margin-left: 20px"> {{ shorAddress(meRankData.addr) }} </span>
								</td>
								<td class="tac vertical-children ">
									<img src="@/assets/halloween/lg.png" alt="" height="20">
									<span class="mgl-5">{{meRankData.score}}</span>
								</td>
								<td class="tar vertical-children" style="border-top-right-radius:12px;border-bottom-right-radius:12px">
									<span class="dib tal"> {{meRankData.reward.mec}}</span>
									<span class="dib tal"> {{meRankData.reward.mbox}}</span>
								</td>
							</tr>
						</tbody>

						</table>
					</div>
				</div>
				<div v-if="tabPos == 1" style="padding: 20px 0px">
					<div class="btn-halloween3">出售一个</div>
					<div class="btn-halloween mgl-20">出售全部</div>
				</div>
			</div>
		</section>
		<!-- 操作记录 -->
		<section class="mgt-30" v-if="tabPos == 0 || tabPos == 1">
			<div class="hpanel" style="padding: 16px">
				<table class="small  new-table" border="0" frame="void" rules="none" >
					<tr>
						<th width="30%" class="tal tac-xs">{{ $t("BOX_12") }}</th>
						<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
						<th width="10%">{{ $t("NewBOX_27") }}</th>
						<th width="20%">{{ $t("BOX_27") }}</th>
						<th width="40%" class="tar">TX</th>
					</tr>
					<!-- <tr v-for="item in getHistory" :key="item.tx">
						<td class="tal tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.crtime * 1000)) }}</td>
						<td class="tal">
							<span v-if="Number(item.ticketStartNo) > 1e6">{{$t("NewBOX_25")}}</span>
							<span v-else>{{$t("NewBOX_26")}}</span>
						</td>
						<td>x{{ item.amountBox }}</td>
						<td class="vertical-children">
							<span v-if="item.isOver==false" style="color:#49c773">{{$t("NewBOX_28")}}</span>
							<span v-else>{{$t("NewBOX_29")}}</span>
						</td>
						<td class="tar">
							<img  @click="getApplyDetial(item)" src="@/assets/icon/view.png" height="25" alt="" class="cur-point" />&nbsp;
							<a :href="getTxUrl(item.tx)" target="_blank">
								<img src="@/assets/icon/viewTx.png" alt="" height="25" class="cur-point" />
							</a>
						</td>
					</tr> -->
				</table>
			</div>
		</section>
	</div>
	<OpenBox ref="openbox" :myData = "myData" />
</div>
</template>

<script>
import { Tab, Page } from '@/components';
import CommonMethod from '@/mixin/CommonMethod';
import OpenBox from './OpenBox'
import { Wallet } from '@/utils';
import axios from 'axios';
import { HttpConfig } from "@/config";

export default {
	mixins: [CommonMethod],
	components: {Tab, Page, OpenBox},
	data(){
		return ({
			tabList: ["礼物兑换", "礼物出售","日排行榜","总排行榜"],
			tabPos: 0,
			rateData: [
				{lv: 1, rate: "30%"},
				{lv: 2, rate: "30%"},
				{lv: 3, rate: "25%"},
				{lv: 4, rate: "10%"},
				{lv: 5, rate: "5%"},
				{lv: 6, rate: "1%"},
			],
			itemCfg: [
				{key:1,lv: 1, num: 0, res: "",price: 1.88, isSelect: false},{key:2,lv: 1, num: 0, res: "",price: 1.88, isSelect: false},
				{key:3,lv: 2, num: 0, res: "",price: 1.88, isSelect: false},{key:4,lv: 2, num: 0, res: "",price: 1.88, isSelect: false},
				{key:5,lv: 3, num: 0, res: "",price: 1.88, isSelect: false},{key:6,lv: 3, num: 0, res: "",price: 1.88, isSelect: false},
				{key:7,lv: 4, num: 0, res: "",price: 1.88, isSelect: false},{key:8,lv: 4, num: 0, res: "",price: 1.88, isSelect: false},
				{key:9,lv: 5, num: 0, res: "",price: 1.88, isSelect: false},{key:10,lv: 5, num: 0, res: "",price: 1.88, isSelect: false},
			],
			rankData: [
				{addr: "0x9702ec0911EfeFc1589c48f6371bBD80E4739235","rank": 1,"score": 0, "reward": {"mbox": 300,"mec": 24000}},
				{addr: "0x9702ec0911EfeFc1589c48f6371bBD80E4739235","rank": 2,"score": 0, "reward": {"mbox": 300,"mec": 24000}}
			],
			meRankData: {
				"rank": 2,
				"reward": {
					"mbox": 0,
					"mec": 20000
				},
				"score": "10",
				"addr": "0x9702ec0911EfeFc1589c48f6371bBD80E4739235"
			},
			rankPage: 1,
			myAddr: "",
			myData: {
				"score": 0,
				"box": 0,
				"balance": 0
			}
		})
	},
	async created(){
		this.myAddr = await Wallet.ETH.getAccount();
		this.getMyData();
	},
	methods: {
		selectItme(item){
			if(this.tabPos == 1){
				this.itemCfg.map(item=>{
					item.isSelect = false;
				});
				item.isSelect = true
			}
		},
		async getMyData(){
			let data = await axios.post(HttpConfig.Halloween.Bags, {addr: this.myAddr});
			if(data.status == 200){
				let {score, box ,balance, bags} = data.data.data;
				this.myData.score = score;
				this.myData.box = box;
				this.myData.balance = balance;
				console.log(bags, "----------------");
				bags.map(item=>{
					this.itemCfg[item.gid - 1].num = item.num;
				})
			}
		},
		onTabChange(pos){
			this.tabPos = pos;

			if(pos == 1){
				this.selectItme(this.itemCfg[0])
			}
			if(pos == 0){
				this.itemCfg.map(item=>{
					item.isSelect = true;
				});
			}
		},
		onPageChange(page){
			this.rankPage = page;
		}
	}
}
</script>

<style >
	#data-view li.active{
		background: #6d5df3 !important;
	}
	#data-view li{
		color: #fff;
	}
	.hpanel .new-table{
		background: none !important
	}
	.hpanel .my-rank{
		background: #161331;
	}
	.hpanel .new-table td{
		/* border: 1px solid red; */
	}
	#halloween .yf-dialog{
		background: #161331;
		border-radius: 12px;
		border: 3px solid #211d42;
	}
	#halloween .ly-input{
		background: rgba(255, 255, 225, 0.1);
	}
</style>
