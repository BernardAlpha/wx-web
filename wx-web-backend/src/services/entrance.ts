import express from 'express';
import daysMatter from './daysMatter';
import user from './user';

const PoTruck = express.Router();

PoTruck.use('', daysMatter);
PoTruck.use('', user);

export default PoTruck;