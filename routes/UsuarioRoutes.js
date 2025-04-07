const express = require('express');
const router = express.Router();

const checkAdm = require('../middleware/checkAdm');

const UsuarioController = require('../controllers/UsuarioController');

router.get('/login', UsuarioController.renderLogin);
router.post('/login', UsuarioController.login);
router.get('/',checkAdm, UsuarioController.getAll);
router.get('/novo',checkAdm, UsuarioController.renderNovo);
router.post('/',checkAdm, UsuarioController.create);
router.get('/editar/:id',checkAdm, UsuarioController.renderEditar);
router.post('/salvar',checkAdm, UsuarioController.update);
router.get('/delete/:id',checkAdm, UsuarioController.delete);

module.exports = router;