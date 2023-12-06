import express from 'express';
import mysql from 'mysql2'
import axios from 'axios';

const Pollos = express();
Pollos.use(express.urlencoded({ extended: true }));
// Pollos.use(express.json());

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const [MYSQL_HOST, MYSQL_PORT] = MYSQL_ADDRESS.split(":");
console.log('MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT', MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT);
const sqlPool = mysql.createPool({
  host: MYSQL_HOST,  //'localhost',
  port: Number(MYSQL_PORT),
  user: MYSQL_USERNAME,  //'root',
  password: MYSQL_PASSWORD,  //'password',
  database: 'mailan_pollos'
});

Pollos.get('/', (req, res) => {
  res.send('Hello  World!');
});

Pollos.get('/events/latestEvent', (req, res) => {
  console.log('/events/latestEvent--req', req.query);
  sqlPool.query('select * from events', (err, results, fields) => {
    console.log('results', results);
    if (err) throw err;
    res.json(results);
  })
});

Pollos.post('/auth/wxLogin', (req, res) => {
  console.log('/auth/wxLogin--req', req);
  console.log('/auth/wxLogin--req.body', req.body);
  console.log('/auth/wxLogin--req.body.code', req.body.code);
  console.log('/auth/wxLogin--res', res);
  const code = req.body.code || ''
  // 获取微信小程序用户的 openid 和 session_key
  axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: 'wx2d0c03028e32da41',
      secret: '5d5dc979fa601da1e4dff025a1af0540',
      js_code: code,
      grant_type: 'authorization_code',
    },
  }).then(wxRes => {
    console.log('wxRes', wxRes);
    res.json(wxRes);
  }).catch(wxErr => {
    console.error('登录失败', wxErr);
    res.status(500).json({ wxErr: '登录失败\n' + wxErr });
  });

});

const port = process.env.PORT || 1003;

Pollos.use(express.json());
Pollos.listen(port, () => {
  console.log('启动! 端口：', port);
})