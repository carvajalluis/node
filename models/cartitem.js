"use strict";
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    quantity: DataTypes.INTEGER
  });
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Product);
    CartItem.belongsTo(models.Cart);
  };
  return CartItem;
};
