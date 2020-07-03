const Sequelize = require("sequelize");

const db = require("../config/database");
const Client = require("./Client");
const Provider = require("./Provider");

const Pia = db.define(
  "pia",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    pedido: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Client.hasMany(Pia);
Pia.belongsTo(Client);
Provider.hasMany(Pia);
Pia.belongsTo(Provider);

module.exports = Pia;
