<style src="./style.css"></style>
<template>
  <Dialog id="gem-apply-dialog" :top="100" :width="400">
    <div class="tal mgt-10">
      <div
        @click="
          dialog_tab_pos = 0;
          inputNum = '';
        "
        :class="dialog_tab_pos == 0 ? 'active' : ''"
        class="tab-menu"
      >
        {{ $t("Gemstone_27") }}
      </div>
      <div
        @click="
          dialog_tab_pos = 1;
          inputNum = '';
        "
        :class="dialog_tab_pos == 1 ? 'active' : ''"
        class="tab-menu"
      >
        {{ $t("Gemstone_28") }}
      </div>
    </div>
    <div class="ly-input-content por">
      <p class="small tal">
        {{ $t("Gemstone_04").replace("#0#", getMaxApplyTimes) }}
      </p>
      <div class="por mgt-5">
        <div class="ly-input-pre-icon">
          <img
            :src="require(`@/assets/icon/${$parent.getShowApplyType}_icon.png`)"
            alt=""
          />
        </div>
        <input
          class="ly-input dib"
          type="text"
          style="text-align: center; width: 70%; padding-left: 50px"
          v-int
          :data-max="getMaxApplyTimes"
          data-min="1"
          v-model="inputNum"
          :placeholder="$t('Gemstone_05')"
        />
        <div class="dib" style="width: 30%">
          <button
            @click="inputNum = dialog_tab_pos == 0 ? 1 : getMaxApplyTimes"
            class="btn-primary btn-small"
            style="width: 80%"
          >
            Max
          </button>
        </div>
      </div>
      <div class="mgt-10 aveage-box small">
        <p class="tal">{{ $t("Gemstone_06") }}: {{ getNowApplyNum }}</p>
        <p class="vertical-children tar">
          <span
            >{{ $t("Gemstone_07") }}:
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
        {{ $t("Gemstone_18") }}:
        <span v-for="item in getNowApplyNum" :key="dialog_tab_pos + '_' + item"
          ><small v-if="item > 1"> ,</small
          >{{ Number(getNowStartTicketNo) + item - 1 }}</span
        >
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
          <span>{{ $t("Gemstone_37") }}: {{ getStakeMbox }}</span
          >&nbsp;
          <img src="@/assets/coin/MBOX.png" alt="" height="20" />
        </p>
      </div>
      <template v-if="getCanUseTemMbox > 0">
        <div class="aveage-box ly-input-content mgt-10">
          <p class="vertical-children tal">
            <span>{{ $t("Gemstone_08") }}: {{ getCanUseTemMbox }}</span
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
              >{{ $t("Gemstone_10") }}</StatuButton
            >
            <button v-else class="btn-primary disable-btn btn-small">
              {{ $t("Gemstone_09") }}
            </button>
          </div>
        </div>
      </template>
    </div>

    <div class="mgt-50">
      <span v-if="$parent.getCountDown > 8640000">{{ $t("Gemstone_50") }}</span>
      <template v-else>
        <p v-if="!isStartApply">
          {{ $t("Gemstone_22") }}<span class="dotting"></span>
        </p>
        <p v-if="isHightAndIsMax && isStartApply">{{ $t("Gemstone_26") }}</p>
        <div class="tac" v-if="Number(inputNum) > 0 && isCanApply">
          <p v-if="getCanUseTemMbox > 0">
            {{
              $t("Gemstone_11").replace(
                "#0#",
                getCanUseTemMbox > getNeedPayMbox
                  ? getNeedPayMbox
                  : getCanUseTemMbox
              )
            }}
          </p>
          <p>
            {{
              $t("Gemstone_12").replace(
                "#0#",
                getCanUseTemMbox > getNeedPayMbox
                  ? 0
                  : numFloor(getNeedPayMbox - getCanUseTemMbox, 1e3)
              )
            }}
          </p>
        </div>
      </template>

      <div :class="{ 'btn-group': mboxAllownceToApply == 0 }">
        <StatuButton
          :isLoading="lockBtn.mboxApproveToApplyLock > 0"
          data-step="1"
          class="mgt-10"
          style="width: 70%"
          :onClick="approve"
          v-if="mboxAllownceToApply == 0"
          >{{ $t("Air-drop_16") }} MBOX</StatuButton
        >
        <StatuButton
          :isLoading="lockBtn.applyGemLock > 0"
          :isDisable="mboxAllownceToApply <= 0 || !isCanApply"
          data-step="2"
          class="mgt-10"
          style="width: 70%"
          :onClick="() => applyForGem(dialog_tab_pos == 0 ? 'normal' : 'high')"
        >
          <!-- <span v-if="gemApplyEndCountDown <=0">{{$t("Gemstone_50")}}</span> -->
          <template>
            <span v-if="dialog_tab_pos == 0">{{ $t("Gemstone_27") }}</span>
            <span v-else>{{ $t("Gemstone_28") }}</span>
          </template>
        </StatuButton>
      </div>
      <p class="small mgt-5 opa-6">
        {{ $t("Air-drop_11") }}: {{ Number(coinArr["MBOX"].balance) || 0 }}MBOX
      </p>
      <p class="small opa-6 mgt-10">{{ $t("Gemstone_13") }}</p>
    </div>
  </Dialog>
