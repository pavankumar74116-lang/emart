'use strict';

const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * SQL DDL — Creates the `emart_db` database and the `users` table.
 *
 * Schema decisions:
 *  - id          : BIGINT UNSIGNED AUTO_INCREMENT — future-proof for large datasets
 *  - email       : UNIQUE — natural business key, login identifier
 *  - password    : VARCHAR(255) — stores bcrypt hash (~60 chars, padded for safety)
 *  - role        : ENUM — enforces only known role values at the DB level
 *  - is_active   : TINYINT(1) — soft-delete / account deactivation flag
 *  - email_verified_at : nullable DATETIME — NULL = not verified yet
 *  - created_at / updated_at : auto-managed timestamps
 */
const CREATE_USERS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id                  BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT,
  first_name          VARCHAR(60)         NOT NULL,
  last_name           VARCHAR(60)         NOT NULL,
  email               VARCHAR(191)        NOT NULL,
  password            VARCHAR(255)        NOT NULL         COMMENT 'bcrypt hash',
  phone               VARCHAR(20)         DEFAULT NULL,
  avatar_url          VARCHAR(512)        DEFAULT NULL,
  role                ENUM(
                        'customer',
                        'seller',
                        'admin',
                        'super_admin'
                      )                   NOT NULL DEFAULT 'customer',
  is_active           TINYINT(1)          NOT NULL DEFAULT 1,
  email_verified_at   DATETIME            DEFAULT NULL,
  last_login_at       DATETIME            DEFAULT NULL,
  created_at          DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
                                          ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE  KEY uq_users_email (email),
  INDEX        idx_users_role      (role),
  INDEX        idx_users_is_active (is_active)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='E-mart platform users';
`;

/**
 * Bootstrap sequence:
 *  1. Open a raw connection WITHOUT a database name — so we can CREATE DATABASE freely.
 *  2. Create the database if it doesn't exist.
 *  3. Switch into the database and create tables.
 *  4. Close the bootstrap connection — the main pool (already pointed at emart_db) takes over.
 *
 * Safe to call on every server start (all statements use IF NOT EXISTS guards).
 */
const runMigrations = async () => {
  // Bootstrap connection — NO database specified so MySQL doesn't reject us
  const bootstrap = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    timezone: '+00:00',
  });

  try {
    const dbName = process.env.DB_NAME || 'emart_db';

    // Step 1 — Create the database
    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log(`✅  Database \`${dbName}\` ready`);

    // Step 2 — Switch into it
    await bootstrap.query(`USE \`${dbName}\``);

    // Step 3 — Create tables
    await bootstrap.query(CREATE_USERS_TABLE_SQL);
    console.log('✅  Table `users` ready');

  } catch (err) {
    console.error('❌  Migration failed:', err.message);
    throw err;
  } finally {
    await bootstrap.end();   // Always close the bootstrap connection
  }
};

module.exports = { runMigrations };
