<template>
  <div class="tac center-box">
    <div class="clear mgt-10">
      <section class="col-md-7" style="padding: 10px">
        <div class="adv-panel por box-section" style="padding-bottom: 45px">
          <div class="hide-xs">
            <p class="opa-6 mgt-20">{{ $t("MECBOX_40") }}</p>
            <h1 class="dib mgt-10" style="font-size: 20px">
              {{ totalOpen }}
            </h1>
          </div>
          <div class="por box" style="margin: 51px auto">
            <img
              src="@/assets/icon/box_rate.png"
              alt=""
              id="show-rate"
              @click="oprDialog('show-mec-rate-dialog', 'block')"
            />
            <div class="box-show">
              <img
                src="@/assets/box/mecbox_a.png"
                alt=""
                height="200"
                class="box-img"
              />
            </div>
          </div>

          <div
            style="
              padding: 8px 0px;
              position: absolute;
              bottom: 0px;
              width: 100%;
              left: 0px;
              background: #1f232a;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
            "
            class="tal rate-show hide-xs"
          >
            <div class="col-md-1"></div>
            <div
              class="col-md-2 col-xs-4 vertical-children mgt-5"
              v-for="item in rateObj"
              :key="item.lv"
            >
              <div
                style="
                  height: 20px;
                  width: 20px;
                  border-radius: 20px;
                  padding: 2px;
                "
                class="dib dot-bg"
              >
                <div
                  style="
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    border: 2px solid #1b1c21;
                  "
                  :class="`bg-new${item.lv}`"
                ></div>
              </div>
              <div class="dib mgl-5" style="line-height: 15px">
                <p>{{ item.rate }}</p>
                <p class="small vertical-children">
                  <span>{{ item.lang }}</span>
                  <img
                    class="mgl-5"
                    src="@/assets/coin/CRYSTAL.png"
                    alt=""
                    height="20"
                  />
                </p>
              </div>
            </div>
            <div class="col-md-1"></div>
          </div>
        </div>
      </section>

      <section class="col-md-5" style="padding: 10px">
        <div>
          <div>
            <div
              class="ly-input-content dib"
              style="width: 100%; padding: 30px 20px"
            >
              <p class="tal">{{ $t("BOX_35") }}</p>
              <div class="por mgt-10">
                <div class="ly-input-pre-icon">
                  <img src="@/assets/box/mecbox.png" alt="" height="20" />
                </div>
                <input
                  class="ly-input"
                  type="text"
                  style="text-align: left; width: 100%; padding-left: 65px"
                  readonly="readonly"
                  :value="mecBoxNum"
                />
              </div>
              <p class="small opa-6 mgt-10 tal">{{ $t("BOX_39") }}</p>
              <div class="aveage-box">
                <div class="tal">
                  <button
                    class="btn-primary mgt-20"
                    style="width: 90%"
                    @click="
                      setAction(23001);
                      oprDialog('unlock-mec-box-dialog', 'block');
                      unlockBoxNum = parseInt(mecBoxNum) || 0;
                    "
                  >
                    {{ $t("BOX_36") }}
                  </button>
                </div>

                <div class="tar">
                  <router-link to="/market?tab=3">
                    <button
                      class="mgt-20 btn-line"
                      style="width: 90%"
                      @click="setAction(23002)"
                    >
                      {{ $t("BOX_37") }}
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="mgt-20">
            <div
              class="ly-input-content dib"
              style="width: 100%; padding: 30px 20px"
            >
              <p class="tal">{{ $t("BOX_38") }}</p>
              <div class="por mgt-10">
                <div class="ly-input-pre-icon">
                  <img src="@/assets/box/mecbox_a.png" alt="" height="20" />
                </div>
                <input
                  class="ly-input"
                  type="text"
                  style="text-align: left; width: 100%; padding-left: 65px"
                  :value="canOpenBox"
                  readonly="readonly"
                />
              </div>
              <p class="small opa-6 mgt-10 tal" style="opacity: 0">aa</p>
              <div class="aveage-box">
                <div class="tal">
                  <StatuButton
                    class="mgt-20"
                    style="width: 90%"
                    :isDisable="lockBtn.openBoxLock > 0"
                    :isLoading="lockBtn.openBoxLock > 0"
                    :onClick="showOpenBox.bind(this)"
                  >
                    {{ $t("MECBOX_39") }}
                  </StatuButton>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 记录 -->
    <div class="col-md-12" style="padding: 10px">
      <section
        class="mgt-10"
        style="padding: 10px 15px; background: #13181f; border-radius: 20px"
      >
        <table class="small new-table" border="0" frame="void" rules="none">
          <tr>
            <th width="30%" class="tal">{{ $t("BOX_12") }}</th>
            <th width="20%" class="tal">{{ $t("BOX_26") }}</th>
            <th width="10%">{{ $t("BOX_13") }}</th>
            <th width="20%">{{ $t("BOX_27") }}</th>
            <th width="40%" class="tar">TX</th>
          </tr>
          <tr v-for="item in getOpenBoxHistory" :key="item.tx + item.event">
            <td class="tal tac-xs">
              <p>{{ dateFtt("yyyy-MM-dd", new Date(item.crtime * 1000)) }}</p>
              <p>{{ dateFtt("hh:mm:ss", new Date(item.crtime * 1000)) }}</p>
            </td>
            <td class="tal">{{ $t(eventToLang[item.event]) }}</td>
            <td>x{{ item.amount }}</td>
            <td class="vertical-children">
              <span>{{ $t("Common_09") }}</span>
            </td>
            <td class="tar">
              <img
                v-if="item.event == 'MintBox'"
                @click="showHistoryDialog(item)"
                height="25"
                src="@/assets/icon/view.png"
                alt=""
                class="cur-point"
              />&nbsp;
              <a :href="getTxUrl(item.tx)" target="_blank">
                <img
                  src="@/assets/icon/viewTx.png"
                  alt=""
                  class="cur-point"
                  height="25"
                />
              </a>
            </td>
          </tr>
        </table>
        <div class="no-show" v-if="getOpenBoxHistory.length == 0">
          <img src="@/assets/no_items.png" alt="" />
          <p class="opa-6 mgt-10">No items to display</p>
        </div>
      </section>
    </div>

    <Dialog id="unlock-mec-box-dialog" :top="200" :width="400">
      <h2 class="mgt-10">{{ $t("BOX_36") }}</h2>
      <div class="ly-input-content mgt-20">
        <p class="small tal opa-6">{{ $t("BOX_35") }}</p>
        <div class="por mgt-5">
          <div class="ly-input-pre-icon">
            <img src="@/assets/box/mecbox.png" alt="" />
          </div>
          <input
            class="ly-input dib"
            type="text"
            style="text-align: center; width: 70%; padding-left: 50px"
            v-int
            :data-max="parseInt(mecBoxNum) || 0"
            v-model="unlockBoxNum"
          />
          <div class="dib" style="width: 30%">
            <button
              @click="unlockBoxNum = parseInt(mecBoxNum) || 0"
              class="btn-primary btn-small"
              style="width: 80%"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      <div class="vertical-children tal mgt-10">
        <span class="small opa-6">
          {{ $t("BOX_07") }}: {{ unlockBoxNum }}
        </span>
        <img src="@/assets/box/mecbox.png" height="20" alt="" />
      </div>
      <div class="mgt-20 tal">
        <p class="small opa-6" v-html="$t('BOX_08')"></p>
      </div>

      <div :class="approveToMinter == false ? 'btn-group' : ''" class="mgt-20">
        <StatuButton
          :onClick="approve.bind(this)"
          data-step="1"
          style="width: 80%"
          v-if="approveToMinter == false"
          :isLoading="lockBtn.approveLock > 0"
          :isDisable="lockBtn.approveLock > 0"
        >
          {{ $t("Air-drop_16") }} MEC BOX
        </StatuButton>
        <StatuButton
          :onClick="addBox.bind(this, unlockBoxNum)"
          data-step="2"
          :isDisable="approveToMinter == false"
          class="mgt-10 por"
          style="width: 80%; margin-bottom: 20px"
        >
          {{ $t("BOX_41") }}
        </StatuButton>
      </div>
    </Dialog>
    <Dialog id="open-mec-box-dialog" :top="200" :width="400">
      <h2 class="mgt-10">{{ $t("MECBOX_39") }}</h2>
      <div class="ly-input-content mgt-20">
        <p class="small tal opa-6">{{ $t("BOX_42") }}:</p>
        <div class="por mgt-5">
          <div class="ly-input-pre-icon">
            <img src="@/assets/box/mecbox_a.png" alt="" />
          </div>
          <input
            class="ly-input dib"
            type="text"
            style="text-align: center; width: 70%; padding-left: 50px"
            v-int
            :data-max="maxOpenOne"
            v-model="openBoxNum"
          />
          <div class="dib" style="width: 30%">
            <button
              @click="
                openBoxNum =
                  canOpenBox > maxOpenOne ? maxOpenOne : canOpenBox || 0
              "
              class="btn-primary btn-small"
              style="width: 80%"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      <StatuButton
        :isDisable="!canSubmitOpen"
        :isLoading="lockBtn.openMecBoxLock > 0"
        :onClick="mecBoxmint.bind(this, openBoxNum, true)"
        class="mgt-30"
        style="width: 70%"
      >
        {{ $t("MECBOX_39") }}
      </StatuButton>
    </Dialog>
    <Dialog id="show-mec-rate-dialog" :top="200" :width="400">
      <div style="padding: 15px">
        <div class="pie dib por">
          <div class="pie-mask">
            <img src="@/assets/box/mecbox_a.png" alt="" width="50%" />
          </div>
        </div>
        <div class="ovh mgt-20" style="padding-left: 35px">
          <div
            class="col-md-2 col-xs-4 vertical-children mgt-5 tal"
            v-for="item in rateObj"
            :key="item.lv"
          >
            <!-- <div class="dib mgl-5" style="line-height:15px;">
							<h2 class="bold2">{{item.rate}}</h2>
							<p :class="`bg-new${item.lv}`" style="width:40px;height:2px;margin-top:3px"></p>
							<p class="small opa-6 mgt-5">{{$t(item.lang)}}</p>
						</div> -->
            <div class="dib mgl-5" style="line-height: 15px">
              <h2 class="bold2">{{ item.rate }}</h2>
              <p
                :class="`bg-new${item.lv}`"
                style="width: 40px; height: 2px; margin-top: 3px"
              ></p>
              <p class="small vertical-children opa-6 mgt-5">
                <span>{{ item.lang }}</span>
                <img
                  class="mgl-5"
                  src="@/assets/coin/CRYSTAL.png"
                  alt=""
                  height="20"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog, StatuButton } from "@/components";
