<style src="./style.css"></style>
<template>
<div class="tac center-box">
	<div class="por clear mgt-20">
		<section class="col-md-7" style="padding:10px">
			<div class="adv-panel">
				<h1 class="vertical-children">
					<span>{{$t("Gemstone_01")}}</span>
					<img class="mgl-10 cur-point" @click="oprDialog('gem-rule-dialog','block')" src="../../assets/icon/help.png" alt="" height="30">
				</h1>
				<div class="tac mgt-10">
					<!-- <span v-if="gemApplyEndCountDown <=0 ">{{$t("Gemstone_50")}}</span> -->
					<template >
						<p v-if="getCountDown >0">{{$t("Gemstone_21")}}: {{getLeftTime(getCountDown)}}</p>
						<p v-else>{{$t("Gemstone_22")}}<span class="dotting"></span></p>
					</template>

					<div style="height:280px" id="gem-apply-type">
						<p v-if="applyInfo.roundIndex != '' ">
							<img :src="require(`../../assets/icon/gemIcon_${getShowApplyType}.png`)" alt="" height="280px"/>
						</p>
					</div>
					
				</div>
			</div>
		</section>

		<section class="col-md-5" style="padding:10px">
			<div class="panel por" style="height:380px;padding:30px">
				<section style="padding:10px">
					<div class="aveage-box tal" style="border-bottom:1px solid #5d646c;padding:20px">
						<div >
							<p class="small opa-6">{{$t("Gemstone_32")}}</p>
							<h3>{{applyInfo.nowNormalAmount}}</h3>
						</div>
						<div>
							<p class="small opa-6">{{$t("Gemstone_24")}}</p>
							<h3>{{ numFloor(applyInfo.maxNormalLuckyAmount / (Number(applyInfo.nowNormalAmount) >= Number(applyInfo.maxNormalLuckyAmount)?applyInfo.nowNormalAmount:applyInfo.maxNormalLuckyAmount) * 100, 1e3 ) || "-" }}%</h3>
						</div>
					</div>
					<div class="aveage-box tal" style="padding:20px">
						<div >
							<p class="small opa-6">{{$t("Gemstone_33")}}</p>
							<h3>{{applyInfo.nowAmount}}/{{applyInfo.maxAmount}}</h3>
						</div>
						<div>
							<p class="small opa-6">{{$t("Gemstone_24")}}</p>
							<h3>{{ numFloor(applyInfo.maxLuckyAmount / (Number(applyInfo.nowAmount) >= Number(applyInfo.maxLuckyAmount)?applyInfo.nowAmount:applyInfo.maxLuckyAmount) * 100, 1e3 ) || "-" }}%</h3>
						</div>
					</div>
				</section>
			
				<div class="mgt-10 aveage-box">
					<div class="dib por tac">
						<button class="btn-primary" style="margin:10px;width:80%" @click="oprDialog('gem-apply-dialog', 'block')">{{$t("Gemstone_14")}}</button>
						<p style="position:absolute;width:200%;left:-50%" class="cur-point" @click="oprDialog('gem-rule-dialog','block')">{{$t("Gemstone_02")}}>></p>
					</div>
					<div class="tac">
						<button class="btn-primary por" style="width:80%" @click="oprDialog('gem-take-dialog', 'block')">
							<span class="notice" v-if="gemToTakeNum > 0"></span>
							{{$t("Gemstone_15")}}
						</button>
					</div>
				</div>
				<div class="gemBag" @click="oprDialog('gemBag-dialog','block')">
					<img  src="../../assets/icon/gem_bag_icon.png" alt="">
					<p class="stroke" :data-text="$t('Gemstone_16')">{{$t("Gemstone_16")}}</p>
				</div>
			</div>
		</section>
		
	</div>


	<!-- 记录 -->
	<div class="col-md-12" style="padding:10px">
		<section class="mgt-10" style="padding:10px 15px;background:#13181F;border-radius:20px">
			<table class="small  new-table" border="0" frame="void" rules="none" >
				<tr>
					<th width="30%" class="tal tac-xs">{{ $t("BOX_12") }}</th>
					<th width="20%" class="tal">{{ $t("BOX_26") }}</th>
					<th width="10%">{{ $t("Gemstone_29") }}</th>
					<th width="20%">{{ $t("BOX_27") }}</th>
					<th width="40%" class="tar">TX</th>
				</tr>
				<tr v-for="item in getHistory" :key="item.tx">
					<td class="tal tac-xs">{{ dateFtt("yyyy-MM-dd hh:mm:ss" , new Date(item.crtime * 1000)) }}</td>
					<td class="tal">
						<span v-if="Number(item.ticketStartNo) > 1e6">{{$t("Gemstone_27")}}</span>
						<span v-else>{{$t("Gemstone_28")}}</span>
					</td>
					<td>x{{ item.amountGem }}</td>
					<td class="vertical-children">
						<span v-if="item.isOver==false" style="color:#49c773">{{$t("Gemstone_30")}}</span>
						<span v-else>{{$t("Gemstone_31")}}</span>
					</td>
					<td class="tar">
						<img  @click="getApplyDetial(item)" src="../../assets/icon/view.png" alt="" class="cur-point" />&nbsp;
						<a :href="getTxUrl(item.tx)" target="_blank">
							<img src="../../assets/icon/viewTx.png" alt="" class="cur-point" />
						</a>
					</td>
				</tr>
			</table>
		</section>
	</div>
	
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
