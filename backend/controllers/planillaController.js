// controllers/planillaController.js
const Planilla = require('../models/Planilla');
const Usuario = require('../models/Usuario');

// Crear una nueva planilla
const crearPlanilla = async (req, res) => {
  try {
    const {
      fecha_pago,
      periodo_inicial,
      periodo_fin,
      salario_base,
      bonificaciones,
      deducciones,
      monto_total,
      metodo_pago,
      estado_pago,
      id_usuario
    } = req.body;

    // Crear el registro de planilla
    const nuevaPlanilla = await Planilla.create({
      fecha_pago,
      periodo_inicial,
      periodo_fin,
      salario_base,
      bonificaciones,
      deducciones,
      monto_total,
      metodo_pago,
      estado_pago,
      id_usuario  // Asegúrate de que esto es el ID del usuario autenticado
    });

    res.status(201).json(nuevaPlanilla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearPlanilla
};
