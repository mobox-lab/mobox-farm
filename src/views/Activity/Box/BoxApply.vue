<template>
  <Dialog id="box-apply-dialog" :top="100" :width="400">
    <div class="tal mgt-10">
      <div
        @click="
          dialog_tab_pos = 0;
          inputNum = '';
        "
        :class="dialog_tab_pos == 0 ? 'active' : ''"
        class="tab-menu"
      >
        {{ $t("NewBOX_25") }}
      </div>
      <div
        @click="
          dialog_tab_pos = 1;
          inputNum = '';
        "
        :class="dialog_tab_pos == 1 ? 'active' : ''"
        class="tab-menu"
      >
        {{ $t("NewBOX_26") }}
      </div>
    </div>
    <div class="ly-input-content por">
      <p class="small tal">
        {{
          $t("NewBOX_04").replace(
            "#0#",
            dialog_tab_pos == 0 ? 1 : $parent.getMaxApplyTimes
          )
        }}
      </p>
      <div class="por mgt-5">
        <div class="ly-input-pre-icon">
          <img src="@/assets/icon/box_icon.png" alt="" />
        </div>
        <input
          class="ly-input dib"
          type="text"
          style="text-align: center; width: 70%; padding-left: 50px"
          v-int
          :data-max="dialog_tab_pos == 0 ? 1 : $parent.getMaxApplyTimes"
          data-min="1"
          v-model="inputNum"
          :placeholder="$t('NewBOX_05')"
        />
        <div class="dib" style="width: 30%">
          <button
            @click="
              inputNum = dialog_tab_pos == 0 ? 1 : $parent.getMaxApplyTimes
            "
            class="btn-primary btn-small"
            style="width: 80%"
          >
            Max
          </button>
        </div>
      </div>
      <div class="mgt-10 aveage-box small">
        <p class="tal">{{ $t("NewBOX_06") }}: {{ getNowApplyNum }}</p>
        <p class="vertical-children tar">
          <span
            >{{ $t("NewBOX_07") }}:
            {{ numFloor(applyInfo.roundPrice / 1e18, 1e4) }}</span
          >&nbsp;
          <img src="@/assets/coin/MBOX.png" alt="" height="20" />
        </p>
      </div>
    </div>

    <div
      class="tal ly-input-content"
      style="margin-top: 2px"
      v-if="getNowApplyNum > 0"
    >
      <p style="">
        {{ $t("NewBOX_17") }}:
        <!-- <span v-for="item in getNowApplyNum" :key="dialog_tab_pos+'_'+item"><small v-if="item > 1"> ,</small>{{Number(getNowStartTicketNo) + item - 1}}</span> -->
        <span>{{ getNowStartTicketNo }}</span>
      </p>
    </div>

    <div class="mgt-30">
      <div
        class="aveage-box ly-input-content"
        v-if="
          numFloor(myApplyInfo.frozenBalance / 1e18, 1e4) > 0 &&
          getHighApplyNum + getNormalApplyNum > 0
        "
      >
        <p class="vertical-children tal">
          <span>{{ $t("NewBOX_32") }}: {{ getStakeMbox }}</span
          >&nbsp;
          <img src="@/assets/coin/MBOX.png" alt="" height="20" />
        </p>
      </div>
      <template v-if="getCanUseTemMbox > 0">
        <div class="aveage-box ly-input-content mgt-10">
          <p class="vertical-children tal">
            <span>{{ $t("NewBOX_08") }}: {{ getCanUseTemMbox }}</span
            >&nbsp;
            <img src="@/assets/coin/MBOX.png" alt="" height="20" />
          </p>
          <div class="tar">
            <StatuButton
              style="width: 50%"
              :onClick="takeMbox"
              :isLoading="lockBtn.takeMboxLock > 0"
              v-if="getHighApplyNum + getNormalApplyNum == 0"
              class="btn-small"
              :isDisable="Number(myApplyInfo.frozenBalance) <= 0"
              >{{ $t("NewBOX_10") }}</StatuButton
            >
            <button v-else class="btn-primary disable-btn btn-small">
              {{ $t("NewBOX_09") }}
            </button>
          </div>
        </div>
      </template>
    </div>

    <div class="mgt-50">
      <p v-if="!isStartApply">
        {{ $t("NewBOX_21") }}<span class="dotting"></span>
      </p>
      <p v-if="isHightAndIsMax && isStartApply">{{ $t("NewBOX_24") }}</p>
      <div class="tac" v-if="Number(inputNum) > 0 && isCanApply">
        <p v-if="getCanUseTemMbox > 0">
          {{
            $t("NewBOX_11").replace(
              "#0#",
              getCanUseTemMbox > getNeedPayMbox
                ? numFloor(getNeedPayMbox, 1e4)
                : numFloor(getCanUseTemMbox, 1e4)
            )
          }}
        </p>
        <p>
          {{
            $t("NewBOX_12").replace(
              "#0#",
              getCanUseTemMbox > getNeedPayMbox
                ? 0
                : numFloor(getNeedPayMbox - getCanUseTemMbox, 1e3)
            )
          }}
        </p>
      </div>
      <div :class="{ 'btn-group': needApprove }">
        <StatuButton
          :isLoading="lockBtn.mboxApproveToApplyLock > 0"
          data-step="1"
          class="mgt-10"
          style="width: 70%"
          :onClick="approve"
          v-if="needApprove"
          >{{ $t("Air-drop_16") }} MBOX</StatuButton
        >
        <StatuButton
          :isLoading="lockBtn.applyBoxLock > 0"
          :isDisable="needApprove || !isCanApply"
          data-step="2"
          class="mgt-10"
          style="width: 70%"
          :onClick="() => applyForBox(dialog_tab_pos == 0 ? 'normal' : 'high')"
        >
          <template>
            <span v-if="dialog_tab_pos == 0">{{ $t("NewBOX_25") }}</span>
            <span v-else>{{ $t("NewBOX_26") }}</span>
          </template>
        </StatuButton>
      </div>
      <p class="small mgt-5">
        {{ $t("Air-drop_11") }}: {{ Number(coinArr["MBOX"].balance) || 0 }}MBOX
      </p>
      <p class="small opa-6 mgt-10">{{ $t("NewBOX_13") }}</p>
    </div>

    <!-- 中签率 -->
    <div class="visiable-xs">
      <div class="ly-input-content mgt-20" v-if="dialog_tab_pos == 0">
        <div class="aveage-box">
          <p class="opa-6 tal">{{ $t("NewBOX_30") }}</p>
          <h3 class="tar">{{ applyInfo.nowNormalAmount }}</h3>
        </div>
        <div class="aveage-box mgt-10">
          <p class="opa-6 tal">{{ $t("NewBOX_23") }}</p>
          <h3 class="tar">
            {{
              numFloor(
                (applyInfo.maxNormalLuckyAmount /
                  (Number(applyInfo.nowNormalAmount) >=
                  Number(applyInfo.maxNormalLuckyAmount)
                    ? applyInfo.nowNormalAmount
                    : applyInfo.maxNormalLuckyAmount)) *
                  100,
                1e3
              ) || "-"
            }}%
          </h3>
        </div>
      </div>
      <div class="ly-input-content mgt-20" v-else>
        <div class="aveage-box">
          <p class="opa-6 tal">{{ $t("NewBOX_31") }}</p>
          <h3 class="tar">
            {{ applyInfo.nowAmount }}/{{ applyInfo.maxLuckyAmount }}
          </h3>
        </div>
        <div class="aveage-box mgt-10">
          <p class="opa-6 tal">{{ $t("NewBOX_23") }}</p>
          <h3 class="tar">
            {{
              numFloor(
                (applyInfo.maxLuckyAmount /
                  (Number(applyInfo.nowAmount) >=
                  Number(applyInfo.maxLuckyAmount)
                    ? applyInfo.nowAmount
                    : applyInfo.maxLuckyAmount)) *
                  100,
                1e3
              ) || "-"
            }}%
          </h3>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Dialog, StatuButton } from "@/components";
