const express = require('express');
const Participante = require('../models/participante');

exports.getAll = (req, res, next) => {
    Participante.findAll({
        order: [['nome', 'ASC']]
    }).then(participantes => {
        res.render('participantes/index', {
            participantes: participantes,
            inAdm: req.session.login.inAdm
        });
    });
};

exports.renderNovo = (req, res, next) => {
    res.render('participantes/novo', {
        inAdm: req.session.login.inAdm
    });
};

exports.create = (req, res, next) => {
    const { nome, email, telefone } = req.body;

    Participante.findOne({
        where: { email: email }
    }).then(participante => {
        if (!participante) {
            Participante.create({ nome, email, telefone }).then(() => {
                res.redirect('/participantes');
            });
        } else {
            res.redirect('/participantes');
        }
    });
};

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Participante.findByPk(id).then(participante => {
        res.render('participantes/editar', {
            participante: participante,
            inAdm: req.session.login.inAdm
        });
    });
};

exports.update = (req, res, next) => {
    const { id, nome, email, telefone } = req.body;

    Participante.update({ nome, email, telefone }, { where: { id } })
        .then(() => {
            res.redirect('/participantes');
        });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Participante.destroy({ where: { id } }).then(() => {
        res.redirect('/participantes');
    });
};
