import { createSSRApp } from "vue";
import App from "./App.vue";

import website from '@/config/website'
import '@/styles/common.scss'
// import "highlight.js/styles/atom-one-dark.css"; // md code styles
// import "highlight.js/styles/agate.css"; // md code styles

uni.loadFontFace({
  global: true,
  family: 'MissU',
  source: `url("${website.staticPrefix}/public/font/MissU.ttf")`
})

// #ifdef MP-WEIXIN
wx.cloud.init({
  env: website.wxCloudrunID, // 填入云托管环境ID
})
//#endif

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
