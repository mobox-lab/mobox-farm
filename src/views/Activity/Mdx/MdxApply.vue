<template>
  <Dialog id="mdx-apply-dialog" :top="100" :width="400">
    <div class="ly-input-content por">
      <p class="small tal">
        {{ $t("Air-drop_238") }}: {{ $parent.getMaxApplyTimes }}
      </p>
      <div class="por mgt-5">
        <div class="ly-input-pre-icon">
          <img src="@/assets/box/mdxbox.png" alt="" />
        </div>
        <input
          class="ly-input dib"
          type="text"
          style="text-align: center; width: 70%; padding-left: 50px"
          v-int
          :data-max="$parent.getMaxApplyTimes"
          data-min="1"
          v-model="inputNum"
          :placeholder="$t('NewBOX_05')"
        />
        <div class="dib" style="width: 30%">
          <button
            @click="inputNum = $parent.getMaxApplyTimes"
            class="btn-primary btn-small"
            style="width: 80%"
          >
            Max
          </button>
        </div>
      </div>
      <div class="mgt-10 aveage-box small">
        <p class="tal">{{ $t("Air-drop_239") }}: {{ getNowApplyNum }}</p>
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

    <div class="mgt-50">
      <span v-if="Number(applyInfo.startTime) > nowTs"
        >{{ $t("Gemstone_57") }}: {{ getLeftTime(1631678400 - nowTs) }}</span
      >
      <template v-else>
        <p v-if="!isStartApply">
          {{ $t("NewBOX_21") }}<span class="dotting"></span>
        </p>
      </template>

      <div>
        <StatuButton
          :isLoading="lockBtn.applyMdxBoxLock > 0"
          :isDisable="!isCanApply"
          class="mgt-10"
          style="width: 70%"
          :onClick="applyForBox"
        >
          <span>{{ $t("NewBOX_14") }}</span>
        </StatuButton>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Dialog, StatuButton } from "@/components";
import { Wallet } from "@/utils";

export default {
  mixins: [CommonMethod],
  components: { Dialog, StatuButton },
  props: ["applyInfo", "myApplyInfo"],
  data() {
    return {
      inputNum: "",
    };
  },
  computed: {
    ...mapState({
      myTotalVeMbox: (state) => state.bnbState.data.myTotalVeMbox,
      lockBtn: (state) => state.globalState.data.lockBtn,
      nowTs: (state) => state.globalState.data.nowTs,
    }),
    getNowApplyNum() {
      return this.getHighApplyNum;
    },
    getNowStartTicketNo() {
      let ticketObj = this.myApplyInfo.userHighTicket;
      if (ticketObj[0] == ticketObj[1]) {
        return ticketObj[0];
      } else {
        return ticketObj[0] + "~" + ticketObj[1];
      }
    },
    getHighApplyNum() {
      let num = 0;
      let ticketObj = this.myApplyInfo.userHighTicket;
      num = ticketObj[1] - ticketObj[0] + 1;
      if (ticketObj[0] == 0) num = 0;
      return num;
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

      return isCanApply;
    },

    isStartApply() {
      return this.applyInfo.roundState == 0;
    },
  },
  async created() {
    await Wallet.ETH.getAccount();
    this.unLockBtn("applyMdxBoxLock");
  },
  methods: {
    async applyForBox() {
      if (Number(this.inputNum) <= 0) return;
      let hash = await Wallet.ETH.Group.MdxBox.hApplyForBox(
        this.inputNum,
        () => {
          this.$parent.getUserApplyInfo();
          this.$parent.getApplyInfo();
          this.unLockBtn("applyMdxBoxLock");
          this.inputNum = "";
        }
      );
      if (hash) {
        this.lockBtnMethod("applyMdxBoxLock");
      }
    },
  },
};
</script>
