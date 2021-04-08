<style src="./main.css"></style>
<style src="./layout.css"></style>
<style src="./mobile.css"></style>
<style src="./assets/anime/v5b/gka.css"></style>
<style src="./assets/anime/v6b/gka.css"></style>
<template>
	<div id="app">
		<div class="mask" @click="navOpr('hide')"></div>

		<!-- <div class="vertical-children point-block">
					<img src="./assets/coin/KEY.png" height="25" alt=""/>
					<span class="mgl-10 bold show-point-block" @click="$refs.pancake.setOprData({coinName: 'KEY-BNB'}).show('swap')">
						$ <span v-if="ourPrice['KEY'] != '-' ">{{ourPrice["KEY"]}}</span>
						<Loading v-else />
					</span>
				</div>
				<div class="vertical-children mgt-10 point-block ">
					<img src="./assets/coin/MBOX.png" height="25" alt=""/>
					<span class="mgl-10 bold show-point-block" @click="$refs.pancake.setOprData({coinName: 'MBOX-BNB'}).show('swap')">
						$ <span v-if="ourPrice['MBOX'] != '-' ">{{ourPrice["MBOX"]}}</span>
						<Loading v-else />
					</span>
				</div> -->
		<!-- ipad导航 -->
		<div id="mobile-nav" class="hide">
			<img src="./assets/logo.png" height="30" alt="" />
			<div class="dib " style="position:absolute;top:0px;right:130px;zoom:0.8" >
				<div class="vertical-children dib">
					<img src="./assets/coin/KEY.png" height="25" alt=""/>
					<span  @click="$refs.pancake.setOprData({coinName: 'KEY-BNB'}).show('swap')">
						$<span v-if="ourPrice['KEY'] != '-' ">{{ourPrice["KEY"]}}</span>
						<Loading v-else />
					</span>
				</div>
				<div class="vertical-children  dib mgl-10 ">
					<img src="./assets/coin/MBOX.png" height="25" alt=""/>
					<span @click="$refs.pancake.setOprData({coinName: 'MBOX-BNB'}).show('swap')">
						$<span v-if="ourPrice['MBOX'] != '-' ">{{ourPrice["MBOX"]}}</span>
						<Loading v-else />
					</span>
				</div>
			</div>
			<div id="mobile-chain" style="position:absolute;right:10px;top:0px;zoom:0.7" class="hide">
				<WalletConnectBtn />
			</div>
			<div id="nav-btn" @click="navOpr('show')">
				<svg width="23" height="23" viewBox="0 0 16 16" style="fill: #94bbff" >
					<path d="M.571 3.571H15.43A.571.571 0 0016 3V1.571A.571.571 0 0015.429 1H.57A.571.571 0 000 1.571V3c0 .316.256.571.571.571zm0 5.715H15.43A.571.571 0 0016 8.714V7.286a.571.571 0 00-.571-.572H.57A.571.571 0 000 7.286v1.428c0 .316.256.572.571.572zm0 5.714H15.43a.571.571 0 00.571-.571V13a.571.571 0 00-.571-.571H.57A.571.571 0 000 13v1.429c0 .315.256.571.571.571z"></path>
				</svg>
			</div>
		</div>
		<div id="nav" class="por" @click="navOpr('hide')">
			<div class="mgt-10 tac">
				<WalletConnectBtn />
			</div>
			<ul id="nav-list" style="maring-top: 50px">
				<router-link to="/">
					<li :class="this.$route.path == '/' ? 'active' : ''">
						<span class="per-icon vertical-children">
							<img src="./assets/icon/home.png" alt="" width="30" />
						</span>
						<span>{{ $t("Menu_01") }}</span>
					</li>
				</router-link>
				<router-link to="/openbox">
					<li :class="this.$route.path == '/openbox' ? 'active' : ''">
						<span class="per-icon vertical-children">
							<img src="./assets/icon/box.png" alt="" width="30" />
						</span>
						<span>{{ $t("Menu_02") }}</span>
					</li>
				</router-link>
				<router-link to="/mypet">
					<li :class="this.$route.path == '/mypet' ? 'active' : ''">
						<span class="per-icon vertical-children">
							<img src="./assets/icon/mypet.png" alt="" height="30" />
						</span>
						<span>{{ $t("Menu_03") }}</span>
					</li>
				</router-link>
				<router-link to="/collection">
					<li :class="this.$route.path == '/collection' ? 'active' : ''">
						<span class="per-icon vertical-children">
							<img src="./assets/icon/airdrop.png" alt="" width="30" />
						</span>
						<span>{{ $t("Menu_04") }}</span>
					</li>
				</router-link>
				
				<router-link to="/market">
				<li :class="this.$route.path == '/market' ? 'active' : ''">
				<!-- <li> -->
					<span class="per-icon vertical-children">
						<span class="notice" v-if="historyNotice"></span>
						<img src="./assets/icon/market.png" alt="" height="30" />
					</span>
					<span>{{ $t("Menu_05") }}</span>
				</li>
				</router-link>

				<router-link to="/rank">
					<li :class="this.$route.path == '/rank' ? 'active' : ''">
						<span class="per-icon vertical-children">
							<img src="./assets/icon/rank.png" alt="" width="25" />
						</span>
						<span>{{ $t("Rank_05") }}</span>
					</li>
				</router-link>

				<!-- <router-link to="/rule">
					<li :class="this.$route.path == '/rule' ? 'active' : ''">
						<span class="per-icon vertical-children">
							<img
								src="./assets/icon/help.png"
								alt=""
								height="30"
							/>
						</span>
						<span>{{ $t("Rule_01") }}</span>
					</li>
				</router-link> -->
			</ul>
			<div id="our-parice-pc">
				<div class="vertical-children point-block">
					<img src="./assets/coin/KEY.png" height="25" alt=""/>
					<span class="mgl-10 bold show-point-block" @click="$refs.pancake.setOprData({coinName: 'KEY-BNB'}).show('swap')">
						$<span v-if="ourPrice['KEY'] != '-' ">{{ourPrice["KEY"]}}</span>
						<Loading v-else />
					</span>
				</div>
				<div class="vertical-children mgt-10 point-block ">
					<img src="./assets/coin/MBOX.png" height="25" alt=""/>
					<span class="mgl-10 bold show-point-block" @click="$refs.pancake.setOprData({coinName: 'MBOX-BNB'}).show('swap')">
						$<span v-if="ourPrice['MBOX'] != '-' ">{{ourPrice["MBOX"]}}</span>
						<Loading v-else />
					</span>
				</div>
			</div>
		</div>
		<div id="top-res">
			<p class="vertical-children">
				<img src="./assets/icon/airdrop.png" alt="" height="25" />&nbsp;
				<span>{{ eth_myHashrate }}</span>
			</p>
			<p class="vertical-children">
				<img src="./assets/icon/box.png" alt="" height="25" />&nbsp;
				<span>{{ canOpenBoxTrue }}</span>
			</p>
			<p class="vertical-children">
				<img src="./assets/coin/MBOX.png" alt="" height="25" />&nbsp;
				<span>{{ Number(coinArr["MBOX"].balance) || 0 }}</span>
			</p>
			<p class="vertical-children">
				<img src="./assets/coin/BNB.png" alt="" height="25" />&nbsp;
				<span>{{ Number(coinArr["BNB"].balance) || 0 }}</span>
			</p>
			<a class="hide" href="https://www.certik.org/projects/mobox" style="position:absolute;right:15px;top: 0px" target="_blank">
				<img src="./assets/icon/check-icon.png" alt="" height="50" />
			</a>
		</div>
		<!-- 手机底部导航 -->
		<div id="nav-list-mobile" class="hide">
			<ul>
				<router-link to="/">
					<li :class="this.$route.path == '/' ? 'active' : ''">
						<p class="per-icon vertical-children">
							<img src="./assets/icon/home.png" alt="" height="30" />
						</p>
						<span>{{ $t("Menu_01") }}</span>
					</li>
				</router-link>
				<router-link to="/openbox">
					<li :class="this.$route.path == '/openbox' ? 'active' : ''">
						<p class="per-icon vertical-children">
							<img src="./assets/icon/box.png" alt="" height="30" />
						</p>
						<span>{{ $t("Menu_02") }}</span>
					</li>
				</router-link>
				<router-link to="/mypet">
					<li :class="this.$route.path == '/mypet' ? 'active' : ''">
						<p class="per-icon vertical-children">
							<img src="./assets/icon/mypet.png" alt="" height="30" />
						</p>
						<span>{{ $t("Menu_03") }}</span>
					</li>
				</router-link>
				<router-link to="/collection">
					<li :class="this.$route.path == '/collection' ? 'active' : ''">
						<p class="per-icon vertical-children">
							<img src="./assets/icon/airdrop.png" alt="" height="30" />
						</p>
						<span>{{ $t("Menu_04") }}</span>
					</li>
				</router-link>

				<router-link to="/market">
					<li :class="this.$route.path == '/market' ? 'active' : ''">
						<p class="per-icon vertical-children">
							<section class="por dib">
								<span class="notice" v-if="historyNotice"></span>
								<img src="./assets/icon/market.png" alt="" height="30" />
							</section>
						</p>
						<span>{{ $t("Menu_05") }}</span>
					</li>
				</router-link>
			
				<router-link to="/rank">
					<li :class="this.$route.path == '/rank' ? 'active' : ''">
						<p class="per-icon vertical-children">
							<img src="./assets/icon/rank.png" alt="" height="25" />
						</p>
						<span>{{ $t("Rank_05") }}</span>
					</li>
				</router-link>

				<!-- <router-link to="/rule">
					<li :class="this.$route.path == '/rule' ? 'active' : ''">
						<p class="per-icon vertical-children">
							<img src="./assets/icon/help.png" alt="" height="30" />
						</p>
						<span >{{ $t("Rule_01") }}</span>
					</li>
				</router-link> -->
			</ul>
		</div>
		<router-view />
		<Notification />
		<NotificationTrans />
		<Dialog id="showPetPowerUp-dialog" :top="100" :width="420" :animation="scorllToTargetPos" >
			<div style="padding: 10px">
				<h3>{{ $t("Fetters_01") }}</h3>
				<p class="small opa-6 mgt-10 tal">{{ $t("Fetters_02") }}</p>
				<p class="mgt-10 tal small vertical-children">
					{{ $t("Fetters_03") }}:
					<span style="color: #aaf45a">{{showPowerUpList.length * 100}}</span>
					<img v-if="showPowerUpList.length > 0" src="./assets/icon/view.png" class="mgl-5 cur-point" alt="" @click="showPowerPet = !showPowerPet" />
				</p>
				<div :class="showPowerPet ? 'dialog-content mgt-10' : 'hide'" style="max-height: 300px" >
					<div style="zoom: 0.69">
						<div class="tac" v-for="(comp, index) in showPowerUpList" :key="index" >
							<PetItemSmall v-for="item in comp" :key="item.prototype.toString() + item.tokenId + item.num " :data="item" />
						</div>
					</div>
				</div>
				<h3 class="mgt-20">{{ $t("Fetters_04") }}</h3>
				<p class="small opa-6 mgt-10 tal">{{ $t("Fetters_05") }}</p>
				<div class="tal mgt-20">
					<div :class="`tab-menu ${ powerTab == 'v4' ? 'active' : '' }`" @click="powerTab = 'v4'; scorllToTargetPos(); " >
						{{ $t("MOMO_12") }}
					</div>
					<div :class="`tab-menu ${ powerTab == 'v5' ? 'active' : '' }`" @click=" powerTab = 'v5'; scorllToTargetPos(); " >
						{{ $t("MOMO_13") }}
					</div>
					<div :class="`tab-menu ${ powerTab == 'v6' ? 'active' : '' }`" @click=" powerTab = 'v6'; scorllToTargetPos(); " >
						{{ $t("MOMO_14") }}
					</div>
				</div>
				<div class=" tab-body" style="padding:10px">
					<table class="power-table tal small opa-6">
						<tr>
							<th style="width: 40%">{{ $t("BOX_13") }}</th>
							<th style="width: 60%">{{ $t("Fetters_10") }}</th>
						</tr>
					</table>
					<div class="tab-body" style="max-height: 180px;overflow-y: auto;" >
						<table class="power-table tal small" id="need-scoller-table" >
							<tr v-for="(item, index) in powerAddConfig[powerTab]" :key="item.num" :class="getTotalPercent[powerTab] == index ? 'active' : ''" >
								<td style="width: 40%">{{ item.num }}<span style="color:#aaf45a" v-if="getTotalPercent[powerTab] == index">({{getNftVInfo[powerTab].length}})</span>
								</td>
								<td style="width: 60%">{{ numFloor((item.p * 100), 1000) }}%</td>
							</tr>
						</table>
					</div>
				</div>
				<p class="small tal small mgt-10"> 
					{{ $t("Fetters_11") }}:
					<span style="color: #aaf45a" >{{ (getTotalPercent.maxAdd * 100).toFixed(0) }}%</span>
				</p>
			</div>
		</Dialog>
		<div id="fly-dot"></div>
		<Pancake ref="pancake" />
		<WalletOprStatus />
		<WalletConnectDialog />
	</div>
