import { notFoundElement } from '../../../utils/notFoundElement';

export const makeMasters = ({ database, errorHandler }) => {
  return Object.freeze({
    add,
    getItems,
    getItemById,
  });

  async function add (masterInfo) {
    try {
      const master = await database.models.Master.create(masterInfo);
      return {
        success: true,
        created: master
      }
    } catch (error) {
      errorHandler(error); // TODO: Should be updated
      return {
        success: false,
        error: error.message
      }
    }
  }
  async function getItems (param) {
    try {
      const masters = await database.models.Master.scope(['withOrders', 'withCompanies']).findAll(param);
      return {
        success: true,
        data: masters
      }
    } catch (error) {
      errorHandler(error);  // TODO: Should be updated
      return {
        success: false,
        error: error.message
      }
    }
  }

  async function getItemById (id) {
    try {
      const master = await database.models.Master
        .scope(['withOrders', 'withCompanies'])
        .findByPk(id)
        || notFoundElement(id);
      return {
        success: true,
        data: master
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
};
