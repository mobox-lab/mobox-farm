<template>
    <div class="page-container">
        <div class="page-background">
            <img src="@/assets/furnaceFour/background.webp" />
        </div>
        <div class="four-content">
            <div class="countdown">
                <span>{{ day }}</span>
                <div class="division">:</div>
                <span>{{ hour }}</span>
                <div class="division">:</div>
                <span>{{ minute }}</span>
                <div class="division">:</div>
                <span>{{ second }}</span>
            </div>
            <div class="merge-content">
                <div class="card">
                    <img
                        src="@/assets/furnaceFour/rule.webp"
                        class="rule"
                        @click="toggleShowRule"
                    />
                    <div class="momos">
                        <div class="main-momo">
                            <div class="title momo-title">
                                {{ $t("MOMOMerge_05") }}
                            </div>
                            <div @click="showSelected('main')">
                                <div class="add" v-if="!main">
                                    <img
                                        src="@/assets/furnaceFour/main-add.webp"
                                    />
                                </div>
                                <div class="momo-container" v-else>
                                    <Item :data="main" />
                                </div>
                            </div>
                        </div>
                        <div class="momo-division"></div>
                        <div class="material-momo">
                            <div class="title momo-title">
                                {{ $t("MOMOMerge_06") }}
                            </div>
                            <div @click="showSelected('momo1')">
                                <div class="add" v-if="!momo1">
                                    <img
                                        src="@/assets/furnaceFour/material-add.webp"
                                    />
                                </div>
                                <div class="momo-container" v-else>
                                    <Item :data="momo1" />
                                </div>
                            </div>
                        </div>
                        <div class="material-momo2">
                            <div @click="showSelected('momo2', $event)">
                                <div class="add" v-if="!momo2">
                                    <img
                                        src="@/assets/furnaceFour/material-add.webp"
                                    />
                                </div>
                                <div class="momo-container" v-else>
                                    <Item :data="momo2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hash">
                        <div class="hash-item">
                            <div class="hash-title">{{ $t("MOMO_49") }}</div>
                            <div class="value" v-if="main">
                                <img
                                    class="airdrop"
                                    src="@/assets/icon/airdrop.png"
                                />
                                <span class="hash-change">{{
                                    main.hashrate
                                }}</span>
                                <img
                                    class="upgrade"
                                    src="@/assets/icon/upgradejt.png"
                                />
                                <img
                                    class="airdrop"
                                    src="@/assets/icon/airdrop.png"
                                />
                                <span class="hash-change" v-if="consumeMec"
                                    >[{{ initialHashrate[0] }},
                                    {{ initialHashrate[1] }}]</span
                                >
                                <Loading v-if="infoLoading" />
                            </div>
                        </div>
                        <div class="hash-item">
                            <div class="hash-title">{{ $t("MOMO_50") }}</div>
                            <div class="label"></div>
                            <div class="value" v-if="main">
                                <span class="hash-change"
                                    >Lv {{ main.level }}</span
                                >
                                <img
                                    class="upgrade"
                                    src="@/assets/icon/upgradejt.png"
                                />
                                <span class="hash-change" v-if="momo1 || momo2"
                                    >Lv {{ furnaceLv }}</span
                                >
                                <Loading v-if="infoLoading" />
                            </div>
                        </div>
                        <div class="hash-item">
                            <div class="hash-title">{{ $t("MOMO_51") }}</div>
                            <div class="value" v-if="main">
                                <img
                                    class="airdrop"
                                    src="@/assets/icon/airdrop.png"
                                />
                                <span class="hash-change">{{
                                    main.lvHashrate
                                }}</span>
                                <img
                                    class="upgrade"
                                    src="@/assets/icon/upgradejt.png"
                                />
                                <img
                                    class="airdrop"
                                    src="@/assets/icon/airdrop.png"
                                />
                                <span class="hash-change" v-if="consumeMec"
                                    >[{{ lvHashrate[0] }},
                                    {{ lvHashrate[1] }}]</span
                                >
                                <Loading v-if="infoLoading" />
                            </div>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="action">
                        <div class="title merge-record">Merge Record</div>
                        <div class="btns">
                            <button
                                class="btn"
                                :disabled="disabledLock"
                                @click="morge"
                            >
                                <Loading v-if="lockLoading" />
                                <span v-else>{{ $t("MOMOMerge_08") }}</span>
                            </button>
                            <button
                                class="btn merge-btn"
                                :disabled="disabledMorge"
                                @click="endMerge"
                            >
                                <Loading v-if="morgeLoading" />
                                <span v-else>{{ $t("MOMOMerge_09") }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 选择momo -->
        <Dialog v-model="isShowSelect">
            <SelectMomo
                :isShowTip="selectType != 'main'"
                :current="current"
                :type="selectType === 'main' ? null : mainType"
                :selected="selected"
                @onSelect="onSelect"
            />
        </Dialog>

        <Dialog v-model="isShowRule">
            <Rule />
        </Dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { BaseConfig, ConstantConfig } from "@/config";
import { CommonMethod } from "@/mixin";
import { Common, Wallet } from "@/utils/";
import { Loading } from "@/components";
import Dialog from "./dialog";
import Rule from "./rule";
import SelectMomo from "./select-momo";
import Item from "./momo-item";
// import Record from "./record";

export default {
    mixins: [CommonMethod],
    components: {
        Loading,
        SelectMomo,
        Dialog,
        Rule,
        Item,
        // Record,
    },
    data() {
        return {
            loading: false,
            // 0空闲/融合结束, 1等待融合, 2开始融合
            status: null,
            consumeMec: null,
            isShowFurnace: false,
            isShowSelect: false,
            isShowRule: false,
            main: null,
            momo1: null,
            momo2: null,
            selectType: null,
            timer: null,
            countDownTimer: null,
            isShowRecord: false,
            endTime: 1705734000000,
            day: "00",
            hour: "00",
            minute: "00",
            second: "00",
            infoLoading: false,
            lockLoading: false,
            morgeLoading: false,
        };
    },
    computed: {
        ...mapState({
            myNFT_stake: (state) => state.ethState.data.myNFT_stake,
            hashrateInfo: (state) => state.globalState.hashrateInfo,
        }),
        disabledLock() {
            return this.status != 0 || !this.consumeMec || this.lockLoading;
        },
        disabledMorge() {
            return this.status != 1 || this.morgeLoading;
        },
        mainType() {
            if (!this.main) {
                return null;
            }

            return parseInt(this.main.prototype / 1e4);
        },
        standardsHashrate() {
            const vType = this.mainType;
            return this.hashrateInfo[`v${vType}StandardHashrate`];
        },
        // 选中的momo
        selected() {
            return [this.main, this.momo1, this.momo2]
                .filter((item) => item && item != this[this.selectType])
                .map((item) => item.tokenId);
        },
        current() {
            return this[this.selectType];
        },
        // 融合等级
        furnaceLv() {
            const vType = this.mainType;
            const lvConfig = BaseConfig[`MomoLv${vType}Cfg`];
            const value = [this.main, this.momo1, this.momo2].reduce(
                (data, item) => {
                    if (item) {
                        return data + lvConfig[item.level].lvValue;
                    }

                    return data;
                },
                0
            );

            if (value >= lvConfig["40"].lvValue) {
                return 40;
            }

            return this.findConfig(value, "lvValue", lvConfig, false).lv;
        },
        // 初始算力升级信息
        initialHashrate() {
            if (this.consumeMec) {
                const vType = this.mainType;
                const lvConfig = BaseConfig[`MomoEnhanceV${vType}Cfg`];
                const min = this.findConfig(
                    this.consumeMec * 0.75,
                    "totalMec",
                    lvConfig
                );
                const max = this.findConfig(
                    this.consumeMec * 1.25,
                    "totalMec",
                    lvConfig
                );
                return [min.hashrate, max.hashrate];
            }

            return null;
        },
        lvHashrate() {
            const level = this.furnaceLv;

            return this.initialHashrate.map((hashRate) => {
                let staticPower, staticPercent;

                if (this.mainType == 4) {
                    staticPower = 2000 + parseInt((hashRate - 10) * 50);
                    staticPercent = 0.2;
                } else {
                    staticPower = 5000 + parseInt((hashRate - 50) * 50);
                    staticPercent = 0.3;
                }

                return parseInt(
                    hashRate +
                        parseInt((staticPower * (level - 1)) / 100) +
                        parseInt(
                            (parseInt(level / 5) *
                                (1 + parseInt(level / 5)) *
                                staticPower *
                                staticPercent) /
                                200
                        )
                );
            });
        },
    },
    methods: {
        // 移除
        remove(type, event) {
            event.preventDefault();
            event.stopPropagation();

            if (type == "main") {
                this.main = this.momo1 = this.momo2 = null;
            } else {
                this[type] = null;
            }
        },
        // 倒计时
        countDown() {
            const time = this.endTime - Date.now();

            if (time >= 0) {
                const day = Math.floor(time / 1000 / 60 / 60 / 24);
                const hour = Math.floor((time / 1000 / 60 / 60) % 24);
                const minute = Math.floor((time / 1000 / 60) % 60);
                const second = Math.floor((time / 1000) % 60);

                this.day = this.checkTime(day);
                this.hour = this.checkTime(hour);
                this.minute = this.checkTime(minute);
                this.second = this.checkTime(second);
                this.countDownTimer = setTimeout(this.countDown, 1000);
            } else {
                this.day = "00";
                this.hour = "00";
                this.minute = "00";
                this.second = "00";
            }
        },
        checkTime(value) {
            if (value < 10) {
                return "0" + value;
            }

            return value;
        },
        showFurnace() {
            this.isShowFurnace = true;
        },
        setSize() {
            const screenWidth = document.documentElement.clientWidth;
            const fontSize = screenWidth / 1280;
            document.documentElement.style.fontSize = `${fontSize}px`;
        },
        showSelected(type) {
            if (this.status == 1) {
                return;
            }

            if (type != "main" && !this.main) {
                this.showNotify(this.$t("MOMOMerge_13"), "error");
                return;
            }

            this.selectType = type;
            this.toggleShowSelect();
        },
        // 切换显示选择momo
        toggleShowSelect() {
            this.isShowSelect = !this.isShowSelect;
        },
        // 切换显示记录
        toggleShowRecord() {
            this.isShowRecord = !this.isShowRecord;
        },
        // 切换显示Rule
        toggleShowRule() {
            this.isShowRule = !this.isShowRule;
        },
        onSelect(data) {
            this[this.selectType] = data;

            if (this.selectType === "main") {
                this.momo2 = this.momo1 = this.consumeMec = null;
            } else {
                this.getMomoInfo();
            }

            this.selectType = null;
            this.toggleShowSelect();
        },
        // 获取momo融合信息
        async getMomoInfo() {
            const ids = [this.main.tokenId];

            if (this.momo1) {
                ids.push(this.momo1.tokenId);
            }

            if (this.momo2) {
                ids.push(this.momo2.tokenId);
            }

            this.infoLoading = true;

            try {
                const res = await Wallet.ETH.furnace.methods
                    .testMerge(ids)
                    .call();
                this.consumeMec = res.mec;
            } catch (_) {}

            this.infoLoading = false;
        },
        findConfig(value, key, config, findNext = true) {
            const keys = Object.keys(config);

            for (let index = 0; index < keys.length; index++) {
                const item = config[keys[index]];
                const next = config[keys[index + 1]];

                if (value >= item[key] && value < next[key]) {
                    if (findNext) {
                        return next;
                    }

                    return item;
                }
            }
        },
        // 获取订单状态
        async getOrderStatus() {
            try {
                const address = await Wallet.ETH.getAccount();
                const res = await Wallet.ETH.furnace.methods
                    .getOrder(address)
                    .call();

                this.status = res.status;

                if (res.status == 1) {
                    const tokenIds = res.tokenIds;

                    this.main = await this.getMomoByTokenId(tokenIds[0]);
                    this.momo1 = await this.getMomoByTokenId(tokenIds[1]);
                    this.momo2 = await this.getMomoByTokenId(tokenIds[2]);
                    this.getMomoInfo();
                } else if (this.status == 2) {
                    this.timer = setTimeout(this.getOrderStatus, 5000);
                }
            } catch (error) {}
        },
        // 获取momo
        async getMomoByTokenId(tokenId) {
            if (!tokenId || tokenId == "0") {
                return null;
            }

            const res = await Wallet.ETH.moMoTokenContract.methods
                .getMomoByTokenId(tokenId)
                .call();

            return {
                tokenId,
                vType: parseInt(res[0] / 1e4),
                prototype: res[0],
                hashrate: res[5],
                lvHashrate: res[6],
                level: res[3],
                quality: res[1],
                category: res[2],
            };
        },
        async morge() {
            const ids = [this.main.tokenId];

            if (this.momo1) {
                ids.push(this.momo1.tokenId);
            }

            if (this.momo2) {
                ids.push(this.momo2.tokenId);
            }

            const address = await Wallet.ETH.getAccount();
            const contract = Wallet.ETH.furnace.methods.beginMerge(ids);

            this.lockLoading = true;

            Wallet.ETH.sendMethod(
                contract,
                { from: address, gasLimit: this.momo2 ? 900000 : 600000 },
                (hash) => {},
                (data) => {
                    this.status = 1;
                    this.lockLoading = false;
                },
                () => {
                    this.lockLoading = false;
                }
            );
        },
        async endMerge() {
            const address = await Wallet.ETH.getAccount();
            const contract = Wallet.ETH.furnace.methods.endMerge();
            const self = this;

            this.morgeLoading = true;

            Wallet.ETH.sendMethod(
                contract,
                { from: address, gasLimit: this.momo2 ? 900000 : 600000 },
                (hash) => {},
                (data) => {
                    self.morgeLoading = false;
                    self.main = self.momo1 = self.momo2 = null;
                    self.getOrderStatus();
                    Common.app.setMyNftByType(
                        ConstantConfig.NFT_LOCATION.STAKE
                    );
                },
                () => {
                    self.morgeLoading = false;
                }
            );
        },
    },
    async mounted() {
        window.addEventListener("resize", this.setSize);
        this.setSize();
        this.countDown();
        this.infoLoading = true;
        try {
            await this.getOrderStatus();
        } catch (_) {}
        this.infoLoading = false;
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setSize);
        clearTimeout(this.timer);
        clearTimeout(this.countDownTimer);
        document.documentElement.style.fontSize = "";
    },
};
</script>

