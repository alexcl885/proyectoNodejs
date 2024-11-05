/**
 * Aplicacion Full-Stack Nodejs con Express
 *          GESTION ACADEMICA
 */
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const alumnoRoutes = require('./routes/alumnoRouter')

require('dotenv').config({ path: './gsaca/.env' });

/**
 * Crea el servidor web
 */
const app = express();
const port = process.env.SERVICE_PORT;
/**
 * Configuramos el motor de plantillas
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));





//convertir los parametros que pasemos en JSON
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res)=>{
    res.render('index');
});




app.get('/hola', (req, res)=>{
    res.render('test');
});

app.post('/destino', (req, res)=>{
    console.log(req);
    const persona = req.body
     res.render('saluda', persona);
});



/**
 * Delegamos todas las rutas de alumno 
 */
app.use('  /', alumnoRoutes)





/**
 * Siempre es lo ultimo que hacemos
 */
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });