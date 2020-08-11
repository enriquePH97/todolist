const express = require('express');
const app = express();
var path = require('path');

app.set("view engine","ejs");
var await = require('await');
var async = require("async");

var listado = [];

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pruebas', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
});

var tarea = require('./controllers/TareaController.js');

  /////////PAGINA WEB/////////
app.get('/', tarea.list);
app.get('/create/:titulo',tarea.create);
app.get('/delete/:num',tarea.delete);

///////// API /////////
app.get('/api/retrieve',tarea.ApiList);
app.get('/api/create/:titulo',tarea.ApiCreate);
app.get('/api/edit/:num/:nuevo',tarea.ApiEdit);
app.get('/api/delete/:num',tarea.ApiDelete);

app.listen(3000,()=>console.log('Escuchando por el puerto 3000'));