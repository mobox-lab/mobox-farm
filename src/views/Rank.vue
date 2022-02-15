<template>
	<div class="rank tac" style="padding:10px">
		<div class="tal">
			<router-link to="/">
				<span  class="cur-point text-big">
					<span class="dib" style="transform: rotate(90deg)">▼</span>&nbsp;{{ $t("MOMO_19") }}
				</span>
			</router-link>
		</div>
		<div class="mgt-10">
			<Tab :list="tab" :defaultSelectPos="tab_pos" :onChange="onTabChange" :notice="[]"/>
		</div>
		<section v-if="tab_pos == 0" class="mgt-20" style="padding:10px 15px;background:#13181F;border-radius:20px">
			<table style="width: 100%" class="new-table">
				<tr class="opa-6">
					<th class="tal "> {{ $t("Rank_05") }}</th>
					<th class="tar "> {{ $t("Rank_06") }}</th>
				</tr>
				<tr v-for="item in hashrateRankList.list.slice( 10 * (rewardPage - 1), 10 * rewardPage )" :key="item.rank" >
					<td class="tal">
						<span class="dib tac rank-icon" :class="{active: item.rank <= 3}">{{ item.rank }}</span >
						<span style="margin-left: 20px">
							{{ shorAddress(item.member) }}
						</span>
					</td>
					<td class="tar vertical-children">
						<span  class="dib tal" >{{ item.score }}</span>&nbsp;
						<img src="../assets/icon/hash_icon.png" alt="" height="30" />
					</td>
				</tr>
				<tr v-if="hashrateRankList.list.length > 10">
					<td colspan="2" style="border:none">
						<Page :defaultPage="1" :totalPage="Math.ceil(hashrateRankList.list.length / 10)" :onChange="onPageChange" />
					</td>
				</tr>
				<tbody class="my-rank">
					<tr >
						<td class="tal" style="border-top-left-radius:20px;border-bottom-left-radius:20px">
							<span class="dib tac rank-icon" :class="{active: hashrateRankList.self.rank <= 3}">{{ hashrateRankList.self.rank || "-" }}</span >
							<span style="margin-left: 20px"> {{ shorAddress(hashrateRankList.self.address) }} </span>
						</td>
						<td class="tar vertical-children" style="border-top-right-radius:20px;border-bottom-right-radius:20px">
							<span  class="dib tal" >
								{{ hashrateRankList.self.score || "-" }}
							</span>&nbsp;
							<img src="../assets/icon/hash_icon.png" alt="" height="30" />
						</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section v-if="tab_pos == 1" class="mgt-20" style="padding:10px 15px;background:#13181F;border-radius:20px">
			<table style="width: 100%" class="new-table">
				<tr class="opa-6">
					<th class="tal "> {{ $t("Rank_05") }}</th>
					<th class="tal tac-xs"> </th>
					<th class="tac "> </th>
					<th class="tar "> {{ $t("Rank_08") }}</th>
				</tr>
				<tr v-for="item in momoRankList.list.slice( 10 * (rewardPage - 1), 10 * rewardPage )" :key="item.rank">
					<td class="tal">
						<span class="dib tac rank-icon" :class="{active: item.rank <= 3}">{{ item.rank }}</span >
						<span style="margin-left: 20px">
							{{ shorAddress(item.owner) }}
						</span>
					</td>
					<td class="tal vertical-children tac-xs">
						<img :src=" require(`../assets/pet/${item.prototype}.png`) " alt="" height="35" class="rank-pet" />&nbsp;
						<div class="dib rank-pet-name">
							<img :src=" require(`../assets/icon/${ category_img[ nftCfg[item.prototype][ 'category' ] ] }.png`) " alt="" height="16" />&nbsp;
							<span class="dib tal">
								{{ item.tokenName.indexOf( "Name_" ) != -1 ? $t(item.tokenName) : shortStr(item.tokenName) }}
							</span>
						</div>
					</td>
					<td class="tac vertical-children">
						<img :src="require(`../assets/icon/bnb.png`)" alt="" height="20" />&nbsp;
						<span class="dib tal"> LV.{{ item.level }} </span>
					</td>
					<td class="tar vertical-children">
						<span  class="dib tal" >
							{{item.lvHashrate}}
						</span>&nbsp;
						<img src="../assets/icon/hash_icon.png" alt="" height="30" />
					</td>
				</tr>
				<tr v-if="momoRankList.list.length > 1">
					<td colspan="4" style="border:none">
						<div class="mgt-10"></div>
						<Page :defaultPage="1" :totalPage="Math.ceil(momoRankList.list.length / 10)" :onChange="onPageChange"/>
					</td>
				</tr>
			</table>
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
		this.tab_pos = this.$route.query.tab || 0;

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

		window.startCount = ()=>{
			this.getV5Count(this.hashrateRankList.list)
		}
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
		async getV5Count(list){
			let count = 0;
			let t = 0;
			let lock = false;
			let arr = [];
			setInterval(async ()=>{
				if(lock || t > list.length) return;
				let addr = list[t].member;
				lock = true;
				let res = await Wallet.ETH.getAll721ByAddr(addr);
				let addrAccount = 0;
				res.map(item=>{
					if(Number(item.prototype) > 50000){
						addrAccount++
					}
				});
				count+= addrAccount;
				console.log(t,addr,'=>', addrAccount, count);
				arr.push([{r: t, a:addr, n: addrAccount}]);
				if(t == list.length){
					window.localStorage.v6Arr = JSON.stringify(arr);
					console.log("total=>",count);
				}
				lock = false;
				t++;
			}, 500);

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
