const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/users');
const Trip = require('./models/Trips');
const Driver = require('./models/Driver');
const Vehicle = require('./models/Vehicle');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();

// Relaciones
User.hasMany(Trip, { foreignKey: 'driver_id' });
Trip.belongsTo(User, { foreignKey: 'driver_id' });

User.hasMany(Vehicle, { foreignKey: 'userId' });
Vehicle.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Driver, { foreignKey: 'user_id' });
Driver.belongsTo(User, { foreignKey: 'user_id' });

Vehicle.hasMany(Driver, { foreignKey: 'vehicle_id' });
Driver.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', driverRoutes);
app.use('/api', vehicleRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Sincronizar con la base de datos e iniciar el servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

startServer();