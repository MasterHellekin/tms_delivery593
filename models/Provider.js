const Sequelize = require("Sequelize");

const db = require("../config/database");
const User = require("../models/User");

const Provider = db.define(
  "proveedores",
  {
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
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
  }
);

User.hasMany(Provider);
Provider.belongsTo(User);

module.exports = Provider;
