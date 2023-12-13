// 判断是否包含中文字符
export const isChineseStr = (str: string) => {
  return /.*[\u4e00-\u9fa5]+.*$/.exec(str)
}

// 字符串转base64
export const base64Encode = (str: string) => {
  const base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let result = "";
  for (let i = 0; i < str.length; i += 3) {
    const triplet = (str.charCodeAt(i) << 16) | (str.charCodeAt(i + 1) << 8) | str.charCodeAt(i + 2);
    for (let j = 0; j < 4; j++) {
      if (i * 8 + j * 6 <= str.length * 8) {
        result += base64Table.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
      } else {
        result += "=";
      }
    }
  }
  return result;
}
