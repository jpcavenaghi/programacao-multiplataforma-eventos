const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');

router.get('/', EventoController.getAll);
router.get('/novo', EventoController.renderNovo);
router.post('/', EventoController.create);
router.get('/editar/:id', EventoController.renderEditar);
router.post('/salvar', EventoController.update);
router.get('/delete/:id', EventoController.delete);

module.exports = router;