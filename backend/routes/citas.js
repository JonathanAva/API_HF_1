const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const autenticarJWT = require('../middlewares/autenticacion'); // Importa el middleware de autenticación

// Rutas existentes...
router.get('/', citaController.obtenerCitas); // Obtener todas las citas
router.get('/:id', citaController.obtenerCitaPorId); // Obtener cita por ID
router.get('/fecha/:fecha', citaController.obtenerCitasPorFecha); // Obtener citas por fecha
router.post('/', citaController.crearCita); // Crear nueva cita
router.put('/:id', citaController.actualizarCita); // Actualizar cita
router.delete('/:id', citaController.eliminarCita); // Eliminar cita

// Nueva ruta para obtener citas del usuario
router.get('/usuario', autenticarJWT, citaController.obtenerCitasDelUsuario); // Obtener citas del usuario autenticado

module.exports = router;
