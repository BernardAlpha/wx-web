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
  FETCH: (url: string) => {
    return new Promise((resolve) => {
      uni.request({
        url: url,
        method: 'GET',
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          failFun(err, url)
        },
      })
    })
  }
}

const PollosRequest = (url: string, params?: object, method?: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined) => {
  return new Promise((resolve) => {
    // #ifdef H5
    uni.request({
      url: website.apiPrefix + url,
      method: method,
      data: params,
      success(res) {
        succFun(res, url, resolve);
      },
      fail(err) {
        failFun(err, url)
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
      success(res: succFunRes) {
        succFun(res, url, resolve);
      },
      fail(err: any) {
        failFun(err, url)
      }
    });
    //#endif

  })
}

const succFun = (res: succFunRes, url: string, resolve: any) => {
  console.log(`%csuccFun-[${url}]\n`, 'color: green; font-weight: bold;', res)
  if (res.data.code === 'PLS200') {
    return resolve(res.data.data)
  }
  else {
    uni.showModal({
      title: '温馨提示',
      content: `[${res.data.code}]${res.data.errMsg}`
    })
  }
}
interface succFunRes {
  data: {
    code: string
    errMsg?: string   // code不为PLS200返回
    data?: object   // code为PLS200返回
  }
}

const failFun = (err: any, url: string) => {
  console.log(`%cfailFun-[${url}]\n`, 'color: red; font-weight: bold;', err)
  uni.showModal({
    title: '温馨提示',
    content: JSON.stringify(err)
  })
}