</template>
<script>
import Pancake from "./views/Airdrop/Pancake";

import { Notification, NotificationTrans, Dialog, PetItemSmall, WalletOprStatus, WalletConnectBtn, WalletConnectDialog, Loading } from "@/components";
import { InitEth, InitTron, CommonMethod } from "@/mixin";
import { mapState } from "vuex";
import { Common, SwapHttp, Http } from "@/utils";
import { PancakeConfig } from "@/config";

let timer = null;
export default {
	name: "App",
	mixins: [InitEth, InitTron, CommonMethod],
	components: {Notification, NotificationTrans, Dialog, PetItemSmall, WalletOprStatus, WalletConnectBtn, WalletConnectDialog, Pancake, Loading },
	data() {
		return {
			langArr: ["English", "中文"],
			langPosToName: ["en", "zh-CN"],
			showPowerPet: false,
			ourPrice: {
				"MBOX": "-",
				"KEY": "-",
			},
			powerAddConfig: {
				v4: [
				{ num: 5, p: 0.02 },
				{ num: 10, p: 0.04 },
				{ num: 15, p: 0.05 },
				{ num: 20, p: 0.06 },
				{ num: 25, p: 0.07 },
				{ num: 30, p: 0.08 },
				{ num: 35, p: 0.09 },
				{ num: 40, p: 0.1 },
				{ num: 45, p: 0.11 },
				{ num: 50, p: 0.12 },
				{ num: 60, p: 0.13 },
				{ num: 70, p: 0.14 },
				{ num: 80, p: 0.15 },
				{ num: 90, p: 0.16 },
				{ num: 100, p: 0.17 },
				{ num: 125, p: 0.18 },
				{ num: 150, p: 0.19 },
				{ num: 175, p: 0.2 },
				{ num: 200, p: 0.21 },
				{ num: 250, p: 0.22 },
				{ num: 300, p: 0.23 },
				{ num: 350, p: 0.24 },
				{ num: 400, p: 0.25 },
				{ num: 450, p: 0.26 },
				{ num: 500, p: 0.27 },
				],
				v5: [
				{ num: 3, p: 0.05 },
				{ num: 6, p: 0.1 },
				{ num: 9, p: 0.125 },
				{ num: 12, p: 0.15 },
				{ num: 15, p: 0.175 },
				{ num: 18, p: 0.2 },
				{ num: 21, p: 0.225 },
				{ num: 24, p: 0.25 },
				{ num: 27, p: 0.275 },
				{ num: 30, p: 0.3 },
				{ num: 36, p: 0.325 },
				{ num: 42, p: 0.35 },
				{ num: 48, p: 0.375 },
				{ num: 54, p: 0.4 },
				{ num: 60, p: 0.425 },
				{ num: 75, p: 0.45 },
				{ num: 90, p: 0.475 },
				{ num: 105, p: 0.5 },
				{ num: 120, p: 0.525 },
				],
				v6: [
				{ num: 2, p: 0.06 },
				{ num: 3, p: 0.09 },
				{ num: 4, p: 0.12 },
				{ num: 5, p: 0.15 },
				{ num: 6, p: 0.18 },
				{ num: 7, p: 0.21 },
				{ num: 8, p: 0.24 },
				{ num: 9, p: 0.27 },
				{ num: 10, p: 0.3 },
				{ num: 12, p: 0.33 },
				{ num: 14, p: 0.36 },
				{ num: 16, p: 0.39 },
				{ num: 18, p: 0.42 },
				{ num: 20, p: 0.45 },
				{ num: 25, p: 0.48 },
				{ num: 30, p: 0.51 },
				],
				},
			powerTab: "v4",
		};
	},
	computed: {
		...mapState({
			globalState: (state) => state.globalState.data,
			ethBalance: (state) => state.ethState.data.balance,
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
			eth_myHashrate: (state) => state.ethState.data.myHashrate,
			orderBlockHash: (state) => state.ethState.data.orderBlockHash,
			canOpenBox: (state) => state.ethState.data.canOpenBox,
			openBoxTemp: (state) => state.ethState.data.openBoxTemp,
			upgradeLocks: (state) => state.ethState.data.upgradeLocks,
			testBUSD: (state) => state.ethState.data.testBUSD,
			historyNotice: (state) => state.marketState.data.historyNotice,
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		canOpenBoxTrue() {
			let canOpenBox = this.canOpenBox;
			if ( this.orderBlockHash == "0x0000000000000000000000000000000000000000000000000000000000000001" ) {
				canOpenBox = 0;
			}
			let needReduceBox = 0;
			this.openBoxTemp.map((item) => {
				if(item.state == 0){
					needReduceBox += Number(item.amount);
				}
			});
			canOpenBox -= needReduceBox;
			if (canOpenBox < 0) canOpenBox = 0;
			return canOpenBox;
		},
		getNftVInfo() {
			let retObj = {
				v1: [],
				v2: [],
				v3: [],
				v4: [],
				v5: [],
				v6: [],
			};
			this.myNFT_stake.map((item) => {
				let vType = parseInt(item.prototype / 1e4);
				retObj["v" + vType].push(item);
			});
			return retObj;
		},
		getTotalPercent() {
			let obj = { maxAdd: 0, v4: -1, v5: -1, v6: -1, };
			let nftInfo = this.getNftVInfo;
			["v4", "v5", "v6"].map((type) => {
				let targetNum = nftInfo[type].length;
				let nowMax = 0;
				this.powerAddConfig[type].map((item, pos) => {
					if (targetNum >= item.num) {
						obj[type] = pos;
						nowMax = item.p;
					}
				});
				obj.maxAdd += nowMax;
			});
			return obj;
		},
		showPowerUpList() {
			let showList = [];
			let typeObj = {};
			this.myNFT_stake.map((item) => {
				if (item.num >= 1) {
					let type = item.prototype % (item.vType * 10000);
					if (!typeObj[type]) {
						typeObj[type] = {};
					}
					typeObj[type][item.prototype] = item;
				}
			});

			Object.values(typeObj).map((item) => {
				let compList = Object.values(item);
				if (compList.length >= 4) {
					showList.push(compList);
				}
			});

			return showList;
		},
	},
	async created() {
		window.addEventListener("message", this.listenPostMsg, false);
		
		this.setLang();

		setTimeout(() => {
			this.scorllToTargetPos();
		}, 5000);

		let count = 0;
		//1s定时器
		clearInterval(timer);
		let airdropCountDown = 1617768000 - parseInt(new Date().valueOf()/ 1000);
		timer = setInterval(async ()=>{
			//定时移除锁定按钮状态
			for (let key in this.globalState.lockBtn) {
				if(this.globalState.lockBtn[key] > 0){
					this.globalState.lockBtn[key]--;
				}
			}
			//定时解除升级按钮锁定状态
			for (let key in this.upgradeLocks){
				if(this.upgradeLocks[key] >0){
					this.upgradeLocks[key]--;
				}
			}

			if(airdropCountDown >= 0){
				airdropCountDown--;
				this.$store.commit("globalState/setData", {airdropCountDown});

				if(airdropCountDown == 0){
					this.getTotalStakeUSDTAndAirdropKEY();
				}
			}

			count++;
			if(count % 10 == 0){
				await this.setOurPrice("KEY");
				await this.setOurPrice("MBOX");
				await this.getTotalStakeUSDTAndAirdropKEY();
			}
		},1000);

		await this.setOurPrice("KEY");
		await this.setOurPrice("MBOX");
		await this.getTotalStakeUSDTAndAirdropKEY();

	},
	beforeDestroy(){
		clearInterval(timer);
	},
	methods: {
		setLang(){
			let langMap = {"ko":"kr", "zh-CN":"zh-CN","zh-TW":"zh-CN", "en":"en", "zh":"zh-CN", "kr":"kr"};

			let lang = 'en';
			let storageLang = Common.getUrlParms("lang");

			if(storageLang){
				lang = langMap[storageLang] || 'en'
			}else{
				lang = navigator.language||navigator.userLanguage;
				lang = langMap[lang] || 'en';
			}
			this.$i18n.locale = lang;
		},
		async  getTotalStakeUSDTAndAirdropKEY(){
			let res = await Http.getKeyDrop();
			if(res){
				let {strategyAmounts, keyAmount, apys} = res.data;
				Object.keys(PancakeConfig.StakeLP).map(coinName=>{
					this.coinArr[coinName].totalSupply = strategyAmounts[coinName] || 0;
					let apy =  Common.numFloor(apys[coinName] * 100 || 0, 100);
					if(apy == 0) apy = "?";
					this.coinArr[coinName].apy = apy + "%";
				});
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr, totalAirdropKey: keyAmount || 0});
			}
		},

		//
		async setOurPrice(coinName){
			let res = await SwapHttp.post("/pair/price", {from: coinName, to: "BNB", amountIn: 1});
			if(res.data.code == 200){
				let res2 = await SwapHttp.post("/pair/price", {from: "BNB", to: "USDT", amountIn: res.data.data.amountOut});
				if(res2.data.code == 200){
					this.ourPrice[coinName] = this.numFloor(res2.data.data.amountOut, 1e4);
				}
			}
		},
		//滚动到激活的位置
		scorllToTargetPos() {
			let pos = this.getTotalPercent[this.powerTab];
			if (pos == -1) pos = 0;
			let dom = document.getElementById("need-scoller-table");
			dom.childNodes[pos].scrollIntoView();
		},
		listenPostMsg(msg) {
			if (msg.data["from"] == "mbox") {
				let action = msg.data["action"];
				//设置多语言
				if (action == "changeLang") {
					this.$i18n.locale = msg.data["value"];
				}
				//设置token
				if (action == "setToken") {
					console.log("setToken", msg.data["value"]);
				}
			}
		},
		navOpr(type) {
			let maskDom = document.getElementsByClassName("mask")[0];
			maskDom.style.opacity = type == "show" ? 1 : 0;
			maskDom.style.display = type == "show" ? "block" : "none";
			document.getElementById("nav").style.cssText =
				type == "show" ? "right: 0px !important" : "right: -260px";
		},
		onLangChange(index) {
			this.$i18n.locale = this.langPosToName[index];
		},
		onChainChange() {},
	},
};
</script>

