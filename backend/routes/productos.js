const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productoController');
const upload = require('../middlewares/multer'); 

// Crear un nuevo producto con subida de imagen
router.post('/create', upload.single('imagen'), productosController.crearProducto);

// Otras rutas
router.get('/', productosController.obtenerProductos);
router.put('/:id/update-stock', productosController.actualizarStock);
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
