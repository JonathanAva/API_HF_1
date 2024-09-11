const express = require('express');
const router = express.Router();
const { crearPlanilla, obtenerPlanilla } = require('../controllers/planillaController');
const verificarRol = require('../middlewares/verificarRol');  // Middleware para verificar el rol


router.post('/create', verificarRol('contador'), crearPlanilla);

router.get('/', verificarRol('contador'), obtenerPlanilla);

module.exports = router;
