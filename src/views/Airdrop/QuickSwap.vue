<template>
  <div class="tab-body tal">
    <div class="tab-content">
      <h2>闪兑</h2>
      <p class="small opa-6">{{ $t("Air-drop_34") }}</p>
    </div>
    <div class="tab-split"></div>
    <!-- From -->
    <div class="tab-content">
      <div class="tab-panel">
        <div class="aveage-box">
          <p class="tal small vertical-children">
            <span>{{ $t("Air-drop_35") }}</span
            >&nbsp;
            <span v-if="from.isEstimated && Number(from.inputValue) > 0">{{
              $t("Air-drop_37")
            }}</span
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
            class="text-btn tac"
            v-if="from.coinName != ''"
            @click="
              maxInputFrom();
              inputValueChange('from');
            "
          >
            Max
          </p>
          <p
            class="tar cur-point text-btn vertical-children"
            @click="openSelectCoin('from')"
          >
            <!-- <p class="tar cur-point text-btn vertical-children" > -->
            <span v-if="from.coinName != ''">
              <img
                :src="require(`../../assets/coin/${from.coinName}.png`)"
                alt=""
                height="20"
              />&nbsp;
              <span>{{ from.coinName }}</span>
            </span>
            <span v-else>{{ $t("Air-drop_38") }}</span>
            <svg viewBox="0 0 24 24" width="20px">
              <path
                fill="#838689"
                d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"
              ></path>
            </svg>
          </p>
        </div>
      </div>
      <div class="mgt-10 tac">
        <svg viewBox="0 0 24 24" width="24px">
          <path
            fill="#838689"
            d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"
          ></path>
        </svg>
      </div>
      <!-- To -->
      <div class="tab-panel mgt-10">
        <div class="aveage-box">
          <p class="tal small vertical-children">
            <span>{{ $t("Air-drop_36") }}</span
            >&nbsp;
            <span v-if="to.isEstimated && Number(to.inputValue) > 0">{{
              $t("Air-drop_37")
            }}</span
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
          <p class="tar text-btn vertical-children">
            <!-- <p class="tar text-btn vertical-children" > -->
            <span v-if="to.coinName != ''">
              <div style="height: 40px; zoom: 0.5" class="dib por double-img">
                <img
                  v-for="(name, key) in to.coinName.split('-')"
                  :key="name + key"
                  :src="require(`@/assets/coin/${name}.png`)"
                  height="40"
                  alt=""
                />
              </div>
              <span class="mgl-5">{{ to.coinName }}</span>
            </span>
            <span v-else>{{ $t("Air-drop_38") }}</span>
          </p>
        </div>
      </div>
      <!-- Des -->
      <div class="aveage-box mgt-10 opa-6" v-if="canCalcPerPrice">
        <p class="tal small">{{ $t("Air-drop_51") }}</p>
        <p class="tar small">
          {{ numFloor(from.inputValue / to.inputValue, 1e8) }}
          {{ from.coinName }}/{{ to.coinName }}
        </p>
      </div>
      <div class="aveage-box mgt-10 opa-6">
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
            style="width: 80%"
            :class="
              coinArr[from.coinName].allowanceToQuickSwap > 1e8 ||
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
            style="width: 80%"
            :class="canSwap ? '' : 'disable-btn'"
            @click="goSwap"
          >
            {{ $t("Air-drop_29") }}
          </button>
        </div>
      </div>
    </div>
    <Dialog></Dialog>
    <!-- <Dialog id="confirm-quick-swap-dialog"  :top="100" :width="400" >
			<div v-if="hasSelectTargetCoin" style="font-size:18px" class="mgt-10 ly-input-content">
				<div class="aveage-box " >
					<p class="tal vertical-children">
						<img :src="require(`../../assets/coin/${from.coinName}.png`)" alt="" height="25" />&nbsp;
						<span class="mgl-5">{{from.inputValue}}  </span>
					</p>
					<p class="tar ">{{from.coinName}}</p>
				</div>
				<div class="mgt-10">
					<svg viewBox="0 0 24 24"  width="20px" ><path fill="#838689" d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path></svg>
				</div>
				<div class="aveage-box mgt-10">
					<p class="tal vertical-children">
						<img :src="require(`../../assets/coin/${to.coinName}.png`)" alt="" height="25" />&nbsp;
						<span class="mgl-5">{{to.inputValue}}</span>
					</p>
					<p class="tar ">{{to.coinName}}</p>
				</div>
				<div class="aveage-box opa-6 mgt-50" >
					<p class="tal small">{{$t("Air-drop_51")}}</p>
					<p class="tar small">{{numFloor(from.inputValue/ to.inputValue, 1e8)}} {{from.coinName}}/{{to.coinName}}</p>
				</div>
				<div class="aveage-box opa-6 mgt-10" v-if="to.isEstimated">
					<p class="tal small">{{$t("Air-drop_53")}}</p>
					<p class="tar small">{{numFloor(to.inputValue * (1-getSlippage/100), 1e8)}} {{to.coinName}}</p>
				</div>
				<div class="aveage-box opa-6 mgt-10" v-if="from.isEstimated">
					<p class="tal small">{{$t("Air-drop_94")}}</p>
					<p class="tar small">{{numFloor(from.inputValue * (1+getSlippage/100), 1e8)}} {{from.coinName}}</p>
				</div>
				<div class="aveage-box opa-6 mgt-10" >
					<p class="tal small">{{$t("Air-drop_54")}}</p>
					<p class="tar small">{{numFloor(from.inputValue * 0.002, 1e8)}} {{from.coinName}}</p>
				</div>
				<div class="mgt-30" style="margin-bottom:10px">
					<button class="btn-primary" style="width:70%" @click="confirmSwap">{{$t("Common_03")}}</button>
				</div>
			</div>
		</Dialog> -->
  </div>
