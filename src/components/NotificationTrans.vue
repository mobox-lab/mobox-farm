<template>
	<div class="notification">
		<div v-for="item in notifications" :key="item.hash" :class="item.type + ' notification-content'" v-on:animationend="animationend" >
			<div class="notification-item vertical-children">
				<svg viewBox="0 0 1024 1024" width="20" height="20">
					<path
						:fill="item.type == 'success' ? '#67c23a' : '#f56c6c'"
						d="M512 12.130462c-69.474462 0-134.915938 13.122954-196.324431 39.384615-61.392738 26.245908-114.908554 62.196185-160.5632 107.835077C109.489231 205.0048 73.507446 258.520615 47.261538 319.929108 20.999877 381.321846 7.876923 446.763323 7.876923 516.237785s13.122954 134.915938 39.384615 196.32443c26.261662 61.392738 62.211938 114.924308 107.850831 160.5632 45.654646 45.654646 99.170462 81.604923 160.5632 107.850831 61.408492 26.261662 126.849969 39.384615 196.324431 39.384616s134.915938-13.122954 196.324431-39.384616c61.392738-26.245908 114.908554-62.196185 160.5632-107.850831 45.638892-45.638892 81.604923-99.170462 107.850831-160.5632 26.261662-61.408492 39.384615-126.834215 39.384615-196.32443 0-69.474462-13.122954-134.915938-39.384615-196.308677-26.261662-61.408492-62.211938-114.924308-107.850831-160.578954-45.654646-45.638892-99.170462-81.604923-160.5632-107.850831C646.915938 25.253415 581.474462 12.130462 512 12.130462z m0 790.102646c-16.163446 0-29.885046-5.655631-41.196308-16.966893-11.311262-11.311262-16.966892-25.048615-16.966892-41.196307 0-16.163446 5.655631-29.9008 16.966892-41.212062 11.311262-11.311262 25.048615-16.966892 41.196308-16.966892 16.163446 0 29.885046 5.671385 41.196308 16.966892 11.311262 11.311262 16.966892 25.048615 16.966892 41.212062 0 16.147692-5.655631 29.885046-16.966892 41.196307-11.311262 11.311262-25.048615 16.966892-41.196308 16.966893z m58.1632-252.061539c0 16.163446-5.655631 29.9008-16.966892 41.196308-11.311262 11.311262-25.048615 16.966892-41.196308 16.966892-16.163446 0-29.885046-5.655631-41.196308-16.966892-11.311262-11.295508-16.966892-25.048615-16.966892-41.196308v-271.438769c0-16.163446 5.655631-29.9008 16.966892-41.212062C482.114954 226.209477 495.852308 220.553846 512 220.553846c16.163446 0 29.885046 5.655631 41.196308 16.966892 11.311262 11.311262 16.966892 25.048615 16.966892 41.196308v271.454523z"
					></path></svg
				>&nbsp;
				<span class="breakWord">{{ item.msg }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			notifications: (state) => state.globalState.data.notifications,
		}),
	},
	methods: {
		animationend(e) {
			let isHide = e.target.classList.value.indexOf("hide") != -1;
			if (isHide) {
				this.$store.commit("globalState/removeNotifyTrans");
			} else {
				// let t = setInterval(() => {
				// 	clearInterval(t);
				// 	e.target.classList.add("hide-notification");
				// }, 1000);
			}
		},
	},
};
</script>
<style  scoped>
.notification-content {
	position: relative;
	animation: showAni 0.5s;
	transition: all 0.3s linear;
}
.success .notification-item {
	color: #67c23a;
	background: #f0f9eb;
}
.error .notification-item {
	color: #f56c6c;
	background: #fef0f0;
}
.notification-item {
	padding: 10px 20px;
	border-radius: 50px;
	max-width: 500px;
	min-width: 150px;
	display: inline-block;
	margin-top: 20px;
	text-align: left;
	font-weight: normal;
	transition: all 0.3s linear;
}
.hide-notification {
	animation: hideAni 0.5s;
}
@keyframes hideAni {
	from {
		opacity: 1;
		height: 50px;
		top: 0px;
	}
	to {
		opacity: 0;
		top: -20px;
		height: 0px;
	}
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
.notification {
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	z-index: 9999999;
	margin: 0px auto;
	text-align: center;
	padding: 0px 10px;
	padding-left: 260px;
}
</style>