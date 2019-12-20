import { adaptRequest } from '../../../utils'

import { makeDb } from '../../../database';
import { makeMasters } from './masters';
import { makeMasterEndpointHandler } from './masters-endpoint'


const database = makeDb();
const masters = makeMasters({ database });
const handleMasterRequest = makeMasterEndpointHandler({ masters });

export const masterController = (req, res) => {
  const httpRequest = adaptRequest(req);
  handleMasterRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(e => res.status(500).end())
};
