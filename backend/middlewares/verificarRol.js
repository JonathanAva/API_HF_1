const Usuario = require('../models/Usuario');
const Role = require('../models/Role');

const verificarRol = (rolPermitido) => {
  return async (req, res, next) => {
    try {
      // Asumimos que el ID del usuario está en req.user.id (esto depende de tu implementación de autenticación)
      const usuario = await Usuario.findByPk(req.user.id, { include: Role });

      if (usuario && usuario.Role.nombre === rolPermitido) {
        next();  // Si el rol es permitido, pasa al siguiente middleware/controlador
      } else {
        res.status(403).json({ error: 'Acceso denegado. No tienes el rol adecuado.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = verificarRol;
