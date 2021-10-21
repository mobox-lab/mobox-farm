<template>
	<section>
		<Dialog id="boxBag-dialog" :top="100" :width="430" >
			<h3>{{$t("Air-drop_262")}}</h3>
			<div class="dib por" style="position:absolute;right:20px; top:18px">
				<svg @click="getMdxBoxHistory();oprDialog('open-box-history-dialog','block')" viewBox="0 0 24 24" class="mgl-5 cur-point" width="24px" ><path fill="#838689" d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" ></path></svg>
			</div>

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
						<p>{{$t("Air-drop_264")}}</p>
						<div class="mgt-20">
							<button class="btn-primary btn-small" style="min-width:10px" @click="needOpenNum=1">Min</button>&nbsp;
							<SelectNum :needHideReduce="false" :maxNum="Number(boxList[selectPos].num) > 100?100:boxList[selectPos].num"  :defaultNum="needOpenNum" :data="{}" :onChange="onNumChange" />&nbsp;
							<button class="btn-primary btn-small" @click="needOpenNum=Number(boxList[selectPos].num) > 100?100:boxList[selectPos].num" >Max</button> 
						</div>
						<div class="mgt-10" >
							<StatuButton data-step="2" class="mgt-10" :onClick="openBox.bind(this)" style="width:70%" :isDisable="needOpenNum <= 0 || needOpenNum > boxList[selectPos].num" :isLoading="lockBtn.openActivityBoxLock > 0">
								{{$t("Air-drop_265")}}
							</StatuButton>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<Dialog id="open-box-history-dialog" :top="100" :width="430" >
			<div class="mgt-10" style="background:#000912;border-radius:10px;padding:8px;">
				<div class="aveage-box opa-6 small  tal" style="padding: 0px 8px">
					<div class="tal" >{{$t("BOX_12")}}</div>
					<div class="tac">{{$t("BOX_13")}}</div>
					<div class="tac">{{$t("Air-drop_269")}}</div>
					<div class="tar" >{{$t("BOX_14")}}</div>
				</div>
				<div style="por mgt-10 tal"  >
					<div class="aveage-box mgt-10 por tal small" v-for="(item, index) in openHistory" :key="item.tx+index" style="background:#13181F;border-radius:15px;padding:10px 8px ;">
						<div  >
							<p>{{ dateFtt('yyyy-MM-dd', new Date(item.crtime * 1000)) }}</p> 
							<p>{{ dateFtt('hh:mm:ss', new Date(item.crtime * 1000)) }}</p> 
						</div>
						<div class=" tac">x{{item.amount}}</div>
						<div class="tac color-sell">{{item.totalValue}}</div>
						<div class="tar" >
							<img  @click="showOpenBox('mdx',item.luckyAmounts, false)" height="25" src="@/assets/icon/view.png" alt="" class="cur-point" />
						</div>
					</div>
				</div>
			</div>
		</Dialog>
		<div id="showBoxLayer" class="hide">
			<div ref="boxSpine" id="boxSpineShow"></div>
			<div id="box-result-box"  v-if="isShowResult">
				<div id="box-result" class="animate__animated animate__zoomIn animate__faster por">
					<img   class="close-btn" @click="closeResult" src="@/assets/icon/close.png" alt="" width="30" />
					<div class="vertical-children">
						<img :src="require(`@/assets/${getNowTypeObj.boxRes}.png`)" alt="" height="60">
						<div class="dib tal mgl-10">
							<h2>{{$t("MECBOX_41")}}: x{{showReult.length}}</h2>
							<p class="small">{{$t("MECBOX_42")}}: {{getTotalReward}} <img :src="require(`@/assets/${getNowTypeObj.iconName}.png`)" class="coin-icon" alt="" height="20"  /></p>
						</div>
					</div>
					<div class="ly-input-content ovh mgt-10" style="height:350px;overflow:auto;background:#000">
						<div class="col-md-3 col-xs-4 box-result-item tac" v-for="(item,pos) in showReult" :key="pos">
							<img :src="require(`@/assets/box/openboxbg${getBgLvByNum(item)}.png`)" alt="" width="100%"/>
							<div class="vertical-children2" style="position:absolute;top:0px;width:100%;height:100%;left:0px;">
								<img :src="require(`@/assets/${getNowTypeObj.iconName}.png`)" class="coin-icon" alt="" height="30"  />
								<span class="coin-num mgl-5" :class="`color`+ getBgLvByNum(item)">{{item}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { Dialog, SelectNum, StatuButton } from '@/components';
import { mapState } from 'vuex';
import { Wallet, Http, Common } from '@/utils';
import { CommonMethod } from '@/mixin';
import {WalletConfig} from "@/config";
const $ = window.$

export default {
	mixins: [CommonMethod],
	components: {Dialog, SelectNum, StatuButton},
	data(){
		return({
			needOpenNum: 1,
			selectPos: -1,
			boxSpine: null,
			showReult: [],
			isShowResult: false,
			openHistory: [],
			myAccount: "",
			openBoxType: "mec",
			openBoxTypeObj: {
				"mdx": {
					iconName: "coin/MDX",
					boxSpineRes: "mdxBox/baoxiang",
					boxRes: "box/mdxbox",
					coinNumToLv: {"2": 1, "3": 2, "5": 3, "10": 4, "20":5},
				},
				"mec": {
					iconName: "coin/CRYSTAL",
					boxSpineRes: "shuijign/shuijign",
					boxRes: "box/mecbox_a",
					coinNumToLv: {"2": 1, "11": 2, "21": 3, "100": 4, "500":5},
				}
			}
		})
	},
	computed:{
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
			boxList: (state) => state.userState.data.boxList,
		}),
		getTotalReward(){
			let reward = 0;
			this.showReult.map(item=>{
				reward += Number(item)
			});
			return reward;
		},
		getNowTypeObj(){
			return this.openBoxTypeObj[this.openBoxType];
		}
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();
		await this.getMyMdxBoxNum();
		await this.getMdxBoxHistory();
		await this.getMdxBalance();
	},
	mounted(){
		this.preLoadRes();
	},
	methods:{
		getBgLvByNum(num){
			let retLv = 1;
			let coinNumToLv = this.getNowTypeObj.coinNumToLv;
			if(this.openBoxType == "mdx"){
				retLv = coinNumToLv[num]
			}else{
				for (const key in coinNumToLv) {
					if(Number(num) >= Number(key)) retLv = coinNumToLv[key];
				}
			}
			return retLv
		},
		async getMdxBalance(){
			let value = await Wallet.ETH.getErc20BalanceByTokenAddr(WalletConfig.ETH.mdxToken, false);
			if(value){
				this.$store.commit("userState/setData", {mdxBalance: this.numFloor((Number(value) / 1e18), 1e2)});
			}
		},
		async preLoadRes(){
			for (const key in this.openBoxTypeObj) {
				let boxSpineRes = this.openBoxTypeObj[key].boxSpineRes;
				try {
					new window.spine.SpineWidget(this.$refs.boxSpine, {
						json: `./animation/${boxSpineRes}.json`,
						atlas: `./animation/${boxSpineRes}.atlas`,
						backgroundColor: "#00000000",
						loop: false,
						fitToCanvas: true,
						animation: "jinzheng",
					});
					await Common.sleep(2000);
				} catch (error) {
					console.log(error);
				}
			}
		},
		async getMdxBoxHistory(){
			let res = await Http.getMdxBoxHistory(this.myAccount);
			if(res){
				this.openHistory = res.list;
				this.openHistory.map(item=>{
					let totalValue = 0;
					item.luckyAmounts.map(item2=>{
						totalValue += Number(item2);
					})
					item.totalValue = totalValue;
				})
			}
		},
		async getMyMdxBoxNum(){
			let mdxBoxNum = await Wallet.ETH.Group.MdxBox.getMdxBoxNum();
			if(mdxBoxNum){
				this.boxList[0].num = mdxBoxNum;
				if(mdxBoxNum == 0){
					this.selectPos = -1;
				}
				if(this.needOpenNum > mdxBoxNum){
					this.needOpenNum = mdxBoxNum;
					if(this.needOpenNum == 0) this.needOpenNum = 1;
				}
				this.$store.commit("userState/setData", {boxList: this.boxList});
			}
		},

		async openBox(){
			if(this.needOpenNum <= 0 || this.needOpenNum > this.boxList[this.selectPos].num) return;
			let hash = await Wallet.ETH.Group.MdxBox.openBox(this.needOpenNum, async (data)=>{
				this.showOpenBox("mdx",data.luckyAmounts);
				await this.getMyMdxBoxNum();
				await this.getMdxBalance();
			});
			if(hash){
				this.lockBtnMethod("openActivityBoxLock");
			}
		},

		showOpenBoxCb(type, cb){
			if(this.openBoxTypeObj[type]){
				this.openBoxType = type;
			}
			$("#showBoxLayer").show();
			this.initBoxAndOpen(cb);
		},

		showOpenBox(type, arr, needShowBox = true){
			if(this.openBoxTypeObj[type]){
				this.openBoxType = type;
			}
			this.showReult = arr;
			$("#showBoxLayer").show();
			if(needShowBox){
				this.initBoxAndOpen(()=>{
					this.isShowResult = true;
				});
			}else{
				$("#boxSpineShow").hide();
				this.isShowResult = true;
			}
		},
		initBoxAndOpen(cb){
			console.log(this.getNowTypeObj.boxSpineRes);
			$("#boxSpineShow").hide();
			this.boxSpine = new window.spine.SpineWidget(this.$refs.boxSpine, {
				json: `./animation/${this.getNowTypeObj.boxSpineRes}.json`,
				atlas: `./animation/${this.getNowTypeObj.boxSpineRes}.atlas`,
				backgroundColor: "#00000000",
				animation: "jinzheng",
				loop: false,
				fitToCanvas: true,
				scale:0.8,
				x: 0,
				y: 0,
				success: ()=>{
					$("#boxSpineShow").show();
					this.boxSpine.state.timeScale = 2;
					this.boxSpine.setAnimation("dakai", {
						complete: ()=>{
							cb();
						}
					})
				}
			});
		},
		closeResult(){
			this.isShowResult = false;
			$("#showBoxLayer").hide();
			this.showReult = [];
			$("#boxSpineShow").show();
			if(this.boxSpine){
				this.boxSpine.setAnimation("jinzheng", false)
			}
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
	.close-btn{
		position: absolute;
		right: -15px;
		top: -15px;
		border: 2px solid #36383A;
		border-radius: 30px;
		cursor: pointer;
	}
	.coin-num{
		font-family: 'Verdana' !important;
		font-weight: 800 !important;
		font-size: 26px;
	}
	.color1{
		color: #D8D8D8;
	}
	.color2{
		color: #80E220;
	}
	.color3{
		color: #618FFC;
	}
	.color4{
		color: #AE20E2;
	}
	.color5{
		color: #FD820B;
	}
	.box-result-item{
		padding: 10px;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	#box-result-box{
		position:absolute;left:0px;top:0px;bottom:0px;right:0px;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	#box-result{
		max-width: 90%;
		border-radius: 15px;
		padding: 15px;
		background: #13181f;
		border: 1px solid #36383A;
		border-radius: 21px;
		width: 700px;
		margin: 0px auto;
	}
	#boxSpineShow{
		width: 100vw;
		height: 100vh;
	}
	#showBoxLayer{
		position: fixed;
		top: 0px; bottom: 0px; left: 0px; right: 0px;
		background: rgba(0,0,0,0.7);
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
	@media (max-width: 768px) {
		.box-result-item{
			padding: 5px !important;
		}
		.coin-num{
			font-size: 16px;
		}
		.coin-icon{
			height: 16px !important;
		}
	}
</style>