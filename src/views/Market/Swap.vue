<template>
  <div>
    <div class="swap">
      <div class="before">
        <div class="swap-container">
          <div class="head">
            <h4>{{ $t("Air-drop_277") }}</h4>
            <span @click="showSetting">
              <svg viewBox="0 0 24 24">
                <path
                  fill="#838689"
                  d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"
                ></path>
              </svg>
            </span>
            <span @click="oprDialog('pancake-history-dialog', 'block')">
              <svg viewBox="0 0 24 24">
                <path
                  fill="#838689"
                  d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z"
                ></path>
              </svg>
            </span>
          </div>
          <p class="describe">{{ $t("Air-drop_34") }}</p>
          <!-- 容器 -->
          <div class="box">
            <div class="item">
              <div class="title">
                <label
                  >{{ $t("Mine_05") }}:
                  {{
                    !from.coinName ? "-" : coinArr[from.coinName].balance
                  }}</label
                >
                <div
                  class="max"
                  v-if="!!from.coinName"
                  @click="
                    oneToValue = '-';
                    maxInputFrom();
                    inputValueChange('from');
                  "
                >
                  Max
                </div>
              </div>
              <div class="input-container">
                <div class="coin-info" @click="openSelectCoin('from')">
                  <div class="icon">
                    <img
                      v-if="!!from.coinName"
                      :src="require(`../../assets/coin/${from.coinName}.png`)"
                    />
                  </div>
                  <div class="name">{{ from.coinName }}</div>
                  <!-- <img class="down-icon" src="@/assets/icon/down.png" /> -->
                </div>
                <input
                  type="text"
                  placeholder="0.0"
                  v-model="from.inputValue"
                  v-number
                  @keydown="oneToValue = '-'"
                  @keyup="inputValueChange('from')"
                />
              </div>
            </div>
            <!-- 分割 -->
            <div class="division">
              <div class="icon" @click="exchangeFromAndTo">
                <svg
                  width="31"
                  height="30"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="15.668"
                    cy="15"
                    r="14.5"
                    transform="rotate(-90 15.668 15)"
                    fill="#333841"
                    stroke="url(#paint0_linear_1651_259)"
                  />
                  <path
                    d="M13.8322 21.2803L13.8322 9.53393C13.8322 9.34306 13.7564 9.16001 13.6214 9.02504C13.4864 8.89007 13.3034 8.81425 13.1125 8.81425C13.004 8.81422 12.8969 8.83878 12.7993 8.88609C12.7016 8.93339 12.616 9.00221 12.5488 9.08737C12.4931 9.13098 12.4441 9.18255 12.4034 9.24042L8.79972 14.3754C8.74512 14.4528 8.70631 14.5401 8.68553 14.6325C8.66474 14.7249 8.66238 14.8204 8.67859 14.9137C8.6948 15.007 8.72925 15.0962 8.77997 15.1761C8.8307 15.256 8.8967 15.3252 8.97419 15.3796C9.05168 15.434 9.13915 15.4725 9.23157 15.4931C9.32399 15.5136 9.41955 15.5157 9.51279 15.4992C9.60602 15.4828 9.69509 15.4481 9.77489 15.3971C9.85469 15.3462 9.92366 15.28 9.97784 15.2024L12.3927 11.7613L12.3927 21.2803C12.3927 21.4711 12.4685 21.6542 12.6035 21.7892C12.7385 21.9242 12.9216 22 13.1125 22C13.3033 22 13.4864 21.9242 13.6214 21.7892C13.7564 21.6542 13.8322 21.4711 13.8322 21.2803ZM16.7055 9.53393L16.7055 21.2803C16.7055 21.3748 16.7241 21.4684 16.7603 21.5557C16.7965 21.643 16.8495 21.7223 16.9163 21.7892C16.9831 21.856 17.0625 21.909 17.1498 21.9452C17.2371 21.9813 17.3307 21.9999 17.4252 21.9999C17.5337 22 17.6408 21.9755 17.7384 21.9281C17.836 21.8808 17.9216 21.812 17.9888 21.7268C18.0432 21.6842 18.0924 21.6333 18.1342 21.5738L21.738 16.4387C21.7923 16.3614 21.8309 16.2741 21.8515 16.1818C21.8721 16.0896 21.8743 15.9942 21.858 15.9011C21.8417 15.8079 21.8072 15.719 21.7564 15.6392C21.7057 15.5594 21.6397 15.4905 21.5623 15.4362C21.406 15.3266 21.2126 15.2835 21.0246 15.3164C20.8366 15.3493 20.6694 15.4556 20.5597 15.6118L18.1449 19.0529L18.1449 9.53393C18.1449 9.34306 18.069 9.16001 17.9341 9.02504C17.7991 8.89007 17.6161 8.81425 17.4252 8.81425C17.2343 8.81425 17.0513 8.89007 16.9163 9.02504C16.7813 9.16001 16.7055 9.34306 16.7055 9.53393Z"
                    fill="#C6C8CA"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1651_259"
                      x1="-4.08203"
                      y1="-8.25"
                      x2="47.418"
                      y2="44"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C8D5E1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div class="item">
              <div class="title">
                <label
                  >{{ $t("Mine_05") }}:
                  {{ !to.coinName ? "-" : coinArr[to.coinName].balance }}</label
                >
              </div>
              <div class="input-container">
                <div class="coin-info" @click="openSelectCoin('to')">
                  <div class="icon">
                    <img
                      v-if="!!to.coinName"
                      :src="require(`../../assets/coin/${to.coinName}.png`)"
                    />
                  </div>
                  <div class="name">{{ to.coinName }}</div>
                  <!-- <img class="down-icon" src="@/assets/icon/down.png" /> -->
                </div>
                <input
                  type="text"
                  placeholder="0.0"
                  v-model="to.inputValue"
                  v-number
                  @keydown="oneToValue = '-'"
                  @keyup="inputValueChange('to')"
                />
              </div>
            </div>
          </div>
          <div class="aveage-box mgt-20" v-if="canCalcPerPrice">
            <p class="tal small">{{ $t("Air-drop_51") }}</p>
            <p class="tar" v-if="oneToValue == '-'">
              <Loading />
            </p>
            <p class="tar small" v-else>
              {{ numFloor(from.inputValue / to.inputValue, 1e8) }}
              {{ from.coinName }}/{{ to.coinName }}
            </p>
          </div>

          <div class="aveage-box mgt-5" v-if="to.isEstimated">
            <p class="tal small">{{ $t("Air-drop_53") }}</p>
            <p class="tar small">
              {{
                to.coinName === "MEC"
                  ? Math.floor(
                      numFloor(to.inputValue * (1 - getSlippage / 100), 1e8)
                    )
                  : numFloor(to.inputValue * (1 - getSlippage / 100), 1e8)
              }}
              {{ to.coinName }}
            </p>
          </div>
          <div class="aveage-box mgt-5" v-if="from.isEstimated">
            <p class="tal small">{{ $t("Air-drop_94") }}</p>
            <p class="tar small">
              {{
                from.coinName === "MEC"
                  ? Math.floor(
                      numFloor(from.inputValue * (1 + getSlippage / 100), 1e8)
                    )
                  : numFloor(from.inputValue * (1 + getSlippage / 100), 1e8)
              }}
              {{ from.coinName }}
            </p>
          </div>
          <div class="aveage-box mgt-5" v-if="canCalcPerPrice">
            <p class="tal small">{{ $t("Air-drop_214") }}</p>
            <p class="tar" v-if="oneToValue == '-'">
              <Loading />
            </p>
            <template v-else>
              <p class="tar small color-sell" v-if="getPriceImpact <= 0.01">
                &lt;0.01%
              </p>
              <p
                class="tar small"
                :class="[
                  { 'color-orange': getPriceImpact > 3 && getPriceImpact < 5 },
                  { 'color-danger': getPriceImpact > 5 },
                ]"
                v-else
              >
                {{ getPriceImpact }}%
              </p>
            </template>
          </div>
          <div class="aveage-box mgt-5">
            <p class="tal small">{{ $t("Air-drop_39") }}</p>
            <p class="tar small">{{ getSlippage }}%</p>
          </div>
          <div
            class="mgt-20 tac"
            :class="needApproved ? 'btn-group' : ''"
            style="margin-bottom: 10px"
          >
            <div v-if="needApproved && from.coinName != ''">
              <button
                data-step="1"
                @click="approve"
                class="btn-primary por"
                style="width: 30%; height: 40px"
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
            <div>
              <button
                data-step="2"
                class="btn-primary mgt-10 por"
                style="width: 30%; height: 40px"
                :class="canSwap ? '' : 'disable-btn'"
                @click="goSwap"
              >
                {{ $t("Air-drop_29") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 侧边栏 -->
      <div class="sidebar">
        <ul>
          <li class="order" @click="showMecMarket">
            <div class="image">
              <img src="@/assets/mec-order-bg.png" />
            </div>
            <div class="content">
              <h4>MEC Marketplace<br />Order Book</h4>
              <div class="button">Trade Now</div>
            </div>
          </li>
          <li class="liquidity" @click="showLiquidity">
            <div class="image">
              <img src="@/assets/swap-liquidity.png" />
              <img class="icon" src="@/assets/swap-mbox-icon.png" />
              <div class="info">
                <h4>
                  <span>MBOX</span>-
                  <span>MEC</span>
                </h4>
                <p>Add Liquidity (Pancake V2)</p>
              </div>
            </div>
            <div class="content">
              <h4>
                Add Liquidity To Earn<br /><span style="font-size: 25px"
                  >3%</span
                >
                Fee On Each Trade
              </h4>
              <div class="footer">
                <div class="button">Earn <span>Reward</span></div>
                <div class="apy">
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.667969"
                      width="17"
                      height="21"
                      fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_1652_331"
                          transform="translate(-0.117647 -0.14286) scale(0.0288115 0.0238095)"
                        />
                      </pattern>
                      <image
                        id="image0_1652_331"
                        width="49"
                        height="48"
                        xlink:href="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                  <span>APY:{{ mecApy }}%</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Dialog id="confirm-swap-dialog" :top="100" :width="400">
      <div
        v-if="hasSelectTargetCoin"
        style="font-size: 18px"
        class="mgt-10 ly-input-content"
      >
        <div class="aveage-box">
          <p class="tal vertical-children">
            <img
              :src="require(`../../assets/coin/${from.coinName}.png`)"
              alt=""
              height="25"
            />&nbsp;
            <span class="mgl-5">{{ from.inputValue }} </span>
          </p>
          <p class="tar">{{ from.coinName }}</p>
        </div>
        <div class="mgt-10">
          <svg viewBox="0 0 24 24" width="20px">
            <path
              fill="#838689"
              d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"
            ></path>
          </svg>
        </div>
        <div class="aveage-box mgt-10">
          <p class="tal vertical-children">
            <img
              :src="require(`../../assets/coin/${to.coinName}.png`)"
              alt=""
              height="25"
            />&nbsp;
            <span class="mgl-5">{{ to.inputValue }}</span>
          </p>
          <p class="tar">{{ to.coinName }}</p>
        </div>
        <div class="aveage-box opa-6 mgt-50">
          <p class="tal small">{{ $t("Air-drop_51") }}</p>
          <p class="tar small">
            {{ numFloor(from.inputValue / to.inputValue, 1e8) }}
            {{ from.coinName }}/{{ to.coinName }}
          </p>
        </div>
        <div class="aveage-box opa-6 mgt-10" v-if="to.isEstimated">
          <p class="tal small">{{ $t("Air-drop_53") }}</p>
          <p class="tar small">
            {{ numFloor(to.inputValue * (1 - getSlippage / 100), 1e8) }}
            {{ to.coinName }}
          </p>
        </div>
        <div class="aveage-box opa-6 mgt-10" v-if="from.isEstimated">
          <p class="tal small">{{ $t("Air-drop_94") }}</p>
          <p class="tar small">
            {{ numFloor(from.inputValue * (1 + getSlippage / 100), 1e8) }}
            {{ from.coinName }}
          </p>
        </div>
        <div class="aveage-box opa-6 mgt-10">
          <p class="tal small">{{ $t("Air-drop_54") }}</p>
          <p class="tar small">
            {{ numFloor(from.inputValue * 0.002, 1e8) }} {{ from.coinName }}
          </p>
        </div>
        <div class="mgt-30" style="margin-bottom: 10px">
          <button class="btn-primary" style="width: 70%" @click="confirmSwap">
            {{ $t("Common_03") }}
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { SwapHttp, Wallet } from "@/utils";
import { Dialog, Loading } from "@/components";
import { PancakeConfig } from "@/config";
let timerInterval = null;
export default {
  mixins: [CommonMethod],
  components: {
    Loading,
    Dialog,
  },
  data() {
    return {
      oprData: {},
      from: {
        coinName: "",
        inputValue: "",
        isEstimated: false, //
        loading: false,
      },
      to: {
        coinName: "",
        inputValue: "",
        isEstimated: false, //
        loading: false,
      },
      path: [],
      timer: null,
      stepTime: 500,
      lastType: "from",
      oneToValue: "-",
    };
  },
  watch: {
    oprData: function (newData, oldData) {
      if (newData.coinName != oldData.coinName) {
        this.oneToValue = "-";
        this.initData();
      }
    },
  },
  computed: {
    ...mapState({
      crystalNum: (state) => state.userState.data.crystalNum,
      mecApy: (state) => state.globalState.mecApy,
      coinArr: (state) => state.bnbState.data.coinArr,
      setting: (state) => state.bnbState.data.setting,
    }),
    needApproved() {
      let coinKey = this.from.coinName;
      let needApprove = false;
      if (
        coinKey != "" &&
        coinKey != "BNB" &&
        this.coinArr[coinKey].allowanceToSwap == 0
      ) {
        needApprove = true;
      }

      return needApprove;
    },
    hasSelectTargetCoin() {
      return this.from.coinName != "" && this.to.coinName != "";
    },
    canCalcPerPrice() {
      return (
        this.hasSelectTargetCoin &&
        Number(this.from.inputValue) > 0 &&
        Number(this.to.inputValue) > 0
      );
    },
    //
    canSwap() {
      return (
        this.hasSelectTargetCoin &&
        Number(this.from.inputValue) > 0 &&
        Number(this.to.inputValue) > 0 &&
        Number(this.coinArr[this.from?.coinName]?.balance) >=
          Number(this.from.inputValue) &&
        this.hasApproved
      );
    },
    hasApproved() {
      let coinKey = this.from.coinName;
      console.log(coinKey, this.coinArr[coinKey], "==1==");
      return (
        coinKey == "BNB" ||
        (coinKey != "" &&
          coinKey != "BNB" &&
          this.coinArr[coinKey].allowanceToSwap > 1e8)
      );
    },
    getSlippage() {
      return Number(this.setting.slippage) || 0.5;
    },
    //
    getPriceImpact() {
      if (this.oneToValue == "-") return 0;
      let num = Number(
        this.numFloor(
          ((this.from.inputValue / this.to.inputValue - this.oneToValue) /
            this.oneToValue) *
            100,
          100
        )
      );
      if (num > 99) num = 99;
      return num;
    },
    //
    isSwapMec() {
      return this.to.coinName === "MEC" || this.from.coinName === "MEC";
    },
    //
    swapPath() {
      const wbnbPath = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
      const path = [
        PancakeConfig.SelectCoin.MEC.addr,
        PancakeConfig.SelectCoin.MBOX.addr,
      ];
      //
      const isToMec = this.to.coinName === "MEC";
      const endName = isToMec ? this.from.coinName : this.to.coinName;

      switch (endName) {
        case "MBOX":
          break;
        case "BNB":
          path.push(wbnbPath);
          break;
        default:
          path.push(wbnbPath);
          path.push(PancakeConfig.SelectCoin[endName].addr);
          break;
      }

      //
      if (isToMec) {
        path.reverse();
      }

      return path;
    },
  },
  created() {
    const coinKey = "MBOX-MEC";
    const stakeLP = PancakeConfig.StakeLP;
    const coinArr = this.coinArr;
    this.oprData = { coinKey, ...stakeLP[coinKey], ...coinArr[coinKey] };
    this.oneToValue = "-";
    this.initData();
    this.setCoinAllowance();
    clearInterval(timerInterval);
    this.inputValueChange(this.lastType);
    timerInterval = setInterval(() => {
      this.inputValueChange(this.lastType);
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(timerInterval);
  },
  methods: {
    //
    showMecMarket() {
      this.$parent.isShowMecMarket = true;
    },
    //
    showLiquidity() {
      this.$parent.$parent.$refs.pancake
        .setOprData({ coinKey: "MBOX-BNB-V2", pancakeVType: 2 })
        .show("liquidity");
    },
    //
    showSetting() {
      this.$parent.$parent.$refs.pancake.$refs.setting.show();
    },
    maxInputFrom() {
      let value = this.coinArr[this.from.coinName].balance;
      if (this.from.coinName == "BNB") {
        value -= 0.01;
      }
      if (value < 0) value = 0;
      this.from.inputValue = value;
    },
    async inputValueChange(type, stepTime = this.stepTime) {
      this.lastType = type;
      let otherType = type == "from" ? "to" : "from";
      let version = "V1";
      if (this.setting.pancakeVType == 2) version = "V2";

      if (this.hasSelectTargetCoin) {
        //
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          try {
            let inputValue = this[type].inputValue;

            if (Number(this[type].inputValue) <= 0) return;

            let value, amountOut;

            this[otherType].loading = true;

            //
            if (this.isSwapMec) {
              if (this.from.coinName === "MEC" && type === "from") {
                inputValue = inputValue - Math.max(1, inputValue * 0.02);
              }

              this.path = this.swapPath;

              //
              if (this[type].coinName === "MEC") {
                inputValue = Math.floor(inputValue);
              }

              if (type === "from") {
                const coin = PancakeConfig.SelectCoin[this.from.coinName];
                const res = await Wallet.ETH.getMecSwapAmountsOut(
                  inputValue * coin.decimals,
                  this.swapPath
                );
                amountOut =
                  res / PancakeConfig.SelectCoin[this.to.coinName].decimals;
              } else {
                const toCoin = PancakeConfig.SelectCoin[this.to.coinName];
                const res = await Wallet.ETH.getMecSwapAmountsIn(
                  inputValue * toCoin.decimals,
                  this.swapPath
                );
                amountOut =
                  res / PancakeConfig.SelectCoin[this.from.coinName].decimals;
              }

              //
              if (otherType == "to") {
                value = amountOut * 0.98;
              } else {
                value = amountOut / 0.98;
              }
            } else {
              let sendData = {
                from: this[type].coinName,
                to: this[otherType].coinName,
                amountIn: this[type].inputValue,
                exactTo: type == "to",
                version,
              };
              let res = await SwapHttp.post("/pair/price", sendData);
              let { data, code } = res.data;

              if (code == 200) {
                amountOut = data.amountOut;
                this.path = data.path;

                //
                if (otherType == "from") {
                  this.path.reverse();
                }
              }

              //
              if (otherType == "to") {
                value = amountOut * 0.997;
              } else {
                value = amountOut / 0.997;
              }
            }

            this.getOneToValue();
            this[otherType].loading = false;
            this[otherType].isEstimated = true;

            //
            if (this[otherType].coinName === "MEC") {
              this[otherType].inputValue = Math.floor(value);
            } else {
              this[otherType].inputValue = this.numFloor(value, 1e10);
            }

            this[type].isEstimated = false;
          } catch (error) {
            this.from.loading = false;
            this.to.loading = false;
          }
        }, stepTime);
      } else {
        this[otherType].inputValue = "";
      }
    },
    openSelectCoin(type) {
      // this.$parent.$parent.$refs.pancake.$refs.selectCoin.setOprData([this.from.coinName, this.to.coinName], this.onSelectCoin.bind(this, type)).show();
    },
    onSelectCoin(type, coinName) {
      if (this.from.loading || this.to.loading) return;
      this.oneToValue = "-";

      this[type].coinName = coinName;
      this.setCoinAllowance();
      let otherType = type == "from" ? "to" : "from";
      this.getOneToValue();
      if (Number(this[otherType].inputValue) <= 0) return;
      this[type].inputValue = "";
      this[type].isEstimated = false;
      this.inputValueChange(otherType, 0);
    },
    async setCoinAllowance() {
      let coinKey = this.from.coinName;

      if (coinKey != "" && coinKey != "BNB") {
        const addr = PancakeConfig.SelectCoin[coinKey].addr;

        let allowance;

        if (this.isSwapMec) {
          if (coinKey === "MEC") {
            const res = await Wallet.ETH.isApprovedForAll(
              addr,
              PancakeConfig.MecSwap
            );
            allowance = res ? 1e18 : 0;
          } else {
            const res = await Wallet.ETH.viewErcAllowanceToTarget(
              addr,
              PancakeConfig.MecSwap,
              false
            );
            allowance = Number(res);
          }
        } else {
          const routerAddr =
            this.setting.pancakeVType == 1
              ? PancakeConfig.SwapRouterAddr
              : PancakeConfig.SwapRouterAddrV2;
          const res = await Wallet.ETH.viewErcAllowanceToTarget(
            addr,
            routerAddr,
            false
          );
          allowance = Number(res);
        }

        this.coinArr[coinKey].allowanceToSwap = allowance;
        this.coinArr["ts"] = new Date().valueOf();
      }
    },
    goSwap() {
      if (!this.canSwap) return;
      this.oprDialog("confirm-swap-dialog", "block");
    },
    async confirmSwap() {
      this.oprDialog("confirm-swap-dialog", "none");

      let hash;

      if (this.from.coinName === "MEC" || this.to.coinName === "MEC") {
        hash = await Wallet.ETH.swapMec(
          this.from,
          this.to,
          this.path,
          this.setting
        );
      } else {
        hash = await Wallet.ETH.goSwap(
          this.from,
          this.to,
          this.path,
          this.setting
        );
      }

      if (hash) {
        this.from.inputValue = "";
        this.to.inputValue = "";
      }
    },
    initData() {
      let { coinName } = this.oprData;
      if (coinName == "") return;
      this.from = {
        coinName: coinName.split("-")[1],
        inputValue: "",
        isEstimated: false, //
        loading: false,
      };
      this.to = {
        coinName: coinName.split("-")[0],
        inputValue: "",
        isEstimated: false, //
        loading: false,
      };
      this.path = [];
      this.getOneToValue();
    },
    exchangeFromAndTo() {
      this.oneToValue = "-";
      if (this.from.loading || this.to.loading) return;
      let resultFrom = { ...this.to };
      let resultTo = { ...this.from };
      this.from = resultFrom;
      this.to = resultTo;
      this.inputValueChange(this.from.isEstimated ? "to" : "from");
      this.$nextTick(() => {
        this.setCoinAllowance();
      });
    },
    async approve() {
      const coinKey = this.from.coinName;
      const tokenAddress = PancakeConfig.SelectCoin[coinKey].addr;
      if (coinKey == "" || coinKey == "BNB") return;
      let { isApproving, allowanceToSwap } = this.coinArr[coinKey];
      if (isApproving || Number(allowanceToSwap) > 1e8) return;

      let hash;

      if (this.isSwapMec) {
        if (coinKey === "MEC") {
          hash = await Wallet.ETH.approvedForAll(
            tokenAddress,
            PancakeConfig.MecSwap,
            () => {
              this.setCoinAllowance();
            }
          );
        } else {
          hash = await Wallet.ETH.approveErcToTarget(
            tokenAddress,
            PancakeConfig.MecSwap,
            { coinKey, type: "allowanceToSwap" }
          );
        }
      } else {
        const routerAddr =
          this.setting.pancakeVType == 1
            ? PancakeConfig.SwapRouterAddr
            : PancakeConfig.SwapRouterAddrV2;
        hash = await Wallet.ETH.approveErcToTarget(tokenAddress, routerAddr, {
          coinKey,
          type: "allowanceToSwap",
        });
      }

      if (hash) {
        this.coinArr[coinKey].isApproving = true;
      }
    },
    async getOneToValue() {
      let amountOut;

      if (this.isSwapMec) {
        if (this.lastType === "from") {
          const res = await Wallet.ETH.getMecSwapAmountsOut(
            1 * 1e18,
            this.swapPath
          );
          amountOut = res / PancakeConfig.SelectCoin[this.to.coinName].decimals;
        } else {
          const res = await Wallet.ETH.getMecSwapAmountsIn(1, this.swapPath);
          amountOut =
            res / PancakeConfig.SelectCoin[this.from.coinName].decimals;
        }
      } else {
        let sendData = {
          from: this.to.coinName,
          to: this.from.coinName,
          amountIn: 1,
          exactTo: true,
          version: "V2",
        };
        let res = await SwapHttp.post("/pair/price", sendData);
        if (res.data.code == 200) {
          amountOut = res.data.data.amountOut;
        }
      }

      this.oneToValue = amountOut / 0.997;
    },
  },
};
</script>

<style lang="less" scoped>
.swap {
  width: 100%;
  display: flex;

  .before {
    flex: 1;
  }

  ul {
    list-style: none;
  }
}

.head {
  display: flex;
  align-items: center;

  h4 {
    flex: 1;
    font-size: 24px;
    text-align: left;
  }

  span {
    display: block;
    width: 24px;
    height: 24px;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    svg {
      display: block;
    }
  }
}

.describe {
  margin-top: 5px;
  font-size: 14px;
  font-family: Poppins, Poppins-Regular;
  font-weight: 400;
  text-align: LEFT;
  color: rgba(255, 255, 255, 0.6);
  line-height: 12px;
}

.box {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #10161d;
  border-radius: 16px;
  box-shadow: 2px 2px 2px 0px rgba(26, 32, 38, 0.4) inset,
    0px 0px 4px 0px rgba(46, 68, 87, 0) inset;
}

.division {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 18px;
  margin-bottom: 10px;

  .icon {
    background: #10161d;
    position: relative;
    z-index: 1;
    font-size: 0;
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      svg {
        opacity: 0.6;
      }
    }
  }

  &::after {
    z-index: 0;
    content: "";
    display: block;
    width: 100%;
    border: 1px solid rgba(93, 100, 108, 0.5);
    transform: scaleY(0.5);
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
}

.item {
  .title {
    display: flex;

    label {
      flex: 1;
      text-align: left;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }

    .max {
      color: #13cce8;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .input-container {
    display: flex;
    height: 60px;
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 10px 15px;

    input {
      flex: 1;
    }
  }

  .coin-info {
    display: flex;
    align-items: center;
    padding: 0 10px;
    align-items: center;
    background: #070d14;
    border-radius: 28px;

    .icon {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: auto;
      }
    }

    .name {
      width: 45px;
      margin: 0 10px;
      text-align: left;
    }

    .down-icon {
      width: auto;
      height: 10px;
    }
  }

  input {
    text-align: right;
    background: none;
    outline: none;
    border: none;
    min-width: 0;
    color: #ffffff;
  }
}

.sidebar {
  box-sizing: border-box;
  background: rgba(29, 34, 43, 0.4);
  border-radius: 16px;

  li {
    min-height: 55px;
    cursor: pointer;
    background: #1d222b;
    border-radius: 16px;
    box-shadow: 2px 2px 2px 0px rgba(26, 32, 38, 0.4) inset,
      0px 0px 4px 0px rgba(46, 68, 87, 0) inset;

    &:hover {
      opacity: 0.8;
    }
  }

  h4 {
    font-family: "poppins-black";
    text-align: left;
    color: #ffffff;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .button {
    display: inline-block;
    height: 33px;
    line-height: 33px;
    font-family: "Poppins-black";
    background: #1751f6;
    border-radius: 8px;
    padding: 0 12px;
  }
}

.order {
  position: relative;
  margin-bottom: 40px;

  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h4 {
      margin-bottom: 30px;
    }
  }
}

.liquidity {
  .content {
    padding: 0 24px;
  }

  .image {
    position: relative;

    .info {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 24px;
      box-sizing: border-box;
    }

    .icon {
      position: absolute;
      top: -20px;
      left: 50%;
      width: 100px;
      height: auto;
    }

    h4 {
      font-size: 20px;
      color: #dec59b;
    }

    span:first-child {
      color: #ffb800;
    }

    span:last-child {
      color: #86cfff;
    }

    p {
      color: #dec59b;
      text-align: left;
    }
  }

  .footer {
    margin-top: 40px;
    padding-bottom: 24px;
    display: flex;
    align-items: center;
  }

  .apy {
    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
      color: #f5ca25;
      font-size: 15px;
      font-weight: 700;
      font-family: "Poppins-black";
      margin-left: 4px;
    }
  }
}

@media (min-width: 768px) {
  .swap {
    padding-top: 150px;
    align-items: center;
  }

  .swap-container {
    flex: 1;
    width: 500px;
    margin: 0 auto;

    .box {
      padding: 30px 35px;
    }

    .head {
      h4 {
        font-size: 24px;
      }
    }

    .item {
      input {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }

  .sidebar {
    width: 400px;
    padding: 70px 47px;

    h4 {
      font-size: 20px;
      line-height: 26px;
      font-weight: 700;
    }
  }
}

@media (max-width: 768px) {
  .swap {
    padding-top: 50px;
    flex-direction: column;
  }

  .swap-container {
    width: 100%;

    .box {
      padding: 20px;
    }

    .head {
      h4 {
        font-size: 18px;
      }
    }

    .item {
      input {
        font-weight: 700;
        font-size: 14px;
      }
    }
  }

  .sidebar {
    margin-top: 40px;
    padding: 30px 20px;

    h4 {
      font-size: 14px;
      font-weight: 600;
    }

    .button {
      font-size: 13px;
      padding: 0 15px;

      span {
        display: none;
      }
    }
  }
}
</style>
