/*
      
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('profile', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        { timestamps: false }
    );
};

