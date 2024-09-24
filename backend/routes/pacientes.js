// routes/pacientes.js
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Crear un nuevo paciente
router.post('/', pacienteController.crearPaciente);

// Obtener todos los pacientes
router.get('/', pacienteController.obtenerPacientes);

// Obtener un paciente por ID
router.get('/:id', pacienteController.obtenerPacientePorId);

// Actualizar un paciente
router.put('/:id', pacienteController.actualizarPaciente);

// Eliminar un paciente
router.delete('/:id', pacienteController.eliminarPaciente);

module.exports = router;
