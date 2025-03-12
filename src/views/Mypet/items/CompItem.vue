<template>
  <div
    :class="[
      'pet_hover_lv' + getVType(item.prototype),
      { 'opa-6': item.isLock || isRent },
    ]"
    @click="addNum()"
    class="shop-car-item vertical-children por mgt-10 por"
  >
    <img
      class="tip-icon"
      v-if="showTipIcon && !isStandard"
      src="@/assets/icon/warning-icon.png"
    />
    <div class="dib mgl-5 cp-show" style="width: 120px; padding: 10px">
      <div class="momo-tab momo-tab-min-type4 dib por" style="margin: 3px">
        <p
          class="vertical-children small momo-tab-hash"
          v-if="item.level > 1"
          style="
            transform: translateX(-50%);
            left: 50%;
            trz-index: 99;
            position: absolute;
            top: -16px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 30px;
            padding: 0px 5px;
            white-space: nowrap;
          "
        >
          <img src="@/assets/icon/airdrop.png" width="10" alt="" />&nbsp;
          <span :class="getHashrateColor(item)">{{ item.hashrate }}</span>
        </p>
        <img
          class="momo-tab-img"
          :src="require(`@/assets/pet/${item.prototype}.png`)"
          alt=""
          width="100%"
        />
      </div>
      <div
        class="momo-tab dib"
        style="margin: 3px"
        v-for="item2 in item.show_1155"
        :key="item2"
        :class="`momo-tab-min-type` + parseInt(item2 / 1e4)"
      >
        <img :src="require(`@/assets/pet/${item2}.png`)" alt="" width="100%" />
      </div>
    </div>

    <div class="pet-select vertical-children" v-if="item.isLock">
      <img class="lock" src="@/assets/icon/lock.png" height="20" alt="" />
    </div>

    <div class="pet-select vertical-children" v-if="isRent">
      <img class="rent" src="@/assets/icon/rent_time.png" height="20" alt="" />
    </div>

    <div class="dib small mgl-5">
      <p class="vertical-children">
        <img src="@/assets/icon/airdrop.png" width="20" alt="" />
        <span
          class="mgl-5"
          style="font-size: 18px"
          :class="getHashrateColor(item)"
        >
          {{ item.lvHashrate }}
        </span>
      </p>
      <p class="vertical-children mgt-5">
        <img
          :src="require(`@/assets/icon/${category_img[item.category]}.png`)"
          width="12"
          alt=""
        />&nbsp;
        <span class="mgl-5"> Lv.{{ item.level }} </span>
      </p>
      <p class="vertical-children mgt-5">
        <img :src="require(`@/assets/icon/bnb.png`)" width="12" alt="" />
        <span class="mgl-5">
          {{
            item.tokenName.indexOf("Name_") == -1
              ? shortStr(item.tokenName)
              : $t(item.tokenName)
          }}
        </span>
      </p>
    </div>
    <!-- 宝石 -->
    <div class="jewel">
      <div
        v-for="(dPos, index) in [100, 200, 300, 400]"
        :key="JSON.stringify('' + dPos + item.tokenId)"
        class="gem-item-little"
      >
        <img
          v-if="
            momoGemsObjs[item.tokenId] == undefined ||
            momoGemsObjs[item.tokenId][index] == 0
          "
          :src="require(`@/assets/market/${dPos + 1}.png`)"
          class="opa-3 gray"
          alt=""
          title="jewel"
        />
        <img
          v-else
          :src="
            require(`@/assets/market/${momoGemsObjs[item.tokenId][index]}.png`)
          "
          alt=""
        />
      </div>
    </div>
    <!-- /宝石 -->

    <div
      @click="reduceNum($event)"
      class="pet-select vertical-children"
      v-if="isSelect"
    >
      <img src="@/assets/icon/select.png" alt="" height="30" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Common } from "@/utils";

export default {
  mixins: [CommonMethod],
  props: {
    item: Object,
    momoGemsObjs: Object,
    onSelectChange: Function,
    selectProtoTypes: Object,
    //
    showTipIcon: {
      type: Boolean,
      default: false,
    },
    //
    verificationHashrate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      hashrateInfo: (state) => state.globalState.hashrateInfo,
    }),
    isStandard() {
      const item = this.item;
      const vType = parseInt(item.prototype / 1e4);
      const standardsHashrate = this.hashrateInfo[`v${vType}StandardHashrate`];
      return item.level > 1
        ? item.hashrate >= standardsHashrate
        : item.lvHashrate >= standardsHashrate;
    },
    //
    getSelectNum() {
      if (!this.selectProtoTypes) return 0;
      let num = 0;
      let { vType, prototype, tokenId } = this.item;
      let selectArr = this.selectProtoTypes["v" + vType];
      let selectTokenIds = this.selectProtoTypes["v" + vType + "_tokenId"];
      selectArr.map((item, index) => {
        let targetToken = 0;
        if (selectTokenIds) {
          targetToken = selectTokenIds[index];
        }
        if (item == prototype && targetToken == tokenId) num++;
      });
      if (vType >= 4 && num > 1) num = 1;
      return num;
    },
    //
    isSelect() {
      return this.getSelectNum > 0 && this.item.vType >= 4;
    },
    isRent() {
      let isRent = false;
      let rent = this.item.rent;
      if (rent && rent.state != -1) {
        isRent = true;
      }
      return isRent;
    },
  },
  methods: {
    async addNum() {
      let { tokenId, prototype, num, vType, isLock } = this.item;

      if (this.verificationHashrate && !this.isStandard) {
        await this.showTip();
      }

      //
      if (this.getSelectNum >= num) {
        Common.app.$refs.quickBuy.show(prototype);
        return;
      }
      if (isLock || this.isRent) return;
      if (typeof this.onSelectChange == "function") {
        this.onSelectChange({ tokenId, prototype, vType, num: 1 });
      }
    },
    async showTip() {
      return new Promise((resolve) => {
        const { prototype } = this.item;
        const lvType = parseInt(prototype / 1e4);
        const standardsHashrate =
          this.hashrateInfo[`v${lvType}StandardHashrate`];
        this.getConfirmDialog().show(
          `${this.$t("MOMO_100").replace("#0#", standardsHashrate)}`,
          resolve
        );
      });
    },
    reduceNum(e) {
      e.stopPropagation();
      let { tokenId, prototype, vType, isLock } = this.item;
      if (isLock || this.isRent) return;
      if (typeof this.onSelectChange == "function") {
        this.onSelectChange({ tokenId, prototype, vType, num: -1 });
      }
    },
  },
};
</script>

<style scoped>
.tip-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  transform: translate(50%, -50%);
  z-index: 99;
}

.pet-select {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
}
.jewel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
}
.gem-item-little {
  width: 30px;
  height: 30px;
  position: relative;
  background: rgba(0, 0, 0, 0.493);
  border-radius: 5px;
  margin: 3px;
  display: inline-block;
}
.gem-item-little img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
.shop-car-item {
  width: 100%;
  border-radius: 20px;
  text-align: left;
  cursor: pointer;
  user-select: none;
}
@media (max-width: 768px) {
  .shop-car-item {
    zoom: 0.8;
  }
}
</style>
