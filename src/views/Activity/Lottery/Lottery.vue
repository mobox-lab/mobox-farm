<template>
	<div class="tac center-box ">
		<div class="por clear mgt-10">
			<section class="col-md-7" style="padding:10px">
				<div class="adv-panel">
					<h1 class="vertical-children">
						<span>{{$t("Auction_02")}}</span>
						<img class="mgl-10 cur-point" @click="oprDialog('lottery-rule-dialog','block')" src="@/assets/icon/help.png" alt="" height="30">
					</h1>
					<div class="tac mgt-10">
						<p class="vertical-children">
							<span>{{$t("Auction_16")}}: </span>
							<Loading v-if="getNowBlock == '-' " />
							<span v-else>{{getNowBlock}}</span>
						</p>

						<template v-if="getNowBlock != '-' ">
							<p class="small opa-6" v-if="momoDatas[getNowRound - isShowPastRound].block > Number(getNowBlock)">{{$t("Auction_04")}}: {{getLeftTime(momoDatas[getNowRound - isShowPastRound].ts - nowTs)}}</p>
							<p v-else>{{$t("Auction_24")}}</p>
						</template>

						<div class="mgt-10" v-if="getNowBlock != '-'">
							<PetItem v-bind:data="{ item: momoDatas[getNowRound- isShowPastRound] }" />
						</div>
						<div v-else style="height:250px">
							<Loading style="margin-top:100px" />
						</div>
						<p class=" small mgt-10" style="margin-bottom:10px">
							<router-link to="/mypet/2">
								<span class="cur-point">{{$t("Auction_05")}} >></span>
							</router-link>
						</p>
					</div>
				</div>
			</section>
			<section class="col-md-5" style="padding:10px">
				<div class="panel por" style="height:440px;padding:20px">
					
					<div class="aveage-box tac" style="border-bottom: 1px solid #162340;padding-bottom:10px">
						<div class="por">
							<p class="small opa-6">{{$t("Air-drop_152")}}</p>
							<h4 class="notice-color">{{myLotteryData.total_vemobox}}</h4>
						</div>
						<div style="flex:0.5">
							<p class="small opa-6">{{$t("Auction_20")}}</p>
							<h4 class="notice-color">{{myLotteryData.lottery_ticket}}</h4>
						</div>
						<div >
							<p class="small opa-6">{{$t("Auction_21")}}</p>
							<div v-if="myLotteryData.ticket_number_start == '-' "><Loading /></div>
							<template v-else>
								<h4  class="notice-color" v-if="momoDatas[getNowRound - isShowPastRound].ts - 3600 - nowTs > 0">-</h4>
								<template v-else>
									<h4 class="notice-color" v-if="myLotteryData.lottery_ticket < 1">-</h4>
									<h4 v-else class="notice-color">{{myLotteryData.ticket_number_start}}-{{myLotteryData.ticket_number_end}}</h4>
								</template>
							</template>
						</div>
						
					</div>

					<div class="tac mgt-5">
						<p class="small opa-6" >({{$t("Auction_37")}})</p>
						<router-link to="/">
							<button class="btn-primary mgt-5" style="width: 50%">{{$t("Auction_06")}}</button>
						</router-link>
					</div>
					
					<div class="mgt-10 tal">
						<h4>{{$t("Auction_07")}}</h4>
						<table class="small  new-table tac"  >
							<tr class="small opa-6">
								<td class="tal">MOMO</td>
								<td >{{$t("Air-drop_47")}}</td>
								<td>{{$t("Auction_08")}}</td>
								<td>{{$t("Auction_09")}}</td>
								<td >{{$t("Auction_11")}}</td>
								<td>{{$t("Auction_10")}}</td>
							</tr>
							<tr v-for="item in luckerArr" :key="item.issue_number">
								<td class="tal"><PetItemMin :data="momoDatas[item.issue_number]" /></td>
								<td >
									<p>{{dateFtt('yyyy-MM-dd',new Date(item.uptime*1000))}}</p>
									<p>{{dateFtt('hh:mm:ss',new Date(item.uptime*1000))}}</p>
								</td>
								<td>{{ shorAddress(item.address) }}</td>
								<td>{{item.ticket_no}}</td>
								<td >{{item.total_lottery_ticket}}</td>
								<td>
									<a style="text-decoration:underline"  :href="getBlockUrl(item.lottery_block_number)" target="_blank">
										{{item.lottery_block_number}}
									</a>
								</td>
							</tr>
							<tr v-if="luckerArr.length < 3">
								<td class="tal"><PetItemMin :data="momoDatas[getNowRound]" /></td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
							</tr>
						</table>
					</div>
				</div>
			</section>
			<div class="col-md-12 por" style="padding:10px;">
				<div class="tal mgt-10" v-if="getNowRound > 1">
					<div class="tab-menu" :class="{active: isShowPastRound == 1}" style="margin-left:20px" @click="isShowPastRound=1;getLotteryRank();getMyLotteryData(true);">{{$t("Auction_12")}}</div>
					<div class="tab-menu" :class="{active: isShowPastRound == 0}" @click="isShowPastRound=0;getLotteryRank();getMyLotteryData(true)">{{$t("Auction_13")}}</div>
				</div>
				<section id="round-info" style="padding:10px 15px;background:#13181F;border-radius:20px;">
					<div class="aveage-box">
						<div style="padding:10px">
							<p class="small opa-6 tac" >{{$t("Auction_14")}}</p>
							<input type="text" readonly class="ly-input mgt-10 tac"
							:value="momoDatas[getNowRound - isShowPastRound].ts - 3600 - nowTs > 0 ? getLeftTime(momoDatas[getNowRound - isShowPastRound].ts - 3600 - nowTs): $t('Auction_15')" />
						</div>
						<div style="padding:10px">
							<p class="small opa-6 tac" >{{$t("Auction_17")}}</p>
							<input type="text" readonly class="ly-input mgt-10 tac" :value="momoDatas[getNowRound - isShowPastRound].block" />
						</div>
						<div style="padding:10px">
							<p class="small opa-6 tac" >{{$t("Auction_18")}}</p>
							<p  class="ly-input mgt-10 tac" style="line-height:35px">
								<a style="text-decoration:underline" 
								:href="getBlockUrl(momoDatas[getNowRound - isShowPastRound].block)" target="_blank" 
								v-if="momoDatas[getNowRound - isShowPastRound].hash != '-' ">
								{{shortHash(momoDatas[getNowRound - isShowPastRound].hash)}}</a>
								<span v-else>-</span>
							</p>
						</div>
						<div style="padding:10px">
							<p class="small opa-6 tac" >{{$t("Auction_19")}}</p>
							<input type="text" readonly class="ly-input mgt-10 tac" :value="rankListObj.total_lottery_ticket" />
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
								<th >{{$t("Auction_20")}}</th>
								<th  class="tar">{{$t("Auction_21")}}</th>
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
								<td class="vertical-children tar tac-xs">
									<span v-if="momoDatas[getNowRound - isShowPastRound].ts - 3600 - nowTs > 0">-</span>
									<span v-else>{{item.ticket_number_start}}-{{item.ticket_number_end}}</span>
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

		<Dialog id="lottery-rule-dialog" :top="100" :width="400">
			<h2>{{$t("Auction_22")}}</h2>
			<p v-html="$t('Auction_23')" class="tal mgt-20" style="word-break: break-word;"></p>
		</Dialog>
		
	</div>
