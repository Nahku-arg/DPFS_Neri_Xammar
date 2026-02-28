const { body, } = require('express-validator');

const validateRegister = [
    body('name').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastname').notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email').notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];

const validateLogin = [
    body('email').notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

const validateProduct = [
    body('name').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description').isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
];

const validateImage = (req, res, next) => {
    if (req.file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            req.fileValidationError = 'Solo se permiten archivos JPG, JPEG, PNG o GIF';
        }
    }
    next();
};

module.exports = { validateRegister, validateLogin, validateProduct, validateImage };
