const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('favorite', {
        id_usuario:{
            type: DataTypes.STRING,
            allowNull: false
        },
        id_prod: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
        }, 
        offer_notification: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        stock_notification: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    },{
        timestamps: false,
        createdAt: false,
    })
}
