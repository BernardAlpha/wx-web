<template>
  <view class="los-tabbar">
    <view class="los-tabbar-item" v-for="(item, index) in list" @click="tabbarClick(index)">
      <view class="los-tabbar-item-icon">
        <los-svg width="56rpx" height="56rpx" :src="website.staticPrefix + item.iconPath"
          :color="selectedIndex === index ? 'yellowgreen' : '#000000'"></los-svg>
      </view>
      <view class="los-tabbar-item-name" :style="`color:${selectedIndex === index ? 'yellowgreen' : '#000000'};`">
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import website from '@/config/website';
import losSvg from './losSvg.vue';

const props = defineProps({
  selectedIndex: {
    type: Number,
    default: 0
  }
})

const selectedIndex = ref(props.selectedIndex);

const list = ref(
  [{
    name: '首页',  // home
    path: '/pages/home/homePage',
    iconPath: '/public/tabbar/hamburger.svg'
  }, {
    name: '锦囊',  // silkBag
    path: '/pages/silkBag/silkBag',
    iconPath: '/public/tabbar/jinnang.svg'
  }, {
    name: '葫芦',  // gourd
    path: '/pages/gourd/gourd',
    iconPath: '/public/tabbar/hulu.svg'
  }, {
    name: '我的',  // me
    path: '/pages/userCenter/me',
    iconPath: '/public/tabbar/sheep.svg'
  }]
)

const tabbarClick = (index: number) => {
  uni.switchTab({url: list.value[index].path})
}
</script>

<style lang="scss" scoped>
.los-tabbar {
  width: 100%;
  height: 170rpx;
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10rpx);
  box-shadow: 0rpx -6rpx 10rpx rgba(0, 0, 0, 0.1);
  // border-top-right-radius: 40rpx;
  // border-top-left-radius: 40rpx;
  .los-tabbar-item {
    width: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    margin-top: 16rpx;
    align-items: center;
  }

  .los-tabbar-item-icon {}

  .los-tabbar-item-name {
    font-size: 22rpx;
  }
}</style>
