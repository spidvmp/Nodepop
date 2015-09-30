'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../../config')

//requiere al modelo
var Article = require('../../Model/Article');

//le hago pasar por el middleware
router.get('/',require('./validate'));




router.get('/', function(req,res){
    console.log("estoy en el gert/");
    var e=0;
    //criterio de busqueda que sean articulos en venta
    Article.lista({}, 0, function(err, lista, e){
        if ( err ){
            //devuelvo error y envio texto en idioma correspondiente
            var txt='error';
            return res.json({ok:false, error:err, txt:txt});
        }

        return res.json({ok:true, data:lista});

    });

});

//listado de paginado
router.get('/:id', function(req,res){
    //paginado. Al numero que se pase se le resta 1 y se multiplica el elementsInPage y esos son los reg que se saltan
    var e=req.params.id;
    e=(e-1)*config.elementsInPage;
    if ( e <= 0)
        e=0;

    //he de saltar e elementos
    console.log("estoy en el paginado e=",e);
    Article.lista({}, e, function(err, lista){
        if ( err ){
            //devuelvo error y envio texto en idioma correspondiente
            var txt='error';
            return res.json({ok:false, error:err, txt:txt});
        }

        return res.json({ok:true, data:lista});

    });

});

module.exports = router;