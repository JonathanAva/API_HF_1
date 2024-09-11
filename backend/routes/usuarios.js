
const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios } = require('../controllers/usuariosController');


router.post('/create', crearUsuario);


router.get('/', obtenerUsuarios);

module.exports = router;
