<template>
    <section>
        <!-- 转移 -->
        <Dialog id="transfer-dialog" :top="20" :width="570">
            <h2 class="mgt-20">{{$t("MOMO_92")}}</h2>
            <div class="tab-panel mgt-10" style="background: #1f242c;padding:20px">
                <div class="aveage-box">
                    <p class="tal small">{{$t("Market_82")}}{{ getTotalSelectNum }}</p>
                    <div class="tar" style="zoom: 0.8">
                        <div class="dib sort-btn" @click="sort = -sort">
                            <svg viewBox="0 0 1024 1024" version="1.1" width="20" height="20">
                                <path d="M600.436364 60.509091v907.636364c0 27.927273 18.618182 46.545455 46.545454 46.545454s46.545455-18.618182 46.545455-46.545454V158.254545l116.363636 93.09091c18.618182 18.618182 51.2 13.963636 65.163636-4.654546 18.618182-18.618182 13.963636-51.2-4.654545-65.163636L679.563636 23.272727c-32.581818-27.927273-79.127273-4.654545-79.127272 37.236364zM377.018182 9.309091c-27.927273 0-46.545455 18.618182-46.545455 46.545454v809.89091l-116.363636-93.09091c-18.618182-18.618182-51.2-13.963636-65.163636 4.654546-18.618182 18.618182-13.963636 51.2 4.654545 65.163636l190.836364 158.254546c32.581818 23.272727 74.472727 4.654545 74.472727-37.236364V55.854545c4.654545-23.272727-18.618182-46.545455-41.890909-46.545454z" fill="#838689">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="tab-panel momo-c mgt-10 tal">
                    <PetItemSmall
                        v-for="(item, index) in momos"
                        :key="index"
                        :data="item"
                        :showTipIcon="true"
                        :verificationHashrate="true"
                        :selectProtoTypes="selectProtoTypes"
                        :isSelected="(selected.indexOf(item.tokenId) != -1) || (selected.indexOf(item.prototype) != -1)"
                    />
                </div>
                <div class="tal mgt-10 small opa-6" v-html="$t('MOMO_107')"></div>
                <StatuButton style="min-width: 160px" :isLoading="lockBtn.transMoMoLock > 0" class="mgt-10" :onClick="recallAll">
                    {{$t("MOMO_92")}}({{getTotalSelectNum}})
                </StatuButton>
            </div>
        </Dialog>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { CommonMethod } from "@/mixin";
import { BaseConfig, WalletConfig, ConstantConfig } from '@/config';
import { Dialog, PetItemSmall, StatuButton } from '@/components';
import { Wallet, Common} from '@/utils';

function initData(params) {
    return ;
}

export default {
    components: {Dialog, PetItemSmall, StatuButton},
	mixins: [CommonMethod],
    data() {
        return {
            selectProtoTypes: {
                v1: [], v1_tokenId: [], v1_price: [],
                v2: [], v2_tokenId: [], v2_price: [],
                v3: [], v3_tokenId: [], v3_price: [],
                v4: [], v4_tokenId: [], v4_price: [],
                v5: [], v5_tokenId: [], v5_price: [],
                v6: [], v6_tokenId: [], v6_price: [],
                upTs: Date.now(),
            },
            momo_1155: {},
            momo_721: [],
            selected: [],
            lock: false,
        };
    },
    computed: {
        ...mapState({
            myNFT_verse: (state) => state.ethState.data.myNFT_verse,
            lockBtn: (state) => state.globalState.data.lockBtn,
        }),
        momos() {
            return [...this.myNFT_verse].sort((a, b) => (b.lvHashrate - a.lvHashrate) * 1);
        },
        getTotalSelectNum() {
            return this.selected.length;
        },
    },
    watch: {
        myNFT_verse: {
            immediate: true,
            handler() {
                if (this.momos.length) {
                    this.selected = [];
                    this.init();
                }
            }
        },
    },
    methods: {
        onSelectChange(item) {
            let {vType, tokenId, prototype} = item;
            let handTokenArr = this.selectProtoTypes["v"+vType+"_tokenId"];
            let handProtoArr = this.selectProtoTypes["v"+vType];
            let handPriceArr = this.selectProtoTypes["v"+vType+"_price"];
            let targetPos = handTokenArr.indexOf(tokenId);
            if (targetPos != -1) {
                handTokenArr.splice(targetPos, 1);
                handProtoArr.splice(targetPos, 1);
                handPriceArr.splice(targetPos, 1);
            } else {
                handTokenArr.push(tokenId);
                handProtoArr.push(prototype);
                handPriceArr.push("");
            }
        },
        // 获取1155的momo
        async get1155() {
            let ids = Object.keys(BaseConfig.NftCfg).filter(key => BaseConfig.NftCfg[key].quality < 4);
			const res = await Wallet.ETH.get1155Num(WalletConfig.ETH.momoVerse, ids);
            const data = {};

            for (let key in res) {
                if (parseInt(res[key]) > 0) {
                    data[key] = res[key];
                }
            }

            // 1155选取前150个
            this.momo_1155 = data;
            this.selected = [...this.selected, ...Object.keys(data).slice(0, 150)];
        },
        // 获取721的momo
        async get721() {
            const address = await Wallet.ETH.getAccount();
            this.momo_721 = await Wallet.ETH.momoStakeContract_verse.methods.tokensOfOwner(address).call();
            this.selected = [...this.selected, ...this.momo_721];
        },
        // 转入
        async recallAll() {
            const ids = Object.keys(this.momo_1155).slice(0, 150);
            const amount = Object.values(this.momo_1155).slice(0, 150);
            const address = await Wallet.ETH.getAccount();

			Wallet.ETH.sendMethod(
				Wallet.ETH.momoStakeContract_verse.methods.recallAll(ids, amount), {from: address},
				(hash) => {
                    if (hash) {
                        Common.app.lockBtnMethod("transMoMoLock");
                    }
                },
				async () => {
					Common.app.unLockBtn("transMoMoLock");
					await Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.VERSE);
                    this.init();
				}
			)
        },
        async init() {
            if (!this.lock) {
                this.lock = true;

                try {
                    await Promise.all([this.get1155(), this.get721()]);
                } catch(_) {}

                this.lock = false;
            }
        }
    },
}
</script>

<style scoped>
   .top-tab .active{
        background: #1752f679;
        border-radius: 0px 0px 10px 10px;
   }
   .top-tab div{
        display: inline-flex;
        height: 40px;
        justify-content: center;
        align-items: center;
        padding: 0px 30px;
   }
   .top-tab{
        background: #13181f;
        border: 1px solid #2c3441;
        border-radius: 0px 0px 10px 10px;
        cursor: pointer;
        height: 40px;
        display: inline-block;
        position: absolute;
        top: 0px;
        white-space: nowrap;
        left: 50%;
        transform: translateX(-50%);
   } 
    .momo-c{
        min-height:200px;
        max-height:410px;
        overflow-y:auto;
        overflow-x: hidden;
    }
    @media (max-width: 768px) {
        .momo-c{
            max-height:300px;
        }
        #big-sell-dialog .tab-panel{
            padding: 20px 10px !important;
        }
        .cp-show{
            width: 95px !important;
        }
        .top-tab{
            /* width: 100%; */
            /* zoom: 0.6; */
        }
    }
</style>
