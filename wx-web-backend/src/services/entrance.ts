import express from 'express';
import daysMatter from '@/services/daysMatter';
import user from '@/services/user';

const PoTruck = express.Router();

PoTruck.use('', daysMatter);
PoTruck.use('', user);

export default PoTruck;