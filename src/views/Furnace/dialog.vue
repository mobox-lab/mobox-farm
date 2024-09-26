<template>
  <transition name="bounce">
    <div class="dialog" v-if="value">
      <div class="mask" @click="$emit('input', false)" @mousewheel.stop @touchmove.stop></div>
      <div class="content" @mousewheel.stop @touchmove.stop>
        <slot />
        <div class="close" @click="$emit('input', false)">
          <img src="@/assets/blindbox/close.png" />
        </div>
      </div>
    </div>
  </transition>
</template>
  
  <script>
  export default {
    props: {
      value: Boolean,
    },
  };
  </script>
  
  <style lang="less" scoped>
  .dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s !important;
  
    // 遮罩层
    .mask {
      position: fixed;
      background: rgba(4, 15, 26, .9);
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      z-index: 0;
      cursor: pointer;
    }
  
    // 内容
    .content {
      position: relative;
      z-index: 1;
    }
  
    .close {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      transform: translate(50%, -50%);
  
      img {
        display: block;
        width: 100%;
        transition: transform .3s;
      }
  
      &:hover {
        img {
          transform: rotate(180deg);
        }
      }
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
  

  @media (min-width: 960px) {
    .dialog {
      .close {
        width: 18rem;
      }
    }
  }
  
  @media (max-width: 960px) {
    .dialog {
      .close {
        width: 80rem;
      }
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
    transform: translateY(-30px);
  }
  
  </style>
  