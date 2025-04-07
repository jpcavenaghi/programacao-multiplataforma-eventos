const Inscricao = require('../models/inscricao');
const Evento = require('../models/evento');
const Participante = require('../models/participante');

exports.getAll = async (req, res) => {
    try {
        const inscricoes = await Inscricao.findAll({
            include: [
                { model: Evento, as: 'evento' },
                { model: Participante, as: 'participante' }
            ],
            order: [['data_inscricao', 'DESC']]
        });

        res.render('inscricoes/index', { 
            inscricoes, 
            inAdm: req.session.login.inAdm 
        });
    } catch (error) {
        console.error('Erro ao buscar inscrições:', error);
        res.status(500).send('Erro interno no servidor');
    }
};

exports.renderNovo = async (req, res) => {
    try {
        const eventos = await Evento.findAll({ order: [['nome', 'ASC']] });
        const participantes = await Participante.findAll({ order: [['nome', 'ASC']] });

        res.render('inscricoes/novo', { 
            eventos, 
            participantes, 
            inscricao: null, 
            inAdm: req.session.login.inAdm 
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        res.redirect('/inscricoes');
    }
};

exports.create = async (req, res) => {
    try {
        const { evento_id, participante_id } = req.body;
        await Inscricao.create({ evento_id, participante_id });
        res.redirect('/inscricoes');
    } catch (error) {
        console.error('Erro ao criar inscrição:', error);
        res.status(500).send('Erro ao criar inscrição');
    }
};

exports.renderEditar = async (req, res) => {
    try {
        const inscricao = await Inscricao.findByPk(req.params.id, {
            include: [
                { model: Evento, as: 'evento' },
                { model: Participante, as: 'participante' }
            ]
        });

        const eventos = await Evento.findAll({ order: [['nome', 'ASC']] });
        const participantes = await Participante.findAll({ order: [['nome', 'ASC']] });

        res.render('inscricoes/editar', { 
            inscricao, 
            eventos, 
            participantes, 
            inAdm: req.session.login.inAdm 
        });
    } catch (error) {
        console.error('Erro ao carregar edição:', error);
        res.redirect('/inscricoes');
    }
};

exports.update = async (req, res) => {
    try {
        const { id, evento_id, participante_id } = req.body;
        await Inscricao.update({ evento_id, participante_id }, { where: { id } });
        res.redirect('/inscricoes');
    } catch (error) {
        console.error('Erro ao atualizar inscrição:', error);
        res.status(500).send('Erro ao atualizar inscrição');
    }
};

exports.delete = async (req, res) => {
    try {
        await Inscricao.destroy({ where: { id: req.params.id } });
        res.redirect('/inscricoes');
    } catch (error) {
        console.error('Erro ao excluir inscrição:', error);
        res.status(500).send('Erro ao excluir inscrição');
    }
};
