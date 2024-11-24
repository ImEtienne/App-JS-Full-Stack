const { body } = require('express-validator');

const productValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 255 }).withMessage('Name cannot exceed 255 characters'), 
    
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'), 

    body('rating')
        .optional()
        .isNumeric().withMessage('Rating must be a number')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'), 
    
    body('warranty_years')
        .optional()
        .isInt({ min: 0 }).withMessage('Warranty years must be a positive integer'), 
    
    body('available')
        .isBoolean().withMessage('Available must be a boolean'), 
    
    body('type')
        .notEmpty().withMessage('Type is required')
        .isLength({ max: 100 }).withMessage('Type cannot exceed 100 characters') 
];

module.exports = productValidation;
