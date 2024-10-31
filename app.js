/**
 * Aplicacion Full-Stack Nodejs con Express
 *          GESTION ACADEMICA
 */
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
/**
 * Crea el servidor web
 */
const app = express();
const port = 8001;
/**
 * Configuramos el motor de plantillas
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


/**
 * Conectamos a la base de datos
 */
const db = mysql.createConnection({
    host: 'localhost',
    port: 33307,
    user: 'root',
    password: 'zx76wbz7FG89k',
    database: 'gestion',
  });

// Conexión a MySQL
db.connect(err => {
    if (err) {
      console.error('Error al conectar a MySQL:', err);
      return;
    }
    console.log('Conexión exitosa a MySQL');
});




//convertir los parametros que pasemos en JSON
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res)=>{
    res.render('index');
});


app.get('/alumnos', (req, res)=>{
    db.query(
        'SELECT * FROM alumno;',
        (err, response) =>{
            if (err) res.send("ERROR AL HACER UNA CONSULTA")
            else{
                res.render('alumnos/alumnos',{alumnos : response})
            }
        }
    )
})

app.get('/hola', (req, res)=>{
    res.render('test');
});

app.post('/destino', (req, res)=>{
    console.log(req);
    const persona = req.body
     res.render('saluda', persona);
});

/**para introducir un nuevo alunno */
app.get('/alumnos/add', (req, res) =>{
    res.render('alumnos/add')
})

app.get('/alumnos/add', (req, res) =>{
    const {nombre, apellido} = req.body;
    db.query(
        'INSERT INTO `alumno` (nombre, apellido) VALUES (?,?)', [nombre, apellido] , 
        (error, respuesta) => {
            if (error ) res.send("Error al insertar un alumno")
            else res.redirect("/alumnos") 
        }
    );
});
/**para borrar un alunno */
app.post('/alumnos/del:id', (req, res) =>{
    const {id, nombre, apellido} = req.body

    const paramId = req.params['id'];

    if (isNaN(id) || isNaN(paramId) || id !== paramId){
        res.send("ERROR BORRANDO")
    }
    else
        db.query(
            'SELECT * FROM alumno WHERE id = ?;',
            id,
            (error, respuesta) =>{

                if (error) res.send("ERROR AL INTENTAR BORRAR EL ALUMNO")
                else res.redirect('/alumnos')
            }

        )
    res.render('alumnos/add')
})

app.get('/alumnos/del/:id', (req, res) =>{
    

    if (isNaN(id)) res.send("PARAMETROS INCORRECTOS")
    else 
        db.query(
            'DELETE FROM `alumno` (nombre, apellido) WHERE id =?', [nombre, apellido] , 
            (error, respuesta) => {
                if (error ) res.send("Error al insertar un alumno")
                else res.redirect("/alumnos") 
            }
        );
    
})
//para editar un alumno

app.post('/alumnos/edit:id', (req, res) =>{
    const {id, nombre, apellido} = req.body

    const paramId = req.params['id'];

    if (isNaN(id) || isNaN(paramId) || id !== paramId){
        res.send("ERROR ACTUALIZANDO")
    }
    else
        db.query(
            'UPDATE `alumno` SET `nombre` = ?, `apellido` = ? ' + ' WHERE `id` = ?',
            [nombre, apellido, id],
            (error, respuesta) =>{

                if (error) res.send("ERROR AL INTENTAR EDITAR EL ALUMNO")
                else res.redirect('/alumnos')
            }

        )
    res.render('alumnos/add')
})

app.get('/alumnos/edit/:id', (req, res) =>{
    

    if (isNaN(id)) res.send("PARAMETROS INCORRECTOS")
    else 
        db.query(
            'DELETE FROM `alumno` (nombre, apellido) WHERE id =?', [nombre, apellido] , 
            (error, respuesta) => {
                if (error ) res.send("Error al insertar un alumno")
                else res.redirect("/alumnos") 
            }
        );
    
})









/**
 * Siempre es lo ultimo que hacemos
 */
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });