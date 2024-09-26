<template>
    <div class="center-box" style="padding-bottom: 20px" id="statistics-vembox">
        <Chart type="buyback" />
        <div class="tal mgt-20">
            <div class="vertical-children">
                <h2 class="dib">veMBOX</h2>
            </div>
            <div class="aveage-box block-xs">
                <p class="small-xs opa-6">{{$t("Air-drop_256")}}</p>
            </div>
        </div>
        <div class="mgt-20 por adv-panel no-adv-xs">
            <div class="aveage-box vemobx-show" style="padding:10px 20px">
                <div >
                    <p class="small opa-6 " >{{$t("Air-drop_189")}}</p>
                    <h3 class="mgt-5 bold2 vertical-children">
                        <img src="@/assets/statistics/icon1.png" alt="" width="20">
                        <span class="mgl-5">
                            {{numFloor(totalStakeMbox, 1).toLocaleString()+'('+numFloor(totalStakeMbox/buyBack.circulating * 100, 100)+'%)'}}
                        </span>
                    </h3>
                </div>
                <div >
                    <p class="small opa-6 " >{{$t("Air-drop_190")}}</p>
                    <h3 class="mgt-5 bold2 vertical-children">
                        <img src="@/assets/statistics/icon6.png" alt="" width="20">
                        <span class="mgl-5">
                            {{numFloor(veMboxTotal/1e18, 1).toLocaleString()}}
                        </span>
                    </h3>
                </div>
                <div >
                    <p class="small opa-6 " >{{$t("Air-drop_191")}}</p>
                    <h3 class="mgt-5 bold2 vertical-children">
                        <img src="@/assets/statistics/icon4.png" alt="" width="20">
                        <span class="mgl-5">
                            {{avgLockDays}}
                        </span>
                    </h3>
                </div>
                <div  class="por adv-panel-content my-vemobx" style="padding:10px 20px">
                    <p class="small opa-6 " >{{$t("Air-drop_192")}}</p>
                    <h3 class="mgt-5 bold2">{{getMyTotalVeMbox}}</h3>
                    <span class="dib por cur-point" style="width:30px;position:absolute;right:20px;bottom:10px" @click="$root.$children[0].$refs.vmbox.setOprData(coinArr['GOV']).show()">
                        <span class="notice" style="zoom:0.7" v-if="coinArr['GOV'].veMbox.notice "></span>
                        <img   src="@/assets/icon/vembox-icon.png" alt="" height="30" />
                        <span class="tac opa-6" style="width:120%;position:absolute;bottom:-5px;left:-10%;font-size:12px;color:#fff;zoom:0.7;" >veMBOX</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { InitEth, CommonMethod } from "@/mixin";
import Chart from "./Chart.vue"

export default {
    components: { Chart },
	mixins: [InitEth,CommonMethod],
    computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
			buyBack: (state) => state.bnbState.data.buyBack,
			veMboxTotal: (state) => state.bnbState.data.veMboxTotal,
			avgLockDays: (state) => state.bnbState.data.avglockdays,
			totalStakeMbox: (state) => state.bnbState.data.totalStakeMbox,
        }),
        getMyTotalVeMbox(){
			let veMbox = 0;
			for (let key in this.coinArr) {
				if(key != "ts"){
					let coinObj = this.coinArr[key];
					veMbox += 	Number(coinObj.veMbox.orderIndexs[0].veMboxNum)
					veMbox += 	Number(coinObj.veMbox.orderIndexs[1].veMboxNum)
					veMbox += 	Number(coinObj.veMbox.orderIndexs[2].veMboxNum)
				}
			}
            if (isNaN(veMbox)) {
                return 0;
            }
			return this.numFloor(veMbox/1e18, 1e6);
		},
    },
    created() {
        this.getTotalStakeMbox();
        this.getPools();
        this.avglockdays();
        this.getBuyBack();
    }
}
</script>

<style scoped>
 @media (max-width: 768px) {
     .vemobx-show{
        display: block;
        padding: 10px !important;
        margin-top: 10px;
     }
     .vemobx-show >div{
         margin-top: 10px !important;
     }
     .my-vemobx{
         padding: 0px !important;
         border: none;
         background: none !important;
     }
    .my-vemobx .cur-point{
        bottom: 0px !important;
    }
 }
</style>
