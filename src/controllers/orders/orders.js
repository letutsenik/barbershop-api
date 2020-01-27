import { makeOrder } from './order.js';
import { notFoundElement } from '../../../utils/notFoundElement';
import { validateOrder } from './order';

export const makeOrders = ({ database, errorHandler }) => {
	return Object.freeze({
		create,
		find,
		get,
		update,
		deleteOrder,
	});

	async function create (orderInfo) {
		try {
			const order = makeOrder(orderInfo);
			const result = await database.models.Order.create(order);

			return {
				success: true,
				created: result
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function find () {
		try {
			const orders = await database.models.Order.scope(['withMaster']).findAll();
			return {
				success: true,
				data: orders
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function get (id) {
		try {
			const order = await database.models.Order
				.scope(['withMaster'])
				.findByPk(id) || notFoundElement(id);
			return {
				success: true,
				data: order
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function update (id, data) {
		try {
			const order = await database.models.Order.findByPk(id);
			if (!order) return notFoundElement(id);
			const validOrder = validateOrder(data);
			const updatedOrder = await order.update(validOrder);

			return {
				success: true,
				data: updatedOrder
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function deleteOrder (id) {
		try {
			const order = await database.models.Order.findByPk(id);
			if (!order) return notFoundElement(id);
			await order.destroy();

			return {
				success: true,
				data: order
			};
		} catch (error) {
			errorHandler(error);
		}
	}
};
