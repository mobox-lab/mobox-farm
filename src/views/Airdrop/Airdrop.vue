<template>
	<div id="aridorp" class="tac">
		<section class="mgt-30">
			<div class="menu-btn active">
				<img src="../../assets/icon/bnb.png" alt="" height="50" />
			</div>
		</section>
		<section id="airdrop-cont" class="">
			<div class="mgt-10 aveage-box" id="airdrop-cont-info">
				<div class="dib" style="padding:0px 10px">
					<h3 class="opa-6 mgt-10 ">{{ $t("Air-drop_02") }}</h3>
					<h3 class="mgt-10">${{(getTotalSupplyUSDT* 199999999).toLocaleString() }}</h3>
				</div>
				<div class="dib" style="padding:0px 10px">
					<h3 class="opa-6 mgt-10 ">{{ $t("Air-drop_21") }}</h3>
					<h3 class="mgt-10">{{totalAirdropKey}}0 KEY</h3>
				</div>
				<div class="dib" style="padding:0px 10px">
					<h3 class="opa-6 mgt-10">{{ $t("Air-drop_05") }}</h3>
					<div class="mgt-10">
						<button class="btn-success btn-small por"   @click="$refs.keyopr.show()">
							{{getTotalKey}} KEY
						</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 col-xs-12 col-sm-6" v-for="item in getPledgeList" :key="item.coinName" >
					<div class="airdrop-item tal">
						<div class="vertical-children" style="padding-left: 56px" >
							<div class="dib airdorp-item-coin-icon tac " :class="item.isLP?'double-img':'' ">
								<img v-for="(name, key) in item.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="50" alt="" />
							</div>
							<div style="margin-left: 15px">
								<h3 class="color-w tal">{{ item.coinName }} {{item.isLP?"LP":"POOL"}}</h3>
								<p class="vertical-children mgt-10 por">
									<span class="small opa-6">{{ $t("Air-drop_02") }}:</span>
									<span class="suffix">${{ numFloor(item.totalSupply, 100).toLocaleString() }}</span>
								</p>
								<p class="small tal" style="color: #8cfece">APY: {{ item.apy }}</p>
							</div>
						</div>
						<div class="tal mgt-50">
							<p class="por mgt-10">
								<span class="opa-6 small">{{ $t("Air-drop_03") }}</span>
								<span class="suffix">{{ item.wantAmount }} {{ item.coinName }}</span>
							</p>
						</div>

						<div class="tal mgt-20 hide">
							<p class="por mgt-10">
								<span class="opa-6 small">{{ $t("Air-drop_05") }}</span>
								<span class="suffix">
									<button class="btn-success btn-small por"  :class="lockBtn.getKeyLock > 0 ||  item.earnedKey == 0?'disable-btn':''" @click="$refs.keyopr.setCheckCoin(item.coinName).show()">
										<img v-if="lockBtn.getKeyLock > 0" src="../../assets/icon/loading.png" class="rotate" height="10" alt="" style="position:absolute;left:8px;top:10px" />
										{{ item.earnedKey }} KEY
									</button>
								</span>
							</p>
						</div>

						<div class="tac mgt-50"> 
							<button class="btn-primary" style="width: 45%"  @click="$refs.pancake.setOprData(item).show()" >
								{{ $t("Air-drop_07") }}
							</button> &nbsp;
							<StatuButton style="width: 45%; " :onClick="showWithdraw.bind(this, item)" :isLoading="item.isWithdrawing" :isDisable="item.isWithdrawing || Number(item.wantAmount) <= 0">
								{{ $t("Air-drop_08") }}
							</StatuButton>
						</div>

					</div>
					
				</div>
			</div>
		</section>

		<Pancake ref="pancake" />
		<KeyOpr ref="keyopr" />
		<Withdraw ref="withdraw" />
	</div>
</template>
<script>
import CommonMethod from "@/mixin/CommonMethod";
import {  Http } from '@/utils';
import { mapState } from "vuex";
import { PancakeConfig } from "@/config";
import Pancake from "./Pancake";
import KeyOpr from "./KeyOpr";
import Withdraw from './Withdraw'
import {StatuButton} from "@/components";

export default {
	mixins: [CommonMethod],
	components: { Pancake, KeyOpr, Withdraw, StatuButton},
	computed: {
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			coinArr: (state) => state.bnbState.data.coinArr,
			totalAirdropKey: (state) => state.bnbState.data.totalAirdropKey,
			rewardStoreKey: (state) => state.bnbState.data.rewardStoreKey,
		}),
		//获取总质押USDT
		getTotalSupplyUSDT() {
			let num = 0;
			Object.keys(PancakeConfig.StakeLP).map(coinName=>{
				num += Number(this.coinArr[coinName].totalSupply);
			});
			return this.numFloor(num, 100);
		},

		getPledgeList(){
			let arr = [];
			let stakeLP = PancakeConfig.StakeLP;
			for (let key in stakeLP) {
				arr.push({coinName: key, ...stakeLP[key], ...this.coinArr[key]})
			}
			return arr;
		},

		getTotalKey(){
			let allKey = 0;
			this.getPledgeList.map(item=>{
				allKey += item.earnedKey;
			});
			allKey += this.rewardStoreKey;
			return this.numFloor(allKey, 1e4);
		},
	},
	async created(){
		this.getTotalStakeUSDTAndAirdropKEY();
	},

	methods: {
		async  getTotalStakeUSDTAndAirdropKEY(){
			let res = await Http.getKeyDrop();
			if(res){
				let {strategyAmounts, keyAmount} = res.data;
				Object.keys(PancakeConfig.StakeLP).map(coinName=>{
					this.coinArr[coinName].totalSupply = strategyAmounts[coinName] || 0;
				});
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr, totalAirdropKey: keyAmount});
			}
		},
		showWithdraw(item){
			this.$refs.withdraw.setOprData(item).show();
		}
	},
};
</script>

<style scoped>
.airdorp-item-coin-icon {
	position: absolute;
	left: 20px;
}

.airdrop-item-icon {
	position: absolute;
	top: -70px;
	text-align: center;
	width: 100%;
	left: 0px;
}

.airdrop-item {
	background: #2a3b67;
	border-radius: 20px;
	padding: 20px;
	position: relative;
	margin: 20px 10px;
}
#airdrop-cont {
	padding: 20px 30px;
	padding-top: 0px;
	width: 80%;
	background: #1d2b50;
	border-radius: 20px;
	display: inline-block;
	margin-top: -20px;
}
#aridorp .menu-btn {
	user-select: none;
	width: 180px;
	display: inline-block;
	border-top-left-radius: 220px;
	border-top-right-radius:220px;
	border-bottom: none;
	padding: 20px;
	cursor: pointer;
	margin: 10px;
}
#aridorp .menu-btn.active {
	border-bottom: none;
	box-shadow: none;
	background: #1d2b50;
}
@media (max-width: 768px) {
	#airdrop-cont {
		width: 100%;
		padding: 10px !important;
		border-radius: 10px !important;
	}
}
@media (max-width: 1500px) {
	#airdrop-cont {
		width: 100%;
	}
}
</style>
