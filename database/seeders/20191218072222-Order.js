'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      {
        title: 'haircut',
        description: 'female haircut',
        masterId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'haircut',
        description: 'male haircut',
        masterId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
