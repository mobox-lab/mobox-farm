<template>
	<div id="aridorp" class="tac adv-panel " >
		<router-link to="/rank">
			<div class="link rank vertical-children"><span>{{ $t("Rank_05") }}</span><img class="mgl-5" src="@/assets/icon/more.png" alt="" height="16"></div>
		</router-link>
		<!-- 算力展示 -->
		<section id="airdrop-cont" class="hide-xs">
			<div class="row "  id="collection-view">
				<div class="mining-pet" v-for="item in myNFT_stake.slice(0, 20)" :key="item.prototype.toString() + item.tokenId + item.num" >
					<JumpPet :prototype="item.prototype" />
				</div>
			</div>
		</section>

		<section class=" adv-panel-content ovh tal hide-xs" id="claim-panel" style="padding: 20px 50px">
			<div >
				<div class="dib coin-adv" style="border-color:#1b54f5">
					<img src="@/assets/coin/MBOX.png" alt="">
				</div>
				<div class="dib tal mgl-20">
					<p class="opa-6">{{ $t("Mine_01") }}</p>
					<h3 v-if="totalAirdropMbox != '-' ">{{totalAirdropMbox}} MBOX</h3>
					<Loading class="mgt-5" v-else />
				</div>
			</div>
			<div class="mgt-20">
				<p class="small opa-6">{{ $t("Mine_02") }}</p>
				<p class="mgt-10 bold" style="width:100%;height:40px;line-height:38px;padding-left:15px;color:#86a5ff;font-size:18px;background: rgba(27,84,245,0.10);border: 2px solid #1b54f5;border-radius:10px">
					<span v-if="eth_totalHashrate != '-' ">{{eth_totalHashrate}}</span>
					<Loading v-else />
				</p>
			</div>
			<div class=" mgt-20">
				<p class="small vertical-children">
					<span class="opa-6">{{ $t("Mine_03") }}</span>
					<StatuButton style="zoom: 0.8" v-if="needShowAdd &&  getStaticAdd > 0" class="btn-small mgl-10" :isLoading="lockBtn.joinStakeLock > 0" :onClick="joinStake">{{$t('Mine_15')}}</StatuButton>
				</p>
				<div class="por dib mgt-10" style="width:100%">
					<p class="por bold" style="height:40px;line-height:38px;padding-left:15px;color:#86a5ff;font-size:18px;background: rgba(27,84,245,0.10);border: 2px solid #1b54f5;border-radius:10px">
						<span v-if="eth_myHashrate != '-' ">{{eth_myHashrate}}</span>
						<Loading v-else />
						<span v-if="eth_getAddHashrate > 0" class="small" style="color: #75fd49" >({{ eth_getAddHashrate }})</span>
						<img src="../assets/icon/powerup.png" id="powerup-btn" alt="" @click="oprDialog('showPetPowerUp-dialog', 'block')"  />
					</p>
				</div>
			</div>
			<p class="small opa-6 mgt-20">{{$t("Air-drop_210")}}</p>
			<div class="  mgt-10 tal" style="padding:0px">
				<div  class="dib speed-show">
					<p class="small opa-6 vertical-children"><span class="tac">1000 {{ $t("Mine_14") }}≈
					<span v-if="eth_totalHashrate != '-' ">{{ eth_totalHashrate == 0?"0": numFloor( (totalAirdropMbox / (eth_totalHashrate | 0)) * 1000, 100 ) }}</span>
					<Loading v-else />
					MBOX/DAY</span></p>
					<p class="vertical-children mgt-10 bold" style="height:25px">
						<img src="@/assets/coin/MBOX.png" alt="" height="20">
						<span class="mgl-5 " v-if="Number(eth_earnedMbox) >= 0">{{ eth_earnedMbox }}</span>
						<Loading class="mgl-5 " v-else  />
					<span class="mgl-5">MBOX</span>
					</p>
				</div>
			</div>
			<div class="mgt-20 tac">
				<button id="take-btn" class="btn-primary por mgl-10" :class="(eth_earnedMbox > 0 && lockBtn.getMboxLock <= 0)? '':'disable-btn' " style="min-width: 200px;margin-top:3px" @click="setAction(25001);takeEarnedMbox('eth')" >
					<Loading class="btn-loading" v-if="lockBtn.getMboxLock > 0" />
					{{$t("Mine_04")}}
				</button>
			</div>
		</section>

		<!-- 手机版展示 -->
		<section class="visiable-xs">
			<div class="momo-show por">
				<div class="momo_show_anime">
					<div class="water"></div>
					<div class="gka-harmer por animation-harmer" style="margin-top: -12px;right:0px"></div>
					<p class="small opa-6 mgt-10">{{$t("Mine_03")}}</p>
					<p class="bold2" style="font-size: 28px;color: #fdc006" v-if="eth_myHashrate != '-' ">{{eth_myHashrate.toLocaleString()}}</p>
					<Loading class="mgt-10" v-else />
				</div>
				<div id="collection-view2">
					<div class="mining-pet2" v-for="item in myNFT_stake.slice(0, 10)" :key="item.prototype.toString() + item.tokenId + item.num" >
						<JumpPet :prototype="item.prototype" />
					</div>
				</div>
			</div>
			<div class="claim-opr">
				<div class="mask">
					<div class="aveage-box" style="padding:15px 50px">
						<div class="tal">
							<p class="opa-6">Mining Camp</p>
							<p class="vertical-children  bold" style="height:25px">
								<img src="@/assets/coin/MBOX.png" alt="" height="20">
								<span class="mgl-5  bold2" style="font-size:18px" v-if="Number(eth_earnedMbox) >= 0">{{ eth_earnedMbox }}</span>
								<Loading class="mgl-5 " v-else  />
							</p>
						</div>
						<div class="tar">
							<button  class="btn-primary por mgt-10" :class="(eth_earnedMbox > 0 && lockBtn.getMboxLock <= 0)? '':'disable-btn' "  @click="setAction(25001);takeEarnedMbox('eth')" >
								<Loading class="btn-loading" v-if="lockBtn.getMboxLock > 0" />
								{{$t("Mine_04")}}
							</button>
						</div>
					</div>
				</div>
			</div>
			<p class="mgt-10 opa-6 vertical-children"><span class="tac">1000 {{ $t("Mine_14") }}≈
				<span v-if="eth_totalHashrate != '-' ">{{ eth_totalHashrate == 0?"0": numFloor( (totalAirdropMbox / (eth_totalHashrate | 0)) * 1000, 100 ) }}</span>
				<Loading v-else />
			 MBOX/DAY</span></p>

		</section>
	</div>

