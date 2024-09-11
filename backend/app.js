const express = require('express');
const cors = require ('cors');
const sequelize = require('./config/database');
const rolesRoutes = require('./routes/roles');
const app = express();
const roles = require ('./routes/roles');
const usuario = require ('./routes/usuarios')
const planillaRoutes = require('./routes/planilla');

app.use(express.json());
app.use(cors());


app.use('/roles', rolesRoutes)


app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});


sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos y tablas sincronizadas');
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});

const PORT = process.env.PORT || 3000;

app.use("/planilla",planillaRoutes)
app.use("/roles",roles)
app.use("/usuario",usuario)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
