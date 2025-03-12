<template>
  <!-- 进化V2相关功能 -->
  <div class="mgb-20" v-if="getNowPetItem.vType >= 4">
    <h3>
      {{ $t("MOMO_57") }}
      <img
        class="mgl-5 cur-point"
        @click="oprDialog('enhance-rule-dialog', 'block')"
        src="@/assets/icon/help.png"
        alt=""
        height="20"
      />
    </h3>
    <div v-if="isMaxEnhance" class="mgt-10 ly-input-content tac">
      {{ $t("MOMO_66") }}
    </div>
    <div v-else class="ly-input-content mgt-10" style="padding-bottom: 20px">
      <p class="small opa-6">{{ $t("MOMO_72") }}</p>
      <div
        class="mgt-10 dib"
        style="
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 12px;
          font-size: 18px;
        "
      >
        <button class="btn-primary btn-small" @click="enhanceTimes = 1">
          Min</button
        >&nbsp;
        <SelectNum
          id="enhance-num-select"
          :needHideReduce="false"
          :maxNum="getMaxEnhanceTimes"
          :defaultNum="enhanceTimes"
          :onChange="onNumChange"
        />&nbsp;
        <button
          class="btn-primary btn-small mgl-5"
          @click="enhanceTimes = getMaxEnhanceTimes"
        >
          Max
        </button>
      </div>

      <p class="small opa-6 mgt-20">{{ $t("MOMO_73") }}</p>
      <div
        class="mgt-10"
        style="
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 12px;
          font-size: 18px;
          display: flex;
        "
      >
        <div class="dib vertical-childrem" style="flex: 1; color: #fff">
          <div>
            <img
              src="@/assets/coin/CRYSTAL.png"
              class="mgl-5"
              alt=""
              height="25"
            />
            {{ getNeedCrystal }} <sub class="small">MEC</sub>
          </div>
        </div>
      </div>

      <div class="ovh mgt-10">
        <div class="col-md-6 col-xs-12">
          <p class="small opa-6 mgt-10">{{ $t("MOMO_60") }}(LV.1)</p>
          <div class="mgt-10" style="font-size: 18px">
            <img src="@/assets/icon/airdrop.png" height="25" alt="" />&nbsp;
            <span>{{ getNowPetItem.hashrate }}</span>
            <img src="@/assets/icon/upgradejt.png" alt="" class="mgl-10" />
            <img
              src="@/assets/icon/airdrop.png"
              alt=""
              class="mgl-10"
              height="25"
            />&nbsp;
            <span style="color: #85f34a">{{
              getNowPetItem.hashrate + Number(enhanceTimes)
            }}</span>
          </div>
        </div>
        <div class="col-md-6 col-xs-12">
          <template v-if="getNowPetItem.level > 1">
            <p class="small opa-6 mgt-10">
              {{ $t("MOMO_61") }}(LV.{{ getNowPetItem.level }})
            </p>
            <div class="mgt-10" style="font-size: 18px">
              <img src="@/assets/icon/airdrop.png" height="25" alt="" />&nbsp;
              <span>{{ getNowPetItem.lvHashrate }}</span>
              <img src="@/assets/icon/upgradejt.png" alt="" class="mgl-10" />
              <img
                src="@/assets/icon/airdrop.png"
                alt=""
                class="mgl-10"
                height="25"
              />&nbsp;
              <span style="color: #85f34a">{{
                getTargetLevelHashPower(
                  getNowPetItem.hashrate + Number(enhanceTimes)
                )
              }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="mgt-30 tac button-layout">
        <div :class="{ 'btn-group': needApproveMec }">
          <div v-if="needApproveMec" class="mgt-10">
            <StatuButton
              data-step="1"
              style="width: 150px"
              :isLoading="lockBtn.approveLock > 0"
              :onClick="approveMEC"
              >{{ $t("Air-drop_16") }} MEC</StatuButton
            >
          </div>
          <div class="mgt-10">
            <StatuButton
              data-step="2"
              :onClick="enhance"
              style="min-width: 150px"
              :isDisable="needApproveMec"
              :isLoading="lockBtn.enhanceLock > 0"
            >
              {{ $t("MOMO_65") }}
            </StatuButton>
          </div>
        </div>
        <!-- 批量进化 -->
        <div class="btn-primary enhancement mgt-10" @click="toggleBatch">
          {{ $t(isExistsBatch ? "MOMO_104" : "MOMO_103") }}
        </div>
      </div>
    </div>
    <Dialog id="enhance-rule-dialog" :top="100" :width="450">
      <h3 class="mgt-10">{{ $t("MOMO_96") }}</h3>
      <div class="dialog-content mgt-10 tal">
        <span v-html="$t('MOMO_97')" class="tal"></span>
      </div>
      <!-- <div class="mgt-20 tal">
				<div :class="['tab-menu',{'active': rulePos==0}]" @click="rulePos = 0">
					{{ $t("MOMO_12") }}
				</div>
				<div :class="['tab-menu', {'active': rulePos==1}]" @click="rulePos = 1">
					{{ $t("MOMO_13") }}
				</div>
				<div :class="['tab-menu', {'active': rulePos== 2}]" @click="rulePos = 2" v-if="Number(momoSetting.v5_max_upgrade) + 30 > 180">
					{{ $t("MOMO_14") }}
				</div>
				<div class="tab-body tal" style="padding:20px">
					<div class="aveage-box opa-6 small">
						<div>{{ $t("MOMO_60") }}</div>
						<div>{{ $t("MOMO_73") }}</div>
					</div>
					<div class="tab-body tal bold" style="max-height: 350px;overflow-y: auto;">
						<div class="aveage-box mgt-10" v-for="item in getRulerCfg" :key="item.hashrate">
							<div :class="getHashrateColor2(item.hashrate, rulePos==1?5:4)">
								<img src="@/assets/icon/airdrop.png" height="18" alt="" />
								<span class="mgl-5">{{item.hashrate}}</span>
							</div>
							<div>
								<img src="@/assets/coin/CRYSTAL.png" height="20" alt="" />
								<span class="mgl-5">{{item.crystal}}</span>
							</div>
						</div>
					</div>
				</div>
			</div> -->
    </Dialog>
  </div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { StatuButton, SelectNum, Dialog } from "@/components";
import { BaseConfig, WalletConfig, ConstantConfig } from "@/config";
import { Wallet } from "@/utils";
import momoPurificationCompute from "@/utils/momoPurificationCompute";
import { mapState } from "vuex";

export default {
  mixins: [CommonMethod],
  components: { StatuButton, SelectNum, Dialog },
  props: ["data", "isMarket"],
  data() {
    return {
      isMECApproved: -1,
      enhanceTimes: 1,
      rulePos: 0,
    };
  },
  computed: {
    ...mapState({
      isShowBatchEnhancement: (state) =>
        state.globalState.isShowBatchEnhancement,
      batchEnhancement: (state) => state.globalState.batchEnhancement,
      coinArr: (state) => state.bnbState.data.coinArr,
      lockBtn: (state) => state.globalState.data.lockBtn,
      crystalNum: (state) => state.userState.data.crystalNum,
      momoSetting: (state) => state.globalState.data.momoSetting,
      nowTs: (state) => state.globalState.data.nowTs,
    }),
    isExistsBatch() {
      return this.batchEnhancement.some(
        (item) => item.tokenId == this.data.tokenId
      );
    },
    getMaxEnhanceTimes() {
      let { vType, hashrate } = this.getNowPetItem;
      return this.momoSetting[`v${vType}_max_enhance`] - hashrate;
    },
    //
    isMaxEnhance() {
      let { vType, hashrate } = this.getNowPetItem;
      return (
        (vType == 4 && hashrate == this.momoSetting.v4_max_enhance) ||
        (vType == 5 && hashrate == this.momoSetting.v5_max_enhance) ||
        (vType == 6 && hashrate == this.momoSetting.v6_max_enhance)
      );
    },
    getNowPetItem() {
      return this.data;
    },
    getNowEnhanceCfg() {
      let cfg = BaseConfig[`MomoEnhanceV${this.getNowPetItem.vType}Cfg`];
      return cfg[this.getNowPetItem.hashrate];
    },
    getNeedCrystal() {
      const compute = momoPurificationCompute[`v${this.getNowPetItem.vType}`];
      return compute(this.getNowPetItem.hashrate, this.enhanceTimes);
    },
    needApproveMec() {
      return this.isMECApproved == false;
    },
    getRulerCfg() {
      let vType = [4, 5, 6][this.rulePos];
      return Object.values(BaseConfig[`MomoEnhanceV${vType}Cfg`]).filter(
        (item) =>
          item.hashrate < Number(this.momoSetting[`v${vType}_max_enhance`])
      );
    },
  },
  async created() {
    await Wallet.ETH.getAccount();
    await this.viewMECApproved();
  },
  methods: {
    //
    toggleBatch() {
      const item = this.data;

      if (this.isExistsBatch) {
        this.$store.commit("globalState/removeBatchEnhancement", item);
        return;
      }

      const first = this.batchEnhancement[0];

      //
      if (!this.isShowBatchEnhancement) {
        this.$store.commit("globalState/toggleShowBatchEnhancement");
      }

      //
      if (this.batchEnhancement.length >= 20) {
        this.showNotify(this.$t("MOMO_105"), "error");
        return;
      }

      //
      if (first && item.location != first.location) {
        this.showNotify(this.$t("MOMO_106"), "error");
        return;
      }

      this.$store.commit("globalState/addBatchEnhancement", item);
      //
      this.oprDialog("batch-enhancement", "block");
    },
    onNumChange(data, num) {
      this.enhanceTimes += num;
      if (this.enhanceTimes <= 1) this.enhanceTimes = 1;
      if (this.enhanceTimes >= this.getMaxEnhanceTimes)
        this.enhanceTimes = this.getMaxEnhanceTimes;
    },
    getGrowup(vType, hashrate) {
      let obj = {
        staticPower: 0,
        staticPercent: 0,
      };
      switch (vType) {
        case 4:
          obj.staticPower = 2000 + parseInt((hashrate - 10) * 50);
          obj.staticPercent = 0.2;
          break;
        case 5:
          obj.staticPower = 5000 + parseInt((hashrate - 50) * 50);
          obj.staticPercent = 0.3;
          break;
        case 6:
          obj.staticPower = 18000 + parseInt((hashrate - 180) * 50);
          obj.staticPercent = 0.4;
          break;
        default:
          break;
      }
      return obj;
    },
    //
    getTargetLevelHashPower(hashrate) {
      let { vType, level } = this.getNowPetItem;
      let growup = this.getGrowup(vType, hashrate);
      let lvHashRate = parseInt(
        hashrate +
          parseInt((growup.staticPower * (level - 1)) / 100) +
          parseInt(
            (parseInt(level / 5) *
              (1 + parseInt(level / 5)) *
              growup.staticPower *
              growup.staticPercent) /
              200
          )
      );
      return lvHashRate;
    },

    //
    async enhance() {
      if (Number(this.crystalNum) < Number(this.getNeedCrystal)) {
        this.showNotify(this.$t("MECBOX_46"), "error");
        return;
      }
      let data = {
        tokenId_: Number(this.getNowPetItem.tokenId),
        hrUp_: Number(this.enhanceTimes),
        crystal_: Number(this.getNeedCrystal),
      };
      let hash = await Wallet.ETH.Group.Enhancer.enhanceV2(
        data,
        () => {
          this.enhanceTimes = 1;
        },
        this.getNowPetItem.location == ConstantConfig.NFT_LOCATION.VERSE
      );
      if (hash) {
        this.lockBtnMethod("enhanceLock");
      }
    },

    //
    async viewMECApproved() {
      let isApprove = await Wallet.ETH.isApprovedForAll(
        WalletConfig.ETH.crystalToken,
        WalletConfig.ETH.moMoToken
      );
      if (isApprove != null) {
        this.isMECApproved = isApprove;
      }
    },

    async approveMEC() {
      let hash = await Wallet.ETH.approvedForAll(
        WalletConfig.ETH.crystalToken,
        WalletConfig.ETH.moMoToken,
        () => {
          this.viewMECApproved();
        }
      );
      if (hash) {
        this.lockBtnMethod("approveLock");
      }
    },
  },
};
</script>

<style>
#enhance-num-select .yf-select-input {
  width: 80px;
}

.button-layout {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.enhancement {
  min-width: 150px !important;
  margin-left: 50px;
}
</style>
