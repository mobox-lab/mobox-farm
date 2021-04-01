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
					<h3 class="mgt-10">${{getTotalSupplyUSDT.toLocaleString() }}</h3>
				</div>
				<div class="dib" style="padding:0px 10px">
					<h3 class="opa-6 mgt-10 ">{{ $t("Air-drop_21") }}</h3>
					<h3 class="mgt-10">{{totalAirdropKey}} KEY</h3>
				</div>
				<div class="dib" style="padding:0px 10px">
					<h3 class="opa-6 mgt-10">{{ $t("Air-drop_05") }}</h3>
					<div class="mgt-10">
						<button class="btn-success btn-small por"   @click="$refs.keyopr.showAll()">
							{{getTotalKey}} KEY
						</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 col-xs-12 col-sm-6 mgt-20" v-for="item in getPledgeList" :key="item.coinName" >
					<div class="airdrop-item tal">
						<div class="vertical-children" style="padding-left: 56px" >
							<div class="dib airdorp-item-coin-icon tac " :class="item.isLP?'double-img':'' ">
								<img v-for="(name, key) in item.coinName.split('-')" :key="name+key" :src=" require(`../../assets/coin/${name}.png`) " height="50" alt="" />
							</div>
							<div style="margin-left: 15px">
								<h3 class="color-w tal">{{ item.coinName }} {{item.isLP?"LP":"POOL"}}</h3>
								<p class=" tal mgt-5" >
									<span style="display:inline-block;padding:2px 10px;border-radius:50px;background:#4383D7;color:#fff;font-size:16px" >{{item.allocPoint}}X</span>
									<span class="mgl-5" style="font-size:18px">APY: {{ item.apy }}</span>
								</p>
							</div>
						</div>
						<div class="tal mgt-30">
							<p class="por mgt-10">
								<span class="opa-6 ">{{ $t("Air-drop_02") }}</span>
								<span class="suffix">${{ numFloor(item.totalSupply, 100).toLocaleString() }}</span>
							</p>
						</div>

						<div class="tal mgt-20">
							<p class="por mgt-10">
								<span class="opa-6 ">{{ $t("Air-drop_03") }}</span>
								<span class="suffix">
									<span v-if=" item.wantAmount > 0" style="color: #8cfece">{{ item.wantAmount }}</span>
									<span v-else>-</span>
								</span>
							</p>
						</div>

						<div class="tal mgt-20 ">
							<p class="por mgt-10">
								<span class="opa-6">{{ $t("Air-drop_05") }}</span>
								<span class="suffix">
									<button class="btn-success btn-small por"  :class="lockBtn.getKeyLock > 0 ||  item.earnedKey == 0?'disable-btn':''" @click="$refs.keyopr.setCheckCoin(item.coinName).show()">
										<img v-if="lockBtn.getKeyLock > 0" src="../../assets/icon/loading.png" class="rotate" height="10" alt="" style="position:absolute;left:8px;top:10px" />
										{{ item.earnedKey }} KEY
									</button>
								</span>
							</p>
						</div>
						<!-- 存款提现操作 -->
						<div class="tac mgt-30"> 
							<div class="dib por tac" style="width:50px" @click="$refs.deposit.setOprData(item).show();">
								<img class="cur-point " width="40" src="../../assets/icon/deposit_icon.png" alt=""   >
								<span style="width:100%;position:absolute;bottom:0px;left:0px;font-size:12px;color:#fff;zoom:0.8" class="bold">{{$t("Air-drop_07")}}</span>
							</div>
							<div class="dib por" style="margin-left:50px;width:50px" @click="$refs.withdraw.setOprData(item).show();" >
								<img class="cur-point "  width="40" src="../../assets/icon/withdraw_icon.png" alt="" >
								<span style="width:100%;position:absolute;bottom:0px;left:0px;font-size:12px;color:#fff;zoom:0.8" class="bold">{{$t("Air-drop_08")}}</span>
							</div>
						</div>

					</div>
					<!-- pancake -->
					<div class="tac" v-if="item.isLP"> 
						<button class="btn-primary" style="width: 40%"  @click="$refs.pancake.setOprData(item).show('swap')" >
							{{$t("Air-drop_29")}}
						</button> &nbsp;
						<button class="btn-primary" style="width: 40%"  @click="$refs.pancake.setOprData(item).show('liquidity')" >
							{{$t("Air-drop_30")}}
						</button> &nbsp;
						<!-- <StatuButton style="width: 40%; " :onClick="showWithdraw.bind(this, item)" :isLoading="item.isWithdrawing" :isDisable="item.isWithdrawing || Number(item.wantAmount) <= 0">
							Liquidity
						</StatuButton> -->
					</div>
					
				</div>
			</div>
		</section>

		<section id="buy-back" class="mgt-20 por">
			<div class="info">
				<span class="cur-point por" v-popMsg >
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E9DB8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
					<span class="popMsg left">{{$t("Air-drop_91")}}</span>
				</span>
			</div>
			<div class="aveage-box">
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_78")}}(BNB)</p>
					<input type="text" readonly class="ly-input mgt-10 tac" :value="buyBack.hasAmount" />
				</div>
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_79")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" value="-" />
				</div>
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_80")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" value="-" />
				</div>
				<div style="padding:10px">
					<p class="small opa-6 tac" >{{$t("Air-drop_81")}}</p>
					<input type="text" readonly class="ly-input mgt-10 tac" value="-" />
				</div>
			</div>
		</section>

		<Pancake ref="pancake" />
		<KeyOpr ref="keyopr" />
		<Withdraw ref="withdraw" />
		<Deposit ref="deposit" />
	</div>
</template>
<script>
import CommonMethod from "@/mixin/CommonMethod";
import {  Http, Common } from '@/utils';
import { mapState } from "vuex";
import { PancakeConfig } from "@/config";
import Pancake from "./Pancake";
import KeyOpr from "./KeyOpr";
import Withdraw from './Withdraw';
import Deposit from './Deposit';

export default {
	mixins: [CommonMethod],
	components: { Pancake, KeyOpr, Withdraw, Deposit},
	computed: {
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			coinArr: (state) => state.bnbState.data.coinArr,
			totalAirdropKey: (state) => state.bnbState.data.totalAirdropKey,
			rewardStoreKey: (state) => state.bnbState.data.rewardStoreKey,
			buyBack: (state) => state.bnbState.data.buyBack,
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
			console.log(res);
			if(res){
				let {strategyAmounts, keyAmount, apys} = res.data;
				Object.keys(PancakeConfig.StakeLP).map(coinName=>{
					this.coinArr[coinName].totalSupply = strategyAmounts[coinName] || 0;
					this.coinArr[coinName].apy = Common.numFloor(apys[coinName] * 100 || 0, 100) + "%";
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
	margin:10px;
}
#buy-back .info{
	position: absolute;
	right: -20px;
	top: -20px;
}
#buy-back .ly-input{
	width: 100%;
}
#buy-back > div{
	padding: 10px;
}
#buy-back {
	padding: 20px 30px;
	width: 80%;
	background: #1d2b50;
	border-radius: 20px;
	margin: 0px auto;
	margin-top: 20px;
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
