
const Role = require('../models/Role');


const crearRol = async (req, res) => {
  try {
    const { nombre } = req.body;  
    if (!nombre) {
      return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }

    const nuevoRol = await Role.create({ nombre });
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const obtenerRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearRol, obtenerRoles };
