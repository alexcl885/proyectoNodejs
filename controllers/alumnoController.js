const express = require('express');
const db = require('../db');

// Listar todos los alumnos
exports.listarAlumnos = (req, res) => {
    db.query('SELECT * FROM `alumno`', (err, response) => {
      if (err) res.send('ERROR al hacer la consulta');
      else res.render('alumnos/alumnos', { alumnos: response });
    });
  };
  
  // Mostrar formulario de agregar alumno
  exports.formularioAgregarAlumno = (req, res) => {
    res.render('alumnos/add');
  };
  
  // Agregar un nuevo alumno
  exports.agregarAlumno = (req, res) => {
    const { nombre, apellido } = req.body;
    db.query(
      'INSERT INTO alumno (nombre, apellido) VALUES (?,?)',
      [nombre, apellido],
      (error) => {
        if (error) res.send('ERROR INSERTANDO ALUMNO');
        else res.redirect('/alumnos');
      }
    );
  };
  
  // Mostrar formulario de eliminar alumno
  exports.formularioEliminarAlumno = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      res.send('PARAMETROS INCORRECTOS');
    } else {
      db.query('SELECT * FROM alumno WHERE id=?', id, (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR BORRAR EL ALUMNO');
        else {
          if (respuesta.length > 0) {
            res.render('alumnos/del', { alumno: respuesta[0] });
          } else {
            res.send('ERROR al INTENTAR BORRAR EL ALUMNO, NO EXISTE');
          }
        }
      });
    }
  };
  
  // Eliminar alumno
  exports.eliminarAlumno = (req, res) => {
    const { id } = req.body;
    if (isNaN(id)) {
      res.send('ERROR BORRANDO');
    } else {
      db.query('DELETE FROM alumno WHERE id=?', id, (error) => {
        if (error) res.send('ERROR BORRANDO ALUMNO');
        else res.redirect('/alumnos');
      });
    }
  };
  
  // Mostrar formulario de editar alumno
  exports.formularioEditarAlumno = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      res.send('PARAMETROS INCORRECTOS');
    } else {
      db.query('SELECT * FROM alumno WHERE id=?', id, (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL ALUMNO');
        else {
          if (respuesta.length > 0) {
            res.render('alumnos/edit', { alumno: respuesta[0] });
          } else {
            res.send('ERROR al INTENTAR ACTUALIZAR EL ALUMNO, NO EXISTE');
          }
        }
      });
    }
  };
  
  // Editar alumno
  exports.editarAlumno = (req, res) => {
    const { id, nombre, apellido } = req.body;
    if (isNaN(id)) {
      res.send('ERROR ACTUALIZANDO');
    } else {
      db.query(
        'UPDATE alumno SET nombre = ?, apellido = ? WHERE id = ?',
        [nombre, apellido, id],
        (error) => {
          if (error) res.send('ERROR ACTUALIZANDO ALUMNO');
          else res.redirect('/alumnos');
        }
      );
    }
  };
   
