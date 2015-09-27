'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//requiere al modelo
var Article = require('../../Model/Article');


//listado de paginado
router.get('/', function(req,res){

    //criterio de busqueda que sean articulos en venta
    Article.lista({},function(err, lista){
        if ( err ){
            console.log(err);
            //devuelvo error y envio texto en idioma correspondiente
            var txt='error';
            return res.json({ok:false, error:err, txt:txt});
        }

        //tenemos los datoa
/*
        var a= new Article({name:'calculadora', sale:true, price:100.0, pic:'calculator.jpg', tags:{ t1:'work',t2:'mobile'}});
        a.save( function(err, creado){
            if ( err ){
                console.log('err crear ', err);
                return next(err);
            }
            console.log('creado ',creado);
        });
*/
        return res.json({ok:true, data:lista});

    });

});




module.exports = router;