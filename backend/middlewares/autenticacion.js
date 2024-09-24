const jwt = require('jsonwebtoken');

const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Usuario no autenticado.' });
  }

  const token = authHeader.split(' ')[1];  // Separa el token eliminando "Bearer"
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verificar el token con la clave secreta
    req.user = decoded;  // Guardar el usuario decodificado en req.user
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = autenticarJWT;
