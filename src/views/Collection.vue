<template>
	<div id="aridorp" class="tac">
		<section id="airdrop-pool-view" class="panel clear mgt-20">
			<div class="col-xs-12  col-md-4 tal mgt-10" style="padding:10px">
				<h3>{{$t('Air-drop_207')}}</h3>
				<div class="aveage-box mgt-20" id="mobox-pool" >
					<div>
						<div class="dib coin-adv" style="border-color:#1b54f5">
							<img src="@/assets/coin/MBOX.png" alt="">
						</div>
						<div class="dib mgl-10">
							<h3>MBOX</h3>
							<p class="opa-6">Mobox.io</p>
						</div>
					</div>
					<div class="tar">
						<h3>{{totalAirdropMbox}} MBOX</h3>
						<p class="opa-6">{{ $t("Mine_01") }}</p>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-md-8 tal mgt-10" style="padding:10px">
				<h3>{{$t('Air-drop_208')}}</h3>
				<div class="mgt-20">
					<div style="padding-top:10px" >
						<div class="dib coin-adv small" style="border-color:#FFD54F">
							<img src="@/assets/coin/BANANA.png" alt="">
						</div>
						<div class="dib mgl-10">
							<h3>1551 BANANA</h3>
							<p class="opa-6">ApeSwap</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<!-- 算力展示 -->
		<section id="airdrop-cont" class="">
			<div class="row "  id="collection-view">
				<div class="mining-pet" v-for="item in myNFT_stake.slice(0, 20)" :key="item.prototype.toString() + item.tokenId + item.num" >
					<JumpPet :prototype="item.prototype" />
				</div>
			</div>
		</section>

		<section class="panel clear mgt-10" id="airdrop-opr">
			<div class="col-xs-12 col-md-4">
				<div class="clear tal">
					<div class="col-md-12 mgt-10">
						<p class="small opa-6">{{ $t("Mine_02") }}</p>
						<input type="text" readonly class="ly-input bold mgt-10" :value="eth_totalHashrate" style="color:#86a5ff;font-size:16px;background: rgba(27,84,245,0.10);border: 1px solid #1b54f5;border-radius:10px">
					</div>
					<div class="col-md-12 mgt-10">
						<p class="small opa-6">{{ $t("Mine_03") }}</p>
						<div class="por dib mgt-10" style="width:100%">
							<input type="text" readonly class="ly-input" :value="eth_myHashrate" style="color:#a1fa40;font-size:16px;background: rgba(161,250,64,0.10);border: 1px solid #a1fa40;border-radius:10px">
							<img src="../assets/icon/powerup.png" id="powerup-btn" alt="" @click="oprDialog('showPetPowerUp-dialog', 'block')"  />
						</div>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-md-8 tal" >
				<p class="small opa-6 mgt-10">{{$t("Air-drop_210")}}</p>
				<div class="row clear">
					<div class=" col-md-4 mgt-10 tal" style="padding:0px">
						<div  class="dib speed-show">
							<p class="small opa-6"><span class="tac">100 {{ $t("Mine_14") }}≈{{ eth_totalHashrate == 0?"0": numFloor( (totalAirdropMbox / eth_totalHashrate) * 100, 100 ) }} MBOX/DAY</span></p>
							<p class="vertical-children mgt-10 bold">
								<img src="@/assets/coin/MBOX.png" alt="" height="20">
								<span class="mgl-5 " v-if="Number(eth_earnedMbox) >= 0">{{ eth_earnedMbox }}</span>
								<Loading class="mgl-5 " v-else  />
								<span class="mgl-5">MBOX</span>
							</p>
						</div>
					</div>
					<div class=" col-md-4 mgt-10" style="padding:0px">
						<div  class="dib speed-show">
							<p class="small opa-6"><span class="tac">100 {{ $t("Mine_14") }}≈{{ numFloor(Number(eth_totalHashrate == 0?"0": numFloor( (totalAirdropMbox / eth_totalHashrate) * 100, 100 )) * 1551 / 200000, 1e4) }} BANANA/DAY</span></p>
							<p class="vertical-children mgt-10">
								<img src="@/assets/coin/BANANA.png" alt="" height="20">
								<span class="mgl-5 bold vertical-children">
									<span v-if="balancePool['BANANA'].amount != '-' ">{{numFloor(balancePool['BANANA'].amount, 1e4)}}</span>
									<span v-else class="vertical-children">
										<span v-if="balancePool['ts'] == 0"><Loading  /></span>
										<span v-else>-</span>
									</span>
									<span class="mgl-5">BANANA</span>
								</span>
								<StatuButton v-if="balancePool['BANANA'].version == '-' && balancePool['ts'] != 0 " class="btn-small mgl-10" :isDisable="Number(eth_myHashrate) < 0" :isLoading="lockBtn.joinStakeLock > 0" :onClick="joinStake">{{$t('Air-drop_209')}}</StatuButton>
							</p>
						</div>
					</div>
				</div>
				<div class="mgt-20">
					<button id="take-btn" class="btn-primary por" :class="(eth_earnedMbox > 0 && lockBtn.getMboxLock <= 0)? '':'disable-btn' " style="min-width: 200px;margin-top:3px" @click="takeEarnedMbox('eth')" >
						<Loading class="btn-loading" v-if="lockBtn.getMboxLock > 0" />
						{{$t("Mine_04")}}
					</button>
				</div>
			</div>
		</section>

	</div>