<style scoped>
#our-parice-pc{
	position: absolute;
	bottom:50px;
	padding:10px 20px;
	width: 80%;
	left: 10%;
	/* background: #23305a9c; */
	border-radius: 10px;
}
#our-parice-pc span{
	/* background: rgb(34, 32, 32); */
	/* padding:5px 10px;
	border-radius: 5px; */
}
/* #nav-list-mobile{
	position: fixed;
	bottom:0px;
	left: 0px;
	right: 0px;
	z-index: 9999;
	height: 70px;
	background: #37537c;
	border-radius: 10px;
	padding: 3px;

}
#nav-list-mobile ul{
	list-style: none;
	white-space:nowrap;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	overflow-y: hidden;
	box-sizing:content-box;
	border-radius: 10px;
	padding: 0px 10px;
	padding-bottom: 50px;
	display: flex;
}
#nav-list-mobile ul li{
	text-align: center;
	height: 50px;
	width: 60px;
	vertical-align: top;
	display: inline-flex;
	justify-content: center;
	flex-direction: column;
}
#nav-list-mobile ul li.active{
	background: #1D2B50;
	border-radius: 10px;
}
#nav-list-mobile ul li span{
	display: block;
	font-size: 12px;
	zoom: 0.6;
	white-space:normal;
}
#nav-list-mobile ul li p{
	display: block;
	font-size: 12px;
	zoom: 0.8;
	white-space:normal;
	height: 30px;
} */