import CommonMethod from "@/mixin/CommonMethod";
import { WalletConfig } from "@/config";
import { Wallet, Http, Common } from "@/utils";

let timer = null;
export default {
  mixins: [CommonMethod],
  components: { Dialog, StatuButton },
  data() {
    return {
      openBoxNum: "",
      unlockBoxNum: "",
      eventToLang: {
        HashBox: "BOX_24",
        AddBox: "BOX_23",
        MintBox: "BOX_25",
      },
      maxOpenOne: 50,
      approveToMinter: "-",
      getOpenBoxHistory: [],
      rateObj: [
        { lv: 1, rate: "47%", lang: "2-10" },
        { lv: 2, rate: "32%", lang: "11-20" },
        { lv: 3, rate: "16%", lang: "21-50" },
        { lv: 4, rate: "4%", lang: "100-200" },
        { lv: 5, rate: "1%", lang: "500-999" },
      ],
      orderObj: {
        blockHash: 0,
        boxAmount: 0,
      },
      needGetHash: false,
      totalOpen: 0,
    };
  },
  computed: {
    ...mapState({
      ethState: (state) => state.ethState.data,
      lockBtn: (state) => state.globalState.data.lockBtn,
      mecBoxNum: (state) => state.userState.data.mecBoxNum,
      hasLoadSpine: (state) => state.globalState.data.hasLoadSpine,
      nowTs: (state) => state.globalState.data.nowTs,
    }),
    canOpenBox() {
      let num = 0;
      if (
        Number(this.orderObj.blockHash) > 1 &&
        Number(this.orderObj.boxAmount) > 0
      ) {
        num = Number(this.orderObj.boxAmount);
      }
      return num;
    },
    canSubmitOpen() {
      return (
        Number(this.openBoxNum) <= Number(this.canOpenBox) &&
        Number(this.openBoxNum) > 0
      );
    },
  },
  watch: {
    nowTs: async function (ts) {
      if (ts % 5 == 0 && this.needGetHash) {
        this.getMecBoxOrder();
      }
      if (ts % 10 == 0) {
        await this.getMecBoxHistory();
        await this.getTotalOpenMecBox();
      }
    },
  },
  async created() {
    await Wallet.ETH.getAccount();
    await this.isApprove();
    await this.getMecBoxOrder();
    await this.getMecBoxHistory();
    await this.getTotalOpenMecBox();
  },
  mounted() {},
  beforeDestroy() {
    if (timer != null) clearInterval(timer);
  },

  methods: {
    async getTotalOpenMecBox() {
      let res = await Http.getTotalOpenMecBox();
      if (res) {
        this.totalOpen = res.bnb.MintBox;
      }
    },
    showHistoryDialog(item) {
      Common.app.$refs.boxBag.showOpenBox("mec", item.crystalAmounts, false);
    },
    async getMecBoxHistory() {
      let account = await Wallet.ETH.getAccount();
      let res = await Http.getMecBoxHistory(account);
      if (res) {
        this.getOpenBoxHistory = res.list;
      }
    },
    async getMecBoxOrder() {
      let res = await Wallet.ETH.Group.Enhancer.getMecBoxOrder();
      if (res) {
        let { blockHash, boxAmount } = res;
        this.needGetHash = Number(blockHash) == 1 && boxAmount > 0;
        this.orderObj.boxAmount = Number(boxAmount);
        this.orderObj.blockHash = blockHash;
      }
    },
    async mecBoxmint(num) {
      if (num == 0) {
        this.showNotify(this.$t("BOX_30"), "error");
        return;
      }
      // Common.app.$refs.boxBag.showOpenBox('mec',[2,50,300,500,18]);
      // Common.app.$refs.boxBag.showOpenBox('mdx',[2,5,3,5]);

      if (this.canOpenBox >= num) {
        let hash = await Wallet.ETH.Group.Enhancer.mecBoxmint(num, () => {
          this.openBoxNum = "";
          this.getMecBoxOrder();
        });
        if (hash) {
          this.lockBtnMethod("openMecBoxLock");
        }
      }
    },
    async addBox(num) {
      if (Number(num) == 0) {
        this.showNotify(this.$t("BOX_30"), "error");
        return;
      }
      if (Number(num) > Number(this.mecBoxNum)) {
        this.showNotify(this.$t("BOX_30"), "error");
        return;
      }

      //
      if (Number(this.orderObj.boxAmount) > 0) {
        this.showNotify(this.$t("BOX_29"), "error");
        return;
      }

      let hash = await Wallet.ETH.Group.Enhancer.addMysteryBox(num, () => {
        this.getMecBoxOrder();
      });
      if (hash) {
        this.oprDialog("unlock-mec-box-dialog", "none");
        // this.showNotify(this.$t("BOX_20"), "success");
        this.getConfirmDialog().show(this.$t("MECBOX_43"), null, true);
      }
    },

    async isApprove() {
      await Wallet.ETH.getAccount();
      let approveToMinter = await Wallet.ETH.isApprovedForAll(
        WalletConfig.ETH.newBoxToken,
        WalletConfig.ETH.mecBoxMinter
      );
      if (approveToMinter != null) {
        this.approveToMinter = approveToMinter;
      }
    },
    async approve() {
      let hash = await Wallet.ETH.approvedForAll(
        WalletConfig.ETH.newBoxToken,
        WalletConfig.ETH.mecBoxMinter,
        () => {
          this.isApprove();
        }
      );
      if (hash) {
        this.lockBtnMethod("approveLock");
      }
    },
    showOpenBox() {
      this.setAction(23013);
      this.oprDialog("open-mec-box-dialog", "block");
      this.openBoxNum =
        this.canOpenBox > this.maxOpenOne
          ? this.maxOpenOne
          : this.canOpenBox || 0;
    },
  },
};
</script>

<style scoped>
.pie {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: conic-gradient(
    #80e220 0,
    #80e220 32%,
    #618ffc 0,
    #618ffc 48%,
    #ae20e2 0,
    #ae20e2 52%,
    #fd820b 0,
    #fd820b 53%,
    #d8d8d8 0
  );
}
.pie-mask {
  position: absolute;
  top: 30px;
  left: 30px;
  bottom: 30px;
  right: 30px;
  background: #1c222c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#show-rate {
  position: absolute;
  right: 0px;
  top: 0px;
  display: none;
  z-index: 99;
  height: 44px !important;
}

@media (max-width: 768px) {
  #show-rate {
    display: block;
  }
  .box-img {
    height: 150px !important;
  }
  .box {
    margin: 0px !important;
    margin-top: 5px !important;
  }
  .box-section {
    padding-bottom: 0px !important;
    border: none !important;
    background: none !important;
  }
}
</style>
