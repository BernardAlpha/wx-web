<template>
  <view :style="buttonStyle" class="los-button">
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: 'auto'
  },
  height: {
    type: String,
    default: '72rpx'
  },
  color: {
    type: String,
    default: '#000000'
  },
  borderRadius: {
    type: String,
    default: '36rpx'
  },
  background: {
    type: String,
    default: 'red'
  },
  textAlign: {
    type: String,
    default: 'center'
  },
  isGaussian : {
    type: Boolean,
    default: true,
  },
})

const buttonStyle = ref({
  width: props.width,
  height: props.height,
  color: props.color,
  borderRadius: props.borderRadius,
  background: props.background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: props.isGaussian ? "blur(10rpx)" : '',
  padding: '0 36rpx'
})


</script>

<style lang="scss" scoped>
.los-button {}
</style>
