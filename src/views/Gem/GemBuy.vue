<style src="./style.css"></style>
<template>
<div class="tac">
	<div class="por">
		<h1>宝石申购</h1>
		<div class="tac mgt-10">
			<p v-if="Number(applyInfo.roundStartTime) * 1000 < new Date().valueOf()">申购倒计时: {{getLeftTime(getCountDown)}}</p>
			<p v-else>申购开始时间:{{dateFtt('yyyy-MM-dd hh:mm:ss', new Date(applyInfo.roundStartTime * 1000))}}</p>
			<table  class="dib mgt-10" id="apply-info-table" cellpadding="0" cellspacing="0">
				<tr>
					<td >
						<p class="small opa-6">普通申购数量</p>
						<p>{{applyInfo.nowNormalAmount}}</p>
					</td>
					<td >
						<p class="small opa-6">中签数量</p>
						<p>{{applyInfo.maxNormalLuckyAmount}}</p>
					</td>
				</tr>
				<tr>
					<td >
						<p class="small opa-6">高级申购数量</p>
						<p>{{applyInfo.nowAmount}}/{{applyInfo.maxAmount}}</p>
					</td>
					<td >
						<p class="small opa-6">中签数量</p>
						<p>{{applyInfo.maxLuckyAmount}}</p>
					</td>
				</tr>
			</table>
			<p>
				<img :src="require(`../../assets/icon/gemIcon_${getShowApplyType}.png`)" alt="" height="350px"/>
			</p>
		</div>
		<div class="mgt-10">
			<button class="btn-primary" style="margin:10px" @click="oprDialog('gem-apply-dialog', 'block')">宝石申购</button>
			<button class="btn-primary" style="margin:10px">收集宝石</button>
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
			<td class="tar tac-xs">{{ getTimeFtt(item.crtime) }}</td>
			<td>{{ $t(eventToLang[item.event]) }}</td>
			<td>x{{ item.amount }}</td>
			<td class="vertical-children">
				<span v-if="item.state != 1 && item.state != -1">
					&nbsp; {{ $t("Common_08") }}...
				</span>
				<span v-if="item.state == 1">{{ $t("Common_09") }}</span>
				<span v-if="item.state == -1">
					<svg  viewBox="0 0 1024 1024"  width="13" height="13"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF5B5C" p-id="3023"></path><path d="M328.988444 292.750222a17.066667 17.066667 0 0 1 24.120889 0L512 451.697778l158.890667-158.890667a17.066667 17.066667 0 0 1 24.120889 0l36.238222 36.238222a17.066667 17.066667 0 0 1 0 24.120889L572.302222 512l158.947556 158.833778a17.066667 17.066667 0 0 1 0 24.120889l-36.238222 36.238222a17.066667 17.066667 0 0 1-24.120889 0L512 572.302222l-158.833778 158.890667a17.066667 17.066667 0 0 1-24.120889 0l-36.238222-36.238222a17.066667 17.066667 0 0 1 0-24.120889L451.697778 512 292.750222 353.109333a17.066667 17.066667 0 0 1 0-24.120889l36.238222-36.238222z" fill="#FFFFFF"></path></svg>
					&nbsp;
					Fail
				</span>
			</td>
			<td class="tal">
				<img v-if="item.event == 'MintBox' && item.state == 1" @click="showHistoryDialog(item)" src="../../assets/icon/view.png" alt="" class="cur-point" />&nbsp;
				<a :href="getTxUrl(item.tx)" target="_blank">
					<img src="../../assets/icon/viewTx.png" alt="" class="cur-point" />
				</a>
			</td>
		</tr>
	</table>
	<GemApply :applyInfo="applyInfo" :myApplyInfo="myApplyInfo"/>
</div>
</template>
<script>
import { CommonMethod } from '@/mixin';
import GemApply from '@/views/Gem/GemApply'
import { Wallet } from '@/utils';

let  timer = null;
export default {
	mixins: [CommonMethod],
	components: {GemApply},
	data(){
		return({
			applyInfo: {
				maxAmount: "5000",
				maxLuckyAmount: "1000",
				nowAmount: "0",
				roundIndex: "0",
				roundPrice: "9051091785467312086",
				roundStartTime: "1619661600",
				roundState: "",
				nowNormalAmount: "0",
				maxNormalLuckyAmount: "0",
			},
			getCountDown: 0,
			gemType: ['red', 'green', 'blue', 'yellow'],
			myApplyInfo: {
				frozenBalance: 0,
				gems: [0,0,0,0],
				userHighTicket: [0,0],
				userNormalTicket: [0,0]
			}
		})
	},
	computed:{
		getHistory(){
			return [];
		},
		getShowApplyType(){
			return this.gemType[this.applyInfo.roundIndex % 4]
		}
	},
	async created(){
		console.log("Gembuy")
		this.getApplyInfo();
		let count = 0;
		clearInterval(timer);
		timer = setInterval(()=>{
			count++
			if(this.getCountDown > 0){
				this.getCountDown--;
				if(this.getCountDown == 0){
					this.getApplyInfo();
				}
			}
			if(count % 20 == 0){
				this.getApplyInfo();
			}
		}, 1000);

		await Wallet.ETH.getAccount();
		this.getUserApplyInfo();

	},
	beforeDestroy(){
		clearInterval(timer);
	},
	methods: {
		async getUserApplyInfo(){
			let result = await Wallet.ETH.getMyApplyInfo();
			console.log("getUserApplyInfo",result);
			if(result){
				this.myApplyInfo = result;
			}
		},
		async getApplyInfo(){
			let result = await Wallet.ETH.getGemApplyState();
			console.log(result);
			if(result){
				this.applyInfo = result;
				let dtTime = parseInt(new Date().valueOf() / 1000) - Number(result.roundStartTime);
				this.getCountDown = dtTime > 0? dtTime : 0;
			}
		}
	}
}
</script>
