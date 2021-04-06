<template>
	<div class="rank tac">
		<!-- <h3>{{ $t("Rank_01") }} {{ getLeftTime(countdown) }}</h3> -->
		<div class="mgt-20">
			<Tab :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" :notice="[]"/>
		</div>
		<section v-if="tab_pos == 0">
			<div class="mgt-20">
				<table style="width: 100%">
					<tr>
						<td class="tal " style="padding-left: 30px">{{ $t("Rank_05") }}</td>
						<td class="tar ">
							<span style="margin-right:20px;" class="dib tal" > {{ $t("Rank_06") }} </span>
						</td>
					</tr>
				</table>
				<hr class="split-hr mgt-10" />
				<div :class="`rank-item vertical-children ${item.rank == hashrateRankList.self.rank ? 'active' : '' }`" 
				v-for="item in hashrateRankList.list.slice( 10 * (rewardPage - 1), 10 * rewardPage )" :key="item.rank" >
					<div class="tal dib" style="width:50%">
						<span v-if="item.rank > 3" class="dib tac" style="width: 44px" >{{ item.rank }}</span >
						<img v-if="item.rank <= 3" :src="require(`../assets/rank${item.rank}.png`)" alt="" height="18" />
						<span style="margin-left: 20px">
							{{ shorAddress(item.member) }}
						</span>
					</div>

					<div  class="tar dib vertical-children hashrate-table" style="width: 50%;" >
						<img src="../assets/icon/airdrop.png" alt="" height="30" />&nbsp;
						<span  class="dib tal color-hashrate" >
							{{ item.score }}	
						</span>
					</div>
					
					<!-- <div class="tar dib vertical-children" style="width: 33.3%" >
						<table style="width: 100%" class="tar">
							<tr>
								<td> 
									<span> {{ rewardCfg[item.rank]["mbox"] }}</span >&nbsp; 
									<img src="../assets/coin/MBOX.png" alt="" height="30" /> 
								</td>
								<td style="width: 30%"> 
									<span>{{ rewardCfg[item.rank]["usdt"] }}</span >&nbsp;
									<img src="../assets/coin/USDT.png" alt="" height="30" />
								</td>
							</tr>
						</table>
					</div> -->
				</div>
			</div>
			<hr class="split-hr" />
			<div style="margin-top: 20px" v-if="hashrateRankList.list.length > 10" :key="1">
				<Page :defaultPage="1" :totalPage="Math.ceil(hashrateRankList.list.length / 10)" :onChange="onPageChange" />
			</div>
			<div class="mgt-20">
				<div class="rank-item vertical-children active">
					<div class="tal dib" style="width: 50%">
						<span v-if=" hashrateRankList.self.rank > 3 || hashrateRankList.self.rank <= 0 " class="dib tac" style="width: 44px" >
							{{ hashrateRankList.self.rank || "-" }}
							</span>
						<img v-if=" hashrateRankList.self.rank <= 3 && hashrateRankList.self.rank > 0 " :src=" require(`../assets/rank${hashrateRankList.self.rank}.png`)" alt="" height="18" />
						<span style="margin-left: 20px"> {{ shorAddress(hashrateRankList.self.address) }} </span>
					</div>

					<div class="tar dib color-hashrate" style="width: 50%">
						<img src="../assets/icon/airdrop.png" alt="" height="30" />&nbsp;
						<span class="dib tal color-hashrate" >
							{{ hashrateRankList.self.score || "-" }}
						</span>
					</div>
					
				</div>
			</div>
		</section>
		<section v-if="tab_pos == 1">
			<div class="mgt-20">
				<table style="width: 100%">
					<tr>
						<td class="tal tac-xs"  style="padding-left:30px; width: 40%">
							{{ $t("Rank_05") }}
						</td>
						<td class="tar " style="width: 60%">
							<span style="min-width: 80px;margin-right:20px"  class="dib tal">
								{{ $t("Rank_08") }}
							</span>
						</td>
					</tr>
				</table>
				<hr class="split-hr mgt-10" />
				<div :class="`rank-item tac-xs vertical-children ${ myAddr.toLocaleUpperCase() == item.owner.toLocaleUpperCase() ? 'active' : '' }`"
					v-for="item in momoRankList.list.slice( 10 * (rewardPage - 1), 10 * rewardPage )"
					:key="item.rank" >
					<div class="tal dib tac-xs" style="width: 30%">
						<span v-if="item.rank > 3" class="dib tac" style="width: 44px" >{{ item.rank }}</span>
						<img v-if="item.rank <= 3" :src="require(`../assets/rank${item.rank}.png`)" alt="" />
						<span style="margin-left: 20px"> {{ shorAddress(item.owner) }} </span>
					</div>

					<div class="tal dib vertical-children tal" style="width: 70%" >
						<table style="width: 100%; table-layout: fixed">
							<tr>
								<td class="por tac-xs">
									<img :src=" require(`../assets/pet/${item.prototype}.png`) " alt="" height="35" class="rank-pet" />&nbsp;
									<div class="dib rank-pet-name">
										<img :src=" require(`../assets/icon/${ category_img[ nftCfg[item.prototype][ 'category' ] ] }.png`) " alt="" height="16" />&nbsp;
										<span class="dib tal">
											{{ item.tokenName.indexOf( "Name_" ) != -1 ? $t(item.tokenName) : shortStr(item.tokenName) }}
										</span>
									</div>
								</td>
								<td class="tac">
									<img :src="require(`../assets/icon/eth.png`)" alt="" height="20" />&nbsp;
									<span class="dib tal"> LV.{{ item.level }} </span>
								</td>
								<td class="tar">
									<img :src=" require(`../assets/icon/airdrop.png`) " alt="" height="30" />&nbsp;
									<span class="dib tal color-hashrate"> {{ item.lvHashrate }} </span>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<hr class="split-hr" />
			<div style="margin-top: 20px" v-if="momoRankList.list.length > 10" :key="3">
				<Page :defaultPage="1" :totalPage="Math.ceil(momoRankList.list.length / 10)" :onChange="onPageChange"/>
			</div>
		</section>
	</div>
