const { DataTypes } = require('sequelize');
       const sequelize = require('../config/database');

       const Vehicle = sequelize.define('Vehicle', {
         vehicle_id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           field: 'vehicle_id',
         },
         model: {
           type: DataTypes.STRING(50),
           allowNull: false,
           validate: {
             notEmpty: true,
           },
         },
         licensePlate: {
           type: DataTypes.STRING(20),
           allowNull: false,
           unique: true,
           validate: {
             notEmpty: true,
           },
           field: 'license_plate',
         },
         userId: {
           type: DataTypes.INTEGER,
           allowNull: false,
           references: {
             model: 'users',
             key: 'user_id', // Ajustado para coincidir con users.js
           },
           field: 'userId',
         },
       }, {
         tableName: 'vehicles',
         timestamps: false,
       });

       module.exports = Vehicle;