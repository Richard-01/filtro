const {connector} = require('./Database/conexion');
const express = require('express');
const clientRoute = require('./Routes/client.Route');
const bookRoute = require('./Routes/book.Route');


connector();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', clientRoute);
app.use('/book', bookRoute);


module.exports = app;