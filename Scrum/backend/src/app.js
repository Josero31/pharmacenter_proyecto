require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models/db');

// Middlewares
app.use(express.json());

// Rutas básicas
app.get('/api/medicamentos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Medicamento');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health Check
app.get('/ping', (req, res) => res.send('pong'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API PharmaCenter en http://localhost:${PORT}`);
});