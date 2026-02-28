const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers');
const { isGuest, isLogged } = require('../middlewares/authMiddleware');
const { validateRegister, validateLogin, validateImage } = require('../middlewares/validations');

router.get('/registro', isGuest, usersController.register);
router.post('/registro', isGuest, upload.single('avatar'), validateImage, validateRegister, usersController.processRegister);
router.get('/inicio-sesion', isGuest, usersController.login);
router.post('/inicio-sesion', isGuest,validateLogin , usersController.processLogin);

router.get('/perfil', isLogged, usersController.perfil);
router.get('/logout', isLogged, usersController.logout);

router.get('/carrito', (req, res) => {
    res.render('users/carrito');
});

module.exports = router;