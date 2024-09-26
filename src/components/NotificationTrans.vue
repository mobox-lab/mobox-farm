<template>
	<div class="notification">
		<div  v-for="item in notificationsTrans" :key="item.ts" :class="item.type + ' notification-content'" v-on:animationend="animationend($event, item)" >
			<div class="notification-item vertical-children">
				<div class="icon">
					<svg v-if="item.type == 'success'" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2029" width="30" height="30"><path d="M512 0C229.216 0 0 229.248 0 512c0 282.784 229.216 512 512 512 282.752 0 512-229.216 512-512 0-282.752-229.248-512-512-512z m292.608 357.024l-320 384c-12.128 14.56-30.08 23.008-49.024 23.072h-0.128a63.936 63.936 0 0 1-48.992-22.88l-167.52-199.488a64 64 0 1 1 97.952-82.368l118.336 140.96 271.04-325.248a64.032 64.032 0 0 1 98.336 81.952z" p-id="2030" fill="#67c23a"></path></svg>
					<svg v-else viewBox="0 0 1024 1024" width="30" height="30">
						<path fill="#f56c6c" d="M512 12.130462c-69.474462 0-134.915938 13.122954-196.324431 39.384615-61.392738 26.245908-114.908554 62.196185-160.5632 107.835077C109.489231 205.0048 73.507446 258.520615 47.261538 319.929108 20.999877 381.321846 7.876923 446.763323 7.876923 516.237785s13.122954 134.915938 39.384615 196.32443c26.261662 61.392738 62.211938 114.924308 107.850831 160.5632 45.654646 45.654646 99.170462 81.604923 160.5632 107.850831 61.408492 26.261662 126.849969 39.384615 196.324431 39.384616s134.915938-13.122954 196.324431-39.384616c61.392738-26.245908 114.908554-62.196185 160.5632-107.850831 45.638892-45.638892 81.604923-99.170462 107.850831-160.5632 26.261662-61.408492 39.384615-126.834215 39.384615-196.32443 0-69.474462-13.122954-134.915938-39.384615-196.308677-26.261662-61.408492-62.211938-114.924308-107.850831-160.578954-45.654646-45.638892-99.170462-81.604923-160.5632-107.850831C646.915938 25.253415 581.474462 12.130462 512 12.130462z m0 790.102646c-16.163446 0-29.885046-5.655631-41.196308-16.966893-11.311262-11.311262-16.966892-25.048615-16.966892-41.196307 0-16.163446 5.655631-29.9008 16.966892-41.212062 11.311262-11.311262 25.048615-16.966892 41.196308-16.966892 16.163446 0 29.885046 5.671385 41.196308 16.966892 11.311262 11.311262 16.966892 25.048615 16.966892 41.212062 0 16.147692-5.655631 29.885046-16.966892 41.196307-11.311262 11.311262-25.048615 16.966892-41.196308 16.966893z m58.1632-252.061539c0 16.163446-5.655631 29.9008-16.966892 41.196308-11.311262 11.311262-25.048615 16.966892-41.196308 16.966892-16.163446 0-29.885046-5.655631-41.196308-16.966892-11.311262-11.295508-16.966892-25.048615-16.966892-41.196308v-271.438769c0-16.163446 5.655631-29.9008 16.966892-41.212062C482.114954 226.209477 495.852308 220.553846 512 220.553846c16.163446 0 29.885046 5.655631 41.196308 16.966892 11.311262 11.311262 16.966892 25.048615 16.966892 41.196308v271.454523z"></path>
					</svg >
				</div>
				<div class="mgl-10 content">
					<p>
						<span class="breakWord">{{ item.msg }}</span>
					</p>
					<p class="small " >
						<a :href="'https://bscscan.com/tx/' + item.hash" target="_blank" style="text-decoration: underline;">{{$t("Common_17")}}</a>
					</p>
				</div>
				<div class="close" @click="close($event)">&times;</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState({
			notificationsTrans: (state) => state.globalState.data.notificationsTrans,
		}),
	},
	methods: {
		animationend(e, item) {
			let isHide = e.target.classList.value.indexOf("hide") != -1;
			if (isHide) {
				this.$store.commit("globalState/removeNotifyTrans", item);
			} else {
				let t = setInterval(() => {
					clearInterval(t);
					e.target.classList.add("hide-notification");
				}, 5000);
			}
		},
		close(e){
			e.target.parentNode.parentNode.classList.add("hide-notification");
		}
	},
};
</script>
<style  scoped>
.notification-content {
	position: relative;
	animation: showAni 0.5s;
	transition: all 0.3s linear;
	text-align: right;
	width: 100%;
}
.success .notification-item {
	color: #67c23a;
	background: #f0f9eb;
}
.success .notification-item a {
	color: #0f2007 !important;
}
.error .notification-item {
	color: #f56c6c;
	background: #fef0f0;
}
.error .notification-item a {
	color: #310f0f !important;
}
.notification-item {
	padding: 10px 20px;
	border-radius: 8px;
	max-width: 500px;
	min-width: 300px;
	min-height: 80px;
	display: inline-block;
	margin-top: 20px;
	text-align: left;
	font-weight: normal;
	transition: all 0.3s linear;
	display: inline-flex;
	position: relative;
}
.notification-item .icon{
	justify-content: center;
	align-items: center;
	display: flex;
}
.notification-item .content{
	justify-content: center;
	display: flex;
	flex-direction: column;
}
.notification-item .close{
	justify-content: right;
	position: absolute;
	right: 0px;
	top: 0px;
	font-size: 20px;
	cursor: pointer;
	width: 30px;
	height: 30px;
	text-align: center;
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
	right: 0px;
	z-index: 999999999999999;
	margin: 0px auto;
	text-align: right;
	padding: 0px 10px;
}
</style>