require('dotenv').config();  // Asegúrate de cargar las variables de entorno al inicio
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const rolesRoutes = require('./routes/roles');
const usuarioRoutes = require('./routes/usuarios');
const planillaRoutes = require('./routes/planilla');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/roles', rolesRoutes);
app.use('/usuario', usuarioRoutes);  // Corregido de "usuario" a "usuarioRoutes"
app.use('/planilla', planillaRoutes);

// Ruta raíz para verificar el estado del servidor
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Sincronización de la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos y tablas sincronizadas');
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
