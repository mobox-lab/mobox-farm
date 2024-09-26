<template>
  <div class="migrate">
    <div class="container">
      <img src="@/assets/migrate/icon.png" class="image" />
      <div class="close" @click="$emit('close')">
        <img src="@/assets/icon/close.png">
      </div>
      <div class="title">{{ $t('Market_105') }}</div>
      <div class="info">version 2.0</div>
      <p class="text">{{ $t('Market_106') }}</p>
      <div class="footer">
        <button @click="$emit('close')">
          <img src="@/assets/migrate/cancel.png" />
          <span>{{ $t('Common_04') }}</span>
        </button>
        <button @click="$emit('confirm')">
          <img src="@/assets/migrate/confirm.png" />
          <span>{{ $t('Market_107') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .migrate {
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    width: 573px;
    padding-top: 36px;
    padding-bottom: 45px;
    background: #1c222c;
    border-radius: 16px;
    position: relative;

    .image {
      width: 119px;
      position: absolute;
      left: 30px;
      top: -59px;
    }

    .close {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      position: absolute;
      top: 0;
      right: 0;
      margin-top: -39px;
      cursor: pointer;

      img {
        width: 100%;
      }
    }

    .title {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      line-height: 23px;
      margin-bottom: 45px;
    }

    .info {
      height: 36px;
      background: #636972;
      border-radius: 0px 16px 0px 37px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 15px;
      font-weight: 700;
      // text-align: center;
      padding-left: 26px;
      padding-right: 15px;
      color: rgba(0, 0, 0, 0.5);
      line-height: 36px;
    }

    .text {
      width: 489px;
      padding: 41px 80px;
      margin: 0 auto;
      background: #13181f;
      border-radius: 16px;
      box-shadow: 2px 2px 2px 0px rgba(26,32,38,0.40) inset, 0px 0px 4px 0px rgba(46,68,87,0.00) inset;
      font-size: 16px;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      line-height: 1.45;
    }

    .footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 35px;

      button {
        width: 190px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: 1px solid #1751f6;
        border-radius: 8px;
        background-color: #1751f6;
        cursor: pointer;

        &:hover {
          opacity: 0.7;
        }

        &:first-child {
          background-color: transparent;
          margin-right: 14px;
        }

        img {
          width: 24px;
        }

        span {
          font-size: 16px;
          font-weight: 500;
          text-align: left;
          color: #ffffff;
          line-height: 1;
          margin-left: 16px;
        }
      }
    }
  }
</style>
