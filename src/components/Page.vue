<template>
	<div class="ly-page vertical-children user-select-none">
		<img
			@click="changePage('pre')"
			src="../assets/icon/arrow.png"
			:class="getNowPage == 1 ? 'cur-point opa-6' : 'cur-point'"
			height="35"
			alt=""
		/>
		<span class="mgl-20">{{ $t("Common_01") }}</span>
		<input
			type="text"
			class="ly-input mgl-10"
			style="width: 90px; text-align: center"
			v-int
			:data-max="totalPage"
			v-model="nowPage"
		/><span class="mgl-10">{{
			$t("Common_02").replace("#0#", totalPage)
		}}</span
		>&nbsp;
		<img
			@click="changePage('next')"
			src="../assets/icon/arrow.png"
			:class="getNowPage == totalPage ? 'cur-point opa-6' : 'cur-point'"
			class="flip-x cur-point mgl-20"
			height="35"
			alt=""
		/>
	</div>
</template>

<script >
export default {
	data() {
		return {
			nowPage: 0,
		};
	},
	props: ["defaultPage", "totalPage", "onChange"],
	computed: {
		getNowPage: function () {
			return this.nowPage == -1 ? this.defaultPage : Number(this.nowPage);
		},
	},
	watch: {
		nowPage: function (newVal, oldVal) {
			if (newVal > this.totalPage || newVal == "" || isNaN(Number(newVal)) || newVal == oldVal) return;
			if (typeof this.onChange == "function") this.onChange(this.nowPage);
		},
	},
	created() {
		this.nowPage = this.defaultPage;
	},
	methods: {
		changePage(type) {
			switch (type) {
				case "next":
					if (this.getNowPage < this.totalPage) {
						this.nowPage = this.getNowPage + 1;
					}
					break;
				case "pre":
					if (this.getNowPage > 1) {
						this.nowPage = this.getNowPage - 1;
					}
					break;

				default:
					break;
			}
		},
		initPage(){
			this.nowPage = this.defaultPage;
		}
	},
};
</script>