<style lang="less" scoped>
.page-container {
    font-family: "you-she";
    position: relative;
}

.page-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 0;
    background: #000;
    height: 100%;

    img {
        width: 100%;
        height: auto;
    }
}

.four-content {
    position: relative;
    z-index: 9;

    .countdown {
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: -2px -2px 0 #010c40, 2px -2px 0 #010c40, -2px 2px 0 #010c40,
            2px 2px 0 #010c40, -2px 0px 0 #010c40, 2px 0px 0 #010c40,
            0px -2px 0 #010c40, 0px 2px 0 #010c40;
    }

    .merge-content {
        display: flex;
        justify-content: center;
        align-items: center;

        .card {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(30px);
            position: relative;

            .momos {
                display: flex;
                align-items: end;

                .main-momo {
                }
            }

            .rule {
                position: absolute;
                cursor: pointer;
            }
            .hash {
                display: flex;
                flex-direction: column;

                .hash-item {
                    text-align: center;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .hash-title {
                        font-weight: 500;
                    }
                    .value {
                        display: flex;
                        font-weight: 700;
                        color: #ffcc0a;
                        .airdrop {
                            position: relative;
                        }
                    }
                }

                .hash-item:first-child {
                    border-left: none;
                    // align-items: start;
                }
                .hash-item:last-child {
                    // align-items: end;
                }
            }
            .divider {
                width: 100%;
                height: 1px;
                background-color: rgba(255, 255, 255, 0.1);
            }
            .action {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .btns {
                    display: flex;
                    .btn {
                        background-color: #2956ed;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: 700;
                        color: white;
                    }
                    .btn:hover {
                        background-color: rgba(41, 86, 237, 0.8);
                    }
                }
            }
            .merge-record {
                cursor: pointer;
            }
        }

        .momo-division {
            background: rgba(255, 255, 255, 0.1);
        }
        .title {
            font-weight: 600;
        }
    }
}

