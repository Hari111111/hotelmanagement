const { body, validationResult } = require('express-validator');

const roomValidator = [
  body('number')
    .notEmpty()
    .withMessage('Room number is required')
    .isLength({ min: 1 })
    .withMessage('Room number must be at least 1 character'),

  body('hotelId')
    .notEmpty()
    .withMessage('Hotel ID is required')
    .isInt({ min: 1 })
    .withMessage('Hotel ID must be a positive integer'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
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

module.exports = { roomValidator, handleValidation };
