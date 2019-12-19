"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING
  });
  User.associate = function(models) {
    User.hasOne(models.Cart);
    User.hasMany(models.Order);
  };
  return User;
};
