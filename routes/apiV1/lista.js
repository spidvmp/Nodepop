'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../../config');
var jwtAuth = require('../../lib/jwtAuth');

var inter= require('../../lib/Internacional');

//requiere al modelo
var Article = require('../../Model/Article');

//le hago pasar por el middleware de validacion del token
//router.get('/',require('./validate'));
router.use(jwtAuth());



//listado de paginado
router.get('/', function(req,res){

    //inter.devuelve('saludo','en');

    //ejecuto el metodo lista de Article. Le paso el req completo para que saque los datos de los filtros
    Article.lista(req,  function(err, lista){
        if ( err ){
            //devuelvo error y envio texto en idioma correspondiente
            //conprubeo si tengo idioma
            var i= req.body.lang ||'es';
            return res.json(inter.devuelve('ERR_LIST',i));
        }

        return res.json({ok:true, data:lista});

    });

});

module.exports = router;