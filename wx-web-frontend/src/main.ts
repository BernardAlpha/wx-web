import { createSSRApp } from "vue";
import App from "./App.vue";

import website from './config/website'
import '@/styles/common.scss'

uni.loadFontFace({
  global: true,
  family: 'MissU',
  source: `url("${website.staticPrefix}/public/font/MissU.ttf")`
})

// #ifdef MP-WEIXIN
wx.cloud.init({
  env: 'prod-8gbqt13c81eb5a4c', // 填入云托管环境ID
})
//#endif

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
