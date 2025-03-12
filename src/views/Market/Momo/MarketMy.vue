<template>
  <div>
    <div class="tal search vertical-children por mgt-20">
      <div id="market-pet-fitter">
        <div class="dib por cur-point" @click="$refs.bigSell.show()">
          <!-- <span id="shop-car-num" v-if="groupSellCar.length > 0" >{{ groupSellCar.length }}</span> -->
          <img src="@/assets/icon/bigsell_icon.png" alt="" height="40" />
        </div>
        <div class="dib por mgl-10 cur-point" @click="$refs.groupSell.show()">
          <span id="shop-car-num" v-if="groupSellCar.length > 0">{{
            groupSellCar.length
          }}</span>
          <img src="@/assets/icon/group_sell_icon.png" alt="" height="40" />
        </div>
        <div
          class="dib mgl-10 por cur-point"
          @click="oprDialog('pack-sell-dialog', 'block')"
          ref="shopCar"
        >
          <span id="shop-car-num" v-if="getShopCarTotalSelectNum > 0">{{
            getShopCarTotalSelectNum
          }}</span>
          <img src="@/assets/icon/shopcar.png" alt="" height="40" />
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
            <div class="mgt-10">
              <h5>Qualities</h5>
              <div
                @click="onSelectQualityChange(pos)"
                class="filter-select-item"
                :class="{ active: pos == myMarketPetFilter.vType }"
                v-for="(item, pos) in $parent.$parent.selectVType"
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
        <span>{{ $t("Market_33") }}({{ getTotalPetNum }})</span>
        <div class="dib filter-show-group">
          <div class="filter-show-item" v-if="myMarketPetFilter.vType != 0">
            <span class="filter-close" @click="onSelectQualityChange(0)"
              >&times;</span
            >
            <span class="mgl-10">{{
              $parent.$parent.selectVType[myMarketPetFilter.vType]
            }}</span>
          </div>
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

    <div :class="getShowPetArr.length < 4 ? 'tal' : ''" class="momo-content">
      <div class="no-show" v-if="getShowPetArr.length == 0">
        <img src="@/assets/no_items.png" alt="" />
        <p class="opa-6 mgt-10">No items to display</p>
      </div>
      <PetItem
        v-for="item in getShowPetArr"
        :key="item.prototype.toString() + item.tokenId + Math.random()"
        v-bind:data="{ item: item }"
        class="market"
      >
        <div
          style="
            position: absolute;
            width: 100%;
            left: 0px;
            padding: 0px 10px;
            bottom: 0px;
          "
        >
          <div v-if="item.isLock" class="tac">
            <button class="btn-primary disable-btn btn-small">
              <img src="@/assets/icon/lock.png" alt="" height="20" />
            </button>
          </div>
          <div v-else>
            <button
              class="btn-danger btn-small"
              v-if="item.inGroupSellCar"
              @click="$store.commit('marketState/addToGroupSellCar', item)"
            >
              {{ $t("Market_67") }}
            </button>
            <template v-else>
              <button
                class="btn-primary btn-small"
                v-if="
                  (item.vType <= 3 && getSelectNum(item.prototype) == 0) ||
                  (item.vType > 3 && item.rent.state == -1)
                "
                @click="$refs.groupSell.editPrice(item)"
              >
                {{ $t("Market_66") }}
              </button>

              <div v-if="item.vType > 3" class="tac dib mgl-5">
                <button
                  v-if="item.rent.state == -1"
                  class="btn-primary btn-small"
                  @click="set721Price(item)"
                >
                  <span>{{ $t("Market_02") }}</span>
                </button>
                <span v-if="item.rent.state == 0" class="dib mgt-10">{{
                  $t("Hire_06")
                }}</span>
                <span v-if="item.rent.state == 1" class="dib mgt-10">{{
                  $t("Hire_07")
                }}</span>
              </div>

              <div class="tac dib mgl-5" v-if="item.vType <= 3">
                <SelectNum
                  :maxNum="item.num"
                  v-show="getSelectNum(item.prototype) > 0"
                  :defaultNum="getSelectNum(item.prototype)"
                  :data="item"
                  :onChange="onNumChange"
                />
                <button
                  class="btn-primary btn-small"
                  @click="sell1155Direct(item)"
                  v-show="getSelectNum(item.prototype) == 0"
                >
                  <span>{{ $t("Market_57") }}</span>
                </button>
                <button
                  class="btn-primary btn-small mgl-5"
                  @click="onNumChange(item, 1, $event)"
                  v-show="getSelectNum(item.prototype) == 0"
                >
                  <span>{{ $t("Market_08") }}</span>
                </button>
              </div>
            </template>
          </div>
        </div>
      </PetItem>
    </div>

    <div
      style="margin-top: 30px"
      v-if="Math.ceil(this.myNFT_stake.length / onePageCount) > 1"
    >
      <Page
        ref="page"
        :defaultPage="pageNum"
        :totalPage="getTotalPage"
        :onChange="onPageChange"
        v-show="getTotalPage > 1"
      />
    </div>

    <Dialog id="pack-sell-dialog" :top="20" :width="500">
      <h2>{{ $t("Market_08") }}</h2>
      <div class="por tal mgt-10">
        <p class="opa-6">{{ $t("Market_15") }}</p>
        <p
          class="cur-point vertical-children"
          style="position: absolute; right: 0px; top: 0px"
          @click="shopCar = []"
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
      <div class="dialog-content mgt-10" id="shop-car-content">
        <div
          v-for="item in shopCar"
          :key="item.prototype"
          :class="'pet_hover_lv' + item.vType"
          class="shop-car-item vertical-children por mgt-10"
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
          </div>
          <div class="dib small mgl-5">
            <p class="vertical-children">
              <img src="@/assets/icon/airdrop.png" width="20" alt="" />
              <span class="mgl-5 color-w" style="font-size: 18px">
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
              <span class="mgl-5"> {{ $t(item.tokenName) }} </span>
            </p>
          </div>
          <div class="absolute-r tar" style="right: 20px; top: 5px">
            <span class="small">{{ $t("Market_39") }}</span>
            <p class="vertical-children mgt-5">
              <img src="@/assets/coin/USDT.png" height="25" alt="" />
              <span style="font-size: 16px" class="color-w mgl-5">{{
                item.sellPrice
              }}</span
              >&nbsp;
              <img
                @click="edit1155Price(item)"
                class="mgl-5 cur-point"
                src="@/assets/icon/edit.png"
                height="24"
                alt=""
              />
            </p>
            <p class="mgt-5">
              <SelectNum
                :scale="0.8"
                :maxNum="item.num"
                :defaultNum="item.sellNum"
                :data="item"
                :onChange="onNumChange"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="vertical-children por mgt-10 tal" style="height: 50px">
        <div class="dib por">
          <span id="shop-car-num" v-if="getShopCarTotalSelectNum > 0">{{
            getShopCarTotalSelectNum
          }}</span>
          <img src="@/assets/icon/shopcar.png" alt="" height="40" />
        </div>

        <div class="dib tal" style="margin-left: 12px">
          <span class="small opa-6">{{ $t("Market_18") }}</span>
          <p class="vertical-children mgt-5">
            <img src="@/assets/coin/USDT.png" height="25" alt="" />
            <span style="font-size: 20px" class="color-w mgl-5"
              >{{ getShopCarTotalPrice }}
              <small style="font-size: 12px">USDT</small></span
            >
          </p>
          <button
            @click="confirmSellShopCar"
            :class="`btn-primary  ${shopCar.length == 0 ? 'disable-btn' : ''}`"
            style="position: absolute; right: 0px; top: 10px"
          >
            {{ $t("Market_19") }}
          </button>
        </div>
      </div>
    </Dialog>
    <Dialog id="set-price-dialog" :top="200" :width="400">
      <h2 class="mgt-10">{{ $t("Market_38") }}</h2>
      <div class="mgt-20">
        <div class="ly-input-content mgt-10">
          <p class="small tal opa-6">{{ $t("Market_39") }}</p>
          <div class="por mgt-5">
            <div class="ly-input-pre-icon">
              <img src="@/assets/coin/USDT.png" alt="" />
            </div>
            <input
              v-model="inputPrice"
              class="ly-input"
              type="text"
              style="background: #0f172a; text-align: center; width: 100%"
              :placeholder="$t('Market_38')"
              v-number
            />
          </div>
        </div>
      </div>
      <button
        style="width: 200px"
        :class="`btn-primary mgt-20 ${!inputPrice ? 'disable-btn' : ''}`"
        @click="confirmSetPrice($event)"
      >
        {{ $t("Common_03") }}
      </button>
    </Dialog>
    <Dialog id="confirm-sell-dialog" :top="200" :width="400">
      <h2 class="mgt-10">{{ $t("Market_10") }}</h2>
      <span style="zoom: 0.7">
        <PetItem
          style="margin: 10px 0px"
          v-bind:data="{ item: sellObj.sellData }"
          v-if="sellObj.sellData && sellObj.sellType == '721'"
        ></PetItem>
      </span>
      <div class="mgt-10">
        <Tab
          :list="[$t('Market_36'), $t('Market_37')]"
          style="zoom: 0.8"
          :defaultSelectPos="priceTypePos"
          :onChange="onTabChange"
          ref="priceTypeTab"
          :notice="[]"
        />
        <div class="ly-input-content mgt-10">
          <p class="small tal opa-6">
            {{ priceTypePos == 1 ? $t("Market_11") : $t("Market_17") }} (USDT)
          </p>
          <div class="por mgt-5">
            <div class="ly-input-pre-icon">
              <img src="@/assets/coin/USDT.png" alt="" />
            </div>
            <input
              v-model="sellObj.startPrice"
              class="ly-input sell-input"
              type="text"
              :placeholder="
                priceTypePos == 1 ? $t('Market_11') : $t('Market_17')
              "
              v-number
              data-max="100000000"
            />
          </div>
        </div>
        <div v-if="priceTypePos == 1">
          <div class="ly-input-content mgt-10">
            <p class="small tal opa-6">{{ $t("Market_12") }} (USDT)</p>
            <div class="por mgt-5">
              <div class="ly-input-pre-icon">
                <img src="@/assets/coin/USDT.png" alt="" />
              </div>
              <input
                v-model="sellObj.endPrice"
                class="ly-input sell-input"
                type="text"
                :placeholder="$t('Market_12')"
                v-number
                data-max="100000000"
              />
            </div>
          </div>
          <div class="ly-input-content mgt-10">
            <p class="small tal opa-6">{{ $t("Market_13") }}(≥2)</p>
            <div class="por mgt-5">
              <input
                v-model="sellObj.day"
                class="ly-input sell-input"
                type="text"
                v-int
                :placeholder="$t('Market_13')"
                data-max="1000"
                data-min="2"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="small mgt-10 opa-6"
        v-if="
          Number(sellObj.startPrice) > 0 &&
          Number(sellObj.endPrice) > 0 &&
          priceTypePos == 1
        "
      >
        {{
          $t("Market_14")
            .replace("#0#", sellObj.day)
            .replace("#1#", sellObj.startPrice)
            .replace("#2#", sellObj.endPrice)
        }}
      </div>
      <button
        style="width: 200px"
        class="btn-primary mgt-20"
        :class="
          !(sellObj.day > 1 && sellObj.startPrice > 0) ? 'disable-btn' : ''
        "
        @click="confirmSubmit"
      >
        {{ $t("Common_03") }}
      </button>
    </Dialog>
    <Dialog id="confirm-submit-dialog" :top="200" :width="350">
      <span style="zoom: 0.7">
        <PetItem
          style="margin: 10px 0px"
          v-bind:data="{ item: sellObj.sellData }"
          v-if="sellObj.sellData && sellObj.sellType == '721'"
          class="market"
        >
          <div class="vertical-children mgt-10" style="font-size: 18px">
            <img src="@/assets/coin/USDT.png" alt="" height="20" />&nbsp;
            <span>{{ sellObj.startPrice }} <sub class="small">USDT</sub></span>
          </div>
        </PetItem>
      </span>
      <h4
        class="mgt-10"
        v-html="
          $t('Market_58').replace(
            '#0#',
            `<span style='color: #49c773'>${sellObj.startPrice} USDT</span>`
          )
        "
      ></h4>
      <div class="mgt-30">
        <button
          class="btn-primary"
          @click="oprDialog('confirm-submit-dialog', 'none')"
        >
          {{ $t("Common_04") }}
        </button>
        <button
          class="btn-primary mgl-5"
          @click="
            oprDialog('confirm-submit-dialog', 'none');
            confirmSell();
          "
        >
          {{ $t("Common_03") }}
        </button>
      </div>
    </Dialog>

    <GroupSell ref="groupSell" />
    <BigSell ref="bigSell" />
  </div>
