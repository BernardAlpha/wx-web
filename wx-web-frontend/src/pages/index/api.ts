import website from '../../config/website'

export const countdownDayInfo = () => {
  return new Promise((resolve, reject) => {

    //#ifdef H5
    uni.request({
      url: website.apiPrefix + '/events/latestEvent',
      method: 'GET',
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        uni.showModal({
          title: '温馨提示',
          content: err.errMsg
        })
        reject(err)
      },
    })
    //#endif

    // #ifdef MP-WEIXIN
    wx.cloud.callContainer({
      config: {
        env: website.wxCloudrunID, // 微信云托管的环境ID
      },
      path: '/events/latestEvent', // 填入业务自定义路径和参数，根目录，就是 /
      method: 'GET', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': website.wxService, // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        // 'X-WX-EXCLUDE-CREDENTIALS': 'unionid, cloudbase-access-token, openid' // 不附带用户unionid，openid，access—token
      },
      success(res) {
        console.log("wxcres", res)
        resolve(res.data)
      },
      fail(err) {
        console.log("wxcerr", err)
        reject(err)
      }
    });
    //#endif

  })
}

