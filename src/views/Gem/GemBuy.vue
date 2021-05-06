<style src="./style.css"></style>
<template>
<div class="tac">
	<div class="por">
		<h1>宝石申购</h1>
		<div class="tac mgt-10">
			<p v-if="getCountDown >0">申购倒计时: {{getLeftTime(getCountDown)}}</p>
			<p v-else>结算中<span class="dotting"></span></p>
			<table  class="dib mgt-10" id="apply-info-table" cellpadding="0" cellspacing="0">
				<tr>
					<td >
						<p class="small opa-6">普通申购数量</p>
						<p>{{applyInfo.nowNormalAmount}}</p>
					</td>
					<td >
						<p class="small opa-6">中签率</p>
						<p>{{ numFloor(applyInfo.maxNormalLuckyAmount / (applyInfo.nowNormalAmount >= applyInfo.maxNormalLuckyAmount?applyInfo.nowNormalAmount:applyInfo.maxNormalLuckyAmount) * 100, 1e3 ) }}%</p>
					</td>
				</tr>
				<tr>
					<td >
						<p class="small opa-6">高级申购数量</p>
						<p>{{applyInfo.nowAmount}}/{{applyInfo.maxAmount}}</p>
					</td>
					<td >
						<p class="small opa-6">中签率</p>
						<p>{{ numFloor(applyInfo.maxLuckyAmount / (applyInfo.nowAmount >= applyInfo.maxLuckyAmount?applyInfo.nowAmount:applyInfo.maxLuckyAmount) * 100, 1e3 ) }}%</p>
					</td>
				</tr>
			</table>
			<div style="height:350px">
				<p v-if="applyInfo.roundIndex != '' ">
					<img :src="require(`../../assets/icon/gemIcon_${getShowApplyType}.png`)" alt="" height="350px"/>
				</p>
			</div>
		</div>
		<div class="mgt-10">
			<button class="btn-primary" style="margin:10px" @click="oprDialog('gem-apply-dialog', 'block')">宝石申购</button>
			<button class="btn-primary por" style="margin:10px" @click="oprDialog('gem-take-dialog', 'block')">
				<span class="notice" v-if="gemToTakeNum > 0"></span>
				收集宝石
			</button>
		</div>
		<div class="gemBag" @click="oprDialog('gemBag-dialog','block')">
			<img  src="../../assets/icon/gem_bag_icon.png" alt="">
			<p class="stroke" data-text="宝石背包">宝石背包</p>
		</div>
	</div>
	<!-- 记录 -->
	<table class="mgt-30 small table-his" border="0" frame="void" rules="none" >
		<tr>
			<th width="30%" class="tar">
				<span class="dib tac" style="width: 120px">
					{{ $t("BOX_12") }}
				</span>
			</th>
			<th width="20%">{{ $t("BOX_26") }}</th>
			<th width="10%">{{ $t("BOX_13") }}</th>
			<th width="20%">{{ $t("BOX_27") }}</th>
			<th width="40%" class="tal">TX</th>
		</tr>
		<tr v-for="item in getHistory" :key="item.tx">
			<td class="tar tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.crtime * 1000)) }}</td>
			<td>
				<span v-if="Number(item.ticketStartNo) > 1e6">普通申购</span>
				<span v-else>算力申购</span>
			</td>
			<td>x{{ item.amountGem }}</td>
			<td class="vertical-children">
				<span v-if="item.isOver==false" style="color:#49c773">等待开奖</span>
				<span v-else>开奖结束</span>
			</td>
			<td class="tal">
				<img  @click="getApplyDetial(item)" src="../../assets/icon/view.png" alt="" class="cur-point" />&nbsp;
				<a :href="getTxUrl(item.tx)" target="_blank">
					<img src="../../assets/icon/viewTx.png" alt="" class="cur-point" />
				</a>
			</td>
		</tr>
	</table>
	
	<GemApply :applyInfo="applyInfo" :myApplyInfo="myApplyInfo"/>
	<Dialog id="gem-take-dialog" :top="100" :width="350">
		<div class="ly-input-content">
			<div class="aveage-box" v-for="item in  [0,4,8]" :key="item">
				<div v-for="item2 in [0,1,2,3]" :key="item + item2" style="padding:5px" >
					<div class="gem-item " style="height:65px" >
						<template v-if="getTakeArr[item + item2] != undefined">
							<img :src="require(`@/assets/gem/${getTakeArr[item + item2].type +'_'+ getTakeArr[item + item2].level}.png`)" alt=""  width="100%">
							<span class="gem-num stroke bold">{{getTakeArr[item + item2].num}}</span>
						</template>
					</div>
				</div>	
			</div>
		</div>
		<div class="mgt-20">
			<StatuButton  style="width:60%" :onClick="takeGem" :isDisable="getTakeArr.length == 0" :isLoading="lockBtn.takeGemLock > 0">领取</StatuButton>
		</div>
	</Dialog>
	<Dialog id="gem-num-result-dialig" :top="100" :width="350">
		<h3>查看申购情况</h3>
		<div class="tab-body mgt-10">
			<div class="aveage-box tab-content " style="padding:8px">
				<p class="tal opa-6">号码</p>
				<p class="tar opa-6">结果</p>
			</div>
			<div v-for="item in getRecordNoArr" :key="item.number">
				<div class="tab-split"></div>
				<div class="aveage-box tab-content small" style="padding:8px">
					<p class="tal">{{item.number}}</p>
					<p class="tar" v-if="historyDitail.isOver==true">
						<span v-if="item.isWins"><img :src="require(`@/assets/icon/${item.type}_icon.png`)" alt=""  height="30"></span>
						<span class="color-danger" v-else>未中奖</span>
					</p>
					<p v-else-if="historyDitail.isOver == '-'" class="tar">
						<Loading />
					</p>
					<p v-else class="tar">等待开奖</p>
				</div>
			</div>
		</div>
	</Dialog>
