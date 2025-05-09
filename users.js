const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: false, // Añadido
  },
  fullName: {
    type: DataTypes.STRING(90),
    allowNull: false,
    validate: { notEmpty: true },
    field: 'full_name', // Añadido para mapear explícitamente
  },
  gender: {
    type: DataTypes.BINARY, // Corregido de INTEGER a BINARY
    allowNull: true,
  },
  cell_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    defaultValue: '0',
    validate: { notEmpty: true }, // Cambiado de isEmail a notEmpty
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '0',
    validate: { notEmpty: true },
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;