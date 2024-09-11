
const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios, iniciarSesion } = require('../controllers/usuariosController');  // Importar el controlador


router.post('/create', crearUsuario);


router.get('/', obtenerUsuarios);


router.post('/login', iniciarSesion); 
module.exports = router;
