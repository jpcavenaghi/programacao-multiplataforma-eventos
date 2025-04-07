const express = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Perfil = require('../models/perfil');

exports.getAll = (req, res, next) => {
    Usuario.findAll({
        order: [
            ['email', 'ASC']
        ]
    }).then(usuarios => {
        res.render('usuarios/index', {
            usuarios: usuarios,
            inAdm: req.session.login.inAdm
        });
    });
}

exports.renderNovo = (req, res, next) => {
    Perfil.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(perfis => {
        res.render('usuarios/novo', { 
            perfis: perfis,
            inAdm: req.session.login.inAdm
         });
    });
}

exports.create = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const perfilId = req.body.perfilId;

    Usuario.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if(usuario == undefined) {
            const salt = bcrypt.genSaltSync();
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            Usuario.create({
                email: email,
                senha: senhaCriptografada,
                perfilId: perfilId
            }).then(() => {
                res.redirect('/usuarios');
            });
        } else {
            res.redirect('/usuarios');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id).then(usuario => {
        Perfil.findAll({
            order: [
                ['descricao', 'ASC']
            ]
        }).then(perfis => {
            res.render('usuarios/editar', {
                usuario: usuario,
                perfis: perfis,
                inAdm: req.session.login.inAdm
            });
        });
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const email = req.body.email;
    const senha = req.body.senha;
    const perfilId = req.body.perfilId;

    const salt = bcrypt.genSaltSync();
    const senhaCriptografada = bcrypt.hashSync(senha, salt);

    Usuario.update({
        email: email,
        senha: senhaCriptografada,
        perfilId: perfilId
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/usuarios');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/usuarios');
    });
}

exports.renderLogin = (req, res, next) => {
    res.render('usuarios/login', {msg:''});
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    Usuario.findOne({
        where: {
            email: email
        },
        include: [
            {
                model: Perfil
            }
        ]
    }).then(usuario => {
        if(usuario != undefined) {
            if(bcrypt.compareSync(senha, usuario.senha)) {
                req.session.login = {
                    email: usuario.email,
                    inAdm: usuario.perfil.inAdm
                }
                res.redirect('/');
            } else {
                res.render('usuarios/login', {msg: 'Usuário ou senha inválidos!'});
            }
        } else {
            res.render('usuarios/login', {msg: 'Usuário ou senha inválidos!'});
        }
    })
}