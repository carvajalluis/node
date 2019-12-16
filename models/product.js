"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
      },
      description: {
        type: DataTypes.STRING,
        autoIncrement: false
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  Product.associate = models => {
    Product.belongsToMany(models.Cart, { through: models.CartItem });
  };
  return Product;
};
