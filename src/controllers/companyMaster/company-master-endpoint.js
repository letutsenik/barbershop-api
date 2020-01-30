import {
	getStatusCode,
	makeHttpError
} from '../../../utils/errors';

export const makeCompanyMasterEndpointHandler = ({ companies }) => {
	return async function handle (httpRequest) {
		switch (httpRequest.method) {
		case 'POST':
			return addMasterToCompany(httpRequest);

		case 'DELETE':
			return deleteMasterFromCompany(httpRequest);
		default:
			return makeHttpError({
				statusCode: 405,
				errorMessage: `${httpRequest.method} method not allowed.`
			});
		}
	};

	async function addMasterToCompany (httpRequest) {
		const { id: companyId } = httpRequest.pathParams || {};
		let { body } = httpRequest;
		if (!body) {
			return makeHttpError({
				statusCode: 400, // TODO: Replace with custom error
				errorMessage: 'Bad request. No POST body.'
			});
		}

		if (typeof httpRequest.body === 'string') {
			try {
				body = JSON.parse(body);
			} catch(e) {
				return makeHttpError({
					statusCode: 400,  // TODO: Replace with custom error
					errorMessage: 'Bad request. POST body must be valid JSON.'
				});
			}
		}

		try {
			const { id: masterId } = body;
			const result = await companies.setMaster(companyId, masterId);
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

	async function deleteMasterFromCompany (httpRequest) {
		const { id: companyId, mid: masterId } = httpRequest.pathParams || {};
		try {
			const result = await companies.deleteMaster(companyId, masterId);
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
