<template>
    <div id="momo-state" class="center-box" style="padding-bottom: 20px">
        <Chart type="market" />
        <div class="tal mgt-20">
            <h2 class="dib bold">MOMO</h2>
            <div class="mgl-10">
                <p class="opa-6 mgt-20">{{ $t("BOX_01") }}</p>
                <h1 class="bold2" >{{ totalOpenBoxAmount.bnb.toLocaleString() }}</h1>
            </div>
        </div>
        <section class="mgt-20 por" >
            <div class="aveage-box " style="border-radius:10px">
                <div  class="vertical-children">
                    <div ref="pie5" class="pie" style="border-color:#FD820B"></div>
                    <div class="dib mgl-5">
                        <p class="small opa-6 " >{{$t("Fetters_13")}}</p>
                        <h3 class="bold2 mgt-5">{{(getCountMomo.v5 || '-') + `(${getCountMomo.v5_all})`}}</h3>
                    </div>
                </div>
                <div  class="vertical-children">
                    <div ref="pie4" class="pie" style="border-color:#AE20E2"></div>
                     <div class="dib mgl-5">
                        <p class="small opa-6 " >{{$t("Fetters_14")}}</p>
                        <h3 class="bold2 mgt-5">{{(getCountMomo.v4 || '-') + `(${getCountMomo.v4_all})`}}</h3>
                    </div>
                </div>
                <div style="padding:10px;" class="adv-panel hide-xs">
                    <p class="small opa-6" >{{$t("Fetters_15")}}</p>
                    <h3 class="mgt-10 bold2">{{$root.$children[0].showPowerUpList.length * 300}}</h3>
                </div>
                <div style="padding:10px;margin-left: 20px"  class="adv-panel hide-xs">
                    <p class="small opa-6" >{{$t("Fetters_16")}}</p>
                    <h3 class="mgt-10 bold2">{{numFloor($root.$children[0].getTotalPercent.maxAdd * 100, 100)+'%'}}</h3>
                </div>
            </div>
        </section>
        <section class="mgt-20 por visiable-xs hide" >
            <div class="aveage-box" style="border-radius:10px">
                <div style="padding:10px;border:none" class="adv-panel">
                    <p class="small opa-6" >{{$t("Fetters_15")}}</p>
                    <h3 class="mgt-10 bold2">{{$root.$children[0].showPowerUpList.length * 300}}</h3>
                </div>
                <div style="padding:10px;border:none"  class="adv-panel mgl-10">
                    <p class="small opa-6" >{{$t("Fetters_16")}}</p>
                    <h3 class="mgt-10 bold2">{{numFloor($root.$children[0].getTotalPercent.maxAdd * 100, 100)+'%'}}</h3>
                </div>
            </div>
        </section>
        <section class="mgt-20 por adv-panel tal no-adv-xs" style="padding: 20px">
            <div style="position: absolute;right: -10px;top: -10px;" class="hide-xs">
                <span class="cur-point por dib"   @click="getRootRefs().ruleDialog.show('MOMO_80','MOMO_81')">
                    <svg class="opa-6"  width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path style="fill:none" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </span>
            </div>
            <div class="aveage-box block-xs" style="border-radius:10px">
                <div >
                    <p class="small opa-6 " >{{$t("MOMO_76")}}</p>
                    <h3 class=" mgt-10 tac vertical-children2 bold2">{{getLeftTime(momoSetting.updateTime - nowTs)}}</h3>
                </div>
                <div >
                    <p class="small opa-6 " >{{$t("MOMO_77")}}</p>
                    <h3 class="mgt-10 tac vertical-children2 bold2">
                        <span>[{{hashrateInfo.v4MinHashrate}}, {{hashrateInfo.v4StandardHashrate}}, {{hashrateInfo.v4MaxHashrate}}]</span>
                        <img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
                        <span class="mgl-5">[<span :style="{color: hashrateInfo.v4MinHashrate != nextStepHashrateInfo.v4.min ? 'rgb(133, 243, 74)' : ''}">{{nextStepHashrateInfo.v4.min}}</span>, <span class="color-yellow">{{nextStepHashrateInfo.v4.standard}}</span>, <span style="color:rgb(133, 243, 74)">{{nextStepHashrateInfo.v4.max}}</span>]</span>
                    </h3>
                </div>
                <div >
                    <p class="small opa-6 " >{{$t("MOMO_78")}}</p>
                    <h3 class="mgt-10 tac vertical-children2 bold2">
                        <span>[{{hashrateInfo.v5MinHashrate}}, {{hashrateInfo.v5StandardHashrate}}, {{hashrateInfo.v5MaxHashrate}}]</span>
                        <img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
                        <span class="mgl-5">[<span :style="{color: hashrateInfo.v5MinHashrate != nextStepHashrateInfo.v5.min ? 'rgb(133, 243, 74)' : ''}">{{nextStepHashrateInfo.v5.min}}</span>, <span class="color-yellow">{{nextStepHashrateInfo.v5.standard}}</span>, <span style="color:rgb(133, 243, 74)">{{nextStepHashrateInfo.v5.max}}</span>]</span>
                    </h3>
                </div>
                <div>
                    <p class="small opa-6 " >{{$t("MOMO_79")}}</p>
                    <h3 class=" mgt-10 tac vertical-children2 bold2">
                        [{{hashrateInfo.v6StandardHashrate}}, <span>{{Number(hashrateInfo.v6MaxHashrate)}}</span>]
                        <img class="mgl-5" src="@/assets/icon/upgradejt.png" alt="" height="12">
                        [<span class="color-yellow">{{nextStepHashrateInfo.v6.standard}}</span>, <span class="mgl-5" style="color:rgb(133, 243, 74)">{{nextStepHashrateInfo.v6.max}}</span>]
                    </h3>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { Wallet } from "@/utils";
