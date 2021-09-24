<template>
	<!-- 进化相关功能 -->
	<div class="mgt-20" v-if="getNowPetItem.vType == 4 || getNowPetItem.vType == 5">
		<h3>进化</h3> 
		<div class="ly-input-content mgt-10" style="padding-bottom:20px">
			<p class="small opa-6">初始算力(LV.1)</p>
			<div class="mgt-10" style="font-size:18px">
				<img src="@/assets/icon/airdrop.png" height="25" alt="" />&nbsp;
				<span>{{ getNowPetItem.hashrate }}</span>
				<img src="@/assets/icon/upgradejt.png" alt="" class="mgl-10" />
				<img src="@/assets/icon/airdrop.png" alt="" class="mgl-10" height="25" />&nbsp;
				<span style="color: #85f34a">{{ getNowPetItem.hashrate+1 }}-{{ getNowPetItem.hashrate+5 }}</span>
			</div>
			<div class="ovh bold aveage-box tac mgt-10"  style="background:rgba(0,0,0,0.3);border-radius: 15px;padding:10px;font-size:14px; display:flex">
				<div class="vertical-children" v-for="item in 5" :key="item">
					<img :src="require(`@/assets/icon/up_icon${item}.png`)" alt="" height="20">
					<div class="dib mgl-5 tal" style="line-height:15px">
						<p>{{[0,"36%","36%","22%","5%","1%"][item]}}</p>
						<p class="vertical-children">
							<span :class="'c-lv'+item ">+{{item}}</span>
							<img src="@/assets/icon/airdrop.png" alt="" class="mgl-5"  height="12" />
						</p>
					</div>
				</div>
			</div>
			<template v-if="getNowPetItem.level > 1">
				<p class="small opa-6 mgt-20">当前算力(LV.{{getNowPetItem.level}})</p>
				<div class="mgt-10"  style="font-size:18px">
					<img src="@/assets/icon/airdrop.png" height="25" alt="" />&nbsp;
					<span>{{ getNowPetItem.lvHashrate }}</span>
					<img src="@/assets/icon/upgradejt.png" alt="" class="mgl-10" />
					<img src="@/assets/icon/airdrop.png" alt="" class="mgl-10" height="25" />&nbsp;
					<span style="color: #85f34a">{{ getTargetLevelHashPower(getNowPetItem.hashrate+1) }}-{{ getTargetLevelHashPower(getNowPetItem.hashrate+5) }}</span>
				</div>
			</template>
			<p class="small opa-6 mgt-20">本次进化需要先注入</p>
			<div class=" mgt-10" style="background:rgba(0,0,0,0.3);border-radius: 15px;padding:10px;font-size:18px; display:flex">
				<div class="dib vertical-childrem" style="flex:1;color:#fff">
					<div>
						<img src="@/assets/coin/CRYSTAL.png" class="mgl-5" alt="" height="25" />
						{{getNowEnhanceCfg.crystal}} <sub class="small">MEC</sub> 
						<span style="color:#12D2E7;" class="mgl-5">+</span>
						<img src="@/assets/coin/MBOX.png" class="mgl-5" alt="" height="25" />
						<span class="mgl-5">{{getNowEnhanceCfg.mbox}} <sub class="small">MBOX</sub></span> 
					</div>
					<div class="mgt-10">
						<StatuButton class="btn-small" :onClick="approveMEC" :isLoading="lockBtn.approveLock > 0" v-if="needApproveMec">授权MEC</StatuButton>
						<StatuButton class="mgl-10 btn-small" :onClick="approveMbox" v-if="needApproveMbox" :isLoading="coinArr['MBOX'].isApproving">授权MBOX</StatuButton>
					</div>
					
				</div>
				<div class="dib">
					<StatuButton class="btn-line btn-small" :onClick="addCrystal" :isDisable="Number(enhanceHash) >= 2">
						<span v-if="Number(enhanceHash) == 2">已注入</span>
						<span v-else>注入</span>
					</StatuButton>

				</div>
			</div>
			<div class="mgt-20 tac">
				<p class="tac small opa-6" v-if="Number(enhanceHash) >= 2">
					进化Hash：
					<span v-if="Number(enhanceHash) > 2">{{shortHash(enhanceHash)}}</span>
					<span v-else>等待设置Hash</span>
				</p>
				
				<div>
					<StatuButton :onClick="enhance" class="mgt-10" style="min-width:150px" :isDisable="Number(enhanceHash) < 2" :isLoading="Number(enhanceHash) == 2 || lockBtn.enhanceLock > 0">
						<span v-if="Number(enhanceHash) == 2">等待设置Hash</span>
						<span v-else>开始进化</span>
					</StatuButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import {StatuButton } from '@/components';
import { BaseConfig, PancakeConfig, WalletConfig } from '@/config';
import { Wallet } from '@/utils';
import { mapState } from 'vuex';

