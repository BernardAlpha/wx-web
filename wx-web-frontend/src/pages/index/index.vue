<template>
  <view class="my-page">
    <nav-bar pageName="麦兰镇炸鸡店" :titleId="here.pageName" :canBack="false" topShadowHeight="360rpx"></nav-bar>
    <scroll-view class="content" :show-scrollbar="false" :scroll-y="true">
      <invisible-module></invisible-module>
      <view class="module-box module-timing">
        <view class="timing-text">我们在一起</view>
        <view class="timekeeper">
          <view class="t-day">
            <text class="texts">已经</text><view class="number">{{ here.timekeeper.day }}</view><text class="texts">天啦</text><text v-if="here.timekeeper.day > 0"></text>
          </view>
          <view class="t-others">
            <text class="number">{{ here.timekeeper.hour }}</text><text>小时</text><text v-if="here.timekeeper.hour > 0"></text>
            <text class="number">{{ here.timekeeper.min }}</text><text>分钟</text><text v-if="here.timekeeper.min > 0"></text>
            <text class="number">{{ here.timekeeper.sec }}</text><text>秒</text><text v-if="here.timekeeper.sec > 0"></text>
          </view>
        </view>
      </view>
      <view class="module-box module-days-matter">
        <view class="module-title">
          DaysMatter
          <!-- <view class="notice-content"><text>距离暑假还有</text><view>{{ reverseCountdownDays }}</view><text>天</text></view> -->
          <view class="notice-content">距离暑假还有<text class="number">{{ reverseCountdownDays }}</text>天哟</view>
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
        <view class="menu-box" v-for="(item, index) in here.menuList" @click="menuItemClick(item.url)" :key="index">
          <image :src="`${website.staticPrefix}/public/img/${item.icon}`"></image>
          <view class="menu-desc">{{ item.name }}</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import daysMatter from '@/data/daysMatter.json'
import website from '@/config/website'
import scheduleItem from '@/pages/components/scheduleItem.vue'
import navBar from '@/pages/components/navBar.vue'
import invisibleModule from "@/pages/components/invisibleModule.vue";

const hubValue = uni.getStorageSync("hubValue");
if(hubValue !== '20221003') {
  uni.redirectTo({
    url: "/pages/test/hub",
  });
}

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
  menuList: [
    {name: '菜单', icon: 'function-timetable3.png', url: '/pages/schedule/schedule'},
    {name: '时间线', icon: 'function-timetable3.png', url: '/pages/timeline/timeline'},
    {name: '刷题', icon: 'function-timetable3.png', url: '/pages/test/questions'}
  ]
});

const reverseCountdownDays = Math.ceil( ((new Date('2023-07-03')).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24) - 1)

let switchChecked = ref(false);
let systemInfo = uni.getSystemInfoSync();  // 系统信息

let capsuleInfo = {};
// #ifdef MP-WEIXIN
capsuleInfo = uni.getMenuButtonBoundingClientRect();  // 胶囊信息
// #endif

setInterval(caculateTimeeeper, 1000);
console.log('capsuleInfo', capsuleInfo);

let titleMarginTop = `${capsuleInfo.top * 2 / (systemInfo.windowWidth / 375)}rpx`;
let capsuleHeight = `${capsuleInfo.height * 2 / (systemInfo.windowWidth / 375)}rpx`;

here.invisibleStyle = {
  "margin-top": `calc(${titleMarginTop} + ${capsuleHeight} + 30rpx)`
}

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
  uni.navigateTo({
    url: url
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

@keyframes heartbeat {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
.my-page {
  background: linear-gradient(0deg, $themePink, rgba(255, 255, 255, 0));
  .content {
    margin: 0rpx 30rpx 30rpx 30rpx;
    height: 100%;
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
          .texts {
            vertical-align: super;
          }
          .number {
            font-size: 140rpx;
            line-height: 120rpx;
            color: #f7547d;
            display: inline-block;
            animation: heartbeat 1s infinite;
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
    .module-days-matter {
      min-height: 0rpx;
      .notice-content {
        margin-top: 10rpx;
        font-size: 50rpx;
        color: #f7547d;
        text-align: center;
          .number {
            color: yellowgreen;
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
