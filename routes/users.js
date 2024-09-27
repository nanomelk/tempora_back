const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para cargar variables de entorno

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear un nuevo usuario con habilidad predeterminada 'user'
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      habilities: 'user' // Inicializar con 'user'
    });

    const savedUser = await newUser.save();

    // Generar token JWT al registrarse
    //const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
    //  expiresIn: '1h', // El token expira en 1 hora
    //});

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: savedUser//,
      //token, // Devolvemos el token
    });
  } catch (err) {
    res.status(400).json({ message: 'Error al registrar el usuario', error: err.message });
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

       // Generar el token JWT
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

       // Configurar la cookie con opciones seguras
       res.cookie('token', token, {
           httpOnly: true, // La cookie no es accesible desde JS
           secure: process.env.NODE_ENV === 'production', // Solo se envía a través de HTTPS en producción
           sameSite: 'Strict', // Solo se envía en solicitudes del mismo sitio
           maxAge: 3600000 // 1 hora
       });

       // Enviar respuesta exitosa incluyendo el token y habilidades
       res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
            id: user._id,
            name: user.name,
            habilities: user.habilities // Incluir habilidades en la respuesta
        },
        token // Devuelve el token aquí
    });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
