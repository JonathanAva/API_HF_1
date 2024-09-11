

const express = require('express');
const router = express.Router();
const { crearRol, obtenerRoles } = require('../controllers/rolesController');


router.post('/create', crearRol);


router.get('/', obtenerRoles);

module.exports = router;
