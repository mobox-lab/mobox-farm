<template>
  <div>
    <div
      v-if="!showAddLiquidityPanel && !showRemoveLiquidityPanel"
      class="tab-body tal"
      style="padding-bottom: 10px"
    >
      <div v-if="oprData.isLP">
        <div v-if="oprData.isLP">
          <h2>
            <span v-if="setting.pancakeVType == 1">{{
              $t("Air-drop_145")
            }}</span>
            <span v-else>{{ $t("Air-drop_147") }}</span>
          </h2>
          <p class="small opa-6">{{ $t("Air-drop_58") }}</p>
        </div>
        <div class="mgt-10">
          <button
            class="btn-primary mgt-10"
            @click="showAddLiquidityPanel = true"
          >
            {{ $t("Air-drop_57") }}</button
          >&nbsp;
          <button
            v-if="oprData.balance > 0 || mecLP > 0"
            class="btn-primary mgt-10"
            @click="showRemoveLiquidityPanel = true"
            style="background: #384a7c"
          >
            {{ $t("Air-drop_95") }}
          </button>
        </div>
      </div>
      <div class="content" v-if="oprData.isLP">
        <div
          class="mgt-10 cur-point lp-amount-item close"
          @click="toggleClass($event)"
        >
          <div class="aveage-box vertical-children por aveage-head">
            <div class="dib">
              <div
                class="dib por"
                :class="oprData.isLP ? 'double-img' : ''"
                v-if="oprData.coinName != ''"
                style="zoom: 0.75"
              >
                <img
                  v-for="(name, key) in oprData.coinName.split('-')"
                  :key="name + key"
                  :src="require(`../../assets/coin/${name}.png`)"
                  height="40"
                  alt=""
                />
              </div>
              <span> {{ oprData.coinName }}</span>
            </div>

            <p class="dib tar">
              <span class="mgl-10" v-if="oprData.balance != '-'">{{
                oprData.balance
              }}</span>
              <Loading v-else />
              <svg viewBox="0 0 24 24" class="mgl-5 rotate-arrow" height="20px">
                <path
                  fill="#838689"
                  d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"
                ></path>
              </svg>
            </p>
          </div>

          <div class="mgt-20">
            <div
              class="aveage-box vertical-children por mgt-10"
              v-for="(name, key) in oprData.coinName.split('-')"
              :key="name + key"
            >
              <div class="dib">
                <span> {{ name }}</span>
              </div>

              <p class="dib tar">
                <span class="mgl-10" v-if="getLPPrice[key] != '-'">{{
                  getLPPrice[key]
                }}</span>
                <Loading v-else />
                <img
                  class="mgl-5"
                  :src="require(`../../assets/coin/${name}.png`)"
                  height="20"
                  alt=""
                />
              </p>
            </div>
          </div>
        </div>
        <!-- mbox - mec -->
        <div
          class="mgt-10 cur-point lp-amount-item close"
          @click="toggleClass($event)"
        >
          <div class="aveage-box vertical-children por aveage-head">
            <div class="dib">
              <div
                class="dib por double-img mbox-mec-swap-icon"
                style="zoom: 0.75"
              >
                <img src="@/assets/coin/MBOX.png" height="40" alt="" />
                <img
                  src="@/assets/coin/MEC.png"
                  class="mec-coin-icon"
                  height="40"
                  alt=""
                />
              </div>
              <span> MBOX-MEC</span>
            </div>
            <p class="dib tar">
              <span class="mgl-10" v-if="mecLP != '-'">{{
                mecLP.toFixed(4) === "0.0000" ? "0" : mecLP.toFixed(4)
              }}</span>
              <Loading v-else />
              <svg viewBox="0 0 24 24" class="mgl-5 rotate-arrow" height="20px">
                <path
                  fill="#838689"
                  d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"
                ></path>
              </svg>
            </p>
          </div>
          <div class="mgt-20">
            <div
              class="aveage-box vertical-children por mgt-10"
              v-for="(name, key) in ['MBOX', 'MEC']"
              :key="name + key"
            >
              <div class="dib">
                <span> {{ name }}</span>
              </div>
              <p class="dib tar">
                <span class="mgl-10" v-if="mecLPPrice[key] != '-'">{{
                  (mecLPPrice[key] / 1e18).toFixed(4) === "0.0000"
                    ? "0"
                    : (mecLPPrice[key] / 1e18).toFixed(4)
                }}</span>
                <Loading v-else />
                <img
                  class="mgl-5"
                  :src="require(`../../assets/coin/${name}.png`)"
                  height="20"
                  alt=""
                />
              </p>
            </div>
          </div>
        </div>
        <p class="small mgt-20 opa-6">
          {{ $t("Air-drop_110") }}
        </p>
      </div>
    </div>
    <div
      v-if="showAddLiquidityPanel"
      class="tab-body"
      style="position: relative; z-index: 998"
    >
      <div class="tab-content">
        <div class="aveage-box">
          <div class="tal cur-point" @click="showAddLiquidityPanel = false">
            <svg
              style="transform: rotate(90deg)"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path
                fill="#838689"
                d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"
              ></path>
            </svg>
          </div>
          <div class="tac" style="flex: 3">
            <span v-if="setting.pancakeVType == 1">{{
              $t("Air-drop_140")
            }}</span>
            <span v-else>{{ $t("Air-drop_142") }}</span>
          </div>

          <div class="tar">
            <span class="cur-point por" v-popMsg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              <span class="popMsg left">{{ $t("Air-drop_61") }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="tab-split"></div>
      <div class="tab-content">
        <div class="tab-panel">
          <div class="aveage-box">
            <p class="tal small vertical-children">
              <span>{{ $t("Air-drop_62") }}</span
              >&nbsp;
              <Loading v-if="from.loading" />
            </p>
            <p class="tar small">
              {{ $t("Mine_05") }}:
              {{ from.coinName == "" ? "-" : coinArr[from.coinName].balance }}
            </p>
          </div>
          <div class="aveage-box vertical-children mgt-10">
            <div style="flex: 1 1 auto">
              <input
                style="width: 100%"
                type="text"
                placeholder="0.0"
                v-model="from.inputValue"
                v-number
                @keyup="inputValueChange('from')"
              />
            </div>
            <p
              class="text-btn"
              v-if="from.coinName != ''"
              @click="
                maxInput('from');
                inputValueChange('from');
              "
            >
              Max
            </p>
            <p class="tar cur-point text-btn vertical-children">
              <span v-if="from.coinName != ''">
                <img
                  :src="require(`../../assets/coin/${from.coinName}.png`)"
                  alt=""
                  height="20"
                />&nbsp;
                <span>{{ from.coinName }}</span>
              </span>
              <span v-else>{{ $t("Air-drop_38") }}</span>
            </p>
          </div>
        </div>
        <div class="mgt-10 tac">
          <span style="font-size: 28px">+</span>
        </div>
        <!-- To -->
        <div class="tab-panel mgt-10">
          <div class="aveage-box">
            <p class="tal small vertical-children">
              <span>{{ $t("Air-drop_62") }}</span
              >&nbsp;
              <Loading v-if="to.loading" />
            </p>
            <p class="tar small">
              {{ $t("Mine_05") }}:
              {{ to.coinName == "" ? "-" : coinArr[to.coinName].balance }}
            </p>
          </div>
          <div class="aveage-box vertical-children mgt-10">
            <div style="flex: 1 1 auto">
              <input
                style="width: 100%"
                type="text"
                placeholder="0.0"
                v-model="to.inputValue"
                v-number
                @keyup="inputValueChange('to')"
              />
            </div>
            <p
              class="text-btn"
              v-if="from.coinName != ''"
              @click="
                maxInput('to');
                inputValueChange('to');
              "
            >
              Max
            </p>
            <p class="tar text-btn vertical-children" @click="openSelectCoin">
              <span v-if="to.coinName != ''">
                <img
                  :src="require(`../../assets/coin/${to.coinName}.png`)"
                  alt=""
                  height="20"
                />&nbsp;
                <span>{{ to.coinName }}</span>
              </span>
              <span v-else>Select a currency</span>
            </p>
          </div>
        </div>
        <!-- 提示 -->
        <div class="mec-tip" v-if="to.coinName === 'MEC'">
          <div class="title">
            <span>{{ $t("Air-drop_274") }}</span>
            <div class="icon">
              <svg
                class="opa-6"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path
                  style="fill: none"
                  d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                ></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <div class="tip-content">{{ $t("Air-drop_275") }}</div>
            </div>
            <div class="flex-1"></div>
            <div class="apy">{{ mecApy }}%</div>
          </div>
        </div>
        <!-- Des -->
        <div
          class="mgt-20 tac"
          :class="fromNeedApprove || toNeedApprove ? ' btn-group' : ''"
          style="margin-bottom: 10px"
        >
          <div v-if="fromNeedApprove">
            <button
              data-step="1"
              @click="approve(from.coinName)"
              class="btn-primary por mgt-10"
              style="width: 80%"
              :class="
                coinArr[from.coinName].allowanceToSwap > 1e8 ||
                coinArr[from.coinName].isApproving
                  ? 'disable-btn'
                  : ''
              "
            >
              <Loading
                v-if="coinArr[from.coinName].isApproving"
                style="position: absolute; left: 8px; top: 9px"
              />
              {{ $t("Air-drop_16") }} {{ from.coinName }}
            </button>
          </div>
          <div v-if="toNeedApprove">
            <button
              :data-step="fromNeedApprove ? 2 : 1"
              @click="approve(to.coinName)"
              class="btn-primary por mgt-10"
              style="width: 80%"
              :class="
                coinArr[to.coinName].allowanceToSwap > 1e8 ||
                coinArr[to.coinName].isApproving
                  ? 'disable-btn'
                  : ''
              "
            >
              <Loading
                v-if="coinArr[to.coinName].isApproving"
                style="position: absolute; left: 8px; top: 9px"
              />
              {{ $t("Air-drop_16") }} {{ to.coinName }}
            </button>
          </div>
          <div class="mgt-10">
            <StatuButton
              :data-step="toNeedApprove && fromNeedApprove ? 3 : 2"
              style="width: 80%"
              :onClick="goSupply.bind(this)"
              :isDisable="!canSupply"
              :isLoading="coinArr[oprData.coinKey].isAddLiqiditing"
              >{{ $t("Air-drop_57") }}</StatuButton
            >
          </div>
        </div>
        <p class="mec-describe" v-if="to.coinName === 'MEC'">
          {{ $t("Air-drop_276") }}
        </p>
      </div>
    </div>

    <PancakeLiquidityRemove
      :oprData="oprData"
      v-if="showRemoveLiquidityPanel"
    />

    <Dialog id="confirm-supply-dialog" :top="100" :width="400">
      <div
        class="mgt-10 ly-input-content tal"
        v-if="from.coinName != '' && to.coinName != ''"
      >
        <p class="small">{{ $t("Air-drop_118") }}</p>
        <div class="tac">
          <div class="double-img mgt-20 por dib">
            <img
              v-for="(name, key) in [from.coinName, to.coinName]"
              :key="name + key"
              :src="require(`../../assets/coin/${name}.png`)"
              height="40"
              alt=""
            />
          </div>
        </div>
        <div class="mgt-10 tac vertical-children" style="font-size: 25px">
          <span>{{ canGetLp }}</span>
        </div>
        <p class="mgt-10 tac small">{{ from.coinName }}/{{ to.coinName }}</p>
        <div class="aveage-box mgt-30">
          <p class="tal small">
            {{ $t("Air-drop_102").replace("#0#", from.coinName) }}
          </p>
          <p class="tar small vertical-children" style="flex: 2">
            <span class="mgl-5">{{ from.inputValue }} {{ from.coinName }}</span>
          </p>
        </div>
        <div class="aveage-box mgt-10">
          <p class="tal small">
            {{ $t("Air-drop_102").replace("#0#", to.coinName) }}
          </p>
          <p class="tar small vertical-children" style="flex: 2">
            <span class="mgl-5">{{ to.inputValue }} {{ to.coinName }}</span>
          </p>
        </div>
        <div class="aveage-box mgt-10">
          <p class="tal small">{{ $t("Air-drop_103") }}</p>
          <div class="tar small" style="flex: 2">
            <p>
              1 {{ from.coinName }} = {{ toValuePerFrom }} {{ to.coinName }}
            </p>
            <p>
              1 {{ to.coinName }} = {{ fromValuePerTo }} {{ from.coinName }}
            </p>
          </div>
        </div>
        <div class="mgt-30 tac" style="margin-bottom: 10px">
          <button class="btn-primary" style="width: 70%" @click="confirmSuppy">
            {{ $t("Common_03") }}
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { Loading, Dialog, StatuButton } from "@/components";
import { Wallet, Common, EventBus, SwapHttp } from "@/utils";
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { EventConfig, PancakeConfig, WalletConfig } from "@/config";
import PancakeLiquidityRemove from "./PancakeLiquidityRemove";

let timerInterval;
export default {
  mixins: [CommonMethod],
  props: ["oprData"],
  components: { Loading, Dialog, PancakeLiquidityRemove, StatuButton },
  data() {
    return {
      showAddLiquidityPanel: false,
      showRemoveLiquidityPanel: false,

      //addLiquidity
      from: {
        coinName: "",
        inputValue: "",
        loading: false,
        reserve: 0,
      },
      to: {
        coinName: "",
        inputValue: "",
        loading: false,
        reserve: 0,
      },
      totalSupply: 0, //
      lastType: "from",
      //
      mecLP: "-",
      mecReserveData: null,
      mecTotalSupply: null,
      bnbInfoData: null,
    };
  },
  computed: {
    ...mapState({
      mecApy: (state) => state.globalState.mecApy,
      coinArr: (state) => state.bnbState.data.coinArr,
      setting: (state) => state.bnbState.data.setting,
    }),
    //
    canSupply() {
      return (
        Number(this.from.inputValue) > 0 &&
        Number(this.from.inputValue) <=
          Number(this.coinArr[this.from.coinName].balance) &&
        Number(this.to.inputValue) <=
          Number(this.coinArr[this.to.coinName].balance) &&
        Number(this.to.inputValue) > 0 &&
        !this.fromNeedApprove &&
        !this.toNeedApprove
      );
    },
    fromNeedApprove() {
      let { coinName } = this.from;
      if (coinName == "") return false;
      let allowanceToSwap = Number(this.coinArr[coinName].allowanceToSwap);
      return (
        coinName != "" &&
        coinName != "BNB" &&
        allowanceToSwap >= 0 &&
        allowanceToSwap < 1e8
      );
    },
    toNeedApprove() {
      let { coinName } = this.to;
      if (coinName == "") return false;
      let allowanceToSwap = Number(this.coinArr[coinName].allowanceToSwap);
      return (
        coinName != "" &&
        coinName != "BNB" &&
        allowanceToSwap >= 0 &&
        allowanceToSwap < 1e8
      );
    },
    //
    canGetLp() {
      let amount0 = Number(this.from.inputValue);
      let amount1 = Number(this.to.inputValue);
      let reserve0 = Number(this.from.reserve);
      let reserve1 = Number(this.to.reserve);
      let _totalSupply = Number(this.totalSupply);
      if (_totalSupply == 0 || reserve0 == 0 || reserve1 == 0) return 0;
      return Common.numFloor(
        Math.max(
          (amount0 * _totalSupply) / reserve0,
          (amount1 * _totalSupply) / reserve1
        ),
        1e8
      );
    },
    //
    getLPPrice() {
      let retObj = ["-", "-"];

      let reserve0 = Number(this.bnbInfoData?.reserveA);
      let reserve1 = Number(this.bnbInfoData?.reserveB);
      let _totalSupply = Number(this.bnbInfoData?.totalSupply);

      if (_totalSupply == 0 || reserve0 == 0 || reserve1 == 0) return retObj;

      let lp = this.oprData.balance;

      retObj[0] = Common.numFloor(
        (lp * reserve0) / _totalSupply,
        PancakeConfig.SelectCoin.MBOX.omit
      );
      retObj[1] = Common.numFloor(
        (lp * reserve1) / _totalSupply,
        PancakeConfig.SelectCoin.BNB.omit
      );

      return retObj;
    },
    mecLPPrice() {
      const data = ["-", "-"];
      const reserve0 = Number(this.mecReserveData?.reserveA);
      const reserve1 = Number(this.mecReserveData?.reserveB);
      const _totalSupply = Number(this.mecTotalSupply / 1e18);

      if (_totalSupply == 0 || reserve0 == 0 || reserve1 == 0) {
        return data;
      } else {
        return [
          // MBOX
          Common.numFloor((this.mecLP * reserve0) / _totalSupply),
          // MEC
          Common.numFloor((this.mecLP * reserve1) / _totalSupply),
        ];
      }
    },
    toValuePerFrom() {
      let { reserve, coinName } = this.to;
      if (coinName == "" || reserve == 0) return 0;
      return Common.numFloor(reserve / this.from.reserve, 1e8);
    },
    fromValuePerTo() {
      let { reserve, coinName } = this.from;
      if (coinName == "" || reserve == 0) return 0;
      return Common.numFloor(reserve / this.to.reserve, 1e8);
    },
    isMec() {
      return this.to.coinName === "MEC";
    },
  },
  watch: {
    oprData: function (newData, oldData) {
      if (newData.coinKey != oldData.coinKey) {
        this.initData();
      }
    },
    showAddLiquidityPanel: function () {
      this.from.inputValue = "";
      this.to.inputValue = "";
    },
  },
  created() {
    clearInterval(timerInterval);
    this.getMecSwapInfo();
    timerInterval = setInterval(() => {
      this.getLPAmount();
      this.getMecSwapInfo();
    }, 10000);
    EventBus.$on(EventConfig.AddLiquiditySuccess, this.updateBalance);
  },
  beforeDestroy() {
    clearInterval(timerInterval);
    EventBus.$off(EventConfig.AddLiquiditySuccess, this.updateBalance);
  },
  methods: {
    //
    async viewMECApproved() {
      return await Wallet.ETH.isApprovedForAll(
        PancakeConfig.SelectCoin.MEC.addr,
        PancakeConfig.MecSwap
      );
    },
    async approveMEC() {
      return await Wallet.ETH.approvedForAll(
        PancakeConfig.SelectCoin.MEC.addr,
        PancakeConfig.MecSwap,
        () => {
          this.setCoinAllowance("MEC");
        }
      );
    },
    maxInput(type) {
      let obj = this[type];
      let value = this.coinArr[obj.coinName].balance;
      if (obj.coinName == "BNB") {
        value -= 0.01;
      }
      if (value < 0) value = 0;
      obj.inputValue = value;
    },

    toggleClass(e) {
      e.currentTarget.classList.toggle("close");
    },

    async initData() {
      let { addr, coinName } = this.oprData;
      if (addr != "") {
        this.getLPBalance();
        this.getMecLPBalance();
      }

      this.from.coinName = coinName.split("-")[0] || "";
      this.to.coinName = coinName.split("-")[1] || "";

      this.from.reserve = 0;
      this.to.reserve = 0;

      await this.setCoinAllowance(this.from.coinName);
      await this.setCoinAllowance(this.to.coinName);
      await this.getLPAmount();
    },
    updateBalance() {
      let { coinKey } = this.oprData;
      this.coinArr[coinKey].isApproving = false;
      this.coinArr[coinKey].isDeposing = false;
      this.coinArr["ts"] = new Date().valueOf();
      this.getLPBalance();
      this.getMecLPBalance();
    },

    async getLPBalance() {
      let { addr, omit, decimals, coinKey } = this.oprData;
      let coinArr = this.coinArr;

      if (addr == "") return;
      let value = await Wallet.ETH.getErc20BalanceByTokenAddr(addr, false);
      this.oprData.balance = Common.numFloor(Number(value) / decimals, omit);
      coinArr[coinKey].balance = Common.numFloor(
        Number(value) / decimals,
        omit
      );
      coinArr[coinKey].balanceTrue = value;
      coinArr["ts"] = new Date().valueOf();
    },

    async getMecLPBalance() {
      const res = await Wallet.ETH.getErc20BalanceByTokenAddr(
        PancakeConfig.MecSwapPair,
        false
      );
      this.mecLP = Common.numFloor(Number(res) / 1e18, 1e18);
    },
    async getLPAmount() {
      if (this.to.coinName === "MEC") {
        await this.getMecSwapInfo();

        this.from.reserve = this.mecReserveData.reserveA;
        this.to.reserve = this.mecReserveData.reserveB;
        this.totalSupply = this.mecTotalSupply;
        this.inputValueChange(this.lastType);
        return;
      }

      let tokenA = this.from.coinName;
      let tokenB = this.to.coinName;
      if (tokenA == "" || tokenB == "") return;

      let version = "V1";
      if (this.setting.pancakeVType == 2) {
        version = "V2";
      }
      let res = await SwapHttp.post("/pair/lpamount", {
        token0: tokenA,
        token1: tokenB,
        version,
      });
      let { data, code } = res.data;
      if (code == 200) {
        let { token0, token1, totalSupply } = data;
        this.bnbInfoData = {
          reserveA: token0.reserve,
          reserveB: token1.reserve,
          totalSupply: totalSupply,
        };

        if (token0.symbol.indexOf(tokenA) != -1) {
          this.from.reserve = token0.reserve;
        }

        if (token1.symbol.indexOf(tokenB) != -1) {
          this.to.reserve = token1.reserve;
        }

        if (this[this.lastType].inputValue != "") {
          this.inputValueChange(this.lastType);
        }

        this.totalSupply = totalSupply;
      }
    },
    //
    async getMecSwapInfo() {
      const config = PancakeConfig.SelectCoin;
      const [reserves, pair] = await Promise.all([
        Wallet.ETH.mecSwapContrac.methods
          .getReserves(config.MBOX.addr, config.MEC.addr, 1)
          .call(),
        Wallet.ETH.mecSwapPairContrac.methods.getPairInfo().call(),
      ]);

      this.mecReserveData = {
        ...reserves,
        reserveA: reserves.reserveA / 1e18,
      };

      this.mecTotalSupply = pair.totalSupply / 1e18;
    },
    //
    goSupply() {
      if (!this.canSupply) return;
      this.oprDialog("confirm-supply-dialog", "block");
    },
    //
    async confirmSuppy() {
      this.oprDialog("confirm-supply-dialog", "none");
      const addLiquidity = this.isMec
        ? Wallet.ETH.addMecLiquidity
        : Wallet.ETH.addLiquidity;
      const hash = await addLiquidity.apply(Wallet.ETH, [
        this.from,
        this.to,
        this.setting,
      ]);

      if (hash) {
        this.from.inputValue = "";
        this.to.inputValue = "";
        this.coinArr[this.oprData.coinKey].isAddLiqiditing = true;
      }
    },
    async setCoinAllowance(coinKey) {
      if (coinKey != "" && coinKey != "BNB") {
        let allowance;

        if (coinKey === "MEC") {
          await this.setCoinAllowance("MBOX");
          const res = await this.viewMECApproved();
          allowance = res ? -1 : 0;
        } else {
          const routerAddr =
            this.to.coinName === "MEC"
              ? PancakeConfig.MecSwap
              : this.setting.pancakeVType == 1
              ? PancakeConfig.SwapRouterAddr
              : PancakeConfig.SwapRouterAddrV2;
          allowance = await Wallet.ETH.viewErcAllowanceToTarget(
            PancakeConfig.SelectCoin[coinKey].addr,
            routerAddr,
            false
          );
        }

        this.coinArr[coinKey].allowanceToSwap = Number(allowance);
        this.coinArr["ts"] = new Date().valueOf();
      }
    },

    async approve(coinKey) {
      let routerAddr =
        this.to.coinName === "MEC"
          ? PancakeConfig.MecSwap
          : this.setting.pancakeVType == 1
          ? PancakeConfig.SwapRouterAddr
          : PancakeConfig.SwapRouterAddrV2;

      if (coinKey == "" || coinKey == "BNB") return;
      let { isApproving, allowanceToSwap } = this.coinArr[coinKey];
      if (isApproving || Number(allowanceToSwap) > 1e8) return;

      let hash;

      if (coinKey === "MEC") {
        hash = await this.approveMEC();
      } else {
        hash = await Wallet.ETH.approveErcToTarget(
          PancakeConfig.SelectCoin[coinKey].addr,
          routerAddr,
          { coinKey, type: "allowanceToSwap" }
        );
      }

      if (hash) {
        this.coinArr[coinKey].isApproving = false;
        this.setCoinAllowance(coinKey);
      }
    },
    inputValueChange(type) {
      //
      if (this.isMec && (this.from.reserve == 0 || this.to.reserve == 0)) {
        return;
      }

      this.lastType = type;
      let otherType = type == "from" ? "to" : "from";

      this[otherType].inputValue = Common.numFloor(
        (Number(this[otherType].reserve) / Number(this[type].reserve)) *
          Number(this[type].inputValue),
        1e8
      );
    },
    openSelectCoin() {
      this.$parent.$parent.$refs.selectCoin
        .setOprData([this.to.coinName], this.onSelectCoin, ["BNB", "MEC"])
        .show();
    },
    onSelectCoin(coinName) {
      this.to.coinName = coinName;
      this.getLPAmount();
      this.setCoinAllowance(coinName);
    },
  },
};
</script>

<style lang="less" scoped>
.mbox-mec-swap-icon {
  padding-left: 26px;
}

.rotate-arrow {
  transform: rotate(-180deg);
  transition: all 0.2s linear;
}

.lp-amount-item.close .rotate-arrow {
  transform: rotate(0deg);
}

.lp-amount-item.close {
  height: 70px;
  overflow: hidden;
}

.aveage-head {
  background: #070d14;
  border-radius: 30px;
  padding: 5px;
}

.tab-body {
  padding: 30px;
}

.content {
  padding: 15px;
  background: #13181f;
  border-radius: 16px;
  margin-top: 20px;
  box-shadow: 2px 2px 2px 0px rgba(26, 32, 38, 0.4) inset,
    0px 0px 4px 0px rgba(46, 68, 87, 0) inset;
}

.lp-amount-item {
  border-radius: 8px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
}

.mec-describe {
  font-size: 14px;
  text-align: left;
  margin-top: 20px;
}

.mec-tip {
  padding-top: 20px;
  padding-bottom: 20px;

  .title {
    display: flex;
    align-items: center;
  }

  .flex-1 {
    flex: 1;
  }

  .icon {
    margin-left: 6px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: relative;

    &:hover {
      .tip-content {
        display: block;
      }
    }

    .tip-content {
      display: block;
      position: absolute;
      min-width: 240px;
      background: #000000;
      border-radius: 5px;
      padding: 10px;
      text-align: left;
      line-height: 150%;
      z-index: 99999;
      display: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: 1px solid #333333;
      transform: translate(-50%, 0);
      top: 100%;
      left: 50%;
      margin-top: 10px;

      &::after {
        content: "";
        width: 10px;
        height: 10px;
        background: #000000;
        position: absolute;
        border-left: 1px solid #333333;
        border-top: 1px solid #333333;
        top: 0;
        left: 50%;
        margin-top: -3px;
        transform: rotate(45deg) translate(-50%);
      }
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .apy {
    font-size: 16px;
    color: #12dae7;
    font-weight: bold;
  }
}

@media (max-width: 768px) {
  .tab-body {
    padding: 15px;
  }

  .lp-amount-item {
    padding: 0;
    background: none;

    &.close {
      height: 40px !important;
    }
  }
}
</style>
