import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import productosRouter from './routes/productos.js'
dotenv.config();

const app = express();

// ======================
// Configuración de Seguridad
// ======================
app.use(helmet());

// CORS configurado para múltiples entornos
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000' // Para desarrollo local
  ].filter(Boolean), // Filtra valores undefined
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Límite de tamaño para JSON
app.use(express.json({ limit: '10kb' }));

// Rate limiting más flexible
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Más límite en desarrollo
  message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde'
});
app.use('/api', limiter);

// ======================
// Rutas
// ======================
app.use('/api/productos', productosRouter);

// Ruta de salud para verificar que el backend funciona
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Ruta de inicio para documentación o redirección
app.get('/', (req, res) => {
  res.redirect('/health');
});

// ======================
// Manejo de Errores
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const response = {
    error: 'Error interno del servidor',
    message: err.message
  };
  
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  
  res.status(500).json(response);
});

// ======================
// Iniciar Servidor
// ======================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en modo ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`🌍 Frontend permitido: ${corsOptions.origin.join(', ') || 'Ninguno'}`);
});