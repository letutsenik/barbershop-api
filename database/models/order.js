'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    masterId: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Master, {
      foreignKey: 'masterId',
      as: 'master',
      onDelete: 'CASCADE',
    })
  };
  return Order;
};
