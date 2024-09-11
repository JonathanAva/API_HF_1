const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_roles: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id_roles',
    },
  },
}, {
  tableName: 'Usuarios',
});

Role.hasMany(Usuario, { foreignKey: 'id_roles' });
Usuario.belongsTo(Role, { foreignKey: 'id_roles' });

module.exports = Usuario;