</template>
<script>
import { mapState } from "vuex";
import { Common, Wallet } from "@/utils";
import { CommonMethod } from "@/mixin";
import { JumpPet, Loading, StatuButton } from '@/components';

const $ = window.$;
export default {
	components: { JumpPet,  Loading, StatuButton},
	mixins: [CommonMethod],
	data() {
		return { inputBox: 1 };
	},
	computed: {
		...mapState({
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			eth_myHashrate: (state) => state.ethState.data.myHashrate,
			eth_totalHashrate: (state) => state.ethState.data.totalHashrate,
			eth_earnedMbox: (state) => state.ethState.data.earnedMbox,
			eth_mbox: (state) => state.ethState.data.mbox,
			canOpenBox: (state) => state.ethState.data.canOpenBox,
			totalAirdropMbox: (state) => state.ethState.data.totalAirdropMbox,
			lockBtn: (state) => state.globalState.data.lockBtn,
			balancePool: (state) => state.bnbState.data.balancePool,
		}),
		canBuyBox() {
			return (
				this.inputBox != "" &&
				Number(this.eth_earnedMbox) >= Number(this.inputBox) * 5
			);
		},
		//获取最大可以购买的Box
		getMaxInputBox() {
			return parseInt(this.eth_earnedMbox / 5) || 1;
		},
		//获取加成
		eth_getAddHashrate() {
			let staticAddHashrate = this.$parent.showPowerUpList.length * 100;
			let myHashrate = this.eth_myHashrate;
			let addP = this.$parent.getTotalPercent.maxAdd;
			return this.numFloor(myHashrate - (myHashrate / (1 + addP) - staticAddHashrate),1);
		},
	},
	async created(){
		await Wallet.ETH.getAccount();
		await Common.app.getPoolsEarns();
	},
	methods: {
		async joinStake(){
			let hash = await Wallet.ETH.joinStake();
			if(hash){
				this.lockBtnMethod("joinStakeLock")
			}
		},
		async buyBox(chain) {
			if (chain == "eth") {
				if (!this.canBuyBox) return;
	
				//当前还有未开完的箱子
				if (this.canOpenBox > 0) {
					this.$store.commit("globalState/addNotify", {
						msg: this.$t("BOX_29"),
						type: "error",
					});
					return;
				}
				let hash = await Wallet.ETH.buyBox(Number(this.inputBox));
				if (hash) {
					this.oprDialog("buyBox-dialog", "none");
				}
			}
		},

		//领取MBOX
		async takeEarnedMbox(chain) {
			if (chain == "eth") {
				if (this.eth_earnedMbox <= 0 || this.lockBtn.getMboxLock > 0) return;
				let hash = await Wallet.ETH.takeEarnedMbox();
				if(hash){
					this.$store.commit("globalState/lockBtn", "getMboxLock");
				}
			}
		},
		getPositonX() {
			return Common.getRandomNum(10, 1650);
		},
		getPositonY() {
			return Common.getRandomNum(400, 500);
		},
		scalCollection() {
			let $content = $("#collection-view");
			let width = $content.width() * Number($content.css("zoom"));
			let zoom = width / 1753;
			$content.css("zoom", zoom);
			$content.css("-moz-transform", "scale(" + zoom + ")");
			$content.css("-moz-transform-origin:", "top left");
		},
	},
	mounted() {
		this.scalCollection();
		$(window).resize(this.scalCollection);
	},
};
</script>

