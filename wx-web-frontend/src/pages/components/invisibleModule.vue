<template>
  <view
    class="module-box module-invisible"
    :style="invisibleStyle"
    id="module-invisible"
  ></view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const invisibleStyle = ref({});
let systemInfo = uni.getSystemInfoSync(); // 系统信息
let capsuleInfo = {
  top: NaN,
  height: NaN,
};
// #ifdef MP-WEIXIN
capsuleInfo = uni.getMenuButtonBoundingClientRect(); // 胶囊信息
// #endif

let titleMarginTop = `${
  (capsuleInfo.top * 2) / (systemInfo.windowWidth / 375)
}rpx`;
let capsuleHeight = `${
  (capsuleInfo.height * 2) / (systemInfo.windowWidth / 375)
}rpx`;

invisibleStyle.value = {
  "margin-top": `calc(${titleMarginTop} + ${capsuleHeight} + 30rpx)`,
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.module-invisible {
  margin-top: calc($titleMarginTop + $capsuleHeight + 30rpx) !important;
  background: transparent !important;
  min-height: 0rpx !important;
  height: 0rpx !important;
}
</style>
