<template>
  <view class="schedule-today">
    <view class="time-axis">
      <view class="lesson" v-for="(item, index) in here.scheduleToday" :key="index" :style="item.style">
        <text class="class-name" :style="isChineseStr(item.className) ? 'font-size:22rpx;margin-left: -8rpx;' : ''">
          {{ item.className }}
        </text>
        <view :style="item.desc == '早读' ? 'margin-left: -8rpx;': ''" class="lesson-desc lesson-desc-top">{{ `${item.desc}` }} </view>
        <view :style="item.desc == '早读' ? 'margin-left: -8rpx;': ''" class="lesson-desc lesson-desc-bottom">{{ `${item.start} - ${item.end}` }}</view>
      </view>
    </view>
    <view v-show="props.timeAxisShow" class="time-axis time-axis-float" :style="`width:${here.timeAxisFloatWidth}%;`">
    </view>

    <view v-for="clock in 24" :key="clock"
      :style="`width:4.16%;height:20rpx;display:inline-block;text-align:left;font-size:22rpx`">{{ clock - 1 }}
    </view>

  </view>
</template>

<script setup>
import { onMounted, reactive, defineProps, watch, computed, defineEmits } from "vue";
// import timeTable from '@/data/timeTable.json'
// import timeTable from '@/data/timeTable20230216.json'
import timeTable from '@/data/timeTable20230913.json'
// import schedule from '@/data/schedule.json'
// import schedule from '@/data/schedule20230216.json'
// import schedule from '@/data/schedule20230422.json'
import schedule from '@/data/schedule20230913.json'
import website from '@/config/website'
import { isChineseStr } from '@/utils/common'

const props = defineProps({
  timeNow: Object,
  timeAxisShow: {
    type: Boolean,
    default: false
  },
  weekDay: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['emitNotice'])

let here = reactive({
  scheduleToday: [],
  timeAxisFloatWidth: '',
  notice: ''
});
console.log('timeTable', timeTable);
console.log('schedule', schedule);
console.log('props.timeNow', props.timeNow.sec);

here.timeAxisFloatWidth = computed(() => {
  return (props.timeNow.hour * 3600 + props.timeNow.min * 60 + props.timeNow.sec) / 864;
});
watch(() => props.timeNow.sec, (newVal) => {
  for (let i in here.scheduleToday) {
    let timeCounting = here.scheduleToday[i].startSec - (props.timeNow.hour * 3600 + props.timeNow.min * 60 + props.timeNow.sec);
    if (timeCounting > 0) {
      let hour = parseInt(timeCounting / 3600);
      let min = parseInt((timeCounting - hour * 3600) / 60);
      let sec = parseInt(timeCounting - hour * 3600 - min * 60);
      here.notice = `下节课是${here.scheduleToday[i].className}班的${here.scheduleToday[i].desc}, 还有${hour}小时${min}分钟${sec}秒`;
      break;
    }
    here.notice = '今天没课啦！';
  }
  emitNotice();
});

here.scheduleToday = reactive(JSON.parse(JSON.stringify(schedule[props.weekDay ? (props.weekDay - 1) : ((new Date().getDay() + 6) % 7)].course)))
console.log('here.scheduleTodayxx', here.scheduleToday);
for (let i in here.scheduleToday) {
  let timeIndex = timeTable.findIndex(item => {
    return item.desc === here.scheduleToday[i].desc;
  })
  if (timeIndex < 0) {
    continue;
  }
  here.scheduleToday[i].start = timeTable[timeIndex].start;
  here.scheduleToday[i].end = timeTable[timeIndex].end;
  here.scheduleToday[i].startSec = Number(here.scheduleToday[i].start.substr(0, 2)) * 3600 + Number(here.scheduleToday[i].start.substr(3, 2)) * 60;
  here.scheduleToday[i].endSec = Number(here.scheduleToday[i].end.substr(0, 2)) * 3600 + Number(here.scheduleToday[i].end.substr(3, 2)) * 60;
  here.scheduleToday[i].width = (here.scheduleToday[i].endSec - here.scheduleToday[i].startSec) / 864;
  here.scheduleToday[i].marginLeft = (here.scheduleToday[i].startSec - (Number(i) === 0 ? 0 : here.scheduleToday[Number(i) - 1].endSec)) / 864;
  here.scheduleToday[i].style = `width:${here.scheduleToday[i].width}%;margin-left:${here.scheduleToday[i].marginLeft}%;`;
}

onMounted(() => {
});

function stringTwoDigit(num) {
  return num < 10 ? '0' + num.toString() : num.toString();
}
function emitNotice() {
  emit('emitNotice', here.notice);
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
$timeAxisHeight: 60rpx;
$descHeight: 60rpx;

.schedule-today {
  padding: 0 20rpx;

  .time-axis {
    width: 100%;
    margin-top: $descHeight;
    height: $timeAxisHeight;
    border-radius: 10rpx;
    background: yellowgreen;
  }

  .lesson {
    display: inline-block;
    height: $timeAxisHeight;
    background: rgba(132, 132, 255, 0.6);
    border-radius: 6rpx;
    line-height: $timeAxisHeight;
    text-align: center;
    font-size: 30rpx;

    .class-name {
      vertical-align: bottom;
    }

    .lesson-desc {
      text-align: right;
      margin-top: -($timeAxisHeight + $descHeight + 80rpx);
      font-size: 24rpx;
      writing-mode: vertical-lr;
      height: 142rpx;
      line-height: 20rpx;
    }

    // .lesson-desc-top {
    //   margin-left: -10rpx;
    // }

    .lesson-desc-bottom {
      text-align: left;
      margin-top: 44rpx + $timeAxisHeight;
    }
  }

  .time-axis-float {
    margin-top: -$timeAxisHeight;
    background: rgba(117, 117, 117, 0.9);
    border-radius: 10rpx 0 0 10rpx;
  }
}
</style>