<style scoped>
.speed-show{
	background:#2A2F35;border-radius:10px;padding:10px;width:90%
}
#airdrop-opr{
	padding: 10px;
}
#airdrop-opr .col-xs-12{
	padding: 10px;
}
#mobox-pool{
	border-right: 1px solid #5d646c;
	padding-right: 20px;
}
#airdrop-pool-view{
	padding: 20px;
	padding-top: 10px;
}
#powerup-btn {
	cursor: pointer;
	position: absolute;
	right: 5px;
	top: 5px;
	height: 30px;
}
.collection-num-item {
	background: #1C222C;
	border-radius: 100px;
	padding: 8px 20px;
	display: inline-block;
	min-width: 250px;
	margin: 10px;
	position: relative;
}

.mining-pet {
	position: absolute;
	top: 0px;
	left: 0px;
}
#collection-view > div:nth-child(1) {
	left: 722px;
	top: 360px;
}
#collection-view > div:nth-child(2) {
	left: 657px;
	top: 275px;
}
#collection-view > div:nth-child(3) {
	left: 840px;
	top: 303px;
}
#collection-view > div:nth-child(4) {
	left: 961px;
	top: 303px;
}
#collection-view > div:nth-child(5) {
	left: 1080px;
	top: 270px;
}
#collection-view > div:nth-child(6) {
	left: 1047px;
	top: 374px;
}
#collection-view > div:nth-child(7) {
	left: 553px;
	top: 374px;
}
#collection-view > div:nth-child(8) {
	left: 460px;
	top: 299px;
}
#collection-view > div:nth-child(9) {
	left: 1260px;
	top: 330px;
}
#collection-view > div:nth-child(10) {
	left: 1304px;
	top: 171px;
}
#collection-view > div:nth-child(11) {
	left: 1208px;
	top: 110px;
}
#collection-view > div:nth-child(12) {
	left: 241px;
	top: 204px;
}
#collection-view > div:nth-child(13) {
	left: 250px;
	top: 369px;
}
#collection-view > div:nth-child(14) {
	left: 150px;
	top: 288px;
}
#collection-view > div:nth-child(15) {
	left: 1500px;
	top: 288px;
}
#collection-view > div:nth-child(16) {
	left: 1519px;
	top: 136px;
}
#collection-view > div:nth-child(17) {
	left: 182px;
	top: 68px;
}
#collection-view > div:nth-child(18) {
	left: 1243px;
	top: -14px;
}
#collection-view > div:nth-child(19) {
	left: 1385px;
	top: 352px;
}
#collection-view > div:nth-child(20) {
	left: 345px;
	top: 290px;
}
#collection-view {
	background-image: url("../assets/wkbg.jpg");
	background-size: cover;
	background-position: center;
	height: 500px;
	padding: 0px;
	border-radius: 30px;
	position: relative;
	overflow: hidden;
}
.airdrop-item {
	background: #1C222C;
	border-radius: 20px;
	padding: 20px;
	position: relative;
	margin: 20px 10px;
}
#airdrop-cont {
	width: 100%;
	background: #1C222C;
	border-radius: 20px;
	display: inline-block;
	margin-top: 10px;
}
#aridorp{
	max-width: 1300px;
	margin:0px auto;
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
	background: #1C222C;
}
@media (max-width: 768px) {
	#take-btn{
		width: 100% !important;
	}
	.speed-show{
		width: 100% !important;
	}
	#airdrop-cont {
		width: 100%;
		border-radius: 20px !important;
		padding: 0px !important;
	}
	#collection-view{
		margin-top:0px;
		border-radius: 20px !important;
	}
	#mobox-pool{
		border-right: none;
	}
	#airdrop-pool-view{
		padding: 0px;
	}
	.ly-input{
		width: 100% !important;
	}
}
@media (max-width: 1200px) {
	#airdrop-cont {
		width: 100%;
	}
}
</style>
