const express = require('express');
const Palestra = require('../models/palestra');
const Evento = require('../models/evento');
const Palestrante = require('../models/palestrante');

// Controller
exports.getAll = (req, res, next) => {
    Palestra.findAll({
        include: [
            { model: Evento, as: 'evento' },
            { model: Palestrante, as: 'palestrante' }
        ],
        order: [['horario', 'ASC']]
    }).then(palestras => {
        res.render('palestras/index', {
            palestras: palestras,
            inAdm: req.session.login.inAdm
        });
    });
}

exports.renderNovo = (req, res, next) => {
    Evento.findAll().then(eventos => {
        Palestrante.findAll().then(palestrantes => {
            res.render('palestras/novo', {
                palestra: null,
                eventos: eventos,
                palestrantes: palestrantes,
                inAdm: req.session.login.inAdm
            });
        });
    });
}

exports.create = (req, res, next) => {
    const { evento_id, palestrante_id, titulo, horario } = req.body;
    
    Palestra.create({
        evento_id,
        palestrante_id,
        titulo,
        horario
    }).then(() => {
        res.redirect('/palestras');
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Palestra.findByPk(id, {
        include: [
            { model: Evento, as: 'evento' },
            { model: Palestrante, as: 'palestrante' }
        ]
    }).then(palestra => {
        Evento.findAll().then(eventos => {
            Palestrante.findAll().then(palestrantes => {
                res.render('palestras/editar', {
                    palestra: palestra,
                    eventos: eventos,
                    palestrantes: palestrantes,
                    inAdm: req.session.login.inAdm
                });
            });
        });
    });
}
exports.update = (req, res, next) => {
    const { id, evento_id, palestrante_id, titulo, horario } = req.body;

    Palestra.update({
        evento_id,
        palestrante_id,
        titulo,
        horario
    }, {
        where: { id }
    }).then(() => {
        res.redirect('/palestras');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Palestra.destroy({
        where: { id }
    }).then(() => {
        res.redirect('/palestras');
    });
}