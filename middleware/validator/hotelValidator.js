const { body, validationResult } = require('express-validator');

const hotelValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  body('location')
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 characters'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = { hotelValidator, handleValidation };
