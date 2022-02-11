<template>
	<section>
		<Dialog id="group-sell-dialog" :top="20" :width="500">
			<h2>{{$t("Market_66")}}</h2>
			<div class="por tal mgt-10">
				<p class="opa-6">{{$t("Market_15")}}</p>
				<p class="cur-point vertical-children" style="position: absolute; right: 0px; top: 0px" @click="$store.commit('marketState/emptyGroupSellCar')" >
					<span class="opa-6"> {{$t("Market_16")}} </span>
					<svg viewBox="0 0 1024 1024" width="20" height="20">
						<path fill="#838689" d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"></path>
						<path fill="#838689" d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"></path>
					</svg>
				</p>
			</div>
			<div class="dialog-content mgt-10" id="shop-car-content" style="padding-bottom:15px">
				<div v-for="item in groupSellCar" :key="item.prototype" :class="'pet_hover_lv' +item.vType" class="shop-car-item  vertical-children por mgt-10 por">
					<div class="dib por">
						<img  :src="require(`@/assets/pet/${item.prototype}.png`)" alt="" width="100" height="100" />
						<p style="position:absolute;bottom:5px;width:100%;text-align:center" v-if="item.tokenId == 0">
							<span style="background:rgba(0,0,0,0.5);padding:2px 10px;font-size:12px;border-radius:10px">x1</span>
						</p>
						<p class="vertical-children small" v-if="item.level > 1" style="position:absolute;top:5px;left:15px;background:rgba(0,0,0,0.5);border-radius:30px;padding:0px 5px;">
							<span>Lv.1</span>
							<img src="@/assets/icon/airdrop.png" width="10" alt=""  class="mgl-5"/>&nbsp;
							<span  :class="getHashrateColor(item)">{{item.hashrate}}</span>
						</p>
					</div>
					<div class="dib small mgl-5">
						<p class="vertical-children">
							<img src="@/assets/icon/airdrop.png" width="20" alt="" />
							<span class="mgl-5" style="font-size:18px" :class="getHashrateColor(item)"> {{ item.lvHashrate }} </span>
						</p>
						<p class="vertical-children mgt-5">
							<img :src=" require(`@/assets/icon/${ category_img[item.category] }.png`) " width="12" alt="" />&nbsp;
							<span class="mgl-5"> Lv.{{ item.level }} </span>
						</p>
						<p class="vertical-children mgt-5">
							<img :src=" require(`@/assets/icon/bnb.png`) " width="12" alt="" />
							<span class="mgl-5"> {{  $t(item.tokenName) }} </span>
						</p>
						
					</div>
					<div class="absolute-r tar" style="right: 10px; top:auto; bottom:20px;">
						<p class="vertical-children dib" style="background: rgba(0,0,0,0.3);border-radius: 50px;padding:3px 15px">
							<img src="@/assets/coin/BUSD.png" height="20" alt="" />
							<span style="font-size: 16px" class="color-w mgl-5" >{{ item.groupSellPrice }}</span >&nbsp;
						</p>
						<img @click="editPrice(item, true)" class="mgl-5 cur-point" src="@/assets/icon/edit.png" height="24" alt="" />
					</div>
					<div @click="deleteItem(item)" class="absolute-r  vertical-children cur-point" style="background: rgba(0,0,0,0.3); border-radius: 0px 14px 0px 14px;right: 0px;padding:3px 15px">
						<span > {{$t("Market_67")}} </span>
						<svg viewBox="0 0 1024 1024" width="15" height="15">
							<path fill="#ffffff" d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"></path>
							<path fill="#ffffff" d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="vertical-children por mgt-10 tac" >
				<button @click="confirmSellCar" :class="{'disable-btn': groupSellCar.length == 0}" class="btn-primary "  >
					{{$t("Market_66")}}
				</button>
			</div>
		</Dialog>
		<Dialog id="set-group-price-dialog" :top="200" :width="400">
			<h2 class="mgt-10">{{$t("Market_10")}}</h2>
			<div class="mgt-20">
				<div class="ly-input-content mgt-10">
					<p class="small tal opa-6">{{$t("Market_17")}}</p>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  src="@/assets/coin/BUSD.png" alt="" />
						</div>
						<input v-model="inputPrice" class="ly-input" type="text"
							style=" background: #0f172a; text-align: center; width: 100%; "
							:placeholder="$t('Market_10')"
							v-number
						/>
					</div>
				</div>
			</div>
			<button style="width: 200px" :class="`btn-primary mgt-20 ${ !inputPrice ? 'disable-btn' : '' }`" @click="confirmSetPrice($event)" >
				{{$t("Common_03")}}
			</button>
		</Dialog>
	</section>
</template>

