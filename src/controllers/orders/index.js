import { adaptRequest } from '../../../utils';

import { makeDb } from '../../../database';
import { makeOrders } from './orders';
import { makeOrderEndpointHandler } from './orders-endpoint';

import { errorHandler } from '../../../utils/errorHandler';

const database = makeDb();
const orders = makeOrders({ database, errorHandler });
const handleOrderRequest = makeOrderEndpointHandler({ orders });

export const orderController = (req, res) => {
	const httpRequest = adaptRequest(req);
	handleOrderRequest(httpRequest)
		.then(({ headers, statusCode, data, errorMessage }) => {
			const responseData = errorMessage ? { error: errorMessage } : data;
			return res
				.set(headers)
				.status(statusCode)
				.send(responseData);
		}
		)
		.catch(e => res.status(500).end());
};