#nav-list-mobile ul{
	list-style: none;
	display: flex;
	flex-wrap:wrap;
	justify-content:space-evenly;
	padding-top: 2px;
}
#nav-list-mobile{
	position: fixed;
	bottom:0px;
	left: 0px;
	right: 0px;
	z-index: 9999;
	height: 70px;
	background: #37537c;
	border-radius: 10px;
	padding: 3px;
}
#nav-list-mobile a{
	display: inline-flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	text-align: center;
}
#nav-list-mobile li{
	width: 90%;
	height: 50px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding-bottom: 5px;
}
#nav-list-mobile span{
	zoom: 0.5;
	font-size: 14px;
}
#nav-list-mobile ul li.active{
	background: #1D2B50;
	border-radius: 10px;
}

@media (max-width: 768px) {
	#nav-list-mobile{
		display: block;
	}
	#nav-btn{
		display: none;
	}
	#mobile-chain{
		display: block;
	}
}

.power-table {
	width: 100%;
}
.power-table tr {
	opacity: 0.6;
}
.power-table td {
	height: 25px;
}
.power-table tr.active {
	color: #f4bb0b;
	opacity: 1;
}
#lang {
	text-align: center;
	position: absolute;
	width: 100%;
	bottom: 20px;
}
#follow {
	position: absolute;
	bottom: 80px;
	padding: 0px 20px;
	text-align: center;
	width: 100%;
}
#follow img {
	margin: 5px;
	cursor: pointer;
}
.mask {
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	top: 0px;
	bottom: 0px;
	right: 0px;
	width: 100%;
	z-index: 999;
	display: none;
}
#nav-btn {
	position: absolute;
	right: 0px;
	top: 0px;
	width: 50px;
	text-align: center;
	cursor: pointer;
	height: 50px;
	line-height: 60px;
	user-select: none;
}
#mobile-nav {
	padding: 10px;
	left: 0px;
	width: 100%;
	position: relative;
	height: 50px;
	border-bottom: 1px solid #162340;
	position: fixed;
	top: 0px;
	line-height: 50px;
	background: #10172a;
	z-index: 9999998;
}
#top-res p {
	display: inline-block;
	margin-right: 20px;
}
#top-res {
	height: 60px;
	border-bottom: 1px solid #162340;
	position: fixed;
	top: 0px;
	width: 100%;
	left: 0px;
	padding-left: 280px;
	line-height: 60px;
	background: #10172a;
	z-index: 9998;
}
#nav-list li.active {
	background: #1d2b50 !important;
	opacity: 1;
}
#nav-list li {
	cursor: pointer;
	height: 40px;
	line-height: 40px;
	padding-left: 80px;
	margin-top: 10px;
	opacity: 0.6;
}
#nav-list li:hover {
	background: #0b101a;
	opacity: 1;
}
#nav-list li .per-icon {
	width: 40px;
	height: 40px;
	position: absolute;
	margin-left: -42px;
	text-align: center;
	font-size: 0px;
	line-height: 40px;
}
#nav-list {
	list-style: none;
	margin-top: 20px;
}
#app {
	padding: 20px;
	padding-left: 280px;
	padding-top: 70px;
}
#nav {
	user-select: none;
	width: 260px;
	position: fixed;
	top: 0px;
	bottom: 0px;
	border-right: 1px solid #162340;
	left: 0px;
	z-index: 9999;
	background: #10172a;
}
#logo {
	height: 50px;
	border-bottom: 1px solid #162340;
	padding: 10px;
	text-align: center;
}
</style>

