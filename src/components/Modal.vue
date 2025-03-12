<template>
  <transition name="bounce">
    <div class="modal" v-if="value">
      <div class="mask" @click="close"></div>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("update:value", false);
    },
  },
};
</script>

<style lang="less" scoped>
//
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;

  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.94);
  }

  .modal-content {
    z-index: 999999;
  }
}

.bounce-enter-active,
.bounce-leave-active {
  transition: opacity 0.25s;

  .mask {
    transition: opacity 0.25s;
  }

  .modal-content {
    transition: transform 0.25s, opacity 0.25s;
  }
}

.bounce-enter .modal-content,
.bounce-leave-to .modal-content,
.bounce-enter .mask,
.bounce-leave-to .mask {
  opacity: 0;
}

.bounce-enter .modal-content,
.bounce-leave-to .modal-content {
  transform: translateY(-30px);
}
</style>
