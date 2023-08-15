/*
  Tabla de ofertas 
  Tiene id del producto el precio y la fecha de vencimiento de la oferta
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product_offer', {
        id_prod: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    })
};
