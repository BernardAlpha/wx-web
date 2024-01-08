<template>
  <view class="los-page gourd-mark-page">
    <navbar pageName="记录"></navbar>
    <view class="edit-box">
      <view class="edit-func"></view>
      <view class="edit-content">
        <textarea class="" :value="content"></textarea>
      </view>
    </view>

    <view class="preview-box">

    </view>

  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navbar from '@/pages/components/navbar.vue';

const content = ref('')

</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.gourd-mark-page {
  font-family: 'Consolas', 'Courier New', 'MissU';
  background-color: azure;
  .edit-box {
    // background-color: black;
    .edit-func {
      background-color: bisque;
      height: 260rpx;
      width: -webkit-fill-available;
    }
    .edit-content {
      textarea {
        background-color: aqua;
        width: -webkit-fill-available;
        height: 600rpx
      }
    }
  }

}
</style>
