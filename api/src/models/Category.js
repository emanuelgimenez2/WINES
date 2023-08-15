const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('category', {
        id_categ:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        variety: { 
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        type:{
            type: DataTypes.ENUM('Tinto','Rosado','Blanco'),
            defaultValue: 'Tinto',
            allowNull: false
        },
        degreeSugar:{
            type: DataTypes.ENUM('Seco','Abocado','Semiseco','Dulce','Dulce Natural'),
            defaultValue: 'Semiseco',
            allowNull: false
        }
    },{
        timestamps: false,
        createdAt: false,
    })
}