<script>
import { mapState } from 'vuex';
import { CommonMethod } from "@/mixin";
import { Dialog } from '@/components';
import {  Wallet} from '@/utils';
import {WalletConfig} from '@/config'

export default {
	components: {Dialog},
	mixins: [CommonMethod],
	data(){
		return({
			inputPrice:"",
			setPriceItem: {},
			isUpdate: false,
		})
	},
	computed: {
		...mapState({
			groupSellCar: (state) => state.marketState.data.groupSellCar,
			tempSells: (state) => state.marketState.data.tempSells,
		}),
	},
	methods:{
		confirmSellCar(){
			console.log(this.groupSellCar);
			if(this.groupSellCar.length == 0) return;
			this.getConfirmDialog().show(this.$t("Market_73"), async ()=>{
				let auctionObj = {
					suggestIndex_: 0,
					tokenIds_: [],
					prices721_: [],
					ids_: [],
					prices1155_: [],
				};

				let group721Data = [];

				let suggestIndex = await Wallet.ETH.getSuggestIndex();
				if (suggestIndex == WalletConfig.ETH.MAX_ORDER) {
					this.showNotify(this.$t("Market_28"),"error");
					return;
				}
				auctionObj.suggestIndex_ = Number(suggestIndex);

				this.groupSellCar.map(item=>{
					if(item.vType < 4){
						auctionObj.ids_.push(Number(item.prototype));
						auctionObj.prices1155_.push(Number(item.groupSellPrice));
					}else{
						auctionObj.tokenIds_.push(Number(item.tokenId));
						auctionObj.prices721_.push(Number(item.groupSellPrice));
						group721Data.push(item);
					}
				});
				console.log(auctionObj);
				let hash = await Wallet.ETH.createAuctionBatch(auctionObj);
				if(hash){
					this.addTempMomo(auctionObj, group721Data, hash);
					this.oprDialog("group-sell-dialog", "none");
					this.$store.commit('marketState/emptyGroupSellCar');
				}
			})
		},
		async addTempMomo(auctionObj, group721Data, hash){
			let myAddr = await Wallet.ETH.getAccount();
			let {tokenIds_, prices721_, ids_, prices1155_} = auctionObj

			//临时创建一条数据 
			let obj = {
				auctor: myAddr,
				durationDays: 2,
				uptime: parseInt(new Date().valueOf()/1000),
				index: -1,
				tx: hash,
				ids: [],
				amounts: [],
				chain: "bnb"
			}

			tokenIds_.map((tokenId, pos)=>{
				let tempDate = {...obj, ...group721Data[pos] };
				tempDate.endPrice = prices721_[pos] *1e18;
				tempDate.startPrice = prices721_[pos] *1e18;
				tempDate.tx = tempDate.tx + tokenId;
				this.tempSells.unshift(tempDate);
			});

			ids_.map((item, pos)=>{
				let tempDate = {...obj};
				tempDate.tokenId = 0;
				tempDate.ids = [item];
				tempDate.amounts = [1],
				tempDate.endPrice = prices1155_[pos] *1e18;
				tempDate.startPrice = prices1155_[pos] *1e18;
				tempDate.tx = tempDate.tx + item;
				this.tempSells.unshift(tempDate);
			});
			console.log("tempSells", this.tempSells);
			this.$store.commit("marketState/setData", {
				tempSells: this.tempSells,
			});
		},
		show(){
			this.oprDialog("group-sell-dialog", "block");
			console.log(this.groupSellCar);
		},
		editPrice(item, isUpdate = false){
			this.inputPrice = item.groupSellPrice;
			this.setPriceItem = item;
			this.isUpdate = isUpdate;
			this.oprDialog("set-group-price-dialog", "block");
		},
		//设置价格确认
		confirmSetPrice(event) {
			if(Number(this.inputPrice) <= 0 ) return;
			if(this.groupSellCar.length < 6 && !this.isUpdate){
				this.$parent.flyDot(event);
			}
			this.setPriceItem.groupSellPrice = Number(this.inputPrice);
			this.oprDialog("set-group-price-dialog", "none");
			if(!this.isUpdate){
				this.$store.commit("marketState/addToGroupSellCar", this.setPriceItem);
			}
		},
		deleteItem(item){
			this.$store.commit("marketState/addToGroupSellCar", item)
		},
	}
}
</script>

<style scoped>
.shop-car-item {
	width: 100%;
	height: 100px;
	border-radius: 20px;
	text-align: left;
}
.shop-car-item .pet-img {
	width: 100px;
	height: 100px;
}
#shop-car-content {
	max-height: 690px;
	min-height: 200px;
}
@media (max-width: 768px) {
	#shop-car-content {
		max-height: 500px !important;
	}
}
</style>
