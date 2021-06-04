<template>
	<div  class="tab-body tal">
		<div class="ly-input-content por">
			<p class="small">{{$t('Air-drop_180')}}</p>
			
			<div class="mgt-20 tac" style="background: rgba(0,0,0,0.3);border-radius:10px;padding:10px"> 
				<div class="vertical-children">
					<div  :class="oprData.isLP?'double-img':'' " v-if="oprData.coinKey != ''" style="height:40px;zoom:0.5" class="dib por">
						<img v-for="(name, key) in oprData.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="20" alt="" />
					</div>
					<span class="mgl-5">{{oprData.coinName}} POOL</span>
				</div>
				<div class="aveage-box mgt-20">
					<p>{{$t('Air-drop_181')}}</p>
					<p>{{$t('Air-drop_182')}}</p>
					<p>{{$t('Air-drop_183')}}</p>
				</div>
				<div class="aveage-box mgt-20">
					<p>{{$t('Air-drop_173')}}</p>
					<p>{{ numFloor(getVeMboxOrderIndexs['0'].stakeMbox/ 1e18, 1e4)}}</p>
					<p>
						<span v-if="Number(orderIndexsCountDown['0']) > 0">{{ getLeftTime(orderIndexsCountDown["0"]) }}</span>
						<span v-else>
							<span v-if="getVeMboxOrderIndexs['0'].stakeMbox == 0">-</span>
							<StatuButton :isLoading="lockBtn.unStakeMboxLock > 0" :onClick="unstakeMbox.bind(this, 0)" v-else class="btn-small" style="width: 70%">{{$t('Air-drop_155')}}</StatuButton>
						</span>
					</p>
				</div>
				<div class="aveage-box mgt-20">
					<p>{{$t('Air-drop_174')}}</p>
					<p>{{ numFloor(getVeMboxOrderIndexs["1"].stakeMbox/ 1e18, 1e4)}}</p>
					<p>
						<span v-if="Number(orderIndexsCountDown['1']) > 0">{{ getLeftTime(orderIndexsCountDown["1"]) }}</span>
						<span v-else>
							<span v-if="getVeMboxOrderIndexs['1'].stakeMbox == 0">-</span>
							<StatuButton :isLoading="lockBtn.unStakeMboxLock > 0" :onClick="unstakeMbox.bind(this, 1)" v-else class="btn-small" style="width: 70%">{{$t('Air-drop_155')}}</StatuButton>
						</span>
					</p>
				</div>
				<div class="aveage-box mgt-20">
					<p>{{$t('Air-drop_175')}}</p>
					<p>{{ numFloor(getVeMboxOrderIndexs["2"].stakeMbox/ 1e18, 1e4)}}</p>
					<p>
						<span v-if="Number(orderIndexsCountDown['2']) > 0">{{ getLeftTime(orderIndexsCountDown["2"]) }}</span>
						<span v-else>
							<span v-if="getVeMboxOrderIndexs['2'].stakeMbox == 0">-</span>
							<StatuButton :isLoading="lockBtn.unStakeMboxLock > 0" :onClick="unstakeMbox.bind(this, 2)" v-else class="btn-small" style="width: 70%">{{$t('Air-drop_155')}}</StatuButton>
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
		},
		orderIndexsCountDown(){
			let orderIndexsCountDown = {
				"0": -1,
				"1": -1,
				"2": -1,
			}
			let coinObj = this.coinArr[this.oprData.coinKey];
			if(coinObj){
				orderIndexsCountDown = coinObj.veMbox.orderIndexsCountDown;
			}
			return orderIndexsCountDown;
		}
	},
	created(){
		if(timer) clearInterval(timer);
		timer = setInterval(()=>{
			let coinObj = this.coinArr[this.oprData.coinKey];
			if(coinObj){
				let orderIndexsCountDown = coinObj.veMbox.orderIndexsCountDown;
				for (const key in this.getVeMboxOrderIndexs) {
					let endTime = this.getVeMboxOrderIndexs[key].endTime;
					let dt = endTime - parseInt(new Date().valueOf()/1000);
					if(dt > 0){
						orderIndexsCountDown[key] = dt;
					}else{
						orderIndexsCountDown[key] = 0;
					}
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
