<template>
  <view class="los-page my-page-timeline my-page-questions">
    <!-- <view class="content"> -->
    <scroll-view
      class="content"
      @click="questionClick"
      :show-scrollbar="false"
      :scroll-y="true"
    >
      <invisible-module></invisible-module>

      <view class="question" v-if="questionList.length > 0">
        <view class="item type">{{
          `${currentQuestion[0]} (${currentIndex + 1}/${questionList.length})`
        }}</view>
        <view
          class="item qs"
          :style="
            currentQuestion[0] === '判断题' && (showAnwser || alwaysShowAnwser)
              ? currentQuestion[7][3] === 'a'
                ? 'color:#07c160;'
                : 'color:red;'
              : ''
          "
          >{{ currentQuestion[1] }}</view
        >
        <view
          class="item selection"
          :style="
            currentQuestion[7].indexOf(currentQuestion[2][0]) >= 0 &&
            (showAnwser || alwaysShowAnwser)
              ? 'color:blue;'
              : ''
          "
          >{{ currentQuestion[2] }}</view
        >
        <view
          class="item selection"
          :style="
            currentQuestion[7].indexOf(currentQuestion[3][0]) >= 0 &&
            (showAnwser || alwaysShowAnwser)
              ? 'color:blue;'
              : ''
          "
          >{{ currentQuestion[3] }}</view
        >
        <view
          class="item selection"
          :style="
            currentQuestion[7].indexOf(currentQuestion[4][0]) >= 0 &&
            (showAnwser || alwaysShowAnwser)
              ? 'color:blue;'
              : ''
          "
          >{{ currentQuestion[4] }}</view
        >
        <view
          class="item selection"
          :style="
            currentQuestion[7].indexOf(currentQuestion[5][0]) >= 0 &&
            (showAnwser || alwaysShowAnwser)
              ? 'color:blue;'
              : ''
          "
          >{{ currentQuestion[5] }}</view
        >
        <view
          class="item selection"
          :style="
            currentQuestion[7].indexOf(currentQuestion[6][0]) >= 0 &&
            (showAnwser || alwaysShowAnwser)
              ? 'color:blue;'
              : ''
          "
          >{{ currentQuestion[6] }}</view
        >
        <view
          class="item selection"
          v-if="
            currentQuestion[0] === '判断题' && (showAnwser || alwaysShowAnwser)
          "
          :style="
            currentQuestion[7][3] === 'a' ? 'color:#07c160;' : 'color:red;'
          "
          >{{ currentQuestion[7][3] === "a" ? "✔正确" : "❌错误" }}</view
        >
        <!-- <view class="item answer" v-show="showAnwser || alwaysShowAnwser">{{
          currentQuestion[7]
        }}</view> -->
      </view>

      <view class="button-area">
        <view class="switch-group">
          <view>背题模式</view>
          <switch
            :checked="alwaysShowAnwser"
            color="#1AAD19"
            @click="switchClick"
            style="transform: scale(0.7)"
          />
        </view>
        <view class="button-group">
          <button
            :disabled="currentIndex <= 0"
            type="primary"
            class="button"
            @click="stepClick('back')"
          >
            上一题
          </button>
          <button type="primary" class="button" @click="chooseClick">
            选题
          </button>
          <button
            :disabled="currentIndex >= questionList.length - 1"
            type="primary"
            class="button"
            @click="stepClick('next')"
          >
            下一题
          </button>
        </view>
      </view>
    </scroll-view>

    <nav-bar
      class="cus-nav"
      pageName="信息技术"
      titleId="timeline"
      :canBack="false"
    ></nav-bar>

    <view class="popup" v-show="showPopup">
      <view @click="showPopup = false" style="height: 30%; width: 100%"></view>
      <view class="popup-content">
        <view class="close" @click="closeClick">关闭</view>
        <scroll-view
          class="popup-main"
          :show-scrollbar="false"
          :scroll-y="true"
        >
          <view class="area">
            <view class="area-type">单选题</view>
            <view class="numbers">
              <view
                class="number"
                v-for="index of scont"
                :class="index === currentIndex + 1 ? 'current-number' : ''"
                @click="numberClick(index)"
                >{{ index }}</view
              >
            </view>
          </view>
          <view class="area">
            <view class="area-type">多选题</view>
            <view class="numbers">
              <view
                class="number"
                v-for="index of mscont"
                :class="
                  scont + index === currentIndex + 1 ? 'current-number' : ''
                "
                @click="numberClick(scont + index)"
                >{{ scont + index }}</view
              >
            </view>
          </view>
          <view class="area" style="padding-bottom: 160rpx">
            <view class="area-type">判断题</view>
            <view class="numbers">
              <view
                class="number"
                v-for="index of jcont"
                :class="
                  scont + mscont + index === currentIndex + 1
                    ? 'current-number'
                    : ''
                "
                @click="numberClick(scont + mscont + index)"
                >{{ scont + mscont + index }}</view
              >
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import navBar from "@/pages/components/navBar.vue";
import invisibleModule from "@/pages/components/invisibleModule.vue";
// import questionList from "@/data/questionList.json";
import { onLoad } from "@dcloudio/uni-app";
import { req } from '@/utils/request';
import website from '@/config/website';


