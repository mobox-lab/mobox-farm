<template>
	<div class="dib yf-select-num vertical-children" :style="`transform: scale(${scale})`">
		<img src="../assets/icon/reduce.png" class="mgl-5" :class="{'opa-6': getNowNum<=0}" v-if="getNowNum >= 1 || !needHideReduce" @click="reduce($event)" alt="" height="30"/>
		<div class="dib tac" style="min-width:25px" v-if="getNowNum >= 1 || !needHideReduce">
			<!-- <span class="color-w mgl-5" >{{ getNowNum }}</span> -->
			<input type="text" class="yf-select-input mgl-5" :value="getNowNum" v-int :data-max="maxNum" @blur="blur">
		</div>
		<img src="../assets/icon/add.png" class="mgl-5" :class="{'opa-6': getNowNum >= maxNum}" @click="add($event)" alt=""  height="30" />
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
		blur(e){
			let value = Number(e.target.value);
			console.log({value});
			if(value <= 0 ){
				this.minReduce(e);
				e.target.value = 1;
			}else{
				this.onChange(this.data, value-this.getNowNum , e);
			}
		},
		selectItem(index) {
			this.selectPos = index;
			if (typeof this.onChange == "function") this.onChange(index);
		},
		add(e) {
			if (this.getNowNum >= this.maxNum) return;
			this.onChange(this.data, 1, e);
		},
		maxAdd(e){
			if (this.getNowNum >= this.maxNum) return;
			this.onChange(this.data, this.maxNum-this.getNowNum , e);
		},
		minReduce(e){
			if (this.getNowNum <= 1) return;
			this.onChange(this.data, -(this.getNowNum - 1),e);
		},
		reduce(e) {
			if (this.getNowNum <= 0) return;
			this.onChange(this.data, -1,e);
		},
	},
};
</script>

<style scoped>
.yf-select-input{
	background: #000;
	border: none;
	width: 50px;
	color: #fff;
	text-align: center;
	padding:0px 2px;
	height: 30px;
	border-radius: 10px;
}
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