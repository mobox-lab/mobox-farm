<template>
	<Dialog id="select-pool-dialog" :top="100" :width="400">
		<h2>{{$t('Air-drop_178')}}</h2>
		<div v-for="item in selectCoinList" :key="item.coinKey" :class="hasSelectCoin.indexOf(item.coinKey) != -1?'disable':'' " class="aveage-box select-coin-item" @click="itemClick(item.coinKey)">
			<div class="vertical-children tal">
				<div  :class="item.isLP?'double-img':'' " v-if="item.coinName != ''" style="height:40px;zoom:0.5" class="dib por">
					<img v-for="(name, key) in item.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="40" alt="" />
				</div>
				<span class="mgl-5">{{item.coinName}}</span>
			</div>
			<div class="tar" >
				<p class="small">{{numFloor(item.veMbox.orderIndexs[oprOrderIndex].veMboxNum/1e18, 1e4)}} veMBOX</p>
				<p class="small" v-if="Number(item.veMbox.orderIndexs[oprOrderIndex].veMboxNum) > 0">
					<!-- {{getLeftTime(item.veMbox.orderIndexs[oprOrderIndex].endTime - nowTs)}} -->
					<span v-if="Number(item.veMbox.orderIndexs[oprOrderIndex].endTime - nowTs) > 0">
						<span v-if="Number(item.veMbox.orderIndexs[oprOrderIndex].endTime - nowTs) < 86400">
							{{ getLeftTime(item.veMbox.orderIndexs[oprOrderIndex].endTime - nowTs) }}
						</span>
						<span v-else>
							&gt;{{parseInt(Number(item.veMbox.orderIndexs[oprOrderIndex].endTime - nowTs) / 86400)}} {{$t("Hire_46")}}
						</span>
					</span>
				</p>
			</div>
		</div>
	</Dialog>
</template>

<script>
import { PancakeConfig } from '@/config';
import { Dialog } from '@/components';
import {CommonMethod} from '@/mixin';
import { mapState } from 'vuex'

let timer = null;
export default {
	mixins: [CommonMethod],
	components:{Dialog},
	data(){
		return({
			hasSelectCoin: [],
			oprOrderIndex: 0,
			nowTs : parseInt(new Date().valueOf()/1000),
			cb: ()=>{},
			updataTime: 0,
			type: "from",
		});
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		selectCoinList(){
			let arr = [];
			let stakeLP = PancakeConfig.StakeLP;
			let coinArr =  this.coinArr;
			arr.push({...coinArr["GOV"]});
			for (let key in stakeLP) {
				let {pIndex, isFinish} = stakeLP[key];
				if(pIndex != -1 && !isFinish){
					if(this.type == "from" || (this.type == "to" && key == "MBOX-BNB-V2")){
						arr.push({coinKey: key, ...stakeLP[key], ...coinArr[key]});
					}
				}
			}
			return arr;
		},
	},
	created(){
		timer = setInterval(()=>{
			this.nowTs = parseInt(new Date().valueOf()/1000);
		}, 1000)
	},
	beforeDestroy(){
		if(timer) clearInterval(timer);
	},
	methods:{
		show(){
			this.oprDialog("select-pool-dialog","block");
			return this;
		},
		close(){
			this.oprDialog("select-pool-dialog","none")
			return this;
		},
		setOprData(hasSelectCoin,oprOrderIndex, cb, type){
			this.hasSelectCoin = hasSelectCoin;
			this.oprOrderIndex = oprOrderIndex;
			this.cb = cb;
			this.type = type;
			return this;
		},
		itemClick(item){
			if(this.hasSelectCoin.indexOf(item) != -1) return;
			this.close().cb(item);
		}
	}
}
</script>

<style scoped>
	.select-coin-item.disable{
		background: #202020;
	}
	.select-coin-item{
		height: 45px;
		cursor: pointer;
		padding: 10px;
		background: #3f3f3f;
		margin: 10px 0px;
		border-radius: 10px;
	}
	.select-coin-item.disable:hover{
		background: #202020;
	}
	.select-coin-item:hover{
		background: #3a3a3a;
	}
</style>