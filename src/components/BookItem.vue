<template>
	<div class="book-item dib row por" :class="{'bg-6':data[0].vType == 6}">
		<span v-if="data[0].vType == 6" class="pet-power c-lv5 vertical-children">
			<img src="../assets/icon/airdrop.png" alt="" height="15">&nbsp;
			<span>180</span>
		</span>
		<div v-for="item in data" class="dib por tac cur-point" :class="`${ data.length > 1 ? 'col-md-3 col-xs-3' : 'col-md-12' }`" :key="item.prototype" @click="buyMomo(item)">
			<img :src="require(`../assets/pet/${item.prototype}.png`)" alt="" width="100%" :class="item.num >= 1 ? '' : 'opa-4'" />
			<span class="pet-count" v-if="item.vType >= 4  && momoNumObj[item.prototype] != undefined && item.vType < 6" >
				{{momoNumObj[item.prototype]}}/{{item.mmNum}}
			</span>
			<span class="pet-count" v-if="item.vType >= 6">{{item.mmNum}}</span>
			<span class="pet-num" v-if="item.num >= 1">x{{ item.num }}</span>
			<span class="quick-buy opa-6" v-if="item.num <= 0 && item.vType<=4">
				<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M867.7 423.8H599.8V155.9c0-49.3-40-89.3-89.3-89.3s-89.3 40-89.3 89.3v267.9H153.3c-49.3 0-89.3 40-89.3 89.3s40 89.3 89.3 89.3h267.9v267.9c0 49.3 40 89.3 89.3 89.3s89.3-40 89.3-89.3V602.4h267.9c49.3 0 89.3-40 89.3-89.3s-40-89.3-89.3-89.3z"  fill="#E1FF17"></path></svg>
			</span>
		</div>
		<div class="lock vertical-children">
			<span v-if="!loading && data.length > 1">
				<img v-if="!data[0].isLock" src="../assets/icon/unlock.png" @click="lockNft()" alt="" height="20"/>
				<img v-if="data[0].isLock" src="../assets/icon/lock.png" @click="unlockNft()" alt="" height="20"/>
			</span>
			<Loading v-if="loading"  />
		</div>
	</div>
</template>

<script>
import { Http, Wallet, Common } from '@/utils';
import { Loading } from '@/components';
import { mapState } from 'vuex';

export default {
	components: {Loading},
	data(){
		return({loading: false})
	},
	props: ["data"],
	computed:{
		...mapState({
			momoNumObj: (state) => state.globalState.data.momoNumObj,
		}),
		getBookType(){
			let {prototype, vType} = this.data[0];
			return  prototype % (vType * 10000);
		},
	},
	methods:{
		buyMomo(item){
			Common.app.$refs.quickBuy.show(item.prototype);
		},
		async lockNft(){
			let myAddr = await Wallet.ETH.getAccount();
			if(myAddr){
				this.loading = true;
				let res = await Http.lockNft(myAddr,this.getBookType ,"BNB");
				this.data[0].isLock = true;
				this.loading = false;
				if(res){
					this.$parent.$parent.eth_setLockList();
				}
			}
		},
		async unlockNft(){
			let myAddr = await Wallet.ETH.getAccount();
			if(myAddr){
				this.loading = true;
				let res = await Http.unlockNft(myAddr,this.getBookType ,"BNB");
				this.data[0].isLock = false;
				this.loading = false;
				if(res){
					this.$parent.$parent.eth_setLockList();
				}
			}
		}

	}
};
</script>

<style scoped>
.pet-count{
	position: absolute;
	top: -5px;
	text-align: center;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0%);
	font-size: 12px;
	color: rgb(0, 0, 0);
	font-weight: 800;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 10px;
	padding: 0px 3px;
	min-width: 30px;
}
.pet-power{
	position: absolute;
	bottom: 3px;
	right: 5px;
}
.quick-buy{
	position: absolute;
	transform: translateX(-50%); 
	bottom: 0px;
	left: 50%;
}
.lock{
	position: absolute;
	right: 5px;
	top: 5px;
	cursor: pointer;
}
.opa-3 {
	opacity: 0.3;
}
.opa-4 {
	opacity: 0.4;
}
.book-item.bg-1 {
	background: #1d2b50 !important;
}
.book-item.bg-6 {
	background: #711918 !important;
}
.book-item {
	padding: 15px;
	background: #1C222C;
	border-radius: 10px;
	margin: 10px;
}
.pet-num {
	display: inline-block;
	border-radius: 30px;
	padding: 2px 15px;
	font-size: 12px;
	background: rgba(0, 0, 0, 0.3);
	text-align: center;
	position: absolute;
	bottom: 0px;
	left: 50%;
	transform: translate(-50%, 0%);
}

@media (max-width: 768px) {
	.pet-count{
		zoom: 0.8;
		top: 3px;
	}
	.book-item {
		padding: 2px;
	}
	.col-xs-12,
	.col-xs-4 {
		padding: 0px !important;
	}
}
</style>
