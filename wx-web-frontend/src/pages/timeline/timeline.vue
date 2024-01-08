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
          <view class="timeline-left">{{ item.date.slice(5) }}</view>
          <view class="timeline-center">
            <view class="center-item axis-line axis-top"></view>
            <view class="center-item axis-circle"></view>
            <view class="center-item axis-line axis-bottom"></view>
          </view>
          <view class="timeline-right">
            <view class="timeline-content">
              <view class="content-title">
                <view class="title-dot"></view>
                <view class="title-text">{{ item.title }}</view>
              </view>
              <view class="content-desc">{{ item.desc }}</view>
            </view>
            <view class="content-baseline"></view>
          </view>
        </view>
      </view>
    </scroll-view>

    <navbar pageName="我们的故事" titleId="timeline"></navbar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navbar from "@/pages/components/navbar.vue";
import invisibleModule from "@/pages/components/invisibleModule.vue";
import timelineList from "@/data/timeline.json";

console.log('timelineList', timelineList)

const text = ref("宝宝想不想看呀...");
const textClick = () => {
  text.value = "还没做好来嘻嘻嘻😙😙😙";
};
</script>

<style lang="scss" scoped>
.my-page-timeline {
  background: none;

  .content {

    // background-color: aqua;
    // height: 100%;
    .timeline {
      padding: 80rpx 40rpx 200rpx 40rpx;
      // background-color: bisque;
      height: 100%;

      .timeline-item {
        width: 100%;
        display: flex;

        .timeline-left {
          flex-shrink: 0;
          width: 80rpx;
          // background-color: aqua;
          text-align: right;
          margin-right: 10rpx;
        }

        .timeline-center {
          flex-shrink: 0;
          width: 30rpx;
          text-align: center;
          display: flex;
          flex-flow: column;

          .center-item {
            margin: auto;
          }

          .axis-line {
            background-color: #e1e1e1;
            width: 2rpx;
          }

          .axis-top {
            height: 20rpx;
          }

          .axis-circle {
            width: 8rpx;
            height: 8rpx;
            border-radius: 8rpx;
            border: 2rpx solid #e1e1e1;
            flex-shrink: 0;
          }

          .axis-bottom {
            height: 100%;
            background-color: #e1e1e1;

          }
        }

        .timeline-right {
          margin: 3rpx 0 50rpx 6rpx;
          flex: auto;

          .timeline-content {
            margin-left: 10rpx;
            margin-bottom: 40rpx;
            min-height: 160rpx;
            .content-title {
              display: flex;

              .title-dot {
                width: 12rpx;
                height: 12rpx;
                margin: auto 0 auto 0;
                background-color: #3dae00;
                border-radius: 6rpx;
              }

              .title-text {
                margin-left: 10rpx;
              }
            }

            .content-desc {
              margin-top: 6rpx;
            }
          }

          .content-baseline {
            height: 2rpx;
            background-color: #e1e1e1;
          }
        }
      }
    }
  }
}</style>
