<template>
	<section>
		<Dialog id="boxBag-dialog" :top="100" :width="430" >
			<h3>礼盒收藏箱</h3>
			<div class="ly-input-content por clear mgt-10" style="background:#000;height:240px;overflow:auto;padding:8px">
				<div class="col-md-3 col-xs-4" v-for="(item, pos) in boxList" :key="item.id">
					<div style="padding:8px" :class="{'opa-6': item.num <= 0}">
						<div  class="bag-item" @click="selectPos >= 0 || item.num <= 0?selectPos = -1:selectPos = pos">
							<img :src="require(`@/assets/${item.resImg}.png`)" alt="" height="100%">
							<img class="select" v-if="selectPos == pos" src="@/assets/icon/select.png" alt="">
							<span class="bag-num ">x{{item.num}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="ly-input-content mgt-10" style="background:#000" v-if="selectPos >= 0">
				<div class=" aveage-box">
					<div class="tac">
						<div class="bag-item dib" >
							<img :src="require(`@/assets/${boxList[selectPos].resImg}.png`)" alt="" height="100%">
						</div>
					</div>
					<div style="flex:3"  class="tac">
						<p>请选择所要打开礼盒的数量</p>
						<div class="mgt-20">
							<button class="btn-primary btn-small" style="min-width:10px" @click="needOpenNum=1">Min</button>&nbsp;
							<SelectNum :needHideReduce="false" :maxNum="boxList[selectPos].num"  :defaultNum="needOpenNum" :data="{}" :onChange="onNumChange" />&nbsp;
							<button class="btn-primary btn-small" @click="needOpenNum=boxList[selectPos].num" >Max</button> 
						</div>
						<div class="mgt-10" >
							<StatuButton data-step="2" class="mgt-10" :onClick="openBox.bind(this)" style="width:70%" :isDisable="needOpenNum <= 0 || needOpenNum > boxList[selectPos].num" :isLoading="lockBtn.openActivityBoxLock > 0">
								打开
							</StatuButton>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<div id="showBoxLayer">
			<div ref="boxSpine" id="boxSpineShow"></div>
		</div>
	</section>
</template>
<script>
import { Dialog, SelectNum, StatuButton } from '@/components';
import { mapState } from 'vuex';
import { Wallet } from '@/utils';
import { CommonMethod } from '@/mixin';

export default {
	mixins: [CommonMethod],
	components: {Dialog, SelectNum, StatuButton},
	data(){
		return({
			needOpenNum: 1,
			selectPos: -1,
			boxSpine: null,
		})
	},
	computed:{
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			boxList: (state) => state.userState.data.boxList,
		}),
	},
	async created(){
		
		await Wallet.ETH.getAccount();
		await this.getMyMdxBoxNum();
	},
	mounted(){
		this.initBox();
	},
	methods:{
		initBox(){
			this.boxSpine = new window.spine.SpineWidget(this.$refs.boxSpine, {
				json: "./animation/mdxBox/baoxiang.json",
				atlas: "./animation/mdxBox/baoxiang.atlas",
				backgroundColor: "#00000000",
				animation: "dakai",
				loop: true,
				fitToCanvas: true,
				scale:0.5,
				x: 0,
				y: 0,
				success: ()=>{
					this.boxSpine.state.timeScale = 1.8;
				}
			});
		},
		async getMyMdxBoxNum(){
			let mdxBoxNum = await Wallet.ETH.Group.MdxBox.getMdxBoxNum();
			if(mdxBoxNum){
				this.boxList[0].num = mdxBoxNum;
				this.$store.commit("userState/setData", {boxList: this.boxList});
			}
		},

		async openBox(){
			if(this.needOpenNum <= 0 || this.needOpenNum > this.boxList[this.selectPos].num) return;
			let hash = await Wallet.ETH.Group.MdxBox.openBox(this.needOpenNum, async (data)=>{
				await this.getMyMdxBoxNum();
				console.log("openBox", data);
				this.showOpenBox(data.luckyAmounts)
			});
			if(hash){
				this.lockBtnMethod("openActivityBoxLock");
			}
		},
		showOpenBox(arr){
			console.log(arr);
		},
		onNumChange(data, num){
			this.needOpenNum = Number(this.needOpenNum) + num;
			if(this.needOpenNum <= 1 ) this.needOpenNum = 1;
			if(this.needOpenNum >= this.boxList[this.selectPos].num ) this.needOpenNum =  this.boxList[this.selectPos].num;
		}
	}
}
</script>

<style scoped>
	#boxSpineShow{
		border: 1px solid red;
		width: 100vw;
		height: 100vh;
	}
	#showBoxLayer{
		position: fixed;
		top: 0px; bottom: 0px; left: 0px; right: 0px;
		background: rgba(0,0,0,0.5);
		z-index: 99998;
	}
	.bag-item{
		border: 3px solid rgba(93, 99, 111, 0.5);
		border-radius: 15px;
		position: relative;
		width: 75px;
		height: 75px;
		cursor: pointer;
		text-align: center;
	}
	.bag-num{
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		background: #000000a0;
		border-radius: 10px;
		font-size: 12px;
		text-align: center;
		font-weight: bold;
	}
	.select{
		position: absolute;
		width: 40%;
		right: 0px;
		top: 0px;
	}
</style>