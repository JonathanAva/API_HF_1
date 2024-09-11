// routes/planilla.js
const express = require('express');
const router = express.Router();
const { crearPlanilla } = require('../controllers/planillaController');
const autenticarJWT = require('../middlewares/autenticacion');
const verificarRol = require('../middlewares/verificarRol');

// Ruta para crear una nueva planilla (solo accesible por usuarios con rol "contador")
router.post('/create', autenticarJWT, verificarRol(4), crearPlanilla);

module.exports = router;
