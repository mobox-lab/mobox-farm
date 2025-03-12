<template>
  <li :class="['pet_hover_lv' + item.vType, 'item-layout']">
    <!-- 删除按钮 -->
    <div class="delete" @click="$emit('remove')">
      <span>{{ $t("Market_67") }}</span>
      <svg viewBox="0 0 1024 1024" width="20" height="20">
        <path
          fill="#838689"
          d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"
        ></path>
        <path
          fill="#838689"
          d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"
        ></path>
      </svg>
    </div>
    <!-- 算力信息 -->
    <div class="info-box">
      <!-- momo图片 -->
      <div class="image">
        <img
          class="pet_img"
          v-if="item.prototype > 60000"
          :src="require(`@/assets/pet/${item.prototype}.gif`)"
          alt=""
          height="120"
        />
        <img
          class="pet_img"
          v-else
          :src="require(`@/assets/pet/${item.prototype}.png`)"
          alt=""
          height="120"
        />
      </div>
      <!-- 算力信息 -->
      <div class="info">
        <div class="item">
          <div class="label">{{ $t("MOMO_60") }}(LV.1)</div>
          <div class="data">
            <img class="force" src="@/assets/icon/airdrop.png" />
            <span>{{ item.hashrate }}</span>
            <img class="upgrade" src="@/assets/icon/upgradejt.png" />
            <img class="force" src="@/assets/icon/airdrop.png" />
            <span class="highlight">{{ item.hashrate + count }}</span>
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t("MOMO_61") }}(LV.{{ item.level }})</div>
          <div class="data">
            <img class="force" src="@/assets/icon/airdrop.png" />
            <span>{{ item.lvHashrate }}</span>
            <img class="upgrade" src="@/assets/icon/upgradejt.png" />
            <img class="force" src="@/assets/icon/airdrop.png" />
            <span class="highlight">{{ upgradeHashPower }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 升级操作 -->
    <div class="operation">
      <div class="mec">
        <div class="label">{{ $t("MOMO_73") }}</div>
        <div>
          <img src="@/assets/coin/MEC.png" />
          <span>{{ needCrystal }}</span>
          <span class="name">MEC</span>
        </div>
      </div>
      <!-- 升级按钮 -->
      <div class="form">
        <SelectNum
          :needHideReduce="false"
          :maxNum="getMaxUpgrade(item)"
          :defaultNum="count"
          :onChange="upgradeNumberChange"
        />
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";
import { SelectNum } from "@/components";
import momoPurificationCompute from "@/utils/momoPurificationCompute";

export default {
  props: {
    //
    item: Object,
    //
    countChange: Function,
  },
  components: {
    SelectNum,
  },
  data() {
    return {
      count: 1,
    };
  },
  computed: {
    ...mapState({
      momoSetting: (state) => state.globalState.data.momoSetting,
    }),
    growup() {
      const { vType, hashrate } = this.item;
      const newHashrate = +hashrate + this.count;
      const obj = {
        staticPower: 0,
        staticPercent: 0,
      };

      switch (vType) {
        case 4:
          obj.staticPower = 2000 + parseInt((newHashrate - 10) * 50);
          obj.staticPercent = 0.2;
          break;
        case 5:
          obj.staticPower = 5000 + parseInt((newHashrate - 50) * 50);
          obj.staticPercent = 0.3;
          break;
        case 6:
          obj.staticPower = 18000 + parseInt((newHashrate - 180) * 50);
          obj.staticPercent = 0.4;
          break;
        default:
          break;
      }

      return obj;
    },
    //
    upgradeHashPower() {
      const growup = this.growup;
      const { level, hashrate } = this.item;
      const newHashrate = +hashrate + this.count;
      return parseInt(
        newHashrate +
          parseInt((growup.staticPower * (level - 1)) / 100) +
          parseInt(
            (parseInt(level / 5) *
              (1 + parseInt(level / 5)) *
              growup.staticPower *
              growup.staticPercent) /
              200
          )
      );
    },
    //
    needCrystal() {
      const { hashrate, vType } = this.item;
      const compute = momoPurificationCompute[`v${vType}`];
      return compute(hashrate, this.count);
    },
  },
  methods: {
    //
    getMaxUpgrade(item) {
      const { vType, hashrate } = item;
      return this.momoSetting[`v${vType}_max_enhance`] - hashrate;
    },
    //
    upgradeNumberChange(_, value) {
      const count = (this.count += value);
      this.count = count < 1 ? 1 : count;
      this.$emit("change", this.count);
    },
  },
};
</script>

<style lang="less" scoped>
.item-layout {
  margin-top: 13px;
  border-radius: 16px;
  display: flex;
  position: relative;
  overflow: hidden;

  //
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 18px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0px 14px 0px 14px;

    svg,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    &:hover {
      opacity: 0.8;
    }

    svg {
      margin-left: 2px;
      width: 14px;
    }
  }

  &:first-child {
    margin-top: 0;
  }
}

.info-box {
  height: 100%;
  display: flex;
}

.image {
  height: 100%;

  img {
    width: auto;
    height: 100%;
  }
}

.info {
  display: flex;
  flex-direction: column;
}

.item {
  .label {
    text-align: left;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .data {
    margin-top: 2px;
    text-align: left;

    .force {
      margin-right: 5px;
      width: 17px;
    }

    .upgrade {
      width: 12px;
      margin: 0 10px;
    }

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    span {
      text-align: left;
      font-weight: bold;
    }
  }
}

.operation {
  .mec {
    .label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    span {
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
    }

    .name {
      font-size: 12px;
      margin-left: 5px;
    }

    img {
      height: 25px;
      margin-right: 2px;
    }
  }

  .form {
    /deep/ .yf-select-num {
      img {
        width: 25px;
        height: 25px;
      }

      input {
        height: 25px;
      }
    }
  }
}

.highlight {
  color: rgb(133, 243, 74);
}

// pc
@media (min-width: 640px) {
  .item-layout {
    height: 130px;
    align-items: flex-end;
  }

  .info-box {
    flex: 1;
  }

  .info {
    justify-content: space-between;
    padding: 18px 0;
    margin-left: 5px;
  }

  .operation {
    padding: 18px 18px 18px 0;
    text-align: right;

    .mec {
      text-align: right;
      margin-bottom: 10px;
    }
  }
}

//
@media (max-width: 640px) {
  .item-layout {
    padding: 10px 15px;
    flex-direction: column;
  }

  .info-box {
    flex: 1;
  }

  .info {
    flex: 1;
    margin-left: 10px;
    justify-content: center;

    .item:first-child {
      margin-bottom: 10px;
    }
  }

  .image {
    height: 100px;
  }

  .operation {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .mec {
      text-align: left;
      flex: 1;
    }
  }
}
</style>
