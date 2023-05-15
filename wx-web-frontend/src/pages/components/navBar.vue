<template>
  <view class="nav-bar">
    <view v-if="showTopBack" :style="`height:${topShadowHeight};`" class="top-back"></view>
    <view class="nav-title" :style="titleStyle" :id="`${titleId}-title`">
      <view v-if="canBack" class="back-arrow" @click="goBack">{{ "<" }}</view>
      <view>{{ pageName }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  pageName: {
    type: String,
  },
  titleId: {
    type: String,
  },
  canBack: {
    type: Boolean,
    default: true,
  },
  showTopBack: {
    type: Boolean,
    default: true,
  },
  topShadowHeight: {
    type: String,
    default: '160rpx',
  },
});

const titleStyle = ref({});
let systemInfo = uni.getSystemInfoSync(); // 系统信息
let capsuleInfo = {
  top: NaN,
  height: NaN,
};
// #ifdef MP-WEIXIN
capsuleInfo = uni.getMenuButtonBoundingClientRect(); // 胶囊信息
// #endif

const titleMarginTop = `${
  (capsuleInfo.top * 2) / (systemInfo.windowWidth / 375)
}rpx`;
const capsuleHeight = `${
  (capsuleInfo.height * 2) / (systemInfo.windowWidth / 375)
}rpx`;

console.log("titleMarginTop", titleMarginTop);
console.log("capsuleHeight", capsuleHeight);
titleStyle.value = {
  "padding-top": titleMarginTop,
  height: capsuleHeight,
  "line-height": capsuleHeight,
  "font-size": `calc(${capsuleHeight} / 1.1)`,
};

const goBack = () => {
  console.log("goBack");
  uni.navigateBack({ delta: 1 });
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.nav-bar {
  .top-back {
    width: 100%;
    background: linear-gradient(180deg, $themePink, rgba(255, 255, 255, 0));
    position: fixed;
  }
  .nav-title {
    position: fixed;
    padding-top: $titleMarginTop;
    width: 100%;
    height: $capsuleHeight;
    line-height: $capsuleHeight;
    color: #f7547d;
    text-align: center;
    font-size: calc($capsuleHeight / 1.1);
    .back-arrow {
      margin-left: 36rpx;
      position: fixed;
      font-size: 80rpx;
    }
  }
}
</style>
