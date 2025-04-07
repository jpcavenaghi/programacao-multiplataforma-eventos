const express = require('express');
const router = express.Router();
const InscricaoController = require('../controllers/InscricaoController');

router.get('/', InscricaoController.getAll);
router.get('/novo', InscricaoController.renderNovo);
router.post('/', InscricaoController.create);
router.get('/editar/:id', InscricaoController.renderEditar);
router.post('/salvar', InscricaoController.update);
router.get('/delete/:id', InscricaoController.delete);

module.exports = router;