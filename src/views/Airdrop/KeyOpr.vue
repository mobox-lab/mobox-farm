<template>
	<Dialog id="keyopr-dialog" :top="100" :width="400">
		<div class="tal">
			<div class="tab-menu active ">提取KEY</div>
		</div>
		<div class="ly-input-content">
			<div class="por mgt-10 ">
				<div class="ly-input-pre-icon">
					<img  src="../../assets/icon/key.png" alt="" />
				</div>
				<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; " v-model="getSelectAllKey" readonly/>
				<div class="dib" style="width: 30%">
					<button class="btn-primary btn-small" style="width: 80%" @click="selectAll"> All </button>
				</div>
			</div>

			<div class="mgt-20 small">
				<div>
					<div  class="aveage-box select-key-item" v-if="Number(rewardStoreKey) > 0 ">
						<div class="tal vertical-children">
							<div class="ly-checkbox active">
								<svg  viewBox="0 0 1024 1024" width="20" height="20"><path fill="#92FFDA" d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z" ></path></svg>
							</div> &nbsp;
							<span class="mgl-10">{{rewardStoreKey}} KEY</span> 
						</div>
						<div class="tar">暂存区</div>
					</div>
				</div>
				<div v-for="item in getPledgeList" :key="item.coinName" >
					<div  class="aveage-box select-key-item" v-if="item.earnedKey > 0">
						<div class="tal vertical-children">
							<div class="ly-checkbox" @click="toggleSelect(item)" :class="selectKeyCoin.indexOf(item.coinName) != -1 ?'active':'' ">
								<svg class="hide"  viewBox="0 0 1024 1024" width="20" height="20"><path fill="#92FFDA" d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z" ></path></svg>
							</div> &nbsp;
							<span class="mgl-10">{{item.earnedKey}} KEY</span> 
						</div>
						<div class="tar">{{item.coinName}} LP</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<p class="small opa-6 tal mgt-10" v-html="$t('Air-drop_14')" ></p>

		<StatuButton class="mgt-20" :onClick="exchangeToBox" :isLoading="lockBtn.getKeyLock > 0" :isDisable="!isCanExchangeToBox || lockBtn.getKeyLock > 0" style="width: 70%;">
			{{ $t("Air-drop_15").replace("#0#", parseInt(getSelectAllKey)) }}
		</StatuButton>
		<StatuButton class="mgt-10" :onClick="getRewardKey" :isLoading="lockBtn.getKeyLock > 0" :isDisable="getSelectAllKey <= 0 || lockBtn.getKeyLock > 0" style="width: 70%;">
			提取到钱包
		</StatuButton>
	</Dialog>
</template>
<script>
import { Dialog, StatuButton } from '@/components';
import {CommonMethod} from '@/mixin';
import {Wallet, Common} from "@/utils";
import { PancakeConfig } from '@/config';
import { mapState } from 'vuex';

export default {
	mixins: [CommonMethod],
	components: {Dialog, StatuButton},
	data(){
		return({
			inputKey: 0,
			selectKeyCoin: [],
		})
	},

	computed: {
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			canOpenBox: (state) => state.ethState.data.canOpenBox,
			rewardStoreKey: (state) => state.bnbState.data.rewardStoreKey,
		}),

		getPledgeList(){
			return this.$parent.getPledgeList
		},
		getPledgeDic(){
			let obj = {};
			this.getPledgeList.map(item=>{
				obj[item.coinName] = item;
			})
			return obj;
		},
		getSelectAllKey(){
			let allKey = 0;
			let pledgeDic = this.getPledgeDic;
			this.selectKeyCoin.map(item=>{
				allKey += pledgeDic[item].earnedKey;
			});
			allKey +=  this.rewardStoreKey
			return this.numFloor(allKey, 1e4);
		},
		isCanExchangeToBox(){
			return this.getSelectAllKey >= 1
		}
	},

	methods:{
		show(){
			this.selectKeyCoin = Object.keys(this.getPledgeDic)
			this.oprDialog("keyopr-dialog","block");
			return this;
		},
		close(){
			this.oprDialog("keyopr-dialog","none")
			return this;
		},
		setCheckCoin(coinName){
			this.selectKeyCoin = [coinName];
			console.log({coinName});
			return this;
		},
		toggleSelect(item){
			let selectPos =  this.selectKeyCoin.indexOf(item.coinName);
			if(selectPos != -1){
				//只有一个不能取消
				if(this.selectKeyCoin.length == 1) return;
				this.selectKeyCoin.splice(selectPos, 1);
			}else{
				this.selectKeyCoin.push(item.coinName);
			}
		},
		selectAll(){
			let allArr = [...this.selectKeyCoin];
			this.getPledgeList.map(item=>{
				if(item.earnedKey > 0 && allArr.indexOf(item.coinName) == -1){
					allArr.push(item.coinName);
				}
			});
			this.selectKeyCoin = allArr;
		},
		async exchangeToBox(){
			//当前还有未开完的箱子
			if (this.canOpenBox > 0) {
				this.showNotify( this.$t("BOX_29"), "error");
				return;
			}

			let pIndexArr = [];
			this.selectKeyCoin.map(coinName=>{
				pIndexArr.push(PancakeConfig.StakeLP[coinName].pIndex);
			});

			let hash = await Wallet.ETH.getChestBox(pIndexArr, parseInt(this.getSelectAllKey));
			if(hash){
				//锁定领取按钮
				Common.app.lockBtnMethod("getKeyLock");
			}

		},
		//领取KEY到钱包
		async getRewardKey(){
			console.log(this.selectKeyCoin, Wallet);
			let pIndexArr = [];
			this.selectKeyCoin.map(coinName=>{
				pIndexArr.push(PancakeConfig.StakeLP[coinName].pIndex);
			});

			let hash = await Wallet.ETH.getRewardKey(pIndexArr);
			if(hash){
				//锁定领取按钮
				Common.app.lockBtnMethod("getKeyLock");
			}
		}
	}
	
}
</script>

<style scoped>
	.select-key-item{
		height: 30px;
	}
</style>