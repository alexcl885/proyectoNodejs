/**
 * Aqui introduciremos las rutas de nuestra app.js
 */

const express = require('express');
const router = express.Router(); //llamamos al enrutador de express

//controlador de alumno
const alumnosController = require('../controllers/alumnoController')


// Listado de alumnos
router.get('/', alumnosController.listarAlumnos);

// Formulario de agregar alumno
router.get('/add', alumnosController.formularioAgregarAlumno);

// Guardar nuevo alumno
router.post('/add', alumnosController.agregarAlumno);

// Formulario de eliminar alumno
router.get('/del/:id', alumnosController.formularioEliminarAlumno);

// Eliminar alumno
router.post('/del/:id', alumnosController.eliminarAlumno);

// Formulario de editar alumno
router.get('/edit/:id', alumnosController.formularioEditarAlumno);

// Editar alumno
router.post('/edit/:id', alumnosController.editarAlumno);

module.exports = router;
