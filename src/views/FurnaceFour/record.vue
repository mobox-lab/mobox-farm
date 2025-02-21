<template>
    <div class="record">
        <div class="title">{{ $t("MOMOMerge_10") }}</div>
        <ul class="list">
            <li v-for="(item, index) in list" :key="index">
                <div class="label">
                    <div class="main">{{ $t("MOMOMerge_05") }}</div>
                    <div class="flex-1">
                        <div class="material-science">
                            {{ $t("MOMOMerge_06") }}
                        </div>
                    </div>
                </div>
                <div class="momos selected">
                    <div class="main item">
                        <Item :data="item.main" />
                    </div>
                    <div class="flex-1">
                        <div
                            class="item"
                            v-for="(momo, index) in item.materialScience"
                            :key="index"
                        >
                            <Item :data="momo" />
                        </div>
                    </div>
                </div>
                <div class="label">
                    <div class="main">{{ $t("MOMOMerge_11") }}</div>
                </div>
                <div class="momos result">
                    <div class="item">
                        <Item :data="item.result" />
                    </div>
                    <div class="info">
                        <a
                            class="tx"
                            target="_blank"
                            :href="'https://bscscan.com/tx/' + item.tx"
                            >TX</a
                        >
                        <div class="time">{{ item.time }}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { Wallet, Common, Http } from "@/utils/";
import Item from "./momo-item";

export default {
    components: {
        Item,
    },
    data() {
        return {
            list: [],
        };
    },
    computed: {
        ...mapState({
            myNFT_stake: (state) => state.ethState.data.myNFT_stake,
        }),
    },
    methods: {
        generateMomo(data) {
            return {
                vType: parseInt(data.protoId / 1e4),
                prototype: data.protoId,
                lvHashrate: data.lvHashrate,
                level: data.lv,
                quality: data.quality,
                category: data.category,
            };
        },
        async getList() {
            const address = await Wallet.ETH.getAccount();
            // const { data } = await axios.get(`${Http.serverNode}/momo/merge_result/${address}`);
            const { data } = await axios.get(
                `${Http.serverNode}/momo/merge_result/0x0Ab9A23eC67e079401935E127F6BaD29F8eFf26B`
            );
            if (data.list) {
                this.list = data.list.map((item) => {
                    const destToken = item.destToken;

                    return {
                        time: Common.dateFtt(
                            "yyyy-MM-dd hh:mm:ss",
                            new Date(item.crtime * 1000)
                        ),
                        tx: item.tx,
                        main: this.generateMomo(destToken),
                        result: {
                            vType: parseInt(destToken.protoId / 1e4),
                            prototype: destToken.protoId,
                            lvHashrate: destToken.newLvHashrate,
                            level: destToken.newLv,
                            quality: destToken.newQuality,
                            category: destToken.category,
                        },
                        materialScience: item.srcTokens.map(this.generateMomo),
                    };
                });
            }
        },
    },
    created() {
        this.getList();
    },
};
</script>

<style lang="less" scoped>
.record {
    background: #0c203d;
    overflow: hidden;
    border-radius: 10rem;
    box-sizing: border-box;
}

.title {
    background-size: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    font-weight: 900;
    line-height: 1.5;
    // color: #f5b90f;
}

.list {
    list-style: none;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    li {
        background: #14181f;
        border-radius: 8rem;

        &:first-child {
            margin-top: 0;
        }
    }
}

.flex-1 {
    flex: 1;
}

.label,
.momos {
    display: flex;
}

.label {
    font-weight: 400;
    // color: #4c89f8;
    color: rgba(255, 255, 2555, 0.5);
    line-height: 1;
    align-items: center;
}

.momos {
    background: rgba(23, 43, 95, 0.5);
    border-radius: 6rem;
    margin-top: 11rem;
}

.selected {
    .flex-1 {
        display: flex;
        align-items: center;
    }
}

.selected > div,
.result .item {
    transform: translateY(-7rem);
}

.result {
    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: right;
    }
}

.tx,
.time {
    color: #3d6dfb;
}

.tx {
    border-radius: 5rem;
    font-weight: bold;
    background: linear-gradient(
        90deg,
        rgba(61, 109, 251, 0),
        rgba(61, 109, 251, 0.1)
    );
}

.time {
    line-height: 1;
    font-weight: 400;
    font-family: none;
}

@media (min-width: 769px) {
    .record {
        padding: 13rem 24rem 28rem 24rem;
    }

    .title {
        width: 294rem;
        height: 36rem;
        font-size: 20rem;
    }

    .list {
        margin-top: 14rem;
        height: 436rem;

        li {
            margin-top: 9rem;
            padding: 12rem 13rem 16rem 13rem;
        }
    }

    .label,
    .momos {
        padding: 0 21rem;
    }

    .label {
        font-size: 12rem;
    }

    .selected {
        margin-bottom: 10rem;
    }

    .item {
        width: 150rem;
        margin-right: 12rem;
    }

    .main {
        margin-right: 42rem;
    }

    .material-science {
      margin-left: 18rem;
    }

    .tx,
    .time {
        font-size: 12rem;
        padding: 0 11rem;
    }

    .tx {
        line-height: 20rem;
    }

    .time {
        margin-top: 9rem;
    }
}

@media (max-width: 769px) {
    .record {
        width: 1100rem;
        padding: 13rem 24rem 28rem 24rem;
    }

    .title {
        width: 800rem;
        height: 105rem;
        font-size: 40rem;
        margin-top: 20rem;
    }

    .list {
        margin-top: 30rem;
        height: 1200rem;

        li {
            margin-top: 40rem;
            padding: 40rem 30rem;
        }
    }

    .label,
    .momos {
        padding: 0 60rem !important;
    }

    .label {
        font-size: 40rem;
        margin-bottom: 30rem;
    }

    .selected {
        margin-bottom: 30rem;
    }

    .item {
        width: 250rem;
        margin-right: 12rem;
    }

    .main {
        margin-right: 80rem;
    }

    .material-science {
      margin-left: 60rem;
    }

    .tx,
    .time {
        font-size: 42rem;
        padding: 0 25rem;
    }

    .tx {
        line-height: 80rem;
    }

    .time {
        margin-top: 20rem;
    }
}
</style>
