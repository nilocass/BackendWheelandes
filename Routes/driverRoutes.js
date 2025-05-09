const express = require('express');
       const router = express.Router();
       const Driver = require('../models/Driver'); // Ajustado el nombre del archivo
       const User = require('../models/users');

       router.post('/drivers', async (req, res) => {
         try {
           const { user_id, vehicle_license } = req.body;
           const user = await User.findByPk(user_id);
           if (!user) {
             return res.status(404).json({ error: 'Usuario no encontrado' });
           }
           const driver = await Driver.create({ user_id, vehicle_license });
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
             ],
           });
           res.status(200).json(drivers);
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       });

       router.get('/drivers/:user_id', async (req, res) => {
         try {
           const driver = await Driver.findByPk(req.params.user_id, {
             include: [
               { model: User, attributes: ['fullName'] },
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

       router.put('/drivers/:user_id', async (req, res) => {
         try {
           const { vehicle_license } = req.body;
           const driver = await Driver.findByPk(req.params.user_id);
           if (driver) {
             await driver.update({ vehicle_license });
             res.status(200).json(driver);
           } else {
             res.status(404).json({ error: 'Conductor no encontrado' });
           }
         } catch (error) {
           res.status(400).json({ error: error.message });
         }
       });

       router.delete('/drivers/:user_id', async (req, res) => {
         try {
           const driver = await Driver.findByPk(req.params.user_id);
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