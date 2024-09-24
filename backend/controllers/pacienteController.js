// controllers/pacienteController.js
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');

// Crear un nuevo paciente
const crearPaciente = async (req, res) => {
  const { nombre, especie, raza, edad, sexo, id_usuario } = req.body;

  try {
    // Verificar que el usuario exista y que tenga rol de cliente (id_rol = 3)
    const usuario = await Usuario.findOne({ where: { id_usuario, id_roles: 3 } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado o no es un cliente' });
    }

    // Crear el paciente
    const nuevoPaciente = await Paciente.create({
      nombre,
      especie,
      raza,
      edad,
      sexo,
      id_usuario,
    });

    res.status(201).json({ mensaje: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el paciente', detalles: error.message });
  }
};

// Obtener todos los pacientes
const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({ include: Usuario });
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pacientes', detalles: error.message });
  }
};

// Obtener un solo paciente por ID
const obtenerPacientePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findByPk(id, { include: Usuario });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el paciente', detalles: error.message });
  }
};

// Actualizar un paciente
const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, especie, raza, edad, sexo } = req.body;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    // Actualizar los datos del paciente
    paciente.nombre = nombre;
    paciente.especie = especie;
    paciente.raza = raza;
    paciente.edad = edad;
    paciente.sexo = sexo;

    await paciente.save();

    res.status(200).json({ mensaje: 'Paciente actualizado con éxito', paciente });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el paciente', detalles: error.message });
  }
};

// Eliminar un paciente
const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    await paciente.destroy();
    res.status(200).json({ mensaje: 'Paciente eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el paciente', detalles: error.message });
  }
};

const obtenerPacientesPorCliente = async (req, res) => {
    const { id_cliente } = req.params;
  
    try {
      const pacientes = await Paciente.findAll({ where: { id_usuario: id_cliente } });
      res.status(200).json(pacientes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pacientes', detalles: error.message });
    }
  };
 

module.exports = {
  crearPaciente,
  obtenerPacientes,
  obtenerPacientePorId,
  actualizarPaciente,
  eliminarPaciente,
  obtenerPacientesPorCliente,
  
};
