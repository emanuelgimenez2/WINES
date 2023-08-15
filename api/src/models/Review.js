/*
  Reviews del usuario 
*/
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        id_prod: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stars: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        { timestamps: false }
    );
};

