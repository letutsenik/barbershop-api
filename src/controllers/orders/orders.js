import { makeOrder, validateOrder } from './order.js';

import { makeEntities } from '../common/entity/makeEntities';

export const makeOrders = makeEntities({
	EntityName: 'Order',
	makeEntity: makeOrder,
	validateEntity: validateOrder
});
