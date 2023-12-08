import { req } from "./request"

// WeChat MicroProgram login
export const wxLoginApi = (params: wxLoginApiParams) => {
  return req.POST('/auth/wxLogin', params)
}
interface wxLoginApiParams {
  code: string
}
