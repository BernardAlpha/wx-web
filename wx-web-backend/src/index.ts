import Pollos from './utils/pollos';
import entrance from './services/entrance';

Pollos.use('', entrance)

const port = process.env.PORT || 1003;
Pollos.listen(port, () => {
  console.log('启动! 端口：', port);
})