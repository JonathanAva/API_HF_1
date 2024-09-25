const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios, obtenerClientes, iniciarSesion, eliminarUsuarioPorId, eliminarTodosLosUsuarios, obtenerDoctores } = require('../controllers/usuariosController');
const { obtenerUsuariosPorRoles } = require('../controllers/usuariosController');


// Ruta para crear un nuevo usuario
router.post('/create', crearUsuario);

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para obtener solo los clientes (usuarios con rol 3)
router.get('/clientes', obtenerClientes);  // <--- Aquí agregamos la ruta para obtener clientes

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Ruta para eliminar un solo usuario por ID
router.delete('/eliminar/:id', eliminarUsuarioPorId);

// Ruta para eliminar todos los usuarios
router.delete('/eliminar-todos', eliminarTodosLosUsuarios);

router.get('/doctores', obtenerDoctores);

router.get('/usuarios/roles', obtenerUsuariosPorRoles);

module.exports = router;
