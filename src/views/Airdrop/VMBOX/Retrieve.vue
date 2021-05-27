<template>
	<div  class="tab-body tal">
		<div class="ly-input-content por">
			<p class="small">veMobx 取回说明,veMobx 取回说明，veMobx 取回说明，veMobx 取回说明veMobx 取回说明</p>
			
			<div class="mgt-20 tac" style="background: rgba(0,0,0,0.3);border-radius:10px;padding:10px"> 
				<p>MBOX-BNB LP</p>
				<div class="aveage-box mgt-20">
					<p>时间类型</p>
					<p>待取回MBOX</p>
					<p>倒计时</p>
				</div>
				<div class="aveage-box mgt-20">
					<p>短期</p>
					<p>{{ numFloor(getVeMboxOrderIndexs['0'].stakeMbox/ 1e18, 1e4)}}</p>
					<p>
						<span v-if="Number(orderIndexsCountDown['0']) > 0">{{ getLeftTime(orderIndexsCountDown["0"]) }}</span>
						<span v-else>
							<span v-if="getVeMboxOrderIndexs['0'].stakeMbox == 0">-</span>
							<StatuButton :isLoading="lockBtn.unStakeMboxLock > 0" :onClick="unstakeMbox.bind(this, 0)" v-else class="btn-small" style="width: 70%">领回</StatuButton>
						</span>
					</p>
				</div>
				<div class="aveage-box mgt-20">
					<p>中期</p>
					<p>{{ numFloor(getVeMboxOrderIndexs["1"].stakeMbox/ 1e18, 1e4)}}</p>
					<p>
						<span v-if="Number(orderIndexsCountDown['1']) > 0">{{ getLeftTime(orderIndexsCountDown["1"]) }}</span>
						<span v-else>
							<span v-if="getVeMboxOrderIndexs['1'].stakeMbox == 0">-</span>
							<StatuButton :isLoading="lockBtn.unStakeMboxLock > 0" :onClick="unstakeMbox.bind(this, 1)" v-else class="btn-small" style="width: 70%">领回</StatuButton>
						</span>
					</p>
				</div>
				<div class="aveage-box mgt-20">
					<p>长期</p>
					<p>{{ numFloor(getVeMboxOrderIndexs["2"].stakeMbox/ 1e18, 1e4)}}</p>
					<p>
						<span v-if="Number(orderIndexsCountDown['2']) > 0">{{ getLeftTime(orderIndexsCountDown["2"]) }}</span>
						<span v-else>
							<span v-if="getVeMboxOrderIndexs['2'].stakeMbox == 0">-</span>
							<StatuButton :isLoading="lockBtn.unStakeMboxLock > 0" :onClick="unstakeMbox.bind(this, 2)" v-else class="btn-small" style="width: 70%">领回</StatuButton>
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import {CommonMethod} from '@/mixin';
import { StatuButton } from '@/components';
import { PancakeConfig } from '@/config';
import { Wallet } from '@/utils';

let timer = null;
export default {
	mixins: [CommonMethod],
	components: {StatuButton},
	props: ["oprData"],
	data(){
		return({
			orderIndexsCountDown: {
				"0": 0,
				"1": 0,
				"2": 0,
			}
		})
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		getVeMboxOrderIndexs(){
			let orderIndexs = {
				"0": {stakeMbox: 0,endTime: 0},
				"1": {stakeMbox: 0,endTime: 0},
				"2": {stakeMbox: 0,endTime: 0},
			}
			let coinKey = this.oprData.coinKey;
			if(coinKey != "" && this.coinArr[coinKey]){
				orderIndexs = this.coinArr[coinKey].veMbox.orderIndexs;
			}
			return orderIndexs;
		}
	},
	created(){
		if(timer) clearInterval(timer);
		timer = setInterval(()=>{
			for (const key in this.getVeMboxOrderIndexs) {
				let endTime = this.getVeMboxOrderIndexs[key].endTime;
				let dt = parseInt(new Date().valueOf - endTime);
				if(dt > 0){
					this.orderIndexsCountDown[key] = dt;
				}
			}
		}, 1000)
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods: {
		async unstakeMbox(orderIndex_){
			let coinKey = this.oprData.coinKey;
			let poolIndex_ = PancakeConfig.StakeLP[coinKey].pIndex;
			let hash = await Wallet.ETH.unstakeMbox({poolIndex_, orderIndex_});
			if(hash){
				this.lockBtnMethod("unStakeMboxLock")
			}
		}
	}
	
}
</script>
