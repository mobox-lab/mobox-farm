<template>
  <div class="layout">
    <div class="background">
      <img src="@/assets/anniversary/head-bg.png" />
    </div>
    <div class="container">
      <div class="header">
        <img src="@/assets/anniversary/title.png" />
        <div class="date">
          <span>12 April, 2024 - 19 April, 2024</span>
          <a
            href="https://mbox.medium.com/happy-3rd-anniversary-moboxers-4b53be6dcb34"
            target="_blank"
          >
            <img src="@/assets/anniversary/rule.svg" />
          </a>
        </div>
      </div>
      <ul class="tab-bar">
        <li
          v-for="(item, index) in tabs"
          :key="index"
          @click="tab = item.symbol"
          :class="{ active: tab == item.symbol }"
        >
          <div class="content">
            <img class="icon" :src="item.icon" />
            <span class="name">{{ item.name }}</span>
          </div>
        </li>
      </ul>
      <!-- 进度 -->
      <div class="progress" v-if="tab == 'task'">
        <div class="box">
          <div class="bar" :style="{ width: `${(score / 30) * 100}%` }"></div>
        </div>
        <ul>
          <li v-for="(_, index) in 4" :key="index">
            <div class="icon">
              <img src="@/assets/anniversary/chest.png" />
            </div>
            <span>{{ index }}/3</span>
          </li>
        </ul>
      </div>
      <!-- 我的积分 -->
      <div class="my-points" v-if="tab == 'task'">
        <p>My MOMO Points:</p>
        <span>{{ score }}</span>
      </div>
      <!-- points -->
      <div class="tab-view">
        <div class="tab-view-item">
          <div
            class="box complete"
            v-if="tab === 'task' && lotteryResults.types"
          >
            <h5 class="title">Task</h5>
            <div class="info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
              >
                <circle cx="29" cy="29" r="29" fill="#1EDB8C" />
                <path
                  d="M44.1651 20.4725L26.0693 38.5684L15.2118 27.7108"
                  stroke="black"
                  stroke-width="6"
                />
              </svg>
              <h6>You are now eligible for the Raffle!</h6>
              <p>Raffle result will be revealed soon..</p>
            </div>
          </div>
          <!-- 任务 -->
          <div class="box tasks-box" v-else-if="tab === 'task'">
            <h5 class="title">Task</h5>
            <ul class="tasks">
              <li v-for="item in events" :key="item.id">
                <div class="info">
                  <h6>
                    {{ item.title }}
                    {{
                      item.id == 0 ? "" : ` (${item.complete}/${item.count})`
                    }}
                  </h6>
                  <p>
                    <img src="@/assets/anniversary/1.svg" />
                    <span>x{{ item.point }} Points</span>
                  </p>
                </div>
                <!-- <button v-if="item.id == 0 && !item.complete" disabled>
                  Claimed
                </button>
                <button
                  v-else
                  @click="claimPoint(item.id)"
                  :disabled="item.complete < item.count"
                >
                  Claim
                </button> -->
              </li>
            </ul>
            <p class="describe">Daily Check-ins will reset everyday</p>
          </div>
          <!-- 繁荣度 -->
          <div v-else-if="tab === 'prosperity'" class="box">
            <h5 class="title">My MOHome</h5>
            <div class="prosperity">
              <img src="@/assets/anniversary/prosperity.png" />
              <h6>My MOHome Prosperity</h6>
              <p>
                <img src="@/assets/anniversary/4.svg" />
                <span>{{
                  airdropInfo.prosp ? airdropInfo.prosp.toLocaleString() : 0
                }}</span>
              </p>
            </div>
          </div>
          <!-- momo算力 -->
          <div v-else class="box momos">
            <h5 class="title">My MOMO Hash Power</h5>
            <ul>
              <li v-for="(item, index) in momoList" :key="index">
                <div class="momo">
                  <img class="bg" :src="item.icon" />
                  <img class="icon" :src="item.momo" />
                </div>
                <span>{{ item.title }}</span>
                <p>x{{ momos[index + 1] || 0 }}</p>
              </li>
            </ul>
            <p class="footer">
              <span>Total Hash Power:</span>
              <img src="@/assets/anniversary/5.svg" />
              <span>{{
                airdropInfo.hash ? airdropInfo.hash.toLocaleString() : 0
              }}</span>
            </p>
          </div>
        </div>
        <!-- 任务 -->
        <div class="tab-view-item" v-if="tab == 'task'">
          <div class="box claim" v-if="lotteryResults.types">
            <h5 class="title">Raffle</h5>
            <div class="image">
              <img :src="lotteryPrizes[lotteryResults.types].icon" />
            </div>
            <div class="tip">You can claim</div>
            <h5 class="name">
              {{ lotteryPrizes[lotteryResults.types].title }}
            </h5>
            <div class="footer">
              <p v-if="[999, 998, 997].includes(lotteryResults.types)">
                The Legendary MOMO will be transfered manually. Please stay
                tuned.
              </p>
              <button v-else :disabled="isClaimedLottery" @click="claimPrizes">
                {{ isClaimedLottery ? "Claimed" : "Claim" }}
              </button>
            </div>
          </div>
          <div class="box" v-else-if="complete">
            <h5 class="title">Raffle</h5>
            <div class="not-prize">
              <div class="image">
                <img src="@/assets/anniversary/not-prize.svg" />
              </div>
              <p>Better luck next time</p>
            </div>
          </div>
          <div class="box raffle" v-else>
            <h5 class="title">Raffle</h5>
            <p class="tip">
              <img src="@/assets/anniversary/1.svg" />x10 points=
              <img src="@/assets/anniversary/chest.png" />x1 MOMO Star<br />
              <img src="@/assets/anniversary/chest.png" /> x3 MOMO Stars =
              Raffle Ticket<br />
              Each address can raffle for only once
            </p>
            <h5 class="rewards-title">Raffle Rewards</h5>
            <ul class="list-1">
              <li>
                <p>Legendary</p>
                <div class="icon">
                  <img src="@/assets/anniversary/momo-7.png" />
                  <span>x1</span>
                </div>
              </li>
              <li>
                <p>Legendary</p>
                <div class="icon">
                  <img src="@/assets/anniversary/momo-8.png" />
                  <span>x1</span>
                </div>
              </li>
              <li>
                <p>Legendary</p>
                <div class="icon">
                  <img src="@/assets/anniversary/momo-9.png" />
                  <span>x1</span>
                </div>
              </li>
            </ul>
            <ul class="list-2">
              <li v-for="(item, index) in rewards" :key="index">
                <div class="icon">
                  <img :src="item.icon" />
                  <span>X1</span>
                </div>
                <p>Total {{ item.count }}</p>
              </li>
            </ul>
            <ul class="list-2">
              <li>
                <div class="icon">
                  <img src="@/assets/icon/box.png" />
                  <span>X1</span>
                </div>
                <p>Total 500</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 繁荣度 -->
        <div class="tab-view-item" v-else-if="tab == 'prosperity'">
          <div class="box prize-box">
            <h5 class="title">Prize Pool</h5>
            <div class="prize">
              <img src="@/assets/anniversary/5.png" />
              <span>You can claim</span>
              <h6>
                {{
                  airdropInfo.homeProof ? airdropInfo.homeProof.amountText : 0
                }}
                $MBOX
              </h6>
              <p>Total 500,000 $MBOX</p>
            </div>
            <button
              :disabled="!prosperityClaimStatus"
              @click="claim(airdropInfo.homeProof)"
            >
              Claim
            </button>
          </div>
        </div>
        <!-- momo算力 -->
        <div class="tab-view-item" v-else>
          <div class="box prize-box">
            <h5 class="title">Prize Pool</h5>
            <div class="prize">
              <img src="@/assets/anniversary/5.png" />
              <span>You can claim</span>
              <h6>
                {{
                  airdropInfo.hashProof ? airdropInfo.hashProof.amountText : 0
                }}
                $MBOX
              </h6>
              <p>Total 500,000 $MBOX</p>
            </div>
            <button
              :disabled="!hashClaimStatus"
              @click="claim(airdropInfo.hashProof)"
            >
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Wallet, Common } from "@/utils";
import { CommonMethod } from "@/mixin";
import {
  getScore,
  getTaskStatus,
  getAirdrop,
  claimPoint,
  getLotteryResults,
} from "@/utils/anniversaryService";

