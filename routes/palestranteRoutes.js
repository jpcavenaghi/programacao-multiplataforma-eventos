const express = require('express');
const router = express.Router();
const PalestranteController = require('../controllers/PalestranteController');

router.get('/', PalestranteController.getAll);
router.get('/novo', PalestranteController.renderNovo);
router.post('/', PalestranteController.create);
router.get('/editar/:id', PalestranteController.renderEditar);
router.post('/salvar', PalestranteController.update);
router.get('/delete/:id', PalestranteController.delete);

module.exports = router;