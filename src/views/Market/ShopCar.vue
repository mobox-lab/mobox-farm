<template>
	<Dialog id="shopcar-dialog" :top="20" :width="500">
		<div class="por tal mgt-10">
			<p class="opa-6">{{$t("Market_15")}}</p>
			<p class="cur-point vertical-children" style="position: absolute; right: 0px; top: 0px" @click="shopCar = []" >
				<span class="opa-6"> {{$t("Market_16")}} </span>
				<svg viewBox="0 0 1024 1024" width="20" height="20">
					<path fill="#838689" d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"></path>
					<path fill="#838689" d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"></path>
				</svg>
			</p>
		</div>
		<div class="dialog-content mgt-10" id="shop-car-content">
			<div v-for="item in shopCar" :key="item.prototype" :class="'pet_hover_lv' +item.vType" class="shop-car-item  vertical-children por mgt-10">
				<div class="dib por">
					<img  :src="require(`@/assets/pet/${item.prototype}.png`)" alt="" width="100" height="100" />
					<p style="position:absolute;bottom:5px;width:100%;text-align:center">
						<span style="background:rgba(0,0,0,0.5);padding:2px 10px;font-size:12px;border-radius:10px">x{{item.num}}</span>
					</p>
				</div>
				<div class="dib small mgl-5">
					<p class="vertical-children">
						<img src="@/assets/icon/airdrop.png" width="20" alt="" />
						<span class="mgl-5 color-w" style="font-size:18px"> {{ item.lvHashrate }} </span>
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
				<div class="absolute-r tar" style="right: 20px; top: 5px">
					<span class="small">{{$t("Market_39")}}</span>
					<p class="vertical-children mgt-5">
						<img src="@/assets/coin/BUSD.png" height="25" alt="" />
						<span style="font-size: 16px" class="color-w mgl-5" >{{ item.sellPrice }}</span >&nbsp;
						<img @click="edit1155Price(item)" class="mgl-5 cur-point" src="@/assets/icon/edit.png" height="24" alt="" />
					</p>
					<p class="mgt-5" >
						<SelectNum :scale="0.8" :maxNum="item.num"  :defaultNum="item.sellNum" :data="item" :onChange="onNumChange" />
					</p>
				</div>
			</div>
		</div>
		<div class="vertical-children por mgt-10 tal" style="height: 50px">
			<div class="dib por">
				<span id="shop-car-num" v-if="getShopCarTotalSelectNum > 0" >{{ getShopCarTotalSelectNum }}</span >
				<img src="@/assets/icon/shopcar.png" alt="" height="40" />
			</div>

			<div class="dib tal" style="margin-left: 12px">
				<span class="small opa-6">{{$t("Market_18")}}</span>
				<p class="vertical-children mgt-5">
					<img src="@/assets/coin/BUSD.png" height="25" alt="" />
					<span style="font-size: 20px" class="color-w mgl-5">{{ getShopCarTotalPrice }} <small style="font-size:12px">BUSD</small></span>
				</p>
				<button @click="confirmBuyShopCar" :class="{'disable-btn': shopCar.length == 0}" class="btn-primary " style="position: absolute; right: 0px; top: 10px" >
					{{$t("Market_19")}}
				</button>
			</div>
		</div>
	</Dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState({
			shopCar: (state) => state.marketState.data.shopCar,
		}),
		getShopCarTotalPrice(){
			return 0;
		}
	},
	methods:{
		confirmBuyShopCar(){
			console.log("confirmBuyShopCar");
		}
	}
}
</script>