export default {
  mixins: [CommonMethod],
  data() {
    return {
      tabs: [
        {
          symbol: "task",
          icon: require("@/assets/anniversary/1.svg"),
          name: "MOMO Points",
        },
        {
          symbol: "prosperity",
          icon: require("@/assets/anniversary/2.svg"),
          name: "MOMOVerse",
        },
        {
          symbol: "hash",
          icon: require("@/assets/anniversary/3.svg"),
          name: "MOMO",
        },
      ],
      events: [
        {
          id: 0,
          title: "Check-in Anniversary Event",
          point: 5,
          complete: 1,
          count: 1,
        },
        {
          id: 1,
          title: "Open 1 Box/Chest",
          point: 10,
          complete: 0,
          count: 1,
        },
        {
          id: 2,
          title: "Consume 1 MOMO to Upgrade",
          point: 5,
          complete: 0,
          count: 1,
        },
        {
          id: 3,
          title: "Consume 300 MEC to Enhance",
          point: 5,
          complete: 0,
          count: 300,
        },
      ],
      //
      tab: "task",
      //
      rewards: [
        {
          icon: require("@/assets/icon/green_icon.png"),
          count: 25,
        },
        {
          icon: require("@/assets/icon/blue_icon.png"),
          count: 25,
        },
        {
          icon: require("@/assets/icon/yellow_icon.png"),
          count: 25,
        },
        {
          icon: require("@/assets/icon/red_icon.png"),
          count: 25,
        },
      ],
      //
      lotteryPrizes: {
        1: {
          icon: require("@/assets/icon/box.png"),
          title: "1 BOX",
        },
        101: {
          icon: require("@/assets/icon/red_icon.png"),
          title: "1 Ruby",
        },
        201: {
          icon: require("@/assets/icon/green_icon.png"),
          title: "1 Emerald",
        },
        301: {
          icon: require("@/assets/icon/blue_icon.png"),
          title: "1 Sapphire",
        },
        401: {
          icon: require("@/assets/icon/yellow_icon.png"),
          title: "1 Topaz",
        },
        997: {
          icon: require("@/assets/anniversary/momo-7.png"),
          title: "1 Legendary MOMO",
        },
        998: {
          icon: require("@/assets/anniversary/momo-8.png"),
          title: "1 Legendary MOMO",
        },
        999: {
          icon: require("@/assets/anniversary/momo-9.png"),
          title: "1 Legendary MOMO",
        },
      },
      //
      momoList: [
        {
          icon: require("@/assets/anniversary/type-1.svg"),
          momo: require("@/assets/anniversary/momo-1.png"),
          title: "Common MOMO",
        },
        {
          icon: require("@/assets/anniversary/type-2.svg"),
          momo: require("@/assets/anniversary/momo-2.png"),
          title: "Uncommon MOMO",
        },
        {
          icon: require("@/assets/anniversary/type-3.svg"),
          momo: require("@/assets/anniversary/momo-3.png"),
          title: "Unique MOMO",
        },
        {
          icon: require("@/assets/anniversary/type-4.svg"),
          momo: require("@/assets/anniversary/momo-4.png"),
          title: "Rare MOMO",
        },
        {
          icon: require("@/assets/anniversary/type-5.svg"),
          momo: require("@/assets/anniversary/momo-5.png"),
          title: "Epic MOMO",
        },
        {
          icon: require("@/assets/anniversary/type-6.svg"),
          momo: require("@/assets/anniversary/momo-6.png"),
          title: "Legendary MOMO",
        },
      ],
      //
      score: 0,
      //
      complete: false,
      //
      airdropInfo: {},
      //
      prosperityClaimStatus: false,
      //
      hashClaimStatus: false,
      //
      lotteryResults: {},
      //
      isClaimedLottery: true,
    };
  },
  methods: {
    async getScore() {
      const { score, complete } = await getScore();
      this.score = Math.min(score, 30);
      this.complete = complete;
    },
    //
    async getTaskStatus() {
      const result = await getTaskStatus();
      const map = result.reduce((data, item) => {
        data[item.type] = item;
        return data;
      }, {});

      this.events.forEach((item) => {
        item.complete = map[item.id]?.count || 0;
      });
    },
    //
    async getAirdrop() {
      //
      const airdropInfo = await getAirdrop();
      //
      airdropInfo.homeProof.amountText = this.numFloor(
        airdropInfo.homeProof.amount / 1e18
      ).toLocaleString();
      airdropInfo.hashProof.amountText = this.numFloor(
        airdropInfo.hashProof.amount / 1e18
      ).toLocaleString();
      this.airdropInfo = airdropInfo;
      this.prosperityClaimStatus =
        airdropInfo.homeProof.index != -1 &&
        !(await Wallet.ETH.anniversaryHomeland.methods
          .isClaimed(airdropInfo.homeProof.index)
          .call());
      this.hashClaimStatus =
        airdropInfo.hashProof.index != -1 &&
        !(await Wallet.ETH.anniversaryHashrate.methods
          .isClaimed(airdropInfo.hashProof.index)
          .call());
    },
    //
    async claim(query) {
      const address = await Wallet.ETH.getAccount();
      const methods =
        this.tab === "prosperity"
          ? Wallet.ETH.anniversaryHomeland.methods
          : Wallet.ETH.anniversaryHashrate.methods;
      const contract = methods.claim(
        query.index,
        address,
        query.amount,
        query.proof
      );

      Wallet.ETH.sendMethod(
        contract,
        { from: address },
        (hash) => {},
        (data) => {
          this.init();
        },
        () => {}
      );
    },
    //
    async claimPoint(id) {
      if (!Wallet.ETH.myAddr) {
        Common.app.oprDialog("connect-wallet-dialog", "block");
        this.init();
        return;
      }

      await claimPoint(id);
      this.getScore();
      this.getTaskStatus();
    },
    //
    async getLotteryResults() {
      const result = await getLotteryResults();
      this.lotteryResults = result;

      if (result.index) {
        const isClaimed = await Wallet.ETH.anniversaryClaimPrizes.methods
          .isClaimed(result.index)
          .call();
        this.isClaimedLottery = isClaimed;
      }
    },
    //
    async claimPrizes() {
      const address = await Wallet.ETH.getAccount();
      const contract = Wallet.ETH.anniversaryClaimPrizes.methods.claim(
        this.lotteryResults.index,
        address,
        this.lotteryResults.types,
        this.lotteryResults.proof
      );

      Wallet.ETH.sendMethod(
        contract,
        { from: address },
        (hash) => {},
        (data) => {
          this.init();
          this.isClaimedLottery = true;
        },
        () => {}
      );
    },
    //
    init() {
      this.getLotteryResults();
      this.getScore();
      this.getTaskStatus();
      this.getAirdrop();
    },
  },
  computed: {
    ...mapState({
      wallet: (state) => state.ethState.data.myNFT_wallet,
      verse: (state) => state.ethState.data.myNFT_verse,
      stake: (state) => state.ethState.data.myNFT_stake,
    }),
    momos() {
      return [...this.wallet, ...this.verse, ...this.stake].reduce(
        (data, item) => {
          data[item.vType] = data[item.vType] || 0;

          return {
            ...data,
            [item.vType]: data[item.vType] + item.num,
          };
        },
        {}
      );
    },
  },
  async mounted() {
    await Wallet.ETH.getAccount();
    this.init();
  },
};
</script>

