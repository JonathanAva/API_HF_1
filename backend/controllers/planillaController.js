const Planilla = require('../models/Planilla');


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
      id_usuario
    });

    res.status(201).json(nuevaPlanilla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const obtenerPlanilla = async (req, res) => {
  try {
    const planilla = await Planilla.findAll();
    res.json(planilla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearPlanilla,
  obtenerPlanilla
};
