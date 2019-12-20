import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
  makeHttpError
} from '../../../utils/errors'

export const makeOrderEndpointHandler = ({ orders }) => {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postOrder(httpRequest);

      case 'GET':
        return getOrders(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  };

  async function getOrders (httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = await orders.getItems();
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(result)
    }
  }

  async function postOrder (httpRequest) {
    let orderInfo = httpRequest.body;
    if (!orderInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
      try {
        orderInfo = JSON.parse(orderInfo)
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        })
      }
    }

    try {
      const result = await orders.add(orderInfo);
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
