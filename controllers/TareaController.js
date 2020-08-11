var mongoose = require('mongoose');
var Tarea = require("../models/Tareas");

var tareaController = {};
var listado = [];


tareaController.list = function(req, res){
    Tarea.find({}, function (err, docs) {
        listado = [];
        for(var i=0; i<docs.length;i++){
            listado.push(docs[i]['nombre'])
        }
        res.render('../views/toDoList.ejs', {title: "To do list",lista: listado})
    });
};

tareaController.create = function(req, res){
    Tarea.create({nombre: req.params.titulo, pos: listado.length ,hecho: 'No'}, function (err, doc) {
        if (err) return handleError(err);
        listado.push(req.params.titulo);
        res.render("toDoList.ejs",{title:"To do list",lista: listado});
      });
};

tareaController.delete = function(req, res){
    Tarea.deleteOne({nombre : listado[req.params.num]}, function (err) {
        if (err) return handleError(err);
        listado.splice(req.params.num,1);
        res.render("toDoList.ejs",{title:"To do list",lista: listado});
    });
};

tareaController.ApiList = function(req, res){
    Tarea.find({}, function (err, docs) {
        listado = [];
        for(var i=0; i<docs.length;i++){
            listado.push(docs[i]['nombre'])
        }
        res.send(listado)
      })
};

tareaController.ApiCreate = function(req, res){
    Tarea.create({nombre: req.params.titulo, pos: listado.length ,hecho: 'No'}, function (err, doc) {
        if (err) return handleError(err);
        listado.push(req.params.titulo);
        res.send(listado);
      });
};

tareaController.ApiDelete = function(req, res){
    Tarea.deleteOne({nombre : listado[req.params.num]}, function (err) {
        if (err) return handleError(err);
        listado.splice(req.params.num,1);
        res.send(listado);
  });
};

tareaController.ApiEdit = function(req, res){
    Tarea.updateOne({nombre : listado[req.params.num]},{$set:{nombre:req.params.nuevo}}, function (err) {
        if (err) return handleError(err);
        listado[req.params.num] = req.params.nuevo;
        res.send(listado)
  });
};

module.exports = tareaController;


