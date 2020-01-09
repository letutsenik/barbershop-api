'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Companies',
    [
      {
        title: 'Chick-Chick',
        description: 'Some cool barbershop',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Cut-Cut',
        description: 'Another cool barbershop',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Vzik-vzik',
        description: 'Another one cool barbershop',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Companies', null, {}),
};
