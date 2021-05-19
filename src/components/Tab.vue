<template>
	<ul class="yf-tab" >
		<li v-for="(item, index) in list" :key="item" @click="selectItem(index)" :class="getNowPos == index ? 'active' : ''"  class="por">
			{{ item }}
			<span class="notice-num" v-if="notice[index]">{{notice[index]}}</span>
		</li>
	</ul>
</template>
<script>
export default {
	data() {
		return {
			selectPos: -1,
		};
	},
	props: {
		defaultSelectPos: {
			default: 0,
		},
		list: {
			required: true,
		},
		onChange: {
			required: true,
		},
		notice: {
			default: () => [],
		},
	},
	watch: {
		defaultSelectPos: function(newValue){
			if(newValue != this.selectPos){
				this.selectPos = newValue;
			}
		}
	},
	watch: {
		defaultSelectPos: function(newValue){
			if(newValue != this.selectPos){
				this.selectPos = newValue;
			}
		}
	},
	computed: {
		getNowPos: function () {
			return this.selectPos == -1
				? this.defaultSelectPos
				: this.selectPos;
		},
	},
	methods: {
		selectItem(index) {
			this.selectPos = index;
			if (typeof this.onChange == "function") this.onChange(index);
		},
		reload(){
			this.selectPos = this.defaultSelectPos;
			this.$forceUpdate();
		}
	},
};
</script>

<style scoped>
.notice-num{
	width: 17px;
	height: 17px;
	background: red;
	border-radius: 10px;
	font-size: 12px;
	color: #fff;
	display: inline-block;
	text-align: center;
	line-height: 16px;
	position: absolute;
	top: 3px;
	right: 3px;
}
.yf-tab {
	list-style: none;
	background: #13181F;
	border-radius: 40px;
	display: inline-block;
	line-height: 40px;
	font-size: 13px;
	user-select: none;
}
.yf-tab li {
	display: inline-block;
	padding: 0px 30px;
	border-radius: 40px;
	cursor: pointer;
	color: rgba(255,255,255,0.5);
	white-space:nowrap;
}
.yf-tab li.active {
	background: #42464C;
	color: #fff;
}

@media (max-width: 768px) {
	.yf-tab{
		zoom: 0.8
	}
}
</style>