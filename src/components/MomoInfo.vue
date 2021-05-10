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
				<div v-if="getNowPetItem.location=='wallet'" :class="needApprove?'btn-group':''">
					<div v-if="needApprove">
						<button data-step="1"  :class="needApprove && lockBtn.approveLock <= 0?'':'disable-btn' "  style="width:200px" class="btn-primary por" @click="needApprove && lockBtn.approveLock <= 0 && approveNftToStake()" > 
							<Loading class="btn-loading" :width="15" :height="15" v-if="lockBtn.approveLock > 0"  />{{$t("Air-drop_16")}} MOMO 
						</button>
					</div>
					<div class="mgt-10">
						<button data-step="2"  :class="canShowStake && lockBtn.stakeLock <= 0?'':'disable-btn' " style="width:200px" class="btn-primary por" @click="canShowStake && lockBtn.stakeLock <= 0 && stakeNft()" > 
							<Loading class="btn-loading" :width="15" :height="15" v-if="lockBtn.stakeLock > 0"  />{{$t("MOMO_44")}} 
						</button>
					</div>
				</div>
		
				<div v-if="getNowPetItem.location=='stake'">
					<button  :class="lockBtn.unStakeLock <= 0?'':'disable-btn' " class="btn-primary por" @click="lockBtn.unStakeLock <= 0 && oprDialog('unstake-confirm-dialog', 'block')" > 
						<Loading class="btn-loading" :width="15" :height="15" v-if="lockBtn.unStakeLock > 0"  />{{$t("MOMO_45")}} 
					</button>
				</div>
			</div>
		</div>

		<!-- 宝石相关功能 -->
		<div v-if="getNowPetItem.vType >= 4 && !isMarket && getNowPetItem.location=='stake'">
			<h3 class="mgt-10" >{{$t("MOMO_40")}}</h3>
			<div class="ly-input-content mgt-10">
				<div class="aveage-box tac mgt-10">
					<div  v-for="item in ['red', 'green','blue','yellow']" :key="item"  class="tac">
						<div class="gem-item por" style="max-width:80px" @click="oprDialog('gemBag-dialog','block')">
							<img :class="{'opa-3': item=='red'}" :src="require(`@/assets/gem/${item}_1.png`)" alt="" width="100%">
							<svg v-if="item=='red' " style="position:absolute;right:3px;top:3px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
								<path  fill="#E1FF17" d="M867.7 423.8H599.8V155.9c0-49.3-40-89.3-89.3-89.3s-89.3 40-89.3 89.3v267.9H153.3c-49.3 0-89.3 40-89.3 89.3s40 89.3 89.3 89.3h267.9v267.9c0 49.3 40 89.3 89.3 89.3s89.3-40 89.3-89.3V602.4h267.9c49.3 0 89.3-40 89.3-89.3s-40-89.3-89.3-89.3z" ></path>
							</svg>
							<svg v-else style="position:absolute;right:3px;top:3px;transform: rotate(270deg);"  viewBox="0 0 1024 1024" width="15" height="15"  >
								<path fill="#E1FF17" d="M583.586909 555.473455a62.091636 62.091636 0 0 0 0-86.94691L151.970909 30.138182a60.113455 60.113455 0 0 0-85.783273 0 62.045091 62.045091 0 0 0 0 86.946909L454.981818 512 66.210909 906.938182a62.045091 62.045091 0 0 0 0 86.923636 60.043636 60.043636 0 0 0 85.783273 0l431.592727-438.388363zM440.459636 117.061818L829.160727 512 440.413091 906.938182a62.045091 62.045091 0 0 0 0 86.923636 60.090182 60.090182 0 0 0 85.806545 0l431.569455-438.388363a62.091636 62.091636 0 0 0 0-86.94691L526.196364 30.138182a60.136727 60.136727 0 0 0-85.806546 0 62.045091 62.045091 0 0 0 0.023273 86.923636z"></path>
							</svg >
							<Loading style="position:absolute;left:3px;top:3px;" :width="20" :height="20"  />
						</div>
						<div class="tac mgt-10">
							<StatuButton :isLoading="true" class="btn-small" style="width:100%;max-width:80px">移除</StatuButton>
						</div>
					</div>
				</div>

				<div class="por mgt-30" style="height:50px;width:100%;">
					<div class="gemBag" @click="oprDialog('gemBag-dialog','block')">
						<img  src="../assets/icon/gem_bag_icon.png" alt="">
						<p class="stroke" data-text="宝石背包">宝石背包</p>
					</div>
				</div>
			</div>
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

		<Dialog id="unstake-confirm-dialog" :top="180" :width="350">
			<p class="mgt-30 tal">{{$t("MOMO_46")}}</p>
			<div class="mgt-50">
				<button class="btn-default" @click="oprDialog('unstake-confirm-dialog', 'none')">{{$t("Common_04")}}</button>
				<button class="btn-primary mgl-10" @click="unStakeNftConfirm()">{{$t("Common_03")}}</button>
			</div>
		</Dialog>

	</div>
</template>
<script>
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from '@/utils';
import { Loading, Dialog, StatuButton } from '@/components';
import { WalletConfig } from "@/config";
import { mapState } from 'vuex';

let timer = null;
export default {
	components: {Loading, Dialog, StatuButton},
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
		needApprove() {
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
		async unStakeNftConfirm(){
			this.oprDialog('unstake-confirm-dialog', 'none');
			//判断是否参与了高级申购
			let hasHighApply = await Wallet.ETH.hasHighApply();
			if(!hasHighApply){
				this.showNotify(this.$t("Gemstone_38"), "error");
				return;
			}
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
.gem-item{
	display: inline-block;
	width: 100%;
	background: #10172A;
	border-radius: 10px;
	cursor: pointer;
	position: relative;
	user-select: none;
}
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
