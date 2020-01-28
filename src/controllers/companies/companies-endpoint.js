import {
	getStatusCode,
	makeHttpError
} from '../../../utils/errors';

export const makeCompanyEndpointHandler = ({ companies }) => {
	return async function handle (httpRequest) {
		switch (httpRequest.method) {
		case 'POST':
			return postCompany(httpRequest);

		case 'GET':
			return getCompanies(httpRequest);

		case 'PATCH':
			return updateCompany(httpRequest);

		case 'DELETE':
			return deleteCompany(httpRequest);

		default:
			return makeHttpError({
				statusCode: 405,
				errorMessage: `${httpRequest.method} method not allowed.`
			});
		}
	};

	async function getCompanies (httpRequest) {
		const { id } = httpRequest.pathParams || {};
		try {
			const result = id
				? await companies.get(id)
				: await companies.find();
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

	async function postCompany (httpRequest) {
		let companyInfo = httpRequest.body;
		if (!companyInfo) {
			return makeHttpError({
				statusCode: 400, // TODO: Replace with custom error
				errorMessage: 'Bad request. No POST body.'
			});
		}

		if (typeof httpRequest.body === 'string') {
			try {
				companyInfo = JSON.parse(companyInfo);
			} catch(e) {
				return makeHttpError({
					statusCode: 400,  // TODO: Replace with custom error
					errorMessage: 'Bad request. POST body must be valid JSON.'
				});
			}
		}

		try {
			const result = await companies.create(companyInfo);
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

	async function updateCompany (httpRequest) {
		const { id } = httpRequest.pathParams || {};
		let companyInfo = httpRequest.body;
		if (!companyInfo) {
			return makeHttpError({
				statusCode: 400,   // TODO: Replace with custom error
				errorMessage: 'Bad request. No POST body.'
			});
		}

		try {
			const result = await companies.update(id, companyInfo);
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

	async function deleteCompany (httpRequest) {
		const { id } = httpRequest.pathParams || {};

		try {
			const result = await companies.deleteCompany(id);
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
