<template>
	<div class="yf-dialog-bg" v-on:animationend="closed">
		<div class="yf-dialog" :style="`margin-top:${top}px;width:${width}px`" @click="$event.stopPropagation()" v-on:animationend="animationed" >
			<img v-if="!hideClose" @click="close($event.target.parentNode.parentNode)" class="yf-dialog-close-btn" src="../assets/icon/close.png" alt="" width="25" />
			<slot></slot>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		top: {},
		width: {},
		hideClose: {
			default: false,
		},
		animation: {
			default: () => {},
		},
	},
	methods: {
		animationed() {
			if (typeof this.animation == "function") this.animation();
		},
		closed(e) {
			let isHide = e.target.classList.value.indexOf("yf-dialog-remove") != -1;
			if (isHide) {
				e.target.classList.remove("yf-dialog-remove");
				e.target.style.display = "none";
			}
		},
		async close(dom) {
			dom.classList.add("yf-dialog-remove");
		},
	},
};
</script>
<style scoped>
.dialog-content {
	background: #05080d;
	border-radius: 5px;
	padding: 10px;
	min-height: 100px;
	overflow-y: scroll;
}
.yf-dialog-bg {
	display: none;
	position: fixed;
	z-index: 9999;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background: rgba(0, 0, 0, 0.8);
	overflow: auto;
	padding: 20px;
	text-align: center;
}
.yf-dialog-close-btn {
	position: absolute;
	right: -10px;
	top: -10px;
	cursor: pointer;
	z-index: 999;
	width: 25px;
	height: 25px;
	border: 1px solid #36383A;
	border-radius: 50%;
}
.yf-dialog {
	max-width: 100%;
	border-radius: 15px;
	padding: 15px;
	display: inline-block;
	position: relative;
	animation: showAni 0.3s;
	background: #13181f;
	border: 1px solid #36383A;
	border-radius: 21px;

}

.yf-dialog-remove {
	animation: hideAni 0.3s;
}
@keyframes showAni {
	from {
		opacity: 0;
		top: -200px;
	}
	to {
		opacity: 1;
		top: 0px;
	}
}
@keyframes hideAni {
	from {
		opacity: 1;
		top: 0px;
	}
	to {
		opacity: 0;
		top: -200px;
	}
}

@media (max-width: 768px) {
	.yf-dialog {
		margin-top: 50px !important;
		padding: 10px !important;
	}
}
</style>