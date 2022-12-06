<template>
  <view class="time-axis">
    <view class="lesson"
      v-for="(item, index) in timeTable" :key="index">

    </view>
  </view>

  <view class="time-axis time-axis-float">
  </view>

  <view
    v-for="clock in 24" :key="clock"
    :style="`width:4.16%;height:20rpx;display:inline-block;text-align:center;font-size:22rpx`">{{ clock - 1 }}
  </view>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import Taro from '@tarojs/taro'
import timeTable from '/src/data/timeTable.json'
import website from '/src/config/website'
let here = reactive({

});
console.log('timeTable', timeTable);

onMounted(() => {
});


</script>

<style lang="scss">
@import '/src/styles/variables.scss';
.time-axis {
  width: 100%;
  height: 140rpx;
  background: yellowgreen;
}
.time-axis-float {
  margin-top: -140rpx;
  background: rgba(117, 117, 117, 0.8);
  width: 36%;

}

</style>