import { createApp } from 'vue'
import './styles/common.scss'
import Taro from '@tarojs/taro'
import website from './config/website'
Taro.loadFontFace({
  global: true,
  family: 'MissU',
  source: `url("${website.staticPrefix}/public/font/MissU.ttf")`
})
const App = createApp({}) 

export default App
