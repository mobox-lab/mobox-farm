<template>
  <Dialog id="batch-enhancement" :top="100" :width="600">
    <div class="batch-enhancement">
      <h4 class="title">{{ $t("MOMO_101") }}</h4>
      <div class="head">
        <p>{{ $t("Market_15") }}</p>
        <div class="delete" @click="clearBatchEnhancement">
          <span>{{ $t("Market_16") }}</span>
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
      </div>
      <!-- 列表 -->
      <div class="list">
        <ul>
          <BatchEnhancementItem
            v-for="item in batchEnhancement"
            :key="item.tokenId"
            :item="item"
            @remove="removeBatchEnhancement(item)"
            @change="(value) => upgradeQuantityChange(item.tokenId, value)"
          />
        </ul>
      </div>
      <!-- 底部确认信息 -->
      <div class="footer">
        <div class="info-box">
          <div class="icon">
            <span v-if="batchEnhancement.length" class="shop-car-num">{{
              batchEnhancement.length
            }}</span>
            <img src="@/assets/icon/batch-icon.png" alt="" height="40" />
          </div>
          <div class="info">
            <div class="label">{{ $t("MOMO_102") }}</div>
            <div class="mec">
              <img src="@/assets/coin/MEC.png" />
              <span>{{ totalNeedCrystal }}</span>
              <span class="name">MEC</span>
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div
          :class="[
            'btn-primary',
            batchEnhancement.length ? null : 'disable-btn',
          ]"
          @click="submitBatchEnhancement"
        >
          {{ $t("MOMO_101") }}
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { mapState } from "vuex";
import { Dialog } from "@/components";
import BatchEnhancementItem from "./BatchEnhancementItem.vue";
import { CommonMethod } from "@/mixin";
import momoPurificationCompute from "@/utils/momoPurificationCompute";
import { ConstantConfig } from "@/config";
import { Wallet } from "@/utils";

export default {
  mixins: [CommonMethod],
  components: {
    Dialog,
    BatchEnhancementItem,
  },
  data() {
    return {
      upgradeInfo: {},
    };
  },
  computed: {
    ...mapState({
      crystalNum: (state) => state.userState.data.crystalNum,
      batchEnhancement: (state) => state.globalState.batchEnhancement,
      momoSetting: (state) => state.globalState.data.momoSetting,
    }),
    //
    totalNeedCrystal() {
      return this.batchEnhancement.reduce((data, item) => {
        return data + this.getNeedCrystal(item);
      }, 0);
    },
  },
  methods: {
    //
    clearBatchEnhancement() {
      this.$store.commit("globalState/clearBatchEnhancement");
      this.upgradeInfo = {};
    },
    //
    removeBatchEnhancement(item) {
      delete this.upgradeInfo[item.tokenId];
      this.$store.commit("globalState/removeBatchEnhancement", item);
    },
    //
    upgradeQuantityChange(id, value) {
      this.$set(this.upgradeInfo, id, value);
    },
    //
    getNeedCrystal({ hashrate, vType, tokenId }) {
      const compute = momoPurificationCompute[`v${vType}`];
      return compute(hashrate, this.upgradeInfo[tokenId] ?? 1);
    },
    //
    async submitBatchEnhancement() {
      if (!this.batchEnhancement.length) {
        return;
      }

      //
      if (+this.crystalNum < this.totalNeedCrystal) {
        this.showNotify(this.$t("MECBOX_46"), "error");
        return;
      }

      const tokenIds = [];
      const hrUps = [];
      const crystals = [];

      this.batchEnhancement.forEach((item) => {
        tokenIds.push(item.tokenId);
        hrUps.push(this.upgradeInfo[item.tokenId] ?? 1);
        crystals.push(this.getNeedCrystal(item));
      });

      const isMomoverse =
        this.batchEnhancement[0].location == ConstantConfig.NFT_LOCATION.VERSE;

      await Wallet.ETH.Group.Enhancer.batchEnhance(
        tokenIds,
        hrUps,
        crystals,
        isMomoverse
      );

      //
      this.clearBatchEnhancement();
      //
      this.oprDialog("batch-enhancement", "none");
    },
  },
};
</script>

<style lang="less" scoped>
#batch-enhancement {
  padding: 20px;
}

.batch-enhancement {
  background: #1c222c;
  border-radius: 16px;
}

.title {
  font-size: 18px;
}

.head {
  display: flex;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 12px;
  margin-bottom: 8px;

  p {
    flex: 1;
    text-align: left;
  }

  .delete {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    span {
      margin-right: 2px;
    }

    svg {
      width: 20px;
      height: 20px;
    }

    span,
    svg {
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.list {
  width: 100%;
  background: #13181f;
  border-radius: 16px;
  box-shadow: 2px 2px 2px 0px rgba(26, 32, 38, 0.4) inset,
    0px 0px 4px 0px rgb(46, 68, 87) inset;

  ul {
    list-style: none;
    min-height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  .info-box {
    display: flex;
    align-items: center;
    text-align: left;
  }

  .icon {
    position: relative;
    width: 44px;
    height: 44px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    margin-left: 15px;

    .label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }

    .mec {
      img,
      span {
        vertical-align: middle;
      }

      img {
        height: 25px;
      }

      span {
        margin-left: 6px;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }

  .button {
    border-radius: 11px;
    cursor: pointer;
    font-size: 12px;
    min-width: 100px;
    text-align: center;
    height: 35px;
    background: #1751f6;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 0.7;
    }
  }
}

// pc
@media (min-width: 640px) {
  .batch-enhancement {
    padding: 20px;
  }

  .list {
    padding: 13px 17px;

    ul {
      max-height: 600px;
    }
  }
}

//
@media (max-width: 640px) {
  .batch-enhancement {
    padding: 10px;
  }

  .list {
    padding: 10px;

    ul {
      max-height: 400px;
    }
  }
}
</style>
