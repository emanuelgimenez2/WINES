/*
  Tabla de Productos 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product', {
        // id_product:{
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     allowNull: false
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {                                  // 1 Activo 2-Inactivo no a la venta 
            type: DataTypes.INTEGER,
            allowNull: false,
        },       
        place: {                                   // Proveniente de 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categ: {                                   // Categoria del producto
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        summary: {                                 // Descripcion del Producto
            type: DataTypes.TEXT,
            allowNull: false,
        },
        producer: {                                // Productor
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        alcohol: {                                // Productor
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        minimo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        { timestamps: false }
    );
}
