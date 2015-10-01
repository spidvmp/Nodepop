'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../../config')

//requiere al modelo
var Article = require('../../Model/Article');

//le hago pasar por el middleware
router.get('/',require('./validate'));



//listado de paginado
router.get('/', function(req,res){

    //ejecuto el metodo lista de Article. Le paso el req completo para que saque los datos de los filtros
    Article.lista(req,  function(err, lista){
        if ( err ){
            //devuelvo error y envio texto en idioma correspondiente
            var txt='error';
            return res.json({ok:false, error:err, txt:txt});
        }

        return res.json({ok:true, data:lista});

    });

});

module.exports = router;