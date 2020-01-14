'use strict';
module.exports = (sequelize, DataTypes) => {
  const Master = sequelize.define('Master', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {});
  Master.associate = function(models) {
    Master.hasMany(models.Order, {
      foreignKey: 'masterId',
      as: 'orders',
      onDelete: 'CASCADE',
    });

    Master.belongsToMany(models.Company, {
      as: 'workCompanies',
      through: sequelize.models.CompanyMaster,
      foreignKey: "masterId",
      otherKey   : 'companyId'
    })
  };

  Master.addScope(
    'withOrders',
    () => ({
      include: [
        {
          model: sequelize.models.Order,
          as: 'orders'
        }
      ]
    })
  );
  Master.addScope(
    'withCompanies',
    () => ({
      include: [
        {
          model: sequelize.models.Company,
          as: 'workCompanies'
        }
      ]
    })
  );
  return Master;
};
