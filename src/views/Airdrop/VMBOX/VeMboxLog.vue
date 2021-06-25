<template>
	<section>
		<Dialog id="vembox-log-dialog" :top="100"  :width="520">
			<h2>{{$t('Air-drop_184')}}</h2>
			<div class="mgt-20">
				<table style="width:100%; border-collapse:collapse;border: none;" class="small">
					<tr >
						<th class="tac">{{$t('Air-drop_47')}}</th>
						<th class="tac">{{$t('Air-drop_49')}}</th>
						<th class="tac">{{$t('Air-drop_50')}}</th>
					</tr>
					<tr>
						<td colspan="3">
							<hr class="split-hr mgt-10"  />
						</td>
					</tr>
					<tbody v-for="item in veMboxLogs" :key="item.tx">
						<tr><td colspan="5" style="height:10px"></td></tr>
						<tr class="list-item">
							<td class="tac">
								<p>{{dateFtt("yyyy-MM-dd", new Date(item.crtime*1000))}}</p>
								<p>{{dateFtt("hh:mm:ss", new Date(item.crtime*1000))}}</p>
							</td>
							<td>
								<span v-if="getState(item)=='stake'">{{$t('Air-drop_153')}}</span>
								<span v-if="getState(item)=='moveStake'">{{$t('Air-drop_154')}}</span>
								<span v-if="getState(item)=='unStake'">{{$t('Air-drop_155')}}</span>
							</td>
							<td class="tar">
								<div class="vertical-children" >
									<div class="dib vertical-children ">
										<p v-if="getState(item) != 'moveStake' "  :class="getState(item) == 'stake'?'color-buy':'color-sell'">{{getState(item) == 'stake'?"-":"+"}} {{numFloor(item.mobox/1e18, 4)}} MBOX</p>
										<section v-else>
											<div  :class="coinArr[poolIndexToName[item.fromPool]].isLP?'double-img':'' "  style="height:40px;zoom:0.5" class="dib por">
												<img v-for="(name, key) in coinArr[poolIndexToName[item.fromPool]].coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="20" alt="" />
											</div>
											<span class="mgl-10 color-buy"> - {{numFloor(item.vemobox/1e18, 4)}} veMBOX</span> 
										</section>

										<section class="mgt-5">
											<div  :class="coinArr[poolIndexToName[item.poolIndex]].isLP?'double-img':'' "  style="height:40px;zoom:0.5" class="dib por">
												<img v-for="(name, key) in coinArr[poolIndexToName[item.poolIndex]].coinName.split('-')" :key="name+key" :src=" require(`@/assets/coin/${name}.png`) " height="20" alt="" />
											</div>
											<span class="mgl-5"  :class="getState(item) == 'stake' || getState(item)=='moveStake'?'color-sell':'color-buy'">
												{{getState(item) == 'stake' || getState(item)=='moveStake'?"+":"-"}} {{numFloor(item.vemobox/1e18, 4)}} veMBOX
											</span> 
										</section>

									</div>
									<div class="dib mgl-10 cur-point">
										<a :href="getTxUrl(item.tx)" target="_blank">
											<img src="@/assets/icon/viewTx.png" height="25" alt=""/>
										</a>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Dialog>
	</section>
</template>

<script>
import { Dialog } from '@/components';
import { mapState } from 'vuex';
import CommonMethod from '@/mixin/CommonMethod';
import { PancakeConfig } from '@/config';

export default {
	mixins: [CommonMethod],
	computed: {
		...mapState({
			veMboxLogs: (state) => state.bnbState.data.veMboxLogs,
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
		poolIndexToName(){
			let obj = {};
			for (let key in PancakeConfig.StakeLP) {
				let poolObj = PancakeConfig.StakeLP[key];
				if(poolObj.pIndex != -1){
					obj[poolObj.pIndex] = key;
				}
			}
			return obj;
		}
	},
	components: {Dialog},
	methods:{
		getState(item){
			let type = "";
			if(item.fromPool != -1){
				type = "moveStake";
			}else if(item.lockTime != 0){
				type = "stake";
			}else{
				type = "unStake";
			}
			return type;
		},
	}
	
}
</script>

<style scoped>
	@media (max-width: 768px){
		.list-item td:nth-child(2) {
			border-top-left-radius: 0px !important;
			border-bottom-left-radius: 0px !important;
		}
	}
</style>
