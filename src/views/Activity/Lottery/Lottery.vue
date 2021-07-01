<template>
	<div class="tac center-box ">
		<div class="por clear mgt-10">
			<section class="col-md-7" style="padding:10px">
				<div class="adv-panel">
					<h1 class="vertical-children">
						<span>传说MOMO抽奖{{getNowRound}}</span>
						<img class="mgl-10 cur-point" @click="oprDialog('gem-rule-dialog','block')" src="@/assets/icon/help.png" alt="" height="30">
					</h1>
					<div class="tac mgt-10">
						<template >
							<p v-if="momoDatas[getNowRound - isShowPastRound].ts - nowTs >0">{{$t("Gemstone_21")}}: {{getLeftTime(momoDatas[getNowRound - isShowPastRound].ts - nowTs)}}</p>
							<p v-else>已结束</p>
						</template>
						<p class="vertical-children">
							<span>当前区块: </span>
							<Loading v-if="getNowBlock == '-' " />
							<span v-else>{{getNowBlock}}</span>
						</p>

						<div >
							<PetItem v-bind:data="{ item: momoDatas[getNowRound- isShowPastRound] }" />
						</div>
						<router-link to="/mypet/2" >
							<p class="cur-point small mgt-10">查看升级预览 >> </p>
						</router-link>
					</div>
				</div>
			</section>
			<section class="col-md-5" style="padding:10px">
				<div class="panel por" style="height:420px;padding:30px">
					
					<div class="aveage-box tal" style="border-bottom: 1px solid #162340;padding-bottom:20px">
						<div>
							<p class="small opa-6">我的veMBOX</p>
							<h3 class="notice-color">{{myLotteryData.total_vemobox}}</h3>
						</div>
						<div>
							<p class="small opa-6">总票数</p>
							<h3 class="notice-color">{{myLotteryData.lottery_ticket}}</h3>
						</div>
						<div class="tac">
							<router-link to="/">
								<button class="btn-primary">获得veMBOX</button>
							</router-link>
						</div>
					</div>
					<div class="mgt-30 tal">
						<h4>中奖纪录</h4>
						<table class="small  new-table tac"  >
							<tr class="small opa-6">
								<td class="tal">MOMO</td>
								<td >时间</td>
								<td>中奖者</td>
								<td>中奖号码</td>
								<td class="tar">TX</td>
							</tr>
							<!-- <tr>
								<td colspan="5" class="tac">等待开奖</td>
							</tr> -->
							<tr v-for="item in luckerArr" :key="item.issue_number">
								<td class="tal"><PetItemMin :data="momoDatas[item.issue_number]" /></td>
								<td >
									<p>{{dateFtt('yyyy-MM-dd',new Date(item.uptime*1000))}}</p>
									<p>{{dateFtt('hh:mm:ss',new Date(item.uptime*1000))}}</p>
								</td>
								<td>{{ shorAddress(item.address) }}</td>
								<td>{{item.ticket_no}}</td>
								<td class="tar">
									<a :href="getTxUrl('0xb45efd59815b68b9655ee5042e34137eba807c6142283ad14456ea806bd73810')" target="_blank">
										<img src="@/assets/icon/viewTx.png" alt="" class="cur-point" height="25" />
									</a>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</section>
			<div class="col-md-12 por" style="padding:10px;">
				<div class="tal mgt-10" v-if="getNowRound > 1">
					<div class="tab-menu" :class="{active: isShowPastRound == 1}" style="margin-left:20px" @click="isShowPastRound=1;getLotteryRank()">上一期</div>
					<div class="tab-menu" :class="{active: isShowPastRound == 0}" @click="isShowPastRound=0;getLotteryRank()">当前期</div>
				</div>
				<section id="round-info" style="padding:10px 15px;background:#13181F;border-radius:20px;">
					<div class="aveage-box">
						<div style="padding:10px">
							<p class="small opa-6 tac" >票数计算倒计时</p>
							<input type="text" readonly class="ly-input mgt-10 tac"
							:value="momoDatas[getNowRound - isShowPastRound].ts - 3600 - nowTs > 0 ? getLeftTime(momoDatas[getNowRound - isShowPastRound].ts - 3600 - nowTs): '已锁票' " />
						</div>
						<div style="padding:10px">
							<p class="small opa-6 tac" >开奖区块</p>
							<input type="text" readonly class="ly-input mgt-10 tac" :value="momoDatas[getNowRound - isShowPastRound].block" />
						</div>
						<div style="padding:10px">
							<p class="small opa-6 tac" >Hash</p>
							<p  class="ly-input mgt-10 tac" style="line-height:35px">
								<a style="text-decoration:underline" :href="getBlockUrl(momoDatas[getNowRound - isShowPastRound].block)" target="_blank" v-if="momoDatas[getNowRound - isShowPastRound].hash != '-' ">{{shortHash(momoDatas[getNowRound - isShowPastRound].hash)}}</a>
								<span v-else>-</span>
							</p>
						</div>
						<div style="padding:10px">
							<p class="small opa-6 tac" >当前总票数</p>
							<input type="text" readonly class="ly-input mgt-10 tac" value="0" />
						</div>
					</div>
				</section>
			</div>

			<div class="col-md-12 por" style="padding:10px;">
				<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:20px;">
					<div style="min-height:450px;">
						<table class="small  new-table"  >
							<tr>
								<th style="width:40%" class="tal">{{ $t("Rank_05") }}</th>
								<th  class="tal">veMBOX</th>
								<th >票数</th>
								<th  class="tar">票号</th>
							</tr>
							<tr v-for="item in rankListObj.list" :key="item.address">
								<td class="tal">
									<span class="dib tac rank-icon" :class="{active: item.rank <= 3}">{{ item.rank }}</span >
									<span class="mgl-5">
										{{ shorAddress(item.address) }}
									</span>
								</td>
								<td class="tal">{{ item.total_vemobox }}</td>
								<td>{{ item.lottery_ticket }}</td>
								<td class="vertical-children tar">
									{{item.ticket_number_start}}-{{item.ticket_number_end}}
								</td>
							</tr>
						</table>
					</div>
					<table class=" new-table">
						<tr v-if="rankListObj.total_page > 1">
							<td colspan="4" style="border:none">
								<Page :defaultPage="nowPage" :totalPage="rankListObj.total_page" :onChange="onPageChange" />
							</td>
						</tr>
						<!-- <tbody class="my-rank">
							<tr >
								<td class="tal" style="border-top-left-radius:20px;border-bottom-left-radius:20px">
									<span class="dib tac rank-icon" :class="{active: hashrateRankList.self.rank <= 3}">{{ hashrateRankList.self.rank || "-" }}</span >
									<span style="margin-left: 20px"> {{ shorAddress(hashrateRankList.self.address) }} </span>
								</td>
								<td class="tar vertical-children" style="border-top-right-radius:20px;border-bottom-right-radius:20px">
									<span  class="dib tal" >
										{{ hashrateRankList.self.score || "-" }}
									</span>&nbsp;
									<img src="@/assets/icon/hash_icon.png" alt="" height="30" />
								</td>
							</tr>
						</tbody> -->
					</table>
				</section>
				<div class="loading" v-show="loading">
					<Loading :width="30" :height="30"  />
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import { PetItem, Page, Loading, PetItemMin } from '@/components';
import CommonMethod from '@/mixin/CommonMethod';
import { Http, Wallet } from '@/utils';
import { mapState } from 'vuex';

