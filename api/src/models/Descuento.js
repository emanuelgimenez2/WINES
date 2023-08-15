const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('descuento', {
        id_prod: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'Products', // Table name...is that right? Made the migration work...
            //     key: 'id'
            //   }
        },
        porcentaje: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    },
        { timestamps: false }
    );
};

