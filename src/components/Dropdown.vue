<template>
	<div class="dropdown mgt-10" tabindex="2">
		<div class="dropdown-value por"  @click="showDrop">{{ list[getNowPos] }}<span class="dropdown-ar">▼</span></div>
		<ul class="dropdown-list hide" :style="direction == 'up' ? 'bottom: 40px' : ''" >
			<li v-for="(item, index) in list" :key="item" @click="selectItem($event, index)" :class="getNowPos == index ? 'active' : ''" >
				{{ item }}
			</li>
		</ul>
	</div>
</template>
<script>
var $ = window.$;
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
		direction: {
			default: "down",
		},
	},
	computed: {
		getNowPos: function () {
			return this.selectPos == -1
				? this.defaultSelectPos
				: this.selectPos;
		},
	},
	methods: {
		selectItem(e, index) {
			$(e.target).parent().hide();
			if (this.selectPos != index) {
				this.selectPos = index;
				if (typeof this.onChange == "function") {
					this.onChange(index);
				}
			}
		},
		showDrop(e) {
			e.stopPropagation();
			let $nextDom = $(e.target).next();
			let $parent = $nextDom.parent();
			let display = $nextDom.css("display");
			if (display == "none") {
				$nextDom.show();
				$parent.focus();
				$parent.blur(() => {
					$nextDom.hide();
					$parent.off("blur");
				});
			} else {
				$parent.off("blur");
				$nextDom.hide();
			}
		},
	},
};
</script>
<style>

.dropdown .dropdown-list {
	position: absolute;
	min-width: 60px;
	background: #1C222C;
	border-radius: 20px;
	list-style: none;
	right: 0px;
	margin-top: 5px;
	z-index: 999;
}
.dropdown .dropdown-list li.active {
	background: #323841 !important;
}
.dropdown .dropdown-list li:hover {
	background: #323841;
}
.dropdown .dropdown-list li {
	height: 40px;
	text-align: center;
	white-space: nowrap;
	line-height: 40px;
	padding: 0px 30px;
	
}
.dropdown .dropdown-list li:first-child{
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
}
.dropdown .dropdown-list li:last-child{
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
}
.dropdown .dropdown-value {
	min-width: 60px;
	background: #323841;
	border-radius: 30px;
	height: 40px;
	display: inline-block;
	padding: 0px 20px;
	padding-right: 30px;
	line-height: 40px;
	text-align: center;
	color:rgba(255, 255, 255,0.5);
}
.dropdown {
	user-select: none;
	cursor: pointer;
	position: relative;
	min-width: 80px;
	font-size: 13px;
	outline: none;
	display: inline-block;
}
.dropdown.line .dropdown-value{
	background: #070d14;
	border: 1px solid #323841;
	border-radius: 30px;
	text-align: left;
	color: #fff;
	font-size: 15px;
}
.dropdown.line .dropdown-value .dropdown-ar{
	position: absolute;
	right: 10px;
	top: 0px;
}
</style>