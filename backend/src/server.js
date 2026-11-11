'use strict';

require('dotenv').config();

const app                = require('./app');
const { testConnection } = require('./config/db');
const { runMigrations }  = require('./config/schema');

const PORT = process.env.PORT || 5000;

/**
 * Bootstrap sequence:
 *  1. Test MySQL connectivity
 *  2. Run migrations (create DB + tables if they don't exist)
 *  3. Start the HTTP server
 */
(async () => {
  try {
    // 1. Create DB + tables first (uses its own database-less connection)
    await runMigrations();
    // 2. Now the pool can connect to the newly-created database
    await testConnection();

    app.listen(PORT, () => {
      console.log(`\n🚀  E-mart API server running → http://localhost:${PORT}`);
      console.log(`📡  Health check          → http://localhost:${PORT}/api/health`);
      console.log(`👤  Register user         → POST http://localhost:${PORT}/api/users/register\n`);
    });
  } catch (err) {
    console.error('❌  Server failed to start:', err.message);
    process.exit(1);
  }
})();
