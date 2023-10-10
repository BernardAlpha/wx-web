import express from 'express';
import mysql from 'mysql2'

const Pollos = express();

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
  console.log('/events/latestEvent--req',req.query);
  sqlPool.query('select * from events', (err, results, fields) => {
    console.log('results',results);
    if (err) throw err;
    res.json(results);
  })
});

const port = process.env.PORT || 1003;

Pollos.listen(port, () => {
  console.log('启动! 端口：', port);
})