</template>

<script>
import { PetItem, Page, Loading, PetItemMin, Dialog } from '@/components';
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
	components: {PetItem, Page, Loading, PetItemMin, Dialog},
	mixins: [CommonMethod],
	data(){
		return({
			getCountDown: 5000,
			isShowPastRound: 0, //是否显示上一期的Round
			momoDatas: [0,
				// {...baseAttr, tokenId: 17, prototype: 60003, tokenName: "Name_243", block: 8776006, ts: 1625141100, hash: "-"},
				{...baseAttr, tokenId: 17, prototype: 60003, tokenName: "Name_243", block: 8981888, ts: 1625760000, hash:"-"},
				{...baseAttr, tokenId: 22, prototype: 60002, tokenName: "Name_242", block: 9167888, ts: 1626321600, hash:"-"},
				{...baseAttr, tokenId: 27, prototype: 60001, tokenName: "Name_241", block: 9369488, ts: 1626926400, hash:"-"},
			],
			rankListObj: {
				list: [],
				total_page: 0,
				total_lottery_ticket: "-",
			},
			nowPage: 1,
			myAddr: "",
			loading: false,
			luckerArr: [],
			myLotteryData: {
				total_vemobox: 0,
				lottery_ticket: 0,
				ticket_number_start: "-",
				ticket_number_end: 0,
			}
		})
	},
	async created(){
		await this.setNowBlockNumber();
		await this.getlotteryLucker();
		await this.getLotteryRank();
		await this.getMyLotteryData();
		await this.setBlockHash();
		if(t) clearInterval(t);
		t = setInterval(async ()=>{
			this.setNowBlockNumber();
		}, 3000);
	},
	beforeDestroy(){
		if(t) clearInterval(t);
	},
	watch: {
		nowTs:function(newTs){
			if(newTs % 20 == 0){
				this.getMyLotteryData();
				this.getLotteryRank(false);
			}
		}
	},
	computed:{
		...mapState({
			nowTs: (state) => state.globalState.data.nowTs,
			getNowBlock: (state) => state.globalState.data.getNowBlock,
		}),
		getNowRound(){
			let returnRound = 1;
			// if(this.momoDatas[3].ts > this.nowTs) returnRound = 3;
			// if(this.momoDatas[2].ts > this.nowTs) returnRound = 2;
			// if(this.momoDatas[1].ts > this.nowTs) returnRound = 1;
			let nowBlock = Number(this.getNowBlock);
			if(nowBlock < this.momoDatas[3].block) returnRound  = 3;
			if(nowBlock < this.momoDatas[2].block) returnRound  = 2;
			if(nowBlock < this.momoDatas[1].block) returnRound  = 1;
			return returnRound;
		}
	},
	methods:{
		async setBlockHash(){
			if(this.getNowRound > 1){
				let  res =  await Wallet.ETH.getBlockInfo(this.momoDatas[this.getNowRound-this.isShowPastRound-1].block);
				if(res){
					this.momoDatas[this.getNowRound-this.isShowPastRound-1].hash = res.hash;
				}
			}
		},
		async setNowBlockNumber(){
			let  res =  await Wallet.ETH.getBlockNumber();
			this.$store.commit("globalState/setData", {getNowBlock: res});
		},
		async getlotteryLucker(){
			let res = await Http.getlotteryLucker();
			if(res){
				this.luckerArr = res.list;
			}
		},
		async getLotteryRank(needClear = true){
			if(this.loading) return;
			let obj = {
				is_past: this.isShowPastRound,
				page: this.nowPage
			}
			if(needClear){
				this.rankListObj.list = [];
			}
			this.loading = true;
			let data = await Http.getLotteryRank(obj);
			this.loading = false;
			if(data){
				this.rankListObj = data;
			}
		},
		async getMyLotteryData(needClear = false){
			this.myAddr = await Wallet.ETH.getAccount();
			if(needClear){
				this.myLotteryData.ticket_number_start = "-";
			}
			// this.myAddr = "0x212e0955DdA4B206adBE9D49E7C4c599C1d80F4A";
			let data = await Http.getMyLotteryRank(this.myAddr, this.isShowPastRound);
			if(data){
				this.myLotteryData = { ...this.myLotteryData, ...data};
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
		.pet_item{
			width: 350px !important;
		}
	}
</style>
