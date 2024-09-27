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

    // Verificar si el usuario es un empleado válido con los roles 1, 2 o 4
    const empleado = await Usuario.findOne({
      where: { id_usuario, id_roles: [1, 2, 4] }  // Filtra solo los roles 1 (Admin), 2 (Empleado) o 4 (Otro rol)
    });

    if (!empleado) {
      return res.status(400).json({ error: 'El usuario no es un empleado válido o no existe.' });
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

// Editar una planilla existente
const editarPlanilla = async (req, res) => {
  try {
    const { id } = req.params; // ID de la planilla que se va a editar
    const {
      fecha_pago,
      periodo_inicial,
      periodo_fin,
      salario_base,
      bonificaciones,
      deducciones,
      monto_total,
      metodo_pago,
      estado_pago
    } = req.body;

    // Buscar la planilla por su ID
    const planilla = await Planilla.findByPk(id);

    if (!planilla) {
      return res.status(404).json({ error: 'Planilla no encontrada.' });
    }

    // Actualizar la planilla con los nuevos datos
    await planilla.update({
      fecha_pago,
      periodo_inicial,
      periodo_fin,
      salario_base,
      bonificaciones,
      deducciones,
      monto_total,
      metodo_pago,
      estado_pago
    });

    res.status(200).json(planilla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una planilla
const eliminarPlanilla = async (req, res) => {
  try {
    const { id } = req.params; // ID de la planilla que se va a eliminar

    // Buscar la planilla por su ID
    const planilla = await Planilla.findByPk(id);

    if (!planilla) {
      return res.status(404).json({ error: 'Planilla no encontrada.' });
    }

    // Eliminar la planilla
    await planilla.destroy();

    res.status(200).json({ mensaje: 'Planilla eliminada con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las planillas
const obtenerPlanillas = async (req, res) => {
  try {
    const planillas = await Planilla.findAll({
      include: {
        model: Usuario, // Relacionar con la tabla Usuario
        attributes: ['nombre'] // Solo queremos el nombre del empleado
      }
    });
    res.status(200).json(planillas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las planillas', detalles: error.message });
  }
};

// Obtener una planilla por ID
const obtenerPlanillaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const planilla = await Planilla.findByPk(id);

    if (!planilla) {
      return res.status(404).json({ error: 'Planilla no encontrada.' });
    }

    res.status(200).json(planilla);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener planillas de un empleado por su ID
const obtenerPlanillasPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const planillas = await Planilla.findAll({ where: { id_usuario } });

    if (!planillas.length) {
      return res.status(404).json({ mensaje: 'No se encontraron planillas para este empleado.' });
    }

    res.status(200).json(planillas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearPlanilla,
  editarPlanilla,
  eliminarPlanilla,
  obtenerPlanillas,
  obtenerPlanillaPorId,
  obtenerPlanillasPorUsuario,
};
