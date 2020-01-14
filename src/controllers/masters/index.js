import { adaptRequest } from '../../../utils'

import { makeDb } from '../../../database';
import { makeMasters } from './masters';
import { makeMasterEndpointHandler } from './masters-endpoint'

import { errorHandler } from '../../../utils/errorHandler'

const database = makeDb();
const masters = makeMasters({ database, errorHandler });
const handleMasterRequest = makeMasterEndpointHandler({ masters });

export const masterController = (req, res) => {
  const httpRequest = adaptRequest(req);
  handleMasterRequest(httpRequest)
    .then(({ headers, statusCode, data, errorMessage }) => {
      const responseData = errorMessage ? { error: errorMessage } : data;
      return res
        .set(headers)
        .status(statusCode)
        .send(responseData)
    }
    )
    .catch(e => res.status(500).end())
};
