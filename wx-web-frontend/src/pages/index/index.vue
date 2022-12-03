<template>
  <view class="home weapp-home">
    <view class="nav-title" :id="`${here.pageName}-title`">Melon Pollos</view>
    <view class="content">
      <view class="timing-area">
        <view class="timing-text">has been established</view>
        <view class="timekeeper">
          <view class="t-day">
            <text> for </text><text class="number">{{ here.timekeeper.day }}</text><text> day</text><text v-if="here.timekeeper.day > 0">s</text>
          </view>
          <view class="t-others">
            <text class="number">{{ here.timekeeper.hour }}</text><text>hour</text><text v-if="here.timekeeper.hour > 0">s</text>
            <text class="number">{{ here.timekeeper.min }}</text><text>min</text><text v-if="here.timekeeper.min > 0">s</text>
            <text class="number">{{ here.timekeeper.sec }}</text><text>sec</text><text v-if="here.timekeeper.sec > 0">s</text>
          </view>
        </view>
      </view>
      <view class="function-area">
        <view class="function-box">
          <image :src="`${website.staticPrefix}/public/img/function-timetable2.png`"></image>
          <view class="function-desc">Timetable</view>
        </view>
        <view class="function-box">
          <image :src="`${website.staticPrefix}/public/img/function-timetable2.png`"></image>
          <view class="function-desc">Timetable</view>
        </view>
        <view class="function-box">
          <image :src="`${website.staticPrefix}/public/img/function-timetable2.png`"></image>
          <view class="function-desc">Timetable</view>
        </view>
        <view class="function-box">
          <image :src="`${website.staticPrefix}/public/img/function-timetable2.png`"></image>
          <view class="function-desc">Timetable</view>
        </view>
        <view class="function-box">
          <image :src="`${website.staticPrefix}/public/img/function-timetable2.png`"></image>
          <view class="function-desc">Timetable</view>
        </view>
        <view class="function-box">
          <image :src="`${website.staticPrefix}/public/img/function-timetable2.png`"></image>
          <view class="function-desc">Timetable</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import Taro from '@tarojs/taro'
import daysMatter from '/src/data/daysMatter.json'
import website from '/src/config/website'
let here = reactive({
  pageName: 'home',
  timekeeper: {
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
    ms: 0
  }
});
let systemInfo = Taro.getSystemInfoSync();  // 系统信息
let capsuleInfo = Taro.getMenuButtonBoundingClientRect();  // 胶囊信息
setInterval(caculateTimeeeper, 1000);
console.log(here.timekeeper);
onMounted(() => {
  document.getElementById(`${here.pageName}-title`).style.setProperty('--titleMarginTop', `${capsuleInfo.top * 2 / (systemInfo.windowWidth / 375)}rpx`);
  document.getElementById(`${here.pageName}-title`).style.setProperty('--capsuleHeight', `${capsuleInfo.height * 2 / (systemInfo.windowWidth / 375)}rpx`);
});

function caculateTimeeeper() {
  // console.log('Date.now()', Date.now());
  // console.log('Date.now()', Date.parse(daysMatter.beTogether));
  let difference = Date.now() - Date.parse(daysMatter.beTogether);  // ms
  // console.log('difference',difference);
  let ms = difference % 1000;
  difference = (difference - ms) / 1000;  // sec
  let sec = difference % 60;
  difference = (difference - sec) / 60;  // min
  let min = difference % 60;
  difference = (difference - min) / 60;  // hour
  let hour = difference % 24;
  difference = (difference - hour) / 24;
  let day = difference;
  here.timekeeper = { ...here.timekeeper, day, hour, min, sec, ms }
  // console.log(`${day}d${hour}h${min}m${sec}s${ms}ms`);
}
</script>

<style lang="scss">
@import '/src/styles/variables.scss';
.home {
  height: 100%;
  width: 100%;
  background: $themeColor;
  background-image: linear-gradient(0deg, rgba(58, 18, 95, 0.9), rgb(255, 255, 255, 0)), url("#{$staticPrefix}/public/img/home-bar-bg4.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  .nav-title {
    padding-top: $titleMarginTop;
    // background: coral;
    height: $capsuleHeight;
    line-height: $capsuleHeight;
    color: #f7547d;
    text-align: center;
    font-size: calc($capsuleHeight / 1.1);
    font-family: 'MissU';
  }
  .content {
    .timing-area {
      // background: rgba(255, 220, 25, 0.6);
      // border-radius: 20rpx;
      margin: 30rpx 40rpx 20rpx 40rpx;
      // width: 600rpx;
      // background: coral;
      height: auto;
      text-align: center;
      color: #ff8585;
      font-family: 'MissU';
      font-size: 46rpx;
      .timekeeper {
        margin-top: 30rpx;
        .t-day {
          font-size: 46rpx;
          .number {
            font-size: 140rpx;
            line-height: 120rpx;
            color: #f7547d;
          }
        }
        .t-others {
          margin-top: 30rpx;
          font-size: 30rpx;
          .number {
            font-size: 38rpx;
          }
        }
      }
    }
    .function-area {
      // width: 100%;
      margin: 80rpx 20rpx 20rpx 20rpx;
      // min-height: 400rpx;
      // height: 1600rpx;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 20rpx;
      padding: 20rpx 0;
      .function-box {
        display: inline-block;
        text-align: center;
        height: 117rpx;
        width: 117rpx;
        margin: 30rpx;
        // background: #ff8585;
        image {
          height: 80rpx;
          width: 80rpx;
          // border: 1rpx solid #aaaaaa;
          border-radius: 10rpx;
        }
        .function-desc {
          font-size: 30rpx;
          font-family: MissU;
        }
      }
    }
  }
}

</style>