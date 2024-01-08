<template>
  <view class="los-page gourd-page">
    <scroll-view class="content">
      <view class="search-area">
        <view class="seach-box">
          <input class="box-input" :style="inputStyle" placeholder="SEARCH" :focus="searchFocus" @confirm="searchConfirm"
            placeholder-style="color: rgba(240, 240, 240, 0.5)" />
          <view class="box-line"></view>
        </view>
      </view>
      <view class="grid-area type-area">
        <view class="type-item" v-for="item in typeGroup">
          <view class="type-icon">
            <image :src="`${website.staticPrefix}${item.icon}`"></image>
          </view>
          <view class="type-name">{{ item.name }}</view>
        </view>
      </view>
      <view class="grid-area entrance-area">
        <view class="entrance-item" v-for="item in entranceGroup" @click="entranceClick(item)">
          <view class="entrance-left">
            <view class="entrance-name">{{ item.name }}</view>
            <view class="entrance-desc">{{ item.name }}</view>


          </view>
          <view class="entrance-right">
            <image :src="`${website.staticPrefix}${item.icon}`"></image>
          </view>
        </view>
      </view>
      <view class="grid-area catalog-area">
        <view class="catalog-item" v-for="item in catalogGroup">
          <view class="catalog-icon">
            <image :src="`${website.staticPrefix}${item.icon}`"></image>
          </view>
          <view class="catalog-name">{{ item.name }}</view>
        </view>
      </view>
    </scroll-view>
    <tabbar :selectedIndex="2" background-color="#43216650"></tabbar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import tabbar from "@/pages/components/tabbar.vue";
import navbar from '@/pages/components/navbar.vue';
import { onShow } from "@dcloudio/uni-app";
import website from '@/config/website'

const searchFocus = ref(false);
const entranceGroup = ref([
  {
    id: 'e001',
    name: '记录',
    desc: '收进葫芦里',
    jumpUrl: '/pages/gourd/gourdMark',
    icon: '/public/gourd/entrance/pen.png'
  },
  {
    id: 'e002',
    name: '查询',
    desc: '取出',
    jumpUrl: '',
    icon: '/public/gourd/entrance/search.png'
  }
])
const typeGroup = ref([
  {
    name: '收藏',
    jumpUrl: '',
    icon: '/public/gourd/catalog/linux.png'
  },
  {
    name: '背题',
    jumpUrl: '',
    icon: '/public/gourd/catalog/html5.png'
  },
  {
    name: '食谱',
    jumpUrl: '',
    icon: '/public/gourd/catalog/recipe.png'
  },
  {
    name: '旅游',
    jumpUrl: '',
    icon: '/public/gourd/catalog/tour.png'
  }
]);
const catalogGroup = ref([
  {
    name: 'Linux',
    jumpUrl: '',
    icon: '/public/gourd/catalog/linux.png'
  },
  {
    name: 'JavaScript',
    jumpUrl: '',
    icon: '/public/gourd/catalog/javascript.png'
  },
  {
    name: 'CSS',
    jumpUrl: '',
    icon: '/public/gourd/catalog/css3.png'
  },
  {
    name: 'HTML',
    jumpUrl: '',
    icon: '/public/gourd/catalog/html5.png'
  },
  {
    name: '食谱',
    jumpUrl: '',
    icon: '/public/gourd/catalog/recipe.png'
  },
  {
    name: '旅游',
    jumpUrl: '',
    icon: '/public/gourd/catalog/tour.png'
  }
])

onShow(() => {
})

const showKeyboard = () => {
  searchFocus.value = true;
  uni.onKeyboardHeightChange(res => {
    console.log(res.height)
    if (res.height <= 0) {
      searchFocus.value = false;
      uni.offKeyboardHeightChange();
    }
  })
}

const entranceClick = (item) => {
  if (item.id === 'e002') {
    showKeyboard()
  } else {
    uni.navigateTo({url: item.jumpUrl})
  }
}

const searchConfirm = () => {
  uni.navigateTo({url: '/pages/gourd/gourdSearch'})
}



</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.gourd-page {
  font-family: 'Consolas', 'Courier New', 'MissU';
  background-color: #37383C;
  color: #ffffff;

  .content {
    // background-color: aqua;

    .search-area {
      height: 380rpx;
      width: 100%;
      position: relative;
      background-image: linear-gradient(315deg, #10132D 0, #432166 60%);
      ;
      // background-color:linear-gradient(to top, red, blue),
      //         linear-gradient(to left, green, #63DD54);
      //         background-blend-mode: multiply;
      // border-bottom-left-radius: 50rpx;
      // border-bottom-right-radius: 50rpx;

      .seach-box {
        width: -webkit-fill-available;
        position: absolute;
        bottom: 60rpx;
        margin: 0 60rpx;
        // background-color: aqua;

        .box-input {
          color: #ffffff;
          font-size: 50rpx;
          height: 80rpx;
          font-weight: bold;
          font-family: 'Consolas', 'Courier New', 'MissU';
        }

        .box-line {
          height: 4rpx;
          margin-top: 0rpx;
          background-color: rgba(240, 240, 240, 0.3);
        }
      }
    }

    .grid-area {
      margin: 60rpx 30rpx 20rpx 30rpx;
      width: -webkit-fill-available;
      min-height: 40rpx;
      justify-content: space-between;
      display: grid;
    }

    $typeItemWidth: var(--typeItemWidth, 160rpx);
    $entranceItemWidth: var(--entranceItemWidth, 330rpx);
    $catalogItemWidth: var(--catalogItemWidth, 120rpx);

    .type-area {
      grid-template-columns: repeat(auto-fill, $typeItemWidth);
      border-radius: 16rpx;
      background-color: #303134;
      // backdrop-filter: blur(10rpx);
      padding: 0 0 0 0;
      margin-top: 30rpx;

      .type-item {
        margin: 30rpx 0 20rpx 0;
        // background-color: palevioletred;
        height: 120rpx;
        width: $typeItemWidth;
        border-radius: 30rpx;
        text-align: center;

        .type-icon {

          // text-align: center;
          image {
            width: 80rpx;
            height: 80rpx;
          }
        }

        .type-name {
          font-size: 26rpx;
        }
      }
    }

    .entrance-area {
      grid-template-columns: repeat(auto-fill, $entranceItemWidth);

      .entrance-item {
        border: 2rpx solid #252628;
        background-color: #303134;
        height: 160rpx;
        width: $entranceItemWidth;
        border-radius: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .entrance-left {
          margin: 0 0 0 50rpx;

          .entrance-name {}

          .entrance-desc {
            font-size: 20rpx;
            margin-top: 10rpx;
          }
        }

        .entrance-right {
          margin: 0 50rpx 0 0;

          image {
            width: 90rpx;
            height: 90rpx;
          }
        }
      }
    }

    .catalog-area {
      grid-template-columns: repeat(auto-fill, $catalogItemWidth);

      .catalog-item {
        margin: 20rpx 0;
        // background-color: palevioletred;
        height: 120rpx;
        width: $catalogItemWidth;
        border-radius: 30rpx;
        text-align: center;

        .catalog-icon {

          // text-align: center;
          image {
            width: 70rpx;
            height: 70rpx;
          }
        }

        .catalog-name {
          font-size: 22rpx;
        }
      }
    }
  }
}
</style>
