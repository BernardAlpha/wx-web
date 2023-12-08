import express from 'express';

const Pollos = express();
Pollos.use(express.urlencoded({ extended: true }));
Pollos.use(express.json());

export default Pollos;