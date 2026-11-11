'use strict';

const { pool } = require('../config/db');
const bcrypt    = require('bcryptjs');

const SALT_ROUNDS = 12;

/**
 * UserModel
 * All raw SQL interactions with the `users` table live here.
 * Controllers never touch SQL directly — they call these methods.
 */
const UserModel = {

  // ─── CREATE ────────────────────────────────────────────────────────────────

  /**
   * Insert a new user row.
   * @param {object} data  - { first_name, last_name, email, password, phone?, role? }
   * @returns {object}     - The newly created user (without password)
   */
  async create(data) {
    const { first_name, last_name, email, password, phone = null, role = 'customer' } = data;

    // Hash the plain-text password before storing
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const sql = `
      INSERT INTO users (first_name, last_name, email, password, phone, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      first_name, last_name, email.toLowerCase(), hashedPassword, phone, role
    ]);

    return this.findById(result.insertId);
  },

  // ─── READ ──────────────────────────────────────────────────────────────────

  /**
   * Fetch a user by primary key (excludes password by default).
   */
  async findById(id, includePassword = false) {
    const columns = includePassword
      ? '*'
      : 'id, first_name, last_name, email, phone, avatar_url, role, is_active, email_verified_at, last_login_at, created_at, updated_at';

    const [rows] = await pool.execute(
      `SELECT ${columns} FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Fetch a user by email (always includes password for auth checks).
   */
  async findByEmail(email) {
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email.toLowerCase()]
    );
    return rows[0] || null;
  },

  /**
   * List all users with optional pagination.
   * @param {number} page   - 1-based page number
   * @param {number} limit  - rows per page
   */
  async findAll({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;

    const [rows] = await pool.execute(
      `SELECT id, first_name, last_name, email, phone, role, is_active, created_at
       FROM users
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [[{ total }]] = await pool.execute(
      `SELECT COUNT(*) AS total FROM users`
    );

    return { data: rows, total, page, limit };
  },

  // ─── UPDATE ────────────────────────────────────────────────────────────────

  /**
   * Update allowed profile fields for a user.
   * @param {number} id
   * @param {object} fields - Any subset of { first_name, last_name, phone, avatar_url, is_active }
   */
  async update(id, fields) {
    const allowed = ['first_name', 'last_name', 'phone', 'avatar_url', 'is_active'];
    const updates = [];
    const values  = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(fields[key]);
      }
    }

    if (updates.length === 0) throw new Error('No valid fields to update');

    values.push(id);
    await pool.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return this.findById(id);
  },

  /**
   * Change a user's password (accepts plain text, hashes internally).
   */
  async updatePassword(id, newPlainPassword) {
    const hash = await bcrypt.hash(newPlainPassword, SALT_ROUNDS);
    await pool.execute(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hash, id]
    );
    return true;
  },

  /**
   * Record the last login timestamp.
   */
  async touchLastLogin(id) {
    await pool.execute(
      `UPDATE users SET last_login_at = NOW() WHERE id = ?`,
      [id]
    );
  },

  /**
   * Mark email as verified.
   */
  async verifyEmail(id) {
    await pool.execute(
      `UPDATE users SET email_verified_at = NOW() WHERE id = ?`,
      [id]
    );
  },

  // ─── DELETE ────────────────────────────────────────────────────────────────

  /**
   * Hard delete — use with caution.
   */
  async delete(id) {
    const [result] = await pool.execute(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  },

  /**
   * Soft delete — sets is_active = 0 (preferred).
   */
  async deactivate(id) {
    return this.update(id, { is_active: 0 });
  },

  // ─── HELPERS ───────────────────────────────────────────────────────────────

  /**
   * Verify a plain password against the stored hash.
   * @returns {boolean}
   */
  async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  /**
   * Check if an email is already registered.
   */
  async emailExists(email) {
    const [rows] = await pool.execute(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email.toLowerCase()]
    );
    return rows.length > 0;
  },
};

module.exports = UserModel;
