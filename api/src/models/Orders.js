/*
  Ordenes de compra 
  Id automatico 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_payment:{
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('Ingreso','Creada','Procesando','Completo','Cancelada'),
            defaultValue: 'Ingreso',
            allowNull: false,
        },
        total: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        direccion:{
            type: DataTypes.STRING
        },
        emailEnvio:{
            type: DataTypes.STRING
        }
        
    },{
        timestamps: false,
        createdAt: false,
    });
};