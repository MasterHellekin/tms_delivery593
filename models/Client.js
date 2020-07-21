const Sequelize = require("sequelize");

const db = require("../config/database");
const User = require("../models/User");

const Client = db.define(
  "clientes",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    cedula: {
      type: Sequelize.STRING,
    },
    nomCli: {
      type: Sequelize.STRING,
    },
    provincia: {
      type: Sequelize.STRING,
    },
    ciudad: {
      type: Sequelize.STRING,
    },
    calle: {
      type: Sequelize.STRING,
    },
    telf1: {
      type: Sequelize.STRING,
    },
    telf2: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
  }
);

User.hasMany(Client);
Client.belongsTo(User);

module.exports = Client;
