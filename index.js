const express = require('express');
const app = express();
var path = require('path');


app.set("view engine","ejs");


var listado = ["Tarea 1","Tarea 2","Tarea 3","Tarea 4"];

app.get('/', function(req, res) {
    res.render("toDoList.ejs",{title:"To do list",lista:listado});
});

app.listen(3000,()=>console.log('Escuchando por el puerto 3000'))


app.get('/api/retrieve',(req,res)=>{
    res.render("toDoList.ejs",{title:"To do list",lista:listado});
});
app.get('/api/create/:titulo',(req,res)=>{
    listado.push(req.params.titulo);
    res.render("toDoList.ejs",{title:"To do list",lista:listado});
});
app.get('/api/edit/:num/:nuevo',(req,res)=>{
    listado[req.params.num] = req.params.nuevo;
    res.render("toDoList.ejs",{title:"To do list",lista:listado});
});
app.get('/api/delete/:num',(req,res)=>{
    listado.splice(req.params.num,1);
    res.render("toDoList.ejs",{title:"To do list",lista:listado});
});