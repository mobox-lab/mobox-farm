<template>
	<div class="tac center-box">
		<div class="por clear mgt-10">
			<section class="col-md-7" style="padding:10px">
				<div class="adv-panel">
					<h1 class="vertical-children">
						<span>传说MOMO竞拍{{getNowRound}}</span>
						<img class="mgl-10 cur-point" @click="oprDialog('gem-rule-dialog','block')" src="@/assets/icon/help.png" alt="" height="30">
					</h1>
					<div class="tac mgt-10">
						<template >
							<p v-if="Number(bidInfo.bidEndTime - nowTs) >0">{{$t("Gemstone_21")}}: {{getLeftTime(bidInfo.bidEndTime - nowTs)}}</p>
							<p v-else>{{$t("Gemstone_22")}}<span class="dotting"></span></p>
						</template>

						<div>
							<PetItem v-bind:data="{ item: momoDatas[getNowRound] }" />
						</div>
						<router-link to="/mypet/2">
							<p class="cur-point small mgt-10">查看升级预览 >> </p>
						</router-link>
					</div>
				</div>
			</section>
			<section class="col-md-5" style="padding:10px">
				<div class="panel por" style="height:400px;padding:30px">
					<div class="aveage-box tal" style="border-bottom: 1px solid #162340;padding-bottom:20px">
						<div>
							<p class="small opa-6">当前竞拍人</p>
							<h4 v-if="bidInfo.currBidder == '-' " >
								<Loading />
							</h4>
							<h4 v-else>{{shorAddress(bidInfo.currBidder)}}</h4>
						</div>
						<div >
							<p class="small opa-6">竞拍价</p>
							<h4 v-if="bidInfo.currBidder == '-' " >
								<Loading />
							</h4>
							<h4 class="vertical-children" v-else>
								<img src="@/assets/coin/MBOX.png" alt="" height="20">
								<span class="mgl-5">{{bidInfo.currPrice}} MBOX</span>
							</h4>
						</div>
						<div class="tac">
							<StatuButton :btnType="'btn-success'" v-if="bidInfo.toClaimTokenId != '-' && Number(bidInfo.toClaimTokenId) > 0 " :isDisable="bidInfo.currPrice =='-' " :isLoading="lockBtn.bidLock > 0" :onClick="takeMOMO">领取MOMO</StatuButton>
							<StatuButton v-else  :isDisable="bidInfo.currPrice =='-' " :onClick="()=>{oprDialog('bid-momo-dialog', 'block')}" >我要竞拍</StatuButton>
						</div>
					</div>
					<div class="mgt-30 tal">
						<h4>中奖纪录</h4>
						<table class="small  new-table" border="0" frame="void" rules="none" >
							<tr class="small opa-6">
								<td>时间</td>
								<td>MOMO</td>
								<td>中奖者</td>
								<td>中奖率</td>
								<td class="tar">TX</td>
							</tr>
							<!-- <tr>
								<td colspan="5" class="tac">等待开奖</td>
							</tr> -->
							<tr v-for="item in 3" :key="item">
								<td>
									<p>2021.06.23</p>
									<p>14:25:63</p>
								</td>
								<td>momo</td>
								<td>0xe8...be13</td>
								<td>50%</td>
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

			<div class="col-md-12" style="padding:10px">
				<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:20px">
					<table class="small  new-table" border="0" frame="void" rules="none" >
						<tr>
							<th width="30%" class="tal">{{ $t("BOX_12") }}</th>
							<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
							<th width="10%">{{ $t("BOX_13") }}</th>
							<th width="20%">{{ $t("BOX_27") }}</th>
							<th width="40%" class="tar">TX</th>
						</tr>
						<tr v-for="item in rankList" :key="item.tx">
							<td class="tal tac-xs">{{ getTimeFtt(item.crtime) }}</td>
							<td class="tal">{{ $t(eventToLang[item.event]) }}</td>
							<td>x{{ item.amount }}</td>
							<td class="vertical-children">
								<span v-if="item.state != 1 && item.state != -1">
									<Loading />
								</span>
								<span v-if="item.state == 1">{{ $t("Common_09") }}</span>
								<span v-if="item.state == -1">
									<svg  viewBox="0 0 1024 1024"  width="13" height="13"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF5B5C" p-id="3023"></path><path d="M328.988444 292.750222a17.066667 17.066667 0 0 1 24.120889 0L512 451.697778l158.890667-158.890667a17.066667 17.066667 0 0 1 24.120889 0l36.238222 36.238222a17.066667 17.066667 0 0 1 0 24.120889L572.302222 512l158.947556 158.833778a17.066667 17.066667 0 0 1 0 24.120889l-36.238222 36.238222a17.066667 17.066667 0 0 1-24.120889 0L512 572.302222l-158.833778 158.890667a17.066667 17.066667 0 0 1-24.120889 0l-36.238222-36.238222a17.066667 17.066667 0 0 1 0-24.120889L451.697778 512 292.750222 353.109333a17.066667 17.066667 0 0 1 0-24.120889l36.238222-36.238222z" fill="#FFFFFF"></path></svg>
									&nbsp;
									Fail
								</span>
							</td>
							<td class="tar">
								<img v-if="item.event == 'MintBox' && item.state == 1" @click="showHistoryDialog(item)" height="25" src="@/assets/icon/view.png" alt="" class="cur-point" />&nbsp;
								<a :href="getTxUrl(item.tx)" target="_blank">
									<img src="@/assets/icon/viewTx.png" alt="" class="cur-point" height="25" />
								</a>
							</td>
						</tr>
					</table>
				</section>
			</div>

		</div>
		<Dialog id="bid-momo-dialog" :top="100" :width="400">
			<div class="tal mgt-10">
				<div class="tab-menu active" >竞拍</div>
			</div>
			<div class="tab-body">
				<div class="tab-content">
					<div class="aveage-box">
						<p class="tal small opa-6">输入竞拍价格({{ '≥' + getNowNeedPrice}})</p>
					</div>
					<div class="mgt-10 por">
						<div class="ly-input-pre-icon" style="zoom: 0.75">
							<img src="@/assets/coin/MBOX.png" height="40" alt="" />
						</div>
						<input type="text" class="ly-input tac" style="width:100%;padding: 0px 50px" v-model="inputValue" v-number :placeholder="  '≥' + getNowNeedPrice " >
					</div>
					<div class="aveage-box mgt-10">
						<p class="tal small">{{$t("Air-drop_11")}}</p>
						<div class="tar small">
							<p>{{coinArr['MBOX'].balance}} MBOX</p>
						</div>
					</div>
					
					<div :class="coinArr['MBOX'].allowanceToBid == 0 ?'btn-group':''"  style="width:280px;margin:10px auto">
						<StatuButton  data-step="1" v-if="coinArr['MBOX'].allowanceToBid == 0" class="mgt-10" style="width:80%" :onClick="approve" :isLoading="coinArr['MBOX'].isApproving">{{$t("Air-drop_16")}} MBOX</StatuButton>
						<StatuButton  data-step="2" :isDisable="!(coinArr['MBOX'].allowanceToBid > 0) || Number(inputValue) < getNowNeedPrice || Number(inputValue) > coinArr['MBOX'].balance" class="mgt-10" style="width:80%" :onClick="goBid" :isLoading="lockBtn.bidLock > 0">
							竞拍
						</StatuButton>
					</div>

				</div>
			</div>
		</Dialog>
	</div>
