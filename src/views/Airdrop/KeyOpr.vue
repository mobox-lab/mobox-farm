<template>
  <Dialog id="keyopr-dialog" :top="100" :width="400">
    <div class="tal">
      <div class="tab-menu active">{{ $t("Air-drop_108") }}</div>
    </div>
    <div class="ly-input-content">
      <div class="por mgt-10">
        <div class="ly-input-pre-icon">
          <img src="../../assets/coin/MBOX.png" alt="" />
        </div>
        <input
          class="ly-input dib"
          type="text"
          style="text-align: center; width: 70%; padding-left: 50px"
          v-model="getSelectAllKey"
          readonly
        />
        <div class="dib" style="width: 30%">
          <button
            class="btn-primary btn-small"
            style="width: 80%"
            @click="selectAll"
          >
            All
          </button>
        </div>
      </div>

      <div class="mgt-20 small">
        <div>
          <div
            class="aveage-box select-key-item"
            v-if="Number(rewardStoreKey) > 0"
          >
            <div class="tal vertical-children">
              <div class="ly-checkbox active" style="background: none">
                <svg viewBox="0 0 1024 1024" width="20" height="20">
                  <path
                    fill="#92FFDA"
                    d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z"
                  ></path>
                </svg>
              </div>
              &nbsp;
              <span class="mgl-10">{{ rewardStoreKey }} MBOX</span>
            </div>
            <div class="tar vertical-children">
              <span class="cur-point por" v-popMsg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E9DB8F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span class="popMsg left">{{ $t("Air-drop_93") }}</span>
              </span>
              <span class="mgl-5">{{ $t("Air-drop_92") }}</span>
            </div>
          </div>
        </div>
        <div v-for="item in getPledgeList" :key="item.coinName + item.addr">
          <div
            class="aveage-box select-key-item"
            v-if="
              item.earnedKey > 0 &&
              (onlyCheck == '' || item.coinKey == onlyCheck)
            "
          >
            <div class="tal vertical-children">
              <div
                class="ly-checkbox"
                @click="toggleSelect(item)"
                :class="
                  selectKeyCoin.indexOf(item.coinKey) != -1 ? 'active' : ''
                "
              >
                <svg
                  class="hide"
                  viewBox="0 0 1024 1024"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#92FFDA"
                    d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z"
                  ></path>
                </svg>
              </div>
              &nbsp;
              <span class="mgl-10">{{ item.earnedKey }} MBOX</span>
            </div>
            <div class="tar">
              {{ item.coinName }} {{ item.isLP ? "LP" : "POOL" }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <p class="small opa-6 tal mgt-10" v-html="$t('Air-drop_14')" ></p> -->

    <!-- <StatuButton class="mgt-20" :onClick="exchangeToBox" :isLoading="lockBtn.getKeyLock > 0" :isDisable="!isCanExchangeToBox || lockBtn.getKeyLock > 0" style="width: 70%;">
			{{ $t("Air-drop_15").replace("#0#", parseInt(getSelectAllKey)) }}
		</StatuButton> -->
    <StatuButton
      class="mgt-30"
      :onClick="getRewardKey"
      :isLoading="lockBtn.getKeyLock > 0"
      :isDisable="getSelectAllKey <= 0 || lockBtn.getKeyLock > 0"
      style="width: 70%"
    >
      {{ $t("Air-drop_109") }}
    </StatuButton>
  </Dialog>
</template>
<script>
import { Dialog, StatuButton } from "@/components";
import { CommonMethod } from "@/mixin";
import { Wallet, Common } from "@/utils";
import { PancakeConfig } from "@/config";
import { mapState } from "vuex";

export default {
  mixins: [CommonMethod],
  components: { Dialog, StatuButton },
  data() {
    return {
      selectKeyCoin: [],
      onlyCheck: "",
    };
  },

  watch: {
    pledgeType: function (newData, oldData) {
      if (newData != oldData) {
        this.selectKeyCoin = [];
        this.onlyCheck = "";
      }
    },
  },

  computed: {
    ...mapState({
      lockBtn: (state) => state.globalState.data.lockBtn,
      canOpenBox: (state) => state.ethState.data.canOpenBox,
      rewardStoreKey: (state) => state.bnbState.data.rewardStoreKey,
      pledgeType: (state) => state.bnbState.data.pledgeType,
    }),

    getPledgeList() {
      return this.$parent.getPledgeList;
    },
    getPledgeDic() {
      let obj = {};
      this.getPledgeList.map((item) => {
        obj[item.coinKey] = item;
      });
      return obj;
    },
    getSelectAllKey() {
      let allKey = 0;
      let pledgeDic = this.getPledgeDic;
      this.selectKeyCoin.map((item) => {
        allKey += pledgeDic[item].earnedKey;
      });
      allKey += this.rewardStoreKey;
      return this.numFloor(allKey, 1e4);
    },
    isCanExchangeToBox() {
      return this.getSelectAllKey >= 1;
    },
  },

  methods: {
    show() {
      this.oprDialog("keyopr-dialog", "block");
      return this;
    },
    showAll() {
      let selectArr = [];
      this.getPledgeList.map((item) => {
        if (item.earnedKey > 0) {
          selectArr.push(item.coinKey);
        }
      });
      this.selectKeyCoin = selectArr;
      this.onlyCheck = "";
      this.oprDialog("keyopr-dialog", "block");
      return this;
    },
    close() {
      this.oprDialog("keyopr-dialog", "none");
      return this;
    },
    setCheckCoin(coinKey) {
      this.selectKeyCoin = [coinKey];
      this.onlyCheck = coinKey;
      return this;
    },
    toggleSelect(item) {
      let selectPos = this.selectKeyCoin.indexOf(item.coinKey);
      if (selectPos != -1) {
        //
        if (this.selectKeyCoin.length == 1) return;
        this.selectKeyCoin.splice(selectPos, 1);
      } else {
        this.selectKeyCoin.push(item.coinKey);
      }
    },
    selectAll() {
      let allArr = [...this.selectKeyCoin];
      this.getPledgeList.map((item) => {
        if (item.earnedKey > 0 && allArr.indexOf(item.coinKey) == -1) {
          allArr.push(item.coinKey);
        }
      });
      this.selectKeyCoin = allArr;
    },
    async exchangeToBox() {
      //
      if (this.canOpenBox > 0) {
        this.showNotify(this.$t("BOX_29"), "error");
        return;
      }

      let pIndexArr = [];
      this.selectKeyCoin.map((coinKey) => {
        pIndexArr.push(PancakeConfig.StakeLP[coinKey].pIndex);
      });

      let hash = await Wallet.ETH.getChestBox(
        pIndexArr,
        parseInt(this.getSelectAllKey)
      );
      if (hash) {
        //
        Common.app.lockBtnMethod("getKeyLock");
      }
    },
    //
    async getRewardKey() {
      console.log(this.selectKeyCoin, Wallet);
      let pIndexArr = [];
      this.selectKeyCoin.map((coinKey) => {
        pIndexArr.push(PancakeConfig.StakeLP[coinKey].pIndex);
      });

      let hash = await Wallet.ETH.getRewardKey(pIndexArr);
      if (hash) {
        //
        Common.app.lockBtnMethod("getKeyLock");
      }
    },
  },
};
</script>

<style scoped>
.select-key-item {
  height: 30px;
}
</style>