<style lang="less">
.layout {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  font-family: Poppins Bold;
  position: relative;

  img {
    display: block;
    width: 100%;
  }

  ul {
    list-style: none;
  }
}

.background {
  width: 100%;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.container {
  position: relative;
  z-index: 10;
  margin: 0 auto;
}

.header {
  margin: 0 auto;

  .date {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffcc0a;
    font-family: "poppins-black";
    font-style: normal;
    font-weight: 700;
    position: relative;

    a {
      position: absolute;
      left: 100%;
      cursor: pointer;
      transition: transform 0.1s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

.tab-bar {
  display: flex;

  li {
    flex: 1;
    cursor: pointer;
    border: solid #1e202e;
    background: #000;
    box-shadow: 0px 0px 36px 0px rgba(255, 255, 255, 0.25) inset;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      border-color: #4539c7;

      &:hover {
        opacity: 1;
      }

      .content {
        border-color: transparent;
      }

      span {
        color: #ffcc0a;
      }
    }

    &:first-child {
      margin-left: 0;
    }
  }

  .content {
    width: 100%;
    border: 1px solid #66738a;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.progress {
  background: #1e1f2d;
  position: relative;
  height: 20px;
  padding: 5px;

  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #384968;
    background: #1b1b1b;
    position: relative;
  }

  .bar {
    transition: width 0.4s;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: #ffcc0a;
  }

  ul {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      position: relative;
      background: #1e202e;
      border-radius: 10px;

      &:first-child {
        opacity: 0;
      }
    }

    .icon {
      padding: 0 5px;
      border: 1px solid #384968;
      background: #000;
      box-shadow: 0px 0px 36px 0px rgba(255, 255, 255, 0.25) inset;
    }

    span {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      color: #ffcc0a;
    }
  }
}

.my-points {
  display: flex;

  span {
    margin-left: 5px;
    color: #ffcc0a;
  }
}

.tab-view {
  .tab-view-item {
    border: 5px solid #1e202e;
    border-radius: 10px;
    box-shadow: 0px 0px 30px 0px rgba(255, 255, 255, 0.25) inset;

    .box {
      border: 1px solid #384968;
      border-radius: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .describe {
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: flex-end;
      color: #a5a6ab;
      vertical-align: bottom;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
  }

  .title {
    text-align: center;
  }
}

.tasks {
  li {
    display: flex;
    align-items: center;

    &:first-child {
      margin-top: 0;
    }

    .info {
      flex: 1;
    }

    h6 {
      margin-bottom: 5px;
    }

    p {
      display: flex;
      align-items: center;
      color: #ffcc0a;

      img {
        margin-right: 10px;
      }
    }

    button {
      font-weight: bold;
      outline: none;
      border: none;
      background: #1751f6;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      &[disabled] {
        background: #383838;
        color: #a5a6ab;
        cursor: no-drop;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

.complete {
  border-color: #1edb8c !important;
  box-shadow: 0px 0px 48px 0px rgba(30, 219, 140, 0.6) inset;

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
  }
}

.claim {
  .image {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
    }
  }

  .tip,
  .name {
    text-align: center;
    color: #ffcc0a;
  }

  .name {
    font-weight: bold;
  }

  .footer {
    flex: 1;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    p {
      text-align: center;
    }

    button {
      margin: 0 auto;
      width: 80%;
      height: 40px;
      background: #1751f6;
      border-radius: 6px;
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      font-weight: bold;

      &:hover {
        opacity: 0.8;
      }

      &[disabled] {
        background: #383838;
        color: #a5a6ab;
        cursor: no-drop;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

.not-prize {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  .image {
    width: 35%;
    margin-bottom: 10px;
  }

  p {
    color: #a5a6ab;
  }
}

.raffle {
  .tip {
    text-align: center;
    font-weight: normal;
    line-height: 2;

    img {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .rewards-title {
    text-align: center;
    color: #ffcc0a;
  }

  .list-1 {
    flex: 1;
    display: flex;
    align-items: flex-end;

    p {
      display: inline-block;
      background: rgba(251, 142, 1, 0.2);
      color: #fb8e01;
    }

    li {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 1;
    }

    .icon {
      position: relative;

      span {
        position: absolute;
        bottom: 0;
        right: 0;
        color: #ffcc0a;
        text-align: right;
        -webkit-text-stroke-width: 2;
        -webkit-text-stroke-color: #000;
        transform: translate(5%, 10%);
      }
    }
  }

  .list-2 {
    display: flex;
    justify-content: center;

    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .icon {
      position: relative;

      span {
        position: absolute;
        bottom: 0;
        right: 0;
        color: #ffcc0a;
        text-align: right;
        -webkit-text-stroke-width: 2;
        -webkit-text-stroke-color: #000;
        transform: translate(50%, 20%);
      }
    }

    p {
      color: #ffcc0a;
    }
  }
}

.prosperity {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  color: #ffcc0a;

  h6 {
    text-align: center;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.momos {
  ul {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;

    li {
      display: flex;
      align-items: center;

      .momo {
        position: relative;
      }

      .bg {
        width: 100%;
      }

      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-45%, -50%);
      }

      span {
        flex: 1;
      }

      p {
        color: #ffcc0a;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffcc0a;
  }
}

.prize-box {
  button {
    margin: 0 auto;
    width: 80%;
    height: 40px;
    background: #1751f6;
    border-radius: 6px;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-weight: bold;

    &:hover {
      opacity: 0.8;
    }

    &[disabled] {
      background: #383838;
      color: #a5a6ab;
      cursor: no-drop;

      &:hover {
        opacity: 1;
      }
    }
  }
}

.prize {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 40%;
  }

  span,
  h6 {
    color: #ffcc0a;
  }
}
</style>
<style src="./pc.less" scoped lang="less" />
<style src="./mobile.less" scoped lang="less" />
