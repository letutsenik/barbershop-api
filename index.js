import express from 'express';
import bodyParser from 'body-parser';

import { masterController } from './src/controllers'

const port = process.env.PORT || 9000;

const app = express();

app.use(bodyParser.json());

app.all('/masters', masterController);

app.listen(port,() => {
  console.log(`app is listening to port ${port}`);
});
