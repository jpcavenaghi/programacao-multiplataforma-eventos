const Sequelize = require('sequelize');
const connection = require('../database/database');
const Evento = require('./evento'); 
const Palestrante = require('./palestrante'); 

const Palestra = connection.define('palestra', {
    evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    palestrante_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horario: {
        type: Sequelize.TIME,
        allowNull: false
    }
});

Palestra.belongsTo(Evento, { foreignKey: 'evento_id', as: 'evento' });
Palestra.belongsTo(Palestrante, { foreignKey: 'palestrante_id', as: 'palestrante' });

module.exports = Palestra;