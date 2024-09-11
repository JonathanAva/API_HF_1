const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');  

const Planilla = sequelize.define('Planilla', {
  id_planilla: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  periodo_inicial: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  periodo_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  salario_base: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  bonificaciones: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  deducciones: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  monto_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  estado_pago: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id_usuario',
    },
    allowNull: false,
  }
}, {
  tableName: 'Planilla',
});

Usuario.hasMany(Planilla, { foreignKey: 'id_usuario' });
Planilla.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Planilla;
