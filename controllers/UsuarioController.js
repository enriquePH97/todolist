var mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

var Usuario = require("../models/Usuarios");


var usuarioController = {};


usuarioController.login = function(req, res){
    let body = req.body;
    Usuario.findOne({ nombre: body.nombre}, (erro, usuarioDB)=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
   // Verifica que exista un usuario con el mail escrita por el usuario.
      if (!usuarioDB) {
         return res.status(400).json({
           ok: false,
           err: {
               message: "Usuario o contraseña incorrectos"
           }
        })
      }
   // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (! bcrypt.compareSync(body.pass, usuarioDB.pass)){
         return res.status(400).json({
            ok: false,
            err: {
              message: "Usuario o contraseña incorrectos"
            }
         });
      }
        // Genera el token de autenticación
        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED_AUTENTICACION, {
        expiresIn: process.env.CADUCIDAD_TOKEN
        })
        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        })
   })
};

usuarioController.registro = function(req, res){

    let body = req.body;
    let { nombre, pass } = body;
    let usuario = new Usuario({
        nombre,
        pass: bcrypt.hashSync(pass, 10),
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
        })
};



module.exports = usuarioController;


