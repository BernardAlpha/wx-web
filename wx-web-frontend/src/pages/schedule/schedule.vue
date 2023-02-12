<template>
  <view class="home weapp-home">
      <view class="top-back"></view>
      <view class="content">
        <view class="module-box module-invisible" id="module-invisible"></view>
        <view v-for="(item, index) in here.weekList" class="module-box module-timetable"
          :style="new Date().getDay() === index + 1 ? 'background: linear-gradient(150deg,#4a90f7,hsla(0,0%,100%,0));' : ''">
          <view class="module-title weekday-name">{{ item.name + (new Date().getDay() === index + 1 ? '(Today)' : '') }}</view>
          <schedule-today :timeAxisShow="new Date().getDay() === index + 1" :weekDay="index + 1" :timeNow="caculateTimeeeper()" @emitNotice="setNotice"></schedule-today>
        </view>
      </view>
      <view class="nav-title" :id="`${here.pageName}-title`">
        <view class="back-arrow" v-on:tap="Taro.navigateBack({delta: 1})">{{ '<' }}</view>
        <view>菜单</view>
      </view>
  </view>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import Taro from '@tarojs/taro'
import daysMatter from '/src/data/daysMatter.json'
import website from '/src/config/website'
import scheduleToday from '../index/scheduleToday.vue'
import { stringify } from "qs";
let here = reactive({
  pageName: 'home',
  timekeeper: {
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
    ms: 0
  },
  notice: '',
  weekList: [
    {name: 'Monday'},
    {name: 'Tuesday'},
    {name: 'Wednesday'},
    {name: 'Thursday'},
    {name: 'Friday'},
    {name: 'Saturday'},
    {name: 'Sunday'}
  ]
});

let systemInfo = Taro.getSystemInfoSync();  // 系统信息
let capsuleInfo = Taro.getMenuButtonBoundingClientRect();  // 胶囊信息
 
// here.timekeeper = caculateTimeeeper();
// setInterval(() =>{
//   const x = stringify(here.weekList );
//   console.log('x',x);
//   here.weekList = JSON.parse(x);
//   console.log(here.timekeeper);
// }, 1000);

onMounted(() => {
  let titleMarginTop = `${capsuleInfo.top * 2 / (systemInfo.windowWidth / 375)}rpx`;
  let capsuleHeight = `${capsuleInfo.height * 2 / (systemInfo.windowWidth / 375)}rpx`;
  document.getElementById(`${here.pageName}-title`).style.setProperty('--titleMarginTop', titleMarginTop);
  document.getElementById(`${here.pageName}-title`).style.setProperty('--capsuleHeight', capsuleHeight);
  document.getElementById(`module-invisible`).style.setProperty('--titleMarginTop', titleMarginTop);
  document.getElementById(`module-invisible`).style.setProperty('--capsuleHeight', capsuleHeight);
});


function caculateTimeeeper(weekday) {
  let difference = Date.now() - Date.parse(daysMatter.beTogether);  // ms
  let ms = difference % 1000;
  difference = (difference - ms) / 1000;  // sec
  let sec = difference % 60;
  difference = (difference - sec) / 60;  // min
  let min = difference % 60;
  difference = (difference - min) / 60;  // hour
  let hour = difference % 24;
  difference = (difference - hour) / 24;
  let day = difference;
  console.log(`${day}d${hour}h${min}m${sec}s${ms}ms`);
  return { day, hour, min, sec, ms };
}
function setNotice(notice) {
  here.notice = notice;
}
</script>

<style lang="scss">
@import '/src/styles/variables.scss';
.home {
  // position: absolute;
  min-height: 100%;
  width: 100%;
  background: $themePink;
  // background: linear-gradient(0deg, $themePink, rgba(255, 255, 255, 0));
  background: none;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: -2;
  .top-back {
    width: 100%;
    height: 360rpx;
    position: fixed;
  }
  .nav-title {
    position: fixed;
    padding-top: $titleMarginTop;
    // background: coral;
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
  .content {
    position: absolute;
    width: -webkit-fill-available;
    // background: gold;
    background: linear-gradient(0deg, $themePink, rgba(255, 255, 255, 0));
    padding: 0rpx 30rpx 60rpx 30rpx;
    .module-box {
      background: rgba(255, 255, 255, 0.4);
      margin-top: 30rpx;
      min-height: 260rpx;
      width: 100%;
      border-radius: 20rpx;
      .module-title {
        padding: 20rpx;
      }
    }
    .module-invisible {
      margin-top: 200rpx;
      margin-top: calc($titleMarginTop + $capsuleHeight + 30rpx);
      background: transparent;
      min-height: 0rpx;
      height: 0rpx;
    }
    .module-timing {
      height: auto;
      text-align: center;
      color: #ff8585;
      font-size: 46rpx;
      .timing-text {
        padding-top: 10rpx;
      }
      .timekeeper {
        padding: 10rpx;
        .t-day {
          font-size: 46rpx;
          .number {
            font-size: 140rpx;
            line-height: 120rpx;
            color: #f7547d;
          }
        }
        .t-others {
          margin-top: 0rpx;
          font-size: 30rpx;
          .number {
            font-size: 38rpx;
          }
        }
      }
    }
    .module-notice {
      min-height: 80rpx;
      .notice-content {
        margin-top: 10rpx;
        font-size: 50rpx;
        color: #f7547d;
        text-align: center;
      }
    }
    .module-timetable {
      min-height: 384rpx;
      .weekday-name {
        color: #f7547d;
      }
    }
    .module-function {
      height: auto;
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
        }
      }
    }
  }
}

</style>