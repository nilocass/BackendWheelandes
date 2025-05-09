const { DataTypes } = require('sequelize');
     const sequelize = require('../config/database');

     const User = sequelize.define('User', {
       user_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         unique: true,
         autoIncrement: false, // No auto-incrementado, el valor debe proporcionarse
       },
       fullName: {
         type: DataTypes.STRING(90),
         allowNull: false,
         validate: { notEmpty: true },
         field: 'full_name',
       },
       gender: {
         type: DataTypes.INTEGER, // Ajustado para coincidir con INT(10)
         allowNull: true,
         get() {
           const value = this.getDataValue('gender');
           return value === 1 ? 'F' : value === 0 ? 'M' : null;
         },
         set(value) {
           if (value === 'M') this.setDataValue('gender', 0);
           else if (value === 'F') this.setDataValue('gender', 1);
           else this.setDataValue('gender', null);
         },
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
         validate: { isEmail: true }, // Ajustado a isEmail para validar formato de correo
       },
       password: {
         type: DataTypes.STRING(50),
         allowNull: false,
         validate: { notEmpty: true },
       },
     }, {
       tableName: 'users',
       timestamps: false,
     });

     module.exports = User;