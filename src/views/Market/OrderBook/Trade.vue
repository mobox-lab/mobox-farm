<template>
	<div class="mgt-20">
		<div class="row" >
			<div class="col-md-6 col-xs-5">
				<div class="panel noRadius-right-xs" style="padding-bottom: 30px;">
					<section id="trade-head">
						<div class="aveage-box small opa-6">
							<p class="tal">价格<span class="dpblock-xs small">(USDT)</span></p>
							<p class="tar-xs">数量<span class="dpblock-xs small">(BOX)</span></p>
							<p class="tar hide-xs">总价<span>(USDT)</span></p>
						</div>
					</section>
					<div class="mgt-20" id="sell">
						<div class="trade-list-item por" v-for="item in 10" :key="100+item">
							<template v-if="tradeData.ask[11-item-1]">
								<div class="showLen bg-sell" :style="{width: tradeData.ask[11-item-1].count/nowMaxItemNum.sell *100 +'%'}"></div>
								<div class="aveage-box">
									<p class="tal color-buy">{{tradeData.ask[11-item-1].price}}</p>
									<p class="tar-xs">{{tradeData.ask[11-item-1].count}}</p>
									<p class="tar hide-xs">{{ tradeData.ask[11-item-1].totalPrice}}</p>
								</div>
							</template>
						</div>
					</div>
				
					<section class="trade-price vertical-children mgt-20" >
						<img src="@/assets/coin/USDT.png" alt="" height="26" class="hide-xs">
						<span class="mgl-5">{{tradeData.lastPrice}} </span>
						<span class="hide-xs">USDT</span>
					</section>

					<div class="mgt-20" id="buy">
						<div class="trade-list-item por" v-for="item in 10" :key="1000+item">
							<template v-if="tradeData.bid[item-1]">
								<div class="showLen bg-buy" :style="{width: tradeData.bid[item-1].count/nowMaxItemNum.buy * 100 +'%'}">{}</div>
								<div class="aveage-box">
									<p class="tal color-sell">{{tradeData.bid[item-1].price}}</p>
									<p class="tar-xs">{{tradeData.bid[item-1].count}}</p>
									<p class="tar hide-xs">{{tradeData.bid[item-1].totalPrice}}</p>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-xs-7" >
				<div class="panel tal noRadius-left-xs" >
					<section class="tab-type" style="font-size:16px">
						<div class="tab-type-list-item" :class="{active: oprType == 'buy'}" @click="oprType='buy';boxNum = '' ">购买Box</div>
						<div class="tab-type-list-item" :class="{active: oprType == 'sell'}" @click="oprType='sell';boxNum = '' " style="border-bottom-color: #E8772B">出售Box</div>
					</section>
					<section class="mgt-30">
						<p class="tal">价格</p>
						<div class="por mgt-10">
							<div class="ly-input-pre-icon">
								<img  src="@/assets/coin/USDT.png" alt="" height="20" />
							</div>
							<input class="ly-input" type="text" style=" text-align: left; width: 100%; padding-left:50px" v-model="price" v-number />
						</div>
					</section>
					<section class="mgt-20">
						<p class="tal">数量</p>
						<div class="por mgt-10">
							<div class="ly-input-pre-icon">
								<img  src="@/assets/coin/BOX.png" alt="" width="30" />
							</div>
							<input class="ly-input" type="text" style=" text-align: left; width: 100%; padding-left:50px" v-model="boxNum" v-int />
							<div class="ly-input-after">
								<span v-if="Number(boxNum) > 0" id="numOpr">
									<img class="cur-point"  src="@/assets/icon/reduce.png" alt="" height="30" @click="boxNum > 0?boxNum--:'' ">
									<img class="mgl-5 cur-point"  src="@/assets/icon/add.png" alt="" height="30" @click="boxNum++">
								</span>
								<button class=" btn-small mgl-5" :class="oprType== 'buy'?'btn-primary':'btn-danger' " @click="maxBoxNum">Max</button>
							</div>
						</div>
					</section>
					<section class="mgt-20">
						<p class="tal">总计价格</p>
						<div class="por mgt-10">
							<div class="ly-input-pre-icon">
								<img  src="@/assets/coin/USDT.png" alt="" height="20" />
							</div>
							<input class="ly-input" type="text" :value="getToTalValue" readonly="readonly" style=" text-align: left; width: 100%; padding-left:65px;background:#070d14" />
							
						</div>
					</section>
					<p class="mgt-30 vertical-children" v-if="oprType == 'buy'">
						<span>可用: {{coinArr["USDT"].balance}} USDT</span>
						<img class="mgl-5" src="@/assets/coin/USDT.png" alt="" height="20" />
					</p>
					<p class="mgt-30 vertical-children" v-if="oprType == 'sell'">
						<span>可用: {{myBoxNum}} BOX</span>
						<img class="mgl-5" src="@/assets/coin/BOX.png" alt="" height="20" />
					</p>
					<section class="mgt-10" style="margin-bottom: 10px">
						<div v-if="oprType == 'buy'" :class="coinArr['USDT'].allowanceToOrderBook == 0 ?'btn-group':''">
							<StatuButton style="min-width:150px" v-if="coinArr['USDT'].allowanceToOrderBook == 0" data-step="1" :isLoading="coinArr['USDT'].isApproving" :onClick="()=>approve('USDT')">{{$t("Air-drop_16")}} USDT</StatuButton>
							<br/>
							<StatuButton style="min-width:150px" class="mgt-10" data-step="2" :isLoading="lockBtn.makeBidOrderLock > 0" :isDisable="coinArr['USDT'].allowanceToOrderBook <= 0 || !inputCheckOk" :onClick="buyBox">Buy Box</StatuButton>
						</div>
						<div v-if="oprType == 'sell'" :class="boxHasApproved != -1 && !boxHasApproved ?'btn-group':''">
							<StatuButton style="min-width:150px" v-if="boxHasApproved != -1 && !boxHasApproved" data-step="1" :isLoading="lockBtn.approveLock > 0" :onClick="approveBox">{{$t("Air-drop_16")}} BOX</StatuButton>
							<br/>
							<StatuButton style="min-width:150px" class="mgt-10 btn-danger" data-step="2" :isLoading="lockBtn.makeAskOrderLock > 0" :isDisable="!boxHasApproved || !inputCheckOk" :onClick="sellBox">Sell Box</StatuButton>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Erc1155TradeHttp from '@/utils/Erc1155TradeHttp'
