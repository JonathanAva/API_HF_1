const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios, iniciarSesion, eliminarUsuarioPorId, eliminarTodosLosUsuarios } = require('../controllers/usuariosController');

// Ruta para crear un nuevo usuario
router.post('/create', crearUsuario);

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Ruta para eliminar un solo usuario por ID
router.delete('/eliminar/:id', eliminarUsuarioPorId);

// Ruta para eliminar todos los usuarios
router.delete('/eliminar-todos', eliminarTodosLosUsuarios); // Verifica que esta ruta esté aquí

module.exports = router;
