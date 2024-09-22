// routes/planilla.js
const express = require('express');
const router = express.Router();
const { crearPlanilla } = require('../controllers/planillaController');
const autenticarJWT = require('../middlewares/autenticacion');  // Middleware para autenticación JWT
const verificarRol = require('../middlewares/verificarRol');    // Middleware para verificar roles

// Ruta para crear una nueva planilla (solo accesible para usuarios con rol "contador")
router.post('/create', autenticarJWT, verificarRol(4), crearPlanilla);

module.exports = router;
