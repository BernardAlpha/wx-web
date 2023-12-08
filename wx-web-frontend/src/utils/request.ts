// 判断是否包含中文字符
import website from '@/config/website'

// 返回的http状态码不是200
// 不处理resolve，统一报错
// code不为PLS200, 则业务接口有问题，统一报错

export const req = {
  GET: (url: string, params?: object) => {
    return PollosRequest(url, params, 'GET')
  },
  POST: (url: string, params?: object) => {
    return PollosRequest(url, params, 'POST')
  },
}

const PollosRequest = (url: string, params?: object, method?: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined) => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    uni.request({
      url: website.apiPrefix + url,
      method: method,
      data: params,
      success(res) {
        succFun(res, resolve);
      },
      fail(err) {
        failFun(err)
      },
    })
    // #endif

    // #ifdef MP-WEIXIN
    wx.cloud.callContainer({
      config: {
        env: website.wxCloudrunID, // 微信云托管的环境ID
      },
      path: url, // 填入业务自定义路径和参数，根目录，就是 /
      method: method, // 按照自己的业务开发，选择对应的方法
      data: params,
      header: {
        'X-WX-SERVICE': website.wxService, // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      },
      success(res) {
        succFun(res, resolve);
      },
      fail(err) {
        failFun(err)
      }
    });
    //#endif

  })
}


const succFun = (res, resolve) => {
  console.log("succFun", res)
  return resolve(res.data.data)
}

const failFun = (err) => {
  console.log("failFun", err)
  uni.showModal({
    title: '温馨提示',
    content: JSON.stringify(err)
  })
}
