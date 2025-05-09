const { DataTypes } = require('sequelize');
     const sequelize = require('../config/database');

     const Trip = sequelize.define('Trip', {
       trip_id: {
         type: DataTypes.STRING, // LONGTEXT en SQL, pero STRING es más manejable en Sequelize
         allowNull: false,
         primaryKey: true,
       },
       driver_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
           model: 'users',
           key: 'user_id',
         },
       },
       available_spaces: {
         type: DataTypes.INTEGER,
         allowNull: false,
       },
       passenger_id_1: {
         type: DataTypes.INTEGER,
         allowNull: true,
       },
       passenger_id_2: {
         type: DataTypes.INTEGER,
         allowNull: true,
       },
       passenger_id_3: {
         type: DataTypes.INTEGER,
         allowNull: true,
       },
       passenger_id_4: {
         type: DataTypes.INTEGER,
         allowNull: true,
       },
       registry_date: {
         type: DataTypes.DATE,
         allowNull: false,
       },
       starting_time: {
         type: DataTypes.DATE,
         allowNull: false,
       },
       finishing_time: {
         type: DataTypes.DATE,
         allowNull: false,
       },
     }, {
       tableName: 'trips',
       timestamps: false,
     });

     module.exports = Trip;