const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { isLogged } = require('../middlewares/authMiddleware');
const { validateProduct, validateImage } = require('../middlewares/validations');
const uploadProduct = require('../middlewares/multerProducts');

router.get('/', productsController.listar);
router.get('/buscar', productsController.buscar);
router.get('/articulo/:id', productsController.detalle);

router.get('/crear', isLogged, productsController.mostrarCrear);
router.post('/crear', isLogged, uploadProduct.single('image'), validateProduct, validateImage, productsController.crear);

router.get('/editar/:id', isLogged, productsController.mostrarEditar);
router.post('/editar/:id', isLogged, uploadProduct.single('image'), validateProduct, validateImage, productsController.editar);
router.get('/eliminar/:id', isLogged, productsController.eliminar);

module.exports = router;