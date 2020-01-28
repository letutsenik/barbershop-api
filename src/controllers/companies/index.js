import { adaptRequest } from '../../../utils';

import { makeDb } from '../../../database';
import { makeCompanies } from './companies';
import { makeCompanyEndpointHandler } from './companies-endpoint';

import { errorHandler } from '../../../utils/errorHandler';

const database = makeDb();
const companies = makeCompanies({ database, errorHandler });
const handleCompanyRequest = makeCompanyEndpointHandler({ companies });

export const companyController = (req, res) => {
	const httpRequest = adaptRequest(req);
	handleCompanyRequest(httpRequest)
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

