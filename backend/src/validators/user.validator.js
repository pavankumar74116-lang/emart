'use strict';

const Joi = require('joi');

/**
 * Centralised Joi validation schemas for user-related endpoints.
 * All schemas are exported individually so controllers import only what they need.
 */

// ─── Reusable field definitions ───────────────────────────────────────────────

const nameField = Joi.string().trim().min(2).max(60);
const emailField = Joi.string().trim().email({ tlds: { allow: false } }).lowercase();
const passwordField = Joi.string()
  .min(8)
  .max(128)
  .pattern(/[A-Z]/, 'uppercase letter')
  .pattern(/[a-z]/, 'lowercase letter')
  .pattern(/[0-9]/, 'digit')
  .messages({
    'string.pattern.name': '{{#label}} must contain at least one {#name}',
    'string.min':          '{{#label}} must be at least 8 characters',
  });

// ─── Exported Schemas ─────────────────────────────────────────────────────────

/**
 * POST /api/users/register
 */
const registerUserSchema = Joi.object({
  first_name: nameField.required(),
  last_name:  nameField.required(),
  email:      emailField.required(),
  password:   passwordField.required(),
  phone:      Joi.string().trim().pattern(/^\+?[0-9\s\-().]{7,20}$/).optional().allow('', null)
                .messages({ 'string.pattern.base': 'phone must be a valid phone number' }),
  role: Joi.string()
    .valid('customer', 'seller')   // admins are created via seeder, not public API
    .default('customer'),
});

/**
 * POST /api/users/login
 */
const loginUserSchema = Joi.object({
  email:    emailField.required(),
  password: Joi.string().required(),
});

/**
 * PATCH /api/users/:id  (profile update)
 */
const updateUserSchema = Joi.object({
  first_name: nameField.optional(),
  last_name:  nameField.optional(),
  phone:      Joi.string().trim().pattern(/^\+?[0-9\s\-().]{7,20}$/).optional().allow('', null),
  avatar_url: Joi.string().uri().max(512).optional().allow('', null),
}).min(1).messages({ 'object.min': 'At least one field is required to update' });

/**
 * PATCH /api/users/:id/password
 */
const changePasswordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password:     passwordField.required(),
  confirm_password: Joi.any()
    .valid(Joi.ref('new_password'))
    .required()
    .messages({ 'any.only': 'confirm_password must match new_password' }),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  changePasswordSchema,
};
