const { DataTypes } = require('sequelize');
const connection = require('../database/database');

const Palestrante = connection.define(
    'palestrantes', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        biografia: {
            type: DataTypes.TEXT
        }
    }
);

module.exports = Palestrante;