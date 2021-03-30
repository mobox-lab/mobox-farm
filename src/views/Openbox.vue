<template>
	<div id="openbox" class="tac">
		<h1>{{ $t("BOX_01") }}</h1>
		<h1 class="gradientText dib mgt-20" style="font-size: 35px">
			{{ totalOpenBoxAmount.eth }}
		</h1>
		<br />
		<div class="por" style="height:300px">
			<div id="openbox-anime-new" class="hide"></div>
			<div class="animation-box mgt-50" id="openbox-anime"></div>
		</div>
		<br />

		<div>
			<div class="dib mgt-20" style="margin: 30px">
				<div class="ly-input-content dib">
					<p class="small tal opa-6">{{ $t("BOX_02") }}:</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  src="../assets/icon/key.png" alt="" />
						</div>
						<input class="ly-input" type="number"
							style=" background: #0f172a; text-align: center; width: 100%; "
							readonly="readonly"
							:value="ethState.box"
						/>
					</div>
				</div>
				<br />
				<button class="btn-primary mgt-20" style="width: 60%" @click=" oprDialog('get-box-dialog', 'block'); addKey = parseInt(ethState.box) || 1; " v-if="!needApprove">
					{{ $t("BOX_04") }}
				</button>
				<button class="btn-primary mgt-20" style="width: 60%" v-if="needApprove" @click="approve" >
					{{ $t("Air-drop_16") }}
				</button>
			</div>
			<div class="dib mgt-20" style="margin: 30px">
				<div class="ly-input-content dib">
					<p class="small tal opa-6">{{ $t("BOX_03") }}:</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img src="../assets/icon/box.png" alt="" />
						</div>
						<input class="ly-input" type="number"
							style=" background: #0f172a; text-align: center; width: 100%; "
							:value="canOpenBox"
							readonly="readonly"
						/>
					</div>
				</div>
				<br />
				<button class="btn-primary mgt-20" style="width: 60%"
					@click=" oprDialog('open-box-dialog', 'block'); openBox = canOpenBox > maxOpenOne ? maxOpenOne : canOpenBox || 1; ">
					{{ $t("BOX_05") }}
				</button>
			</div>
		</div>
		<!-- 记录 -->
		<table class="mgt-50 small table-his" border="0" frame="void" rules="none" >
			<tr>
				<th width="30%" class="tar">
					<span class="dib tac" style="width: 120px">
						{{ $t("BOX_12") }}
					</span>
				</th>
				<th width="20%">{{ $t("BOX_26") }}</th>
				<th width="10%">{{ $t("BOX_13") }}</th>
				<th width="20%">{{ $t("BOX_27") }}</th>
				<th width="40%" class="tal">{{ $t("BOX_14") }}</th>
			</tr>
			<tr v-for="item in getOpenBoxHistory" :key="item.tx">
				<td class="tar tac-xs">{{ getTimeFtt(item.crtime) }}</td>
				<td>{{ $t(eventToLang[item.event]) }}</td>
				<td>x{{ item.amount }}</td>
				<td class="vertical-children">
					<span v-if="item.state != 1 && item.state != -1">
						<img src="../assets/icon/loading.png" class="rotate" height="20" alt="" />&nbsp; {{ $t("Common_08") }}...
					</span>
					<span v-if="item.state == 1">{{ $t("Common_09") }}</span>
					<span v-if="item.state == -1">
						<svg  viewBox="0 0 1024 1024"  width="13" height="13"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF5B5C" p-id="3023"></path><path d="M328.988444 292.750222a17.066667 17.066667 0 0 1 24.120889 0L512 451.697778l158.890667-158.890667a17.066667 17.066667 0 0 1 24.120889 0l36.238222 36.238222a17.066667 17.066667 0 0 1 0 24.120889L572.302222 512l158.947556 158.833778a17.066667 17.066667 0 0 1 0 24.120889l-36.238222 36.238222a17.066667 17.066667 0 0 1-24.120889 0L512 572.302222l-158.833778 158.890667a17.066667 17.066667 0 0 1-24.120889 0l-36.238222-36.238222a17.066667 17.066667 0 0 1 0-24.120889L451.697778 512 292.750222 353.109333a17.066667 17.066667 0 0 1 0-24.120889l36.238222-36.238222z" fill="#FFFFFF"></path></svg>
						&nbsp;
						Fail
					</span>
				</td>
				<td class="tal">
					<img v-if="item.event == 'MintBox' && item.state == 1" @click="showHistoryDialog(item)" src="../assets/icon/view.png" alt="" class="cur-point" />&nbsp;
					<a :href="getTxUrl(item.tx)" target="_blank">
						<img src="../assets/icon/viewTx.png" alt="" class="cur-point" />
					</a>
				</td>
			</tr>
		</table>
		<Dialog id="open-box-history-dialog" :top="120" :width="660">
			<div class="dialog-content tal" style="height: 500px">
				<PetItemSmall v-for="item in showHistoryArr" :key="item.prototype.toString() + item.tokenId + item.num" :data="item" />
			</div>
		</Dialog>
		<Dialog id="get-box-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{ $t("BOX_04") }}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{ $t("BOX_06") }}:</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon">
						<img  src="../assets/icon/key.png" alt="" />
					</div>
					<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="parseInt(ethState.box) || 1" data-min="1" v-model="addKey" />
					<div class="dib" style="width: 30%">
						<button @click="addKey = parseInt(ethState.box) || 1" class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<div class="vertical-children tal mgt-10">
				<span class="small opa-6"> {{ $t("BOX_07") }}: {{ addKey }} </span>
				<img src="../assets/icon/box.png" height="20" alt="" />
			</div>
			<div class="mgt-20 tal">
				<p class="small opa-6" v-html="$t('BOX_08')"></p>
			</div>
			<button @click="addBox(addKey)" class="btn-primary mgt-30" style="width: 70%; margin-bottom: 20px" >
				{{ $t("BOX_09") }}
			</button>
		</Dialog>
		<Dialog id="open-box-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{ $t("BOX_05") }}</h2>
			<div class="ly-input-content mgt-20">
				<p class="small tal opa-6">{{ $t("BOX_10") }}:</p>
				<div class="por mgt-5">
					<div class="ly-input-pre-icon"> <img  src="../assets/icon/box.png" alt="" /> </div>
					<input class="ly-input dib" type="text"
						style=" text-align: center; width: 70%; padding-left: 50px; "
						v-int :data-max="maxOpenOne" data-min="1" v-model="openBox" />
					<div class="dib" style="width: 30%">
						<button @click=" openBox = canOpenBox > maxOpenOne ? maxOpenOne : canOpenBox || 1 " class="btn-primary btn-small" style="width: 80%" >
							Max
						</button>
					</div>
				</div>
			</div>
			<button @click="open(openBox, true)" class="btn-primary mgt-30" style="width: 70%;" >
				{{ $t("BOX_11") }}
			</button>
			<button @click="open(openBox)" class="btn-primary mgt-10" style="width: 70%; margin-bottom: 20px" >
				{{ $t("BOX_05") }}
			</button>
		</Dialog>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { Wallet, Common, EventBus } from "@/utils";
