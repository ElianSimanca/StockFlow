import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('ℹ Leyendo configuración de:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  environment: process.env.NODE_ENV || 'development'
});

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
};

// Configuración SSL solo para producción
if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = { rejectUnauthorized: false };
  console.log('🔒 Modo SSL activado para producción');
}

const pool = mysql.createPool(poolConfig);

// Verificación de conexión (opcional pero recomendado)
try {
  const connection = await pool.getConnection();
  console.log('✅ Conexión a MySQL establecida correctamente');
  const [rows] = await connection.query('SELECT 1 + 1 AS result');
  console.log(`✔ Prueba de consulta SQL exitosa. Resultado: ${rows[0].result}`);
  connection.release();
} catch (err) {
  console.error('❌ Error de conexión a MySQL:', err.message);
  if (process.env.NODE_ENV === 'production') process.exit(1);
}

export default pool;