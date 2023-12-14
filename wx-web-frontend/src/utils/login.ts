import { wxLoginApi } from '@/utils/api'

export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res: { code: string, errMsg?: string }) {
        console.log('wx.login', res);
        if (res.code) {
          //发起网络请求
          wxLoginApi({ code: res.code }).then((loginRes) => {
            uni.setStorageSync('tokenData', { token: loginRes.token, session: loginRes.session })
            uni.setStorageSync('userData', loginRes.userData)
            resolve(loginRes)
          }).catch(() => {
            reject(false)
          })
        } else {
          uni.showModal({
            title: '',
            content: 'wx登录失败！' + res.errMsg
          })
          reject(false)
        }
      },
      fail(err) {
        reject(false)
      }
    })

  })
}
