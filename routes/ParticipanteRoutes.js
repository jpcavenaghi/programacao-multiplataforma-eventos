const express = require('express');
const router = express.Router();

const ParticipanteController = require('../controllers/ParticipanteController');

router.get('/', ParticipanteController.getAll);
router.get('/novo', ParticipanteController.renderNovo);
router.post('/', ParticipanteController.create);
router.get('/editar/:id', ParticipanteController.renderEditar);
router.post('/salvar', ParticipanteController.update);
router.get('/delete/:id', ParticipanteController.delete);

module.exports = router;