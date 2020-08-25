const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser')
require('./config/config');

app.set("view engine","ejs");
var await = require('await');
var async = require("async");






// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pruebas', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
});

var tarea = require('./controllers/TareaController.js');
var usuario = require('./controllers/UsuarioController.js');

  /////////PAGINA WEB/////////
app.get('/', tarea.mainPage);
app.get('/create/:titulo',tarea.create);
app.get('/delete/:num',tarea.delete);

app.get('/register',usuario.registro);
app.post('/login',usuario.login);

///////// API /////////
app.get('/api/retrieve',tarea.ApiList);
app.get('/api/create/:titulo',tarea.ApiCreate);
app.get('/api/edit/:num/:nuevo',tarea.ApiEdit);
app.get('/api/delete/:num',tarea.ApiDelete);

app.listen(3000,()=>console.log('Escuchando por el puerto 3000'));