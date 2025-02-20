<template>
    <div class="select-momo">
        <div class="title">
            <span>{{ $t("BOX_18") }}</span>
        </div>
        <p class="sub-title">{{ $t("MOMOMerge_12") }}</p>
        <div class="list">
            <ul>
                <li
                    v-for="(item, index) in momos"
                    :key="index"
                    @click="onSelect(item)"
                >
                    <Item
                        :data="item"
                        :selected="ids.indexOf(item.tokenId) >= 0"
                    />
                </li>
            </ul>
        </div>
        <div class="bottom">
            <div class="button" @click="onConfirm">{{ $t("Common_03") }}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import Item from "./momo-item";

export default {
    mixins: [CommonMethod],
    props: {
        current: Object,
        isShowTip: Boolean,
        type: Number,
        selected: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            momo: null,
        };
    },
    components: {
        Item,
    },
    computed: {
        ...mapState({
            myNFT_stake: (state) => state.ethState.data.myNFT_stake,
            hashrateInfo: (state) => state.globalState.hashrateInfo,
        }),
        momos() {
            return this.myNFT_stake
                .filter((item) => {
                    const isStandard = this.isStandard(item);
                    const vType = parseInt(item.prototype / 1e4);

                    if (this.type) {
                        return (
                            vType === this.type &&
                            !isStandard &&
                            item.rent.state == -1
                        );
                    }

                    return (
                        !isStandard &&
                        (vType === 4 || vType === 5) &&
                        item.rent.state == -1
                    );
                })
                .sort((a, b) => (b.lvHashrate - a.lvHashrate) * 1);
        },
        ids() {
            return [...this.selected, this.momo?.tokenId];
        },
    },
    methods: {
        isStandard(item) {
            const vType = parseInt(item.prototype / 1e4);
            const standardsHashrate =
                this.hashrateInfo[`v${vType}StandardHashrate`];
            return item.level > 1
                ? item.hashrate >= standardsHashrate
                : item.lvHashrate >= standardsHashrate;
        },
        onSelect(item) {
            if (
                (!item.gems || item.gems.join("") != "0000") &&
                this.isShowTip
            ) {
                this.showNotify(this.$t("MOMOMerge_14"), "error");
                return;
            }

            if (this.selected.indexOf(item.tokenId) == -1) {
                this.momo = this.momo?.tokenId == item.tokenId ? null : item;
            }
        },
        onConfirm() {
            this.$emit("onSelect", this.momo);
        },
    },
    created() {
        this.momo = this.current;
    },
};
</script>

<style lang="less" scoped>
.select-momo {
    background: #0c203d;
    overflow: hidden;
    border-radius: 10rem;
    box-sizing: border-box;

    img {
        display: block;
        max-width: 100%;
    }

    ul {
        list-style: none;
    }

    .title {
        background-size: 100%;
        display: flex;

        span {
            font-weight: 600;
        }
    }

    .sub-title {
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
    }

    .list {
        background: #14181f;
        border-radius: 8rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        ul {
            display: grid;
        }

        li {
            padding: 4%;
            cursor: pointer;
        }
    }

    // .button {
    //     background: url(../../assets/furnace/button.png) no-repeat;
    //     background-size: 100% 100%;
    //     text-align: center;
    //     color: #643d03;
    //     margin: 0 auto;
    // }
    .bottom {
        display: flex;
        justify-content: center;
    }
    .button {
        background-color: #2956ed;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        border-radius: 8px;
        font-size: 14px;
    }
    .button:hover {
        background-color: rgba(41, 86, 237, 0.8);
    }
}

@media (min-width: 1200px) {
    .select-momo {
        width: 600px;
        padding: 20px;

        .title {
            span {
                font-size: 16px;
            }
        }

        .sub-title {
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 20px;
        }

        .list {
            height: 267rem;
            padding: 10rem;
            margin-bottom: 20rem;

            ul {
                grid-template-columns: auto auto auto auto;
            }

            li {
                margin-top: 5rem;
            }
        }

        .button {
            width: 144px;
            height: 40px;
            border-radius: 8px;
            font-size: 14px;
        }
    }
}

@media (max-width: 1200px) and (min-width: 769px) {
    .select-momo {
        width: 900rem;
        padding: 13rem 24rem 28rem 24rem;

        .title {
            width: 500rem;
            height: 66rem;

            span {
                font-size: 35rem;
            }
        }

        .sub-title {
            font-size: 20rem;
            margin-top: 10rem;
            margin-bottom: 12rem;
        }

        .list {
            height: 450rem;
            padding: 15rem;
            margin-bottom: 25rem;

            ul {
                grid-template-columns: auto auto auto auto auto;
            }

            li {
                margin-top: 15rem;
            }
        }

        .button {
            font-size: 26rem;
            line-height: 50px;
        }
    }
}

@media (max-width: 769px) {
    .select-momo {
        width: 1200rem;
        padding: 33rem 50rem 50rem 50rem;

        .title {
            width: 800rem;
            height: 76rem;

            span {
                font-size: 55rem;
            }
        }

        .sub-title {
            font-size: 45rem;
            margin-top: 30rem;
            margin-bottom: 22rem;
        }

        .list {
            height: 1200rem;
            padding: 20rem;
            margin-bottom: 60rem;

            ul {
                grid-template-columns: auto auto auto;
            }

            li {
                margin-top: 25rem;
            }
        }

        .button {
            line-height: 147rem;
            width: 400rem;
            font-size: 50rem;
        }
    }
}
</style>
