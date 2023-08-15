/*
  Tabla de Usuarios 
  la referencia guardada en status se ve en la tabla 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.STRING,            
            allowNull: false,
            primaryKey: true
          },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            default:'User'
        }
        
    })
}