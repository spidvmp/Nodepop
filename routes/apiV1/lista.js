'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//requiere al modelo
var Article = require('../../Model/Article');

//le hago pasar por el middleware
router.get('/',require('./validate'));

//listado de paginado
router.get('/', function(req,res){

    //criterio de busqueda que sean articulos en venta
    Article.lista({},function(err, lista){
        if ( err ){
            //devuelvo error y envio texto en idioma correspondiente
            var txt='error';
            return res.json({ok:false, error:err, txt:txt});
        }

        return res.json({ok:true, data:lista});

    });

});

module.exports = router;