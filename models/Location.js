const Sequelize = require("sequelize");

const db = require("../config/database");

const Location = db.define(
  "ubicaciones",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fecSalida: {
      type: Sequelize.DATE,
    },
    dirSalida: {
      type: Sequelize.STRING,
    },
    latSalida: {
      type: Sequelize.FLOAT,
    },
    lonSalida: {
      type: Sequelize.FLOAT,
    },
    fecLlegada: {
      type: Sequelize.STRING,
    },
    dirLlegada: {
      type: Sequelize.STRING,
    },
    latLlegada: {
      type: Sequelize.FLOAT,
    },
    lonLlegada: {
      type: Sequelize.FLOAT,
    },
    piaId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Location;
