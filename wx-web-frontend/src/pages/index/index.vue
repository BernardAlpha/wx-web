<template>
  <view class="home weapp-home">
    <view class="nav nav-home">
      <view class="title">麦兰镇炸鸡店</view>
    </view>

  </view>
</template>

<script setup>
import { reactive } from "vue";
import Taro from '@tarojs/taro'
let here = reactive({});
let systemInfo = Taro.getSystemInfoSync();
let boundingInfo = Taro.getMenuButtonBoundingClientRect();
let cheight = `${(systemInfo.statusBarHeight + boundingInfo.top) * 2}rpx`;
console.log('cheight', cheight);

document.getElementsByTagName('body')[0].style.setProperty('--barHeight', cheight)

console.log('systemInfo', systemInfo);
console.log('boundingInfo', boundingInfo);
</script>

<style lang="scss">
@import '/src/styles/variables.scss';
.home {
  height: 100%;
  width: 100%;
  background: $themeColor;
}
.nav {
  .title {
    padding-top: $barHeight;
  }
}
.nav-home {
  height: 650rpx;
  width: 100%;
  background: linear-gradient(rgba(250, 255, 185, 0.6)), url("#{$staticPrefix}/public/img/home-bar-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

</style>