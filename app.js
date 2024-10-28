/**
 * Aplicacion de Nodejs con Express
 * GESTION ACADEMICA
 */
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8000;

app.get('/hola', (req, res)=>
    res.send("hola mundo!")
);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });