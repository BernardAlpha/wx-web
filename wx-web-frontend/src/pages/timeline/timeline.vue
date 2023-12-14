<template>
  <view class="los-page my-page-timeline">
    <!-- <view class="content"> -->
    <scroll-view class="content" :show-scrollbar="false" :scroll-y="true">
      <invisible-module></invisible-module>
      <!-- <view @click="textClick" style="width:100%; text-align: center; padding-top: 60%; font-size: 36rpx;">
        {{ text }}
      </view> -->

      <view class="timeline">
        <view class="timeline-item" v-for="(item, index) in timelineList" :key="index">
          <view class="timeline-left">{{ item.date }}</view>
          <view class="timeline-center"></view>
          <view class="timeline-right">
            <view>{{ item.title }}</view>
            <view>{{ item.desc }}</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <nav-bar pageName="时间线" titleId="timeline"></nav-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navBar from "@/pages/components/navBar.vue";
import invisibleModule from "@/pages/components/invisibleModule.vue";
import timelineList from "@/data/timeline.json";

const text = ref("宝宝想不想看呀...");
const textClick = () => {
  text.value = "还没做好来嘻嘻嘻😙😙😙";
};
</script>

<style lang="scss" scoped>
.my-page-timeline {
  background: none;
  .content {
    background-color: aqua;
    // height: 100%;
    .timeline {
      padding: 40rpx;
      background-color: bisque;
      height: 100%;
      display: flex;
    }
  }
}
</style>
