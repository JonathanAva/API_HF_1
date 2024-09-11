
const Usuario = require('../models/Usuario');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');


const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, id_roles } = req.body;

  
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: contraseñaEncriptada,
      id_roles
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: Role });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios
};
