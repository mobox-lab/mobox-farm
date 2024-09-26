<template>
    <Dialog id="select-pool" :top="100" :width="400">
        <h2>{{ $t("Air-drop_38") }}</h2>
        <ul class="list">
					<li v-for="(item, index) in list" :key="index" @click="onSelect(item)">
							<div class="dib por double-img" style="height: 40px; zoom: 0.5" >
									<img :src="require(`../../assets/coin/${item[0]}.png`)" height="40" />
									<img :src="require(`../../assets/coin/${item[1]}.png`)" height="40" />
							</div>
							<span class="mgl-5">{{item[0]}}-{{item[1]}}</span>
					</li>
        </ul>
    </Dialog>
</template>

<script>
import { Dialog } from "@/components";
import { CommonMethod } from "@/mixin";

export default {
	components: { Dialog },
	mixins: [CommonMethod],
	data() {
		return {
			list: [
				["MBOX", "BNB"],
				["MBOX", "MEC"],
			],
			callback: null,
		};
	},
	methods: {
		show(callback) {
			this.callback = callback;
			this.oprDialog("select-pool", "block");
		},
		onSelect(data) {
			this.callback(data);
			this.oprDialog("select-pool", "none");
			this.callback = null;
		}
	},
};
</script>

<style lang="less" scoped>
.list {
    li {
			display: flex;
			align-items: center;
			height: 45px;
			cursor: pointer;
			padding: 10px;
			background: #3f3f3f;
			margin: 10px 0px;
			border-radius: 10px;
			list-style: none;
			cursor: pointer;
    }
}
</style>
