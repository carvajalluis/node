"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
