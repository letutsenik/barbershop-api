import {
  getStatusCode,
  makeHttpError
} from '../../../utils/errors'

export const makeMasterEndpointHandler = ({ masters }) => {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postMaster(httpRequest);

      case 'GET':
        return getMasters(httpRequest);

      case 'PATCH':
        return updateMaster(httpRequest);

      case 'DELETE':
        return deleteMaster(httpRequest);

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
        ? await masters.get(id)
        : await masters.find();
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
        statusCode: 400,  // TODO: Replace with custom error
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
      try {
        masterInfo = JSON.parse(masterInfo)
      } catch {
        return makeHttpError({
          statusCode: 400,  // TODO: Replace with custom error
          errorMessage: 'Bad request. POST body must be valid JSON.'
        })
      }
    }

    try {
      const result = await masters.create(masterInfo);
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

  async function updateMaster (httpRequest) {
    const { id } = httpRequest.pathParams || {};
    let masterInfo = httpRequest.body;
    if (!masterInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    try {
      const result = await masters.update(id, masterInfo);
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

  async function deleteMaster (httpRequest) {
    const { id } = httpRequest.pathParams || {};

    try {
      const result = await masters.deleteMaster(id);
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
  };
