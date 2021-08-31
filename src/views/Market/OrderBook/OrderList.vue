<template>
	<div>
		<section class="mgt-20" style="padding:10px 15px;background:#13181F;border-radius:20px">
			<ul class="statistics-top-tab hide" style="padding:0px">
				<li @click="tableShowType = 'all';" :class="tableShowType == 'all'?'active':''" class="opa-6">所有</li>
				<li @click="tableShowType = 'buy';" :class="tableShowType == 'buy'?'active':''" class="opa-6">买单</li>
				<li @click="tableShowType = 'sell';" :class="tableShowType == 'sell'?'active':''" class="opa-6">卖单</li>
			</ul>

			<table class="small  new-table pj-table tal" border="0" frame="void" rules="none" >
				<tr>
					<th  class="tal">{{ $t("BOX_26") }}</th>
					<th  >{{ $t("BOX_12") }}</th>
					<th >{{ $t("BOX_13") }}</th>
					<th  >单价</th>
					<th class="tar">操作</th>
				</tr>
				<tr v-for="item in orderData" :key="item.orderId">
					<td class="tal tac-xs" :style="{color: Number(item.index) >= 1e11? '#F7AE30': '#12D4E7'}">{{ Number(item.index) >= 1e11?"Buy":"Sell" }}</td>
					<td >{{ dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.ts * 1e3)) }}</td>
					<td>x{{ item.count }}</td> 
					<td class="vertical-children">
						<img  class="hide-xs" src="@/assets/coin/BUSD.png" height="20" alt="">
						{{numFloor(item.price / 1e6, 1e4)}} BUSD
					</td>
					<td class="tar">
						<!-- <button class="btn-line btn-small" @click="changePriceObj= item;inputPrice = numFloor(item.price/1e6, 1e4);oprDialog('changePrice-dialog', 'block')">修改价格</button> -->
						<button class="btn-line btn-small mgl-5" @click="cancelOrder(item)">撤销</button>
					</td>
				</tr>
			</table>
		</section>
		<Dialog id="changePrice-dialog" :top="100" :width="390">
			<h2>修改价格</h2>
			<section class="mgt-10">
				<p class="tal small">价格</p>
				<div class="por mgt-10">
					<div class="ly-input-pre-icon">
						<img  src="@/assets/coin/BUSD.png" alt="" height="20" />
					</div>
					<input class="ly-input" type="number" style=" text-align: left; width: 100%; padding-left:50px" v-model="inputPrice" v-number />
				</div>
			</section>
			<section class="mgt-20">
				<p class="tal small">数量</p>
				<div class="por mgt-10">
					<div class="ly-input-pre-icon">
						<img  src="@/assets/coin/BOX.png" alt="" width="30" />
					</div>
					<input class="ly-input" type="number" style=" text-align: left; width: 100%; padding-left:50px;background:#070d14" readonly="readonly"  :value="changePriceObj.count" />
				</div>
			</section>
			<section class="mgt-20">
				<p class="tal small">总计价格</p>
				<div class="por mgt-10">
					<div class="ly-input-pre-icon">
						<img  src="@/assets/coin/BUSD.png" alt="" height="20" />
					</div>
					<input class="ly-input" type="number" :value="getToTalValue" readonly="readonly" style=" text-align: left; width: 100%; padding-left:50px;background:#070d14" />
				</div>
			</section>
			<p>
				价格变化：

			</p>
			<div class="tac mgt-20">
				<p class="mgt-10 vertical-children">
					<span>可用: {{coinArr["BUSD"].balance}} BUSD</span>
					<img class="mgl-5" src="@/assets/coin/BUSD.png" alt="" height="20" />
				</p>
				<button class="btn-primary mgt-10" style="min-width:150px">修改价格</button>
			</div>
		</Dialog>
	</div>
</template>

<script>
import Erc1155TradeHttp from '@/utils/Erc1155TradeHttp';
import { Wallet } from '@/utils';
import { CommonMethod } from '@/mixin';
import { Dialog } from '@/components';
import { mapState } from 'vuex';

export default {
	mixins: [CommonMethod],
	components: { Dialog},
	data(){
		return({
			tableShowType: "all",
			myAccount: "",
			orderData: [],
			changePriceObj: {
				count: 0,
				price: 0,
				index: 0,
				orderId: 0,
			},
			inputPrice: 0,
		})
	},
	computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		getToTalValue(){
			return this.numFloor(Number(this.changePriceObj.count) * Number(this.inputPrice), 1e4);
		}
	},
	async created(){
		this.myAccount = await Wallet.ETH.getAccount();
		await this.getMyOrder();
	},
	methods:{
		async getMyOrder(){
			if(this.myAccount == "") return;
			this.myAccount = "0x1403cC55a47d864fb210C057Be454222f709F945"
			let res = await Erc1155TradeHttp.post("/erc1155/orders/my", {page: 0, limit: 100, addr: this.myAccount});
			console.log(res);
			if(res.data.code == 200){
				this.orderData = res.data.data.data;
			}
		},
		cancelOrder(item){
			this.getConfirmDialog().show("确定撤销此订单吗？", async ()=>{
				let hash = await Wallet.ETH.cancelOrderBook({erc1155_: 1,index_: item.index, orderId_: item.orderId});
				if(hash){
					console.log(hash);
				}
			})
		}
	}
}
</script>
