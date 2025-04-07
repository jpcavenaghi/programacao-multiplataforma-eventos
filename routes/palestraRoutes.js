const express = require('express');
const router = express.Router();
const PalestraController = require('../controllers/PalestraController');

router.get('/', PalestraController.getAll);
router.get('/novo', PalestraController.renderNovo);
router.post('/', PalestraController.create);
router.get('/editar/:id', PalestraController.renderEditar);
router.post('/salvar', PalestraController.update);
router.get('/delete/:id', PalestraController.delete);

module.exports = router;