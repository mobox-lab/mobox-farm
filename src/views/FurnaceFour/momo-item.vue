<template>
    <div :class="['momo', selected ? 'selected' : null]">
        <div :class="['skew', `v${data.vType}`]"></div>
        <div class="momo-image">
            <img :src="require(`../../assets/pet/${data.prototype}.png`)" />
        </div>
        <!-- 算力 -->
        <div class="hashrate">
            <img src="../../assets/icon/airdrop.png" />
            <span
                :class="[
                    data.quality < 4 ? 'c-lv1' : `c-lv${data.quality - 1}`,
                ]"
            >
                {{ data.lvHashrate }}
            </span>
        </div>
        <!-- 等级 -->
        <div class="lv">Lv.{{ data.level }}</div>
        <div class="category">
            <img
                :src="
                    require(`../../assets/icon/${
                        category_img[data.category]
                    }.png`)
                "
                alt=""
                width="18"
                height="18"
            />
        </div>
        <!-- 选中 -->
        <div class="check-icon" v-if="selected">
            <img src="@/assets/furnaceFour/select.webp" />
        </div>
    </div>
</template>

<script>
import { CommonMethod } from "@/mixin";

export default {
    mixins: [CommonMethod],
    props: {
        data: Object,
        selected: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="less" scoped>
.momo {
    position: relative;

    .momo-image {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            transform: scale(0.8);
        }
    }

    .hashrate {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 0px 12px 0px 8px;
        top: 0;
        right: 0;
        z-index: 998;
        display: flex;
        align-items: center;
        font-weight: bold;
        font-family: none;

        img {
            height: 80%;
        }
    }

    .lv {
        position: absolute;
        // border-radius: 11rem;
        z-index: 10;
        // background-image: linear-gradient(90deg, #181818, 50%, rgba(12, 12, 12, 0.4));
        font-family: none;
        font-weight: 600;
    }

    .category {
        position: absolute;
        bottom: 0px;
        left: 50%;
        z-index: 11;
        transform: translate(-50%, 0);
        background: #1a2c50;
        border-radius: 100%;
        border: 1px solid #315184;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .skew {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
    }

    &.selected {
        .skew,
        .momo-image {
            opacity: 0.3;
        }
    }

    .check-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 15;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        img {
            width: 40%;
        }
    }

    .v1 {
        background-image: url("../../assets/nft_head_v1.png");
    }

    .v2 {
        background-image: url("../../assets/nft_head_v2.png");
    }

    .v3 {
        background-image: url("../../assets/nft_head_v3.png");
    }

    .v4 {
        background-image: url("../../assets/nft_head_v4.png");
    }

    .v5 {
        background-image: url("../../assets/nft_head_v5.png");
    }

    .v6 {
        background-image: url("../../assets/nft_head_v6.png");
    }
}

@media (min-width: 1200px) {
    .hashrate {
        padding: 0 6rem;
        height: 20rem;
        font-size: 16rem;

        img {
            margin-right: 2rem;
        }
    }

    .lv {
        left: 12rem;
        top: 6rem;
        font-size: 16rem;
    }

    .category {
        width: 20rem;
        height: 20rem;
        padding: 2rem;
    }
}

@media (max-width: 1200px) and (min-width: 769px) {
    .hashrate {
        padding: 0 15rem;
        height: 30rem;
        font-size: 15rem;

        img {
            margin-right: 10rem;
        }
    }

    .lv {
        left: 12px;
        top: 6px;
        font-size: 12px;
    }

    .category {
        width: 32rem;
        height: 32rem;
        padding: 5rem;
    }
}

@media (max-width: 769px) {
    .hashrate {
        padding: 2rem 22rem;
        height: 70rem;
        font-size: 28rem;
        border-radius: 0px 6px 0px 8px!important;

        img {
            margin-right: 20rem;
        }
    }

    .lv {
        left: 16rem;
        top: 10rem;
        font-size: 28rem;
    }

    .category {
        width: 60rem;
        height: 60rem;
        padding: 10rem;
    }
}
</style>
