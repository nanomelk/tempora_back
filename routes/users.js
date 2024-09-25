const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importa el modelo User
const bcrypt = require('bcryptjs');

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
   const { name, email, password } = req.body;
   // Encriptar la contraseña antes de guardarla
   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = new User({ name, email, password: hashedPassword });

   try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

module.exports = router;
