"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CartItems", {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      CartId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Carts", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      ProductId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Products", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CartItems");
  }
};
