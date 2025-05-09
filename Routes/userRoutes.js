const express = require('express');
       const router = express.Router();
       const User = require('../models/users');

       router.post('/', async (req, res) => {
         try {
           const { user_id, fullName, gender, cell_number, email, password } = req.body;
           if (!user_id) {
             return res.status(400).json({ error: 'El campo user_id es obligatorio' });
           }
           const user = await User.create({ user_id, fullName, gender, cell_number, email, password });
           res.status(201).json(user);
         } catch (error) {
           res.status(error.name === 'SequelizeUniqueConstraintError' ? 409 : 400).json({ error: error.message });
         }
       });

       router.get('/', async (req, res) => {
         try {
           const users = await User.findAll();
           res.status(200).json(users);
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       });

       router.get('/:id', async (req, res) => {
         try {
           const user = await User.findByPk(req.params.id);
           if (user) {
             res.status(200).json(user);
           } else {
             res.status(404).json({ error: 'Usuario no encontrado' });
           }
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       });

       router.put('/:id', async (req, res) => {
         try {
           const { fullName, gender, cell_number, email, password } = req.body;
           const user = await User.findByPk(req.params.id);
           if (user) {
             await user.update({ fullName, gender, cell_number, email, password });
             res.status(200).json(user);
           } else {
             res.status(404).json({ error: 'Usuario no encontrado' });
           }
         } catch (error) {
           res.status(400).json({ error: error.message });
         }
       });

       router.delete('/:id', async (req, res) => {
         try {
           const user = await User.findByPk(req.params.id);
           if (user) {
             await user.destroy();
             res.status(204).send();
           } else {
             res.status(404).json({ error: 'Usuario no encontrado' });
           }
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       });

       module.exports = router;