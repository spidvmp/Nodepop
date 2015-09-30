'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');

//llamo al modelo de usuario
var User = require('../../Model/User');


//el agente nos lo envian por post
router.post('/', function(req, res, next){


    //sacamos los datos que vienen en el body
    //tenemos que recibir: name, login (email), password
    var nuevo = req.body;

    var agt= new User(nuevo);


    //primero buscamos a ver si el login existe, si existe no se puede crear otro igual
    //ejecuto el metodo estatico definido en Model/User.js
    User.userExist({login: nuevo.login}, function(err, rows){
        if ( err ){
            return res.json({ok:false, error:err, txt:'Error al buscar el usuario para ver si existe'});
        }
        //he de comprbar si rows tiene elementos, si los tiene no se puede crear este usuario, estaria repetido
        if ( rows.length === 0) {

            //ahora grabamos el nuevo agente en la BD
            agt.save( function(err, creado) {
                if (err) {
                    return res.json({ok: false, error: err, txt: 'No se puede crear'});
                }

                //se ha insertado correctamente
                var token = jwt.sign(nuevo, config.secretToken, {expiresInMinutes:config.expiresInMinutes});

                //se lo pasamos el usuario
                res.json({ok:true, token:token});

            });

        } else {
            //usuario repetido
            res.json({ok:false, txt:'Usuario ya existe'});
        }

    });

});

router.use(require('./validate'));

router.put('/adduuid', function(req,res,next){
   console.log("estoy en el put");
    //obtengo la informacion del body
    var updatetoken = req.body;

    //compruebo si tengo el tokenpush
    if ( updatetoken.tokenpush ){

        //busco el usuario mediante el login y pass que me pasan
        User.userExist({login: updatetoken.login, password: updatetoken.password}, function(err, rows){
            if ( err ){
                return res.json({ok:false, error:err, txt:'Error al buscar el usuario'});
            }
            //he de comprbar si rows tiene elementos, si los tiene no se puede crear este usuario, estaria repetido
            if ( rows.length === 1) {

                //tengo al usuario, compruebo si me han pasado parametro so
                var user = rows[0];

                if ( updatetoken.so ) {
                    user.so=updatetoken.so;
                } else {
                    //lo intento sacar de la cabecera
                    if ( req.get('User-Agent').match(/Android/i) ){
                        user.so='Android';
                    } else if ( req.get('User-Agent').match(/IOS/i) ) {
                        user.so='IOS';
                    } else {
                        user.so='PC';
                    }

                }

                //ya se el so, ahora actualizo el token
                user.tokenpush=updatetoken.tokenpush;

                //actualizo la BD

                console.log('user ',user);
            } else {

                return res.json({ok:false, txt: 'usuario no encontrado'});
            }
        });

        return res.json({ok:true});
    } else {
        return res.json({ok:false, txt: 'No tengo el tokenpush'});
    }


});

module.exports = router;