import { BaseConfig } from "@/config";
import { InitEth, CommonMethod } from "@/mixin";
import Chart from "./Chart.vue"

const echarts = window.echarts;

export default {
    mixins: [InitEth, CommonMethod],
    components: {Chart},
    data(){
        return {
            pie4: null,
            pie5: null,
        }
    },
    computed: {
        ...mapState({
			hashrateInfo: (state) => state.globalState.hashrateInfo,
			nowTs: (state) => state.globalState.data.nowTs,
			v4MinHashrate: (state) => state.globalState.v4MinHashrate,
			v5MinHashrate: (state) => state.globalState.v5MinHashrate,
            buyBack: (state) => state.bnbState.data.buyBack,
            buyBackType: (state) => state.globalState.data.buyBackType,
			momoSetting: (state) => state.globalState.data.momoSetting,
			momoNumObj: (state) => state.globalState.data.momoNumObj,
			totalOpenBoxAmount: (state) => state.globalState.data.totalOpenBoxAmount,
        }),
        getCountMomo(){
			let obj = {v4: 0,v4_all: 0,v5: 0,v5_all: 0,};
			let nftCfg = BaseConfig.NftCfg;
			let momoNumObj = this.momoNumObj;
			for (const key in BaseConfig.NftCfg) {
				if(key[0] == '4'){
					obj.v4_all +=  nftCfg[key].mmNum;
					obj.v4 += nftCfg[key].mmNum - momoNumObj[key];
				}
				if(key[0]=='5'){
					obj.v5_all +=  nftCfg[key].mmNum;
					obj.v5 += nftCfg[key].mmNum - momoNumObj[key];
				}
			}
			return obj;
		},
        getNextHash(){
			let retData = {v4: 0, v5: 0, v6: 0};
			let {v4_max_upgrade, v5_max_upgrade} = this.momoSetting;
			retData.v4 = Number(v4_max_upgrade);
			retData.v5 = Number(v5_max_upgrade);
			retData.v6 = Number(v5_max_upgrade) >= 180? Number(v5_max_upgrade) + 30: 180;

			retData.v4 += retData.v4 < 80? 20: 10;
			retData.v5 +=  20;
			return retData;
		},
        nextStepHashrateInfo() {
            const step = this.hashrateInfo.currentStep + 1;

            return {
                v4: {
                    min: Math.floor((step - 8) / 2) * 10 + 10,
                    standard: Math.floor(((Math.floor((step - 8) / 2) * 10 + 10) +((step - 2) * 10 + 80)) / 2),
                    max: ((step - 2) * 10) + 80,
                },
                v5: {
                    min: Math.floor((step - 8) / 2) * 20 + 50,
                    standard: Math.floor(((Math.floor((step - 8) / 2) * 20 + 50) +((step - 1) * 20 + 150)) / 2),
                    max: ((step - 1) * 20) + 150,
                },
                v6: {
                    min: 180,
                    standard: Math.floor(((step - 1) * 10) + 90),
                    max: ((step - 1) * 20) + 180,
                },
            };
        }
    },
    watch: {
        getCountMomo: function(){
            this.showPie5();
            this.showPie4();
        }
    },
    mounted(){
        this.showPie4();
        this.showPie5();
    },
    methods: {
        showPie5(){
            let option = {
                tooltip: { trigger: 'item' },
                series: [{
                    type: 'pie',
                    radius: ['50%', '90%'],
                    label: {show: false},
                    data: [
                        { value: this.$parent.baseData.circulatingV5, name: this.$t("Network_5") },
                        { value: this.getCountMomo.v5 - this.$parent.baseData.circulatingV5 ,  name: this.$t("Network_6")},
                        { value: this.getCountMomo.v5_all - this.getCountMomo.v5,  name: this.$t("Network_11") },
                    ],
                    color: ['#FD820B','#888', 'rgb(133, 243, 74)']
                }]
            };
            if(this.pie5 == null){
                this.pie5 = echarts.init(this.$refs.pie5);
            }
            this.pie5.setOption(option);
        },
        showPie4(){
            let option = {
                tooltip: { trigger: 'item' },
                series: [{
                    type: 'pie',
                    radius: ['50%', '90%'],
                    label: {show: false},
                    data: [
                        { value: this.$parent.baseData.circulatingV4,name: this.$t("Network_5") },
                        { value: this.getCountMomo.v4 - this.$parent.baseData.circulatingV4,name: this.$t("Network_6") },
                        { value: this.getCountMomo.v4_all - this.getCountMomo.v4 ,name: this.$t("Network_11") },
                    ],
                    color: ['#AE20E2','#888','rgb(133, 243, 74)']
                }]
            };
            if(this.pie4 == null){
                this.pie4 = echarts.init(this.$refs.pie4);
            }
            this.pie4.setOption(option);
        },
        async getAll721Status() {
            let momoNumObj = await Wallet.ETH.getAll721Status();
            this.$store.commit("globalState/setData", {momoNumObj});
        }
    },
    created() {
        this.getAll721Status();
        this.getMaxHashrateV3();
        this.getMoMoSetting();
        this.setTotalOpenBox();
    }
}
</script>

<style scoped>

#momo-state h3{
    font-size: 18px !important;
}
#momo-state h1{
    font-size: 28px;
}

.pie{
    width: 70px;
    height: 70px;
    display: inline-block;
    border: 1px solid;
    border-radius: 90px;
}
@media (max-width: 768px) {
    #momo-state .adv-panel{
        padding: 10px !important;
        margin-top: 10px;
    }
    .block-xs{
        display: block;
    }
    .pie{
        width: 30px !important;
        height: 30px !important;
    }
   
    #momo-state h1{
        font-size: 26px !important;
    }
}
</style>
