export const makeOrders = ({ database }) => {
  return Object.freeze({
    add,
    getItems,
  });

  async function add (order) {
    try {
      const order =  await database.models.Order.create(order);
      return {
        success: true,
        created: order
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
  async function getItems () {
    try {
      const orders = await database.models.Order.scope(['withMaster']).findAll();
      return {
        success: true,
        data: orders
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
};
