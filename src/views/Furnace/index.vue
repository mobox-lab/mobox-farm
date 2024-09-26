<template>
  <div class="page-container">
    <div class="page-background">
      <img src="@/assets/furnace/furnace-background.png" />
    </div>
    <div :class="['content', isShowFurnace ? 'furnace-scene' : null]">
      <div class="title">
        <span>{{$t('MOMOMerge_01')}}</span>
      </div>
      <!-- 首页 -->
      <div class="home-box" v-if="!isShowFurnace">
        <div class="time">
          <div class="label">{{$t('Festival_49')}}</div>
          <span>{{day}}</span>
          <div class="division">:</div>
          <span>{{hour}}</span>
          <div class="division">:</div>
          <span>{{minute}}</span>
          <div class="division">:</div>
          <span>{{second}}</span>
        </div>
        <img class="momo" src="@/assets/furnace/momo.png" />
        <!-- 按钮 -->
        <div class="button" @click="showFurnace">{{$t('MOMOMerge_02')}}</div>
      </div>
      <!-- 融合 -->
      <div class="furnace-container" v-else>
        <!-- 选择材料 -->
        <div class="select">
          <ul class="header">
            <li class="main">{{ $t('MOMOMerge_05') }}</li>
            <li>{{ $t('MOMOMerge_06') }}</li>
          </ul>
          <ul class="menu">
            <li class="main" @click="showSelected('main')">
              <div class="item">
                <div class="info add" v-if="!main">
                  <img src="@/assets/furnace/add.png" />
                </div>
                <div class="momo-container" v-else>
                  <Item :data="main" />
                </div>
              </div>
            </li>
            <li class="material" @click="showSelected('momo1')">
              <div class="item">
                <div class="info add" v-if="!momo1">
                  <img src="@/assets/furnace/add.png" />
                </div>
                <div class="momo-container" v-else>
                  <Item :data="momo1" />
                </div>
              </div>
            </li>
            <li class="material" @click="showSelected('momo2', $event)">
              <div class="item">
                <div class="info add" v-if="!momo2">
                  <img src="@/assets/furnace/add.png" />
                </div>
                <div class="momo-container" v-else>
                  <Item :data="momo2" />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 升级信息 -->
        <div class="update-info">
          <ul>
            <li>
              <div class="label">{{$t('MOMO_49')}}</div>
              <div class="value" v-if="main">
                <img class="airdrop" src="@/assets/icon/airdrop.png" />
                <span class="before">{{main.hashrate}}</span>
                <img class="upgrade" src="@/assets/icon/upgradejt.png" />
                <img class="airdrop" src="@/assets/icon/airdrop.png" />
                <span class="after" v-if="consumeMec">[{{initialHashrate[0]}}, {{initialHashrate[1]}}]</span>
                <Loading v-if="infoLoading" />
              </div>
            </li>
            <li>
              <div class="label">{{$t('MOMO_50')}}</div>
              <div class="value" v-if="main">
                <span class="before">Lv {{main.level}}</span>
                <div class="upgrade">→</div>
                <span v-if="momo1 || momo2">Lv {{furnaceLv}}</span>
                <Loading v-if="infoLoading" />
              </div>
            </li>
            <li>
              <div class="label">{{$t('MOMO_51')}}</div>
              <div class="value" v-if="main">
                <img class="airdrop" src="@/assets/icon/airdrop.png" />
                <span class="before">{{main.lvHashrate}}</span>
                <img class="upgrade" src="@/assets/icon/upgradejt.png" />
                <img class="airdrop" src="@/assets/icon/airdrop.png" />
                <span class="after" v-if="consumeMec">[{{lvHashrate[0]}}, {{lvHashrate[1]}}]</span>
                <Loading v-if="infoLoading" />
              </div>
            </li>
          </ul>
        </div>
        <!-- 按钮 -->
        <div class="button-container">
          <button class="button" :disabled="disabledLock" @click="morge">
            <Loading v-if="lockLoading" />
            <span v-else>{{$t('MOMOMerge_08')}}</span>
          </button>
          <button class="button" :disabled="disabledMorge" @click="endMerge">
            <Loading v-if="morgeLoading" />
            <span v-else>{{$t('MOMOMerge_09')}}</span>
          </button>
          <!-- <button class="button" :disabled="disabled || loading || status == 2">
            <Loading />
          </button> -->

          <!-- <button class="button" v-if="status == 1" @click="endMerge">{{$t('MOMOMerge_09')}}</button>
          <button class="button" v-else-if="loading || status == 2" :disabled="disabled">
            <Loading />
          </button>
          <button class="button" v-else :disabled="disabled" @click="morge">{{$t('MOMOMerge_08')}}</button> -->
          <div class="record" @click="toggleShowRecord">
            <img src="@/assets/furnace/record.png" />
          </div>
        </div>
      </div>
      <!-- 规则 -->
      <div class="rule">
        <div class="rule-title">{{$t('MOMOMerge_03')}}</div>
        <p v-html="$t('MOMOMerge_04')"></p>
      </div>
    </div>
    <!-- 选择momo -->
    <Dialog v-model="isShowSelect">
      <SelectMomo :isShowTip="selectType != 'main'" :current="current" :type="selectType === 'main' ? null : mainType" :selected="selected" @onSelect="onSelect" />
    </Dialog>
    <!-- 记录 -->
    <Dialog v-model="isShowRecord">
      <Record />
    </Dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BaseConfig, ConstantConfig } from '@/config';
