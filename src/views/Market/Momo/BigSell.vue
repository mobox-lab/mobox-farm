<template>
  <section>
    <!-- 选择出售界面 -->
    <Dialog id="big-sell-dialog" :top="20" :width="570">
      <h2>{{ $t("Market_79") }}</h2>
      <div class="tal mgt-10">
        <div
          @click="sellType = 0"
          :class="sellType == 0 ? 'active' : ''"
          class="tab-menu"
        >
          {{ $t("Market_80") }}
        </div>
        <div
          @click="sellType = 1"
          :class="sellType == 1 ? 'active' : ''"
          class="tab-menu"
        >
          {{ $t("Market_81") }}
        </div>
      </div>
      <div class="tab-panel" style="background: #1f242c; padding: 20px">
        <div class="aveage-box">
          <p class="tal small">{{ $t("Market_82") }}{{ getTotalSelectNum }}</p>
          <div class="tar" style="zoom: 0.8">
            <div class="dib sort-btn" @click="sort = -sort">
              <svg viewBox="0 0 1024 1024" version="1.1" width="20" height="20">
                <path
                  d="M600.436364 60.509091v907.636364c0 27.927273 18.618182 46.545455 46.545454 46.545454s46.545455-18.618182 46.545455-46.545454V158.254545l116.363636 93.09091c18.618182 18.618182 51.2 13.963636 65.163636-4.654546 18.618182-18.618182 13.963636-51.2-4.654545-65.163636L679.563636 23.272727c-32.581818-27.927273-79.127273-4.654545-79.127272 37.236364zM377.018182 9.309091c-27.927273 0-46.545455 18.618182-46.545455 46.545454v809.89091l-116.363636-93.09091c-18.618182-18.618182-51.2-13.963636-65.163636 4.654546-18.618182 18.618182-13.963636 51.2 4.654545 65.163636l190.836364 158.254546c32.581818 23.272727 74.472727 4.654545 74.472727-37.236364V55.854545c4.654545-23.272727-18.618182-46.545455-41.890909-46.545454z"
                  fill="#838689"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="tab-panel momo-c mgt-10 tal">
          <PetItemSmall
            v-for="item in getShowMoMoList"
            :key="item.tokenId"
            v-bind:data="item"
            v-bind:selectProtoTypes="selectProtoTypes"
            :onSelectChange="onSelectChange"
          />
        </div>
        <div class="tal mgt-10 small opa-6" v-html="$t('Market_83')"></div>
        <button
          class="btn-primary mgt-30"
          style="min-width: 160px"
          :class="{ 'disable-btn': getTotalSelectNum < 3 }"
          @click="goSetPrice"
        >
          {{ $t("Market_84") }}
        </button>
      </div>
    </Dialog>
    <!-- 出售价格预览 -->
    <Dialog id="big-sell-set-price-dialog" :top="20" :width="570">
      <h2>{{ sellType == 0 ? $t("Market_80") : $t("Market_81") }}</h2>
      <div class="por tal mgt-10">
        <p class="opa-6">{{ $t("Market_15") }}</p>
        <p
          class="cur-point vertical-children"
          style="position: absolute; right: 0px; top: 0px"
          @click="initSelectData()"
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
      <div class="dialog-content momo-c mgt-10 tal">
        <div
          v-for="item in selectItems"
          :key="item.prototype + item.tokenId"
          :class="'pet_hover_lv' + item.vType"
          class="shop-car-item vertical-children por mgt-10 por"
        >
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
            <img
              style="position: absolute; bottom: 10px; left: 10px"
              v-if="item.hasGem"
              src="@/assets/icon/hasgem.png"
              height="20"
              alt=""
            />
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
          <div class="dib mgl-5" style="zoom: 0.7" v-if="sellType == 1">
            <div
              class="momo-tab"
              v-for="item2 in item.show_1155"
              :key="item2"
              :class="`pet-min-type` + parseInt(item2 / 1e4)"
            >
              <img
                :src="require(`@/assets/pet/${item2}.png`)"
                alt=""
                width="100%"
              />
            </div>
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
                :src="
                  require(`@/assets/icon/${category_img[item.category]}.png`)
                "
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
            style="right: 10px; top: auto; bottom: 20px"
          >
            <p
              class="vertical-children dib"
              style="
                background: rgba(0, 0, 0, 0.3);
                border-radius: 50px;
                padding: 3px 15px;
              "
            >
              <img src="@/assets/coin/USDT.png" height="20" alt="" />
              <span style="font-size: 16px" class="color-w mgl-5">{{
                item.sellPrice || "--"
              }}</span
              >&nbsp;
            </p>
            <img
              @click="editPrice(item)"
              class="mgl-5 cur-point"
              src="@/assets/icon/edit.png"
              height="24"
              alt=""
            />
          </div>
          <div
            @click="onSelectChange(item)"
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
      <div class="vertical-children mgt-20 tal">
        <span class="small opa-6">{{ $t("Market_18") }}</span>
        <img class="mgl-5" src="@/assets/coin/USDT.png" alt="" height="20" />
        <h3 class="mgl-5 bold2 dib">
          {{ getTotalPrice.toLocaleString() }} <sub class="opa-6">USDT</sub>
        </h3>
      </div>
      <div class="mgt-30">
        <button
          class="btn-default"
          @click="
            oprDialog('big-sell-dialog', 'block');
            oprDialog('big-sell-set-price-dialog', 'none');
          "
        >
          {{ $t("Market_86") }}
        </button>
        <button class="btn-primary mgl-20" @click="checkProps()">
          {{ $t("Market_87") }}({{ selectItems.length - unSetPriceCount }}/{{
            selectItems.length
          }})
        </button>
      </div>
      <div class="mgt-10"></div>
    </Dialog>
    <!-- 设置出售价格 -->
    <Dialog id="set-one-price-dialog" :top="20" :width="400">
      <h2 class="mgt-10">{{ $t("Market_10") }}</h2>
      <span style="zoom: 0.7" v-if="setPriceItem.tokenId != undefined">
        <PetItem
          style="margin: 10px 0px"
          v-bind:data="{ item: setPriceItem }"
        ></PetItem>
      </span>
      <div class="mgt-10">
        <div class="ly-input-content mgt-10">
          <p class="small tal opa-6">{{ $t("Market_17") }} (USDT)</p>
          <div class="por mgt-5">
            <div class="ly-input-pre-icon">
              <img src="@/assets/coin/USDT.png" alt="" />
            </div>
            <input
              v-model="inputPrice"
              style="width: 100%"
              class="ly-input tac"
              type="text"
              :placeholder="$t('Market_17')"
              v-number
              data-max="100000000"
            />
          </div>
        </div>
      </div>
      <button
        style="width: 200px"
        class="btn-primary mgt-20"
        :class="{ 'disable-btn': Number(inputPrice) <= 0 }"
        @click="confirmSetPrice"
      >
        {{ $t("Common_03") }}
      </button>
    </Dialog>
    <!-- 重复确认出售总价 -->
    <Dialog id="re-input-price-dialog" :top="20" :width="400">
      <h2 class="mgt-10">{{ $t("Market_87") }}</h2>
      <h4
        class="mgt-20"
        v-html="
          $t('Market_58').replace(
            '#0#',
            `<span style='color: #49c773'>${getTotalPrice.toLocaleString()} USDT</span>`
          )
        "
      ></h4>
      <input
        v-model="reCheckPrice"
        style="width: 100%"
        class="ly-input tac mgt-20"
        type="text"
        :placeholder="$t('Market_88')"
        v-number
        data-max="100000000"
      />
      <div class="mgt-30">
        <button
          class="btn-default"
          @click="oprDialog('re-input-price-dialog', 'none')"
        >
          {{ $t("Common_04") }}
        </button>
        <button class="btn-primary mgl-20" @click="confirmSell()">
          {{ $t("Common_03") }}
        </button>
      </div>
    </Dialog>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { Dialog, PetItemSmall, PetItem } from "@/components";