import { mapState } from 'vuex';
import { CommonMethod } from '@/mixin';
import { Wallet, Common } from '@/utils';
import { WalletConfig, PancakeConfig } from '@/config';
import { StatuButton } from '@/components';

export default {
	mixins: [CommonMethod],
	components: {StatuButton},
	data(){
		return({
			oprType: "buy",
			price: "",
			boxNum: "",
			tradeData: {
				ask: [],
				bid: [],
				lastPrice: "-",
			},
			nowMaxItemNum: {
				sell: 0,
				buy: 0,
			},
			boxHasApproved: -1,
		})
	},
	computed:{
		...mapState({
			nowTs: (state) => state.globalState.data.nowTs,
			coinArr: (state) => state.bnbState.data.coinArr,
			myBoxNum: (state) => state.gemState.data.boxNum,
			lockBtn: (state) => state.globalState.data.lockBtn,
		}),
		getToTalValue(){
			return this.numFloor(Number(this.boxNum) * Number(this.price), 1e6);
		},
		inputCheckOk(){
			return Number(this.price) > 0 && Number(this.boxNum) > 0;
		}
	},
	watch: {
		nowTs: function(time){
			if(time % 5 == 0) {
				this.getPrices();
			}
		}
	},
	async created(){
		this.getPrices();

		await Wallet.ETH.getAccount();
		await this.viewAllowance("USDT");
		await this.isApproveBox();
	},
	methods: {
		maxBoxNum(){
			if(this.oprType == "sell"){
				this.boxNum = this.myBoxNum
			}else{
				this.boxNum = parseInt(this.coinArr["USDT"].balance / this.price);
			}
		},
		async viewAllowance(coinKey){
			if(this.coinArr[coinKey].allowanceToOrderBook > 0) return;

			let allowanceToOrderBook = await Wallet.ETH.viewErcAllowanceToTarget(PancakeConfig.SelectCoin[coinKey].addr, WalletConfig.ETH.orderBookContract, false);
			if(allowanceToOrderBook){
				this.coinArr[coinKey].allowanceToOrderBook = Number(allowanceToOrderBook);
				this.coinArr.ts = new Date().valueOf();
				this.$store.commit("bnbState/setData", {coinArr: this.coinArr});
			}
		},
		async isApproveBox(isForce = false){
			if(this.boxHasApproved != -1 && !isForce) return;
			let isApprove = await Wallet.ETH.isApprovedForAll(WalletConfig.ETH.newBoxToken, WalletConfig.ETH.orderBookContract);
			if(isApprove != null){
				this.boxHasApproved = isApprove;
			}
		},
		async approveBox(){
			let hash = await Wallet.ETH.approvedForAll(WalletConfig.ETH.newBoxToken, WalletConfig.ETH.orderBookContract, ()=>{
				this.isApprove(true);
			});
			if(hash){
				this.lockBtnMethod("approveLock");
			}
		},
		async approve(coinKey){
			let {allowanceToOrderBook, isApproving} = this.coinArr[coinKey];
			if(allowanceToOrderBook > 0 || isApproving) return;

			let hash = await Wallet.ETH.approveErcToTarget(PancakeConfig.SelectCoin[coinKey].addr,
			WalletConfig.ETH.orderBookContract, {coinKey, type: "allowanceToOrderBook"});
			if (hash) {
				this.coinArr[coinKey].isApproving = true;
			}
		},
		async getIndex({type, price, count}){
			let res = await Erc1155TradeHttp.post("/erc1155/indexes", {erc1155: 1, type, price, count});
			return res;
		},
		async buyBox(){
			if(Number(this.getToTalValue) > Number(this.coinArr["USDT"].balance)){
				this.showNotify(this.$t("Market_34"), "error")
			}
	
			let res = await this.getIndex({type: "bid", price: this.price, count: this.boxNum});
			if(res.data.code == 200){
				let param = [ Number(this.price), res.data.data.storeIndex, 1, 1, 1, Number(this.boxNum), res.data.data.indexes, ];
				let hash = await Wallet.ETH.orderBookOpr(param, "makeBidOrder");
				if(hash){
					Common.app.lockBtnMethod("makeBidOrderLock");
				}
			}else{
				this.showNotify(res.data, "error");
			}

		},
		async sellBox(){
			if(Number(this.myBoxNum) < Number(this.boxNum)){
				this.showNotify(this.$t("Market_34"), "error")
			}
	
			let res = await this.getIndex({type: "ask", price: this.price, count: this.boxNum});
			if(res.data.code == 200){
				let param = [ Number(this.price), res.data.data.storeIndex, 1, 1, 1, Number(this.boxNum), res.data.data.indexes, ];
				let hash = await Wallet.ETH.orderBookOpr(param, "makeAskOrder")
				if(hash){
					Common.app.lockBtnMethod("makeAskOrderLock");
				}
			}else{
				this.showNotify(res.data, "error");
			}

		},
		async getPrices(){
			let res = await Erc1155TradeHttp.post("/erc1155/prices", {erc1155: 1});
			if(res.data.code == 200){
				if(this.tradeData.lastPrice == "-") this.price = res.data.data.lastPrice;
				this.tradeData = res.data.data;
				let tradeData = res.data.data;
				tradeData.ask.map(item=>{
					item.totalPrice = this.numFloor(item.price * item.count);
					if(this.nowMaxItemNum.sell < Number(item.count)) this.nowMaxItemNum.sell = Number(item.count)
				});
				tradeData.bid.map(item=>{
					item.totalPrice = this.numFloor(item.price * item.count);
					if(this.nowMaxItemNum.buy < Number(item.count)) this.nowMaxItemNum.buy = Number(item.count)
				});
			}
		}
	}
}
</script>

