<style src="./style.css"></style>
<template>
	<div id='binance' >
		<div id="be-content">
			<div id="title">
				<img src="@/assets/bnft/titlebg.png" alt="" height="60">
				<h1 >{{$t("Withdraw_01")}}</h1>
			</div>
			<div class="mgt-30">
				<img src="@/assets/bnft/mlogo.png" id="mlogo" alt="" height="35">
			</div>

			<div style="flex:1;" class="mgt-30">
				<div class="bpanel" style="height: 500px;" >
					<div class="loading" v-if="hasApprove == '-' && connectWalletAddr != '' "><Loading :width="30" :height="30" /></div>
					<div v-if="connectWalletAddr =='' ">
						<img class="mgt-50" src="@/assets/bnft/walleticon.png" alt="" height="150">
						<div class="mgt-30">
							<button class="mgt-30 bbtn" @click="buttonClick">Connect Wallet</button>
						</div>
					</div>
					<div v-else style="padding:20px;" >
						<div v-if="state == 1" style="overflow: auto;height: 460px;" id="vcontent" class="tal">
							<div class="bmomo" v-for="item in dataList" :key="item.bToken">
								<img src="@/assets/bnft/momobg.png" alt="" style="width:150px;">
								<img class="bmomo-momo" :src="require(`@/assets/pet/${item.prototype}.png`)" alt="" width="150px">
								<span class="vtype" :class="`bg-new${item.vType}`"></span>
								<p class="mname">{{$t(item.tokenName)}}</p>
								<button class="mgt-10 babtn" style="zoom: 0.8" @click="approve(item)" v-if="needApprove(item)" :class="{gray: lockBtn.approveLock > 0}">
									<Loading v-if="lockBtn.approveLock > 0" />
									{{$t("Withdraw_02")}}
								</button>
								<button class="mgt-10 bcbtn" style="zoom: 0.8" @click="claim(item)" v-else :class="{gray: lockBtn.claimBNFTLock > 0}">
									<Loading v-if="lockBtn.claimBNFTLock > 0 && nowClaimItem.bToken == item.bToken" />
									{{$t("Withdraw_03")}}
								</button>
							</div>
						</div>
						<div v-if="state == 2" >
							<img style="margin-top:100px" src="@/assets/bnft/empty.png" alt="" height="80">
							<div style="color: #76746C">
								<h1 style="font-size: 50px;font-family:Verdana">Sorry</h1>
								<h2>{{$t("Withdraw_04")}}</h2>
							</div>
							<p class="mgt-50">{{connectWalletAddr}}</p>
							<button class="mgt-30 bbtn" style="zoom: 0.5" @click="buttonClick">{{$t("Withdraw_05")}}</button>
						</div>
					</div>
				</div>

				<div class="bpanel" style="margin-top: 30px;padding:20px"  >
					<h1 style="color: #fff">{{$t("Withdraw_09")}}</h1>
					<div class="faq-content tal mgt-10">
						<h3>{{$t("Withdraw_10")}}</h3>
						<p class="mgt-10">{{$t("Withdraw_11")}}</p>
					</div>
					<div class="faq-content tal mgt-10">
						<h3>{{$t("Withdraw_12")}}</h3>
						<p class="mgt-10">{{$t("Withdraw_13")}}</p>
					</div>
					<div class="faq-content tal mgt-10">
						<h3>{{$t("Withdraw_14")}}</h3>
						<p class="mgt-10">{{$t("Withdraw_15")}}</p>
					</div>
				</div>
			</div>

			<div id="success-claim" v-if="showSuccess && nowClaimItem.bToken != 0">
				<div class="bpanel whitebg animate__zoomIn animate__animated animate__faster " style="width: 420px;height: 520px;color:#000">
					<div id="title">
						<img src="@/assets/bnft/titlebg.png" alt="" height="50" class="gray">
						<h1 class="vertical-children" style="color:#000">
							<img src="@/assets/bnft/claim_s.png" alt="" height="30">
							<span class="mgl-5">{{$t("Withdraw_06")}}</span>
						</h1>
					</div>

					<div>
						<img class="mgt-30" src="@/assets/bnft/vbg.png" alt="" width="200px">
						<div style="position:absolute;left:0px;top:0px;width:100%">
							<img class="mgt-30" :src="require(`@/assets/pet/${nowClaimItem.prototype}.png`)" alt="" width="200px" >
						</div>
					</div>

					<h3 class="tac">{{$t(nowClaimItem.tokenName)}}</h3>
					<div class="mgt-50">
						<button class=" babtn" style="zoom: 0.8" @click="showSuccess= false">{{$t("Withdraw_07")}}</button>
					</div>
					<div class="mgt-20">
						<router-link to="/mypet">
							<button class="bvbtn" style="zoom: 0.8" >{{$t("Withdraw_08")}}</button>
						</router-link>
					</div>
				</div>
			</div>

		</div>
		
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { CommonMethod } from '@/mixin';
import { Wallet } from '@/utils';
import {BaseConfig} from "@/config";
import { Loading } from '@/components';

