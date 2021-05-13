<template>
	<div class="dib yf-select-num vertical-children" :style="`transform: scale(${scale})`">
		<img src="../assets/icon/reduce.png" :class="{'opa-6': getNowNum<=0}" v-if="getNowNum >= 1 || !needHideReduce" @click="reduce($event)" alt=""/>
		<div class="dib tac" style="min-width:25px">
			<span class="color-w mgl-5" v-if="getNowNum >= 1 || !needHideReduce">{{ getNowNum }}</span>
		</div>
		<img src="../assets/icon/add.png" class="mgl-5" :class="{'opa-6': getNowNum >= maxNum}" @click="add($event)" alt="" />
	</div>
</template>
<script>
export default {
	data() {
		return {
			selectNum: -1,
		};
	},
	props: {
		defaultNum: {
			default: 0,
		},
		maxNum: {},
		onChange: {
			required: true,
		},
		data: {},
		scale: {
			default: 1,
		},
		needHideReduce:{
			default: false,
		}
	},
	computed: {
		getNowNum: function () {
			return this.selectNum == -1 ? this.defaultNum : this.selectNum;
		},
	},
	methods: {
		selectItem(index) {
			this.selectPos = index;
			if (typeof this.onChange == "function") this.onChange(index);
		},
		add(e) {
			if (this.getNowNum >= this.maxNum) return;
			this.onChange(this.data, 1, e);
		},
		reduce(e) {
			if (this.getNowNum <= 0) return;
			this.onChange(this.data, -1,e);
		},
	},
};
</script>

<style scoped>
.yf-select-num {
	user-select: none;
	-webkit-transform-origin: right;
	transform-origin: right;
	cursor: pointer;
}
.yf-select-num-reduce {
	width: 30px;
	height: 30px;
	display: inline-block;
	color: #fff;
	font-size: 25px;
	border-radius: 30px;
	text-align: center;
	line-height: 22px;
	border: 2px solid #3c75ca;
	cursor: pointer;
}
.yf-select-num-add {
	background-image: linear-gradient(90deg, #57a8f8, 50%, #3c75ca);
	width: 30px;
	height: 30px;
	display: inline-block;
	color: #fff;
	font-size: 25px;
	border-radius: 30px;
	text-align: center;
	line-height: 25px;
	cursor: pointer;
}
</style>