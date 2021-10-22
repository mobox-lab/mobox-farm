<style src="./style.css"></style>
<template>
<div class="por" style="padding-top:30px" id="halloween">
	<div id="bg1"></div>
	<div class="tac" style="padding-bottom: 50px">
		<h1 style="font-size: 50px;color:#FC8915;line-height:40px">HALLOWEEN </h1>
		<h2 style="font-size: 40px;color:#AFD53D">LOTTERY</h2>
		<div style="font-size:26px">
			<p>Countdown</p>
			<p class="time vertical-children" v-if="1636430400 - nowTs > 0">
				<span>{{getLeftTime(1636430400 - nowTs).split(":")[0]}}</span> :
				<span>{{getLeftTime(1636430400 - nowTs).split(":")[1]}}</span> :
				<span>{{getLeftTime(1636430400 - nowTs).split(":")[2]}}</span> 
			</p>
			<p v-else>活动已结束</p>
		</div>
		<!-- 开箱子 -->
		<section class="mgt-30">
			<div class="hpanel">
				<div id="data-view">
					<div id="data-view-panel" class="tal">
						<div class="aveage-box " v-for="item in ovdata" :key="item.type">
							<div>
								<p class="small opa-6">{{ovTypeToName[item.types][0]}}</p>
								<p style="font-size: 20px" class="bold">{{item.cnt}}</p>
							</div>
							
							<div>
								<p class="small opa-6">{{ovTypeToName[item.types][1]}}</p>
								<p style="font-size: 20px" class="bold">{{item.amount}}</p>
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
				<div id="data-view" style="padding:16px" class="por">
					<Tab :list="tabList" :defaultSelectPos="tabPos" :onChange="onTabChange"  />
					<div class="vertical-children tar" id="take-balance" v-if="tabPos == 0 || tabPos == 1">
						<img src="@/assets/coin/MBOX.png" alt="" height="24">
						<span class="mgl-10">{{numFloor(myData.balance, 1e2)}}</span>
						<div class="btn-halloween2 mgl-10" style="position:relative;right:-2px" @click="claimMbox">领取</div>
					</div>
					<div id="selectDay" v-if="tabPos == 2">
						<Dropdown :list="['今日排行','昨日排行']" :defaultSelectPos="last" :onChange="(pos)=>{last = pos;getDrank()}" />&nbsp;
					</div>

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
								<span>{{getLeftTime(cntDown).split(":")[0]}}</span> :
								<span>{{getLeftTime(cntDown).split(":")[1]}}</span> :
								<span>{{getLeftTime(cntDown).split(":")[2]}}</span>
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
				<div v-if="tabPos == 0" style="padding: 20px 0px">
					<div class="center-view aveage-box">
						<div class="tal" style="border-right: 1px solid #363078">
							<p>我的南瓜:</p>
							<div class="vertical-children mgt-10">
								<img src="@/assets/halloween/lg.png" alt="" height="37">
								<span class="mgl-5" style="font-size:28px">{{myData.score}}</span>
							</div>
						</div>
						<div class="tal" style="flex:2;padding-left:30px">
							<p>兑换礼物</p>
							<div class="mgt-210">
								<Dropdown :list="suteData" :defaultSelectPos="sutePos" :onChange="onSelectSuteChange" />&nbsp;
								<span class="mgl-10">最多可兑换 {{getMaxSute}}</span>
							</div>
						</div>
						<div class="tac">
							<div class="vertical-children">
								<img class="mgl-5" src="@/assets/coin/MBOX.png" height="24" alt="">
								<span class="mgl-5">{{suitPrices[sutePosToId[sutePos]]}}</span>
								<img class="mgl-10" src="@/assets/halloween/lg.png" alt="" height="24">
								<span class="mgl-5" >{{suitScore[sutePosToId[sutePos]]}}</span>
							</div>
							<div class="mgt-10">
								<div class="btn-halloween tac" @click="goExchange">兑换</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="tabPos == 1" style="padding: 20px 0px">
					<div class="btn-halloween3" @click="sell(1)">出售一个</div>
					<div class="btn-halloween mgl-20" @click="sell('all')">出售全部</div>
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
					<tr v-for="item in oprLogs" :key="item.tx">
						<td class="tal tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.ts * 1000)) }}</td>
						<td class="tal">
							<span >{{item.types}}</span>
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
					</tr>
				</table>
			</div>
		</section>
	</div>
	<OpenBox ref="openbox" :myData = "myData" />
	<Exchange ref="exchange" :exchangeData = "{maxNum: getMaxSute, suteId: sutePosToId[sutePos]}" />
