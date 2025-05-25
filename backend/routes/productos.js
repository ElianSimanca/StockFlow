const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET todos los productos
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    next(err); // Pasa el error al middleware centralizado
  }
});

// POST nuevo producto (con validación básica)
router.post('/', async (req, res, next) => {
  const { nombre, precio_venta } = req.body;
  
  if (!nombre || !precio_venta) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, precio_venta) VALUES (?, ?)',
      [nombre, precio_venta]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;