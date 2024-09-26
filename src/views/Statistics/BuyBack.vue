<template>
    <div class="center-box" style="padding-bottom: 20px">
        <Chart type="buyback" />
        <div class="tal mgt-20">
            <div class="vertical-children">
                <h2 class="dib">{{$t("Air-drop_257")}}</h2>
            </div>
            <div class="aveage-box block-xs">
                <p class="small-xs" style="color: #7b7b7b;">MOBOX's new Buyback and Burn Program is effective starting November 2023, refer to MOBOX's <a target="_blank" href="https://mbox.medium.com/a-new-dawn-for-mobox-revitalising-the-buyback-and-burn-program-514737de08c1" style="color: #668eff;">Medium article</a> for more details. To view historical buyback burns, switch to "Buyback Burn" via "Trade Type".</p>
            </div>
        </div>
        <div class="aveage-box mgt-20" id="buy-back-show">
            <div  class="adv-panel-content " style="height: 200px;padding:10px 20px">
                <div class="aveage-box" style="padding:8px 0px">
                    <div class="opa-6">{{$t("Air-drop_78")}}</div>
                    <p class="tar bold2">{{'$'+buyBack.amount.toLocaleString()}}</p>
                </div>
                <div class="aveage-box" style="padding:8px 0px">
                    <div class="opa-6">{{$t("Air-drop_80")}}</div>
                    <p class="tar bold2">{{buyBack.moboxBurn.toLocaleString()}}</p>
                </div>
                <div class="aveage-box" style="padding:8px 0px">
                    <div class="opa-6">{{$t("Air-drop_187")}}</div>
                    <p class="tar bold2">{{buyBack.circulating.toLocaleString()}}</p>
                </div>
            </div>
            <div  class="adv-panel-content por" style="height: 200px;flex:2;margin-left:10px;padding:10px 20px">
                <div class="aveage-box ">
                    <p class="opa-6">{{ $t("Air-drop_50") }}</p>
                    <p class="no-dropdown-bg">									
                        <Dropdown style="margin-top:0px" :list="burnTypeList" :defaultSelectPos="buyBackType" :onChange="onBurnTypeChange" />
                    </p>
                    <p class="opa-6">{{ $t("BOX_12") }}</p>
                </div>
                <div class="aveage-box " v-for="(item, index) in buyBack.logs.slice(0, 3)" :key="index" style="border-bottom: 1px solid #222;padding:7px 0px">
                    <p class="bold2">{{numFloor(item.amount, 1e2)}}</p>
                    <p v-if="item.type == 1">{{$t("Air-drop_132")}}</p>
					<p v-else>{{$t("Air-drop_133")}}</p>
                    <p class="opa-6">{{ dateFtt("yyyy-MM-dd hh:mm:ss", new Date(item.ts* 1000)) }}</p>
                </div>
                <a v-if="buyBackType != 2" href="https://bscscan.com/address/0x1846c0ab8D09007154066Cbb114315e11D94D4E8" target="_blank"><div class="tac mgt-10 link">{{$t("Air-drop_148")}}</div></a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { Dropdown } from '@/components';
import CommonMethod from "@/mixin/CommonMethod";
import { Common } from '@/utils';
import Chart from "./Chart.vue"

export default {
    mixins: [CommonMethod],
    components: {Dropdown, Chart},
    data(){
        return{
			burnTypeList: [this.$t('Air-drop_49'), this.$t('Air-drop_132'), this.$t('Air-drop_133')]
        }
    },
    computed: {
		...mapState({
			buyBack: (state) => state.bnbState.data.buyBack,
			buyBackType: (state) => state.globalState.data.buyBackType,
		}),
    },
    methods: {
        onBurnTypeChange(pos){
			if(pos == this.buyBackType) return;
			this.$store.commit("globalState/setData", {buyBackType: pos});
			this.$nextTick(()=>{
				Common.app.getBuyBack();
			})
		},
    },
    mounted() {
        Common.app.getBuyBack();
    }

}
</script>


<style scoped>
@media (max-width: 768px) {
    #buy-back-show{
        display: block;
    }
     #buy-back-show > div{
         margin: 0px !important;
         margin-bottom: 20px !important;
         height: auto !important;
     }
}
</style>