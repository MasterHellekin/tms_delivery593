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
    fec_sal: {
      type: Sequelize.DATE,
    },
    dir_sal: {
      type: Sequelize.STRING,
    },
    lat_sal: {
      type: Sequelize.FLOAT,
    },
    lon_sal: {
      type: Sequelize.FLOAT,
    },
    fec_lle: {
      type: Sequelize.STRING,
    },
    dir_lle: {
      type: Sequelize.STRING,
    },
    lat_lle: {
      type: Sequelize.FLOAT,
    },
    lon_lle: {
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
