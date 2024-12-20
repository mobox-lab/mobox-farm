<template>
    <div class="layout">
        <div class="background">
            <img src="@/assets/yearEnd/head-bg.webp" />
        </div>
        <div class="container">
            <div class="header">
                <img src="@/assets/yearEnd/title.webp" />
                <div class="date">
                    <div class="sub-title">
                        <img src="@/assets/yearEnd/canes.webp" />
                        <span>My MOMO Canes: {{ score }}</span>
                    </div>

                    <a
                        href="https://mbox.medium.com/happy-3rd-anniversary-moboxers-4b53be6dcb34"
                        target="_blank"
                    >
                        <img src="@/assets/anniversary/rule.svg" />
                    </a>
                </div>
            </div>
            <!-- 进度 -->
            <div class="progress" v-if="tab == 'task'">
                <div class="box">
                    <div
                        class="bar"
                        :style="{ width: `${(score / 30) * 100}%` }"
                    ></div>
                </div>
                <ul>
                    <li v-for="(_, index) in 4" :key="index">
                        <div class="icon">
                            <img src="@/assets/yearEnd/chest.webp" />
                        </div>
                        <span>{{ index }}/3</span>
                    </li>
                </ul>
            </div>

            <div class="task-content">
                <div
                    class="card-item complete-item"
                    v-if="lotteryResults.types"
                >
                    <div class="box complete">
                        <img
                            src="@/assets/yearEnd/top-left-corner.webp"
                            alt=""
                            class="corner top-left"
                        />
                        <img
                            src="@/assets/yearEnd/top-right-corner.webp"
                            alt=""
                            class="corner top-right"
                        />
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
                            <h6>You are eligible!</h6>
                            <p>Raffle result will be revealed soon..</p>
                        </div>
                    </div>
                </div>
                <div class="card-item" v-else>
                    <div class="box tasks-box">
                        <img
                            src="@/assets/yearEnd/top-left-corner.webp"
                            alt=""
                            class="corner top-left"
                        />
                        <img
                            src="@/assets/yearEnd/top-right-corner.webp"
                            alt=""
                            class="corner top-right"
                        />
                        <h5 class="title">Task</h5>
                        <ul class="tasks">
                            <li v-for="item in events" :key="item.id">
                                <div class="info">
                                    <h6>
                                        {{ item.title }}
                                        {{
                                            item.id == 0
                                                ? ""
                                                : ` (${item.complete}/${item.count})`
                                        }}
                                    </h6>
                                    <p>
                                        <img
                                            src="@/assets/yearEnd/canes.webp"
                                        />
                                        <span>x{{ item.point }} Points</span>
                                    </p>
                                </div>
                                <button
                                    v-if="item.id == 0 && !item.complete"
                                    disabled
                                >
                                    Claimed
                                </button>
                                <button
                                    v-else
                                    @click="claimPoint(item.id)"
                                    :disabled="item.complete < item.count"
                                >
                                    Claim
                                </button>
                            </li>
                        </ul>
                        <div class="describe">
                            <p>
                                Daily Check-in resets everyday. Every 10 canes
                                unlocks 1 wreath towards raffle eligibility.
                                Note: maximum 3 wreaths required, additional
                                wreaths ≠ higher chance to win.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="card-item raffle-item">
                    <!--  -->
                    <div class="box claim complete" v-if="lotteryResults.types">
                        <img
                            src="@/assets/yearEnd/bottom-left-corner.webp"
                            alt=""
                            class="corner bottom-left"
                        />
                        <img
                            src="@/assets/yearEnd/bottom-right-corner.webp"
                            alt=""
                            class="corner bottom-right"
                        />
                        <h5 class="title">Raffle</h5>
                        <div class="image">
                            <img
                                :src="lotteryPrizes[lotteryResults.types].icon"
                            />
                        </div>
                        <div class="tip">You can claim</div>
                        <h5 class="name">
                            {{ lotteryPrizes[lotteryResults.types].title }}
                        </h5>
                        <div class="footer">
                            <p
                                v-if="
                                    [999, 998, 997].includes(
                                        lotteryResults.types
                                    )
                                "
                            >
                                The Legendary MOMO will be transfered manually.
                                Please stay tuned.
                            </p>
                            <button
                                v-else
                                :disabled="isClaimedLottery"
                                @click="claimPrizes"
                            >
                                {{ isClaimedLottery ? "Claimed" : "Claim" }}
                            </button>
                        </div>
                    </div>
                    <!--  -->
                    <div class="box" v-else-if="complete">
                        <img
                            src="@/assets/yearEnd/bottom-left-corner.webp"
                            alt=""
                            class="corner bottom-left"
                        />
                        <img
                            src="@/assets/yearEnd/bottom-right-corner.webp"
                            alt=""
                            class="corner bottom-right"
                        />
                        <h5 class="title">Raffle</h5>
                        <div class="not-prize">
                            <div class="image">
                                <img src="@/assets/anniversary/not-prize.svg" />
                            </div>
                            <p>Better luck next time</p>
                        </div>
                    </div>
                    <div class="box raffle" v-else>
                        <img
                            src="@/assets/yearEnd/bottom-left-corner.webp"
                            alt=""
                            class="corner bottom-left"
                        />
                        <img
                            src="@/assets/yearEnd/bottom-right-corner.webp"
                            alt=""
                            class="corner bottom-right"
                        />
                        <h5 class="title">Raffle</h5>
                        <p class="tip">
                            MOMO Canes can be converted to MOMO Wreaths in a
                            ratio of: <br />

                            <img src="@/assets/yearEnd/canes.webp" /> x10 Canes
                            = <img src="@/assets/yearEnd/chest.webp" /> x1
                            wreaths Get 3 *
                            <img src="@/assets/yearEnd/momo-box.webp" />MOMO
                            Wreaths to be eligible for raffle (Max wreath = 3)
                        </p>
                        <h5 class="rewards-title">Rewards Pool</h5>
                        <ul class="list-2">
                            <li v-for="(item, index) in rewards" :key="index">
                                <div class="icon">
                                    <img :src="item.icon" />
                                    <span>X{{ item.per }}</span>
                                </div>
                                <p>Total {{ item.count }}</p>
                            </li>
                        </ul>
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
            // 当前tab
            tab: "task",
            // 奖励
            rewards: [
                {
                    icon: require("@/assets/yearEnd/reward-1.webp"),
                    per: 1,
                    count: 500,
                },
                {
                    icon: require("@/assets/yearEnd/reward-2.webp"),
                    per: 30,
                    count: 100,
                },
                {
                    icon: require("@/assets/yearEnd/reward-2.webp"),
                    per: 50,
                    count: 60,
                },
                {
                    icon: require("@/assets/yearEnd/reward-2.webp"),
                    per: 100,
                    count: 40,
                },
                {
                    icon: require("@/assets/yearEnd/momo-box.webp"),
                    per: 1,
                    count: 1,
                },
            ],
            // 抽奖奖品
            lotteryPrizes: {
                1: {
                    icon: require("@/assets/yearEnd/reward-1.webp"),
                    title: "1 BOX",
                },
                101: {
                    icon: require("@/assets/yearEnd/reward-2.webp"),
                    title: "30 MBOX",
                },
                201: {
                    icon: require("@/assets/yearEnd/reward-2.webp"),
                    title: "50 MBOX",
                },
                301: {
                    icon: require("@/assets/yearEnd/reward-2.webp"),
                    title: "100 MBOX",
                },
                997: {
                    icon: require("@/assets/yearEnd/momo-box.webp"),
                    title: "1 Legendary MOMO",
                },
            },
            // momo列表
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
            // 积分
            score: 0,
            // 完成状态
            complete: false,
            // 空投信息
            airdropInfo: {},
            // 繁荣度领取状态
            prosperityClaimStatus: false,
            // 算力领取状态
            hashClaimStatus: false,
            // 抽奖结果
            lotteryResults: {},
            // 是否领取抽奖
            isClaimedLottery: true,
        };
    },
    methods: {
        async getScore() {
            const { score, complete } = await getScore();
            this.score = Math.min(score, 30);
            this.complete = complete;
        },
        // 获取任务状态
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
        // 获取空投空投
        async getAirdrop() {
            // 获取空投信息
            const airdropInfo = await getAirdrop();
            // 金额格式化
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
        // 领取空投
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
        // 领取积分
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
        // 获取抽奖结果
        async getLotteryResults() {
            const result = await getLotteryResults();
            this.lotteryResults = result;
            if (result.index) {
                const isClaimed =
                    await Wallet.ETH.anniversaryClaimPrizes.methods
                        .isClaimed(result.index)
                        .call();
                this.isClaimedLottery = isClaimed;
            }
        },
        // 领取奖品
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
        // 初始化
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

        .sub-title {
            display: flex;
            img {
                width: 48px;
            }
        }

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
    background: #2e1e1e;
    position: relative;
    height: 20px;
    padding: 5px;

    .box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #683838;
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
            background: #2e1e1e;
            border-radius: 10px;

            &:first-child {
                opacity: 0;
            }
        }

        .icon {
            padding: 0 5px;
            border: 1px solid #683838;
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

.task-content {
    .complete-item {
        border: 4px solid #1e202e;
    }
    .card-item {
        border: 4px solid #2e1e1e;
        border-radius: 10px;
        box-shadow: 0px 0px 30px 0px rgba(255, 255, 255, 0.25) inset;
        position: relative;
        .corner {
            position: absolute;
        }
        .top-left {
            top: -10px;
            left: -12px;
            width: 56px;
        }
        .top-right {
            top: -10px;
            right: -12px;
            width: 63px;
        }
        .bottom-left {
            bottom: -10px;
            left: -12px;
            width: 135px;
        }
        .bottom-right {
            bottom: -10px;
            right: -12px;
            width: 135px;
        }

        .box {
            border: 1px solid #683838;
            border-radius: 10px;
            width: 100%;
            display: flex;
            flex-direction: column;

            position: relative;
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

        .title {
            text-align: center;
        }
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
            background: #da272a;
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
        h6 {
            color: #1edb8c;
        }

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
            display: flex;
            // flex-direction: column;
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
                text-shadow: -1px -1px 0 #000, /* 左上 */ 1px -1px 0 #000,
                    /* 右上 */ -1px 1px 0 #000, /* 左下 */ 1px 1px 0 #000; /* 右下 */
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
