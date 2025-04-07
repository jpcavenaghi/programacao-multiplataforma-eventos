const express = require('express');
const Palestrante = require('../models/palestrante');

exports.getAll = (req, res, next) => {
    Palestrante.findAll({
        order: [['nome', 'ASC']]
    }).then(palestrantes => {
        res.render('palestrantes/index', {
            palestrantes: palestrantes,
            inAdm: req.session.login.inAdm
        });
    });
};

exports.renderNovo = (req, res, next) => {
    res.render('palestrantes/novo', {
        inAdm: req.session.login.inAdm
    });
};

exports.create = (req, res, next) => {
    const { nome, biografia } = req.body;

    Palestrante.create({ nome, biografia }).then(() => {
        res.redirect('/palestrantes');
    });
};

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Palestrante.findByPk(id).then(palestrante => {
        res.render('palestrantes/editar', {
            palestrante: palestrante,
            inAdm: req.session.login.inAdm
        });
    });
};

exports.update = (req, res, next) => {
    const { id, nome, biografia } = req.body;

    Palestrante.update({ nome, biografia }, { where: { id } })
        .then(() => {
            res.redirect('/palestrantes');
        });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Palestrante.destroy({ where: { id } }).then(() => {
        res.redirect('/palestrantes');
    });
};
