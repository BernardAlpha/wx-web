import PoTruck from '@/utils/poTruck';
import SQLPool from '@/utils/sqlPool';
import Rep from '@/utils/response'
import axios from 'axios';
import https from 'https';

PoTruck.post('/auth/wxLogin', (req, res) => {
  const apiUniCode = '0001';
  const code = req.body.code || '';
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
            Rep.nice(res, results[0])
          } else {                     // 不存在先注册
            SQLPool.query(`INSERT INTO user (wx_openid) VALUES ('${openid}');`, (err, results: any, fields) => {
              console.log('user-insert', results);
              if (err) throw err;
              SQLPool.query(sqlQuery, (err, results: any, fields) => {
                console.log('user-select', results);
                if (err) throw err;
                if (results.length > 0) {    // 存在则返回用户信息及token
                  console.log('user-select-2-0', results[0]);
                  Rep.nice(res, results[0])
                } else {                     // 不存在先注册
                  throw 'No one was found.'
                }
              })
            })
          }
        })
      } catch (err) {
        Rep.oops(res, `${apiUniCode}-01`, err)
      }
    } else {
      Rep.oops(res, `${apiUniCode}-02`, `[${wxRes.data.errcode}]${wxRes.data.errmsg}`)
    }
  }).catch(wxErr => {
    Rep.oops(res, `${apiUniCode}-03`, wxErr)
  });
});

export default PoTruck;