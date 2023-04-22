// 判断是否包含中文字符
export const isChineseStr = (str:string) => {
  return /.*[\u4e00-\u9fa5]+.*$/.exec(str)
}