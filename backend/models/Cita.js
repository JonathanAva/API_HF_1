// models/cita.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario'); // Asegúrate de importar el modelo Usuario
const Paciente = require('./Paciente'); // Asegúrate de importar el modelo Paciente

const Cita = sequelize.define('Cita', {
  id_cita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activa', // Estado por defecto
  },
}, {
  tableName: 'Citas',
  timestamps: true,
});

// Definir las asociaciones
Cita.belongsTo(Usuario, { foreignKey: 'id_cliente', as: 'cliente' });
Cita.belongsTo(Usuario, { foreignKey: 'id_doctor', as: 'doctor' });
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });

module.exports = Cita;
