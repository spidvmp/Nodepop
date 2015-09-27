'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//llamo al modelo de usuario
var User = require('../../Model/User');


//el agente nos lo envian por post
router.post('/', function(req, res, next){


    //sacamos los datos de login y passwrod que vienen en el body
    var nuevo = req.body;

    //console.log('nuevo=', nuevo, 'body=',req.body.login);

    var agt= new User(nuevo);

    //primero buscamos a ver si el login existe, si existe no se puede crear otro igual
    //ejecuto el metodo estatico definido en Model/User.js
    User.userExist({login: nuevo.login}, function(err, rows){
        if ( err ){
            return res.json({ok:false, error:err, txt:'Error al buscar el usuario para ver si existe'});
        }
        console.log('rows=',rows.length,' nuevo=',nuevo,' rows=',rows);
        //he de comprbar si rows tiene elementos, si los tiene no se puede crear este usuario, estaria repetido
        if ( rows.length === 0) {

            //ahora grabamos el nuevo agente en la BD
            agt.save( function(err, creado) {
                if (err) {
                    return res.json({ok: false, error: err, txt: 'No se puede crear'});
                }

                //se ha insertado correctamente
                res.json({ok: true, agente: creado});
            });


        } else {
            //usuario repetido
            res.json({ok:false, txt:'Usuario ya existe'});
        }



    });





});

module.exports = router;