'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Masters', [
        {
          firstName: 'John',
          lastName: 'Gold',
          email: 'john@mail.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Masters', null, {});
  }
};
