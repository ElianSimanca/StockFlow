const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // 'ballast.proxy.rlwy.net'
  user: process.env.DB_USER,       // 'root'
  password: process.env.DB_PASSWORD, // 'nWhncVABlrPjJavsTbZzBeOXLZrTjcnv'
  database: process.env.DB_NAME,   // 'stockflow'
  port: process.env.DB_PORT, // Puerto por defecto si no está en .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : null // SSL solo en producción
});

// Opcional: Verificar conexión al iniciar (útil para debug)
pool.getConnection()
  .then(conn => {
    console.log('✅ Conexión a MySQL establecida en Railway');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar a MySQL:', err.message);
  });

module.exports = pool;