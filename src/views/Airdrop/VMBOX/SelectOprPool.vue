<template>
	<Dialog id="select-pool-dialog" :top="100" :width="400">
		<h2>选择质押池</h2>
		<div v-for="item in selectCoinList" :key="item.coinKey" :class="hasSelectCoin.indexOf(item.coinKey) != -1?'disable':'' " class="aveage-box select-coin-item" @click="itemClick(item.coinKey)">
			<div class="vertical-children tal">
				<div  :class="item.isLP?'double-img':'' " v-if="item.coinName != ''" style="height:40px;zoom:0.5" class="dib por">
					<img v-for="(name, key) in item.coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="40" alt="" />
				</div>
				<span class="mgl-5">{{item.coinName}}</span>
			</div>
			<div class="tar" v-if="item.balance != '-'">
				<p class="small">{{item.veMbox.orderIndexs[oprOrderIndex].veMboxNum}} veMBOX</p>
				<p class="small" v-if="Number(item.balance) > 0">50:66:00</p>
			</div>
			<div class="tar" v-else>
				<Loading />
			</div>
		</div>
	</Dialog>
</template>

<script>
import { PancakeConfig } from '@/config';
import { Dialog, Loading } from '@/components';
import {CommonMethod} from '@/mixin';
import { mapState } from 'vuex'

export default {
	mixins: [CommonMethod],
	components:{Dialog, Loading},
	data(){
		return({
			hasSelectCoin: [],
			oprOrderIndex: 0,
			nowTs : parseInt(new Date().valueOf()/1000),
			cb: ()=>{},
			updataTime: 0,
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
			for (let key in stakeLP) {
				let {pIndex, isFinish} = stakeLP[key];
				if(pIndex != -1 && !isFinish){
					arr.push({coinKey: key, ...stakeLP[key], ...coinArr[key]});
				}
			}
			return arr;
		},
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
		setOprData(hasSelectCoin,oprOrderIndex, cb){
			this.hasSelectCoin = hasSelectCoin;
			this.oprOrderIndex = oprOrderIndex;
			this.cb = cb;
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
		background: #262833;
	}
	.select-coin-item{
		height: 50px;
		cursor: pointer;
		padding: 10px;
		background: #1d2b50;
		margin: 10px 0px;
		border-radius: 10px;
	}
	.select-coin-item.disable:hover{
		background: #262833;
	}
	.select-coin-item:hover{
		background: #1c2641;
	}
</style>