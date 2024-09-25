const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();

// Configurar CORS para permitir solo solicitudes desde https://temporarelojes.netlify.app
app.use(cors()); // Permitir todas las solicitudes CORS


// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.error("Error de conexión", err));


// Rutas
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Servidor corriendo en puerto ${PORT}`);
});