</template>

<script>
import { Page, PetItem, SelectNum, Dialog, Tab } from "@/components";
import { CommonMethod } from "@/mixin";
import { Wallet, Common } from "@/utils";
import { WalletConfig } from "@/config";
import { mapState } from "vuex";
import GroupSell from "./GroupSell";
import BigSell from "./BigSell";
import { BaseConfig } from "@/config";

let timer = null;
export default {
  mixins: [CommonMethod],
  data() {
    return {
      searchWord: "",
      onePageCount: 12,
      inputPrice: "",
      shopCar: [],
      pageNum: 1,
      setPriceItem: {}, //
      sellObj: {
        startPrice: "",
        endPrice: "",
        day: 2,
        sellType: "", //721,shopCar
        sellData: null,
      },
      parabola: null,
      priceTypePos: 0,
    };
  },
  components: { Page, PetItem, SelectNum, Dialog, Tab, GroupSell, BigSell },
  watch: {
    marketTabPos: function () {
      this.initParabola();
    },
  },
  computed: {
    ...mapState({
      marketTabPos: (state) => state.marketState.data.marketTabPos,
      myNFT_stake: (state) => state.ethState.data.myNFT_stake,
      myMarketPetFilter: (state) => state.marketState.data.myMarketPetFilter,
      tempSells: (state) => state.marketState.data.tempSells,
      marketHistory: (state) => state.marketState.data.marketHistory,
      historyNotice: (state) => state.marketState.data.historyNotice,
      lockList: (state) => state.ethState.data.lockList,
      groupSellCar: (state) => state.marketState.data.groupSellCar,
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
    getTotalPetNum: function () {
      let totalPet = 0;
      this.getTotalPet.map((item) => {
        totalPet += Number(item.vType) >= 4 ? 1 : Number(item.num);
      });
      return totalPet;
    },
    getTotalPage() {
      return Math.ceil(this.getTotalPet.length / this.onePageCount);
    },
    //
    getLockTypes() {
      let lockTypes = [];
      this.lockList.map((item) => lockTypes.push(item.prototype));
      return lockTypes;
    },
    getTotalPet() {
      let totalPet = [];

      [...this.myNFT_stake].map((item) => {
        //
        let isMatchCategory =
          this.myMarketPetFilter.category == 0 ||
          this.myMarketPetFilter.category == item.category;
        let isMathVType =
          this.myMarketPetFilter.vType == 0 ||
          this.myMarketPetFilter.vType == item.vType;
        let isMathProto =
          this.myMarketPetFilter.searchProto <= 0 ||
          item.prototype == this.myMarketPetFilter.searchProto;
        if (isMatchCategory && isMathVType && isMathProto) {
          let bookType = item.prototype % (item.vType * 10000);
          item.isLock = this.getLockTypes.indexOf(bookType) != -1;
          totalPet.push(item);
        }
      });

      totalPet.sort((a, b) => b.lvHashrate - a.lvHashrate);

      return totalPet;
    },
    getShowPetArr() {
      return this.getTotalPet
        .filter(
          (item) =>
            this.myMarketPetFilter.searchProto <= 0 ||
            this.myMarketPetFilter.searchProto == item.prototype
        )
        .slice(
          this.onePageCount * (this.pageNum - 1),
          this.onePageCount * this.pageNum
        );
    },
    getShopCarTotalSelectNum() {
      // let retNum = 0;
      // this.shopCar.map((item) => {
      // 	retNum += item.num;
      // });
      return this.shopCar.length;
    },
    //
    getShopCarTotalPrice() {
      let totalPrice = 0;
      this.shopCar.map((item) => {
        totalPrice += item.sellPrice * item.sellNum;
      });
      return this.numFloor(totalPrice + 0.000001, 10000);
    },
  },

  mounted() {
    this.initParabola();

    let searcheItem = BaseConfig.NftCfg[this.myMarketPetFilter.searchProto];
    if (searcheItem) {
      this.setSearchItme({
        realName: this.getLangMap[searcheItem["tokenName"]],
        prototype: searcheItem.prototype,
      });
    }
  },
  beforeDestroy() {
    if (timer) clearInterval(timer);
  },
  methods: {
    setSearchItme(item) {
      if (item.prototype == 0) return;
      this.searchWord = item.realName + ":" + item.prototype;
      this.goSearch();
    },
    goSearch() {
      let prototype = this.searchWord.split(":")[1];
      if (this.searchWord == "") {
        prototype = 0;
      } else {
        if (BaseConfig.NftCfg[prototype] == undefined) return;
      }
      this.$store.commit("marketState/setFilter", {
        filterName: "myMarketPetFilter",
        type: "searchProto",
        value: prototype,
      });
      this.onPageChange(1);
    },
    onTabChange(pos) {
      this.sellObj.endPrice = this.sellObj.startPrice;
      this.priceTypePos = pos;
    },
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
        this.$refs.shopCar,
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

    setPrice() {
      if (this.sellObj.endPrice == "") {
        this.sellObj.endPrice = this.sellObj.startPrice;
      }
    },
    confirmSubmit() {
      let { sellType } = this.sellObj;
      if (sellType == "721") {
        this.oprDialog("confirm-submit-dialog", "block");
      } else {
        this.confirmSell();
      }
    },
    //
    async confirmSell() {
      let { sellType, startPrice, endPrice, day, sellData } = this.sellObj;
      //
      if (!(day > 1 && startPrice > 0)) {
        return;
      }

      if (endPrice == "") endPrice = startPrice;

      let auctionObj = {
        _startPrice: Number(startPrice),
        _endPrice: Number(endPrice),
        _durationDay: Number(day),
        _suggestIndex: 0,
        _tokenId: 0,
        _ids: [],
        _amounts: [],
      };
      if (sellType == "shopCar") {
        sellData.map((item) => {
          auctionObj._ids.push(Number(item.prototype));
          auctionObj._amounts.push(Number(item.sellNum));
        });
      }
      if (sellType == "721") {
        auctionObj._tokenId = Number(sellData.tokenId);
      }
      let suggestIndex = await Wallet.ETH.getSuggestIndex();
      if (suggestIndex == WalletConfig.ETH.MAX_ORDER) {
        this.showNotify(this.$t("Market_28"), "error");
        return;
      }
      auctionObj._suggestIndex = Number(suggestIndex);
      console.log(auctionObj);
      let hash = await Wallet.ETH.createAuction(auctionObj);
      if (hash) {
        await Common.sleep(200);
        this.oprDialog("confirm-sell-dialog", "none");
        this.oprDialog("pack-sell-dialog", "none");
        this.shopCar = [];

        let myAddr = await Wallet.ETH.getAccount();

        //
        let obj = {
          auctor: myAddr,
          durationDays: day,
          endPrice: endPrice * 1e18,
          startPrice: startPrice * 1e18,
          uptime: parseInt(new Date().valueOf() / 1000),
          index: -1,
          tx: hash,
          chain: "bnb",
          list1155: [],
          ids: [],
        };

        if (sellType == "721") {
          obj = { ...obj, ...sellData };
        }
        if (sellType == "shopCar") {
          obj.tokenId = 0;
          obj.ids = [...auctionObj._ids];
          obj.amounts = [...auctionObj._amounts];
        }

        console.log("tempData", obj);
        this.tempSells.unshift(obj);
        this.$store.commit("marketState/setData", {
          tempSells: this.tempSells,
        });
      }
    },
    //
    getSelectNum(prototype) {
      let retNum = 0;
      this.shopCar.map((item) => {
        if (item.prototype == prototype) retNum = item.sellNum;
      });
      return retNum;
    },
    //
    set721Price(item) {
      this.sellObj.sellData = item;
      this.sellObj.sellType = "721";
      this.initSellObjInput();
      this.oprDialog("confirm-sell-dialog", "block");
    },
    //
    sell1155Direct(item) {
      this.sellObj.sellData = [{ prototype: item.prototype, sellNum: 1 }];
      this.sellObj.sellType = "shopCar";
      this.initSellObjInput();
      this.oprDialog("confirm-sell-dialog", "block");
    },
    initSellObjInput() {
      this.sellObj.startPrice = "";
      this.sellObj.endPrice = "";
      this.sellObj.durationDays = 2;
      this.priceTypePos = 0;
      this.$nextTick(() => {
        this.$refs.priceTypeTab.reload();
      });
    },
    //
    setShopCarPrice() {
      this.sellObj.sellData = this.shopCar;
      this.sellObj.sellType = "shopCar";
      this.oprDialog("confirm-sell-dialog", "block");
    },
    //
    edit1155Price(item) {
      this.setPriceItem = item;
      this.inputPrice = item.sellPrice;
      this.oprDialog("set-price-dialog", "block");
    },
    //
    confirmSetPrice(event) {
      if (Number(this.inputPrice) <= 0) return;
      let { vType } = this.setPriceItem;
      //
      if (vType < 4) {
        this.setPriceItem.sellPrice = Number(this.inputPrice);
        if (this.setPriceItem.isFirstAdd) {
          this.setPriceItem.isFirstAdd = false;
          this.shopCar.push(this.setPriceItem);
          this.flyDot(event);
        }
        this.oprDialog("set-price-dialog", "none");
      }
    },
    //
    async onNumChange(obj, addNum, event) {
      let hasPrototype = false;
      let { prototype } = obj;
      this.shopCar.map((item, key) => {
        if (item.prototype == prototype) {
          item.sellNum += addNum;
          if (item.sellNum == 0) {
            this.shopCar.splice(key, 1);
          }
          hasPrototype = true;
        }
      });
      if (!hasPrototype) {
        if (this.shopCar.length >= 6) {
          this.showNotify(this.$t("Market_27"), "error");
          return;
        }
        let shopCarItem = {
          ...obj,
          sellNum: 1,
          sellPrice: "",
          isFirstAdd: true,
        };
        // this.shopCar.push(shopCarItem);
        this.edit1155Price(shopCarItem);
        return;
      }

      //
      if (addNum > 0) {
        this.flyDot(event);
      }
    },

    //
    confirmSellShopCar() {
      //
      let dontSetPrice = false;
      this.shopCar.map((item) => {
        if (item.sellPrice == 0) dontSetPrice = true;
      });
      if (dontSetPrice) {
        this.showNotify(this.$t("Market_29"), "error");
        return;
      }
      //
      this.sellObj.startPrice = this.getShopCarTotalPrice;
      this.sellObj.endPrice = this.getShopCarTotalPrice;
      this.sellObj.day = 2;
      this.sellObj.sellType = "shopCar";
      this.sellObj.sellData = this.shopCar;
      this.setShopCarPrice();
    },
    onSelectQualityChange(pos) {
      this.$store.commit("marketState/setFilter", {
        filterName: "myMarketPetFilter",
        type: "vType",
        value: pos,
      });
      this.onPageChange(1);
    },
    onSelectTypeChange(pos) {
      this.$store.commit("marketState/setFilter", {
        filterName: "myMarketPetFilter",
        type: "category",
        value: pos,
      });
      this.onPageChange(1);
    },
    onPageChange(page) {
      this.pageNum = page;
      this.$nextTick(() => {
        this.$refs.page && this.$refs.page.initPage();
      });
    },
  },
};
</script>

<style scoped>
.quick-buy {
  opacity: 0.6;
  position: absolute;
  bottom: 0px;
  left: 10px;
  width: 30px;
  cursor: pointer;
}
.quick-buy:hover {
  opacity: 1;
}
.sell-input {
  text-align: center;
  width: 100%;
}

#market-pet-fitter {
  position: absolute;
  right: 0px;
  top: -69px !important;
}

@media (max-width: 768px) {
  #shop-car-content {
    max-height: 500px !important;
  }
  #market-pet-fitter {
    zoom: 0.8;
    text-align: right;
    top: -65px !important;
  }
}
#shop-car-content {
  max-height: 690px;
  min-height: 200px;
}
.shop-car-item {
  width: 100%;
  height: 100px;
  border-radius: 20px;
  text-align: left;
}
.shop-car-item .pet-img {
  width: 100px;
  height: 100px;
}
#shop-car-num {
  width: 17px;
  height: 17px;
  background: red;
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  display: inline-block;
  text-align: center;
  line-height: 16px;
  position: absolute;
  top: 0px;
  right: -5px;
}
</style>
