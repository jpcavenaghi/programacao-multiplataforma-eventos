const Evento = require('../models/evento');

exports.getAll = async (req, res) => {
    try {
        let eventos = await Evento.findAll({ order: [['data', 'ASC']] });

        eventos = eventos.map(evento => ({
            ...evento.dataValues, 
            data: evento.data ? new Date(evento.data).toISOString().split('T')[0] : '' 
        }));

        res.render('eventos/index', { eventos, inAdm: req.session.login.inAdm });
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        res.status(500).send("Erro interno no servidor");
    }
};


exports.renderNovo = (req, res) => {
    res.render('eventos/novo', { evento: null, inAdm: req.session.login.inAdm }); 
};

exports.create = async (req, res) => {
    try {
        const { nome, data, local, descricao, capacidade } = req.body;
        await Evento.create({ nome, data, local, descricao, capacidade });
        res.redirect('/eventos');
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        res.redirect('/eventos');
    }
};

exports.renderEditar = async (req, res) => {
    try {
        let evento = await Evento.findByPk(req.params.id);

        if (!evento) {
            return res.redirect('/eventos');
        }

        evento = {
            ...evento.dataValues,
            data: new Date(evento.data).toISOString().split('T')[0] 
        };

        res.render('eventos/editar', { evento, inAdm: req.session.login.inAdm });
    } catch (error) {
        console.error("Erro ao carregar evento:", error);
        res.redirect('/eventos');
    }
};

exports.update = async (req, res) => {
    try {
        const { id, nome, data, local, descricao, capacidade } = req.body;
        await Evento.update({ nome, data, local, descricao, capacidade }, { where: { id } });
        res.redirect('/eventos');
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        res.redirect('/eventos');
    }
};

exports.delete = async (req, res) => {
    try {
        await Evento.destroy({ where: { id: req.params.id } });
        res.redirect('/eventos');
    } catch (error) {
        console.error("Erro ao excluir evento:", error);
        res.redirect('/eventos');
    }
};
