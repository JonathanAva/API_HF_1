// controllers/citaController.js
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');
const Paciente = require('../models/Paciente');

// Obtener todas las citas
const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Usuario, as: 'cliente', attributes: ['id_usuario', 'nombre'] },
        { model: Usuario, as: 'doctor', attributes: ['id_usuario', 'nombre'] },
        { model: Paciente, as: 'paciente', attributes: ['id_paciente', 'nombre'] }
      ]
    });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
  }
};

// Obtener cita por ID
const obtenerCitaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const cita = await Cita.findByPk(id, {
      include: [
        { model: Usuario, as: 'cliente', attributes: ['id_usuario', 'nombre'] },
        { model: Usuario, as: 'doctor', attributes: ['id_usuario', 'nombre'] },
        { model: Paciente, as: 'paciente', attributes: ['id_paciente', 'nombre'] }
      ]
    });

    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cita', error: error.message });
  }
};

// Obtener citas por fecha
const obtenerCitasPorFecha = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      where: { fecha: req.params.fecha },
      include: [
        { model: Usuario, as: 'cliente', attributes: ['nombre'] },
        { model: Usuario, as: 'doctor', attributes: ['nombre'] },
        { model: Paciente, as: 'paciente', attributes: ['nombre'] }
      ]
    });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
};

// Crear una nueva cita
const crearCita = async (req, res) => {
  const { cliente, paciente, doctor, fecha, hora } = req.body;

  try {
    const nuevaCita = await Cita.create({
      id_cliente: cliente,
      id_paciente: paciente,
      id_doctor: doctor,
      fecha,
      hora,
      estado: 'activa',
    });
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error: error.message });
  }
};

// Actualizar cita
const actualizarCita = async (req, res) => {
  const { id } = req.params;
  const { cliente, paciente, doctor, fecha, hora, estado } = req.body;

  try {
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    cita.id_cliente = cliente || cita.id_cliente;
    cita.id_paciente = paciente || cita.id_paciente;
    cita.id_doctor = doctor || cita.id_doctor;
    cita.fecha = fecha || cita.fecha;
    cita.hora = hora || cita.hora;
    cita.estado = estado || cita.estado;

    await cita.save();

    res.status(200).json({ message: 'Cita actualizada', cita });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
  }
};

// Eliminar una cita
const eliminarCita = async (req, res) => {
  const { id } = req.params;

  try {
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    await cita.destroy();
    res.status(200).json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
  }
};

module.exports = {
  obtenerCitas,
  obtenerCitaPorId,
  obtenerCitasPorFecha,
  crearCita,
  actualizarCita,
  eliminarCita,
};
