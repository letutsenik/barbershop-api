'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Master belongsToMany Company
    return queryInterface.createTable(
      'CompanyMaster',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        companyId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        masterId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('CompanyMaster');
  },
};
