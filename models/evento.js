const { DataTypes } = require('sequelize');
const connection = require('../database/database');

const Evento = connection.define(
    'eventos', 
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
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
);

module.exports = Evento;