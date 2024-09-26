<template>
    <Dialog id="standard-hashrate" :top="20" :width="570">
        <div class="tab-panel" style="background: #1f242c;padding:20px">
            <div class="title">
				<p>
					{{ $t("Fetters_11") }}:
					<span class="color-yellow">{{currentTotalAddition}}%</span>
					<img src="@/assets/icon/warning-icon.png" />
				</p>
				<p>
					{{$t('MOMO_99')}}:&nbsp;
					<span style="color: #aaf45a">{{totalAddition}}%</span>
				</p>
            </div>
            <div class="tab-panel momo-c mgt-10 tal">
                <PetItemSmall
                    v-for="(item, index) in momos"
                    :key="index"
                    :data="item"
                    :showTipIcon="true"
                    @iconClick="toUpdate(item)"
                />
            </div>
        </div>
    </Dialog>
</template>

<script>
import { mapState } from 'vuex';
import { CommonMethod } from "@/mixin";
import { Dialog, PetItemSmall } from '@/components';

export default{
    props: {
        currentTotalAddition: Number,
        totalAddition: Number,
    },
    components: { Dialog, PetItemSmall },
	mixins: [CommonMethod],
    data() {
        return {};
    },
    computed: {
		...mapState({
			hashrateInfo: (state) => state.globalState.hashrateInfo,
			myNFT_stake: (state) => state.ethState.data.myNFT_stake,
		}),
		momos() {
			const data = this.myNFT_stake.filter((item) => {
				const vType = parseInt(item.prototype / 1e4);
                return vType > 3;
			});

            data.sort((item) => item.isStandard ? 1 : -1);

            return data;
		},
    },
    methods: {
		// 跳转升级
		toUpdate({ prototype, tokenId, location }) {
			this.oprDialog('standard-hashrate', 'none');
			this.oprDialog('showPetPowerUp-dialog', 'none');
			this.$router.push(`/upgrade/${prototype}-${tokenId}-${location}`);
		},
    },
}
</script>

<style lang="less" scoped>
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
        min-height:200px;max-height:410px;overflow:auto
    }

    .title {
        font-size: 15px;
        text-align: left;

        span, img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
        }

        img {
            width: 22px;
        }

        .total-addition {
            color: #aaf45a;
        }
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
