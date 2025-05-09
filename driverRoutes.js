const express = require('express');
const router = express.Router();
const Driver = require('../models/drivers');
const User = require('../models/users');
const Vehicle = require('../models/vehicle');

router.post('/drivers', async (req, res) => {
  try {
    const { user_id, license_number, vehicle_id } = req.body;
    const user = await User.findByPk(user_id);
    const vehicle = await Vehicle.findByPk(vehicle_id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    const driver = await Driver.create({ user_id, license_number, vehicle_id });
    res.status(201).json(driver);
  } catch (error) {
    res.status(error.name === 'SequelizeUniqueConstraintError' ? 409 : 400).json({ error: error.message });
  }
});

router.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: [
        { model: User, attributes: ['fullName'] },
        { model: Vehicle, attributes: ['model'] },
      ],
    });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/drivers/:id', async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['fullName'] },
        { model: Vehicle, attributes: ['model'] },
      ],
    });
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/drivers/:id', async (req, res) => {
  try {
    const { user_id, license_number, vehicle_id } = req.body;
    const driver = await Driver.findByPk(req.params.id);
    if (driver) {
      await driver.update({ user_id, license_number, vehicle_id });
      res.status(200).json(driver);
    } else {
      res.status(404).json({ error: 'Conductor no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/drivers/:id', async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (driver) {
      await driver.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Conductor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;