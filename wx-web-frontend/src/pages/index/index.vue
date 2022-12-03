<template>
  <view class="home weapp-home">
    <view class="nav nav-home">
      <view class="nav-title" :id="`${here.pageName}-title`">麦兰镇炸鸡店</view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import Taro from '@tarojs/taro'
let here = reactive({
  pageName: 'home'
});
let systemInfo = Taro.getSystemInfoSync();
let capsuleInfo = Taro.getMenuButtonBoundingClientRect();
onMounted(() => {
  document.getElementById(`${here.pageName}-title`).style.setProperty('--titleMarginTop', `${capsuleInfo.top * 2 / (systemInfo.windowWidth / 375)}rpx`);
  document.getElementById(`${here.pageName}-title`).style.setProperty('--capsuleHeight', `${capsuleInfo.height * 2 / (systemInfo.windowWidth / 375)}rpx`);
});
</script>

<style lang="scss">
@import '/src/styles/variables.scss';
.home {
  height: 100%;
  width: 100%;
  background: $themeColor;
}
.nav-title {
  padding-top: $titleMarginTop;
  // background: coral;
  height: $capsuleHeight;
  line-height: $capsuleHeight;
  color: #FFFFFF;
  text-align: center;
  font-size: calc($capsuleHeight / 1.5);

}
.nav-home {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(0deg, rgba(58, 18, 95, 0.9), rgb(255, 255, 255, 0)), url("#{$staticPrefix}/public/img/home-bar-bg4.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>