"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {});
  Cart.associate = models => {
    Cart.belongsTo(models.User);
    Cart.belongsToMany(models.Product, { through: models.CartItem });
  };
  return Cart;
};
