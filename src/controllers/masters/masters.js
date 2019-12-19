export const makeMasters = ({ database }) => {
  return Object.freeze({
    add,
    getItems,
  });

  async function add (master) {
    try {
      const master =  await database.models.Master.create(master);
      return {
        success: true,
        created: master
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
      const posts = await database.models.Master.findAll({
        include: [
          {
            model: database.models.Order,
            as: 'orders'
          }
        ]
      });
      return {
        success: true,
        data: posts
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
};
