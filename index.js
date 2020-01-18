import express from 'express';
import bodyParser from 'body-parser';

import { masterController, orderController } from './src/controllers';

const port = process.env.PORT || 9000;

const app = express();

app.use(bodyParser.json());

app.all('/masters', masterController);
app.all('/masters/:id', masterController);
app.all('/orders', orderController);

app.listen(port,() => {
	console.log(`app is listening to port ${port}`);
});