</div>
</template>
<script>
import { CommonMethod } from '@/mixin';
import GemApply from '@/views/Gem/GemApply'
import { Wallet, Http } from '@/utils';
import { Dialog, StatuButton, Loading } from '@/components';
import { mapState } from 'vuex';

let  timer = null;
export default {
	mixins: [CommonMethod],
	components: {GemApply, Dialog, StatuButton, Loading},
	data(){
		return({
			applyInfo: {
				maxAmount: "-",
				maxLuckyAmount: "-",
				nowAmount: "-",
				roundIndex: "",
				roundPrice: "-",
				roundStartTime: "-",
				roundState: "-",
				nowNormalAmount: "-",
				maxNormalLuckyAmount: "-",
				roundDuration: "-",
			},
			getCountDown: 0,
			gemType: ['red', 'green', 'blue', 'yellow'],
			myApplyInfo: {
				frozenBalance: 0,
				gems: [0,0,0,0],
				userHighTicket: [0,0],
				userNormalTicket: [0,0]
			},
			getHistory: [],
			historyDitail: {isOver: "-", wins: {}, item:{}, ticketStartNo:0, amountGem: 0 },
			account: "",
		})
	},
	computed:{
		...mapState({
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),

		getShowApplyType(){
			return this.gemType[this.applyInfo.roundIndex % 4]
		},
		//是否有宝石可以领取
		gemToTakeNum(){
			let num = 0;
			this.myApplyInfo.gems.map(item=>{
				num+= item
			});
			return num;
		},
		getTakeArr(){
			let arr = [];
			this.myApplyInfo.gems.map((num, index)=>{
				if(num > 0){
					arr.push({type: this.gemType[index], num: num, level: 1})
				}
			});
			return arr;
		},
		getRecordNoArr(){
			let retArr = [];
			let {wins, item} = this.historyDitail;
			let {ticketStartNo, amountGem} = item;
			if(ticketStartNo == undefined) return retArr;
			for (let index = 0; index < amountGem; index++) {
				let number = ticketStartNo + index;
				retArr.push({number, isWins: wins[number]!= undefined, type: this.gemType[item.roundIndex % 4]})
			} 
			return retArr;
		}
	},
	async created(){
		console.log("Gembuy")
		this.getApplyInfo();
		let count = 0;
		clearInterval(timer);
		timer = setInterval(async ()=>{
			count++;
			if(this.getCountDown > 0){
				this.getCountDown--;
				if(this.getCountDown == 0){
					await this.getApplyInfo();
					await this.getGemApply();
				}
			}
			if(count % 20 == 0){
				await this.getApplyInfo();
				await this.getUserApplyInfo();
				await this.getGemApply();
			}
		}, 1000);

		this.account = await Wallet.ETH.getAccount();
		await this.getUserApplyInfo();
		await this.getGemApply();

	},
	beforeDestroy(){
		clearInterval(timer);
	},
	methods: {
		async getApplyDetial(item){
			this.historyDitail.isOver = "-";
			this.historyDitail.item = item;
			this.oprDialog("gem-num-result-dialig", "block");
			let {roundIndex} = item;
			let result = await Http.getGemApplyResult(this.account, roundIndex);
			this.historyDitail.isOver = result.isOver;
			this.historyDitail.wins = result.wins;
		},
		async getGemApply(){
			let result = await Http.getGemApply(this.account);
			if(result){
				this.getHistory = result.list;
			}
		},
		//领取宝石
		async takeGem(){
			let hash = await Wallet.ETH.takeGem(()=>{
				this.getUserApplyInfo();
			});
			if(hash){
				this.lockBtnMethod("takeGemLock");
			}
		},
		//获取我的申购信息
		async getUserApplyInfo(){
			let result = await Wallet.ETH.getMyApplyInfo();
			if(result){
				this.myApplyInfo = result;
			}
		},
		async getApplyInfo(){
			let result = await Wallet.ETH.getGemApplyState();
			if(result){
				this.applyInfo = result;
				let dtTime = Number(result.roundStartTime) + Number(result.roundDuration) - parseInt(new Date().valueOf() / 1000);
				this.getCountDown = dtTime > 0? dtTime : 0;
			}
		}
	}
}
</script>
