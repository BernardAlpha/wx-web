<template>
  <view class="navbar">
    <view class="nav-area nav-normal" :style="titleStyle" :id="`${titleId}-nav`">
      <view v-if="canBack && !isCustom" :style="backStyle" class="back-arrow" @click="goBack">
        <los-svg :src="website.staticPrefix + backIconPath"></los-svg>
      </view>
      <view v-if="!isCustom">{{ pageName }}</view>
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import website from '@/config/website';
import losSvg from './losSvg.vue';

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
  background: {
    type: String,
    default: '',
  },
  isGaussian: {
    type: Boolean,
    default: true,
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
  titleColor: {
    type: String,
    default: '',
  }
});

const backIconPath = ref('/public/img/common/run.svg');

const titleStyle = ref({});
const backStyle = ref({});

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
  "height": capsuleHeight,
  "line-height": capsuleHeight,
  "font-size": `calc(${capsuleHeight} / 1.1)`,
};
if(props.background) {
  titleStyle.value = {
    ...titleStyle.value,
    "background": props.background
  }
}
if(props.isGaussian) {
  titleStyle.value = {
    ...titleStyle.value,
    "backdrop-filter": "blur(10rpx)"
  }
}
if(props.titleColor) {
  titleStyle.value = {
    ...titleStyle.value,
    "color": props.titleColor
  }
}


const goBack = () => {
  console.log("goBack");
  uni.navigateBack({ delta: 1 });
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.navbar {
  // .top-back {
  //   width: 100%;
  //   position: fixed;
  // }
  .nav-area {
    position: fixed;
    padding-top: $titleMarginTop;
    width: 100%;
    height: $capsuleHeight;
    line-height: $capsuleHeight;
    color: #000000;
    text-align: center;
    font-size: calc($capsuleHeight / 1.1);
    background: linear-gradient(180deg, $themeColor, rgba(255, 255, 255, 0));
    backdrop-filter: blur(10rpx);
    padding-bottom: 20rpx;
    .back-arrow {
      margin-left: 28rpx;
      position: fixed;
      // font-size: 80rpx;
      font-family: 'Comic Sans MS';
      height: calc($capsuleHeight - 8rpx);
      width: calc($capsuleHeight - 8rpx);
      transform: scaleX(-1);
      // padding: 6rpx;
    }
  }
}
</style>
