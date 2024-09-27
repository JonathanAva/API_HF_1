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

// Ruta para obtener planillas de un empleado específico por su ID
router.get('/usuario/:id_usuario', planillaController.obtenerPlanillasPorUsuario);

// Ruta para obtener una planilla específica por su ID
router.get('/:id', planillaController.obtenerPlanillaPorId);

module.exports = router;
