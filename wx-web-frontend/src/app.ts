import { createApp } from 'vue'
import './app.less'
import NutUI from "@nutui/nutui-taro";
// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui-taro/dist/style.css";
const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
}).use(NutUI)

export default App
