<template>
  <view class="los-page gourd-search-page">
    <navbar :isCustom="true" :canBack="false">
      <view class="search" :style="searchStyle">
        <input class="search-input" :style="inputStyle" placeholder="search" />
      </view>
    </navbar>

  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import tabbar from "@/pages/components/tabbar.vue";
import navbar from '@/pages/components/navbar.vue';

const searchStyle = ref({});
const inputStyle = ref({});

// #ifdef MP-WEIXIN
const capsuleInfo = uni.getMenuButtonBoundingClientRect(); // 胶囊信息
const systemInfo = uni.getSystemInfoSync();
const windowRatio = 750 / systemInfo.windowWidth; // (2 / (systemInfo.windowWidth / 375))
console.log('capsuleInfo', capsuleInfo);
console.log('systemInfo', systemInfo);
console.log('windowRatio', windowRatio);
searchStyle.value = {
  width: `${(capsuleInfo.left || 0) * windowRatio}rpx`
}
inputStyle.value = {
  boederRadius: `${capsuleInfo.height / 2 * windowRatio}rpx`,
  margin: `0 ${(systemInfo.windowWidth - capsuleInfo.right) * windowRatio}rpx`,
  fontSize: `calc(${capsuleInfo.height} / 2)`
}
// #endif



</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.gourd-search-page {
  font-family: 'Consolas', 'Courier New', 'MissU';

  .search {
    height: 100%;
    width: 100%;
    // background-color: aqua;

    .search-input {
      height: calc(100% - 4rpx);
      font-family: 'Consolas', 'Courier New', 'MissU';
      // background-color: burlywood;
      margin: 0 20rpx;
      border-radius: $capsuleHeight;
      border: 2rpx solid #dadce0;
      padding: 0 calc($capsuleHeight / 2);
      font-size: calc($capsuleHeight / 2);
      text-align: left;
      color: #000000;
    }
  }
}
</style>
