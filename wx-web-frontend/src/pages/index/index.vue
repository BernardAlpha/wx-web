<template>
  <view class="home weapp-home">
    <view class="top-back"></view>
    <view class="nav-title" :id="`${here.pageName}-title`">麦兰镇炸鸡店</view>
    <view class="content">
      <view class="module-box module-invisible" id="module-invisible"></view>
      <view class="module-box module-timing">
        <view class="timing-text">我们在一起</view>
        <view class="timekeeper">
          <view class="t-day">
            <text>已经</text><text class="number">{{ here.timekeeper.day }}</text><text>天啦</text><text v-if="here.timekeeper.day > 0"></text>
          </view>
          <view class="t-others">
            <text class="number">{{ here.timekeeper.hour }}</text><text>小时</text><text v-if="here.timekeeper.hour > 0"></text>
            <text class="number">{{ here.timekeeper.min }}</text><text>分钟</text><text v-if="here.timekeeper.min > 0"></text>
            <text class="number">{{ here.timekeeper.sec }}</text><text>秒</text><text v-if="here.timekeeper.sec > 0"></text>
          </view>
        </view>
      </view>
      <view class="module-box module-notice">
        <!-- <view style="float:right; padding:14rpx 20rpx 0 0">
          <text style="margin-right: 10rpx;"> {{ switchChecked ? '切回旧版' : '切到新版' }}</text>
          <switch style="height: 40rpx;" :onChange="switchChange" :checked="switchChecked" />
        </view> -->
        <view class="module-title">
          营业通知
          <view class="notice-content">{{ here.notice }}</view>
        </view>
      </view>
      <view class="module-box module-timetable">
        <view class="module-title">今日特色</view>
        <schedule-item :timeAxisShow="true" :timeNow="here.timekeeper" @emitNotice="setNotice"></schedule-item>
      </view>
      <view class="module-box module-menu">
        <view class="menu-box" v-for="(item, index) in here.menuList" v-on:tap="menuItemClick(item.url)">
          <image :src="`${website.staticPrefix}/public/img/${item.icon}`"></image>
          <view class="menu-desc">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import Taro from '@tarojs/taro'
import daysMatter from '/src/data/daysMatter.json'
import website from '/src/config/website'
import scheduleItem from '/src/pages/components/scheduleItem.vue'
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
  menuList: [
    {name: '菜单', icon: 'function-timetable3.png', url: '/pages/schedule/schedule'},
    {name: '菜单2', icon: 'function-timetable3.png', url: '/pages/schedule/schedule'}
  ]
});
let switchChecked = ref(false);
let systemInfo = Taro.getSystemInfoSync();  // 系统信息
let capsuleInfo = Taro.getMenuButtonBoundingClientRect();  // 胶囊信息
setInterval(caculateTimeeeper, 1000);
console.log(here.timekeeper);
onMounted(() => {
  let titleMarginTop = `${capsuleInfo.top * 2 / (systemInfo.windowWidth / 375)}rpx`;
  let capsuleHeight = `${capsuleInfo.height * 2 / (systemInfo.windowWidth / 375)}rpx`;
  document.getElementById(`${here.pageName}-title`).style.setProperty('--titleMarginTop', titleMarginTop);
  document.getElementById(`${here.pageName}-title`).style.setProperty('--capsuleHeight', capsuleHeight);
  document.getElementById(`module-invisible`).style.setProperty('--titleMarginTop', titleMarginTop);
  document.getElementById(`module-invisible`).style.setProperty('--capsuleHeight', capsuleHeight);
});

const switchChange = () => {
  console.log('sss', switchChecked)
  switchChecked = !switchChecked;

}

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

function setNotice(notice) {
  here.notice = notice;
}

const menuItemClick = (url) => {
  console.log('url', url);
  Taro.navigateTo({
    url: url
  })
}
</script>

<style lang="scss">
@import '/src/styles/variables.scss';
.home {
  // position: absolute;
  height: 100%;
  width: 100%;
  background: $themePink;
  background: linear-gradient(0deg, $themePink, rgba(255, 255, 255, 0));
  // background-image: linear-gradient(0deg, rgba(58, 18, 95, 0.9), rgb(255, 255, 255, 0)), url("#{$staticPrefix}/public/img/home-bar-bg4.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  z-index: -2;
  .top-back {
    width: 100%;
    height: 360rpx;
    background: linear-gradient(180deg, $themePink, rgba(255, 255, 255, 0));
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
  }
  .content {
    position: absolute;
    width: -webkit-fill-available;
    // background: gold;
    margin: 0rpx 30rpx 30rpx 30rpx;
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
    }
    .module-menu {
      height: auto;
      border-radius: 20rpx;
      padding: 20rpx 0;
      .menu-box {
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
        .menu-desc {
          font-size: 30rpx;
        }
      }
    }
  }
}

</style>