<style scoped>
	.trade-price{
		font-size: 20px;
		font-weight: 800;
		padding: 10px 0px;
		background: #1F232A;
		border-radius: 10px;
	}
	.panel{
		padding: 20px 30px;
	}
	.bg-sell{
		background: #e14f4d;
	}
	.bg-buy{
		background: #a1fa40;
	}
	.showLen{
		position: absolute;
		height: 100%;
		right: 0px;
		opacity: 0.2;
	}

	.trade-list-item .aveage-box{
		position: relative;
		z-index: 3;
	}
	.trade-list-item{
		padding: 0px 5px;
		margin-top: 2px;
		height: 25px;
		line-height: 25px;
	}

	.trade-list-item *{
		font-size: 14px;
		font-family: Verdana !important ;
	}

	@media (max-width: 768px) {
		.panel{
			padding: 10px;
			border-radius: 10px;
		}
		.noRadius-left-xs{
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
		.noRadius-right-xs{
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}
		#numOpr{
			display: none;
		}
		#sell .trade-list-item:nth-child(1),
		#sell .trade-list-item:nth-child(2),
		#sell .trade-list-item:nth-child(3),
		#buy .trade-list-item:nth-child(8),
		#buy .trade-list-item:nth-child(9),
		#buy .trade-list-item:nth-child(10)
		{
			display: none;
		}
		.btn-group{
			left: 0px;
		}
		.trade-list-item *{
			font-size: 10px;
		}
		.trade-list-item{
			height: 20px;
			line-height: 20px;
		}
		.tar-xs{
			text-align: right;
		}
		.trade-price{
			font-size: 12px;
			font-weight: 800;
			padding: 5px 0px;
			background: #1F232A;
			border-radius: 5px;
		}
		.dpblock-xs{
			display: block;
		}
		.trade-head{
			font-size: 10px;
		}
	}
</style>
