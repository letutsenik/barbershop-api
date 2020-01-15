import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
  NotFoundElementError,
  makeHttpError
} from '../../../utils/errors'

import { makeMaster } from './master'

export const makeMasterEndpointHandler = ({ masters }) => {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postMaster(httpRequest);

      case 'GET':
        return getMasters(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  };

  async function getMasters (httpRequest) {
    const { id } = httpRequest.pathParams || {};
    try {
      const result = id
        ? await masters.getItemById(id)
        : await masters.getItems();
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      }
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode: getStatusCode(e)
      })
    }
  }

  async function postMaster (httpRequest) {
    let masterInfo = httpRequest.body;
    if (!masterInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
      try {
        masterInfo = JSON.parse(masterInfo)
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        })
      }
    }

    try {
      const master = makeMaster(masterInfo);
      const result = await masters.add(master);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      }
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode: getStatusCode(e)
      })
    }
  }
};

const getStatusCode = (error) => {
  if (error instanceof UniqueConstraintError) return 409;
  if (error instanceof InvalidPropertyError || error instanceof RequiredParameterError) return 400;
  if (error instanceof NotFoundElementError) return 404;
  return 500;
};