.content {
    margin-top: 100vw;
    position: relative;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (min-width: 1200px) {
    .page-background {
        // left: 260px;
        width: calc(100% - 260px);
    }

    .four-content {
        margin-top: 560px;

        .countdown {
            span {
                font-size: 32px;
            }
            .division {
                font-size: 16px;
                margin: 0 10px;
            }
        }

        .card {
            margin-top: 20px;
            border-radius: 12px;
            width: 571px;
            padding: 20px;

            .rule {
                top: 0;
                right: -110px;
                width: 90px;
                height: 90px;
            }

            .hash {
                margin-top: 20px;
                gap: 20px;

                .hash-item {
                    .value {
                        gap: 8px;
                        font-size: 16px;
                        .airdrop {
                            width: 16px;
                            height: 16px;
                            top: 4px;
                        }
                        .upgrade {
                            // margin: 0 8px;
                        }
                    }
                }
            }

            .hash-title {
                font-size: 14px;
            }

            .hash-value {
                margin-top: 4px;
                font-size: 20px;
            }
        }

        .momo-division {
            width: 1px;
            height: 152px;
            margin: 0 20px;
        }
        .momo-title {
            margin-bottom: 16px;
        }

        .add {
            width: 160px;
            height: 160px;

            img {
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
        }

        .material-momo2 {
            margin-left: 8px;
        }

        .title {
            font-size: 16px;
        }
        .action {
            .btns {
                .btn {
                    width: 144px;
                    height: 40px;
                    border-radius: 8px;
                    font-size: 14px;
                }
                .merge-btn {
                    margin-left: 8px;
                }
            }
        }
        .divider {
            margin: 20px 0;
        }
    }
}

@media (max-width: 1200px) {
    .page-background {
        left: 0;
    }
}
</style>
