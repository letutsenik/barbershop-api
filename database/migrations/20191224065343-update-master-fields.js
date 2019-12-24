'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Masters',
        'lastName',
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await queryInterface.renameColumn(
        'Masters',
        'name',
        'firstName',
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Masters', 'lastName', { transaction });
      await queryInterface.renameColumn(
        'Masters',
        'firstName',
        'name',
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
