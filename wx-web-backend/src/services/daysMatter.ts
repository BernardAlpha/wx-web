import express from 'express';
import SQLPool from '@/utils/sqlPool';
import Rep from '@/utils/response'

const PoTruck = express.Router();

PoTruck.post('/events/latestEvent', (req, res) => {
  const apiUniCode = '0002';
  console.log('/events/latestEvent--req', req.query);
  try {
    SQLPool.query('select * from events', (err, results) => {
      console.log('latestEvent-results', results);
      if (err) throw err;
      Rep.nice(res, results[0])
    })
  } catch (err) {
    Rep.oops(res, `${apiUniCode}-01`, err)
  }
});

export default PoTruck;