const { DataTypes } = require('sequelize');
     const sequelize = require('../config/database');

     const Driver = sequelize.define('Driver', {
       user_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         references: {
           model: 'users',
           key: 'user_id',
         },
       },
       vehicle_license: {
         type: DataTypes.STRING(6),
         allowNull: true,
       },
     }, {
       tableName: 'drivers',
       timestamps: false,
     });

     module.exports = Driver;