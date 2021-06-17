<template>
	<div id="aridorp" class="tac">
		<section>
			<div class="menu-btn active">
				<img src="../assets/icon/bnb.png" alt="" height="50" />
			</div>
		</section>
		
		<!-- 算力展示 -->
		<section id="airdrop-cont" class="">
			<div class="por" >
				<p class="opa-6 small">{{ $t("Mine_01") }}</p>
				<h3 class="gradientText">{{totalAirdropMbox}} MBOX</h3>
			</div>
			<div class="row mgt-20 "  id="collection-view">
				<div class="mining-pet" v-for="item in myNFT_stake.slice(0, 20)" :key="item.prototype.toString() + item.tokenId + item.num" >
					<JumpPet :prototype="item.prototype" />
				</div>
			</div>
		</section>

		<section class="mgt-20">
			<div class="collection-num-item">
				<p class="small opa-6">{{ $t("Mine_02") }}</p>
				<h2 class="mgt-10">{{ eth_totalHashrate }}</h2>
			</div>

			<div class="collection-num-item">
				<p class="small opa-6">{{ $t("Mine_03") }}</p>
				<h2 class="mgt-10">
					{{ eth_myHashrate}} <span v-if="eth_getAddHashrate > 0" class="small" style="color: #75fd49" >({{ eth_getAddHashrate }})</span>
				</h2>
				<img src="../assets/icon/powerup.png" id="powerup-btn" alt="" @click="oprDialog('showPetPowerUp-dialog', 'block')" />
			</div>
		</section>

		<section  class="dib tac" style="margin:10px;" >
			<span class="small opa-6 tac">100 {{ $t("Mine_14") }}≈{{ eth_totalHashrate == 0?"0": numFloor( (totalAirdropMbox / eth_totalHashrate) * 100, 100 ) }} MBOX/DAY</span><br/>
			<button class="btn-primary por" :class="(eth_earnedMbox > 0 && lockBtn.getMboxLock <= 0)? '':'disable-btn' " style="min-width: 200px;margin-top:3px" @click="takeEarnedMbox('eth')" >
				<Loading class="btn-loading" v-if="lockBtn.getMboxLock > 0" />
				{{$t("Mine_04")}} {{ eth_earnedMbox }} MBOX
			</button>
		</section>

		<!-- 兑换成chest -->
		<!-- <button @click=" inputBox = getMaxInputBox; oprDialog('buyBox-dialog', 'block'); " class="btn-primary hide" style="margin:10px;min-width: 200px" >
			{{ $t("Mine_07") }}
		</button> -->

	<!-- <Dialog id="buyBox-dialog" :top="200" :width="400">
		<h3>{{ $t("Mine_07") }}</h3>
		<div class="mgt-20">
			<div class="ly-input-content">
				<p class="small tal opa-6">{{ $t("Mine_08") }}:</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon">
						<img  src="../assets/icon/box.png" alt="" />
					</div>
	
					<input
						class="ly-input dib"
						type="text"
						style="
							background: #0f172a;
							text-align: center;
							width: 70%;
							padding-left: 50px;
						"
						v-int
						:data-max="getMaxInputBox"
						v-model="inputBox"
					/>

					<div class="dib" style="width: 30%">
						<button
							class="btn-primary btn-small"
							style="width: 80%"
							@click="inputBox = getMaxInputBox"
						>
							Max
						</button>
					</div>
				</div>
			</div>

			<p class="por mgt-10 tal small">
				<span class="opa-6">
					{{ $t("Mine_09") }}: {{ eth_earnedMbox }} MBOX
				</span>
			</p>

			<p class="small opa-6 tal mgt-20" v-html="$t('Mine_10')"></p>
			<p class="mgt-50">
				{{ $t("Mine_11") }}: {{ inputBox * 5 }} MBOX
			</p>
			<button
				:class="`btn-primary mgt-10 ${
					!canBuyBox ? 'disable-btn' : ''
				}`"
				style="width: 70%; margin-bottom: 20px"
				@click="buyBox('eth')"
			>
				{{ $t("Air-drop_15").replace("#0#",inputBox) }}
			</button>
		</div>
	</Dialog> -->

	</div>

</template>
<script>
import { mapState } from "vuex";
import { Common, Wallet } from "@/utils";
import { CommonMethod } from "@/mixin";
import {  JumpPet, Loading } from "@/components";

const $ = window.$;
export default {
	components: { JumpPet,  Loading},
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
	methods: {
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
#powerup-btn {
	cursor: pointer;
	position: absolute;
	right: -10px;
	top: -8px;
	height: 40px;
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
	padding: 10px;
	width: 80%;
	background: #1C222C;
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
	background: #1C222C;
}
@media (max-width: 768px) {
	#airdrop-cont {
		width: 100%;
		padding: 10px !important;
		border-radius: 10px !important;
	}
	#collection-view{
		margin-top:100px;
	}
}
@media (max-width: 1200px) {
	#airdrop-cont {
		width: 100%;
	}
}
</style>
