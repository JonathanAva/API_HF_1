const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const autenticarJWT = require('../middlewares/autenticacion'); // Importa el middleware de autenticación

// Rutas protegidas por JWT
router.get('/', autenticarJWT, citaController.obtenerCitas); // Obtener todas las citas
router.get('/:id', autenticarJWT, citaController.obtenerCitaPorId); // Obtener cita por ID
router.get('/fecha/:fecha', autenticarJWT, citaController.obtenerCitasPorFecha); // Obtener citas por fecha
router.post('/', autenticarJWT, citaController.crearCita); // Crear nueva cita
router.put('/:id', autenticarJWT, citaController.actualizarCita); // Actualizar cita
router.delete('/:id', autenticarJWT, citaController.eliminarCita); // Eliminar cita

module.exports = router;
