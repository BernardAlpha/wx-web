import express from 'express';
import SQLPool from '../utils/sqlPool';
import Rep from '../utils/response';
import axios from 'axios';
import https from 'https';
import { base64Encode, base64Decode } from '../utils/common';

const PoTruck = express.Router();

const PHEAD = 'hErMAnOs';
const PDURATION = 1 * 60 * 1000;  // token有效期(分钟 * 60 * 1000)

PoTruck.post('/auth/wxLogin', (req, res) => {
  const apiUniCode = '0001';
  const code = req.body.data.code || '';
  // 获取微信小程序用户的 openid 和 session_key
  axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: 'wx2d0c03028e32da41',
      secret: '5d5dc979fa601da1e4dff025a1af0540',
      js_code: code,
      grant_type: 'authorization_code',
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }).then(wxRes => {
    console.log(' ', wxRes);
    console.log('wxRes.data', wxRes.data);
    if (wxRes.data.openid && wxRes.data.session_key) {
      const openid = wxRes.data.openid;
      const sessionKey = wxRes.data.session_key;
      try {
        const sqlQuery = `SELECT name, gender, phone_number AS phoneNumber, wx_openid AS wxOpenid FROM user WHERE wx_openid = '${openid}'`;
        // 先查询是否存在该用户
        SQLPool.query(sqlQuery, (err, results: any, fields) => {
          console.log('user-select', results);
          if (err) throw err;
          if (results.length > 0) {    // 存在则返回用户信息及token
            console.log('user-select-0', results[0]);
            Rep.nice(res, genData(results[0]));
          } else {                     // 不存在先注册
            SQLPool.query(`INSERT INTO user (wx_openid) VALUES ('${openid}');`, (err, results: any, fields) => {
              console.log('user-insert', results);
              if (err) throw err;
              SQLPool.query(sqlQuery, (err, results: any, fields) => {
                console.log('user-select', results);
                if (err) throw err;
                if (results.length > 0) {    // 存在则返回用户信息及token
                  console.log('user-select-2-0', results[0]);
                  Rep.nice(res, genData(results[0]));
                } else {                     // 不存在先注册
                  throw 'No one was found.';
                }
              })
            })
          }
        })
      } catch (err) {
        Rep.oops(res, `${apiUniCode}-01`, err);
      }
      const genData = (userData) => {
        return {
          session: sessionKey,
          token: genToken(openid, sessionKey),
          userData: userData
        }
      }
    } else {
      Rep.oops(res, `${apiUniCode}-02`, `[${wxRes.data.errcode}]${wxRes.data.errmsg}`)
    }
  }).catch(wxErr => {
    Rep.oops(res, `${apiUniCode}-03`, wxErr);
  });
});

PoTruck.post('/user/userInfo', (req, res) => {
  const apiUniCode = '0003';
  console.log('/user/userInfo--req', req.body);
  if (!authToken(req.body.token, req.body.session, apiUniCode, res)) {
    return
  }
  try {
    const sqlQuery = `SELECT name, gender, phone_number AS phoneNumber, wx_openid AS wxOpenid FROM user WHERE wx_openid = '${req.body.data.openid}'`;
    SQLPool.query(sqlQuery, (err, results) => {
      console.log('latestEvent-results', results);
      if (err) throw err;
      Rep.nice(res, results[0])
    })
  } catch (err) {
    Rep.oops(res, `${apiUniCode}-01`, err)
  }
});

const genToken = (openid: string, sessionKey: string) => {
  const currentTime = 't' + new Date().getTime().toString();
  return encrytFn(PHEAD + openid + sessionKey + currentTime);
}

const encrytFn = (str: string) => {
  let encodedArray = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charCode = char.charCodeAt(0);
    encodedArray.push(saltFn(charCode));
  }
  return base64Encode(JSON.stringify(encodedArray));
}

const decrytFn = (str: string) => {
  const decodeArry: Array<number> = JSON.parse(base64Decode(str));
  let decodestr = '';
  for (let i = 0; i < decodeArry.length; i++) {
    const num = decodeArry[i];
    String.fromCodePoint(deSaltFn(num))
    decodestr = decodestr + String.fromCodePoint(deSaltFn(num));
  }
  return decodestr;
}

const saltFn = (no: number) => {
  return (no + 9) * 2 - 7;
}
const deSaltFn = (no: number) => {
  return (no + 7) / 2 - 9;
}

const authToken = (token: string, sessionKey: string, apiUniCode: string, res) => {
  const deToken = decrytFn(token);
  console.log('deToken', deToken);
  const currentTime = new Date().getTime();
  const tokenHead = deToken.substring(0, PHEAD.length);
  const tokenSessionIndex = deToken.indexOf(sessionKey);
  const tokenTime = Number(deToken.substring(deToken.lastIndexOf('t') + 1, deToken.length))
  const timeInterval = currentTime - tokenTime;
  let errMsg = '';
  if (tokenHead !== PHEAD) {
    errMsg = 'Invalid Token!';
  }
  if (tokenSessionIndex < 0) {
    errMsg = 'Invalid Session!';
  }
  if (timeInterval < 0 || timeInterval > PDURATION) {
    errMsg = 'Invalid timeInterval!';
  }
  if (errMsg !== '') {
    Rep.oops(res, `${apiUniCode}-PLS411`, errMsg)
    return false;
  } else {
    return true;
  }
}

export default PoTruck;