import { CommonMethod } from "@/mixin";
import { Common, Wallet } from '@/utils/';
import { Loading } from '@/components';
import Dialog from './dialog';
import SelectMomo from './select-momo';
import Item from './momo-item';
import Record from './record';

export default {
  mixins: [CommonMethod],
  components: {
    Loading,
    Dialog,
    SelectMomo,
    Item,
    Record,
  },
  data() {
    return {
      loading: false,
      // 0空闲/融合结束, 1等待融合, 2开始融合
      status: null,
      consumeMec: null,
      isShowFurnace: false,
      isShowSelect: false,
      main: null,
      momo1: null,
      momo2: null,
      selectType: null,
      timer: null,
      countDownTimer: null,
      isShowRecord: false,
      endTime: 1705734000000,
      day: '00',
      hour: '00',
      minute: '00',
      second: '00',
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
      return [this.main, this.momo1, this.momo2].filter(item => item && item != this[this.selectType]).map(item => item.tokenId);
    },
    current() {
      return this[this.selectType];
    },
    // 融合等级
    furnaceLv() {
			const vType = this.mainType;
      const lvConfig = BaseConfig[`MomoLv${vType}Cfg`];
      const value = [this.main, this.momo1, this.momo2].reduce((data, item) => {
        if (item) {
          return data + lvConfig[item.level].lvValue;
        }

        return data;
      }, 0);

      if (value >= lvConfig['40'].lvValue) {
        return 40;
      }

      return this.findConfig(value, 'lvValue', lvConfig, false).lv;
    },
    // 初始算力升级信息
    initialHashrate() {
      if (this.consumeMec) {
        const vType = this.mainType;
        const lvConfig = BaseConfig[`MomoEnhanceV${vType}Cfg`];
        const min = this.findConfig(this.consumeMec * 0.75, 'totalMec', lvConfig);
        const max = this.findConfig(this.consumeMec * 1.25, 'totalMec', lvConfig);
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

        return parseInt(hashRate + parseInt(staticPower * (level - 1) /100) + parseInt(((parseInt(level / 5) * (1 + parseInt(level / 5)))) * staticPower * staticPercent / 200));
      });
    }
  },
  methods: {
    // 移除
    remove(type, event) {
      event.preventDefault();
      event.stopPropagation();

      if (type == 'main') {
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
        const hour = Math.floor(time / 1000 / 60 / 60 % 24);  
        const minute = Math.floor(time / 1000 / 60 % 60);  
        const second = Math.floor(time / 1000 % 60);

        this.day = this.checkTime(day);
        this.hour = this.checkTime(hour);
        this.minute = this.checkTime(minute);
        this.second = this.checkTime(second);
        this.countDownTimer = setTimeout(this.countDown, 1000);
      } else {
        this.day = '00';
        this.hour = '00';
        this.minute = '00';
        this.second = '00';
      }
    },
    checkTime(value){
      if (value < 10) {
        return '0' + value;
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

      if (type != 'main' && !this.main) {
        this.showNotify(this.$t("MOMOMerge_13") ,"error");
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
    onSelect(data) {
      this[this.selectType] = data;

      if (this.selectType === 'main') {
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
        const res = await Wallet.ETH.furnace.methods.testMerge(ids).call();
        this.consumeMec = res.mec;
      } catch(_) {
      }

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
        const res = await Wallet.ETH.furnace.methods.getOrder(address).call();

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
      } catch(error) {
      }
    },
    // 获取momo
    async getMomoByTokenId(tokenId) {
      if (!tokenId || tokenId == '0') {
        return null;
      }

      const res = await Wallet.ETH.moMoTokenContract.methods.getMomoByTokenId(tokenId).call();

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
        {from: address, gasLimit: this.momo2 ? 900000 : 600000},
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
        {from: address, gasLimit: this.momo2 ? 900000 : 600000},
        (hash) => {},
        (data) => {
          self.morgeLoading = false;
          self.main = self.momo1 = self.momo2 = null;
          self.getOrderStatus();
          Common.app.setMyNftByType(ConstantConfig.NFT_LOCATION.STAKE);
        },
        () => {
          self.morgeLoading = false;
        }
      );
    },
  },
  async mounted() {
    window.addEventListener('resize', this.setSize);
    this.setSize();
    this.countDown();
    this.infoLoading = true;
    try {
      await this.getOrderStatus();
    } catch(_) {}
    this.infoLoading = false;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setSize);
    clearTimeout(this.timer);
    clearTimeout(this.countDownTimer);
    document.documentElement.style.fontSize = '';
  },
};
</script>

