const Sequelize = require("sequelize");
const db = require("../config/database");

const Client = db.define("clientes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cedula: {
    type: Sequelize.STRING,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  calle: {
    type: Sequelize.STRING,
  },
});

module.exports = Client;
