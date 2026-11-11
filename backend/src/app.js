'use strict';

const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const apiRoutes    = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// ─── Security & Utility Middleware ────────────────────────────────────────────
app.use(helmet());                        // Set secure HTTP headers
app.use(cors());                          // Enable CORS for all origins (tighten in prod)
app.use(morgan('dev'));                    // Request logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ─── 404 Catch-All ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ─── Global Error Handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

module.exports = app;
