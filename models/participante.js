const { DataTypes } = require('sequelize');
const connection = require('../database/database');

const Participante = connection.define(
    'participantes', 
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = Participante;