import { Dialog, PetItemSmall } from "@/components";
import CommonMethod from "@/mixin/CommonMethod";
import { BaseConfig, WalletConfig, EventConfig } from "@/config";
import lottie from "lottie-web";

let timer = null;
export default {
	mixins: [CommonMethod],
	components: { Dialog, PetItemSmall },
	data() {
		return {
			showHistoryArr: [],
			openBox: 1,
			addKey: 1,
			eventToLang: {
				HashBox: "BOX_24",
				AddBox: "BOX_23",
				MintBox: "BOX_25",
			},
			maxOpenOne: 10,
		};
	},
	computed: {
		...mapState({
			ethState: (state) => state.ethState.data,
			totalOpenBoxAmount: (state) => state.globalState.data.totalOpenBoxAmount,
		}),
		canOpenBox() {
			let { canOpenBox, orderBlockHash, openBoxTemp } = this.ethState;
			if (orderBlockHash =="0x0000000000000000000000000000000000000000000000000000000000000001") {
				canOpenBox = 0;
			}
			let needReduceBox = 0;
			openBoxTemp.map((item) => {
				if(item.state == 0){
					needReduceBox += Number(item.amount);
				}
			});
			canOpenBox -= needReduceBox;
			if (canOpenBox < 0) canOpenBox = 0;
			return canOpenBox;
		},
		getOpenBoxHistory() {
			let { openBoxTemp, openBoxHistory } = this.ethState;
			//去重
			let historyObj = {};
			openBoxHistory.map((item) => {
				historyObj[item.tx] = item;
			});
			openBoxTemp.map((item, index) => {
				if (historyObj[item.tx] == undefined) {
					historyObj[item.tx] = item;
				}else{
					openBoxTemp.splice(index, 1);
				}
			});

			this.$store.commit("ethState/setData", {
				openBoxTemp,
			});

			return Object.values(historyObj).sort((a,b)=>b.crtime - a.crtime);
		},
		needApprove() {
			return (this.ethState.allowance_box_to_minter != -1 && Number(this.ethState.allowance_box_to_minter) < 100);
		},
	},

	mounted() {
		EventBus.$on(EventConfig.OpenBoxConfirm, this.stopBoxAnime);
		EventBus.$on(EventConfig.OpenBoxFail, this.stopBoxAnime);
		EventBus.$emit(EventConfig.OpenBoxHistory, { chain: "eth" });

		timer = setInterval(() => {
			if (this.ethState.openBoxTemp.length != 0) {
				EventBus.$emit(EventConfig.OpenBoxHistory, { chain: "eth" });
			}
		}, 2000);


		// document.getElementById("openbox-anime").classList.add("animation-box-start");

		let a = lottie.loadAnimation({
			container: document.getElementById("openbox-anime-new"), // the dom element that will contain the animation
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: './animation/boxAnime/open.json' // the path to the animation json
		});
		console.log(a);

		// setTimeout(()=>{
		// 	document.getElementById("openbox-anime").classList.remove("animation-box-start");
		// 	window.$("#openbox-anime").hide();
		// 	window.$("#openbox-anime-new").show();
		// 	a.play();
		// }, 3000)

	},
	beforeDestroy() {
		EventBus.$off(EventConfig.OpenBoxConfirm, this.stopBoxAnime);
		EventBus.$off(EventConfig.OpenBoxFail, this.stopBoxAnime);
		if (timer != null) clearInterval(timer);
	},
	methods: {
		//开箱子合约确认
		async stopBoxAnime() {
			document.getElementById("openbox-anime").classList.remove("animation-box-start");
		},

		getTxUrl(tx) {
			return WalletConfig.ETH.view_tx_url + tx;
		},
		showHistoryDialog(item) {
			let { tokenIds, ids, amounts, tokens } = item;
			let showHistoryArr = [];
			//先生成721的数据
			tokenIds.map((item, key) => {
				let {category,hashrate,prototype,quality,specialty} = tokens[(item, key)];
				showHistoryArr.push({
					prototype,
					quality,
					category,
					level: 1,
					specialty,
					hashrate,
					lvHashrate: hashrate,
					vType: parseInt(prototype / 1e4),
					num: 1,
					tokenId: item,
				});
			});
			//再生成1155的数据
			ids.map((item, key) => {
				if (item == 0) return;
				let { quality, category } = BaseConfig.NftCfg[item];
				showHistoryArr.push({
					prototype: item,
					quality,
					category,
					level: 1,
					specialty: 0,
					hashrate: quality,
					lvHashrate: quality,
					vType: parseInt(item / 1e4),
					num: Number(amounts[key]),
					tokenId: 1,
				});
			});
			showHistoryArr.sort((a, b) => {
				return b.lvHashrate - a.lvHashrate;
			});
			this.showHistoryArr = showHistoryArr;
			this.oprDialog("open-box-history-dialog", "block");
		},
		getTimeFtt(timeStep) {
			return Common.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(timeStep * 1000));
		},
		async approve() {
			let res = await Wallet.ETH.approveBoxToMinter();
			if (res) {
				this.showNotify(this.$t("BOX_20"), "success")
			}
		},
		async addBox(num) {
			if (num > this.ethState.box) {
				this.showNotify(this.$t("BOX_28"), "error")
				return;
			}
			if (this.ethState.canOpenBox > 0) {
				this.showNotify(this.$t("BOX_29"), "error")
				return;
			}
			let allowance_box_to_minter = this.ethState.allowance_box_to_minter;
			if (allowance_box_to_minter == -1) {
				allowance_box_to_minter = await Wallet.ETH.boxAllowanceToMinter();
				this.$store.commit("ethState/setData", {allowance_box_to_minter,});
			}
			if (Number(allowance_box_to_minter) > Number(num)) {
				let hash = await Wallet.ETH.addBox(num);
				if(hash){
					this.oprDialog("get-box-dialog", "none");
				}
			} else {
				this.approve();
			}
		},

		//默认打开并质押
		async open(num, stake = false) {
			if (this.canOpenBox >= num) {
				let hash;
				if(stake){
					hash = await Wallet.ETH.openBoxAndStake(num);
				}else{
					hash = await Wallet.ETH.openBox(num)
				}
				if (hash) {
					//播放箱子动画
					document.getElementById("openbox-anime").classList.add("animation-box-start");
					this.oprDialog("open-box-dialog", "none");

					let myAddr = await Wallet.ETH.getAccount();
					//临时添加一条记录
					let tempRecord = {
						address: myAddr,
						amount: num,
						amounts: [],
						chain: "ETH",
						crtime: Number((new Date().valueOf() / 1000).toFixed(0)) + 60,
						event: "MintBox",
						id: 0,
						ids: [],
						state: 0,
						tokenIds: [],
						tokens: [],
						tx: hash,
					};
					let { openBoxTemp } = this.ethState;
					openBoxTemp.unshift(tempRecord);
					this.$store.commit("ethState/setData", {openBoxTemp,});
				}
			} else {
				this.showNotify(this.$t("BOX_30"), "error")
			}
		},
		
	},
};
</script>

