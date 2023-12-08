import PoTruck from '@/utils/poTruck';
import SQLPool from '@/utils/sqlPool';

PoTruck.get('/events/latestEvent', (req, res) => {
  console.log('/events/latestEvent--req', req.query);
  SQLPool.query('select * from events', (err, results, fields) => {
    console.log('results', results);
    if (err) throw err;
    res.json(JSON.stringify(results));
  })
});

export default PoTruck;