</template>
<script>
import { mapState } from "vuex";
import { Common, Wallet } from "@/utils";
import { CommonMethod } from "@/mixin";
import { JumpPet, Loading, StatuButton } from '@/components';

export default {
	components: { JumpPet,  Loading, StatuButton},
	mixins: [CommonMethod],
	data() {
		return { 
			inputBox: 1,
			needShowAdd: false,
		};
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
		getStaticAdd(){
			return this.$root.$children[0].showPowerUpList.length * 300;
		},
		getTotalPercent(){
			return this.$root.$children[0].getTotalPercent.maxAdd;
		},
		//获取加成
		eth_getAddHashrate() {
			let staticAddHashrate = this.getStaticAdd;
			let myHashrate = this.eth_myHashrate | 0;
			let addP = this.getTotalPercent;
			return this.numFloor(myHashrate - (myHashrate / (1 + addP) - staticAddHashrate),1);
		},
		getBalanceArr(){
			let arr = [];
			for (const key in this.balancePool) {
				if(key != "ts"){
					arr.push(this.balancePool[key]);
				}
			}
			return arr;
		}
	},
	async created(){
		await Wallet.ETH.getAccount();
		Common.app.getPoolsEarns();
		await this.getGroupV4();
	},
	methods: {
		async getGroupV4(){
			let num = await Wallet.ETH.getGroupV4();
			this.needShowAdd = num == 0;
		},
		async joinStake(){
			let hash = await Wallet.ETH.joinStake(async ()=>{
				await this.getGroupV4();
			});
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
		
	},
};
</script>

<style scoped>
.rank{
	position: absolute;
	top: -30px;
	right: 0px;
}
.momo_show_anime{
	width: 200px;
	height: 200px;
	background-size: cover;
	margin: 50px auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	border: 2px solid #6C18E3;
	border-radius: 100%;
	box-shadow: 0px 0px 80px #6C18E3 inset; 
}
.momo_show_anime::after{
      width: 200px;
      height: 200px;
      content: "";
      border-radius: 100%;
      border: 2px solid #6C18E3;
      position: absolute;
      left: -4px;
      right: 0px;
      animation-name: keyframes-water;
      animation-duration: 4s ;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      animation-timing-function: steps(1);
      animation-timing-function: linear;
}
.water{
      width: 200px;
      height: 200px;
      border-radius: 100%;
      border: 2px solid #6C18E3;
      position: absolute;
      left: -2px;
      right: 0px;
      animation-name: keyframes-water;
      animation-duration: 4s ;
      animation-delay: 2s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      animation-timing-function: steps(1);
      animation-timing-function: linear;
}
@keyframes keyframes-water{
      0% {
            transform: scale(1.05);
            opacity: 1;
      }
      50%{
            transform: scale(1.3);
            opacity: 0.5;
      }
      100%{
            transform: scale(1.6);
            opacity: 0;
      }
}
.over{
	transform: rotate(-320deg);
	transform-origin: right top;
	font-family: AvenirNext-Bold;
	font-size: 10px;
	color: #c7c7c7;
	background: #646c74;
	position: absolute;
	right: -25px;
	top: 70px;
	height: 20px;
	line-height: 20px;
	width: 150px;
	text-align: center;
	z-index: 998;
	zoom: 0.8;
}
.speed-show{
	background:#2A2F35;border-radius:10px;padding:10px;width:100%;
	overflow: hidden;
	position: relative;
}
#airdrop-opr{
	padding: 10px;
}
#airdrop-opr .col-xs-12{
	padding: 10px;
}
#mobox-pool{
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
	top: 4px;
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
.mining-pet2{
	position: absolute;
	zoom: 0.5;
}
.mining-pet {
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 999
}
#collection-view2 > div:nth-child(1) {
	left: 80px;
	top: 10px;
}
#collection-view2 > div:nth-child(2) {
	left: 60px;
	top: 150px;
}
#collection-view2 > div:nth-child(3) {
	left: 80px;
	top: 300px;
}
#collection-view2 > div:nth-child(4) {
	left: 590px;
	top: 230px;
}
#collection-view2 > div:nth-child(5) {
	left: 580px;
	top: 60px;
}
#collection-view2 > div:nth-child(6) {
	left: 170px;
	top: -80px;
}
#collection-view2 > div:nth-child(7) {
	left: 500px;
	top: -50px;
}
#collection-view2 > div:nth-child(8) {
	left: 500px;
	top: 330px;
}
#collection-view2 > div:nth-child(9) {
	left: 300px;
	top: 350px;
}
#collection-view2 > div:nth-child(10) {
	left: 300px;
	top: -80px;
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
	left: 885px;
	top: 303px;
}
#collection-view > div:nth-child(4) {
	left: 570px;
	top: 260px;
}
#collection-view > div:nth-child(5) {
	left: 750px;
	top: 270px;
}
#collection-view > div:nth-child(6) {
	left: 400px;
	top: 364px;
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
	left: 150px;
	top: 370px;
}
#collection-view > div:nth-child(10) {
	left: 358px;
	top: 260px;
}
#collection-view > div:nth-child(11) {
	left: 760px;
	top: 85px;
}
#collection-view > div:nth-child(12) {
	left: 248px;
	top: 275px;
}
#collection-view > div:nth-child(13) {
	left: 250px;
	top: 369px;
}
#collection-view > div:nth-child(14) {
	left: 150px;
	top: 258px;
}
#collection-view > div:nth-child(15) {
	left: 50px;
	top: 228px;
}
#collection-view > div:nth-child(16) {
	left: 1370px;
	top: 70px;
}
#collection-view > div:nth-child(17) {
	left: 50px;
	top: 328px;
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
	left: 825px;
	top: 369px;
}

#collection-view {
	background-image: url("../assets/wkbg.jpg");
	background-size: cover;
	background-position: center;
	height: 475px;
	margin-right: 410px;
	border-radius: 10px;
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
	border-radius: 10px;
	width: 100%;
}
#claim-panel{
	position: absolute;
	right: 10px;
	top: 10px;
	bottom: 10px;
	width: 400px;
	background: rgba(0,0,0,0.8);
}
#aridorp{
	max-width: 1460px;
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
	.claim-opr .mask{
		background: rgba(0,0,0,0.5);
		position: absolute;
		left: 0px; right: 0px; bottom: 0px; top: 0px;
	}
	.claim-opr{
		height: 80px;
		background-image: url("../assets/wkbg.jpg");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: relative;
	}
	.momo-show{

	}
	.other-balance{
		zoom: 0.7;
		margin-top: 0px;
	}
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
