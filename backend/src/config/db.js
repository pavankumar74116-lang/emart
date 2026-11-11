'use strict';

const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * MySQL Connection Pool
 * Uses a pool for efficient connection reuse across requests.
 * mysql2/promise gives us async/await support out of the box.
 */
const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               parseInt(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'emart_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  timezone:           '+00:00',   // Store dates as UTC
  decimalNumbers:     true,
});

/**
 * Test the pool on startup and expose a helper to verify connectivity.
 */
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅  MySQL connected successfully (host: %s, db: %s)',
      process.env.DB_HOST,
      process.env.DB_NAME
    );
    connection.release();
  } catch (err) {
    console.error('❌  MySQL connection failed:', err.message);
    process.exit(1);   // Fatal — cannot run without a DB
  }
};

module.exports = { pool, testConnection };
