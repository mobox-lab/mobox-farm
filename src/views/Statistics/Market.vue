<template>
    <div class="center-box" style="padding-bottom: 20px" id="statistics-market">
        <Chart type="market" />
        <div class="tal mgt-20">
            <h2 class="dib">{{$t("Network_9")}}</h2>
        </div>
        <div class="mgt-20 por adv-panel no-adv-xs">
            <div class="aveage-box block-xs" style="padding:10px 20px">
                <div>
                    <p class="small opa-6 " >{{$t("Market_44")}}</p>
                    <h3 class="mgt-5 bold2 vertical-children">
                        <img src="@/assets/statistics/icon7.png" alt="" width="20">
                        <span class="mgl-5">
                            {{baseData.nftTradeCnt.toLocaleString()}}
                        </span>
                    </h3>
                </div>
                <div>
                    <p class="small opa-6 " >{{$t("Market_45")}}</p>
                    <h3 class="mgt-5 bold2 vertical-children">
                        <img src="@/assets/statistics/icon3.png" alt="" width="20">
                        <span class="mgl-5">
                            ${{parseInt(baseData.nftTradeVolume).toLocaleString()}}
                        </span>
                    </h3>
                </div>
                <div>
                    <p class="small opa-6 " >{{$t("Network_10")}}</p>
                    <h3 class="mgt-5 bold2 vertical-children">
                        <img src="@/assets/statistics/icon5.png" alt="" width="20">
                        <span class="mgl-5">
                            ${{parseInt(baseData.nftTradeVolume * 0.04 + 3000000).toLocaleString()}}
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from "./Chart.vue";

export default {
    components: {Chart},
    computed:{
        baseData(){
            return this.$parent.baseData
        }
    }
    
}
</script>

<style scoped>
@media (max-width: 768px) {
    #statistics-market .aveage-box{
        display: block;
    }
}

</style>
