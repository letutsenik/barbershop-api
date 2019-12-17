import express from 'express';
import bodyParser from 'body-parser';

import barbershopRouter from './controllers/barbershop'

const port = process.env.PORT || 9000;

const app = express();

app.use(bodyParser.json());

app.use(barbershopRouter);

app.listen(port,() => {
  console.log(`app is listening to port ${port}`);
});
