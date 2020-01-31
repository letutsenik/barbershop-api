import {
	getStatusCode,
	makeHttpError
} from '../../../utils/errors';

export const makeOrderEndpointHandler = ({ orders }) => {
	return async function handle (httpRequest) {
		switch (httpRequest.method) {
		case 'POST':
			return postOrder(httpRequest);

		case 'GET':
			return getOrders(httpRequest);

		case 'PATCH':
			return updateOrder(httpRequest);

		case 'DELETE':
			return deleteOrder(httpRequest);

		default:
			return makeHttpError({
				statusCode: 405,
				errorMessage: `${httpRequest.method} method not allowed.`
			});
		}
	};

	async function getOrders (httpRequest) {
		const { id } = httpRequest.pathParams || {};
		try {
			const result = id
				? await orders.get(id, ['withMaster'])
				: await orders.find({}, ['withMaster']);
			return {
				headers: {
					'Content-Type': 'application/json'
				},
				statusCode: 200,
				data: JSON.stringify(result)
			};
		} catch (e) {
			return makeHttpError({
				errorMessage: e.message,
				statusCode: getStatusCode(e)
			});
		}
	}

	async function postOrder (httpRequest) {
		let orderInfo = httpRequest.body;
		if (!orderInfo) {
			return makeHttpError({
				statusCode: 400, // TODO: Replace with custom error
				errorMessage: 'Bad request. No POST body.'
			});
		}

		if (typeof httpRequest.body === 'string') {
			try {
				orderInfo = JSON.parse(orderInfo);
			} catch(e) {
				return makeHttpError({
					statusCode: 400,  // TODO: Replace with custom error
					errorMessage: 'Bad request. POST body must be valid JSON.'
				});
			}
		}

		try {
			const result = await orders.create(orderInfo);
			return {
				headers: {
					'Content-Type': 'application/json'
				},
				statusCode: 201,
				data: JSON.stringify(result)
			};
		} catch (e) {
			return makeHttpError({
				errorMessage: e.message,
				statusCode: getStatusCode(e)
			});
		}
	}

	async function updateOrder (httpRequest) {
		const { id } = httpRequest.pathParams || {};
		let orderInfo = httpRequest.body;
		if (!orderInfo) {
			return makeHttpError({
				statusCode: 400,   // TODO: Replace with custom error
				errorMessage: 'Bad request. No POST body.'
			});
		}

		try {
			const result = await orders.update(id, orderInfo);
			return {
				headers: {
					'Content-Type': 'application/json'
				},
				statusCode: 200,
				data: JSON.stringify(result)
			};
		} catch (e) {
			return makeHttpError({
				errorMessage: e.message,
				statusCode: getStatusCode(e)
			});
		}
	}

	async function deleteOrder (httpRequest) {
		const { id } = httpRequest.pathParams || {};

		try {
			const result = await orders.deleteEntity(id);
			return {
				headers: {
					'Content-Type': 'application/json'
				},
				statusCode: 200,
				data: JSON.stringify(result)
			};
		} catch (e) {
			return makeHttpError({
				errorMessage: e.message,
				statusCode: getStatusCode(e)
			});
		}
	}
};
