<template>
  <div class="big-sell-item" :class="{ 'opa-6': nowTs - data.uptime <= 600 }">
    <div class="big-sell-show aveage-box">
      <div
        v-for="pos in 3"
        :key="getTokens[pos - 1].tokenId"
        class="big-sell-show-item"
        :class="`pet_hover_lv` + getVType(getTokens[pos - 1].prototype)"
      >
        <img
          v-if="!isMeetStandards(pos - 1)"
          src="@/assets/icon/warning-icon.png"
          class="tip-icon"
          @click.stop="standardsHashrateTip(pos - 1)"
        />
        <div class="big-sell-show-item-show">
          <PetItemMin :data="getTokens[pos - 1]" />
        </div>
        <p class="mgt-10">Lv. {{ getTokens[pos - 1].level }}</p>
        <div class="vertical-children">
          <img src="@/assets/icon/airdrop.png" alt="" height="15" />
          <span class="mgl-5" :class="getHashrateColor(getTokens[pos - 1])">{{
            getTokens[pos - 1].lvHashrate
          }}</span>
        </div>
        <div class="small opa-6 hide-xs" v-if="getTokens[pos - 1].level > 1">
          <span>Lv.1</span>
          <img
            class="mgl-5"
            src="@/assets/icon/airdrop.png"
            alt=""
            height="10"
          />&nbsp;
          <span :class="getHashrateColor(getTokens[pos - 1])">{{
            getTokens[pos - 1].hashrate
          }}</span>
        </div>
      </div>
      <div class="big-sell-show-item" style="flex: 0.5; background: #1c222c">
        <div class="big-sell-show-item-show">
          <img src="@/assets/icon/big_sell_group.png" alt="" height="20" />
        </div>
        <div class="mgt-10">ALL</div>
        <h3>{{ getTokens.length }}</h3>
      </div>
    </div>
    <div class="aveage-box" style="padding: 20px">
      <!-- <div class="tal vertical-children">
                <img src="@/assets/icon/airdrop.png" alt="" height="20">
                <span class="c-lv5 mgl-5 bold" style="font-size: 18px">{{data.hashrate}}</span>
            </div> -->
      <div class="tac vertical-children">
        <img src="@/assets/coin/USDT.png" alt="" height="20" />
        <span class="mgl-5 money" style="font-size: 18px"
          >{{ numFloor(data.price / 1e9, 1e2).toLocaleString()
          }}<span class="small"> USDT</span></span
        >
      </div>
    </div>
    <div v-if="nowTs - data.uptime <= 600" class="mgt-10 small up-time">
      <p class="small">
        {{ $t("Market_30") }}:
        {{ getLeftTime(Number(data.uptime) + 600 - nowTs) }}
      </p>
    </div>
  </div>
</template>
<script>
import { PetItemMin } from "@/components";
import { CommonMethod } from "@/mixin";
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

export default {
  mixins: [CommonMethod],
  components: { PetItemMin },
  props: ["data"],
  computed: {
    ...mapState({
      hashrateInfo: (state) => state.globalState.hashrateInfo,
      nowTs: (state) => state.globalState.data.nowTs,
    }),
    getTokens() {
      let tokens = [];
      let NftCfg = BaseConfig.NftCfg;
      this.data.tokens.map((item) => {
        tokens.push({
          ...NftCfg[item.prototype],
          ...item,
          noHover: true,
          isGroup: this.data.type == 1,
        });
      });
      return tokens.sort((a, b) => b.lvHashrate - a.lvHashrate);
    },
  },
  methods: {
    //
    standardsHashrateTip(index) {
      this.getConfirmDialog().show(
        `${this.$t("MOMO_98")
          .replace("#0#", this.standardsHashrate(index))
          .replace("#0#", this.standardsHashrate(index))}`
      );
    },
    //
    isMeetStandards(index) {
      const { lvHashrate, hashrate, level, prototype } = this.getTokens[index];
      const standardsHashrate = this.standardsHashrate(index);
      const { type } = this.data;
      const lvType = parseInt(prototype / 1e4);

      if (lvType < 4) {
        return true;
      }

      if (level > 1) {
        return hashrate >= standardsHashrate;
      }

      return lvHashrate >= standardsHashrate;
    },
    //
    standardsHashrate(index) {
      const type = parseInt(this.getTokens[index].prototype / 1e4);
      return this.hashrateInfo[`v${type}StandardHashrate`];
    },
  },
};
</script>

<style scoped>
.up-time {
  position: absolute;
  top: -5px;
  width: 100%;
}
.big-sell-show-item-show {
  height: 60px;
  background: #14181f;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.big-sell-show-item {
  position: relative;
  /* background: #1c222c; */
  border-radius: 10px;
  padding: 5px;
  margin-left: 10px;
  height: 145px;
}

.big-sell-show {
  background: #00000046;
  border-radius: 12px;
  padding: 18px;
}
.big-sell-item {
  width: 350px;
  border-radius: 50px;
  text-align: center;
  position: relative;
  display: inline-block;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  height: 250px;
  background: #1c222c;
  border-radius: 16px;
}

.tip-icon {
  width: 25px !important;
  height: 25px !important;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  transform: translate(50%, -50%);
}

@media (max-width: 992px) {
  .big-sell-item {
    width: 48% !important;
    zoom: 0.5;
    margin: 1% !important;
  }
}
</style>
