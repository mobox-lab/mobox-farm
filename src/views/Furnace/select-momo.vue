<template>
  <div class="select-momo">
    <div class="title">
      <span>{{$t('BOX_18')}}</span>
    </div>
    <p class="sub-title">{{$t('MOMOMerge_12')}}</p>
    <div class="list">
      <ul>
        <li v-for="(item, index) in momos" :key="index" @click="onSelect(item)">
          <Item :data="item" :selected="ids.indexOf(item.tokenId) >= 0" />
        </li>
      </ul>
    </div>
    <div class="button" @click="onConfirm">{{$t('Common_03')}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CommonMethod } from "@/mixin";
import Item from './momo-item';

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
            return vType === this.type && !isStandard && item.rent.state == -1;
          }

          return !isStandard && (vType === 4 || vType === 5) && item.rent.state == -1;
        })
        .sort((a, b) => (b.lvHashrate - a.lvHashrate) * 1);
    },
    ids() {
      return [...this.selected, this.momo?.tokenId];
    }
  },
  methods: {
		isStandard(item) {
			const vType = parseInt(item.prototype / 1e4);
			const standardsHashrate = this.hashrateInfo[`v${vType}StandardHashrate`];
			return item.level > 1 ? item.hashrate >= standardsHashrate : item.lvHashrate >= standardsHashrate;
		},
    onSelect(item) {
      if ((!item.gems || item.gems.join('') != '0000') && this.isShowTip) {
        this.showNotify(this.$t("MOMOMerge_14") ,"error");
        return;
      }

      if (this.selected.indexOf(item.tokenId) == -1) {
        this.momo = this.momo?.tokenId == item.tokenId ? null : item;
      }
    },
    onConfirm() {
      this.$emit('onSelect', this.momo);
    }
  },
  created() {
    this.momo = this.current;
  }
};
</script>

<style lang="less" scoped>
.select-momo {
  background: #0C203D;
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
    margin: 0 auto;
    display: flex;
    justify-content: center;

    span {
      font-weight: 900;
      padding-top: 20rem;
      color: #F5B90F;
    }
  }

  .sub-title {
    font-weight: 400;
    color: #4C89F8;
    text-align: center;
  }

  .list {
    background: #14181F;
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

  .button {
    background: url(../../assets/furnace/button.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: #643D03;
    margin: 0 auto;
  }
}

@media(min-width: 1200px) {
  .select-momo {
    width: 375rem;
    padding: 13rem 24rem 28rem 24rem;

    .title {
      width: 294rem;
      height: 36rem;

      span {
        font-size: 25rem;
      }
    }

    .sub-title {
      font-size: 15rem;
      margin-top: 20rem;
      margin-bottom: 8rem;
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
      width: 200px;
      height: 55px;
      line-height: 52px;
      font-size: 22rem;
      cursor: pointer;
    }
  }
}

@media(max-width: 1200px) and (min-width: 769px) {
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

@media(max-width: 769px) {
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
