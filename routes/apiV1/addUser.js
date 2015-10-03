'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var inter= require('../../lib/Internacional');
var config = require('../../config.js');

//llamo al modelo de usuario
var User = require('../../Model/User');
var PushToken = require('../../Model/PushToken');


//el agente nos lo envian por post
router.post('/', function(req, res, next){


    //sacamos los datos que vienen en el body
    //tenemos que recibir: name, login (email), password
    var nuevo = req.body;

    var agt= new User(nuevo);
    agt.password = sha256(agt.password);


    //primero buscamos a ver si el login existe, si existe no se puede crear otro igual
    //ejecuto el metodo estatico definido en Model/User.js
    User.userExist({login: nuevo.login}, function(err, rows){
        if ( err ){
            return res.json(inter('ERR_FIND_USER'));
        }
        //he de comprbar si rows tiene elementos, si los tiene no se puede crear este usuario, estaria repetido
        if ( rows.length === 0) {
            //ahora grabamos el nuevo agente en la BD
            agt.save( function(err, creado) {
                if (err) {
                    return res.json(inter('ERR_SAVE_USER'));
                }

                //se ha insertado correctamente
                var token = jwt.sign(nuevo, config.secretToken, {expiresInMinutes:config.expiresInMinutes});

                //se lo pasamos el usuario
                res.json({ok:true, token:token});

            });

        } else {
            //usuario repetido
            res.json(inter('USER_EXIST'));
        }

    });

});

router.use(require('./validate'));

router.put('/adduuid', function(req,res,next){

    //obtengo la informacion del body
    var updatetoken = req.body;

    //compruebo si tengo el tokenpush
    if ( updatetoken.tokenpush ){
        //console.log('busco login=',updatetoken.login,' pass=',updatetoken.password);
        //busco el usuario mediante el login y pass que me pasan
        User.userExist({login: updatetoken.login, password: updatetoken.password}, function(err, rows){
            if ( err ){
                console.log('---------salgo por aqui');
                return res.json(inter('ERR_FIND_USER'));
            }
            //he de comprbar si rows tiene elementos, si los tiene no se puede crear este usuario, estaria repetido
            if ( rows.length === 1) {

                //tengo al usuario, compruebo si me han pasado parametro so
                var user = rows[0];

                //creo el modelo Tokenpush
                var tp= new PushToken();

                //incluyo el id del usuario
                tp.user = user._id;
                //pongo el so
                if ( updatetoken.so ) {
                    tp.so=updatetoken.so;
                } else {
                    //lo intento sacar de la cabecera
                    if ( req.get('User-Agent').match(/Android/i) ){
                        tp.so='android';
                    } else if ( req.get('User-Agent').match(/IOS/i) ) {
                        tp.so = 'ios';
                    }

                }
                //ya se el so, ahora actualizo el token
                tp.token=updatetoken.tokenpush;

                //actualizo la BD
                console.log('a grabar ',tp);
                tp.save(function(err){
                    if ( err ) {
                        console.log('err grabando token',err);
                        return res.json(inter('ERR_SAVE_TOKEN'));
                    }


                    console.log('termino de grabar');

                });

                console.log('----salgo por Aqui');
                return res.json({ok:true});
            } else {
                console.log('---------SAlgo por aqui');
                return res.json(inter('ERR_UNKNOW_USER'));
            }
        });

    } else {
        console.log('---------salgo pasdgqui');
        return res.json(inter('ERR_NO_TOKEN'));
    }


});

module.exports = router;