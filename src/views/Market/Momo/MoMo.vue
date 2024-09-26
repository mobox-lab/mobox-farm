<template>
    <div class="mgt-10">
        <div class="tal vertical-children">
            <div class="hide-xs" style="border-bottom: 1px solid #141b24 !important;padding-bottom:10px">
                <Tab :list="tabList" :defaultSelectPos="menuTabPos" :onChange="onTabChange" :notice="[0,0,0,tempSells.length + tempMarketCancelTx.length]"  />
            </div>
            <div class="m-tab dib visiable-xs" style="zoom: 0.8">
                <Dropdown class="line" :list="tabList" :defaultSelectPos="menuTabPos" :onChange="onTabChange" />
            </div>
        </div>
        <div style="padding:0px 10px">
            <MarketAll v-if="menuTabPos == 0" />
            <MarketBig v-if="menuTabPos == 1" />
            <MarketMy v-if="menuTabPos == 2" />
            <MarketMySell v-if="menuTabPos == 3" />
            <MarketStatistics v-if="menuTabPos == 4" />
        </div>
    </div>
</template>

<script>
// MOMO
import MarketAll from './MarketAll.vue'
import MarketBig from './MarketBig.vue'
import MarketMy from './MarketMy.vue'
import MarketMySell from './MarketMySell.vue'
import MarketStatistics from './MarketStatistics.vue'
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import {  Tab, Dropdown } from "@/components";

export default {
	mixins: [CommonMethod],
    data(){
        return{
			sortArr: [this.$t("Market_47"),this.$t("Market_04"), this.$t("Market_05"), this.$t("Market_06"), this.$t("Market_07")],
			tabList: [this.$t('Market_01'), this.$t("Market_78"), this.$t("Market_02"), this.$t("Market_03"), this.$t("Market_53")],
        }
    },
    components: {
        Tab, Dropdown,
        MarketAll, MarketMy, MarketMySell, MarketStatistics, MarketBig
    },
    computed: {
        ...mapState({
			tempSells: (state) => state.marketState.data.tempSells,
			tempMarketCancelTx: (state) => state.marketState.data.tempMarketCancelTx,
			menuTabPos: (state) => state.momoMarketState.data.menuTabPos,
			historyNotice: (state) => state.marketState.data.historyNotice,
			marketSearch: (state) => state.marketState.data.marketSearch,
        }),
  
    },
    methods: {
        onTabChange(tabPos) {
			this.$store.commit("momoMarketState/setData", {menuTabPos: tabPos});
		},
    }
}
</script>
<style scoped>
@media (max-width: 768px) {
    #buy-car{
        zoom: 0.8;
    }
}
</style>
