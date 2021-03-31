<template>
	<div>
		<!-- 质押状态 -->
		<div v-if="!isMarket">
			<h3 >{{$t("MOMO_41")}}</h3>
			<p class="mgt-10 small opa-6">
				<span v-if="getNowPetItem.location=='stake'">{{$t("MOMO_42")}}</span>
				<span v-if="getNowPetItem.location=='wallet'">{{$t("MOMO_43")}}</span>
			</p>
			<div class="tac mgt-20">
				<div v-if="getNowPetItem.location=='wallet'">
					<button  :class="canShowApprove && lockBtn.approveLock <= 0?'':'disable-btn' " class="btn-primary por" @click="canShowApprove && lockBtn.approveLock <= 0 && approveNftToStake()" > 
						<Loading class="btn-loading" :width="15" :height="15" v-if="lockBtn.approveLock > 0"  />{{$t("Air-drop_16")}} MOMO 
					</button>
					<button  :class="canShowStake && lockBtn.stakeLock <= 0?'':'disable-btn' " class="btn-primary por mgl-5" @click="canShowStake && lockBtn.stakeLock <= 0 && stakeNft()" > 
						<Loading class="btn-loading" :width="15" :height="15" v-if="lockBtn.stakeLock > 0"  />{{$t("MOMO_44")}} 
					</button>
				</div>
		
				<div v-if="getNowPetItem.location=='stake'">
					<button  :class="lockBtn.unStakeLock <= 0?'':'disable-btn' " class="btn-primary por" @click="lockBtn.unStakeLock <= 0 && unStakeNft()" > 
						<Loading class="btn-loading" :width="15" :height="15" v-if="lockBtn.unStakeLock > 0"  />{{$t("MOMO_45")}} 
					</button>
				</div>
			</div>
		</div>

		<!-- 宝石相关功能 -->
		<div v-if="getNowPetItem.vType >= 4 && !isMarket && getNowPetItem.location=='stake'">
			<h3 class="mgt-10" >{{$t("MOMO_40")}}</h3>
			<p class="mgt-10 small opa-6">
				{{$t("Common_05")}}
			</p>
		</div>

		<!-- 升级记录 -->
		<div v-if="levelUpInfo.length > 0 " >
			<h3 class="por mgt-20">{{$t("MOMO_34")}}
				<span class="refrash" @click="getLevelupInfo">
					<Loading :width="20" :height="20" :isRotate="loading.upgrade" />
				</span>
			</h3>
			<div style="max-height: 300px; overflow-y: auto" class="mgt-10">
				<div class=" por pet-des" v-for="item in levelUpInfo" :key="item.crtime" >
					<div style=" position: absolute; top: 0px; left: 0px; width: 100%; padding: 5px 10px; " >
						<table style="width: 100%" class="small">
							<tr>
								<td class="tal">{{ shorAddress(item.owner) }}</td>
								<td class="tar">{{ dateFtt( "yyyy-MM-dd hh:mm:ss", new Date( item.crtime * 1000) ) }}</td>
							</tr>
						</table>
					</div>
					<p class="vertical-children tac mgt-10">
						<span>LV {{ item.lastLevel }}</span>
						<img src="../assets/icon/upgradejt.png" alt="" class="mgl-10" />
						<span class="mgl-10" >LV {{ item.newLevel }}</span>
					</p>
					<div class="vertical-children mgt-10 tac" style="font-size: 18px" >
						<img src="../assets/icon/airdrop.png" height="25" alt="" />&nbsp;
						<span>{{ item.lastHashrate }}</span>
						<img src="../assets/icon/upgradejt.png" alt="" class="mgl-10" />
						<img src="../assets/icon/airdrop.png" alt="" class="mgl-10" height="25" />&nbsp;
						<span style="color: #85f34a">
							{{ item.curHashrate }}
						</span>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 交易记录 -->
		<div v-if="tradeHistory.length > 0">
			<h3  class="por mgt-20">
				{{ $t("Market_24") }}
				<span class="refrash" @click="getMomoTradeHistory">
					<Loading :width="20" :height="20" :isRotate="loading.trade" />
				</span>
			</h3>
			<div  style="max-height: 300px; overflow-y: auto" class="mgt-10">
				<div class="history-item " v-for="item in tradeHistory" :key="item.tx" >
					<div class="row tal opa-6">
						<div class="col-md-4 col-xs-4 ">{{$t("Market_25")}}</div>
						<div class="col-md-4 col-xs-4 tac">{{$t("Market_26")}}</div>
						<div class="col-md-4 col-xs-4 tar">{{$t("Market_17")}}</div>
					</div>
					<div class="row tal cur-point por" style="background:#2E3F6B;border-radius:6px;padding:5px;">
						<table class="pj-table">
							<tr style="color:#fff">
								<td>{{shorAddress(item.bidder)}}</td>
								<td class="tac">{{shorAddress(item.auctor)}}</td>
								<td class="tar">
									{{numFloor(item.bidPrice / 1e9, 100)}} BUSD
									<p style="color:#6481b0;zoom:0.8;" >{{dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.crtime * 1000))}}</p></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!-- 故事记录 -->
		<div v-if="hasStorySkill && getNowPetItem.location!='wallet' ">
			<div v-if="!isMarket">
				<h3  class="mgt-20">{{ $t("MOMO_24") }}</h3>
				<div class="mgt-10">
					<textarea id="input-des" v-model="inputStory" name="" cols="30" rows="10" :placeholder="$t('MOMO_38')" maxlength="256"></textarea>
				</div>
				<span class="small mgt-10 opa-6">{{$t("MOMO_25")}}({{nowLen}}/256)</span>
				<div class=" tac">
					<button class="btn-primary" :class="inputStory == '' ? 'disable-btn':'' " @click="submitStory">{{$t("Common_03")}}</button>
				</div>
			</div>

			<h3 v-if="storyList.length > 0"  class="mgt-20 por" >{{ $t("MOMO_26") }}
				<span class="refrash" @click="getStory">
					<Loading :width="20" :height="20" :isRotate="loading.story" />
				</span>
			</h3>
			<div class="mgt-10" style="max-height:200px;overflow:auto">
				<div class="pet-des-item" v-for="item in storyList" :key="item.tx">
					<table style="width:100%" class="small opa-6">
						<tr>
							<td>{{shorAddress(item.owner)}}</td>
							<td class="tar">{{dateFtt("yyyy-MM-dd hh:mm:ss", new Date(item.crtime * 1000))}}</td>
						</tr>
					</table>
					<div class="mgt-10" style="word-break: break-all">{{item.storyInfo}}</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { Loading } from '@/components';