export default {
	components: {Loading},
	mixins: [CommonMethod],
	data(){
		return({
			state: 1,
			showSuccess: false,
			dataList: [],
			hasApprove: "-",
			hasApprove_new: "-",
			nowClaimItem: {
				bToken: 0,
				prototype: 0,
				tokenName: "",
			},
			hasShowNotice: false,
		})
	},
	computed: {
		...mapState({
			connectWalletAddr: (state) => state.globalState.data.connectWalletAddr,
			chainNetwork: (state) => state.globalState.data.chainNetwork,
			lockBtn: (state) => state.globalState.data.lockBtn,
			nowTs: (state) => state.globalState.data.nowTs,
		}),
	},
	watch: {
		connectWalletAddr: function(val, oldVal){
			console.log({val, oldVal});
			if(oldVal != ""){
				this.hasApprove = "-",
				this.initData();
			}
		},
		chainNetwork: function(val, oldVal){
			if(oldVal != 0){
				this.hasApprove = "-",
				this.initData();
			}
		},
		nowTs: function(ts){
			if(ts % 10 == 0){
				this.getMyNFTList();
			}
		}
	},
	async created(){
		this.initData();
	},
	methods: {
		needApprove(item){
			let isNew = item.bToken.indexOf("2124") != -1;
			let hasApprove = isNew? this.hasApprove_new: this.hasApprove;
			return !hasApprove && hasApprove != "-"
		},
		async initData(){
			await Wallet.ETH.getAccount();
			await this.getMyNFTList();
			await this.isApprovedForAll(false);
			await this.isApprovedForAll(true);
		},
		async claim(item){
			let bnNFTTokenId = item.bToken;
			console.log(bnNFTTokenId);
			if(this.lockBtn.claimBNFTLock > 0) return;
			let hash = await Wallet.ETH.Group.BinaceNFT.claim(bnNFTTokenId, ()=>{
				this.showSuccess = true;
				this.getMyNFTList();
			});
			if(hash){
				this.nowClaimItem = item;
				this.lockBtnMethod("claimBNFTLock");
			}
		},
		buttonClick(){
			if(this.connectWalletAddr == ""){
				this.oprDialog('connect-wallet-dialog','block');
			}else{
				if(this.chainNetwork == 56){
					this.oprDialog("connected-wallet-info-dialog", "block");
				}else{
					this.showNotify(this.$t("Common_23"), "error");
				}
			}
		},
		async approve(item){
			let isNew = item.bToken.indexOf("2124") != -1
			if(this.lockBtn.approveLock > 0) return;
			let hash = await Wallet.ETH.Group.BinaceNFT.approveForAll(()=>{
				this.isApprovedForAll(isNew);
			}, isNew);
			if(hash){
				this.lockBtnMethod("approveLock");
			}
		},
		async isApprovedForAll(isNew = false){
			let res = await Wallet.ETH.Group.BinaceNFT.isApprovedForAll(isNew);
			console.log(res, {isNew});
			if(isNew){
				this.hasApprove_new = res;
			}else{
				this.hasApprove = res;
			}
		},
		async getMyNFTList(){
			let res = await Wallet.ETH.Group.BinaceNFT.getMyNFTList();
			if(res && res.length != 0){
				this.state = 1;
				res = JSON.parse(JSON.stringify(res)).sort((a,b) => a-b);
				let res2 = await Wallet.ETH.Group.BinaceNFT.getBNFTData(res);
				this.dataList = [];
				let {prototypes, claimers} = res2;
				let needShowNotice = false;
				prototypes.map((item, pos)=>{
					if(item == 0){
						needShowNotice = true;
						return;
					}
					this.dataList.push({
						bToken: res[pos],
						prototype: item,
						claimer: claimers[pos],
						vType: parseInt(item / 1e4),
						...BaseConfig.NftCfg[item]
					});
				});
				if(needShowNotice && !this.hasShowNotice){
					this.getConfirmDialog().show(this.$t('Withdraw_15'), ()=>{
						this.hasShowNotice = true;
					}, true);
				}
			}else{
				this.state = 2;
			}
		}
	}
}
</script>
