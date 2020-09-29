// import '@babel/polyfill';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { dbConnection } = require('./database/config');

// Crear el servidor
const app = express();

// Base de datos
dbConnection();

// Habilitar Cors
app.use(cors());

// Directorio Publico
app.use(express.static('./public'));

// Lectura y parseo del body
app.use(express.json());

// Crear las rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Muestra las variables de entorno
// console.log(process.env);
const thePort = process.env.PORT || 3000;

app.listen(thePort, () => {
  console.log(`Servidor corriendo en puerto ${thePort}`);
});
