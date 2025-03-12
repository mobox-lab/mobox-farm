<template>
  <!-- 进化相关功能 -->
  <div
    class="mgt-20"
    v-if="getNowPetItem.vType == 4 || getNowPetItem.vType == 5"
  >
    <h3>
      {{ $t("MOMO_57") }}
      <img
        class="mgl-5 cur-point"
        @click="getRootRefs().ruleDialog.show('MOMO_58', 'MOMO_59')"
        src="@/assets/icon/help.png"
        alt=""
        height="20"
      />
    </h3>
    <div v-if="isMaxEnhance" class="mgt-10 ly-input-content tac">
      {{ $t("MOMO_66") }}
    </div>
    <div v-else class="ly-input-content mgt-10" style="padding-bottom: 20px">
      <p class="small opa-6">{{ $t("MOMO_60") }}(LV.1)</p>
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
        <span style="color: #85f34a"
          >{{ getCanEnhaceObj.min }}-{{ getCanEnhaceObj.max }}</span
        >
      </div>
      <div
        class="ovh bold aveage-box tac mgt-10"
        style="
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 10px;
          font-size: 14px;
          display: flex;
        "
      >
        <div class="vertical-children" v-for="item in 5" :key="item">
          <img
            :src="require(`@/assets/icon/up_icon${item}.png`)"
            alt=""
            height="20"
          />
          <div class="dib mgl-5 tal" style="line-height: 15px">
            <p>{{ [0, "36%", "36%", "22%", "5%", "1%"][item] }}</p>
            <p class="vertical-children">
              <span :class="'c-lv' + item">+{{ item }}</span>
              <img
                src="@/assets/icon/airdrop.png"
                alt=""
                class="mgl-5"
                height="12"
              />
            </p>
          </div>
        </div>
      </div>
      <template v-if="getNowPetItem.level > 1">
        <p class="small opa-6 mgt-20">
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
          <span style="color: #85f34a"
            >{{ getTargetLevelHashPower(getCanEnhaceObj.min) }}-{{
              getTargetLevelHashPower(getCanEnhaceObj.max)
            }}</span
          >
        </div>
      </template>
      <p class="small opa-6 mgt-20">{{ $t("MOMO_62") }}</p>
      <div
        class="mgt-10"
        style="
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 10px;
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
            {{ getNowEnhanceCfg.crystal }} <sub class="small">MEC</sub>
            <!-- <span style="color:#12D2E7;" class="mgl-5">+</span>
						<img src="@/assets/coin/MBOX.png" class="mgl-5" alt="" height="25" />
						<span class="mgl-5">{{getNowEnhanceCfg.mbox}} <sub class="small">MBOX</sub></span>  -->
          </div>
          <div class="mgt-10">
            <StatuButton
              class="btn-small"
              :onClick="approveMEC"
              :isLoading="lockBtn.approveLock > 0"
              v-if="needApproveMec"
              >{{ $t("Air-drop_16") }} MEC</StatuButton
            >
            <!-- <StatuButton class="mgl-10 btn-small" :onClick="approveMbox" v-if="needApproveMbox" :isLoading="coinArr['MBOX'].isApproving">{{$t("Air-drop_16")}} MBOX</StatuButton> -->
          </div>
        </div>
        <div class="dib">
          <StatuButton
            class="btn-line btn-small"
            :onClick="addCrystal"
            :isLoading="lockBtn.addCrystalLock > 0"
            :isDisable="Number(enhanceHash) >= 2"
          >
            <span v-if="Number(enhanceHash) >= 2">{{ $t("MOMO_63") }}</span>
            <span v-else>{{ $t("MOMO_63") }}</span>
          </StatuButton>
        </div>
      </div>
      <div class="mgt-20 tac">
        <!-- <p class="tac small opa-6 hide" v-if="Number(enhanceHash) >= 2">
					进化Hash：
					<span v-if="Number(enhanceHash) > 2">{{shortHash(enhanceHash)}}</span>
					<span v-else>等待设置Hash</span>
				</p> -->

        <div>
          <StatuButton
            :onClick="enhance"
            class="mgt-10"
            style="min-width: 150px"
            :isDisable="Number(enhanceHash) < 2"
            :isLoading="Number(enhanceHash) == 2 || lockBtn.enhanceLock > 0"
          >
            <span v-if="Number(enhanceHash) == 2">{{ $t("MECBOX_48") }}</span>
            <span v-else>{{ $t("MOMO_65") }}</span>
          </StatuButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { StatuButton } from "@/components";
import { BaseConfig, PancakeConfig, WalletConfig } from "@/config";
import { Wallet } from "@/utils";
import { mapState } from "vuex";

