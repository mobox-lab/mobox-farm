<style src="./style.css"></style>
<template>
<div class="tac">
	<div class="por">
		<h1 class="vertical-children">
			<span>{{$t("Gemstone_01")}}</span>
			<img class="mgl-10 cur-point" @click="oprDialog('gem-rule-dialog','block')" src="../../assets/icon/help.png" alt="" height="30">
		</h1>
		<div class="tac mgt-10">
			<span v-if="gemApplyEndCountDown <=0 ">{{$t("Gemstone_50")}}</span>
			<template v-else>
				<p v-if="getCountDown >0">{{$t("Gemstone_21")}}: {{getLeftTime(getCountDown)}}</p>
				<p v-else>{{$t("Gemstone_22")}}<span class="dotting"></span></p>
			</template>

			<div style="height:280px" id="gem-apply-type">
				<p v-if="applyInfo.roundIndex != '' ">
					<img :src="require(`../../assets/icon/gemIcon_${getShowApplyType}.png`)" alt="" height="280px"/>
				</p>
			</div>
			<table  class="dib" id="apply-info-table" cellpadding="0" cellspacing="0">
				<tr>
					<td >
						<p class="small opa-6">{{$t("Gemstone_32")}}</p>
						<p>{{applyInfo.nowNormalAmount}}</p>
					</td>
					<td >
						<p class="small opa-6">{{$t("Gemstone_24")}}</p>
						<p>{{ numFloor(applyInfo.maxNormalLuckyAmount / (Number(applyInfo.nowNormalAmount) >= Number(applyInfo.maxNormalLuckyAmount)?applyInfo.nowNormalAmount:applyInfo.maxNormalLuckyAmount) * 100, 1e3 ) || "-" }}%</p>
					</td>
				</tr>
				<tr>
					<td >
						<p class="small opa-6">{{$t("Gemstone_33")}}</p>
						<p>{{applyInfo.nowAmount}}/{{applyInfo.maxAmount}}</p>
					</td>
					<td >
						<p class="small opa-6">{{$t("Gemstone_24")}}</p>
						<p>{{ numFloor(applyInfo.maxLuckyAmount / (Number(applyInfo.nowAmount) >= Number(applyInfo.maxLuckyAmount)?applyInfo.nowAmount:applyInfo.maxLuckyAmount) * 100, 1e3 ) || "-" }}%</p>
					</td>
				</tr>
			</table>
		</div>
		<div class="mgt-10">
			<div class="dib por">
				<button class="btn-primary" style="margin:10px" @click="oprDialog('gem-apply-dialog', 'block')">{{$t("Gemstone_14")}}</button>
				<p style="position:absolute;width:200%;left:-50%" class="cur-point" @click="oprDialog('gem-rule-dialog','block')">{{$t("Gemstone_02")}}>></p>
			</div>
			<button class="btn-primary por" style="margin:10px" @click="oprDialog('gem-take-dialog', 'block')">
				<span class="notice" v-if="gemToTakeNum > 0"></span>
				{{$t("Gemstone_15")}}
			</button>
		</div>
		<div class="gemBag" @click="oprDialog('gemBag-dialog','block')">
			<img  src="../../assets/icon/gem_bag_icon.png" alt="">
			<p class="stroke" :data-text="$t('Gemstone_16')">{{$t("Gemstone_16")}}</p>
		</div>
	</div>
	<!-- 记录 -->
	<table class="mgt-50 small table-his" border="0" frame="void" rules="none" >
		<tr>
			<th width="30%" class="tar">
				<span class="dib tac" style="width: 120px">
					{{ $t("BOX_12") }}
				</span>
			</th>
			<th width="20%">{{ $t("BOX_26") }}</th>
			<th width="10%">{{ $t("Gemstone_29") }}</th>
			<th width="20%">{{ $t("BOX_27") }}</th>
			<th width="40%" class="tal">TX</th>
		</tr>
		<tr v-for="item in getHistory" :key="item.tx">
			<td class="tar tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.crtime * 1000)) }}</td>
			<td>
				<span v-if="Number(item.ticketStartNo) > 1e6">{{$t("Gemstone_27")}}</span>
				<span v-else>{{$t("Gemstone_28")}}</span>
			</td>
			<td>x{{ item.amountGem }}</td>
			<td class="vertical-children">
				<span v-if="item.isOver==false" style="color:#49c773">{{$t("Gemstone_30")}}</span>
				<span v-else>{{$t("Gemstone_31")}}</span>
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
							<img :src="require(`@/assets/gem/${gemTypeToNum[getTakeArr[item + item2].type] + getTakeArr[item + item2].level}.png`)" alt=""  width="100%">
							<span class="gem-num stroke bold">{{getTakeArr[item + item2].num}}</span>
						</template>
					</div>
				</div>	
			</div>
		</div>
		<div class="mgt-20">
			<StatuButton  style="width:60%" :onClick="takeGem" :isDisable="getTakeArr.length == 0" :isLoading="lockBtn.takeGemLock > 0">{{$t("Gemstone_10")}}</StatuButton>
		</div>
	</Dialog>
	<Dialog id="gem-num-result-dialig" :top="100" :width="350">
		<h3>{{$t("Gemstone_17")}}</h3>
		<div class="tab-body mgt-10">
			<div class="aveage-box tab-content " style="padding:8px">
				<p class="tal opa-6">{{$t("Gemstone_18")}}</p>
				<p class="tar opa-6">{{$t("Gemstone_19")}}</p>
			</div>
			<div v-for="item in getRecordNoArr" :key="item.number">
				<div class="tab-split"></div>
				<div class="aveage-box tab-content small" style="padding:8px">
					<p class="tal">{{item.number}}</p>
					<p class="tar" v-if="historyDitail.isOver==true">
						<span v-if="item.isWins"><img :src="require(`@/assets/icon/${item.type}_icon.png`)" alt=""  height="30"></span>
						<span class="color-danger" v-else>{{$t("Gemstone_20")}}</span>
					</p>
					<p v-else-if="historyDitail.isOver == '-'" class="tar">
						<Loading />
					</p>
					<p v-else class="tar">{{$t("Gemstone_30")}}</p>
				</div>
			</div>
		</div>
	</Dialog>
	<Dialog id="gem-rule-dialog" :top="100" :width="520">
		<h2>{{$t("Gemstone_02")}}</h2>
		<p v-html="$t('Gemstone_03')" class="tal mgt-20"></p>
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
			gemTypeToNum:{"red":100,"green":200,"blue":300,"yellow":400},
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
			gemApplyEndCountDown: (state) => state.globalState.data.gemApplyEndCountDown,
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
