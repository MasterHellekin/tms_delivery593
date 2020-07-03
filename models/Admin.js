const Sequelize = require("sequelize");

const db = require("../config/database");

const Admin = db.define("administradores", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
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
});

module.exports = Admin;
