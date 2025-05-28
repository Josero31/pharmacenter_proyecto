require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models/db');
const cors = require('cors');
const { transporter, sendLowStockAlert } = require('./utils/email');
const { scheduleInventoryChecks } = require('./utils/monitor');

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

scheduleInventoryChecks();

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

// POST: Crear un nuevo medicamento con ID autoincremental (versión mejorada)
app.post('/api/medicamentos', async (req, res) => {
  const {
    nombre,
    cantidadInventario,
    fechaVencimiento,
    precio,
    proveedor
  } = req.body;

  // Validación de campos obligatorios mejorada
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  if (cantidadInventario == null || isNaN(cantidadInventario)) {
    return res.status(400).json({ error: 'La cantidad en inventario debe ser un número válido' });
  }
  if (!fechaVencimiento) {
    return res.status(400).json({ error: 'La fecha de vencimiento es obligatoria' });
  }
  if (precio == null || isNaN(precio) || precio < 0) {
    return res.status(400).json({ error: 'El precio debe ser un número válido y no negativo' });
  }
  if (!proveedor || proveedor.trim() === '') {
    return res.status(400).json({ error: 'El proveedor es obligatorio' });
  }

  try {
    // Insertar el nuevo medicamento y devolver todos los datos del registro creado
    const result = await db.query(
      `INSERT INTO Medicamento
         (nombre, cantidadInventario, fechaVencimiento, precio, proveedor)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,  // Cambiado para devolver todo el registro
      [
        nombre.trim(),
        Number(cantidadInventario),
        fechaVencimiento,
        Number(precio),
        proveedor.trim()
      ]
    );

    res.status(201).json({
      message: 'Medicamento registrado correctamente',
      medicamento: result.rows[0]  // Devuelve todo el objeto medicamento
    });
  } catch (err) {
    console.error('Error al registrar medicamento:', err);
    
    // Manejo específico de errores de base de datos
    if (err.code === '23505') {  // Violación de unique constraint
      return res.status(409).json({ error: 'Ya existe un medicamento con estos datos' });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
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
    // Primero eliminar las relaciones en Venta_Medicamento
    await db.query(
      'DELETE FROM Venta_Medicamento WHERE idMedicamento = $1',
      [id]
    );

    // Luego eliminar el medicamento
    const result = await db.query(
      'DELETE FROM Medicamento WHERE idMedicamento = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    
    res.json({ message: 'Medicamento y registros relacionados eliminados exitosamente' });
  } catch (err) {
    console.error('Error al eliminar medicamento:', err);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
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
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    await db.query(
      'INSERT INTO Usuario (nombre, correo, contrasena) VALUES ($1, $2, $3)',
      [nombre.trim(), correo.trim(), contrasena]
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