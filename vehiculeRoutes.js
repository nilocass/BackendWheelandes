const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const User = require('../models/users');

router.post('/vehicles', async (req, res) => {
  try {
    const { model, licensePlate, userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const vehicle = await Vehicle.create({ model, licensePlate, userId });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(error.name === 'SequelizeUniqueConstraintError' ? 409 : 400).json({ error: error.message });
  }
});

router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [{ model: User, attributes: ['fullName'] }],
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['fullName'] }],
    });
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put('/vehicles/:id', async (req, res) => {
    try {
      const { model, licensePlate, userId } = req.body;
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (vehicle) {
        await vehicle.update({ model, licensePlate, userId });
        res.status(200).json(vehicle);
      } else {
        res.status(404).json({ error: 'Vehículo no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.delete('/vehicles/:id', async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (vehicle) {
        await vehicle.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Vehículo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;