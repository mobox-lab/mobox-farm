<style src="./style.css"></style>
<template>
<div class="tac">
	<div class="por">
		<h1>宝石申购</h1>
		<div class="tac mgt-10">
			<p class="small"><span class="opa-6">申购倒计时:</span> 45:55:55</p>
			<p class="small"><span class="opa-6">申购数量:</span> 1500/3000</p>
			<p class="small"><span class="opa-6">签名:</span> 30%</p>
		</div>
		<img src="../../assets/icon/gemIcon_yellow.png" alt=""/>
		<div class="mgt-10">
			<button class="btn-primary" style="margin:10px">宝石申购</button>
			<button class="btn-primary" style="margin:10px">收集宝石</button>
		</div>
		<div class="gemBag">
			<img  src="../../assets/icon/gem_bag_icon.png" alt="">
			<p class="stroke" data-text="宝石背包">宝石背包</p>
		</div>
	</div>
	<!-- 记录 -->
	<table class="mgt-30 small table-his" border="0" frame="void" rules="none" >
		<tr>
			<th width="30%" class="tar">
				<span class="dib tac" style="width: 120px">
					{{ $t("BOX_12") }}
				</span>
			</th>
			<th width="20%">{{ $t("BOX_26") }}</th>
			<th width="10%">{{ $t("BOX_13") }}</th>
			<th width="20%">{{ $t("BOX_27") }}</th>
			<th width="40%" class="tal">TX</th>
		</tr>
		<tr v-for="item in getHistory" :key="item.tx">
			<td class="tar tac-xs">{{ getTimeFtt(item.crtime) }}</td>
			<td>{{ $t(eventToLang[item.event]) }}</td>
			<td>x{{ item.amount }}</td>
			<td class="vertical-children">
				<span v-if="item.state != 1 && item.state != -1">
					&nbsp; {{ $t("Common_08") }}...
				</span>
				<span v-if="item.state == 1">{{ $t("Common_09") }}</span>
				<span v-if="item.state == -1">
					<svg  viewBox="0 0 1024 1024"  width="13" height="13"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF5B5C" p-id="3023"></path><path d="M328.988444 292.750222a17.066667 17.066667 0 0 1 24.120889 0L512 451.697778l158.890667-158.890667a17.066667 17.066667 0 0 1 24.120889 0l36.238222 36.238222a17.066667 17.066667 0 0 1 0 24.120889L572.302222 512l158.947556 158.833778a17.066667 17.066667 0 0 1 0 24.120889l-36.238222 36.238222a17.066667 17.066667 0 0 1-24.120889 0L512 572.302222l-158.833778 158.890667a17.066667 17.066667 0 0 1-24.120889 0l-36.238222-36.238222a17.066667 17.066667 0 0 1 0-24.120889L451.697778 512 292.750222 353.109333a17.066667 17.066667 0 0 1 0-24.120889l36.238222-36.238222z" fill="#FFFFFF"></path></svg>
					&nbsp;
					Fail
				</span>
			</td>
			<td class="tal">
				<img v-if="item.event == 'MintBox' && item.state == 1" @click="showHistoryDialog(item)" src="../../assets/icon/view.png" alt="" class="cur-point" />&nbsp;
				<a :href="getTxUrl(item.tx)" target="_blank">
					<img src="../../assets/icon/viewTx.png" alt="" class="cur-point" />
				</a>
			</td>
		</tr>
	</table>
</div>
</template>
<script>
export default {
	computed:{
		getHistory(){
			return [];
		}
	},
	created(){
		console.log("Gembuy")
	}
}
</script>