const baseAttr = {
	num: 1,
	level: 1,
	vType: 6,
	quality: 6,
	chain: "bnb",
	category: 5,
	speciality: 2,
	hashrate: 180,
	gems: [0,0,0,0],
	lvHashrate: 180,
	location: "Wallet",
	noPrice: true
}
let  t = null;
export default {
	components: {PetItem, Page, Loading, PetItemMin},
	mixins: [CommonMethod],
	data(){
		return({
			getCountDown: 5000,
			isShowPastRound: 0, //是否显示上一期的Round
			momoDatas: [0,
				// {...baseAttr, tokenId: 17, prototype: 60003, tokenName: "Name_243", block: 8776006, ts: 1625141100, hash: "-"},
				{...baseAttr, tokenId: 17, prototype: 60003, tokenName: "Name_243", block: 8982661, ts: 1625760000, hash:"-"},
				{...baseAttr, tokenId: 22, prototype: 60002, tokenName: "Name_242", block: 9184261, ts: 1626364800, hash:"-"},
				{...baseAttr, tokenId: 27, prototype: 60001, tokenName: "Name_241", block: 9385861, ts: 1626969600, hash:"-"},
			],
			rankListObj: {
				list: [],
				total_page: 0,
			},
			nowPage: 1,
			myAddr: "",
			loading: false,
			getNowBlock: "-",
			luckerArr: [],
			myLotteryData: {
				total_vemobox: 0,
				lottery_ticket: 0,
			}
		})
	},
	async created(){
		await this.getlotteryLucker();
		await this.getLotteryRank();
		await this.getMyLotteryData();
		await this.setNowBlockNumber();
		await this.setBlockHash();
		if(t) clearInterval(t);
		t = setInterval(async ()=>{
			this.setNowBlockNumber();
		}, 3000);
	},
	beforeDestroy(){
		if(t) clearInterval(t);
	},
	computed:{
		...mapState({
			nowTs: (state) => state.globalState.data.nowTs,
		}),
		getNowRound(){
			let returnRound = 3;
			if(this.momoDatas[3].ts > this.nowTs) returnRound = 3;
			if(this.momoDatas[2].ts > this.nowTs) returnRound = 2;
			if(this.momoDatas[1].ts > this.nowTs) returnRound = 1;
			return returnRound;
		}
	},
	methods:{
		async setBlockHash(){
			if(this.getNowRound > 1){
				console.log("setBlockHash");
				let  res =  await Wallet.ETH.getBlockInfo(this.momoDatas[this.getNowRound-this.isShowPastRound-1].block);
				if(res){
					console.log("setBlockHash", res);
					this.momoDatas[this.getNowRound-this.isShowPastRound-1].hash = res.hash;
				}
			}
		},
		async setNowBlockNumber(){
			let  res =  await Wallet.ETH.getBlockNumber();
			console.log("setNowBlockNumber", res);
			this.getNowBlock = res;
		},
		async getlotteryLucker(){
			let res = await Http.getlotteryLucker();
			console.log("getlotteryLucker",res);
			if(res){
				this.luckerArr = res.list;
			}
		},
		async getLotteryRank(){
			let obj = {
				is_past: this.isShowPastRound,
				page: this.nowPage
			}
			this.rankListObj.list = [];
			this.loading = true;
			let data = await Http.getLotteryRank(obj);
			this.loading = false;
			console.log("getLotteryRank", data);
			if(data){
				this.rankListObj = data;
			}
		},
		async getMyLotteryData(){
			console.log("getMyLotteryData");
			this.myAddr = await Wallet.ETH.getAccount();
			this.myAddr = "0x212e0955DdA4B206adBE9D49E7C4c599C1d80F4A";
			let data = await Http.getMyLotteryRank(this.myAddr);
			if(data){
				this.myLotteryData = { ...this.myLotteryData, ...data};
				console.log("getMyLotteryData", this.myLotteryData);
			}
		},
		onPageChange(page){
			if(page == this.nowPage) return;
			this.nowPage = page;
			this.getLotteryRank();
		}
	}
}
</script>

<style scoped>
	.adv-panel:before{
		background: linear-gradient(145deg,#ac2f2d 0%, #000  100%);
	}
	@media (max-width: 768px) {
		#round-info .aveage-box {
			display: block;
		}
		#round-info .ly-input {
			width: 100%;
		}
	}
</style>
