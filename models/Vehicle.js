const Sequelize = require("sequelize");

const db = require("../config/database");
const User = require("../models/User");

const Vehicle = db.define(
  "vehiculos",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    placa: {
      type: Sequelize.STRING,
    },
    marca: {
      type: Sequelize.STRING,
    },
    tipo: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Vehicle);
Vehicle.belongsTo(User);

module.exports = Vehicle;