<style >
#openbox-anime-new{
	height: 300px;
	position: absolute;
	left: 415px;
	top: 33px;
}
#opr-btn button {
	width: 200px;
	margin: 10px 20px;
}
#my-box-num {
	background: #1d2b50;
	height: 40px;
	border-radius: 30px;
	padding: 0px 30px;
	line-height: 40px;
	font-size: 16px;
	margin-top: 60px;
}
#openbox-anime {
	margin: 50px 0px;
}

@media (max-width: 768px) {
	#openbox-anime {
		margin: 10px !important;
		zoom: 0.5;
	}
	.table-his td{
		padding: 5px;
	}
}

.animation-box {
	width: 256px;
	height: 256px;
	background-image: url("../assets/anime/box.png");
	background-size: 2048px 256px;
	background-repeat: no-repeat;
	animation-duration: 0.6s;
	animation-delay: 0s;
	animation-iteration-count: infinite;
	animation-fill-mode: forwards;
	animation-timing-function: steps(1);
	display: inline-block;
}

.animation-box-start {
	animation-name: keyframes-box;
}

@keyframes keyframes-box {
	0% {
		width: 256px;
		height: 256px;
		background-image: url("../assets/anime/box.png");

		background-size: 2048px 256px;
	}

	12.50% {
		background-position: -256px 0px;
	}

	25.00% {
		background-position: -512px 0px;
	}

	37.50% {
		background-position: -768px 0px;
	}

	50.00% {
		background-position: -1024px 0px;
	}

	62.50% {
		background-position: -1280px 0px;
	}

	75.00% {
		background-position: -1536px 0px;
	}

	87.50%,
	100% {
		background-position: -1792px 0px;
	}
}
</style>
