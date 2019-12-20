import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../../utils/errors'

const makeHttpError = ({ statusCode, errorMessage}) => {
  return { statusCode, errorMessage}
};

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
    const result = await masters.getItems();
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(result)
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
      const result = await masters.add(masterInfo);
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
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
            e instanceof RequiredParameterError
            ? 400
            : 500
      })
    }
  }
};
