export default defineAppConfig({
  pages: [
    'pages/index/index', 'pages/schedule/schedule'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  lazyCodeLoading: "requiredComponents"
})
