import express from 'express';

const App = express();

App.get('/', (req, res) => {
  res.send('Hello  World!');
});


const port = process.env.PORT || 1003;

App.listen(port, () => {
  console.log('启动! 端口：', port);
})