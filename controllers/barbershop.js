import { adaptRequest } from '../utils'

export const barbershopController = (req, res) => {
  const httpRequest = adaptRequest(req);
};

// router.get('/barbershop', async (req, res) => {
//   const httpRequest = adaptRequest(req);
//
//   res.send(httpRequest)
// });

