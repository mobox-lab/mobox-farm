<template>
	<div class="pet-add-item por" @click="addNum"  :class="{'opa-6': data.isLock}">
		<div :class="isSelect || data.num <= 0?'opa-4':''">
			<div :class="'skew-box v' + data.vType"></div>
			<img v-if="getSelectNum > 0 && data.vType < 4" class="reduce-btn" src="../assets/icon/reduce_pet.png" alt="" @click="reduceNum($event)" />
			<div class="pet-item-hashrate vertical-children" v-if="data.vType >= 4 && data.lvHashrate" >
				<img src="../assets/icon/airdrop.png" height="15" alt="" />
				<span :class="getHashrateColor(data)">
					{{ data.lvHashrate }}
				</span>
			</div>
			<div class="pet-item-lv vertical-children" v-if="data.vType >= 4 && data.level" >
				<span >Lv.{{data.level}}</span>
			</div>
			
			<div class="pet-add-show-img">
				<img class="tip-icon" v-if="showTipIcon && !isStandard" src="@/assets/icon/warning-icon.png" @click="iconClick" />
				<img :src="require(`../assets/pet/${data.prototype}.png`)" alt="" width="90%" />
			</div>
			<div class="pet-add-type vertical-children">
				<img :src=" require(`../assets/icon/${ category_img[data.category] }.png`) " alt="" width="15" height="15" />
			</div>
			<p class="pet-small-num" v-if="data.vType < 4">
				<span v-if="getSelectNum > 0"> {{ getSelectNum }}/</span >{{ data.num }}
			</p>
		</div>
		<div  class="pet-select vertical-children" v-if="data.isLock">
			<div class="dib" style="height: 94px"></div>
			<img class="lock" src="../assets/icon/lock.png" height="20" alt="" />
		</div>
		<div  class="pet-select vertical-children" v-if="isRent">
			<div class="dib" style="height: 94px"></div>
			<img class="rent" src="../assets/icon/rent_time.png" height="20" alt="" />
		</div>
		<div  class="pet-select vertical-children" v-if="hasGem" >
			<div class="dib" style="height: 94px"></div>
			<img class="has-gem" src="../assets/icon/hasgem.png" height="20" alt="" />
		</div>
		<div @click="reduceNum($event)" class="pet-select vertical-children" v-if="isSelect" >
			<div class="dib" style="height: 94px"></div>
			<img src="../assets/icon/select.png" alt="" />
		</div>
		<span class="opa-6" v-if="data.num <= 0 || (getSelectNum == data.num && data.vType < 4)" style="position:absolute;top:-5px;left:15px">
			<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M867.7 423.8H599.8V155.9c0-49.3-40-89.3-89.3-89.3s-89.3 40-89.3 89.3v267.9H153.3c-49.3 0-89.3 40-89.3 89.3s40 89.3 89.3 89.3h267.9v267.9c0 49.3 40 89.3 89.3 89.3s89.3-40 89.3-89.3V602.4h267.9c49.3 0 89.3-40 89.3-89.3s-40-89.3-89.3-89.3z"  fill="#E1FF17"></path></svg>
		</span>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { CommonMethod } from "@/mixin";
import {Common} from "@/utils";

