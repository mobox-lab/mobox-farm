<template>
  <div class="tac center-content">
    <div class="por ovh mgt-20 adv-panel">
      <section class="col-md-7" style="padding: 10px">
        <div>
          <h1 class="vertical-children">
            <span>{{ $t("Auction_03") }}</span>
            <img
              class="mgl-10 cur-point"
              @click="oprDialog('bid-rule-dialog', 'block')"
              src="@/assets/icon/help.png"
              alt=""
              height="30"
            />
          </h1>
          <div class="tac mgt-10">
            <template>
              <p v-if="Number(bidInfo.state) != 1">
                {{ $t("Auction_25") }}:
                {{ getLeftTime(bidInfo.bidEndTime - nowTs) }}
              </p>
              <p v-else>{{ $t("Auction_26") }}</p>
            </template>
            <div style="height: 290px" id="momo-view">
              <div class="mgt-10" v-if="getNowRound != '-'">
                <PetItem v-bind:data="{ item: momoDatas[getNowRound] }" />
              </div>
              <Loading v-else style="margin-top: 50px" />
            </div>
            <p class="small mgt-10" style="margin-bottom: 10px">
              <router-link to="/mypet/2">
                <span class="cur-point">{{ $t("Auction_05") }} >></span>
              </router-link>
            </p>
          </div>
        </div>
      </section>
      <section class="col-md-5 adv-panel-content" style="padding: 10px">
        <div class="por" id="winList-cont" style="height: 400px; padding: 20px">
          <div class="aveage-box tac" style="padding-bottom: 10px">
            <div>
              <p class="small opa-6">{{ $t("Auction_27") }}</p>
              <h4 v-if="bidInfo.currBidder == '-'">
                <Loading />
              </h4>
              <h4 v-else>{{ shorAddress(bidInfo.currBidder) }}</h4>
            </div>
            <div>
              <p class="small opa-6">{{ $t("Auction_28") }}</p>
              <h4 v-if="bidInfo.currBidder == '-'">
                <Loading />
              </h4>
              <h4 class="vertical-children" v-else>
                <img src="@/assets/coin/MBOX.png" alt="" height="20" />
                <span class="mgl-5">{{ bidInfo.currPrice }} MBOX</span>
              </h4>
            </div>
          </div>
          <div class="tac mgt-10">
            <StatuButton
              style="width: 50%"
              :btnType="'btn-success'"
              v-if="
                bidInfo.toClaimTokenId != '-' &&
                Number(bidInfo.toClaimTokenId) > 0
              "
              :isDisable="bidInfo.currPrice == '-'"
              :isLoading="lockBtn.bidLock > 0"
              :onClick="takeMOMO"
              >{{ $t("Auction_35") }}</StatuButton
            >
            <StatuButton
              style="width: 50%"
              v-else
              :isDisable="
                bidInfo.currPrice == '-' || Number(bidInfo.state) == 1
              "
              :onClick="
                () => {
                  setAction(22011);
                  oprDialog('bid-momo-dialog', 'block');
                }
              "
              >{{ $t("Auction_29") }}</StatuButton
            >
          </div>
          <div class="mgt-10 tal">
            <h4>{{ $t("Auction_30") }}</h4>
            <table class="small new-table tac" style="background: #070d14">
              <tr class="small opa-6">
                <td class="tal" style="width: 15%">MOMO</td>
                <td style="width: 20%">{{ $t("BOX_12") }}</td>
                <td style="width: 30%">{{ $t("Auction_31") }}</td>
                <td>{{ $t("Auction_28") }}</td>
                <td class="tac" style="width: 15%">TX</td>
              </tr>
            </table>
            <div style="height: 226px; overflow: auto" id="bid-winlist">
              <table class="small new-table tac" style="background: #070d14">
                <tbody>
                  <tr v-if="Number(bidInfo.state) != 1 && getNowRound != '-'">
                    <td class="tal">
                      <PetItemMin :data="momoDatas[getNowRound]" />
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td class="tac">-</td>
                  </tr>

                  <tr v-for="item in winnerList" :key="item.round + 'a'">
                    <td class="tal" style="width: 15%">
                      <PetItemMin :data="momoDatas[item.round]" />
                    </td>
                    <td style="width: 20%">
                      <p>
                        {{
                          dateFtt("yyyy-MM-dd", new Date(item.crtime * 1000))
                        }}
                      </p>
                      <p>
                        {{ dateFtt("hh:mm:ss", new Date(item.crtime * 1000)) }}
                      </p>
                    </td>
                    <td style="width: 30%">{{ shorAddress(item.bidder) }}</td>
                    <td>
                      <span class="mgl-5"
                        >{{ numFloor(item.amount / 1e18, 100) }} MBOX</span
                      >
                    </td>
                    <td style="width: 15%">
                      <a
                        style="text-decoration: underline"
                        :href="getTxUrl(item.txId)"
                        target="_blank"
                      >
                        <img
                          src="@/assets/icon/viewTx.png"
                          alt=""
                          class="cur-point"
                          height="25"
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="tac mgt-10">
      <p class="cur-point" @click="showRank = !showRank">
        {{ $t("Air-drop_244") }} >>
      </p>
    </div>

    <div class="col-md-12" style="padding: 10px" :class="{ hide: !showRank }">
      <section
        class="mgt-10"
        style="padding: 10px 15px; background: #13181f; border-radius: 20px"
      >
        <div style="min-height: 450px">
          <table class="small new-table">
            <tr>
              <th class="tal" style="width: 20%">{{ $t("BOX_12") }}</th>
              <th class="tac" style="width: 40%">{{ $t("Auction_32") }}</th>
              <th style="width: 30%" class="tal">{{ $t("Auction_28") }}</th>
              <th class="tar tac-xs">TX</th>
            </tr>
            <tr v-for="item in rankListObj.list" :key="item.blockHash">
              <td class="tal">
                {{
                  dateFtt("yyyy-MM-dd hh:mm:ss", new Date(item.crtime * 1000))
                }}
              </td>
              <td class="tac">{{ shorAddress(item.bidder) }}</td>
              <td class="vertical-children tal">
                <img src="@/assets/coin/MBOX.png" alt="" height="20" />
                <span class="mgl-5"
                  >{{ numFloor(item.amount / 1e18, 100) }} MBOX</span
                >
              </td>
              <td class="tar tac-xs">
                <a :href="getTxUrl(item.txId)" target="_blank">
                  <img
                    src="@/assets/icon/viewTx.png"
                    alt=""
                    class="cur-point"
                    height="25"
                  />
                </a>
              </td>
            </tr>
          </table>
        </div>
        <table class="new-table">
          <tr v-if="rankListObj.total_page > 1">
            <td colspan="4" style="border: none">
              <Page
                :defaultPage="nowPage"
                :totalPage="rankListObj.total_page"
                :onChange="onPageChange"
              />
            </td>
          </tr>
        </table>
      </section>
      <div class="loading" v-show="loading">
        <Loading :width="30" :height="30" />
      </div>
    </div>
    <Dialog id="bid-momo-dialog" :top="100" :width="400">
      <div class="tal mgt-10">
        <div class="tab-menu active">{{ $t("Auction_29") }}</div>
      </div>
      <div class="tab-body">
        <div class="tab-content">
          <div class="aveage-box">
            <p class="tal small opa-6">
              {{ $t("Auction_36") }}({{ "≥" + getNowNeedPrice }})
            </p>
          </div>
          <div class="mgt-10 por">
            <div class="ly-input-pre-icon" style="zoom: 0.75">
              <img src="@/assets/coin/MBOX.png" height="40" alt="" />
            </div>
            <input
              type="text"
              class="ly-input tac"
              style="width: 100%; padding: 0px 50px"
              v-model="inputValue"
              v-number
              :placeholder="'≥' + getNowNeedPrice"
            />
          </div>
          <div class="aveage-box mgt-10">
            <p class="tal small">{{ $t("Air-drop_11") }}</p>
            <div class="tar small">
              <p>{{ coinArr["MBOX"].balance }} MBOX</p>
            </div>
          </div>

          <div
            :class="coinArr['MBOX'].allowanceToBid == 0 ? 'btn-group' : ''"
            style="width: 280px; margin: 10px auto"
          >
            <StatuButton
              data-step="1"
              v-if="coinArr['MBOX'].allowanceToBid == 0"
              class="mgt-10"
              style="width: 80%"
              :onClick="approve"
              :isLoading="coinArr['MBOX'].isApproving"
              >{{ $t("Air-drop_16") }} MBOX</StatuButton
            >
            <StatuButton
              data-step="2"
              :isDisable="
                !(coinArr['MBOX'].allowanceToBid > 0) ||
                Number(inputValue) < getNowNeedPrice
              "
              class="mgt-10"
              style="width: 80%"
              :onClick="goBid"
              :isLoading="lockBtn.bidLock > 0"
            >
              {{ $t("Auction_29") }}
            </StatuButton>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="bid-rule-dialog" :top="100" :width="400">
      <h2>{{ $t("Auction_33") }}</h2>
      <p
        v-html="$t('Auction_34')"
        class="tal mgt-20"
        style="word-break: break-word"
      ></p>
    </Dialog>
  </div>
