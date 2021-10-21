<template>
	<div id="games-view" >
		<div class="game-item" v-for="item in games" :key="item.bgName">
			<div class="por">
				<img :src="require(`@/assets/games/${item.bgName}.jpg`)" alt="" width="100%">
				<img class="game-item-logo" :src="require(`@/assets/games/${item.logoName}.png`)" alt="" width="50%">
			</div>
			<div style="padding:15px;background:#13181f;border-radius:10px">
				<p class="bold">{{$t(item.name)}}</p>
				<p class="opa-6 small sexy" style="height: 45px" >{{$t(item.des)}}</p>
				<a :href="item.url" target="_blank">
					<p class="mgt-10 cur-point" style="color:#FC9B65">{{$t("Air-drop_252")}}>></p>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return({
			games: [
				{bgName: "blockwar", logoName: "blockwar_logo", name: "Air-drop_253", des: "Air-drop_254", url: "https://www.mobox.io/#/block-brawler"},
				{bgName: "goldmaster", logoName: "goldmaster_logo", name: "Air-drop_247", des: "Air-drop_248", url: "https://www.mobox.io/#/iframe/tokenmaster"},
				{bgName: "bullbear", logoName: "bullbear_logo", name: "Air-drop_250", des: "Air-drop_251", url: "https://www.mobox.io/#/iframe/contest"}
			]
		})
	}
}
</script>


<style scoped>
	.game-item-logo{
		position: absolute;
		left: 25%;
		top: 50%;
		transform: translateY(-50%);
	}
	.game-item{
		border: 1px solid rgba(93, 99, 111, 0.5);
		border-radius: 16px;
		display: inline-block;
		padding: 10px;
		flex-basis: 31%;
	}

	#games-view{
		text-align: left;
		justify-content: space-between;
		display: flex;
	}

	@media (max-width: 768px) {
		#games-view{
			width: 800px;
		}
		.game-item{
			width: 300px;
		}
	}
</style>