const Sequelize = require("sequelize");

const db = require("../config/database");
const User = require("./User");
const Vehicle = require("./Vehicle");
const Driver = require("./Driver");
const Client = require("./Client");

const Pia = db.define(
  "pia",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    pedidoPia: {
      type: Sequelize.STRING,
    },
    pedidoCliente: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    fecSalida: {
      type: Sequelize.DATE,
    },
    fecLlegada: {
      type: Sequelize.DATE,
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
    estado: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Pia);
Pia.belongsTo(User);
Vehicle.hasMany(Pia);
Pia.belongsTo(Vehicle);
Driver.hasMany(Pia);
Pia.belongsTo(Driver);
Client.hasMany(Pia);
Pia.belongsTo(Client);

module.exports = Pia;
