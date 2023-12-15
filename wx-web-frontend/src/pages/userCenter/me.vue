<template>
  <view class="los-page me-page">
    <view class="fixed-head" :style="headStyle">
      <view class="head-avatar">
        <los-svg class="avatar-image" width="100%" height="100%" :src="userInfo.avatarSrc">
        </los-svg>
      </view>
      <view>{{ userInfo.name }}</view>
    </view>
    <view class="top">
      <image class="top-image" :src="website.staticPrefix + '/public/img/zf.jpg'" mode="aspectFill"></image>
      <view class="top-filter"></view>
    </view>
    <scroll-view class="content" :show-scrollbar="false" :scroll-y="true" @scroll="scrollTrigger">
      <view class="content-box">
        <view class="avatar" :style="avatarStyle">
          <los-svg class="avatar-image" width="100%" height="100%" :src="userInfo.avatarSrc">
          </los-svg>
        </view>
        <view class="user-info">
          <view class="user-fun">
            <los-button background="rgba(255, 255, 255, 0.4)" class="fun-item">资料</los-button>
            <los-button background="rgba(255, 255, 255, 0.4)" class="fun-item">编辑资料</los-button>
          </view>
          <view class="user-name">{{ userInfo.name }}</view>
        </view>
      </view>
    </scroll-view>
    <tabbar :selectedIndex="3"></tabbar>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import tabbar from "@/pages/components/tabbar.vue";
import { getUserInfo } from '@/pages/userCenter/api'
import website from "@/config/website";
import losSvg from "../components/losSvg.vue";
import losButton from "../components/losButton.vue";

const avatarStyle = ref({})

const headStyle = ref({});
const systemInfo = ref(uni.getSystemInfoSync()); // 系统信息
let capsuleInfo = {
  top: NaN,
  height: NaN,
};
// #ifdef MP-WEIXIN
capsuleInfo = uni.getMenuButtonBoundingClientRect(); // 胶囊信息
// #endif

const titleMarginTop = `${(capsuleInfo.top * 2) / (systemInfo.value.windowWidth / 375)
  }rpx`;
const capsuleHeight = `${(capsuleInfo.height * 2) / (systemInfo.value.windowWidth / 375)
  }rpx`;

console.log("titleMarginTop", titleMarginTop);
console.log("capsuleHeight", capsuleHeight);
headStyle.value = {
  "padding-top": titleMarginTop,
  "height": capsuleHeight,
  "line-height": capsuleHeight
};

const userInfo = {
  name: 'Bernard_Alpha',
  avatarSrc: website.staticPrefix + '/public/tabbar/sheep.svg'
}


const getUserInfoFn = () => {
  const userData = uni.getStorageSync('userData')
  getUserInfo({ wxOpenid: userData.wxOpenid }).then(res => {
    console.log('getUserInfo', res);
  })
}

const scrollTrigger = (event) => {
  console.log('scrollTrigger', event);
  const factor = (96 - event.detail.scrollTop) / 96;
  const length = Math.round(((factor) * 90)).toString() + 'px'
  avatarStyle.value = {
    width: length,
    height: length,
    marginTop: `-${Math.round(factor * 45).toString()}px`
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.me-page {
  // background-color: #ffffff;

  .fixed-head {
    position: fixed;
    padding-top: $titleMarginTop;
    width: 100%;
    height: $capsuleHeight;
    line-height: $capsuleHeight;
    // color: ;
    text-align: center;
    font-size: 28rpx;
    background: linear-gradient(180deg, $themeColor, rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(10rpx);
    padding-bottom: 20rpx;
    z-index: 99;

    .head-avatar {
      margin-left: 28rpx;
      position: fixed;
      font-size: 80rpx;
      height: 90rpx;
      width: 90rpx;
    }
  }

  .top {
    position: fixed;
    top: 0rpx;
    height: 800rpx;
    width: 100%;

    .top-image {
      width: 100%;
      height: 100%;
    }

    .top-filter {
      width: 100%;
      height: 400rpx;
      position: absolute;
      top: 400rpx;
      left: 0;
      background: linear-gradient(0deg, $themeColor, rgba(255, 255, 255, 0));
    }
  }

  .content {
    width: 100%;
    height: 100%;

    .content-box {
      margin-top: 360rpx;
      width: 100%;
      height: 100%;
      position: relative;
      border-top-left-radius: 32rpx;
      border-top-right-radius: 32rpx;
      background-color: $themeColor;

      .avatar {
        float: left;
        position: absolute;
        margin: -90rpx 0 0 60rpx;
        width: 180rpx;
        height: 180rpx;
        // top: -90rpx;
        border-radius: 96rpx;
        border: 6rpx solid #ffffff;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10rpx);
      }

      .user-info {

        // display: flex;
        .user-fun {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          height: 100rpx;
          // background-color: aqua;
          align-items: flex-end;

          .fun-item {
            margin-right: 20rpx;
          }
        }

        .user-name {
          margin: 20rpx 0 0 40rpx;
          font-size: 40rpx;
          display: flex;

        }
      }
    }

  }
}
</style>
