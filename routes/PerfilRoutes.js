const express = require('express');
const router = express.Router();

const PerfilController = require('../controllers/PerfilController');

router.get('/', PerfilController.getAll);
router.get('/novo', PerfilController.renderNovo);
router.post('/', PerfilController.create);
router.get('/editar/:id', PerfilController.renderEditar);
router.post('/salvar', PerfilController.update);
router.get('/delete/:id', PerfilController.delete);

module.exports = router;