import { WalletConfig, PancakeConfig } from "@/config";
import { Wallet } from "@/utils";

export default {
  mixins: [CommonMethod],
  components: { Dialog, StatuButton },
  props: ["applyInfo", "myApplyInfo"],
  data() {
    return {
      inputNum: "",
      dialog_tab_pos: 0,
    };
  },
  computed: {
    ...mapState({
      myTotalVeMbox: (state) => state.bnbState.data.myTotalVeMbox,
      mboxAllownceToBoxApply: (state) =>
        state.globalState.data.mboxAllownceToBoxApply,
      lockBtn: (state) => state.globalState.data.lockBtn,
      coinArr: (state) => state.bnbState.data.coinArr,
    }),
    getNowApplyNum() {
      let num =
        this.dialog_tab_pos == 0
          ? this.getNormalApplyNum
          : this.getHighApplyNum;
      return num;
    },
    getNowStartTicketNo() {
      let ticketObj =
        this.dialog_tab_pos == 0
          ? this.myApplyInfo.userNormalTicket
          : this.myApplyInfo.userHighTicket;
      if (ticketObj[0] == ticketObj[1]) {
        return ticketObj[0];
      } else {
        return ticketObj[0] + "~" + ticketObj[1];
      }
    },
    getNormalApplyNum() {
      let num = 0;
      let ticketObj = this.myApplyInfo.userNormalTicket;
      num = ticketObj[1] - ticketObj[0] + 1;
      if (ticketObj[0] == 0) num = 0;
      return num;
    },
    getHighApplyNum() {
      let num = 0;
      let ticketObj = this.myApplyInfo.userHighTicket;
      num = ticketObj[1] - ticketObj[0] + 1;
      if (ticketObj[0] == 0) num = 0;
      return num;
    },
    getCanUseTemMbox() {
      let totalApplyNum = this.getHighApplyNum + this.getNormalApplyNum;
      let balance =
        Number(this.myApplyInfo.frozenBalance) -
        Number(this.applyInfo.roundPrice) * totalApplyNum;
      return Number(this.numFloor(balance / 1e18, 1e4));
    },
    getStakeMbox() {
      let totalApplyNum = this.getHighApplyNum + this.getNormalApplyNum;
      return this.numFloor(
        (Number(this.applyInfo.roundPrice) * totalApplyNum) / 1e18,
        1e4
      );
    },
    getNeedPayMbox() {
      return Number(
        this.numFloor(this.applyInfo.roundPrice / 1e18, 1e4) *
          Number(this.inputNum)
      );
    },
    needApprove() {
      return (
        Number(this.mboxAllownceToBoxApply) / 1e18 < this.getNeedPayMbox &&
        this.mboxAllownceToBoxApply != -1
      );
    },
    isCanApply() {
      let isCanApply = true;
      //
      if (this.getNowApplyNum > 0) isCanApply = false;
      //
      if (this.getMaxApplyTimes < Number(this.inputNum)) isCanApply = false;
      //
      if (!this.isStartApply) isCanApply = false;
      //
      if (Number(this.inputNum) <= 0) isCanApply = false;
      //
      // if(this.getNeedPayMbox > Number(this.coinArr["MBOX"].balance) + this.getCanUseTemMbox) isCanApply = false;

      //

      //
      if (
        this.dialog_tab_pos == 1 &&
        Number(this.applyInfo.nowAmount) + Number(this.inputNum) >
          Number(this.applyInfo.maxAmount)
      )
        isCanApply = false;

      return isCanApply;
    },
    isHightAndIsMax() {
      let status = true;
      if (this.dialog_tab_pos != 1) status = false;
      if (
        Number(this.applyInfo.nowAmount) + Number(this.inputNum) <=
        Number(this.applyInfo.maxAmount)
      )
        status = false;
      return status;
    },
    isStartApply() {
      return this.applyInfo.roundState == 0;
    },
  },
  async created() {
    await Wallet.ETH.getAccount();
    await this.getAllownce();

    this.unLockBtn("applyBoxLock");
    this.unLockBtn("mboxApproveToApplyLock");
  },
  methods: {
    async getAllownce() {
      let res = await Wallet.ETH.viewErcAllowanceToTarget(
        PancakeConfig.SelectCoin.MBOX.addr,
        WalletConfig.ETH.boxApply
      );
      this.$store.commit("globalState/setData", {
        mboxAllownceToBoxApply: Number(res),
      });
    },
    async approve() {
      let hash = await Wallet.ETH.approveErcToTargetOnRecipt(
        PancakeConfig.SelectCoin.MBOX.addr,
        WalletConfig.ETH.boxApply,
        () => {
          this.getAllownce();
        }
      );
      if (hash) {
        this.lockBtnMethod("mboxApproveToApplyLock");
      }
    },
    async applyForBox(type) {
      if (
        this.getNeedPayMbox >
        Number(this.coinArr["MBOX"].balance) + this.getCanUseTemMbox
      ) {
        this.getConfirmDialog().show(this.$t("Common_30"), () =>
          this.showSwapBox()
        );
        return;
      }
      if (Number(this.inputNum) <= 0) return;
      let hash = await Wallet.ETH.applyForBox(type, this.inputNum, () => {
        this.$parent.getUserApplyInfo();
        this.$parent.getApplyInfo();
        this.unLockBtn("applyBoxLock");
        this.inputNum = "";
      });
      if (hash) {
        this.lockBtnMethod("applyBoxLock");
      }
    },
    //
    async takeMbox() {
      let hash = await Wallet.ETH.takeMbox_box(() => {
        this.$parent.getUserApplyInfo();
      });
      if (hash) {
        this.lockBtnMethod("takeMboxLock");
      }
    },
  },
};
</script>
