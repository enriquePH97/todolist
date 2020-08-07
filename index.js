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
var Schema = mongoose.Schema;
var TareaSchema = new Schema({
    nombre    : 'String'
  , hecho : 'String'
  , pos : 'Number'
});
var Tarea = mongoose.model('tarea', TareaSchema);

Tarea.find({}, function (err, docs) {
    listado = [];
    for(var i=0; i<docs.length;i++){
        listado.push(docs[i]['nombre'])
    }
  })

  /////////PAGINA WEB/////////
app.get('/', function(req, res) {
    res.render("toDoList.ejs",{title:"To do list",lista: listado});
});

app.get('/create/:titulo',(req,res)=>{
    Tarea.create({nombre: req.params.titulo, pos: listado.length ,hecho: 'No'}, function (err, doc) {
        if (err) return handleError(err);
        listado.push(req.params.titulo);
        res.render("toDoList.ejs",{title:"To do list",lista: listado});
      });
});
app.get('/delete/:num',(req,res)=>{
    console.log(req.params.num);
    Tarea.deleteOne({nombre : listado[req.params.num]}, function (err) {
        if (err) return handleError(err);
        listado.splice(req.params.num,1);
        res.render("toDoList.ejs",{title:"To do list",lista: listado});
  });
});


///////// API /////////
app.get('/api/retrieve',(req,res)=>{
    Tarea.find({}, function (err, docs) {
        listado = [];
        for(var i=0; i<docs.length;i++){
            listado.push(docs[i]['nombre'])
        }
        res.send(listado)
      })
});
app.get('/api/create/:titulo',(req,res)=>{
    Tarea.create({nombre: req.params.titulo, pos: listado.length ,hecho: 'No'}, function (err, doc) {
        if (err) return handleError(err);
        listado.push(req.params.titulo);
        res.send(listado);
      });
});
app.get('/api/edit/:num/:nuevo',(req,res)=>{
    listado[req.params.num] = req.params.nuevo;
    res.send(listado)
});
app.get('/api/delete/:num',(req,res)=>{
    console.log(req.params.num);
    Tarea.deleteOne({nombre : listado[req.params.num]}, function (err) {
        if (err) return handleError(err);
        listado.splice(req.params.num,1);
        res.send(listado);
  });
});



app.listen(3000,()=>console.log('Escuchando por el puerto 3000'));