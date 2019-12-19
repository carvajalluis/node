"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {}, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User);
    Order.belongsToMany(models.Product, { through: models.OrderItem });
  };
  return Order;
};
