const Sequelize = require("Sequelize");

const db = require("../config/database");
const Admin = require("./Admin");

const Provider = db.define("proveedores", {
  id: {
    type: Sequelize.STRING,
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
});

Admin.hasMany(Provider);
Provider.belongsTo(Admin);

module.exports = Provider;