const questionList = ref([]);

uni.showLoading();
req.FETCH(website.staticPrefix + '/public/data/questionList.json').then(res => {
  questionList.value = res;
  genTable();
  uni.hideLoading();
});

const currentIndex = ref(0);
const currentQuestion = computed(() => {
  return questionList.value[currentIndex.value];
});
const showAnwser = ref(false);
const isStepClick = ref(false);
const showPopup = ref(false);
const alwaysShowAnwser = ref(false);

watch(
  () => currentIndex.value,
  (newVal) => {
    uni.setStorageSync("questionIndex", currentIndex.value);
    console.log("currentQuestion", currentQuestion.value[7][3]);
  }
);

onLoad(() => {
  currentIndex.value = uni.getStorageSync("questionIndex") || 0;
});

const questionClick = () => {
  if (isStepClick.value) {
    isStepClick.value = false;
    return;
  }
  console.log("questionClick", showAnwser.value);
  console.log("currentIndex.value", currentIndex.value);

  if (showAnwser.value || alwaysShowAnwser.value) {
    showAnwser.value = false;
    if (currentIndex.value >= questionList.value.length - 1) {
      return;
    }
    currentIndex.value++;
  } else {
    showAnwser.value = true;
  }
};
const stepClick = (type: string) => {
  console.log("stepClick");
  isStepClick.value = true;
  showAnwser.value = false;
  type === "back" ? currentIndex.value-- : currentIndex.value++;
};

const closeClick = () => {
  showPopup.value = false;
};

const scont = ref(0);
const mscont = ref(0);
const jcont = ref(0);
const genTable = () => {
  for (let i = 0; i < questionList.value.length; i++) {
    // console.log("i", i);
    if (questionList.value[i][0] === "单选题") {
      scont.value++;
    } else if (questionList.value[i][0] === "多选题") {
      mscont.value++;
    } else if (questionList.value[i][0] === "判断题") {
      jcont.value++;
    }
  }
  console.log("", scont.value, mscont.value, jcont.value);
};

const numberClick = (index: number) => {
  showAnwser.value = false;
  showPopup.value = false;
  currentIndex.value = index - 1;
};

const switchClick = () => {
  console.log("switchClick");
  isStepClick.value = true;
  alwaysShowAnwser.value = !alwaysShowAnwser.value;
};

const chooseClick = () => {
  console.log("chooseClick");
  isStepClick.value = true;
  showPopup.value = true;
};
</script>

<style lang="scss" scoped>
.my-page-timeline {
  // font-family: "Microsoft Yahei";
  // font-family: "仿宋";
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  background: none;
  .content {
    background-color: none;
    min-height: 100%;
    // font-family: 'Microsoft Yahei';
    // font-family: 'Consolas';
    .question {
      padding: 20rpx 40rpx;
      background-color: none;
      height: 100%;
      .item {
        margin-bottom: 30rpx;
        font-size: 34rpx;
      }
      .type {
        font-size: 42rpx;
      }
      .qs {
        margin: 40rpx 0;
      }
      .answer {
        margin-top: 280rpx;
        margin-bottom: 300rpx;
        color: #d2d2d2;
      }
    }
    .button-area {
      padding-bottom: 60rpx;
      position: fixed;
      bottom: 60rpx;
      width: -webkit-fill-available;
      .button-group {
        display: flex;
        margin-top: 40rpx;
        justify-content: space-between;
      }
      .switch-group {
        text-align: center;
      }
    }
  }

  .popup {
    height: 100%;
    background-color: #000000b9;
    position: fixed;
    bottom: 0;
    width: 100%;
    .popup-content {
      height: 70%;
      background-color: #ffffff;
      position: absolute;
      bottom: 0;
      width: 100%;
      .close {
        // width:
        float: right;
        padding: 20rpx 40rpx;
        font-size: 36rpx;
      }
      .popup-main {
        clear: both;
        height: 100%;
        // height: -webkit-fill-available;
        .area {
          margin: 20rpx 30rpx;
          padding-bottom: 40rpx;
          .area-type {
            margin-bottom: 20rpx;
          }
          .numbers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .number {
              margin: 10rpx;
              padding: 10rpx;
              border: 2rpx solid #dddd;
              border-radius: 10rpx;
            }
            .current-number {
              background-color: #5c8dff;
            }
          }
        }
      }
    }
  }
}
</style>
