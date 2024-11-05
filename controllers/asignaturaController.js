const db = require('../db')

exports.asignaturas = (req, res) => {
  db.query(
    'SELECT * FROM `asignatura`',
    (err, response) => {
      if (err) res.send('ERROR al hacer la consulta')
      else res.render('asignaturas/list', { asignaturas: response })
    }
  );
};

exports.asignaturaAddFormulario = (req, res) => {
  res.render('asignaturas/add');
};

exports.asignaturaAdd = (req, res) => {
  const { nombre, ciclo, curso } = req.body;
  db.query(
    'INSERT INTO asignatura (nombre, ciclo, curso) VALUES (?,?,?)',
    [nombre, ciclo, curso],
    (error, respuesta) => {
      if (error) res.send('ERROR INSERTANDO asignatura' + req.body)
      else res.redirect('/asignaturas')
    }
  );
};

exports.asignaturaDelFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM asignatura WHERE id=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR BORRAR EL asignatura')
        else {
          if (respuesta.length > 0) {
            res.render('asignaturas/del', { asignatura: respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR BORRAR EL asignatura, NO EXISTE')
          }
        }
      });

};

exports.asignaturaDel = (req, res) => {

  const { id, nombre, apellido } = req.body;
  const paramId = req.params['id'];

  if (isNaN(id) || isNaN(paramId) || id !== paramId) {
    res.send('ERROR BORRANDO')
  } else {
    db.query(
      'DELETE FROM asignatura WHERE id=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR BORRANDO asignatura' + req.body)
        else res.redirect('/asignaturas')
      }
    );
  }
};

exports.asignaturaEditFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM asignatura WHERE id=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL asignatura')
        else {
          if (respuesta.length > 0) {
            res.render('asignaturas/edit', { asignatura: respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR ACTUALIZAR EL asignatura, NO EXISTE')
          }
        }
      });
};

exports.asignaturaEdit = (req, res) => {

  const { id, nombre, ciclo, curso } = req.body;
  const paramId = req.params['id'];

  if (isNaN(id) || isNaN(paramId) || id !== paramId) {
    res.send('ERROR ACTUALIZANDO asignatura')
  } else {
    db.query(
      'UPDATE `asignatura` SET `nombre` = ?, `ciclo` = ? , `curso` = ? ' +
      ' WHERE `id` = ?',
      [nombre, ciclo, curso, id],
      (error, respuesta) => {
        if (error) {
          res.send('ERROR ACTUALIZANDO asignatura' + error)
          console.log(error)
        }
        else res.redirect('/asignaturas')
      }
    );
  }
};
