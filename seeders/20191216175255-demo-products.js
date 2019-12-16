"use strict";
var faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var newData = [];

    for (let i = 0; i < 100; i++) {
      const seedData = {
        title: faker.commerce.productName(),
        description: faker.commerce.product(),
        price: faker.commerce.price(),
        imageUrl: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("Products", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  }
};
