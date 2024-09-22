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
      id_usuario  // Este es el ID del empleado para quien se crea la planilla
    } = req.body;

    // Verificar si el usuario es un empleado
    const empleado = await Usuario.findOne({ where: { id_usuario, id_roles: 2 } }); // Asumiendo que rol de empleado es id_roles = 2

    if (!empleado) {
      return res.status(400).json({ error: 'El usuario no es un empleado o no existe.' });
    }

    // Crear la planilla para el empleado
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
      id_usuario  // Planilla asignada al empleado
    });

    res.status(201).json(nuevaPlanilla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearPlanilla
};
