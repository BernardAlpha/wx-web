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

export const base64Decode = (str: string) => {
  // 在浏览器环境中
  if (typeof atob !== 'undefined') {
    return atob(str);
  }

  // 在 Node.js 环境中
  if (typeof Buffer !== 'undefined') {
    const buffer = Buffer.from(str, 'base64');
    return buffer.toString('utf-8');
  }

  throw new Error('Base64 decoding is not supported in this environment.');
}