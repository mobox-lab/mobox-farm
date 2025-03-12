<template>
  <div id="big-sell-view" style="margin-top: 10px">
    <router-link to="/market">
      <span class="cur-point text-big">
        <span class="dib" style="transform: rotate(90deg)">▼</span>&nbsp;{{
          $t("MOMO_19")
        }}
      </span>
    </router-link>

    <div class="tac row mgt-10">
      <!-- Left -->
      <div class="col-md-6">
        <div class="panel tal">
          <p v-if="hasOwn" style="color: red" class="tar">
            *{{ $t("Market_99") }}
          </p>
          <div
            v-for="item in getShowList"
            :key="item.prototype"
            :class="'pet_hover_lv' + getVType(item.prototype)"
            class="shop-car-item vertical-children por mgt-10 por"
          >
            <img
              v-if="!isMeetStandards(item)"
              src="@/assets/icon/warning-icon.png"
              class="tip-icon"
              @click="standardsHashrateTip(item)"
            />
            <div class="dib por">
              <p
                class="vertical-children small momo-tab-hash"
                v-if="item.level > 1 && getNowPetItem.type == 0"
                style="
                  transform: translateX(-50%);
                  left: 50%;
                  z-index: 99;
                  position: absolute;
                  top: 5px;
                  background: rgba(0, 0, 0, 0.5);
                  border-radius: 30px;
                  padding: 0px 5px;
                  white-space: nowrap;
                "
              >
                <img src="@/assets/icon/airdrop.png" width="10" alt="" />&nbsp;
                <span :class="getHashrateColor(item)">{{ item.hashrate }}</span>
              </p>
              <img
                :src="require(`@/assets/pet/${item.prototype}.png`)"
                alt=""
                width="100"
                height="100"
                v-if="getNowPetItem.type == 0"
              />
            </div>
            <div
              class="dib mgl-5"
              style="width: 120px; padding: 10px"
              v-if="getNowPetItem.type == 1"
            >
              <div
                class="momo-tab momo-tab-min-type4 dib por"
                style="margin: 3px"
              >
                <p
                  class="vertical-children small momo-tab-hash"
                  v-if="item.level > 1"
                  style="
                    transform: translateX(-50%);
                    left: 50%;
                    trz-index: 99;
                    position: absolute;
                    top: -16px;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 30px;
                    padding: 0px 5px;
                    white-space: nowrap;
                  "
                >
                  <img
                    src="@/assets/icon/airdrop.png"
                    width="10"
                    alt=""
                  />&nbsp;
                  <span :class="getHashrateColor(item)">{{
                    item.hashrate
                  }}</span>
                </p>
                <img
                  class="momo-tab-img"
                  :src="require(`@/assets/pet/${item.prototype}.png`)"
                  alt=""
                  width="100%"
                />
              </div>
              <div
                class="momo-tab dib"
                style="margin: 3px"
                v-for="item2 in item.show_1155"
                :key="item2"
                :class="`momo-tab-min-type` + parseInt(item2 / 1e4)"
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
                <img
                  :src="require(`@/assets/icon/bnb.png`)"
                  width="12"
                  alt=""
                />
                <span class="mgl-5"> {{ $t(item.tokenName) }} </span>
              </p>
            </div>
            <!-- 宝石 -->
            <div class="jewel">
              <div
                v-for="(dPos, index) in [100, 200, 300, 400]"
                :key="JSON.stringify('' + dPos + item.tokenId)"
                class="gem-item-little"
              >
                <img
                  v-if="
                    momoGemsObjs[item.tokenId] == undefined ||
                    momoGemsObjs[item.tokenId][index] == 0
                  "
                  :src="require(`@/assets/market/${dPos + 1}.png`)"
                  class="opa-3 gray"
                  alt=""
                  title="jewel"
                />
                <img
                  v-else
                  :src="
                    require(`@/assets/market/${
                      momoGemsObjs[item.tokenId][index]
                    }.png`)
                  "
                  alt=""
                />
              </div>
            </div>
            <!-- /宝石 -->
            <!-- 是否已拥有 -->
            <div class="has-own" v-if="item.hasOwn">Own</div>
          </div>
        </div>
      </div>
      <!-- Right -->
      <div class="col-md-6 tal">
        <div class="panel vertical-children">
          <!-- 出售价格 -->
          <h3>{{ $t("Market_17") }}</h3>
          <div class="tac">
            <div id="price" class="vertical-children">
              <img
                :src="require(`@/assets/coin/USDT.png`)"
                height="25"
                alt=""
              />&nbsp;
              <span class="money">{{
                numFloor(this.getNowPetItem.price / 1e9, 1e2).toLocaleString()
              }}</span>
            </div>
          </div>
          <div v-if="isMyPet" class="mgt-20 tac">
            <StatuButton
              :onClick="setChangePriceData"
              :isLoading="lockBtn.changePriceLock > 0"
              >{{ $t("Market_20") }}</StatuButton
            >&nbsp;&nbsp;
            <button
              class="btn-primary vertical-children mgl-5"
              style="background: #384a7a !important"
              @click="cancelAuction"
            >
              {{ $t("Market_21") }}
            </button>
          </div>
          <div v-else class="mgt-20 tac">
            <div :class="{ 'btn-group': needApprove }" class="dib">
              <div v-if="needApprove">
                <StatuButton
                  data-step="1"
                  style="width: 150px"
                  :isLoading="coinArr['USDT'].isApproving"
                  :onClick="approve"
                  >{{ $t("Air-drop_16") }} USDT</StatuButton
                >
              </div>
              <div class="mgt-10">
                <StatuButton
                  style="width: 150px"
                  data-step="2"
                  :isLoading="lockBtn.buyMomoLock > 0"
                  :isDisable="
                    needApprove || nowTs - this.getNowPetItem.uptime <= 600
                  "
                  :onClick="() => oprDialog('confirm-big-buy-dialog', 'block')"
                >
                  <template v-if="nowTs - this.getNowPetItem.uptime <= 600">
                    <img
                      src="@/assets/icon/lock.png"
                      alt=""
                      height="20"
                      style="position: absolute; left: 10px; top: 6px"
                    />
                    <span>{{
                      getLeftTime(
                        Number(this.getNowPetItem.uptime) + 600 - nowTs
                      )
                    }}</span>
                  </template>
                  <span v-else>{{ $t("Market_22") }}</span>
                </StatuButton>
              </div>
            </div>
          </div>
        </div>
        <div class="panel mgt-20" v-if="!isMyPet">
          <h3>{{ $t("Market_89") }}</h3>
          <div class="mgt-20"></div>
          <div class="aveage-box upgrade-item" v-if="getAddObj.static.dh > 0">
            <!-- {{fixedHashrate.current - fixedHashrate.after}} -->
            <p>{{ $t("Market_90") }}</p>
            <!-- <div class="vertical-children bold2 tar">
                            <span>{{getAddObj.static.now}}</span>
                            <img src="@/assets/icon/upgradejt.png" alt="" class="mgl-5" height="10"/>
                            <span class="mgl-5" >{{getAddObj.static.to}} </span>
                            <span class="color-sell" >(+{{getAddObj.static.dh}})</span>
                        </div> -->
            <div class="vertical-children bold2 tar">
              <span>{{ fixedHashrate.current }}</span>
              <img
                src="@/assets/icon/upgradejt.png"
                alt=""
                class="mgl-5"
                height="10"
              />
              <span class="mgl-5">{{ fixedHashrate.after }} </span>
              <span class="color-sell"
                >(+{{ fixedHashrate.after - fixedHashrate.current }})</span
              >
            </div>
          </div>
          <div
            class="aveage-box upgrade-item"
            v-if="getAddObj.percent.dh != '0%'"
          >
            <p>{{ $t("Market_91") }}</p>
            <div class="vertical-children bold2 tar">
              <span>{{ getAddObj.percent.now }}</span>
              <img
                src="@/assets/icon/upgradejt.png"
                alt=""
                class="mgl-5"
                height="10"
              />
              <span class="mgl-5"
                >{{ isAllMeetStandard ? getAddObj.percent.to : 0 }}
              </span>
              <span class="color-sell"
                >(+{{ isAllMeetStandard ? getAddObj.percent.dh : "0%" }})</span
              >
            </div>
          </div>
          <div class="aveage-box upgrade-item">
            <p>{{ $t("Market_92") }}</p>
            <div class="vertical-children bold2 tar">
              <span>{{ getAddObj.total.now }}</span>
              <img
                src="@/assets/icon/upgradejt.png"
                alt=""
                class="mgl-5"
                height="10"
              />
              <span class="mgl-5"
                >{{ isAllMeetStandard ? getAddObj.total.to : 0 }}
              </span>
              <span class="color-sell" v-if="getAddObj.total.dh > 0"
                >(+{{ isAllMeetStandard ? getAddObj.total.dh : 0 }})</span
              >
            </div>
          </div>
          <div class="aveage-box upgrade-item">
            <p>{{ $t("Market_93") }}</p>
            <div class="vertical-children bold2 tar">
              <span>{{ getAddObj.perPrice }}</span>
              <img
                src="@/assets/coin/USDT.png"
                alt=""
                class="mgl-5"
                height="20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改价格弹窗 -->
    <Dialog id="changePrice-big-dialog" :top="200" :width="400">
      <h2>{{ $t("Market_10") }}</h2>
      <div class="mgt-20">
        <div class="ly-input-content mgt-10">
          <p class="small tal opa-6">{{ $t("Market_17") }} (USDT)</p>
          <div class="por mgt-5">
            <div class="ly-input-pre-icon">
              <img src="@/assets/coin/USDT.png" alt="" />
            </div>
            <input
              v-model="inputPrice"
              class="ly-input sell-input"
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
        :class="{ 'disable-btn': inputPrice == '' }"
        @click="changePrice"
      >
        {{ $t("Common_03") }}
      </button>
    </Dialog>
    <!-- 确认购买弹窗 -->
    <Dialog id="confirm-big-buy-dialog" :top="200" :width="350">
      <h4 class="mgt-30" v-html="message"></h4>
      <div class="mgt-50">
        <button
          class="btn-default"
          @click="oprDialog('confirm-big-buy-dialog', 'none')"
        >
          {{ $t("Common_04") }}
        </button>
        <button
          class="btn-primary mgl-5"
          @click="
            oprDialog('confirm-big-buy-dialog', 'none');
            buyPet();
          "
        >
          {{ $t("Common_03") }}
        </button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import { BaseConfig, PancakeConfig, WalletConfig } from "@/config";
