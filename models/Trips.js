const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trip = sequelize.define('Trip', {
  trip_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    references: {
      model: 'users',
      key: 'user_id',
    }
  },
    trip_status: {
    type: DataTypes.ENUM('active', 'completed', 'cancelled'),
    allowNull: false,
    },
  available_spaces: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  passenger_id_1: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  passenger_id_2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  passenger_id_3: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  passenger_id_4: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  registry_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  starting_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  finishing_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  trip_origin: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  trip_route: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  note_insight: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'trips',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['trip_id'],
      length: 150
    },
    {
      fields: ['driver_id']
    },
    {
      fields: ['available_spaces', 'passenger_id_1', 'passenger_id_2', 'passenger_id_3', 'passenger_id_4']
    }
  ]
});

module.exports = Trip;