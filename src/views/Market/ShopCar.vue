<template>
  <Dialog id="shopcar-dialog" :top="20" :width="500">
    <div class="por tal mgt-10">
      <p class="opa-6">{{ $t("Market_15") }}</p>
      <p
        class="cur-point vertical-children"
        style="position: absolute; right: 0px; top: 0px"
        @click="$store.commit('marketState/emptyShopCar')"
      >
        <span class="opa-6"> {{ $t("Market_16") }} </span>
        <svg viewBox="0 0 1024 1024" width="20" height="20">
          <path
            fill="#838689"
            d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"
          ></path>
          <path
            fill="#838689"
            d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"
          ></path>
        </svg>
      </p>
    </div>
    <div
      class="dialog-content mgt-10"
      id="shop-car-content"
      style="padding-bottom: 15px"
    >
      <div
        v-for="item in shopList"
        :key="item.prototype + '' + item.index"
        :class="'pet_hover_lv' + item.vType"
        class="shop-car-item vertical-children por mgt-10 por"
      >
        <img
          class="tip-icon"
          v-if="!item.isStandard"
          src="@/assets/icon/warning-icon.png"
        />
        <div class="dib por">
          <img
            :src="require(`@/assets/pet/${item.prototype}.png`)"
            alt=""
            width="100"
            height="100"
          />
          <p
            style="
              position: absolute;
              bottom: 5px;
              width: 100%;
              text-align: center;
            "
            v-if="item.tokenId == 0"
          >
            <span
              style="
                background: rgba(0, 0, 0, 0.5);
                padding: 2px 10px;
                font-size: 12px;
                border-radius: 10px;
              "
              >x{{ item.num }}</span
            >
          </p>
          <p
            class="vertical-children small"
            v-if="item.level > 1"
            style="
              position: absolute;
              top: 5px;
              left: 15px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 30px;
              padding: 0px 5px;
            "
          >
            <span>Lv.1</span>
            <img
              src="@/assets/icon/airdrop.png"
              width="10"
              alt=""
              class="mgl-5"
            />&nbsp;
            <span :class="getHashrateColor(item)">{{ item.hashrate }}</span>
          </p>
        </div>
        <div class="dib small mgl-5">
          <p class="vertical-children">
            <img src="@/assets/icon/airdrop.png" width="20" alt="" />
            <span
              class="mgl-5"
              style="font-size: 18px"
              :class="getHashrateColor(item)"
            >
              {{ item.lvHashrate }}
            </span>
          </p>
          <p class="vertical-children mgt-5">
            <img
              :src="require(`@/assets/icon/${category_img[item.category]}.png`)"
              width="12"
              alt=""
            />&nbsp;
            <span class="mgl-5"> Lv.{{ item.level }} </span>
          </p>
          <p class="vertical-children mgt-5">
            <img :src="require(`@/assets/icon/bnb.png`)" width="12" alt="" />
            <span class="mgl-5">
              {{
                item.tokenName.indexOf("Name_") != -1
                  ? $t(item.tokenName)
                  : item.tokenName
              }}
            </span>
          </p>
        </div>
        <div
          class="absolute-r tar"
          style="
            right: 20px;
            top: auto;
            bottom: 20px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50px;
            padding: 3px 15px;
          "
        >
          <p class="vertical-children">
            <img src="@/assets/coin/BUSD.png" height="20" alt="" />
            <span style="font-size: 16px" class="color-w mgl-5 money">{{
              numFloor(item.nowPrice / 1e9, 1e4).toLocaleString()
            }}</span
            >&nbsp;
          </p>
        </div>
        <div
          @click="deleteItem(item)"
          class="absolute-r vertical-children cur-point"
          style="
            background: rgba(0, 0, 0, 0.3);
            border-radius: 0px 14px 0px 14px;
            right: 0px;
            padding: 3px 15px;
          "
        >
          <span> {{ $t("Market_67") }} </span>
          <svg viewBox="0 0 1024 1024" width="15" height="15">
            <path
              fill="#ffffff"
              d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"
            ></path>
            <path
              fill="#ffffff"
              d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="vertical-children por mgt-20 tal aveage-box">
      <div>
        <div class="dib por">
          <span class="shop-car-num" v-if="getShopCarTotalSelectNum > 0">{{
            getShopCarTotalSelectNum
          }}</span>
          <img src="@/assets/icon/shopcar.png" alt="" height="40" />
        </div>

        <div class="dib tal por" style="margin-left: 12px">
          <span class="small opa-6">{{ $t("Market_18") }}</span>
          <p class="vertical-children">
            <img src="@/assets/coin/BUSD.png" height="20" alt="" />
            <span style="font-size: 20px" class="color-w mgl-5 money"
              >{{ getShopCarTotalPrice.toLocaleString() }}
              <small style="font-size: 12px">BUSD</small></span
            >
          </p>
        </div>
      </div>

      <div
        :class="{ 'btn-group': needApproveBUSD }"
        class="dib tar"
        style="padding-right: 20px"
      >
        <div v-if="needApproveBUSD">
          <StatuButton
            data-step="1"
            :isLoading="coinArr['BUSD'].isApproving"
            :onClick="approve"
            >{{ $t("Air-drop_16") }} BUSD</StatuButton
          >
        </div>
        <StatuButton
          class="mgt-10"
          data-step="2"
          :onClick="confirmBuyShopCar"
          :isDisable="shopCar.length == 0 || needApproveBUSD"
        >
          {{ $t("Market_22") }}
        </StatuButton>
      </div>
    </div>
    <div class="mgt-20">
      <div class="tal vertical-children">
        <div
          class="ly-checkbox"
          @click="ignoreSold = !ignoreSold"
          :class="ignoreSold ? 'active' : ''"
        >
          <svg class="hide" viewBox="0 0 1024 1024" width="20" height="20">
            <path
              fill="#92FFDA"
              d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z"
            ></path>
          </svg>
        </div>
        <span class="mgl-5">{{ $t("Market_71") }}</span>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Dialog, StatuButton } from "@/components";