</template>
<script>
import { Dialog, StatuButton } from "@/components";
import { mapState } from "vuex";
import CommonMethod from "@/mixin/CommonMethod";
import { Wallet } from "@/utils";
import { WalletConfig, PancakeConfig } from "@/config";

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
      eth_myHashrate: (state) => state.ethState.data.myHashrate,
      mboxAllownceToApply: (state) => state.gemState.data.mboxAllownceToApply,
      gemApplyEndCountDown: (state) =>
        state.globalState.data.gemApplyEndCountDown,
      lockBtn: (state) => state.globalState.data.lockBtn,
      coinArr: (state) => state.bnbState.data.coinArr,
    }),
    getMaxApplyTimes() {
      if (this.dialog_tab_pos == 0) return 1;
      let maxAmount = 0;
      let hashRate_ = this.eth_myHashrate;

      if (hashRate_ < 100) {
        maxAmount = 0;
      } else if (hashRate_ < 750) {
        maxAmount = 1;
      } else if (hashRate_ < 1500) {
        maxAmount = 3;
      } else if (hashRate_ < 3000) {
        maxAmount = 5;
      } else if (hashRate_ < 6000) {
        maxAmount = 7;
      } else {
        maxAmount = 10;
      }
      return maxAmount;
    },
    //
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
      return ticketObj[0];
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
    //
    getCanUseTemMbox() {
      let totalApplyNum = this.getHighApplyNum + this.getNormalApplyNum;
      let balance =
        Number(this.myApplyInfo.frozenBalance) -
        Number(this.applyInfo.roundPrice) * totalApplyNum;
      return Number(this.numFloor(balance / 1e18, 1e4));
    },
    //
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
    //
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
      // if(this.gemApplyEndCountDown <= 0) isCanApply = false;

      //
      if (
        this.dialog_tab_pos == 1 &&
        Number(this.applyInfo.nowAmount) + Number(this.inputNum) >
          Number(this.applyInfo.maxAmount)
      )
        isCanApply = false;

      return isCanApply;
    },
    //
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
    //
    isStartApply() {
      return this.applyInfo.roundState == 0;
    },
  },
  async created() {
    await Wallet.ETH.getAccount();
    await this.getAllownce();

    this.unLockBtn("applyGemLock");
    this.unLockBtn("mboxApproveToApplyLock");
  },
  methods: {
    async getAllownce() {
      let res = await Wallet.ETH.viewErcAllowanceToTarget(
        PancakeConfig.SelectCoin.MBOX.addr,
        WalletConfig.ETH.momoGemApply
      );
      this.$store.commit("gemState/setData", {
        mboxAllownceToApply: Number(res),
      });
    },
    async approve() {
      let hash = await Wallet.ETH.approveErcToTargetOnRecipt(
        PancakeConfig.SelectCoin.MBOX.addr,
        WalletConfig.ETH.momoGemApply,
        () => {
          this.getAllownce();
        }
      );
      if (hash) {
        this.lockBtnMethod("mboxApproveToApplyLock");
      }
    },
    async applyForGem(type) {
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
      let hash = await Wallet.ETH.applyForGem(type, this.inputNum, () => {
        this.$parent.getUserApplyInfo();
        this.unLockBtn("applyGemLock");
        this.inputNum = "";
      });
      if (hash) {
        this.lockBtnMethod("applyGemLock");
      }
    },
    //
    async takeMbox() {
      let hash = await Wallet.ETH.takeMbox(() => {
        this.$parent.getUserApplyInfo();
      });
      if (hash) {
        this.lockBtnMethod("takeMboxLock");
      }
    },
  },
};
</script>
