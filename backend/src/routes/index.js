'use strict';

const { Router } = require('express');
const userRoutes  = require('./user.routes');

const router = Router();

// ─── Mount sub-routers ────────────────────────────────────────────────────────
router.use('/users', userRoutes);

// ─── Health check ─────────────────────────────────────────────────────────────
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-mart API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
