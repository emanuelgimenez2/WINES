const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('shopping_cart', {
        id_usuario:{
            type: DataTypes.STRING,
            allowNull: false
        },
        id_prod_cart: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },    
        amount:{
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
    },{
        timestamps: false,
        createdAt: false,
    })
}