<style lang="less" scoped>
  .page-container {
    font-family: 'you-she';
  }

  .page-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    font-size: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .content {
    position: relative;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    span {
      font-weight: 400;
      color: #1A486E;
      text-align: center;
    }
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: center;

    .label {
      font-weight: 400;
      color: #041731;
      line-height: 1;
    }

    span {
      font-weight: 400;
      color: #C9F1F8;
      line-height: 1;
      background: #14385D;
      text-align: center;
    }

    .division {
      font-weight: 400;
      color: #041731;
    }
  }

  .home-box {
    .button {
      background: url(../../assets/furnace/button.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      font-weight: 400;
      color: #643D03;
      cursor: pointer;
    }
  }

  .furnace-scene {
    backdrop-filter: blur(4px)
  }

  .rule {
    margin: 0 auto;
    box-sizing: border-box;
    background: rgba(12, 32, 61, 0.8);
    display: flex;
    flex-direction: column;

    .rule-title {
      font-weight: 400;
      color: #96C8E2;
      text-align: center;
    }

    p {
      flex: 1;
      font-weight: 400;
      color: #96C8E2;
      overflow-y: scroll;
    }
  }

  .furnace-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      display: flex;
      align-items: center;
      list-style: none;
    }

    .header {
      li {
        font-weight: 400;
        color: #FFFFFF;
      }
    }

    .main {
      text-align: center;
    }

    .select .menu {
      .item {
        background: url(../../assets/furnace/select-background.png) no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        cursor: pointer;
      }

      /*deep*/.momo-container {
        position: relative;
      }

      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }

    .update-info {
      ul {
        display: flex;
        flex-direction: column;

        li {
          background: rgba(12, 32, 61, 0.5);
          display: flex;
          align-items: center;

          &:first-child {
            margin-top: 0;
          }
        }
      }

      .value {
        display: flex;
        align-items: center;
        font-family: Poppins;
        font-weight: 400;
      }
    }
  }

  .button-container {
    display: flex;
    align-items: center;

    button {
      border: none;
      outline: none;
      height: 100%;
      background: url(../../assets/furnace/button.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      font-weight: 400;
      color: #643D03;

      svg {
        width: 45%;
        height: 45%;
      }

      &[disabled] {
        cursor: no-drop;
        filter: grayscale(100%);
        filter: gray;

        &:hover {
          opacity: 1;
        }
      }

      &:hover {
        opacity: 0.7;
      }
    }

    .record {
      display: flex;
      align-items: center;
      justify-content: center;
      background: url(../../assets/furnace/bg.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }

  @media (min-width: 1200px) {
    .page-background {
      left: 260px;
    }

    .title {
      padding-top: 47rem;
      margin-bottom: 44rem;

      span {
        font-size: 40rem;
        line-height: 45rem;
      }
    }

    .time {
      margin-bottom: 46rem;

      .label {
        font-size: 18rem;
        margin-right: 20rem;
      }

      span {
        padding: 0 11rem;
        font-size: 18rem;
        height: 26rem;
        border-radius: 6rem;
        line-height: 26rem;
      }

      .division {
        font-size: 20rem;
        margin: 0 10rem;
      }
    }

    .home-box {
      margin-bottom: 42rem;

      .momo {
        width: 378rem;
      }

      .button {
        width: 226rem;
        height: 53rem;
        line-height: 46rem;
        font-size: 25px;
        margin: 21rem auto 0 auto;
      }
    }

    .rule {
      width: 772rem;
      height: 130rem;
      padding: 16rem;
      border-radius: 10rem;

      .rule-title {
        font-size: 19rem;
        line-height: 23rem;
        margin-bottom: 14rem;

        p {
          font-size: 10rem;
          line-height: 12rem;
        }
      }
    }

    .furnace-container {
      .header {
        margin-bottom: 8rem;

        li {
          font-size: 16rem;
          line-height: 31rem;
        }
      }

      .main {
        width: 129rem;
        margin-right: 37rem;
      }

      .select .menu {
        .item {
          width: 85rem;
          height: 62rem;
        }
      }

      /*deep*/.momo-container {
        transform: scale(0.7);
        top: -10rem;
      }

      .info {
        img {
          width: 26rem;
        }
      }

      .update-info {
        margin-top: 33rem;
        margin-bottom: 43rem;
        font-size: 14rem;

        li {
          width: 357rem;
          height: 28rem;
          border-radius: 6rem;
          margin-top: 7rem;
          padding-left: 18rem;
        }

        .label {
          margin-right: 20rem;
        }

        .airdrop {
          width: 17rem;
        }

        .value {
          font-size: 16rem;
        }

        .before {
          margin-left: 10rem;
        }

        .upgrade {
          margin-left: 10rem;
          margin-right: 10rem;
        }

        .after {
          margin-left: 10rem;
        }
      }

      .button-container {
        height: 53rem;
        margin-bottom: 52rem;

        button {
          width: 226rem;
          font-size: 25rem;
          line-height: 31rem;
          margin-right: 10rem;
        }
      }

      .record {
        width: 48rem;
        height: 53rem;

        img {
          width: 28rem;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .page-background {
      left: 0;
    }

    .title {
      padding-top: 269rem;
      margin-bottom: 73rem;

      span {
        font-size: 100rem;
      }
    }

    .time {
      margin-bottom: 209rem;

      .label {
        font-size: 65rem;
        margin-right: 50rem;
      }

      span {
        padding: 0 23rem;
        font-size: 65rem;
        height: 90rem;
        line-height: 90rem;
        border-radius: 13rem;
      }

      .division {
        font-size: 50rem;
        margin: 0 20rem;
      }
    }

    .home-box {
      margin-bottom: 154rem;

      .momo {
        width: 1158rem;
      }

      .button {
        width: 749rem;
        height: 158rem;
        line-height: 148rem;
        font-size: 85rem;
        margin: 150rem auto 0 auto;
      }
    }

    .rule {
      width: 1105rem;
      height: 807rem;
      padding: 83rem;
      border-radius: 23rem;
      margin-bottom: 120rem;

      .rule-title {
        font-size: 83rem;
        line-height: 100rem;
        margin-bottom: 61rem;

        p {
          font-size: 41rem;
          line-height: 50rem;
        }
      }
    }

    .furnace-container {
      .header {
        margin-bottom: 34rem;

        li {
          font-size: 58rem;
          line-height: 104rem;
        }
      }

      .select {
        width: 100vw;
        padding: 0 84rem;
        box-sizing: border-box;
      }

      .main {
        width: 435rem;
        margin-right: 124rem;
      }

      .select .menu {
        .item {
          width: 271rem;
          height: 210rem;
        }
      }

      /*deep*/.momo-container {
        transform: scale(0.7);
        top: -22rem;
      }

      .info {
        img {
          width: 84rem;
        }
      }

      .update-info {
        width: 100%;
        padding: 0 74rem;
        margin-top: 90rem;
        margin-bottom: 116rem;
        font-size: 40rem;
        box-sizing: border-box;

        li {
          width: 100%;
          height: 93rem;
          border-radius: 14rem;
          margin-top: 23rem;
          padding-left: 63rem;
        }

        .label {
          margin-right: 40rem;
        }

        .airdrop {
          width: 50rem;
        }

        .value {
          font-size: 54rem;
        }

        .before {
          margin-left: 40rem;
        }

        .upgrade {
          margin-left: 40rem;
          margin-right: 40rem;
        }

        .after {
          margin-left: 40rem;
        }
      }

      .button-container {
        height: 130rem;
        margin-bottom: 60rem;

        button {
          width: 380rem;
          font-size: 45rem;
          line-height: 120rem;
          margin-right: 30rem;
          font-weight: bold;
        }
      }

      .record {
        width: 130rem;
        height: 130rem;

        img {
          width: 65rem;
        }
      }
    }
  }
</style>
