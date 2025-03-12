<template>
  <Dialog id="market-quick-buy-dialog" :top="100" width="550">
    <h2>{{ $t("Market_50") }}</h2>
    <div class="aveage-box vertical-children2 mgt-10">
      <div class="tal">
        <div
          class="dib momo-tab"
          v-for="item in getShowArr"
          :key="item"
          @click="quickBuy(item)"
          :class="[
            { 'opa-6': item != marketSearch.pType },
            `pet-min-type` + parseInt(item / 1e4),
          ]"
        >
          <img :src="require(`@/assets/pet/${item}.png`)" alt="" width="100%" />
        </div>
      </div>
      <div class="tar vertical-children" style="zoom: 0.8">
        <div
          class="cur-point dib por shop-car-btn"
          @click="getMomoShopCar().show()"
        >
          <span v-if="shopCar.length > 0" class="shop-car-num">{{
            shopCar.length
          }}</span>
          <img src="@/assets/icon/shopCar-buy.png" alt="" height="40" />
        </div>
        <Dropdown
          class="mgl-10"
          style="margin-top: 0px"
          :list="sortArr"
          :defaultSelectPos="marketSearch.sort"
          :onChange="onSortChange"
        />&nbsp;
      </div>
    </div>
    <div style="min-height: 200px">
      <div
        class="mgt-10 tab-panel"
        v-for="item in marketData.list"
        :key="item.tx + '' + item.uptime + item.index"
      >
        <div class="aveage-box">
          <div class="vertical-children" style="flex: 1.5">
            <div class="tac">
              <div style="zoom: 0.9">
                <span
                  v-for="item2 in item.petList"
                  :key="item2.prototype"
                  class="dib"
                  style="margin: 5px"
                >
                  <PetItemMin :data="item2" />
                </span>
              </div>
            </div>

            <div class="tac mgt-5 bold">
              <span>{{ $t("Market_17") }}:</span>
              <span>{{ numFloor(item.nowPrice / 1e9, 1e4) }}</span
              >&nbsp;
              <img src="@/assets/coin/BUSD.png" height="25" alt="" />
            </div>
            <div
              class="tac mgt-5"
              v-if="
                item.nowPrice != item.endPrice && item.countdown != '00:00:00'
              "
            >
              <span class="small opa-6"
                >{{ $t("Market_32").replace("#0#", item.countdown) }}:{{
                  numFloor(item.nextDayPrice / 1e9, 1e4)
                }}</span
              >
            </div>
          </div>

          <div :class="{ 'btn-group': needApprove(item) }" style="zoom: 0.9">
            <StatuButton
              :onClick="approve.bind(this)"
              data-step="1"
              v-if="needApprove(item)"
              :isDisable="coinArr['BUSD'].allowanceToAuction > 0"
              :isLoading="coinArr['BUSD'].isApproving"
              style="width: 80%"
              >{{ $t("Air-drop_16") }} BUSD</StatuButton
            >
            <StatuButton
              :onClick="buyPet.bind(this, item)"
              data-step="2"
              :isDisable="needApprove(item) || nowTs - item.uptime <= 120"
              :isLoading="lockBtn.buyMomoLock > 0"
              class="mgt-10"
              style="width: 80%"
            >
              <template v-if="nowTs - item.uptime <= 120">
                <img
                  src="@/assets/icon/lock.png"
                  alt=""
                  height="20"
                  style="position: absolute; left: 10px; top: 6px"
                />
                <span>{{
                  getLeftTime(Number(item.uptime) + 120 - nowTs)
                }}</span>
              </template>
              <span v-else>{{ $t("Market_22") }}</span>
            </StatuButton>
            <button
              v-if="
                coinArr['BUSD'].allowanceToAuction > 0 &&
                nowTs - item.uptime > 120
              "
              @click="addToShopCar(item)"
              style="zoom: 0.9; width: 80%"
              class="mgt-10"
              :class="isInShopCar(item) ? 'btn-danger' : 'btn-line'"
            >
              <span v-if="isInShopCar(item)">{{ $t("Market_70") }}</span>
              <span v-else>{{ $t("Market_69") }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="mgt-10 small opa-6" v-if="marketData.list.length == 5">
        {{ $t("Market_51") }}
      </div>
      <div
        v-if="marketData.list.length == 0"
        class="tab-panel mgt-10"
        style="
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <span class="opa-6" v-if="!marketLoading">{{ $t("Market_52") }}</span>
        <Loading v-else :width="30" :height="30" />
      </div>
    </div>
  </Dialog>
</template>

<script>
import {
  Dialog,
  Dropdown,
  PetItemMin,
  StatuButton,
  Loading,
} from "@/components";
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Http, Wallet, EventBus } from "@/utils";
import { BaseConfig, PancakeConfig, WalletConfig, EventConfig } from "@/config";
let updatePriceTimer = null;
export default {
  mixins: [CommonMethod],
  components: { Dialog, Dropdown, PetItemMin, StatuButton, Loading },
  data() {
    return {
      marketData: {
        list: [],
      },
      sortArr: [
        this.$t("Market_47"),
        this.$t("Market_04"),
        this.$t("Market_05"),
        this.$t("Market_06"),
        this.$t("Market_07"),
      ],
      marketSearch: {
        category: 0,
        vType: 0,
        sort: 2,
        pType: 0,
      },
      pType: 0,
    };
  },
  computed: {
    ...mapState({
      coinArr: (state) => state.bnbState.data.coinArr,
      useCoinPos: (state) => state.bnbState.data.useCoinPos,
      marketLoading: (state) => state.marketState.data.marketLoading,
      lockBtn: (state) => state.globalState.data.lockBtn,
      nowTs: (state) => state.globalState.data.nowTs,
      shopCar: (state) => state.marketState.data.shopCar,
    }),
    getSelectCoinArr() {
      let arr = [];
      Object.keys(PancakeConfig.SelectCoin).map((coinKey) => {
        if (coinKey == "BUSD") {
          arr.push(coinKey + ": " + this.coinArr[coinKey].balance);
        }
      });
      return arr;
    },
    getShowArr() {
      let retArr = [];
      let { pType } = this.marketSearch;
      if (!(pType == 0 || pType > 5e4)) {
        let mType = pType % 1e4;
        [1, 2, 3, 4].map((item) => {
          retArr.push(mType + item * 1e4);
        });
      }
      return retArr;
    },
  },
  async created() {
    this.startCountDown();
    await Wallet.ETH.getAccount();
    //
    await this.viewAllowance();
  },
  mounted() {
    EventBus.$on(EventConfig.BidPetSuccess, this.bitPetSuccess);
  },
  beforeDestroy() {
    if (updatePriceTimer) clearInterval(updatePriceTimer);
    EventBus.$off(EventConfig.BidPetSuccess, this.bitPetSuccess);
  },
  methods: {
    //
    needApprove(item) {
      return (
        this.coinArr["BUSD"].allowanceToAuction / 1e18 <
          Number(item.nowPrice / 1e9) &&
        this.coinArr["BUSD"].allowanceToAuction != -1
      );
    },
    getShowList(item) {
      let { ids, amounts } = item;
      let arr = [];
      ids.map((prototype, index) => {
        let obj = BaseConfig.NftCfg[prototype];
        obj.num = amounts[index];
        obj.vType = parseInt(prototype / 1e4);
        obj.tokenId = 0;
        obj.level = 1;
        obj.chain = "bnb";
        obj.hashrate = obj.quality;
        obj.lvHashrate = obj.quality;
        arr.push(obj);
      });
      arr.sort((a, b) => {
        return b.vType - a.vType;
      });
      return arr;
    },
    async addToShopCar(item) {
      let { auctor, index, uptime } = item;
      if (!this.isInShopCar(item)) {
        let data = await Wallet.ETH.getMarketOrder(auctor, index);
        if (data.status != 3 || data.startTime != uptime) {
          this.showNotify(this.$t("Market_35"), "error");
          return;
        }
      }
      this.$store.commit("marketState/addToShopCar", {
        ...item,
        ...this.getShowList(item)[0],
      });
    },
    isInShopCar(testItem) {
      let isInShopCar = false;
      this.shopCar.map((item) => {
        if (item.tx == testItem.tx) isInShopCar = true;
      });
      return isInShopCar;
    },
    bitPetSuccess() {
      this.getAuctionPets();
      this.oprDialog("market-quick-buy-dialog", "none");
    },
    startCountDown() {
      if (updatePriceTimer) clearInterval(updatePriceTimer);
      updatePriceTimer = setInterval(() => {
        let nowTime = parseInt(new Date().valueOf() / 1000);
        this.marketData.list.map((item) => {
          let count = 86400 - ((nowTime - item.uptime) % 86400);
          item.countdown = this.getLeftTime(count);
        });
      }, 1000);
    },
    onSortChange(pos) {
      this.marketData.list = [];
      this.marketSearch.sort = pos;
      this.$nextTick(() => {
        this.getAuctionPets();
      });
    },
    onCoinChange(pos) {
      console.log("onCoinChange", pos);
    },
    show(pType) {
      this.marketData.list = [];
      this.oprDialog("market-quick-buy-dialog", "block");
      this.marketSearch.pType = pType;
      this.getAuctionPets();
      return this;
    },

    async getAuctionPets() {
      this.$store.commit("marketState/setData", { marketLoading: true });
      let data = await Http.getAuctionList("BNB", 1, 5, this.marketSearch);
      let myAccount = await Wallet.ETH.getAccount();
      this.$store.commit("marketState/setData", { marketLoading: false });
      data.list.map((item) => {
        if (item.tokenId != 0) {
          let { tokenName } = BaseConfig.NftCfg[item.prototype];
          item.tokenName = tokenName;
          item.vType = parseInt(item.prototype / 1e4);
        }
        //
        let endTime = Number(item.uptime) + item.durationDays * 86400;
        let nowTime = parseInt(new Date().valueOf() / 1000);
        let nowPrice = item.endPrice;
        let diffPrice = item.endPrice - item.startPrice;
        if (endTime > nowTime) {
          nowPrice =
            item.startPrice +
            (diffPrice / item.durationDays) *
              Math.floor((nowTime - item.uptime) / 86400);
        }
        item.bidPrice = nowPrice;
        item.nowPrice = nowPrice;
        item.isMyPet =
          item.auctor.toLocaleLowerCase() == myAccount.toLocaleLowerCase();
        item.tx = item.tx.toString() + item.auctor.toString() + item.index;

        //
        let nextDayPrice = item.endPrice;
        let nextDayTime = nowTime + 86400;
        if (endTime > nextDayTime) {
          nextDayPrice =
            item.startPrice +
            (diffPrice / item.durationDays) *
              Math.floor((nextDayTime - item.uptime) / 86400);
        }
        item.nextDayPrice = nextDayPrice;
        item.countdown = "00:00:00";

        //
        let petList = [];
        //1155
        if (item.tokenId == 0) {
          let { ids, amounts, bidPrice } = item;
          ids.map((prototype, index) => {
            let obj = BaseConfig.NftCfg[prototype];
            petList.push({
              ...obj,
              bidPrice,
              prototype,
              level: 1,
              num: amounts[index],
              chain: "bnb",
              tokenId: 0,
              hashrate: obj.quality,
              lvHashrate: obj.quality,
              quality: obj.quality,
              vType: parseInt(prototype / 1e4),
            });
          });
        } else {
          //721
          let obj = BaseConfig.NftCfg[item.prototype];
          petList.push({
            ...obj,
            bidPrice: item.bidPrice,
            prototype: item.prototype,
            quality: item.quality,
            level: item.level,
            num: 1,
            chain: "bnb",
            tokenId: item.tokenId,
            hashrate: item.hashrate,
            lvHashrate: item.lvHashrate,
            vType: parseInt(item.prototype / 1e4),
            category: item.category,
          });
        }
        item.petList = petList;
      });

      this.marketData = data;
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

    //
    async buyPet(item) {
      let coinKey = "BUSD";
      if (
        this.coinArr[coinKey].allowanceToAuction <= 0 ||
        this.lockBtn.buyMomoLock > 0
      )
        return;
      if (item.nowPrice / 1e9 > Number(this.coinArr[coinKey].balance)) {
        this.showNotify(this.$t("Market_34"), "error");
        return;
      }

      let data = await this.getPetInfo(item);
      let { auctor, index, uptime } = item;

      if (data.status != 3 || data.startTime != uptime) {
        this.showNotify(this.$t("Market_35"), "error");
        this.getAuctionPets();
        return;
      }

      let hash = await Wallet.ETH.buyMarketPet(
        auctor,
        index,
        coinKey,
        data.startTime,
        item.nowPrice
      );
      if (hash) {
        this.$store.commit("globalState/lockBtn", "buyMomoLock");
      }
    },
    //
    async getPetInfo(item) {
      let { auctor, index } = item;
      let data = await Wallet.ETH.getMarketOrder(auctor, index);
      return data;
    },
    //
    async viewAllowance() {
      let coinKey = "BUSD";
      if (this.coinArr[coinKey].allowanceToAuction > 0) return;

      let allowanceToAuction = await Wallet.ETH.viewErcAllowanceToTarget(
        PancakeConfig.SelectCoin[coinKey].addr,
        WalletConfig.ETH.moMoStakeAuction,
        false
      );
      if (allowanceToAuction) {
        this.coinArr[coinKey].allowanceToAuction = Number(allowanceToAuction);
        this.coinArr.ts = new Date().valueOf();
        this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
      }
    },
  },
};
</script>

<style>
#market-quick-buy-dialog .yf-dialog {
  background: #000 !important;
}
</style>
