const express = require('express');
     const router = express.Router();
     const Trip = require('../models/Trips');
     const User = require('../models/users');

     router.post('/trips', async (req, res) => {
       try {
         const { trip_id, driver_id, available_spaces, passenger_id_1, passenger_id_2, passenger_id_3, passenger_id_4, registry_date, starting_time, finishing_time } = req.body;
         const user = await User.findByPk(driver_id);
         if (!user) {
           return res.status(404).json({ error: 'Conductor no encontrado' });
         }
         const trip = await Trip.create({ trip_id, driver_id, available_spaces, passenger_id_1, passenger_id_2, passenger_id_3, passenger_id_4, registry_date, starting_time, finishing_time });
         res.status(201).json(trip);
       } catch (error) {
         res.status(error.name === 'SequelizeUniqueConstraintError' ? 409 : 400).json({ error: error.message });
       }
     });

     router.get('/trips', async (req, res) => {
       try {
         const trips = await Trip.findAll({
           include: [{ model: User, attributes: ['fullName'] }],
         });
         res.status(200).json(trips);
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     });

     router.get('/trips/:trip_id', async (req, res) => {
       try {
         const trip = await Trip.findByPk(req.params.trip_id, {
           include: [{ model: User, attributes: ['fullName'] }],
         });
         if (trip) {
           res.status(200).json(trip);
         } else {
           res.status(404).json({ error: 'Viaje no encontrado' });
         }
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     });

     router.put('/trips/:trip_id', async (req, res) => {
       try {
         const { driver_id, available_spaces, passenger_id_1, passenger_id_2, passenger_id_3, passenger_id_4, registry_date, starting_time, finishing_time } = req.body;
         const trip = await Trip.findByPk(req.params.trip_id);
         if (trip) {
           await trip.update({ driver_id, available_spaces, passenger_id_1, passenger_id_2, passenger_id_3, passenger_id_4, registry_date, starting_time, finishing_time });
           res.status(200).json(trip);
         } else {
           res.status(404).json({ error: 'Viaje no encontrado' });
         }
       } catch (error) {
         res.status(400).json({ error: error.message });
       }
     });

     router.delete('/trips/:trip_id', async (req, res) => {
       try {
         const trip = await Trip.findByPk(req.params.trip_id);
         if (trip) {
           await trip.destroy();
           res.status(204).send();
         } else {
           res.status(404).json({ error: 'Viaje no encontrado' });
         }
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     });

     module.exports = router;