import { Common, Wallet } from "@/utils";
import { WalletConfig } from "@/config";

export default {
  components: { Dialog, PetItemSmall, PetItem },
  mixins: [CommonMethod],
  data() {
    return {
      sellType: 0,
      selectProtoTypes: {
        v4: [],
        v4_tokenId: [],
        v4_price: [],
        v5: [],
        v5_tokenId: [],
        v5_price: [],
        v6: [],
        v6_tokenId: [],
        v6_price: [],
        upTs: Date.now(),
      },
      momoData: {},
      sellTypeCfg: {
        0: [3, 20],
        1: [3, 10],
      },
      setPriceItem: {},
      inputPrice: "",
      reCheckPrice: "",
      sort: 1,
    };
  },
  watch: {
    sellType: function () {
      this.initSelectData();
    },
    getShowMoMoList: function () {
      this.setMoMoData();
    },
  },
  computed: {
    ...mapState({
      myNFT_stake: (state) => state.ethState.data.myNFT_stake,
    }),
    getShowMoMoList() {
      if (this.sellType == 0) {
        return this.myNFT_stake
          .filter((momo) => momo.vType >= 4)
          .sort((a, b) => (b.lvHashrate - a.lvHashrate) * this.sort);
      } else {
        let arr = [];
        Common.app.showPowerUpList.map((item) => {
          item.map((item2) => {
            if (item2.vType >= 4) {
              let targetProto = item2.prototype;
              Common.app.getNftVInfo.v4.map((item3) => {
                if (item3.prototype == targetProto) {
                  arr.push(item3);
                }
              });
            }
          });
        });
        return arr.sort((a, b) => (b.lvHashrate - a.lvHashrate) * this.sort);
      }
    },
    getTotalSelectNum() {
      let { v4, v5, v6 } = this.selectProtoTypes;
      return v4.length + v5.length + v6.length;
    },
    selectItems() {
      let {
        v4_tokenId,
        v5_tokenId,
        v6_tokenId,
        v4_price,
        v5_price,
        v6_price,
        upTs,
      } = this.selectProtoTypes;
      let arr = [];
      let allTokenId = [...v6_tokenId, ...v5_tokenId, ...v4_tokenId];
      let allPrice = [...v6_price, ...v5_price, ...v4_price];
      if (this.momoData[allTokenId[0]] == undefined) this.setMoMoData();

      allTokenId.map((item, pos) => {
        let show_1155 = [];
        let mType = this.momoData[item].prototype % 1e4;
        [3, 2, 1].map((item2) => {
          show_1155.push(mType + item2 * 1e4);
        });
        arr.push({
          ...this.momoData[item],
          sellPrice: allPrice[pos],
          upTs,
          show_1155,
        });
      });
      return arr;
    },
    getTotalPrice() {
      let totalPrice = 0;
      this.selectItems.map((item) => {
        totalPrice += Number(item.sellPrice);
      });
      return this.numFloor(totalPrice, 1e2);
    },
    //
    unSetPriceCount() {
      let count = 0;
      this.selectItems.map((item) => {
        if (item.sellPrice == "") count++;
      });
      return count;
    },
  },
  methods: {
    setMoMoData() {
      this.getShowMoMoList.map((item) => {
        item.gems.map((item2) => {
          if (Number(item2) > 0) item.hasGem = true;
        });
        this.momoData[item.tokenId] = item;
      });
    },
    initSelectData() {
      for (const key in this.selectProtoTypes) {
        this.selectProtoTypes[key] = [];
      }
    },
    onSelectChange(item) {
      let { vType, tokenId, prototype } = item;
      let handTokenArr = this.selectProtoTypes["v" + vType + "_tokenId"];
      let handProtoArr = this.selectProtoTypes["v" + vType];
      let handPriceArr = this.selectProtoTypes["v" + vType + "_price"];
      let targetPos = handTokenArr.indexOf(tokenId);
      if (targetPos != -1) {
        handTokenArr.splice(targetPos, 1);
        handProtoArr.splice(targetPos, 1);
        handPriceArr.splice(targetPos, 1);
      } else {
        if (this.getTotalSelectNum >= 10) {
          this.showNotify(this.$t("Market_85"), "error");
          return;
        }
        if (handProtoArr.indexOf(prototype) != -1 && this.sellType == 1) {
          this.showNotify(this.$t("Market_94"), "error");
          return;
        }
        handTokenArr.push(tokenId);
        handProtoArr.push(prototype);
        handPriceArr.push("");
      }
    },
    show() {
      this.oprDialog("big-sell-dialog", "block");
    },
    //
    goSetPrice() {
      if (this.getTotalSelectNum < 3) return;
      this.oprDialog("big-sell-dialog", "none");
      this.oprDialog("big-sell-set-price-dialog", "block");
    },
    //
    editPrice(item) {
      console.log(item);
      this.setPriceItem = item;
      this.inputPrice = item.sellPrice;
      this.oprDialog("set-one-price-dialog", "block");
    },
    //
    confirmSetPrice() {
      if (Number(this.inputPrice) <= 0) return;
      let { vType, tokenId } = this.setPriceItem;
      let pos =
        this.selectProtoTypes["v" + vType + "_tokenId"].indexOf(tokenId);
      this.selectProtoTypes["v" + vType + "_price"][pos] = Number(
        this.inputPrice
      );
      this.selectProtoTypes.upTs = Date.now();
      this.oprDialog("set-one-price-dialog", "none");
    },
    //
    checkProps() {
      if (this.selectItems.length < 3) {
        this.showNotify(this.$t("Market_95"), "error");
        return;
      }
      if (this.unSetPriceCount > 0) {
        this.showNotify(this.$t("Market_96") + this.unSetPriceCount, "error");
        return;
      }
      this.oprDialog("re-input-price-dialog", "block");
    },
    //
    async confirmSell() {
      //
      if (Number(this.reCheckPrice) != Number(this.getTotalPrice)) {
        this.showNotify(this.$t("Market_97"), "error");
        return;
      }
      //
      if (Number(this.reCheckPrice) < 1) {
        this.showNotify(this.$t("Market_98"), "error");
        return;
      }
      this.oprDialog("re-input-price-dialog", "none");

      let suggestIndex_ = await Wallet.ETH.getSuggestIndex();
      if (suggestIndex_ == WalletConfig.ETH.MAX_ORDER) {
        this.showNotify(this.$t("Market_28"), "error");
        return;
      }
      let { v4_tokenId, v5_tokenId, v6_tokenId } = this.selectProtoTypes;

      let tokenIds = [...v4_tokenId, ...v5_tokenId, ...v6_tokenId].sort(
        (a, b) => a - b
      );

      if (tokenIds.length < 3) return;

      let obj = {
        suggestIndex_,
        groupType: this.sellType,
        tokenIds,
        price_: this.getTotalPrice,
      };
      console.log(obj);
      let hash = Wallet.ETH.Group.BigSell.createAuction(obj);
      if (hash) {
        console.log(hash);
        this.reCheckPrice = "";
        this.initSelectData();
        this.oprDialog("big-sell-set-price-dialog", "none");
      }
    },
  },
};
</script>

<style scoped>
.momo-c {
  min-height: 200px;
  max-height: 410px;
  overflow: auto;
}
@media (max-width: 768px) {
  .momo-c {
    max-height: 300px;
  }
  #big-sell-dialog .tab-panel {
    padding: 20px 10px !important;
  }
}
</style>
