// middlewares/verificarRol.js
const verificarRol = (rolIdPermitido) => {
    return (req, res, next) => {
      try {
        // Verifica si el id_roles del usuario (req.user.rol) coincide con el rol permitido
        if (req.user.rol !== rolIdPermitido) {
          return res.status(403).json({ error: 'Acceso denegado. No tienes el rol adecuado.' });
        }
        next();
      } catch (error) {
        return res.status(500).json({ error: 'Error al verificar el rol.' });
      }
    };
  };
  
  module.exports = verificarRol;
  