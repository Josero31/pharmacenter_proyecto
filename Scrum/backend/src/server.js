require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el servidor funciona
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Servidor Pharmacenter funcionando' });
});

// Ruta para obtener medicamentos (ejemplo básico)
app.get('/api/medicamentos', (req, res) => {
  res.json([
    { id: 1, nombre: 'Paracetamol', precio: 3.50 },
    { id: 2, nombre: 'Ibuprofeno', precio: 5.00 }
  ]);
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor listo en http://localhost:${PORT}`);
});