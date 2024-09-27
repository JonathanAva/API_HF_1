const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerClientes,
  iniciarSesion,
  eliminarUsuarioPorId,
  eliminarTodosLosUsuarios,
  obtenerDoctores,
  obtenerUsuariosPorRoles,
} = require('../controllers/usuariosController');


router.post('/create', crearUsuario);

router.get('/', obtenerUsuarios);

router.get('/clientes', obtenerClientes);

router.post('/login', iniciarSesion);

router.delete('/eliminar/:id', eliminarUsuarioPorId);

router.delete('/eliminar-todos', eliminarTodosLosUsuarios);

router.get('/doctores', obtenerDoctores);

router.get('/roles', obtenerUsuariosPorRoles); 

module.exports = router;
