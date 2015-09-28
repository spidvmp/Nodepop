'use strict';
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../../Model/User');

//comprobamos cada peticion que se hace, tiene que venir con el token
//middleware que comprueba cada peticion y verifica que el token que nos dan es valido
router.get('/', function (req, res, next){

    //saco el token que viene en el body
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("validate / con token ", token);

    //comprobamos si lo tenemos
    if ( token ){

        jwt.verify(token,'oiwjdnfpu29j', function(err, decodec){

            if (err) {

                return res.status(401).json({ok:false, error:'No tienes permiso'});

            }

            //esta autenticado, seguir por otros middlewares
            next();

        });

    } else {

        return res.status(401).json({ok:false, error:'No tiene permiso.'});

    }
});


router.post('/authenticate', function(req,res){
    /* una vez que tenemos login y pass, se llama a /authenticate y por post se le envia el login y passwd.
     Se verica con la BD y si es correcto se genera el token, que se le devuelve a la app y que se usara a partir de ahora siempre
     cada peticion se comprueba el token con la funcion de arriba
     */

    //buscamos el login y passwd, no diferencio si encuentra el login y el pass es erroneo, si no coincide doy un solo
    // mensaje de error, asi no doy tantas pistas
    User.userExist({login: req.body.login, password:req.body.password}, function(err, rows){
        if ( err ){

            return res.json({ok:false, error:err, txt:'Usuario erroneo'});

        }
        //he de comprbar si rows tiene elementos, si los tiene no se puede crear este usuario, estaria repetido
        if ( rows.length === 1) {

            //hemos encontrado el registro, generamos el token
            var token = jwt.sign({_id:'123',name:'pepe', password:'mj892j4m9283'}, 'oiwjdnfpu29j', {expiresInMinutes:120});

            //se lo pasamos el usuario
            res.json({ok:true, token:token});


        } else {

            //han habido mas de una respuesta, esto no deberia pasar, devuelvo error y ademas lo pongo en la consola
            console.log("Encontradas mas de una entrada en usuarios. User=",req.body.login," passwd=",req.body.password);
            return res.json({ok:false, error:err, txt:'Usuario erroneo'});

        }

    });



});

module.exports = router;