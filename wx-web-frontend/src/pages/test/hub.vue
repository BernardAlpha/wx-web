<template>
  <view class="hub" v-if="showPage">
    <view style="font-size:50rpx;"> 输入口令 </view>
    <input class="input-area" v-model="text" />
    <view> </view>
    <button class="button" type="primary" @click="enter">进入</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const showPage = ref(false);
const text = ref("");

const hubValue = uni.getStorageSync("hubValue");

if (hubValue === "基础服务") {
  uni.redirectTo({
    url: "/pages/test/questions",
  });
} else if (hubValue === "20221003") {
  uni.redirectTo({
    url: "/pages/index/index",
  });
} else {
  showPage.value = true;
}

console.log("hubValue", hubValue);

const enter = () => {
  console.log("enter", text.value);
  if (text.value === "基础服务") {
    uni.setStorageSync("hubValue", "基础服务");
    uni.redirectTo({
      url: "/pages/test/questions",
    });
  } else if (text.value === "20221003") {
    uni.redirectTo({
      url: "/pages/index/index",
    });
    uni.setStorageSync("hubValue", "20221003");
  }
};
</script>

<style lang="scss" scoped>
.hub {
  text-align: center;
  margin-top: 60%;
  padding: 0 40rpx;
  .input-area {
    text-align: center;
    margin: 50rpx;
  }
  .button {
    width: 400rpx;
  }
}
</style>