</template>

<script>
import {
  PetItem,
  Dialog,
  StatuButton,
  Loading,
  PetItemMin,
  Page,
} from "@/components";
import CommonMethod from "@/mixin/CommonMethod";
import { Wallet, Common, Http } from "@/utils";
import { mapState } from "vuex";
import { WalletConfig, PancakeConfig } from "@/config";

const baseAttr = {
  num: 1,
  level: 1,
  vType: 6,
  quality: 6,
  chain: "bnb",
  category: 5,
  speciality: 2,
  hashrate: 180,
  gems: [0, 0, 0, 0],
  lvHashrate: 180,
  location: "Wallet",
  noPrice: true,
};

export default {
  components: { PetItem, Dialog, StatuButton, Loading, PetItemMin, Page },
  mixins: [CommonMethod],
  data() {
    return {
      getCountDown: 5000,
      inputValue: "",
      momoDatas: [
        0,
        {
          ...baseAttr,
          tokenId: 17,
          prototype: 60003,
          tokenName: "Name_243",
          round: 1,
        },
        {
          ...baseAttr,
          tokenId: 22,
          prototype: 60002,
          tokenName: "Name_242",
          round: 2,
        },
        {
          ...baseAttr,
          tokenId: 27,
          prototype: 60001,
          tokenName: "Name_241",
          round: 3,
        },

        //
        {
          ...baseAttr,
          tokenId: 14,
          prototype: 60006,
          tokenName: "Name_246",
          round: 4,
        },
        {
          ...baseAttr,
          tokenId: 4,
          prototype: 60004,
          tokenName: "Name_244",
          round: 5,
        },
        {
          ...baseAttr,
          tokenId: 9,
          prototype: 60005,
          tokenName: "Name_245",
          round: 6,
        },
        {
          ...baseAttr,
          tokenId: 15,
          prototype: 60006,
          tokenName: "Name_246",
          round: 7,
        },
        {
          ...baseAttr,
          tokenId: 5,
          prototype: 60004,
          tokenName: "Name_244",
          round: 8,
        },
        {
          ...baseAttr,
          tokenId: 10,
          prototype: 60005,
          tokenName: "Name_245",
          round: 9,
        },
        {
          ...baseAttr,
          tokenId: 34,
          prototype: 60007,
          tokenName: "Name_347",
          round: 10,
        },
      ],

      bidInfo: {
        state: "-",
        bidTs: "-",
        tokenId: "-",
        currPrice: "-",
        currBidder: "-",
        bidEndTime: 0,
        bidStartTime: "-",
        toClaimTokenId: "-",
      },
      nowPage: 1,
      rankListObj: {
        list: [],
        total_page: 0,
      },
      winnerList: [],
      loading: false,
      getNowRound: "-",
      showRank: false,
    };
  },
  watch: {
    nowTs: async function (newTs) {
      if (newTs % 10 == 0) {
        await this.getBidInfo();
        await this.getBidderList(false);
        await this.getBidderWinner();
      }
    },
  },
  computed: {
    ...mapState({
      coinArr: (state) => state.bnbState.data.coinArr,
      lockBtn: (state) => state.globalState.data.lockBtn,
      nowTs: (state) => state.globalState.data.nowTs,
    }),
    getNowNeedPrice() {
      let price = 1000;

      if (Number(this.bidInfo.currPrice) * 1.02 > price) {
        price = Math.ceil(
          this.numFloor(Number(this.bidInfo.currPrice) * 1.02, 10)
        );
      }
      if (Number(this.bidInfo.currPrice) * 0.02 > 1000) {
        price = Number(this.bidInfo.currPrice) + 1000;
      }

      return price;
    },
  },
  async created() {
    await this.getBidInfo();
    await this.getBidderWinner();
    await this.getBidderList();
    await Wallet.ETH.getAccount();
    //
    await this.viewAllowance();
  },
  methods: {
    async getBidderWinner() {
      let data = await Http.getBidderWinner();
      if (data) {
        this.winnerList = data.list.reverse();
      }
    },
    async getBidderList(needClear = true) {
      if (this.loading) return;
      if (needClear) {
        this.rankListObj.list = [];
      }
      this.loading = true;
      let data = await Http.getBidderList(this.nowPage, this.getNowRound - 1);
      this.loading = false;
      if (data) {
        this.rankListObj = data;
      }
    },
    async viewAllowance() {
      let coinKey = "MBOX";
      if (this.coinArr[coinKey].allowanceToRent > 0) return;

      let allowanceToBid = await Wallet.ETH.viewErcAllowanceToTarget(
        PancakeConfig.SelectCoin[coinKey].addr,
        WalletConfig.ETH.momoBid,
        false
      );
      if (allowanceToBid) {
        this.coinArr[coinKey].allowanceToBid = Number(allowanceToBid);
        this.coinArr.ts = new Date().valueOf();
        this.$store.commit("bnbState/setData", { coinArr: this.coinArr });
      }
    },
    //
    async approve() {
      let coinKey = "MBOX";
      let { allowanceToBid, isApproving } = this.coinArr[coinKey];
      if (allowanceToBid > 0 || isApproving) return;

      let hash = await Wallet.ETH.approveErcToTarget(
        PancakeConfig.SelectCoin[coinKey].addr,
        WalletConfig.ETH.momoBid,
        { coinKey, type: "allowanceToBid" }
      );
      if (hash) {
        this.coinArr[coinKey].isApproving = true;
      }
    },
    async getBidInfo() {
      let address = await Wallet.ETH.getAccount();
      let res = await Wallet.ETH.getBidInfo(address);
      let round = await Wallet.ETH.getBidRound();
      this.getNowRound = Number(round) + 1;
      if (res) {
        res.currPrice = this.numFloor(res.currPrice / 1e18, 100);
        this.bidInfo = res;
      }
    },
    //
    async goBid() {
      if (Number(this.inputValue) > this.coinArr["MBOX"].balance) {
        this.getConfirmDialog().show(this.$t("Common_30"), () =>
          this.showSwapBox()
        );
        return;
      }
      let obj = {
        amount: Number(this.inputValue),
        tokenId: this.bidInfo.tokenId,
      };
      let hash = await Wallet.ETH.bidMomo(obj, () => {
        this.getBidInfo();
      });
      if (hash) {
        this.inputValue = "";
        Common.app.lockBtnMethod("bidLock");
      }
    },
    //
    async takeMOMO() {
      let hash = await Wallet.ETH.withdraw721(() => {
        this.getBidInfo();
      });
      if (hash) {
        Common.app.lockBtnMethod("bidLock");
      }
    },
    onPageChange(page) {
      if (page == this.nowPage) return;
      this.nowPage = page;
      this.getBidderList();
    },
  },
};
</script>

<style scoped>
.adv-panel:before {
  background: linear-gradient(145deg, #ac2f2d 0%, #000 100%);
}

@media (max-width: 768px) {
  .pet_item {
    width: 350px !important;
  }
  #momo-view {
    height: 150px !important;
  }
  #bid-winlist {
    height: auto !important;
    overflow: visible !important;
  }
  #winList-cont {
    height: auto !important;
  }
}
</style>
