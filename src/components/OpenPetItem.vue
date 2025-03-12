<template>
  <div
    :class="' pet_item_new pet_type' + data.item.vType"
    :data-vType="data.item.vType"
  >
    <div class="loading">
      <div class="card-v4-loading" v-if="data.item.vType == 4"></div>
      <div class="card-v5-loading" v-if="data.item.vType == 5"></div>
    </div>
    <div class="pet-name small vertical-children">
      <img
        v-if="data.item.category != 0"
        :src="require(`../assets/icon/${category_img[data.item.category]}.png`)"
        alt=""
        height="15"
      />&nbsp;
      {{ hasSetName ? shortStr(data.item.tokenName) : $t(data.item.tokenName) }}
    </div>

    <div class="por">
      <img
        class="pet_img"
        :src="require(`../assets/pet/${data.item.prototype}.png`)"
        alt=""
        width="60%"
      />
    </div>

    <p
      :class="`c-lv` + data.item.vType"
      style="font-size: 12px"
      class="bold mgl-5 mgt-5"
    >
      {{ selectVType[data.item.vType] }}
    </p>
    <div class="pet-power vertical-children mgt-5">
      <img src="@/assets/icon/airdrop.png" alt="" height="12" />
      <span
        :class="getHashrateColor(data.item)"
        style="font-size: 10px"
        class="mgl-5"
        >{{ data.item.lvHashrate }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";

export default {
  mixins: [CommonMethod],
  props: ["data"],
  data() {
    return {
      selectVType: [
        this.$t("MOMO_08"),
        this.$t("MOMO_09"),
        this.$t("MOMO_10"),
        this.$t("MOMO_11"),
        this.$t("MOMO_12"),
        this.$t("MOMO_13"),
        this.$t("MOMO_14"),
      ],
    };
  },
  computed: {
    ...mapState({
      globalState: (state) => state.globalState.data,
    }),
    //
    hasSetName() {
      return this.data.item.tokenName.indexOf("Name_") == -1;
    },
  },
};
</script>

<style scoped>
.pet_item_new > * {
  line-height: 100%;
}
.pet_item_new {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding-top: 20%;
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.pet_type1 {
  background-image: url("../assets/card_v2/bg1.png");
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.8);
}
.pet_type2 {
  background-image: url("../assets/card_v2/bg2.png");
  box-shadow: 0px 0px 20px 0px rgba(82, 192, 102, 0.8);
}
.pet_type3 {
  background-image: url("../assets/card_v2/bg3.png");

  box-shadow: 0px 0px 20px 0px rgba(105, 182, 254, 0.8);
}
.pet_type4 {
  background-image: url("../assets/card_v2/bg4.png");

  box-shadow: 0px 0px 20px 0px rgba(163, 141, 255, 0.8);
}
.pet_type5 {
  background-image: url("../assets/card_v2/bg5.png");
  box-shadow: 0px 0px 20px 0px rgba(246, 173, 49, 0.8);
}
.pet-name {
  transform: scale(0.8);
}
.pet_img_bg {
}

.loading {
  position: absolute;
  width: 100%;
}

.loading div {
  /* zoom: 0.44; */
  /* zoom: 0.2; */
  position: absolute;
  left: 48%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.4);
}

.card-v5-loading {
  top: 52% !important;
}
</style>
