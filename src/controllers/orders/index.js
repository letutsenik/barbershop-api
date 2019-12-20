import { adaptRequest } from '../../../utils'

import { makeDb } from '../../../database';
import { makeOrders } from './orders';
import { makeOrderEndpointHandler } from './orders-endpoint'

const database = makeDb();
const orders = makeOrders({ database });
const handleOrderRequest = makeOrderEndpointHandler({ orders });

export const orderController = (req, res) => {
  const httpRequest = adaptRequest(req);
  handleOrderRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(e => res.status(500).end())
};
