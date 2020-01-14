export const makeMasters = ({ database, errorHandler }) => {
  return Object.freeze({
    add,
    getItems,
  });

  async function add (masterInfo) {
    try {
      const master = await database.models.Master.create(masterInfo);
      return {
        success: true,
        created: master
      }
    } catch (error) {
      errorHandler(error);
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
      return {
        success: false,
        error: error.message
      }
    }
  }
};