</div>
</template>

<script>
import { Tab, Page, Dropdown } from '@/components';
import CommonMethod from '@/mixin/CommonMethod';
import OpenBox from './OpenBox'
import Exchange from './Exchange'
import { Wallet } from '@/utils';
import axios from 'axios';
import { HttpConfig } from "@/config";
import { mapState } from 'vuex';

export default {
	mixins: [CommonMethod],
	components: {Tab, Page, OpenBox, Dropdown, Exchange},
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
				{key:1,lv: 1, num: 0, res: "",price: 0.13, isSelect: false},{key:2,lv: 1, num: 0, res: "",price: 0.13, isSelect: false},
				{key:3,lv: 2, num: 0, res: "",price: 0.24, isSelect: false},{key:4,lv: 2, num: 0, res: "",price: 0.24, isSelect: false},
				{key:5,lv: 3, num: 0, res: "",price: 0.8, isSelect: false},{key:6,lv: 3, num: 0, res: "",price: 0.8, isSelect: false},
				{key:7,lv: 4, num: 0, res: "",price: 2, isSelect: false},{key:8,lv: 4, num: 0, res: "",price: 2, isSelect: false},
				{key:9,lv: 5, num: 0, res: "",price: 201.2, isSelect: false},{key:10,lv: 5, num: 0, res: "",price: 800, isSelect: false},
			],
			suitPrices: { 4: 1.8, 6: 5.88, 8: 15.88, 9: 518.88, 10: 2518.88 },
			suitScore: { 4: 1, 6: 3, 8: 10, 9: 400, 10: 2500 },
			rankData: [],
			meRankData: {
				"rank": 0,
				"reward": {
					"mbox": 0,
					"mec": 0
				},
				"score": 0,
				"addr": ""
			},
			rankPage: 1,
			myAddr: "",
			myData: {
				"score": 0,
				"box": 0,
				"balance": 0
			},
			suteData: ["四件套","六件套","八件套","九件套","十件套",],
			sutePos: 4,
			sutePosToId: [4,6,8,9,10],
			last: 0,
			cntDown: 0,
			ovdata: [
				{"types": 1,"cnt": 0,"amount": 0},
				{"types": 2,"cnt": 0,"amount": 0},
				{"types": 3,"cnt": 0,"amount": 0},
			],
			ovTypeToName: {
				1: ["活动期间交易次数", "交易奖励礼盒数"],
				2: ["活动期间升级次数", "升级奖励礼盒数"],
				3: ["活动期间进化次数", "进化奖励礼盒数"],
			},
			oprLogs: [],
		})
	},
	computed: {
		...mapState({
			nowTs: (state) => state.globalState.data.nowTs,
		}),
		getMaxSute(){
			let num = 100000000;
			this.itemCfg.map(item=>{
				if(item.isSelect && num > item.num){
					num = item.num;
				}
			});
			return num
		}
	},
	watch: {
		sutePos: function(value){
			this.setSuteSelect(value);
		},
		nowTs: function(ts){
			if(this.cntDown > 0) this.cntDown--;

			if(ts % 10 == 0){
				this.getOvData();
			}
		}
	},
	async created(){
		this.setSuteSelect(this.sutePos)
		this.myAddr = await Wallet.ETH.getAccount();
		this.getMyData();
		this.getOvData();
		this.getOprLogs();
	},
	methods: {
		async getOprLogs(){
			let res = await axios.post(HttpConfig.Halloween.Logs, {addr: this.myAddr});
			if(res.data.code == 200){
				this.oprLogs = res.data.data;
			}
		},
		async getOvData(){
			let res = await axios.post(HttpConfig.Halloween.Ovdata, {addr: this.myAddr});
			if(res.data.code == 200){
				this.ovdata = res.data.data;
			}
		},
		goExchange(){
			if(this.getMaxSute <= 0){
				this.showNotify('数量不足', 'error')
			}else{
				this.$refs.exchange.show();
			}
		},
		async getDrank(){
			let data = {
				addr: this.myAddr,
				last: this.last,
			}
			let res = await axios.post(HttpConfig.Halloween.Drank, data);
			if(res.data.code == 200){
				this.rankData = res.data.data.rank;
				this.meRankData = res.data.data.me;
				this.cntDown = res.data.data.cntDown;
			}
		},
		async getTrank(){
			let data = {
				addr: this.myAddr,
			}
			let res = await axios.post(HttpConfig.Halloween.Trank, data);
			if(res.data.code == 200){
				this.rankData = res.data.data.rank;
				this.meRankData = res.data.data.me;
				this.cntDown = res.data.data.cntDown;
			}
		},
		async claimMbox(){
			let amount = Number(this.myData.balance);
			if(amount <= 0) return;
			let data = {
				addr: this.myAddr,
				sign: "123",
				amount
			}
			let res = await axios.post(HttpConfig.Halloween.Claim, data);
			console.log(res);
			if(res.data.code == 200){
				this.showNotify("领取成功","success");
				this.getMyData();
				this.getOprLogs();
			}
		},
		onSelectSuteChange(pos){
			this.sutePos = pos;
		},
		async sell(num){
			let targetItem;
			this.itemCfg.map(item=>{
				if(item.isSelect) targetItem = item;
			});
			if(num == "all") num = targetItem.num;
			let data = {
				addr: this.myAddr,
				sign: "123",
				gid: targetItem.key,
				num,
			}
			if(num == 0) return;
			let res = await axios.post(HttpConfig.Halloween.Sell, data);
			if(res.data.code == 1011){
				this.showNotify("数量不足", "error");
			}else{
				this.setBagsData(res.data.data);
			}
		},
		setSuteSelect(value){
			this.itemCfg.map(item=>{
				item.isSelect = (value == 0 && item.key < 5) 
					|| (value == 1 && item.key < 7)
					|| (value == 2 && item.key < 9)
					|| (value == 3 && item.key < 10)
					|| (value == 4 && item.key < 11)
			});
		},
		selectItme(item){
			if(this.tabPos == 1){
				this.itemCfg.map(item=>{
					item.isSelect = false;
				});
				item.isSelect = true
			}
		},
		async getMyData(){
			let res = await axios.post(HttpConfig.Halloween.Bags, {addr: this.myAddr});
			if(res.status == 200){
				this.setBagsData(res.data.data);
			}
		},
		setBagsData(data){
			let {score, box ,balance, bags} = data;
			this.myData.score = score;
			this.myData.box = box;
			this.myData.balance = balance;
			bags.map(item=>{
				this.itemCfg[item.gid - 1].num = item.num;
			});
			this.getOprLogs();
		},
		onTabChange(pos){
			this.tabPos = pos;

			if(pos == 1){
				this.selectItme(this.itemCfg[0])
			}
			if(pos == 0){
				this.setSuteSelect(this.sutePos)
			}
			if(pos == 2){
				this.getDrank();
			}
			if(pos == 3){
				this.getTrank();
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
	#halloween .dropdown .dropdown-value{
		background: #6d5df3;
		width: 150px;
		color: #fff
	}
	#halloween .dropdown .dropdown-list{
		background: #4b4679;
		width: 150px;
		color: #fff
	}
	#halloween .dropdown .dropdown-list li.active{
		background: #6d5df3 !important;
		color: #fff
	}
	#halloween .dropdown .dropdown-list li:hover{
		background: #6d5df3 !important;
		color: #fff
	}
	#selectDay .dropdown .dropdown-value{
		border-start-end-radius: 0px;
		border-end-end-radius: 0px;
	}
	#selectDay{
		position: absolute;
		right: 0px;
	}
</style>