</template>

<script>
import { CommonMethod } from "@/mixin";
import { mapState } from "vuex";
import { SwapHttp, Wallet } from "@/utils";
import { Dialog, Loading } from "@/components";
import { PancakeConfig } from "@/config";
let timerInterval = null;
export default {
  components: { Dialog, Loading },
  mixins: [CommonMethod],
  props: ["oprData"],
  data() {
    return {
      from: {
        coinKey: "",
        coinName: "",
        inputValue: "",
        isEstimated: false, //
        loading: false,
      },
      to: {
        coinKey: "",
        coinName: "",
        inputValue: "",
        isEstimated: false, //
        loading: false,
      },
      path: [],
      timer: null,
      stepTime: 500,
      lastType: "from",
    };
  },
  watch: {
    oprData: function (newData, oldData) {
      if (newData.coinKey != oldData.coinKey) {
        this.initData();
      }
    },
  },
  computed: {
    ...mapState({
      coinArr: (state) => state.bnbState.data.coinArr,
      setting: (state) => state.bnbState.data.setting,
    }),
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
        Number(this.coinArr[this.from.coinName].balance) >=
          Number(this.from.inputValue) &&
        this.hasApproved
      );
    },
    hasApproved() {
      let coinKey = this.from.coinName;
      return (
        coinKey == "BNB" ||
        (coinKey != "" &&
          coinKey != "BNB" &&
          this.coinArr[coinKey].allowanceToSwap > 1e8)
      );
    },
    needApproved() {
      let coinKey = this.from.coinName;
      let needApprove = false;
      if (
        coinKey != "" &&
        coinKey != "BNB" &&
        this.coinArr[coinKey].allowanceToQuickSwap == 0
      ) {
        needApprove = true;
      }
      return needApprove;
    },
    getSlippage() {
      return Number(this.setting.slippage) || 0.5;
    },
  },
  created() {
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
          let sendData = {
            from: this[type].coinName,
            to: this[otherType].coinName,
            amountIn: this[type].inputValue,
            exactTo: type == "to",
            version,
          };
          if (Number(sendData.amountIn) <= 0) return;
          this[otherType].loading = true;
          let res = await SwapHttp.post("/pair/price", sendData);
          this[otherType].loading = false;
          let { data, code } = res.data;
          if (code == 200) {
            this[otherType].isEstimated = true;
            let value;

            //
            if (otherType == "to") {
              value = data.amountOut * 0.997;
            } else {
              value = data.amountOut / 0.997;
            }

            this[otherType].inputValue = this.numFloor(value, 1e10);

            this[type].isEstimated = false;
            this.path = data.path;
            //
            if (otherType == "from") {
              this.path.reverse();
            }
          }
        }, stepTime);
      } else {
        this[otherType].inputValue = "";
      }
    },
    openSelectCoin(type) {
      this.$parent.$parent.$refs.selectCoin
        .setOprData(
          [this.from.coinName, this.to.coinName],
          this.onSelectCoin.bind(this, type)
        )
        .show();
    },
    onSelectCoin(type, coinKey) {
      if (this.from.loading || this.to.loading) return;

      this[type].coinName = coinKey;
      this[type].coinKey = coinKey;
      this.setCoinAllowance();
      let otherType = type == "from" ? "to" : "from";
      if (Number(this[otherType].inputValue) <= 0) return;
      this[type].inputValue = "";
      this[type].isEstimated = false;
      this.inputValueChange(otherType, 0);
    },
    async setCoinAllowance() {
      let coinKey = this.from.coinKey;
      let contractAddr = PancakeConfig.QuickSwapAddr;
      if (coinKey != "" && coinKey != "BNB") {
        let allowance = await Wallet.ETH.viewErcAllowanceToTarget(
          PancakeConfig.SelectCoin[coinKey].addr,
          contractAddr,
          false
        );
        this.coinArr[coinKey].allowanceToQuickSwap = Number(allowance);
        this.coinArr["ts"] = new Date().valueOf();
      }
    },
    goSwap() {
      if (!this.canSwap) return;
      this.oprDialog("confirm-swap-dialog", "block");
    },
    async confirmSwap() {
      this.oprDialog("confirm-swap-dialog", "none");
      let hash = await Wallet.ETH.goSwap(
        this.from,
        this.to,
        this.path,
        this.setting
      );
      if (hash) {
        this.from.inputValue = "";
        this.to.inputValue = "";
      }
    },
    async initData() {
      let { coinName, coinKey } = this.oprData;
      if (coinName == "") return;
      this.from = {
        coinKey: coinName.split("-")[1],
        coinName: coinName.split("-")[1],
        inputValue: "",
        isEstimated: false, //
        loading: false,
      };
      this.to = {
        coinKey: coinKey,
        coinName: coinName,
        inputValue: "",
        isEstimated: false, //
        loading: false,
      };
      this.path = [];
      await this.setCoinAllowance();
    },
    exchangeFromAndTo() {
      if (this.from.loading || this.to.loading) return;
      let resultFrom = { ...this.to };
      let resultTo = { ...this.from };
      this.from = resultFrom;
      this.to = resultTo;
      this.inputValueChange(this.from.isEstimated ? "to" : "from");

      this.setCoinAllowance();
    },
    async approve() {
      let coinKey = this.from.coinKey;
      if (coinKey == "" || coinKey == "BNB") return;
      let { isApproving, allowanceToQuickSwap } = this.coinArr[coinKey];
      if (isApproving || Number(allowanceToQuickSwap) > 1e8) return;

      let contractAddr = PancakeConfig.QuickSwapAddr;
      let hash = await Wallet.ETH.approveErcToTarget(
        PancakeConfig.SelectCoin[coinKey].addr,
        contractAddr,
        { coinKey, type: "allowanceToQuickSwap" }
      );
      if (hash) {
        this.coinArr[coinKey].isApproving = true;
      }
    },
  },
};
</script>
