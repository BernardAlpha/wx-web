<template>
  <view class="index">
    <text>{{ msg }}</text>
    <text>{{ msg }}</text>
    <nut-button type="success">成功按钮</nut-button>
    <nut-animate type='flicker' :loop='true'>
      <nut-button type='primary'>flicker-擦亮</nut-button>
    </nut-animate>
    <nut-animate type='jump' :loop='true'>
      <nut-button type='primary'>jump-跳跃</nut-button>
    </nut-animate>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.less'

export default {
  setup() {
    const msg = ref('Hello world')
    return {
      msg
    }
  }
}
</script>
