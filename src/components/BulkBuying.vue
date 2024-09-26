<template>
  <transition name="bounce">
    <div class="bulk-buying" v-if="value">
      <div class="mask" @click="close"></div>
      <div class="content">
        <!-- 关闭按钮 -->
        <div class="close" @click="close">
          <img src="../assets/icon/close.png" />
        </div>
        <div class="head">
          <div class="title">{{$t("Market_15")}}</div>
          <div class="clear" @click="clear">
            <span> {{$t("Market_16")}} </span>
            <svg viewBox="0 0 1024 1024" width="20" height="20">
              <path fill="#838689" d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"></path>
              <path fill="#838689" d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"></path>
            </svg>
          </div>
        </div>
        <!-- 列表 -->
        <div class="list">
          <slot></slot>
        </div>
        <!-- 操作按钮 -->
        <div class="operation">
          <div class="icon">
            <span>{{count}}</span>
  					<img src="@/assets/icon/shopcar.png" />
          </div>
          <!-- 价格 -->
          <div class="price">
            <div class="label">{{$t("Market_18")}}</div>
            <div class="amount-layout">
              <img src="@/assets/coin/USDT.png" />
              <div class="amount">
                <span>{{totalPrice}}</span>
                <small>USDT</small>
              </div>
            </div>
          </div>
          <!-- 按钮 -->
          <div :class="['buttons', isApproveUSDT ? null : 'btn-group']">
  					<StatuButton v-if="!isApproveUSDT" data-step="1" :onClick="approve" :isLoading="coinArr['USDT'].isApproving">{{$t("Air-drop_16")}} USDT</StatuButton>
            <StatuButton data-step="2" :isDisable="count == 0 || !isApproveUSDT" :onClick="pay">{{$t("Market_22")}}</StatuButton>
          </div>
        </div>
        <!-- 提示 -->
        <div class="footer">
          <div :class="['icon', ignoreChange ? 'active' : null]" @click="toggleIgnoreChange">
            <svg v-if="ignoreChange" viewBox="0 0 1024 1024" width="20" height="20"><path fill="#92FFDA" d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z" ></path></svg>
          </div>
          <p>{{$t("Market_71")}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import {  Wallet } from '@/utils';
import { CommonMethod } from "@/mixin";
import StatuButton from "@/components/StatuButton";
import { PancakeConfig, WalletConfig } from "@/config";

export default {
	mixins: [CommonMethod],
  props: {
    // 显示状态
    value: {
      type: Boolean,
      default: false,
    },
    // 数量
    count: {
      type: Number,
      required: true,
    },
    // 总价格
    totalPrice: {
      type: String,
      required: true,
    },
  },
  components: {
    StatuButton,
  },
  data() {
    return {
      // 忽略价格变化
      ignoreChange: false,
    };
  },
  computed: {
		...mapState({
			coinArr: (state) => state.bnbState.data.coinArr,
		}),
    // usdt授权状态
		isApproveUSDT() {
			return this.coinArr['USDT'].allowanceToAuction > 0;
		},
  },
  methods: {
    // 关闭
    close() {
      this.$emit("input", false);
    },
    // 修改价格忽略状态
    toggleIgnoreChange() {
      this.ignoreChange = !this.ignoreChange;
    },
		//授权
		async approve(){
      let coinKey = "USDT";
      let { isApproving} = this.coinArr[coinKey];

      if(isApproving) return;

      let hash = await Wallet.ETH.approveErcToTarget(
        PancakeConfig.SelectCoin["USDT"].addr,
        WalletConfig.ETH.moMoStakeAuction, {coinKey, type: "allowanceToAuction"}
      );

      if (hash) {
        this.coinArr[coinKey].isApproving = true;
      }
		},
    // 清除
    clear() {
      this.$emit('clear');
    },
    // 支付
    pay() {
			if(Number(this.totalPrice) > Number(this.coinArr.USDT.balance)){
				this.showNotify(this.$t("Market_34"), "error");
				return ;
			}

      this.$emit('pay', this.ignoreChange);
    }
  },
};
</script>

<style lang="less" scoped>
.bulk-buying,
.mask {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bulk-buying {
  position: fixed;
  z-index: 10000;

  img {
    display: block;
    max-width: 100%;
  }
}

.mask {
  z-index: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
}

.content {
  position: relative;
  z-index: 9;
  width: 500px;
  box-sizing: border-box;
  padding: 15px;
  margin: 40px auto 0 auto;
  background: #13181f;
  border: 1px solid #36383a;
  border-radius: 10px;
}

// 关闭按钮
.close {
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  border: 1px solid #36383A;
  border-radius: 50%;

  img {
    display: block;
    width: 100%;
  }
}

// 头部
.head {
  display: flex;
  align-content: center;
  text-align: left;
  padding-top: 10px;

  .title {
    opacity: 0.6;
    flex: 1;
  }

  // 标题
  .clear {
    cursor: pointer;

    &:hover {
      span {
        opacity: 1;
      }
    }

    span {
      opacity: 0.6;
    }

    & > * {
      vertical-align: middle;
    }
  }
}

// 列表
.list {
  margin-top: 10px;
  max-height: 690px;
  min-height: 200px;
  background: #05080d;
  border-radius: 5px;
  padding: 10px;
  overflow-y: scroll;
}

// 操作
.operation {
  display: flex;
  align-items: center;
  margin-top: 20px;

  // 数量图标
  .icon {
    width: 40px;
    position: relative;

    span {
      width: 17px;
      height: 17px;
      background: red;
      border-radius: 10px;
      font-size: 12px;
      color: #fff;
      display: inline-block;
      text-align: center;
      line-height: 16px;
      position: absolute;
      top: 0px;
      right: -5px;
    }
  }

  // 价格
  .price {
    flex: 1;
    margin-left: 12px;

    .label {
      font-size: 12px;
      opacity: 0.5;
      text-align: left;
      margin-bottom: 5px;
    }

    .amount-layout {
      display: flex;
      align-items: center;

      .amount {
        margin-left: 5px;

        & > * {
          line-height: 1;
          vertical-align: bottom;
        }
      }

      img {
        width: 20px;
        height: 20px;
      }

      span {
        font-family: Verdana;
        font-size: 20px;
        margin: 0 5px;
      }

      small {
        font-size: 12px;
      }
    }
  }

  // 按钮
  .buttons {
    display: flex;
    flex-direction: column;
    padding-right: 20px;

    button:first-child {
      margin-bottom: 10px;
    }
  }
}

// 底部提示
.footer {
  display: flex;
  margin-top: 20px;
  text-align: left;

  .icon {
    width: 20px;
    height: 20px;
    background: #585d64;
    border-radius: 20px;
    display: inline-block;
    cursor: pointer;
  }

  p {
    margin-left: 5px;
  }
}

@media (max-width: 768px) {
  .bulk-buying {
    padding: 10px;
    box-sizing: border-box;
  }

  .content {
    width: 100%;
    margin-top: 50px;
  }

  .list {
    max-height: 400px;
  }
}

// 过度动画
.bounce-enter-active,
.bounce-leave-active {
  transition: opacity 0.3s;

  .mask {
    transition: opacity 0.3s;
  }

  .content {
    transition: transform 0.3s, opacity 0.3s;
  }
}

.bounce-enter .content,
.bounce-leave-to .content,
.bounce-enter .mask,
.bounce-leave-to .mask {
  opacity: 0;
}

.bounce-enter .content,
.bounce-leave-to .content {
  transform: translateY(-200px);
}
</style>
