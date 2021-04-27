<style src="./style.css"></style>
<template>
	<Dialog id="gemBag-dialog" :top="100">
		<ul class="gem-tab">
			<li v-for="item in ['red', 'green', 'blue', 'yellow']" :key="item" :class=" 'border_'+item">
				<img :src="require(`@/assets/gem/${item}_1.png`)" alt=""  width="100%">
			</li>
		</ul>
		<div class="dialog-content">
			<div class="aveage-box" v-for="item in [0, 4, 8]" :key="item">
				<div v-for="item2 in item==8?[1]:[1,2,3, 4]" :key="item + item2" style="padding:5px" >
					<div class="gem-item" :class="{active: selectGemLv == item+item2}" @click="selectGemLv = item+item2">
						<img :src="require(`@/assets/gem/yellow_${item + item2}.png`)" alt=""  width="100%">
						<span class="gem-num stroke bold">999</span>
					</div>
				</div>	
			</div>
		</div>
		<template v-if="selectGemLv >= 2">
			<div class="small opa-6 mgt-10">
				宝石合成:三个低级的宝石合成下一等级的宝石
			</div>
			<div class="mgt-20 aveage-box" >
				<div class="tar">
					<div class="gem-item dib" style="zoom:0.9">
						<img :src="require(`@/assets/gem/yellow_${selectGemLv-1}.png`)" alt="" height="80">
						<span class="gem-num stroke bold">999/3</span>
					</div>
				</div>
				<div style="flex: 2" class="tac">
					<div>
						<button class="btn-primary btn-small">Min</button>&nbsp;
						<SelectNum :maxNum="999"  :defaultNum="1" :data="{needGemLv: selectGemLv-1}" :onChange="onNumChange" />&nbsp;
						<button class="btn-primary btn-small">Max</button> 
					</div>
					<div class="mgt-20" >
						<button class="btn-primary disable-btn" style="width:70%">合成</button>
					</div>
				</div>
			</div>
		</template>
	</Dialog>
</template>
<script>
import { Dialog, SelectNum } from '@/components';

export default {
	components: {Dialog, SelectNum},
	data(){
		return({
			selectGemLv: 2,
		})
	},
	computed:{
	},
	created(){
	},
	methods:{
		onNumChange(data, num){
			console.log(data, num);
		}
	}
}
</script>
