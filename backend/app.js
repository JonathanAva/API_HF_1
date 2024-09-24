require('dotenv').config(); 
const express = require('express');
const cors = require('cors');  // Pega esto aquí
const path = require('path'); 
const sequelize = require('./config/database');
const rolesRoutes = require('./routes/roles');
const usuarioRoutes = require('./routes/usuarios');
const planillaRoutes = require('./routes/planilla');
const productoRoutes = require('./routes/productos');
const pacienteRoutes = require('./routes/pacientes');
const citaRoutes = require('./routes/citas');
const paypalRoutes = require('./routes/paypalRoutes'); 

const app = express();

app.use(cors());  // Pega esto aquí

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Otras configuraciones y rutas
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/roles', rolesRoutes);
app.use('/usuario', usuarioRoutes); 
app.use('/planilla', planillaRoutes);
app.use('/productos', productoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/citas', citaRoutes);
app.use('/paypal', paypalRoutes); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos y tablas sincronizadas');
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
