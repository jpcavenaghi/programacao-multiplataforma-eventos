const { DataTypes } = require('sequelize');
const connection = require('../database/database');
const Evento = require('./evento');
const Participante = require('./participante');

const Inscricao = connection.define('inscricoes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    evento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Evento, key: 'id' }
    },
    participante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Participante, key: 'id' }
    },
    data_inscricao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: true });

Inscricao.belongsTo(Evento, { foreignKey: 'evento_id', as: 'evento' });
Inscricao.belongsTo(Participante, { foreignKey: 'participante_id', as: 'participante' });

module.exports = Inscricao;