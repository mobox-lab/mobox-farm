<template>
  <div>
    <div class="tal search vertical-children por mgt-20">
      <div id="market-pet-fitter">
        <div
          class="cur-point dib por mgl-10"
          @click="getMomoShopCar().show()"
          id="buy-car"
        >
          <span v-if="shopCar.length > 0" class="shop-car-num">{{
            shopCar.length
          }}</span>
          <img src="@/assets/icon/shopCar-buy.png" alt="" height="40" />
        </div>

        <div
          class="dib por mgl-10 por cur-point"
          @click="oprDialog('shop-history-dialog', 'block')"
        >
          <span class="notice" v-if="historyNotice"></span>
          <img src="@/assets/icon/tradeRecord.png" alt="" height="40" />
        </div>

        <div class="dib por mgl-10 filter">
          <img
            src="@/assets/icon/filter_icon.png"
            alt=""
            height="40"
            @click="toggleFilter($refs.filter)"
          />
          <div class="filter-panel hide" ref="filter">
            <!-- 搜索框 -->
            <div>
              <span
                class="search-box dib"
                style="width: 100%; display: inline-flex"
              >
                <div class="dib por" style="flex: 1">
                  <div class="dib por">
                    <input
                      class="ly-input"
                      ref="searchInput"
                      style="
                        padding-right: 30px;
                        width: 100%;
                        border-radius: 50px;
                      "
                      type="text"
                      :placeholder="$t('BOX_17')"
                      v-model="searchWord"
                    />
                    <span
                      v-if="searchWord != ''"
                      style="
                        position: absolute;
                        right: 10px;
                        height: 100%;
                        align-items: center;
                        display: inline-flex;
                        justify-content: center;
                      "
                      class="cur-point opa-6"
                      @click="
                        searchWord = '';
                        goSearch();
                      "
                    >
                      <svg
                        t="1618473937077"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        p-id="1127"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M601.376 512l191.52-191.52c28.096-28.096 30.976-71.168 6.4-95.744s-67.68-21.696-95.744 6.4l-191.52 191.52-191.52-191.52c-28.096-28.096-71.168-30.976-95.744-6.368s-21.696 67.68 6.4 95.744l191.52 191.52-191.52 191.52c-28.096 28.096-30.976 71.168-6.368 95.744s67.68 21.696 95.744-6.4l191.52-191.52 191.52 191.52c28.096 28.096 71.168 30.976 95.744 6.4s21.696-67.68-6.4-95.744l-191.52-191.52z"
                          p-id="1128"
                          fill="#838689"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div
                    class="search-preview"
                    ref="searchPreview"
                    style="margin-bottom: 50px"
                    v-if="getSearchArr.length > 0"
                  >
                    <div
                      class="aveage-box"
                      v-for="item in getSearchArr"
                      :key="item.prototype"
                      @click="setSearchItme(item)"
                    >
                      <div class="tal">
                        <img
                          :src="require(`@/assets/pet/${item.prototype}.png`)"
                          alt=""
                          height="40"
                        />
                      </div>
                      <div
                        class="tar small opa-6"
                        style="flex: 3"
                        :class="'c-lv' + item.vType"
                      >
                        {{ item.realName }}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  class="mgl-10 cur-point"
                  :src="require('@/assets/icon/search.png')"
                  alt=""
                  @click="goSearch"
                />
              </span>
            </div>
            <div class="mgt-20">
              <h5>Qualities</h5>
              <div
                @click="onSelectVTypeChange(pos)"
                class="filter-select-item"
                :class="{ active: pos == marketSearch.vType }"
                v-for="(item, pos) in $parent.$parent.selectVType"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
            <div class="mgt-10">
              <h5>Types</h5>
              <div
                @click="onSelectCategoryChange(pos)"
                class="filter-select-item"
                :class="{ active: pos == marketSearch.category }"
                v-for="(item, pos) in categorySelect"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
            <div class="mgt-20">
              <h5>Others</h5>
              <div
                @click="onSortChange(pos)"
                class="filter-select-item"
                :class="{ active: pos == marketSearch.sort }"
                v-for="(item, pos) in sortArr"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
            <div class="mgt-30 tac" @click="toggleFilter($refs.filter)">
              <button class="btn-primary" style="width: 80%">
                {{ $t("Common_03") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="vertical-children dib">
        <span>{{ $t("Market_33") }}({{ marketPets.total }})</span>
        <div class="dib filter-show-group">
          <div class="filter-show-item" v-if="marketSearch.vType != 0">
            <span class="filter-close" @click="onSelectVTypeChange(0)"
              >&times;</span
            >
            <span class="mgl-10">{{
              $parent.$parent.selectVType[marketSearch.vType]
            }}</span>
          </div>
          <div class="filter-show-item" v-if="marketSearch.category != 0">
            <span class="filter-close" @click="onSelectCategoryChange(0)"
              >&times;</span
            >
            <span class="mgl-10">{{
              categorySelect[marketSearch.category]
            }}</span>
          </div>
          <div class="filter-show-item" v-if="marketSearch.sort != 0">
            <span class="filter-close" @click="onSortChange(0)">&times;</span>
            <span class="mgl-10">{{ sortArr[marketSearch.sort] }}</span>
          </div>
          <div class="filter-show-item" v-if="searchWord != ''">
            <span
              class="filter-close"
              @click="
                searchWord = '';
                goSearch();
              "
              >&times;</span
            >
            <span class="mgl-10">{{ searchWord }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="marketPets.list.length < 4 ? 'tal' : ''"
      class="vertical-children momo-content"
      style="min-height: 500px"
    >
      <div class="no-show" v-if="marketPets.list.length == 0">
        <img src="@/assets/no_items.png" alt="" />
        <p class="opa-6 mgt-10">No items to display</p>
      </div>
      <a
        @click="$router.push({ path: `/auctionView/${item.tx}` })"
        v-for="item in marketPets.list"
        :key="item.tx + item.index"
      >
        <PetItem
          v-bind:data="{ item: item }"
          :class="{ 'opa-6': nowTs - item.uptime <= 120 }"
          class="market por"
          v-if="item.tokenId != 0"
          :isShowHashrateIcon="true"
        >
          <div class="vertical-children mgt-10" style="font-size: 18px">
            <img src="@/assets/coin/USDT.png" alt="" height="20" />&nbsp;
            <span class="money"
              >{{ numFloor(item.nowPrice / 1e9, 100).toLocaleString() }}
              <sub class="small">USDT</sub></span
            >
          </div>
          <div
            v-if="nowTs - item.uptime <= 120"
            class="mgt-10 small"
            style="
              position: absolute;
              right: 15px;
              top: -100px;
              transform: translateY(-50%);
            "
          >
            <p class="small">
              {{ $t("Market_30") }}<span class="dotting"></span>
            </p>
            <p>{{ getLeftTime(Number(item.uptime) + 120 - nowTs) }}</p>
          </div>
          <div v-else style="position: absolute; right: 10px; bottom: 0px">
            <img
              src="@/assets/icon/inshopcar.png"
              v-if="isInShopCar(item)"
              @click.stop="addToShopCar(item, $event, true)"
              alt=""
              height="40"
            />
            <img
              src="@/assets/icon/add2shopcar.png"
              v-else
              @click.stop="addToShopCar(item, $event, false)"
              alt=""
              height="40"
            />
          </div>
        </PetItem>
        <PetItemScroll
          v-bind:data="{ item: item }"
          :class="{ 'opa-6': nowTs - item.uptime <= 120 }"
          class="market"
          v-if="item.tokenId == 0"
        >
          <div class="vertical-children mgt-10" style="font-size: 18px">
            <img src="@/assets/coin/USDT.png" alt="" height="20" />&nbsp;
            <span class="money"
              >{{ numFloor(item.nowPrice / 1e9, 100).toLocaleString() }}
              <sub class="small">USDT</sub></span
            >
          </div>
          <div
            v-if="nowTs - item.uptime <= 120"
            class="mgt-10 small"
            style="
              position: absolute;
              right: 15px;
              top: -100px;
              transform: translateY(-50%);
            "
          >
            <p class="small">
              {{ $t("Market_30") }}<span class="dotting"></span>
            </p>
            <p>{{ getLeftTime(Number(item.uptime) + 120 - nowTs) }}</p>
          </div>
          <div v-else style="position: absolute; right: 10px; bottom: 0px">
            <template v-if="item.ids.length <= 1">
              <img
                src="@/assets/icon/inshopcar.png"
                v-if="isInShopCar(item)"
                @click.stop="addToShopCar(item, $event, true)"
                alt=""
                height="40"
              />
              <img
                src="@/assets/icon/add2shopcar.png"
                v-else
                @click.stop="addToShopCar(item, $event, false)"
                alt=""
                height="40"
              />
            </template>
          </div>
        </PetItemScroll>
      </a>
    </div>

    <div style="margin-top: 30px">
      <Page
        ref="page"
        :defaultPage="this.marketPage"
        :totalPage="Math.ceil(marketPets.total / onePageCount)"
        :onChange="onPageChange"
        v-show="Math.ceil(marketPets.total / onePageCount) > 1"
      />
    </div>
  </div>
</template>

<script>
import { Page, PetItem, PetItemScroll } from "@/components";
import { CommonMethod } from "@/mixin";
import { Http, Wallet } from "@/utils";
import { BaseConfig } from "@/config";
import { mapState } from "vuex";

let timer = null;
export default {
  mixins: [CommonMethod],
  components: { Page, PetItem, PetItemScroll },
  data() {
    return {
      onePageCount: 12,
      selectCategory: [],
      selectVType: [],
      sortArr: [
        this.$t("Market_47"),
        this.$t("Market_04"),
        this.$t("Market_05"),
        this.$t("Market_06"),
        this.$t("Market_07"),
      ],
      searchWord: "",
      parabola: null,
    };
  },
  computed: {
    ...mapState({
      marketPets: (state) => state.marketState.data.marketPets,
      marketPage: (state) => state.marketState.data.marketPage,
      marketSearch: (state) => state.marketState.data.marketSearch,
      momoNameObjs: (state) => state.marketState.data.momoNameObjs,
      momoGemsObjs: (state) => state.marketState.data.momoGemsObjs,
      marketLoading: (state) => state.marketState.data.marketLoading,
      historyNotice: (state) => state.marketState.data.historyNotice,
      nowTs: (state) => state.globalState.data.nowTs,
      shopCar: (state) => state.marketState.data.shopCar,
      marketTabPos: (state) => state.marketState.data.marketTabPos,
    }),
    getLangMap() {
      let langToName = {};
      let nftConfig = BaseConfig.NftCfg;
      for (let key in nftConfig) {
        let item = nftConfig[key];
        langToName[item.tokenName] = this.$t(item.tokenName);
      }
      return langToName;
    },
    getSearchArr() {
      let retArr = [];
      let searchWord = this.searchWord;
      if (searchWord == "") return retArr;
      let nftConfig = BaseConfig.NftCfg;
      let langMap = this.getLangMap;
      for (let key in nftConfig) {
        let item = nftConfig[key];
        let realName = langMap[item.tokenName];
        if (
          realName.toLowerCase().indexOf(searchWord.toLowerCase()) != -1 ||
          item.cnName.toLowerCase().indexOf(searchWord.toLowerCase()) != -1
        ) {
          item.realName = realName;
          item.vType = parseInt(item.prototype / 1e4);
          retArr.push(item);
        }
      }
      return retArr.reverse();
    },
  },
  created() {
    let searcheItem = BaseConfig.NftCfg[this.marketSearch.pType];
    if (searcheItem) {
      this.setSearchItme({
        realName: this.getLangMap[searcheItem["tokenName"]],
        prototype: searcheItem.prototype,
      });
    }
    this.getAuctionPets(this.marketPage, true);
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      this.getAuctionPets(this.marketPage);
    }, 10000);
  },
  watch: {
    marketTabPos: function () {
      this.initParabola();
    },
  },
  mounted() {
    this.initParabola();
    if (document.body.clientWidth > 1000) {
      window.$(this.$refs.searchInput).blur(() => {
        let t = setTimeout(() => {
          clearTimeout(t);
          window.$(this.$refs.searchPreview).hide();
        }, 300);
      });
      window.$(this.$refs.searchInput).focus(() => {
        window.$(this.$refs.searchPreview).show();
      });
    }
  },
  beforeDestroy() {
    if (timer) clearInterval(timer);
  },

  methods: {
    flyDot(event) {
      let eleFlyElement = document.getElementById("fly-dot");
      let scrollLeft =
          document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
      eleFlyElement.style.left = event.clientX + scrollLeft + "px";
      eleFlyElement.style.top = event.clientY + scrollTop + "px";
      eleFlyElement.style.display = "block";
      eleFlyElement.style.visibility = "visible";
      this.parabola.position().move();
    },
    initParabola() {
      this.parabola = window.funParabola(
        document.getElementById("fly-dot"),
        document.getElementById("buy-car"),
        {
          speed: 1000,
          curvature: 0.0008,
          complete: function () {
            document.getElementById("fly-dot").style.display = "none";
          },
        }
      );
      this.parabola.init();
    },
    isInShopCar(testItem) {
      let isInShopCar = false;
      this.shopCar.map((item) => {
        if (item.tx == testItem.tx) isInShopCar = true;
      });
      return isInShopCar;
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
    async addToShopCar(item, $event, isInShopCar = false) {
      let { auctor, index, uptime } = item;
      if (!isInShopCar) {
        let data = await Wallet.ETH.getMarketOrder(auctor, index);
        if (data.status != 3 || data.startTime != uptime) {
          this.showNotify(this.$t("Market_35"), "error");
          return;
        }
        this.flyDot($event);
      }
      this.$store.commit("marketState/addToShopCar", {
        ...item,
        ...this.getShowList(item)[0],
      });
    },
    goSearch() {
      let prototype = this.searchWord.split(":")[1];
      if (this.searchWord == "") {
        prototype = 0;
      } else {
        if (BaseConfig.NftCfg[prototype] == undefined) return;
      }
      this.$store.commit("marketState/setFilter", {
        filterName: "marketSearch",
        type: "pType",
        value: prototype,
        marketPage: 1,
      });
      this.$nextTick(() => {
        this.getAuctionPets(this.marketPage, true);
      });
    },
    setSearchItme(item) {
      if (item.prototype == 0) return;
      this.searchWord = item.realName + ":" + item.prototype;
      this.goSearch();
    },
    //
    async getAuctionPets(page, needLoading = false) {
      if (needLoading)
        this.$store.commit("marketState/setData", { marketLoading: true });
      let data = await Http.getAuctionList(
        "BNB",
        page,
        this.onePageCount,
        this.marketSearch
      );
      this.$store.commit("marketState/setData", { marketLoading: false });
      let needGetNameArr = [];
      let needGetGemArr = [];
      data.list.map((item) => {
        if (item.tokenId != 0) {
          let { tokenName } = BaseConfig.NftCfg[item.prototype];
          item.tokenName = this.momoNameObjs[item.tokenId] || tokenName;
          item.gems = this.momoGemsObjs[item.tokenId] || [0, 0, 0, 0];
          item.vType = parseInt(item.prototype / 1e4);
          if (item.specialty == 1 || item.specialty == 3) {
            needGetNameArr.push(item.tokenId);
          }
          needGetGemArr.push(Number(item.tokenId));
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
        item.nowPrice = nowPrice;
        item.tx = item.tx.toString() + item.auctor.toString() + item.index;
      });
      this.$store.commit("marketState/setData", { marketPets: data });

      this.$nextTick(async () => {
        await this.getMomoGem(needGetGemArr);
        await this.getMomoName(needGetNameArr);
      });
    },
    async getMomoName(needGetNameArr) {
      let fitterArr = [];
      //
      needGetNameArr.map((item) => {
        if (!Object.prototype.hasOwnProperty.call(this.momoNameObjs, item)) {
          fitterArr.push(item);
        }
      });
      if (fitterArr.length != 0) {
        //
        let names = await Wallet.ETH.getMomoNamesByTokenIds(fitterArr);
        if (names != "") {
          fitterArr.map((item, index) => {
            this.momoNameObjs[item] = names[index];
          });
        }
      }
      this.marketPets.list.map((item) => {
        item.tokenName = this.momoNameObjs[item.tokenId] || item.tokenName;
      });
      this.$store.commit("marketState/setData", {
        marketPets: this.marketPets,
        momoNameObjs: this.momoNameObjs,
      });
    },
    async getMomoGem(needGetGemArr) {
      let fitterArr = [];
      needGetGemArr.map((item) => {
        fitterArr.push(item);
      });

      if (fitterArr.length != 0) {
        let gems = await Wallet.ETH.getBatchInlayInfo(fitterArr);
        if (gems) {
          fitterArr.map((item, index) => {
            this.momoGemsObjs[item] = [...gems[index]];
          });
        }
      }

      this.marketPets.list.map((item) => {
        item.gems = this.momoGemsObjs[item.tokenId] || [0, 0, 0, 0];
      });
      this.$store.commit("marketState/setData", {
        marketPets: this.marketPets,
        momoGemsObjs: this.momoGemsObjs,
      });
    },
    onPageChange(page) {
      if (page == this.marketPage) return;
      this.marketPets.list = [];
      this.$store.commit("marketState/setData", {
        marketPage: page,
        marketPets: this.marketPets,
      });
      this.$nextTick(() => {
        this.getAuctionPets(this.marketPage, true);
      });
    },
    onSelectCategoryChange(pos) {
      this.marketPets.list = [];
      this.$store.commit("marketState/setData", {
        marketPage: 1,
        marketPets: this.marketPets,
      });
      this.$store.commit("marketState/setFilter", {
        filterName: "marketSearch",
        type: "category",
        value: pos,
      });
      this.$nextTick(() => {
        this.getAuctionPets(this.marketPage, true);
        this.$refs.page && this.$refs.page.initPage();
      });
    },
    onSelectVTypeChange(pos) {
      this.marketPets.list = [];
      this.$store.commit("marketState/setData", {
        marketPage: 1,
        marketPets: this.marketPets,
      });
      this.$store.commit("marketState/setFilter", {
        filterName: "marketSearch",
        type: "vType",
        value: pos,
      });
      this.$nextTick(() => {
        this.getAuctionPets(this.marketPage, true);
        this.$refs.page && this.$refs.page.initPage();
      });
    },
    onSortChange(pos) {
      this.marketPets.list = [];
      this.$store.commit("marketState/setData", {
        marketPage: 1,
        marketPets: this.marketPets,
      });
      this.$store.commit("marketState/setFilter", {
        filterName: "marketSearch",
        type: "sort",
        value: pos,
      });
      this.$nextTick(() => {
        this.getAuctionPets(this.marketPage, true);
        this.$refs.page && this.$refs.page.initPage();
      });
    },
  },
};
</script>

<style lang="less" scoped>
#market-pet-fitter {
  position: absolute;
  right: 0px;
  top: -69px !important;
}

@media (max-width: 768px) {
  #busd {
    margin-top: 10px !important;
    margin-left: 0px !important;
    position: absolute;
    right: 0px;
    top: 40px;
  }

  #market-pet-fitter {
    zoom: 0.8;
    text-align: right;
    top: -65px !important;
  }
  .visiable-xs {
    display: inline-block !important;
  }
}
</style>
