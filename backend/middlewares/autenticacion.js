// middlewares/autenticacion.js
const jwt = require('jsonwebtoken');

const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Usuario no autenticado.' });
  }

  const token = authHeader.split(' ')[1];  // Separa el token eliminando "Bearer"
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Usa el secreto definido en .env
    req.user = decoded;  // Establece el usuario decodificado en req.user
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = autenticarJWT;