import powerAddConfig from "@/config/PowerAddConfig";
import { StatuButton, Dialog } from "@/components";
import { Wallet, Common } from "@/utils";

export default {
  mixins: [CommonMethod],
  components: { StatuButton, Dialog },
  data() {
    return {
      myAccount: "",
      inputPrice: "",
      momoGemsObjs: {},
    };
  },
  computed: {
    ...mapState({
      hashrateInfo: (state) => state.globalState.hashrateInfo,
      bigSells: (state) => state.momoMarketState.data.bigSells,
      bigSellMy: (state) => state.momoMarketState.data.bigSellMy,
      lockBtn: (state) => state.globalState.data.lockBtn,
      coinArr: (state) => state.bnbState.data.coinArr,
      nowTs: (state) => state.globalState.data.nowTs,
      eth_myHashrate: (state) => state.ethState.data.myHashrate,
      myNFT_wallet: (state) => state.ethState.data.myNFT_wallet,
      myNFT_verse: (state) => state.ethState.data.myNFT_verse,
      myNFT_stake: (state) => state.ethState.data.myNFT_stake,
    }),
    //
    isAllMeetStandard() {
      return this.getShowList.every(this.isMeetStandards);
    },
    //
    message() {
      const status = this.getShowList.map((item) => this.isMeetStandards(item));

      if (status.indexOf(false) === -1) {
        return this.$t("Market_59").replace(
          "#0#",
          `<span style='color: #49c773' class='money'>${this.numFloor(
            this.getNowPetItem.price / 1e9,
            1e2
          ).toLocaleString()} USDT</span>`
        );
      }

      const lvType = this.getVType(this.getShowList[0].prototype);
      const standardsHashrate = this.standardsHashrate(lvType);

      return this.$t("Market_103")
        .replace(
          "#0#",
          `<span style='color: #49c773' class='money'>${standardsHashrate}</span>`
        )
        .replace(
          "#1#",
          `<span style='color: #49c773' class='money'>${this.numFloor(
            this.getNowPetItem.price / 1e9,
            1e2
          ).toLocaleString()} USDT</span>`
        );
    },
    getAddObj() {
      let obj = {
        static: { now: 0, to: 0, dh: 0 },
        percent: { now: 0, to: 0, dh: "0%" },
        total: { now: this.eth_myHashrate, to: 0, dh: 0 },
        perPrice: 0,
      };
      //
      obj.static.now = Common.app.showPowerUpList.length * 300;
      obj.static.to = this.getNewPowerUpList.length * 300;
      obj.static.dh = obj.static.to - obj.static.now;
      //
      obj.percent.now =
        this.numFloor(Common.app.getTotalPercent.maxAdd * 100, 100) + "%";
      obj.percent.to =
        this.numFloor(this.getNewTotalPercent.maxAdd * 100, 100) + "%";
      obj.percent.dh =
        this.numFloor(
          (this.getNewTotalPercent.maxAdd - Common.app.getTotalPercent.maxAdd) *
            100,
          100
        ) + "%";
      //
      obj.total.to = this.getNewTotalPower;
      obj.total.dh = parseInt(this.getNewTotalPower - obj.total.now);
      obj.perPrice = this.numFloor(
        this.numFloor(this.getNowPetItem.price / 1e9, 1e2) / obj.total.dh,
        1e2
      );
      return obj;
    },
    getNewPowerUpList() {
      let showList = [];
      let typeObj = {};
      this.getAddMoMoList.map((item) => {
        if (item.num >= 1) {
          let vType = this.getVType(item.prototype);
          let type = item.prototype % (vType * 10000);
          if (!typeObj[type]) {
            typeObj[type] = {};
          }
          typeObj[type][item.prototype] = item;
        }
      });

      Object.values(typeObj).map((item) => {
        let compList = Object.values(item);
        if (compList.length >= 4) {
          showList.push(compList);
        }
      });

      return showList;
    },
    getAddMoMoList() {
      let addMomo = [...this.getShowList];
      //
      if (this.getNowPetItem.type == 1) {
        this.getShowList.map((item) => {
          item.show_1155.map((pType) => {
            addMomo.push({
              prototype: pType,
              num: 1,
              lvHashrate: this.getVType(pType),
            });
          });
        });
      }
      return [...this.myNFT_stake, ...addMomo];
    },
    getNewTotalPercent() {
      let obj = { maxAdd: 0, v4: -1, v5: -1, v6: -1 };
      let nftInfo = this.getNftVInfo;
      ["v4", "v5", "v6"].map((type) => {
        let targetNum = nftInfo[type].length;
        let nowMax = 0;
        Common.app.powerAddConfig[type].map((item, pos) => {
          if (targetNum >= item.num) {
            obj[type] = pos;
            nowMax = item.p;
          }
        });
        obj.maxAdd += nowMax;
      });
      return obj;
    },
    getNewTotalPower() {
      let totalHash = 0;
      this.getAddMoMoList.map((item) => {
        totalHash += item.lvHashrate * item.num;
      });
      totalHash =
        (totalHash + this.getNewPowerUpList.length * 300) *
        (1 + this.getNewTotalPercent.maxAdd);
      return parseInt(totalHash);
    },
    getOldPower() {
      let totalHash = 0;
      [...this.myNFT_stake].map((item) => {
        totalHash += item.lvHashrate * item.num;
      });
      totalHash =
        (totalHash + Common.app.showPowerUpList.length * 300) *
        (1 + Common.app.getTotalPercent.maxAdd);
      return parseInt(totalHash);
    },
    getNftVInfo() {
      let retObj = {
        v1: [],
        v2: [],
        v3: [],
        v4: [],
        v5: [],
        v6: [],
      };
      this.getAddMoMoList.map((item) => {
        let vType = parseInt(item.prototype / 1e4);
        retObj["v" + vType].push(item);
      });
      return retObj;
    },
    isMyPet() {
      return (
        this.getNowPetItem.auctor.toLocaleLowerCase() ==
        this.myAccount.toLocaleLowerCase()
      );
    },
    getCompProto() {
      let arr = [];
      Common.app.showPowerUpList.map((item) => {
        item.map((item2) => {
          if (item2.vType >= 4) arr.push(item2.prototype);
        });
      });
      return arr;
    },
    getNowPetItem() {
      let petObj;
      let tx = this.$route.params.tx;
      [...this.bigSells.list, ...this.bigSellMy.list].map((item) => {
        if (item.tx == tx) {
          petObj = item;
        }
      });
      if (petObj == undefined) {
        this.$router.replace("/market");
        return;
      }
      if (petObj.oldTime == undefined) {
        petObj.oldTime = petObj.uptime;
      }
      return petObj;
    },
    getShowList() {
      let { tokens } = this.getNowPetItem;
      let arr = [];
      tokens.map((item) => {
        let show_1155 = [];
        let mType = item.prototype % 1e4;
        if (this.getVType(item.prototype) == 4) {
          [3, 2, 1].map((item2) => {
            show_1155.push(mType + item2 * 1e4);
          });
        }
        item.hasOwn =
          this.getCompProto.indexOf(item.prototype.toString()) != -1;
        item.num = 1;
        arr.push({ ...BaseConfig.NftCfg[item.prototype], ...item, show_1155 });
      });
      arr.sort((a, b) => {
        const aHasOwn = a.hasOwn ? 1 : 0;
        const bHasOwn = b.hasOwn ? 1 : 0;
        if (aHasOwn != bHasOwn) {
          return bHasOwn - aHasOwn;
        } else {
          return b.lvHashrate - a.lvHashrate;
        }
      });

      return arr;
    },
    //
    hasOwn() {
      let hasOwn = false;
      this.getShowList.map((item) => {
        if (item.hasOwn) hasOwn = true;
      });
      return hasOwn;
    },
    //
    needApprove() {
      return (
        this.coinArr["USDT"].allowanceToBigAuction / 1e18 <
          Number(this.getNowPetItem.price / 1e9) &&
        this.coinArr["USDT"].allowanceToBigAuction != -1
      );
    },
    //
    fixedHashrate() {
      const momos = [
        ...this.myNFT_wallet,
        ...this.myNFT_verse,
        ...this.myNFT_stake,
      ].filter((item) => {
        return item.location === "stake";
      });

      const value1 = this.analyzeMyMomos(momos);
      const value2 = this.analyzeMyMomos([...momos, ...this.getShowList]);

      return {
        current: value1.fixedHashrate,
        after: value2.fixedHashrate,
      };
    },
    //
    percentage() {
      const momos = [
        ...this.myNFT_wallet,
        ...this.myNFT_verse,
        ...this.myNFT_stake,
      ].filter((item) => {
        return item.location === "stake";
      });
      console.log(momos);
      // return this.getPercentage(this.getNftVInfo);
      return 123;
    },
  },
  watch: {
    getNowPetItem: function () {
      this.getMOMOGem();
    },
  },
  async created() {
    this.getPetInfo();
    this.myAccount = await Wallet.ETH.getAccount();
    //
    await this.viewAllowance();
  },
  methods: {
    getMomoTypes(momos) {
      let retObj = {
        v1: [],
        v2: [],
        v3: [],
        v4: [],
        v5: [],
        v6: [],
      };
      momos.map((item) => {
        let vType = parseInt(item.prototype / 1e4);
        retObj["v" + vType].push(item);
      });
      return retObj;
    },
    //
    getPercentage(momos) {
      const list = ["v4", "v5", "v6"];
      let total = 0;

      for (let item in list) {
        const type = list[item];
        const config = powerAddConfig[type];
        const standardHashrate = this.hashrateInfo[`${type}StandardHashrate`];
        //
        const count = this.getMomoTypes(momos)[type].reduce((data, item) => {
          const hashrate = item.level > 1 ? item.hashrate : item.lvHashrate;

          if (hashrate >= standardHashrate) {
            return data + 1;
          }

          return data;
        }, 0);

        //
        let index;

        //
        if (count >= config[config.length - 1].num) {
          index = config.length - 1;
        } else {
          index = config.findIndex((item) => item.num > count) - 1;
        }

        if (index >= 0) {
          total += config[index].p;
        }
      }

      return total;
    },
    analyzeMyMomos(myMomos) {
      let myMomoData = {
        v4: [],
        v5: [],
        v6: [],
        v3: {},
        v3Amount: 0,
        v2: {},
        v2Amount: 0,
        v1: {},
        v1Amount: 0,
        fixedHashrate: 0, //
        v4Group: {}, //
        v4GroupAmount: 0, //
      };

      let baseHashrate = 0;
      for (let i = 0; i < myMomos.length; ++i) {
        let momo = myMomos[i];
        let vn = Math.floor(momo.prototype / 10000);
        let vObj = myMomoData[`v${vn}`];

        if (vn <= 3) {
          if (vObj[momo.prototype] === undefined) {
            vObj[momo.prototype] = momo;
          } else {
            vObj[momo.prototype].num += momo.num;
          }
          vObj[`v${vn}Amount`] += momo.num;
          baseHashrate += vn * momo.num;
        } else {
          vObj.push(momo);
          baseHashrate += momo.lvHashrate;
        }
      }

      //
      let v4Group = myMomoData.v4Group;

      for (let i = 0; i < myMomoData.v4.length; ++i) {
        let momo = myMomoData.v4[i];
        if (v4Group[momo.prototype] !== undefined) {
          continue;
        }
        if (myMomoData.v3[momo.prototype - 10000] === undefined) {
          continue;
        }
        if (myMomoData.v2[momo.prototype - 20000] === undefined) {
          continue;
        }
        if (myMomoData.v1[momo.prototype - 30000] === undefined) {
          continue;
        }
        v4Group[momo.prototype] = 1;
        myMomoData.v4GroupAmount += 1;
      }

      myMomoData.fixedHashrate = baseHashrate + myMomoData.v4GroupAmount * 300;

      return myMomoData;
    },
    //
    standardsHashrateTip({ prototype }) {
      const lvType = this.getVType(prototype);
      const standardsHashrate = this.standardsHashrate(lvType);
      this.getConfirmDialog().show(
        `${this.$t("MOMO_98")
          .replace("#0#", standardsHashrate)
          .replace("#0#", standardsHashrate)}`
      );
    },
    //
    isMeetStandards(data) {
      const { lvHashrate, hashrate, level, prototype } = data;
      const lvType = this.getVType(prototype);
      const standardsHashrate = this.standardsHashrate(lvType);

      if (lvType < 4) {
        return true;
      }

      if (level > 1) {
        return hashrate >= standardsHashrate;
      }

      return lvHashrate >= standardsHashrate;
    },
    //
    standardsHashrate(lvType) {
      return this.hashrateInfo[`v${lvType}StandardHashrate`];
    },
    //
    async viewAllowance() {
      let coinKey = "USDT";
      if (this.coinArr[coinKey].allowanceToBigAuction > 0) return;

      let allowanceToBigAuction = await Wallet.ETH.viewErcAllowanceToTarget(
        PancakeConfig.SelectCoin[coinKey].addr,
        WalletConfig.ETH.bigSell,
        false
      );
      if (allowanceToBigAuction) {
        this.coinArr[coinKey].allowanceToBigAuction = Number(
          allowanceToBigAuction
        );
        this.coinArr.ts = new Date().valueOf();
        this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
      }
    },
    //
    async approve() {
      let coinKey = "USDT";
      let { isApproving } = this.coinArr[coinKey];
      if (isApproving) return;

      let hash = await Wallet.ETH.approveErcToTarget(
        PancakeConfig.SelectCoin["USDT"].addr,
        WalletConfig.ETH.bigSell,
        { coinKey, type: "allowanceToBigAuction" }
      );
      if (hash) {
        this.coinArr[coinKey].isApproving = true;
      }
    },
    //
    setChangePriceData() {
      let { uptime, price } = this.getNowPetItem;
      let dtTime = parseInt(new Date().valueOf() / 1000) - Number(uptime);
      if (dtTime < 600 && this.isMyPet) {
        this.showNotify(
          this.$t("Market_48").replace("#0#", 600 - dtTime),
          "error"
        );
        return;
      }
      this.inputPrice = this.numFloor(price / 1e9, 1e2);
      this.oprDialog("changePrice-big-dialog", "block");
    },
    //
    async changePrice() {
      let { uptime, index, orderId } = this.getNowPetItem;
      let dtTime = parseInt(new Date().valueOf() / 1000) - Number(uptime);
      if (dtTime < 600) {
        this.showNotify(
          this.$t("Market_48").replace("#0#", 600 - dtTime),
          "error"
        );
        return;
      }
      let data = await this.getPetInfo();
      if (data.status != 3) {
        this.showNotify(this.$t("Market_35"), "error");
        return;
      }
      let sendData = {
        index_: index,
        orderId_: orderId,
        price_: this.inputPrice,
      };
      let hash = await Wallet.ETH.Group.BigSell.changePrice(
        sendData,
        async () => {
          await this.getPetInfo();
          Common.app.unLockBtn("changePriceLock");
        }
      );
      if (hash) {
        this.$store.commit("globalState/lockBtn", "changePriceLock");
        this.oprDialog("changePrice-big-dialog", "none");
      }
    },
    //
    async cancelAuction() {
      let data = await this.getPetInfo();
      if (data.status != 3) {
        this.showNotify(this.$t("Market_35"), "error");
        return;
      }
      let { orderId, index } = this.getNowPetItem;
      let hash = await Wallet.ETH.Group.BigSell.cancelAuction(
        { index_: index, orderId_: orderId },
        () => {
          this.$router.back(-1);
        }
      );
      if (hash) {
        //
        // await Common.sleep(1000);
        // this.$router.back(-1);
      }
    },
    //
    async getPetInfo() {
      let { auctor, index } = this.getNowPetItem;
      let data = await Wallet.ETH.Group.BigSell.getOrder({
        auctor_: auctor,
        index_: index,
      });
      this.getNowPetItem.price = data.price / 1e9;
      this.getNowPetItem.uptime = data.startTime;
      return data;
    },
    //
    async buyPet() {
      let coinKey = "USDT";
      if (this.needApprove || this.lockBtn.buyMomoLock > 0) return;
      if (
        this.getNowPetItem.price / 1e9 >
        Number(this.coinArr[coinKey].balance)
      ) {
        this.showNotify(this.$t("Market_34"), "error");
        return;
      }
      let { auctor, index, orderId } = this.getNowPetItem;

      let sendData = {
        auctor_: auctor,
        index_: index,
        orderId_: orderId,
        price_: this.getNowPetItem.price,
      };
      let hash = await Wallet.ETH.Group.BigSell.bid(sendData);
      if (hash) {
        await Common.sleep(1000);
        this.$router.back(-1);
      }
    },
    async getMOMOGem() {
      let needGetGemArr = [];
      this.getShowList.map((item) => {
        needGetGemArr.push(item.tokenId);
      });
      if (needGetGemArr.length == 0) return;
      let gems = await Wallet.ETH.getBatchInlayInfo(needGetGemArr);
      if (gems) {
        needGetGemArr.map((item, index) => {
          this.momoGemsObjs[item] = [...gems[index]];
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.upgrade-item {
  padding: 13px 20px;
  background: #111;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 15px;
}
#big-sell-view .shop-car-item {
  position: relative;

  .tip-icon {
    position: absolute;
    width: 25px;
    top: 0;
    left: 0;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }
}

.has-own {
  position: absolute;
  top: 0px;
  right: -20px;
  background: #b10000;
  font-size: 10px;
  padding: 5px 20px;
  transform: rotate(45deg);
}
.jewel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
}
.gem-item-little {
  width: 30px;
  height: 30px;
  position: relative;
  background: rgba(0, 0, 0, 0.493);
  border-radius: 5px;
  margin: 3px;
  display: inline-block;
}
.gem-item-little img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
.sell-input {
  text-align: center;
  width: 100%;
}
#big-sell-view {
  padding: 10px;
  max-width: 1200px;
  margin: 0px auto;
  overflow: hidden;
  position: relative;
}
#price {
  background: #000;
  padding: 5px 30px;
  border-radius: 20px;
  display: inline-block;
  color: #fff;
}
</style>
