const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Instala con: npm install helmet
const rateLimit = require('express-rate-limit'); // Instala con: npm install express-rate-limit

const app = express();

// Middlewares de seguridad
app.use(cors({
  origin: ['http://tudominio.com'] // Reemplaza con tu dominio en producción
}));
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Rate limiting (100 requests por IP cada 15 minutos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

// Rutas
app.use('/api/productos', require('./routes/productos'));
// ... otras rutas

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor seguro corriendo en puerto ${PORT}`);
});