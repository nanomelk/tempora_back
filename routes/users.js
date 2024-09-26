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

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      // Buscar el usuario por el correo electrónico
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      // Aquí puedes generar un token JWT si lo deseas, pero eso es opcional por ahora
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

module.exports = router;