import { WalletConfig } from "@/config";
import { mapState } from 'vuex';

let timer = null;
export default {
	components: {Loading},
	mixins: [CommonMethod],
	data() {
		return {
			tradeHistory: [],
			levelUpInfo: [],
			storyList: [],
			inputStory: "",
			nowLen: 0,
			loading: {
				trade: false,
				upgrade: false,
				story: false
			}
		};
	},
	watch: {
		inputStory(newInput, oldInput){
			let len = Wallet.ETH.getStrLen(newInput);
			this.nowLen = len;
			if(len >256){
				this.inputStory = oldInput;
				this.nowLen = 256;
			}
		}
	},
	props: ["data", "isMarket"],
	created(){
		this.getLevelupInfo();
		this.getStory();
		this.getMomoTradeHistory();
		
		if(timer) clearInterval(timer);
		timer = setInterval(()=>{
			this.getLevelupInfo();
			this.getStory();
		}, 10000);
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	computed: {
		...mapState({
			allowance_1155_to_stake: (state) =>state.ethState.data.allowance_1155_to_stake,
			allowance_721_to_stake: (state) =>state.ethState.data.allowance_721_to_stake,
			lockBtn: (state) =>state.globalState.data.lockBtn,
		}),
		hasStorySkill(){
			let {speciality, specialty} = this.getNowPetItem;
			if(speciality == undefined) speciality = specialty;
			return speciality == 2 || speciality == 3
		},
		getNowPetItem(){
			return this.data;
		},
		canShowApprove() {
			let vType = this.getNowPetItem.vType;
			return (
				(vType < 4 && this.allowance_1155_to_stake == 0) ||
				(vType >= 4 && this.allowance_721_to_stake == 0)
			);
		},
		canShowStake() {
			let vType = this.getNowPetItem.vType;
			return (
				(vType < 4 && this.allowance_1155_to_stake == 1) ||
				(vType >= 4 && this.allowance_721_to_stake == 1)
			);
		},
	},
	methods: {
		//授权NFT给质押合约
		async approveNftToStake() {
			let { vType } = this.getNowPetItem;
			let hash;
			if (vType < 4) {
				hash = await Wallet.ETH.approve1155ToTargetToken(WalletConfig.ETH.moMoStake);
			} else {
				hash = await Wallet.ETH.approve721ToTargetToken(WalletConfig.ETH.moMoStake);
			}
			if (hash) {
				this.$store.commit("globalState/lockBtn", "approveLock");
			}
		},
		//质押
		async stakeNft() {
			let { prototype, tokenId, vType, num } = this.getNowPetItem;
			let erc1155ids = [];
			let erc1155Num = [];
			let erc721TokenIds = [];
			if (vType < 4) {
				erc1155ids.push(prototype);
				erc1155Num.push(num);
			} else {
				erc721TokenIds.push(tokenId);
			}
			let hash = await Wallet.ETH.stakeNft(erc1155ids,erc1155Num,erc721TokenIds);
			if (hash) {
				this.$store.commit("globalState/lockBtn", "stakeLock");
			}
		},
		//取消质押
		async unStakeNft(){
			let { prototype, tokenId, vType, num } = this.getNowPetItem;
			let erc1155ids = [];
			let erc1155Num = [];
			let erc721TokenIds = [];
			if (vType < 4) {
				erc1155ids.push(prototype);
				erc1155Num.push(num);
			} else {
				erc721TokenIds.push(tokenId);
			}
			let hash = await Wallet.ETH.unStakeNft(erc1155ids,erc1155Num,erc721TokenIds);
			if (hash) {
				this.$store.commit("globalState/lockBtn", "unStakeLock");
			}
		},
		async getMomoTradeHistory(){
			if(this.getNowPetItem.tokenId == 1 || this.getNowPetItem.tokenId == 0 || this.loading.trade) return;
			this.loading.trade = true;
			let data = await Http.getMomoAuctionHistory(this.getNowPetItem.tokenId);
			this.loading.trade = false;
			if (data) {
				this.tradeHistory = data.list;
			}
		},
		//获取当前升级
		async getLevelupInfo() {
			if(this.getNowPetItem.tokenId == 1  ||  this.getNowPetItem.tokenId == 0 || this.loading.trade) return;
			this.loading.upgrade = true;
			let data = await Http.getLevelupInfo(this.getNowPetItem.tokenId);
			this.loading.upgrade = false;
			if (data) {
				this.levelUpInfo = data.logs;
			}
		},

		//获取momo的故事
		async getStory(){
			let { tokenId, speciality, specialty } = this.getNowPetItem;
			if(speciality == undefined) speciality = specialty;
			if(tokenId != 1 && (speciality == 3 || speciality == 2)){
				if(this.loading.story) return;
				this.loading.story = true;
				let story = await Http.getStory(tokenId);
				this.loading.story = false;
				if(story){
					this.storyList = story.logs;
				}
			}
		},

		//提交故事
		async submitStory(){
			if(this.inputStory == "") return;
			let { tokenId } = this.getNowPetItem;
			let lastEdit = this.storyList[0];
			let myAddr = await Wallet.ETH.getAccount();
			if(lastEdit && lastEdit.owner.toLocaleLowerCase() == myAddr.toLocaleLowerCase()){
				this.showNotify(this.$t("MOMO_39"), "error");
				return;
			}

			let storys = await Wallet.ETH.getMomoStoryByTokenId(tokenId);
			let res = await Wallet.ETH.setMomoStoryByTokenId(tokenId,this.inputStory,storys.length == "");
			if (res) {
				this.inputStory = "";
			}
		},
	},
};
</script>

<style scoped>
.pet-des {
	background: #10172a;
	border-radius: 10px;
	padding: 15px;
	width: 100%;
	min-height: 100px;
	display: inline-block;
	margin-bottom: 10px;
}
.pet-des-item{
	background: #10172A;
	font-size: 12px;
	margin: 5px 0px;
	padding: 10px;
	border-radius: 5px;
}
textarea::-webkit-input-placeholder {
	color: #5C76A2;
      font-size: 0.14rem;
}
#input-des{
	background: #10172A;
	color: #5C76A2;
	border: none;
	border-radius: 5px;
	padding: 5px;
	width: 100%;
	resize: none;
	height: 100px;
	font-weight: 800;
}

</style>
