'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//requiere al modelo
var Article = require('../../Model/Article');


//listado de paginado
router.get('/', function(req,res){

    //criterio de busqueda que sean articulos en venta
    Article.lista({sale:true},function(err, lista){
        if ( err ){
            console.log(err);
            //devuelvo error y envio texto en idioma correspondiente
            var txt='error';
            return res.json({ok:false, error:err, txt:txt});
        }

        //tenemos los datoa
        return res.json({ok:true, data:lista});

    });

});




module.exports = router;