export default {
	mixins: [CommonMethod],
	props: {
		data: Object,
		selectProtoTypes: Object,
		// 是否显示标砖算力提示图标
		showTipIcon: {
			type: Boolean,
			default: false,
		},
		// 是否显示标砖算力提示图标
		verificationHashrate: {
			type: Boolean,
			default: false,
		},
		onSelectChange: Function,
	},

	computed: {
		...mapState({
			hashrateInfo: (state) => state.globalState.hashrateInfo,
		}),
		isStandard() {
			// 标砖算力
			const item = this.data;
			const vType = parseInt(item.prototype / 1e4);
			const standardsHashrate = this.hashrateInfo[`v${vType}StandardHashrate`];
			return item.level > 1 ? item.hashrate >= standardsHashrate : item.lvHashrate >= standardsHashrate;
		},
		//计算1155选中的数量
		getSelectNum() {
			if (!this.selectProtoTypes) return 0;
			let num = 0;
			let { vType, prototype, tokenId } = this.data;
			let selectArr = this.selectProtoTypes["v" + vType];
			let selectTokenIds = this.selectProtoTypes[
				"v" + vType + "_tokenId"
			];
			selectArr.map((item, index) => {
				let targetToken = 0;
				if (selectTokenIds) {
					targetToken = selectTokenIds[index];
				}
				if (item == prototype && targetToken == tokenId) num++;
			});
			if (vType >= 4 && num > 1) num = 1;
			return num;
		},
		//是否对勾选中。721
		isSelect() {
			return this.getSelectNum > 0 && this.data.vType >= 4;
		},

		isRent(){
			let isRent = false;
			let rent = this.data.rent;
			if(rent && rent.state != -1){
				isRent = true;
			}
			return isRent;
		},

		// 是否有宝石
		hasGem(){
			let hasGem = false;
			if(!this.data.gems) return hasGem;
			if(this.data.vType >= 4 && this.data.num > 0){
				this.data.gems.map(item=>{
					if(Number(item) > 0) hasGem = true;
				})
			}
			return hasGem;
		}
		
	},
	methods: {
		// 跳转升级
		iconClick() {
			this.$emit('iconClick');
		},
		async addNum() {
			let { tokenId, prototype, num, vType, isLock } = this.data;

			if (this.verificationHashrate && !this.isStandard) {
				await this.showTip();
			}

			//超过自己数量没法再选择
			if (this.getSelectNum >= num) {
				Common.app.$refs.quickBuy.show(prototype);
				return;
			}
			if(isLock || this.isRent) return;
			if (typeof this.onSelectChange == "function") {
				this.onSelectChange({ tokenId, prototype, vType, num: 1 });
			}
		},
		async showTip() {
			return new Promise((resolve) => {
				const { prototype } = this.data;
				const lvType = parseInt(prototype / 1e4);
				const standardsHashrate = this.hashrateInfo[`v${lvType}StandardHashrate`];
				this.getConfirmDialog().show(`${this.$t('MOMO_100').replace('#0#', standardsHashrate)}`, resolve);
			});
		},
		reduceNum(e) {
			e.stopPropagation();
			let { tokenId, prototype, vType, isLock } = this.data;
			if(isLock || this.isRent) return;
			if (typeof this.onSelectChange == "function") {
				this.onSelectChange({ tokenId, prototype, vType, num: -1 });
			}
		},
	},
};
</script>
<style lang="less" scoped>
.pet-item-lv{
	position: absolute;
	bottom: 0px;
	right: 15px;
	background-image: linear-gradient(90deg, rgb(24, 24, 24), 50%, rgba(12, 12, 12, 0.4));
	border-radius: 10px;
	font-size: 12px;
	padding: 0px 5px;
}
.lock{
	position: absolute;
	right: 10px;
	top: 5px;
}
.rent{
	position: absolute;
	left: 0px;
	bottom: 0px;
}
.has-gem{
	position: absolute;
	left: 0px;
	bottom:30px;
}
.opa-4{
	opacity: 0.4;
}
.pet-item-hashrate {
	position: absolute;
	background-image: linear-gradient(90deg, #000, 50%, rgba(1, 1, 1, 0.4));
	border-radius: 10px;
	height: 20px;
	font-size: 12px;
	padding: 0px 5px;
	line-height: 20px;
	top: -6px;
	left: 10px;
	z-index: 998;
	min-width: 50px;
	font-weight: bold;
}
.pet-select {
	position: absolute;
	width: 124px;
	height: 94px;
	top: 0px;
	left: 0px;
	text-align: center;
}

.pet-add-show-img {
	position: absolute;
	left: 0px;
	bottom: 0px;
	text-align: center;

	.tip-icon {
		width: 25px;
		height: 25px;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -20%);
	}
}
.pet-add-show-img  img{
	width: 80%;
}
.add-pet-img {
	position: absolute;
	right: -10px;
	top: -8px;
}
.pet-add-num {
	margin-left: -9px;
	width: 100%;
	font-size: 13px;
	position: absolute;
	bottom: -28px;
}
.pet-add-type {
	position: absolute;
	border-radius: 30px;
	height: 30px;
	width: 30px;
	background: #1a2c50;
	border: 1px solid #315184;
	line-height: 28px;
	font-size: 0px;
	text-align: center;
	bottom: -15px;
	left: 35px;
	padding: 2px;
	display: inline-block;
}
.skew-box {
	width: 124px;
	height: 94px;
	position: absolute;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.skew-box.v1 {
	background-image: url("../assets/nft_head_v1.png");
}
.skew-box.v2 {
	background-image: url("../assets/nft_head_v2.png");
}
.skew-box.v3 {
	background-image: url("../assets/nft_head_v3.png");
}
.skew-box.v4 {
	background-image: url("../assets/nft_head_v4.png");
}
.skew-box.v5 {
	background-image: url("../assets/nft_head_v5.png");
}
.skew-box.v6 {
	background-image: url("../assets/nft_head_v6.png");
}

.pet-small-num {
	user-select: none;
	display: inline-block;
	cursor: pointer;
	position: absolute;
	font-size: 12px;
	border-radius: 20px;
	height: 30px;
	width: 30px;
	border: 1px solid #263d68;
	bottom: -15px;
	right: 10px;
	line-height: 30px;
	background: rgba(0, 0, 0, 0.6);
	text-align: center;
}
.pet-add-item {
	display: inline-block;
	width: 120px;
	height: 94px;
	cursor: pointer;
	margin-top: 20px;
	margin-left: 10px;
	margin-bottom: 10px;
	zoom: 0.9;
}
.reduce-btn {
	position: absolute;
	top: 1px;
	right: 1px;
	z-index: 998;
}
@media (max-width: 768px) {
	.pet-add-item {
		zoom: 0.6;
	}
}
</style>