</template>

<script>
import { PetItem, Dialog, StatuButton, Loading } from '@/components';
import CommonMethod from '@/mixin/CommonMethod';
import { Wallet, Common } from '@/utils';
import { mapState } from 'vuex';
import { WalletConfig, PancakeConfig } from '@/config';

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
}

export default {
	components: {PetItem, Dialog, StatuButton, Loading},
	mixins: [CommonMethod],
	data(){
		return({
			getCountDown: 5000,
			inputValue: "",
			momoDatas: [0,
				{...baseAttr, tokenId: 17, prototype: 60003, tokenName: "Name_243", block: 8982661, ts: 1625760000},
				{...baseAttr, tokenId: 22, prototype: 60002, tokenName: "Name_242", block: 9184261, ts: 1626364800},
				{...baseAttr, tokenId: 27, prototype: 60001, tokenName: "Name_241", block: 9385861, ts: 1626969600},
			],
			rankList: [],
			bidInfo: {
				state: "-",
				bidTs: "-",
				tokenId: "-",
				currPrice: "-",
				currBidder: "-",
				bidEndTime: 0,
				bidStartTime: "-",
				toClaimTokenId: "-",
			}
		})
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn,
			nowTs: (state) => state.globalState.data.nowTs,
		}),
		getNowNeedPrice(){
			let price = 1000 * 1.2;
			if(Number(this.bidInfo.currPrice) * 1.2 > price){
				price = this.numFloor(Number(this.bidInfo.currPrice) * 1.2);
			}
			return price;
		},
		getNowRound(){
			let returnRound = 3;
			if(this.momoDatas[3].ts > this.nowTs) returnRound = 3;
			if(this.momoDatas[2].ts > this.nowTs) returnRound = 2;
			if(this.momoDatas[1].ts > this.nowTs) returnRound = 1;
			return returnRound;
		}
	},
	async created(){
		this.getBidInfo();
		await Wallet.ETH.getAccount();
		//查询授权情况
		await this.viewAllowance();
	},
	methods: {
		async viewAllowance(){
			let coinKey = "MBOX";
			if(this.coinArr[coinKey].allowanceToRent > 0) return;

			let allowanceToBid = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinKey].addr, WalletConfig.ETH.momoBid, false);
			if(allowanceToBid){
				this.coinArr[coinKey].allowanceToBid = Number(allowanceToBid);
				this.coinArr.ts = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		//授权
		async approve(){
			let coinKey = "MBOX";
			let {allowanceToBid, isApproving} = this.coinArr[coinKey];
			if(allowanceToBid > 0 || isApproving) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin[coinKey].addr,
			WalletConfig.ETH.momoBid, {coinKey, type: "allowanceToBid"});
			if (hash) {
				this.coinArr[coinKey].isApproving = true;
			}
		},
		async getBidInfo(){
			let address = await Wallet.ETH.getAccount();
			let res = await Wallet.ETH.getBidInfo(address);
			console.log("getBidInfo", res);
			if(res){
				res.currPrice = this.numFloor(res.currPrice/1e18, 2);
				this.bidInfo = res;
			}
		},
		//竞拍momo
		async goBid(){
			let obj = {
				amount: Number(this.inputValue),
				tokenId: this.bidInfo.tokenId
			}
			let hash = await Wallet.ETH.bidMomo(obj, ()=>{
				this.getBidInfo();
			});
			if(hash){
				this.inputValue = "";
				Common.app.lockBtnMethod("bidLock");
			}
		},
		//领取momo
		async takeMOMO(){
			let hash = await Wallet.ETH.withdraw721(()=>{
				this.getBidInfo();
			});
			if(hash){
				Common.app.lockBtnMethod("bidLock");
			}
		}
	}
}
</script>

<style scoped>
	.adv-panel:before{
		background: linear-gradient(145deg,#ac2f2d 0%, #000  100%);
	}
</style>
