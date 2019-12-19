import { adaptRequest } from '../../../utils'

import { makeDb } from '../../../database';
import { makeMasters } from './masters'


const database = makeDb();
const masters = makeMasters({ database });
const handleMasterRequest = makeMasterEndpointHandler({ masters });

export const masterController = (req, res) => {
  const httpRequest = adaptRequest(req);
  handleMasterRequest(httpRequest)

};
