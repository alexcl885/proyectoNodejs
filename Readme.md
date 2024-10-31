# Gestion Academica

Inicializamos la BBDD y el contenedor.

```bash
npm install --save express express-sesion mysql2
pug body-parser
```
¿QUE ES CADA COSA?
* **express**  : sercidor Web para nodeJS.
* **express-sesion**  : gestiona sesiones HTPP entre el servidorWeb/cliente.
* **mysql2** : driver para conectar a mysql.
* **pug**  : motor html.
* **body-parser** : para coveritr los datos de un formuylario (verbos GET Y POST).
  
INICIALIZAMOS EL REPOSITORIO(hemos creado el .gitignore antes)

```bash
git init
git add .
git commit -m "Primer commit!"
```
Creamos un archivo app.js con el esqueleto basico

```javascript
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

```

http://localhost:8001/hola?.nombre=juan&apellido=gutierrez