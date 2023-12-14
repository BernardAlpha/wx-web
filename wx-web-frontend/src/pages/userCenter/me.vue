<template>
  <view class="los-page">
    <view style="padding-top:600rpx" @click="getUserInfoFn">
      get userData
    </view>
    <tabbar :selectedIndex="3"></tabbar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import tabbar from "@/pages/components/tabbar.vue";
import { getUserInfo } from '@/pages/userCenter/api'

const getUserInfoFn = () => {
  const userData = uni.getStorageSync('userData')
  getUserInfo({wxOpenid: userData.wxOpenid}).then(res => {
    console.log('getUserInfo', res);
  })
}
</script>

<style lang="scss" scoped></style>
