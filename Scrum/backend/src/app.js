require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models/db');
const cors = require('cors');

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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
    const result = await db.query(
      'SELECT * FROM Medicamento WHERE idMedicamento = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Crear un nuevo medicamento con ID autoincremental
defaults = {};
app.post('/api/medicamentos', async (req, res) => {
  const {
    nombre,
    cantidadInventario,
    fechaVencimiento,
    precio,
    proveedor
  } = req.body;

  // Validación de campos obligatorios
  if (
    !nombre ||
    cantidadInventario == null ||
    !fechaVencimiento ||
    precio == null ||
    !proveedor
  ) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios: nombre, cantidadInventario, fechaVencimiento, precio y proveedor.'
    });
  }

  try {
    // Insertar el nuevo medicamento y devolver el ID generado
    const result = await db.query(
      `INSERT INTO Medicamento
         (nombre, cantidadInventario, fechaVencimiento, precio, proveedor)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING idMedicamento`,
      [nombre, cantidadInventario, fechaVencimiento, precio, proveedor]
    );

    const nuevoId = result.rows[0].idmedicamento;
    res.status(201).json({
      message: 'Medicamento registrado correctamente.',
      idMedicamento: nuevoId
    });
  } catch (err) {
    console.error('Error al registrar medicamento:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// PUT: Actualizar un medicamento
app.put('/api/medicamentos/:id', async (req, res) => {
  const { id } = req.params;
  const campos = req.body;
  if (!id || Object.keys(campos).length === 0) {
    return res.status(400).json({ error: 'ID y campos para actualizar son requeridos' });
  }

  const columnas = Object.keys(campos);
  const valores = Object.values(campos);
  const setQuery = columnas.map((col, i) => `${col} = $${i+1}`).join(', ');

  try {
    const result = await db.query(
      `UPDATE Medicamento SET ${setQuery} WHERE idMedicamento = $${columnas.length+1}`,
      [...valores, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    res.json({ message: 'Medicamento actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar medicamento:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Eliminar un medicamento
app.delete('/api/medicamentos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM Medicamento WHERE idMedicamento = $1', [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    res.json({ message: 'Medicamento eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

////////API de usuarios///////////
  
// Rutas básicas
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT idUsuario, nombre, correo FROM Usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  // GET: Obtener un usuario por ID
app.get('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT idUsuario, nombre FROM Usuario WHERE idUsuario = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST: Crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const { idUsuario, nombre, contrasena } = req.body;
    try {
      await db.query(
        'INSERT INTO Usuario (idUsuario, nombre, contrasena) VALUES ($1, $2, $3)',
        [idUsuario, nombre, contrasena]
      );
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// PUT: Crear contraseñas
app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, contrasena } = req.body;
  try {
    const result = await db.query(
      'UPDATE contrasena SET contrasena = $1, nombre = $2 WHERE idUsuario = $3',
      [contrasena, nombre, id]
    );

    if (result === result) {
      return res.status(409).json({ error: 'No se puede elegir la misma contraseña' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login simple (sin JWT)
app.post('/api/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const result = await db.query(
      'SELECT * FROM Usuario WHERE correo = $1 AND contrasena = $2',
      [correo, contrasena]
    );

    if (result.rows.length === 1) {
      // Login exitoso
      res.json({ success: true });
    } else {
      // Credenciales incorrectas
      res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
    }
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