</template>
<script>
import { Page, Tab } from "@/components";
import { Http, Wallet } from "@/utils";
import { CommonMethod } from "@/mixin";
import { BaseConfig } from "@/config";

let timer = null;
export default {
	mixins: [CommonMethod],
	data() {
		return {
			tab: [this.$t("Rank_02"), this.$t("Rank_04")],
			tab_pos: 0,
			hashrateRankList: {
				list: [],
				self: { rank: 0, score: 0 },
			},
			mboxRankList: { list: [], self: { rank: 0, score: 0 } },
			momoRankList: {
				list: [],
			},
			rewardCfg: BaseConfig.RewardCfg,
			nftCfg: BaseConfig.NftCfg,
			rewardPage: 1,
			myAddr: "",
			countdown: 1615176000 - parseInt(new Date().valueOf() / 1000),
		};
	},
	components: { Page, Tab },
	async created() {
		let myAddr = await Wallet.ETH.getAccount();
		this.getRankList(myAddr || "");
		if (myAddr == undefined) {
			myAddr = await Wallet.ETH.getAccount();
			this.getRankList(myAddr || "");
		}
		this.myAddr = myAddr;

		if (timer) clearInterval(timer);
		timer = setInterval(() => {
			if (this.countdown <= 0) {
				clearInterval(timer);
				return;
			}
			this.countdown--;
		}, 1000);
	},
	destroyed() {
		if (timer) clearInterval(timer);
	},
	methods: {
		async getRankList(myAddr) {
			let hashrateRankList = await Http.getHashrateRankList(myAddr);
			hashrateRankList.self.address = myAddr;
			this.hashrateRankList = hashrateRankList;

			let mboxRankList = await Http.getMboxRankList(myAddr);
			mboxRankList.self.address = myAddr;
			this.mboxRankList = mboxRankList;

			let momoRankList = await Http.getMomoRankList();
			let needGetNameArr = [];
			momoRankList.list.map((item) => {
				item.tokenName = this.nftCfg[item.prototype]["tokenName"];
				needGetNameArr.push(item.tokenId);
			});
			this.momoRankList = momoRankList;

			//请求name
			let names = await Wallet.ETH.getMomoNamesByTokenIds(needGetNameArr);
			momoRankList.list.map((item, index) => {
				if (names[index] != "") {
					item.tokenName = names[index];
				}
			});
			this.momoRankList = momoRankList;
		},
		onTabChange(pos) {
			this.rewardPage = 1;
			this.tab_pos = pos;
		},
		onPageChange(page) {
			this.rewardPage = page;
		},
	},
};
</script>
<style  scoped>
.rank-pet { 
	top: -10px; 
	left: 0px;
}
.color-hashrate { 
	color: #f0de7d;
}

.rank-item.active { 
	background: #2a3b67;
}
.rank-item {
	background: #1d2b50;
	border-radius: 30px;
	margin: 10px 0px;
	padding: 8px 30px;
	width: 100%;
	color: #7288c0;
	font-size: 13px;
}
.rank {
	max-width: 1500px;
	margin: 0px auto;
}

@media (max-width: 768px) {
	.hashrate-table {
		padding-left: 0px !important;
	}
	.hashrate-table span {
		text-align: center !important;
	}
	.yf-tab {
		zoom: 0.7;
	}
	table {
		zoom: 0.7;
	}
	table td {
		width: auto !important;
		table-layout: fixed;
	}

	.rank-pet-name {
		display: block;
	}

	.rank-pet { 
		height: 50px;
	}
}
</style>
