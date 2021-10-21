<style src="./style.css"></style>
<template>
	<div id='binance' >
		<div id="be-content">
			<div id="title">
				<img src="@/assets/bnft/titlebg.png" alt="" height="60">
				<h1  >Binance NFT 兑换</h1>
			</div>
			<div class="mgt-30">
				<img src="@/assets/bnft/mlogo.png" id="mlogo" alt="" height="35">
			</div>

			<div style="flex:1;" class="mgt-30">
				<div class="bpanel" style="height: 500px;" >
					<div v-if="connectWalletAddr =='' ">
						<img class="mgt-50" src="@/assets/bnft/walleticon.png" alt="" height="150">
						<div class="mgt-30">
							<p style="width:80%;margin:0px auto">This unique feisty little guy blocks any unwanted predators from getting through to protect his community.Watch him flex in and out of ledgers of information adapting morphing and blocking any evil.</p>
							<button class="mgt-30 bbtn" @click="buttonClick">Connect Wallet</button>
						</div>
					</div>
					<div v-else style="padding:20px;" class="tal">
						<div v-if="state == 1" style="overflow: auto;height: 460px;" id="vcontent">
							<div class="bmomo" v-for="item in 10" :key="item">
								<img src="@/assets/bnft/momobg.png" alt="" style="width:150px;">
								<img class="bmomo-momo" src="@/assets/pet/50092.png" alt="" width="150px">
								<span class="vtype bg-new6" ></span>
								<p class="mname">Bino Binancian Bot</p>
								<button class="mgt-10 bcbtn" style="zoom: 0.8" @click="showSuccess = true">授权兑换</button>
							</div>
						</div>
						<div v-if="state == 2" >
							<img style="margin-top:100px" src="@/assets/bnft/empty.png" alt="" height="80">
							<div style="color: #76746C">
								<h1 style="font-size: 50px;font-family:Verdana">Sorry</h1>
								<h2>你没有可认领的MOMO</h2>
							</div>
							<p class="mgt-50">{{connectWalletAddr}}</p>
							<button class="mgt-30 bbtn" style="zoom: 0.5" @click="buttonClick">切换账号</button>
						</div>
					</div>
				</div>
			</div>

			<div id="success-claim" v-if="showSuccess">
				<div class="bpanel whitebg" style="width: 420px;height: 520px;color:#000">
					<div id="title">
						<img src="@/assets/bnft/titlebg.png" alt="" height="50" class="gray">
						<h1 class="vertical-children" style="color:#000">
							<img src="@/assets/bnft/claim_s.png" alt="" height="30">
							<span class="mgl-5">认领成功</span>
						</h1>
					</div>

					<div>
						<img class="mgt-30" src="@/assets/bnft/vbg.png" alt="" width="200px">
						<div style="position:absolute;left:0px;top:0px;width:100%">
							<img class="mgt-30" src="@/assets/pet/50092.png" alt="" width="200px" >
						</div>
					</div>

					<h3 class="tac">Bino Binancian Bot</h3>
					<div class="mgt-50">
						<button class=" bcbtn" style="zoom: 0.8" @click="showSuccess= false">继续认领</button>
					</div>
					<div class="mgt-20">
						<router-link to="/mypet">
							<button class="bvbtn" style="zoom: 0.8" >在农场中查看</button>
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

export default {
	mixins: [CommonMethod],
	data(){
		return({
			state: 1,
			showSuccess: false,
		})
	},
	computed: {
		...mapState({
			connectWalletAddr: (state) => state.globalState.data.connectWalletAddr,
			chainNetwork: (state) => state.globalState.data.chainNetwork,
		}),
	},
	methods: {
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
		}
	}
}
</script>
