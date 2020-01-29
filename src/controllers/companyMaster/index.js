import { adaptRequest } from '../../../utils';

import { makeDb } from '../../../database';
import { makeCompanies } from '../companies/companies';
import { makeCompanyMasterEndpointHandler } from './company-master-endpoint';

import { errorHandler } from '../../../utils/errorHandler';

const database = makeDb();
const companies = makeCompanies({ database, errorHandler });
const handleCompanyMasterRequest = makeCompanyMasterEndpointHandler({ companies });

export const companyMasterController = (req, res) => {
	const httpRequest = adaptRequest(req);
	handleCompanyMasterRequest(httpRequest)
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

