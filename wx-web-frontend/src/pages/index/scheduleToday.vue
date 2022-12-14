<template>
  <view class="schedule-today">
    <view class="time-axis">
      <view class="lesson"
        v-for="(item, index) in here.scheduleToday" :key="index"
        :style="item.style"
        >
        {{ item.className }}
        <view class="lesson-desc lesson-desc-top">{{ `${item.desc}` }} </view>
        <view class="lesson-desc lesson-desc-bottom">{{ `${item.start} - ${item.end}` }}</view>
      </view>
    </view>
    <view class="time-axis time-axis-float" :style="`width:${here.timeAxisFloatWidth}%`"></view>

    <view
      v-for="clock in 24" :key="clock"
      :style="`width:4.16%;height:20rpx;display:inline-block;text-align:left;font-size:22rpx`">{{ clock - 1 }}
    </view>

  </view>
</template>

<script setup>
import { onMounted, reactive, defineProps, watch, computed, defineEmits } from "vue";
import Taro from '@tarojs/taro'
import timeTable from '/src/data/timeTable.json'
import schedule from '/src/data/schedule.json'
import website from '/src/config/website'
const props = defineProps({
    timeNow: Object
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
  for(let i in here.scheduleToday) {
    let timeCounting = here.scheduleToday[i].startSec - (props.timeNow.hour * 3600 + props.timeNow.min * 60 + props.timeNow.sec);
    if(timeCounting > 0) {
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

here.scheduleToday = reactive(JSON.parse(JSON.stringify(schedule[(new Date().getDay() + 6) % 7].course)))
for(let i in here.scheduleToday) {
  here.scheduleToday[i].desc = timeTable[here.scheduleToday[i].timeIndex].desc;
  here.scheduleToday[i].start = timeTable[here.scheduleToday[i].timeIndex].start;
  here.scheduleToday[i].end = timeTable[here.scheduleToday[i].timeIndex].end;
  here.scheduleToday[i].startSec = Number(here.scheduleToday[i].start.substr(0,2)) * 3600 + Number(here.scheduleToday[i].start.substr(3,2)) * 60;
  here.scheduleToday[i].endSec = Number(here.scheduleToday[i].end.substr(0,2)) * 3600 + Number(here.scheduleToday[i].end.substr(3,2)) * 60;
  here.scheduleToday[i].width = (here.scheduleToday[i].endSec - here.scheduleToday[i].startSec) / 864;
  here.scheduleToday[i].marginLeft = (here.scheduleToday[i].startSec - (Number(i) === 0 ? 0 : here.scheduleToday[Number(i)-1].endSec)) / 864;
  here.scheduleToday[i].style = `width:${here.scheduleToday[i].width}%;margin-left:${here.scheduleToday[i].marginLeft}%;`;
}
console.log('here.scheduleToday', here.scheduleToday);

onMounted(() => {
});

function stringTwoDigit(num) {
  return num < 10 ? '0' + num.toString() : num.toString();
}
function emitNotice() {
  emit('emitNotice', here.notice);
}
</script>

<style lang="scss">
@import '/src/styles/variables.scss';
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
    background:rgba(132, 132, 255, 0.6);
    border-radius: 6rpx;
    line-height: $timeAxisHeight;
    text-align: center;
    font-size: 30rpx;
    .lesson-desc {
      text-align: right;
      margin-top: -($timeAxisHeight + $descHeight + 80rpx);
      font-size: 24rpx;
      writing-mode: vertical-lr;
      height: 142rpx;
      line-height: 20rpx;
    }
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