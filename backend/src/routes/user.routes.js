'use strict';

const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const validate       = require('../middlewares/validate.middleware');
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  changePasswordSchema,
} = require('../validators/user.validator');

const router = Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register',
  validate(registerUserSchema),
  UserController.register
);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate a user
 * @access  Public
 */
router.post('/login',
  validate(loginUserSchema),
  UserController.login
);

/**
 * @route   GET /api/users
 * @desc    List all users (paginated)
 * @access  Private/Admin  (auth middleware to be added)
 * @query   page, limit
 */
router.get('/', UserController.getAll);

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by ID
 * @access  Private
 */
router.get('/:id', UserController.getOne);

/**
 * @route   PATCH /api/users/:id
 * @desc    Update user profile fields
 * @access  Private
 */
router.patch('/:id',
  validate(updateUserSchema),
  UserController.update
);

/**
 * @route   PATCH /api/users/:id/password
 * @desc    Change user password
 * @access  Private
 */
router.patch('/:id/password',
  validate(changePasswordSchema),
  UserController.changePassword
);

/**
 * @route   PATCH /api/users/:id/deactivate
 * @desc    Soft-delete (deactivate) a user
 * @access  Private/Admin
 */
router.patch('/:id/deactivate', UserController.deactivate);

/**
 * @route   DELETE /api/users/:id
 * @desc    Hard delete a user
 * @access  Private/Admin
 */
router.delete('/:id', UserController.remove);

module.exports = router;
