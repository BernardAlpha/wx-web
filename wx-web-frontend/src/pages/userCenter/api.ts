import { req } from '@/utils/request'

export const getUserInfo = (params: getUserInfoParams) => {
  return req.POST('/user/userInfo', params)
}

interface getUserInfoParams {
  wxOpenid: string
}
