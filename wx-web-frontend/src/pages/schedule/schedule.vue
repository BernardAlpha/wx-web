<template>
  <view class="my-page">
    <view class="content">
      <invisible-module></invisible-module>
      <view v-for="(item, index) in here.weekList" class="module-box module-timetable"
        :style="new Date().getDay() === (index + 1) % 7 ? 'background: linear-gradient(150deg,#b4f879,hsla(0,0%,100%,0));' : ''">
        <view class="module-title weekday-name">{{ item.name + (new Date().getDay() === (index + 1) % 7 ? '(Today)' : '') }}</view>
        <schedule-item :timeAxisShow="new Date().getDay() === (index + 1) % 7" :weekDay="index + 1" :timeNow="caculateTimeeeper()" @emitNotice="setNotice"></schedule-item>
      </view>
    </view>
    <nav-bar pageName="菜单" titleId="menu"></nav-bar>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import daysMatter from '@/data/daysMatter.json'
import website from '@/config/website'
import scheduleItem from '@/pages/components/scheduleItem.vue'
import navBar from '@/pages/components/navBar.vue'
import invisibleModule from "@/pages/components/invisibleModule.vue";
// import { stringify } from "qs";
const here = reactive({
  invisibleStyle: {},
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

let systemInfo = uni.getSystemInfoSync();  // 系统信息
let capsuleInfo = {};
// #ifdef MP-WEIXIN
capsuleInfo = uni.getMenuButtonBoundingClientRect();  // 胶囊信息
// #endif

// here.timekeeper = caculateTimeeeper();
// setInterval(() =>{
//   const x = stringify(here.weekList );
//   console.log('x',x);
//   here.weekList = JSON.parse(x);
//   console.log(here.timekeeper);
// }, 1000);

let titleMarginTop = `${capsuleInfo.top * 2 / (systemInfo.windowWidth / 375)}rpx`;
let capsuleHeight = `${capsuleInfo.height * 2 / (systemInfo.windowWidth / 375)}rpx`;

here.invisibleStyle = {
  "margin-top": `calc(${titleMarginTop} + ${capsuleHeight} + 30rpx)`
}

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

const goBack = () => {
  uni.navigateBack({delta: 1})
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.my-page {
  background: none;
  .content {
    background: linear-gradient(0deg, $themePink, rgba(255, 255, 255, 0));
    padding: 0rpx 30rpx 60rpx 30rpx;
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