import { Wallet, Common } from "@/utils";
import { PancakeConfig, WalletConfig } from "@/config";

export default {
  components: { Dialog, StatuButton },
  mixins: [CommonMethod],
  data() {
    return {
      ignoreSold: false,
    };
  },
  watch: {
    ignoreSold: function (newVal) {
      Common.setStorageItem("ignoreSold", newVal);
    },
  },
  created() {
    this.ignoreSold = Common.getStorageItem("ignoreSold") == "true";
  },
  computed: {
    ...mapState({
      shopCar: (state) => state.marketState.data.shopCar,
      coinArr: (state) => state.bnbState.data.coinArr,
      hashrateInfo: (state) => state.globalState.hashrateInfo,
    }),
    shopList() {
      const data = this.shopCar.map((item) => {
        const { lvHashrate, hashrate, level, prototype } = item;
        const vType = parseInt(prototype / 1e4);
        const standardsHashrate =
          this.hashrateInfo[`v${vType}StandardHashrate`];
        let isStandard;

        if (vType < 4) {
          isStandard = true;
        } else {
          isStandard =
            level > 1
              ? hashrate >= standardsHashrate
              : lvHashrate >= standardsHashrate;
        }

        return {
          ...item,
          isStandard,
        };
      });

      return data;
    },
    getShopCarTotalPrice() {
      let price = 0;
      this.shopCar.map((item) => {
        price += this.numFloor(item.nowPrice / 1e9, 1e4);
      });
      return Number(this.numFloor(price, 1e6));
    },
    getShopCarTotalSelectNum() {
      return this.shopCar.length;
    },
    needApproveBUSD() {
      return (
        this.coinArr["BUSD"].allowanceToAuction <
        this.getShopCarTotalPrice * 1e18
      );
    },
  },
  methods: {
    confirmBuyShopCar() {
      //
      const isAllStandard = this.shopList.every((item) => item.isStandard);

      if (this.shopCar.length == 0) return;

      let msg;

      if (isAllStandard) {
        msg = this.$t("Market_59").replace(
          "#0#",
          `<span style='color: #49c773'>${this.getShopCarTotalPrice} BUSD</span>`
        );
      } else {
        msg = this.$t("Market_104").replace(
          "#0#",
          `<span style='color: #49c773'>${this.getShopCarTotalPrice} BUSD</span>`
        );
      }

      if (this.ignoreSold == false) {
        msg += `<br/><br/><span class='small' style='color:orange'>${this.$t(
          "Market_72"
        )}</span>`;
      }

      this.getConfirmDialog().show(msg, async () => {
        let coinKey = "BUSD";

        let auctors = [];
        let indexs = [];
        let startTimes = [];
        let prices = [];
        this.shopCar.map((item) => {
          auctors.push(item.auctor);
          indexs.push(item.index);
          startTimes.push(item.uptime);
          prices.push(item.nowPrice);
        });

        if (this.getShopCarTotalPrice > Number(this.coinArr[coinKey].balance)) {
          this.showNotify(this.$t("Market_34"), "error");
          return;
        }

        let hash = await Wallet.ETH.buyMarketPets(
          auctors,
          indexs,
          coinKey,
          startTimes,
          prices,
          this.ignoreSold
        );
        if (hash) {
          this.$store.commit("marketState/emptyShopCar");
          this.oprDialog("shopcar-dialog", "block");
        }
      });
    },
    show() {
      this.oprDialog("shopcar-dialog", "block");
    },
    deleteItem(item) {
      this.getConfirmDialog().show(this.$t("Market_74"), () =>
        this.$store.commit("marketState/addToShopCar", item)
      );
    },
    //
    async approve() {
      let coinKey = "BUSD";
      let { isApproving } = this.coinArr[coinKey];
      if (isApproving) return;

      let hash = await Wallet.ETH.approveErcToTarget(
        PancakeConfig.SelectCoin["BUSD"].addr,
        WalletConfig.ETH.moMoStakeAuction,
        { coinKey, type: "allowanceToAuction" }
      );
      if (hash) {
        this.coinArr[coinKey].isApproving = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.shop-car-item {
  width: 100%;
  height: 100px;
  border-radius: 20px;
  text-align: left;

  .tip-icon {
    width: 22px;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
  }
}

.shop-car-item .pet-img {
  width: 100px;
  height: 100px;
}
#shop-car-content {
  max-height: 690px;
  min-height: 200px;
}
@media (max-width: 768px) {
  #shop-car-content {
    max-height: 500px !important;
  }
}
</style>
