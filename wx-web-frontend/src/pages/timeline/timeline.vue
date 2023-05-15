<template>
  <view class="my-page my-page-timeline">
    <view class="content">
      <invisible-module></invisible-module>
      <view @click="textClick" style="width:100%; text-align: center; padding-top: 60%; font-size: 36rpx;">
        {{ text }}
      </view>

    </view>

    <nav-bar pageName="时间线" titleId="timeline"></nav-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navBar from "@/pages/components/navBar.vue";
import invisibleModule from "@/pages/components/invisibleModule.vue";

const text = ref('宝宝想不想看呀...')
const textClick = () => {
  text.value = '还没做好来嘻嘻嘻😙😙😙'
}
</script>

<style lang="scss" scoped>
.my-page-timeline {
  background: none;
}
</style>
