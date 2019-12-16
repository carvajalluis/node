"use strict";
var faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var newData = [];

    for (let i = 0; i < 100; i++) {
      const seedData = {
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("Users", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
