const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');


// Crear un nuevo usuario y devolver un token JWT
const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, id_roles } = req.body;

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: contraseñaEncriptada,
      id_roles
    });

    // Generar el token JWT
    const token = jwt.sign(
      { id: nuevoUsuario.id_usuario, rol: nuevoUsuario.id_roles }, // Payload del token
      process.env.JWT_SECRET, // Secreto del token
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    // Devolver el token y los datos del usuario
    res.status(201).json({ usuario: nuevoUsuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const iniciarSesion = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esContraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esContraseñaCorrecta) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token JWT incluyendo el rol del usuario (id_roles)
    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.id_roles },  // Incluir id_roles en el token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener todos los usuarios
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
  iniciarSesion,  // Exportar el controlador de inicio de sesión
  obtenerUsuarios
};
