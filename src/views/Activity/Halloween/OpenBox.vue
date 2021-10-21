<template>
	<div>
		<Dialog id="open-halloween-dialog" :top="100" :width="500">
			<div id="data-view">
				<h3 class="tal">打开盒子</h3>
				<div class="data-view-content aveage-box" style="height: 140px;margin-top:50px;padding:20px">
					<div style="flex:2">
						<img src="@/assets/halloween/box.png" alt="" width="160"  style="position:relative;top:-20px;left: -20px">
					</div>
					<div class="tal" >
						<p class="small opa-6">未打开礼盒数</p>
						<h2>{{myData.box}}</h2>
					</div>
				</div>
				<div class="mgt-20 data-view-content" style="padding:20px">
					<div class="tal">打开的礼盒数量</div>
					<div class="por mgt-5">
						<div class="ly-input-pre-icon">
							<img  src="@/assets/halloween/box.png" alt="" />
						</div>
						<input class="ly-input dib" type="text" style=" text-align: center; width: 70%; padding-left: 50px; "
							v-int :data-max="parseInt(myData.box) || 0"  v-model="openNum" />
						<div class="dib" style="width: 30%">
							<button @click="openNum = parseInt(myData.box) || 0" class="btn-primary btn-small" style="width: 80%" >
								Max
							</button>
						</div>
					</div>
				</div>

				<div class="btn-halloween mgt-30" @click="openBox">
					打开盒子
				</div>
			</div>
		</Dialog>
		<section id="showBoxLayer2"  v-if="isShowResult">
			<div id="box-result-box2" >
				<div id="box-result2" class="animate__animated animate__zoomIn animate__faster por">
					<img   class="close-btn" @click="closeResult" src="@/assets/icon/close.png" alt="" width="30" />

					<div id="data-view" style="padding:20px">
						<div class="vertical-children">
							<img src="@/assets/halloween/box.png" alt="" height="60">
							<div class="dib tal mgl-10">
								<h3>{{$t("MECBOX_41")}}: x{{getTotalOpenBox}}</h3>
							</div>
						</div>
						<div class="data-view-content ovh mgt-10" style="max-height:480px;overflow:auto;padding:10px">
							<div class="col-md-3 col-xs-4 box-result-item tac" v-for="item in showReult" :key="item.gid">
								<div class="g-item por" style="margin:10px">
									<img :src="require(`@/assets/halloween/itembg${$parent.itemCfg[item.gid-1].lv}.png`)" alt="" width="120">
									<img class="g-item-icon" :src="require(`@/assets/halloween/${item.gid}.png`)" alt="" width="120">
									<p class="g-item-num">×{{item.num}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
// import { mapState } from 'vuex';
import { CommonMethod } from '@/mixin';
import { Dialog } from '@/components';
import { Common, Wallet } from '@/utils';
import { HttpConfig } from "@/config";
import axios from 'axios';

export default {
	mixins: [CommonMethod],
	components: {Dialog},
	props: ["myData"],
	data(){
		return({
			openNum: "",
			showReult: [],
			isShowResult: false,
		})
	},
	computed: {
		getTotalOpenBox(){
			let count = 0;
			this.showReult.map(item=>{
				count += Number(item.num)
			});
			return count;
		}
	},
	methods: {
		getLvById(id){
			return this.$parent.itemCfg[id].lv
		},
		show(){
			this.oprDialog("open-halloween-dialog", "block");
		},
		showOpenResult(arr){
			this.showReult = arr;
		},
		async openBox(){
			let myAddr = await Wallet.ETH.getAccount();
			let data = {
				addr: myAddr,
				sign: "123",
				num: this.openNum
			}
			let res = await axios.post(HttpConfig.Halloween.OpenBox, data);

			if(res.data.code == 200){
				this.openNum = "";
				this.$parent.getMyData();
				this.showReult = res.data.data.reverse();

				Common.app.$refs.boxBag.showOpenBoxCb('mec',()=>{
					this.isShowResult = true;
					Common.app.$refs.boxBag.closeResult();
				});
			}
			
		},
		closeResult(){
			this.isShowResult = false;
			Common.app.$refs.boxBag.closeResult();
		}
	}
}
</script>

<style scoped>
	#box-result-box2{
		position:absolute;left:0px;top:0px;bottom:0px;right:0px;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	#box-result2{
		max-width: 90%;
		border-radius: 15px;
		padding: 15px;
		background: #161331;
		border-radius: 12px;
		border: 3px solid #211d42;
		width: 700px;
		margin: 0px auto;
	}
	#showBoxLayer2{
		position: fixed;
		top: 0px; bottom: 0px; left: 0px; right: 0px;
		background: rgba(0,0,0,0.7);
		z-index: 99999;
	}
	.close-btn{
		position: absolute;
		right: -15px;
		top: -15px;
		border: 2px solid #36383A;
		border-radius: 30px;
		cursor: pointer;
	}
</style>