export default {
  mixins: [CommonMethod],
  components: { StatuButton },
  props: ["data", "isMarket"],
  data() {
    return {
      isMECApproved: -1,
      enhanceHash: -1,
      needGetHash: false,
    };
  },
  computed: {
    ...mapState({
      coinArr: (state) => state.bnbState.data.coinArr,
      lockBtn: (state) => state.globalState.data.lockBtn,
      crystalNum: (state) => state.userState.data.crystalNum,
      nowTs: (state) => state.globalState.data.nowTs,
    }),
    getCanEnhaceObj() {
      let obj = { min: 0, max: 0 };
      let { vType, hashrate } = this.getNowPetItem;
      obj.min = hashrate + 1;
      obj.max = hashrate + 5;
      if (vType == 4) {
        if (obj.max > 80) obj.max = 80;
      }
      if (vType == 5) {
        if (obj.max > 150) obj.max = 150;
      }
      return obj;
    },
    //
    isMaxEnhance() {
      let { vType, hashrate } = this.getNowPetItem;
      return (vType == 4 && hashrate == 80) || (vType == 5 && hashrate == 150);
    },
    getNowPetItem() {
      return this.data;
    },
    getNowEnhanceCfg() {
      let cfg =
        this.getNowPetItem.vType == 4
          ? BaseConfig.MomoEnhanceV4Cfg
          : BaseConfig.MomoEnhanceV5Cfg;
      return cfg[this.getNowPetItem.hashrate];
    },
    needApproveMbox() {
      return (
        this.coinArr["MBOX"].allowanceToMomoEnhancer != -1 &&
        Number(this.coinArr["MBOX"].allowanceToMomoEnhancer) / 1e18 <
          Number(this.getNowEnhanceCfg.mbox)
      );
    },
    needApproveMec() {
      return this.isMECApproved == false;
    },
  },
  watch: {
    nowTs: function (ts) {
      if (ts % 5 == 0 && this.needGetHash) {
        this.getEnhanceHash();
      }
    },
  },
  async created() {
    await Wallet.ETH.getAccount();
    await this.viewMboxAllowance();
    await this.viewMECApproved();
    await this.getEnhanceHash();
  },
  methods: {
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
    async getEnhanceHash() {
      let res = await Wallet.ETH.Group.Enhancer.getEnhanceHash(
        this.getNowPetItem.tokenId
      );
      if (res) {
        this.enhanceHash = res;
        this.needGetHash = Number(res) == 2;
      }
    },
    //
    async enhance() {
      let hash = await Wallet.ETH.Group.Enhancer.enhance(
        this.getNowPetItem.tokenId,
        () => {
          this.getEnhanceHash();
        }
      );
      if (hash) {
        this.lockBtnMethod("enhanceLock");
      }
    },

    //
    async addCrystal() {
      // if(this.needApproveMbox){
      // 	this.showNotify(this.$t("MECBOX_44") ,"error");
      // 	return
      // }
      if (this.needApproveMec) {
        this.showNotify(this.$t("MECBOX_45"), "error");
        return;
      }
      if (Number(this.crystalNum) < Number(this.getNowEnhanceCfg.crystal)) {
        this.showNotify(this.$t("MECBOX_46"), "error");
        return;
      }
      // if(Number(this.coinArr["MBOX"].balance) < Number(this.getNowEnhanceCfg.mbox)){
      // 	this.showNotify(this.$t("MECBOX_47") ,"error");
      // 	return
      // }
      console.log(this.getNowPetItem);
      let obj = {
        tokenId_: this.getNowPetItem.tokenId,
        hrOriginal_: this.getNowPetItem.hashrate,
        crystalAmount_: this.getNowEnhanceCfg.crystal,
        mbox_: 0,
      };
      let hash = await Wallet.ETH.Group.Enhancer.addCrystal(obj, () => {
        this.getEnhanceHash();
      });
      if (hash) {
        this.lockBtnMethod("addCrystalLock");
      }
    },
    //
    async viewMECApproved(address) {
      address = address || WalletConfig.ETH.momoEnhancer;
      let isApprove = await Wallet.ETH.isApprovedForAll(
        WalletConfig.ETH.crystalToken,
        address
      );
      if (isApprove != null) {
        this.isMECApproved = isApprove;
      }
    },
    async approveMEC(address) {
      address = address || WalletConfig.ETH.momoEnhancer;
      let hash = await Wallet.ETH.approvedForAll(
        WalletConfig.ETH.crystalToken,
        address,
        () => {
          this.viewMECApproved();
        }
      );
      if (hash) {
        this.lockBtnMethod("approveLock");
      }
    },

    async viewMboxAllowance() {
      let coinKey = "MBOX";
      if (this.coinArr[coinKey].allowanceToMomoEnhancer > 0) return;
      let allowanceToMomoEnhancer = await Wallet.ETH.viewErcAllowanceToTarget(
        PancakeConfig.SelectCoin[coinKey].addr,
        WalletConfig.ETH.momoEnhancer,
        false
      );
      if (allowanceToMomoEnhancer) {
        this.coinArr[coinKey].allowanceToMomoEnhancer = Number(
          allowanceToMomoEnhancer
        );
        this.coinArr.ts = new Date().valueOf();
        this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
      }
    },
    //
    async approveMbox() {
      let coinKey = "MBOX";
      let { allowanceToMomoEnhancer, isApproving } = this.coinArr[coinKey];
      if (allowanceToMomoEnhancer > 0 || isApproving) return;
      let hash = await Wallet.ETH.approveErcToTarget(
        PancakeConfig.SelectCoin[coinKey].addr,
        WalletConfig.ETH.momoEnhancer,
        { coinKey, type: "allowanceToMomoEnhancer" }
      );
      if (hash) {
        this.coinArr[coinKey].isApproving = true;
      }
    },
  },
};
</script>
