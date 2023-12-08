import mysql from 'mysql2'

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const [MYSQL_HOST, MYSQL_PORT] = MYSQL_ADDRESS.split(":");
const SQLPool = mysql.createPool({
  host: MYSQL_HOST,  //'localhost',
  port: Number(MYSQL_PORT),
  user: MYSQL_USERNAME,  //'root',
  password: MYSQL_PASSWORD,  //'password',
  database: 'mailan_pollos'
});

export default SQLPool;