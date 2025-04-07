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

// GET: Obtener un medicamento por ID
app.get('/api/medicamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT * FROM Medicamento WHERE idMedicamento = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Medicamento no encontrado' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST: Crear un nuevo medicamento
app.post('/api/medicamentos', async (req, res) => {
    const { idMedicamento, nombre, cantidadInventario, fechaVencimiento, precio, proveedor } = req.body;
    try {
      await db.query(
        'INSERT INTO Medicamento (idMedicamento, nombre, cantidadInventario, fechaVencimiento, precio, proveedor) VALUES ($1, $2, $3, $4, $5, $6)',
        [idMedicamento, nombre, cantidadInventario, fechaVencimiento, precio, proveedor]
      );
      res.status(201).json({ message: 'Medicamento creado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT: Actualizar un medicamento
app.put('/api/medicamentos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, cantidadInventario, fechaVencimiento, precio, proveedor } = req.body;
    try {
      const result = await db.query(
        'UPDATE Medicamento SET nombre = $1, cantidadInventario = $2, fechaVencimiento = $3, precio = $4, proveedor = $5 WHERE idMedicamento = $6',
        [nombre, cantidadInventario, fechaVencimiento, precio, proveedor, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Medicamento no encontrado' });
      }
      res.json({ message: 'Medicamento actualizado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
// DELETE: Eliminar un medicamento
app.delete('/api/medicamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('DELETE FROM Medicamento WHERE idMedicamento = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Medicamento no encontrado' });
      }
      res.json({ message: 'Medicamento eliminado exitosamente' });
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