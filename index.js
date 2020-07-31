require('dotenv').config({path: 'variables.env'});

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./router/index');

console.log(process.env.DB_URL);
const app = express();

// 5. BodyParser.json o Express.json
// Permite ller los datos de los formularios
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2. Habilitar PUG
app.set('view engine', 'pug');

// 3. Carperta para las vistas
app.set('views', path.join(__dirname, './views'));

// 4. Cargar los archivos estaticos
app.use(express.static('public'));

// 1.  Definir rutas de la app
app.use('/', routes());

// Leer localhost de variables.env y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`Connect to server on: ${host}:${port}`);
});
