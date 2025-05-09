require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('datos_de_usuario', 'tu_usuario', 'tu_contraseña', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;