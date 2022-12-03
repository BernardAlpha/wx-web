import { createApp } from 'vue'
import './styles/common.scss'
import Taro from '@tarojs/taro'
import website from './config/website'
Taro.loadFontFace({
  global: true,
  family: 'MissU',
  source: `url("${website.staticPrefix}/public/font/MissU.ttf")`,
})
const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
}) 

export default App
