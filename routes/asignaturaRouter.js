const express = require('express');
const router = express.Router();
const asignaturaController = require('../controllers/asignaturaController');


router.get('/', asignaturaController.asignaturas);

router.get('/add', asignaturaController.asignaturaAddFormulario);

router.post('/add', asignaturaController.asignaturaAdd);

router.get('/del/:id', asignaturaController.asignaturaDelFormulario);

router.post('/del/:id', asignaturaController.asignaturaDel);

router.get('/edit/:id', asignaturaController.asignaturaEditFormulario);

router.post('/edit/:id', asignaturaController.asignaturaEdit);

module.exports = router;
