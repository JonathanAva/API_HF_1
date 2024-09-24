const express = require('express');
const router = express.Router();
const planillaController = require('../controllers/planillaController');

// Ruta para crear una nueva planilla
router.post('/create', planillaController.crearPlanilla);

// Ruta para obtener todas las planillas
router.get('/', planillaController.obtenerPlanillas);

// Ruta para editar una planilla existente por su ID
router.put('/:id/edit', planillaController.editarPlanilla);

// Ruta para eliminar una planilla existente por su ID
router.delete('/:id', planillaController.eliminarPlanilla);

module.exports = router;