export default {
	mixins: [CommonMethod],
	components: {StatuButton},
	props: ["data", "isMarket"],
	data(){
		return ({
			isMECApproved: -1,
			enhanceHash: -1,
			needGetHash: false,
		})
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn,
			crystalNum: (state) => state.userState.data.crystalNum,
			nowTs: (state) => state.globalState.data.nowTs,
		}),
		getNowPetItem(){
			return this.data;
		},
		getNowEnhanceCfg(){
			let cfg = this.getNowPetItem.vType == 4? BaseConfig.MomoEnhanceV4Cfg: BaseConfig.MomoEnhanceV5Cfg;
			return cfg[this.getNowPetItem.hashrate];
		},
		needApproveMbox(){
			return this.coinArr["MBOX"].allowanceToMomoEnhancer != -1 
					&& Number(this.coinArr["MBOX"].allowanceToMomoEnhancer) / 1e18 < Number(this.getNowEnhanceCfg.mbox)
		},
		needApproveMec(){
			return this.isMECApproved == false;
		}
	},
	watch: {
		nowTs: function(ts){
			if(ts % 5 == 0 && this.needGetHash){
				this.getEnhanceHash();
			}
		}
	},
	async created(){
		await Wallet.ETH.getAccount();
		await this.viewMboxAllowance();
		await this.viewMECApproved();
	},
	methods: {
		
		getGrowup(vType, hashrate) {
			let obj = {
				staticPower: 0,
				staticPercent: 0,
			};
			switch (vType) {
				case 4:
					obj.staticPower = 2000 + parseInt((hashrate - 10) * 50);
					obj.staticPercent = 0.2;
					break;
				case 5:
					obj.staticPower = 5000 + parseInt((hashrate - 50) * 50);
					obj.staticPercent = 0.3;
					break;
				case 6:
					obj.staticPower = 18000 + parseInt((hashrate - 180) * 50);
					obj.staticPercent = 0.4;
					break;
				default:
					break;
			}
			return obj;
		},
		//获取对应等级的算力
		getTargetLevelHashPower(hashrate){
			let {vType, level} = this.getNowPetItem;
			let growup = this.getGrowup(vType, hashrate);
			let lvHashRate = parseInt(hashrate + parseInt(growup.staticPower * (level - 1) /100) + parseInt(((parseInt(level / 5) * (1 + parseInt(level / 5)))) * growup.staticPower * growup.staticPercent / 200) );
			return lvHashRate;
		},
		async getEnhanceHash(){
			let res = await Wallet.ETH.Group.Enhancer.getEnhanceHash(this.getNowPetItem.tokenId);
			if(res){
				this.enhanceHash = res;
				this.needGetHash = Number(res) == 2;
			}
		},
		//开始升级
		async enhance(){
			let hash = await Wallet.ETH.Group.Enhancer.enhance(this.getNowPetItem.tokenId, ()=>{
				this.getEnhanceHash();
			});
			if(hash){
				this.lockBtnMethod("enhanceLock")
			}
		},
		//注入水晶和mobox
		async addCrystal(){
			if(this.needApproveMbox){
				this.showNotify("请先授权MBOX" ,"error");
				return
			}
			if(this.needApproveMec){
				this.showNotify("请先授权MEC" ,"error");
				return
			}
			if(Number(this.crystalNum) < Number(this.getNowEnhanceCfg.crystal)){
				this.showNotify("MEC数量不足" ,"error");
				return
			}
			if(Number(this.coinArr["MBOX"].balance) < Number(this.getNowEnhanceCfg.mbox)){
				this.showNotify("MBOX数量不足" ,"error");
				return
			}
			console.log(this.getNowPetItem);
			let obj = {
				tokenId_: this.getNowPetItem.tokenId,
				hrOriginal_: this.getNowPetItem.hashrate, 
				crystalAmount_: this.getNowEnhanceCfg.crystal, 
				mbox_: this.getNowEnhanceCfg.mbox
			}
			let hash = await Wallet.ETH.Group.Enhancer.addCrystal(obj, ()=>{

			});
			if(hash){
				this.lockBtnMethod("addCrystalLock")
			}
		},
		//查询宝石合约是被授权
		async viewMECApproved(){
			let isApprove = await Wallet.ETH.isApprovedForAll(WalletConfig.ETH.crystalToken, WalletConfig.ETH.momoEnhancer);
			if(isApprove != null){
				this.isMECApproved = isApprove;
			}
		},
		async approveMEC(){
			let hash = await Wallet.ETH.approvedForAll(WalletConfig.ETH.crystalToken, WalletConfig.ETH.momoEnhancer, ()=>{
				this.viewMECApproved();
			});
			if(hash){
				this.lockBtnMethod("approveLock");
			}
		},

		async viewMboxAllowance(){
			let coinKey = "MBOX"
			if(this.coinArr[coinKey].allowanceToMomoEnhancer > 0) return;
			let allowanceToMomoEnhancer = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinKey].addr, WalletConfig.ETH.momoEnhancer, false);
			if(allowanceToMomoEnhancer){
				this.coinArr[coinKey].allowanceToMomoEnhancer = Number(allowanceToMomoEnhancer);
				this.coinArr.ts = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		//授权Mbox
		async approveMbox(){
			let coinKey = "MBOX"
			let {allowanceToMomoEnhancer, isApproving} = this.coinArr[coinKey];
			if(allowanceToMomoEnhancer > 0 || isApproving) return;
			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin[coinKey].addr,
			WalletConfig.ETH.momoEnhancer, {coinKey, type: "allowanceToMomoEnhancer"});
			if (hash) {
				this.coinArr[coinKey].isApproving = true;
			}
		},
	}
}
</script>
