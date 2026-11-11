'use strict';

const UserModel = require('../models/User');

/**
 * UserController
 * Each method maps 1-to-1 with a route handler.
 * Business logic stays here; raw SQL stays in UserModel.
 */
const UserController = {

  // ─── POST /api/users/register ────────────────────────────────────────────

  async register(req, res, next) {
    try {
      const { first_name, last_name, email, password, phone, role } = req.body;

      // Check for duplicate email before hitting DB unique constraint
      const exists = await UserModel.emailExists(email);
      if (exists) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists',
        });
      }

      const user = await UserModel.create({ first_name, last_name, email, password, phone, role });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data:    { user },
      });
    } catch (err) {
      next(err);
    }
  },

  // ─── POST /api/users/login ────────────────────────────────────────────────

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Fetch with password hash included
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      if (!user.is_active) {
        return res.status(403).json({ success: false, message: 'Account is deactivated' });
      }

      const valid = await UserModel.verifyPassword(password, user.password);
      if (!valid) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      // Record last login
      await UserModel.touchLastLogin(user.id);

      // Strip password from response
      const { password: _pw, ...safeUser } = user;

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data:    { user: safeUser },
      });
    } catch (err) {
      next(err);
    }
  },

  // ─── GET /api/users ───────────────────────────────────────────────────────

  async getAll(req, res, next) {
    try {
      const page  = Math.max(parseInt(req.query.page)  || 1,  1);
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);

      const result = await UserModel.findAll({ page, limit });

      return res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data:    result,
      });
    } catch (err) {
      next(err);
    }
  },

  // ─── GET /api/users/:id ───────────────────────────────────────────────────

  async getOne(req, res, next) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, data: { user } });
    } catch (err) {
      next(err);
    }
  },

  // ─── PATCH /api/users/:id ─────────────────────────────────────────────────

  async update(req, res, next) {
    try {
      const exists = await UserModel.findById(req.params.id);
      if (!exists) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const updated = await UserModel.update(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data:    { user: updated },
      });
    } catch (err) {
      next(err);
    }
  },

  // ─── PATCH /api/users/:id/password ───────────────────────────────────────

  async changePassword(req, res, next) {
    try {
      const user = await UserModel.findById(req.params.id, true); // include password
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const valid = await UserModel.verifyPassword(req.body.current_password, user.password);
      if (!valid) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      await UserModel.updatePassword(req.params.id, req.body.new_password);
      return res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (err) {
      next(err);
    }
  },

  // ─── DELETE /api/users/:id ────────────────────────────────────────────────

  async remove(req, res, next) {
    try {
      const deleted = await UserModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
      next(err);
    }
  },

  // ─── PATCH /api/users/:id/deactivate ─────────────────────────────────────

  async deactivate(req, res, next) {
    try {
      const user = await UserModel.deactivate(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'User deactivated successfully',
        data:    { user },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
