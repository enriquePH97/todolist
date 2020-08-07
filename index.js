const express = require('express');
const app = express();
var path = require('path');


app.set("view engine","ejs");
var await = require('await');
var async = require("async");

var listado = ["Tarea 1","Tarea 2","Tarea 3","Tarea 4"];

var mongoose = require('mongoose');
const { ObjectID, ObjectId } = require('mongodb');
mongoose.connect('mongodb://127.0.0.1:27017/nuevaInbiot', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
});

var db = mongoose.connect('mongodb://127.0.0.1:27017/nuevaInbiot', function(error){
    if(error) 
        console.log(error);
    else
        console.log("connection successful");
});
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    language    : { type: String}
  , role         : { type: String}
  , firstName : { type: String}
  , lastName : { type: String}
  , country : { type: String}
  , email : { type: String}
  , password : { type: String}
  , __v : { type: Number}
  , isNotifiedBattery : { type: Boolean}
  , company : { type: String}
  , position : { type: String}
});


var User = mongoose.model('user', UserSchema);

User.find({role:"ADMIN"}).exec(function(err, users) {
    if (err) throw err;
    console.log(users);
});



app.get('/', function(req, res) {
    //res.render("toDoList.ejs",{title:"To do list",lista:listado});
      res.send("Ruta principal");
});


app.listen(3000,()=>console.log('Escuchando por el puerto 3000'))


app.get('/api/retrieve',(req,res)=>{
    res.send(listado)
});
app.get('/api/create/:titulo',(req,res)=>{
    listado.push(req.params.titulo);
    res.send(listado)
});
app.get('/api/edit/:num/:nuevo',(req,res)=>{
    listado[req.params.num] = req.params.nuevo;
    res.send(listado)
});
app.get('/api/delete/:num',(req,res)=>{
    listado.splice(req.params.num,1);
    res.send(listado)
});