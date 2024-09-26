<template>
	<div>
		<div v-html="html"></div>
	</div>
</template>
<style>
</style>
<script>
import axios from "axios";

export default {
	// 使用时请使用 :url.sync=""传值
	props: {
		url: {
			required: true,
		},
	},
	data() {
		return {
			html: "",
		};
	},
	watch: {
		url(value) {
			this.load(value);
		},
	},
	mounted() {
		this.load(this.url);
	},
	methods: {
		load(url) {
			if (url && url.length > 0) {
				// 加载中
				let param = {
					accept: "text/html, text/plain",
				};
				axios
					.get(url, param)
					.then((response) => {
						this.loading = false;
						// 处理HTML显示
						this.html = response.data;
					})
					.catch(() => {});
			}
		},
	},
};
</script>