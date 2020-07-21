const Sequelize = require("sequelize");

const db = require("../config/database");
const User = require("./User");

const Driver = db.define(
  "conductores",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nomCon: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    rol: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
  }
);

User.hasMany(Driver);
Driver.belongsTo(User);

module.exports = Driver;
