<template>
	<div class="por">
		<img
			src="../assets/yy.png"
			ref="yy"
			class="pet-yy scale"
			alt=""
			:style="{animationDelay: delay+'s'}"
			width="50%"
		/>
		<img
			:src="require(`../assets/pet/${prototype}.png`)"
			alt=""
			ref="anime"
			height="100"
			class="jump-img-10"
			:style="{animationDelay: delay+'s'}"
		/>
	</div>
</template>

<script>
import { Common } from "@/utils";

export default {
	props: ["prototype"],
	data(){
		return{
			delay: Common.getRandomNum(200, 5000) / 100
		}
	},
};
</script>

<style scoped>
.jump-img-10 {
	animation: jump 10s infinite;
}

@keyframes jump {
	0% {
		transform: translate(0px, 0px);
	}

	5% {
		transform: translate(0px, -10px);
	}
	10% {
		transform: translate(0px, 0px);
	}

	100% {
		transform: translate(0px, 0px);
	}
}

.pet-yy {
	position: absolute;
	bottom: 0px;
	left: 25px;
}

.scale {
	animation: scale 10s infinite;
}

@keyframes scale {
	0% {
		transform: scale(1);
	}
	5% {
		transform: scale(0.8);
	}
	10% {
		transform: scale(1);
	}
	100% {
		transform: scale(1);
	}
}
</style>