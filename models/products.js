"use strict";
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {}
  );
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};
