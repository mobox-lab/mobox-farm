<template>
  <div class="item">
    <!-- 图片 -->
    <div class="image">
      <img :src="image" />
      <!-- 数量 -->
      <div class="count">
        <span>x{{ count }}</span>
      </div>
    </div>
    <!-- 单价 -->
    <div class="unit-price">{{ $t("Market_39") }}: {{ unitPrice }} BUSD</div>
    <!-- 总价 -->
    <div class="total-price">
      <img src="@/assets/coin/USDT.png" />
      <span class="color-w mgl-5 money">{{ totalPrice }}</span
      >&nbsp;
    </div>
    <!-- 移除 -->
    <div class="remove" @click="$emit('remove')">
      <span>{{ $t("Market_67") }}</span>
      <svg viewBox="0 0 1024 1024" width="15" height="15">
        <path
          fill="#ffffff"
          d="M519.68 0C415.232 0 330.24 82.944 326.656 186.88H82.944c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912C137.216 939.52 207.36 1024 293.888 1024h441.344c86.528 0 156.672-83.968 156.672-187.904v-550.4h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152H712.192C709.12 82.944 624.128 0 519.68 0zM418.816 186.88c3.584-53.248 47.104-94.72 100.864-94.72s97.28 41.472 100.352 94.72H418.816zM293.888 931.84c-30.72 0-64.512-39.424-64.512-95.744v-550.4h570.368v550.912c0 56.32-33.792 95.744-64.512 95.744H293.888v-0.512z"
        ></path>
        <path
          fill="#ffffff"
          d="M359.936 813.568c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z m148.48 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 18.432 50.688 40.96 50.688z m156.16 0c22.528 0 40.96-22.528 40.96-50.688V473.6c0-28.16-18.432-50.688-40.96-50.688s-40.96 22.528-40.96 50.688v289.28c0 28.16 17.92 50.688 40.96 50.688z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //
    image: {
      type: String,
      required: true,
    },
    //
    count: {
      type: String,
      required: true,
    },
    //
    unitPrice: {
      type: String,
      required: true,
    },
    //
    totalPrice: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  background: #474747;
  border-radius: 15px;
  height: 100px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  &:first-child {
    margin-top: 0;
  }
}

.image {
  width: 100px;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
}

//
.count {
  position: absolute;
  right: 0;
  bottom: 10px;
  left: 0;

  span {
    background: rgba(0, 0, 0, 0.5);
    padding: 2px 10px;
    font-size: 12px;
    border-radius: 10px;
  }
}

//
.unit-price {
  margin-left: 5px;
  flex: 1;
  font-size: 18px;
  text-align: left;
}

//
.total-price {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 4px 10px;
  margin-right: 20px;

  img {
    display: inline-block;
    width: 20px;
  }

  span {
    font-family: Verdana;
    line-height: 1;
    font-size: 16px;
    margin-left: 5px;
  }

  & > * {
    vertical-align: middle;
  }
}

//
.remove {
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0px 14px;
  right: 0px;
  padding: 3px 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  & > * {
    vertical-align: middle;
  }

  span {
    line-height: 1;
    margin-right: 4px;
  }
}
</style>
