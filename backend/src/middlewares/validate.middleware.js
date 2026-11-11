'use strict';

/**
 * validate(schema)
 * Returns an Express middleware that validates req.body against the given Joi schema.
 * On failure it sends a 422 with a structured error list.
 * On success it replaces req.body with the sanitised/coerced value and calls next().
 */
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly:   false,  // collect ALL errors, not just the first
    stripUnknown: true,   // drop unexpected fields silently
  });

  if (error) {
    const errors = error.details.map((d) => ({
      field:   d.context?.key || 'unknown',
      message: d.message,
    }));

    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  req.body = value;   // use Joi's sanitised value downstream
  next();
};

module.exports = validate;
