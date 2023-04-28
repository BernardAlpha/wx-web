import { createSSRApp } from "vue";
import App from "./App.vue";

import website from './config/website'
import '@/styles/common.scss'

uni.loadFontFace({
  global: true,
  family: 'MissU',
  source: `url("${website.staticPrefix}/public/font/MissU.ttf")`
})

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
