<template>
	<div class="pet-view">
		<div class="pet-view-show">
			<img v-if="Number(prototype) > 60000 " :src="require(`../assets/pet/${prototype}.gif`)" alt="" width="50%" />
			<img v-else :src="require(`../assets/pet/${prototype}.png`)" alt="" width="50%" />
			<!-- <div class="pet_img_canvas" :id="'spine-widget' + prototype"></div> -->
		</div>
		<div class="por mgt-20">
			<div class="yy">
				<img src="../assets/yy.png" alt="" width="28%" />
			</div>
			<img
				:src="require(`../assets/floor${getVType}.png`)"
				alt=""
				width="100%"
			/>
		</div>
	</div>
</template>
<script>
export default {
	props: ["prototype"],
	mounted() {
		// new window.spine.SpineWidget("spine-widget" + this.prototype, {
		// 	json: "/js/spine/ddd/box_haishi.json",
		// 	atlas: "/js/spine/ddd/box_haishi.atlas",
		// 	backgroundColor: "#00000000",
		// 	animation: "animation2",
		// });
	},
	computed: {
		getVType() {
			return parseInt(this.prototype / 1e4);
		},
	},
};
</script>
<style  scoped>
.pet_img_canvas {
	vertical-align: middle;
	user-select: none;
	width: 300px;
	height: 300px;
	margin: 0px auto;
}
.yy {
	position: absolute;
	width: 100%;
	bottom: 32%;
	animation: scale 2s infinite;
}
.pet-view-show {
	position: absolute;
	bottom: 100px;
	width: 100%;
	z-index: 998;
	animation: jump 2s infinite;
}
.pet-view {
	display: inline-block;
	position: relative;
	text-align: center;
	margin-top: 80px;
	height: 200px;
}

@keyframes jump {
	0% {
		transform: translate(0px, 0px);
	}
	50% {
		transform: translate(0px, -10px);
	}
	100% {
		transform: translate(0px, 0px);
	}
}
@keyframes scale {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(0.8);
	}
	100% {
		transform: scale(1);
	}
}
</style>