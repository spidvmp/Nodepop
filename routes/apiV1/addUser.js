'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//llamo al modelo de usuario
var User = require('../../Model/User');


//el agente nos lo envian por post
router.post('/addUser', function(req, res, next){

    //sacamos los datos de login y passwrod que vienen en el body
    var nuevo = req.body;

    console.log('nuevo=', nuevo);

    var agt= new Agente(nuevo);

    //ahora grabamos el nuevo agente en la BD
    agt.save( function(err, creado) {
        if (err) {
            return res.json({ok: false, error: err, txt: 'No se puede crear'});
        }

        //se ha insertado correctamente
        res.json({ok: true, agente: creado});
    });



});