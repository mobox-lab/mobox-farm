<template>
    <div class="center-box" style="padding-bottom: 20px">
        <div class="mgt-10">
            <Chart type="buyback" />
        </div>
        <div class="mgt-20 adv-panel-content" >
            <div class="aveage-box mbox-detail" style="background: #13181f;border-radius: 10px 10px 0px 0px;">
                <div class="vertical-children" >
                    <img src="@/assets/coin/MBOX.png" alt="" height="40">
                    <div class="dib mgl-10">
                        <p class="opa-6">MBOX</p>
                        <h3 class="bold2">
                            $<span v-if="ourPrice['BOX'] != '-' ">{{ourPrice["MBOX"]}}</span>
							<Loading v-else />
                        </h3>
                    </div>
                </div>
                 <div class="hide-xs"></div><div class="hide-xs"></div><div class="hide-xs"></div>
                <!-- <div class="tal tar-btn" >
                    <button class="btn-primary" @click="$root.$children[0].$refs.pancake.setOprData({coinKey: 'MBOX-BNB-V2', pancakeVType: 2}).show('swap')">Buy MBOX</button>
                    <a class="btn-primary" href="https://pancakeswap.finance/swap?outputCurrency=0x3203c9e46ca618c8c1ce5dc67e7e9d75f5da2377" target="_blank">Buy MBOX</a>
                </div> -->
            </div>
            <div class="aveage-box mbox-detail2">
                <div>
                    <p class="opa-6">{{$t("Network_3")}}</p>
                    <h3 class="bold2 mgt-5">{{baseData.maxSupply.toLocaleString()}}</h3>
                </div>
                <div>
                    <p class="opa-6">{{$t("Network_5")}}</p>
                    <h3 class="bold2 mgt-5">{{baseData.circulatingSupply.toLocaleString()}}</h3>
                </div>
                <div>
                    <p class="opa-6">{{$t("Network_6")}}</p>
                    <h3 class="bold2 mgt-5">{{baseData.totalBurned.toLocaleString()}}</h3>
                </div>
                <div>
                    <p class="opa-6">{{$t("Network_7")}}</p>
                    <h3 class="bold2 mgt-5">${{baseData.marketCap.toLocaleString()}}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from "./Chart.vue"
import {Loading } from "@/components";

export default {
    components: {Chart, Loading},
    computed: {
        ourPrice(){
            return this.$root.$children[0].ourPrice;
        },
        baseData(){
            return this.$parent.baseData
        }
    },
}
</script>


<style scoped>
    .mbox-detail{
        padding: 15px 100px;
    }
    .mbox-detail2{
        padding: 30px 100px;
    }
    @media (max-width: 768px) {
        .mbox-detail{
            padding: 15px;
        }
        .mbox-detail2{
            padding: 10px 20px;
            padding-top: 0px;
            display: block;
        }
        .mbox-detail2 > div{
            display: flex;
            margin-top: 10px;
        }
        .mbox-detail2 > div *{
            margin: 0px !important;
            flex: 1;
        }
        .mbox-detail2 h3{
            text-align: right;
        }
        .tar-btn{
            text-align: right;
        }
    }
</style>